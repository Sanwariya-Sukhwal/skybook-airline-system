import React, { useState } from 'react'
import { useNavigate,  useLocation } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { saveUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })

      const data = response.data

      localStorage.setItem('token', data.token)

      saveUser(data.user)

      const from = location.state?.from

      if (data.user.role === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate(from || '/')
      }

    } catch (error) {
      console.error(error)
      setError('Invalid Email or Password')
    }
  }

  return (
    <div className="card w-full max-w-md mx-auto">

      <h2 className="font-heading text-2xl text-white mb-1">
        Welcome Back
      </h2>

      <p className="text-white/40 text-sm mb-6">
        Sign in to your account
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2.5 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-white/60 text-sm mb-1.5 block">
            Email
          </label>

          <input
            type="email"
            className="input-field"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-white/60 text-sm mb-1.5 block">
            Password
          </label>

          <input
            type="password"
            className="input-field"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-2"
        >
          Sign In
        </button>

      </form>

      <p className="text-white/40 text-sm text-center mt-4">
        Don't have an account?{' '}
      <button
        type="button"
        onClick={() => navigate('/signup', { replace: true })}
        className="text-gold-400 hover:underline"
      >
        Sign Up
      </button>
      </p>

    </div>
  )
}