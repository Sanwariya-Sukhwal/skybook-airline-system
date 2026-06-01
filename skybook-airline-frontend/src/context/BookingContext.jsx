import React, { createContext, useContext, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [passengerInfo, setPassengerInfo] = useState(null)

  const clearBooking = () => {
    setSelectedFlight(null)
    setPassengerInfo(null)
  }

  return (
    <BookingContext.Provider value={{ selectedFlight, setSelectedFlight, passengerInfo, setPassengerInfo, clearBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => useContext(BookingContext)
