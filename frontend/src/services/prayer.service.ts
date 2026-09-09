import { supabase } from '@/services/supabaseClient'
import { recordActivity } from '@/services/activity.service'

export type PrayerEntry = {
  id: string
  topic: string
  content: string
  createdAt: string
  joinedByMe: boolean
}

export const prayerService = {
  list: async (): Promise<PrayerEntry[]> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data: posts, error } = await supabase
      .from('prayer_wall_posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error

    let joinedIds = new Set<string>()
    if (user) {
      const { data: intercessions } = await supabase
        .from('prayer_intercessions')
        .select('prayer_id')
        .eq('user_id', user.id)
      joinedIds = new Set((intercessions ?? []).map((i) => i.prayer_id as string))
    }

    return (posts ?? []).map((p) => ({
      id: p.id as string,
      topic: p.topic as string,
      content: p.content as string,
      createdAt: p.created_at as string,
      joinedByMe: joinedIds.has(p.id as string),
    }))
  },

  create: async (topic: string, content: string): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not signed in')

    const { error } = await supabase.from('prayer_wall_posts').insert({ user_id: user.id, topic, content })
    if (error) throw error

    await recordActivity()
  },

  toggleIntercession: async (prayerId: string, joined: boolean): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not signed in')

    if (joined) {
      const { error } = await supabase
        .from('prayer_intercessions')
        .insert({ user_id: user.id, prayer_id: prayerId })
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('prayer_intercessions')
        .delete()
        .eq('user_id', user.id)
        .eq('prayer_id', prayerId)
      if (error) throw error
    }
  },
}
