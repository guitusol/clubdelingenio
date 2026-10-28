/**
 * CLUB DEL INGENIO — Gestor Integral de Copias de Seguridad y Traspaso Multi-dispositivo
 * Permite empaquetar, exportar, transferir e importar el progreso de TODOS los juegos:
 * - Top-Sudoku (Escuela y puzles)
 * - Sudoku Arena (Historial, Bóveda, Perfil Maestro, Retos Semanales)
 * - Nonogramas del Club (Pinacoteca, Puzles creados, Historial)
 * - Cubo de Rubik 3D (Tiempos de Speedcubing, Récord PB, Ao5)
 * - Cálculo Táctico Relámpago (Partidas y récords)
 * - Deducción Lógica (Casos resueltos y pistas)
 * - Damas del Club (Estadísticas y partidas)
 * - Preferencias generales (Idiomas y audio)
 */

export class ClubBackupManager {
  constructor() {
    this.prefixList = [
      'sudoku_arena_',
      'top_sudoku',
      'sudoku_puzzle_',
      'nonogram_',
      'club_rubik_',
      'calc_tactico_',
      'deduccion_',
      'club_damas_',
      'club_ingenio_'
    ];
    this.currentImportPayload = null;
    this.init();
  }

  init() {
    this.bindModalEvents();
    this.checkUrlMigration();
  }

