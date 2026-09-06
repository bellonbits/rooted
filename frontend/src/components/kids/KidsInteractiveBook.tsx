import { useState, useEffect, useRef } from 'react'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Sparkles,
  Bookmark,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  List,
  RotateCcw,
  CheckCircle2,
  Award,
  BookOpen,
  Sprout,
  Lightbulb,
  Layers,
} from 'lucide-react'
import { BIBLE_STORIES, getStoryById } from '@/data/bibleStories'
import { type StoryPanelData } from '@/data/storyTypes'
import { kidsAudio } from '@/utils/kidsAudio'
import { KidsStoryIcon } from './KidsStoryIcon'
import { cn } from '@/utils/cn'

type KidsInteractiveBookProps = {
  initialStoryId?: 'creation' | 'story2' | string
  onBack: () => void
  onRewardXP: (amount: number) => void
  onUnlockArtifact: (name: string) => void
}

export function KidsInteractiveBook({
  initialStoryId = 'creation',
  onBack,
  onRewardXP,
  onUnlockArtifact,
}: KidsInteractiveBookProps) {
  // Current active story: 'creation' or 'story2'
  const [activeStoryId, setActiveStoryId] = useState<string>(
    initialStoryId === 'story2' || initialStoryId === 'sadness' ? 'story2' : 'creation'
  )

  const activeStory = getStoryById(activeStoryId)

  // Current page index
  const [currentIndex, setCurrentIndex] = useState(() => {
    try {
      const saved = localStorage.getItem(`rooted_${activeStoryId}_saved_page`)
      const p = saved ? parseInt(saved, 10) : 0
      return p >= 0 && p < activeStory.panels.length ? p : 0
    } catch {
      return 0
    }
  })

  // Reading settings
  const [bedtimeMode, setBedtimeMode] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isReadingAloud, setIsReadingAloud] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [showStoryPicker, setShowStoryPicker] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeHotspotFact, setActiveHotspotFact] = useState<string | null>(null)
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({})
  const [completedStory, setCompletedStory] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  // Special interactive toys
  const [dayNightState, setDayNightState] = useState<'day' | 'night'>('day')
  const [starCount, setStarCount] = useState(0)
  const [breathTriggered, setBreathTriggered] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const currentPanel: StoryPanelData = activeStory.panels[currentIndex] || activeStory.panels[0]

  // Sync sound setting
  useEffect(() => {
    kidsAudio.setEnabled(soundEnabled)
  }, [soundEnabled])

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(`rooted_${activeStoryId}_saved_page`, currentIndex.toString())
    } catch {
      // ignore
    }
  }, [activeStoryId, currentIndex])

  // Reset or stop speech when page changes
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsReadingAloud(false)
    }
    setActiveHotspotFact(null)
    setBreathTriggered(false)
  }, [currentIndex, activeStoryId])

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  // Play panel intro sound
  useEffect(() => {
    if (!soundEnabled || !currentPanel) return
    const s = currentPanel.soundEffect
    if (s === 'twinkle') kidsAudio.twinkle()
    else if (s === 'chime') kidsAudio.chime()
    else if (s === 'splash') kidsAudio.splash()
    else if (s === 'chirp') kidsAudio.chirp()
    else if (s === 'breath') kidsAudio.breathOfLife()
    else if (s === 'fanfare') kidsAudio.fanfare()
  }, [currentIndex, soundEnabled, currentPanel?.soundEffect])

  // Switch Story
  const handleSelectStory = (storyId: string) => {
    kidsAudio.chime()
    setActiveStoryId(storyId)
    setCurrentIndex(0)
    setCompletedStory(false)
    setShowStoryPicker(false)
  }

  // Text-To-Speech "Read to Me"
  const toggleReadAloud = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.')
      return
    }

    if (isReadingAloud) {
      window.speechSynthesis.cancel()
      setIsReadingAloud(false)
      return
    }

    const text = currentPanel.audioText || currentPanel.text
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.86 // warm, gentle pacing for kids
    utterance.pitch = 1.06 // warm and friendly

    const voices = window.speechSynthesis.getVoices()
    const friendlyVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') ||
          v.name.includes('Samantha') ||
          v.name.includes('Karen') ||
          v.name.includes('Google'))
    )
    if (friendlyVoice) utterance.voice = friendlyVoice

    utterance.onend = () => {
      setIsReadingAloud(false)
    }
    utterance.onerror = () => {
      setIsReadingAloud(false)
    }

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    setIsReadingAloud(true)
  }

  // Page turns
  const handlePrev = () => {
    if (currentIndex > 0) {
      kidsAudio.pageTurn()
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < activeStory.panels.length - 1) {
      kidsAudio.pageTurn()
      setCurrentIndex((prev) => prev + 1)
    } else if (!completedStory) {
      kidsAudio.fanfare()
      setCompletedStory(true)
      onRewardXP(50)
      onUnlockArtifact(
        activeStoryId === 'story2' ? 'Hope in Christ Badge' : 'Creation Explorer Badge'
      )
    }
  }

  const handleHotspotClick = (h: { sound: string; funFact: string }) => {
    if (h.sound === 'twinkle') kidsAudio.twinkle()
    else if (h.sound === 'splash') kidsAudio.splash()
    else if (h.sound === 'chirp') kidsAudio.chirp()
    else if (h.sound === 'chime') kidsAudio.chime()
    else if (h.sound === 'breath') kidsAudio.breathOfLife()
    else if (h.sound === 'fanfare') kidsAudio.fanfare()

    setActiveHotspotFact(h.funFact)
    setTimeout(() => {
      setActiveHotspotFact(null)
    }, 4500)
  }

  const questionKey = `${activeStoryId}_${currentIndex}`
  const handleAnswerQuestion = (correct: boolean, rewardXP: number) => {
    if (correct) {
      kidsAudio.twinkle()
      setAnsweredQuestions((prev) => ({ ...prev, [questionKey]: true }))
      onRewardXP(rewardXP)
    } else {
      kidsAudio.chime(300)
    }
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  const handleBookmarkToggle = () => {
    setBookmarked(!bookmarked)
    kidsAudio.chime(650)
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative min-h-[92vh] flex flex-col rounded-3xl border-2 shadow-2xl transition-colors duration-500 overflow-hidden select-none',
        bedtimeMode
          ? 'bg-[#16121b] border-amber-900/40 text-amber-100'
          : 'bg-gradient-to-b from-[#18132d] via-[#140f26] to-[#0d091b] border-purple-800/40 text-white'
      )}
    >
      {/* ========================================================================= */}
      {/* TOP KINDLE / STORYBOOK TOOLBAR                                            */}
      {/* ========================================================================= */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel()
              }
              onBack()
            }}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-transform active:scale-95"
            title="Exit Story"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Story Selector Button */}
          <div className="relative">
            <button
              onClick={() => setShowStoryPicker(!showStoryPicker)}
              className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3.5 py-1.5 text-left hover:bg-white/15 transition-all"
            >
              <KidsStoryIcon name={activeStoryId === 'story2' ? 'shield' : 'sprout'} className="h-4 w-4 text-coral-400" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-xs sm:text-sm font-bold text-white truncate max-w-[170px] sm:max-w-xs">
                    {activeStory.title}
                  </span>
                  <span className="rounded-full bg-coral-500/90 px-1.5 py-0.2 text-[9px] font-black text-white uppercase tracking-wider">
                    {activeStoryId === 'story2' ? 'Story 2' : 'Story 1'}
                  </span>
                </div>
                <p className="text-[10px] text-purple-200">
                  Page {currentPanel.pageNumber} of {activeStory.totalPanels}
                </p>
              </div>
              <Layers className="h-3.5 w-3.5 text-purple-300 ml-1 shrink-0" />
            </button>

            {/* Story Picker Dropdown */}
            {showStoryPicker && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl border border-white/20 bg-[#191330] p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95">
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300 px-2 py-1">
                  Select Bible Storybook
                </div>
                {BIBLE_STORIES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectStory(s.id)}
                    className={cn(
                      'flex items-center gap-3 w-full rounded-xl p-2.5 text-left transition-colors',
                      activeStoryId === s.id
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-purple-100 hover:bg-white/10'
                    )}
                  >
                    <img
                      src={s.coverImage}
                      alt=""
                      className="h-10 w-10 object-cover rounded-lg border border-white/20 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{s.title}</div>
                      <div className="text-[10px] opacity-80">{s.totalPanels} Illustrated Panels</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Read Aloud "Kindle Voice" */}
          <button
            onClick={toggleReadAloud}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all active:scale-95 shadow-sm',
              isReadingAloud
                ? 'bg-coral-500 text-white ring-2 ring-coral-300 animate-pulse'
                : 'bg-white/10 text-white hover:bg-white/20'
            )}
            title="Read To Me (Voice Narration)"
          >
            <Volume2 className="h-4 w-4" />
            <span className="hidden sm:inline">{isReadingAloud ? 'Pause Voice' : 'Read to Me'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title={soundEnabled ? 'Mute Chimes' : 'Enable Chimes'}
          >
            {soundEnabled ? (
              <Sparkles className="h-4 w-4 text-yellow-300" />
            ) : (
              <VolumeX className="h-4 w-4 text-gray-400" />
            )}
          </button>

          {/* Bedtime Warm Mode Toggle */}
          <button
            onClick={() => setBedtimeMode(!bedtimeMode)}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
              bedtimeMode ? 'bg-amber-500/80 text-white' : 'bg-white/10 text-white hover:bg-white/20'
            )}
            title={bedtimeMode ? 'Daylight Mode' : 'Bedtime Warm Amber'}
          >
            {bedtimeMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          {/* Bookmark Ribbon */}
          <button
            onClick={handleBookmarkToggle}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Save Page"
          >
            <Bookmark
              className={cn('h-4 w-4', bookmarked ? 'fill-coral-500 text-coral-500' : 'text-white')}
            />
          </button>

          {/* Table of Contents Drawer */}
          <button
            onClick={() => setShowDrawer(!showDrawer)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="View All Pages"
          >
            <List className="h-4 w-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN STORYBOOK STAGE: FITTING IMAGES & COHESIVE TEXT                      */}
      {/* ========================================================================= */}
      <div className="relative flex-1 flex flex-col items-center justify-start p-3 sm:p-5 overflow-y-auto scrollbar-thin">
        {/* Bedtime overlay */}
        {bedtimeMode && (
          <div className="pointer-events-none absolute inset-0 z-10 bg-amber-600/10 mix-blend-color" />
        )}

        {/* CONTAINER FOR ARTWORK + STORY TEXT */}
        <div className="w-full max-w-2xl flex flex-col items-center gap-4 py-2">
          {/* ARTWORK FRAME (FITS ANY ASPECT RATIO NATURALLY) */}
          <div className="relative w-full rounded-[26px] overflow-hidden border-2 border-white/20 bg-black/50 shadow-2xl flex items-center justify-center min-h-[220px] sm:min-h-[300px] max-h-[52vh]">
            <img
              src={currentPanel.panelFile}
              alt={currentPanel.title}
              className={cn(
                'max-h-[50vh] sm:max-h-[52vh] w-auto max-w-full object-contain mx-auto transition-all duration-300 rounded-2xl',
                dayNightState === 'night' && currentPanel.id === 7 && 'brightness-75 contrast-125'
              )}
            />

            {/* INTERACTIVE HOTSPOTS ON THE PANEL (USING LUCIDE ICONS - NO EMOJIS) */}
            {currentPanel.hotspots?.map((spot) => (
              <button
                key={spot.id}
                onClick={() => handleHotspotClick(spot)}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex items-center justify-center active:scale-95"
                title={spot.label}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-500/90 text-white shadow-lg shadow-coral-500/50 ring-4 ring-white/40 animate-bounce group-hover:scale-125 transition-transform">
                  <KidsStoryIcon
                    name={spot.iconName || 'sparkles'}
                    className="h-4 w-4 text-white"
                  />
                </span>
                <span className="pointer-events-none absolute bottom-full mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg bg-black/90 px-2.5 py-1 text-[11px] font-bold text-white whitespace-nowrap shadow-md border border-white/20">
                  {spot.label}
                </span>
              </button>
            ))}

            {/* SPECIAL TOY: DAY 1 LIGHT SWITCH (PANEL 7 IN STORY 1) */}
            {activeStoryId === 'creation' && currentPanel.id === 7 && (
              <div className="absolute top-3 right-3 z-20 rounded-2xl bg-black/80 p-1.5 backdrop-blur-md border border-white/20 flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => {
                    kidsAudio.twinkle()
                    setDayNightState('day')
                  }}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold transition-all',
                    dayNightState === 'day'
                      ? 'bg-amber-400 text-black shadow-sm'
                      : 'text-gray-300 hover:text-white'
                  )}
                >
                  <Sun className="h-3.5 w-3.5 text-amber-900" />
                  <span>Day</span>
                </button>
                <button
                  onClick={() => {
                    kidsAudio.chime()
                    setDayNightState('night')
                  }}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold transition-all',
                    dayNightState === 'night'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-300 hover:text-white'
                  )}
                >
                  <Moon className="h-3.5 w-3.5 text-white" />
                  <span>Night</span>
                </button>
              </div>
            )}

            {/* SPECIAL TOY: DAY 4 TAP-TO-COUNT STARS (PANEL 11 IN STORY 1) */}
            {activeStoryId === 'creation' && currentPanel.id === 11 && (
              <div className="absolute top-3 left-3 z-20 rounded-2xl bg-purple-950/80 p-2 backdrop-blur-md border border-purple-400/30 text-xs">
                <button
                  onClick={() => {
                    kidsAudio.twinkle()
                    setStarCount((c) => c + 1)
                  }}
                  className="flex items-center gap-1.5 font-bold text-yellow-300 active:scale-95 transition-transform"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Count Stars: {starCount}</span>
                </button>
              </div>
            )}

            {/* SPECIAL TOY: DAY 2 BREATH OF LIFE (PANEL 2 IN STORY 1) */}
            {activeStoryId === 'creation' && currentPanel.id === 2 && (
              <button
                onClick={() => {
                  kidsAudio.breathOfLife()
                  setBreathTriggered(true)
                  setTimeout(() => setBreathTriggered(false), 2000)
                }}
                className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-2xl bg-coral-500/90 px-3 py-1.5 text-xs font-black text-white shadow-lg active:scale-95 transition-all"
              >
                <KidsStoryIcon name="wind" className="h-3.5 w-3.5 text-white" />
                <span>Breath of Life</span>
              </button>
            )}

            {breathTriggered && (
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-yellow-300/40 via-coral-400/30 to-transparent animate-pulse" />
            )}

            {/* Fun Fact Toast Popup */}
            {activeHotspotFact && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 max-w-sm rounded-2xl border-2 border-yellow-300/80 bg-black/95 p-3.5 shadow-2xl text-center backdrop-blur-md animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-center gap-1.5 text-yellow-400 text-xs font-bold mb-1">
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>Did you know?</span>
                </div>
                <p className="text-xs font-medium text-yellow-100 leading-relaxed">
                  {activeHotspotFact}
                </p>
              </div>
            )}
          </div>

          {/* DEDICATED STORY TEXT CARD (NATURAL STORYBOOK FLOW) */}
          <div
            className={cn(
              'w-full rounded-[24px] border p-5 sm:p-6 shadow-xl transition-all',
              bedtimeMode
                ? 'bg-[#211a29]/90 border-amber-800/40 text-amber-100'
                : 'bg-white/10 border-white/15 text-white backdrop-blur-md'
            )}
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-coral-400 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" />
                {currentPanel.dayLabel || `Page ${currentPanel.pageNumber}`}
              </span>
              <span className="font-mono text-xs text-purple-200">
                {currentPanel.pageNumber} of {activeStory.totalPanels}
              </span>
            </div>

            <p className="font-serif text-base sm:text-lg md:text-xl font-medium leading-relaxed tracking-wide drop-shadow-sm">
              {currentPanel.text}
            </p>

            {currentPanel.interactivePrompt && (
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-purple-200 bg-white/5 rounded-xl px-3 py-2 border border-white/10">
                <Sparkles className="h-4 w-4 text-yellow-300 shrink-0" />
                <span>{currentPanel.interactivePrompt}</span>
              </div>
            )}
          </div>

          {/* WONDER QUESTION (ROOTI'S CHECK-IN POPUP) */}
          {currentPanel.wonderQuestion && !answeredQuestions[questionKey] && (
            <div className="w-full rounded-2xl border-2 border-emerald-400/40 bg-emerald-950/80 p-4 shadow-xl backdrop-blur-md">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                  <Sprout className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                    <span>ROOTI&apos;s Wonder Question</span>
                    <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px]">
                      +{currentPanel.wonderQuestion.rewardXP} XP
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white mt-1">
                    {currentPanel.wonderQuestion.question}
                  </p>

                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {currentPanel.wonderQuestion.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() =>
                          handleAnswerQuestion(opt.correct, currentPanel.wonderQuestion!.rewardXP)
                        }
                        className="rounded-xl border border-emerald-400/30 bg-emerald-900/50 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700/60 active:scale-95 transition-all text-left"
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Question Answered Badge */}
          {currentPanel.wonderQuestion && answeredQuestions[questionKey] && (
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3.5 py-1.5 text-xs font-bold text-emerald-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Great job! You answered ROOTI&apos;s question!</span>
            </div>
          )}

          {/* STORY COMPLETED MODAL / BADGE */}
          {completedStory && currentIndex === activeStory.panels.length - 1 && (
            <div className="w-full rounded-3xl border-4 border-yellow-300 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 p-6 text-center shadow-2xl animate-in zoom-in-95">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-indigo-950 shadow-lg">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-black text-white mt-3">
                Story Completed, Explorer!
              </h3>
              <p className="text-sm text-yellow-200 mt-1 max-w-md mx-auto">
                You finished &ldquo;{activeStory.title}&rdquo;! You earned{' '}
                <strong>+50 Seedling XP</strong> and unlocked a new Badge in your Tree Garden!
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    kidsAudio.chime()
                    setCurrentIndex(0)
                    setCompletedStory(false)
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/20 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/30 transition-all"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Read Again</span>
                </button>

                {/* Option to read the other story */}
                <button
                  onClick={() =>
                    handleSelectStory(activeStoryId === 'creation' ? 'story2' : 'creation')
                  }
                  className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 text-indigo-950 px-4 py-2.5 text-xs font-black hover:bg-amber-300 transition-all"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>
                    Read {activeStoryId === 'creation' ? "Story 2: Man's Sadness" : 'Story 1: Creation'}
                  </span>
                </button>

                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-2 rounded-2xl bg-coral-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-coral-600 transition-all"
                >
                  <Sprout className="h-4 w-4" />
                  <span>Visit My Tree Garden</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM READING CONTROLS & PROGRESS BAR                                    */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md z-30">
        <div className="mx-auto max-w-3xl flex items-center justify-between gap-4">
          {/* Previous Page Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={cn(
              'flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all active:scale-95',
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed bg-white/5 text-white/50'
                : 'bg-white/10 hover:bg-white/20 text-white shadow-md'
            )}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Interactive Progress Bar */}
          <div className="flex-1 max-w-md px-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-purple-200 mb-1.5">
              <span>{activeStory.scripture}</span>
              <span>
                Page {currentIndex + 1} of {activeStory.totalPanels}
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-coral-500 via-purple-400 to-emerald-400 transition-all duration-300 shadow-sm"
                style={{
                  width: `${((currentIndex + 1) / activeStory.totalPanels) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Next Page Button */}
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 px-5 py-2.5 text-xs font-black text-white shadow-lg active:scale-95 transition-all"
          >
            <span className="hidden sm:inline">
              {currentIndex === activeStory.totalPanels - 1 ? 'Finish!' : 'Next'}
            </span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* TABLE OF CONTENTS DRAWER                                                  */}
      {/* ========================================================================= */}
      {showDrawer && (
        <div className="absolute inset-y-0 right-0 z-40 w-80 max-w-[85vw] border-l border-white/20 bg-[#120d24]/98 p-4 backdrop-blur-xl shadow-2xl flex flex-col">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-coral-400" />
              <h3 className="font-serif text-sm font-bold text-white">
                All {activeStory.totalPanels} Pages
              </h3>
            </div>
            <button
              onClick={() => setShowDrawer(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3 space-y-2 scrollbar-thin">
            {activeStory.panels.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  kidsAudio.chime()
                  setCurrentIndex(idx)
                  setShowDrawer(false)
                }}
                className={cn(
                  'flex items-center gap-3 w-full rounded-xl p-2 text-left transition-colors',
                  currentIndex === idx
                    ? 'bg-purple-600 text-white ring-2 ring-purple-300'
                    : 'bg-white/5 text-purple-200 hover:bg-white/10'
                )}
              >
                <img
                  src={p.panelFile}
                  alt=""
                  className="h-12 w-16 object-cover rounded-lg border border-white/20 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase text-coral-400">
                    {p.dayLabel || `Page ${p.pageNumber}`}
                  </div>
                  <div className="text-xs font-bold text-white truncate">{p.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
