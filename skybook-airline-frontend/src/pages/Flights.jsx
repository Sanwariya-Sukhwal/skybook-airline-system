import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import FlightCard from '../components/FlightCard.jsx'
import api from '../services/api'

export default function Flights() {
  const [searchParams] = useSearchParams()

  const routeFrom = searchParams.get('from') || ''
  const routeTo = searchParams.get('to') || ''

  const [from, setFrom] = useState(routeFrom)
  const [to, setTo] = useState(routeTo)
  const [date, setDate] = useState('')

  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const fetchFlights = async () => {
    setLoading(true)

    try {
      const response = await api.get(
        `/flights/page?page=${page}&size=5&sortBy=price`
      )

      setResults(response.data.content)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error(error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const searchFlights = async (fromValue, toValue) => {
    setLoading(true)

    try {
      const response = await api.get(
        `/flights/search?from=${encodeURIComponent(fromValue)}&to=${encodeURIComponent(toValue)}`
      )

      setResults(response.data)
      setSearched(true)
      setTotalPages(0)
    } catch (error) {
      console.error(error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (routeFrom || routeTo) {
      setFrom(routeFrom)
      setTo(routeTo)
      searchFlights(routeFrom, routeTo)
    } else {
      fetchFlights()
    }
  }, [routeFrom, routeTo])

  useEffect(() => {
    if (!searched && !routeFrom && !routeTo) {
      fetchFlights()
    }
  }, [page])

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!from.trim() && !to.trim()) {
      setSearched(false)
      setPage(0)
      return
    }

    await searchFlights(from.trim(), to.trim())
  }

  const handleClear = () => {
    setFrom('')
    setTo('')
    setDate('')
    setSearched(false)
    setPage(0)
  }

  return (
    <div className="min-h-screen bg-sky-950">
      <Navbar />

      <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto">
        <h1 className="font-heading text-3xl text-white mb-8 text-center">
          Search Flights
        </h1>

        <div className="card mb-8">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <label className="text-white/50 text-xs mb-1 block">
                From
              </label>

              <input
                type="text"
                className="input-field"
                placeholder="e.g. Mumbai"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label className="text-white/50 text-xs mb-1 block">
                To
              </label>

              <input
                type="text"
                className="input-field"
                placeholder="e.g. Delhi"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label className="text-white/50 text-xs mb-1 block">
                Date
              </label>

              <input
                type="date"
                className="input-field"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>

              {searched && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn-outline"
                  disabled={loading}
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-white/40 text-sm">
            {loading
              ? 'Loading flights...'
              : `${results.length} flight${results.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {loading ? (
          <div className="card text-center py-16">
            <div className="flex justify-center mb-4">
              <div className="w-8 h-8 border-2 border-white/20 border-t-gold-400 rounded-full animate-spin"></div>
            </div>

            <p className="text-white/50">
              Loading flights...
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-5xl mb-4">
              🔍
            </p>

            <p className="text-white/50">
              No flights found for your search.
            </p>

            <button
              onClick={handleClear}
              className="btn-outline mt-4"
            >
              Show All Flights
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {results.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                />
              ))}
            </div>

            {!searched && totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0 || loading}
                  className="btn-outline"
                >
                  Previous
                </button>

                <span className="text-white">
                  Page {page + 1} of {totalPages}
                </span>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page + 1 >= totalPages || loading}
                  className="btn-primary"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}