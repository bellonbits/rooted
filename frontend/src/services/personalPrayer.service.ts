import { supabase } from '@/services/supabaseClient'
import { recordActivity } from '@/services/activity.service'

export type PersonalPrayer = {
  id: string
  text: string
  category: string
  date: string
  answered: boolean
}

type PrayerRow = {
  id: string
  text: string
  category: string
  answered: boolean
  created_at: string
}

function fromRow(row: PrayerRow): PersonalPrayer {
  const createdAt = new Date(row.created_at)
  const isToday = createdAt.toDateString() === new Date().toDateString()
  return {
    id: row.id,
    text: row.text,
    category: row.category,
    date: isToday
      ? 'Today'
      : createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    answered: row.answered,
  }
}

export const personalPrayerService = {
  list: async (): Promise<PersonalPrayer[]> => {
    const { data, error } = await supabase
      .from('personal_prayers')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data as PrayerRow[]).map(fromRow)
  },

  create: async (text: string, category: string): Promise<PersonalPrayer> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not signed in')

    const { data, error } = await supabase
      .from('personal_prayers')
      .insert({ user_id: user.id, text, category })
      .select('*')
      .single()
    if (error) throw error

    await recordActivity()
    return fromRow(data as PrayerRow)
  },

  toggleAnswered: async (id: string, answered: boolean): Promise<void> => {
    const { error } = await supabase.from('personal_prayers').update({ answered }).eq('id', id)
    if (error) throw error
  },
}
