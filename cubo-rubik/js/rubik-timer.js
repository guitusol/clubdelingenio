/**
 * Speedcubing & WCA Official Timer Engine
 * Inspection countdown, precision millisecond stopwatch,
 * Turns-Per-Second (TPS), Personal Best (PB), and Ao5 calculation.
 */

export class RubikTimer {
  constructor(onStateChange, onTick) {
    this.onStateChange = onStateChange;
    this.onTick = onTick;

    this.state = 'IDLE'; // 'IDLE', 'INSPECTION', 'HOLDING', 'READY', 'RUNNING', 'STOPPED'
    this.startTime = 0;
    this.elapsedTime = 0;
    this.rafId = null;

    // Inspection
    this.inspectionDuration = 15;
    this.inspectionRemaining = 15;
    this.inspectionInterval = null;

    // Hold detection
    this.holdTimeout = null;
    this.holdDuration = 350; // ms to reach READY state

    // History and statistics
    this.history = this.loadHistory();
  }

  loadHistory() {
    try {
      const data = localStorage.getItem('club_rubik_timer_history');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem('club_rubik_timer_history', JSON.stringify(this.history));
    } catch (e) {}
  }

  formatTime(ms) {
    if (ms <= 0 || isNaN(ms)) return '00:00.000';
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const millis = Math.floor(ms % 1000);

    const mStr = String(m).padStart(2, '0');
    const sStr = String(s).padStart(2, '0');
    const milStr = String(millis).padStart(3, '0');

    return `${mStr}:${sStr}.${milStr}`;
  }

  startHold() {
    if (this.state === 'RUNNING') {
      this.stop();
      return;
    }
    if (this.state !== 'IDLE' && this.state !== 'STOPPED' && this.state !== 'INSPECTION') return;

    this.state = 'HOLDING';
    this.notifyState();

    this.holdTimeout = setTimeout(() => {
      if (this.state === 'HOLDING') {
        this.state = 'READY';
        this.notifyState();
      }
    }, this.holdDuration);
  }

  releaseHold() {
    if (this.holdTimeout) {
      clearTimeout(this.holdTimeout);
      this.holdTimeout = null;
    }

    if (this.state === 'READY') {
      this.startSolve();
    } else if (this.state === 'HOLDING') {
      this.state = 'IDLE';
      this.notifyState();
    }
  }

  startSolve() {
    this.stopInspection();
    this.state = 'RUNNING';
    this.startTime = performance.now();
    this.elapsedTime = 0;
    this.notifyState();

    const loop = () => {
      if (this.state === 'RUNNING') {
        this.elapsedTime = performance.now() - this.startTime;
        if (this.onTick) this.onTick(this.elapsedTime);
        this.rafId = requestAnimationFrame(loop);
      }
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop(moveCount = 0) {
    if (this.state !== 'RUNNING') return;

    cancelAnimationFrame(this.rafId);
    this.elapsedTime = performance.now() - this.startTime;
    this.state = 'STOPPED';

    // Record solve stats
    const record = {
      date: new Date().toISOString(),
      timeMs: this.elapsedTime,
      moves: moveCount,
      tps: moveCount > 0 ? (moveCount / (this.elapsedTime / 1000)).toFixed(2) : 0
    };

    this.history.unshift(record);
    if (this.history.length > 50) this.history.pop();
    this.saveHistory();

    this.notifyState();
    return record;
  }

  reset() {
    cancelAnimationFrame(this.rafId);
    this.stopInspection();
    this.state = 'IDLE';
    this.elapsedTime = 0;
    this.notifyState();
    if (this.onTick) this.onTick(0);
  }

  getBestTime() {
    if (this.history.length === 0) return null;
    return Math.min(...this.history.map(h => h.timeMs));
  }

  getAverageOf5() {
    if (this.history.length < 5) return null;
    const last5 = this.history.slice(0, 5).map(h => h.timeMs);
    // Sort to remove best and worst (Olympic average)
    last5.sort((a, b) => a - b);
    const middle3 = last5.slice(1, 4);
    const sum = middle3.reduce((acc, v) => acc + v, 0);
    return sum / 3;
  }

  stopInspection() {
    if (this.inspectionInterval) {
      clearInterval(this.inspectionInterval);
      this.inspectionInterval = null;
    }
  }

  notifyState() {
    if (this.onStateChange) {
      this.onStateChange(this.state, this.elapsedTime);
    }
  }
}
