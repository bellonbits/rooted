import { supabase } from '@/services/supabaseClient'

// Marks "the signed-in user did something spiritually meaningful today" —
// upserted from every write across journal/prayer/lessons/journey so
// Progress.tsx can compute a real streak and activity grid.
export async function recordActivity() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('activity_log')
    .upsert(
      { user_id: user.id, activity_date: new Date().toISOString().slice(0, 10) },
      { onConflict: 'user_id,activity_date' },
    )
}
