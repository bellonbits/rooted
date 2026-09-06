import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type VerseComment = {
  id: string
  verseRef: string // e.g. "Genesis 1:3" or "Mark 4:14"
  userName: string
  userLocation: string
  userAvatar?: string
  text: string
  likes: number
  hasLiked?: boolean
  timeAgo: string
  replies: {
    id: string
    userName: string
    text: string
    timeAgo: string
  }[]
}

export type BookEngagement = {
  likes: number
  notes: number
}

type BibleState = {
  translation: string
  setTranslation: (translation: string) => void

  // Book engagement statistics (from reference image)
  bookEngagements: Record<string, BookEngagement>
  toggleBookLike: (bookSlug: string) => void

  // Verse comments & community discussion
  comments: VerseComment[]
  addComment: (verseRef: string, text: string, userName?: string, location?: string) => void
  toggleCommentLike: (commentId: string) => void
  addReply: (commentId: string, text: string, userName?: string) => void

  // Bookmarks & highlights
  highlightedVerses: Record<string, number[]> // "genesis-1" -> [3, 4]
  toggleHighlight: (chapterKey: string, verseNum: number) => void
  bookmarkedVerses: string[] // ["Genesis 1:3", "Romans 8:28"]
  toggleBookmark: (ref: string) => void
}

const DEFAULT_BOOK_ENGAGEMENTS: Record<string, BookEngagement> = {
  genesis: { likes: 8, notes: 2 },
  exodus: { likes: 5, notes: 0 },
  leviticus: { likes: 0, notes: 2 },
  numbers: { likes: 20, notes: 0 },
  deuteronomy: { likes: 4, notes: 0 },
  joshua: { likes: 0, notes: 2 },
  judges: { likes: 3, notes: 1 },
  ruth: { likes: 12, notes: 4 },
  psalms: { likes: 45, notes: 18 },
  proverbs: { likes: 32, notes: 10 },
  matthew: { likes: 24, notes: 9 },
  mark: { likes: 19, notes: 7 },
  luke: { likes: 28, notes: 11 },
  john: { likes: 64, notes: 25 },
  acts: { likes: 21, notes: 8 },
  romans: { likes: 38, notes: 15 },
}

const INITIAL_COMMENTS: VerseComment[] = [
  {
    id: 'c1',
    verseRef: 'Genesis 1:3',
    userName: 'Pastor Samuel Adebayo',
    userLocation: 'Lagos, Nigeria',
    text: 'Notice that God speaks before He shapes. In your moments of chaos or darkness, invite God to speak His living Word into the void. His light always overcomes.',
    likes: 14,
    hasLiked: false,
    timeAgo: '2 hours ago',
    replies: [
      {
        id: 'r1',
        userName: 'Amina Mwangi',
        text: 'Amen Pastor! This spoke directly to my situation today.',
        timeAgo: '1 hour ago',
      },
      {
        id: 'r2',
        userName: 'Kofi Mensah',
        text: 'The Hebrew word "Or" carries the power of divine illumination.',
        timeAgo: '30 mins ago',
      },
    ],
  },
  {
    id: 'c2',
    verseRef: 'Genesis 1:1',
    userName: 'Dr. Esther Njoroge',
    userLocation: 'Nairobi, Kenya',
    text: 'The Hebrew word "Bara" is used exclusively for divine creation out of absolute nothingness. Only God can take nothing and craft endless beauty.',
    likes: 9,
    hasLiked: true,
    timeAgo: '5 hours ago',
    replies: [],
  },
  {
    id: 'c3',
    verseRef: 'Mark 4:14',
    userName: 'Brother Daniel Osei',
    userLocation: 'Accra, Ghana',
    text: 'The sower sows the Word. The harvest is not limited by the power of the seed, but the receptivity of our soil. Lord, soften our hearts!',
    likes: 21,
    hasLiked: false,
    timeAgo: '1 day ago',
    replies: [
      {
        id: 'r3',
        userName: 'Chiamaka Okeke',
        text: 'Deep revelation brother! Sharing this with our youth fellowship.',
        timeAgo: '18 hours ago',
      },
    ],
  },
]

export const useBibleStore = create<BibleState>()(
  persist(
    (set, get) => ({
      translation: 'BSB',
      setTranslation: (translation) => set({ translation }),

      bookEngagements: DEFAULT_BOOK_ENGAGEMENTS,
      toggleBookLike: (bookSlug) => {
        const current = get().bookEngagements[bookSlug] ?? { likes: 0, notes: 0 }
        set((state) => ({
          bookEngagements: {
            ...state.bookEngagements,
            [bookSlug]: { ...current, likes: current.likes + 1 },
          },
        }))
      },

      comments: INITIAL_COMMENTS,
      addComment: (verseRef, text, userName = 'You', location = 'Believer in Africa') => {
        const newC: VerseComment = {
          id: String(Date.now()),
          verseRef,
          userName,
          userLocation: location,
          text,
          likes: 0,
          hasLiked: false,
          timeAgo: 'Just now',
          replies: [],
        }
        set((state) => ({
          comments: [newC, ...state.comments],
        }))
      },

      toggleCommentLike: (commentId) => {
        set((state) => ({
          comments: state.comments.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  likes: c.hasLiked ? c.likes - 1 : c.likes + 1,
                  hasLiked: !c.hasLiked,
                }
              : c,
          ),
        }))
      },

      addReply: (commentId, text, userName = 'You') => {
        set((state) => ({
          comments: state.comments.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  replies: [
                    ...c.replies,
                    {
                      id: String(Date.now()),
                      userName,
                      text,
                      timeAgo: 'Just now',
                    },
                  ],
                }
              : c,
          ),
        }))
      },

      highlightedVerses: { 'genesis-1': [3] },
      toggleHighlight: (chapterKey, verseNum) => {
        const current = get().highlightedVerses[chapterKey] ?? []
        const next = current.includes(verseNum)
          ? current.filter((v) => v !== verseNum)
          : [...current, verseNum]
        set((state) => ({
          highlightedVerses: { ...state.highlightedVerses, [chapterKey]: next },
        }))
      },

      bookmarkedVerses: ['Genesis 1:3', 'Psalm 37:4'],
      toggleBookmark: (ref) => {
        const current = get().bookmarkedVerses
        set({
          bookmarkedVerses: current.includes(ref)
            ? current.filter((r) => r !== ref)
            : [...current, ref],
        })
      },
    }),
    {
      name: 'rooted-bible-v2',
    },
  ),
)
