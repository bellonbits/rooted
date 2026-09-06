import {
  Compass,
  CheckCircle2,
  Lock,
  Play,
} from 'lucide-react'
import { KidsStoryIcon } from './KidsStoryIcon'

type Location = {
  id: string
  title: string
  theme: string
  iconName: string
  status: 'completed' | 'active' | 'locked'
  requiredLevel: number
  description: string
  coverImage?: string
  pageCount?: number
  isBook?: boolean
}

const LOCATIONS: Location[] = [
  {
    id: 'creation',
    title: 'The Garden of Eden',
    theme: 'When God Made Everything',
    iconName: 'sprout',
    status: 'active',
    requiredLevel: 1,
    description: 'Read the 21-page illustrated Kindle storybook! Tap stars, hear animal sounds, and explore God’s creation.',
    coverImage: '/bible_stories/story1/panel_01_title.png',
    pageCount: 21,
    isBook: true,
  },
  {
    id: 'story2',
    title: "The Start of Man's Sadness",
    theme: 'Genesis 3 to 6 · Faith & Hope',
    iconName: 'shield',
    status: 'active',
    requiredLevel: 1,
    description: 'Read the 25-page illustrated Kindle storybook! Follow Adam & Eve, Cain & Abel, and righteous Noah.',
    coverImage: '/bible_stories/story2/panel_01_title.png',
    pageCount: 25,
    isBook: true,
  },
  {
    id: 'noah',
    title: 'Ark Valley',
    theme: 'God’s Promise',
    iconName: 'ship',
    status: 'completed',
    requiredLevel: 2,
    description: 'Noah built a huge boat and saw God’s beautiful rainbow promise.',
  },
  {
    id: 'abraham',
    title: 'Starry Plains',
    theme: 'Faith in the Stars',
    iconName: 'star',
    status: 'completed',
    requiredLevel: 3,
    description: 'Abraham trusted God’s promise as numerous as the desert stars.',
  },
  {
    id: 'moses',
    title: 'The Red Sea',
    theme: 'God’s Mighty Hand',
    iconName: 'waves',
    status: 'completed',
    requiredLevel: 3,
    description: 'God parted the great waters so His people could walk through safely.',
  },
  {
    id: 'david',
    title: 'Shepherd Hills',
    theme: 'Courage & Trust',
    iconName: 'award',
    status: 'active',
    requiredLevel: 4,
    description: 'Young shepherd David faces giant Goliath with unshakable faith.',
    coverImage: '/images/african-david-goliath.jpg',
  },
  {
    id: 'bethlehem',
    title: 'Bethlehem Star',
    theme: 'The Savior is Born',
    iconName: 'sparkles',
    status: 'locked',
    requiredLevel: 5,
    description: 'Shepherds and angels rejoice as Jesus is born in a humble manger.',
  },
  {
    id: 'galilee',
    title: 'Galilee Waters',
    theme: 'Jesus Calms the Storm',
    iconName: 'droplets',
    status: 'locked',
    requiredLevel: 6,
    description: 'Jesus heals the sick, loves the children, and calms roaring waves.',
  },
  {
    id: 'jerusalem',
    title: 'The Golden City',
    theme: 'He is Risen!',
    iconName: 'sun',
    status: 'locked',
    requiredLevel: 7,
    description: 'The empty tomb and the triumph of eternal life and love.',
  },
]

type KidsExploreMapProps = {
  onSelectStory: (id: string) => void
}

export function KidsExploreMap({ onSelectStory }: KidsExploreMapProps) {
  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-coral-400" />
          <p className="text-xs font-bold uppercase tracking-widest text-coral-400">
            The ROOTED World
          </p>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
          Bible Adventure Map
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/80 max-w-lg mt-1">
          Journey from the sunrise of Creation to the resurrection of Jesus. Every location unlocks as you grow!
        </p>
      </div>

      {/* Illustrated Path Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LOCATIONS.map((loc) => {
          const isDone = loc.status === 'completed'
          const isActive = loc.status === 'active'
          const isLocked = loc.status === 'locked'

          return (
            <div
              key={loc.id}
              className={`relative flex flex-col justify-between rounded-[32px] border p-6 transition-all ${
                isActive
                  ? 'border-coral-400 bg-gradient-to-b from-purple-900/90 to-indigo-950/90 shadow-xl shadow-coral-500/20 ring-2 ring-coral-400/50 scale-[1.01]'
                  : isDone
                  ? 'border-emerald-500/30 bg-white/5 hover:bg-white/10'
                  : 'border-white/10 bg-white/5 opacity-60'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-coral-300">
                  <KidsStoryIcon name={loc.iconName} className="h-5 w-5" />
                </span>
                {isDone && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" /> Discovered
                  </span>
                )}
                {isActive && (
                  <span className="flex items-center gap-1 rounded-full bg-coral-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs animate-pulse">
                    ● Active Now
                  </span>
                )}
                {isLocked && (
                  <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-purple-300">
                    <Lock className="h-3 w-3" /> Level {loc.requiredLevel}
                  </span>
                )}
              </div>

              {/* Title & Info */}
              <div className="mt-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-coral-300">
                  {loc.theme}
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5">
                  {loc.title}
                </h3>
                <p className="mt-1.5 text-xs text-purple-200/75 leading-relaxed">
                  {loc.description}
                </p>
              </div>

              {/* Cover Image Thumbnail if available */}
              {loc.coverImage && (
                <div className="mt-3 relative h-36 w-full rounded-2xl overflow-hidden border border-white/20 shadow-md group">
                  <img
                    src={loc.coverImage}
                    alt={loc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-bold text-white">
                    <span className="bg-coral-500/90 rounded-full px-2 py-0.5">📖 {loc.pageCount} Pages</span>
                    <span className="bg-black/60 rounded-full px-2 py-0.5 backdrop-blur-xs">Interactive Book</span>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="mt-6 border-t border-white/10 pt-4">
                {isActive ? (
                  <button
                    onClick={() => onSelectStory(loc.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-coral-500 py-2.5 text-xs font-black text-white shadow-md hover:bg-coral-600 transition-colors"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    {loc.isBook ? 'Open Storybook (21 Pages)' : 'Enter Adventure →'}
                  </button>
                ) : isDone ? (
                  <button
                    onClick={() => onSelectStory(loc.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 py-2.5 text-xs font-bold text-purple-200 hover:bg-white/20 transition-colors"
                  >
                    {loc.isBook ? 'Re-read Storybook 📖' : 'Replay Story'}
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-purple-300/60">
                    <Lock className="h-3 w-3" /> Unlocks at Level {loc.requiredLevel}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
