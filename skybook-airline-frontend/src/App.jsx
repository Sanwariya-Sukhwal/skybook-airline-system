import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { BookingProvider } from './context/BookingContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <AppRoutes />
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
