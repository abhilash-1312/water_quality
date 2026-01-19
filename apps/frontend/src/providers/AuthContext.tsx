/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";

interface BaseResponse{
    success: boolean,
    message: string,
}
export interface SignupSuccessResponse extends BaseResponse{
    success: true,
    message: string,
}

export interface FailureResponse extends BaseResponse{
    success: false,
    error: string
}

export type SignupResponse = SignupSuccessResponse | FailureResponse;

export interface LoginSuccessResponse extends BaseResponse{
    success: true,
    message: string,
    token: string, 
    refreshToken: string
}

export type LoginResponse = LoginSuccessResponse | FailureResponse;


export interface IAuthContext{
    signup: (username: string, email: string, password: string) => Promise<SignupResponse>,
    login: (email: string, password: string) => Promise<LoginResponse>,
}


export const AuthContext = createContext<IAuthContext>({
    signup: async (_username: string, _email: string, _password: string) => ({success: false, error: "Not implemented"} as FailureResponse),
    login: async (_email: string, _password: string) => ({success: false, error: "Not implemented"} as FailureResponse),
});