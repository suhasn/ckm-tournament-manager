import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, TokenResponse } from '@/types/user'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (response: TokenResponse) => void
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()()
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (response: TokenResponse) => {
        set({ token: response.access_token, isAuthenticated: true })
      },
      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-store',
    }
  )
