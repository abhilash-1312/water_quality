import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/home/home"
import AuthLayout from "./components/auth/layout"
import Auth from "./components/auth/auth"
import HomeLayout from "./components/home/layout"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
