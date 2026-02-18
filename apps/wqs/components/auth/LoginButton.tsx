"use client"
// import { useToast } from '@/hooks/use-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { useAuthLoadingState } from '@/atoms/AuthLoadingState'
import { useUserState } from '@/atoms/UserState'
import {toast} from 'sonner';
import { api } from '@/lib/api'
import { isAxiosError } from 'axios'

export default function LoginButton({type}: Readonly<{type: "Login" | "Signup"}>) {
    // const isLoading = useRecoilValue(AuthLoadingState);
    const {loading: isLoading, setLoading: setIsLoading} = useAuthLoadingState()
    const {setState, ...data} = useUserState();
    const router = useRouter()
    const handleSignup = async() => {
      try {
        setIsLoading(true);
        const response = await api.post("/auth/signup", data);
        if(response.status === 200){
          toast.success("Signup successful", {description: "You have successfully signed up."})
          setState({
            username: "",
            email: "",
            password: ""
          })
        }
        router.push('/')
      } catch (error) {
        if(isAxiosError(error) && error.response){
          toast.error(error.response.data.error)
          return
        }
        toast.error("Signup failed")
      }
      finally{
        setIsLoading(false)
      }
    }

    const handleLogin = async() => {
      try {
        setIsLoading(true)
        const response = await signIn('credentials', {email: data.email, password: data.password, redirect: false});
        if(response?.ok){
          toast.success("Login successful", {description: "You have successfully logged in."})
          router.push(`/`);
          router.refresh()
        }
        else{
          toast("Login failed", {description: "Please check your credentials and try again."})
        }
      } catch (error) {
        const description = error instanceof Error ? error.message : "Please check your credentials and try again.";
        toast("Login failed", {description})
      }
      finally{
        setIsLoading(false)
      }
    }


    const handleClick = async() => {
      if(type === "Signup"){
        await handleSignup()
      }
      else{
        await handleLogin()
      }
    }
  return (
    <Button type='submit' onClick={async(e) => {e.preventDefault(); await handleClick()}} 
    className="w-full mt-5 font-medium py-6 px-4 rounded-lg flex items-center justify-center gap-2 group transition-all active:scale-[0.98]"
            style={{
              backgroundColor: '#2E90FF',
              color: 'white',
              boxShadow: '0 4px 14px 0 rgba(46, 144, 255, 0.39)',
              cursor: "pointer"
            }} disabled={isLoading}>
      {isLoading ? (
        <>
          <svg className="w-5 h-5 mr-3 -ml-1 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          {type === "Login" ? 'Logging in...' : 'Signing up...'}
        </>
      ) : (
        <>{type === 'Login' ? 'Login' : 'Signup'}
        <svg className="w-5 h-5 mt-0.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            </>
      )}
    </Button>
  )
}