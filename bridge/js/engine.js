/**
 * Bridge del Club — Motor de Reglas, Subasta y Ciclo de Bazas (MiniBridge & Torneo)
 * Administra el flujo de turnos, subasta con Bidding Box, validación de jugadas y contabilidad de contrato.
 */

import { evaluateTrick, PLAYERS, PLAYER_NAMES } from './deck.js';
import { BridgeAI } from './ai.js';
import { Auction, SAYCAssistant } from './bidding.js';
import { BridgeScoring } from './scoring.js';
import { i18n } from './i18n.js';

export class BridgeEngine {
  constructor(audio) {
    this.audio = audio;
    this.mode = 'school'; // 'school' | 'tournament'
    this.phase = 'play'; // 'auction' | 'play' | 'finished'
    this.scenario = null;
    this.hands = { N: [], E: [], S: [], W: [] };
    this.handsOriginal = { N: [], E: [], S: [], W: [] };
    this.currentTrick = [];
    this.currentTurn = 'W'; // El que abre la baza
    this.tricksWon = { NS: 0, EW: 0 };
    this.trickHistory = [];
    this.status = 'ready'; // 'ready', 'playing', 'evaluating_trick', 'finished'
    
    // Subasta
    this.auction = null;
    this.tournamentScore = null;

    this.onStateChange = null;
    this.onTrickComplete = null;
    this.onGameFinished = null;
    this.onAuctionChange = null;
  }

  /**
   * Carga un escenario de MiniBridge (salto directo a carteo)
   */
  loadScenario(scenario) {
    this.mode = 'school';
    this.phase = 'play';
    this.scenario = scenario;
    this.hands = {
      N: [...scenario.presetHands.N],
      E: [...scenario.presetHands.E],
      S: [...scenario.presetHands.S],
      W: [...scenario.presetHands.W]
    };
    this.handsOriginal = {
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
    this.auction = null;
    this.tournamentScore = null;

    if (this.onStateChange) this.onStateChange();

    if (this.currentTurn === 'E' || this.currentTurn === 'W') {
      setTimeout(() => this.executeAITurn(), 700);
    }
  }

  /**
   * Inicia una mano completa reglamentaria con Subasta (Salón de Expertos)
   */
  startTournamentDeal(deal, dealer = 'W') {
    this.mode = 'tournament';
    this.phase = 'auction';
    this.hands = {
      N: [...deal.presetHands.N],
      E: [...deal.presetHands.E],
      S: [...deal.presetHands.S],
      W: [...deal.presetHands.W]
    };
    this.handsOriginal = {
      N: [...deal.presetHands.N],
      E: [...deal.presetHands.E],
      S: [...deal.presetHands.S],
      W: [...deal.presetHands.W]
    };
    this.currentTrick = [];
    this.tricksWon = { NS: 0, EW: 0 };
    this.trickHistory = [];
    this.status = 'playing';
    this.tournamentScore = null;

    // Crear nueva subasta
    this.auction = new Auction(dealer);

    if (this.onStateChange) this.onStateChange();
    if (this.onAuctionChange) this.onAuctionChange();

    // Si el dador no es Sur, ejecutar cante de la IA
    if (this.auction.currentBidder !== 'S') {
      setTimeout(() => this.executeAIBid(), 600);
    }
  }

  /**
   * Procesa un cante de subasta (usuario o IA)
   */
  makeBid(call) {
    if (this.phase !== 'auction' || !this.auction || this.auction.isFinished) return false;

    const bidder = this.auction.currentBidder;
    const hand = this.hands[bidder];
    const rec = SAYCAssistant.getRecommendedCall(bidder, hand, this.auction);
    const reason = rec.reason || '';

    const ok = this.auction.makeCall(bidder, call, reason);
    if (!ok) return false;

    if (this.audio) this.audio.playCard();
    if (this.onStateChange) this.onStateChange();
    if (this.onAuctionChange) this.onAuctionChange();

    // ¿Ha concluido la subasta?
    if (this.auction.isFinished) {
      if (this.auction.contract === 'PASS') {
        // Pasada general: 4 pasos consecutivos
        this.status = 'finished';
        this.phase = 'finished';
        if (this.onStateChange) this.onStateChange();
        return true;
      }

      // Configurar contrato y arrancar la fase de carteo
      setTimeout(() => this.startPlayAfterAuction(), 800);
      return true;
    }

    // Si el siguiente cante le toca a la IA (W, N, E)
    if (this.auction.currentBidder !== 'S') {
      setTimeout(() => this.executeAIBid(), 650);
    }

    return true;
  }

  executeAIBid() {
    if (this.phase !== 'auction' || !this.auction || this.auction.isFinished) return;
    if (this.auction.currentBidder === 'S') return;

    const bidder = this.auction.currentBidder;
    const hand = this.hands[bidder];
    const rec = SAYCAssistant.getRecommendedCall(bidder, hand, this.auction);

    // Si la voz recomendada es legal, cantarla; si no, Paso
    const callToMake = this.auction.isCallLegal(rec.call, bidder) ? rec.call : 'PASS';
    this.makeBid(callToMake);
  }

  startPlayAfterAuction() {
    this.phase = 'play';
    const contract = this.auction.contract;
    const level = parseInt(contract[0], 10);
    const strain = contract.substring(1);
    const declarer = this.auction.declarer;

    // El jugador que abre la baza es el defensor a la izquierda del declarador
    const leadPlayer = this.getNextPlayer(declarer);

    this.scenario = {
      title: `Torneo: Contrato ${contract} por ${declarer}`,
      contract,
      contractLabel: `${contract} (${strain === 'NT' ? 'Sin Triunfo' : strain})`,
      trumpSuit: strain,
      targetTricks: level + 6,
      declarer,
      leadPlayer
    };

    this.currentTurn = leadPlayer;
    this.currentTrick = [];
    this.tricksWon = { NS: 0, EW: 0 };
    this.trickHistory = [];
    this.status = 'playing';

    if (this.onStateChange) this.onStateChange();

    // Salida inicial si no es el usuario
    const isUserLead = (this.currentTurn === 'S' || (this.scenario.declarer === 'S' && this.currentTurn === 'N'));
    if (!isUserLead) {
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

    // Regla de oro: ASISTIR AL PALO
    const leadSuit = this.currentTrick[0].card.suitKey;
    const sameSuitCards = hand.filter(c => c.suitKey === leadSuit);

    // Si tiene del palo, OBLIGATORIAMENTE debe jugar una de esas cartas
    if (sameSuitCards.length > 0) {
      return sameSuitCards;
    }

    // Si no tiene del palo, puede jugar cualquier carta (fallar o descartar)
    return [...hand];
  }

  /**
   * Intenta jugar una carta
   */
  playCard(player, card) {
    if (this.status !== 'playing' || this.phase !== 'play') return false;
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

      // Si el siguiente es la IA (no controlado por el usuario en Sur)
      const isUserControl = (this.currentTurn === 'S' || (this.scenario && this.scenario.declarer === 'S' && this.currentTurn === 'N'));
      if (!isUserControl) {
        setTimeout(() => this.executeAITurn(), 600);
      }
    }

    return true;
  }

  executeAITurn() {
    if (this.status !== 'playing' || this.phase !== 'play') return;
    const isUserControl = (this.currentTurn === 'S' || (this.scenario && this.scenario.declarer === 'S' && this.currentTurn === 'N'));
    if (isUserControl) return;

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

      const isUserControl = (this.currentTurn === 'S' || (this.scenario && this.scenario.declarer === 'S' && this.currentTurn === 'N'));
      if (!isUserControl) {
        setTimeout(() => this.executeAITurn(), 650);
      }
    }
  }

