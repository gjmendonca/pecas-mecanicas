"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import type { User } from "./types"
import {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
  findUserByEmail,
  addUser,
} from "./store"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => { success: boolean; error?: string }
  register: (data: {
    name: string
    email: string
    emailConfirm: string
    password: string
    passwordConfirm: string
  }) => { success: boolean; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = getCurrentUser()
    setUser(stored)
    setIsLoading(false)
  }, [])

  const login = useCallback(
    (email: string, password: string): { success: boolean; error?: string } => {
      const found = findUserByEmail(email)
      if (!found) {
        return { success: false, error: "E-mail não encontrado." }
      }
      if (found.password !== password) {
        return { success: false, error: "Senha incorreta." }
      }
      setCurrentUser(found)
      setUser(found)
      return { success: true }
    },
    []
  )

  const register = useCallback(
    (data: {
      name: string
      email: string
      emailConfirm: string
      password: string
      passwordConfirm: string
    }): { success: boolean; error?: string } => {
      const existing = findUserByEmail(data.email)
      if (existing) {
        return { success: false, error: "Este e-mail já está cadastrado." }
      }
      addUser(data)
      return { success: true }
    },
    []
  )

  const logout = useCallback(() => {
    clearCurrentUser()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
