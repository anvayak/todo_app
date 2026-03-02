'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface User {
  id: string
  name: string
  email: string
  contact: string
  profession: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signup: (userData: Omit<User, 'id'>) => void
  login: (email: string, password: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signup = (userData: Omit<User, 'id'>) => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    
    if (existingUsers.some((u: any) => u.email === userData.email)) {
      throw new Error('Email already registered')
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    }

    existingUsers.push({
      ...newUser,
      password: userData.email + 'password', // Simple password hash for demo
    })

    localStorage.setItem('users', JSON.stringify(existingUsers))
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
  }

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find((u: any) => u.email === email)

    if (!foundUser) {
      throw new Error('User not found')
    }

    if (foundUser.password !== email + 'password') {
      throw new Error('Invalid password')
    }

    const { password: _, ...userWithoutPassword } = foundUser
    localStorage.setItem('user', JSON.stringify(userWithoutPassword))
    setUser(userWithoutPassword)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
