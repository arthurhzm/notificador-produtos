import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login-page'
import Register from './pages/register-page'
import { ToastProvider } from './contexts/ToastContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  </StrictMode>,
)
