import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import Flights from '../pages/Flights.jsx'
import Booking from '../pages/Booking.jsx'
import Payment from '../pages/Payment.jsx'
import Success from '../pages/Success.jsx'

import AdminDashboard from '../pages/admin/AdminDashboard.jsx'
import AddFlight from '../pages/admin/AddFlight.jsx'
import ManageFlights from '../pages/admin/ManageFlights.jsx'
import Bookings from '../pages/admin/Bookings.jsx'
import AdminPayments from '../pages/admin/AdminPayments.jsx'

import MyBookings from '../pages/MyBookings.jsx'

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/flights" element={<Flights />} />

      {/* User Protected */}
      <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
      <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
      <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
      <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />

      {/* Admin Protected */}
      <Route path="/admin" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/add-flight" element={<ProtectedRoute role="ADMIN"><AddFlight /></ProtectedRoute>} />
      <Route path="/admin/manage-flights" element={<ProtectedRoute role="ADMIN"><ManageFlights /></ProtectedRoute>} />
      <Route path="/admin/bookings" element={<ProtectedRoute role="ADMIN"><Bookings /></ProtectedRoute>} />
      <Route path="/admin/payments" element={<ProtectedRoute role="ADMIN"><AdminPayments /></ProtectedRoute>} />

    </Routes>
  )
}