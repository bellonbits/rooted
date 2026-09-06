export interface StoryHotspot {
  id: string
  x: number // percent 0-100
  y: number // percent 0-100
  label: string
  iconName?: string
  icon?: string
  sound: 'twinkle' | 'chime' | 'splash' | 'chirp' | 'fanfare' | 'breath'
  funFact: string
}

export interface StoryWonderQuestion {
  rootiSays: string
  question: string
  options: { text: string; correct: boolean }[]
  rewardXP: number
}

export interface StoryPanelData {
  id: number
  panelFile: string
  pageNumber: number
  title: string
  text: string
  audioText: string
  dayLabel?: string
  soundEffect: 'twinkle' | 'chime' | 'splash' | 'chirp' | 'fanfare' | 'breath'
  interactivePrompt: string
  wonderQuestion?: StoryWonderQuestion
  hotspots?: StoryHotspot[]
}

export interface BibleStory {
  id: string
  title: string
  subtitle: string
  scripture: string
  ageGroup: string
  durationMinutes: number
  coverImage: string
  totalPanels: number
  panels: StoryPanelData[]
}
