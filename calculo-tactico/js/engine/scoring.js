/**
 * CÁLCULO TÁCTICO RELÁMPAGO — Motor de Puntuación y Auditoría Cognitiva (Scoring)
 */

class ScoringEngine {
  /**
   * Calcula el desglose completo de puntuación al finalizar una partida.
   * @param {object} params
   * @param {number} params.target Cifra diana
   * @param {number} params.achieved Cifra alcanzada por el jugador
   * @param {number} params.timeSpent Segundos invertidos
   * @param {number} params.timeLimit Límite total de tiempo
   * @param {number} params.stepsCount Número de operaciones realizadas
   * @param {string} params.difficulty Nivel de dificultad
   * @param {object} [params.optimalSolution] Solución del solver
   * @returns {object}
   */
  static evaluate({ target, achieved, timeSpent, timeLimit, stepsCount, difficulty, optimalSolution }) {
    const diff = Math.abs(target - achieved);
    const isExact = (diff === 0);
    const timeRemaining = Math.max(0, timeLimit - timeSpent);

    // 1. Puntos Base por Exactitud
    let baseScore = 0;
    if (isExact) {
      baseScore = 1000;
    } else if (diff === 1) {
      baseScore = 700;
    } else if (diff <= 5) {
      baseScore = Math.max(100, 500 - (diff * 60));
    } else if (diff <= 10) {
      baseScore = 200;
    } else if (diff <= 20) {
      baseScore = 100;
    } else {
      baseScore = Math.max(0, 50 - diff);
    }

    // Multiplicador por dificultad
    const diffMultipliers = {
      facil: 0.8,
      medio: 1.0,
      dificil: 1.25,
      endemoniado: 1.5
    };
    const mult = diffMultipliers[difficulty] || 1.0;
    baseScore = Math.round(baseScore * mult);

    // 2. Bonus de Rapidez (Coste de oportunidad)
    // Solo aplica si llegó a la diana o diferencia <= 2
    let speedBonus = 0;
    if (diff <= 2) {
      speedBonus = Math.round(timeRemaining * 12 * mult);
    }

    // 3. Bonus de Elegancia Matemática (economía de fichas)
    let eleganceBonus = 0;
    if (isExact) {
      if (stepsCount <= 3) eleganceBonus = 150;
      else if (stepsCount === 4) eleganceBonus = 80;
      else eleganceBonus = 30;
    }

    const totalScore = baseScore + speedBonus + eleganceBonus;

    // 4. Determinación de Rango de Honor del Club
    let rank = 'Aspirante del Club';
    let rankIcon = '⏳';
    let rankColor = '#94a3b8';

    if (isExact) {
      if (timeSpent <= 25) {
        rank = 'Gran Maestro del Relámpago';
        rankIcon = '👑';
        rankColor = '#fbbf24';
      } else if (timeSpent <= 45) {
        rank = 'Calculador Táctico Quirúrgico';
        rankIcon = '⚡';
        rankColor = '#38bdf8';
      } else {
        rank = 'Estratega Numérico';
        rankIcon = '🥇';
        rankColor = '#34d399';
      }
    } else if (diff <= 2) {
      rank = 'Aproximador de Élite';
      rankIcon = '🥈';
      rankColor = '#a78bfa';
    } else if (diff <= 5) {
      rank = 'Calculador Resiliente';
      rankIcon = '🥉';
      rankColor = '#f59e0b';
    }

    return {
      target,
      achieved,
      diff,
      isExact,
      timeSpent,
      timeRemaining,
      timeLimit,
      stepsCount,
      difficulty,
      baseScore,
      speedBonus,
      eleganceBonus,
      totalScore,
      rank,
      rankIcon,
      rankColor,
      timestamp: Date.now()
    };
  }
}

if (typeof window !== 'undefined') {
  window.ScoringEngine = ScoringEngine;
}
