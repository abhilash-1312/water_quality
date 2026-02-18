import z from 'zod'

export const signinInput = z.object({
    email: z.email(),
    password: z.string().min(6),
})
export type SigninInput = z.infer<typeof signinInput>

export const signupInput = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
})
export type SignupInput = z.infer<typeof signupInput>