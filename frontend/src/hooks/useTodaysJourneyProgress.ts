import { useQuery } from '@tanstack/react-query'
import { journeyService } from '@/services/journey.service'
import { JOURNEY_STEPS } from '@/constants/journeySteps'
import { useAuthStore } from '@/store/authStore'

export function useTodaysJourneyProgress() {
  const isSignedIn = useAuthStore((s) => Boolean(s.token))

  const { data: completedIds = [], isLoading } = useQuery({
    queryKey: ['todays-journey-completions'],
    queryFn: journeyService.completedStepIdsToday,
    enabled: isSignedIn,
  })

  const total = JOURNEY_STEPS.length
  const completed = completedIds.length
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  return { completedIds, total, completed, percent, isLoading }
}
