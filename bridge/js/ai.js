/**
 * Bridge del Club — Motor de Inteligencia Artificial de Defensores (Este y Oeste)
 * Aplica reglas estrictas de Bridge y heurísticas clásicas de carteo defensivo.
 */

import { evaluateTrick } from './deck.js';

export class BridgeAI {
  /**
   * Selecciona la mejor carta para jugar según la posición y situación de la baza
   * @param {string} player 'E' o 'W'
   * @param {Array<Card>} hand Cartas actuales en la mano del jugador
   * @param {Array<{player: string, card: Card}>} currentTrick Cartas ya jugadas en la baza actual
   * @param {string} trumpSuit Palo de triunfo ('S', 'H', 'D', 'C', 'NT')
   * @param {Object} gameState Estado global de la mano
   * @returns {Card} Carta seleccionada
   */
  static chooseCard(player, hand, currentTrick, trumpSuit, gameState) {
    if (!hand || hand.length === 0) return null;

    // 1. Si el jugador abre la baza (salida)
    if (currentTrick.length === 0) {
      return this.chooseOpeningLead(player, hand, trumpSuit, gameState);
    }

    const leadCard = currentTrick[0].card;
    const leadSuit = leadCard.suitKey;

    // 2. Obligación reglamentaria: asistir al palo de salida
    const legalFollowCards = hand.filter(c => c.suitKey === leadSuit);

    if (legalFollowCards.length > 0) {
      return this.chooseFollowPlay(player, legalFollowCards, currentTrick, trumpSuit);
    }

    // 3. Fallo o descarte si no tiene del palo
    return this.chooseDiscardOrTrump(player, hand, currentTrick, trumpSuit);
  }

  /**
   * Salida (primer jugador de la baza)
   */
  static chooseOpeningLead(player, hand, trumpSuit, gameState) {
    // Si tenemos una secuencia de honores (ej: K-Q-J o Q-J-10), salir con la más alta de la secuencia
    const bySuit = {};
    hand.forEach(c => {
      bySuit[c.suitKey] = bySuit[c.suitKey] || [];
      bySuit[c.suitKey].push(c);
    });

    // Intentar no salir de triunfo de inicio
    const suitsToConsider = Object.keys(bySuit).filter(s => s !== trumpSuit);
    const chosenSuitKey = suitsToConsider.length > 0
      ? suitsToConsider[Math.floor(Math.random() * suitsToConsider.length)]
      : Object.keys(bySuit)[0];

    const cardsInSuit = bySuit[chosenSuitKey].sort((a, b) => b.rankValue - a.rankValue);

    // Salir de la 4ª mejor en palos largos o carta más alta de secuencia
    if (cardsInSuit.length >= 4) {
      return cardsInSuit[3]; // 4ª mejor clásica
    }
    // O la más alta si tenemos honor único con apoyo
    return cardsInSuit[cardsInSuit.length - 1]; // Carta baja de salida pasiva
  }

  /**
   * Asistir al palo de salida
   */
  static chooseFollowPlay(player, legalCards, currentTrick, trumpSuit) {
    legalCards.sort((a, b) => a.rankValue - b.rankValue); // De menor a mayor
    const lowest = legalCards[0];
    const highest = legalCards[legalCards.length - 1];

    const currentWinner = evaluateTrick(currentTrick, trumpSuit);
    const partner = (player === 'E') ? 'W' : 'E';
    const partnerIsWinning = currentWinner.winner === partner;

    // Si mi compañero ya está ganando la baza con una carta sólida, juego la más baja
    if (partnerIsWinning && currentWinner.winningCard.rankValue >= 11) {
      return lowest;
    }

    // Si somos la 3ª mano (intentar ganar la baza)
    if (currentTrick.length === 2) {
      // "Tercera mano juega alto" si puede superar al actual ganador
      if (highest.rankValue > currentWinner.winningCard.rankValue) {
        return highest;
      }
      return lowest;
    }

    // Si somos la 4ª mano (última carta de la baza)
    if (currentTrick.length === 3) {
      if (partnerIsWinning) {
        return lowest;
      }
      // Si podemos ganar con la menor carta posible que supere al rival
      const winningCards = legalCards.filter(c => c.rankValue > currentWinner.winningCard.rankValue);
      if (winningCards.length > 0) {
        return winningCards[0]; // La ganadora más económica
      }
      return lowest;
    }

    // Si somos la 2ª mano: regla clásica "Segunda mano juega bajo"
    return lowest;
  }

  /**
   * No tiene del palo: decidir si fallar con triunfo o descartar
   */
  static chooseDiscardOrTrump(player, hand, currentTrick, trumpSuit) {
    const trumps = (trumpSuit !== 'NT') ? hand.filter(c => c.suitKey === trumpSuit) : [];
    const nonTrumps = hand.filter(c => c.suitKey !== trumpSuit);

    const currentWinner = evaluateTrick(currentTrick, trumpSuit);
    const partner = (player === 'E') ? 'W' : 'E';

    // Si mi compañero ya gana la baza, no desperdiciar triunfo: descartar carta más baja inútil
    if (currentWinner && currentWinner.winner === partner) {
      return this.getCheapestDiscard(nonTrumps.length > 0 ? nonTrumps : hand);
    }

    // Si podemos fallar con triunfo
    if (trumps.length > 0) {
      trumps.sort((a, b) => a.rankValue - b.rankValue);
      // Si el rival ya falló, debemos superarlo con un triunfo mayor si lo tenemos
      if (currentWinner && currentWinner.winningCard.suitKey === trumpSuit) {
        const overtrumps = trumps.filter(t => t.rankValue > currentWinner.winningCard.rankValue);
        if (overtrumps.length > 0) return overtrumps[0];
      } else {
        // Fallo con el triunfo más pequeño
        return trumps[0];
      }
    }

    // Si no podemos fallar o no conviene, descartamos la carta más baja de un palo débil
    return this.getCheapestDiscard(nonTrumps.length > 0 ? nonTrumps : hand);
  }

  static getCheapestDiscard(cards) {
    return [...cards].sort((a, b) => a.rankValue - b.rankValue)[0];
  }
}
