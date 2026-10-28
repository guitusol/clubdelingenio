/**
 * Bridge del Club — Banco de Retos y Escenarios Pedagógicos de MiniBridge
 * Diseñados para enseñar a cualquier principiante la deducción, el conteo y la estrategia del Bridge.
 */

import { Card, createDeck, shuffleDeck, sortHand, calculateHCP } from './deck.js';

export const SCENARIOS = [
  {
    id: 'reto_1',
    level: 1,
    title: 'Misión 1: Mi Primera Baza (El Poder de los Ases)',
    subtitle: 'Introducción a Sin Triunfo (No Trump)',
    contract: '1NT',
    contractLabel: '1 Sin Triunfo',
    trumpSuit: 'NT',
    targetTricks: 7, // 6 + 1
    declarer: 'S',
    leadPlayer: 'W',
    lesson: 'En Sin Triunfo la carta más alta del palo de salida gana la baza. Los Ases (A) son bazas 100% seguras. Tu objetivo es ganar al menos 7 de las 13 bazas.',
    tip: 'Cuenta tus Ases y Reyes firmes antes de jugar tu primera carta. No tengas prisa por gastar tus cartas altas si no te van a ganar baza.',
    presetHands: generateScenario1Deal()
  },
  {
    id: 'reto_2',
    level: 2,
    title: 'Misión 2: El Corte con Triunfo (Corte y Fallo)',
    subtitle: 'El superpoder de los Triunfos en Corazones',
    contract: '2H',
    contractLabel: '2 Corazones (♥)',
    trumpSuit: 'H',
    targetTricks: 8, // 6 + 2
    declarer: 'S',
    leadPlayer: 'W',
    lesson: 'Cuando se juega con palo de triunfo, si no tienes cartas del palo que se ha jugado, ¡puedes tirar un triunfo para ganar la baza aunque sea un simple 2!',
    tip: 'El Muerto (Norte) no tiene Picas. Si los rivales juegan Picas, ¡usa un Corazón de Norte para cortar y ganar la baza!',
    presetHands: generateScenario2Deal()
  },
  {
    id: 'reto_3',
    level: 3,
    title: 'Misión 3: La Famosa Impasse o Finesse',
    subtitle: 'La jugada más célebre y astuta del Bridge',
    contract: '3NT',
    contractLabel: '3 Sin Triunfo',
    trumpSuit: 'NT',
    targetTricks: 9, // 6 + 3 (Manga)
    declarer: 'S',
    leadPlayer: 'W',
    lesson: 'En Norte tienes As y Dama (A-Q), pero el Rey está escondido en los rivales. Si juegas una carta baja desde Sur hacia la Dama de Norte... ¡ganas la baza si el Rey estaba en Oeste!',
    tip: 'Nunca juegues el As primero si tienes la Dama detrás. Juega siempre hacia el honor que quieres promocionar.',
    presetHands: generateScenario3Deal()
  },
  {
    id: 'reto_4',
    level: 4,
    title: 'Misión 4: Promocionar un Palo Largo',
    subtitle: 'Ceder una baza para ganar cuatro después',
    contract: '4S',
    contractLabel: '4 Picas (♠) — Manga Mayor',
    trumpSuit: 'S',
    targetTricks: 10, // 6 + 4
    declarer: 'S',
    leadPlayer: 'W',
    lesson: 'Tienes muchos Diamantes pero el rival tiene el As. Si entregas una baza al As rival pronto, todas tus demás cartas de Diamantes se volverán maestras ganadoras.',
    tip: "Primero 'destriunfa' a los rivales jugando Picas altas para quitarles sus triunfos, luego corre tu palo largo de Diamantes.",
    presetHands: generateScenario4Deal()
  },
  {
    id: 'reto_5',
    level: 5,
    title: 'Misión 5: El Gran Desafío de Manga (3NT)',
    subtitle: 'Equilibrio maestro entre ataques y entradas al Muerto',
    contract: '3NT',
    contractLabel: '3 Sin Triunfo',
    trumpSuit: 'NT',
    targetTricks: 9,
    declarer: 'S',
    leadPlayer: 'W',
    lesson: 'Para ganar 9 bazas en Sin Triunfo necesitas conservar comunicaciones (entradas) entre tu mano (Sur) y las cartas del Muerto (Norte).',
    tip: 'No bloquees los palos. Juega primero las cartas altas del lado corto para no quedar atrapado sin entradas.',
    presetHands: generateScenario5Deal()
  }
];

