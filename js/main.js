/**
 * CLUB DEL INGENIO — Lógica Interactiva y Adaptador de Entorno
 * Maneja la navegación, el modal de apoyo ético, la resolución inteligente
 * de rutas (Localhost Laragon vs Producción en clubdelingenio.es) y el puente de migración.
 */

import { ClubBackupManager } from './backup-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  initEnvironmentLinks();
  initSupportModal();
  initSmoothScroll();
  window.clubBackup = new ClubBackupManager();
});

/**
 * 1. Adaptador inteligente de enlaces
 * Mantiene las rutas relativas directas hacia las subcarpetas top-sudoku/ y sudoku-arena/
 */
function initEnvironmentLinks() {
  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1';
  const isLaragonTest = host.endsWith('.test');

  let topSudokuBase = '../top-sudoku/';
  let sudokuArenaBase = '../sudoku-arena/';

  if (isLaragonTest) {
    topSudokuBase = 'http://top-sudoku.test/';
    sudokuArenaBase = 'http://sudoku-arena.test/';
  } else if (!isLocal && host.includes('clubdelingenio')) {
    topSudokuBase = '/top-sudoku/';
    sudokuArenaBase = '/sudoku-arena/';
  }

  // Actualizar todos los enlaces que apunten a top-sudoku
  document.querySelectorAll('a[href*="top-sudoku"]').forEach(a => {
    const rawHref = a.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('http')) return;
    const subpath = rawHref.replace(/^(\.\.\/)?top-sudoku\/?/, '');
    a.href = topSudokuBase + subpath;
  });

  // Actualizar todos los enlaces que apunten a sudoku-arena
  document.querySelectorAll('a[href*="sudoku-arena"]').forEach(a => {
    const rawHref = a.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('http')) return;
    const subpath = rawHref.replace(/^(\.\.\/)?sudoku-arena\/?/, '');
    a.href = sudokuArenaBase + subpath;
  });
}

/**
 * 2. Modal de Apoyo Ético (Micropago Voluntario 3 €)
 */
function initSupportModal() {
  const modal = document.getElementById('modal-support');
  const openBtn = document.getElementById('btn-open-support');
  const closeBtn = document.getElementById('btn-close-modal');
  const ackBtn = document.getElementById('btn-ack-support');

  if (!modal || !openBtn) return;

  const openModal = () => {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (ackBtn) ackBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/**
 * 3. Desplazamiento Suave
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * 4. Puente de Migración desde GitHub Pages hacia Club del Ingenio
 * Si un usuario llega con ?traspaso=..., se desempaqueta y se guarda en localStorage
 */
function initMigrationBridge() {
  try {
    const params = new URLSearchParams(window.location.search);
    const traspasoPayload = params.get('traspaso');

    if (traspasoPayload) {
      const decodedJson = decodeURIComponent(atob(traspasoPayload));
      const backupData = JSON.parse(decodedJson);

      if (backupData && typeof backupData === 'object') {
        // Restaurar claves en localStorage del nuevo dominio
        if (backupData.history) localStorage.setItem('sudoku_arena_player_history_v1', JSON.stringify(backupData.history));
        if (backupData.vault) localStorage.setItem('sudoku_arena_vault_v1', JSON.stringify(backupData.vault));
        if (backupData.profile) localStorage.setItem('sudoku_arena_player_master_profile_v1', JSON.stringify(backupData.profile));
        if (backupData.weekly) localStorage.setItem('sudoku_arena_weekly_history_v1', JSON.stringify(backupData.weekly));

        // Limpiar URL sin recargar
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);

        showMigrationToast('🎉 ¡Bienvenido a Club del Ingenio! Tu perfil, historial y récords se han transferido con éxito.');
      }
    }
  } catch (e) {
    console.error('Error al procesar el puente de migración:', e);
  }
}

function showMigrationToast(message) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '2rem';
  toast.style.right = '2rem';
  toast.style.background = '#0f172a';
  toast.style.color = '#38bdf8';
  toast.style.border = '1px solid #38bdf8';
  toast.style.padding = '1rem 1.5rem';
  toast.style.borderRadius = '12px';
  toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
  toast.style.zIndex = '9999';
  toast.style.fontSize = '0.95rem';
  toast.style.fontWeight = '600';
  toast.style.maxWidth = '380px';
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.5s ease';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 500);
  }, 6000);
}
