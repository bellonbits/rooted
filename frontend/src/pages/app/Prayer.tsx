import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { Pill } from '@/components/ui/Pill'
import { Button } from '@/components/ui/Button'
import { GuestBanner } from '@/components/ui/GuestBanner'
import { prayerService } from '@/services/prayer.service'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/utils/cn'

const TOPICS = [
  'Thankfulness',
  'Family',
  'Guidance',
  'Forgiveness',
  'Temptation',
  'Anxiety',
  'Relationships',
  'Spiritual Growth',
]

export function Prayer() {
  const navigate = useNavigate()
  const isGuest = useAuthStore((s) => s.isGuest)
  const [topic, setTopic] = useState<string | null>(null)
  const [content, setContent] = useState('')

  const queryClient = useQueryClient()
  const { data: prayers } = useQuery({
    queryKey: ['prayer'],
    queryFn: prayerService.list,
    retry: 1,
    enabled: !isGuest,
  })

  const { mutate: save, isPending } = useMutation({
    mutationFn: () => prayerService.create(topic!, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prayer'] })
      queryClient.invalidateQueries({ queryKey: ['progress'] })
      setContent('')
      setTopic(null)
    },
  })

  function handleSave() {
    if (isGuest) {
      navigate('/register')
      return
    }
    save()
  }

  const { mutate: toggleJoin } = useMutation({
    mutationFn: (vars: { id: string; joined: boolean }) =>
      prayerService.toggleIntercession(vars.id, vars.joined),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['prayer'] }),
  })

  return (
    <div>
      <TopBar title="Prayer Wall" />
      <div className="mx-auto max-w-2xl px-5 pb-10 md:px-8">
        <div className="-mt-2 mb-4 aspect-[21/9] overflow-hidden rounded-3xl">
          <img src="/images/praying-with-bible.jpg" alt="" className="h-full w-full object-cover" />
        </div>

        <p className="mb-4 text-sm text-ink-500">Bear one another's burdens, and so fulfill the law of Christ.</p>

        {isGuest && <GuestBanner />}

        <div className="rounded-3xl border border-mint-100 bg-mint-100/30 p-4">
          <p className="mb-2 text-sm font-medium text-forest-900">What would you like to pray about?</p>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <Pill key={t} active={topic === t} onClick={() => setTopic(t)}>
                {t}
              </Pill>
            ))}
          </div>

          {topic && (
            <div className="mt-4 flex flex-col gap-3">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Share your ${topic.toLowerCase()} request gently…`}
                rows={3}
                className="rounded-xl border border-forest-900/15 bg-warm-card px-3 py-2 text-sm outline-none focus:border-mint-500"
              />
              <Button onClick={handleSave} disabled={isPending || (!isGuest && !content.trim())}>
                {isPending ? 'Saving…' : isGuest ? 'Sign up to save' : 'Submit Request'}
              </Button>
            </div>
          )}
        </div>

        {prayers && prayers.length > 0 && (
          <div className="mt-6 flex flex-col gap-3">
            {prayers.map((p) => (
              <div key={p.id} className="rounded-3xl bg-warm-card p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold text-forest-800">{p.topic}</p>
                  <p className="text-[11px] text-ink-500">{new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-[13.5px] italic leading-relaxed text-ink-700">{p.content}</p>
                <div className="mt-3 flex items-center justify-end">
                  <button
                    onClick={() => toggleJoin({ id: p.id, joined: !p.joinedByMe })}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium',
                      p.joinedByMe ? 'border-forest-800 bg-forest-800 text-cream-50' : 'border-forest-900/20 text-forest-800',
                    )}
                  >
                    <Heart className="h-3.5 w-3.5" fill={p.joinedByMe ? 'currentColor' : 'none'} />
                    Praying for you
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {prayers && prayers.length === 0 && !topic && (
          <div className="mt-8 flex flex-col items-center text-center">
            <p className="text-sm text-ink-500">Your saved prayers will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
