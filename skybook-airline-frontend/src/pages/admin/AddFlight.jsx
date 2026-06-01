import React, { useState } from 'react'
import AdminSidebar from '../../components/AdminSidebar.jsx'
import api from '../../services/api'

const empty = {
  airline: '',
  flightNumber: '',
  from: '',
  to: '',
  fromCode: '',
  toCode: '',
  date: '',
  departure: '',
  arrival: '',
  duration: '',
  price: '',
  seats: ''
  
}

export default function AddFlight() {

  const [form, setForm] = useState(empty)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await api.post('/flights', {
        airline: form.airline,
        flightNumber: form.flightNumber,
        fromLocation: form.from,
        toLocation: form.to,
        date: form.date,
        departureTime: form.departure,
        arrivalTime: form.arrival,
        price: Number(form.price),
        seats: Number(form.seats)
      })
      setSuccess(true)

      setForm(empty)

      setTimeout(() => {
        setSuccess(false)
      }, 3000)

    } catch (error) {

      console.error(error)

      alert('Flight Add Failed')
    }
  }

  return (
    <div className="flex min-h-screen bg-sky-950">

      <AdminSidebar />

      <main className="flex-1 p-8">

        <h1 className="font-heading text-3xl text-white mb-2">
          Add New Flight
        </h1>

        <p className="text-white/40 text-sm mb-8">
          Fill in the details to add a flight
        </p>

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg mb-6 text-sm">
            ✅ Flight added successfully!
          </div>
        )}

        <div className="card max-w-2xl">

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">
                  Airline Name
                </label>

                <input
                  name="airline"
                  className="input-field"
                  placeholder="e.g. Indigo"
                  value={form.airline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">
                  Flight Number
                </label>

                <input
                  name="flightNumber"
                  className="input-field"
                  placeholder="e.g. 6E101"
                  value={form.flightNumber}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">
                  From City
                </label>

                <input
                  name="from"
                  className="input-field"
                  placeholder="e.g. Mumbai"
                  value={form.from}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">
                  From Code
                </label>

                <input
                  name="fromCode"
                  className="input-field"
                  placeholder="e.g. BOM"
                  value={form.fromCode}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">
                  To City
                </label>

                <input
                  name="to"
                  className="input-field"
                  placeholder="e.g. Delhi"
                  value={form.to}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">
                  To Code
                </label>

                <input
                  name="toCode"
                  className="input-field"
                  placeholder="e.g. DEL"
                  value={form.toCode}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4">

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">
                  Date
                </label>

                <input
                  name="date"
                  type="date"
                  className="input-field"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">
                  Departure
                </label>

                <input
                  name="departure"
                  type="time"
                  className="input-field"
                  value={form.departure}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">
                  Arrival
                </label>

                <input
                  name="arrival"
                  type="time"
                  className="input-field"
                  value={form.arrival}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4">

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">
                  Duration
                </label>

                <input
                  name="duration"
                  className="input-field"
                  placeholder="e.g. 2h 30m"
                  value={form.duration}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">
                  Price (₹)
                </label>

                <input
                  name="price"
                  type="number"
                  className="input-field"
                  placeholder="4500"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">
                  Seats Available
                </label>

                <input
                  name="seats"
                  type="number"
                  className="input-field"
                  placeholder="50"
                  value={form.seats}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-2"
            >
              Add Flight
            </button>

          </form>

        </div>

      </main>

    </div>
  )
}