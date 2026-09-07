import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { BOOKS, CHAPTER_COUNTS } from '@/constants/bible'
import { bibleService } from '@/services/bible.service'
import { useBibleStore } from '@/store/bibleStore'
import { cn } from '@/utils/cn'

export function BibleChapterPicker() {
  const navigate = useNavigate()
  const { book = '' } = useParams()
  const translation = useBibleStore((s) => s.translation)
  const activeRef = useRef<HTMLButtonElement>(null)
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)

  const meta = BOOKS.find((b) => b.slug === book)
  const total = CHAPTER_COUNTS[book] ?? 1
  const chapters = Array.from({ length: total }, (_, i) => i + 1)
  const siblings = BOOKS.filter((b) => b.testament === meta?.testament)

  const { data: chapterData, isLoading: versesLoading } = useQuery({
    queryKey: ['chapter-verses', book, selectedChapter, translation],
    queryFn: () => bibleService.fetchChapter(meta?.name ?? book, selectedChapter as number, translation),
    enabled: selectedChapter !== null,
    staleTime: 1000 * 60 * 10,
  })

  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: 'center', block: 'nearest' })
    setSelectedChapter(null)
  }, [book])

  const handleSelectChapter = (n: number) => {
    setSelectedChapter((current) => (current === n ? null : n))
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-indigo-950 pb-20">
      {/* Responsive Container: Expands from mobile to max-w-6xl on desktop */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        <header className="rounded-3xl bg-white p-6 shadow-xs ring-1 ring-purple-100/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/app/bible')}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-indigo-900 hover:bg-purple-50 transition-colors ring-1 ring-purple-100"
              aria-label="Back to books"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-indigo-950">{meta?.name ?? book}</h1>
              <p className="text-xs uppercase tracking-wide text-purple-700 font-bold">
                {total} {total === 1 ? 'chapter' : 'chapters'} · {translation.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Quick Read First Chapter Button */}
          <button
            onClick={() => navigate(`/app/bible/${book}/1`)}
            className="rounded-2xl bg-purple-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-purple-800 transition-colors"
          >
            Start Chapter 1 →
          </button>
        </header>

        {/* Horizontal Siblings Book Scroller */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {siblings.map((b) => (
            <button
              key={b.slug}
              ref={b.slug === book ? activeRef : undefined}
              onClick={() => b.slug !== book && navigate(`/app/bible/${b.slug}`)}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
                b.slug === book
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-white text-indigo-800 hover:bg-purple-50 ring-1 ring-purple-100',
              )}
            >
              {b.name}
            </button>
          ))}
        </div>

        {/* Chapter picker + verse picker: stacked on mobile, side-by-side on large screens */}
        <div className="mt-6 rounded-3xl bg-white p-6 sm:p-8 shadow-xs ring-1 ring-purple-100/70 lg:flex lg:gap-8">
          {/* Chapter Picker (sidebar on desktop, grid on top on mobile) */}
          <div className="lg:w-56 lg:shrink-0">
            <h2 className="text-xs font-black uppercase tracking-wider text-indigo-400 mb-5">
              Select Chapter to Read
            </h2>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-4 gap-3 lg:max-h-[560px] lg:overflow-y-auto lg:pr-1">
              {chapters.map((n) => (
                <button
                  key={n}
                  onClick={() => handleSelectChapter(n)}
                  className={cn(
                    'flex aspect-square items-center justify-center rounded-2xl text-sm font-bold ring-1 transition-all hover:shadow-md active:scale-95',
                    selectedChapter === n
                      ? 'bg-purple-700 text-white ring-purple-700 shadow-md'
                      : 'bg-purple-50/50 text-indigo-950 ring-purple-100/80 hover:bg-purple-700 hover:text-white hover:ring-purple-700',
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Verse picker for the selected chapter */}
          <div className="mt-6 lg:mt-0 lg:flex-1 lg:border-l lg:border-purple-100/70 lg:pl-8">
            {selectedChapter !== null ? (
              <div className="rounded-2xl bg-purple-50/40 p-5 ring-1 ring-purple-100 animate-fade-in">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-indigo-400">
                    Select Verse in Chapter {selectedChapter}
                  </h3>
                  <button
                    onClick={() => navigate(`/app/bible/${book}/${selectedChapter}`)}
                    className="text-xs font-bold text-purple-700 hover:underline"
                  >
                    Read whole chapter →
                  </button>
                </div>

                {versesLoading && (
                  <div className="flex items-center justify-center gap-2 py-8 text-sm font-semibold text-indigo-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading verses…
                  </div>
                )}

                {!versesLoading && chapterData && (
                  <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2">
                    {chapterData.verses.map((v) => (
                      <button
                        key={v.verse}
                        onClick={() => navigate(`/app/bible/${book}/${selectedChapter}?verse=${v.verse}`)}
                        className="flex aspect-square items-center justify-center rounded-xl bg-white text-xs font-bold text-indigo-900 ring-1 ring-purple-100 transition-all hover:bg-purple-700 hover:text-white hover:ring-purple-700 active:scale-95"
                      >
                        {v.verse}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden h-full min-h-[200px] items-center justify-center text-center text-sm font-medium text-indigo-400 lg:flex">
                Select a chapter to see its verses
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
