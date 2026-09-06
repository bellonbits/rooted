import { api } from '@/services/api'

export type PrayerEntry = {
  id: string
  topic: string
  content: string
  createdAt: string
}

export const prayerService = {
  list: () => api.get<PrayerEntry[]>('/prayer').then((r) => r.data),
  create: (topic: string, content: string) =>
    api.post<PrayerEntry>('/prayer', { topic, content }).then((r) => r.data),
}
