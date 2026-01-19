import { useState } from "react"

export default function Password({ password, disabled, handleChange }: { password: string, disabled: boolean, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <div className="flex justify-between items-center pb-2">
                <label className="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal">Password</label>
                <a className="text-primary text-xs font-medium hover:underline" href="#">Forgot Password?</a>
            </div>
            <div className="relative flex w-full items-stretch">
                <input disabled={disabled} className="form-input w-full rounded-lg text-[#111418] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-slate-800 focus:border-primary h-12 placeholder:text-[#617589] px-4 pr-12 text-base font-normal dark:text-white" placeholder="Enter your password" type={visible ? "text" : "password"} value={password} onChange={handleChange} />
                <button onClick={(e) => {
                    e.preventDefault(); setVisible(!visible)
                }} className="absolute right-0 top-0 h-full px-3 text-[#617589] hover:text-primary transition-colors flex items-center justify-center" type="button">
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "20px" }}
                    >
                        {visible ? "visibility" : "visibility_off"}
                    </span>

                </button>
            </div>
        </>
    )
}
