
import { useMemo } from "react"
import Field from "./Field"
import LoginButton from "./LoginButton"
import RequestButton from "./RequestButton"

export default function Auth({type} : Readonly<{type: "Login" | "Signup"}>) {

  const info: {title: string, description: string} = useMemo(() => {
    if(type === "Signup") return {title: "Sign Up", description: "Create an account to access our services"}
    return {title: "Login", description: "Login to your account to view and manage your requests"}
  }, [type])

  return (
    <div className="flex flex-1 min-h-screen w-full justify-center">
      <div className="h-full w-full max-w-125 py-10">
        <>
        <h1 className="text-3xl font-bold text-white mb-3">System {type}</h1>
        <p className="text-slate-400">{info.description}</p>
        </>

        <form className="mt-10 flex flex-col space-y-4">
          <Field type="email" name="email" placeholder="Enter your email" label="Email" />
          {type === "Signup" && <Field type="text" name="username" placeholder="Enter your name" label="Name" />}
          <Field type="password" name="password" placeholder="Enter your password" label="Password" />
          <LoginButton type={type}/>
        </form>

        {/* Divider */}
          <div className="flex items-center gap-4 mt-10">
            <div className="h-px flex-1" style={{ backgroundColor: '#1E293B' }}></div>
            <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">New Entity</span>
            <div className="h-px flex-1" style={{ backgroundColor: '#1E293B' }}></div>
          </div>

          {/* Request Account Button */}
          <RequestButton type={type}/>
      </div>
    </div>
  )
}
