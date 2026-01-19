import { Navigate, Outlet } from "react-router-dom"
import { useSessionState } from "../../atoms/SessionState"
import { isTokenExpired } from "../../lib/helper"



export default function HomeLayout() {
  const { session, setState } = useSessionState()

  if (!session) {
    return <Navigate to="/login" replace />
  }

  if (isTokenExpired(session)) {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken || isTokenExpired(refreshToken)) {
      setState({ session: null })
      localStorage.removeItem("session");
      localStorage.removeItem("refreshToken");
      return <Navigate to="/login" replace />
    }
  }

  return <Outlet />
}
