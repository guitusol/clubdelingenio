/**
 * DEDUCCIÓN LÓGICA — Controlador de Juego y Matriz Interactiva
 */

class DetectiveGameApp {
  constructor() {
    this.cases = window.LOGIC_CASES || [];
    this.currentCaseIndex = 0;
    this.currentCase = this.cases[0] || null;
    this.engine = null;

    // Cronómetro
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.isSolved = false;

    // Pistas tachadas
    this.struckClues = new Set();
    this.activeMode = 'matrix';

    this.init();
  }

  t(key, params = {}) {
    return (window.i18n ? window.i18n.t(key, params) : key);
  }

  getLangText(obj, prefix = 'name') {
    if (!obj) return '';
    const lang = window.i18n ? window.i18n.currentLang : 'es';
    if (obj[`${prefix}_${lang}`]) return obj[`${prefix}_${lang}`];
    if (lang === 'va' && obj[`${prefix}_ca`]) return obj[`${prefix}_ca`];
    if (lang === 'ca' && obj[`${prefix}_va`]) return obj[`${prefix}_va`];
    if (obj[`${prefix}_en`]) return obj[`${prefix}_en`];
    if (obj[`${prefix}_es`]) return obj[`${prefix}_es`];
    return obj[prefix] || '';
  }

  init() {
    if (window.i18n) window.i18n.applyTranslations();
    this.bindEvents();
    this.loadCase(0);
    this.updateSoundIcon();
    if (window.classicEnigmas) window.classicEnigmas.init();
  }

  loadCase(index) {
    if (index < 0 || index >= this.cases.length) index = 0;
    this.currentCaseIndex = index;
    this.currentCase = this.cases[index];
    this.engine = new window.GridLogicEngine(this.currentCase);
    this.struckClues.clear();
    this.isSolved = false;

    // Reiniciar cronómetro
    this.stopTimer();
    this.timerSeconds = 0;
    this.startTimer();

    // Renderizar
    this.renderCaseHeader();
    this.renderClues();
    this.renderGrid();
    this.renderSummaryNotebook();
    this.closeAllModals();
  }

