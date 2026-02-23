import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { jwtVerify, importJWK } from "jose";
import { userManager } from "./user/UserManager";
import { User } from "./user/User";
import { MessageType, SocketEvent } from "@repo/datatypes";

const app = express();
app.use(cors());

const PORT = process.env.PORT ?? 8080;

const server = app.listen(PORT, () => {
  console.log(`Websocket server running on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "*", // change in production
  },
});

/**
 * 🔐 Socket Authentication Middleware
 */
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("No token provided"));
    }

    const secret = process.env.JWT_SECRET ?? "secret";

    const jwk = await importJWK({
      k: secret,
      alg: "HS256",
      kty: "oct",
    });

    const { payload } = await jwtVerify(token, jwk);

    // ✅ Check Admin Role
    if (payload.role !== "admin") {
      return next(new Error("Admins only"));
    }

    // Attach user data
    socket.data.user = payload;

    next();
  } catch (error) {
    return next(new Error("Invalid or expired token"));
  }
});

io.on(MessageType.connection, (socket) => {
  const userId = socket.data.user.id;
  const socketId = socket.id;
  userManager.upsertUser(userId, socketId);
  socket.on(MessageType.update_data, (data: SocketEvent) => {
    userManager.users.forEach((user: User) => {
      if (user.socketId !== socketId) {
        io.to(user.socketId).emit(MessageType.update_data, data);
      }
    });
  })

  socket.on(MessageType.disconnect, () => {
    userManager.removeUser(userId)
  });
});