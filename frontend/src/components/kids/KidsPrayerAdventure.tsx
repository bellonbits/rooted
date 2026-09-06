import { useState } from 'react'
import { Heart, ArrowLeft, Send } from 'lucide-react'

type KidsPrayerAdventureProps = {
  onBack: () => void
  onRewardXP: (amount: number) => void
}

const EMOTIONS = [
  { emoji: '😊', label: 'Happy', note: 'I am full of joy today!' },
  { emoji: '😌', label: 'Peaceful', note: 'Feeling calm and quiet.' },
  { emoji: '😟', label: 'Worried', note: 'Something feels scary or big.' },
  { emoji: '😢', label: 'Sad', note: 'My heart feels heavy.' },
  { emoji: '😡', label: 'Angry', note: 'Things feel unfair or frustrating.' },
  { emoji: '😴', label: 'Tired', note: 'Need rest and peace.' },
]

const PRAYER_TOPICS = [
  { id: 'thank', title: 'Thank God', prompt: 'Dear God, thank you for my family, food, and...' },
  { id: 'help', title: 'Ask for Help', prompt: 'Dear Lord, please help me with...' },
  { id: 'someone', title: 'Pray for Someone', prompt: 'Jesus, please protect and bless...' },
  { id: 'sorry', title: 'Say Sorry', prompt: 'Lord Jesus, forgive me for...' },
  { id: 'quiet', title: 'Quiet Moment', prompt: 'Lord, I just want to sit quietly with you and listen.' },
]

export function KidsPrayerAdventure({
  onBack,
  onRewardXP,
}: KidsPrayerAdventureProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [prayerText, setPrayerText] = useState('')
  const [isSent, setIsSent] = useState(false)

  const handleSendPrayer = () => {
    if (!prayerText.trim() && selectedTopic !== 'quiet') return
    setIsSent(true)
    onRewardXP(25)
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

      <div className="rounded-[36px] border border-coral-400/30 bg-gradient-to-b from-purple-950 via-indigo-950 to-purple-950 p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-coral-400">
            <Heart className="h-5 w-5 fill-coral-400" />
            <span className="text-xs font-black uppercase tracking-wider">
              Prayer Adventure · Talk With God
            </span>
          </div>
          <span className="rounded-full bg-coral-500/20 px-3 py-1 text-xs font-bold text-coral-300">
            +25 XP
          </span>
        </div>

        {/* 1. Emotion Selector */}
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
            How are you feeling today?
          </h2>
          <p className="mt-1 text-xs text-purple-200/80">
            God cares about every feeling you have! Tap your mood:
          </p>

          <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            {EMOTIONS.map((emo) => (
              <button
                key={emo.label}
                onClick={() => setSelectedEmotion(emo.label)}
                className={`flex flex-col items-center justify-center rounded-2xl p-3 text-center border transition-all ${
                  selectedEmotion === emo.label
                    ? 'border-coral-400 bg-coral-500/30 scale-105 shadow-md'
                    : 'border-white/10 bg-white/5 hover:bg-white/15'
                }`}
              >
                <span className="text-3xl select-none">{emo.emoji}</span>
                <span className="mt-1 text-[11px] font-bold text-white">{emo.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Prayer Topic */}
        {selectedEmotion && (
          <div className="space-y-3 pt-2 border-t border-white/10 animate-fade-in">
            <h3 className="font-serif text-lg font-bold text-white">
              What would you like to talk to God about?
            </h3>

            <div className="flex flex-wrap gap-2">
              {PRAYER_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopic(topic.id)
                    setPrayerText(topic.prompt)
                  }}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    selectedTopic === topic.id
                      ? 'bg-coral-500 text-white shadow-md'
                      : 'border border-white/15 bg-white/10 text-purple-200 hover:bg-white/20'
                  }`}
                >
                  {topic.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. Write Prayer */}
        {selectedTopic && !isSent && (
          <div className="space-y-3 pt-2 border-t border-white/10 animate-fade-in">
            <textarea
              rows={3}
              value={prayerText}
              onChange={(e) => setPrayerText(e.target.value)}
              placeholder="Whisper your words here..."
              className="w-full rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white placeholder-purple-300 focus:border-coral-400 focus:outline-none"
            />

            <button
              onClick={handleSendPrayer}
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral-500 to-coral-400 px-7 py-3 text-xs font-black text-white shadow-lg hover:scale-105 transition-all"
            >
              <Send className="h-4 w-4" />
              Amen! Send Prayer to God
            </button>
          </div>
        )}

        {/* Prayer Received Celebration */}
        {isSent && (
          <div className="rounded-3xl border border-emerald-400/40 bg-emerald-950/40 p-6 text-center text-white space-y-3 animate-fade-in">
            <span className="text-3xl">🕊️</span>
            <h4 className="font-serif text-lg font-bold text-emerald-300">
              God Heard Your Prayer!
            </h4>
            <p className="text-xs text-purple-200 leading-relaxed max-w-md mx-auto">
              &ldquo;The LORD is near to all who call on him in truth.&rdquo; — Psalm 145:18.
              Keep your heart peaceful, little explorer!
            </p>
            <button
              onClick={onBack}
              className="rounded-full bg-emerald-400 px-6 py-2.5 text-xs font-black text-indigo-950 shadow-md hover:bg-emerald-300 transition-colors"
            >
              Return to Adventure Hub
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
