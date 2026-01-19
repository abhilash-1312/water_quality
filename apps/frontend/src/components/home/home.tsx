import { useNavigate } from "react-router-dom";
import { useSessionState } from "../../atoms/SessionState";
import {toast} from 'react-toastify'


export default function Home() {
    const { setState } = useSessionState();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("session");
        localStorage.removeItem("refreshToken");
        setState({ session: null });
        toast.success("Logged out successfully");
        navigate("/login");
    }
  return (
    <div>
      This is Home Page
      <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
        Logout
      </button>
    </div>
  )
}
