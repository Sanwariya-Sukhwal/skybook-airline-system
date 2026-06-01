import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">✈️</span>
          <span className="font-heading text-xl text-white">
            Sky<span className="gold-text">Book</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-5">

          {(!user || user.role === 'USER') && (
            <>
              <Link to="/flights" className="text-white/70 hover:text-white text-sm">Flights</Link>

              {user && (
                <Link to="/my-bookings" className="text-white/70 hover:text-white text-sm">
                  My Bookings
                </Link>
              )}
            </>
          )}

          {user && user.role === 'ADMIN' && (
            <>
              <Link to="/admin" className="text-white/70 hover:text-white text-sm">📊 Dashboard</Link>
              <Link to="/admin/add-flight" className="text-white/70 hover:text-white text-sm">➕ Add Flight</Link>
              <Link to="/admin/manage-flights" className="text-white/70 hover:text-white text-sm">✈️ Manage</Link>
              <Link to="/admin/bookings" className="text-white/70 hover:text-white text-sm">📋 Bookings</Link>
            </>
          )}

          {user ? (
            <>
              <span className="text-white/40 text-sm pl-4 border-l border-white/10">
                Hi, <span className="text-white">{user.name}</span>
              </span>

              <button onClick={handleLogout} className="btn-outline text-sm py-1.5">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white/70 hover:text-white text-sm">Login</Link>
              <Link to="/signup" className="btn-primary text-sm py-1.5">Sign Up</Link>
            </>
          )}

        </div>

      </div>
    </nav>
  )
}