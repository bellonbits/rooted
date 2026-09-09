import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Session } from '@supabase/supabase-js'
import type { UserProfile } from '@/services/user.service'

type AuthState = {
  token: string | null
  user: UserProfile | null
  isGuest: boolean
  setSession: (session: Session | null) => void
  setUser: (user: UserProfile) => void
  continueAsGuest: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isGuest: false,
      setSession: (session) =>
        set({
          token: session?.access_token ?? null,
          isGuest: session?.user?.is_anonymous ?? false,
          ...(session ? {} : { user: null }),
        }),
      setUser: (user) => set({ user }),
      continueAsGuest: async () => {
        const { supabase } = await import('@/services/supabaseClient')
        const { data, error } = await supabase.auth.signInAnonymously()
        if (error) throw error
        set({ token: data.session?.access_token ?? null, isGuest: true, user: null })
      },
      logout: async () => {
        const { supabase } = await import('@/services/supabaseClient')
        await supabase.auth.signOut()
        set({ token: null, user: null, isGuest: false })
      },
    }),
    { name: 'rooted-auth' },
  ),
)
