/**
 * CÁLCULO TÁCTICO RELÁMPAGO — Controlador Principal de la Aplicación
 * Con soporte completo de Internacionalización (9 Idiomas Oficiales).
 */

class CalculoTacticoApp {
  constructor() {
    this.difficulty = 'medio';
    this.currentChallenge = null;
    this.currentSeed = null;

    // Estado de la mesa de juego
    this.initialTiles = [];
    this.activeTiles = []; // Array de { id, value }
    this.historySteps = []; // Pasos realizados: { a, op, b, res, prevTiles }

    // Selección interactiva actual
    this.selectedTileA = null; // objeto { id, value }
    this.selectedOp = null;    // '+', '−', '×', '÷'
    this.selectedTileB = null;

    // Cronómetro
    this.timerSeconds = 0;
    this.timerTotal = 60;
    this.timerInterval = null;
    this.isGameOver = false;

    // Historial y almacenamiento
    this.historyKey = 'calc_tactico_history_v1';

    this.init();
  }

  t(key, params = {}) {
    return (typeof window !== 'undefined' && window.i18n) ? window.i18n.t(key, params) : key;
  }

  init() {
    if (window.i18n) {
      window.i18n.applyTranslations();
    }
    this.bindEvents();
    this.checkUrlParams();
    if (!this.currentChallenge) {
      this.startNewGame(this.difficulty);
    }
    this.updateSoundIcon();
  }

  onLanguageChanged(lang) {
    if (window.i18n) {
      window.i18n.setLanguage(lang);
    }
    this.updateHeaderUI();
    this.updateFormulaPreview();
    this.renderHistoryList();
    this.updateCurrentBest();
    this.showToast(this.t('modal_lang_title'), 'info');
  }

  checkUrlParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      const duelCode = params.get('duelo') || params.get('duel') || params.get('challenge');
      if (duelCode && window.ChallengeGenerator) {
        const parsed = window.ChallengeGenerator.parseDuelCode(duelCode);
        if (parsed) {
          this.difficulty = parsed.difficulty;
          this.startNewGame(parsed.difficulty, parsed.seed);
          this.showToast(this.t('toast_duel_loaded', { code: parsed.code }), 'info');
          return;
        }
      }
    } catch (e) {
      console.warn('Error leyendo parámetros de URL:', e);
    }
  }

  startNewGame(difficulty = this.difficulty, seed = null) {
    this.stopTimer();
    this.difficulty = difficulty;
    this.isGameOver = false;

    // Generar nuevo reto
    this.currentChallenge = window.ChallengeGenerator.generate(difficulty, seed);
    this.currentSeed = this.currentChallenge.seed;

    // Preparar fichas iniciales con IDs únicos
    this.initialTiles = [...this.currentChallenge.numbers];
    this.activeTiles = this.initialTiles.map((val, idx) => ({ id: `t_${Date.now()}_${idx}`, value: val }));
    this.historySteps = [];
    this.selectedTileA = null;
    this.selectedOp = null;
    this.selectedTileB = null;

    // Configurar tiempo
    this.timerTotal = this.currentChallenge.timeLimit;
    this.timerSeconds = this.timerTotal;

    // Renderizar UI
    this.updateHeaderUI();
    this.renderTarget();
    this.renderTiles();
    this.renderOperators();
    this.renderHistoryList();
    this.updateCurrentBest();
    this.closeAllModals();

    // Arrancar cronómetro
    this.startTimer();
  }

  startTimer() {
    this.stopTimer();
    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      this.updateTimerDisplay();

      if (this.timerSeconds <= 10 && this.timerSeconds > 0) {
        if (window.soundFx) window.soundFx.playTick(true);
      } else if (this.timerSeconds > 10 && this.timerSeconds % 5 === 0) {
        if (window.soundFx) window.soundFx.playTick(false);
      }

      if (this.timerSeconds <= 0) {
        this.onTimeExpired();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    const timerEl = document.getElementById('timer-val');
    const ringEl = document.getElementById('timer-progress-bar');
    if (!timerEl) return;

    const secs = Math.max(0, this.timerSeconds);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    if (ringEl) {
      const pct = (secs / this.timerTotal) * 100;
      ringEl.style.width = `${pct}%`;
      if (pct <= 20) ringEl.style.backgroundColor = '#ef4444';
      else if (pct <= 45) ringEl.style.backgroundColor = '#f59e0b';
      else ringEl.style.backgroundColor = '#38bdf8';
    }

    if (secs <= 10) {
      timerEl.classList.add('urgent');
    } else {
      timerEl.classList.remove('urgent');
    }
  }

  updateHeaderUI() {
    // Selector de dificultad
    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.diff === this.difficulty);
    });

    const seedBadge = document.getElementById('seed-code-badge');
    if (seedBadge && window.ChallengeGenerator) {
      seedBadge.textContent = window.ChallengeGenerator.generateDuelCode(this.difficulty, this.currentSeed);
    }
  }

  renderTarget() {
    const targetEl = document.getElementById('target-number');
    if (targetEl && this.currentChallenge) {
      targetEl.textContent = this.currentChallenge.target;
    }
  }

  renderTiles() {
    const container = document.getElementById('tiles-container');
    if (!container) return;

    container.innerHTML = '';
    this.activeTiles.forEach(tile => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'number-tile';
      btn.textContent = tile.value;
      btn.dataset.id = tile.id;

      if (this.selectedTileA && this.selectedTileA.id === tile.id) {
        btn.classList.add('selected-a');
      } else if (this.selectedTileB && this.selectedTileB.id === tile.id) {
        btn.classList.add('selected-b');
      }

      btn.addEventListener('click', () => this.handleTileClick(tile));
      container.appendChild(btn);
    });
  }

  renderOperators() {
    const ops = ['+', '−', '×', '÷'];
    const container = document.getElementById('operators-container');
    if (!container) return;

    container.innerHTML = '';
    ops.forEach(op => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'operator-btn';
      btn.textContent = op;
      btn.dataset.op = op;

      if (this.selectedOp === op) {
        btn.classList.add('selected');
      }

      btn.addEventListener('click', () => this.handleOperatorClick(op));
      container.appendChild(btn);
    });
  }

  handleTileClick(tile) {
    if (this.isGameOver) return;
    if (window.soundFx) window.soundFx.playSelectTile();

    // Caso 1: Aún no hay Ficha A seleccionada
    if (!this.selectedTileA) {
      this.selectedTileA = tile;
      this.renderTiles();
      this.updateFormulaPreview();
      return;
    }

    // Caso 2: Clic en la misma Ficha A -> Deseleccionar
    if (this.selectedTileA.id === tile.id && !this.selectedOp) {
      this.selectedTileA = null;
      this.renderTiles();
      this.updateFormulaPreview();
      return;
    }

    // Caso 3: Ya hay Ficha A, pero NO hay operador todavía -> Cambiar Ficha A
    if (this.selectedTileA && !this.selectedOp) {
      this.selectedTileA = tile;
      this.renderTiles();
      this.updateFormulaPreview();
      return;
    }

    // Caso 4: Ya hay Ficha A y Operador -> Intentar ejecutar operación con Ficha B
    if (this.selectedTileA && this.selectedOp) {
      if (this.selectedTileA.id === tile.id) {
        this.showToast(this.t('toast_select_diff_tile'), 'warning');
        return;
      }

      this.selectedTileB = tile;
      this.executeOperation(this.selectedTileA, this.selectedOp, this.selectedTileB);
    }
  }

  handleOperatorClick(op) {
    if (this.isGameOver) return;
    if (!this.selectedTileA) {
      this.showToast(this.t('toast_select_first'), 'info');
      return;
    }
    if (window.soundFx) window.soundFx.playSelectOp();
    this.selectedOp = op;
    this.renderOperators();
    this.updateFormulaPreview();
  }

  executeOperation(tileA, op, tileB) {
    const a = tileA.value;
    const b = tileB.value;
    let res = null;
    let valid = true;
    let errorMsg = '';

    if (op === '+') {
      res = a + b;
    } else if (op === '−') {
      if (a === b) {
        valid = false;
        errorMsg = this.t('err_zero');
      } else if (a < b) {
        valid = false;
        errorMsg = this.t('err_negative', { a, b });
      } else {
        res = a - b;
      }
    } else if (op === '×') {
      if (a === 1 || b === 1) {
        valid = false;
        errorMsg = this.t('err_mult_one');
      } else {
        res = a * b;
      }
    } else if (op === '÷') {
      if (b === 1) {
        valid = false;
        errorMsg = this.t('err_div_one');
      } else if (a % b !== 0) {
        valid = false;
        errorMsg = this.t('err_remainder', { a, b });
      } else {
        res = a / b;
      }
    }

    if (!valid) {
      if (window.soundFx) window.soundFx.playError();
      this.showToast(errorMsg, 'error');
      this.selectedTileB = null;
      return;
    }

    // Operación válida
    if (window.soundFx) window.soundFx.playOperationSuccess();

    // Guardar estado previo para poder hacer Deshacer (Undo)
    const prevTiles = [...this.activeTiles];
    const stepText = `${a} ${op} ${b} = ${res}`;
    this.historySteps.push({
      a, op, b, res,
      text: stepText,
      prevTiles
    });

    // Reemplazar fichas A y B por la nueva ficha resultante
    const remaining = this.activeTiles.filter(t => t.id !== tileA.id && t.id !== tileB.id);
    const newTile = { id: `t_res_${Date.now()}`, value: res };
    this.activeTiles = [newTile, ...remaining];

    // Resetear selecciones
    this.selectedTileA = null;
    this.selectedOp = null;
    this.selectedTileB = null;

    // Actualizar vista
    this.renderTiles();
    this.renderOperators();
    this.renderHistoryList();
    this.updateFormulaPreview();
    this.updateCurrentBest();

    // Comprobar si se alcanzó la diana exacta
    if (res === this.currentChallenge.target) {
      this.onExactTargetReached(res);
    }
  }

  updateFormulaPreview() {
    const previewEl = document.getElementById('formula-preview');
    if (!previewEl) return;

    if (!this.selectedTileA) {
      previewEl.textContent = this.t('formula_empty');
      previewEl.className = 'formula-box empty';
      return;
    }

    let text = `${this.selectedTileA.value}`;
    if (this.selectedOp) text += ` ${this.selectedOp}`;
    if (this.selectedTileB) text += ` ${this.selectedTileB.value}`;

    previewEl.textContent = text;
    previewEl.className = 'formula-box active';
  }

  renderHistoryList() {
    const listEl = document.getElementById('history-steps-list');
    const undoBtn = document.getElementById('btn-undo-step');
    const resetBtn = document.getElementById('btn-reset-board');
    if (!listEl) return;

    listEl.innerHTML = '';
    if (this.historySteps.length === 0) {
      listEl.innerHTML = `<div class="empty-steps">${this.t('history_empty')}</div>`;
      if (undoBtn) undoBtn.disabled = true;
      if (resetBtn) resetBtn.disabled = true;
      return;
    }

    if (undoBtn) undoBtn.disabled = false;
    if (resetBtn) resetBtn.disabled = false;

    this.historySteps.forEach((step, idx) => {
      const item = document.createElement('div');
      item.className = 'step-item';
      item.innerHTML = `
        <span class="step-num">${this.t('step_prefix')}${idx + 1}:</span>
        <strong class="step-text">${step.text}</strong>
      `;
      listEl.appendChild(item);
    });
    listEl.scrollTop = listEl.scrollHeight;
  }

  undoLastStep() {
    if (this.isGameOver || this.historySteps.length === 0) return;
    if (window.soundFx) window.soundFx.playClick();

    const lastStep = this.historySteps.pop();
    this.activeTiles = [...lastStep.prevTiles];
    this.selectedTileA = null;
    this.selectedOp = null;
    this.selectedTileB = null;

    this.renderTiles();
    this.renderOperators();
    this.renderHistoryList();
    this.updateFormulaPreview();
    this.updateCurrentBest();
  }

  resetBoard() {
    if (this.isGameOver || this.historySteps.length === 0) return;
    if (window.soundFx) window.soundFx.playClick();

    this.activeTiles = this.initialTiles.map((val, idx) => ({ id: `t_${Date.now()}_${idx}`, value: val }));
    this.historySteps = [];
    this.selectedTileA = null;
    this.selectedOp = null;
    this.selectedTileB = null;

    this.renderTiles();
    this.renderOperators();
    this.renderHistoryList();
    this.updateFormulaPreview();
    this.updateCurrentBest();
    this.showToast(this.t('toast_reset'), 'info');
  }

  updateCurrentBest() {
    const target = this.currentChallenge.target;
    let closestVal = this.activeTiles[0]?.value || 0;
    let minDiff = Math.abs(target - closestVal);

    this.activeTiles.forEach(tile => {
      const diff = Math.abs(target - tile.value);
      if (diff < minDiff) {
        minDiff = diff;
        closestVal = tile.value;
      }
    });

    const currentBestEl = document.getElementById('current-best-val');
    const diffBadge = document.getElementById('current-diff-badge');

    if (currentBestEl) currentBestEl.textContent = closestVal;
    if (diffBadge) {
      if (minDiff === 0) {
        diffBadge.textContent = this.t('diff_exact');
        diffBadge.className = 'diff-badge exact';
      } else {
        diffBadge.textContent = `${this.t('diff_prefix')}${minDiff > 0 ? '+' : ''}${closestVal - target}`;
        diffBadge.className = 'diff-badge';
      }
    }
  }

  onExactTargetReached(achieved) {
    this.stopTimer();
    this.isGameOver = true;
    if (window.soundFx) window.soundFx.playExactVictory();
    this.finishGame(achieved);
  }

  onTimeExpired() {
    this.stopTimer();
    this.isGameOver = true;
    if (window.soundFx) window.soundFx.playTimeUp();

    // Obtener el valor más cercano de la mesa
    const target = this.currentChallenge.target;
    let closestVal = this.activeTiles[0]?.value || 0;
    let minDiff = Math.abs(target - closestVal);
    this.activeTiles.forEach(t => {
      const diff = Math.abs(target - t.value);
      if (diff < minDiff) {
        minDiff = diff;
        closestVal = t.value;
      }
    });

    this.showToast(this.t('toast_time_up'), 'warning');
    this.finishGame(closestVal);
  }

  claimVictory() {
    if (this.isGameOver) return;
    this.stopTimer();
    this.isGameOver = true;

    // Buscar valor más cercano
    const target = this.currentChallenge.target;
    let closestVal = this.activeTiles[0]?.value || 0;
    let minDiff = Math.abs(target - closestVal);
    this.activeTiles.forEach(t => {
      const diff = Math.abs(target - t.value);
      if (diff < minDiff) {
        minDiff = diff;
        closestVal = t.value;
      }
    });

    if (window.soundFx) {
      if (minDiff === 0) window.soundFx.playExactVictory();
      else window.soundFx.playOperationSuccess();
    }
    this.finishGame(closestVal);
  }

  finishGame(achieved) {
    const timeSpent = this.timerTotal - Math.max(0, this.timerSeconds);
    const evaluation = window.ScoringEngine.evaluate({
      target: this.currentChallenge.target,
      achieved,
      timeSpent,
      timeLimit: this.timerTotal,
      stepsCount: this.historySteps.length,
      difficulty: this.difficulty,
      optimalSolution: this.currentChallenge.solution
    });

    // Guardar en historial local
    this.saveGameToHistory(evaluation);

    // Mostrar modal de resultado
    this.showGameOverModal(evaluation);
  }

  saveGameToHistory(record) {
    try {
      const history = JSON.parse(localStorage.getItem(this.historyKey) || '[]');
      history.unshift({
        id: `rec_${Date.now()}`,
        ...record,
        seed: this.currentSeed
      });
      if (history.length > 50) history.pop();
      localStorage.setItem(this.historyKey, JSON.stringify(history));
    } catch (e) {
      console.warn('Error guardando en historial:', e);
    }
  }

  showGameOverModal(evalResult) {
    const modal = document.getElementById('modal-gameover');
    if (!modal) return;

    // Traducir nombre de rango si existe clave
    let rankName = evalResult.rank;
    if (evalResult.isExact && evalResult.timeSpent <= 25) rankName = this.t('rank_grandmaster');
    else if (evalResult.isExact && evalResult.timeSpent <= 45) rankName = this.t('rank_surgical');
    else if (evalResult.isExact) rankName = this.t('rank_strategist');
    else if (evalResult.diff <= 2) rankName = this.t('rank_elite');
    else if (evalResult.diff <= 5) rankName = this.t('rank_resilient');
    else rankName = this.t('rank_aspirant');

    // Rellenar datos
    document.getElementById('gov-rank-badge').textContent = `${evalResult.rankIcon} ${rankName}`;
    document.getElementById('gov-rank-badge').style.borderColor = evalResult.rankColor;
    document.getElementById('gov-rank-badge').style.color = evalResult.rankColor;

    document.getElementById('gov-target-num').textContent = evalResult.target;
    document.getElementById('gov-achieved-num').textContent = evalResult.achieved;
    document.getElementById('gov-diff-num').textContent = evalResult.isExact ? this.t('status_exact') : `${this.t('diff_prefix')}${evalResult.diff}`;

    document.getElementById('gov-base-score').textContent = `${evalResult.baseScore} pts`;
    document.getElementById('gov-speed-bonus').textContent = `+${evalResult.speedBonus} pts`;
    document.getElementById('gov-elegance-bonus').textContent = `+${evalResult.eleganceBonus} pts`;
    document.getElementById('gov-total-score').textContent = `${evalResult.totalScore} pts`;

    document.getElementById('gov-time-spent').textContent = `${evalResult.timeSpent}s / ${evalResult.timeLimit}s`;
    document.getElementById('gov-steps-count').textContent = `${evalResult.stepsCount}`;

    this.openModal('modal-gameover');
  }

  showOptimalSolution() {
    const modal = document.getElementById('modal-optimal-solution');
    const container = document.getElementById('optimal-steps-container');
    if (!modal || !container || !this.currentChallenge) return;

    const sol = this.currentChallenge.solution;
    container.innerHTML = '';

    if (!sol || !sol.steps || sol.steps.length === 0) {
      container.innerHTML = '<p class="text-muted">No se encontró una combinación directa.</p>';
    } else {
      const headerNote = document.createElement('div');
      headerNote.className = 'optimal-header-note';
      headerNote.innerHTML = sol.exact 
        ? this.t('optimal_exact_note', { steps: sol.steps.length })
        : this.t('optimal_approx_note', { val: sol.bestValue, diff: sol.bestDiff });
      container.appendChild(headerNote);

      sol.steps.forEach((step, idx) => {
        const item = document.createElement('div');
        item.className = 'optimal-step-item';
        item.innerHTML = `
          <span class="step-num font-mono">${this.t('step_prefix')}${idx + 1}:</span>
          <strong class="font-mono text-cyan">${step.text}</strong>
        `;
        container.appendChild(item);
      });
    }

    this.openModal('modal-optimal-solution');
  }

  shareDuelChallenge() {
    if (!window.ChallengeGenerator || !this.currentChallenge) return;
    const code = window.ChallengeGenerator.generateDuelCode(this.difficulty, this.currentSeed);
    const origin = window.location.origin + window.location.pathname;
    const url = `${origin}?duelo=${code}`;

    const text = this.t('duel_share_text', {
      target: this.currentChallenge.target,
      tiles: this.initialTiles.join(', '),
      time: this.timerTotal,
      url: url
    });

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(this.t('toast_copied'), 'success');
      });
    } else {
      prompt('Copia este enlace / Copy this link:', url);
    }
  }

  openHistoryModal() {
    const modal = document.getElementById('modal-history');
    const container = document.getElementById('history-records-list');
    if (!modal || !container) return;

    const history = JSON.parse(localStorage.getItem(this.historyKey) || '[]');
    container.innerHTML = '';

    if (history.length === 0) {
      container.innerHTML = `<div class="empty-steps">${this.t('history_empty')}</div>`;
    } else {
      history.forEach(rec => {
        const card = document.createElement('div');
        card.className = 'record-item-card';
        card.innerHTML = `
          <div class="rec-left">
            <span class="rec-rank-icon">${rec.rankIcon || '⚡'}</span>
            <div>
              <div class="rec-title">
                <strong>${this.t('lbl_diana')}: ${rec.target}</strong>
                <span class="rec-status ${rec.isExact ? 'exact' : ''}">${rec.isExact ? this.t('status_exact') : this.t('diff_prefix') + rec.diff}</span>
              </div>
              <div class="rec-meta font-mono">
                ⏱️ ${rec.timeSpent}s &bull; ${rec.stepsCount} ops &bull; ${rec.difficulty.toUpperCase()}
              </div>
            </div>
          </div>
          <div class="rec-right">
            <strong class="rec-score font-mono text-gold">${rec.totalScore} pts</strong>
          </div>
        `;
        container.appendChild(card);
      });
    }

    this.openModal('modal-history');
  }

  toggleSound() {
    if (window.soundFx) {
      const active = window.soundFx.toggle();
      this.updateSoundIcon();
      this.showToast(active ? this.t('toast_sound_on') : this.t('toast_sound_off'), 'info');
    }
  }

  updateSoundIcon() {
    const icon = document.getElementById('sound-icon');
    if (icon && window.soundFx) {
      icon.textContent = window.soundFx.enabled ? '🔊' : '🔇';
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      if (window.soundFx) window.soundFx.playClick();
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    toast.className = `toast-box toast-${type} active`;
    toast.textContent = message;

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 2800);
  }

  bindEvents() {
    // Selector de Idioma (Modal 5)
    document.getElementById('btn-open-lang-modal')?.addEventListener('click', () => {
      this.openModal('modal-language');
    });

    document.querySelectorAll('.lang-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.closeModal('modal-language');
        this.onLanguageChanged(lang);
      });
    });

    // Dificultades
    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const diff = btn.dataset.diff;
        if (diff !== this.difficulty || this.isGameOver) {
          this.startNewGame(diff);
        }
      });
    });

    // Botón Nueva Partida
    document.getElementById('btn-new-game')?.addEventListener('click', () => {
      this.startNewGame(this.difficulty);
    });

    // Botón Cambiar Semilla (🎲)
    document.getElementById('btn-reroll-seed')?.addEventListener('click', () => {
      this.startNewGame(this.difficulty);
    });

    // Botón Deshacer y Reiniciar
    document.getElementById('btn-undo-step')?.addEventListener('click', () => this.undoLastStep());
    document.getElementById('btn-reset-board')?.addEventListener('click', () => this.resetBoard());

    // Botón Plantarse / Diana
    document.getElementById('btn-claim-victory')?.addEventListener('click', () => this.claimVictory());

    // Botón de Duelo
    document.getElementById('btn-share-duel')?.addEventListener('click', () => this.shareDuelChallenge());
    document.getElementById('btn-duel-share-copy')?.addEventListener('click', () => this.shareDuelChallenge());

    // Botón de Historial
    document.getElementById('btn-open-history')?.addEventListener('click', () => this.openHistoryModal());

    // Botón de Solución Óptima
    document.getElementById('btn-show-optimal')?.addEventListener('click', () => {
      this.closeModal('modal-gameover');
      this.showOptimalSolution();
    });

    // Botón de Sonido
    document.getElementById('btn-toggle-sound')?.addEventListener('click', () => this.toggleSound());

    // Botón de Reglas / Manual
    document.getElementById('btn-open-rules')?.addEventListener('click', () => this.openModal('modal-rules'));

    // Botón Jugar de Nuevo tras game over
    document.getElementById('btn-gameover-play-again')?.addEventListener('click', () => {
      this.closeModal('modal-gameover');
      this.startNewGame(this.difficulty);
    });

    // Cerrar modales
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => this.closeAllModals());
    });
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeAllModals();
      });
    });

    // Teclas rápidas
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeAllModals();
      if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.undoLastStep();
      }
      if (['+', '-', '*', '/'].includes(e.key)) {
        const opMap = { '+': '+', '-': '−', '*': '×', '/': '÷' };
        this.handleOperatorClick(opMap[e.key]);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.calculoApp = new CalculoTacticoApp();
});
