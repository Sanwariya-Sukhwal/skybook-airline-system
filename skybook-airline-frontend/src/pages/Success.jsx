import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

export default function Success() {

  const { state } = useLocation()

  const navigate = useNavigate()

  const booking = state?.booking

  const passengerInfo = state?.passengerInfo

  if (!booking) {
    return (
      <div className="min-h-screen bg-sky-950">

        <Navbar />

        <div className="pt-28 text-center">

          <p className="text-white/50 mb-4">
            No booking found.
          </p>

          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go Home
          </button>

        </div>

      </div>
    )
  }

  const f = booking.flight

  const taxes = Math.round(f.price * 0.18)

  const total = f.price + taxes

  return (
    <div className="min-h-screen bg-sky-950">

      <Navbar />

      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">

        {/* Success Banner */}
        <div className="text-center mb-8">

          <div className="text-6xl mb-4">
            🎉
          </div>

          <h1 className="font-heading text-4xl text-white mb-2">
            Booking Confirmed!
          </h1>

          <p className="text-white/50">
            Your ticket has been booked successfully.
          </p>

        </div>

        {/* Ticket Card */}
        <div className="card border border-gold-400/30">

          {/* Booking ID */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">

            <div>
              <p className="text-white/40 text-xs">
                Booking ID
              </p>

              <p className="text-gold-400 font-semibold text-lg">
                {booking.id}
              </p>
            </div>

            <span className="bg-green-500/20 text-green-400 text-sm px-3 py-1 rounded-full">
              ✓ Confirmed
            </span>

          </div>

          {/* Flight Route */}
          <div className="flex items-center gap-4 mb-6">

            <div className="text-center">

              <p className="text-2xl font-heading text-white">
                {f.fromLocation}
              </p>

              <p className="text-white font-medium mt-1">
                {f.departureTime}
              </p>

            </div>

            <div className="flex-1 flex flex-col items-center">

              <div className="w-full flex items-center gap-1">

                <div className="flex-1 h-px bg-white/20"></div>

                <span className="text-gold-400 text-sm">
                  ✈
                </span>

                <div className="flex-1 h-px bg-white/20"></div>

              </div>

              <p className="text-white/30 text-xs mt-1">
                {f.airline}
              </p>

            </div>

            <div className="text-center">

              <p className="text-2xl font-heading text-white">
                {f.toLocation}
              </p>

              <p className="text-white font-medium mt-1">
                {f.arrivalTime}
              </p>

            </div>

          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white/5 rounded-xl">

            <div>
              <p className="text-white/40 text-xs mb-1">
                Passenger
              </p>

              <p className="text-white font-medium">
                {passengerInfo?.name || booking.user?.name}
              </p>
            </div>

            <div>
              <p className="text-white/40 text-xs mb-1">
                Date
              </p>

              <p className="text-white font-medium">
                {f.date}
              </p>
            </div>

            <div>
              <p className="text-white/40 text-xs mb-1">
                Airline
              </p>

              <p className="text-white font-medium">
                {f.airline}
              </p>
            </div>

            <div>
              <p className="text-white/40 text-xs mb-1">
                Flight Number
              </p>

              <p className="text-white font-medium">
                {f.flightNumber}
              </p>
            </div>

          </div>

          {/* Amount */}
          <div className="flex justify-between items-center pt-4 border-t border-white/10">

            <p className="text-white/50 text-sm">
              Total Paid
            </p>

            <p className="text-2xl font-heading text-gold-400">
              ₹{total.toLocaleString()}
            </p>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">

          <button
            onClick={() => navigate('/')}
            className="btn-outline flex-1"
          >
            Back to Home
          </button>

          <button
            onClick={() => navigate('/flights')}
            className="btn-primary flex-1"
          >
            Book Another Flight
          </button>

        </div>

      </div>

    </div>
  )
}