/**
 * Bridge del Club — Motor Oficial de Subasta (Bidding Box & Asistente SAYC)
 * Implementa la subasta completa a 4 manos bajo el estándar internacional SAYC (Mayor Quinto)
 * con cálculo de Puntos de Honor (HCP), distribución y sugerencias didácticas.
 */

import { calculateHCP, SUIT_ORDER } from './deck.js';

export const STRAINS = [
  { key: 'C', symbol: '♣', name: 'Tréboles', color: '#10b981', isMinor: true },
  { key: 'D', symbol: '♦', name: 'Diamantes', color: '#f59e0b', isMinor: true },
  { key: 'H', symbol: '♥', name: 'Corazones', color: '#ef4444', isMajor: true },
  { key: 'S', symbol: '♠', name: 'Picas', color: '#f8fafc', isMajor: true },
  { key: 'NT', symbol: 'NT', name: 'Sin Triunfo', color: '#38bdf8', isNT: true }
];

export const STRAIN_RANK = { 'C': 1, 'D': 2, 'H': 3, 'S': 4, 'NT': 5 };

/**
 * Compara dos cantes naturales de Bridge. Retorna > 0 si callA > callB
 */
export function compareBids(callA, callB) {
  if (!callA || !callB) return 0;
  const levelA = parseInt(callA[0], 10);
  const strainA = callA.substring(1);
  const levelB = parseInt(callB[0], 10);
  const strainB = callB.substring(1);

  if (levelA !== levelB) return levelA - levelB;
  return STRAIN_RANK[strainA] - STRAIN_RANK[strainB];
}

/**
 * Evaluador Pedagógico SAYC (Standard American Yellow Card)
 */
export class SAYCAssistant {
  /**
   * Analiza una mano y calcula su potencia (HCP + Distribución)
   */
  static evaluateHand(hand) {
    const hcp = calculateHCP(hand);
    
    // Conteo por palos
    const counts = { S: 0, H: 0, D: 0, C: 0 };
    const honors = { S: [], H: [], D: [], C: [] };

    hand.forEach(c => {
      counts[c.suitKey]++;
      if (c.rankValue >= 11) honors[c.suitKey].push(c.rankLabel);
    });

    // Puntos de longitud (+1 por cada carta a partir de la 5ª)
    let lengthPoints = 0;
    Object.values(counts).forEach(cnt => {
      if (cnt > 4) lengthPoints += (cnt - 4);
    });

    const totalPoints = hcp + lengthPoints;

    // Comprobar si la mano es equilibrada (sin fallos, sin semifallos, máximo 1 doblete)
    // Patrones: 4-3-3-3, 4-4-3-2, 5-3-3-2
    const suitLengths = Object.values(counts).sort((a, b) => b - a);
    const isBalanced = (
      (suitLengths[0] === 4 && suitLengths[1] === 3 && suitLengths[2] === 3 && suitLengths[3] === 3) ||
      (suitLengths[0] === 4 && suitLengths[1] === 4 && suitLengths[2] === 3 && suitLengths[3] === 2) ||
      (suitLengths[0] === 5 && suitLengths[1] === 3 && suitLengths[2] === 3 && suitLengths[3] === 2)
    );

    return {
      hcp,
      lengthPoints,
      totalPoints,
      counts,
      honors,
      isBalanced,
      suitLengths
    };
  }

  /**
   * Sugiere la mejor voz según el sistema SAYC
   */
  static getRecommendedCall(player, hand, auction) {
    const evalData = this.evaluateHand(hand);
    const history = auction.history;
    const lastBid = auction.highestBid;

    // Caso 1: La subasta aún no ha sido abierta por nadie (Apertura)
    if (!lastBid) {
      return this.getOpeningBid(evalData);
    }

    // Caso 2: El compañero abrió la subasta
    const partner = (player === 'S') ? 'N' : (player === 'N' ? 'S' : (player === 'E' ? 'W' : 'E'));
    const partnerBids = history.filter(h => h.player === partner && h.call !== 'PASS' && h.call !== 'X' && h.call !== 'XX');
    
    if (partnerBids.length > 0 && auction.highestBidPlayer === partner) {
      const partnerLastBid = partnerBids[partnerBids.length - 1].call;
      return this.getResponseToPartner(evalData, partnerLastBid, auction);
    }

    // Caso 3: Los rivales abrieron la subasta (Intervención / Defensa)
    return this.getCompetitiveCall(evalData, auction);
  }

