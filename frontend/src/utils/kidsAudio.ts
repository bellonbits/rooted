// Lightweight zero-dependency Web Audio synthesizer for Kids Mode & Interactive Storybook
// Works 100% offline in modern browsers without needing external audio files

class KidsAudioEngine {
  private ctx: AudioContext | null = null
  private enabled: boolean = true

  private getContext(): AudioContext | null {
    if (!this.enabled) return null
    if (typeof window === 'undefined') return null
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (AudioCtx) {
          this.ctx = new AudioCtx()
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      return this.ctx
    } catch {
      return null
    }
  }

  public setEnabled(val: boolean) {
    this.enabled = val
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  // Soft page turn flutter
  public pageTurn() {
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const bufferSize = ctx.sampleRate * 0.12
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3))
      }

      const noise = ctx.createBufferSource()
      noise.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(800, now)
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.12)
      filter.Q.value = 3.0

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.18, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      noise.start(now)
    } catch {
      // ignore
    }
  }

  // Sweet marimba / bell chime note
  public chime(freq: number = 523.25) {
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.6)
    } catch {
      // ignore
    }
  }

  // Multi-star magical twinkle
  public twinkle() {
    const freqs = [1046.5, 1318.5, 1567.98, 2093.0] // C6, E6, G6, C7
    freqs.forEach((f, idx) => {
      setTimeout(() => this.chime(f), idx * 70)
    })
  }

  // Water bubble / splash
  public splash() {
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(200, now)
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.15)

      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.2)
    } catch {
      // ignore
    }
  }

  // Happy bird chirp
  public chirp() {
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1800, now)
      osc.frequency.exponentialRampToValueAtTime(2800, now + 0.08)
      osc.frequency.exponentialRampToValueAtTime(2200, now + 0.15)

      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.18)
    } catch {
      // ignore
    }
  }

  // Breath of life thump & whoosh
  public breathOfLife() {
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      // Low heartbeat
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(90, now)
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.3)

      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.3)

      // Ascending harp after heartbeat
      setTimeout(() => {
        this.twinkle()
      }, 250)
    } catch {
      // ignore
    }
  }

  // Joyful celebration fanfare
  public fanfare() {
    const chords = [
      { f: 523.25, t: 0 },    // C5
      { f: 659.25, t: 100 },  // E5
      { f: 783.99, t: 200 },  // G5
      { f: 1046.5, t: 350 },  // C6
    ]

    chords.forEach(({ f, t }) => {
      setTimeout(() => this.chime(f), t)
    })
  }
}

export const kidsAudio = new KidsAudioEngine()
