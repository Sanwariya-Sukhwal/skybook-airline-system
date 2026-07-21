import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../components/AdminSidebar.jsx'
import api from '../../services/api'

export default function ManageFlights() {

  const [flights, setFlights] = useState([])
  const [editId, setEditId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const load = async () => {

    try {

      const response = await api.get('/flights')

      setFlights(response.data)

    } catch (error) {

      console.error(error)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id) => {

    if (!window.confirm('Delete this flight?'))
      return

    try {

      await api.delete(`/flights/${id}`)

      load()

    } catch (error) {

      console.error(error)
    }
  }

  const startEdit = (flight) => {

    setEditId(flight.id)

    setEditForm({
      ...flight
    })
  }

  const handleEditChange = (e) => {
    const { name, type, value, checked } = e.target

    setEditForm({
      ...editForm,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSave = async () => {

    try {

      await api.put(`/flights/${editId}`, {

        airline: editForm.airline,
        flightNumber: editForm.flightNumber,
        fromLocation: editForm.fromLocation,
        toLocation: editForm.toLocation,
        date: editForm.date,
        departureTime: editForm.departureTime,
        arrivalTime: editForm.arrivalTime,
        price: Number(editForm.price),
        seats: Number(editForm.seats),
        everyday: Boolean(editForm.everyday)

      })

      setEditId(null)

      load()

    } catch (error) {

      console.error(error)
    }
  }

  return (
    <div className="flex min-h-screen bg-sky-950">

      <AdminSidebar />

      <main className="flex-1 p-8">

        <h1 className="font-heading text-3xl text-white mb-2">
          Manage Flights
        </h1>

        <p className="text-white/40 text-sm mb-8">
          {flights.length} flights in system
        </p>

        <div className="space-y-4">

          {flights.map((flight) =>
            editId === flight.id ? (

              <div
                key={flight.id}
                className="card border border-gold-400/30"
              >

                <p className="text-gold-400 text-sm font-semibold mb-4">
                  Editing Flight #{flight.id}
                </p>

                <div className="grid md:grid-cols-3 gap-3">

                  {[
                    ['airline', 'Airline'],
                    ['flightNumber', 'Flight Number'],
                    ['fromLocation', 'From Location'],
                    ['toLocation', 'To Location'],
                    ['date', 'Date'],
                    ['departureTime', 'Departure Time'],
                    ['arrivalTime', 'Arrival Time'],
                    ['price', 'Price (₹)'],
                    ['seats', 'Seats']
                  ].map(([name, label]) => (

                    <div key={name}>

                      <label className="text-white/50 text-xs mb-1 block">
                        {label}
                      </label>

                      <input
                        name={name}
                        className="input-field text-sm"
                        value={editForm[name] || ''}
                        onChange={handleEditChange}
                      />

                    </div>

                  ))}

                  <div className="flex items-center gap-3">
                    <input
                      id="edit-everyday"
                      name="everyday"
                      type="checkbox"
                      checked={Boolean(editForm.everyday)}
                      onChange={handleEditChange}
                      className="h-5 w-5 rounded"
                    />
                    <label htmlFor="edit-everyday" className="text-white/80 text-sm">
                      Operates every day
                    </label>
                  </div>

                </div>

                <div className="flex items-center gap-3 mt-4">
                  <input
                    id="edit-everyday"
                    name="everyday"
                    type="checkbox"
                    checked={Boolean(editForm.everyday)}
                    onChange={handleEditChange}
                    className="h-5 w-5 rounded"
                  />
                  <label htmlFor="edit-everyday" className="text-white/80 text-sm">
                    Operates Every Day
                  </label>
                </div>

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={handleSave}
                    className="btn-primary text-sm"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={() => setEditId(null)}
                    className="btn-outline text-sm"
                  >
                    Cancel
                  </button>

                </div>

              </div>

            ) : (

              <div
                key={flight.id}
                className="card flex items-center justify-between gap-4"
              >

                <div className="flex items-center gap-6">

                  <div>
                    <p className="text-gold-400 text-sm font-semibold">
                      {flight.airline}
                    </p>

                    <p className="text-white/40 text-xs">
                      {flight.flightNumber}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-white font-heading text-lg">
                      {flight.fromLocation}
                    </p>
                  </div>

                  <div className="text-white/30 text-sm">
                    →
                  </div>

                  <div className="text-center">
                    <p className="text-white font-heading text-lg">
                      {flight.toLocation}
                    </p>
                  </div>

                  <div>
                    <p className="text-white text-sm">
                      {flight.date}
                    </p>

                    <p className="text-white/40 text-xs">
                      {flight.departureTime} - {flight.arrivalTime}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="text-right">

                    <p className="text-white font-semibold">
                      ₹{Number(flight.price).toLocaleString()}
                    </p>

                    <p className="text-white/40 text-xs">
                      {flight.seats} seats
                    </p>

                  </div>

                  <button
                    onClick={() => startEdit(flight)}
                    className="btn-outline text-sm py-1.5 px-4"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(flight.id)}
                    className="text-red-400 border border-red-400/40 text-sm px-4 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                  >
                    Delete
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </main>

    </div>
  )
}