/**
 * Léxico Táctico - Motor de Tablero 15x15, Multiplicadores y Reglas
 */

const BOARD_SIZE = 15;

// Matriz oficial simétrica de casillas multiplicadoras
// '.' = Normal, '3P' = Triple Palabra, '2P' = Doble Palabra, '3L' = Triple Letra, '2L' = Doble Letra, 'ST' = Estrella Centro (2P)
const MULTIPLIER_TEMPLATE = [
  ['3P', '.',  '.',  '2L', '.',  '.',  '.',  '3P', '.',  '.',  '.',  '2L', '.',  '.',  '3P'],
  ['.',  '2P', '.',  '.',  '.',  '3L', '.',  '.',  '.',  '3L', '.',  '.',  '.',  '2P', '.'],
  ['.',  '.',  '2P', '.',  '.',  '.',  '2L', '.',  '2L', '.',  '.',  '.',  '2P', '.',  '.'],
  ['2L', '.',  '.',  '2P', '.',  '.',  '.',  '2L', '.',  '.',  '.',  '2P', '.',  '.',  '2L'],
  ['.',  '.',  '.',  '.',  '2P', '.',  '.',  '.',  '.',  '.',  '2P', '.',  '.',  '.',  '.'],
  ['.',  '3L', '.',  '.',  '.',  '3L', '.',  '.',  '.',  '3L', '.',  '.',  '.',  '3L', '.'],
  ['.',  '.',  '2L', '.',  '.',  '.',  '2L', '.',  '2L', '.',  '.',  '.',  '2L', '.',  '.'],
  ['3P', '.',  '.',  '2L', '.',  '.',  '.',  'ST', '.',  '.',  '.',  '2L', '.',  '.',  '3P'],
  ['.',  '.',  '2L', '.',  '.',  '.',  '2L', '.',  '2L', '.',  '.',  '.',  '2L', '.',  '.'],
  ['.',  '3L', '.',  '.',  '.',  '3L', '.',  '.',  '.',  '3L', '.',  '.',  '.',  '3L', '.'],
  ['.',  '.',  '.',  '.',  '2P', '.',  '.',  '.',  '.',  '.',  '2P', '.',  '.',  '.',  '.'],
  ['2L', '.',  '.',  '2P', '.',  '.',  '.',  '2L', '.',  '.',  '.',  '2P', '.',  '.',  '2L'],
  ['.',  '.',  '2P', '.',  '.',  '.',  '2L', '.',  '2L', '.',  '.',  '.',  '2P', '.',  '.'],
  ['.',  '2P', '.',  '.',  '.',  '3L', '.',  '.',  '.',  '3L', '.',  '.',  '.',  '2P', '.'],
  ['3P', '.',  '.',  '2L', '.',  '.',  '.',  '3P', '.',  '.',  '.',  '2L', '.',  '.',  '3P']
];

class BoardEngine {
  constructor() {
    this.size = BOARD_SIZE;
    this.grid = [];
    this.provisionalTiles = new Map(); // key: "r,c" -> { letter, points, originalTile, isBlank }
    this.reset();
  }

  reset() {
    this.grid = [];
    for (let r = 0; r < this.size; r++) {
      const row = [];
      for (let c = 0; c < this.size; c++) {
        row.push({
          r,
          c,
          multiplier: MULTIPLIER_TEMPLATE[r][c],
          tile: null // { letter, points, isBlank, locked: true }
        });
      }
      this.grid.push(row);
    }
    this.provisionalTiles.clear();
  }

