import { useLocation, useNavigate } from "react-router-dom";
import Field from "./field";
import { useAuthState } from "../../atoms/AuthState";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { useSessionState } from "../../atoms/SessionState";
import {toast} from 'react-toastify'


export default function Auth() {
    const location = useLocation();
    const navigate = useNavigate();
    const { login, signup } = useContext(AuthContext);
    const { email, password, username, setState } = useAuthState()
    const { setState: setSession } = useSessionState()
    const [loading, setLoading] = useState(false)
    const handleAuth = async () => {
        setLoading(true);
        try {
            if (location.pathname === "/login") {
                const response = await login(email, password);
                if (response.success) {
                    setSession({ session: response.token });
                    localStorage.setItem("session", response.token);
                    localStorage.setItem("refreshToken", response.refreshToken);
                    toast.success("Login successful");
                    setState({ email: "", password: "" });
                    navigate("/");
                }
                else{
                    toast.error(response.error);
                }
            } else {
                const response = await signup(username, email, password);
                if (response.success) {
                    toast.success("Signup successful");
                    setState({ username: "", email: "", password: "" });
                    navigate("/login");
                }
                else{
                    toast.error(response.error);
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        }
        finally{
            setLoading(false);
        }

    }
    return (
        <>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-[#111418] dark:text-white mb-2">{location.pathname === "/login" ? "Welcome Back" : "Create Account"}</h1>
                <p className="text-[#617589] dark:text-gray-400">{location.pathname === "/login" ? "Access your sample tracking dashboard." : "Create a new account to get started."}</p>
            </div>
            <form className="space-y-6">
                <Field type="email" disabled={loading} name="email" label="Email Address" placeholder="Enter your email" />
                {location.pathname === "/signup" && (
                    <Field type="text" disabled={loading} name="username" label="Username" placeholder="Choose a username" />
                )}
                <Field type="password" disabled={loading} name="password" label="Password" placeholder="Enter your password" />
                <div className="flex flex-col gap-4 pt-4">
                    <button onClick={handleAuth} disabled={loading} className={`w-full cursor-pointer bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 ${loading && "opacity-50 cursor-not-allowed flex-row-reverse"}`}>
                        <span>{loading ? (location.pathname === "/login" ? "Logging in..." : "Signing up..."): (`${location.pathname === "/login" ? "Login" : "Signup"} to Dashboard`)}</span>
                        <span className={`material-symbols-outlined text-sm ${loading && 'animate-spin'}`}>{loading ? "progress_activity": "login"}</span>
                    </button>
                    <div className="flex items-center gap-4 py-2">
                        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                        <span className="text-xs text-[#617589] uppercase tracking-wider font-semibold">or</span>
                        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <button onClick={() => {
                        setState({ username: "", email: "", password: "" });
                        navigate(location.pathname === "/login" ? "/signup" : "/login")
                    }} disabled={loading} className="w-full bg-white dark:bg-slate-800 cursor-pointer border border-[#dbe0e6] dark:border-gray-700 text-[#111418] dark:text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2" type="button">
                        <span>{location.pathname === "/login" ? "Create Account" : "Account Login"}</span>
                    </button>
                </div>
            </form>
            <div className="mt-12 text-center">
                <p className="text-xs text-[#617589] dark:text-gray-500">
                    © 2026  Computer Science and Engineering Department<br />
                    Authorized Personnel Only
                </p>
            </div>
        </>
    )
}
