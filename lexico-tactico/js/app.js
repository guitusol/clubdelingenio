/**
 * Léxico Táctico - Controlador Principal de la Aplicación
 */

class LexicoApp {
  constructor() {
    this.board = window.boardEngine;
    this.dictionary = window.dictionaryEngine;
    this.sound = window.soundEngine;
    this.i18n = window.lexicoI18n;
    this.ai = new window.LexicoAI(this.board, this.dictionary);

    this.gameMode = 'ai'; // 'ai' | 'puzzle' | 'duel'
    this.difficulty = 'medio'; // 'facil' | 'medio' | 'dificil'
    this.tileBag = [];
    this.playerRack = [];
    this.aiRack = [];
    this.playerScore = 0;
    this.aiScore = 0;
    this.isAiTurn = false;
    this.selectedRackIdx = null;
    this.consecutivePasses = 0;
    this.pendingBlankCoord = null;

    // Modo Demostración Pedagógica
    this.isDemoMode = false;
    this.demoPaused = false;
    this.demoSpeed = 2800; // ms por turno
    this.demoTimeoutId = null;
    this.demoPlayer = 1;
    this.demoRack1 = [];
    this.demoRack2 = [];
    this.demoScore1 = 0;
    this.demoScore2 = 0;

    // Semilla para Duelo 1v1
    const urlParams = new URLSearchParams(window.location.search);
    this.duelSeed = urlParams.get('seed') || null;
    if (this.duelSeed) {
      this.gameMode = 'duel';
    }

    this.init();
  }

  init() {
    this.renderBoardGrid();
    this.bindEvents();
    this.i18n.applyTranslations();
    this.newGame();
  }

  newGame() {
    if (this.isDemoMode) {
      this.stopDemoMode(false);
    }
    this.board.reset();

    const urlParams = new URLSearchParams(window.location.search);
    const activeSeed = this.duelSeed || urlParams.get('seed') || null;
    this.tileBag = this.dictionary.createTileBag(this.i18n.currentLang, activeSeed);

    this.playerRack = [];
    this.aiRack = [];
    this.playerScore = 0;
    this.aiScore = 0;
    this.isAiTurn = false;
    this.selectedRackIdx = null;
    this.consecutivePasses = 0;

    // Restaurar etiquetas originales del HUD
    const pLabel = document.getElementById('stat-player-label');
    if (pLabel) pLabel.textContent = this.i18n.t('score_you');
    const aiLabel = document.getElementById('stat-ai-label');
    if (aiLabel) aiLabel.textContent = this.i18n.t('score_ai');
    const ownerLabel = document.getElementById('rack-owner-label');
    if (ownerLabel) ownerLabel.classList.add('hidden');

    // Repartir 7 fichas a cada uno
    this.replenishRack(this.playerRack);
    this.replenishRack(this.aiRack);

    this.updateHUD();
    this.renderBoard();
    this.renderRack();
    this.updateScorePreview();

    if (activeSeed) {
      setTimeout(() => {
        this.showToast(`⚔️ Modo Duelo activo con la misma secuencia de letras.`);
      }, 500);
    }
  }

  replenishRack(rack) {
    while (rack.length < 7 && this.tileBag.length > 0) {
      rack.push(this.tileBag.pop());
    }
  }

