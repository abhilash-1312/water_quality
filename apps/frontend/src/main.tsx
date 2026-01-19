import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './providers/AuthProvider.tsx'
import {ToastContainer} from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer position='top-right'/>
    </AuthProvider>
  </StrictMode>,
)
