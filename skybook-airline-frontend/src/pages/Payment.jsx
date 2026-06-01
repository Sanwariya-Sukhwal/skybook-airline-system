import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { useBooking } from '../context/BookingContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../services/api'

export default function Payment() {

  const { selectedFlight, passengerInfo, clearBooking } = useBooking()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [cardName, setCardName] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [loading, setLoading] = useState(false)

  if (!selectedFlight || !passengerInfo) {
    return (
      <div className="min-h-screen bg-sky-950">
        <Navbar />

        <div className="pt-28 text-center">
          <p className="text-white/50 mb-4">
            Session expired. Please start again.
          </p>

          <button
            onClick={() => navigate('/flights')}
            className="btn-primary"
          >
            Browse Flights
          </button>
        </div>
      </div>
    )
  }

  const handlePay = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      // Create Booking

      const bookingResponse = await api.post(
        '/bookings',
        {
          user: {
            id: user.id
          },

          flight: {
            id: selectedFlight.id
          },

          passengers: 1,

          createdAt: new Date()
            .toISOString()
            .split('T')[0],

          status: 'PENDING'
        }
      )

      const booking = bookingResponse.data

      // Create Payment

      await api.post(
        '/payments',
        {
          booking: {
            id: booking.id
          },

          amount: selectedFlight.price,

          paymentMode: 'CARD',

          status: 'SUCCESS'
        }
      )

      clearBooking()

      navigate(
        '/success',
        {
          state: {
            booking,
            passengerInfo
          }
        }
      )

    } catch (error) {

      console.error(error)

      alert('Payment Failed')

    } finally {

      setLoading(false)
    }
  }

  const f = selectedFlight

  const taxes = Math.round(f.price * 0.18)

  const total = f.price + taxes

  return (
    <div className="min-h-screen bg-sky-950">

      <Navbar />

      <div className="pt-24 pb-16 px-4 max-w-3xl mx-auto">

        <h1 className="font-heading text-3xl text-white mb-8">
          Payment
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Order Summary */}

          <div className="card h-fit">

            <h3 className="font-heading text-lg text-white mb-4">
              Order Summary
            </h3>

            <div className="space-y-2 text-sm">

              <div className="flex justify-between">
                <span className="text-white/50">Flight</span>
                <span className="text-white">
                  {f.fromLocation} → {f.toLocation}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/50">Airline</span>
                <span className="text-white">{f.airline}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/50">Passenger</span>
                <span className="text-white">{passengerInfo.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/50">Date</span>
                <span className="text-white">{f.date}</span>
              </div>

              <hr className="border-white/10 my-3" />

              <div className="flex justify-between">
                <span className="text-white/50">Base Fare</span>
                <span className="text-white">
                  ₹{f.price.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/50">Taxes (18%)</span>
                <span className="text-white">
                  ₹{taxes.toLocaleString()}
                </span>
              </div>

              <hr className="border-white/10 my-3" />

              <div className="flex justify-between text-base font-semibold">
                <span className="text-white">Total</span>
                <span className="text-gold-400">
                  ₹{total.toLocaleString()}
                </span>
              </div>

            </div>

          </div>

          {/* Payment Form */}

          <div className="card">

            <h3 className="font-heading text-lg text-white mb-4">Card Details</h3>

            <p className="text-white/30 text-xs mb-4 bg-white/5 px-3 py-2 rounded-lg">
              Demo Payment Gateway
            </p>

            <form onSubmit={handlePay} className="space-y-4">

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Cardholder Name</label>

                <input
                  type="text"
                  className="input-field"
                  placeholder="Name on Card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Card Number</label>

                <input
                  type="text"
                  className="input-field"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={cardNum}
                  onChange={(e) => setCardNum(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="text-white/60 text-sm mb-1.5 block">Expiry</label>

                  <input
                    type="text"
                    className="input-field"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-1.5 block">CVV</label>

                  <input
                    type="password"
                    className="input-field"
                    placeholder="123"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>

              </div>

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={loading}
              >
                {loading
                  ? 'Processing Payment...'
                  : `Pay ₹${total.toLocaleString()}`
                }
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  )
}