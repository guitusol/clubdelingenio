/**
 * Léxico Táctico - Inteligencia Artificial Táctica (3 Niveles)
 * Generación de jugadas autónomas 100% en local.
 */

class LexicoAI {
  constructor(board, dictionary) {
    this.board = board;
    this.dictionary = dictionary;
  }

  /**
   * Encuentra la mejor jugada según la dificultad seleccionada
   * @param {Array} aiRack - Fichas disponibles en el atril de la IA
   * @param {String} difficulty - 'facil' | 'medio' | 'dificil'
   */
  findMove(aiRack, difficulty = 'medio') {
    const isFirst = this.board.isFirstMove();
    const letters = aiRack.map(t => t.isBlank ? 'E' : t.letter); // simplificar comodín

    // Si es el primer turno, jugar una palabra que pase por el centro (7,7)
    if (isFirst) {
      return this.findFirstMove(letters, difficulty, aiRack);
    }

    // Buscar puntos de anclaje (casillas vacías contiguas a fichas fijas)
    const anchors = this.findAnchors();
    if (anchors.length === 0) return null;

    const candidates = [];

    // Limitar búsqueda para que sea instantánea en navegador
    const maxAnchors = anchors.slice(0, 16);

    for (const anchor of maxAnchors) {
      // Probar extensiones horizontales y verticales
      this.evaluateAnchor(anchor, letters, candidates, aiRack);
      if (candidates.length > 25) break;
    }

    if (candidates.length === 0) {
      return null; // Pasará o cambiará fichas
    }

    // Ordenar candidatos por puntuación
    candidates.sort((a, b) => b.score - a.score);

    // Selección según dificultad
    if (difficulty === 'facil') {
      // Tomar jugada de baja puntuación (tercio inferior)
      const pickIdx = Math.min(candidates.length - 1, Math.floor(candidates.length * 0.7));
      return candidates[pickIdx];
    } else if (difficulty === 'medio') {
      // Tomar jugada intermedia
      const pickIdx = Math.min(candidates.length - 1, Math.floor(candidates.length * 0.3));
      return candidates[pickIdx];
    } else {
      // Gran Maestro: mejor puntuación absoluta
      return candidates[0];
    }
  }

  findAnchors() {
    const anchors = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (this.board.grid[r][c].tile === null) {
          // Comprobar si tiene algún vecino ocupado
          const hasNeighbor = [
            { r: r - 1, c }, { r: r + 1, c }, { r, c: c - 1 }, { r, c: c + 1 }
          ].some(n => n.r >= 0 && n.r < BOARD_SIZE && n.c >= 0 && n.c < BOARD_SIZE && this.board.grid[n.r][n.c].tile !== null);

          if (hasNeighbor) {
            anchors.push({ r, c });
          }
        }
      }
    }
    // Barajar ligeramente para variedad
    return anchors.sort(() => Math.random() - 0.5);
  }

  findFirstMove(letters, difficulty, originalRack) {
    const vocab = Array.from(this.dictionary.wordsSet);
    // Filtrar palabras que se puedan formar con las letras del atril
    const usableWords = vocab.filter(w => {
      if (w.length < 2 || w.length > 7) return false;
      const pool = [...letters];
      for (const char of w) {
        const idx = pool.indexOf(char);
        if (idx === -1) return false;
        pool.splice(idx, 1);
      }
      return true;
    });

    if (usableWords.length === 0) return null;

    // Ordenar según longitud o puntuación
    usableWords.sort((a, b) => b.length - a.length);

    let chosenWord = usableWords[0];
    if (difficulty === 'facil') {
      chosenWord = usableWords[usableWords.length - 1]; // palabra más corta
    } else if (difficulty === 'medio') {
      chosenWord = usableWords[Math.floor(usableWords.length / 2)];
    }

    // Colocar horizontalmente cruzando (7, 7)
    const startC = Math.max(0, 7 - Math.floor(chosenWord.length / 2));
    const placements = [];

    const tempRack = [...originalRack];
    for (let i = 0; i < chosenWord.length; i++) {
      const char = chosenWord[i];
      let rackIdx = tempRack.findIndex(t => t.letter === char);
      if (rackIdx === -1) {
        rackIdx = tempRack.findIndex(t => t.isBlank);
      }
      const tile = tempRack.splice(rackIdx, 1)[0];

      placements.push({
        r: 7,
        c: startC + i,
        letter: char,
        points: tile.isBlank ? 0 : tile.points,
        isBlank: tile.isBlank,
        originalTile: tile
      });
    }

    // Calcular puntos de esta jugada
    this.board.provisionalTiles.clear();
    placements.forEach(p => this.board.placeProvisional(p.r, p.c, p));
    const val = this.board.validatePlacement(this.dictionary);
    this.board.provisionalTiles.clear();

    if (val.valid) {
      return {
        word: chosenWord,
        placements,
        score: val.score
      };
    }
    return null;
  }

  evaluateAnchor(anchor, letters, candidates, originalRack) {
    const directions = [true, false]; // Horizontal, Vertical

    for (const isHorizontal of directions) {
      // Intentar formar una palabra de 2 a 5 letras que cubra el ancla
      const vocab = Array.from(this.dictionary.wordsSet);
      const subVocab = vocab.filter(w => w.length >= 2 && w.length <= 5).slice(0, 40);

      for (const word of subVocab) {
        // Comprobar si se puede colocar la palabra empezando en varias posiciones relativas
        for (let offset = 0; offset < word.length; offset++) {
          const startR = isHorizontal ? anchor.r : anchor.r - offset;
          const startC = isHorizontal ? anchor.c - offset : anchor.c;

          if (startR < 0 || startC < 0) continue;
          const endR = isHorizontal ? startR : startR + word.length - 1;
          const endC = isHorizontal ? startC + word.length - 1 : startC;
          if (endR >= BOARD_SIZE || endC >= BOARD_SIZE) continue;

          // Verificar si las casillas existentes coinciden y si tenemos las letras necesarias en el atril
          const pool = [...letters];
          const placements = [];
          let possible = true;
          let usedAtLeastOneNew = false;
          const tempRack = [...originalRack];

          for (let i = 0; i < word.length; i++) {
            const curR = isHorizontal ? startR : startR + i;
            const curC = isHorizontal ? startC + i : startC;
            const char = word[i];
            const existing = this.board.grid[curR][curC].tile;

            if (existing !== null) {
              if (existing.letter !== char) {
                possible = false;
                break;
              }
            } else {
              usedAtLeastOneNew = true;
              let rackIdx = tempRack.findIndex(t => t.letter === char);
              if (rackIdx === -1) {
                rackIdx = tempRack.findIndex(t => t.isBlank);
              }

              if (rackIdx === -1) {
                possible = false;
                break;
              }

              const tile = tempRack.splice(rackIdx, 1)[0];
              placements.push({
                r: curR,
                c: curC,
                letter: char,
                points: tile.isBlank ? 0 : tile.points,
                isBlank: tile.isBlank,
                originalTile: tile
              });
            }
          }

          if (possible && usedAtLeastOneNew && placements.length > 0) {
            // Probar en el tablero provisional
            this.board.provisionalTiles.clear();
            placements.forEach(p => this.board.placeProvisional(p.r, p.c, p));
            const val = this.board.validatePlacement(this.dictionary);
            this.board.provisionalTiles.clear();

            if (val.valid) {
              candidates.push({
                word,
                placements,
                score: val.score
              });
              if (candidates.length > 30) return;
            }
          }
        }
      }
    }
  }
}

window.LexicoAI = LexicoAI;