  /**
   * Apertura reglamentaria SAYC
   */
  static getOpeningBid(evalData) {
    const { hcp, counts, isBalanced } = evalData;

    // Menos de 12 puntos y sin palo de 7 cartas: Paso
    if (hcp < 12) {
      // Apertura débil de 2 (6 cartas en mayor, 6-10 puntos)
      if (hcp >= 6 && hcp <= 10) {
        if (counts.H === 6) return { call: '2H', reason: 'Apertura débil de 2♥ (6-10 HCP y 6 corazones)' };
        if (counts.S === 6) return { call: '2S', reason: 'Apertura débil de 2♠ (6-10 HCP y 6 picas)' };
        if (counts.D === 6) return { call: '2D', reason: 'Apertura débil de 2♦ (6-10 HCP y 6 diamantes)' };
      }
      return { call: 'PASS', reason: 'Menos de 12 puntos de honor: no hay fuerza para abrir la mano' };
    }

    // 15-17 HCP y mano equilibrada: 1NT
    if (hcp >= 15 && hcp <= 17 && isBalanced) {
      return { call: '1NT', reason: 'Apertura estándar de 1NT (15-17 HCP y mano equilibrada sin palos fallados)' };
    }

    // 20-21 HCP y mano equilibrada: 2NT
    if (hcp >= 20 && hcp <= 21 && isBalanced) {
      return { call: '2NT', reason: 'Apertura de 2NT (20-21 HCP equilibrada)' };
    }

    // 22+ HCP: Apertura artificial fuerte de 2♣
    if (hcp >= 22) {
      return { call: '2C', reason: 'Apertura fuerte convencional de 2♣ (22+ HCP)' };
    }

    // 12-21 HCP con apertura en palo natural:
    // Regla de Mayor Quinto: se abre de 1♥ o 1♠ si se tienen 5 o más cartas
    if (counts.S >= 5 && counts.S >= counts.H) {
      return { call: '1S', reason: 'Apertura de 1♠ (12-21 HCP con 5 o más picas — Mayor Quinto)' };
    }
    if (counts.H >= 5) {
      return { call: '1H', reason: 'Apertura de 1♥ (12-21 HCP con 5 o más corazones — Mayor Quinto)' };
    }

    // Si no hay 5 cartas en mayor, se abre en el mejor menor (1♦ con 4+ diamantes, sino 1♣)
    if (counts.D >= 4) {
      return { call: '1D', reason: 'Apertura de 1♦ (12-21 HCP sin palo mayor de 5 cartas)' };
    }
    return { call: '1C', reason: 'Apertura de 1♣ (12-21 HCP, mejor menor de preparación)' };
  }

  /**
   * Respuesta al compañero que abrió
   */
  static getResponseToPartner(evalData, partnerBid, auction) {
    const { hcp, counts } = evalData;

    // Si el compañero abrió 1NT (15-17)
    if (partnerBid === '1NT') {
      if (hcp >= 10) return { call: '3NT', reason: 'Respuesta a manga (10+ HCP garantizan 25 puntos combinados para 3NT)' };
      if (hcp >= 8) return { call: '2NT', reason: 'Invitación a manga de 2NT (8-9 HCP)' };
      return { call: 'PASS', reason: 'Menos de 8 HCP frente a 1NT: la mano se juega en 1NT' };
    }

    // Si el compañero abrió en mayor (1♥ o 1♠), buscar apoyo (fit) de al menos 3 cartas
    const majorSuit = partnerBid[1];
    if (majorSuit === 'H' || majorSuit === 'S') {
      const supportCount = counts[majorSuit];
      if (supportCount >= 3) {
        if (hcp >= 13) return { call: `4${majorSuit}`, reason: `Salto a Manga de 4${majorSuit} con 13+ HCP y buen apoyo` };
        if (hcp >= 10) return { call: `3${majorSuit}`, reason: `Invitación a nivel 3 (10-12 HCP y apoyo garantizado)` };
        if (hcp >= 6) return { call: `2${majorSuit}`, reason: `Apoyo simple a nivel 2 (6-9 HCP constructivos)` };
      }
    }

    // Si tenemos 6+ HCP, podemos responder en un nuevo palo a nivel 1
    if (hcp >= 6) {
      if (counts.S >= 4 && compareBids('1S', partnerBid) > 0) return { call: '1S', reason: 'Cambio de palo a 1♠ (6+ HCP y 4+ picas)' };
      if (counts.H >= 4 && compareBids('1H', partnerBid) > 0) return { call: '1H', reason: 'Cambio de palo a 1♥ (6+ HCP y 4+ corazones)' };
      return { call: '1NT', reason: 'Respuesta de 1NT (6-9 HCP sin apoyo ni nuevo palo a nivel 1)' };
    }

    return { call: 'PASS', reason: 'Menos de 6 puntos de honor: no hay valores para responder' };
  }

