import { useQuery } from '@tanstack/react-query'
import { bibleService, type DailyVerse } from '@/services/bible.service'
import { useBibleStore } from '@/store/bibleStore'

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

// The verse of the day: fetched live from bible-api.com's random-verse
// endpoint, then cached in localStorage per translation+date so it stays
// the same verse all day (and across reloads) instead of changing on every
// visit or every render.
export function useDailyVerse() {
  const translation = useBibleStore((s) => s.translation)
  const dateKey = todayKey()

  return useQuery({
    queryKey: ['daily-verse', translation, dateKey],
    queryFn: async (): Promise<DailyVerse> => {
      const cacheKey = `rooted-daily-verse:${translation}:${dateKey}`
      const cached = localStorage.getItem(cacheKey)
      if (cached) return JSON.parse(cached) as DailyVerse

      const verse = await bibleService.fetchRandomVerse(translation)
      localStorage.setItem(cacheKey, JSON.stringify(verse))
      return verse
    },
    staleTime: Infinity,
    retry: 1,
  })
}
