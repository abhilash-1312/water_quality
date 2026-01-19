import { jwtDecode } from "jwt-decode"
export function isTokenExpired(token: string) {
  try {
    const decoded = jwtDecode(token) as { exp: number } 
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch {
    return true
  }
}