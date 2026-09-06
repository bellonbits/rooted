import { useState } from 'react'
import { ArrowLeft, Sparkles, ChevronRight, Send, Loader2 } from 'lucide-react'
import { groqService } from '@/services/groq.service'

type KidsAskRootiProps = {
  onBack: () => void
}

const FAQ_QUESTIONS = [
  {
    q: 'Why did David fight Goliath?',
    a: 'David trusted God! He knew giant Goliath was very big and strong, but he knew God was way bigger! David wanted everyone to know that God protects those who trust Him.',
    explore: ['What does courage mean?', 'Can I be brave like David?'],
  },
  {
    q: 'Why did God create people and animals?',
    a: 'God created people and animals out of His big, overflowing love! He wanted a family to enjoy His beautiful world, care for nature, and be His friends.',
    explore: ['How can I care for God’s world?', 'Does God know my name?'],
  },
  {
    q: 'What is prayer?',
    a: 'Prayer is simply talking to God just like talking to your best friend or loving parent! You can thank Him, ask for help, or even tell Him when you feel scared.',
    explore: ['Does God always hear me?', 'When can I pray?'],
  },
  {
    q: 'What does faith mean?',
    a: 'Faith means believing and trusting that God is good and with you, even when you cannot see Him with your eyes—just like trusting the wind blows when you feel the breeze!',
    explore: ['How do I grow my faith?', 'What makes roots deep?'],
  },
]

export function KidsAskRooti({ onBack }: KidsAskRootiProps) {
  const [selectedQ, setSelectedQ] = useState(FAQ_QUESTIONS[0])
  const [customQuestion, setCustomQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAskCustom = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customQuestion.trim()) return

    setLoading(true)
    const qText = customQuestion.trim()
    setCustomQuestion('')

    try {
      const result = await groqService.askRooti(qText)
      setSelectedQ({
        q: qText,
        a: result.answer,
        explore: result.exploreQuestions,
      })
    } catch {
      setSelectedQ({
        q: qText,
        a: "God loves you so much, Little Explorer! When we have big questions, we can always talk to Him in prayer and read His wonderful Bible stories.",
        explore: ['What is your favorite Bible story?', 'Who can you pray for today?'],
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSelectPredefined = async (item: typeof FAQ_QUESTIONS[0]) => {
    setSelectedQ(item)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-20">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-purple-200 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="rounded-[36px] border border-emerald-400/30 bg-gradient-to-b from-purple-950 via-indigo-950 to-purple-950 p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-2xl shadow-md">
            🌱
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300">
              Safe Explorer Guide · Real AI Powered by Groq
            </span>
            <h2 className="font-serif text-2xl font-bold text-white">Ask ROOTI</h2>
            <p className="text-xs text-purple-200/80">Have big questions about God and the Bible?</p>
          </div>
        </div>

        {/* Ask Question Input Box */}
        <form onSubmit={handleAskCustom} className="rounded-2xl border border-emerald-400/40 bg-white/10 p-2 flex items-center gap-2 focus-within:ring-2 focus-within:ring-emerald-400">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Ask ROOTI anything (e.g. Why did God make trees?)..."
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder:text-purple-300/60 outline-none font-medium"
          />
          <button
            type="submit"
            disabled={loading || !customQuestion.trim()}
            className="flex h-10 items-center gap-1.5 rounded-xl bg-emerald-400 px-4 text-xs font-bold text-emerald-950 shadow-md hover:bg-emerald-300 disabled:opacity-40 transition-colors"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <span>Ask</span>
                <Send className="h-3 w-3" />
              </>
            )}
          </button>
        </form>

        {/* Selected Answer Box */}
        <div className="rounded-3xl border border-emerald-400/30 bg-emerald-950/40 p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>ROOTI Explains:</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-white">
            &ldquo;{selectedQ.q}&rdquo;
          </h3>

          <p className="text-sm leading-relaxed text-purple-100 whitespace-pre-line">
            {selectedQ.a}
          </p>

          {selectedQ.explore && selectedQ.explore.length > 0 && (
            <div className="pt-2 border-t border-white/10">
              <p className="text-[11px] font-black uppercase tracking-wider text-coral-400 mb-2">
                Want to explore next?
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedQ.explore.map((ex: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCustomQuestion(ex)
                    }}
                    className="rounded-full bg-white/10 hover:bg-emerald-500/20 px-3 py-1 text-xs text-purple-200 hover:text-white font-medium transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Question Selector List */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3">
            Or pick an explorer question:
          </p>
          <div className="space-y-2">
            {FAQ_QUESTIONS.map((item) => (
              <button
                key={item.q}
                onClick={() => handleSelectPredefined(item)}
                className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-xs sm:text-sm font-bold transition-all ${
                  selectedQ.q === item.q
                    ? 'border-emerald-400 bg-emerald-500/20 text-white shadow-xs'
                    : 'border-white/10 bg-white/5 text-purple-200 hover:bg-white/10'
                }`}
              >
                <span>{item.q}</span>
                <ChevronRight className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
