import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useBooking } from '../context/BookingContext.jsx'

export default function FlightCard({ flight }) {

  const { user } = useAuth()
  const { setSelectedFlight } = useBooking()
  const navigate = useNavigate()

  const handleBook = () => {

    if (!user) {
      navigate('/login')
      return
    }

    setSelectedFlight(flight)

    navigate('/booking')
  }

  return (
    <div className="card hover:border-gold-400/40 transition-all duration-300 group">

      <div className="flex items-center justify-between mb-4">

        <div>
          <p className="text-gold-400 font-semibold text-sm">
            {flight.airline}
          </p>

          <p className="text-white/40 text-xs">
            {flight.flightNumber}
          </p>
        </div>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            flight.seats < 15
              ? 'bg-red-500/20 text-red-400'
              : 'bg-green-500/20 text-green-400'
          }`}
        >
          {flight.seats} seats left
        </span>

      </div>

      <div className="flex items-center gap-4 mb-4">

        <div className="text-center">

          <p className="text-lg font-heading text-white">
            {flight.fromLocation}
          </p>

          <p className="text-white font-medium text-sm mt-1">
            {flight.departureTime}
          </p>

        </div>

        <div className="flex-1 flex flex-col items-center gap-1">

          <div className="w-full flex items-center gap-1">
            <div className="flex-1 h-px bg-white/20"></div>

            <span className="text-white/40 text-xs">
              ✈
            </span>

            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          <p className="text-white/30 text-xs">
            {flight.date}
          </p>

          <p className="text-white/40 text-xs mt-1">
            {flight.everyday ? 'Every day flight' : 'Alternate-day flight'}
          </p>

        </div>

        <div className="text-center">

          <p className="text-lg font-heading text-white">
            {flight.toLocation}
          </p>

          <p className="text-white font-medium text-sm mt-1">
            {flight.arrivalTime}
          </p>

        </div>

      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">

        <div>
          <span className="text-white/40 text-xs">
            from
          </span>

          <span className="text-2xl font-heading text-white ml-1">
            ₹{flight.price?.toLocaleString()}
          </span>
        </div>

        <button
          onClick={handleBook}
          className="btn-primary text-sm"
        >
          Book Now
        </button>

      </div>

    </div>
  )
}