import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  FileText,
  Volume2,
  Play,
  Pause,
  Square,
  Send,
  Sparkles,
  MessageCircle,
  X,
  ThumbsUp,
  MapPin,
  Check,
  BookOpen,
  ListOrdered,
  ChevronDown,
} from 'lucide-react'
import { BOOKS } from '@/constants/bible'
import { bibleService } from '@/services/bible.service'
import { ttsService, type TTSState } from '@/services/tts.service'
import { useBibleStore } from '@/store/bibleStore'
import { cn } from '@/utils/cn'

const FONT_SIZES = [
  { label: 'Small', bodyClass: 'text-[16px] sm:text-[17px] leading-[1.8]' },
  { label: 'Medium', bodyClass: 'text-[18px] sm:text-[20px] leading-[1.9]' },
  { label: 'Large', bodyClass: 'text-[21px] sm:text-[24px] leading-[2.1]' },
]

export function BibleReader() {
  const navigate = useNavigate()
  const { book = 'genesis', chapter = '1' } = useParams()
  const [searchParams] = useSearchParams()
  const chapterNum = Number(chapter) || 1

  const translation = useBibleStore((s) => s.translation)
  const highlightedVerses = useBibleStore((s) => s.highlightedVerses)
  const toggleHighlight = useBibleStore((s) => s.toggleHighlight)
  const bookmarkedVerses = useBibleStore((s) => s.bookmarkedVerses)
  const toggleBookmark = useBibleStore((s) => s.toggleBookmark)

  // Community Comments & Discussion Store
  const comments = useBibleStore((s) => s.comments)
  const addComment = useBibleStore((s) => s.addComment)
  const toggleCommentLike = useBibleStore((s) => s.toggleCommentLike)
  const addReply = useBibleStore((s) => s.addReply)

  const [fontSizeIdx, setFontSizeIdx] = useState(1)
  const [selectedVerse, setSelectedVerse] = useState<number>(Number(searchParams.get('verse')) || 3)
  const [actionBarOpen, setActionBarOpen] = useState(true)
  const [discussionOpen, setDiscussionOpen] = useState<boolean>(searchParams.get('discuss') === 'true')
  const [copiedToast, setCopiedToast] = useState(false)
  const [verseJumpOpen, setVerseJumpOpen] = useState(false)

  // TTS State
  const [ttsState, setTtsState] = useState<TTSState>('idle')
  const [ttsRate, setTtsRate] = useState<number>(1.0)
  const [activeSpeakingVerse, setActiveSpeakingVerse] = useState<number | null>(null)
  const [showTtsBar, setShowTtsBar] = useState<boolean>(false)

  // Discussion Form State
  const [commentText, setCommentText] = useState('')
  const [replyingToId, setReplyingToId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [authorName, setAuthorName] = useState('Faith Okonjo')
  const [authorLocation, setAuthorLocation] = useState('Nairobi, Kenya')

  const meta = BOOKS.find((b) => b.slug === book)
  const bookName = meta?.name ?? book.charAt(0).toUpperCase() + book.slice(1)
  const chapterKey = `${book}-${chapterNum}`

  // Real live data from HelloAO API (with fallbacks)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['helloao-chapter', book, chapterNum, translation],
    queryFn: () => bibleService.fetchChapter(meta?.name ?? book, chapterNum, translation),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  })

  // Clean up TTS when navigating away or unmounting
  useEffect(() => {
    return () => {
      ttsService.stop()
    }
  }, [book, chapterNum])

  // Deep-link support: jump straight to ?verse=N once the chapter loads
  useEffect(() => {
    const target = Number(searchParams.get('verse'))
    if (!data || !target) return
    setSelectedVerse(target)
    const el = document.getElementById(`verse-${target}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [data, searchParams])

  const handleJumpToVerse = (verseNum: number) => {
    setSelectedVerse(verseNum)
    setActionBarOpen(true)
    setVerseJumpOpen(false)
    document.getElementById(`verse-${verseNum}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const currentVerseRef = `${bookName} ${chapterNum}:${selectedVerse}`

  // Filter comments for this verse
  const verseComments = useMemo(() => {
    return comments.filter(
      (c) => c.verseRef.toLowerCase() === currentVerseRef.toLowerCase(),
    )
  }, [comments, currentVerseRef])

  const handleSelectVerse = (verseNum: number) => {
    setSelectedVerse(verseNum)
    setActionBarOpen(true)
    toggleHighlight(chapterKey, verseNum)
  }

  const handleShareVerse = () => {
    const activeVerseObj = data?.verses.find((v) => v.verse === selectedVerse)
    const shareText = `"${activeVerseObj?.text ?? ''}" — ${bookName} ${chapterNum}:${selectedVerse} (${translation.toUpperCase()}) on ROOTED`

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText)
      setCopiedToast(true)
      setTimeout(() => setCopiedToast(false), 2500)
    }
  }

  // --- TTS CONTROLS ---
  const handleStartChapterTTS = () => {
    if (!data?.verses || data.verses.length === 0) return

    setShowTtsBar(true)
    if (ttsState === 'paused') {
      ttsService.resume()
      setTtsState('playing')
      return
    }

    setTtsState('playing')
    // Find index of selected verse to start narration from, or 0
    const startIdx = Math.max(0, data.verses.findIndex((v) => v.verse === selectedVerse))

    ttsService.startChapterNarration(
      data.verses,
      startIdx,
      (currentVerseNum) => {
        setActiveSpeakingVerse(currentVerseNum)
        // Auto-scroll verse into view smoothly
        const el = document.getElementById(`verse-${currentVerseNum}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      },
      () => {
        setTtsState('idle')
        setActiveSpeakingVerse(null)
      },
    )
  }

  const handlePauseTTS = () => {
    ttsService.pause()
    setTtsState('paused')
  }

  const handleStopTTS = () => {
    ttsService.stop()
    setTtsState('idle')
    setActiveSpeakingVerse(null)
    setShowTtsBar(false)
  }

  const handleSpeakSingleVerse = (verseNum: number, text: string) => {
    setShowTtsBar(true)
    setTtsState('playing')
    setActiveSpeakingVerse(verseNum)
    ttsService.speakVerse(verseNum, text, () => {
      setTtsState('idle')
      setActiveSpeakingVerse(null)
    })
  }

  const handleToggleRate = () => {
    const rates = [0.8, 1.0, 1.25, 1.5]
    const currentIdx = rates.indexOf(ttsRate)
    const nextRate = rates[(currentIdx + 1) % rates.length]
    setTtsRate(nextRate)
    ttsService.setRate(nextRate)
  }

  // --- DISCUSSION FORM ---
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return

    addComment(currentVerseRef, commentText.trim(), authorName, authorLocation)
    setCommentText('')
  }

  const handlePostReply = (commentId: string) => {
    if (!replyText.trim()) return

    addReply(commentId, replyText.trim(), authorName)
    setReplyText('')
    setReplyingToId(null)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-indigo-950 pb-20">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-purple-100/70 shadow-2xs">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/app/bible')}
              className="flex h-9 w-9 items-center justify-center rounded-full text-indigo-900 hover:bg-purple-50 transition-colors"
              aria-label="Back to Bible Books"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Book/Chapter Button -> opens the chapter picker */}
            <button
              onClick={() => navigate(`/app/bible/${book}`)}
              className="flex items-center gap-1.5 text-xs font-black tracking-widest uppercase text-indigo-950 hover:text-purple-700 transition-colors rounded-lg px-2 py-1 hover:bg-purple-50"
              title="Pick a different chapter"
            >
              <BookOpen className="h-4 w-4 text-purple-600 hidden sm:block" />
              <span>{bookName} {chapterNum}</span>
            </button>

            <span className="text-purple-300">·</span>

            {/* Translation Button */}
            <button
              onClick={() => navigate('/app/bible/translations')}
              className="text-xs font-black tracking-widest uppercase text-purple-700 hover:text-purple-900 transition-colors rounded-lg px-2 py-1 hover:bg-purple-50"
              title="Change translation (HelloAO live catalog)"
            >
              {translation}
            </button>
          </div>

          {/* Right Header: Community Discussion, TTS Audio & Font Size */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDiscussionOpen(!discussionOpen)}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all shadow-2xs',
                discussionOpen
                  ? 'bg-purple-700 text-white shadow-purple-900/20'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100',
              )}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Discussion</span>
              <span className="rounded-full bg-white/20 px-1.5 text-[10px]">
                {verseComments.length}
              </span>
            </button>

            {/* Real TTS Button */}
            <button
              onClick={() => {
                if (ttsState === 'playing') {
                  handlePauseTTS()
                } else {
                  handleStartChapterTTS()
                }
              }}
              className={cn(
                'flex h-9 items-center gap-1 px-3 rounded-full text-xs font-bold transition-colors shadow-2xs',
                ttsState === 'playing'
                  ? 'bg-purple-700 text-white animate-pulse'
                  : ttsState === 'paused'
                  ? 'bg-amber-600 text-white'
                  : 'bg-purple-50 text-indigo-900 hover:bg-purple-100',
              )}
              title="Listen to chapter with Text-To-Speech"
            >
              <Volume2 className="h-4 w-4" />
              <span className="hidden sm:inline">
                {ttsState === 'playing' ? 'Pause' : ttsState === 'paused' ? 'Resume' : 'TTS Audio'}
              </span>
            </button>

            {/* Font Size AA Button */}
            <button
              onClick={() => setFontSizeIdx((i) => (i + 1) % FONT_SIZES.length)}
              className="flex h-9 px-2.5 items-center justify-center rounded-lg text-xs font-black tracking-wider text-indigo-900 hover:bg-purple-50 transition-colors"
              title={`Font Size: ${FONT_SIZES[fontSizeIdx].label}`}
            >
              AA
            </button>
          </div>
        </div>

        {/* Reading Progress Line */}
        <div className="h-0.5 w-full bg-purple-50">
          <div className="h-full w-1/4 bg-purple-600 rounded-full" />
        </div>
      </header>

      {/* Floating Interactive TTS Player Bar */}
      {showTtsBar && (
        <div className="sticky top-14 z-20 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white px-4 py-2.5 shadow-lg animate-fade-in">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Volume2 className="h-4 w-4 animate-pulse text-purple-200" />
              </div>
              <div>
                <p className="text-xs font-bold">
                  {ttsState === 'playing' ? 'Reading Scripture' : 'Speech Paused'}
                  {activeSpeakingVerse ? ` · Verse ${activeSpeakingVerse}` : ''}
                </p>
                <p className="text-[10px] text-purple-200">
                  Real Web Speech Text-to-Speech ({translation.toUpperCase()})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Speed toggle */}
              <button
                onClick={handleToggleRate}
                className="rounded-lg bg-white/10 px-2 py-1 text-xs font-bold hover:bg-white/20"
                title="Playback Speed"
              >
                {ttsRate}x
              </button>

              {/* Play / Pause */}
              {ttsState === 'playing' ? (
                <button
                  onClick={handlePauseTTS}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-purple-950 shadow-xs hover:bg-purple-50"
                  title="Pause TTS"
                >
                  <Pause className="h-4 w-4 fill-current" />
                </button>
              ) : (
                <button
                  onClick={handleStartChapterTTS}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-purple-950 shadow-xs hover:bg-purple-50"
                  title="Play TTS"
                >
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                </button>
              )}

              {/* Stop */}
              <button
                onClick={handleStopTTS}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                title="Stop TTS"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </button>

              {/* Close */}
              <button
                onClick={handleStopTTS}
                className="text-purple-300 hover:text-white p-1 text-xs ml-1"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Responsive Grid Layout */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
          {/* Main Reading Pane */}
          <main className={cn(
            'flex-1 rounded-3xl bg-white p-6 sm:p-10 lg:p-12 shadow-sm ring-1 ring-purple-100/70 transition-all',
            discussionOpen ? 'lg:max-w-[65%]' : 'max-w-4xl mx-auto',
          )}>
            {/* Title & Heading from HelloAO API */}
            <div className="text-center pb-6 border-b border-purple-100/60">
              <h2 className="font-serif italic text-3xl sm:text-4xl text-indigo-950 font-bold tracking-tight">
                {bookName} {chapterNum}
              </h2>
              {data?.heading && (
                <h3 className="mt-2 text-base sm:text-lg font-bold tracking-tight text-purple-800">
                  {data.heading}
                </h3>
              )}
              {data?.translationName && (
                <p className="mt-1 text-xs text-indigo-400 font-medium">
                  {data.translationName}
                </p>
              )}

              {/* Jump to a specific verse */}
              {data && data.verses.length > 0 && (
                <div className="relative mt-4 flex justify-center">
                  <button
                    onClick={() => setVerseJumpOpen((v) => !v)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors shadow-2xs',
                      verseJumpOpen
                        ? 'bg-purple-700 text-white'
                        : 'bg-purple-50 text-purple-800 hover:bg-purple-100',
                    )}
                  >
                    <ListOrdered className="h-3.5 w-3.5" />
                    <span>Verse {selectedVerse}</span>
                    <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', verseJumpOpen && 'rotate-180')} />
                  </button>

                  {verseJumpOpen && (
                    <div className="absolute top-full z-30 mt-2 w-72 max-h-64 overflow-y-auto rounded-2xl bg-white p-3 shadow-xl ring-1 ring-purple-100 animate-fade-in">
                      <div className="grid grid-cols-6 gap-1.5">
                        {data.verses.map((v) => (
                          <button
                            key={v.verse}
                            onClick={() => handleJumpToVerse(v.verse)}
                            className={cn(
                              'flex aspect-square items-center justify-center rounded-lg text-xs font-bold transition-colors',
                              v.verse === selectedVerse
                                ? 'bg-purple-700 text-white'
                                : 'bg-purple-50/60 text-indigo-900 hover:bg-purple-100',
                            )}
                          >
                            {v.verse}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Loading Skeleton */}
            {isLoading && (
              <div className="mt-8 space-y-4">
                <div className="h-5 w-full animate-pulse rounded-full bg-purple-100/60" />
                <div className="h-5 w-11/12 animate-pulse rounded-full bg-purple-100/60" />
                <div className="h-5 w-4/5 animate-pulse rounded-full bg-purple-100/60" />
                <div className="h-5 w-full animate-pulse rounded-full bg-purple-100/60" />
              </div>
            )}

            {isError && !data && (
              <div className="py-12 text-center">
                <p className="text-base font-bold text-indigo-950">Could not load chapter text</p>
                <p className="text-xs text-indigo-500 mt-1">
                  Please check your internet connection or switch to another translation.
                </p>
                <button
                  onClick={() => navigate('/app/bible/translations')}
                  className="mt-4 rounded-xl bg-purple-700 px-4 py-2 text-xs font-bold text-white shadow-xs"
                >
                  Choose Translation
                </button>
              </div>
            )}

            {/* Scripture Flowing Verses */}
            {data && (
              <div className={cn('mt-8 font-serif text-indigo-950/90 selection:bg-purple-100', FONT_SIZES[fontSizeIdx].bodyClass)}>
                {data.verses.map((v) => {
                  const isSelected = selectedVerse === v.verse
                  const isSpeaking = activeSpeakingVerse === v.verse
                  const isHighlighted = isSelected || highlightedVerses[chapterKey]?.includes(v.verse)

                  return (
                    <span key={v.verse}>
                      {/* Section subheadings from HelloAO API */}
                      {v.heading && (
                        <span className="block font-sans font-bold text-base sm:text-lg text-indigo-950 mt-6 mb-2 tracking-tight">
                          {v.heading}
                        </span>
                      )}

                      <span
                        id={`verse-${v.verse}`}
                        onClick={() => handleSelectVerse(v.verse)}
                        className={cn(
                          'relative cursor-pointer transition-all duration-150 inline rounded px-1 py-0.5',
                          isSpeaking
                            ? 'bg-purple-200 text-purple-950 ring-2 ring-purple-500 shadow-md font-medium'
                            : isHighlighted
                            ? 'bg-amber-100/90 text-amber-950 ring-2 ring-amber-300/70 shadow-xs'
                            : 'hover:bg-purple-50',
                        )}
                      >
                        {/* Superscript Verse Number */}
                        <sup className="mr-1.5 text-xs font-sans font-semibold text-purple-600 select-none">
                          {v.verse}
                        </sup>
                        {v.text}{' '}

                        {/* Floating Context Action Bar on Selected Verse */}
                        {isSelected && actionBarOpen && (
                          <span
                            onClick={(e) => e.stopPropagation()}
                            className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 rounded-2xl bg-white px-2.5 py-1.5 shadow-xl ring-1 ring-purple-100 animate-fade-in text-indigo-900"
                          >
                            {/* 🔊 Text-To-Speech Verse Button */}
                            <button
                              onClick={() => handleSpeakSingleVerse(v.verse, v.text)}
                              className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-purple-100 text-purple-700 transition-colors"
                              title="Read Verse Aloud (TTS)"
                            >
                              <Volume2 className="h-4 w-4" />
                            </button>

                            {/* 📝 Notepad icon for Discussion */}
                            <button
                              onClick={() => setDiscussionOpen(true)}
                              className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-purple-100 text-purple-700 transition-colors"
                              title="Open Verse Discussion"
                            >
                              <FileText className="h-4 w-4" />
                            </button>

                            {/* 💛 Heart icon for bookmark */}
                            <button
                              onClick={() => toggleBookmark(currentVerseRef)}
                              className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-amber-50 text-amber-500 transition-colors"
                              title="Love / Bookmark Verse"
                            >
                              <Heart
                                className={cn(
                                  'h-4 w-4',
                                  bookmarkedVerses.includes(currentVerseRef) && 'fill-amber-400 text-amber-500',
                                )}
                              />
                            </button>

                            {/* ↗ Share icon */}
                            <button
                              onClick={handleShareVerse}
                              className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-purple-50 text-indigo-700 transition-colors"
                              title="Share Verse"
                            >
                              <Share2 className="h-4 w-4" />
                            </button>

                            {/* ✕ Close action bar */}
                            <button
                              onClick={() => setActionBarOpen(false)}
                              className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-purple-50 text-indigo-400 transition-colors"
                              title="Close"
                              aria-label="Close verse actions"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </span>
                        )}
                      </span>
                    </span>
                  )
                })}
              </div>
            )}

            {/* Quick Toast on Share Copy */}
            {copiedToast && (
              <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-indigo-950 px-5 py-2.5 text-xs font-semibold text-white shadow-2xl animate-fade-in">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Verse copied to clipboard</span>
              </div>
            )}

            {/* Chapter Navigation Footer */}
            <div className="mt-12 flex items-center justify-between border-t border-purple-100 pt-6">
              <button
                onClick={() => {
                  if (chapterNum > 1) {
                    navigate(`/app/bible/${book}/${chapterNum - 1}`)
                  }
                }}
                disabled={chapterNum <= 1}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-purple-700 disabled:opacity-30 hover:text-purple-900 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous Chapter</span>
              </button>

              <span className="text-xs sm:text-sm font-bold text-indigo-400">
                Chapter {chapterNum}
              </span>

              <button
                onClick={() => navigate(`/app/bible/${book}/${chapterNum + 1}`)}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-purple-700 hover:text-purple-900 transition-colors"
              >
                <span>Next Chapter</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </main>

          {/* ========================================================================= */}
          {/* COMMUNITY DISCUSSION PANE: Desktop Side Panel (lg) OR Mobile Bottom Drawer */}
          {/* ========================================================================= */}
          {discussionOpen && (
            <aside className="fixed inset-0 z-50 flex items-end justify-center bg-indigo-950/60 backdrop-blur-xs lg:static lg:inset-auto lg:z-auto lg:flex lg:w-[380px] lg:shrink-0 lg:bg-transparent lg:backdrop-blur-none animate-fade-in">
              <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-t-[32px] bg-white shadow-2xl overflow-hidden lg:max-h-none lg:w-full lg:rounded-3xl lg:border lg:border-purple-100 lg:shadow-md">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-purple-100 px-5 py-4 bg-purple-50/50">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-indigo-950">
                        {currentVerseRef}
                      </h3>
                      <p className="text-[11px] text-indigo-900/60">
                        African & global community dialogue
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setDiscussionOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-indigo-500 hover:text-indigo-900 ring-1 ring-purple-100 shadow-2xs"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Body & Comments Feed */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[60vh] lg:max-h-[calc(100vh-220px)]">
                  {/* Selected Verse Banner */}
                  <div className="rounded-2xl bg-amber-50/90 p-3 border border-amber-200/60">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                        Selected Scripture
                      </p>
                      <button
                        onClick={() => {
                          const v = data?.verses.find((x) => x.verse === selectedVerse)
                          if (v) handleSpeakSingleVerse(v.verse, v.text)
                        }}
                        className="flex items-center gap-1 text-[11px] font-bold text-purple-700 hover:underline"
                      >
                        <Volume2 className="h-3 w-3" />
                        <span>Listen</span>
                      </button>
                    </div>
                    <p className="font-serif italic text-xs text-indigo-950 leading-relaxed">
                      "{data?.verses.find((v) => v.verse === selectedVerse)?.text ?? 'And God said, "Let there be light," and there was light.'}"
                    </p>
                  </div>

                  {/* Add Reflection Form */}
                  <form onSubmit={handlePostComment} className="rounded-2xl border border-purple-100 bg-white p-3 shadow-xs">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="h-6 w-6 rounded-full overflow-hidden ring-1 ring-purple-200">
                          <img src="/images/african-prayer-portrait.jpg" alt="" className="h-full w-full object-cover" />
                        </div>
                        <input
                          type="text"
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          className="text-xs font-bold text-indigo-950 bg-transparent outline-none w-28"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-indigo-400">
                        <MapPin className="h-3 w-3 text-purple-500" />
                        <input
                          type="text"
                          value={authorLocation}
                          onChange={(e) => setAuthorLocation(e.target.value)}
                          className="text-[11px] text-indigo-500 bg-transparent outline-none w-28 text-right"
                          placeholder="Location"
                        />
                      </div>
                    </div>

                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder={`What is God speaking to you through ${currentVerseRef}? Share a reflection or question...`}
                      rows={3}
                      className="w-full resize-none rounded-xl bg-purple-50/30 p-2.5 text-xs text-indigo-950 outline-none placeholder:text-indigo-400 focus:ring-1 focus:ring-purple-400"
                    />

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-indigo-400 font-medium">
                        Discipleship fellowship
                      </span>
                      <button
                        type="submit"
                        disabled={!commentText.trim()}
                        className="flex items-center gap-1 rounded-full bg-purple-700 px-3.5 py-1 text-xs font-bold text-white shadow-xs hover:bg-purple-800 disabled:opacity-40 transition-colors"
                      >
                        <span>Post</span>
                        <Send className="h-3 w-3" />
                      </button>
                    </div>
                  </form>

                  {/* Comments Feed */}
                  <div className="space-y-3 pt-1">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                      Reflections ({verseComments.length})
                    </h4>

                    {verseComments.length === 0 ? (
                      <div className="py-8 text-center">
                        <Sparkles className="mx-auto h-7 w-7 text-purple-300 mb-2" />
                        <p className="text-xs font-bold text-indigo-950">Be the first to reflect</p>
                        <p className="text-[11px] text-indigo-500 mt-0.5">
                          Share your insights on {currentVerseRef}.
                        </p>
                      </div>
                    ) : (
                      verseComments.map((c) => (
                        <div
                          key={c.id}
                          className="rounded-2xl border border-purple-100/70 bg-white p-3.5 shadow-2xs"
                        >
                          {/* Header */}
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 text-[10px] font-bold text-white">
                                {c.userName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-indigo-950 leading-none">
                                  {c.userName}
                                </p>
                                <p className="text-[10px] text-indigo-400 mt-0.5">
                                  {c.userLocation} · {c.timeAgo}
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => toggleCommentLike(c.id)}
                              className={cn(
                                'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold transition-colors',
                                c.hasLiked
                                  ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-200'
                                  : 'text-indigo-400 hover:text-indigo-600',
                              )}
                            >
                              <Heart
                                className={cn(
                                  'h-3.5 w-3.5',
                                  c.hasLiked && 'fill-amber-400 text-amber-500',
                                )}
                              />
                              <span>{c.likes}</span>
                            </button>
                          </div>

                          <p className="text-xs text-indigo-900/85 leading-relaxed pl-8">
                            {c.text}
                          </p>

                          {/* Reply Trigger */}
                          <div className="mt-2 pl-8 flex items-center gap-3">
                            <button
                              onClick={() => setReplyingToId(replyingToId === c.id ? null : c.id)}
                              className="text-[11px] font-bold text-purple-700 hover:underline"
                            >
                              Reply
                            </button>
                            {c.replies.length > 0 && (
                              <span className="text-[11px] text-indigo-400">
                                {c.replies.length} {c.replies.length === 1 ? 'reply' : 'replies'}
                              </span>
                            )}
                          </div>

                          {/* Nested Replies */}
                          {c.replies.length > 0 && (
                            <div className="mt-2 ml-8 space-y-2 border-l-2 border-purple-100 pl-2.5">
                              {c.replies.map((r) => (
                                <div key={r.id} className="rounded-xl bg-purple-50/40 p-2">
                                  <div className="flex items-center justify-between text-[11px]">
                                    <span className="font-bold text-indigo-950">{r.userName}</span>
                                    <span className="text-[10px] text-indigo-400">{r.timeAgo}</span>
                                  </div>
                                  <p className="mt-0.5 text-xs text-indigo-900/80">
                                    {r.text}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Inline Reply Form */}
                          {replyingToId === c.id && (
                            <div className="mt-2.5 ml-8 flex items-center gap-1.5">
                              <input
                                type="text"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                className="flex-1 rounded-xl bg-purple-50/50 px-2.5 py-1 text-xs text-indigo-950 outline-none ring-1 ring-purple-200 focus:ring-purple-400"
                                autoFocus
                              />
                              <button
                                onClick={() => handlePostReply(c.id)}
                                disabled={!replyText.trim()}
                                className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-700 text-white disabled:opacity-40"
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
