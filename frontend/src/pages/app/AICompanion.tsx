import { useState, useEffect } from 'react'
import {
  Sparkles,
  Send,
  Feather,
  Bookmark,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { groqService } from '@/services/groq.service'
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer'

type Message = {
  id: string
  sender: 'user' | 'ai'
  text: string
  references?: string[]
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'user',
    text: 'Why did Jesus speak in parables?',
  },
  {
    id: '2',
    sender: 'ai',
    text: 'Jesus spoke in parables to fulfill prophecy (Psalm 78:2) and to reveal kingdom truths to open hearts while concealing them from those hardened in pride. As He explained in Matthew 13:11–13, parables invite sincere seekers deeper, using everyday realities—seeds, lost coins, banquets—to illustrate divine mysteries.\n\nParables force us to reflect: *Which soil am I? Am I the elder brother or the prodigal?*',
    references: ['Matthew 13:10–17', 'Mark 4:10–12', 'Luke 8:9–10', 'Psalm 78:2'],
  },
]

const PROMPT_SUGGESTIONS = [
  'What does Jesus mean by "the seed" in Mark 4?',
  'Explain the historical background of Romans 8',
  'What does the Bible teach about dealing with anxiety?',
  'How do I pray when I don’t know what to say?',
]

export function AICompanion() {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('rooted_ai_messages')
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES
    } catch {
      return INITIAL_MESSAGES
    }
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      localStorage.setItem('rooted_ai_messages', JSON.stringify(messages))
    } catch {
      // ignore
    }
  }, [messages])

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || input.trim()
    if (!q) return

    const userMsg: Message = {
      id: window.crypto?.randomUUID ? window.crypto.randomUUID() : String(Math.random()),
      sender: 'user',
      text: q,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
        text: m.text,
      }))

      const result = await groqService.askBiblicalCompanion(history, q)

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: result.answer,
        references: result.references,
      }

      setMessages((prev) => [...prev, aiMsg])
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I encountered an issue reaching the study guide. Please check your internet connection or ask again.",
        references: ['Proverbs 3:5–6'],
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  const toggleSave = (id: string) => {
    setSavedStatus((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-5rem)] max-w-4xl flex-col px-4 py-4 md:px-8">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between border-b border-purple-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-purple-500 text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </span>
            <h1 className="font-serif text-2xl font-bold text-indigo-900">
              ROOTED Companion
            </h1>
          </div>
          <p className="text-xs text-indigo-500 mt-0.5">
            Explore Scripture · Ask questions · Biblically grounded AI
          </p>
        </div>

        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
          Theologically Grounded
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6 scrollbar-thin">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {m.sender === 'user' ? (
              <div className="max-w-lg rounded-3xl rounded-tr-md bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-sm font-medium text-white shadow-md">
                <p>{m.text}</p>
              </div>
            ) : (
              <div className="max-w-2xl rounded-3xl rounded-tl-md border border-purple-100 bg-warm-card p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-purple-100/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <span className="font-serif text-xs font-bold text-purple-800">
                      ROOTED Study Guide
                    </span>
                  </div>
                  <span className="text-[10px] text-indigo-400">Scriptural Reflection</span>
                </div>

                <MarkdownRenderer content={m.text} />

                {m.references && m.references.length > 0 && (
                  <div className="border-t border-purple-100/60 pt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-purple-700 mb-2">
                      Scripture References
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {m.references.map((ref) => (
                        <span
                          key={ref}
                          className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 ring-1 ring-purple-200"
                        >
                          {ref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions Row */}
                <div className="flex flex-wrap items-center gap-2 border-t border-purple-100/60 pt-3 text-xs">
                  <button
                    onClick={() => handleSend(`Can you go deeper into ${m.references?.[0] || 'this'}?`)}
                    className="flex items-center gap-1.5 rounded-full bg-purple-100/70 px-3 py-1.5 font-semibold text-purple-800 hover:bg-purple-200/70 transition-colors"
                  >
                    Go deeper
                  </button>
                  <button
                    onClick={() => toggleSave(m.id)}
                    className="flex items-center gap-1.5 rounded-full border border-purple-200 px-3 py-1.5 font-semibold text-indigo-700 hover:bg-purple-50 transition-colors"
                  >
                    <Bookmark className="h-3.5 w-3.5" fill={savedStatus[m.id] ? 'currentColor' : 'none'} />
                    {savedStatus[m.id] ? 'Saved' : 'Save'}
                  </button>
                  <button
                    onClick={() => alert('Reflection added to your private spiritual journal.')}
                    className="flex items-center gap-1.5 rounded-full border border-purple-200 px-3 py-1.5 font-semibold text-indigo-700 hover:bg-purple-50 transition-colors"
                  >
                    <Feather className="h-3.5 w-3.5" />
                    Add to Journal
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-sm text-purple-700">
            <span className="flex h-7 w-7 animate-spin items-center justify-center rounded-full border-2 border-purple-600 border-t-transparent" />
            <span>Consulting Scripture and cross-references...</span>
          </div>
        )}
      </div>

      {/* Suggested Chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
        {PROMPT_SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => handleSend(s)}
            className="shrink-0 rounded-full border border-purple-200/80 bg-warm-card px-3.5 py-1.5 text-xs font-medium text-indigo-700 hover:border-purple-400 hover:bg-purple-50 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSend()
        }}
        className="flex items-center gap-3 rounded-3xl border border-purple-200/80 bg-warm-card p-2.5 shadow-md"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Scripture, parables, or theological meaning..."
          className="flex-1 bg-transparent px-3 text-sm text-indigo-900 placeholder-indigo-400 focus:outline-none"
        />
        <Button size="sm" type="submit" disabled={!input.trim() || loading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
