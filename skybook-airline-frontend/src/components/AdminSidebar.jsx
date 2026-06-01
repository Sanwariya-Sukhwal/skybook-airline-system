import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const links = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/add-flight', label: 'Add Flight', icon: '➕' },
  { to: '/admin/manage-flights', label: 'Manage Flights', icon: '✈️' },
  { to: '/admin/bookings', label: 'All Bookings', icon: '📋' },
  { to: '/admin/payments', label: 'Payments', icon: '💳' }
]

export default function AdminSidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <aside className="w-56 min-h-screen glass border-r border-white/10 flex flex-col">

      <div className="p-6 border-b border-white/10">
        <p className="font-heading text-lg text-white">
          Sky<span className="gold-text">Book</span>
        </p>
        <p className="text-white/40 text-xs mt-0.5">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1">

        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-gold-400/10 text-gold-400'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}

      </nav>

      <div className="p-4">

        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <span>🚪</span>
          Logout
        </button>

      </div>

    </aside>
  )
}