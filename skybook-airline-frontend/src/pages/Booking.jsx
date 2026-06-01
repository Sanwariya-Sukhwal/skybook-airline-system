import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { useBooking } from '../context/BookingContext.jsx'

export default function Booking() {
  const { selectedFlight, setPassengerInfo } = useBooking()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('Male')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  if (!selectedFlight) {
    return (
      <div className="min-h-screen bg-sky-950">
        <Navbar />
        <div className="pt-28 text-center">
          <p className="text-white/50 mb-4">No flight selected.</p>
          <button onClick={() => navigate('/flights')} className="btn-primary">Browse Flights</button>
        </div>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPassengerInfo({ name, age, gender, phone, email })
    navigate('/payment')
  }

  const f = selectedFlight

  return (
    <div className="min-h-screen bg-sky-950">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl text-white mb-8">Passenger Details</h1>

        {/* Flight summary */}
        <div className="card mb-6 flex items-center justify-between">
          <div>
            <p className="text-gold-400 font-semibold">{f.airline}</p>
            <p className="text-white text-lg font-medium">{f.fromCode} → {f.toCode}</p>
            <p className="text-white/40 text-sm">{f.date} · {f.departure} – {f.arrival}</p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-xs">Price</p>
            <p className="text-2xl font-heading text-white">₹{f.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Passenger form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Full Name</label>
                <input type="text" className="input-field" placeholder="As on ID card" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Age</label>
                <input type="number" className="input-field" placeholder="25" min="1" max="120" value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Gender</label>
                <select className="input-field" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Phone</label>
                <input type="tel" className="input-field" placeholder="10-digit number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Email</label>
              <input type="email" className="input-field" placeholder="Booking confirmation email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary w-full mt-2">Proceed to Payment</button>
          </form>
        </div>
      </div>
    </div>
  )
}
