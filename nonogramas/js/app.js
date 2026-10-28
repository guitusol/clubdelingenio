/**
 * NONOGRAMAS DEL CLUB — Controlador Principal de la Aplicación
 * Maneja la interacción táctil/ratón (drag continuo), el estado del lienzo,
 * validación reactiva de pistas, colección de la Pinacoteca y cronómetro.
 */

class NonogramApp {
  constructor() {
    this.sound = new NonogramSoundEffects();
    this.i18n = new NonogramI18nManager();
    this.puzzles = NONOGRAM_PUZZLES;
    this.customPuzzles = this.loadCustomPuzzles();
    this.weeklyHistory = this.loadWeeklyHistory();

    // Editor state
    this.editorSize = 5;
    this.editorColor = '#f59e0b';
    this.editorMatrix = NonogramLogic.createEmptyGrid(5);
    this.editorMouseDown = false;
    this.editorDrawVal = 1;
    this.editorLastTouchedCell = null;

    this.currentPuzzle = this.loadInitialPuzzle();
    this.userGrid = [];
    this.clues = null;
    this.currentTool = 'paint'; // 'paint' | 'cross'
    
    // Drag state
    this.isMouseDown = false;
    this.dragDrawMode = null; // 1 (paint), 2 (cross), 0 (erase)
    this.lastTouchedCell = null;

    // Cronómetro
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.hasStarted = false;
    this.isSolved = false;

    // Galería privada
    this.gallery = this.loadGallery();

    this.init();
  }

  init() {
    this.sound.init();
    this.i18n.applyTranslations();
    this.bindEvents();
    this.startPuzzle(this.currentPuzzle);
    this.updateSoundButton();
  }

  loadInitialPuzzle() {
    const lastId = localStorage.getItem('nonogram_last_puzzle');
    if (lastId) {
      const all = [...this.puzzles, ...this.customPuzzles];
      const found = all.find(p => p.id === lastId);
      if (found) return found;
    }
    return this.puzzles[0];
  }

