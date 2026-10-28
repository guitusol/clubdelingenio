/**
 * CÁLCULO TÁCTICO RELÁMPAGO — Generador de Desafíos con Semilla (Generator)
 * Genera problemas matemáticos reproducibles y equilibrados por dificultad.
 */

class ChallengeGenerator {
  /**
   * Generador congruencial pseudoaleatorio determinista (PRNG)
   */
  static seededRandom(seed) {
    let s = Math.abs(seed) % 2147483647;
    if (s <= 0) s += 2147483646;
    return function() {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  /**
   * Genera un nuevo desafío matemático según el nivel y semilla opcional.
   * @param {string} difficulty 'facil' | 'medio' | 'dificil' | 'endemoniado'
   * @param {number} [customSeed] Semilla de 5 dígitos para duelos
   * @returns {{ seed: number, target: number, numbers: number[], timeLimit: number, difficulty: string, solution: object }}
   */
  static generate(difficulty = 'medio', customSeed = null) {
    const seed = customSeed ? parseInt(customSeed, 10) : Math.floor(10000 + Math.random() * 90000);
    const rng = this.seededRandom(seed);

    let timeLimit = 60;
    if (difficulty === 'facil') timeLimit = 90;
    else if (difficulty === 'endemoniado') timeLimit = 45;

    // Baraja clásica de Cifras y Letras:
    // Grandes: 25, 50, 75, 100
    // Pequeñas: 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10
    const bigPool = [25, 50, 75, 100];
    const smallPool = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];

    let targetMin = 101;
    let targetMax = 999;
    let numBig = 2; // Por defecto: 2 grandes y 4 pequeñas

    if (difficulty === 'facil') {
      targetMin = 100;
      targetMax = 450;
      numBig = 2;
    } else if (difficulty === 'medio') {
      numBig = 2;
    } else if (difficulty === 'dificil') {
      numBig = 1; // Solo 1 grande exige mayor combinatoria
    } else if (difficulty === 'endemoniado') {
      numBig = (rng() > 0.5) ? 1 : 3;
    }

    // Seleccionar números
    const shuffledBig = [...bigPool].sort(() => rng() - 0.5);
    const shuffledSmall = [...smallPool].sort(() => rng() - 0.5);

    const chosenNumbers = [
      ...shuffledBig.slice(0, numBig),
      ...shuffledSmall.slice(0, 6 - numBig)
    ].sort((a, b) => b - a); // Orden descendente

    // Generar Target
    const target = Math.floor(targetMin + rng() * (targetMax - targetMin + 1));

    // Resolver algorítmicamente para verificar viabilidad
    const solution = (typeof CountdownSolver !== 'undefined')
      ? CountdownSolver.solve(target, chosenNumbers)
      : null;

    return {
      seed,
      target,
      numbers: chosenNumbers,
      timeLimit,
      difficulty,
      solution
    };
  }

  /**
   * Genera código de desafío para compartir (ej: CALC-MED-48291)
   */
  static generateDuelCode(difficulty, seed) {
    const diffPrefix = {
      facil: 'FAC',
      medio: 'MED',
      dificil: 'DIF',
      endemoniado: 'END'
    }[difficulty] || 'MED';
    return `CALC-${diffPrefix}-${seed}`;
  }

  /**
   * Parsea un código de duelo
   */
  static parseDuelCode(code) {
    if (!code || typeof code !== 'string') return null;
    const match = code.trim().toUpperCase().match(/^CALC-(FAC|MED|DIF|END)-(\d{4,6})$/);
    if (!match) return null;

    const diffMap = {
      FAC: 'facil',
      MED: 'medio',
      DIF: 'dificil',
      END: 'endemoniado'
    };

    return {
      difficulty: diffMap[match[1]] || 'medio',
      seed: parseInt(match[2], 10),
      code: code.trim().toUpperCase()
    };
  }
}

if (typeof window !== 'undefined') {
  window.ChallengeGenerator = ChallengeGenerator;
}
