import { Sparkles, Compass, BookOpen, Trees, User, Sprout } from 'lucide-react'

export type KidsTab = 'home' | 'explore' | 'story' | 'tree' | 'me'

type KidsBottomNavProps = {
  activeTab: KidsTab
  onSelectTab: (tab: KidsTab) => void
  treeBadge?: boolean | string
}

export function KidsBottomNav({
  activeTab,
  onSelectTab,
  treeBadge,
}: KidsBottomNavProps) {
  const tabs: { id: KidsTab; label: string; icon: typeof Sparkles }[] = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'story', label: 'Story', icon: BookOpen },
    { id: 'tree', label: 'My Tree', icon: Trees },
    { id: 'me', label: 'Me', icon: User },
  ]

  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950 p-2 shadow-2xl shadow-black/60 ring-2 ring-white/20 backdrop-blur-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-black transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-coral-500 to-coral-400 text-white shadow-lg shadow-coral-500/40 scale-105'
                  : 'text-purple-200/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-4.5 w-4.5" strokeWidth={isActive ? 2.8 : 2} />
              <span className={isActive ? 'inline' : 'hidden sm:inline'}>
                {tab.label}
              </span>

              {tab.id === 'tree' && treeBadge && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-indigo-950 ring-2 ring-purple-950">
                  <Sprout className="h-2.5 w-2.5 text-indigo-950" />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
