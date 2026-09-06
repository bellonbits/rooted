// Real Browser Text-To-Speech (TTS) Service using Web Speech API
// Provides playback, verse-by-verse chapter narration, speed controls, and active verse callbacks

export type TTSState = 'idle' | 'playing' | 'paused'

export type TTSProgressCallback = (currentVerseNumber: number) => void
export type TTSEndCallback = () => void

class TTSService {
  private synth: SpeechSynthesis | null = null
  private utterance: SpeechSynthesisUtterance | null = null
  private state: TTSState = 'idle'
  private rate: number = 1.0
  private currentVerseIndex: number = 0
  private versesToSpeak: { verse: number; text: string }[] = []
  private onProgress: TTSProgressCallback | null = null
  private onEnd: TTSEndCallback | null = null

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis
    }
  }

  public isSupported(): boolean {
    return this.synth !== null
  }

  public getState(): TTSState {
    return this.state
  }

  public getRate(): number {
    return this.rate
  }

  public setRate(newRate: number) {
    this.rate = Math.max(0.5, Math.min(2.0, newRate))
    if (this.state === 'playing') {
      // Re-trigger current verse with new rate
      const current = this.currentVerseIndex
      this.stop()
      this.speakFromIndex(current)
    }
  }

  public speakVerse(verseNumber: number, text: string, onDone?: () => void) {
    if (!this.synth) return
    this.stop()

    const clean = text.replace(/\[.*?\]|\(.*?\)/g, '').trim()
    this.utterance = new SpeechSynthesisUtterance(`Verse ${verseNumber}. ${clean}`)
    this.utterance.rate = this.rate

    // Select preferred english/african voice if available
    const voices = this.synth.getVoices()
    const preferredVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Premium') || v.name.includes('Google')))
    if (preferredVoice) {
      this.utterance.voice = preferredVoice
    }

    this.utterance.onend = () => {
      this.state = 'idle'
      if (onDone) onDone()
    }

    this.utterance.onerror = () => {
      this.state = 'idle'
    }

    this.state = 'playing'
    this.synth.speak(this.utterance)
  }

  public startChapterNarration(
    verses: { verse: number; text: string }[],
    startIndex: number = 0,
    onProgress?: TTSProgressCallback,
    onEnd?: TTSEndCallback,
  ) {
    if (!this.synth || verses.length === 0) return
    this.stop()

    this.versesToSpeak = verses
    this.currentVerseIndex = Math.max(0, Math.min(startIndex, verses.length - 1))
    this.onProgress = onProgress ?? null
    this.onEnd = onEnd ?? null

    this.speakFromIndex(this.currentVerseIndex)
  }

  private speakFromIndex(index: number) {
    if (!this.synth || index >= this.versesToSpeak.length) {
      this.state = 'idle'
      if (this.onEnd) this.onEnd()
      return
    }

    this.currentVerseIndex = index
    const v = this.versesToSpeak[index]

    if (this.onProgress) {
      this.onProgress(v.verse)
    }

    const clean = v.text.replace(/\[.*?\]|\(.*?\)/g, '').trim()
    const phrase = index === 0 ? `Verse ${v.verse}. ${clean}` : `${v.verse}. ${clean}`

    this.utterance = new SpeechSynthesisUtterance(phrase)
    this.utterance.rate = this.rate

    const voices = this.synth.getVoices()
    const preferredVoice = voices.find((voice) => voice.lang.startsWith('en') && (voice.name.includes('Natural') || voice.name.includes('Google')))
    if (preferredVoice) {
      this.utterance.voice = preferredVoice
    }

    this.utterance.onend = () => {
      if (this.state === 'playing') {
        this.speakFromIndex(index + 1)
      }
    }

    this.utterance.onerror = () => {
      this.state = 'idle'
    }

    this.state = 'playing'
    this.synth.speak(this.utterance)
  }

  public pause() {
    if (!this.synth) return
    if (this.state === 'playing') {
      this.synth.pause()
      this.state = 'paused'
    }
  }

  public resume() {
    if (!this.synth) return
    if (this.state === 'paused') {
      this.synth.resume()
      this.state = 'playing'
    } else if (this.state === 'idle' && this.versesToSpeak.length > 0) {
      this.speakFromIndex(this.currentVerseIndex)
    }
  }

  public stop() {
    if (!this.synth) return
    this.synth.cancel()
    this.state = 'idle'
    this.utterance = null
  }
}

export const ttsService = new TTSService()
