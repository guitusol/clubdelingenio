/**
 * Bridge del Club — Motor de Baraja y Naipes
 * Soporta palos estándar, jerarquías de Bridge (2 al As) y evaluación de bazas.
 */

export const SUITS = {
  S: { key: 'S', symbol: '♠', name: 'Picas', color: '#f8fafc', isMajor: true },
  H: { key: 'H', symbol: '♥', name: 'Corazones', color: '#ef4444', isMajor: true },
  D: { key: 'D', symbol: '♦', name: 'Diamantes', color: '#f59e0b', isMinor: true },
  C: { key: 'C', symbol: '♣', name: 'Tréboles', color: '#10b981', isMinor: true },
  SPADES: { key: 'S', symbol: '♠', name: 'Picas', color: '#f8fafc', isMajor: true },
  HEARTS: { key: 'H', symbol: '♥', name: 'Corazones', color: '#ef4444', isMajor: true },
  DIAMONDS: { key: 'D', symbol: '♦', name: 'Diamantes', color: '#f59e0b', isMinor: true },
  CLUBS: { key: 'C', symbol: '♣', name: 'Tréboles', color: '#10b981', isMinor: true }
};

export const SUIT_ORDER = ['S', 'H', 'D', 'C'];

export const RANKS = [
  { value: 2, label: '2', hcp: 0 },
  { value: 3, label: '3', hcp: 0 },
  { value: 4, label: '4', hcp: 0 },
  { value: 5, label: '5', hcp: 0 },
  { value: 6, label: '6', hcp: 0 },
  { value: 7, label: '7', hcp: 0 },
  { value: 8, label: '8', hcp: 0 },
  { value: 9, label: '9', hcp: 0 },
  { value: 10, label: '10', hcp: 0 },
  { value: 11, label: 'J', hcp: 1 },
  { value: 12, label: 'Q', hcp: 2 },
  { value: 13, label: 'K', hcp: 3 },
  { value: 14, label: 'A', hcp: 4 }
];

export const PLAYERS = ['N', 'E', 'S', 'W'];

export const PLAYER_NAMES = {
  N: 'Norte (El Muerto)',
  S: 'Sur (Tú - Declarador)',
  E: 'Este (Defensa IA)',
  W: 'Oeste (Defensa IA)'
};

export class Card {
  constructor(suitKey, rankValue) {
    this.suitKey = suitKey;
    this.suit = SUITS[suitKey];
    this.rankValue = rankValue;
    const rankObj = RANKS.find(r => r.value === rankValue);
    this.rankLabel = rankObj ? rankObj.label : String(rankValue);
    this.hcp = rankObj ? rankObj.hcp : 0;
    this.id = `${this.suitKey}_${this.rankValue}`;
  }

  toString() {
    return `${this.rankLabel}${this.suit.symbol}`;
  }
}

/**
 * Crea una baraja completa de 52 cartas
 */
export function createDeck() {
  const deck = [];
  SUIT_ORDER.forEach(suitKey => {
    RANKS.forEach(rank => {
      deck.push(new Card(suitKey, rank.value));
    });
  });
  return deck;
}

/**
 * Baraja aleatoria Fisher-Yates
 */
export function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Ordena las cartas de una mano por palo y por valor descendente (As primero)
 */
export function sortHand(hand) {
  return [...hand].sort((a, b) => {
    const suitDiff = SUIT_ORDER.indexOf(a.suitKey) - SUIT_ORDER.indexOf(b.suitKey);
    if (suitDiff !== 0) return suitDiff;
    return b.rankValue - a.rankValue;
  });
}

/**
 * Calcula los Puntos de Honor (HCP) de una mano
 */
export function calculateHCP(hand) {
  return hand.reduce((acc, card) => acc + card.hcp, 0);
}

/**
 * Determina el ganador de una baza en Bridge
 * @param {Array<{player: string, card: Card}>} trickCards 4 cartas jugadas en la baza
 * @param {string} trumpSuit Palo de triunfo ('S', 'H', 'D', 'C' o 'NT')
 * @returns {{winner: string, winningCard: Card}}
 */
export function evaluateTrick(trickCards, trumpSuit = 'NT') {
  if (!trickCards || trickCards.length === 0) return null;

  const leadCard = trickCards[0].card;
  const leadSuit = leadCard.suitKey;

  let bestPlay = trickCards[0];

  for (let i = 1; i < trickCards.length; i++) {
    const currentPlay = trickCards[i];
    const currentCard = currentPlay.card;
    const bestCard = bestPlay.card;

    // ¿La carta actual es triunfo y la mejor anterior no?
    if (trumpSuit !== 'NT' && currentCard.suitKey === trumpSuit) {
      if (bestCard.suitKey !== trumpSuit) {
        bestPlay = currentPlay;
      } else if (currentCard.rankValue > bestCard.rankValue) {
        bestPlay = currentPlay;
      }
    } else if (bestCard.suitKey !== trumpSuit) {
      // Ambas son del palo de salida (o descartes que no son triunfo)
      if (currentCard.suitKey === leadSuit && currentCard.rankValue > bestCard.rankValue) {
        bestPlay = currentPlay;
      }
    }
  }

  return {
    winner: bestPlay.player,
    winningCard: bestPlay.card
  };
}