/**
 * Generador de mano aleatoria equilibrada para el modo libre
 */
export function generateRandomDeal(contractType = '3NT') {
  const fullDeck = shuffleDeck(createDeck());
  
  const deal = {
    N: sortHand(fullDeck.slice(0, 13)),
    E: sortHand(fullDeck.slice(13, 26)),
    S: sortHand(fullDeck.slice(26, 39)),
    W: sortHand(fullDeck.slice(39, 52))
  };

  let trumpSuit = 'NT';
  let targetTricks = 9;

  if (contractType.includes('NT')) {
    trumpSuit = 'NT';
    targetTricks = parseInt(contractType[0], 10) + 6;
  } else if (contractType.includes('H')) {
    trumpSuit = 'H';
    targetTricks = parseInt(contractType[0], 10) + 6;
  } else if (contractType.includes('S')) {
    trumpSuit = 'S';
    targetTricks = parseInt(contractType[0], 10) + 6;
  } else if (contractType.includes('D')) {
    trumpSuit = 'D';
    targetTricks = parseInt(contractType[0], 10) + 6;
  } else if (contractType.includes('C')) {
    trumpSuit = 'C';
    targetTricks = parseInt(contractType[0], 10) + 6;
  }

  return {
    id: 'custom_' + Date.now(),
    level: 0,
    title: `Partida de Salón — Contrato ${contractType}`,
    subtitle: 'Mesa abierta generada aleatoriamente',
    contract: contractType,
    contractLabel: `${contractType} (${trumpSuit === 'NT' ? 'Sin Triunfo' : 'Triunfo ' + trumpSuit})`,
    trumpSuit,
    targetTricks,
    declarer: 'S',
    leadPlayer: 'W',
    lesson: 'Aplica todo lo aprendido: cuenta tus bazas seguras, cuida tus entradas y deduce las cartas restantes de los defensores.',
    tip: 'Antes de jugar la primera carta del Muerto, tómate 20 segundos para hacer un plan general de las 13 bazas.',
    presetHands: deal
  };
}

// Helpers para construir escenarios pedagógicos predeterminados

function generateScenario1Deal() {
  return parseDealNotation({
    // Norte (El Muerto): Ases y cartas sólidas
    N: 'S:A,K,5; H:A,Q,4; D:K,J,2; C:A,8,4,2',
    // Sur (Tú - Declarador)
    S: 'S:Q,J,10; H:K,J,10; D:A,Q,10; C:K,Q,10,9',
    // Oeste (Defensa)
    W: 'S:9,8,7,2; H:9,8,7; D:9,8,7; C:J,7,6',
    // Este (Defensa)
    E: 'S:6,4,3; H:6,5,3,2; D:6,5,4,3; C:5,3'
  });
}

function generateScenario2Deal() {
  return parseDealNotation({
    // Norte: fallo a picas (0 picas!), triunfos corazones
    N: 'S:; H:A,K,10,4,2; D:K,Q,J,2; C:8,7,6,5',
    // Sur: palo largo de picas para que Norte corte
    S: 'S:A,K,Q,J,10,9; H:Q,J,9; D:A,10; C:A,2',
    // Oeste
    W: 'S:8,7,6,5; H:8,7,6; D:9,8,7; C:K,J,10',
    // Este
    E: 'S:4,3,2; H:5,3; D:6,5,4,3; C:Q,9,4,3'
  });
}

