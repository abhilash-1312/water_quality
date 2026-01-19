import express from 'express';
import userRouter from './routes/user';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
app.use(cors());
app.use(express.json());

app.use(express.json());
app.use("/api/user", userRouter);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
})