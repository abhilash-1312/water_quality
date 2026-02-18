"use client"
import { ChangeEvent, useMemo } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react'
import { usePasswordState } from '@/atoms/PasswordState'
import { useUserState } from '@/atoms/UserState'

type PropTypes = {
    type: string,
    name: "email" | "username" | "password",
    placeholder: string,
    label: string,
}



export default function Field({type, placeholder, name, label}: Readonly<PropTypes>) {
const {setState: setUser, ...data} = useUserState()
  const {showPassword, setShowPassword} = usePasswordState()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.target.value;
    setUser(prevUser => ({...prevUser, [name]:val}));
  }

  const icon = useMemo(() => {
    if (name === "username") return <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />;
    if (name === "email") return <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />;
    return <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />;
  }, [name])

  const inputType = useMemo(() => {
      if (name !== "password") return type;
      return showPassword ? "text" : "password";
  }, [name, type, showPassword])
  return (
    <div className="space-y-2 flex flex-col group">
        <Label htmlFor={name} className='text-slate-200 text-sm font-semibold transition-colors group-focus-within:'>{label}</Label>
        <div className="relative">
          {icon}
          <Input
            id={name}
            placeholder={placeholder}
            type={inputType}
            onChange={handleChange}
            value={data[name]}
            className="pl-10 w-full rounded-lg border text-white h-12 pr-4 text-base placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: '#0F172A',
              borderColor: '#475569',
              '--tw-ring-color': 'rgba(46, 144, 255, 0.4)',
            } as React.CSSProperties}
            required
          />
          {
            name === "password" && <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-slate-500" />
            ) : (
              <Eye className="h-4 w-4 text-slate-500" />
            )}
          </button>
          }
        </div>
    </div>
  )
}