  loadCustomPuzzles() {
    try {
      const raw = localStorage.getItem('nonogram_custom_puzzles_v1');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  saveCustomPuzzles() {
    try {
      localStorage.setItem('nonogram_custom_puzzles_v1', JSON.stringify(this.customPuzzles));
    } catch (e) {}
  }

  loadWeeklyHistory() {
    try {
      const raw = localStorage.getItem('nonogram_weekly_history_v1');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  saveWeeklyHistory() {
    try {
      localStorage.setItem('nonogram_weekly_history_v1', JSON.stringify(this.weeklyHistory));
    } catch (e) {}
  }

  getIsoWeek() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return {
      year: d.getFullYear(),
      week: weekNo,
      code: `${d.getFullYear()}-W${String(weekNo).padStart(2, '0')}`
    };
  }

  getWeeklyPuzzle() {
    const week = this.getIsoWeek();
    const pool = this.puzzles.filter(p => p.size >= 10);
    const list = pool.length > 0 ? pool : this.puzzles;
    const idx = (week.year * 52 + week.week) % list.length;
    return list[idx];
  }

  loadGallery() {
    try {
      const raw = localStorage.getItem('nonogram_gallery_v1');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  saveGalleryItem(puzzleId, timeSpent) {
    this.gallery[puzzleId] = {
      id: puzzleId,
      solvedAt: new Date().toISOString(),
      timeSpent: timeSpent || this.formatTime(this.timerSeconds)
    };
    try {
      localStorage.setItem('nonogram_gallery_v1', JSON.stringify(this.gallery));
    } catch (e) {}
  }

  startPuzzle(puzzle) {
    this.currentPuzzle = puzzle;
    localStorage.setItem('nonogram_last_puzzle', puzzle.id);
    this.userGrid = NonogramLogic.createEmptyGrid(puzzle.size);
    this.clues = NonogramLogic.calculateClues(puzzle.matrix);

    this.stopTimer();
    this.timerSeconds = 0;
    this.hasStarted = false;
    this.isSolved = false;
    this.updateTimerDisplay();

    this.updatePuzzleMeta();
    this.renderBoard();
  }

  updatePuzzleMeta() {
    const titleEl = document.getElementById('puzzle-title');
    const descEl = document.getElementById('puzzle-desc');
    const diffBadge = document.getElementById('puzzle-diff-badge');

    const lang = this.i18n.currentLang;
    const title = this.currentPuzzle.title[lang] || this.currentPuzzle.title['es'];
    const desc = this.currentPuzzle.description[lang] || this.currentPuzzle.description['es'];

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;

    if (diffBadge) {
      diffBadge.className = 'diff-badge ' + this.currentPuzzle.difficulty;
      diffBadge.textContent = this.i18n.t('diff_' + this.currentPuzzle.difficulty);
    }
  }

  renderBoard() {
    const container = document.getElementById('nonogram-board-container');
    if (!container) return;

    container.innerHTML = '';
    const size = this.currentPuzzle.size;

    // Estructura: tabla/grid con esquina superior izquierda vacía, pistas columnas arriba, pistas filas izquierda y matriz de celdas
    const board = document.createElement('div');
    board.className = 'nonogram-board size-' + size;

    // 1. Esquina superior izquierda
    const corner = document.createElement('div');
    corner.className = 'board-corner';
    corner.innerHTML = '<span class="corner-icon">🎨</span>';
    board.appendChild(corner);

    // 2. Cabecera de columnas (Pistas verticales)
    const colCluesWrap = document.createElement('div');
    colCluesWrap.className = 'board-col-clues';
    for (let c = 0; c < size; c++) {
      const colBox = document.createElement('div');
      colBox.className = 'col-clue-box';
      colBox.dataset.col = c;
      if ((c + 1) % 5 === 0 && c < size - 1) colBox.classList.add('border-subgrid-col');

      const nums = this.clues.cols[c];
      nums.forEach(num => {
        const span = document.createElement('span');
        span.className = 'clue-num';
        span.textContent = num;
        colBox.appendChild(span);
      });
      colCluesWrap.appendChild(colBox);
    }
    board.appendChild(colCluesWrap);

    // 3. Pistas de filas (Horizontales a la izquierda)
    const rowCluesWrap = document.createElement('div');
    rowCluesWrap.className = 'board-row-clues';
    for (let r = 0; r < size; r++) {
      const rowBox = document.createElement('div');
      rowBox.className = 'row-clue-box';
      rowBox.dataset.row = r;
      if ((r + 1) % 5 === 0 && r < size - 1) rowBox.classList.add('border-subgrid-row');

      const nums = this.clues.rows[r];
      nums.forEach(num => {
        const span = document.createElement('span');
        span.className = 'clue-num';
        span.textContent = num;
        rowBox.appendChild(span);
      });
      rowCluesWrap.appendChild(rowBox);
    }
    board.appendChild(rowCluesWrap);

    // 4. Matriz interactiva de celdas
    const grid = document.createElement('div');
    grid.className = 'board-grid size-' + size;
    grid.style.gridTemplateColumns = 'repeat(' + size + ', 1fr)';
    grid.style.gridTemplateRows = 'repeat(' + size + ', 1fr)';

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.row = r;
        cell.dataset.col = c;

        // Marcadores de división cada 5 casillas
        if ((c + 1) % 5 === 0 && c < size - 1) cell.classList.add('subgrid-right');
        if ((r + 1) % 5 === 0 && r < size - 1) cell.classList.add('subgrid-bottom');

        this.applyCellState(cell, this.userGrid[r][c]);
        grid.appendChild(cell);
      }
    }

    board.appendChild(grid);
    container.appendChild(board);

    this.updateClueHighlights();
    this.updateProgressBar();
  }

  applyCellState(cellEl, state) {
    cellEl.classList.remove('filled', 'crossed');
    cellEl.style.backgroundColor = '';

    if (state === 1) {
      cellEl.classList.add('filled');
      if (this.isSolved) {
        cellEl.style.backgroundColor = this.currentPuzzle.themeColor || '#f59e0b';
      }
    } else if (state === 2) {
      cellEl.classList.add('crossed');
    }
  }

  handleCellInteraction(r, c, isDragStart) {
    if (this.isSolved) return;

    if (!this.hasStarted) {
      this.hasStarted = true;
      this.startTimer();
    }

    const currentState = this.userGrid[r][c];

    if (isDragStart) {
      if (this.currentTool === 'paint') {
        this.dragDrawMode = (currentState === 1) ? 0 : 1;
      } else {
        this.dragDrawMode = (currentState === 2) ? 0 : 2;
      }
    }

    // Si la celda ya tiene el valor que queremos aplicar, salir
    if (this.userGrid[r][c] === this.dragDrawMode) return;

    this.userGrid[r][c] = this.dragDrawMode;

    const cellEl = document.querySelector('.grid-cell[data-row="' + r + '"][data-col="' + c + '"]');
    if (cellEl) {
      this.applyCellState(cellEl, this.dragDrawMode);
    }

    // Audio sutil
    if (this.dragDrawMode === 1) {
      this.sound.playFill();
    } else if (this.dragDrawMode === 2) {
      this.sound.playCross();
    } else {
      this.sound.playErase();
    }

    this.updateClueHighlights();
    this.updateProgressBar();
    this.checkVictoryCondition();
  }

  updateClueHighlights() {
    const size = this.currentPuzzle.size;

    // Filas
    for (let r = 0; r < size; r++) {
      const isSatisfied = NonogramLogic.isLineSatisfied(this.userGrid[r], this.clues.rows[r]);
      const rowBox = document.querySelector('.row-clue-box[data-row="' + r + '"]');
      if (rowBox) {
        rowBox.classList.toggle('clue-satisfied', isSatisfied);
      }
    }

    // Columnas
    for (let c = 0; c < size; c++) {
      const colValues = [];
      for (let r = 0; r < size; r++) {
        colValues.push(this.userGrid[r][c]);
      }
      const isSatisfied = NonogramLogic.isLineSatisfied(colValues, this.clues.cols[c]);
      const colBox = document.querySelector('.col-clue-box[data-col="' + c + '"]');
      if (colBox) {
        colBox.classList.toggle('clue-satisfied', isSatisfied);
      }
    }
  }

  updateProgressBar() {
    const progress = NonogramLogic.calculateProgress(this.userGrid, this.currentPuzzle.matrix);
    const fillEl = document.getElementById('progress-bar-fill');
    const textEl = document.getElementById('progress-bar-text');

    if (fillEl) fillEl.style.width = progress + '%';
    if (textEl) textEl.textContent = progress + '%';
  }

  checkVictoryCondition() {
    if (NonogramLogic.isSolved(this.userGrid, this.currentPuzzle.matrix)) {
      this.triggerVictory();
    }
  }

  triggerVictory() {
    this.isSolved = true;
    this.stopTimer();

    const timeSpent = this.formatTime(this.timerSeconds);
    this.saveGalleryItem(this.currentPuzzle.id, timeSpent);
    this.sound.playVictory();

    // Comprobar si era el Reto Semanal oficial
    const week = this.getIsoWeek();
    const weeklyPuzzle = this.getWeeklyPuzzle();
    if (this.currentPuzzle.id === weeklyPuzzle.id) {
      this.weeklyHistory[week.code] = {
        solved: true,
        timeSpent: timeSpent,
        solvedAt: new Date().toISOString()
      };
      this.saveWeeklyHistory();
      this.showToast(`🏆 ¡Reto Semanal de la Semana ${week.week} superado!`, 'success');
    }

    // Colorear el mosaico completo con su color temático
    const cells = document.querySelectorAll('.grid-cell.filled');
    cells.forEach((cell, idx) => {
      setTimeout(() => {
        cell.style.backgroundColor = this.currentPuzzle.themeColor || '#f59e0b';
        cell.classList.add('victory-glow');
      }, idx * 12);
    });

    this.showToast(this.i18n.t('toast_victory'), 'success');

    // Desplegar modal tras 600ms para deleitar la vista
    setTimeout(() => {
      this.openVictoryModal(timeSpent);
    }, 700);
  }

  openVictoryModal(timeSpent) {
    const modal = document.getElementById('modal-victory');
    if (!modal) return;

    const lang = this.i18n.currentLang;
    const title = this.currentPuzzle.title[lang] || this.currentPuzzle.title['es'];
    const desc = this.currentPuzzle.description[lang] || this.currentPuzzle.description['es'];

    document.getElementById('vic-puzzle-title').textContent = title;
    document.getElementById('vic-puzzle-desc').textContent = desc;
    document.getElementById('vic-time-spent').textContent = timeSpent;

    // Miniatura de pixel art en el modal
    this.renderArtworkThumbnail(document.getElementById('vic-artwork-preview'), this.currentPuzzle);

    modal.classList.add('active');
  }

  renderArtworkThumbnail(container, puzzle) {
    if (!container) return;
    container.innerHTML = '';
    const size = puzzle.size;
    const canvas = document.createElement('div');
    canvas.className = 'thumb-pixel-grid size-' + size;
    canvas.style.gridTemplateColumns = 'repeat(' + size + ', 1fr)';

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const dot = document.createElement('div');
        dot.className = 'thumb-pixel';
        if (puzzle.matrix[r][c] === 1) {
          dot.style.backgroundColor = puzzle.themeColor || '#f59e0b';
        }
        canvas.appendChild(dot);
      }
    }
    container.appendChild(canvas);
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      this.updateTimerDisplay();
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    const el = document.getElementById('timer-display');
    if (el) el.textContent = this.formatTime(this.timerSeconds);
  }

  formatTime(totalSec) {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  bindEvents() {
    const container = document.getElementById('nonogram-board-container');

    // === RATÓN (DESKTOP) ===
    container.addEventListener('mousedown', (e) => {
      const cell = e.target.closest('.grid-cell');
      if (!cell) return;
      e.preventDefault();
      this.isMouseDown = true;
      const r = parseInt(cell.dataset.row, 10);
      const c = parseInt(cell.dataset.col, 10);
      this.handleCellInteraction(r, c, true);
    });

    window.addEventListener('mouseup', () => {
      this.isMouseDown = false;
      this.dragDrawMode = null;
    });

    container.addEventListener('mouseover', (e) => {
      if (!this.isMouseDown) return;
      const cell = e.target.closest('.grid-cell');
      if (!cell) return;
      const r = parseInt(cell.dataset.row, 10);
      const c = parseInt(cell.dataset.col, 10);
      this.handleCellInteraction(r, c, false);
    });

    // === TÁCTIL (MÓVIL / TABLET) ===
    container.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const cell = target ? target.closest('.grid-cell') : null;
      if (!cell) return;
      e.preventDefault();
      this.isMouseDown = true;
      const r = parseInt(cell.dataset.row, 10);
      const c = parseInt(cell.dataset.col, 10);
      this.lastTouchedCell = cell;
      this.handleCellInteraction(r, c, true);
    }, { passive: false });

    container.addEventListener('touchmove', (e) => {
      if (!this.isMouseDown) return;
      e.preventDefault();
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const cell = target ? target.closest('.grid-cell') : null;
      if (!cell || cell === this.lastTouchedCell) return;
      this.lastTouchedCell = cell;
      const r = parseInt(cell.dataset.row, 10);
      const c = parseInt(cell.dataset.col, 10);
      this.handleCellInteraction(r, c, false);
    }, { passive: false });

    window.addEventListener('touchend', () => {
      this.isMouseDown = false;
      this.dragDrawMode = null;
      this.lastTouchedCell = null;
    });

    // Herramientas: Pintar / Tachar
    const btnPaint = document.getElementById('tool-paint');
    const btnCross = document.getElementById('tool-cross');

    btnPaint?.addEventListener('click', () => {
      this.currentTool = 'paint';
      btnPaint.classList.add('active');
      btnCross?.classList.remove('active');
      this.sound.playClick();
    });

    btnCross?.addEventListener('click', () => {
      this.currentTool = 'cross';
      btnCross.classList.add('active');
      btnPaint?.classList.remove('active');
      this.sound.playClick();
    });

    // Botón reiniciar
    document.getElementById('btn-reset-board')?.addEventListener('click', () => {
      if (confirm('¿Reiniciar el tablero actual?')) {
        this.userGrid = NonogramLogic.createEmptyGrid(this.currentPuzzle.size);
        this.renderBoard();
        this.showToast(this.i18n.t('toast_reset'));
        this.sound.playErase();
      }
    });

    // Botón Sonido
    document.getElementById('btn-toggle-sound')?.addEventListener('click', () => {
      this.sound.toggle();
      this.updateSoundButton();
      this.showToast(this.sound.enabled ? this.i18n.t('toast_sound_on') : this.i18n.t('toast_sound_off'));
    });

    // Modales estándar
    this.setupModalTrigger('btn-open-rules', 'modal-rules');
    this.setupModalTrigger('btn-open-catalog', 'modal-catalog', () => this.renderCatalog());
    this.setupModalTrigger('btn-open-gallery', 'modal-gallery', () => this.renderGallery());
    this.setupModalTrigger('btn-open-lang-modal', 'modal-language');

    // Reto Semanal
    this.setupModalTrigger('btn-open-weekly', 'modal-weekly', () => this.renderWeeklyModal());
    document.getElementById('btn-start-weekly-puzzle')?.addEventListener('click', () => {
      this.startWeeklyPuzzle();
    });

    // Taller del Creador (Editor visual)
    this.setupModalTrigger('btn-open-editor', 'modal-editor', () => this.openEditorModal());

    document.querySelectorAll('.btn-editor-size').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-editor-size').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const size = parseInt(btn.dataset.size, 10);
        this.setEditorSize(size);
      });
    });

    document.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        this.editorColor = swatch.dataset.color;
        document.documentElement.style.setProperty('--active-swatch-color', this.editorColor);
        document.querySelectorAll('.editor-cell.active').forEach(c => {
          c.style.backgroundColor = this.editorColor;
        });
      });
    });

    document.getElementById('btn-editor-clear')?.addEventListener('click', () => {
      this.clearEditorCanvas();
    });

    document.getElementById('btn-editor-invert')?.addEventListener('click', () => {
      this.invertEditorCanvas();
    });

    document.getElementById('btn-editor-test')?.addEventListener('click', () => {
      this.testEditorPuzzle();
    });

    document.getElementById('btn-editor-save')?.addEventListener('click', () => {
      this.saveEditorPuzzle();
    });

    document.getElementById('btn-editor-copy-json')?.addEventListener('click', () => {
      this.copyEditorJson();
    });

    // Botones de cierre de modal
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      });
    });

    // Siguiente puzle tras victoria
    document.getElementById('btn-next-puzzle')?.addEventListener('click', () => {
      document.getElementById('modal-victory')?.classList.remove('active');
      this.loadNextPuzzle();
    });

    // Ver en pinacoteca desde victoria
    document.getElementById('btn-view-gallery')?.addEventListener('click', () => {
      document.getElementById('modal-victory')?.classList.remove('active');
      this.renderGallery();
      document.getElementById('modal-gallery')?.classList.add('active');
    });

    // Selector de idiomas
    document.querySelectorAll('.lang-select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = btn.dataset.lang;
        if (lang) {
          this.i18n.setLanguage(lang);
          this.updatePuzzleMeta();
          this.renderBoard();
          document.getElementById('modal-language')?.classList.remove('active');
        }
      });
    });

    // Pestañas del catálogo
    document.querySelectorAll('.catalog-tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.catalog-tab-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.filterCatalogByDiff(tab.dataset.diff);
      });
    });
  }

  setupModalTrigger(btnId, modalId, onOpen) {
    const btn = document.getElementById(btnId);
    const modal = document.getElementById(modalId);
    if (!btn || !modal) return;

    btn.addEventListener('click', () => {
      if (onOpen) onOpen();
      modal.classList.add('active');
      this.sound.playClick();
    });
  }

  updateSoundButton() {
    const icon = document.getElementById('sound-icon');
    if (icon) icon.textContent = this.sound.enabled ? '🔊' : '🔇';
  }

  loadNextPuzzle() {
    const all = [...this.puzzles, ...this.customPuzzles];
    const currentIndex = all.findIndex(p => p.id === this.currentPuzzle.id);
    const nextIndex = (currentIndex + 1) % all.length;
    this.startPuzzle(all[nextIndex]);
  }

  // === RETO SEMANAL ===
  renderWeeklyModal() {
    const week = this.getIsoWeek();
    const puzzle = this.getWeeklyPuzzle();
    const isSolved = !!this.weeklyHistory[week.code]?.solved;
    const timeSpent = this.weeklyHistory[week.code]?.timeSpent || '--';

    const weekBadge = document.getElementById('weekly-week-badge');
    const statusBadge = document.getElementById('weekly-status-badge');
    const titleEl = document.getElementById('weekly-puzzle-title');
    const descEl = document.getElementById('weekly-puzzle-desc');
    const sizeEl = document.getElementById('weekly-puzzle-size');
    const diffEl = document.getElementById('weekly-puzzle-diff');
    const timeEl = document.getElementById('weekly-puzzle-time');
    const streakEl = document.getElementById('weekly-streak-text');

    const lang = this.i18n.currentLang;
    const title = puzzle.title[lang] || puzzle.title['es'];
    const desc = puzzle.description[lang] || puzzle.description['es'];

    if (weekBadge) weekBadge.textContent = `${this.i18n.t('modal_weekly_badge')} ${week.week} (${week.year})`;
    if (statusBadge) {
      statusBadge.textContent = isSolved ? this.i18n.t('weekly_solved_badge') : this.i18n.t('weekly_pending_badge');
      statusBadge.className = isSolved ? 'badge-solved' : 'badge-pending';
      if (isSolved) {
        statusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
        statusBadge.style.color = '#34d399';
        statusBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      } else {
        statusBadge.style.background = 'rgba(56, 189, 248, 0.2)';
        statusBadge.style.color = 'var(--cyan-primary)';
        statusBadge.style.borderColor = 'var(--border-cyan)';
      }
    }
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (sizeEl) sizeEl.textContent = `${puzzle.size}×${puzzle.size}`;
    if (diffEl) diffEl.textContent = this.i18n.t('diff_' + puzzle.difficulty);
    if (timeEl) timeEl.textContent = timeSpent;

    const totalWins = Object.values(this.weeklyHistory).filter(w => w.solved).length;
    if (streakEl) streakEl.textContent = `Victorias Semanales acumuladas: ${totalWins} 🏆`;
  }

  startWeeklyPuzzle() {
    const puzzle = this.getWeeklyPuzzle();
    document.getElementById('modal-weekly')?.classList.remove('active');
    this.startPuzzle(puzzle);
    this.showToast(`🏆 Reto Semanal: ${puzzle.title[this.i18n.currentLang] || puzzle.title['es']}`);
  }

  // === TALLER DEL CREADOR (EDITOR VISUAL) ===
  openEditorModal() {
    this.setEditorSize(this.editorSize || 5);
  }

  setEditorSize(size) {
    this.editorSize = size;
    this.editorMatrix = NonogramLogic.createEmptyGrid(size);
    document.documentElement.style.setProperty('--active-swatch-color', this.editorColor);

    const cellSize = size === 5 ? '44px' : (size === 10 ? '28px' : '20px');
    document.documentElement.style.setProperty('--editor-cell-size', cellSize);

    this.renderEditorCanvas();
  }

  renderEditorCanvas() {
    const container = document.getElementById('editor-board-container');
    if (!container) return;
    container.innerHTML = '';

    const size = this.editorSize;
    const clues = NonogramLogic.calculateClues(this.editorMatrix);

    const board = document.createElement('div');
    board.className = 'editor-board';

    // 1. Esquina
    const corner = document.createElement('div');
    corner.className = 'board-corner';
    corner.innerHTML = '<span class="corner-icon">🖌️</span>';
    board.appendChild(corner);

    // 2. Cabecera Columnas
    const colCluesWrap = document.createElement('div');
    colCluesWrap.className = 'board-col-clues';
    for (let c = 0; c < size; c++) {
      const colBox = document.createElement('div');
      colBox.className = 'col-clue-box editor-col-clue-box';
      colBox.dataset.col = c;
      colBox.style.width = 'var(--editor-cell-size, 30px)';
      if ((c + 1) % 5 === 0 && c < size - 1) colBox.classList.add('border-subgrid-col');

      clues.cols[c].forEach(num => {
        const span = document.createElement('span');
        span.className = 'clue-num';
        span.textContent = num;
        colBox.appendChild(span);
      });
      colCluesWrap.appendChild(colBox);
    }
    board.appendChild(colCluesWrap);

    // 3. Cabecera Filas
    const rowCluesWrap = document.createElement('div');
    rowCluesWrap.className = 'board-row-clues';
    for (let r = 0; r < size; r++) {
      const rowBox = document.createElement('div');
      rowBox.className = 'row-clue-box editor-row-clue-box';
      rowBox.dataset.row = r;
      rowBox.style.height = 'var(--editor-cell-size, 30px)';
      if ((r + 1) % 5 === 0 && r < size - 1) rowBox.classList.add('border-subgrid-row');

      clues.rows[r].forEach(num => {
        const span = document.createElement('span');
        span.className = 'clue-num';
        span.textContent = num;
        rowBox.appendChild(span);
      });
      rowCluesWrap.appendChild(rowBox);
    }
    board.appendChild(rowCluesWrap);

    // 4. Grid de celdas interactivas
    const grid = document.createElement('div');
    grid.className = 'editor-grid';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const cell = document.createElement('div');
        cell.className = 'editor-cell';
        cell.dataset.row = r;
        cell.dataset.col = c;

        if ((c + 1) % 5 === 0 && c < size - 1) cell.classList.add('subgrid-right');
        if ((r + 1) % 5 === 0 && r < size - 1) cell.classList.add('subgrid-bottom');

        if (this.editorMatrix[r][c] === 1) {
          cell.classList.add('active');
          cell.style.backgroundColor = this.editorColor;
        }

        grid.appendChild(cell);
      }
    }

    grid.addEventListener('mousedown', (e) => {
      const cell = e.target.closest('.editor-cell');
      if (!cell) return;
      e.preventDefault();
      this.editorMouseDown = true;
      const r = parseInt(cell.dataset.row, 10);
      const c = parseInt(cell.dataset.col, 10);
      this.editorDrawVal = this.editorMatrix[r][c] === 1 ? 0 : 1;
      this.handleEditorCellInteract(r, c, cell);
    });

    window.addEventListener('mouseup', () => {
      this.editorMouseDown = false;
    });

    grid.addEventListener('mouseover', (e) => {
      if (!this.editorMouseDown) return;
      const cell = e.target.closest('.editor-cell');
      if (!cell) return;
      const r = parseInt(cell.dataset.row, 10);
      const c = parseInt(cell.dataset.col, 10);
      this.handleEditorCellInteract(r, c, cell);
    });

    grid.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const cell = target ? target.closest('.editor-cell') : null;
      if (!cell) return;
      e.preventDefault();
      this.editorMouseDown = true;
      const r = parseInt(cell.dataset.row, 10);
      const c = parseInt(cell.dataset.col, 10);
      this.editorDrawVal = this.editorMatrix[r][c] === 1 ? 0 : 1;
      this.editorLastTouchedCell = cell;
      this.handleEditorCellInteract(r, c, cell);
    }, { passive: false });

    grid.addEventListener('touchmove', (e) => {
      if (!this.editorMouseDown) return;
      e.preventDefault();
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const cell = target ? target.closest('.editor-cell') : null;
      if (!cell || cell === this.editorLastTouchedCell) return;
      this.editorLastTouchedCell = cell;
      const r = parseInt(cell.dataset.row, 10);
      const c = parseInt(cell.dataset.col, 10);
      this.handleEditorCellInteract(r, c, cell);
    }, { passive: false });

    board.appendChild(grid);
    container.appendChild(board);
  }

  handleEditorCellInteract(r, c, cell) {
    if (this.editorMatrix[r][c] === this.editorDrawVal) return;
    this.editorMatrix[r][c] = this.editorDrawVal;

    if (this.editorDrawVal === 1) {
      cell.classList.add('active');
      cell.style.backgroundColor = this.editorColor;
      this.sound.playFill();
    } else {
      cell.classList.remove('active');
      cell.style.backgroundColor = '';
      this.sound.playErase();
    }

    this.updateEditorClues();
  }

  updateEditorClues() {
    const clues = NonogramLogic.calculateClues(this.editorMatrix);
    const size = this.editorSize;

    for (let c = 0; c < size; c++) {
      const colBox = document.querySelector(`.editor-col-clue-box[data-col="${c}"]`);
      if (colBox) {
        colBox.innerHTML = '';
        clues.cols[c].forEach(num => {
          const span = document.createElement('span');
          span.className = 'clue-num';
          span.textContent = num;
          colBox.appendChild(span);
        });
      }
    }

    for (let r = 0; r < size; r++) {
      const rowBox = document.querySelector(`.editor-row-clue-box[data-row="${r}"]`);
      if (rowBox) {
        rowBox.innerHTML = '';
        clues.rows[r].forEach(num => {
          const span = document.createElement('span');
          span.className = 'clue-num';
          span.textContent = num;
          rowBox.appendChild(span);
        });
      }
    }
  }

  clearEditorCanvas() {
    this.editorMatrix = NonogramLogic.createEmptyGrid(this.editorSize);
    document.querySelectorAll('.editor-cell').forEach(c => {
      c.classList.remove('active');
      c.style.backgroundColor = '';
    });
    this.updateEditorClues();
    this.sound.playErase();
    this.showToast(this.i18n.t('toast_canvas_cleared'));
  }

  invertEditorCanvas() {
    const size = this.editorSize;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        this.editorMatrix[r][c] = this.editorMatrix[r][c] === 1 ? 0 : 1;
        const cell = document.querySelector(`.editor-cell[data-row="${r}"][data-col="${c}"]`);
        if (cell) {
          if (this.editorMatrix[r][c] === 1) {
            cell.classList.add('active');
            cell.style.backgroundColor = this.editorColor;
          } else {
            cell.classList.remove('active');
            cell.style.backgroundColor = '';
          }
        }
      }
    }
    this.updateEditorClues();
    this.sound.playClick();
  }

  testEditorPuzzle() {
    let filledCount = 0;
    for (let r = 0; r < this.editorSize; r++) {
      for (let c = 0; c < this.editorSize; c++) {
        if (this.editorMatrix[r][c] === 1) filledCount++;
      }
    }
    if (filledCount === 0) {
      this.showToast(this.i18n.t('editor_empty_warning'), 'info');
      return;
    }

    const titleInput = document.getElementById('editor-puzzle-title');
    const rawTitle = titleInput ? titleInput.value.trim() : '';
    const title = rawTitle || `Mi Creación #${this.customPuzzles.length + 1}`;

    const puzzle = {
      id: 'custom_' + Date.now(),
      size: this.editorSize,
      difficulty: this.editorSize === 5 ? 'facil' : (this.editorSize === 10 ? 'medio' : 'dificil'),
      themeColor: this.editorColor,
      title: { es: title, en: title },
      description: {
        es: `Obra original diseñada en el Taller del Club (${this.editorSize}×${this.editorSize}).`,
        en: `Original artwork created in the Club Workshop (${this.editorSize}×${this.editorSize}).`
      },
      matrix: JSON.parse(JSON.stringify(this.editorMatrix)),
      isCustom: true
    };

    document.getElementById('modal-editor')?.classList.remove('active');
    this.startPuzzle(puzzle);
    this.showToast(`▶ Probando: ${title}`);
  }

  saveEditorPuzzle() {
    let filledCount = 0;
    for (let r = 0; r < this.editorSize; r++) {
      for (let c = 0; c < this.editorSize; c++) {
        if (this.editorMatrix[r][c] === 1) filledCount++;
      }
    }
    if (filledCount === 0) {
      this.showToast(this.i18n.t('editor_empty_warning'), 'info');
      return;
    }

    const titleInput = document.getElementById('editor-puzzle-title');
    const rawTitle = titleInput ? titleInput.value.trim() : '';
    const title = rawTitle || `Mi Creación #${this.customPuzzles.length + 1}`;

    const puzzle = {
      id: 'custom_' + Date.now(),
      size: this.editorSize,
      difficulty: this.editorSize === 5 ? 'facil' : (this.editorSize === 10 ? 'medio' : 'dificil'),
      themeColor: this.editorColor,
      title: { es: title, en: title },
      description: {
        es: `Obra original diseñada en el Taller del Club (${this.editorSize}×${this.editorSize}).`,
        en: `Original artwork created in the Club Workshop (${this.editorSize}×${this.editorSize}).`
      },
      matrix: JSON.parse(JSON.stringify(this.editorMatrix)),
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    this.customPuzzles.push(puzzle);
    this.saveCustomPuzzles();
    this.sound.playVictory();
    this.showToast(this.i18n.t('toast_puzzle_saved'), 'success');
  }

  copyEditorJson() {
    let filledCount = 0;
    for (let r = 0; r < this.editorSize; r++) {
      for (let c = 0; c < this.editorSize; c++) {
        if (this.editorMatrix[r][c] === 1) filledCount++;
      }
    }
    if (filledCount === 0) {
      this.showToast(this.i18n.t('editor_empty_warning'), 'info');
      return;
    }

    const titleInput = document.getElementById('editor-puzzle-title');
    const rawTitle = titleInput ? titleInput.value.trim() : '';
    const title = rawTitle || 'Nueva Ilustración';

    const puzObj = {
      id: `p${this.editorSize}_custom_${Date.now().toString(36)}`,
      size: this.editorSize,
      difficulty: this.editorSize === 5 ? 'facil' : (this.editorSize === 10 ? 'medio' : 'dificil'),
      themeColor: this.editorColor,
      title: {
        es: title,
        en: title
      },
      description: {
        es: `Ilustración creada en el Club del Ingenio.`,
        en: `Artwork created in Club del Ingenio.`
      },
      matrix: this.editorMatrix
    };

    const jsonStr = JSON.stringify(puzObj, null, 2);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(jsonStr).then(() => {
        this.showToast(this.i18n.t('toast_json_copied'), 'success');
      }).catch(() => {
        prompt('Copia el código JSON de tu puzle:', jsonStr);
      });
    } else {
      prompt('Copia el código JSON de tu puzle:', jsonStr);
    }
  }

  renderCatalog() {
    const list = document.getElementById('catalog-cards-list');
    if (!list) return;

    // Pestaña activa actual
    const activeTab = document.querySelector('.catalog-tab-btn.active');
    const diff = activeTab ? activeTab.dataset.diff : 'facil';
    this.filterCatalogByDiff(diff);
  }

  filterCatalogByDiff(diff) {
    const list = document.getElementById('catalog-cards-list');
    if (!list) return;
    list.innerHTML = '';

    const lang = this.i18n.currentLang;

    if (diff === 'taller') {
      if (this.customPuzzles.length === 0) {
        list.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem;">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🖌️🎨</div>
            <h4 style="color: var(--gold-light); font-size: 1.1rem; margin-bottom: 0.4rem;">Aún no tienes creaciones guardadas</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">Diseña tu propio mosaico en el Taller para jugarlo cuando quieras.</p>
            <button id="btn-catalog-create" class="btn-header editor-btn" style="border-color: var(--border-cyan); color: var(--cyan-primary);">
              <span>🖌️</span> Abrir Taller del Creador
            </button>
          </div>
        `;
        document.getElementById('btn-catalog-create')?.addEventListener('click', () => {
          document.getElementById('modal-catalog')?.classList.remove('active');
          this.openEditorModal();
          document.getElementById('modal-editor')?.classList.add('active');
        });
        return;
      }

      this.customPuzzles.forEach((puz, idx) => {
        const isUnlocked = !!this.gallery[puz.id];
        const card = document.createElement('div');
        card.className = 'catalog-card ' + (isUnlocked ? 'solved' : '');

        const title = puz.title[lang] || puz.title['es'];
        const previewBox = document.createElement('div');
        previewBox.className = 'catalog-preview';
        this.renderArtworkThumbnail(previewBox, puz);

        const infoBox = document.createElement('div');
        infoBox.className = 'catalog-info';
        infoBox.innerHTML = `
          <h4>#${idx + 1} ${title}</h4>
          <div class="catalog-status">
            <span class="diff-badge ${puz.difficulty}">${puz.size}×${puz.size}</span>
            <span style="font-size: 0.75rem; color: var(--cyan-primary); margin-left: 0.35rem;">🎨 Propio</span>
          </div>
        `;

        card.appendChild(previewBox);
        card.appendChild(infoBox);

        card.addEventListener('click', () => {
          document.getElementById('modal-catalog')?.classList.remove('active');
          this.startPuzzle(puz);
        });

        list.appendChild(card);
      });
      return;
    }

    const filtered = this.puzzles.filter(p => p.difficulty === diff);

    filtered.forEach((puz, idx) => {
      const isUnlocked = !!this.gallery[puz.id];
      const card = document.createElement('div');
      card.className = 'catalog-card ' + (isUnlocked ? 'solved' : '');

      const title = puz.title[lang] || puz.title['es'];
      const previewBox = document.createElement('div');
      previewBox.className = 'catalog-preview';

      if (isUnlocked) {
        this.renderArtworkThumbnail(previewBox, puz);
      } else {
        previewBox.innerHTML = '<span class="lock-icon">🔒</span><span class="preview-size">' + puz.size + '×' + puz.size + '</span>';
      }

      const infoBox = document.createElement('div');
      infoBox.className = 'catalog-info';
      infoBox.innerHTML = '<h4>#' + (idx + 1) + ' ' + title + '</h4>' +
        '<div class="catalog-status">' +
        (isUnlocked ? '<span class="badge-solved">✨ ' + this.i18n.t('gallery_solved_badge') + '</span>' : '<span class="badge-pending">Pendiente</span>') +
        '</div>';

      card.appendChild(previewBox);
      card.appendChild(infoBox);

      card.addEventListener('click', () => {
        document.getElementById('modal-catalog')?.classList.remove('active');
        this.startPuzzle(puz);
      });

      list.appendChild(card);
    });
  }

  renderGallery() {
    const container = document.getElementById('gallery-showcase-grid');
    if (!container) return;
    container.innerHTML = '';

    const solvedKeys = Object.keys(this.gallery);
    const lang = this.i18n.currentLang;

    if (solvedKeys.length === 0) {
      container.innerHTML = '<div class="gallery-empty-state"><p>' + this.i18n.t('gallery_empty') + '</p></div>';
      return;
    }

    solvedKeys.forEach(id => {
      const all = [...this.puzzles, ...this.customPuzzles];
      const puz = all.find(p => p.id === id);
      if (!puz) return;

      const record = this.gallery[id];
      const title = puz.title[lang] || puz.title['es'];
      const desc = puz.description[lang] || puz.description['es'];

      const frame = document.createElement('div');
      frame.className = 'gallery-frame';

      const thumb = document.createElement('div');
      thumb.className = 'gallery-art';
      this.renderArtworkThumbnail(thumb, puz);

      const meta = document.createElement('div');
      meta.className = 'gallery-meta';
      meta.innerHTML = '<h3>' + title + '</h3>' +
        '<p class="gallery-desc">' + desc + '</p>' +
        '<div class="gallery-footer">' +
        '<span class="badge-diff ' + puz.difficulty + '">' + puz.size + '×' + puz.size + '</span>' +
        '<span class="gallery-time">⏱️ ' + (record.timeSpent || '--') + '</span>' +
        '</div>';

      frame.appendChild(thumb);
      frame.appendChild(meta);

      frame.addEventListener('click', () => {
        document.getElementById('modal-gallery')?.classList.remove('active');
        this.startPuzzle(puz);
      });

      container.appendChild(frame);
    });
  }

  showToast(msg, type = 'info') {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = 'toast-box active ' + type;
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 2400);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.nonogramApp = new NonogramApp();
});
