/**
 * Sound Engine - Web Audio API Synthesis for Damas (Checkers)
 * Procedural audio for tactile board movement, capture impacts,
 * coronation chimes, and victory fanfares.
 * Club del Ingenio
 */

class DamasSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.loadPreference();
  }

  loadPreference() {
    const saved = localStorage.getItem('club_damas_sound') || localStorage.getItem('club_ingenio_sound');
    if (saved !== null) {
      this.enabled = saved === 'true';
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    localStorage.setItem('club_damas_sound', this.enabled ? 'true' : 'false');
    return this.enabled;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Piece placement on polished wood / marble board
   */
  playMove() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      // Soft wood thud
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220 + Math.random() * 20, t);
      osc.frequency.exponentialRampToValueAtTime(70, t + 0.05);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.06);
    } catch (e) {}
  }

  /**
   * Piece capture snap
   */
  playCapture() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      // Crisp impact click
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(380, t);
      osc.frequency.exponentialRampToValueAtTime(90, t + 0.08);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.09);
    } catch (e) {}
  }

  /**
   * Coronation (Dama / Queen) regal chime
   */
  playCoronation() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const chords = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6
      const t = this.ctx.currentTime;

      chords.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.06);

        gain.gain.setValueAtTime(0.15, t + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + 0.45);
      });
    } catch (e) {}
  }

  /**
   * Victory fanfare
   */
  playVictory() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [
        { f: 523.25, d: 0.12, w: 0 },
        { f: 659.25, d: 0.12, w: 0.12 },
        { f: 783.99, d: 0.14, w: 0.24 },
        { f: 1046.50, d: 0.5, w: 0.38 }
      ];
      const start = this.ctx.currentTime + 0.05;
      notes.forEach(n => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, start + n.w);
        gain.gain.setValueAtTime(0.2, start + n.w);
        gain.gain.exponentialRampToValueAtTime(0.001, start + n.w + n.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start + n.w);
        osc.stop(start + n.w + n.d + 0.05);
      });
    } catch (e) {}
  }
}

export const sound = new DamasSoundEngine();
