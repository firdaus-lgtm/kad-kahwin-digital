// Romantic wedding harp / music-box synthesizer via Web Audio API
// + optional custom MP3/audio playback

const CHORD_PROGRESSION = [
  // Cmaj7 -> Am7 -> Fmaj7 -> G6 (gentle arpeggio frequencies in Hz)
  [261.63, 329.63, 392.0, 493.88, 523.25, 493.88, 392.0, 329.63],
  [220.0, 261.63, 329.63, 392.0, 440.0, 392.0, 329.63, 261.63],
  [174.61, 220.0, 261.63, 329.63, 349.23, 329.63, 261.63, 220.0],
  [196.0, 246.94, 293.66, 329.63, 392.0, 329.63, 293.66, 246.94],
]

class WeddingAudioEngine {
  constructor() {
    this.ctx = null
    this.timer = null
    this.isPlaying = false
    this.chordIndex = 0
    this.noteIndex = 0
    this.audioEl = null
    this.customSrc = ''
  }

  setCustomAudio(src) {
    if (this.customSrc === src) return
    const wasPlaying = this.isPlaying
    this.stop()
    this.customSrc = src || ''
    if (wasPlaying) {
      this.play()
    }
  }

  _playSynthNote(freq) {
    if (!this.ctx) return
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const overtone = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)

    overtone.type = 'triangle'
    overtone.frequency.setValueAtTime(freq * 2, now)

    const overtoneGain = this.ctx.createGain()
    overtoneGain.gain.setValueAtTime(0.08, now)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.075, now + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.45)

    osc.connect(gain)
    overtone.connect(overtoneGain)
    overtoneGain.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    overtone.start(now)
    osc.stop(now + 1.5)
    overtone.stop(now + 1.5)
  }

  play() {
    if (this.isPlaying) return

    if (this.customSrc) {
      if (!this.audioEl) {
        this.audioEl = new Audio()
        this.audioEl.loop = true
      }
      if (this.audioEl.src !== this.customSrc) {
        this.audioEl.src = this.customSrc
      }
      this.audioEl.volume = 0.55
      this.audioEl.play().catch(() => {})
      this.isPlaying = true
      return
    }

    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    if (!this.ctx) {
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }

    this.isPlaying = true
    const tick = () => {
      if (!this.isPlaying) return
      const chord = CHORD_PROGRESSION[this.chordIndex]
      const freq = chord[this.noteIndex]
      this._playSynthNote(freq)
      this.noteIndex += 1
      if (this.noteIndex >= chord.length) {
        this.noteIndex = 0
        this.chordIndex = (this.chordIndex + 1) % CHORD_PROGRESSION.length
      }
    }

    tick()
    this.timer = window.setInterval(tick, 520)
  }

  pause() {
    this.isPlaying = false
    if (this.timer) {
      window.clearInterval(this.timer)
      this.timer = null
    }
    if (this.audioEl) {
      this.audioEl.pause()
    }
  }

  stop() {
    this.pause()
    this.chordIndex = 0
    this.noteIndex = 0
    if (this.audioEl) {
      this.audioEl.currentTime = 0
    }
  }
}

export const weddingAudio = new WeddingAudioEngine()
