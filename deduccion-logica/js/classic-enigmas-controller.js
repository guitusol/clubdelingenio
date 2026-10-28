/**
 * DEDUCCIÓN LÓGICA — Controlador del Salón de Enigmas Clásicos & Dilemas de la Mente
 * Motor interactivo con simuladores paso a paso y soporte en 9 idiomas.
 */

class ClassicEnigmasController {
  constructor() {
    this.enigmas = window.CLASSIC_ENIGMAS || [];
    this.currentEnigmaIndex = 0;
    this.selectedOptionId = null;
    this.hasAnswered = false;
    this.isProofRevealed = false;
    this.showOptions = false;

    // Estado de persistencia de enigmas resueltos
    this.solvedSet = new Set(this.loadSolvedEnigmas());

    // Estado del Simulador de Ojos Azules
    this.blueEyesSim = {
      k: 3,
      currentDay: 0,
      interval: null,
      logs: []
    };

    // Estado del Simulador de Monty Hall
    this.montySim = {
      carDoor: null,
      pickedDoor: null,
      openedDoor: null,
      gameState: 'pick', // 'pick', 'opened', 'revealed'
      stats: {
        switchWins: 0,
        switchTotal: 0,
        stayWins: 0,
        stayTotal: 0
      }
    };

    // Estado de los nuevos simuladores
    this.guardsSim = {
      truthGuard: 1, // 1 = Centinela 1 dice verdad, 2 = Centinela 2
      freedomDoor: 1, // 1 = Puerta 1 es libertad, 2 = Puerta 2
      askedGuard: 1,
      asked: false
    };

    this.monkSim = {
      minute: 360, // 06:00
      isPlaying: false,
      interval: null
    };

    this.fruitSim = {
      extracted: false,
      fruit: 'apple' // 'apple' or 'orange'
    };

    this.pwdSim = {
      currentNumber: 6
    };

    this.seqSim = {
      currentNumber: 1001,
      showBonus: false
    };

    this.hatsSim = {
      step: 0,
      config: 'classic' // 'classic' (A=Negro, B=Negro, C=Blanco)
    };
  }

