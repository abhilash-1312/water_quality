import z from 'zod';

export const signupSchema = z.object({
    username: z.string().min(3).max(30, "Username must be between 3 and 30 characters"),
    password: z.string().min(6).max(100, "Password must be between 6 and 100 characters"),
    email: z.email("Invalid email address"),
})

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6).max(100, "Password must be between 6 and 100 characters"),
})