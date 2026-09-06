import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type OnboardingState = {
  spiritualStage: string
  interests: string[]
  notificationsEnabled: boolean
  setSpiritualStage: (stage: string) => void
  toggleInterest: (interest: string) => void
  setNotificationsEnabled: (enabled: boolean) => void
  reset: () => void
}

const initial = {
  spiritualStage: 'growing',
  interests: [] as string[],
  notificationsEnabled: true,
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initial,
      setSpiritualStage: (stage) => set({ spiritualStage: stage }),
      toggleInterest: (interest) =>
        set((state) => ({
          interests: state.interests.includes(interest)
            ? state.interests.filter((i) => i !== interest)
            : [...state.interests, interest],
        })),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      reset: () => set(initial),
    }),
    { name: 'rooted-onboarding' },
  ),
)
