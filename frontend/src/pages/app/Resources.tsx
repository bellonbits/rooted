import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/layout/TopBar'
import {
  PlayCircle,
  BookOpen,
  Headphones,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/utils/cn'

const FILTERS = ['All', 'Ages & Stages', 'Discipline', 'Faith', 'Marriage']

type ResourceType = 'Guide' | 'Video' | 'Podcast' | 'Article'

type Resource = {
  type: ResourceType
  title: string
  category: string
  meta: string
  description: string
  gradient: string
  image?: string
}

const TYPE_ICON: Record<ResourceType, React.ElementType> = {
  Guide: BookOpen,
  Video: PlayCircle,
  Podcast: Headphones,
  Article: FileText,
}

const TYPE_COLOR: Record<ResourceType, string> = {
  Guide: 'bg-purple-100 text-purple-700',
  Video: 'bg-coral-100 text-coral-600',
  Podcast: 'bg-indigo-100 text-indigo-600',
  Article: 'bg-purple-100 text-purple-700',
}

const RESOURCES: Resource[] = [
  {
    type: 'Guide',
    title: 'Spiritual Milestones',
    category: 'Ages & Stages',
    meta: '12 pages',
    description: 'A roadmap for marking spiritual growth in your family — from baptism to first prayer to Scripture memorization.',
    gradient: 'from-purple-700 to-purple-500',
  },
  {
    type: 'Video',
    title: 'Gentle Discipline Practices',
    category: 'Discipline',
    meta: '18 mins',
    description: 'Biblical insights on discipline grounded in grace — how to correct with love and grow children in wisdom.',
    gradient: 'from-coral-500 to-coral-400',
  },
  {
    type: 'Podcast',
    title: 'Sabbath Rest & Self-Care',
    category: 'Faith',
    meta: '32 mins',
    description: 'Explore the rhythm of rest God built into creation and how families can recover it in a busy world.',
    gradient: 'from-indigo-600 to-purple-600',
  },
  {
    type: 'Article',
    title: 'Building Family Altars',
    category: 'Faith',
    meta: '5 min read',
    description: 'Practical steps to create daily moments of worship that draw your household closer to God together.',
    gradient: 'from-purple-600 to-indigo-600',
  },
  {
    type: 'Guide',
    title: 'Faith & Communication',
    category: 'Marriage',
    meta: '8 pages',
    description: 'How married couples can pray together, resolve conflict with Scripture, and encourage one another spiritually.',
    gradient: 'from-purple-500 to-coral-500',
  },
  {
    type: 'Video',
    title: 'Teaching Kids to Pray',
    category: 'Ages & Stages',
    meta: '11 mins',
    description: 'Age-appropriate prayer practices from the early years through teenage faith — practical and joyful.',
    gradient: 'from-coral-400 to-purple-400',
  },
]

export function Resources() {
  const navigate = useNavigate()
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? RESOURCES : RESOURCES.filter((r) => r.category === active)

  return (
    <div>
      <TopBar title="Resources" />
      <div className="mx-auto max-w-3xl px-5 pb-12 md:px-8">

        {/* Intro */}
        <p className="-mt-1 text-sm leading-relaxed text-indigo-600 mb-5">
          Articles, videos, guides, and podcasts curated for Christian households and growing believers.
        </p>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-1.5 text-[12.5px] font-semibold transition-all',
                active === f
                  ? 'border-purple-600 bg-purple-600 text-white shadow-sm shadow-purple-600/20'
                  : 'border-purple-200/80 bg-warm-card text-indigo-700 hover:border-purple-400 hover:bg-purple-50',
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Featured Banner */}
        <div className="mt-6 mb-5 overflow-hidden rounded-[24px] bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 p-7 text-white shadow-lg shadow-purple-900/20">
          <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_70%_30%,white_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-coral-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-200">Editor's Pick</span>
          </div>
          <h2 className="font-serif text-xl font-bold">Raising Faith-Filled Children</h2>
          <p className="mt-2 text-sm text-purple-100/90 max-w-sm">
            A comprehensive guide for parents on building a home culture of Scripture, prayer, and discipleship.
          </p>
          <button className="mt-4 flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold hover:bg-white/25 transition-colors backdrop-blur-sm">
            Read guide <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Resource Grid */}
        <h3 className="mb-4 text-[10.5px] font-bold uppercase tracking-wider text-indigo-400">
          {active === 'All' ? 'All Resources' : active}
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((r) => {
            const Icon = TYPE_ICON[r.type]
            return (
              <button
                key={r.title}
                onClick={() => navigate('/app/discover')}
                className="group overflow-hidden rounded-[24px] border border-purple-100/70 bg-warm-card text-left shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Color band header */}
                <div
                  className={cn(
                    'relative flex h-20 w-full items-center justify-center bg-gradient-to-br',
                    r.gradient,
                  )}
                >
                  <Icon className="h-8 w-8 text-white/70" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn('rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide', TYPE_COLOR[r.type])}>
                      {r.type}
                    </span>
                    <span className="flex items-center gap-1 text-[10.5px] text-indigo-400 font-medium">
                      <Clock className="h-3 w-3" />
                      {r.meta}
                    </span>
                  </div>
                  <h4 className="font-serif text-[15px] font-bold text-indigo-900 leading-snug">{r.title}</h4>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-indigo-500 line-clamp-2">{r.description}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-purple-100/50 pt-3">
                    <span className="text-[11px] text-indigo-400">{r.category}</span>
                    <span className="flex items-center gap-1 text-[11.5px] font-semibold text-purple-600 group-hover:text-purple-800 transition-colors">
                      Open <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-purple-200" />
            <p className="mt-4 font-serif text-lg text-indigo-900 font-semibold">Nothing here yet</p>
            <p className="mt-1 text-sm text-indigo-500">More content is coming for this category soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
