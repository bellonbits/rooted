import { api } from '@/services/api'

export type UserProfile = {
  id: string
  name: string
  email: string
  spiritualStage: string
  interests: string[]
  notificationsEnabled: boolean
}

export const userService = {
  me: () => api.get<UserProfile>('/users/me').then((r) => r.data),

  updateProfile: (updates: Partial<UserProfile>) =>
    api.patch<UserProfile>('/users/me', updates).then((r) => r.data),
}
