import { supabase } from '@/services/supabaseClient'
import { recordActivity } from '@/services/activity.service'

export const coursesService = {
  completedLessonIds: async (): Promise<number[]> => {
    const { data, error } = await supabase.from('lesson_completions').select('lesson_id')
    if (error) throw error
    return (data ?? []).map((r) => r.lesson_id as number)
  },

  setLessonCompleted: async (lessonId: number, completed: boolean): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Not signed in')

    if (completed) {
      const { error } = await supabase
        .from('lesson_completions')
        .upsert({ user_id: user.id, lesson_id: lessonId }, { onConflict: 'user_id,lesson_id' })
      if (error) throw error
      await recordActivity()
    } else {
      const { error } = await supabase
        .from('lesson_completions')
        .delete()
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
      if (error) throw error
    }
  },
}
