/**
 * Main Application Controller - Cubo de Rubik 3D
 * Integrates 3D Graphics, Logical Model, Tutor, WCA Timer, Sound & i18n
 * Club del Ingenio
 */

import { i18n } from './i18n.js';
import { sound } from './sound.js';
import { RubikModel } from './rubik-model.js';
import { RubikRenderer } from './rubik-renderer.js';
import { RubikSolver, PATTERNS } from './rubik-solver.js';
import { RubikTimer } from './rubik-timer.js';

class RubikApp {
  constructor() {
    this.currentMode = 'free'; // 'free', 'timer', 'tutor', 'patterns'
    this.isScrambling = false;
    this.isSolving = false;

    // Core instances
    this.model = new RubikModel();
    this.solver = new RubikSolver(this.model);
    
    // UI elements cache
    this.canvasContainer = document.getElementById('rubik-canvas-container');
    this.moveCountDisplay = document.getElementById('stat-moves-val');
    this.tpsDisplay = document.getElementById('stat-tps-val');
    this.timerDisplay = document.getElementById('timer-time');
    this.timerStatus = document.getElementById('timer-status');
    this.scrambleDisplay = document.getElementById('scramble-text');

    // Setup 3D Renderer with move callback
    this.renderer = new RubikRenderer(this.canvasContainer, (move) => {
      this.onMoveFinished(move);
    });

    // Setup Timer
    this.timer = new RubikTimer(
      (state, timeMs) => this.onTimerStateChange(state, timeMs),
      (timeMs) => this.onTimerTick(timeMs)
    );

    this.init();
  }

  init() {
    // 1. Apply initial translations
    i18n.applyTranslations();

    // 2. Setup DOM event listeners
    this.bindDOMEvents();

    // 3. Render patterns list
    this.renderPatternsGrid();

    // 4. Update stats display
    this.updateStats();

    // 5. Update tutor panel
    this.updateTutorPanel();
  }

