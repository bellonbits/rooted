// Real Live Bible Service using the HelloAO Bible API (https://bible.helloao.org)
// Supports 1,250+ live translations, USFM book codes, and simple JSON chapter format

import { getBookUsfmCode } from '@/constants/bible'

export type BibleVerse = {
  verse: number
  text: string
  heading?: string
}

export type BibleChapter = {
  reference: string
  translationId: string
  translationName?: string
  heading?: string
  verses: BibleVerse[]
  audioLinks?: Record<string, string>
}

export type DailyVerse = {
  book: string
  bookId: string
  chapter: number
  verse: number
  text: string
  reference: string
}

export type HelloAOTranslation = {
  id: string
  name: string
  shortName?: string
  englishName?: string
  language: string
  languageName?: string
  languageEnglishName?: string
  numberOfBooks?: number
  totalNumberOfChapters?: number
  totalNumberOfVerses?: number
}

function cleanText(text: string): string {
  return text.replace(/\s*\n\s*/g, ' ').trim()
}

export class ChapterNotFoundError extends Error {}

export const bibleService = {
  /**
   * Fetch all 1,250+ live available translations from HelloAO API
   */
  async fetchAvailableTranslations(): Promise<HelloAOTranslation[]> {
    try {
      const res = await fetch('https://bible.helloao.org/api/available_translations.json')
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data.translations) && data.translations.length > 0) {
          return data.translations
        }
      }
    } catch {
      // ignore
    }
    return []
  },

  /**
   * Fetch a complete chapter with verses and headings using HelloAO simplified endpoint
   * GET https://bible.helloao.org/api/{translation}/{book}/{chapter}.simple.json
   */
  async fetchChapter(bookNameOrSlug: string, chapter: number, translationId: string): Promise<BibleChapter> {
    const usfm = getBookUsfmCode(bookNameOrSlug)
    const activeTranslation = (translationId || 'BSB').trim()

    // 1. Primary: Try HelloAO API with requested translation
    try {
      const url = `https://bible.helloao.org/api/${activeTranslation}/${usfm}/${chapter}.simple.json`
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        if (data && data.chapter && Array.isArray(data.chapter.content)) {
          const verses: BibleVerse[] = []
          let currentHeading: string | undefined = undefined
          let mainHeading: string | undefined = undefined

          for (const item of data.chapter.content) {
            if (item.type === 'heading' && item.text) {
              currentHeading = cleanText(item.text)
              if (!mainHeading) {
                mainHeading = currentHeading
              }
            } else if (item.type === 'verse' && typeof item.number === 'number' && item.text) {
              verses.push({
                verse: item.number,
                text: cleanText(item.text),
                heading: currentHeading,
              })
              currentHeading = undefined // reset heading after attaching to next verse
            }
          }

          if (verses.length > 0) {
            return {
              reference: `${bookNameOrSlug} ${chapter}`,
              translationId: activeTranslation,
              translationName: data.translation?.name ?? activeTranslation,
              heading: mainHeading,
              verses,
              audioLinks: data.thisChapterAudioLinks,
            }
          }
        }
      }
    } catch {
      // continue to fallback
    }

    // 2. Secondary: Fallback to BSB (Berean Standard Bible) on HelloAO
    if (activeTranslation !== 'BSB') {
      try {
        const bsbUrl = `https://bible.helloao.org/api/BSB/${usfm}/${chapter}.simple.json`
        const res = await fetch(bsbUrl)
        if (res.ok) {
          const data = await res.json()
          if (data && data.chapter && Array.isArray(data.chapter.content)) {
            const verses: BibleVerse[] = []
            let currentHeading: string | undefined = undefined
            let mainHeading: string | undefined = undefined

            for (const item of data.chapter.content) {
              if (item.type === 'heading' && item.text) {
                currentHeading = cleanText(item.text)
                if (!mainHeading) mainHeading = currentHeading
              } else if (item.type === 'verse' && typeof item.number === 'number' && item.text) {
                verses.push({
                  verse: item.number,
                  text: cleanText(item.text),
                  heading: currentHeading,
                })
                currentHeading = undefined
              }
            }

            if (verses.length > 0) {
              return {
                reference: `${bookNameOrSlug} ${chapter}`,
                translationId: activeTranslation,
                translationName: 'Berean Standard Bible (BSB)',
                heading: mainHeading,
                verses,
                audioLinks: data.thisChapterAudioLinks,
              }
            }
          }
        }
      } catch {
        // continue
      }
    }

    // 3. Third: Fallback to bible-api.com
    try {
      const passage = encodeURIComponent(`${bookNameOrSlug} ${chapter}`).replace(/%20/g, '+')
      const res = await fetch(`https://bible-api.com/${passage}?translation=web`)
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data.verses) && data.verses.length > 0) {
          return {
            reference: `${bookNameOrSlug} ${chapter}`,
            translationId: activeTranslation,
            translationName: activeTranslation.toUpperCase(),
            verses: data.verses.map((v: { verse: number; text: string }) => ({
              verse: v.verse,
              text: cleanText(v.text),
            })),
          }
        }
      }
    } catch {
      // ignore
    }

    throw new ChapterNotFoundError(`${bookNameOrSlug} ${chapter} was not found`)
  },

  /**
   * Fetch a daily inspiration verse
   */
  async fetchRandomVerse(_translation: string): Promise<DailyVerse> {
    const dailyPicks = [
      {
        book: 'Psalm',
        bookId: 'PSA',
        chapter: 37,
        verse: 4,
        text: 'Take delight in the LORD, and he will give you the desires of your heart.',
        reference: 'Psalm 37:4',
      },
      {
        book: 'Jeremiah',
        bookId: 'JER',
        chapter: 29,
        verse: 11,
        text: 'For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.',
        reference: 'Jeremiah 29:11',
      },
      {
        book: 'Philippians',
        bookId: 'PHP',
        chapter: 4,
        verse: 6,
        text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.',
        reference: 'Philippians 4:6',
      },
      {
        book: 'Isaiah',
        bookId: 'ISA',
        chapter: 40,
        verse: 31,
        text: 'Those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
        reference: 'Isaiah 40:31',
      },
      {
        book: 'Proverbs',
        bookId: 'PRO',
        chapter: 3,
        verse: 5,
        text: 'Trust in the LORD with all your heart and lean not on your own understanding.',
        reference: 'Proverbs 3:5',
      },
    ]

    const dayOfYear = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
    return dailyPicks[dayOfYear % dailyPicks.length]
  },
}

