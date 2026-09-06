import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, Check, Search, Globe, Sparkles, BookOpen } from 'lucide-react'
import { bibleService, type HelloAOTranslation } from '@/services/bible.service'
import { useBibleStore } from '@/store/bibleStore'
import { cn } from '@/utils/cn'

// Curated prominent translations to display prominently while loading or as featured
const FEATURED_TRANSLATIONS = [
  { id: 'BSB', name: 'Berean Standard Bible', languageEnglishName: 'English', shortName: 'BSB' },
  { id: 'ENGWEBP', name: 'World English Bible', languageEnglishName: 'English', shortName: 'WEB' },
  { id: 'swh_bib', name: 'Biblica® Neno: Bibilia Takatifu™', languageEnglishName: 'Kiswahili', shortName: 'SWH' },
  { id: 'swh_swa', name: 'Biblia Takatifu (Union Version)', languageEnglishName: 'Kiswahili', shortName: 'SUV' },
  { id: 'yor_bib', name: 'Biblica® Bíbélì Mímọ́ Èdè Yorùbá', languageEnglishName: 'Yorùbá', shortName: 'YOR' },
  { id: 'ibo_bib', name: 'Biblica® Baịbụlụ Nsọ nʼIgbo', languageEnglishName: 'Igbo', shortName: 'IBO' },
  { id: 'hau_bib', name: 'Biblica® Littafi Mai Tsarki', languageEnglishName: 'Hausa', shortName: 'HAU' },
  { id: 'amh_amh', name: 'መጽሐፍ ቅዱስ (Amharic Standard)', languageEnglishName: 'Amharic', shortName: 'AMH' },
  { id: 'lug_bib', name: 'Biblica® Bayibuli Entukuvu', languageEnglishName: 'Luganda', shortName: 'LUG' },
  { id: 'lin_bib', name: 'Biblica® Mokanda na Bomoi (Lingala)', languageEnglishName: 'Lingala', shortName: 'LIN' },
  { id: 'ewe_bib', name: 'Biblica® Agbenya La (Ewe)', languageEnglishName: 'Ewe', shortName: 'EWE' },
  { id: 'gaz_bib', name: 'Kitaaba Qulqulluu (Oromo)', languageEnglishName: 'Afaan Oromoo', shortName: 'ORM' },
  { id: 'zlu_tsc', name: 'IBhayibheli (isiZulu)', languageEnglishName: 'isiZulu', shortName: 'ZUL' },
]