  startTimer() {
    this.stopTimer();
    this.updateTimerDisplay();
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
    const timerEl = document.getElementById('investigation-timer');
    if (!timerEl) return;
    const m = Math.floor(this.timerSeconds / 60);
    const s = this.timerSeconds % 60;
    timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  renderCaseHeader() {
    const titleEl = document.getElementById('case-title');
    const introEl = document.getElementById('case-intro');
    const diffBadge = document.getElementById('case-diff-badge');

    if (titleEl) {
      titleEl.textContent = this.getLangText(this.currentCase, 'title');
    }
    if (introEl) {
      introEl.textContent = this.getLangText(this.currentCase, 'intro');
    }
    if (diffBadge) {
      diffBadge.textContent = this.t(`diff_${this.currentCase.difficulty}`);
      diffBadge.className = `diff-badge ${this.currentCase.difficulty}`;
    }
  }

  renderClues() {
    const container = document.getElementById('clues-list-container');
    if (!container) return;

    container.innerHTML = '';
    this.currentCase.clues.forEach((clue, idx) => {
      const item = document.createElement('div');
      item.className = 'clue-card-item';
      if (this.struckClues.has(clue.id)) {
        item.classList.add('struck');
      }

      const text = this.getLangText(clue, 'text');
      item.innerHTML = `
        <span class="clue-number font-mono">#${idx + 1}</span>
        <span class="clue-content">${text}</span>
        <button class="clue-check-btn" title="Tachar pista deducida">
          ${this.struckClues.has(clue.id) ? '↩️' : '✔️'}
        </button>
      `;

      item.addEventListener('click', () => {
        if (this.struckClues.has(clue.id)) {
          this.struckClues.delete(clue.id);
        } else {
          this.struckClues.add(clue.id);
        }
        if (window.detectiveSound) window.detectiveSound.playClueStrike();
        this.renderClues();
      });

      container.appendChild(item);
    });
  }

  renderGrid() {
    const container = document.getElementById('logic-grid-container');
    if (!container || !this.engine) return;

    const categories = this.currentCase.categories;
    const cat0 = categories[0];
    const cat1 = categories[1];
    const cat2 = categories[2];

    // Generar tabla de matriz con colgroup para anchos idénticos y estrictos
    let html = '<table class="detective-logic-table">';
    html += '<colgroup>';
    html += '<col class="col-cat-v">';
    html += '<col class="col-sub-v">';
    cat1.items.forEach(() => { html += '<col class="col-grid-cell">'; });
    if (cat2) {
      cat2.items.forEach(() => { html += '<col class="col-grid-cell">'; });
    }
    html += '</colgroup>';
    html += '<thead><tr>';
    html += '<th class="empty-corner" colspan="2" rowspan="2"></th>';

    // Cabecera Categoría 1
    html += `<th class="cat-header cat-1" colspan="${cat1.items.length}">${this.getLangText(cat1, 'name')}</th>`;

    // Si hay Categoría 2
    if (cat2) {
      html += `<th class="cat-header cat-2" colspan="${cat2.items.length}">${this.getLangText(cat2, 'name')}</th>`;
    }
    html += '</tr><tr>';

    // Nombres elementos Categoría 1
    cat1.items.forEach((it, idx) => {
      const isBlockEnd = (idx === cat1.items.length - 1 && cat2);
      const borderClass = isBlockEnd ? 'block-border-right' : '';
      const name = this.getLangText(it, 'name');
      html += `<th class="sub-header cat-1-item ${borderClass}" title="${name}">
        <div class="sub-header-content">
          <span class="item-name">${name}</span>
          <span class="item-icon">${it.icon}</span>
        </div>
      </th>`;
    });

    // Nombres elementos Categoría 2
    if (cat2) {
      cat2.items.forEach(it => {
        const name = this.getLangText(it, 'name');
        html += `<th class="sub-header cat-2-item" title="${name}">
          <div class="sub-header-content">
            <span class="item-name">${name}</span>
            <span class="item-icon">${it.icon}</span>
          </div>
        </th>`;
      });
    }
    html += '</tr></thead><tbody>';

    // Bloque 1: Categoría 0 (filas) cruzada con Cat 1 y Cat 2
    cat0.items.forEach((it0, idx0) => {
      const isRowBlockEnd = (idx0 === cat0.items.length - 1 && cat2);
      const rowBorderClass = isRowBlockEnd ? 'block-border-bottom' : '';
      html += `<tr class="${rowBorderClass}">`;
      if (idx0 === 0) {
        html += `<th class="cat-header-v cat-0 ${rowBorderClass}" rowspan="${cat0.items.length}"><span>${this.getLangText(cat0, 'name')}</span></th>`;
      }
      html += `<th class="sub-header-v cat-0-item ${rowBorderClass}"><span class="item-icon">${it0.icon}</span><span>${this.getLangText(it0, 'name')}</span></th>`;

      // Celdas Cat0 x Cat1
      cat1.items.forEach((it1, idx1) => {
        const val = this.engine.getCellValue(cat0.id, it0.id, cat1.id, it1.id);
        const isColBlockEnd = (idx1 === cat1.items.length - 1 && cat2);
        let cellClass = '';
        if (isColBlockEnd) cellClass += ' block-border-right';
        if (isRowBlockEnd) cellClass += ' block-border-bottom';
        html += this.renderCellHtml(cat0.id, it0.id, cat1.id, it1.id, val, cellClass);
      });

      // Celdas Cat0 x Cat2
      if (cat2) {
        cat2.items.forEach(it2 => {
          const val = this.engine.getCellValue(cat0.id, it0.id, cat2.id, it2.id);
          let cellClass = isRowBlockEnd ? 'block-border-bottom' : '';
          html += this.renderCellHtml(cat0.id, it0.id, cat2.id, it2.id, val, cellClass);
        });
      }
      html += '</tr>';
    });

    // Bloque 2: Si hay 3 categorías, cruzar Cat 2 (filas) x Cat 1 (columnas) abajo
    if (cat2) {
      cat2.items.forEach((it2, idx2) => {
        html += '<tr>';
        if (idx2 === 0) {
          html += `<th class="cat-header-v cat-2" rowspan="${cat2.items.length}"><span>${this.getLangText(cat2, 'name')}</span></th>`;
        }
        html += `<th class="sub-header-v cat-2-item"><span class="item-icon">${it2.icon}</span><span>${this.getLangText(it2, 'name')}</span></th>`;

        // Celdas Cat2 x Cat1
        cat1.items.forEach((it1, idx1) => {
          const val = this.engine.getCellValue(cat2.id, it2.id, cat1.id, it1.id);
          const isColBlockEnd = (idx1 === cat1.items.length - 1);
          let cellClass = isColBlockEnd ? 'block-border-right' : '';
          html += this.renderCellHtml(cat2.id, it2.id, cat1.id, it1.id, val, cellClass);
        });


        // La esquina inferior derecha queda vacía
        if (idx2 === 0) {
          html += `<td class="empty-block" colspan="${cat2.items.length}" rowspan="${cat2.items.length}"></td>`;
        }
        html += '</tr>';
      });
    }

    html += '</tbody></table>';
    container.innerHTML = html;

    // Vincular eventos a las celdas
    container.querySelectorAll('.grid-cell').forEach(td => {
      td.addEventListener('click', (e) => {
        e.preventDefault();
        const catA = td.dataset.cata;
        const itemA = td.dataset.itema;
        const catB = td.dataset.catb;
        const itemB = td.dataset.itemb;

        const nextVal = this.engine.cycleCellValue(catA, itemA, catB, itemB);
        if (window.detectiveSound) {
          if (nextVal === 1) window.detectiveSound.playCross();
          else if (nextVal === 2) window.detectiveSound.playCheck();
        }

        this.renderGrid();
        this.renderSummaryNotebook();
      });

      td.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const catA = td.dataset.cata;
        const itemA = td.dataset.itema;
        const catB = td.dataset.catb;
        const itemB = td.dataset.itemb;

        // Clic derecho: fijar directamente ✔️ o limpiar si ya lo era
        const curr = this.engine.getCellValue(catA, itemA, catB, itemB);
        const nextVal = (curr === 2) ? 0 : 2;
        this.engine.setCellValue(catA, itemA, catB, itemB, nextVal);

        if (window.detectiveSound) {
          if (nextVal === 2) window.detectiveSound.playCheck();
        }

        this.renderGrid();
        this.renderSummaryNotebook();
      });
    });
  }

  renderCellHtml(catA, itemA, catB, itemB, val, extraClass = '') {
    let stateClass = 'cell-empty';
    let content = '';

    if (val === 1) {
      stateClass = 'cell-cross';
      content = '❌';
    } else if (val === 2) {
      stateClass = 'cell-check';
      content = '✔️';
    }

    return `<td class="grid-cell ${stateClass} ${extraClass}" data-cata="${catA}" data-itema="${itemA}" data-catb="${catB}" data-itemb="${itemB}"><span class="cell-symbol">${content}</span></td>`;
  }

  renderSummaryNotebook() {
    const container = document.getElementById('summary-notebook-table');
    if (!container || !this.engine) return;

    const categories = this.currentCase.categories;
    const cat0 = categories[0];
    const otherCats = categories.slice(1);

    let html = '<table class="summary-table"><thead><tr>';
    html += `<th>${this.getLangText(cat0, 'name')}</th>`;
    otherCats.forEach(cat => {
      html += `<th>${this.getLangText(cat, 'name')}</th>`;
    });
    html += '</tr></thead><tbody>';

    cat0.items.forEach(p => {
      html += '<tr>';
      html += `<td><strong>${p.icon} ${this.getLangText(p, 'name')}</strong></td>`;

      otherCats.forEach(cat => {
        // Buscar qué elemento de esta categoría está confirmado con ✔️
        let matched = null;
        cat.items.forEach(it => {
          if (this.engine.getCellValue(cat0.id, p.id, cat.id, it.id) === 2) {
            matched = it;
          }
        });

        if (matched) {
          html += `<td class="summary-matched">${matched.icon} ${this.getLangText(matched, 'name')}</td>`;
        } else {
          html += `<td class="summary-pending">---</td>`;
        }
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  }

  checkVerdict() {
    if (!this.engine || this.isSolved) return;

    const evalResult = this.engine.evaluateSolution();

    if (evalResult.completed) {
      this.isSolved = true;
      this.stopTimer();
      if (window.detectiveSound) window.detectiveSound.playVictoryMystery();

      // Calcular rango de honor de detective
      let rankKey = 'rank_sherlock';
      if (this.timerSeconds > 180) rankKey = 'rank_inspector';
      if (this.timerSeconds > 360) rankKey = 'rank_sleuth';
      if (evalResult.hasErrors) rankKey = 'rank_apprentice';

      document.getElementById('vic-rank-badge').textContent = `🕵️‍♂️ ${this.t(rankKey)}`;
      document.getElementById('vic-time-spent').textContent = `${this.timerSeconds}s`;

      this.openModal('modal-victory');
    } else if (evalResult.hasErrors) {
      if (window.detectiveSound) window.detectiveSound.playContradiction();
      this.showToast(this.t('toast_errors_found'), 'warning');
    } else {
      this.showToast(this.t('toast_incomplete'), 'info');
    }
  }

  resetGrid() {
    if (!this.engine) return;
    this.engine.resetGrid();
    this.struckClues.clear();
    this.renderGrid();
    this.renderClues();
    this.renderSummaryNotebook();
    this.showToast(this.t('toast_reset'), 'info');
  }

  openCasesModal() {
    const container = document.getElementById('cases-archive-list');
    const modal = document.getElementById('modal-cases');
    if (!container || !modal) return;

    container.innerHTML = '';

    this.cases.forEach((c, idx) => {
      const card = document.createElement('div');
      card.className = `case-select-card ${idx === this.currentCaseIndex ? 'active' : ''}`;
      card.innerHTML = `
        <div class="case-card-header">
          <strong>${this.t('case_label', { num: idx + 1 })}: ${this.getLangText(c, 'title')}</strong>
          <span class="diff-badge ${c.difficulty}">${this.t(`diff_${c.difficulty}`)}</span>
        </div>
        <p class="case-card-body">${this.getLangText(c, 'intro')}</p>
      `;

      card.addEventListener('click', () => {
        this.closeModal('modal-cases');
        this.loadCase(idx);
      });

      container.appendChild(card);
    });

    this.openModal('modal-cases');
  }

  toggleSound() {
    if (window.detectiveSound) {
      const active = window.detectiveSound.toggle();
      this.updateSoundIcon();
      this.showToast(active ? this.t('toast_sound_on') : this.t('toast_sound_off'), 'info');
    }
  }

  updateSoundIcon() {
    const icon = document.getElementById('sound-icon');
    if (icon && window.detectiveSound) {
      icon.textContent = window.detectiveSound.enabled ? '🔊' : '🔇';
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      if (window.detectiveSound) window.detectiveSound.playCheck();
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
    document.getElementById('btn-open-lang-modal')?.addEventListener('click', () => this.openModal('modal-language'));
    document.querySelectorAll('.lang-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.closeModal('modal-language');
        if (window.i18n) window.i18n.setLanguage(lang);
        this.renderCaseHeader();
        this.renderClues();
        this.renderGrid();
        this.renderSummaryNotebook();
        if (window.classicEnigmas) window.classicEnigmas.render();
        this.showToast(this.t('modal_lang_title'), 'info');
      });
    });

    // Modos de Juego (Matriz de Casos vs Enigmas Clásicos)
    document.getElementById('nav-btn-matrix')?.addEventListener('click', () => this.setMode('matrix'));
    document.getElementById('nav-btn-enigmas')?.addEventListener('click', () => this.setMode('enigmas'));

    document.getElementById('btn-open-cases')?.addEventListener('click', () => this.openCasesModal());
    document.getElementById('btn-check-verdict')?.addEventListener('click', () => this.checkVerdict());
    document.getElementById('btn-reset-grid')?.addEventListener('click', () => this.resetGrid());
    document.getElementById('btn-toggle-sound')?.addEventListener('click', () => this.toggleSound());
    document.getElementById('btn-open-rules')?.addEventListener('click', () => this.openModal('modal-rules'));

    document.getElementById('btn-next-case')?.addEventListener('click', () => {
      this.closeModal('modal-victory');
      const nextIdx = (this.currentCaseIndex + 1) % this.cases.length;
      this.loadCase(nextIdx);
    });

    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => this.closeAllModals());
    });
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeAllModals();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeAllModals();
    });
  }

  setMode(mode) {
    this.activeMode = mode;
    const btnMatrix = document.getElementById('nav-btn-matrix');
    const btnEnigmas = document.getElementById('nav-btn-enigmas');
    const viewMatrix = document.getElementById('view-matrix-mode');
    const viewEnigmas = document.getElementById('view-enigmas-mode');

    if (mode === 'matrix') {
      btnMatrix?.classList.add('active');
      btnEnigmas?.classList.remove('active');
      viewMatrix?.classList.remove('hidden-view');
      viewEnigmas?.classList.add('hidden-view');
    } else {
      btnEnigmas?.classList.add('active');
      btnMatrix?.classList.remove('active');
      viewEnigmas?.classList.remove('hidden-view');
      viewMatrix?.classList.add('hidden-view');
      if (window.classicEnigmas) {
        window.classicEnigmas.render();
      }
    }
    if (window.detectiveSound) window.detectiveSound.playCheck();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.detectiveApp = new DetectiveGameApp();
});
