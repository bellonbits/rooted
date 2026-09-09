import { BookOpen, HelpCircle, Feather, HandHeart, type LucideIcon } from 'lucide-react'

export type JourneyStep = {
  id: number
  num: string
  title: string
  passage: string
  description: string
  icon: LucideIcon
  actionLabel: string
  actionUrl: string
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    num: '01',
    title: 'Read',
    passage: 'Mark 4:1–20',
    description: 'The Parable of the Sower and its divine meaning.',
    icon: BookOpen,
    actionLabel: 'Open Scripture Reader',
    actionUrl: '/app/bible/mark/4',
  },
  {
    id: 2,
    num: '02',
    title: 'Understand',
    passage: 'The Secret of the Seed',
    description: 'What is Jesus teaching about the receptivity of our hearts?',
    icon: HelpCircle,
    actionLabel: 'Discuss with ROOTED AI',
    actionUrl: '/app/ai',
  },
  {
    id: 3,
    num: '03',
    title: 'Reflect',
    passage: 'Personal Application',
    description: 'What is God showing you about your own soil today?',
    icon: Feather,
    actionLabel: 'Write in Journal',
    actionUrl: '/app/journal',
  },
  {
    id: 4,
    num: '04',
    title: 'Pray',
    passage: 'Stillness & Surrender',
    description: 'Spend quiet moments surrendering your desires to the Lord.',
    icon: HandHeart,
    actionLabel: 'Enter Prayer Room',
    actionUrl: '/app/prayer',
  },
]
