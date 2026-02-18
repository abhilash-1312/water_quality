import Quote from "@/components/auth/Quote";
import React from "react";

export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="min-h-screen flex relative overflow-hidden">
            <Quote/>
            {children}
        </div>
    )
}