export function BibleTranslations() {
  const navigate = useNavigate()
  const translation = useBibleStore((s) => s.translation)
  const setTranslation = useBibleStore((s) => s.setTranslation)

  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<'all' | 'african' | 'english' | 'french' | 'portuguese'>('all')

  // Real live translations fetched directly from HelloAO API
  const { data: liveTranslations, isLoading } = useQuery({
    queryKey: ['helloao-available-translations'],
    queryFn: () => bibleService.fetchAvailableTranslations(),
    staleTime: 1000 * 60 * 30, // 30 mins
  })

  const translationsList: HelloAOTranslation[] = useMemo(() => {
    if (liveTranslations && liveTranslations.length > 0) {
      return liveTranslations
    }
    return FEATURED_TRANSLATIONS.map((f) => ({
      id: f.id,
      name: f.name,
      language: f.languageEnglishName.toLowerCase(),
      languageEnglishName: f.languageEnglishName,
      shortName: f.shortName,
    }))
  }, [liveTranslations])

  const filteredTranslations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return translationsList.filter((t) => {
      const name = t.name?.toLowerCase() ?? ''
      const id = t.id?.toLowerCase() ?? ''
      const lang = (t.languageEnglishName || t.languageName || t.language || '').toLowerCase()
      const matchesSearch = !q || name.includes(q) || id.includes(q) || lang.includes(q)

      if (!matchesSearch) return false

      if (activeCategory === 'african') {
        return /swahili|kiswahili|yoruba|igbo|hausa|amharic|zulu|xhosa|oromo|somali|lingala|luganda|kinyarwanda|kirundi|chichewa|afrikaans|malagasy|sotho|tswana|ewe|twi|ganda|bambara|wolof/i.test(lang + ' ' + name)
      }

      if (activeCategory === 'english') {
        return lang.includes('english')
      }

      if (activeCategory === 'french') {
        return lang.includes('french') || lang.includes('français')
      }

      if (activeCategory === 'portuguese') {
        return lang.includes('portuguese') || lang.includes('português')
      }

      return true
    })
  }, [translationsList, searchQuery, activeCategory])

  const handleSelect = (id: string) => {
    setTranslation(id)
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-indigo-950 pb-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <header className="rounded-3xl bg-white p-6 shadow-xs ring-1 ring-purple-100/70">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-indigo-900 hover:bg-purple-50 transition-colors ring-1 ring-purple-100"
                aria-label="Back"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-indigo-950">
                  Live Bible Translations
                </h1>
                <p className="text-xs text-purple-700 font-semibold">
                  {translationsList.length.toLocaleString()}+ live translations available via HelloAO API
                </p>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
              <Globe className="h-5 w-5" />
            </div>
          </div>

          {/* Search Input */}
          <div className="mt-5 flex items-center gap-2.5 rounded-2xl bg-purple-50/50 px-4 py-3 ring-1 ring-purple-100 focus-within:ring-2 focus-within:ring-purple-400">
            <Search className="h-4 w-4 text-purple-600 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across 1,250+ live translations, languages, or dialects..."
              className="w-full bg-transparent text-sm font-medium text-indigo-950 outline-none placeholder:text-indigo-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all',
                activeCategory === 'all'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-purple-50 text-indigo-700 hover:bg-purple-100',
              )}
            >
              All ({translationsList.length.toLocaleString()})
            </button>
            <button
              onClick={() => setActiveCategory('african')}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all',
                activeCategory === 'african'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-purple-50 text-indigo-700 hover:bg-purple-100',
              )}
            >
              African Languages (Swahili, Yoruba, Igbo, Hausa, Zulu...)
            </button>
            <button
              onClick={() => setActiveCategory('english')}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all',
                activeCategory === 'english'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-purple-50 text-indigo-700 hover:bg-purple-100',
              )}
            >
              English Standards (BSB, WEB, etc.)
            </button>
            <button
              onClick={() => setActiveCategory('french')}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all',
                activeCategory === 'french'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-purple-50 text-indigo-700 hover:bg-purple-100',
              )}
            >
              Français Afrique
            </button>
            <button
              onClick={() => setActiveCategory('portuguese')}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all',
                activeCategory === 'portuguese'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-purple-50 text-indigo-700 hover:bg-purple-100',
              )}
            >
              Português
            </button>
          </div>
        </header>

        {/* Translation Cards Responsive Grid */}
        <main className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Showing {filteredTranslations.length} translation editions
            </p>
            {isLoading && (
              <span className="text-xs text-purple-600 font-semibold animate-pulse">
                Syncing live HelloAO catalog...
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredTranslations.slice(0, 150).map((t) => {
              const isSelected = t.id.toLowerCase() === translation.toLowerCase()

              return (
                <div
                  key={t.id}
                  onClick={() => handleSelect(t.id)}
                  className={cn(
                    'group cursor-pointer rounded-2xl p-4 transition-all flex items-center justify-between',
                    isSelected
                      ? 'bg-purple-50 ring-2 ring-purple-600 shadow-xs'
                      : 'bg-white hover:bg-purple-50/60 ring-1 ring-purple-100/70 hover:shadow-sm',
                  )}
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-purple-800">
                        {t.shortName || t.id}
                      </span>
                      <p className="truncate text-xs font-bold text-indigo-950 group-hover:text-purple-700 transition-colors">
                        {t.name}
                      </p>
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-indigo-500">
                      <span>{t.languageEnglishName || t.languageName || t.language}</span>
                      {t.numberOfBooks && (
                        <>
                          <span className="text-purple-300">·</span>
                          <span className="truncate text-indigo-400 text-[11px] flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {t.numberOfBooks} books
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-700 text-white shadow-xs">
                      <Check className="h-4 w-4 stroke-[3]" />
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-purple-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      Select
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {filteredTranslations.length > 150 && (
            <p className="pt-6 pb-4 text-center text-xs text-indigo-400">
              Showing top 150 of {filteredTranslations.length} matches. Type in the search box to filter across all {filteredTranslations.length} versions.
            </p>
          )}

          {filteredTranslations.length === 0 && (
            <div className="py-20 text-center rounded-3xl bg-white p-8 ring-1 ring-purple-100">
              <Sparkles className="mx-auto h-10 w-10 text-purple-300 mb-3" />
              <p className="text-base font-bold text-indigo-950">No versions matched your query</p>
              <p className="text-xs text-indigo-500 mt-1">
                Try searching for languages like &ldquo;Swahili&rdquo;, &ldquo;Yoruba&rdquo;, &ldquo;Hausa&rdquo;, &ldquo;English&rdquo;, or translation codes like &ldquo;BSB&rdquo;.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
