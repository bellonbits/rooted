import {
  Play,
  Star,
  CheckCircle2,
  Heart,
  HelpCircle,
  Trophy,
  BookOpen,
  Volume2,
  Sparkles,
  Sprout,
} from 'lucide-react'
import { RootiBubble } from './RootiBubble'

type KidsHomeViewProps = {
  onStartAdventure: (storyId?: string) => void
  onOpenMemoryGame: () => void
  onOpenPrayer: () => void
  onOpenAskRooti: () => void
  missionCompleted: boolean
  onCompleteMission: () => void
}

export function KidsHomeView({
  onStartAdventure,
  onOpenMemoryGame,
  onOpenPrayer,
  onOpenAskRooti,
  missionCompleted,
  onCompleteMission,
}: KidsHomeViewProps) {
  return (
    <div className="space-y-6 pb-20">
      {/* Friendly Explorer Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-coral-400 inline-flex items-center gap-1.5">
            <Sprout className="h-3.5 w-3.5" />
            <span>Welcome, Brave Explorer!</span>
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight">
            Today&apos;s Adventure Awaits
          </h1>
        </div>

        <button
          onClick={onOpenAskRooti}
          className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-900/60 px-3.5 py-1.5 text-xs font-bold text-purple-200 hover:bg-purple-800 transition-colors"
        >
          <HelpCircle className="h-4 w-4 text-emerald-400" />
          <span>Ask ROOTI a Question</span>
        </button>
      </div>

      {/* ROOTI Companion Guide Bubble */}
      <RootiBubble
        message="I have an amazing illustrated storybook for you today: 'When God Made Everything'! You can turn the pages, tap sparkling stars, hear animals, and even have it read aloud to you!"
        actionLabel="Open Illustrated Book (21 Pages)"
        onClickAction={() => onStartAdventure('creation')}
      />

      {/* ========================================================================= */}
      {/* FEATURED INTERACTIVE STORYBOOK: WHEN GOD MADE EVERYTHING                  */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-[36px] border-4 border-amber-300/40 bg-gradient-to-br from-indigo-900 via-purple-950 to-amber-950/40 p-6 sm:p-8 shadow-2xl">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gradient-to-r from-amber-400 to-coral-500 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-indigo-950 shadow-md flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" />
                Featured Storybook
              </span>
              <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-bold text-yellow-300">
                <Sparkles className="h-3 w-3" /> 21 Illustrated Pages
              </span>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                <Volume2 className="h-3 w-3" /> Voice Narration
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-black text-white leading-tight">
              When God Made Everything
            </h2>

            <p className="font-serif text-base sm:text-lg italic text-amber-200">
              &ldquo;In the beginning, God created the heavens and the earth...&rdquo;
            </p>

            <p className="text-xs sm:text-sm leading-relaxed text-purple-200/90">
              Turn pages in a realistic Kindle-style storybook! Tap stars to count them, blow the breath of life into Adam, toggle day and night, and hear splashing whales and chirping birds.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onStartAdventure('creation')}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-coral-400 px-7 py-3.5 text-sm font-black text-indigo-950 shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <BookOpen className="h-4 w-4" />
                OPEN INTERACTIVE BOOK →
              </button>

              <button
                onClick={() => onStartAdventure('david')}
                className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3.5 text-xs font-bold text-white hover:bg-white/20 transition-colors border border-white/15"
              >
                <Play className="h-4 w-4 text-coral-400" />
                Play David &amp; Goliath Quest
              </button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div
              onClick={() => onStartAdventure('creation')}
              className="relative mx-auto max-w-xs overflow-hidden rounded-3xl border-4 border-amber-300/40 shadow-2xl group cursor-pointer hover:scale-[1.03] transition-transform"
            >
              <img
                src="/bible_stories/story1/panel_01_title.png"
                alt="When God Made Everything - Illustrated Children's Bible Book"
                className="aspect-[4/4.5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-3 inset-x-3 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3.5 py-1.5 text-xs font-black text-amber-300 backdrop-blur-md shadow-lg border border-amber-300/30">
                  <Sparkles className="h-3.5 w-3.5" /> Tap to Open Storybook
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO BIBLE WORLD ADVENTURE CARD: DAVID & GOLIATH                           */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-[36px] border-4 border-white/20 bg-gradient-to-br from-purple-900 via-indigo-950 to-purple-950 p-6 sm:p-8 shadow-2xl">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-coral-500 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md">
                Today&apos;s Adventure
              </span>
              <span className="flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                <Star className="h-3 w-3 fill-amber-300" /> 3 Discoveries
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-black text-white leading-tight">
              David &amp; Goliath
            </h2>

            <p className="font-serif text-base sm:text-lg italic text-purple-200">
              &ldquo;Can you discover what gave young David such fearless courage?&rdquo;
            </p>

            <p className="text-xs sm:text-sm leading-relaxed text-purple-200/80">
              Join young shepherd David as he faces giant Goliath with just a sling, 5 smooth stones,
              and complete trust in the Living God!
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onStartAdventure('david')}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-coral-500 via-coral-400 to-coral-500 px-7 py-3.5 text-sm font-black text-white shadow-xl shadow-coral-500/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="h-4 w-4 fill-white" />
                START ADVENTURE →
              </button>

              <button
                onClick={onOpenMemoryGame}
                className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3.5 text-xs font-bold text-white hover:bg-white/20 transition-colors border border-white/15"
              >
                <Star className="h-4 w-4 text-amber-300" />
                Memory Verse Challenge
              </button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative mx-auto max-w-xs overflow-hidden rounded-3xl border-4 border-white/25 shadow-2xl group">
              <img
                src="/images/african-david-goliath.jpg"
                alt="Young African shepherd boy David facing giant Goliath"
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 inset-x-3 text-center">
                <span className="rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-xs">
                  Shepherd Hills · Scene 1 of 4
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TWO-COLUMN ACTIVITIES: DAILY MISSION & TALK WITH GOD                      */}
      {/* ========================================================================= */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Today's Real-Life Mission */}
        <div className="rounded-[32px] border border-white/15 bg-white/5 p-6 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Daily Explorer Mission
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                +25 XP
              </span>
            </div>

            <h3 className="mt-2 font-serif text-lg font-bold text-white">
              Encourage someone who needs hope
            </h3>
            <p className="mt-1 text-xs text-purple-200/80 leading-relaxed">
              Say kind words to a family member, classmate, or friend today. Tell them that God loves them!
            </p>
          </div>

          <div className="mt-5">
            <button
              onClick={onCompleteMission}
              className={`flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-xs font-bold transition-all ${
                missionCompleted
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              {missionCompleted ? 'Mission Complete!' : 'Mark Mission Complete'}
            </button>
          </div>
        </div>

        {/* Talk With God (Prayer Adventure) */}
        <div className="rounded-[32px] border border-white/15 bg-white/5 p-6 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-coral-400">
                Prayer Adventure
              </span>
              <span className="rounded-full bg-coral-500/20 px-2 py-0.5 text-[10px] font-bold text-coral-300">
                Talk With God
              </span>
            </div>

            <h3 className="mt-2 font-serif text-lg font-bold text-white">
              How are you feeling right now?
            </h3>
            <p className="mt-1 text-xs text-purple-200/80 leading-relaxed">
              Happy, sleepy, or carrying big worries? God is listening to every whisper.
            </p>
          </div>

          <div className="mt-5">
            <button
              onClick={onOpenPrayer}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 py-2.5 text-xs font-bold text-white hover:brightness-110 shadow-md transition-all"
            >
              <Heart className="h-4 w-4 text-coral-400" fill="currentColor" />
              Open Prayer Room →
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* WEEKLY QUEST: THE COURAGE QUEST                                           */}
      {/* ========================================================================= */}
      <div className="rounded-[32px] border border-amber-400/30 bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-indigo-950/40 p-6 sm:p-7 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400 text-indigo-950 shadow-md">
              <Trophy className="h-6 w-6" />
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                Weekly Quest · Week 1
              </span>
              <h3 className="font-serif text-lg font-black text-white">The Courage Quest</h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <span>Reward: 🏆 Courage Explorer Badge + Golden Sling</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="text-purple-200">Read David&apos;s story</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="text-purple-200">Learn Philippians 4:13</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="text-purple-200">Courage challenge</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-amber-400/60 text-[10px] text-amber-300">
              ○
            </span>
            <span className="text-amber-200 font-medium">Daily reflection</span>
          </div>
        </div>
      </div>
    </div>
  )
}
