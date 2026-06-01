import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../components/AdminSidebar.jsx'
import api from '../../services/api'

export default function AdminDashboard() {

  const [flights, setFlights] = useState([])
  const [bookings, setBookings] = useState([])
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {

    try {

      const flightResponse = await api.get('/flights')

      const bookingResponse = await api.get('/bookings')

      setFlights(flightResponse.data)

      setBookings(bookingResponse.data)

      const totalRevenue = bookingResponse.data.reduce(
        (sum, booking) =>
          sum + (booking.flight?.price || 0),
        0
      )

      setRevenue(totalRevenue)

    } catch (error) {

      console.error(error)

    }
  }

  const stats = [
    {
      label: 'Total Flights',
      value: flights.length,
      icon: '✈️',
      color: 'text-blue-400'
    },
    {
      label: 'Total Bookings',
      value: bookings.length,
      icon: '📋',
      color: 'text-green-400'
    },
    {
      label: 'Total Revenue',
      value: `₹${revenue.toLocaleString()}`,
      icon: '💰',
      color: 'text-gold-400'
    }
  ]

  return (
    <div className="flex min-h-screen bg-sky-950">

      <AdminSidebar />

      <main className="flex-1 p-8">

        <h1 className="font-heading text-3xl text-white mb-2">
          Dashboard
        </h1>

        <p className="text-white/40 text-sm mb-8">
          Welcome back, Admin 👋
        </p>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

          {stats.map((s) => (

            <div key={s.label} className="card">

              <div className="text-3xl mb-3">
                {s.icon}
              </div>

              <p className={`text-2xl font-heading ${s.color}`}>
                {s.value}
              </p>

              <p className="text-white/40 text-sm mt-1">
                {s.label}
              </p>

            </div>

          ))}

        </div>

        {/* Recent Bookings */}

        <div className="card">

          <h2 className="font-heading text-xl text-white mb-4">
            Recent Bookings
          </h2>

          {bookings.length === 0 ? (

            <p className="text-white/30 text-sm py-6 text-center">
              No bookings yet.
            </p>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>

                  <tr className="text-white/40 border-b border-white/10">

                    <th className="text-left py-2 pr-4">
                      Booking ID
                    </th>

                    <th className="text-left py-2 pr-4">
                      Passenger
                    </th>

                    <th className="text-left py-2 pr-4">
                      Route
                    </th>

                    <th className="text-left py-2 pr-4">
                      Amount
                    </th>

                    <th className="text-left py-2">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {[...bookings]
                    .slice(-5)
                    .reverse()
                    .map((b) => (

                      <tr
                        key={b.id}
                        className="border-b border-white/5 text-white/70"
                      >

                        <td className="py-3 pr-4 text-gold-400">
                          {b.id}
                        </td>

                        <td className="py-3 pr-4">
                          {b.user?.name}
                        </td>

                        <td className="py-3 pr-4">
                          {b.flight?.fromLocation}
                          <span className="mx-1">→</span>
                          {b.flight?.toLocation}
                        </td>

                        <td className="py-3 pr-4">
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

        </div>

      </main>

    </div>
  )
}