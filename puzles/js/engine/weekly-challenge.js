/**
 * Puzles del Club — Reto Semanal Oficial
 * Cada lunes a las 00:00 se estrena un desafío semanal sincronizado por calendario
 * con semilla matemática universal y categorías de honor (Diamante, Oro, Plata, Bronce).
 */

class WeeklyChallengeEngine {
  constructor() {
    this.STORAGE_KEY = 'puzles_weekly_history_v1';
  }

  getWeekIdentifier() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const pastDaysOfYear = (now - startOfYear) / 86400000;
    const weekNum = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${weekNum.toString().padStart(2, '0')}`;
  }

  getCurrentChallenge() {
    const weekId = this.getWeekIdentifier();

    // Rotación de temas según la semana
    const themes = [
      {
        id: 'preset_riviera',
        title: 'Reto Semanal: Riviera Mediterránea',
        subtitle: 'Sinfonía marina bajo el sol de la costa',
        difficulty: 'dificil',
        pieces: 96,
        targetTime: 600, // 10 min
        seed: 77889901
      },
      {
        id: 'preset_alpes',
        title: 'Reto Semanal: Reflejos Alpinos',
        subtitle: 'Percepción espacial sobre aguas cristalinas',
        difficulty: 'dificil',
        pieces: 96,
        targetTime: 660, // 11 min
        seed: 33445566
      },
      {
        id: 'preset_venecia',
        title: 'Reto Semanal: Serenata en Venecia',
        subtitle: 'Detalles arquitectónicos y mosaico veneciano',
        difficulty: 'dificil',
        pieces: 96,
        targetTime: 580,
        seed: 55667788
      },
      {
        id: 'preset_cosmos',
        title: 'Reto Semanal: Mosaico Cósmico',
        subtitle: 'Desafío abstracto de intuición y patrones estelares',
        difficulty: 'dificil',
        pieces: 96,
        targetTime: 720,
        seed: 99112233
      }
    ];

    const weekHash = this.hashString(weekId);
    const selected = themes[Math.abs(weekHash) % themes.length];

    const history = this.getHistory();
    const isCompleted = !!history[weekId];

    return {
      weekId,
      ...selected,
      isCompleted,
      completionData: history[weekId] || null
    };
  }

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

  getHistory() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  saveCompletion(weekId, result) {
    const history = this.getHistory();

    // Determinar categoría de honor
    let badge = 'bronce';
    let badgeLabel = 'Medalla de Bronce';
    if (result.pureMastery && result.timeSeconds <= 480) {
      badge = 'diamante';
      badgeLabel = 'Corona de Diamante';
    } else if (result.pureMastery && result.timeSeconds <= 720) {
      badge = 'oro';
      badgeLabel = 'Medalla de Oro';
    } else if (result.timeSeconds <= 900) {
      badge = 'plata';
      badgeLabel = 'Medalla de Plata';
    }

    history[weekId] = {
      ...result,
      badge,
      badgeLabel,
      completedAt: new Date().toLocaleDateString()
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    return history[weekId];
  }
}

window.WeeklyChallengeEngine = WeeklyChallengeEngine;
