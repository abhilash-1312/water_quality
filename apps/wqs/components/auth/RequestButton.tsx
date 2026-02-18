"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { useMemo } from "react";

export default function RequestButton({type}: {type: "Signup" | "Login"}) {
  const router = useRouter();
  const info = useMemo(() => {
      if(type === "Signup") return {value: "Continue to Login", url: "/login"}
      return {value: "Request New Account", url: "/signup"}
  }, [type])
  return (
    <Button
        type="button"
        className="w-full font-semibold mt-7 py-6 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
        style={{
          backgroundColor: 'transparent',
          color: '#94A3B8',
          border: '1px solid #475569',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#2E90FF'
          e.currentTarget.style.color = '#2E90FF'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#475569'
          e.currentTarget.style.color = '#94A3B8'
        }}

        onClick={() => {router.replace(info.url)}}
    >
        <span>{info.value}</span>
    </Button>
  )
}