  /**
   * Jugada de defensa o intervención competitiva
   */
  static getCompetitiveCall(evalData, auction) {
    const { hcp, counts } = evalData;

    // Intervención con palo de 5 cartas de calidad y 10-16 puntos
    if (hcp >= 10 && hcp <= 16) {
      if (counts.S >= 5 && compareBids('1S', auction.highestBid) > 0) {
        return { call: '1S', reason: 'Intervención de 1♠ sobre el cante rival (10-16 HCP y 5 picas)' };
      }
      if (counts.H >= 5 && compareBids('1H', auction.highestBid) > 0) {
        return { call: '1H', reason: 'Intervención de 1♥ sobre el cante rival (10-16 HCP y 5 corazones)' };
      }
    }

    // Doblo informativo (Takeout Double) con 12+ puntos y apoyo a los palos no nombrados
    if (hcp >= 12 && auction.canDouble('X')) {
      return { call: 'X', reason: 'Doblo informativo (12+ HCP pidiendo al compañero que nombre su mejor palo)' };
    }

    return { call: 'PASS', reason: 'Paso defensivo: no hay suficiente fuerza o palo largo para intervenir' };
  }
}

/**
 * Gestor del Estado de la Subasta (Auction State Machine)
 */
export class Auction {
  constructor(dealer = 'W') {
    this.dealer = dealer;
    this.currentBidder = dealer;
    this.history = []; // [{ player, call, reason }]
    this.highestBid = null; // '1NT', '4S', etc.
    this.highestBidPlayer = null; // 'N', 'E', 'S', 'W'
    this.consecutivePasses = 0;
    this.isFinished = false;
    this.contract = null;
    this.declarer = null;
    this.doubled = false;
    this.redoubled = false;
    this.strainFirstBidder = {
      NS: { C: null, D: null, H: null, S: null, NT: null },
      EW: { C: null, D: null, H: null, S: null, NT: null }
    };
  }

  /**
   * Determina si una voz es legal en este momento de la subasta
   */
  isCallLegal(call, player) {
    if (this.isFinished) return false;
    if (this.currentBidder !== player) return false;

    if (call === 'PASS') return true;

    if (call === 'X') {
      return this.canDouble(player);
    }

    if (call === 'XX') {
      return this.canRedouble(player);
    }

    // Cante natural (ej: 1C a 7NT)
    if (!this.highestBid) return true;
    return compareBids(call, this.highestBid) > 0;
  }

  canDouble(player) {
    if (!this.highestBid) return false;
    if (this.doubled || this.redoubled) return false;
    // Solo se puede doblar si el último cante natural fue de los rivales
    const isUserPair = (player === 'S' || player === 'N');
    const isHighestBidUserPair = (this.highestBidPlayer === 'S' || this.highestBidPlayer === 'N');
    return isUserPair !== isHighestBidUserPair;
  }

  canRedouble(player) {
    if (!this.doubled || this.redoubled) return false;
    // Solo se puede redoblar si los rivales doblaron nuestro cante
    const isUserPair = (player === 'S' || player === 'N');
    const isHighestBidUserPair = (this.highestBidPlayer === 'S' || this.highestBidPlayer === 'N');
    return isUserPair === isHighestBidUserPair;
  }

  /**
   * Aplica un cante a la subasta
   */
  makeCall(player, call, reason = '') {
    if (!this.isCallLegal(call, player)) return false;

    this.history.push({ player, call, reason });

    if (call === 'PASS') {
      this.consecutivePasses++;
      // ¿Fin de la subasta?
      // Si nadie ha abierto y hay 4 pasos: pasada general (redeals)
      if (!this.highestBid && this.consecutivePasses === 4) {
        this.isFinished = true;
        this.contract = 'PASS';
        return true;
      }
      // Si ya había cantes y hay 3 pasos consecutivos: ¡Subasta completada!
      if (this.highestBid && this.consecutivePasses === 3) {
        this.finishAuction();
        return true;
      }
    } else if (call === 'X') {
      this.doubled = true;
      this.consecutivePasses = 0;
    } else if (call === 'XX') {
      this.redoubled = true;
      this.consecutivePasses = 0;
    } else {
      // Cante natural
      this.highestBid = call;
      this.highestBidPlayer = player;
      this.doubled = false;
      this.redoubled = false;
      this.consecutivePasses = 0;

      // Registrar quién fue el primero de la pareja en nombrar este palo/NT (para ser el Declarador)
      const pair = (player === 'S' || player === 'N') ? 'NS' : 'EW';
      const strain = call.substring(1);
      if (!this.strainFirstBidder[pair][strain]) {
        this.strainFirstBidder[pair][strain] = player;
      }
    }

    // Avanzar al siguiente jugador en el sentido de las agujas del reloj
    this.currentBidder = this.getNextPlayer(this.currentBidder);
    return true;
  }

  finishAuction() {
    this.isFinished = true;
    this.contract = this.highestBid;
    const pair = (this.highestBidPlayer === 'S' || this.highestBidPlayer === 'N') ? 'NS' : 'EW';
    const strain = this.highestBid.substring(1);
    this.declarer = this.strainFirstBidder[pair][strain] || this.highestBidPlayer;
  }

  getNextPlayer(player) {
    const order = ['N', 'E', 'S', 'W'];
    const idx = order.indexOf(player);
    return order[(idx + 1) % 4];
  }
}
