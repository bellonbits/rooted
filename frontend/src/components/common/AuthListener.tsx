import { useEffect } from 'react'
import { supabase } from '@/services/supabaseClient'
import { useAuthStore } from '@/store/authStore'

// Keeps authStore's token/isGuest in sync with Supabase's own session
// (which auto-refreshes) instead of trusting the persisted zustand copy
// indefinitely.
export function AuthListener() {
  const setSession = useAuthStore((s) => s.setSession)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.subscription.unsubscribe()
  }, [setSession])

  return null
}
