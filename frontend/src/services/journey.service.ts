import { supabase } from '@/services/supabaseClient'
import { recordActivity } from '@/services/activity.service'

function todayDate() {
  return new Date().toISOString().slice(0, 10)
}

export const journeyService = {
  completedStepIdsToday: async (): Promise<number[]> => {
    const { data, error } = await supabase
      .from('daily_step_completions')
      .select('step_id')
      .eq('journey_date', todayDate())
    if (error) throw error
    return (data ?? []).map((r) => r.step_id as number)
  },

  setStepCompleted: async (stepId: number, completed: boolean): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not signed in')
    const journeyDate = todayDate()

    if (completed) {
      const { error } = await supabase
        .from('daily_step_completions')
        .upsert(
          { user_id: user.id, step_id: stepId, journey_date: journeyDate },
          { onConflict: 'user_id,step_id,journey_date' },
        )
      if (error) throw error
      await recordActivity()
    } else {
      const { error } = await supabase
        .from('daily_step_completions')
        .delete()
        .eq('user_id', user.id)
        .eq('step_id', stepId)
        .eq('journey_date', journeyDate)
      if (error) throw error
    }
  },

  setAllCompleted: async (stepIds: number[]): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not signed in')
    const journeyDate = todayDate()

    const rows = stepIds.map((id) => ({ user_id: user.id, step_id: id, journey_date: journeyDate }))
    const { error } = await supabase
      .from('daily_step_completions')
      .upsert(rows, { onConflict: 'user_id,step_id,journey_date' })
    if (error) throw error
    await recordActivity()
  },
}