  bindDOMEvents() {
    // Mode switcher buttons
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const mode = e.currentTarget.getAttribute('data-mode');
        this.switchMode(mode);
      });
    });

    // Top Header Buttons
    document.getElementById('btn-sound').addEventListener('click', () => {
      const enabled = sound.toggleSound();
      document.getElementById('sound-icon').textContent = enabled ? '🔊' : '🔇';
    });

    document.getElementById('btn-lang').addEventListener('click', () => {
      this.openModal('modal-lang');
    });

    document.getElementById('btn-help').addEventListener('click', () => {
      this.openModal('modal-help');
    });

    // Language modal options
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang');
        i18n.setLanguage(lang);
        this.closeModals();
        this.renderPatternsGrid();
        this.updateTutorPanel();
        this.onTimerStateChange(this.timer.state, this.timer.elapsedTime);
        this.updateStats();
      });
    });

    // Action buttons
    document.getElementById('btn-scramble').addEventListener('click', () => this.scrambleCube());
    document.getElementById('btn-solve').addEventListener('click', () => this.solveCubeAuto());
    document.getElementById('btn-reset').addEventListener('click', () => this.resetCube());
    document.getElementById('btn-undo').addEventListener('click', () => this.undoMove());

    // WCA Face buttons
    document.querySelectorAll('.face-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const move = e.currentTarget.getAttribute('data-move');
        this.renderer.queueMove(move);
      });
    });

    // Tutor Step button
    const btnAutoStep = document.getElementById('btn-tutor-step');
    if (btnAutoStep) {
      btnAutoStep.addEventListener('click', () => this.executeTutorStep());
    }

    // Modal close buttons
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => this.closeModals());
    });

    // Close modal on background click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModals();
      });
    });

    // Keyboard controls
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('keyup', (e) => this.onKeyUp(e));

    // Touch/Mouse timer trigger for Speedcubing mode
    const timerArea = document.getElementById('timer-touch-area');
    const timerTrigger = document.getElementById('timer-touch-trigger');
    const handleStart = (e) => {
      if (this.currentMode !== 'timer') return;
      if (e.target.closest('.interactive-btn') && !e.target.closest('#timer-touch-trigger')) return;
      e.preventDefault();
      this.timer.startHold();
    };
    const handleEnd = (e) => {
      if (this.currentMode !== 'timer') return;
      this.timer.releaseHold();
    };

    if (timerArea) timerArea.addEventListener('pointerdown', handleStart);
    if (timerTrigger) timerTrigger.addEventListener('pointerdown', handleStart);
    window.addEventListener('pointerup', handleEnd);
  }

  onKeyDown(e) {
    // If typing in input, ignore
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Spacebar for Timer
    if (e.code === 'Space') {
      e.preventDefault();
      if (this.currentMode === 'timer') {
        if (!e.repeat) {
          this.timer.startHold();
        }
      }
      return;
    }

    // Undo (Ctrl+Z)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      this.undoMove();
      return;
    }

    // WCA Notation keys: U, D, L, R, F, B
    const key = e.key.toUpperCase();
    if (['U', 'D', 'L', 'R', 'F', 'B'].includes(key)) {
      const isShift = e.shiftKey;
      const move = isShift ? `${key}'` : key;
      this.renderer.queueMove(move);
    }
  }

  onKeyUp(e) {
    if (e.code === 'Space' && this.currentMode === 'timer') {
      this.timer.releaseHold();
    }
  }

  switchMode(mode) {
    this.currentMode = mode;
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-mode') === mode);
    });

    document.querySelectorAll('.mode-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `panel-${mode}`);
    });

    if (mode === 'tutor') {
      this.updateTutorPanel();
    }
  }

  onMoveFinished(move) {
    this.model.applyMove(move);
    this.moveCountDisplay.textContent = this.model.moveCount;

    // If timer is running, update stats
    if (this.timer.state === 'RUNNING') {
      const elapsedSec = (performance.now() - this.timer.startTime) / 1000;
      if (elapsedSec > 0) {
        this.tpsDisplay.textContent = (this.model.moveCount / elapsedSec).toFixed(1);
      }
    }

    // Update tutor panel if active
    if (this.currentMode === 'tutor') {
      this.updateTutorPanel();
    }

    // Check victory
    if (!this.isScrambling && this.model.isSolved()) {
      this.handleVictory();
    }
  }

  scrambleCube() {
    if (this.renderer.isAnimating || this.isScrambling) return;

    this.isScrambling = true;
    const scramble = RubikModel.generateScramble(21);
    
    // Display scramble string
    if (this.scrambleDisplay) {
      this.scrambleDisplay.textContent = scramble.join(' ');
    }

    // Fast animation
    this.renderer.queueMoves(scramble, 75);

    // Re-enable after sequence finishes
    const checkDone = setInterval(() => {
      if (!this.renderer.isAnimating && this.renderer.moveQueue.length === 0) {
        clearInterval(checkDone);
        this.isScrambling = false;
        this.model.moveCount = 0;
        this.moveCountDisplay.textContent = '0';
        this.showToast(i18n.t('scrambled_msg'));
      }
    }, 100);
  }

  solveCubeAuto() {
    if (this.renderer.isAnimating || this.isSolving) return;
    if (this.model.isSolved()) return;

    const reverseSolution = this.solver.getReverseHistorySolution();
    if (reverseSolution.length === 0) return;

    this.isSolving = true;
    this.renderer.queueMoves(reverseSolution, 110);

    const checkDone = setInterval(() => {
      if (!this.renderer.isAnimating && this.renderer.moveQueue.length === 0) {
        clearInterval(checkDone);
        this.isSolving = false;
      }
    }, 100);
  }

  resetCube() {
    this.renderer.resetVisual();
    this.model.reset();
    this.timer.reset();
    this.moveCountDisplay.textContent = '0';
    this.tpsDisplay.textContent = '0.0';
    if (this.scrambleDisplay) this.scrambleDisplay.textContent = '—';
    this.updateTutorPanel();
  }

  undoMove() {
    if (this.renderer.isAnimating || this.model.history.length === 0) return;
    const lastMove = this.model.history.pop();
    const inverted = RubikModel.invertMove(lastMove);
    this.renderer.queueMove(inverted);
  }

  updateTutorPanel() {
    const stage = this.solver.evaluateCurrentStage();
    const titleEl = document.getElementById('tutor-step-title');
    const descEl = document.getElementById('tutor-step-desc');
    const badgeEl = document.getElementById('tutor-step-badge');
    const algoEl = document.getElementById('tutor-step-algo');

    if (titleEl) titleEl.textContent = i18n.t(stage.titleKey);
    if (descEl) descEl.textContent = i18n.t(stage.descKey);
    if (badgeEl) badgeEl.textContent = stage.badge || '✓';
    if (algoEl) algoEl.textContent = stage.sampleAlgo || '—';
  }

  executeTutorStep() {
    const stage = this.solver.evaluateCurrentStage();
    if (stage.isSolved) return;

    // Convert sampleAlgo string to WCA array
    let rawAlgo = stage.sampleAlgo.replace(/[()]/g, '').trim();
    // Clean comments or multipliers like "× 2"
    if (rawAlgo.includes('×')) {
      rawAlgo = "R' D' R D R' D' R D";
    }
    const moves = rawAlgo.split(/\s+/).filter(m => m.length > 0);
    if (moves.length > 0) {
      this.renderer.queueMoves(moves, 180);
    }
  }

  renderPatternsGrid() {
    const grid = document.getElementById('patterns-grid');
    if (!grid) return;

    grid.innerHTML = '';
    PATTERNS.forEach(pat => {
      const card = document.createElement('div');
      card.className = 'pattern-card';
      card.innerHTML = `
        <div class="pattern-icon">${pat.icon}</div>
        <div class="pattern-info">
          <h4 data-i18n="${pat.nameKey}">${i18n.t(pat.nameKey)}</h4>
          <span class="pattern-seq">${pat.moves.join(' ')}</span>
        </div>
        <button class="btn-action-small">▶</button>
      `;
      card.addEventListener('click', () => {
        this.renderer.resetVisual();
        this.model.reset();
        this.renderer.queueMoves(pat.moves, 140);
        sound.playClick();
      });
      grid.appendChild(card);
    });
  }

  // =========================================================================
  // Speedcubing WCA Timer Callbacks
  // =========================================================================

  onTimerStateChange(state, timeMs) {
    const el = this.timerDisplay;
    const statusEl = this.timerStatus;
    if (!el || !statusEl) return;

    el.className = 'timer-time-val';

    if (state === 'IDLE') {
      statusEl.textContent = i18n.t('timer_ready');
    } else if (state === 'HOLDING') {
      el.classList.add('holding');
      statusEl.textContent = i18n.t('timer_holding');
      sound.playClick();
    } else if (state === 'READY') {
      el.classList.add('ready');
      statusEl.textContent = i18n.t('timer_holding');
    } else if (state === 'RUNNING') {
      el.classList.add('running');
      statusEl.textContent = i18n.t('timer_running');
    } else if (state === 'STOPPED') {
      statusEl.textContent = i18n.t('timer_ready');
      this.updateStats();
    }
  }

  onTimerTick(timeMs) {
    if (this.timerDisplay) {
      this.timerDisplay.textContent = this.timer.formatTime(timeMs);
    }
  }

  updateStats() {
    const bestMs = this.timer.getBestTime();
    const ao5Ms = this.timer.getAverageOf5();

    const bestEl = document.getElementById('stat-best-val');
    const ao5El = document.getElementById('stat-ao5-val');

    if (bestEl) bestEl.textContent = bestMs ? this.timer.formatTime(bestMs) : '--:--.---';
    if (ao5El) ao5El.textContent = ao5Ms ? this.timer.formatTime(ao5Ms) : '--:--.---';
  }

  handleVictory() {
    sound.playVictory();
    if (this.timer.state === 'RUNNING') {
      this.timer.stop(this.model.moveCount);
    }
    this.showToast(i18n.t('solved_victory'));
  }

  showToast(msg) {
    const toast = document.getElementById('rubik-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3800);
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  }

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  }
}

// Start application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.rubikApp = new RubikApp();
});
