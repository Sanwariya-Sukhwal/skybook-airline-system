import React from 'react'
import Navbar from '../components/Navbar.jsx'
import LoginForm from '../components/LoginForm.jsx'

export default function Login() {
  return (
    <div className="min-h-screen bg-sky-950">
      <Navbar />

      <div className="pt-28 pb-16 px-4 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  )
}