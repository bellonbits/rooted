import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Search, MessageSquare, Plus, X } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Button } from '@/components/ui/Button'
import { GuestBanner } from '@/components/ui/GuestBanner'
import { communityService } from '@/services/community.service'
import { useAuthStore } from '@/store/authStore'
import { CATEGORIES, categoryImage, initials, timeAgo } from '@/constants/community'
import { cn } from '@/utils/cn'

const FILTERS = ['All', ...CATEGORIES]

export function Community() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isGuest = useAuthStore((s) => s.isGuest)
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [composeOpen, setComposeOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState<string>(CATEGORIES[0])

  const { data: posts, isLoading } = useQuery({ queryKey: ['community-posts'], queryFn: communityService.list })

  const { mutate: submitPost, isPending } = useMutation({
    mutationFn: () => communityService.create(title, body, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] })
      setComposeOpen(false)
      setTitle('')
      setBody('')
    },
  })

  const filtered = useMemo(() => {
    if (!posts) return []
    return posts.filter((p) => {
      const matchesCategory = active === 'All' || p.category === active
      const q = query.trim().toLowerCase()
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [posts, active, query])

  function openCompose() {
    if (isGuest) {
      navigate('/register')
      return
    }
    setComposeOpen(true)
  }

  return (
    <div className="relative">
      <TopBar title="Community" />
      <div className="mx-auto max-w-2xl px-5 pb-24 md:px-8">
        <div className="-mt-2 mb-4 aspect-[21/9] overflow-hidden rounded-3xl">
          <img src="/images/community-prayer.jpg" alt="" className="h-full w-full object-cover" />
        </div>

        <p className="text-sm text-ink-500">Connect, share wisdom, and walk together in faith.</p>

        {isGuest && <GuestBanner message="Sign up to post and reply in the community." />}

        <div className="mt-4 flex items-center gap-2 rounded-full bg-forest-900/5 px-4 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-ink-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics or questions..."
            className="w-full bg-transparent text-[13.5px] outline-none placeholder:text-ink-500"
          />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-1.5 text-[13px] font-medium',
                active === f ? 'border-forest-800 bg-forest-800 text-cream-50' : 'border-forest-900/15 text-ink-700',
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <h2 className="mt-6 mb-2 font-serif text-base text-forest-900">Recent Discussions</h2>

        {isLoading && (
          <div className="flex flex-col gap-4 py-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-2xl bg-forest-900/5" />
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="flex flex-col items-center py-14 text-center">
            <p className="font-serif text-lg font-semibold text-forest-900">No discussions yet</p>
            <p className="mt-1 max-w-xs text-sm text-ink-500">
              {posts && posts.length > 0 ? 'No posts match your search or filter.' : 'Be the first to start one.'}
            </p>
          </div>
        )}

        <div className="flex flex-col divide-y divide-forest-900/10">
          {filtered.map((post) => (
            <button key={post.id} onClick={() => navigate(`/app/community/${post.id}`)} className="flex gap-3 py-4 text-left">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-900/10 text-xs font-medium text-forest-800">
                {initials(post.author.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-forest-900">{post.author.name}</p>
                <p className="mb-1 text-[11px] text-ink-500">
                  {post.category} · {timeAgo(post.createdAt)}
                </p>
                <p className="text-sm leading-snug text-ink-700">{post.title}</p>
                <span className="mt-1.5 flex items-center gap-1 text-xs text-ink-500">
                  <MessageSquare className="h-3.5 w-3.5" /> {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}
                </span>
              </div>
              <img src={categoryImage(post.category).replace('.jpg', '-sm.jpg')} alt="" className="h-14 w-14 shrink-0 rounded-2xl object-cover" />
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={openCompose}
        className="fixed bottom-24 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-forest-800 text-cream-50 shadow-lg md:bottom-8"
        aria-label="New discussion"
      >
        <Plus className="h-5.5 w-5.5" />
      </button>

      {composeOpen && (
        <div className="fixed inset-0 z-30 flex items-end justify-center">
          <button className="absolute inset-0 bg-forest-950/50" onClick={() => setComposeOpen(false)} aria-label="Close" />
          <div className="relative z-10 max-h-[85vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-cream-50 p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-serif text-lg text-forest-900">New Discussion</p>
              <button onClick={() => setComposeOpen(false)} aria-label="Close">
                <X className="h-5 w-5 text-ink-500" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    'rounded-full border px-3.5 py-1.5 text-[13px] font-medium',
                    category === c ? 'border-forest-800 bg-forest-800 text-cream-50' : 'border-forest-900/15 text-ink-700',
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give it a title…"
              className="mt-4 w-full rounded-xl border border-forest-900/15 bg-warm-card px-3 py-2.5 text-sm outline-none focus:border-mint-500"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="What's on your mind?"
              className="mt-3 w-full rounded-xl border border-forest-900/15 bg-warm-card px-3 py-2.5 text-sm outline-none focus:border-mint-500"
            />

            <Button
              className="mt-4 w-full"
              onClick={() => submitPost()}
              disabled={isPending || !title.trim() || !body.trim()}
            >
              {isPending ? 'Posting…' : 'Post to Community'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
