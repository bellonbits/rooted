export type NavItem = {
  label: string
  path: string
  icon: 'home' | 'bible' | 'journey' | 'search' | 'profile' | 'community' | 'prayer' | 'ai' | 'journal' | 'plans' | 'progress' | 'discover' | 'kids' | 'courses'
  badge?: string
}

export const APP_NAV: NavItem[] = [
  { label: 'Bible', path: '/app/bible', icon: 'bible' },
  { label: 'Search', path: '/app/bible/search', icon: 'search' },
  { label: 'Journey', path: '/app/journey', icon: 'journey' },
  { label: 'Profile', path: '/app/profile', icon: 'profile' },
]

export const SIDEBAR_PRIMARY_NAV: NavItem[] = [
  { label: 'Home', path: '/app', icon: 'home' },
  { label: 'Bible', path: '/app/bible', icon: 'bible' },
  { label: 'Today’s Journey', path: '/app/journey', icon: 'journey', badge: '65%' },
  { label: 'Reading Plans', path: '/app/plans', icon: 'plans' },
  { label: 'Discover', path: '/app/discover', icon: 'discover' },
]

export const SIDEBAR_GROWTH_NAV: NavItem[] = [
  { label: 'AI Companion', path: '/app/ai', icon: 'ai' },
  { label: 'Spiritual Journal', path: '/app/journal', icon: 'journal' },
  { label: 'Prayer Room', path: '/app/prayer', icon: 'prayer' },
  { label: 'Your Growth', path: '/app/progress', icon: 'progress' },
]

export const SIDEBAR_SPECIAL_NAV: NavItem[] = [
  { label: 'Discipleship Courses', path: '/app/courses', icon: 'courses' },
  { label: 'Little Explorers', path: '/app/kids', icon: 'kids', badge: 'Kids' },
]

export const SPIRITUAL_STAGES = [
  { value: 'beginner', label: 'New Believer' },
  { value: 'growing', label: 'Growing in Faith' },
  { value: 'mature', label: 'Mature Believer' },
] as const