  finishGame() {
    this.status = 'finished';
    this.phase = 'finished';
    const target = this.scenario.targetTricks;
    const declarerPair = (this.scenario.declarer === 'S' || this.scenario.declarer === 'N') ? 'NS' : 'EW';
    const achieved = this.tricksWon[declarerPair];
    const success = achieved >= target;
    const difference = achieved - target;

    // Cálculo de Puntuación Oficial Duplicada de Torneo
    let scoreBreakdown = null;
    if (this.mode === 'tournament' && this.auction) {
      scoreBreakdown = BridgeScoring.calculateScore({
        contract: this.auction.contract,
        tricksWon: achieved,
        doubled: this.auction.doubled,
        redoubled: this.auction.redoubled,
        vulnerable: false
      });
      this.tournamentScore = scoreBreakdown;
    }

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
        scenario: this.scenario,
        tournamentScore: scoreBreakdown,
        mode: this.mode
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
    const getSuitName = (key) => {
      const map = { C: 'suit_clubs', D: 'suit_diamonds', H: 'suit_hearts', S: 'suit_spades', NT: 'suit_nt' };
      return map[key] ? i18n.t(map[key]) : key;
    };

    const getPlayerName = (pos) => {
      const map = { N: 'seat_north', S: 'seat_south', W: 'seat_west', E: 'seat_east' };
      return map[pos] ? i18n.t(map[pos]) : pos;
    };

    if (this.phase === 'auction') {
      if (!this.auction) return '';
      if (this.auction.currentBidder === 'S') {
        const evalData = SAYCAssistant.evaluateHand(this.hands.S);
        const rec = SAYCAssistant.getRecommendedCall('S', this.hands.S, this.auction);
        return `💡 SAYC: ${evalData.hcp} HCP • ${rec.call} (${rec.reason})`;
      }
      const waitingName = getPlayerName(this.auction.currentBidder);
      return i18n.t('bidding_waiting_for', { player: waitingName });
    }

    if (this.status !== 'playing') return i18n.t('hint_hand_ended');

    const isUserTurn = (this.currentTurn === 'S' || (this.scenario && this.scenario.declarer === 'S' && this.currentTurn === 'N'));
    if (!isUserTurn) {
      const pName = getPlayerName(this.currentTurn);
      return i18n.t('hint_waiting_player', { player: pName });
    }

    const player = this.currentTurn;
    const legalCards = this.getLegalCards(player);

    if (this.currentTrick.length === 0) {
      // Salida
      if (this.scenario.trumpSuit !== 'NT') {
        const trumps = legalCards.filter(c => c.suitKey === this.scenario.trumpSuit);
        if (trumps.length > 0 && this.trickHistory.length < 3) {
          return i18n.t('hint_lead_trump');
        }
      }
      return i18n.t('hint_lead_general');
    }

    const leadSuit = this.currentTrick[0].card.suitKey;
    const leadCard = this.currentTrick[0].card;
    const hasLeadSuit = legalCards.some(c => c.suitKey === leadSuit);

    if (hasLeadSuit) {
      return i18n.t('hint_must_follow', { suit: `${leadCard.suit.symbol} ${getSuitName(leadSuit)}` });
    }

    if (this.scenario.trumpSuit !== 'NT') {
      const trumps = legalCards.filter(c => c.suitKey === this.scenario.trumpSuit);
      if (trumps.length > 0) {
        return i18n.t('hint_can_trump', { suit: getSuitName(leadSuit), trump: getSuitName(this.scenario.trumpSuit) });
      }
    }

    return i18n.t('hint_can_discard', { suit: getSuitName(leadSuit) });
  }
}