  /**
   * 1. Escaneo inteligente del progreso local en este dispositivo
   */
  scanLocalProgress() {
    const summary = {
      totalKeys: 0,
      games: {
        sudokuArena: 0,
        topSudoku: 0,
        nonogramas: 0,
        rubik: 0,
        calculoTactico: 0,
        deduccion: 0,
        damas: 0
      }
    };

    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;

        if (this.isClubKey(key)) {
          summary.totalKeys++;

          if (key.startsWith('sudoku_arena_')) {
            if (key.includes('history')) {
              try {
                const arr = JSON.parse(localStorage.getItem(key));
                if (Array.isArray(arr)) summary.games.sudokuArena += arr.length;
              } catch(e) { summary.games.sudokuArena++; }
            } else {
              summary.games.sudokuArena++;
            }
          } else if (key.startsWith('top_sudoku') || key.startsWith('sudoku_puzzle_')) {
            summary.games.topSudoku++;
          } else if (key.startsWith('nonogram_')) {
            if (key.includes('gallery')) {
              try {
                const gal = JSON.parse(localStorage.getItem(key));
                summary.games.nonogramas += Object.keys(gal || {}).length;
              } catch(e) { summary.games.nonogramas++; }
            } else {
              summary.games.nonogramas++;
            }
          } else if (key.startsWith('club_rubik_')) {
            if (key.includes('timer_history')) {
              try {
                const hist = JSON.parse(localStorage.getItem(key));
                if (Array.isArray(hist)) summary.games.rubik += hist.length;
              } catch(e) { summary.games.rubik++; }
            } else {
              summary.games.rubik++;
            }
          } else if (key.startsWith('calc_tactico_')) {
            summary.games.calculoTactico++;
          } else if (key.startsWith('deduccion_')) {
            summary.games.deduccion++;
          } else if (key.startsWith('club_damas_')) {
            summary.games.damas++;
          }
        }
      }
    } catch (e) {
      console.warn('Error al escanear localStorage:', e);
    }

    return summary;
  }

  isClubKey(key) {
    return this.prefixList.some(prefix => key.startsWith(prefix));
  }

  /**
   * 2. Construcción del Payload completo de Copia de Seguridad
   */
  buildBackupPayload() {
    const storageDump = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && this.isClubKey(key)) {
        storageDump[key] = localStorage.getItem(key);
      }
    }

    const now = new Date();
    const payload = {
      app: 'Club del Ingenio',
      format: 'club_backup_v1',
      version: '1.0',
      timestamp: now.getTime(),
      exportedAt: now.toISOString(),
      hostname: window.location.hostname,
      itemCount: Object.keys(storageDump).length,
      progressSummary: this.scanLocalProgress(),
      storage: storageDump
    };

    return payload;
  }

  /**
   * 3. Descarga del archivo JSON de respaldo
   */
  downloadBackupFile() {
    const payload = this.buildBackupPayload();
    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const filename = `copia-seguridad-clubdelingenio-${yyyy}${mm}${dd}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast('✅ Copia de seguridad descargada correctamente.');
  }

  /**
   * 4. Obtención del código de traspaso portátil (Base64)
   */
  getBackupCode() {
    const payload = this.buildBackupPayload();
    const jsonStr = JSON.stringify(payload);
    const encoded = btoa(encodeURIComponent(jsonStr));
    return `CLUB_BACKUP_V1:${encoded}`;
  }

  /**
   * 5. Generación de Enlace Directo para traspasar
   */
  getTransferUrl() {
    const payload = this.buildBackupPayload();
    const jsonStr = JSON.stringify(payload);
    const encoded = btoa(encodeURIComponent(jsonStr));
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?traspaso=${encoded}`;
  }

  /**
   * 6. Validación y parseo de un código o archivo JSON
   */
  parseImportData(rawText) {
    if (!rawText || typeof rawText !== 'string') {
      throw new Error('El contenido proporcionado está vacío.');
    }

    let parsed = null;
    let text = rawText.trim();

    // Caso A: Código con prefijo CLUB_BACKUP_V1:
    if (text.startsWith('CLUB_BACKUP_V1:')) {
      const base64 = text.substring('CLUB_BACKUP_V1:'.length);
      const jsonStr = decodeURIComponent(atob(base64));
      parsed = JSON.parse(jsonStr);
    }
    // Caso B: Base64 directo o formato anterior de Sudoku Arena
    else if (!text.startsWith('{')) {
      try {
        const jsonStr = decodeURIComponent(atob(text));
        parsed = JSON.parse(jsonStr);
      } catch (e) {
        parsed = JSON.parse(text);
      }
    }
    // Caso C: JSON sin codificar
    else {
      parsed = JSON.parse(text);
    }

    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Formato de datos no reconocido.');
    }

    // Adaptador de compatibilidad: si viene del formato legado de Sudoku Arena o Top-Sudoku
    if (!parsed.storage && (parsed.history || parsed.vault || parsed.profile || parsed.weekly)) {
      const legacyStorage = {};
      if (parsed.history) legacyStorage['sudoku_arena_player_history_v1'] = JSON.stringify(parsed.history);
      if (parsed.vault) legacyStorage['sudoku_arena_vault_v1'] = JSON.stringify(parsed.vault);
      if (parsed.profile) legacyStorage['sudoku_arena_player_master_profile_v1'] = JSON.stringify(parsed.profile);
      if (parsed.weekly) legacyStorage['sudoku_arena_weekly_history_v1'] = JSON.stringify(parsed.weekly);
      parsed = {
        app: 'Sudoku Arena (Legado)',
        format: 'sudoku_arena_legacy',
        itemCount: Object.keys(legacyStorage).length,
        storage: legacyStorage
      };
    }

    if (!parsed.storage || typeof parsed.storage !== 'object') {
      throw new Error('La copia de seguridad no contiene datos válidos para restaurar.');
    }

    return parsed;
  }

  /**
   * 7. Restauración de las claves en localStorage
   */
  restorePayload(payload) {
    if (!payload || !payload.storage) {
      throw new Error('No hay datos válidos para restaurar.');
    }

    let restoredCount = 0;
    for (const [key, val] of Object.entries(payload.storage)) {
      if (typeof val === 'string') {
        localStorage.setItem(key, val);
        restoredCount++;
      }
    }

    return restoredCount;
  }

  /**
   * 8. Comprobación automática de traspaso en la URL al entrar
   */
  checkUrlMigration() {
    try {
      const params = new URLSearchParams(window.location.search);
      const traspaso = params.get('traspaso');
      if (traspaso) {
        const parsed = this.parseImportData(traspaso);
        if (parsed && parsed.storage) {
          const count = this.restorePayload(parsed);
          
          // Limpiar la URL sin recargar
          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);

          this.showWelcomeMigrationModal(count, parsed);
        }
      }
    } catch (e) {
      console.warn('No se pudo procesar el parámetro traspaso de la URL:', e);
    }
  }

  showWelcomeMigrationModal(count, parsed) {
    setTimeout(() => {
      this.showToast(`🎉 ¡Traspaso completado! Se han restaurado ${count} registros de juegos en este dispositivo.`);
    }, 600);
  }

  showToast(message) {
    const existing = document.getElementById('club-global-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'club-global-toast';
    toast.className = 'club-global-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('visible'), 50);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 5500);
  }

  /**
   * 9. Enlace y eventos del Modal en la interfaz
   */
  bindModalEvents() {
    const modal = document.getElementById('modal-backup');
    const openBtns = document.querySelectorAll('#btn-open-backup, #nav-backup-link, .btn-trigger-backup');
    const closeBtn = document.getElementById('btn-close-backup');

    if (!modal) return;

    const openModal = () => {
      this.updateDetectedSummary();
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      this.currentImportPayload = null;
      const previewBox = document.getElementById('import-preview-box');
      if (previewBox) previewBox.classList.add('hidden');
      const confirmBtn = document.getElementById('btn-confirm-import');
      if (confirmBtn) confirmBtn.disabled = true;
    };

    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    }));

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });

    // Pestañas (Exportar vs Importar)
    const tabs = modal.querySelectorAll('.backup-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.getAttribute('data-tab');

        modal.querySelectorAll('.backup-tab-content').forEach(c => c.classList.remove('active'));
        const activeContent = document.getElementById(`tab-${target}-content`);
        if (activeContent) activeContent.classList.add('active');
      });
    });

    // Botón: Descargar Archivo .json
    const btnDownload = document.getElementById('btn-download-backup');
    if (btnDownload) {
      btnDownload.addEventListener('click', () => this.downloadBackupFile());
    }

    // Botón: Copiar Código de Traspaso
    const btnCopyCode = document.getElementById('btn-copy-backup-code');
    const codeContainer = document.getElementById('backup-code-container');
    const codeTextarea = document.getElementById('backup-code-textarea');

    if (btnCopyCode && codeContainer && codeTextarea) {
      btnCopyCode.addEventListener('click', () => {
        const code = this.getBackupCode();
        codeTextarea.value = code;
        codeContainer.classList.remove('hidden');

        navigator.clipboard.writeText(code).then(() => {
          this.showToast('📋 ¡Código de traspaso copiado al portapapeles!');
        }).catch(() => {
          codeTextarea.select();
          this.showToast('ℹ️ Selecciona y copia el código que aparece en el recuadro.');
        });
      });
    }

    // Botón: Compartir Enlace Directo
    const btnShareLink = document.getElementById('btn-share-backup-link');
    if (btnShareLink) {
      btnShareLink.addEventListener('click', () => {
        try {
          const url = this.getTransferUrl();
          if (url.length > 7500) {
            this.showToast('⚠️ Tu historial es muy extenso para un enlace URL. Utiliza "Descargar Archivo" o "Copiar Código".');
            return;
          }
          navigator.clipboard.writeText(url).then(() => {
            this.showToast('🔗 ¡Enlace de traspaso copiado! Ábrelo en tu otro dispositivo para sincronizar.');
          }).catch(() => {
            prompt('Copia este enlace y ábrelo en tu otro dispositivo:', url);
          });
        } catch (e) {
          this.showToast('⚠️ Utiliza la opción de "Descargar Archivo" para historiales grandes.');
        }
      });
    }

    // Botón: Copiar de nuevo
    const btnCopyAgain = document.getElementById('btn-copy-code-again');
    if (btnCopyAgain && codeTextarea) {
      btnCopyAgain.addEventListener('click', () => {
        navigator.clipboard.writeText(codeTextarea.value);
        this.showToast('📋 Código copiado nuevamente.');
      });
    }

    // Input de archivo .json
    const fileInput = document.getElementById('backup-file-input');
    const dropzone = document.getElementById('import-dropzone');

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) this.processFile(file);
      });
    }

    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) this.processFile(file);
      });
    }

    // Textarea para pegar código
    const importTextarea = document.getElementById('import-code-input');
    if (importTextarea) {
      importTextarea.addEventListener('input', () => {
        const val = importTextarea.value.trim();
        if (val.length > 10) {
          try {
            const parsed = this.parseImportData(val);
            this.displayImportPreview(parsed);
          } catch (e) {
            this.hideImportPreview();
          }
        } else {
          this.hideImportPreview();
        }
      });
    }

    // Botón: Confirmar Restauración
    const btnConfirmImport = document.getElementById('btn-confirm-import');
    if (btnConfirmImport) {
      btnConfirmImport.addEventListener('click', () => {
        if (!this.currentImportPayload) return;
        try {
          const count = this.restorePayload(this.currentImportPayload);
          this.showToast(`🎉 ¡Progreso restaurado con éxito! (${count} elementos actualizados)`);
          closeModal();
          // Actualizar resumen en la página
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        } catch (e) {
          alert('Error al restaurar los datos: ' + e.message);
        }
      });
    }
  }

  processFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = this.parseImportData(event.target.result);
        this.displayImportPreview(parsed);
      } catch (e) {
        alert('El archivo no es una copia de seguridad válida: ' + e.message);
      }
    };
    reader.readAsText(file);
  }

  displayImportPreview(parsed) {
    this.currentImportPayload = parsed;
    const previewBox = document.getElementById('import-preview-box');
    const details = document.getElementById('import-preview-details');
    const confirmBtn = document.getElementById('btn-confirm-import');

    if (!previewBox || !details || !confirmBtn) return;

    const count = Object.keys(parsed.storage || {}).length;
    const dateStr = parsed.exportedAt ? new Date(parsed.exportedAt).toLocaleString() : 'Fecha desconocida';

    let html = `<strong>Fecha de la copia:</strong> ${dateStr}<br>`;
    html += `<strong>Registros encontrados:</strong> ${count} elementos.<br>`;

    if (parsed.progressSummary && parsed.progressSummary.games) {
      const g = parsed.progressSummary.games;
      const parts = [];
      if (g.sudokuArena > 0) parts.push(`⚔️ Sudoku Arena (${g.sudokuArena})`);
      if (g.topSudoku > 0) parts.push(`🎓 Top-Sudoku (${g.topSudoku})`);
      if (g.nonogramas > 0) parts.push(`🎨 Nonogramas (${g.nonogramas})`);
      if (g.rubik > 0) parts.push(`🧊 Rubik (${g.rubik})`);
      if (g.calculoTactico > 0) parts.push(`⚡ Cálculo (${g.calculoTactico})`);
      if (g.deduccion > 0) parts.push(`🕵️ Deducción (${g.deduccion})`);
      if (g.damas > 0) parts.push(`👑 Damas (${g.damas})`);
      if (parts.length > 0) {
        html += `<small style="display:block; margin-top:0.35rem; color:var(--cyan-300);">${parts.join(' • ')}</small>`;
      }
    }

    details.innerHTML = html;
    previewBox.classList.remove('hidden');
    confirmBtn.disabled = false;
  }

  hideImportPreview() {
    this.currentImportPayload = null;
    const previewBox = document.getElementById('import-preview-box');
    const confirmBtn = document.getElementById('btn-confirm-import');
    if (previewBox) previewBox.classList.add('hidden');
    if (confirmBtn) confirmBtn.disabled = true;
  }

  updateDetectedSummary() {
    const summaryContainer = document.getElementById('backup-detected-summary');
    if (!summaryContainer) return;

    const summary = this.scanLocalProgress();
    if (summary.totalKeys === 0) {
      summaryContainer.innerHTML = `
        <div class="summary-badge warning">
          <span>ℹ️ Aún no tienes partidas guardadas en este navegador. Al jugar se registrarán aquí automáticamente.</span>
        </div>
      `;
      return;
    }

    const g = summary.games;
    const items = [];
    if (g.sudokuArena > 0) items.push(`⚔️ ${g.sudokuArena} partidas de Sudoku Arena`);
    if (g.nonogramas > 0) items.push(`🎨 ${g.nonogramas} mosaicos en Nonogramas`);
    if (g.rubik > 0) items.push(`🧊 ${g.rubik} tiempos de Cubo de Rubik`);
    if (g.calculoTactico > 0) items.push(`⚡ ${g.calculoTactico} registros de Cálculo Táctico`);
    if (g.topSudoku > 0) items.push(`🎓 ${g.topSudoku} datos de Top-Sudoku`);
    if (g.deduccion > 0) items.push(`🕵️ ${g.deduccion} casos de Deducción Lógica`);
    if (g.damas > 0) items.push(`👑 ${g.damas} datos de Damas`);

    summaryContainer.innerHTML = `
      <div class="summary-badge success">
        <span>✅ <strong>${summary.totalKeys} claves de progreso detectadas:</strong></span>
        <div class="summary-pills">
          ${items.map(it => `<span class="summary-pill">${it}</span>`).join('')}
        </div>
      </div>
    `;
  }
}
