import { supabase } from '@/services/supabaseClient'

export const authService = {
  register: async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    if (!data.user) throw new Error('Sign up did not return a user')

    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      name,
      email,
    })
    if (profileError) throw profileError

    return data.session
  },

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data.session
  },
}
