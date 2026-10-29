/**
 * Puzles del Club — Motor de Puntuación Cognitiva & Cronómetro
 * Calcula la puntuación táctica según el tipo de pieza (esquina, marco o interior),
 * multiplicadores de dificultad, combos de velocidad, penalización por ayudas
 * y techo teórico máximo de puntos.
 */

class ScoringEngine {
  constructor() {
    this.score = 0;
    this.maxTheoreticalScore = 10000;
    this.difficulty = 'facil';
    this.diffMultiplier = 1.0;
    this.startTime = null;
    this.elapsedSeconds = 0;
    this.timerInterval = null;
    this.isTimerRunning = false;

    // Sistema de rachas / combos rápidos
    this.lastPlacementTime = 0;
    this.comboCount = 0;
    this.comboMultiplier = 1.0;

    // Ayudas
    this.ghostImageUsed = false;
    this.peeksCount = 0;
    this.placementsCount = 0;
    this.totalPieces = 24;

    this.onTick = null;
    this.onScoreChange = null;
  }

  // Inicializar o reiniciar para un nuevo puzle
  init(difficulty, pieces) {
    this.difficulty = difficulty;
    this.totalPieces = pieces.length;
    this.score = 0;
    this.elapsedSeconds = 0;
    this.comboCount = 0;
    this.comboMultiplier = 1.0;
    this.lastPlacementTime = 0;
    this.ghostImageUsed = false;
    this.peeksCount = 0;
    this.placementsCount = 0;
    this.stopTimer();

    // Multiplicador por nivel
    switch (difficulty) {
      case 'facil': this.diffMultiplier = 1.0; break;
      case 'medio': this.diffMultiplier = 1.5; break;
      case 'dificil': this.diffMultiplier = 2.5; break;
      case 'muy_dificil': this.diffMultiplier = 4.0; break;
      default: this.diffMultiplier = 1.0; break;
    }

    // Calcular techo teórico máximo de puntos
    let baseSum = 0;
    pieces.forEach(p => {
      if (p.isCorner) baseSum += 40;
      else if (p.isEdge) baseSum += 60;
      else baseSum += 120;
    });

    // Bonificación de completado limpio
    const completionBonus = 1500;
    this.maxTheoreticalScore = Math.round((baseSum + completionBonus) * this.diffMultiplier);

    if (this.onScoreChange) {
      this.onScoreChange(this.score, this.maxTheoreticalScore, 1.0, 0);
    }
  }

  startTimer() {
    if (this.isTimerRunning) return;
    this.isTimerRunning = true;
    this.startTime = Date.now() - (this.elapsedSeconds * 1000);

    this.timerInterval = setInterval(() => {
      this.elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
      if (this.onTick) {
        this.onTick(this.formatTime(this.elapsedSeconds), this.elapsedSeconds);
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.isTimerRunning = false;
  }

  formatTime(totalSec) {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  recordGhostPeek() {
    this.ghostImageUsed = true;
    this.peeksCount++;
  }

  /**
   * Puntuación al encajar una pieza correctamente
   * @param {Object} piece - La pieza colocada
   * @param {boolean} isGhostActive - Si la imagen fantasma estaba activa en ese momento
   */
  scorePiecePlacement(piece, isGhostActive = false) {
    this.startTimer();
    this.placementsCount++;

    const now = Date.now();
    // Detección de racha: menos de 4.5 segundos desde la última colocación
    if (this.lastPlacementTime > 0 && (now - this.lastPlacementTime) < 4500) {
      this.comboCount++;
    } else {
      this.comboCount = 1;
    }
    this.lastPlacementTime = now;

    // Multiplicador de combo
    if (this.comboCount >= 4) {
      this.comboMultiplier = 2.0;
    } else if (this.comboCount === 3) {
      this.comboMultiplier = 1.5;
    } else if (this.comboCount === 2) {
      this.comboMultiplier = 1.2;
    } else {
      this.comboMultiplier = 1.0;
    }

    // Puntos base por tipo de pieza
    let basePoints = 120; // Interior por defecto
    if (piece.isCorner) basePoints = 40;
    else if (piece.isEdge) basePoints = 60;

    // Penalización por tener la imagen fantasma activa
    let penaltyMultiplier = 1.0;
    if (isGhostActive) {
      penaltyMultiplier = 0.85; // 15% menos de puntos si se copia con la plantilla
    }

    const earned = Math.round(basePoints * this.diffMultiplier * this.comboMultiplier * penaltyMultiplier);
    this.score += earned;

    if (this.onScoreChange) {
      this.onScoreChange(this.score, this.maxTheoreticalScore, this.comboMultiplier, this.comboCount, earned);
    }

    return {
      earned,
      combo: this.comboCount,
      multiplier: this.comboMultiplier
    };
  }

  // Bonificación final al completar todo el tablero
  calculateFinalVictoryScore() {
    this.stopTimer();

    // Bonificación de victoria según velocidad (deducción progresiva suave)
    // 1 punto descontado por cada 2 segundos transcurridos
    const timeDecay = Math.floor(this.elapsedSeconds * 0.5);
    const speedBonus = Math.max(200, Math.round(1500 * this.diffMultiplier) - timeDecay);

    // Si nunca usó imagen fantasma: Medalla de Maestría Pura
    const pureBonus = (!this.ghostImageUsed) ? Math.round(800 * this.diffMultiplier) : 0;

    this.score = Math.min(this.maxTheoreticalScore, this.score + speedBonus + pureBonus);

    return {
      finalScore: this.score,
      maxScore: this.maxTheoreticalScore,
      timeSeconds: this.elapsedSeconds,
      formattedTime: this.formatTime(this.elapsedSeconds),
      pureMastery: !this.ghostImageUsed,
      peeksCount: this.peeksCount
    };
  }
}

window.ScoringEngine = ScoringEngine;
