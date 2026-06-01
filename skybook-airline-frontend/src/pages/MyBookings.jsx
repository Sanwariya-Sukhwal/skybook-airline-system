import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function MyBookings() {

  const { user } = useAuth()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (user) {
      fetchBookings()
    }

  }, [user])

  const fetchBookings = async () => {

    try {

      const response = await api.get(
        `/bookings/user/${user.id}`
      )

      setBookings(response.data)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  const cancelBooking = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to cancel this booking?'
    )

    if (!confirmDelete) return

    try {

      await api.delete(
        `/bookings/${id}`
      )

      fetchBookings()

    } catch (error) {

      console.error(error)

      alert('Failed to cancel booking')
    }
  }

  return (
    <div className="min-h-screen bg-sky-950">

      <Navbar />

      <div className="pt-24 pb-16 px-6 max-w-5xl mx-auto">

        <h1 className="font-heading text-3xl text-white mb-8">
          My Bookings
        </h1>

        {loading ? (

          <div className="text-center text-white/50">
            Loading bookings...
          </div>

        ) : bookings.length === 0 ? (

          <div className="card text-center py-12">

            <p className="text-5xl mb-4">✈️</p>

            <p className="text-white/50">
              No bookings found.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {bookings.map((booking) => {

              const flight = booking.flight

              return (

                <div
                  key={booking.id}
                  className="card"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <h3 className="text-gold-400 font-semibold text-lg">
                        Booking #{booking.id}
                      </h3>

                      <p className="text-white mt-2">
                        Airline : {flight?.airline}
                      </p>

                      <p className="text-white/70">
                        Flight No : {flight?.flightNumber}
                      </p>

                      <p className="text-white/70">
                        Route : {flight?.fromLocation} → {flight?.toLocation}
                      </p>

                      <p className="text-white/70">
                        Date : {flight?.date}
                      </p>

                      <p className="text-white/70">
                        Time : {flight?.departureTime} - {flight?.arrivalTime}
                      </p>

                      <p className="text-white/70">
                        Price : ₹{flight?.price?.toLocaleString()}
                      </p>

                      <p className="mt-2">
                        Status :
                        <span
                          className={`ml-2 font-semibold ${
                            booking.status === 'BOOKED'
                              ? 'text-green-400'
                              : booking.status === 'PENDING'
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </p>

                    </div>

                    <div>

                      {booking.status !== 'CANCELLED' && (

                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="btn-outline"
                        >
                          Cancel Booking
                        </button>

                      )}

                    </div>

                  </div>

                </div>

              )
            })}

          </div>

        )}

      </div>

    </div>
  )
}