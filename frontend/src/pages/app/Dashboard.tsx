import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  Bell,
  Sparkles,
  BookOpen,
  ArrowRight,
  Heart,
  Feather,
  TrendingUp,
  Smile,
} from 'lucide-react'
import { GuestBanner } from '@/components/ui/GuestBanner'
import { Button } from '@/components/ui/Button'
import { userService } from '@/services/user.service'
import { useAuthStore } from '@/store/authStore'
import { initials } from '@/constants/community'

export function Dashboard() {
  const navigate = useNavigate()
  const isGuest = useAuthStore((s) => s.isGuest)
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: userService.me,
    retry: 1,
    enabled: !isGuest,
  })

  const [savedPrayer, setSavedPrayer] = useState(false)
  const userName = user?.name ? user.name.split(' ')[0] : 'Peter'

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 space-y-8">
      {/* Top Greeting Header */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
            Welcome back
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-indigo-900">
            Good evening, {userName}.
          </h1>
          <p className="text-sm text-indigo-500 mt-0.5">Ready to continue growing in faith today?</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/notifications')}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-warm-card border border-purple-100 shadow-xs hover:bg-purple-50 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5 text-indigo-700" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-coral-500 ring-2 ring-white" />
          </button>

          <button
            onClick={() => navigate('/app/profile')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-purple-400 font-serif text-sm font-bold text-white shadow-sm ring-2 ring-purple-200"
          >
            {user ? initials(user.name) : 'P'}
          </button>
        </div>
      </header>

      {isGuest && (
        <GuestBanner message="Sign up to save your progress, personal journal notes, and join our prayer community." />
      )}

      {/* ========================================================================= */}
      {/* 1. CENTRAL BEHAVIORAL CARD: TODAY'S JOURNEY (SECTION 39)                   */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-[32px] border border-purple-200/70 bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 p-7 sm:p-9 text-white shadow-xl shadow-purple-900/20">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-100 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-coral-400" />
              <span>Today&apos;s Journey · Mark 4:1–20</span>
            </div>

            <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-bold">
              The Parable of the Sower
            </h2>

            <p className="mt-1 text-sm text-purple-100/90 max-w-md">
              Discover how God&apos;s seed produces a hundredfold harvest in receptive hearts.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <Button
                variant="coral"
                onClick={() => navigate('/app/journey')}
                className="shadow-lg shadow-coral-500/30"
              >
                Continue Journey →
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => navigate('/app/bible/mark/4')}
              >
                Read Scripture
              </Button>
            </div>
          </div>

          {/* Progress dial & info */}
          <div className="flex flex-col items-start md:items-end rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/15 min-w-[200px]">
            <div className="flex items-baseline justify-between w-full">
              <span className="font-serif text-3xl font-bold text-white">65%</span>
              <span className="text-xs font-medium text-purple-200 uppercase tracking-wide">
                Complete
              </span>
            </div>
            <p className="text-xs text-purple-200 mt-1">2 of 4 steps finished</p>
            {/* Coral progress bar from reference */}
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-coral-400 to-coral-500 shadow-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TWO-COLUMN EDITORIAL CARDS: SCRIPTURE & CURRENT PLAN                   */}
      {/* ========================================================================= */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Scripture with African Couple Photography */}
        <div className="relative overflow-hidden rounded-[28px] border border-purple-100 shadow-md group">
          <img
            src="/images/african-couple-bible.jpg"
            alt="Scripture reflection"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

          <div className="relative z-10 p-7 flex flex-col justify-end min-h-[300px] text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200">
              Today&apos;s Scripture · Psalm 37:4
            </span>
            <p className="mt-2 font-serif text-lg italic leading-relaxed text-white">
              &ldquo;Take delight in the Lord, and he will give you the desires of your heart.&rdquo;
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4">
              <button
                onClick={() => navigate('/app/bible/psalms/37')}
                className="text-xs font-semibold text-purple-200 hover:text-white flex items-center gap-1"
              >
                Read in context <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => navigate('/app/journal')}
                className="text-xs font-semibold text-white/80 hover:text-white"
              >
                Reflect in Journal
              </button>
            </div>
          </div>
        </div>

        {/* Current Plan Card (Romans 65% from Reference Image) */}
        <div className="flex flex-col justify-between rounded-[28px] border border-purple-100/80 bg-warm-card p-7 shadow-md">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                Your Current Plan
              </span>
              <span className="rounded-full bg-coral-100 px-2.5 py-0.5 text-xs font-bold text-coral-500">
                Keep going
              </span>
            </div>

            <h3 className="mt-3 font-serif text-xl font-bold text-indigo-900">
              Foundations of Faith: Romans
            </h3>
            <p className="mt-1 text-xs text-indigo-500">Day 5 of 14 · Transforming mind and heart</p>

            <p className="mt-4 text-sm leading-relaxed text-indigo-700 bg-lavender-50 p-4 rounded-2xl border border-purple-100/60">
              &ldquo;You are 65% through studying the Book of Romans. God&apos;s word is transforming
              your heart and mind!&rdquo;
            </p>
          </div>

          <div className="mt-6">
            <div className="flex items-baseline justify-between text-xs font-semibold text-indigo-700 mb-2">
              <span>Romans 8 of 16 Complete</span>
              <span className="font-serif text-lg font-bold text-purple-700">65%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-indigo-100">
              <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-coral-500 to-coral-400" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => navigate('/app/plans')}
                className="text-xs font-semibold text-indigo-500 hover:text-indigo-900"
              >
                View all plans
              </button>
              <Button size="sm" onClick={() => navigate('/app/bible/romans/8')}>
                Continue Reading →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. DAILY PRAYER & AI COMPANION QUICK ACCESS                               */}
      {/* ========================================================================= */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Daily Prayer Pill Card (from Reference Image with African Portrait) */}
        <div className="flex items-center gap-4 rounded-[28px] border border-purple-100 bg-warm-card p-6 shadow-md">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-purple-400/40">
            <img
              src="/images/african-prayer-portrait.jpg"
              alt="African young man in prayer"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-indigo-900">Daily Prayer</h3>
              <span className="text-xs text-purple-600 font-medium">Numbers 6:24–26</span>
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-indigo-600 italic">
              &ldquo;Lord, make your face shine on us and give us peace.&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={() => navigate('/app/prayer')}
                className="text-xs font-bold text-purple-700 hover:text-purple-900"
              >
                Pray Now →
              </button>
              <button
                onClick={() => setSavedPrayer(!savedPrayer)}
                className="text-xs text-indigo-400 hover:text-purple-600 flex items-center gap-1"
              >
                <Heart className="h-3.5 w-3.5" fill={savedPrayer ? 'currentColor' : 'none'} />
                {savedPrayer ? 'Saved' : 'Save prayer'}
              </button>
            </div>
          </div>
        </div>

        {/* ROOTED AI Study Companion Card */}
        <div className="flex flex-col justify-between rounded-[28px] border border-purple-200/80 bg-gradient-to-br from-purple-50/60 to-white p-6 shadow-md">
          <div>
            <div className="flex items-center gap-2 text-purple-700">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-xs font-bold uppercase tracking-wider">ROOTED Companion</span>
            </div>
            <h3 className="mt-2 font-serif text-base font-bold text-indigo-900">
              Have questions about Scripture?
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-indigo-600">
              Ask about Greek/Hebrew origins, cultural background, and cross-references.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-purple-100 pt-3">
            <span className="text-xs text-indigo-500 italic">&ldquo;What is the seed in Mark 4?&rdquo;</span>
            <Button size="sm" onClick={() => navigate('/app/ai')}>
              Ask ROOTED →
            </Button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. QUICK DISCOVERY SHORTCUTS                                              */}
      {/* ========================================================================= */}
      <div className="rounded-[28px] border border-purple-100 bg-warm-card p-6 shadow-sm">
        <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-indigo-400 mb-4">
          Quick Access
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => navigate('/app/bible')}
            className="flex items-center gap-3 rounded-2xl border border-purple-100/60 p-3.5 text-left hover:bg-purple-50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-900">Read Bible</p>
              <p className="text-[10px] text-indigo-400">66 Books</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/app/journal')}
            className="flex items-center gap-3 rounded-2xl border border-purple-100/60 p-3.5 text-left hover:bg-purple-50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
              <Feather className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-900">Journal</p>
              <p className="text-[10px] text-indigo-400">18 reflections</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/app/progress')}
            className="flex items-center gap-3 rounded-2xl border border-purple-100/60 p-3.5 text-left hover:bg-purple-50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral-100 text-coral-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-900">Your Growth</p>
              <p className="text-[10px] text-indigo-400">12 Day Streak</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/app/kids')}
            className="flex items-center gap-3 rounded-2xl border border-purple-100/60 p-3.5 text-left hover:bg-purple-50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <Smile className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-900">Kids Mode</p>
              <p className="text-[10px] text-indigo-400">Little Explorers</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
