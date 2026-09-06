import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, X, Search, BookOpen } from 'lucide-react'
import { TOPIC_VERSES, TOPIC_TAGS } from '@/constants/bible'
import { cn } from '@/utils/cn'

function highlight(text: string, query: string) {
  if (!query.trim()) return text
  const i = text.toLowerCase().indexOf(query.toLowerCase())
  if (i === -1) return text
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-amber-200/90 px-1 py-0.5 font-bold text-amber-950">
        {text.slice(i, i + query.length)}
      </mark>
      {text.slice(i + query.length)}
    </>
  )
}

export function BibleSearch() {
  const navigate = useNavigate()
  // Default query 'Therefore' matching the reference image right phone
  const [query, setQuery] = useState('Therefore')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const results = useMemo(() => {
    return TOPIC_VERSES.filter((v) => {
      const matchesTag = !activeTag || v.tags.includes(activeTag)
      const matchesQuery =
        !query.trim() ||
        v.text.toLowerCase().includes(query.toLowerCase()) ||
        v.ref.toLowerCase().includes(query.toLowerCase())
      return matchesTag && matchesQuery
    })
  }, [query, activeTag])

  function selectTag(tag: string) {
    setActiveTag((t) => (t === tag ? null : tag))
  }

  const navigateToVerse = (ref: string) => {
    const parts = ref.split(' ')
    const bookName = parts.slice(0, -1).join('-').toLowerCase()
    const chapter = parts[parts.length - 1].split(':')[0]
    navigate(`/app/bible/${bookName}/${chapter}`)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-indigo-950 pb-20">
      {/* Responsive Container: Expands from mobile to max-w-6xl on desktop */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Bar */}
        <header className="rounded-3xl bg-white p-6 shadow-xs ring-1 ring-purple-100/70">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/app/bible')}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-indigo-900 hover:bg-purple-50 transition-colors ring-1 ring-purple-100"
              aria-label="Back to Bible"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Search Input */}
            <div className="flex flex-1 items-center justify-between rounded-2xl bg-purple-50/50 px-4 py-3 ring-1 ring-purple-100 focus-within:ring-2 focus-within:ring-purple-400">
              <div className="flex flex-1 items-center gap-2.5">
                <Search className="h-4 w-4 text-purple-600 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search scripture words or topics (e.g. Therefore, Faith, Hope, Love)..."
                  className="w-full bg-transparent text-sm font-semibold text-indigo-950 outline-none placeholder:text-indigo-400"
                />
              </div>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-indigo-400 hover:text-indigo-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Topic Pills: Anxiety | Doubt | Faith | Hope | etc. */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {TOPIC_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => selectTag(tag)}
                className={cn(
                  'shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
                  activeTag === tag
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-purple-50 text-indigo-700 hover:bg-purple-100',
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </header>

        {/* Results Container */}
        <main className="mt-6">
          <p className="text-xs font-black uppercase tracking-wider text-indigo-400 mb-3">
            {results.length} {results.length === 1 ? 'RESULT' : 'RESULTS'}
          </p>

          {/* 2-Column Responsive Grid on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((v) => (
              <div
                key={v.ref}
                onClick={() => navigateToVerse(v.ref)}
                className="group cursor-pointer rounded-3xl bg-white p-5 shadow-xs ring-1 ring-purple-100/70 hover:ring-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-purple-800">
                      {v.ref}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-purple-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Read Chapter →</span>
                    </div>
                  </div>

                  <p className="font-serif text-[15px] leading-relaxed text-indigo-950">
                    {highlight(v.text, query)}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 border-t border-purple-50 pt-3">
                  {v.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-purple-50 px-2.5 py-0.5 text-[11px] font-semibold text-purple-700"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <div className="py-20 text-center rounded-3xl bg-white p-8 ring-1 ring-purple-100">
              <Search className="mx-auto h-10 w-10 text-purple-300 mb-3" />
              <p className="text-base font-bold text-indigo-950">No scripture matches found</p>
              <p className="text-xs text-indigo-500 mt-1">
                Try searching for words like &ldquo;Grace&rdquo;, &ldquo;Light&rdquo;, &ldquo;Peace&rdquo;, or select a topic pill above.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
