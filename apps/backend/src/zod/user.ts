import z from 'zod';

export const signupSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6).max(100),
    email: z.email(),
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(100),
})