  numberToSpanishWords(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return '';
    const units = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
      'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte',
      'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve', 'treinta'];
    if (n >= 0 && n <= 30) return units[n];
    const tens = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    if (n < 100) {
      const t = Math.floor(n / 10);
      const rem = n % 10;
      return rem === 0 ? tens[t] : `${tens[t]} y ${units[rem]}`;
    }
    if (n === 100) return 'cien';
    if (n < 200) return `ciento ${this.numberToSpanishWords(n - 100)}`;
    if (n === 1000) return 'mil';
    if (n > 1000 && n < 2000) return `mil ${this.numberToSpanishWords(n - 1000)}`;
    if (n === 2000) return 'dos mil';
    return String(n);
  }

  loadSolvedEnigmas() {
    try {
      const data = localStorage.getItem('club_enigmas_solved_v1');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveSolvedEnigmas() {
    try {
      localStorage.setItem('club_enigmas_solved_v1', JSON.stringify([...this.solvedSet]));
    } catch (e) {}
  }

  getLang() {
    return window.i18n ? window.i18n.currentLang : 'es';
  }

  getText(obj, prefix) {
    if (!obj) return '';
    const lang = this.getLang();
    if (obj[`${prefix}_${lang}`]) return obj[`${prefix}_${lang}`];
    if (lang === 'va' && obj[`${prefix}_ca`]) return obj[`${prefix}_ca`];
    if (lang === 'ca' && obj[`${prefix}_va`]) return obj[`${prefix}_va`];
    if (obj[`${prefix}_en`]) return obj[`${prefix}_en`];
    if (obj[`${prefix}_es`]) return obj[`${prefix}_es`];
    return obj[prefix] || '';
  }

  t(key, params = {}) {
    return window.i18n ? window.i18n.t(key, params) : key;
  }

  init() {
    this.render();
  }

  selectEnigma(index) {
    if (index < 0 || index >= this.enigmas.length) index = 0;
    this.currentEnigmaIndex = index;
    this.selectedOptionId = null;
    this.hasAnswered = false;
    const isSolved = this.solvedSet.has(this.enigmas[index].id);
    this.showOptions = isSolved;
    this.isProofRevealed = isSolved;
    this.render();

    const container = document.getElementById('classic-enigma-detail-card');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  render() {
    const listContainer = document.getElementById('classic-enigmas-list');
    const detailContainer = document.getElementById('classic-enigma-detail-card');
    if (!listContainer || !detailContainer) return;

    this.renderEnigmasList(listContainer);
    this.renderEnigmaDetail(detailContainer);
  }

  renderEnigmasList(container) {
    const curIndex = this.currentEnigmaIndex;

    container.innerHTML = this.enigmas.map((enigma, idx) => {
      const isSelected = idx === curIndex;
      const isSolved = this.solvedSet.has(enigma.id);
      const title = this.getText(enigma, 'title');
      const badge = this.getText(enigma, 'badge');

      return `
        <div class="enigma-selector-item ${isSelected ? 'active' : ''} ${isSolved ? 'solved' : ''}" data-index="${idx}">
          <div class="enigma-item-icon">${enigma.icon}</div>
          <div class="enigma-item-info">
            <span class="enigma-item-badge">${badge}</span>
            <strong class="enigma-item-title">${title}</strong>
          </div>
          <div class="enigma-item-status">
            ${isSolved ? '<span class="status-check" title="Resuelto">✅</span>' : '<span class="status-lock">🔓</span>'}
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.enigma-selector-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        this.selectEnigma(idx);
      });
    });
  }

  renderEnigmaDetail(container) {
    const enigma = this.enigmas[this.currentEnigmaIndex];
    if (!enigma) return;

    const isSolved = this.solvedSet.has(enigma.id);
    const badge = this.getText(enigma, 'badge');
    const title = this.getText(enigma, 'title');
    const subtitle = this.getText(enigma, 'subtitle');
    const story = this.getText(enigma, 'story');
    const question = this.getText(enigma, 'question');
    const curiosity = this.getText(enigma, 'curiosity');

    // Formatear párrafos de la historia
    const storyHtml = story.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');

    // Opciones
    const optionsHtml = enigma.options.map(opt => {
      const isSelected = this.selectedOptionId === opt.id;
      let stateClass = '';
      if (this.hasAnswered) {
        if (opt.isCorrect) stateClass = 'correct-opt';
        else if (isSelected && !opt.isCorrect) stateClass = 'incorrect-opt';
      } else if (isSelected) {
        stateClass = 'selected-opt';
      }

      const text = this.getText(opt, 'text');
      return `
        <button class="enigma-option-btn ${stateClass}" data-opt-id="${opt.id}" ${this.hasAnswered && opt.isCorrect ? '' : ''}>
          <span class="option-bullet">${opt.id.toUpperCase().replace('OPT_', '')}</span>
          <span class="option-text">${text}</span>
        </button>
      `;
    }).join('');

    // Banner de solución si está resuelto o revelado
    const proofHtml = (this.isProofRevealed || isSolved) ? `
      <div class="enigma-proof-card show-proof">
        <div class="proof-header">
          <span class="proof-icon">💡</span>
          <h4>${this.getText(enigma, 'solution_title')}</h4>
        </div>
        <div class="proof-body">
          ${this.getText(enigma, 'solution_explanation')}
          ${curiosity ? `
            <div class="curiosity-box">
              <strong>${this.t('lbl_historical_note')}</strong>
              <p>${curiosity}</p>
            </div>
          ` : ''}
        </div>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="enigma-card-header">
        <div class="enigma-badge-group">
          <span class="enigma-pill-badge">${badge}</span>
          ${isSolved ? `<span class="enigma-pill-solved">🏆 ${this.t('lbl_enigma_solved_banner')}</span>` : ''}
        </div>
        <h2 class="enigma-main-title">${enigma.icon} ${title}</h2>
        <p class="enigma-main-subtitle">${subtitle}</p>
      </div>

      <!-- Relato del Enigma -->
      <div class="enigma-story-narrative">
        <div class="narrative-content">
          ${storyHtml}
        </div>
      </div>

      <!-- El Desafío / Pregunta -->
      <div class="enigma-challenge-box">
        <h3 class="challenge-question">❓ ${question}</h3>

        ${(!this.showOptions && !isSolved) ? `
          <div class="enigma-thinking-card">
            <div class="thinking-header">
              <span class="thinking-icon">🤔</span>
              <div class="thinking-texts">
                <h4>${this.t('lbl_think_title')}</h4>
                <p>${this.t('lbl_think_desc')}</p>
              </div>
            </div>
            <div class="thinking-actions">
              <button id="btn-show-options" class="btn-enigma-primary">
                <span>🎯</span> ${this.t('btn_show_options')}
              </button>
              <button id="btn-reveal-proof-action" class="btn-enigma-secondary">
                <span>💡</span> ${this.t('btn_reveal_enigma')}
              </button>
            </div>
          </div>
        ` : `
          <div class="enigma-options-grid" id="enigma-options-container">
            ${optionsHtml}
          </div>

          <div class="enigma-actions-bar">
            <button id="btn-check-enigma-action" class="btn-enigma-primary" ${!this.selectedOptionId || this.hasAnswered ? 'disabled' : ''}>
              <span>🔍</span> ${this.t('btn_check_enigma')}
            </button>
            
            <button id="btn-reveal-proof-action" class="btn-enigma-secondary">
              <span>💡</span> ${this.isProofRevealed ? this.t('btn_reveal_enigma') : this.t('btn_reveal_enigma')}
            </button>

            ${!isSolved ? `
              <button id="btn-hide-options" class="btn-enigma-reset">
                <span>🙈</span> ${this.t('btn_hide_options')}
              </button>
            ` : ''}

            ${this.hasAnswered ? `
              <button id="btn-retry-enigma" class="btn-enigma-reset">
                <span>🔄</span> ${this.t('btn_try_again')}
              </button>
            ` : ''}
          </div>
        `}

        <div id="enigma-feedback-slot"></div>
      </div>

      <!-- Demostración Matemática & Epistémica -->
      ${proofHtml}

      <!-- Laboratorio Interactivo / Simulador del Enigma -->
      <div class="enigma-interactive-lab-section">
        <div class="lab-header">
          <span class="lab-icon">⚡</span>
          <h3>${this.t('btn_open_simulator')} (${title})</h3>
        </div>
        <div id="enigma-simulator-mount" class="lab-mount-box"></div>
      </div>
    `;

    // Vincular Eventos
    this.bindDetailEvents(enigma);
    this.mountSimulator(enigma);
  }

  bindDetailEvents(enigma) {
    // Selección de opciones
    const optBtns = document.querySelectorAll('.enigma-option-btn');
    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.hasAnswered && this.solvedSet.has(enigma.id)) return;
        this.selectedOptionId = btn.getAttribute('data-opt-id');
        this.renderEnigmaDetail(document.getElementById('classic-enigma-detail-card'));
      });
    });

    // Botón Comprobar
    const checkBtn = document.getElementById('btn-check-enigma-action');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        this.handleCheckAnswer(enigma);
      });
    }

    // Botón Desvelar Demostración
    const revealBtn = document.getElementById('btn-reveal-proof-action');
    if (revealBtn) {
      revealBtn.addEventListener('click', () => {
        this.isProofRevealed = !this.isProofRevealed;
        this.render();
      });
    }

    // Botón Mostrar Opciones
    const showOptBtn = document.getElementById('btn-show-options');
    if (showOptBtn) {
      showOptBtn.addEventListener('click', () => {
        this.showOptions = true;
        this.renderEnigmaDetail(document.getElementById('classic-enigma-detail-card'));
      });
    }

    // Botón Ocultar Opciones
    const hideOptBtn = document.getElementById('btn-hide-options');
    if (hideOptBtn) {
      hideOptBtn.addEventListener('click', () => {
        this.showOptions = false;
        this.selectedOptionId = null;
        this.hasAnswered = false;
        this.renderEnigmaDetail(document.getElementById('classic-enigma-detail-card'));
      });
    }

    // Botón Reintentar
    const retryBtn = document.getElementById('btn-retry-enigma');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.hasAnswered = false;
        this.selectedOptionId = null;
        this.renderEnigmaDetail(document.getElementById('classic-enigma-detail-card'));
      });
    }
  }

  handleCheckAnswer(enigma) {
    if (!this.selectedOptionId) return;

    const opt = enigma.options.find(o => o.id === this.selectedOptionId);
    if (!opt) return;

    this.hasAnswered = true;
    const feedbackSlot = document.getElementById('enigma-feedback-slot');

    if (opt.isCorrect) {
      // Correcto!
      this.solvedSet.add(enigma.id);
      this.saveSolvedEnigmas();
      this.isProofRevealed = true;

      if (window.gameAudio && typeof window.gameAudio.playVictory === 'function') {
        window.gameAudio.playVictory();
      }

      if (feedbackSlot) {
        feedbackSlot.innerHTML = `
          <div class="feedback-toast success">
            <span class="fb-icon">🎉</span>
            <div>
              <strong>¡Razonamiento Impecable!</strong>
              <p>${this.getText(opt, 'feedback')}</p>
            </div>
          </div>
        `;
      }

      setTimeout(() => {
        this.render();
      }, 700);

    } else {
      // Incorrecto
      if (window.gameAudio && typeof window.gameAudio.playClue === 'function') {
        window.gameAudio.playClue();
      }

      if (feedbackSlot) {
        feedbackSlot.innerHTML = `
          <div class="feedback-toast error">
            <span class="fb-icon">🤔</span>
            <div>
              <strong>Revisa tu deducción:</strong>
              <p>${this.getText(opt, 'feedback')}</p>
            </div>
          </div>
        `;
      }
    }
  }

  // =========================================================================
  // SIMULADORES INTERACTIVOS
  // =========================================================================
  mountSimulator(enigma) {
    const mount = document.getElementById('enigma-simulator-mount');
    if (!mount) return;

    if (enigma.id === 'ojos_azules') {
      this.mountBlueEyesSimulator(mount);
    } else if (enigma.id === 'puerta_infernal') {
      this.mountGuardsSimulator(mount);
    } else if (enigma.id === 'camino_monje') {
      this.mountMonkSimulator(mount);
    } else if (enigma.id === 'cajas_frutas') {
      this.mountFruitBoxesSimulator(mount);
    } else if (enigma.id === 'contrasena_policial') {
      this.mountPasswordWordsSimulator(mount);
    } else if (enigma.id === 'sucesion_dificil') {
      this.mountSequenceLetterSimulator(mount);
    } else if (enigma.id === 'tres_sombreros' || enigma.id === 'tres_sabios') {
      this.mountThreeHatsSimulator(mount);
    } else if (enigma.id === 'monty_hall') {
      this.mountMontyHallSimulator(mount);
    } else if (enigma.id === 'cien_prisioneros') {
      this.mountPrisonersSimulator(mount);
    }
  }

  // --- SIMULADOR 1: ISLA DE LOS OJOS AZULES ---
  mountBlueEyesSimulator(mount) {
    const k = this.blueEyesSim.k;
    const currentDay = this.blueEyesSim.currentDay;

    mount.innerHTML = `
      <div class="sim-blue-eyes-panel">
        <div class="sim-controls-row">
          <label><strong>${this.t('sim_k_label')}</strong></label>
          <div class="sim-k-buttons">
            ${[1, 2, 3, 4, 5, 10].map(n => `
              <button class="k-btn ${n === k ? 'active' : ''}" data-k="${n}">${n}</button>
            `).join('')}
          </div>
          <div class="sim-actions-group">
            <button id="btn-sim-next-day" class="btn-sim-action">
              <span>🌅</span> ${this.t('sim_step_next')}
            </button>
            <button id="btn-sim-reset-island" class="btn-sim-action-sub">
              <span>🔄</span> ${this.t('sim_reset')}
            </button>
          </div>
        </div>

        <div class="sim-status-banner">
          <div class="day-counter">
            <span class="lbl-day">CRONOLOGÍA:</span>
            <strong class="val-day">Día ${currentDay} ${currentDay === 0 ? '(Desembarco del Forastero)' : '— 8:00 AM'}</strong>
          </div>
          <div class="island-summary">
            <span>🔵 ${k} de Ojos Azules</span> • <span>🟤 ${100 - k} de Ojos Marrones</span>
          </div>
        </div>

        <!-- Representación visual de los habitantes -->
        <div class="islanders-visual-grid" id="islanders-container">
          ${this.renderIslandersHtml(k, currentDay)}
        </div>

        <!-- Registro de eventos de deducción en vivo -->
        <div class="sim-live-log" id="sim-blue-eyes-log">
          ${this.renderBlueEyesLog(k, currentDay)}
        </div>
      </div>
    `;

    // Eventos
    mount.querySelectorAll('.k-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.blueEyesSim.k = parseInt(btn.getAttribute('data-k'), 10);
        this.blueEyesSim.currentDay = 0;
        this.mountBlueEyesSimulator(mount);
      });
    });

    const nextBtn = document.getElementById('btn-sim-next-day');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.blueEyesSim.currentDay < this.blueEyesSim.k) {
          this.blueEyesSim.currentDay++;
          this.mountBlueEyesSimulator(mount);
        }
      });
    }

    const resetBtn = document.getElementById('btn-sim-reset-island');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.blueEyesSim.currentDay = 0;
        this.mountBlueEyesSimulator(mount);
      });
    }
  }

  renderIslandersHtml(k, currentDay) {
    const isDeparted = currentDay >= k;
    let html = '';

    for (let i = 1; i <= k; i++) {
      html += `
        <div class="islander-avatar blue-eyed ${isDeparted ? 'departed' : ''}">
          <div class="avatar-face">${isDeparted ? '⛵' : '👤'}</div>
          <div class="avatar-eyes">👀 Azul #${i}</div>
          <div class="avatar-status">${isDeparted ? '¡Ha zarpado!' : 'Observando...'}</div>
        </div>
      `;
    }

    const sampleBrown = Math.min(6, 100 - k);
    for (let j = 1; j <= sampleBrown; j++) {
      html += `
        <div class="islander-avatar brown-eyed">
          <div class="avatar-face">👤</div>
          <div class="avatar-eyes">👀 Marrón #${j}</div>
          <div class="avatar-status">En la isla</div>
        </div>
      `;
    }

    if (100 - k > sampleBrown) {
      html += `<div class="islander-more">+ ${100 - k - sampleBrown} marrones más...</div>`;
    }

    return html;
  }

  renderBlueEyesLog(k, currentDay) {
    if (currentDay === 0) {
      return `
        <div class="log-entry highlight">
          <strong>📢 Día 0: El forastero proclama públicamente ante todos:</strong>
          <p>«¡Veo al menos una persona con ojos azules en esta isla!»</p>
          <small>El dato ahora es Conocimiento Común de orden 1.</small>
        </div>
      `;
    }

    let logs = [];
    for (let d = 1; d <= currentDay; d++) {
      if (d < k) {
        logs.push(`
          <div class="log-entry">
            <strong>🌅 Día ${d} a las 8:00 AM:</strong>
            <p>Nadie abandona la isla. Cada isleño de ojos azules ve a ${k - 1} personas de ojos azules y piensa: <em>«Si yo no tuviera ojos azules, ellos verían solo ${k - 2} y se habrían ido el día ${k - 1}»</em>. Por tanto, esperan en silencio.</p>
          </div>
        `);
      } else if (d === k) {
        logs.push(`
          <div class="log-entry climax">
            <strong>⛵ DÍA ${k} a las 8:00 AM — ¡EL EFECTO DOMINÓ SE DESATA!</strong>
            <p>¡Nadie se marchó el Día ${k - 1}! Al ver que nadie zarpó, los ${k} habitantes de ojos azules comprenden simultáneamente: <em>«¡Si no se marcharon en el día ${k - 1}, es porque yo también tengo ojos azules!»</em>.</p>
            <p class="climax-alert">🎉 <strong>LOS ${k} HABITANTES DE OJOS AZULES EMBARCAN JUNTOS EN EL RITUAL DE LAS 8:00 AM Y ABANDONAN LA ISLA.</strong></p>
          </div>
        `);
      }
    }
    return logs.reverse().join('');
  }

  // --- SIMULADOR 2: MONTY HALL ---
  mountMontyHallSimulator(mount) {
    const s = this.montySim;
    if (s.gameState === 'pick') {
      s.carDoor = Math.floor(Math.random() * 3) + 1;
      s.pickedDoor = null;
      s.openedDoor = null;
    }

    mount.innerHTML = `
      <div class="sim-monty-panel">
        <div class="monty-instruction">
          ${s.gameState === 'pick' ? '👉 <strong>Paso 1:</strong> Elige una de las 3 puertas:' : ''}
          ${s.gameState === 'opened' ? `👉 <strong>Paso 2:</strong> Has elegido la Puerta ${s.pickedDoor}. Monty abre la <strong>Puerta ${s.openedDoor}</strong> (Cabra 🐐). ¿Deseas quedarte o cambiar?` : ''}
          ${s.gameState === 'revealed' ? `🎉 <strong>Resultado:</strong> El coche 🚗 estaba en la <strong>Puerta ${s.carDoor}</strong>.` : ''}
        </div>

        <div class="monty-doors-row">
          ${[1, 2, 3].map(num => {
            let doorContent = '🚪';
            let doorClass = '';

            if (s.pickedDoor === num) doorClass += ' picked';
            if (s.openedDoor === num) {
              doorClass += ' opened goat';
              doorContent = '🐐';
            }
            if (s.gameState === 'revealed') {
              doorClass += ' revealed';
              doorContent = (num === s.carDoor) ? '🚗' : '🐐';
              if (num === s.carDoor) doorClass += ' car-door';
            }

            return `
              <div class="monty-door-card ${doorClass}" data-door="${num}">
                <div class="door-frame">
                  <span class="door-num">Puerta ${num}</span>
                  <div class="door-icon">${doorContent}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Botones de decisión en Monty -->
        <div class="monty-controls">
          ${s.gameState === 'opened' ? `
            <button id="btn-monty-stay" class="btn-monty stay">Quedarme con Puerta ${s.pickedDoor}</button>
            <button id="btn-monty-switch" class="btn-monty switch">Cambiar a la otra Puerta</button>
          ` : ''}
          ${s.gameState === 'revealed' ? `
            <button id="btn-monty-again" class="btn-monty again">Jugar Otra Ronda</button>
          ` : ''}
        </div>

        <!-- Estadísticas en vivo -->
        <div class="monty-stats-bar">
          <div class="stat-pill">
            <span>Estrategia Cambiar:</span>
            <strong>${s.stats.switchTotal > 0 ? ((s.stats.switchWins / s.stats.switchTotal) * 100).toFixed(1) : 0}%</strong>
            <small>(${s.stats.switchWins}/${s.stats.switchTotal})</small>
          </div>
          <div class="stat-pill">
            <span>Estrategia Quedarse:</span>
            <strong>${s.stats.stayTotal > 0 ? ((s.stats.stayWins / s.stats.stayTotal) * 100).toFixed(1) : 0}%</strong>
            <small>(${s.stats.stayWins}/${s.stats.stayTotal})</small>
          </div>
        </div>
      </div>
    `;

    // Eventos puertas
    if (s.gameState === 'pick') {
      mount.querySelectorAll('.monty-door-card').forEach(card => {
        card.addEventListener('click', () => {
          const picked = parseInt(card.getAttribute('data-door'), 10);
          s.pickedDoor = picked;

          // Monty abre una puerta con cabra que no sea picked ni carDoor
          const possibleDoors = [1, 2, 3].filter(d => d !== picked && d !== s.carDoor);
          s.openedDoor = possibleDoors[Math.floor(Math.random() * possibleDoors.length)];
          s.gameState = 'opened';
          this.mountMontyHallSimulator(mount);
        });
      });
    }

    const stayBtn = document.getElementById('btn-monty-stay');
    if (stayBtn) {
      stayBtn.addEventListener('click', () => {
        s.gameState = 'revealed';
        s.stats.stayTotal++;
        if (s.pickedDoor === s.carDoor) s.stats.stayWins++;
        this.mountMontyHallSimulator(mount);
      });
    }

    const switchBtn = document.getElementById('btn-monty-switch');
    if (switchBtn) {
      switchBtn.addEventListener('click', () => {
        const remaining = [1, 2, 3].find(d => d !== s.pickedDoor && d !== s.openedDoor);
        s.pickedDoor = remaining;
        s.gameState = 'revealed';
        s.stats.switchTotal++;
        if (s.pickedDoor === s.carDoor) s.stats.switchWins++;
        this.mountMontyHallSimulator(mount);
      });
    }

    const againBtn = document.getElementById('btn-monty-again');
    if (againBtn) {
      againBtn.addEventListener('click', () => {
        s.gameState = 'pick';
        this.mountMontyHallSimulator(mount);
      });
    }
  }

  // --- SIMULADOR 2: LA PUERTA INFERNAL Y LOS DOS CENTINELAS ---
  mountGuardsSimulator(mount) {
    const s = this.guardsSim;
    const guard1IsTruth = s.truthGuard === 1;
    const guard2IsTruth = s.truthGuard === 2;
    const door1IsFreedom = s.freedomDoor === 1;

    // Regla lógica: el centinela interrogado predice lo que el compañero diría.
    // (+ * - = -): Siempre señalan la puerta de la muerte.
    const deathDoor = door1IsFreedom ? 2 : 1;
    const safeDoor = door1IsFreedom ? 1 : 2;

    mount.innerHTML = `
      <div class="sim-guards-panel">
        <div class="guards-scenario-box">
          <div class="guards-doors-row">
            <div class="sim-door ${door1IsFreedom ? 'door-freedom' : 'door-death'}">
              <span class="sim-door-num">Puerta 1</span>
              <div class="sim-door-icon">${door1IsFreedom ? '✨ 🚪' : '💀 🚪'}</div>
              <span class="sim-door-role">${door1IsFreedom ? 'Libertad' : 'Muerte'}</span>
            </div>
            <div class="sim-door ${door1IsFreedom ? 'door-death' : 'door-freedom'}">
              <span class="sim-door-num">Puerta 2</span>
              <div class="sim-door-icon">${door1IsFreedom ? '💀 🚪' : '✨ 🚪'}</div>
              <span class="sim-door-role">${door1IsFreedom ? 'Muerte' : 'Libertad'}</span>
            </div>
          </div>

          <div class="guards-sentinels-row">
            <div class="sentinel-card ${s.askedGuard === 1 ? 'selected' : ''}">
              <div class="sentinel-avatar">🛡️ Centinela 1</div>
              <div class="sentinel-badge">${guard1IsTruth ? '😇 Dice la Verdad' : '😈 Siempre Miente'}</div>
              <button class="btn-ask-guard" data-guard="1">
                ${s.askedGuard === 1 && s.asked ? 'Interrogado' : 'Interrogar al Centinela 1'}
              </button>
            </div>

            <div class="sentinel-card ${s.askedGuard === 2 ? 'selected' : ''}">
              <div class="sentinel-avatar">🛡️ Centinela 2</div>
              <div class="sentinel-badge">${guard2IsTruth ? '😇 Dice la Verdad' : '😈 Siempre Miente'}</div>
              <button class="btn-ask-guard" data-guard="2">
                ${s.askedGuard === 2 && s.asked ? 'Interrogado' : 'Interrogar al Centinela 2'}
              </button>
            </div>
          </div>
        </div>

        <div class="guards-interactive-action">
          <div class="question-banner">
            <span>❓ Tu Pregunta:</span>
            <strong>«¿Qué me diría tu compañero si le pregunto cuál es la puerta segura?»</strong>
          </div>

          ${s.asked ? `
            <div class="guards-dialogue-bubble">
              <div class="bubble-icon">🗣️</div>
              <div class="bubble-text">
                <p>El Centinela ${s.askedGuard} responde sin dudar:</p>
                <blockquote class="guard-quote">
                  «Mi compañero te diría que la puerta segura es la <strong>Puerta ${deathDoor}</strong>.»
                </blockquote>
              </div>
            </div>

            <div class="guards-deduction-steps">
              <div class="deduction-formula">
                <span class="badge-truth">${s.askedGuard === s.truthGuard ? 'Veraz (+)' : 'Mentiroso (-)'}</span>
                <span class="math-op">×</span>
                <span class="badge-lie">${s.askedGuard === s.truthGuard ? 'Mentiroso (-)' : 'Veraz (+)'}</span>
                <span class="math-op">=</span>
                <span class="badge-result">Negación Inevitable (-)</span>
              </div>
              <p class="conclusion-banner">
                🎯 <strong>Deducción Inmediata:</strong> Como la respuesta siempre señala la <strong>Puerta ${deathDoor} (Muerte)</strong>, tú debes abrir la <strong>Puerta ${safeDoor} (¡Libertad Garantizada ✨!)</strong>.
              </p>
            </div>
          ` : `
            <p class="guards-hint-prompt">Haz clic en uno de los dos centinelas para interrogarlo y observar la inversión lógica.</p>
          `}

          <div class="guards-tools-row">
            <button id="btn-shuffle-guards" class="btn-sim-action-sub">
              <span>🎲</span> Reconfigurar Roles y Puertas al Azar
            </button>
          </div>
        </div>
      </div>
    `;

    mount.querySelectorAll('.btn-ask-guard').forEach(btn => {
      btn.addEventListener('click', () => {
        s.askedGuard = parseInt(btn.getAttribute('data-guard'), 10);
        s.asked = true;
        this.mountGuardsSimulator(mount);
      });
    });

    const shuffleBtn = document.getElementById('btn-shuffle-guards');
    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => {
        s.truthGuard = Math.random() < 0.5 ? 1 : 2;
        s.freedomDoor = Math.random() < 0.5 ? 1 : 2;
        s.asked = false;
        this.mountGuardsSimulator(mount);
      });
    }
  }

  // --- SIMULADOR 3: EL CAMINO DEL MONJE EN LA MONTAÑA ---
  mountMonkSimulator(mount) {
    const s = this.monkSim;
    const curMin = s.minute; // 360 a 1080 (06:00 a 18:00)
    const hours = Math.floor(curMin / 60);
    const mins = curMin % 60;
    const timeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;

    // Posición del Monje 1 (Subida día 1 de 0m a 1000m)
    const getAscentElevation = (m) => {
      const t = (m - 360) / 720;
      if (t <= 0) return 0;
      if (t >= 1) return 1000;
      return Math.round(1000 * (0.5 * Math.sin((t - 0.5) * Math.PI) + 0.5));
    };

    // Posición del Monje 2 (Bajada día 2 de 1000m a 0m)
    const getDescentElevation = (m) => {
      const t = (m - 360) / 720;
      if (t <= 0) return 1000;
      if (t >= 1) return 0;
      return Math.round(1000 * (1 - (0.5 * Math.sin((t - 0.5) * Math.PI) + 0.5)));
    };

    const elev1 = getAscentElevation(curMin);
    const elev2 = getDescentElevation(curMin);
    const isCrossing = Math.abs(elev1 - elev2) <= 35 || curMin === 720;

    mount.innerHTML = `
      <div class="sim-monk-panel">
        <div class="monk-header-status">
          <div class="time-display">
            <span class="clock-icon">⏰</span>
            <span class="clock-label">Hora del Reloj:</span>
            <strong class="clock-val">${timeStr}</strong>
          </div>
          <div class="monk-elevations-summary">
            <span class="pill-monk-up">🔵 Día 1 (Subida): <strong>${elev1}m</strong></span>
            <span class="pill-monk-down">🟠 Día 2 (Bajada): <strong>${elev2}m</strong></span>
          </div>
        </div>

        <div class="mountain-visual-stage">
          <div class="mountain-summit">⛩️ Santuario (Cima: 1000m)</div>
          <div class="mountain-trail-line">
            <div class="monk-marker ascent" style="bottom: ${(elev1 / 10).toFixed(1)}%;">
              <span class="marker-bubble">🧘‍♂️ Día 1 (${elev1}m)</span>
            </div>
            <div class="monk-marker descent" style="bottom: ${(elev2 / 10).toFixed(1)}%;">
              <span class="marker-bubble">🧘‍♂️ Día 2 (${elev2}m)</span>
            </div>
          </div>
          <div class="mountain-base">🏯 Monasterio (Valle: 0m)</div>
        </div>

        ${isCrossing ? `
          <div class="crossing-alert-banner">
            <span class="alert-icon">✨</span>
            <div>
              <strong>¡MOMENTO EXACTO DE COINCIDENCIA! (${timeStr})</strong>
              <p>A esta hora exacta, tanto en la subida como en la bajada, el monje pisó exactamente el mismo punto de la montaña (cota ~500m). Dos funciones continuas opuestas se cortan obligatoriamente por el <strong>Teorema de Bolzano</strong>.</p>
            </div>
          </div>
        ` : ''}

        <div class="monk-controls-bar">
          <div class="slider-group">
            <label for="monk-timeline">06:00 (Amanecer)</label>
            <input type="range" id="monk-timeline" min="360" max="1080" step="5" value="${curMin}">
            <label for="monk-timeline">18:00 (Atardecer)</label>
          </div>

          <div class="monk-buttons-group">
            <button id="btn-toggle-monk-play" class="btn-sim-action">
              <span>${s.isPlaying ? '⏸' : '▶'}</span> ${s.isPlaying ? 'Pausar' : 'Simular Jornada'}
            </button>
            <button id="btn-jump-crossing" class="btn-sim-action-sub">
              <span>🎯</span> Ir al Instante del Cruce
            </button>
          </div>
        </div>
      </div>
    `;

    const slider = document.getElementById('monk-timeline');
    if (slider) {
      slider.addEventListener('input', (e) => {
        s.minute = parseInt(e.target.value, 10);
        this.mountMonkSimulator(mount);
      });
    }

    const playBtn = document.getElementById('btn-toggle-monk-play');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (s.isPlaying) {
          clearInterval(s.interval);
          s.isPlaying = false;
          this.mountMonkSimulator(mount);
        } else {
          s.isPlaying = true;
          if (s.minute >= 1080) s.minute = 360;
          s.interval = setInterval(() => {
            if (s.minute < 1080) {
              s.minute += 10;
              this.mountMonkSimulator(mount);
            } else {
              clearInterval(s.interval);
              s.isPlaying = false;
              this.mountMonkSimulator(mount);
            }
          }, 120);
        }
      });
    }

    const jumpBtn = document.getElementById('btn-jump-crossing');
    if (jumpBtn) {
      jumpBtn.addEventListener('click', () => {
        if (s.isPlaying) {
          clearInterval(s.interval);
          s.isPlaying = false;
        }
        s.minute = 720; // 12:00
        this.mountMonkSimulator(mount);
      });
    }
  }

  // --- SIMULADOR 4: LAS TRES CAJAS DE FRUTA MAL ETIQUETADAS ---
  mountFruitBoxesSimulator(mount) {
    const s = this.fruitSim;
    const drawnFruitIcon = s.fruit === 'apple' ? '🍎' : '🍊';
    const drawnFruitName = s.fruit === 'apple' ? 'Manzana' : 'Naranja';
    const otherFruitIcon = s.fruit === 'apple' ? '🍊' : '🍎';
    const otherFruitName = s.fruit === 'apple' ? 'Naranjas' : 'Manzanas';

    mount.innerHTML = `
      <div class="sim-fruit-panel">
        <div class="fruit-intro-banner">
          <span>⚠️ <strong>Dato Clave del Enigma:</strong></span>
          <p>Las tres cajas están <em>mal etiquetadas</em>. Por tanto, la caja con la etiqueta «Manzanas y Naranjas» <strong>NUNCA</strong> contiene la mezcla.</p>
        </div>

        <div class="fruit-boxes-row">
          <div class="fruit-box-card ${s.extracted ? 'revealed' : ''}">
            <div class="box-tag">Etiqueta: «Manzanas» 🍎</div>
            <div class="box-visual">📦</div>
            <div class="box-content-reveal">
              ${s.extracted ? `
                <div class="content-tag mix">
                  <span>¡Contenido Real:</span>
                  <strong>${s.fruit === 'apple' ? 'Mezcla 🍎🍊' : 'Solo Manzanas 🍎'}</strong>
                </div>
              ` : '<span class="status-hidden">Contenido Oculto</span>'}
            </div>
          </div>

          <div class="fruit-box-card ${s.extracted ? 'revealed' : ''}">
            <div class="box-tag">Etiqueta: «Naranjas» 🍊</div>
            <div class="box-visual">📦</div>
            <div class="box-content-reveal">
              ${s.extracted ? `
                <div class="content-tag">
                  <span>¡Contenido Real:</span>
                  <strong>${s.fruit === 'apple' ? 'Solo Naranjas 🍊' : 'Mezcla 🍎🍊'}</strong>
                </div>
              ` : '<span class="status-hidden">Contenido Oculto</span>'}
            </div>
          </div>

          <div class="fruit-box-card key-box ${s.extracted ? 'extracted' : ''}">
            <div class="box-tag key-tag">Etiqueta: «Manzanas y Naranjas» 🍎🍊</div>
            <div class="box-visual">🎁</div>
            <div class="box-action-slot">
              ${!s.extracted ? `
                <button id="btn-draw-fruit" class="btn-draw-fruit-action">
                  <span>🖐️</span> Extraer 1 Fruta de Aquí
                </button>
              ` : `
                <div class="drawn-fruit-display">
                  <span class="drawn-icon">${drawnFruitIcon}</span>
                  <strong>Extraída: ${drawnFruitName}</strong>
                </div>
              `}
            </div>
          </div>
        </div>

        ${s.extracted ? `
          <div class="fruit-deduction-cascade">
            <h4>⚡ Deducción en Cascada Paso a Paso:</h4>
            <ol class="cascade-steps-list">
              <li>
                <strong>Caja «Manzanas y Naranjas»:</strong> Como su etiqueta es falsa, no puede ser la mezcla. Al sacar una <strong>${drawnFruitName} ${drawnFruitIcon}</strong>, queda demostrado al 100% que esta caja contiene <strong>SOLO ${drawnFruitName.toUpperCase()}S</strong>.
              </li>
              <li>
                <strong>Caja «${drawnFruitName}s»:</strong> Solo quedan dos contenidos posibles (la Mezcla o solo ${otherFruitName}). Como su etiqueta no puede ser verdadera, no puede ser solo ${drawnFruitName}s. Por tanto, ¡contiene obligatoriamente la <strong>MEZCLA 🍎🍊</strong>!
              </li>
              <li>
                <strong>Caja «${otherFruitName}»:</strong> Por descarte absoluto del último contenido restante, ¡contiene <strong>SOLO ${otherFruitName.toUpperCase()}</strong>!
              </li>
            </ol>
            <div class="cascade-success-banner">
              🎉 <strong>¡Las tres cajas han quedado perfectamente identificadas extrayendo una sola pieza!</strong>
            </div>
          </div>
        ` : ''}

        <div class="fruit-tools-bar">
          <button id="btn-toggle-fruit-type" class="btn-sim-action-sub">
            <span>🔄</span> Alternar Fruta Extraída (Actual: ${drawnFruitName} ${drawnFruitIcon})
          </button>
          ${s.extracted ? `
            <button id="btn-reset-fruit-sim" class="btn-sim-action-sub">
              <span>↩️</span> Reiniciar Extracción
            </button>
          ` : ''}
        </div>
      </div>
    `;

    const drawBtn = document.getElementById('btn-draw-fruit');
    if (drawBtn) {
      drawBtn.addEventListener('click', () => {
        s.extracted = true;
        this.mountFruitBoxesSimulator(mount);
      });
    }

    const toggleBtn = document.getElementById('btn-toggle-fruit-type');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        s.fruit = s.fruit === 'apple' ? 'orange' : 'apple';
        this.mountFruitBoxesSimulator(mount);
      });
    }

    const resetBtn = document.getElementById('btn-reset-fruit-sim');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        s.extracted = false;
        this.mountFruitBoxesSimulator(mount);
      });
    }
  }

  // --- SIMULADOR 5: LA CONTRASEÑA DEL CUARTEL SECRETO ---
  mountPasswordWordsSimulator(mount) {
    const s = this.pwdSim;
    const testNum = s.currentNumber;
    const word = this.numberToSpanishWords(testNum).replace(/\s+/g, '');
    const letterCount = word.length;
    const half = (testNum % 2 === 0) ? (testNum / 2) : (testNum / 2).toFixed(1);

    mount.innerHTML = `
      <div class="sim-pwd-panel">
        <div class="wiretap-transcript-card">
          <div class="transcript-header">
            <span>🎙️ Transcripción de la Escucha Policial:</span>
          </div>
          <div class="transcript-lines">
            <div class="t-line ok">
              <span class="speaker-in">Puerta: «18»</span>
              <span class="speaker-out">Delincuente: «9»</span>
              <span class="explanation-tag">D-I-E-C-I-O-C-H-O = 9 letras (¡Coincide con 18/2!)</span>
            </div>
            <div class="t-line ok">
              <span class="speaker-in">Puerta: «8»</span>
              <span class="speaker-out">Delincuente: «4»</span>
              <span class="explanation-tag">O-C-H-O = 4 letras (¡Coincide con 8/2!)</span>
            </div>
            <div class="t-line ok">
              <span class="speaker-in">Puerta: «14»</span>
              <span class="speaker-out">Delincuente: «7»</span>
              <span class="explanation-tag">C-A-T-O-R-C-E = 7 letras (¡Coincide con 14/2!)</span>
            </div>
            <div class="t-line fail">
              <span class="speaker-in">Puerta: «0»</span>
              <span class="speaker-out">Agente 1: «0»</span>
              <span class="explanation-tag alert">💀 Disparos: C-E-R-O tiene 4 letras, no 0</span>
            </div>
            <div class="t-line fail">
              <span class="speaker-in">Puerta: «6»</span>
              <span class="speaker-out">Agente 2: «3»</span>
              <span class="explanation-tag alert">💀 Disparos: S-E-I-S tiene 4 letras, no 3</span>
            </div>
          </div>
        </div>

        <div class="pwd-interactive-terminal">
          <h4>🧪 Laboratorio: Prueba cualquier número ante la mirilla</h4>
          <div class="pwd-input-row">
            <span>El vigilante dice:</span>
            <input type="number" id="pwd-num-input" min="0" max="2000" value="${testNum}">
            <div class="quick-nums-group">
              ${[0, 6, 8, 14, 18, 20, 1000].map(n => `
                <button class="btn-quick-num ${n === testNum ? 'active' : ''}" data-num="${n}">${n}</button>
              `).join('')}
            </div>
          </div>

          <div class="word-letters-breakdown">
            <div class="word-spelled">
              ${word.split('').map((l, i) => `
                <span class="letter-chip"><small>${i + 1}</small>${l.toUpperCase()}</span>
              `).join('')}
            </div>
            <div class="word-count-result">
              <span>Recuento de letras: <strong>${letterCount} letras</strong></span>
              <span class="half-comparison">(Hipótesis de dividir por 2: ${half})</span>
            </div>
          </div>

          <div class="terminal-verdict ${letterCount === testNum / 2 ? 'trap-match' : 'real-rule'}">
            ${letterCount === testNum / 2 ? `
              <div class="verdict-banner warning">
                ⚠️ <strong>¡Trampa de Coincidencia!</strong> En el número ${testNum}, su mitad matemática (${half}) coincide casualmente con el número de letras.
              </div>
            ` : `
              <div class="verdict-banner safe">
                🛡️ <strong>Clave Real:</strong> Ante el número «${testNum}», la contraseña que salva la vida del agente es <strong>«${letterCount}»</strong> (no ${half}).
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    const input = document.getElementById('pwd-num-input');
    if (input) {
      input.addEventListener('change', (e) => {
        s.currentNumber = parseInt(e.target.value, 10) || 0;
        this.mountPasswordWordsSimulator(mount);
      });
    }

    mount.querySelectorAll('.btn-quick-num').forEach(btn => {
      btn.addEventListener('click', () => {
        s.currentNumber = parseInt(btn.getAttribute('data-num'), 10);
        this.mountPasswordWordsSimulator(mount);
      });
    });
  }

  // --- SIMULADOR 6: LA SUCESIÓN MÁS DIFÍCIL ---
  mountSequenceLetterSimulator(mount) {
    const s = this.seqSim;
    const testNum = s.currentNumber;
    const word = this.numberToSpanishWords(testNum).toLowerCase();
    const hasE = word.includes('e');

    mount.innerHTML = `
      <div class="sim-seq-panel">
        <div class="sequence-display-bar">
          <span class="seq-label">Sucesión Progresiva:</span>
          <div class="seq-numbers">
            <span class="num-chip valid">1</span>
            <span class="arrow">➔</span>
            <span class="num-chip valid">2</span>
            <span class="arrow">➔</span>
            <span class="num-chip valid">4</span>
            <span class="arrow">➔</span>
            <span class="num-chip valid">5</span>
            <span class="arrow">➔</span>
            <span class="num-chip valid">8</span>
            <span class="arrow">➔</span>
            <span class="num-chip valid">1000</span>
            <span class="arrow">➔</span>
            <span class="num-chip next-solution">1001</span>
          </div>
        </div>

        <div class="seq-analyzer-card">
          <h4>🔍 Escáner Ortográfico de Números (Ausencia de la Letra 'E')</h4>
          <div class="seq-input-row">
            <label>Analizar número:</label>
            <input type="number" id="seq-num-input" min="0" max="2000" value="${testNum}">
            <div class="quick-seq-nums">
              ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1000, 1001, 2000].map(n => `
                <button class="btn-quick-seq ${n === testNum ? 'active' : ''}" data-num="${n}">${n}</button>
              `).join('')}
            </div>
          </div>

          <div class="seq-word-visual">
            <div class="word-rendered">
              ${word.split('').map(l => `
                <span class="seq-letter ${l === 'e' ? 'letter-e-bad' : 'letter-clean'}">${l.toUpperCase()}</span>
              `).join('')}
            </div>

            <div class="seq-verdict-box ${hasE ? 'rejected' : 'accepted'}">
              ${hasE ? `
                <span class="badge-verdict bad">❌ DESCARTADO</span>
                <p>La palabra contiene la letra <strong>'E'</strong>. Por eso números como 3 (tres), 6 (seis), 7 (siete) o 9 (nueve) quedan fuera de la sucesión.</p>
              ` : `
                <span class="badge-verdict good">✅ PERTENECE A LA SUCESIÓN</span>
                <p>La palabra <strong>NO</strong> contiene ninguna letra 'E'. 1001 (Mil uno) es el primer número natural tras 1000 que cumple esta condición.</p>
              `}
            </div>
          </div>
        </div>

        <div class="bonus-riddle-card">
          <div class="bonus-header">
            <span>🎁 Reto Adicional de Pensamiento Lateral</span>
          </div>
          <p class="bonus-question">¿Qué letra sigue en esta otra secuencia?: <strong>U — D — T — C — C — S — S — ¿...?</strong></p>
          ${s.showBonus ? `
            <div class="bonus-solution-reveal">
              <div class="solution-big-letter">O</div>
              <div class="solution-text">
                <strong>¡Sigue la letra O!</strong>
                <p>Son las iniciales de los números naturales en castellano:<br>
                <strong>U</strong>no, <strong>D</strong>os, <strong>T</strong>res, <strong>C</strong>uatro, <strong>C</strong>inco, <strong>S</strong>eis, <strong>S</strong>iete, <strong>O</strong>cho... (y seguiría <strong>N</strong>ueve, <strong>D</strong>iez...).</p>
              </div>
            </div>
          ` : `
            <button id="btn-reveal-bonus" class="btn-reveal-bonus-action">
              <span>💡</span> Revelar Solución del Reto
            </button>
          `}
        </div>
      </div>
    `;

    const input = document.getElementById('seq-num-input');
    if (input) {
      input.addEventListener('change', (e) => {
        s.currentNumber = parseInt(e.target.value, 10) || 0;
        this.mountSequenceLetterSimulator(mount);
      });
    }

    mount.querySelectorAll('.btn-quick-seq').forEach(btn => {
      btn.addEventListener('click', () => {
        s.currentNumber = parseInt(btn.getAttribute('data-num'), 10);
        this.mountSequenceLetterSimulator(mount);
      });
    });

    const bonusBtn = document.getElementById('btn-reveal-bonus');
    if (bonusBtn) {
      bonusBtn.addEventListener('click', () => {
        s.showBonus = true;
        this.mountSequenceLetterSimulator(mount);
      });
    }
  }

  // --- SIMULADOR 7: LOS TRES SOMBREROS EN FILA INDIA ---
  mountThreeHatsSimulator(mount) {
    const s = this.hatsSim;
    const isClassic = s.config === 'classic';
    const hatA = isClassic ? 'Negro ⚫' : 'Blanco ⚪';
    const hatB = isClassic ? 'Negro ⚫' : 'Blanco ⚪';
    const hatC = isClassic ? 'Blanco ⚪' : 'Negro ⚫';

    mount.innerHTML = `
      <div class="sim-hats-panel">
        <div class="hats-scenario-toggle">
          <span>Configuración en la mesa (3 negros ⚫⚫⚫ y 2 blancos ⚪⚪):</span>
          <div class="scenario-buttons">
            <button class="btn-scenario ${isClassic ? 'active' : ''}" data-cfg="classic">
              Caso del Enigma (A=Negro ⚫)
            </button>
            <button class="btn-scenario ${!isClassic ? 'active' : ''}" data-cfg="two_whites">
              Caso Alternativo (A=Blanco ⚪, B=Blanco ⚪)
            </button>
          </div>
        </div>

        <div class="hats-single-file-row">
          <div class="file-person person-c">
            <div class="hat-indicator ${isClassic ? 'black-hat' : 'black-hat'}">
              <span class="hat-icon">🎩</span>
              <span class="hat-name">${hatC}</span>
            </div>
            <div class="person-body">
              <span class="avatar-face">🧙‍♂️</span>
              <strong class="person-label">Persona C (Atrás)</strong>
              <small>Ve a B y a A</small>
            </div>
            <div class="person-speech ${s.step >= 1 ? 'active' : ''}">
              ${s.step >= 1 ? (isClassic ? '«No lo sé»' : '«¡El mío es NEGRO!»') : '...'}
            </div>
          </div>

          <div class="file-divider">➔</div>

          <div class="file-person person-b">
            <div class="hat-indicator ${isClassic ? 'black-hat' : 'white-hat'}">
              <span class="hat-icon">🎩</span>
              <span class="hat-name">${hatB}</span>
            </div>
            <div class="person-body">
              <span class="avatar-face">🧙‍♂️</span>
              <strong class="person-label">Persona B (Medio)</strong>
              <small>Solo ve a A</small>
            </div>
            <div class="person-speech ${s.step >= 2 ? 'active' : ''}">
              ${s.step >= 2 ? (isClassic ? '«Yo tampoco lo sé»' : '—') : '...'}
            </div>
          </div>

          <div class="file-divider">➔</div>

          <div class="file-person person-a ${s.step >= 3 ? 'triumph' : ''}">
            <div class="hat-indicator ${isClassic ? 'black-hat' : 'white-hat'}">
              <span class="hat-icon">🎩</span>
              <span class="hat-name">${s.step >= 3 ? hatA : '❓ Oculto'}</span>
            </div>
            <div class="person-body">
              <span class="avatar-face">🧙‍♂️</span>
              <strong class="person-label">Persona A (Frente)</strong>
              <small>No ve a nadie</small>
            </div>
            <div class="person-speech triumph-speech ${s.step >= 3 ? 'active' : ''}">
              ${s.step >= 3 ? '«¡El mío es NEGRO ⚫!»' : '...'}
            </div>
          </div>
        </div>

        <div class="hats-stepper-card">
          <div class="stepper-controls">
            <button id="btn-hats-step-1" class="btn-step ${s.step === 1 ? 'current' : ''}">
              1. Preguntar a C
            </button>
            <button id="btn-hats-step-2" class="btn-step ${s.step === 2 ? 'current' : ''}" ${s.step < 1 ? 'disabled' : ''}>
              2. Preguntar a B
            </button>
            <button id="btn-hats-step-3" class="btn-step ${s.step === 3 ? 'current' : ''}" ${s.step < 2 ? 'disabled' : ''}>
              3. Deducción de A
            </button>
            <button id="btn-hats-reset" class="btn-sim-action-sub">
              <span>🔄</span> Reiniciar
            </button>
          </div>

          <div class="stepper-explanation-slot">
            ${s.step === 0 ? `
              <p class="step-guide">Comienza preguntando a la persona C (la que ve a los otros dos).</p>
            ` : ''}
            ${s.step === 1 ? `
              <div class="step-info-box">
                <strong>Paso 1: Declaración de C («${isClassic ? 'No lo sé' : '¡Sé que es negro!'}»)</strong>
                <p>${isClassic ? 'Como solo hay 2 sombreros blancos en total, si C hubiera visto que B y A llevaban ambos sombreros blancos, C sabría que el suyo es negro. Al decir «No lo sé», informa a todos de que <strong>B y A no son ambos blancos</strong>.' : 'C ve dos sombreros blancos delante. Como solo hay 2 blancos, ¡su sombrero es negro obligatoriamente!'}</p>
              </div>
            ` : ''}
            ${s.step === 2 ? `
              <div class="step-info-box">
                <strong>Paso 2: Declaración de B («Yo tampoco lo sé»)</strong>
                <p>B razona: <em>«Si A tuviera un sombrero blanco, dado que C descartó que ambos fuéramos blancos, ¡el mío tendría que ser negro! Como no sé cuál es el mío, significa que <strong>A NO lleva un sombrero blanco</strong>»</em>.</p>
              </div>
            ` : ''}
            ${s.step === 3 ? `
              <div class="step-info-box victory">
                <strong>Paso 3: Deducción Absoluta de A («¡El mío es NEGRO ⚫!»)</strong>
                <p>A razona: <em>«Si mi sombrero fuera blanco, B habría sabido de inmediato que el suyo era negro. Como B respondió que no lo sabía, ¡mi sombrero no puede ser blanco bajo ningún concepto! Por tanto, <strong>mi sombrero es NEGRO ⚫ con 100% de certeza</strong>»</em>.</p>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    mount.querySelectorAll('.btn-scenario').forEach(btn => {
      btn.addEventListener('click', () => {
        s.config = btn.getAttribute('data-cfg');
        s.step = 0;
        this.mountThreeHatsSimulator(mount);
      });
    });

    const step1Btn = document.getElementById('btn-hats-step-1');
    if (step1Btn) {
      step1Btn.addEventListener('click', () => {
        s.step = 1;
        this.mountThreeHatsSimulator(mount);
      });
    }

    const step2Btn = document.getElementById('btn-hats-step-2');
    if (step2Btn) {
      step2Btn.addEventListener('click', () => {
        s.step = 2;
        this.mountThreeHatsSimulator(mount);
      });
    }

    const step3Btn = document.getElementById('btn-hats-step-3');
    if (step3Btn) {
      step3Btn.addEventListener('click', () => {
        s.step = 3;
        this.mountThreeHatsSimulator(mount);
      });
    }

    const resetBtn = document.getElementById('btn-hats-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        s.step = 0;
        this.mountThreeHatsSimulator(mount);
      });
    }
  }

  // --- SIMULADOR 9: LOS 100 PRISIONEROS ---
  mountPrisonersSimulator(mount) {
    mount.innerHTML = `
      <div class="sim-prisoners-panel">
        <div class="prisoners-comparison-grid">
          <div class="prob-box random">
            <h4>🎲 Elección al Azar</h4>
            <div class="prob-number">0.000000...%</div>
            <p>Cada prisionero acierta con prob 1/2. Para 100 prisioneros independientes: (1/2)^100 ≈ 0.0000000000000000000000000000008%.</p>
          </div>
          <div class="prob-box cycles">
            <h4>🔄 Estrategia de Ciclos</h4>
            <div class="prob-number">31.18%</div>
            <p>Al abrir la caja con tu propio número y seguir los punteros de los ciclos, todos triunfan si ningún ciclo tiene longitud > 50.</p>
          </div>
        </div>
        <div class="cycle-demo-note">
          <span>✨ <strong>Teorema de Permutaciones:</strong> La probabilidad de que una permutación aleatoria de orden 100 carezca de ciclos de longitud superior a 50 es <em>1 - ln(2) = 0.311827...</em></span>
        </div>
      </div>
    `;
  }
}

// Exponer globalmente
if (typeof window !== 'undefined') {
  window.classicEnigmas = new ClassicEnigmasController();
}

