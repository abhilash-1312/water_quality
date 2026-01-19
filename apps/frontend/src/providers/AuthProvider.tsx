import axios from "axios";
import { api } from "../lib/api";
import { AuthContext, type FailureResponse, type LoginResponse, type LoginSuccessResponse, type SignupResponse, type SignupSuccessResponse } from "./AuthContext";



export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const signup = async (_username: string, _email: string, _password: string): Promise<SignupResponse> => {
        try {
            console.log("calling signup");
            const response = await api.post<Omit<SignupSuccessResponse, "success">>("/user/signup", {
                username: _username,
                email: _email,
                password: _password
            });
            return {success: true, message: response.data.message};
        } catch (error) {
            console.log(error);
            if(axios.isAxiosError(error) && error.response){
                return {success: false, error: error.response.data.error} as FailureResponse;
            }
            return {success: false, error: "Signup failed"} as FailureResponse;
        }
    }
    const login = async (_email: string, _password: string): Promise<LoginResponse> => {
        try {
            console.log("calling login");
            const response = await api.post<Omit<LoginSuccessResponse, "success">>("/user/login", {    
                email: _email,
                password: _password
            });
            return {success: true, message: response.data.message, token: response.data.token, refreshToken: response.data.refreshToken}; 
        } catch (error) {
            console.log(error);
            if(axios.isAxiosError(error) && error.response){
                return {success: false, error: error.response.data.error} as FailureResponse;
            }
            return {success: false, error: "Login failed"} as FailureResponse;
        }
    }

    return (
        <AuthContext.Provider value={{signup, login}}>
            {children}
        </AuthContext.Provider>
    )
}
