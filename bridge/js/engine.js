/**
 * Bridge del Club — Motor de Reglas y Ciclo de Bazas (MiniBridge)
 * Administra el flujo de turnos, validación de jugadas reglamentarias y contabilidad de contrato.
 */

import { evaluateTrick, PLAYERS, PLAYER_NAMES } from './deck.js';
import { BridgeAI } from './ai.js';

export class BridgeEngine {
  constructor(audio) {
    this.audio = audio;
    this.scenario = null;
    this.hands = { N: [], E: [], S: [], W: [] };
    this.currentTrick = [];
    this.currentTurn = 'W'; // El que abre la baza
    this.tricksWon = { NS: 0, EW: 0 };
    this.trickHistory = [];
    this.status = 'ready'; // 'ready', 'playing', 'evaluating_trick', 'finished'
    this.onStateChange = null;
    this.onTrickComplete = null;
    this.onGameFinished = null;
  }

  loadScenario(scenario) {
    this.scenario = scenario;
    // Clonar las manos para no mutar el original
    this.hands = {
      N: [...scenario.presetHands.N],
      E: [...scenario.presetHands.E],
      S: [...scenario.presetHands.S],
      W: [...scenario.presetHands.W]
    };
    this.currentTrick = [];
    this.currentTurn = scenario.leadPlayer || 'W';
    this.tricksWon = { NS: 0, EW: 0 };
    this.trickHistory = [];
    this.status = 'playing';

    if (this.onStateChange) this.onStateChange();

    // Si abre la IA (ej: Oeste en la salida inicial), ejecutar jugada con pequeño retardo
    if (this.currentTurn === 'E' || this.currentTurn === 'W') {
      setTimeout(() => this.executeAITurn(), 700);
    }
  }

  /**
   * Obtiene la lista de cartas legales que un jugador puede jugar en este momento
   */
  getLegalCards(player) {
    const hand = this.hands[player];
    if (!hand || hand.length === 0) return [];

    // Si es la carta de salida de la baza, cualquier carta es legal
    if (this.currentTrick.length === 0) {
      return [...hand];
    }

    // Si la baza ya tiene carta de salida, regla de oro: ASISTIR AL PALO
    const leadSuit = this.currentTrick[0].card.suitKey;
    const sameSuitCards = hand.filter(c => c.suitKey === leadSuit);

    // Si tiene del palo, OBLIGATORIAMENTE debe jugar una de esas cartas
    if (sameSuitCards.length > 0) {
      return sameSuitCards;
    }

    // Si no tiene del palo, puede jugar CUALQUIER carta (fallar o descartar)
    return [...hand];
  }

  /**
   * Intenta jugar una carta
   */
  playCard(player, card) {
    if (this.status !== 'playing') return false;
    if (this.currentTurn !== player) return false;

    const legalCards = this.getLegalCards(player);
    const isLegal = legalCards.some(c => c.id === card.id);
    if (!isLegal) {
      return false;
    }

    // Quitar la carta de la mano del jugador
    this.hands[player] = this.hands[player].filter(c => c.id !== card.id);

    // Añadirla a la baza actual
    this.currentTrick.push({ player, card });
    if (this.audio) this.audio.playCard();

    if (this.onStateChange) this.onStateChange();

    // ¿Se ha completado la baza (4 cartas jugadas)?
    if (this.currentTrick.length === 4) {
      this.status = 'evaluating_trick';
      setTimeout(() => this.finishTrick(), 900);
    } else {
      // Siguiente jugador en el sentido de las agujas del reloj
      this.currentTurn = this.getNextPlayer(this.currentTurn);
      if (this.onStateChange) this.onStateChange();

      // Si el siguiente es la IA (E o W), programar su jugada
      if (this.currentTurn === 'E' || this.currentTurn === 'W') {
        setTimeout(() => this.executeAITurn(), 600);
      }
    }

    return true;
  }

  executeAITurn() {
    if (this.status !== 'playing') return;
    if (this.currentTurn !== 'E' && this.currentTurn !== 'W') return;

    const player = this.currentTurn;
    const hand = this.hands[player];
    const card = BridgeAI.chooseCard(
      player,
      hand,
      this.currentTrick,
      this.scenario.trumpSuit,
      this
    );

    if (card) {
      this.playCard(player, card);
    }
  }

