/**
 * Puzles del Club — Controlador Principal (App)
 * Conecta el tablero interactivo, sonido, puntuación, bóveda de imágenes,
 * Salón de la Fama, Reto Semanal, desafíos de WhatsApp e internacionalización.
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Inicializar Motores
  const i18n = new I18nManager();
  const sound = new SoundEngine();
  const scoring = new ScoringEngine();
  const vault = new PuzzleVault();
  const weekly = new WeeklyChallengeEngine();
  const hof = new PuzlesHallOfFame();
  const social = new SocialShareEngine();

  const canvas = document.getElementById('puzzle-canvas');
  const board = new PuzzleBoard(canvas, sound, scoring);

  // Variables de estado del juego
  let currentDifficulty = 'facil';
  let activeImageObj = null;
  let activeImageMeta = null;
  let ghostLevel = 0; // 0: off, 1: 20%, 2: 40%

  // 2. Elementos del DOM
  const piecesCountEl = document.getElementById('stat-pieces-count');
  const piecesTotalEl = document.getElementById('stat-pieces-total');
  const progressFillEl = document.getElementById('stat-progress-fill');
  const scoreValueEl = document.getElementById('stat-score-value');
  const scoreMaxEl = document.getElementById('stat-score-max');
  const timerDisplayEl = document.getElementById('stat-timer');
  const comboBadgeEl = document.getElementById('stat-combo-badge');
  const challengeBannerEl = document.getElementById('challenge-banner');

  // 3. Callback de Puntuación y Cronómetro
  scoring.onTick = (formattedTime) => {
    if (timerDisplayEl) timerDisplayEl.textContent = formattedTime;
  };

  scoring.onScoreChange = (score, maxScore, comboMult, comboCount) => {
    if (scoreValueEl) scoreValueEl.textContent = score.toLocaleString();
    if (scoreMaxEl) scoreMaxEl.textContent = maxScore.toLocaleString();

    if (comboBadgeEl) {
      if (comboCount >= 2) {
        comboBadgeEl.textContent = `🔥 x${comboMult.toFixed(1)}`;
        comboBadgeEl.classList.add('visible');
      } else {
        comboBadgeEl.classList.remove('visible');
      }
    }
  };

  // 4. Callback de Progreso del Tablero
  board.onPiecePlaced = (placed, total) => {
    if (piecesCountEl) piecesCountEl.textContent = placed;
    if (piecesTotalEl) piecesTotalEl.textContent = total;
    if (progressFillEl) {
      const pct = Math.round((placed / total) * 100);
      progressFillEl.style.width = `${pct}%`;
    }
  };

  // 5. Callback de Victoria
  board.onVictory = (result) => {
    // Abrir modal de victoria
    const modalVictory = document.getElementById('modal-victory');
    document.getElementById('victory-score-value').textContent = result.finalScore.toLocaleString();
    document.getElementById('victory-time-value').textContent = result.formattedTime;
    document.getElementById('victory-purity-value').textContent = result.pureMastery ? i18n.t('victory_pure_yes') : i18n.t('victory_pure_no');

    // Comprobar si era el reto semanal
    const currentWeek = weekly.getCurrentChallenge();
    if (activeImageMeta && activeImageMeta.id === currentWeek.id && currentDifficulty === currentWeek.difficulty) {
      weekly.saveCompletion(currentWeek.weekId, result);
    }

    // Configurar botón de WhatsApp de victoria
    const btnShareVictory = document.getElementById('btn-victory-share-whatsapp');
    btnShareVictory.onclick = () => {
      const shareUrl = social.generateWhatsAppUrl({
        imageId: activeImageMeta.id,
        title: activeImageMeta.title,
        difficulty: currentDifficulty,
        diffLabel: i18n.t(`diff_${currentDifficulty}`),
        piecesCount: board.pieces.length,
        score: result.finalScore,
        timeFormatted: result.formattedTime,
        seed: board.seed
      });
      window.open(shareUrl, '_blank');
    };

    // Si completó en Difícil o Muy Difícil: habilitar botón para registrarse en el Salón de la Fama
    const regSection = document.getElementById('victory-hof-registration');
    if (currentDifficulty === 'dificil' || currentDifficulty === 'muy_dificil') {
      regSection.classList.remove('hidden');
      const regBtn = document.getElementById('btn-victory-register-hof');
      regBtn.onclick = () => {
        modalVictory.classList.add('hidden');
        openHallOfFameModal(true, result);
      };
    } else {
      regSection.classList.add('hidden');
    }

    modalVictory.classList.remove('hidden');
  };

  // 6. Cargar Partida
  async function loadActiveGame(seed = Date.now()) {
    const { img, item } = await vault.loadActiveImage();
    activeImageObj = img;
    activeImageMeta = item;

    // Actualizar título en cabecera
    const titleEl = document.getElementById('active-puzzle-title');
    if (titleEl) titleEl.textContent = item.title;

    board.loadPuzzle(img, currentDifficulty, seed);

    if (piecesCountEl) piecesCountEl.textContent = '0';
    if (piecesTotalEl) piecesTotalEl.textContent = board.pieces.length;
    if (timerDisplayEl) timerDisplayEl.textContent = '00:00';
    if (scoreValueEl) scoreValueEl.textContent = '0';
    if (progressFillEl) progressFillEl.style.width = '0%';
  }

  // 7. Comprobación Ergonómica de Pantalla
  function checkErgonomicAdvice(difficulty) {
    const isMobile = window.innerWidth < 768;
    const isHighPieces = difficulty === 'dificil' || difficulty === 'muy_dificil' || difficulty === 'medio';

    if (isMobile && isHighPieces) {
      const count = difficulty === 'muy_dificil' ? 150 : (difficulty === 'dificil' ? 96 : 48);
      const modal = document.getElementById('modal-device-advice');
      const textEl = document.getElementById('device-advice-message');
      textEl.innerHTML = i18n.t('device_advice_text', { count });
      modal.classList.remove('hidden');
      return true; // Se mostró aviso
    }
    return false;
  }

  // ============================================================================
  // EVENTOS DE LA BARRA DE CONTROL
  // ============================================================================

  // Selector de Dificultades
  document.querySelectorAll('.btn-diff').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const diff = btn.getAttribute('data-diff');
      document.querySelectorAll('.btn-diff').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentDifficulty = diff;
      checkErgonomicAdvice(diff);
      loadActiveGame(Date.now());
    });
  });

  // Reiniciar partida (descolocar piezas y resetear tiempo/puntuación)
  const btnRestart = document.getElementById('btn-restart');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      board.restart();
    });
  }

  // Re-troquelar (Nuevo corte con curvas diferentes)
  const btnRecut = document.getElementById('btn-recut');
  if (btnRecut) {
    btnRecut.addEventListener('click', () => {
      board.recutPuzzle();
    });
  }

  // Resolver / Ver solución automática
  const btnSolve = document.getElementById('btn-solve');
  if (btnSolve) {
    btnSolve.addEventListener('click', () => {
      board.solve();
    });
  }

  // Solo Bordes
  const btnEdges = document.getElementById('btn-edges-only');
  if (btnEdges) {
    btnEdges.addEventListener('click', () => {
      board.showOnlyEdges = !board.showOnlyEdges;
      btnEdges.classList.toggle('active', board.showOnlyEdges);
      board.render();
    });
  }

  // Imagen Guía (Fantasma con 3 niveles: Apagada -> 20% -> 40%)
  const btnGhost = document.getElementById('btn-ghost');
  if (btnGhost) {
    btnGhost.addEventListener('click', () => {
      ghostLevel = (ghostLevel + 1) % 3;
      if (ghostLevel === 0) {
        board.ghostOpacity = 0.0;
        btnGhost.classList.remove('active');
      } else if (ghostLevel === 1) {
        board.ghostOpacity = 0.22;
        btnGhost.classList.add('active');
        scoring.recordGhostPeek();
      } else {
        board.ghostOpacity = 0.45;
        btnGhost.classList.add('active');
        scoring.recordGhostPeek();
      }
      board.render();
    });
  }

  // Ordenar a las alas laterales
  const btnSortWings = document.getElementById('btn-sort-wings');
  if (btnSortWings) {
    btnSortWings.addEventListener('click', () => {
      board.distributePiecesToWings();
      sound.playShuffle();
    });
  }

  // Ajustar Zoom
  const btnResetZoom = document.getElementById('btn-reset-zoom');
  if (btnResetZoom) {
    btnResetZoom.addEventListener('click', () => {
      board.resetCamera();
    });
  }

  // Retar por WhatsApp (partida actual)
  const btnShareWhatsapp = document.getElementById('btn-share-whatsapp');
  if (btnShareWhatsapp) {
    btnShareWhatsapp.addEventListener('click', () => {
      const shareUrl = social.generateWhatsAppUrl({
        imageId: activeImageMeta.id,
        title: activeImageMeta.title,
        difficulty: currentDifficulty,
        diffLabel: i18n.t(`diff_${currentDifficulty}`),
        piecesCount: board.pieces.length,
        score: scoring.score,
        timeFormatted: scoring.formatTime(scoring.elapsedSeconds),
        seed: board.seed
      });
      window.open(shareUrl, '_blank');
    });
  }

  // ============================================================================
  // CABECERA: SONIDO, IDIOMA Y MODALES
  // ============================================================================

  // Sonido
  const btnSound = document.getElementById('btn-toggle-sound');
  const soundIcon = document.getElementById('sound-icon');
  if (btnSound) {
    soundIcon.textContent = sound.isMuted() ? '🔇' : '🔊';
    btnSound.addEventListener('click', () => {
      const unmuted = sound.toggleMute();
      soundIcon.textContent = unmuted ? '🔊' : '🔇';
    });
  }

  // Idioma
  const btnLang = document.getElementById('btn-open-lang-modal');
  const modalLang = document.getElementById('modal-lang');
  if (btnLang) {
    btnLang.addEventListener('click', () => modalLang.classList.remove('hidden'));
  }
  document.querySelectorAll('.lang-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      i18n.setLanguage(lang);
      modalLang.classList.add('hidden');
    });
  });

  // Modal Reglas
  const btnRules = document.getElementById('btn-open-rules');
  const modalRules = document.getElementById('modal-rules');
  if (btnRules) {
    btnRules.addEventListener('click', () => modalRules.classList.remove('hidden'));
  }

  // Modal Bóveda / Galería y Mis Puzles
  const btnVault = document.getElementById('btn-open-vault');
  const modalVault = document.getElementById('modal-vault');
  if (btnVault) {
    btnVault.addEventListener('click', () => {
      renderVaultModal();
      modalVault.classList.remove('hidden');
    });
  }

  // Modal Reto Semanal
  const btnWeekly = document.getElementById('btn-open-weekly');
  const modalWeekly = document.getElementById('modal-weekly');
  if (btnWeekly) {
    btnWeekly.addEventListener('click', () => {
      renderWeeklyModal();
      modalWeekly.classList.remove('hidden');
    });
  }

  // Modal Salón de la Fama
  const btnHof = document.getElementById('btn-open-hof');
  const modalHof = document.getElementById('modal-hof');
  if (btnHof) {
    btnHof.addEventListener('click', () => {
      openHallOfFameModal();
    });
  }

  // Cerrar cualquier modal al pulsar el botón de cerrar o el fondo oscuro
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('.btn-close-modal')) {
        modal.classList.add('hidden');
      }
    });
  });

  // ============================================================================
  // RENDERIZADO DE MODAL BÓVEDA (GALERÍA Y MIS PUZLES)
  // ============================================================================
  function renderVaultModal() {
    const listEl = document.getElementById('vault-items-grid');
    listEl.innerHTML = '';

    const all = vault.getAllImages();
    all.forEach(item => {
      const card = document.createElement('div');
      card.className = `vault-card ${item.id === vault.getActiveImageId() ? 'active' : ''}`;

      const thumbSrc = item.thumb || item.src || '';

      card.innerHTML = `
        <div class="vault-thumb-wrap">
          <img src="${thumbSrc}" alt="${item.title}" class="vault-thumb" onerror="this.src='../puzles_del_club_logo.jpg'">
          ${item.type === 'user' ? '<span class="vault-badge-user">Personal</span>' : ''}
        </div>
        <div class="vault-card-body">
          <h4 class="vault-card-title">${item.title}</h4>
          <p class="vault-card-sub">${item.subtitle || ''}</p>
          <div class="vault-card-actions">
            <button class="btn-play-vault" data-id="${item.id}">🧩 ${i18n.t('vault_select_puzzle')}</button>
            ${item.type === 'user' ? `<button class="btn-delete-vault" data-id="${item.id}" title="${i18n.t('vault_delete')}">🗑️</button>` : ''}
          </div>
        </div>
      `;

      card.querySelector('.btn-play-vault').addEventListener('click', () => {
        vault.setActiveImageId(item.id);
        modalVault.classList.add('hidden');
        loadActiveGame(Date.now());
      });

      const delBtn = card.querySelector('.btn-delete-vault');
      if (delBtn) {
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          vault.deleteUserImage(item.id);
          renderVaultModal();
        });
      }

      listEl.appendChild(card);
    });
  }

  // Subir foto desde el ordenador o dispositivo
  const fileInput = document.getElementById('vault-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      if (e.target.files && e.target.files[0]) {
        try {
          const entry = await vault.addUserImage(e.target.files[0]);
          renderVaultModal();
          modalVault.classList.add('hidden');
          loadActiveGame(Date.now());
        } catch (err) {
          alert('No se pudo procesar la imagen seleccionada.');
        }
      }
    });
  }

  // Cámara móvil
  const cameraInput = document.getElementById('vault-camera-input');
  if (cameraInput) {
    cameraInput.addEventListener('change', async (e) => {
      if (e.target.files && e.target.files[0]) {
        try {
          const entry = await vault.addUserImage(e.target.files[0], 'Foto con Cámara');
          renderVaultModal();
          modalVault.classList.add('hidden');
          loadActiveGame(Date.now());
        } catch (err) {
          alert('Error al capturar la fotografía.');
        }
      }
    });
  }

  // Drag and Drop de archivos de imagen en la ventana o modal
  window.addEventListener('dragover', (e) => e.preventDefault());
  window.addEventListener('drop', async (e) => {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        try {
          await vault.addUserImage(file, file.name.replace(/\.[^/.]+$/, ""));
          loadActiveGame(Date.now());
        } catch (err) {
          console.warn('Error al cargar imagen arrastrada:', err);
        }
      }
    }
  });

  // Pegar con Ctrl+V desde el portapapeles
  window.addEventListener('paste', async (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile();
        try {
          await vault.addUserImage(blob, 'Imagen del Portapapeles');
          loadActiveGame(Date.now());
        } catch (err) {
          console.warn('Error al pegar imagen:', err);
        }
        break;
      }
    }
  });

  // ============================================================================
  // RENDERIZADO DEL RETO SEMANAL
  // ============================================================================
  function renderWeeklyModal() {
    const ch = weekly.getCurrentChallenge();
    document.getElementById('weekly-challenge-title').textContent = ch.title;
    document.getElementById('weekly-challenge-subtitle').textContent = ch.subtitle;
    document.getElementById('weekly-pieces-badge').textContent = `${ch.pieces} piezas`;

    const statusEl = document.getElementById('weekly-status-box');
    if (ch.isCompleted) {
      statusEl.innerHTML = `<span class="badge-tag gold">🏆 ${i18n.t('weekly_completed_msg', { badge: ch.completionData.badgeLabel, time: ch.completionData.formattedTime })}</span>`;
    } else {
      statusEl.innerHTML = `<span class="badge-tag cyan">⏱️ Objetivo: Menos de 10 minutos (Nivel Difícil)</span>`;
    }

    const btnPlayWeekly = document.getElementById('btn-play-weekly-now');
    btnPlayWeekly.onclick = () => {
      vault.setActiveImageId(ch.id);
      currentDifficulty = ch.difficulty;
      document.querySelectorAll('.btn-diff').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-diff') === ch.difficulty);
      });
      modalWeekly.classList.add('hidden');
      loadActiveGame(ch.seed);
    };
  }

  // ============================================================================
  // RENDERIZADO DEL SALÓN DE LA FAMA
  // ============================================================================
  function openHallOfFameModal(showRegistrationForm = false, pendingResult = null) {
    const modalHof = document.getElementById('modal-hof');
    const formSection = document.getElementById('hof-registration-card');

    if (showRegistrationForm && pendingResult) {
      formSection.classList.remove('hidden');
      const inputName = document.getElementById('hof-input-name');
      const inputCity = document.getElementById('hof-input-city');
      const inputAge = document.getElementById('hof-input-age');
      const btnSubmit = document.getElementById('btn-submit-hof-record');

      const existingProfile = hof.getUserProfile();
      if (existingProfile) {
        inputName.value = existingProfile.name || '';
        inputCity.value = existingProfile.city || '';
        inputAge.value = existingProfile.age || '';
      }

      btnSubmit.onclick = () => {
        const name = inputName.value.trim() || 'Maestro Anónimo';
        const city = inputCity.value.trim() || 'Valencia';
        const age = parseInt(inputAge.value, 10) || 45;

        hof.saveUserProfile({ name, city, age });
        hof.registerMasterRecord({
          name,
          city,
          age,
          difficulty: currentDifficulty,
          score: pendingResult.finalScore,
          timeSeconds: pendingResult.timeSeconds,
          formattedTime: pendingResult.formattedTime,
          pureMastery: pendingResult.pureMastery,
          puzzleTitle: activeImageMeta ? activeImageMeta.title : 'Puzle Panorámico'
        });

        formSection.classList.add('hidden');
        renderHofList('all');
      };
    } else {
      formSection.classList.add('hidden');
    }

    renderHofList('all');
    modalHof.classList.remove('hidden');
  }

  function renderHofList(tab = 'all', diff = 'all') {
    const container = document.getElementById('hof-records-list');
    container.innerHTML = '';

    const list = hof.getFilteredMasters(tab, diff);
    list.forEach((m, idx) => {
      const row = document.createElement('div');
      row.className = `hof-row ${idx === 0 ? 'first-place' : ''}`;

      const medal = idx === 0 ? '🥇' : (idx === 1 ? '🥈' : (idx === 2 ? '🥉' : `#${idx + 1}`));
      const purityBadge = m.pureMastery 
        ? `<span class="badge-purity gold" title="${i18n.t('hof_pure_badge')}">⭐ Pura</span>` 
        : `<span class="badge-purity muted" title="${i18n.t('hof_assisted_badge')}">Guía</span>`;

      row.innerHTML = `
        <div class="hof-rank">${medal}</div>
        <div class="hof-avatar">${m.flag || '🇪🇸'}</div>
        <div class="hof-info">
          <div class="hof-name-line">
            <strong>${m.name}</strong>
            <span class="hof-city">${m.city} (${m.age} años)</span>
            ${purityBadge}
          </div>
          <div class="hof-puzzle-title">${m.puzzleTitle || ''} · <span class="hof-diff-tag">${m.diffLabel}</span></div>
        </div>
        <div class="hof-stats">
          <span class="hof-score">${m.score.toLocaleString()} pts</span>
          <span class="hof-time">⏱️ ${m.formattedTime}</span>
        </div>
      `;
      container.appendChild(row);
    });
  }

  // Pestañas del Salón de la Fama
  document.querySelectorAll('.hof-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.hof-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      renderHofList(tab);
    });
  });

  // Botón continuar en aviso ergonómico
  const btnContinueAdvice = document.getElementById('btn-device-advice-continue');
  if (btnContinueAdvice) {
    btnContinueAdvice.addEventListener('click', () => {
      document.getElementById('modal-device-advice').classList.add('hidden');
    });
  }
  const btnChangeAdvice = document.getElementById('btn-device-advice-change');
  if (btnChangeAdvice) {
    btnChangeAdvice.addEventListener('click', () => {
      document.getElementById('modal-device-advice').classList.add('hidden');
      currentDifficulty = 'facil';
      document.querySelectorAll('.btn-diff').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-diff') === 'facil');
      });
      loadActiveGame(Date.now());
    });
  }

  // ============================================================================
  // RETO RECIBIDO DESDE WHATSAPP
  // ============================================================================
  const incoming = social.checkIncomingChallenge();
  if (incoming.isChallenge) {
    vault.setActiveImageId(incoming.imageId);
    currentDifficulty = incoming.difficulty;
    document.querySelectorAll('.btn-diff').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-diff') === incoming.difficulty);
    });

    if (challengeBannerEl) {
      challengeBannerEl.innerHTML = `⚔️ <strong>¡Reto de WhatsApp!</strong> Tu rival logró <strong>${incoming.rivalScore.toLocaleString()} pts</strong> en <strong>${incoming.rivalTime}</strong>. ¿Podrás superarlo?`;
      challengeBannerEl.classList.remove('hidden');
    }

    await loadActiveGame(incoming.seed);
  } else {
    await loadActiveGame(Date.now());
  }

  // Escuchar cambio de tamaño de ventana
  window.addEventListener('resize', () => {
    board.resize();
  });
  board.resize();

  // Aplicar traducciones
  i18n.applyTranslations();
});