function generateScenario3Deal() {
  return parseDealNotation({
    // Norte: A, Q para hacer la impasse
    N: 'S:A,Q,5; H:K,J,4; D:A,Q,10; C:K,Q,2,3',
    // Sur: cartas pequeñas para mandar hacia los honores de Norte
    S: 'S:4,3,2; H:A,Q,10; D:K,J,4; C:A,J,10,4',
    // Oeste: tiene el Rey de Picas atrapado detrás de la Dama
    W: 'S:K,9,8; H:9,8,7; D:9,8,7; C:9,8,7,6',
    // Este
    E: 'S:J,10,7,6; H:6,5,3,2; D:6,5,3,2; C:5'
  });
}

function generateScenario4Deal() {
  return parseDealNotation({
    // Norte: Triunfos fuertes Picas y apoyo a Diamantes
    N: 'S:A,K,Q,2; H:A,K; D:K,Q,J,10,2; C:7,6',
    // Sur: Picas y Diamantes
    S: 'S:J,10,9,8,7; H:Q,J,10; D:9,8,7; C:A,2',
    // Oeste: tiene el As de Diamantes
    W: 'S:6,5; H:9,8,7,6; D:A,6,5,4; C:K,Q,J',
    // Este
    E: 'S:4,3; H:5,4,3,2; D:3,2; C:10,9,8,5,4,3'
  });
}

function generateScenario5Deal() {
  return parseDealNotation({
    N: 'S:A,K,2; H:A,K,4; D:A,K,J,10; C:Q,10,2',
    S: 'S:Q,J,10; H:Q,J,10; D:Q,9,8; C:A,K,J,3',
    W: 'S:9,8,7,6; H:9,8,7; D:7,6,5; C:9,8,7',
    E: 'S:5,4,3; H:6,5,3,2; D:4,3,2; C:6,5,4'
  });
}

/**
 * Convierte notación compacta 'S:A,K; H:Q,J; ...' en lista de instancias Card
 */
function parseDealNotation(notation) {
  const result = {};
  for (const player of ['N', 'E', 'S', 'W']) {
    const raw = notation[player] || '';
    const suitGroups = raw.split(';').map(s => s.trim()).filter(Boolean);
    const hand = [];

    suitGroups.forEach(group => {
      const [suitLetter, rankListStr] = group.split(':');
      if (!suitLetter || !rankListStr) return;
      const suitKey = suitLetter.trim().toUpperCase();
      const ranks = rankListStr.split(',').map(r => r.trim()).filter(Boolean);

      ranks.forEach(rankStr => {
        let rankValue;
        if (rankStr === 'A') rankValue = 14;
        else if (rankStr === 'K') rankValue = 13;
        else if (rankStr === 'Q') rankValue = 12;
        else if (rankStr === 'J') rankValue = 11;
        else rankValue = parseInt(rankStr, 10);

        if (rankValue >= 2 && rankValue <= 14) {
          hand.push(new Card(suitKey, rankValue));
        }
      });
    });

    result[player] = sortHand(hand);
  }

  // Si a alguna mano le faltan cartas para 13 (ej: notaciones simplificadas), rellenar de baraja restante
  return balanceDeal(result);
}

function balanceDeal(deal) {
  const usedIds = new Set();
  ['N', 'E', 'S', 'W'].forEach(p => deal[p].forEach(c => usedIds.add(c.id)));

  const deck = createDeck();
  const remaining = deck.filter(c => !usedIds.has(c.id));
  const shuffledRem = shuffleDeck(remaining);

  ['N', 'E', 'S', 'W'].forEach(p => {
    while (deal[p].length < 13 && shuffledRem.length > 0) {
      deal[p].push(shuffledRem.pop());
    }
    deal[p] = sortHand(deal[p]);
  });

  return deal;
}
