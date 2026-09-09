import { useState } from 'react'
import { Feather, Calendar, Check } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/Button'
import { journalService } from '@/services/journal.service'

export function Journal() {
  const queryClient = useQueryClient()
  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['journal-entries'],
    queryFn: journalService.list,
  })

  const [highlight, setHighlight] = useState('')
  const [learning, setLearning] = useState('')
  const [prayer, setPrayer] = useState('')
  const verse = 'Mark 4:14 · The Parable of the Sower'
  const [savedSuccess, setSavedSuccess] = useState(false)

  const { mutate: saveEntry, isPending: isSaving } = useMutation({
    mutationFn: journalService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal-entries'] })
      setHighlight('')
      setLearning('')
      setPrayer('')
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    },
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!highlight && !learning && !prayer) return

    saveEntry({
      verse: verse || "Today's Scripture",
      highlight: highlight || 'Quiet reflection on God’s Word.',
      learning: learning || 'Grateful for God’s guidance and patience.',
      prayer: prayer || 'Lord, keep my heart soft and receptive.',
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-purple-600">
          Personal Spiritual Sanctuary
        </p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-indigo-900">
          My Journal
        </h1>
        <p className="mt-2 text-sm text-indigo-600">
          A quiet place to record what God is speaking to your heart through Scripture.
        </p>
      </div>

      {/* New Reflection Form */}
      <form
        onSubmit={handleSave}
        className="rounded-[32px] border border-purple-200/80 bg-warm-card p-6 sm:p-9 shadow-lg shadow-purple-900/5 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-4">
          <div className="flex items-center gap-2 text-purple-700">
            <Feather className="h-5 w-5" />
            <h2 className="font-serif text-lg font-bold">New Reflection · Today</h2>
          </div>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            Passage: {verse}
          </span>
        </div>

        {/* Prompt 1 */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
            1. What stood out to me today?
          </label>
          <textarea
            rows={2}
            value={highlight}
            onChange={(e) => setHighlight(e.target.value)}
            placeholder="A verse, a phrase, or an idea that captured your attention..."
            className="w-full rounded-2xl border border-purple-100 bg-lavender-50/50 p-3.5 text-sm text-indigo-900 placeholder-indigo-400 focus:border-purple-400 focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        {/* Prompt 2 */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
            2. What is God teaching me?
          </label>
          <textarea
            rows={3}
            value={learning}
            onChange={(e) => setLearning(e.target.value)}
            placeholder="How does this apply to my family, work, relationships, or inner life?"
            className="w-full rounded-2xl border border-purple-100 bg-lavender-50/50 p-3.5 text-sm text-indigo-900 placeholder-indigo-400 focus:border-purple-400 focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        {/* Prompt 3 */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
            3. My prayer
          </label>
          <textarea
            rows={2}
            value={prayer}
            onChange={(e) => setPrayer(e.target.value)}
            placeholder="Talk with God openly about what you are carrying..."
            className="w-full rounded-2xl border border-purple-100 bg-lavender-50/50 p-3.5 text-sm text-indigo-900 placeholder-indigo-400 focus:border-purple-400 focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 animate-fade-in">
              <Check className="h-4 w-4" /> Reflection saved to your journal!
            </span>
          )}
          <div className="ml-auto">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Save Reflection'}
            </Button>
          </div>
        </div>
      </form>

      {/* Previous Entries */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-indigo-900">
          Previous Entries ({entries.length})
        </h3>

        {isLoading && <p className="text-sm text-indigo-400">Loading your journal…</p>}

        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-[28px] border border-purple-100 bg-warm-card p-6 sm:p-7 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between border-b border-purple-100/60 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span className="text-xs font-bold text-indigo-900">{entry.date}</span>
                </div>
                <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                  {entry.verse}
                </span>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    What stood out
                  </p>
                  <p className="mt-0.5 font-serif italic text-indigo-900">
                    &ldquo;{entry.highlight}&rdquo;
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    Lesson &amp; Reflection
                  </p>
                  <p className="mt-0.5 text-indigo-700 leading-relaxed">
                    {entry.learning}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    Prayer
                  </p>
                  <p className="mt-0.5 text-indigo-600 italic">
                    {entry.prayer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
