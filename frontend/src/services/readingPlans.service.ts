import { supabase } from '@/services/supabaseClient'
import { recordActivity } from '@/services/activity.service'

export type PlanProgress = {
  planId: string
  progressPercent: number
  isCurrent: boolean
}

export const readingPlansService = {
  listProgress: async (): Promise<PlanProgress[]> => {
    const { data, error } = await supabase
      .from('reading_plan_progress')
      .select('plan_id, progress_percent, is_current')
    if (error) throw error
    return (data ?? []).map((r) => ({
      planId: r.plan_id as string,
      progressPercent: r.progress_percent as number,
      isCurrent: r.is_current as boolean,
    }))
  },

  startPlan: async (planId: string): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not signed in')

    // Only one plan is "current" at a time.
    const { error: clearError } = await supabase
      .from('reading_plan_progress')
      .update({ is_current: false })
      .eq('user_id', user.id)
      .eq('is_current', true)
    if (clearError) throw clearError

    const { error } = await supabase.from('reading_plan_progress').upsert(
      { user_id: user.id, plan_id: planId, is_current: true, progress_percent: 0 },
      { onConflict: 'user_id,plan_id' },
    )
    if (error) throw error

    await recordActivity()
  },
}
