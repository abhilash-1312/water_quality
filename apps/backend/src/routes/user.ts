import { Router } from "express";
import { prisma } from "../lib/client";
import { loginSchema, signupSchema } from "../zod/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.post("/signup", async(req, res) => {
    try {
        const signupValidationResponse = signupSchema.safeParse(req.body);
        if(!signupValidationResponse.success){
            return res.status(400).json({error: "Invalid credentials"});
        }
        const {email, password, username} = signupValidationResponse.data;
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                userId: true
            }
        });
        if(existingUser){
            return res.status(400).json({error: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await prisma.user.create({
            data: {
                username,
                email, 
                password: hashedPassword
            },
            select: {
                userId: true,
                email: true,
                username: true
            }
        })
        return res.status(200).json({message: "User created successfully"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"});
    }
})

router.post("/login", async(req, res) => {
    try {
        const loginValidationResponse = loginSchema.safeParse(req.body);
        if(!loginValidationResponse.success){
            return res.status(400).json({error: "Invalid credentials"});
        }
        const {email, password} = loginValidationResponse.data;
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                userId: true,
                email: true,
                password: true,
                username: true,
                role: true
            }
        });
        if(!existingUser){
            return res.status(400).json({error: "User does not exist"});
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid){
            return res.status(400).json({error: "Invalid credentials"});
        }
        const secret = process.env.JWT_SECRET  ?? '';
        const userData = {
            userId: existingUser.userId,
            email: existingUser.email,
            username: existingUser.username,
            role: existingUser.role
        }
        const token = jwt.sign(
            userData,
            secret,
            {expiresIn: "10d"}
        );

        const refreshToken = jwt.sign(
            userData,
            secret,
            {expiresIn: "30d"}
        )
        return res.status(200).json({message: "Login successful", token, refreshToken});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"});
    }
})

export default router;