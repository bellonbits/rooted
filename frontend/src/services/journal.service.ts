import { supabase } from '@/services/supabaseClient'
import { recordActivity } from '@/services/activity.service'

export type JournalEntry = {
  id: string
  date: string
  verse: string
  highlight: string
  learning: string
  prayer: string
}

type JournalRow = {
  id: string
  verse: string
  highlight: string
  learning: string
  prayer: string
  created_at: string
}

function fromRow(row: JournalRow): JournalEntry {
  return {
    id: row.id,
    date: new Date(row.created_at).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    verse: row.verse,
    highlight: row.highlight,
    learning: row.learning,
    prayer: row.prayer,
  }
}

export const journalService = {
  list: async (): Promise<JournalEntry[]> => {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data as JournalRow[]).map(fromRow)
  },

  create: async (entry: {
    verse: string
    highlight: string
    learning: string
    prayer: string
  }): Promise<JournalEntry> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not signed in')

    const { data, error } = await supabase
      .from('journal_entries')
      .insert({ user_id: user.id, ...entry })
      .select('*')
      .single()
    if (error) throw error

    await recordActivity()
    return fromRow(data as JournalRow)
  },
}
