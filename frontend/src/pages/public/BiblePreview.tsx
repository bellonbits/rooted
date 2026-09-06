import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { BookOpen, Sparkles, Bookmark, Highlighter, MessageSquare, Volume2, ArrowRight, Search, ChevronRight } from 'lucide-react'

const SAMPLE_VERSES = [
  { n: 1, text: 'In the beginning God created the heavens and the earth.' },
  { n: 2, text: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.' },
  { n: 3, text: 'And God said, "Let there be light," and there was light.' },
  { n: 4, text: 'God saw that the light was good, and he separated the light from the darkness.' },
  { n: 5, text: 'God called the light "day," and the darkness he called "night." And there was evening, and there was morning — the first day.' },
]

const FEATURES = [
  { icon: BookOpen,      title: '1,256+ Translations',     desc: 'BSB, NIV, KJV, NLT, ESV, NKJV and hundreds more — switch in one tap.' },
  { icon: Highlighter,  title: 'Highlight Verses',         desc: 'Mark key passages in your choice of colours that sync across devices.' },
  { icon: Bookmark,     title: 'Bookmarks',                desc: 'Save any verse and return to it instantly from your library.' },
  { icon: MessageSquare,title: 'Verse Notes',              desc: 'Add personal notes directly on any verse for later study.' },
  { icon: Sparkles,     title: 'AI Explanation',           desc: 'Tap any verse to get historical context and a plain-English explanation.' },
  { icon: Volume2,      title: 'Audio Narration',          desc: 'Listen to Scripture read aloud while you follow along.' },
  { icon: Search,       title: 'Full Bible Search',        desc: 'Find any word, phrase, or topic across the entire Bible instantly.' },
]

const COLORS = ['yellow', 'green', 'blue', 'pink'] as const
type Color = typeof COLORS[number]
const COLOR_STYLES: Record<Color, string> = {
  yellow: 'bg-yellow-200/70',
  green:  'bg-green-200/70',
  blue:   'bg-blue-200/70',
  pink:   'bg-pink-200/70',
}

export function BiblePreview() {
  const [highlighted, setHighlighted] = useState<Record<number, Color>>({})
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set())
  const [activeColor, setActiveColor] = useState<Color>('yellow')
  const [activeVerse, setActiveVerse] = useState<number | null>(null)
  const [translation, setTranslation] = useState('BSB')

  const toggleHighlight = (n: number) => {
    setHighlighted((prev) => {
      const next = { ...prev }
      if (next[n] === activeColor) { delete next[n] } else { next[n] = activeColor }
      return next
    })
  }
  const toggleBookmark = (n: number) => {
    setBookmarked((prev) => {
      const next = new Set(prev)
      next.has(n) ? next.delete(n) : next.add(n)
      return next
    })
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-200/35 blur-3xl" />

      {/* HERO */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/90 px-4 py-1.5 text-xs font-semibold text-purple-800 ring-1 ring-purple-200">
          <BookOpen className="h-3.5 w-3.5 text-purple-600" />
          Read the Bible, with context
        </div>
        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-indigo-900 sm:text-5xl lg:text-6xl">
          Scripture that{' '}
          <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-coral-500 bg-clip-text text-transparent">comes alive</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-600">
          Every verse comes with cross-references, highlights, notes, and an AI companion that explains — never replaces — God's Word. Try it below.
        </p>
      </section>

      {/* INTERACTIVE PREVIEW */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-[32px] border border-purple-100 bg-white/90 shadow-xl shadow-purple-900/8 overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center justify-between gap-4 border-b border-purple-100 px-6 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-purple-500">Genesis · Chapter 1</p>
              <h2 className="font-serif text-lg font-semibold text-indigo-900">In the Beginning</h2>
            </div>
            <div className="flex items-center gap-2">
              {/* Translation picker */}
              <select
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {['BSB', 'NIV', 'ESV', 'KJV', 'NLT'].map((t) => <option key={t}>{t}</option>)}
              </select>
              {/* Highlight colour picker */}
              <div className="flex items-center gap-1">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveColor(c)}
                    className={`h-5 w-5 rounded-full transition-all ${COLOR_STYLES[c]} ${activeColor === c ? 'ring-2 ring-purple-500 ring-offset-1 scale-110' : ''}`}
                    title={`Highlight ${c}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Verse list */}
          <div className="px-6 py-5 space-y-1">
            {SAMPLE_VERSES.map((v) => (
              <div
                key={v.n}
                className={`group relative flex gap-3 rounded-2xl px-3 py-3 transition-all duration-150 cursor-pointer ${highlighted[v.n] ? COLOR_STYLES[highlighted[v.n]] : 'hover:bg-purple-50/60'} ${activeVerse === v.n ? 'bg-purple-50' : ''}`}
                onClick={() => setActiveVerse(activeVerse === v.n ? null : v.n)}
              >
                <span className="mt-0.5 shrink-0 text-xs font-bold text-purple-400 w-5 text-right">{v.n}</span>
                <p className="font-serif text-base leading-relaxed text-indigo-900">{v.text}</p>

                {/* Action toolbar on hover/active */}
                <div className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 transition-opacity ${activeVerse === v.n ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleHighlight(v.n) }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm hover:bg-purple-50 border border-purple-100"
                    title="Highlight"
                  >
                    <Highlighter className="h-3.5 w-3.5 text-purple-600" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(v.n) }}
                    className={`flex h-7 w-7 items-center justify-center rounded-full shadow-sm border transition-colors ${bookmarked.has(v.n) ? 'bg-purple-600 border-purple-600' : 'bg-white border-purple-100 hover:bg-purple-50'}`}
                    title="Bookmark"
                  >
                    <Bookmark className={`h-3.5 w-3.5 ${bookmarked.has(v.n) ? 'text-white fill-white' : 'text-purple-600'}`} />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm hover:bg-purple-50 border border-purple-100"
                    title="AI Explain"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AI tip */}
          {activeVerse && (
            <div className="mx-6 mb-6 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 p-4 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-purple-200 mb-1">AI Companion · Verse {activeVerse}</p>
              <p className="text-sm leading-relaxed">
                {activeVerse === 1
                  ? '"In the beginning" (Hebrew: בְּרֵאשִׁית, bereshit) is an absolute statement — God existed before and apart from everything He created. This verse establishes that the universe has a personal, purposeful origin.'
                  : activeVerse === 3
                  ? 'God spoke creation into existence — "Let there be light" demonstrates that creation happened through the divine word alone, requiring no pre-existing materials. Light precedes the sun (created on day 4), suggesting light here may refer to something beyond physical illumination.'
                  : 'Tap the ✦ icon on any verse to get historical context, theological insight, and a plain-English explanation tailored for your faith stage.'}
              </p>
            </div>
          )}

          {/* Footer nav */}
          <div className="flex items-center justify-between border-t border-purple-100 px-6 py-4">
            <p className="text-xs text-indigo-400">
              {Object.keys(highlighted).length} highlighted · {bookmarked.size} bookmarked
            </p>
            <Link to="/onboarding/splash">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors">
                Read the full Bible <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-indigo-400">
          Click any verse to reveal the action toolbar. Switch translations above.
        </p>
      </section>

      {/* FEATURES GRID */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-600">Everything You Need</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">A complete Bible study experience</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="rounded-3xl border border-purple-100 bg-white/90 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-purple-500 shadow-md shadow-purple-500/20">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-serif text-base font-semibold text-indigo-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-indigo-500">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 p-12 text-white shadow-2xl shadow-purple-900/25">
          <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_70%_70%,white_1px,transparent_1px)] [background-size:24px_24px]" />
          <h2 className="relative font-serif text-3xl font-bold">Read God's Word every day</h2>
          <p className="relative mx-auto mt-4 max-w-md text-base text-purple-100">
            Unlock the full Bible, highlights, notes, AI explanations, and audio narration. Start free today.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/onboarding/splash">
              <Button variant="inverse" size="lg">
                Start Reading Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
