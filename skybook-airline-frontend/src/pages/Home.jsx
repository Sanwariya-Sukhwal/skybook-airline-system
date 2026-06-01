import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

export default function Home() {
  const navigate = useNavigate()

  const features = [
    {
      icon: '🔍',
      title: 'Smart Search',
      desc: 'Filter flights by city, date, and price instantly.',
      path: '/flights'
    },
    {
      icon: '💺',
      title: 'Easy Booking',
      desc: 'Book in just a few clicks with secure payments.',
      path: '/flights'
    },
    {
      icon: '📱',
      title: 'Instant Confirmation',
      desc: 'Get your booking ID right away, no waiting.',
      path: '/my-bookings'
    }
  ]

  return (
    <div className="min-h-screen bg-sky-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-40 left-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-gold-400 text-sm font-medium tracking-widest uppercase mb-4">
            Your Journey Starts Here
          </p>

          <h1 className="text-5xl md:text-7xl font-heading text-white mb-6 leading-tight">
            Fly to Your
            <br />
            <span className="gold-text">
              Dream Destination
            </span>
          </h1>

          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Search hundreds of flights, compare prices, and book your next adventure in minutes.
          </p>

          <button
            onClick={() => navigate('/flights')}
            className="btn-primary text-base px-10 py-3 text-lg"
          >
            Search Flights ✈️
          </button>
        </div>

      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 pb-20 grid md:grid-cols-3 gap-6">

        {features.map((f) => (

          <div
            key={f.title}
            onClick={() => navigate(f.path)}
            className="card text-center cursor-pointer hover:border-gold-400/40 hover:scale-105 transition-all duration-300"
          >

            <div className="text-4xl mb-4">
              {f.icon}
            </div>

            <h3 className="font-heading text-white text-lg mb-2">
              {f.title}
            </h3>

            <p className="text-white/40 text-sm">
              {f.desc}
            </p>

          </div>

        ))}

      </section>

      {/* Popular Routes */}
      <section className="max-w-5xl mx-auto px-4 pb-20">

        <h2 className="font-heading text-2xl text-white mb-6 text-center">
          Popular Routes
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {[
            ['Mumbai', 'Delhi'],
            ['Delhi', 'Bangalore'],
            ['Bangalore', 'Goa'],
            ['Mumbai', 'Kolkata'],
          ].map(([from, to]) => (

            <button
              key={from + to}
              onClick={() => navigate('/flights')}
              className="card text-center hover:border-gold-400/40 transition-colors"
            >

              <p className="text-white font-medium text-sm">
                {from}
              </p>

              <p className="text-gold-400 text-lg my-1">
                →
              </p>

              <p className="text-white font-medium text-sm">
                {to}
              </p>

            </button>

          ))}

        </div>

      </section>

    </div>
  )
}