  finishTrick() {
    const trickResult = evaluateTrick(this.currentTrick, this.scenario.trumpSuit);
    const winner = trickResult.winner;
    const isNS = (winner === 'N' || winner === 'S');

    if (isNS) {
      this.tricksWon.NS++;
    } else {
      this.tricksWon.EW++;
    }

    this.trickHistory.push({
      trickNumber: this.trickHistory.length + 1,
      cards: [...this.currentTrick],
      winner,
      winningCard: trickResult.winningCard
    });

    if (this.audio) this.audio.winTrick();
    if (this.onTrickComplete) {
      this.onTrickComplete(trickResult, this.tricksWon);
    }

    // Limpiar baza actual
    this.currentTrick = [];

    // ¿Quedan cartas en las manos (13 bazas)?
    if (this.hands.S.length === 0) {
      this.finishGame();
    } else {
      // El ganador de la baza tiene la salida de la siguiente
      this.currentTurn = winner;
      this.status = 'playing';

      if (this.onStateChange) this.onStateChange();

      if (this.currentTurn === 'E' || this.currentTurn === 'W') {
        setTimeout(() => this.executeAITurn(), 650);
      }
    }
  }

  finishGame() {
    this.status = 'finished';
    const target = this.scenario.targetTricks;
    const achieved = this.tricksWon.NS;
    const success = achieved >= target;
    const difference = achieved - target;

    if (success && this.audio) {
      this.audio.contractSuccess();
    } else if (!success && this.audio) {
      this.audio.contractFailed();
    }

    if (this.onGameFinished) {
      this.onGameFinished({
        success,
        target,
        achieved,
        difference,
        tricksWon: this.tricksWon,
        scenario: this.scenario
      });
    }

    if (this.onStateChange) this.onStateChange();
  }

  getNextPlayer(player) {
    const order = ['N', 'E', 'S', 'W'];
    const idx = order.indexOf(player);
    return order[(idx + 1) % 4];
  }

  /**
   * Asistente pedagógico: proporciona una pista contextual de lógica de carteo
   */
  getTeacherHint() {
    if (this.status !== 'playing') return 'La mano ha concluido.';

    const isUserTurn = (this.currentTurn === 'S' || this.currentTurn === 'N');
    if (!isUserTurn) {
      return `Esperando la jugada de ${PLAYER_NAMES[this.currentTurn]}...`;
    }

    const player = this.currentTurn;
    const legalCards = this.getLegalCards(player);

    if (this.currentTrick.length === 0) {
      // Salida
      if (this.scenario.trumpSuit !== 'NT') {
        const trumps = legalCards.filter(c => c.suitKey === this.scenario.trumpSuit);
        if (trumps.length > 0 && this.trickHistory.length < 3) {
          return '💡 Consejo: Al inicio de una mano con triunfo suele ser buena idea "destriunfar" a los rivales jugando cartas altas de triunfo para quitarles las suyas.';
        }
      }
      return '💡 Consejo: Juega hacia los honores de la otra mano o ataca un palo largo para promocionar cartas firmes.';
    }

    const leadSuit = this.currentTrick[0].card.suitKey;
    const leadCard = this.currentTrick[0].card;
    const hasLeadSuit = legalCards.some(c => c.suitKey === leadSuit);

    if (hasLeadSuit) {
      return `💡 Regla: La salida fue ${leadCard.suit.symbol} ${leadCard.suit.name}. Es obligatorio asistir con una de tus cartas de ese palo.`;
    }

    if (this.scenario.trumpSuit !== 'NT') {
      const trumps = legalCards.filter(c => c.suitKey === this.scenario.trumpSuit);
      if (trumps.length > 0) {
        return `💡 ¡Oportunidad!: No tienes ${leadCard.suit.name}. ¡Puedes jugar un triunfo (${this.scenario.trumpSuit}) y cortar para llevarte la baza!`;
      }
    }

    return `💡 Descarte: No tienes ${leadCard.suit.name}. Descarta la carta más baja de tu palo más débil que no te sirva.`;
  }
}
