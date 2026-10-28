/**
 * Bridge del Club — Sistema Oficial de Puntuación Duplicada de Torneo
 * Calcula con exactitud matemática las puntuaciones reglamentarias de Bridge:
 * Bazas contratadas, bonificaciones de manga, slams, sobrebazas y caídas.
 */

export class BridgeScoring {
  /**
   * Calcula el desglose oficial de puntos de una mano de Bridge
   * @param {Object} params
   * @param {string} params.contract Contrato final (ej: '4S', '3NT', '2H', '5C')
   * @param {number} params.tricksWon Bazas conseguidas por la pareja declaradora (0 a 13)
   * @param {boolean} [params.doubled=false] Si el contrato fue Doblado (X)
   * @param {boolean} [params.redoubled=false] Si el contrato fue Redoblado (XX)
   * @param {boolean} [params.vulnerable=false] Vulnerabilidad
   * @returns {Object} Desglose completo de puntuación
   */
  static calculateScore({ contract, tricksWon, doubled = false, redoubled = false, vulnerable = false }) {
    if (!contract || contract === 'PASS') {
      return { totalScore: 0, text: 'Mano pasada sin jugar (0 pts)', breakdown: [] };
    }

    const level = parseInt(contract[0], 10);
    const strain = contract.substring(1); // 'C', 'D', 'H', 'S', 'NT'
    const targetTricks = level + 6;
    const difference = tricksWon - targetTricks;
    const isSuccess = difference >= 0;

    const breakdown = [];
    let totalScore = 0;

    if (isSuccess) {
      // 1. Puntos por bazas contratadas (Trick Points)
      let trickUnit = 0;
      let firstNTBonus = 0;

      if (strain === 'C' || strain === 'D') {
        trickUnit = 20; // Menores
      } else if (strain === 'H' || strain === 'S') {
        trickUnit = 30; // Mayores
      } else if (strain === 'NT') {
        trickUnit = 30;
        firstNTBonus = 10; // La primera baza de NT vale 40 (30 + 10)
      }

      let baseTrickPoints = (level * trickUnit) + firstNTBonus;
      if (doubled) baseTrickPoints *= 2;
      if (redoubled) baseTrickPoints *= 4;

      breakdown.push({
        concept: `Bazas contratadas (${level} ${strain})`,
        points: baseTrickPoints
      });
      totalScore += baseTrickPoints;

      // 2. Bonificación por Contrato (Manga vs Parcial)
      const isGame = baseTrickPoints >= 100;
      if (isGame) {
        const gameBonus = vulnerable ? 500 : 300;
        breakdown.push({
          concept: `Bonificación de Manga (Game)`,
          points: gameBonus
        });
        totalScore += gameBonus;
      } else {
        // Contrato parcial
        const partScoreBonus = 50;
        breakdown.push({
          concept: 'Bonificación de Contrato Parcial',
          points: partScoreBonus
        });
        totalScore += partScoreBonus;
      }

      // 3. Bonificación por Slam (Pequeño Slam = nivel 6, Gran Slam = nivel 7)
      if (level === 6) {
        const smallSlamBonus = vulnerable ? 750 : 500;
        breakdown.push({
          concept: 'Bonificación de Pequeño Slam (12 bazas)',
          points: smallSlamBonus
        });
        totalScore += smallSlamBonus;
      } else if (level === 7) {
        const grandSlamBonus = vulnerable ? 1500 : 1000;
        breakdown.push({
          concept: 'Bonificación de Gran Slam (13 bazas)',
          points: grandSlamBonus
        });
        totalScore += grandSlamBonus;
      }

      // 4. Sobrebazas (Overtricks)
      if (difference > 0) {
        let overtrickRate = 0;
        if (!doubled && !redoubled) {
          overtrickRate = (strain === 'C' || strain === 'D') ? 20 : 30;
        } else if (doubled) {
          overtrickRate = vulnerable ? 200 : 100;
        } else if (redoubled) {
          overtrickRate = vulnerable ? 400 : 200;
        }

        const overtrickPoints = difference * overtrickRate;
        breakdown.push({
          concept: `Sobrebazas (+${difference} extra)`,
          points: overtrickPoints
        });
        totalScore += overtrickPoints;
      }

    } else {
      // CONTRATO CAÍDO (Multas a favor de la defensa)
      const down = Math.abs(difference);
      let penalty = 0;

      if (!doubled && !redoubled) {
        penalty = down * (vulnerable ? 100 : 50);
      } else if (doubled) {
        if (!vulnerable) {
          // No vulnerable doblado: 100 por la 1ª, 200 por 2ª y 3ª, 300 subsiguientes
          if (down === 1) penalty = 100;
          else if (down === 2) penalty = 300;
          else if (down === 3) penalty = 500;
          else penalty = 500 + (down - 3) * 300;
        } else {
          // Vulnerable doblado: 200 por la 1ª, 300 subsiguientes
          penalty = 200 + (down - 1) * 300;
        }
      } else if (redoubled) {
        penalty = doubled ? penalty * 2 : 200 * down;
      }

      breakdown.push({
        concept: `Multas por caída (-${down} bazas)`,
        points: -penalty
      });
      totalScore = -penalty; // Negativo para el declarador
    }

    return {
      contract,
      level,
      strain,
      targetTricks,
      tricksWon,
      difference,
      isSuccess,
      doubled,
      redoubled,
      vulnerable,
      totalScore,
      breakdown
    };
  }
}
