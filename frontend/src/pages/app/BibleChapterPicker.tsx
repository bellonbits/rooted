import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { BOOKS, CHAPTER_COUNTS } from '@/constants/bible'
import { useBibleStore } from '@/store/bibleStore'
import { cn } from '@/utils/cn'

export function BibleChapterPicker() {
  const navigate = useNavigate()
  const { book = '' } = useParams()
  const translation = useBibleStore((s) => s.translation)
  const activeRef = useRef<HTMLButtonElement>(null)

  const meta = BOOKS.find((b) => b.slug === book)
  const total = CHAPTER_COUNTS[book] ?? 1
  const chapters = Array.from({ length: total }, (_, i) => i + 1)
  const siblings = BOOKS.filter((b) => b.testament === meta?.testament)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [book])

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

        {/* Responsive Grid of Chapter Selectors:
            5 cols on mobile, 8 on tablet, 10 on desktop, 12 on large monitors */}
        <div className="mt-6 rounded-3xl bg-white p-6 sm:p-8 shadow-xs ring-1 ring-purple-100/70">
          <h2 className="text-xs font-black uppercase tracking-wider text-indigo-400 mb-5">
            Select Chapter to Read
          </h2>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
            {chapters.map((n) => (
              <button
                key={n}
                onClick={() => navigate(`/app/bible/${book}/${n}`)}
                className="flex aspect-square items-center justify-center rounded-2xl bg-purple-50/50 text-sm font-bold text-indigo-950 ring-1 ring-purple-100/80 transition-all hover:bg-purple-700 hover:text-white hover:ring-purple-700 hover:shadow-md active:scale-95"
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
