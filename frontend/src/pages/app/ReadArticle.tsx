import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GuestBanner } from '@/components/ui/GuestBanner'
import { communityService } from '@/services/community.service'
import { useAuthStore } from '@/store/authStore'
import { categoryImage, initials, timeAgo } from '@/constants/community'

export function ReadArticle() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { id = '' } = useParams()
  const isGuest = useAuthStore((s) => s.isGuest)
  const [replyText, setReplyText] = useState('')

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['community-post', id],
    queryFn: () => communityService.get(id),
    enabled: Boolean(id),
  })

  const { data: allPosts } = useQuery({ queryKey: ['community-posts'], queryFn: communityService.list })
  const related = allPosts?.find((p) => p.id !== id)

  const { mutate: submitReply, isPending } = useMutation({
    mutationFn: () => communityService.reply(id, replyText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-post', id] })
      queryClient.invalidateQueries({ queryKey: ['community-posts'] })
      setReplyText('')
    },
  })

  return (
    <div>
      <header className="flex h-14 shrink-0 items-center justify-between px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-forest-900/5"
          aria-label="Back"
        >
          <ChevronLeft className="h-5.5 w-5.5 text-forest-900" />
        </button>
        <h1 className="font-serif text-base text-forest-900">Discussion</h1>
        <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-forest-900/5" aria-label="Share">
          <Share2 className="h-4 w-4 text-forest-900" />
        </button>
      </header>

      <div className="mx-auto max-w-2xl px-5 pb-10 md:px-8">
        {isLoading && (
          <div className="flex flex-col gap-3 pt-2">
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-forest-900/5" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-forest-900/5" />
          </div>
        )}

        {isError && <p className="py-10 text-center text-sm text-ink-500">Couldn't load this discussion.</p>}

        {post && (
          <>
            <div className="mb-4 mt-1 aspect-[16/10] overflow-hidden rounded-3xl">
              <img src={categoryImage(post.category)} alt="" className="h-full w-full object-cover" />
            </div>

            <p className="mb-2 text-xs font-semibold text-forest-800">{post.category}</p>
            <h1 className="mb-3 font-serif text-xl leading-snug text-forest-900">{post.title}</h1>

            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-900/10 text-xs font-medium text-forest-800">
                {initials(post.author.name)}
              </div>
              <div>
                <p className="text-[13px] font-medium text-forest-900">{post.author.name}</p>
                <p className="text-[11px] text-ink-500">{timeAgo(post.createdAt)}</p>
              </div>
            </div>

            <p className="mb-6 whitespace-pre-line text-[14.5px] leading-relaxed text-ink-700">{post.body}</p>

            <h2 className="mb-3 font-serif text-base text-forest-900">
              {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
            </h2>

            <div className="flex flex-col gap-3">
              {post.replies.map((r) => (
                <div key={r.id} className="rounded-2xl bg-warm-card p-3.5 shadow-sm">
                  <div className="mb-1.5 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-900/10 text-[10px] font-medium text-forest-800">
                      {initials(r.author.name)}
                    </div>
                    <p className="text-xs font-medium text-forest-900">{r.author.name}</p>
                    <p className="text-[11px] text-ink-500">· {timeAgo(r.createdAt)}</p>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-ink-700">{r.body}</p>
                </div>
              ))}
              {post.replies.length === 0 && <p className="text-sm text-ink-500">No replies yet — be the first to respond.</p>}
            </div>

            <div className="mt-5">
              {isGuest ? (
                <GuestBanner message="Sign up to reply to this discussion." />
              ) : (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={3}
                    placeholder="Write a reply…"
                    className="w-full rounded-xl border border-forest-900/15 bg-warm-card px-3 py-2.5 text-sm outline-none focus:border-mint-500"
                  />
                  <Button onClick={() => submitReply()} disabled={isPending || !replyText.trim()} className="self-end">
                    {isPending ? 'Posting…' : 'Reply'}
                  </Button>
                </div>
              )}
            </div>

            {related && (
              <>
                <h2 className="mt-8 mb-3 font-serif text-base text-forest-900">Related Discussion</h2>
                <button
                  onClick={() => navigate(`/app/community/${related.id}`)}
                  className="flex w-full items-center gap-3 rounded-3xl bg-warm-card p-3 text-left shadow-sm"
                >
                  <img
                    src={categoryImage(related.category).replace('.jpg', '-sm.jpg')}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-medium leading-snug text-forest-900">{related.title}</p>
                    <p className="mt-0.5 text-[11.5px] text-ink-500">
                      {related.replies.length} {related.replies.length === 1 ? 'reply' : 'replies'}
                    </p>
                  </div>
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
