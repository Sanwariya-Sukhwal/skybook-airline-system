import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

export default function SignupForm() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {

      await api.post('/auth/register', {
        name,
        email,
        password,
        role: 'USER'
      })

      navigate('/login')

    } catch (error) {

      console.error(error)

      setError('Registration Failed')
    }
  }

  return (
    <div className="card w-full max-w-md mx-auto">

      <h2 className="font-heading text-2xl text-white mb-1">
        Create Account
      </h2>

      <p className="text-white/40 text-sm mb-6">
        Join SkyBook to start booking
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2.5 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-white/60 text-sm mb-1.5 block">
            Full Name
          </label>

          <input
            type="text"
            className="input-field"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            placeholder="Min 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-2"
        >
          Create Account
        </button>

      </form>

      <p className="text-white/40 text-sm text-center mt-4">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-gold-400 hover:underline"
        >
          Sign In
        </Link>
      </p>

    </div>
  )
}