  isFirstMove() {
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.grid[r][c].tile !== null) return false;
      }
    }
    return true;
  }

  placeProvisional(r, c, tileData) {
    if (r < 0 || r >= this.size || c < 0 || c >= this.size) return false;
    if (this.grid[r][c].tile !== null) return false; // ya hay ficha fija

    this.provisionalTiles.set(`${r},${c}`, {
      r,
      c,
      letter: tileData.letter,
      points: tileData.points,
      isBlank: tileData.isBlank || false,
      originalTile: tileData
    });
    return true;
  }

  removeProvisional(r, c) {
    const key = `${r},${c}`;
    if (this.provisionalTiles.has(key)) {
      const tile = this.provisionalTiles.get(key);
      this.provisionalTiles.delete(key);
      return tile.originalTile;
    }
    return null;
  }

  clearProvisional() {
    const recalled = [];
    this.provisionalTiles.forEach(p => {
      recalled.push(p.originalTile);
    });
    this.provisionalTiles.clear();
    return recalled;
  }

  commitProvisional() {
    this.provisionalTiles.forEach(p => {
      this.grid[p.r][p.c].tile = {
        letter: p.letter,
        points: p.points,
        isBlank: p.isBlank,
        locked: true
      };
    });
    this.provisionalTiles.clear();
  }

  getEffectiveCell(r, c) {
    const key = `${r},${c}`;
    if (this.provisionalTiles.has(key)) {
      return { tile: this.provisionalTiles.get(key), isProvisional: true };
    }
    if (this.grid[r] && this.grid[r][c] && this.grid[r][c].tile) {
      return { tile: this.grid[r][c].tile, isProvisional: false };
    }
    return null;
  }

  /**
   * Valida la colocación de las fichas provisionales y devuelve las palabras formadas y la puntuación
   */
  validatePlacement(dictionary) {
    if (this.provisionalTiles.size === 0) {
      return { valid: false, error: 'no_tiles' };
    }

    const provCoords = Array.from(this.provisionalTiles.values()).map(p => ({ r: p.r, c: p.c }));
    const firstMove = this.isFirstMove();

    // 1. Si es la primera jugada, debe pasar por el centro (7, 7)
    if (firstMove) {
      const touchesCenter = provCoords.some(coord => coord.r === 7 && coord.c === 7);
      if (!touchesCenter) {
        return { valid: false, error: 'must_touch_center' };
      }
      if (provCoords.length < 2) {
        return { valid: false, error: 'min_word_length' };
      }
    }

    // 2. Verificar alineación (todas en la misma fila o todas en la misma columna)
    const sameRow = provCoords.every(coord => coord.r === provCoords[0].r);
    const sameCol = provCoords.every(coord => coord.c === provCoords[0].c);

    if (!sameRow && !sameCol) {
      return { valid: false, error: 'must_be_inline' };
    }

    // 3. Verificar continuidad (no puede haber huecos vacíos entre el inicio y el final de la palabra)
    let minR = Math.min(...provCoords.map(p => p.r));
    let maxR = Math.max(...provCoords.map(p => p.r));
    let minC = Math.min(...provCoords.map(p => p.c));
    let maxC = Math.max(...provCoords.map(p => p.c));

    if (sameRow) {
      const r = provCoords[0].r;
      for (let c = minC; c <= maxC; c++) {
        if (!this.getEffectiveCell(r, c)) {
          return { valid: false, error: 'gap_detected' };
        }
      }
    } else {
      const c = provCoords[0].c;
      for (let r = minR; r <= maxR; r++) {
        if (!this.getEffectiveCell(r, c)) {
          return { valid: false, error: 'gap_detected' };
        }
      }
    }

    // 4. Si no es primer turno, al menos una ficha provisional debe ser adyacente a una ficha fija existente
    if (!firstMove) {
      let connectsToExisting = false;
      for (const p of provCoords) {
        const neighbors = [
          { r: p.r - 1, c: p.c },
          { r: p.r + 1, c: p.c },
          { r: p.r, c: p.c - 1 },
          { r: p.r, c: p.c + 1 }
        ];
        for (const n of neighbors) {
          if (n.r >= 0 && n.r < this.size && n.c >= 0 && n.c < this.size) {
            const cell = this.grid[n.r][n.c];
            if (cell.tile !== null && !this.provisionalTiles.has(`${n.r},${n.c}`)) {
              connectsToExisting = true;
              break;
            }
          }
        }
        if (connectsToExisting) break;
      }

      if (!connectsToExisting) {
        return { valid: false, error: 'must_connect_existing' };
      }
    }

    // 5. Encontrar todas las palabras formadas (palabra principal + palabras perpendiculares cruzadas)
    const wordsFormed = [];

    // Función auxiliar para extraer una palabra continua en una línea
    const extractWord = (r, c, isHorizontal) => {
      let start = isHorizontal ? c : r;
      let end = isHorizontal ? c : r;

      // Retroceder hasta el inicio de la secuencia
      while (start > 0) {
        const checkR = isHorizontal ? r : start - 1;
        const checkC = isHorizontal ? start - 1 : c;
        if (this.getEffectiveCell(checkR, checkC)) {
          start--;
        } else {
          break;
        }
      }

      // Avanzar hasta el final de la secuencia
      while (end < this.size - 1) {
        const checkR = isHorizontal ? r : end + 1;
        const checkC = isHorizontal ? end + 1 : c;
        if (this.getEffectiveCell(checkR, checkC)) {
          end++;
        } else {
          break;
        }
      }

      // Solo si la longitud es al menos 2 letras
      if (end - start + 1 < 2) return null;

      const cells = [];
      let text = '';
      for (let i = start; i <= end; i++) {
        const curR = isHorizontal ? r : i;
        const curC = isHorizontal ? i : c;
        const eff = this.getEffectiveCell(curR, curC);
        cells.push({
          r: curR,
          c: curC,
          tile: eff.tile,
          isNew: eff.isProvisional,
          multiplier: this.grid[curR][curC].multiplier
        });
        text += eff.tile.letter;
      }

      return { text, cells, isHorizontal };
    };

    // A) Palabra Principal
    const isMainHorizontal = sameRow && (!sameCol || provCoords.length === 1);
    const sample = provCoords[0];
    const mainWord = extractWord(sample.r, sample.c, isMainHorizontal);
    if (mainWord) {
      wordsFormed.push(mainWord);
    } else {
      // Intentar vertical si no se formó horizontal (ej. 1 sola ficha)
      const altWord = extractWord(sample.r, sample.c, !isMainHorizontal);
      if (altWord) wordsFormed.push(altWord);
    }

    // B) Palabras Perpendiculares
    for (const p of provCoords) {
      const crossWord = extractWord(p.r, p.c, !isMainHorizontal);
      if (crossWord) {
        // Evitar duplicados si coincidiera con la principal
        const already = wordsFormed.some(w =>
          w.isHorizontal === crossWord.isHorizontal &&
          w.cells[0].r === crossWord.cells[0].r &&
          w.cells[0].c === crossWord.cells[0].c
        );
        if (!already) {
          wordsFormed.push(crossWord);
        }
      }
    }

    if (wordsFormed.length === 0) {
      return { valid: false, error: 'min_word_length' };
    }

    // 6. Validar cada palabra en el diccionario
    const invalidWords = [];
    wordsFormed.forEach(w => {
      if (dictionary && !dictionary.isValidWord(w.text)) {
        invalidWords.push(w.text);
      }
    });

    if (invalidWords.length > 0) {
      return { valid: false, error: 'invalid_words', invalidWords, wordsFormed };
    }

    // 7. Calcular puntuación exacta
    let totalScore = 0;
    const scoredDetails = [];

    wordsFormed.forEach(w => {
      let wordBasePoints = 0;
      let wordMultiplier = 1;

      w.cells.forEach(cell => {
        let letterPoints = cell.tile.isBlank ? 0 : cell.tile.points;

        // Solo las fichas NUEVAS activan los multiplicadores de la casilla
        if (cell.isNew) {
          if (cell.multiplier === '2L') {
            letterPoints *= 2;
          } else if (cell.multiplier === '3L') {
            letterPoints *= 3;
          } else if (cell.multiplier === '2P' || cell.multiplier === 'ST') {
            wordMultiplier *= 2;
          } else if (cell.multiplier === '3P') {
            wordMultiplier *= 3;
          }
        }

        wordBasePoints += letterPoints;
      });

      const wordFinalScore = wordBasePoints * wordMultiplier;
      totalScore += wordFinalScore;
      scoredDetails.push({ word: w.text, points: wordFinalScore, base: wordBasePoints, mult: wordMultiplier });
    });

    // Bonificación de Bingo: si el jugador coloca exactamente 7 fichas en un turno
    const isBingo = provCoords.length === 7;
    if (isBingo) {
      totalScore += 50;
    }

    return {
      valid: true,
      score: totalScore,
      isBingo,
      wordsFormed: wordsFormed.map(w => w.text),
      details: scoredDetails
    };
  }
}

window.boardEngine = new BoardEngine();