  renderBoardGrid() {
    const container = document.getElementById('lexico-board');
    if (!container) return;
    container.innerHTML = '';

    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const cell = document.createElement('div');
        cell.className = 'board-cell';
        cell.dataset.r = r;
        cell.dataset.c = c;

        const mult = MULTIPLIER_TEMPLATE[r][c];
        if (mult !== '.') {
          cell.classList.add(`cell-${mult.toLowerCase()}`);
          const label = document.createElement('span');
          label.className = 'cell-mult-label';
          label.textContent = mult === 'ST' ? '★' : mult;
          cell.appendChild(label);
        }

        cell.addEventListener('click', () => this.handleCellClick(r, c));
        container.appendChild(cell);
      }
    }
  }

  renderBoard() {
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const cellEl = document.querySelector(`.board-cell[data-r="${r}"][data-c="${c}"]`);
        if (!cellEl) continue;

        // Limpiar fichas previas
        const oldTile = cellEl.querySelector('.board-tile');
        if (oldTile) oldTile.remove();

        const eff = this.board.getEffectiveCell(r, c);
        if (eff) {
          const tileEl = document.createElement('div');
          tileEl.className = `board-tile ${eff.isProvisional ? 'tile-provisional' : 'tile-locked'}`;

          const letterEl = document.createElement('span');
          letterEl.className = 'tile-letter';
          letterEl.textContent = eff.tile.letter;

          const ptsEl = document.createElement('span');
          ptsEl.className = 'tile-pts';
          ptsEl.textContent = eff.tile.isBlank ? '0' : eff.tile.points;

          tileEl.appendChild(letterEl);
          tileEl.appendChild(ptsEl);
          cellEl.appendChild(tileEl);
        }
      }
    }
  }

  renderRack() {
    const rackEl = document.getElementById('player-rack');
    if (!rackEl) return;
    rackEl.innerHTML = '';

    this.playerRack.forEach((tile, idx) => {
      const tileEl = document.createElement('button');
      tileEl.className = `rack-tile ${this.selectedRackIdx === idx ? 'selected' : ''}`;
      tileEl.dataset.idx = idx;

      const letterEl = document.createElement('span');
      letterEl.className = 'tile-letter';
      letterEl.textContent = tile.letter;

      const ptsEl = document.createElement('span');
      ptsEl.className = 'tile-pts';
      ptsEl.textContent = tile.isBlank ? '0' : tile.points;

      tileEl.appendChild(letterEl);
      tileEl.appendChild(ptsEl);

      tileEl.addEventListener('click', () => this.selectRackTile(idx));
      rackEl.appendChild(tileEl);
    });
  }

  selectRackTile(idx) {
    if (this.isDemoMode) {
      this.showToast(this.i18n.t('demo_toast_in_progress') || "🎬 Demostración en curso. Pulsa «¡Jugar Yo Ahora!» para tomar el control.");
      return;
    }
    if (this.isAiTurn) return;
    if (this.selectedRackIdx === idx) {
      this.selectedRackIdx = null; // deseleccionar
    } else {
      this.selectedRackIdx = idx;
      this.sound.playTileClick();
    }
    this.renderRack();
  }

  handleCellClick(r, c) {
    if (this.isDemoMode) {
      this.showToast(this.i18n.t('demo_toast_in_progress') || "🎬 Demostración en curso. Pulsa «¡Jugar Yo Ahora!» para tomar el control.");
      return;
    }
    if (this.isAiTurn) return;

    // 1. Si la celda tiene una ficha provisional, devolverla al atril
    const key = `${r},${c}`;
    if (this.board.provisionalTiles.has(key)) {
      const returnedTile = this.board.removeProvisional(r, c);
      if (returnedTile) {
        this.playerRack.push(returnedTile);
        this.sound.playRemoveTile();
        this.renderBoard();
        this.renderRack();
        this.updateScorePreview();
      }
      return;
    }

    // 2. Si hay una ficha del atril seleccionada y la celda está vacía, colocarla
    if (this.selectedRackIdx !== null && this.playerRack[this.selectedRackIdx]) {
      if (this.board.grid[r][c].tile === null) {
        const tile = this.playerRack.splice(this.selectedRackIdx, 1)[0];
        this.selectedRackIdx = null;

        // Si es comodín, abrir modal para elegir letra
        if (tile.isBlank) {
          this.openBlankModal(r, c, tile);
          return;
        }

        this.board.placeProvisional(r, c, tile);
        this.sound.playPlaceTile();
        this.renderBoard();
        this.renderRack();
        this.updateScorePreview();
      }
    }
  }

  openBlankModal(r, c, tile) {
    this.pendingBlankCoord = { r, c, tile };
    const modal = document.getElementById('modal-blank');
    if (modal) modal.classList.remove('hidden');
  }

  assignBlankLetter(letter) {
    if (!this.pendingBlankCoord) return;
    const { r, c, tile } = this.pendingBlankCoord;
    const assignedTile = {
      ...tile,
      letter: letter.toUpperCase(),
      points: 0,
      isBlank: true
    };
    this.board.placeProvisional(r, c, assignedTile);
    this.sound.playPlaceTile();
    this.pendingBlankCoord = null;

    const modal = document.getElementById('modal-blank');
    if (modal) modal.classList.add('hidden');

    this.renderBoard();
    this.renderRack();
    this.updateScorePreview();
  }

  updateScorePreview() {
    const previewEl = document.getElementById('preview-points-val');
    const playBtn = document.getElementById('btn-play-word');
    if (!previewEl || !playBtn) return;

    if (this.board.provisionalTiles.size === 0) {
      previewEl.textContent = '0';
      playBtn.classList.add('disabled');
      return;
    }

    const validation = this.board.validatePlacement(this.dictionary);
    if (validation.valid) {
      previewEl.textContent = `+${validation.score} pts ${validation.isBingo ? '🌟 BINGO!' : ''}`;
      playBtn.classList.remove('disabled');
    } else {
      previewEl.textContent = '⚠️ Inválida';
      playBtn.classList.add('disabled');
    }
  }

  playCurrentWord() {
    if (this.isAiTurn) return;

    const val = this.board.validatePlacement(this.dictionary);
    if (!val.valid) {
      this.sound.playError();
      if (val.error === 'invalid_words') {
        const word = val.invalidWords ? val.invalidWords.join(', ') : '';
        this.showToast(this.i18n.t('toast_invalid_word', { word }));
      } else if (val.error === 'must_touch_center') {
        this.showToast(this.i18n.t('toast_must_touch_center'));
      } else if (val.error === 'must_connect_existing') {
        this.showToast(this.i18n.t('toast_must_connect'));
      } else if (val.error === 'must_be_inline') {
        this.showToast(this.i18n.t('toast_must_be_inline'));
      } else if (val.error === 'gap_detected') {
        this.showToast(this.i18n.t('toast_gap_detected'));
      } else {
        this.showToast(this.i18n.t('toast_min_length'));
      }
      return;
    }

    // Jugada válida confirmada
    this.board.commitProvisional();
    this.playerScore += val.score;
    this.consecutivePasses = 0;

    if (val.isBingo) {
      this.sound.playBingoBonus();
      this.showToast(this.i18n.t('toast_bingo'));
    } else {
      this.sound.playWordSuccess(val.details && val.details[0] ? val.details[0].mult : 1);
      this.showToast(this.i18n.t('toast_word_played', { pts: val.score }));
    }

    // Reponer atril
    this.replenishRack(this.playerRack);
    this.updateHUD();
    this.renderBoard();
    this.renderRack();
    this.updateScorePreview();

    // Comprobar fin de partida
    if (this.playerRack.length === 0 && this.tileBag.length === 0) {
      this.endGame();
      return;
    }

    // Turno de la IA si jugamos contra bot
    if (this.gameMode === 'ai') {
      this.isAiTurn = true;
      this.updateHUD();
      setTimeout(() => this.executeAiTurn(), 900);
    }
  }

  executeAiTurn() {
    const move = this.ai.findMove(this.aiRack, this.difficulty);

    if (move && move.placements && move.placements.length > 0) {
      // Colocar fichas de la IA
      move.placements.forEach(p => {
        this.board.placeProvisional(p.r, p.c, p);
        const idx = this.aiRack.findIndex(t => (t.isBlank && p.isBlank) || t.letter === p.letter);
        if (idx !== -1) this.aiRack.splice(idx, 1);
      });

      this.board.commitProvisional();
      this.aiScore += move.score;
      this.consecutivePasses = 0;
      this.sound.playWordSuccess(1);
      this.showToast(this.i18n.t('toast_ai_played', { word: move.word, pts: move.score }));

      // Reponer atril de la IA
      this.replenishRack(this.aiRack);
    } else {
      // Si la IA no encuentra palabra, cambia fichas o pasa
      if (this.tileBag.length >= 3) {
        const swapCount = Math.min(3, this.aiRack.length);
        const removed = this.aiRack.splice(0, swapCount);
        this.replenishRack(this.aiRack);
        this.tileBag.push(...removed);
        this.showToast(this.i18n.t('toast_ai_passed'));
      } else {
        this.consecutivePasses++;
        this.showToast(this.i18n.t('toast_ai_passed'));
      }
    }

    this.isAiTurn = false;
    this.updateHUD();
    this.renderBoard();

    // Comprobar fin de partida (2 pases seguidos o bolsa vacía y atril vacío)
    if (this.consecutivePasses >= 4 || (this.aiRack.length === 0 && this.tileBag.length === 0)) {
      this.endGame();
    }
  }

  shuffleRack() {
    this.sound.playShuffle();
    for (let i = this.playerRack.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.playerRack[i], this.playerRack[j]] = [this.playerRack[j], this.playerRack[i]];
    }
    this.selectedRackIdx = null;
    this.renderRack();
  }

  recallTiles() {
    const recalled = this.board.clearProvisional();
    if (recalled.length > 0) {
      this.playerRack.push(...recalled);
      this.sound.playRemoveTile();
      this.selectedRackIdx = null;
      this.renderBoard();
      this.renderRack();
      this.updateScorePreview();
    }
  }

  swapTiles() {
    if (this.isAiTurn) return;
    if (this.tileBag.length < 1) {
      this.showToast("La bolsa está vacía; no quedan fichas para cambiar.");
      return;
    }

    this.recallTiles();
    const count = Math.min(3, this.playerRack.length, this.tileBag.length);
    const swapped = this.playerRack.splice(0, count);
    this.replenishRack(this.playerRack);
    this.tileBag.push(...swapped);

    this.sound.playShuffle();
    this.showToast(this.i18n.t('toast_swap_ok', { count }));
    this.renderRack();
    this.updateHUD();

    if (this.gameMode === 'ai') {
      this.isAiTurn = true;
      this.updateHUD();
      setTimeout(() => this.executeAiTurn(), 800);
    }
  }

  passTurn() {
    if (this.isAiTurn) return;
    this.recallTiles();
    this.consecutivePasses++;

    if (this.consecutivePasses >= 4) {
      this.endGame();
      return;
    }

    if (this.gameMode === 'ai') {
      this.isAiTurn = true;
      this.updateHUD();
      setTimeout(() => this.executeAiTurn(), 800);
    }
  }

  updateHUD() {
    document.getElementById('stat-player-score').textContent = this.playerScore;
    document.getElementById('stat-ai-score').textContent = this.aiScore;
    document.getElementById('stat-bag-count').textContent = this.tileBag.length;

    const turnBadge = document.getElementById('turn-status-badge');
    if (turnBadge) {
      if (this.isAiTurn) {
        turnBadge.textContent = '⏳ Turno de la IA...';
        turnBadge.className = 'status-badge badge-ai';
      } else {
        turnBadge.textContent = 'Tu Turno';
        turnBadge.className = 'status-badge badge-you';
      }
    }
  }

  /* ===================================================================
     MÉTODOS DEL MODO DEMOSTRACIÓN PEDAGÓGICA (AUTO-JUEGO)
     =================================================================== */

  startDemoMode() {
    clearTimeout(this.demoTimeoutId);
    this.isDemoMode = true;
    this.demoPaused = false;
    this.demoSpeed = 2800;
    this.demoPlayer = 1;
    this.demoScore1 = 0;
    this.demoScore2 = 0;
    this.consecutivePasses = 0;

    // Actualizar botones de modo
    document.querySelectorAll('.mode-btn').forEach(b => {
      if (b.dataset.mode === 'demo') b.classList.add('active');
      else b.classList.remove('active');
    });

    // Reset tablero y bolsa
    this.board.reset();
    this.tileBag = this.dictionary.createTileBag(this.i18n.currentLang);
    this.demoRack1 = [];
    this.demoRack2 = [];
    this.replenishRack(this.demoRack1);
    this.replenishRack(this.demoRack2);

    // Mostrar banner de control de demo
    document.getElementById('demo-control-bar')?.classList.remove('hidden');

    const ownerLabel = document.getElementById('rack-owner-label');
    if (ownerLabel) {
      ownerLabel.textContent = this.i18n.t('demo_player_1') || 'Jugador 1 (Azul)';
      ownerLabel.classList.remove('hidden');
    }

    const pauseLabel = document.getElementById('demo-pause-label');
    if (pauseLabel) pauseLabel.textContent = this.i18n.t('demo_btn_pause') || 'Pausa';
    const speedLabel = document.getElementById('demo-speed-label');
    if (speedLabel) speedLabel.textContent = this.i18n.t('demo_speed_slow') || 'Lento (3s)';

    this.updateDemoHUD();
    this.renderBoard();
    this.renderDemoRack(this.demoRack1);

    const descEl = document.getElementById('demo-step-desc');
    if (descEl) {
      descEl.textContent = "🎬 Iniciando demostración pedagógica... El primer jugador debe colocar una palabra cruzando la estrella central (★).";
    }

    this.showToast("🎬 Modo Demostración iniciado. Observa el desarrollo paso a paso.");
    this.scheduleDemoTurn(1500);
  }

  stopDemoMode(switchToNormal = true) {
    clearTimeout(this.demoTimeoutId);
    this.isDemoMode = false;
    this.demoPaused = false;

    document.getElementById('demo-control-bar')?.classList.add('hidden');
    document.getElementById('rack-owner-label')?.classList.add('hidden');

    // Restaurar botones de modo
    document.querySelectorAll('.mode-btn').forEach(b => {
      if (b.dataset.mode === 'ai') b.classList.add('active');
      else b.classList.remove('active');
    });
    this.gameMode = 'ai';

    if (switchToNormal) {
      this.newGame();
      this.showToast(this.i18n.t('demo_toast_user_turn') || "¡Tu turno! Ahora pon en práctica lo que has visto jugando tu propia partida.");
    }
  }

  toggleDemoPause() {
    if (!this.isDemoMode) return;
    this.demoPaused = !this.demoPaused;
    const pauseLabel = document.getElementById('demo-pause-label');
    const pauseBtn = document.getElementById('btn-demo-pause');
    const descEl = document.getElementById('demo-step-desc');

    if (this.demoPaused) {
      clearTimeout(this.demoTimeoutId);
      if (pauseLabel) pauseLabel.textContent = this.i18n.t('demo_btn_resume') || 'Reanudar';
      if (pauseBtn) pauseBtn.innerHTML = '▶️ <span id="demo-pause-label">' + (this.i18n.t('demo_btn_resume') || 'Reanudar') + '</span>';
      if (descEl) descEl.textContent = "⏸️ Demostración pausada. Puedes examinar el tablero con tranquilidad.";
    } else {
      if (pauseLabel) pauseLabel.textContent = this.i18n.t('demo_btn_pause') || 'Pausa';
      if (pauseBtn) pauseBtn.innerHTML = '⏸️ <span id="demo-pause-label">' + (this.i18n.t('demo_btn_pause') || 'Pausa') + '</span>';
      if (descEl) descEl.textContent = "▶️ Reanudando partida demostrativa...";
      this.scheduleDemoTurn(600);
    }
  }

  toggleDemoSpeed() {
    const speedLabel = document.getElementById('demo-speed-label');
    if (this.demoSpeed === 2800) {
      this.demoSpeed = 1400;
      if (speedLabel) speedLabel.textContent = this.i18n.t('demo_speed_fast') || 'Rápido (1.5s)';
    } else {
      this.demoSpeed = 2800;
      if (speedLabel) speedLabel.textContent = this.i18n.t('demo_speed_slow') || 'Lento (3s)';
    }
    this.sound.playTileClick();
  }

  scheduleDemoTurn(delay) {
    clearTimeout(this.demoTimeoutId);
    if (!this.isDemoMode || this.demoPaused) return;
    this.demoTimeoutId = setTimeout(() => this.runDemoStep(), delay);
  }

  async runDemoStep() {
    if (!this.isDemoMode || this.demoPaused) return;

    const isP1 = this.demoPlayer === 1;
    const curRack = isP1 ? this.demoRack1 : this.demoRack2;
    const playerName = isP1 ? (this.i18n.t('demo_player_1') || 'Jugador 1 (Azul)') : (this.i18n.t('demo_player_2') || 'Jugador 2 (Dorado)');
    const playerClass = isP1 ? 'p1' : 'p2';

    // Actualizar indicador de turno
    const pill = document.getElementById('demo-active-player');
    if (pill) {
      pill.textContent = `Turno: ${playerName}`;
      pill.className = `demo-player-pill ${playerClass}`;
    }

    const ownerLabel = document.getElementById('rack-owner-label');
    if (ownerLabel) {
      ownerLabel.textContent = `Atril de ${playerName}`;
      ownerLabel.style.color = isP1 ? 'var(--cyan)' : 'var(--gold)';
    }

    const turnBadge = document.getElementById('turn-status-badge');
    if (turnBadge) {
      turnBadge.textContent = `Turno: ${playerName}`;
      turnBadge.className = isP1 ? 'status-badge badge-you' : 'status-badge badge-ai';
    }

    // Renderizar atril del jugador activo
    this.renderDemoRack(curRack);

    const descEl = document.getElementById('demo-step-desc');
    if (descEl) {
      descEl.textContent = `⏳ ${playerName} está calculando la mejor combinación en su atril...`;
    }

    await new Promise(r => setTimeout(r, 650));
    if (!this.isDemoMode || this.demoPaused) return;

    // Buscar jugada de la IA para este jugador
    const move = this.ai.findMove(curRack, this.difficulty || 'medio');

    if (move && move.placements && move.placements.length > 0) {
      // Explicar qué hace la jugada
      let reason = '';
      if (this.board.isFirstMove()) {
        reason = `⭐ ${playerName} abre la partida con «${move.word}» (+${move.score} pts) cubriendo la estrella central obligatoria (★).`;
      } else {
        let multFound = '';
        for (const p of move.placements) {
          const m = MULTIPLIER_TEMPLATE[p.r][p.c];
          if (m === 'TP') multFound = ' ¡Aprovecha casilla 3P (Triple Palabra)!';
          else if (m === 'DP') multFound = ' ¡Aprovecha casilla 2P (Doble Palabra)!';
          else if (m === 'TL') multFound = ' ¡Aprovecha casilla 3L (Triple Letra)!';
          else if (m === 'DL') multFound = ' ¡Aprovecha casilla 2L (Doble Letra)!';
        }
        reason = `🔠 ${playerName} forma «${move.word}» (+${move.score} pts) cruzándose con letras existentes.${multFound}`;
      }

      if (descEl) descEl.textContent = reason;

      // Colocar fichas una a una
      for (const p of move.placements) {
        if (!this.isDemoMode || this.demoPaused) return;

        this.board.placeProvisional(p.r, p.c, p);
        this.sound.playPlaceTile();

        // Extraer ficha del atril
        const rIdx = curRack.findIndex(t => (t.isBlank && p.isBlank) || t.letter === p.letter);
        if (rIdx !== -1) curRack.splice(rIdx, 1);

        this.renderBoard();
        this.renderDemoRack(curRack);

        // Añadir animación pop
        const cellEl = document.querySelector(`.board-cell[data-r="${p.r}"][data-c="${p.c}"] .board-tile`);
        if (cellEl) cellEl.classList.add('tile-highlight-demo');

        await new Promise(r => setTimeout(r, 450));
      }

      // Previsualizar puntos
      const prevEl = document.getElementById('preview-points-val');
      if (prevEl) prevEl.textContent = `+${move.score} pts`;

      await new Promise(r => setTimeout(r, 700));
      if (!this.isDemoMode || this.demoPaused) return;

      // Confirmar jugada
      this.board.commitProvisional();
      if (isP1) this.demoScore1 += move.score;
      else this.demoScore2 += move.score;
      this.consecutivePasses = 0;

      if (move.placements.length === 7) {
        this.sound.playBingoBonus();
        this.showToast("🌟 ¡¡¡ BINGO !!! 7 fichas jugadas (+50 pts extra)");
      } else {
        this.sound.playWordSuccess(1);
      }

      // Reponer atril
      this.replenishRack(curRack);
      this.updateDemoHUD();
      this.renderBoard();
      this.renderDemoRack(curRack);

      if (prevEl) prevEl.textContent = '0';

      // Esperar tiempo de lectura
      await new Promise(r => setTimeout(r, this.demoSpeed));
      if (!this.isDemoMode || this.demoPaused) return;

    } else {
      // Si no encuentra palabra, cambiar fichas o pasar
      if (this.tileBag.length >= 3) {
        if (descEl) descEl.textContent = `🔀 ${playerName} no puede formar cruces válidos y cambia fichas con la bolsa.`;
        const swapped = curRack.splice(0, Math.min(3, curRack.length));
        this.replenishRack(curRack);
        this.tileBag.push(...swapped);
        this.sound.playShuffle();
        this.renderDemoRack(curRack);
        this.updateDemoHUD();
        await new Promise(r => setTimeout(r, 1600));
      } else {
        if (descEl) descEl.textContent = `⏭️ ${playerName} pasa su turno al no haber fichas para cambiar.`;
        this.consecutivePasses++;
        this.updateDemoHUD();
        await new Promise(r => setTimeout(r, 1400));
      }
    }

    // Comprobar fin de partida
    if (this.consecutivePasses >= 4 || (curRack.length === 0 && this.tileBag.length === 0)) {
      if (descEl) {
        descEl.textContent = `🏁 Fin de la partida de muestra. Marcador: ${this.demoScore1} - ${this.demoScore2}. ¡Pulsa 'Jugar Yo Ahora' para comenzar tu partida!`;
      }
      this.sound.playWordSuccess(3);
      return;
    }

    // Cambiar de jugador y agendar siguiente turno
    this.demoPlayer = isP1 ? 2 : 1;
    this.scheduleDemoTurn(600);
  }

  renderDemoRack(rack) {
    const rackEl = document.getElementById('player-rack');
    if (!rackEl) return;
    rackEl.innerHTML = '';

    rack.forEach((tile) => {
      const tileEl = document.createElement('button');
      tileEl.className = 'rack-tile';
      tileEl.style.cursor = 'default';

      const letterEl = document.createElement('span');
      letterEl.className = 'tile-letter';
      letterEl.textContent = tile.letter;

      const ptsEl = document.createElement('span');
      ptsEl.className = 'tile-pts';
      ptsEl.textContent = tile.isBlank ? '0' : tile.points;

      tileEl.appendChild(letterEl);
      tileEl.appendChild(ptsEl);
      rackEl.appendChild(tileEl);
    });
  }

  updateDemoHUD() {
    const p1Score = document.getElementById('stat-player-score');
    if (p1Score) p1Score.textContent = this.demoScore1;
    const p2Score = document.getElementById('stat-ai-score');
    if (p2Score) p2Score.textContent = this.demoScore2;
    const bagCount = document.getElementById('stat-bag-count');
    if (bagCount) bagCount.textContent = this.tileBag.length;

    const pLabel = document.getElementById('stat-player-label');
    if (pLabel) pLabel.textContent = this.i18n.t('demo_player_1') || 'Jugador 1';
    const aiLabel = document.getElementById('stat-ai-label');
    if (aiLabel) aiLabel.textContent = this.i18n.t('demo_player_2') || 'Jugador 2';
  }

  endGame() {
    this.showToast(this.i18n.t('toast_game_over', { you: this.playerScore, rival: this.aiScore }));
    this.sound.playWordSuccess(3);
  }

  showToast(msg) {
    const toast = document.getElementById('lexico-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    toast.classList.add('visible');

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3200);
  }

  /* ===================================================================
     MÉTODOS DE DUELO 1V1 Y COMPARTIR POR WHATSAPP
     =================================================================== */

  getDuelUrl() {
    if (!this.duelSeed) {
      this.duelSeed = 'LEX-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 900 + 100);
    }
    const url = new URL(window.location.href);
    url.searchParams.set('seed', this.duelSeed);
    url.searchParams.set('lang', this.i18n.currentLang);
    return url.toString();
  }

  openDuelModal() {
    const duelUrl = this.getDuelUrl();
    const urlInput = document.getElementById('duel-share-url');
    if (urlInput) urlInput.value = duelUrl;

    const copyBtn = document.getElementById('btn-copy-duel-link');
    const copyText = document.getElementById('btn-copy-text');
    const copyIcon = document.getElementById('btn-copy-icon');
    if (copyText) copyText.textContent = this.i18n.t('duel_btn_copy') || 'Copiar Enlace de Desafío';
    if (copyIcon) copyIcon.textContent = '📋';
    if (copyBtn) copyBtn.style.background = '';

    document.getElementById('modal-duel')?.classList.remove('hidden');
  }

  async copyTextToClipboard(text) {
    let success = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch (e) {
        success = false;
      }
    }
    if (!success) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        success = document.execCommand('copy');
      } catch (err) {
        success = false;
      }
      document.body.removeChild(textarea);
    }
    return success;
  }

  async copyDuelLink() {
    const duelUrl = this.getDuelUrl();
    await this.copyTextToClipboard(duelUrl);

    const copyBtn = document.getElementById('btn-copy-duel-link');
    const copyText = document.getElementById('btn-copy-text');
    const copyIcon = document.getElementById('btn-copy-icon');

    if (copyText) copyText.textContent = '¡Enlace Copiado al Portapapeles!';
    if (copyIcon) copyIcon.textContent = '✔️';
    if (copyBtn) copyBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    this.sound.playTileClick();
    this.showToast("📋 ¡Enlace de duelo copiado al portapapeles! Ya puedes pegarlo en WhatsApp.");

    setTimeout(() => {
      if (copyText) copyText.textContent = this.i18n.t('duel_btn_copy') || 'Copiar Enlace de Desafío';
      if (copyIcon) copyIcon.textContent = '📋';
      if (copyBtn) copyBtn.style.background = '';
    }, 4000);
  }

  shareDuelViaWhatsApp() {
    const duelUrl = this.getDuelUrl();
    const text = `⚔️ ¡Te reto en Léxico Táctico (Palabras Cruzadas)! ¿Quién sumará más puntos con la misma bolsa de letras? Acepta el duelo aquí:\n${duelUrl}`;
    
    // Copiar también al portapapeles como respaldo seguro
    this.copyTextToClipboard(text);

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');

    this.sound.playTileClick();
    this.showToast("🟢 ¡Abriendo WhatsApp y enlace copiado!");
  }

  bindEvents() {
    document.getElementById('btn-play-word')?.addEventListener('click', () => this.playCurrentWord());
    document.getElementById('btn-shuffle-rack')?.addEventListener('click', () => this.shuffleRack());
    document.getElementById('btn-recall-rack')?.addEventListener('click', () => this.recallTiles());
    document.getElementById('btn-swap-tiles')?.addEventListener('click', () => this.swapTiles());
    document.getElementById('btn-pass-turn')?.addEventListener('click', () => this.passTurn());
    document.getElementById('btn-new-game')?.addEventListener('click', () => this.newGame());

    // Botones de Modo Demostración (Único y centralizado)
    document.getElementById('btn-demo-pause')?.addEventListener('click', () => this.toggleDemoPause());
    document.getElementById('btn-demo-speed')?.addEventListener('click', () => this.toggleDemoSpeed());
    document.getElementById('btn-demo-stop')?.addEventListener('click', () => this.stopDemoMode(true));

    // Duelo 1v1 y WhatsApp
    document.getElementById('btn-share-duel')?.addEventListener('click', () => this.openDuelModal());
    document.getElementById('btn-copy-duel-link')?.addEventListener('click', () => this.copyDuelLink());
    document.getElementById('btn-share-whatsapp')?.addEventListener('click', () => this.shareDuelViaWhatsApp());
    document.getElementById('duel-share-url')?.addEventListener('click', (e) => e.target.select());

    // Selector de Dificultad
    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.difficulty = btn.dataset.diff;
        this.sound.playTileClick();
      });
    });

    // Selector de Modo
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        if (mode === 'demo') {
          this.startDemoMode();
        } else if (mode === 'duel') {
          this.openDuelModal();
        } else {
          if (this.isDemoMode) {
            this.stopDemoMode(false);
          }
          document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.gameMode = mode;
          this.newGame();
        }
      });
    });

    // Selector de Letra para Comodín
    document.querySelectorAll('.blank-letter-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const letter = btn.textContent.trim();
        this.assignBlankLetter(letter);
      });
    });

    // Control de Sonido
    document.getElementById('btn-toggle-sound')?.addEventListener('click', () => {
      const enabled = this.sound.toggle();
      const icon = document.getElementById('sound-icon');
      if (icon) icon.textContent = enabled ? '🔊' : '🔇';
    });

    // Modales (Reglas, Idioma)
    document.getElementById('btn-open-rules')?.addEventListener('click', () => {
      document.getElementById('modal-rules')?.classList.remove('hidden');
    });
    document.getElementById('btn-open-lang-modal')?.addEventListener('click', () => {
      document.getElementById('modal-lang')?.classList.remove('hidden');
    });

    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.target.closest('.modal-overlay')?.classList.add('hidden');
      });
    });

    // Selección de Idioma
    document.querySelectorAll('.lang-card').forEach(card => {
      card.addEventListener('click', () => {
        const lang = card.dataset.lang;
        if (lang) {
          this.i18n.setLanguage(lang);
          document.getElementById('modal-lang')?.classList.add('hidden');
          this.newGame();
        }
      });
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.lexicoApp = new LexicoApp();
});

