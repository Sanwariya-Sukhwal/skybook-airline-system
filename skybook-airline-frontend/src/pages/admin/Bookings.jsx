import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../components/AdminSidebar.jsx'
import api from '../../services/api'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings')
      setBookings(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const filtered = bookings.filter((b) =>
    b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    String(b.id).includes(search) ||
    b.flight?.fromLocation?.toLowerCase().includes(search.toLowerCase()) ||
    b.flight?.toLocation?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-sky-950">
      <AdminSidebar />

      <main className="flex-1 p-8">

        <h1 className="font-heading text-3xl text-white mb-2">
          All Bookings
        </h1>

        <p className="text-white/40 text-sm mb-6">
          {bookings.length} total bookings
        </p>

        <input
          type="text"
          className="input-field max-w-sm mb-6"
          placeholder="Search by name, booking ID or route..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-4xl mb-4">📋</p>
            <p className="text-white/40">
              {bookings.length === 0
                ? 'No bookings found.'
                : 'No results found.'}
            </p>
          </div>
        ) : (
          <div className="card overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="text-white/40 border-b border-white/10 text-left">
                  <th className="py-3 pr-4">Booking ID</th>
                  <th className="py-3 pr-4">Passenger</th>
                  <th className="py-3 pr-4">Airline</th>
                  <th className="py-3 pr-4">Route</th>
                  <th className="py-3 pr-4">Date</th>
                  <th className="py-3 pr-4">Amount</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>

              <tbody>

                {[...filtered].reverse().map((b) => (

                  <tr
                    key={b.id}
                    className="border-b border-white/5 text-white/70 hover:bg-white/3 transition-colors"
                  >

                    <td className="py-3 pr-4 text-gold-400 font-medium">
                      {b.id}
                    </td>

                    <td className="py-3 pr-4 text-white">
                      {b.user?.name}
                    </td>

                    <td className="py-3 pr-4">
                      {b.flight?.airline}
                    </td>

                    <td className="py-3 pr-4">
                      {b.flight?.fromLocation}
                      <span className="text-white/30 mx-1">→</span>
                      {b.flight?.toLocation}
                    </td>

                    <td className="py-3 pr-4">
                      {b.flight?.date}
                    </td>

                    <td className="py-3 pr-4 text-white">
                      ₹{b.flight?.price?.toLocaleString()}
                    </td>

                    <td className="py-3">

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          b.status === 'BOOKED'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {b.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </main>
    </div>
  )
}