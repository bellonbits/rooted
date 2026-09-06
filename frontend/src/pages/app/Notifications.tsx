import { useState } from 'react'
import {
  BookOpen,
  MessageCircle,
  HandHeart,
  Flame,
  Sparkles,
  Bell,
  CheckCheck,
} from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { cn } from '@/utils/cn'

type NotificationItem = {
  id: number
  icon: React.ElementType
  iconBg: string
  iconColor: string
  title: string
  body: string
  time: string
  unread: boolean
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    icon: BookOpen,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Your daily Scripture is ready',
    body: 'Mark 4:1–20 — The Parable of the Sower is waiting for you today.',
    time: '2h ago',
    unread: true,
  },
  {
    id: 2,
    icon: MessageCircle,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    title: 'Sarah replied to your discussion',
    body: '"Totally agree with your reflection on Romans 8. So encouraging!"',
    time: '5h ago',
    unread: true,
  },
  {
    id: 3,
    icon: HandHeart,
    iconBg: 'bg-coral-100',
    iconColor: 'text-coral-500',
    title: 'Someone prayed for your request',
    body: 'A community member lifted your prayer request to God. 🙏',
    time: '1d ago',
    unread: false,
  },
  {
    id: 4,
    icon: Flame,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    title: 'Your 7-day streak is waiting',
    body: "Don't break the chain! Open the app to keep your devotional streak alive.",
    time: '1d ago',
    unread: false,
  },
  {
    id: 5,
    icon: Sparkles,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'New devotional available',
    body: '"Walking in Peace" — a new 5-day plan is now live for you.',
    time: '2d ago',
    unread: false,
  },
]

export function Notifications() {
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS)

  const unreadCount = items.filter((n) => n.unread).length

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  function markRead(id: number) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    )
  }

  return (
    <div>
      <TopBar title="Notifications" />
      <div className="mx-auto max-w-2xl px-5 pb-12 md:px-8">

        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <span className="rounded-full bg-coral-500 px-2.5 py-0.5 text-[11px] font-bold text-white">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Notification list */}
        <div className="flex flex-col gap-2.5">
          {items.map((n) => {
            const Icon = n.icon
            return (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn(
                  'flex w-full items-start gap-3.5 rounded-[20px] border p-4 text-left shadow-sm transition-all hover:shadow-md',
                  n.unread
                    ? 'border-purple-200/70 bg-purple-50/60'
                    : 'border-purple-100/60 bg-warm-card',
                )}
              >
                {/* Icon */}
                <span
                  className={cn(
                    'mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl',
                    n.iconBg,
                  )}
                >
                  <Icon className={cn('h-5 w-5', n.iconColor)} strokeWidth={2} />
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-semibold', n.unread ? 'text-indigo-900' : 'text-indigo-700')}>
                    {n.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-indigo-500 line-clamp-2">
                    {n.body}
                  </p>
                  <p className="mt-1.5 text-[10.5px] font-medium text-indigo-400">{n.time}</p>
                </div>

                {/* Unread dot */}
                {n.unread && (
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral-500 ring-2 ring-coral-100" />
                )}
              </button>
            )
          })}
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="py-20 text-center">
            <Bell className="mx-auto h-10 w-10 text-purple-200" />
            <p className="mt-4 font-serif text-lg font-semibold text-indigo-900">All caught up</p>
            <p className="mt-1 text-sm text-indigo-500">No new notifications right now.</p>
          </div>
        )}
      </div>
    </div>
  )
}
