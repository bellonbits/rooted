import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  HandHeart,
  BookMarked,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Discover() {
  const navigate = useNavigate()

  const topics = [
    { name: 'Faith & Trust', count: '48 verses', to: '/app/bible/search' },
    { name: 'Peace & Anxiety', count: '32 verses', to: '/app/bible/search' },
    { name: 'Grace & Forgiveness', count: '54 verses', to: '/app/bible/search' },
    { name: 'Purpose & Calling', count: '29 verses', to: '/app/bible/search' },
    { name: 'Relationships & Love', count: '41 verses', to: '/app/bible/search' },
    { name: 'Hope in Suffering', count: '36 verses', to: '/app/bible/search' },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 space-y-10">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-purple-600">
          Explore Scripture &amp; Spiritual Life
        </p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-indigo-900">
          Discover
        </h1>
        <p className="mt-2 text-sm text-indigo-600 max-w-xl">
          Curated devotionals, biblical topics, and spiritual guides to deepen your relationship with God.
        </p>
      </div>

      {/* Featured Editorial Card */}
      <div className="relative overflow-hidden rounded-[36px] border border-purple-200 shadow-xl">
        <img
          src="/images/african-group-study.jpg"
          alt="Young African Christians studying together"
          className="h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-8 text-white">
          <span className="rounded-full bg-coral-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Editorial Feature
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-4xl font-bold leading-tight">
            How Christian Fellowship Transforms African Youth
          </h2>
          <p className="mt-2 max-w-xl text-xs sm:text-sm text-purple-100/90 leading-relaxed">
            Discover why walking in deep community, sharing vulnerable prayers, and studying Scripture together produces unshakeable faith.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Button
              variant="coral"
              size="sm"
              onClick={() => navigate('/app/community')}
            >
              Read Full Reflection →
            </Button>
          </div>
        </div>
      </div>

      {/* Scripture by Topic */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-indigo-900">
          Explore Scripture by Topic
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <button
              key={t.name}
              onClick={() => navigate(t.to)}
              className="flex items-center justify-between rounded-2xl border border-purple-100 bg-warm-card p-4 text-left shadow-xs transition-all hover:border-purple-300 hover:shadow-md"
            >
              <div>
                <p className="font-serif text-sm font-bold text-indigo-900">{t.name}</p>
                <p className="text-[11px] text-indigo-400 mt-0.5">{t.count}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-purple-600" />
            </button>
          ))}
        </div>
      </div>

      {/* Featured Sections Grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div
          onClick={() => navigate('/app/devotionals')}
          className="cursor-pointer rounded-[28px] border border-purple-100 bg-warm-card p-6 shadow-md transition-all hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h4 className="font-serif text-lg font-bold text-indigo-900">Daily Devotionals</h4>
          <p className="mt-1 text-xs text-indigo-600 leading-relaxed">
            Rich morning and evening biblical reflections written for everyday life.
          </p>
        </div>

        <div
          onClick={() => navigate('/app/plans')}
          className="cursor-pointer rounded-[28px] border border-purple-100 bg-warm-card p-6 shadow-md transition-all hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-100 text-coral-600 mb-4">
            <BookMarked className="h-6 w-6" />
          </div>
          <h4 className="font-serif text-lg font-bold text-indigo-900">Reading Plans</h4>
          <p className="mt-1 text-xs text-indigo-600 leading-relaxed">
            Curated 7 to 30 day reading journeys through Gospel, Epistles, and Psalms.
          </p>
        </div>

        <div
          onClick={() => navigate('/app/prayer')}
          className="cursor-pointer rounded-[28px] border border-purple-100 bg-warm-card p-6 shadow-md transition-all hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 mb-4">
            <HandHeart className="h-6 w-6" />
          </div>
          <h4 className="font-serif text-lg font-bold text-indigo-900">Prayer Wall</h4>
          <p className="mt-1 text-xs text-indigo-600 leading-relaxed">
            Stand in agreement with brothers and sisters lifting petitions across the nation.
          </p>
        </div>
      </div>
    </div>
  )
}
