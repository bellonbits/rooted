import { supabase } from '@/services/supabaseClient'

export type UserProfile = {
  id: string
  name: string
  email: string
  spiritualStage: string
  interests: string[]
  notificationsEnabled: boolean
}

type ProfileRow = {
  id: string
  name: string
  email: string
  spiritual_stage: string
  interests: string[]
  notifications_enabled: boolean
}

function fromRow(row: ProfileRow): UserProfile {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    spiritualStage: row.spiritual_stage,
    interests: row.interests,
    notificationsEnabled: row.notifications_enabled,
  }
}

export const userService = {
  me: async (): Promise<UserProfile> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not signed in')

    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (error) throw error
    return fromRow(data as ProfileRow)
  },

  updateProfile: async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not signed in')

    const patch: Partial<ProfileRow> = {}
    if (updates.name !== undefined) patch.name = updates.name
    if (updates.email !== undefined) patch.email = updates.email
    if (updates.spiritualStage !== undefined) patch.spiritual_stage = updates.spiritualStage
    if (updates.interests !== undefined) patch.interests = updates.interests
    if (updates.notificationsEnabled !== undefined) patch.notifications_enabled = updates.notificationsEnabled

    const { data, error } = await supabase
      .from('profiles')
      .update(patch)
      .eq('id', user.id)
      .select('*')
      .single()
    if (error) throw error
    return fromRow(data as ProfileRow)
  },
}
