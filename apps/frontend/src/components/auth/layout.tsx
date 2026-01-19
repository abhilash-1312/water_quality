import { Navigate, Outlet } from "react-router-dom";
import { useSessionState } from "../../atoms/SessionState";
import { isTokenExpired } from "../../lib/helper";

export default function AuthLayout() {
    const { session } = useSessionState();
    if (session && !isTokenExpired(session)) {
        return <Navigate to="/" replace />
    }
    return (
        <div className="grow flex items-center justify-center">
            <div className="w-full bg-white dark:bg-background-dark flex flex-col md:flex-row h-dvh">
                <div className="hidden md:flex md:w-1/2 bg-blue-50 dark:bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
                    <div className="absolute inset-0 water-pattern"></div>
                    <div className="relative z-10 text-center">
                        <div className="mb-8 flex justify-center">
                            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                                <div className="size-16 text-primary">
                                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                                </svg>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-[#111418] dark:text-white mb-4">Water Quality Analysis</h3>
                        <p className="text-[#617589] dark:text-gray-400 text-base max-w-xs mx-auto">
                            Track, monitor, and visualize water quality samples with our advanced engineering dashboard.
                        </p>
                        <div className="mt-12 flex flex-col gap-4 items-center">
                            <div className="flex items-center gap-3 text-sm text-primary font-medium">
                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                <span>Real-time Data Streaming</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-primary font-medium">
                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                <span>Advanced Sample Tracking</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full opacity-20">
                        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,197.3C960,171,1056,117,1152,101.3C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#137fec" fillOpacity="1"></path>
                        </svg>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-8 lg:p-12 lg:px-24 flex flex-col justify-center">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
