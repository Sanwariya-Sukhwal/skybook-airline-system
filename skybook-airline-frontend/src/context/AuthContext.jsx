import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser')
    return saved ? JSON.parse(saved) : null
  })

  const saveUser = (u) => {
    setUser(u)
    localStorage.setItem('currentUser', JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <AuthContext.Provider value={{ user, saveUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — easy to use in any component
export const useAuth = () => useContext(AuthContext)
