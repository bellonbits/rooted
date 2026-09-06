import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  ChevronDown,
  Droplets,
  Users,
  Heart,
  FileText,
} from 'lucide-react'
import { BOOKS, BOOK_BLURBS, CHAPTER_COUNTS, type Testament } from '@/constants/bible'
import { useBibleStore } from '@/store/bibleStore'
import { cn } from '@/utils/cn'

export function BibleBooks() {
  const navigate = useNavigate()
  const [testament, setTestament] = useState<Testament>('old')
  const translation = useBibleStore((s) => s.translation)
  const bookEngagements = useBibleStore((s) => s.bookEngagements)
  const toggleBookLike = useBibleStore((s) => s.toggleBookLike)

  const books = BOOKS.filter((b) => b.testament === testament)

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-28">
      {/* Responsive Container: Adapts from mobile (full width) to tablet and desktop (max-w-6xl) */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* Top Header Bar */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-2 border-b border-purple-100/70 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/app/profile')}
              className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-purple-200 transition-transform active:scale-95 shadow-xs"
            >
              <img
                src="/images/african-prayer-portrait.jpg"
                alt="Profile avatar"
                className="h-full w-full object-cover"
              />
            </button>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-indigo-950">
                  Bible
                </h1>
                <button
                  onClick={() => navigate('/app/bible/translations')}
                  className="flex items-center gap-1 rounded-lg bg-purple-100/80 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-purple-800 hover:bg-purple-200 transition-colors shadow-2xs"
                  title="Change version (over 1,000 versions available)"
                >
                  <span>{translation}</span>
                  <ChevronDown className="h-3 w-3 text-purple-600" />
                </button>
              </div>
              <p className="text-xs text-indigo-900/60 font-medium mt-0.5">
                Read, reflect, and fellowship across Scripture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak Indicator */}
            <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 ring-1 ring-blue-200/70 shadow-2xs">
              <Droplets className="h-4 w-4 fill-blue-500 text-blue-500" />
              <span>1 Day Streak</span>
            </div>

            {/* Community Notification */}
            <button
              onClick={() => navigate('/app/community')}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-indigo-900 ring-1 ring-purple-100 hover:bg-purple-50 transition-colors shadow-2xs"
              title="Community reflections"
            >
              <Users className="h-5 w-5 text-indigo-800" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-black text-white ring-2 ring-white">
                1
              </span>
            </button>
          </div>
        </header>

        {/* Controls Row: Search Bar & Testament Toggle */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Trigger */}
          <div className="flex-1 sm:max-w-md">
            <button
              onClick={() => navigate('/app/bible/search')}
              className="flex w-full items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-left text-sm text-indigo-900/45 shadow-xs ring-1 ring-purple-100/80 hover:ring-purple-300 transition-all"
            >
              <Search className="h-4 w-4 text-purple-600 shrink-0" />
              <span className="truncate">Search the Bible, book, chapter or verse…</span>
            </button>
          </div>

          {/* Segmented Pill Selector: Old Testament / New Testament */}
          <div className="flex rounded-2xl bg-purple-100/50 p-1 sm:w-80">
            <button
              onClick={() => setTestament('old')}
              className={cn(
                'flex-1 rounded-xl py-2 text-center text-xs font-bold transition-all',
                testament === 'old'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-indigo-900/60 hover:text-indigo-950',
              )}
            >
              Old Testament ({BOOKS.filter((b) => b.testament === 'old').length})
            </button>
            <button
              onClick={() => setTestament('new')}
              className={cn(
                'flex-1 rounded-xl py-2 text-center text-xs font-bold transition-all',
                testament === 'new'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-indigo-900/60 hover:text-indigo-950',
              )}
            >
              New Testament ({BOOKS.filter((b) => b.testament === 'new').length})
            </button>
          </div>
        </div>

        {/* Responsive Multi-Column Books Grid:
            1 col on mobile, 2 on tablet, 3 on laptop, 4 on desktop */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {books.map((book) => {
            const stats = bookEngagements[book.slug]
            const likes = stats?.likes ?? 0
            const notes = stats?.notes ?? 0
            const chapters = CHAPTER_COUNTS[book.slug] ?? 1

            return (
              <div
                key={book.slug}
                className="group flex flex-col justify-between rounded-2xl bg-white p-4 shadow-xs ring-1 ring-purple-100/70 transition-all hover:ring-purple-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <button
                    onClick={() => navigate(`/app/bible/${book.slug}/1`)}
                    className="flex flex-1 flex-col text-left min-w-0"
                  >
                    <span className="text-[15px] font-bold tracking-tight text-indigo-950 group-hover:text-purple-700 transition-colors">
                      {book.name}
                    </span>
                    <span className="truncate text-xs text-indigo-900/50 mt-0.5">
                      {BOOK_BLURBS[book.name] ?? `${chapters} chapters`}
                    </span>
                  </button>

                  <span className="shrink-0 text-[11px] font-semibold text-indigo-400 bg-purple-50/70 px-2 py-0.5 rounded-md">
                    {chapters} ch.
                  </span>
                </div>

                {/* Bottom Bar of Card with Badges matching reference image */}
                <div className="mt-3.5 flex items-center justify-between border-t border-purple-50 pt-2 text-xs">
                  <button
                    onClick={() => navigate(`/app/bible/${book.slug}/1`)}
                    className="text-[11px] font-bold text-purple-700 hover:underline"
                  >
                    Read Chapter 1 →
                  </button>

                  <div className="flex items-center gap-2.5">
                    {likes > 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleBookLike(book.slug)
                        }}
                        className="flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                        title={`${likes} believers loved ${book.name}`}
                      >
                        <Heart className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                        <span>{likes}</span>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleBookLike(book.slug)
                        }}
                        className="flex items-center gap-1 text-xs font-medium text-indigo-300 hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Love this book"
                      >
                        <Heart className="h-3.5 w-3.5" />
                      </button>
                    )}

                    {notes > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/app/bible/${book.slug}/1?discuss=true`)
                        }}
                        className="flex items-center gap-1 text-xs font-semibold text-purple-700 hover:text-purple-900 transition-colors"
                        title={`${notes} active discussions in ${book.name}`}
                      >
                        <FileText className="h-3.5 w-3.5 text-purple-600" />
                        <span>{notes}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
