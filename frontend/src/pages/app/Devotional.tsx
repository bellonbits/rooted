import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { ChevronLeft, Share2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useDailyVerse } from '@/hooks/useDailyVerse'
import { bibleService } from '@/services/bible.service'
import { useBibleStore } from '@/store/bibleStore'
import { slugify } from '@/constants/bible'

const REFLECTION_PROMPTS = [
  'What is God saying to you through these words today?',
  'Is there something here to be thankful for, or something to bring to Him in prayer?',
]

export function Devotional() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const translation = useBibleStore((s) => s.translation)
  const { data: verse, isLoading, isError } = useDailyVerse()

  async function getAnotherVerse() {
    const fresh = await bibleService.fetchRandomVerse(translation)
    const dateKey = new Date().toISOString().slice(0, 10)
    localStorage.setItem(`rooted-daily-verse:${translation}:${dateKey}`, JSON.stringify(fresh))
    queryClient.setQueryData(['daily-verse', translation, dateKey], fresh)
  }

  return (
    <div>
      <header className="flex h-14 shrink-0 items-center justify-between px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-forest-900/5"
          aria-label="Back"
        >
          <ChevronLeft className="h-5.5 w-5.5 text-forest-900" />
        </button>
        <h1 className="font-serif text-base text-forest-900">Daily Devotional</h1>
        <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-forest-900/5" aria-label="Share">
          <Share2 className="h-4 w-4 text-forest-900" />
        </button>
      </header>

      <div className="mx-auto max-w-2xl px-5 pb-10 md:px-8">
        <div className="mb-5 aspect-[16/10] overflow-hidden rounded-3xl">
          <img src="/images/bible-sunrise.jpg" alt="" className="h-full w-full object-cover" />
        </div>

        <div className="mb-3 rounded-xl border border-mint-100 bg-mint-100/40 p-4">
          {isLoading ? (
            <div className="flex flex-col gap-2 py-1">
              <div className="h-3.5 w-24 animate-pulse rounded-full bg-forest-900/10" />
              <div className="h-4 w-full animate-pulse rounded-full bg-forest-900/10" />
              <div className="h-4 w-2/3 animate-pulse rounded-full bg-forest-900/10" />
            </div>
          ) : isError || !verse ? (
            <p className="text-sm text-ink-700">Couldn't load today's verse. Check your connection and reopen this page.</p>
          ) : (
            <>
              <p className="mb-1.5 text-[11px] font-medium tracking-wide text-forest-800">{verse.reference.toUpperCase()}</p>
              <p className="font-serif text-[15px] italic leading-relaxed text-forest-900">“{verse.text}”</p>
            </>
          )}
        </div>

        {verse && (
          <button
            onClick={() => navigate(`/app/bible/${slugify(verse.book)}/${verse.chapter}`)}
            className="mb-6 text-xs font-semibold text-forest-800 underline underline-offset-2"
          >
            Read {verse.book} {verse.chapter} in full
          </button>
        )}

        <h2 className="mb-3 font-serif text-xl text-forest-900">Today's Reflection</h2>

        {REFLECTION_PROMPTS.map((p) => (
          <p key={p} className="mb-3 text-[14.5px] leading-relaxed text-ink-700">
            {p}
          </p>
        ))}

        <Button className="mt-3 mb-6 w-full" onClick={() => navigate('/app/prayer')}>
          Pray About This
        </Button>

        <button
          onClick={getAnotherVerse}
          className="flex w-full items-center justify-center gap-1.5 py-3 text-[13px] font-medium text-ink-500"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Get another verse
        </button>
      </div>
    </div>
  )
}
