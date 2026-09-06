import { useState } from 'react'
import { KidsHeader } from '@/components/kids/KidsHeader'
import { KidsBottomNav, type KidsTab } from '@/components/kids/KidsBottomNav'
import { KidsHomeView } from '@/components/kids/KidsHomeView'
import { KidsExploreMap } from '@/components/kids/KidsExploreMap'
import { KidsStoryPlayer } from '@/components/kids/KidsStoryPlayer'
import { KidsInteractiveBook } from '@/components/kids/KidsInteractiveBook'
import { KidsTreeGarden } from '@/components/kids/KidsTreeGarden'
import { KidsMemoryGame } from '@/components/kids/KidsMemoryGame'
import { KidsPrayerAdventure } from '@/components/kids/KidsPrayerAdventure'
import { KidsAskRooti } from '@/components/kids/KidsAskRooti'
import { KidsProfileView } from '@/components/kids/KidsProfileView'
import { KidsParentModal } from '@/components/kids/KidsParentModal'

export function KidsMode() {
  const [activeTab, setActiveTab] = useState<KidsTab>('home')
  const [selectedStoryId, setSelectedStoryId] = useState<string>('creation')
  const [subView, setSubView] = useState<'none' | 'memory' | 'prayer' | 'askRooti'>('none')
  const [parentModalOpen, setParentModalOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Progression & Reward States (per design spec)
  const [growthPoints, setGrowthPoints] = useState(240)
  const streakDays = 7
  const [treeStage, setTreeStage] = useState(3)
  const [missionCompleted, setMissionCompleted] = useState(false)
  const [unlockedArtifacts, setUnlockedArtifacts] = useState<string[]>([
    'Five Smooth Stones',
    'David’s Leather Sling',
  ])

  const [memorizedVerses, setMemorizedVerses] = useState([
    {
      ref: 'Psalm 23:1',
      text: 'The Lord is my shepherd; I shall not want.',
      plantName: 'Shepherd Lily',
      plantEmoji: '🌿',
    },
    {
      ref: 'Philippians 4:13',
      text: 'I can do all things through Christ who strengthens me.',
      plantName: 'Courage Blossom',
      plantEmoji: '🌸',
    },
  ])

  // Reward functions
  const handleRewardXP = (amount: number) => {
    setGrowthPoints((prev) => {
      const next = prev + amount
      if (next >= 300 && treeStage < 4) {
        setTreeStage(4)
      } else if (next >= 400 && treeStage < 5) {
        setTreeStage(5)
      }
      return next
    })
  }

  const handleUnlockArtifact = (name: string) => {
    setUnlockedArtifacts((prev) => (prev.includes(name) ? prev : [...prev, name]))
  }

  const handleCompleteMission = () => {
    if (!missionCompleted) {
      setMissionCompleted(true)
      handleRewardXP(25)
    }
  }

  const handleMemorizeComplete = (verse: {
    ref: string
    text: string
    plantName: string
    plantEmoji: string
  }) => {
    setMemorizedVerses((prev) => [verse, ...prev])
    if (treeStage < 4) {
      setTreeStage(4)
    }
  }

  const level = growthPoints >= 350 ? 5 : 4
  const levelName = level === 5 ? 'Faith Explorer' : 'Scripture Seeker'

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-[#151226] to-purple-950 text-white selection:bg-coral-500 selection:text-white">
      {/* Top Header */}
      <KidsHeader
        growthPoints={growthPoints}
        level={level}
        levelName={levelName}
        streakDays={streakDays}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenParentModal={() => setParentModalOpen(true)}
      />

      {/* Main Experience View */}
      <main className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        {/* Sub-view Overrides */}
        {subView === 'memory' ? (
          <KidsMemoryGame
            onBack={() => setSubView('none')}
            onRewardXP={handleRewardXP}
            onMemorizeComplete={handleMemorizeComplete}
          />
        ) : subView === 'prayer' ? (
          <KidsPrayerAdventure
            onBack={() => setSubView('none')}
            onRewardXP={handleRewardXP}
          />
        ) : subView === 'askRooti' ? (
          <KidsAskRooti onBack={() => setSubView('none')} />
        ) : (
          /* Primary Tabs */
          <>
            {activeTab === 'home' && (
              <KidsHomeView
                onStartAdventure={(storyId) => {
                  setSelectedStoryId(storyId === 'david' ? 'david' : 'creation')
                  setActiveTab('story')
                }}
                onOpenMemoryGame={() => setSubView('memory')}
                onOpenPrayer={() => setSubView('prayer')}
                onOpenAskRooti={() => setSubView('askRooti')}
                missionCompleted={missionCompleted}
                onCompleteMission={handleCompleteMission}
              />
            )}

            {activeTab === 'explore' && (
              <KidsExploreMap
                onSelectStory={(storyId) => {
                  setSelectedStoryId(storyId)
                  setActiveTab('story')
                }}
              />
            )}

            {activeTab === 'story' && (
              selectedStoryId === 'david' ? (
                <KidsStoryPlayer
                  onBack={() => setActiveTab('explore')}
                  onRewardXP={handleRewardXP}
                  onUnlockArtifact={handleUnlockArtifact}
                />
              ) : (
                <KidsInteractiveBook
                  initialStoryId={selectedStoryId}
                  onBack={() => setActiveTab('explore')}
                  onRewardXP={handleRewardXP}
                  onUnlockArtifact={handleUnlockArtifact}
                />
              )
            )}

            {activeTab === 'tree' && (
              <KidsTreeGarden
                treeStage={treeStage}
                memorizedVerses={memorizedVerses}
                onOpenMemoryGame={() => setSubView('memory')}
              />
            )}

            {activeTab === 'me' && (
              <KidsProfileView
                growthPoints={growthPoints}
                level={level}
                levelName={levelName}
                streakDays={streakDays}
                unlockedArtifacts={unlockedArtifacts}
                onOpenParentModal={() => setParentModalOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* 5-Tab Floating Bottom Navigation */}
      {subView === 'none' && (
        <KidsBottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab)
            setSubView('none')
          }}
          treeBadge="🌱"
        />
      )}

      {/* PIN-Protected Parent Modal */}
      <KidsParentModal
        isOpen={parentModalOpen}
        onClose={() => setParentModalOpen(false)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />
    </div>
  )
}
