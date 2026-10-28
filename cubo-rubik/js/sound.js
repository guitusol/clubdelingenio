/**
 * Sound Engine - Web Audio API Synthesis
 * Procedural tactile and mechanical sound effects for the 3D Rubik's Cube
 * Club del Ingenio
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.loadPreference();
  }

  loadPreference() {
    const saved = localStorage.getItem('club_rubik_sound');
    if (saved !== null) {
      this.enabled = saved === 'true';
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    localStorage.setItem('club_rubik_sound', this.enabled ? 'true' : 'false');
    return this.enabled;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Mechanical plastic rotation click (satisfying tactile snap)
   */
  playTurn() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;

      // Noise burst for mechanical friction
      const bufferSize = this.ctx.sampleRate * 0.035;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter centered around 1800Hz (crisp plastic snap)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600 + Math.random() * 400, t);
      filter.Q.setValueAtTime(3.5, t);

      // Low thump tone
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140 + Math.random() * 30, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.04);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.18, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.22, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      noise.start(t);
      osc.start(t);
      osc.stop(t + 0.05);
      noise.stop(t + 0.05);
    } catch (e) {
      // Audio fallback silent fail
    }
  }

  /**
   * Fast scramble click
   */
  playScrambleTick() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400 + Math.random() * 200, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.02);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.02);
    } catch (e) {}
  }

  /**
   * Subtle button tap
   */
  playClick() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, t);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.04);
    } catch (e) {}
  }

  /**
   * Cube Solved Victory Fanfare
   */
  playVictory() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [
        { f: 523.25, d: 0.12, wait: 0.0 },   // C5
        { f: 659.25, d: 0.12, wait: 0.12 },  // E5
        { f: 783.99, d: 0.14, wait: 0.24 },  // G5
        { f: 1046.50, d: 0.45, wait: 0.38 }  // C6
      ];

      const startTime = this.ctx.currentTime + 0.05;
      notes.forEach(n => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, startTime + n.wait);
        gain.gain.setValueAtTime(0.2, startTime + n.wait);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + n.wait + n.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime + n.wait);
        osc.stop(startTime + n.wait + n.d + 0.05);
      });
    } catch (e) {}
  }
}

export const sound = new SoundEngine();
