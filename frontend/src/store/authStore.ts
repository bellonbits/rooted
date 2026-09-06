import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile } from '@/services/user.service'

type AuthState = {
  token: string | null
  user: UserProfile | null
  isGuest: boolean
  setToken: (token: string) => void
  setUser: (user: UserProfile) => void
  continueAsGuest: () => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isGuest: false,
      setToken: (token) => set({ token, isGuest: false }),
      setUser: (user) => set({ user }),
      continueAsGuest: () => set({ isGuest: true, token: null, user: null }),
      logout: () => set({ token: null, user: null, isGuest: false }),
    }),
    { name: 'rooted-auth' },
  ),
)
