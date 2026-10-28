/**
 * CLUB DEL INGENIO — Lógica Interactiva y Adaptador de Entorno
 * Maneja la navegación, el modal de apoyo ético, la resolución inteligente
 * de rutas (Localhost Laragon vs Producción en clubdelingenio.es) y el puente de migración.
 */

import { ClubBackupManager } from './backup-manager.js';
import { ClubI18n } from './i18n.js';
import { HallOfFameWidget } from './hall-of-fame-widget.js';

document.addEventListener('DOMContentLoaded', () => {
  seedGuillermoHistory();
  initEnvironmentLinks();
  initSmoothScroll();
  initMigrationBridge();
  window.clubI18n = new ClubI18n();
  window.clubBackup = new ClubBackupManager();
  window.clubHallOfFame = new HallOfFameWidget();
  window.clubHallOfFame.init();
});

/**
 * 1. Adaptador inteligente de enlaces
 * Mantiene las rutas relativas directas hacia las subcarpetas top-sudoku/ y sudoku-arena/
 */
function initEnvironmentLinks() {
  const host = window.location.hostname;
  const isLaragonTest = host.endsWith('.test');

  let topSudokuBase = 'top-sudoku/';
  let sudokuArenaBase = 'sudoku-arena/';

  if (isLaragonTest) {
    topSudokuBase = 'http://top-sudoku.test/';
    sudokuArenaBase = 'http://sudoku-arena.test/';
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

/**
 * 5. Carga del Historial y Récords Maestros de Guillermo desde Sudoku Arena
 * Garantiza que en clubdelingenio.com se disponga siempre de su historial real de Gran Maestro
 */
function seedGuillermoHistory() {
  try {
    const historyKey = 'sudoku_arena_player_history_v1';
    const vaultKey = 'sudoku_arena_vault_v1';
    const profileKey = 'sudoku_arena_player_master_profile_v1';

    const currentHistory = localStorage.getItem(historyKey);
    let historyList = [];
    try {
      historyList = currentHistory ? JSON.parse(currentHistory) : [];
    } catch (e) {
      historyList = [];
    }

    // Si no hay historial o está vacío, sembrar las 3 partidas reales de Guillermo
    if (!Array.isArray(historyList) || historyList.length === 0) {
      const guillermoGames = [
        {
          id: "game_2",
          timestamp: 1729760880000,
          difficulty: "dificil",
          mode: "standard",
          seed: 67890,
          score: 1705,
          maxTheoreticalScore: 1840,
          autonomyIndex: 93,
          rank: "Gran Maestro Puro (Mente de Acero)",
          rankKey: "rank_grandmaster",
          timeSeconds: 1286,
          peeksCount: 0,
          errorsCount: 9,
          date: "2024-10-24"
        },
        {
          id: "game_3",
          timestamp: 1729683000000,
          difficulty: "dificil",
          mode: "standard",
          seed: 99999,
          score: 1680,
          maxTheoreticalScore: 1815,
          autonomyIndex: 93,
          rank: "Gran Maestro Puro (Mente de Acero)",
          rankKey: "rank_grandmaster",
          timeSeconds: 1476,
          peeksCount: 0,
          errorsCount: 9,
          date: "2024-10-23"
        },
        {
          id: "game_1",
          timestamp: 1729884840000,
          difficulty: "dificil",
          mode: "standard",
          seed: 12345,
          score: 1605,
          maxTheoreticalScore: 1680,
          autonomyIndex: 96,
          rank: "Gran Maestro Puro (Mente de Acero)",
          rankKey: "rank_grandmaster",
          timeSeconds: 3127,
          peeksCount: 0,
          errorsCount: 5,
          date: "2024-10-25"
        }
      ];
      localStorage.setItem(historyKey, JSON.stringify(guillermoGames));
    }

    // Bóveda de sudokus escaneados por Guillermo
    const currentVault = localStorage.getItem(vaultKey);
    let vaultList = [];
    try {
      vaultList = currentVault ? JSON.parse(currentVault) : [];
    } catch (e) {
      vaultList = [];
    }
    if (!Array.isArray(vaultList) || vaultList.length === 0) {
      const guillermoVault = [
        {
          id: "vault_1792446017139_608",
          name: "Reto Diario El Pais",
          board: [[0,0,0,6,0,0,4,0,0],[7,0,0,0,0,3,6,0,0],[0,0,0,0,9,1,0,8,0],[0,0,0,0,0,0,0,0,0],[0,5,0,1,8,0,0,0,3],[0,0,0,3,0,6,0,4,5],[0,4,0,2,0,0,0,6,0],[9,0,3,0,0,0,0,0,0],[0,2,0,0,0,0,1,0,0]],
          boardString: "000600400700003600000091080000000000050180003000306045040200060903000000020000100",
          difficulty: "medio",
          cluesCount: 23,
          clues: 23,
          initialTotalPoints: 0,
          techniqueAudit: null,
          origin: "scan",
          createdAt: 1792446017139,
          bestScore: 0,
          bestTime: 0,
          bestRank: null,
          timesPlayed: 0
        },
        {
          id: "vault_1792445787185_303",
          name: "Reto El Mundo",
          board: [[0,0,0,6,0,0,4,0,0],[7,0,0,0,0,3,6,0,0],[0,0,0,0,9,1,0,8,0],[0,0,0,0,0,0,0,0,0],[0,5,0,1,8,0,0,0,3],[0,0,0,3,0,6,0,4,5],[0,4,0,2,0,0,0,6,0],[9,0,3,0,0,0,0,0,0],[0,2,0,0,0,0,1,0,0]],
          boardString: "000600400700003600000091080000000000050180003000306045040200060903000000020000100",
          difficulty: "medio",
          cluesCount: 23,
          clues: 23,
          initialTotalPoints: 0,
          techniqueAudit: null,
          origin: "scan",
          createdAt: 1792445787185,
          bestScore: 0,
          bestTime: 0,
          bestRank: null,
          timesPlayed: 0
        },
        {
          id: "vault_1792445349872_247",
          name: "Sudoku Diario El Mundo",
          board: [[0,0,0,6,0,0,4,0,0],[7,0,0,0,0,3,6,0,0],[0,0,0,0,9,1,0,8,0],[0,0,0,0,0,0,0,0,0],[0,5,0,1,8,0,0,0,3],[0,0,0,3,0,6,0,4,5],[0,4,0,2,0,0,0,6,0],[9,0,3,0,0,0,0,0,0],[0,2,0,0,0,0,1,0,0]],
          boardString: "000600400700003600000091080000000000050180003000306045040200060903000000020000100",
          difficulty: "medio",
          cluesCount: 23,
          clues: 23,
          initialTotalPoints: 0,
          techniqueAudit: null,
          origin: "scan",
          createdAt: 1792445349872,
          bestScore: 0,
          bestTime: 0,
          bestRank: null,
          timesPlayed: 0
        }
      ];
      localStorage.setItem(vaultKey, JSON.stringify(guillermoVault));
    }

    // Perfil de Gran Maestro Fundador
    if (!localStorage.getItem(profileKey)) {
      localStorage.setItem(profileKey, JSON.stringify({
        deviceUuid: 'founder_guillermo',
        name: 'Guillermo T.',
        country: 'ES',
        countryName: 'España',
        flag: '🇪🇸',
        city: 'Madrid',
        age: 73,
        ageGroup: 'legend',
        isFounder: true
      }));
    }
  } catch (e) {
    console.warn('Error al inicializar historial de Guillermo:', e);
  }
}

