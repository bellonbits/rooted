import { useState } from 'react'
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Trophy,
} from 'lucide-react'

type KidsStoryPlayerProps = {
  onBack: () => void
  onRewardXP: (amount: number) => void
  onUnlockArtifact: (name: string) => void
}

type Scene = {
  id: number
  title: string
  narration: string
  question: string
  choices: { text: string; correct: boolean }[]
  hint: string
  hiddenObject?: { name: string; emoji: string }
}

const SCENES: Scene[] = [
  {
    id: 1,
    title: 'Scene 1: The Valley of Elah',
    narration:
      'The giant warrior Goliath shouted across the desert valley for forty days, frightening all the soldiers. But young shepherd boy David arrived carrying bread and cheese for his brothers. When David heard Goliath mocking the Living God, he felt no fear.',
    question: 'Why wasn’t young David afraid of giant Goliath?',
    choices: [
      { text: 'David knew God was greater than any giant', correct: true },
      { text: 'David brought a huge steel sword', correct: false },
      { text: 'David ran away to hide in the tents', correct: false },
    ],
    hint: 'David remembered how God helped him protect his sheep from lions and bears!',
    hiddenObject: { name: 'Five Smooth Stones', emoji: '🪨' },
  },
  {
    id: 2,
    title: 'Scene 2: King Saul’s Armor',
    narration:
      'King Saul tried to put his heavy bronze armor and helmet on David. But David could barely walk! He said, "I cannot go in these, because I am not used to them." Instead, David chose what he knew: his shepherd’s staff, a simple leather sling, and five smooth stones from the stream.',
    question: 'What weapon did David choose instead of the heavy armor?',
    choices: [
      { text: 'A golden spear', correct: false },
      { text: 'His simple sling and five smooth stones', correct: true },
      { text: 'A heavy iron shield', correct: false },
    ],
    hint: 'God uses what is small and humble in our hands!',
    hiddenObject: { name: 'David’s Leather Sling', emoji: '🏹' },
  },
  {
    id: 3,
    title: 'Scene 3: The Battle in the Name of the Lord',
    narration:
      'David ran boldly toward giant Goliath. David called out: "You come against me with sword and spear, but I come against you in the name of the LORD Almighty!" David placed a stone in his sling, swung it, and the stone struck Goliath. God gave David the victory!',
    question: 'In whose name did David face Goliath?',
    choices: [
      { text: 'In the name of the LORD Almighty', correct: true },
      { text: 'In his own strength', correct: false },
      { text: 'In the name of King Saul', correct: false },
    ],
    hint: 'Victory belongs to God, not human might!',
    hiddenObject: { name: 'The Shepherd’s Harp', emoji: '🎵' },
  },
]

