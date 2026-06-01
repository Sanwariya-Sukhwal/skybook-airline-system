import React from 'react'
import Navbar from '../components/Navbar.jsx'
import SignupForm from '../components/SignupForm.jsx'

export default function Signup() {
  return (
    <div className="min-h-screen bg-sky-950">
      <Navbar />
      <div className="pt-28 pb-16 px-4 flex items-center justify-center">
        <SignupForm />
      </div>
    </div>
  )
}