export function KidsStoryPlayer({
  onBack,
  onRewardXP,
  onUnlockArtifact,
}: KidsStoryPlayerProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [foundObject, setFoundObject] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const scene = SCENES[currentSceneIndex]

  const handleSelectChoice = (index: number, correct: boolean) => {
    setSelectedChoice(index)
    setIsCorrect(correct)
    if (correct) {
      onRewardXP(20)
    }
  }

  const handleDiscoverObject = () => {
    if (!foundObject && scene.hiddenObject) {
      setFoundObject(true)
      onRewardXP(30)
      onUnlockArtifact(scene.hiddenObject.name)
    }
  }

  const handleNextScene = () => {
    if (currentSceneIndex < SCENES.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1)
      setSelectedChoice(null)
      setIsCorrect(null)
      setFoundObject(false)
    } else {
      setIsCompleted(true)
      onRewardXP(50)
      onUnlockArtifact('Brave Heart Badge')
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-20">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explorer Map
        </button>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-coral-300">
            Scene {currentSceneIndex + 1} of {SCENES.length}
          </span>
        </div>
      </div>

      {!isCompleted ? (
        <div className="overflow-hidden rounded-[36px] border border-white/20 bg-gradient-to-b from-purple-950/80 via-indigo-950/90 to-purple-950/90 p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-6">
          {/* Scene Header & Narration Audio */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-coral-400">
                Story Adventure · 1 Samuel 17
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-white mt-0.5">
                {scene.title}
              </h2>
            </div>

            <button
              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                isAudioPlaying
                  ? 'bg-coral-500 text-white shadow-md'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              {isAudioPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              {isAudioPlaying ? 'Narration Playing...' : 'Listen to Audio'}
            </button>
          </div>

          {/* Hero Scene Illustration */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border-2 border-white/20 shadow-xl">
            <img
              src="/images/african-david-goliath.jpg"
              alt="David facing Goliath"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Clickable Hidden Object Discovery In Scene */}
            {scene.hiddenObject && (
              <button
                onClick={handleDiscoverObject}
                className={`absolute bottom-4 right-4 flex items-center gap-2 rounded-2xl p-2.5 backdrop-blur-md transition-all ${
                  foundObject
                    ? 'bg-emerald-500 text-white ring-2 ring-white scale-105'
                    : 'bg-white/25 text-white hover:scale-110 animate-bounce'
                }`}
                title="Tap to discover hidden object!"
              >
                <span className="text-xl">{scene.hiddenObject.emoji}</span>
                <span className="text-xs font-black">
                  {foundObject ? `Discovered ${scene.hiddenObject.name}! ✨` : 'Tap to discover object!'}
                </span>
              </button>
            )}
          </div>

          {/* Narration Box */}
          <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
            <p className="font-serif text-base sm:text-lg leading-relaxed text-purple-100">
              &ldquo;{scene.narration}&rdquo;
            </p>
          </div>

          {/* Interactive Question / Choice */}
          <div className="space-y-3 pt-2">
            <h3 className="font-serif text-base font-bold text-coral-300">
              {scene.question}
            </h3>

            <div className="space-y-2.5">
              {scene.choices.map((choice, i) => {
                const isSelected = selectedChoice === i
                let btnStyle = 'border-white/10 bg-white/5 text-purple-100 hover:bg-white/10'

                if (isSelected) {
                  btnStyle = choice.correct
                    ? 'border-emerald-400 bg-emerald-500/30 text-white shadow-md ring-2 ring-emerald-400'
                    : 'border-rose-400 bg-rose-500/30 text-white ring-2 ring-rose-400'
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectChoice(i, choice.correct)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-sm font-semibold transition-all ${btnStyle}`}
                  >
                    <span>{choice.text}</span>
                    {isSelected && choice.correct && (
                      <span className="flex items-center gap-1 text-xs font-black text-emerald-300">
                        ✨ Correct!
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Next Scene Button */}
          {isCorrect && (
            <div className="flex justify-end pt-4 border-t border-white/10 animate-fade-in">
              <button
                onClick={handleNextScene}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-coral-500 to-coral-400 px-6 py-3 text-sm font-black text-white shadow-lg hover:scale-105 transition-all"
              >
                {currentSceneIndex < SCENES.length - 1 ? 'Next Scene →' : 'Complete Story Adventure 🎉'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Celebration Screen */
        <div className="rounded-[40px] border border-amber-400/40 bg-gradient-to-br from-purple-950 via-indigo-950 to-amber-950/60 p-8 sm:p-12 text-center text-white shadow-2xl space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-400 text-indigo-950 shadow-xl shadow-amber-400/30">
            <Trophy className="h-10 w-10" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-black">
            Adventure Complete!
          </h2>

          <p className="mx-auto max-w-md text-sm text-purple-200/90 leading-relaxed">
            You completed David &amp; Goliath! You learned that God gives us courage to face any giant problem.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="rounded-2xl bg-white/10 px-4 py-2 border border-white/15 text-xs font-bold text-amber-300">
              ⭐ +50 Growth Points
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-2 border border-white/15 text-xs font-bold text-emerald-300">
              🌱 My Tree Just Grew!
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-2 border border-white/15 text-xs font-bold text-coral-300">
              🏹 Unlocked: David&apos;s Sling
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={onBack}
              className="rounded-full bg-coral-500 px-8 py-3.5 text-sm font-black text-white shadow-lg hover:scale-105 transition-all"
            >
              Return to Explorer Hub →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
