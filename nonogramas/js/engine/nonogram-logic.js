/**
 * NONOGRAMAS DEL CLUB — Motor Lógico y Validador de Reglas
 * Calcula pistas de filas y columnas, valida estados en tiempo real
 * y verifica condiciones de victoria.
 */

class NonogramLogic {
  /**
   * Calcula las pistas numéricas para todas las filas y columnas a partir de la matriz solución.
   * @param {Array<Array<number>>} matrix
   * @returns {{ rows: Array<Array<number>>, cols: Array<Array<number>> }}
   */
  static calculateClues(matrix) {
    const size = matrix.length;
    const rows = [];
    const cols = [];

    // Pistas de filas
    for (let r = 0; r < size; r++) {
      const clues = [];
      let count = 0;
      for (let c = 0; c < size; c++) {
        if (matrix[r][c] === 1) {
          count++;
        } else if (count > 0) {
          clues.push(count);
          count = 0;
        }
      }
      if (count > 0) clues.push(count);
      rows.push(clues.length > 0 ? clues : [0]);
    }

    // Pistas de columnas
    for (let c = 0; c < size; c++) {
      const clues = [];
      let count = 0;
      for (let r = 0; r < size; r++) {
        if (matrix[r][c] === 1) {
          count++;
        } else if (count > 0) {
          clues.push(count);
          count = 0;
        }
      }
      if (count > 0) clues.push(count);
      cols.push(clues.length > 0 ? clues : [0]);
    }

    return { rows, cols };
  }

  /**
   * Extrae los bloques consecutivos de casillas marcadas como 1 en una línea.
   * @param {Array<number>} line
   * @returns {Array<number>}
   */
  static getLineRuns(line) {
    const runs = [];
    let count = 0;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === 1) {
        count++;
      } else if (count > 0) {
        runs.push(count);
        count = 0;
      }
    }
    if (count > 0) runs.push(count);
    return runs.length > 0 ? runs : [0];
  }

  /**
   * Comprueba si una fila del usuario satisface la pista de dicha fila.
   * @param {Array<number>} userRow
   * @param {Array<number>} targetClue
   * @returns {boolean}
   */
  static isLineSatisfied(line, targetClue) {
    const currentRuns = this.getLineRuns(line);
    if (currentRuns.length !== targetClue.length) return false;
    for (let i = 0; i < currentRuns.length; i++) {
      if (currentRuns[i] !== targetClue[i]) return false;
    }
    return true;
  }

  /**
   * Comprueba si el tablero del usuario ha resuelto por completo el puzle.
   * La victoria se alcanza si todas las casillas requeridas (1) están pintadas
   * y ninguna casilla prohibida (0) está marcada como pintada (1).
   * @param {Array<Array<number>>} userGrid
   * @param {Array<Array<number>>} solutionMatrix
   * @returns {boolean}
   */
  static isSolved(userGrid, solutionMatrix) {
    const size = solutionMatrix.length;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const isSolutionFilled = solutionMatrix[r][c] === 1;
        const isUserFilled = userGrid[r][c] === 1;

        if (isSolutionFilled !== isUserFilled) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Crea una cuadrícula vacía de dimensión size x size inicializada a 0.
   * 0 = vacía, 1 = pintada, 2 = tachada con cruz
   * @param {number} size
   * @returns {Array<Array<number>>}
   */
  static createEmptyGrid(size) {
    return Array.from({ length: size }, () => Array(size).fill(0));
  }

  /**
   * Calcula el progreso del usuario hacia la solución (porcentaje).
   * @param {Array<Array<number>>} userGrid
   * @param {Array<Array<number>>} solutionMatrix
   * @returns {number} 0 a 100
   */
  static calculateProgress(userGrid, solutionMatrix) {
    let totalTarget = 0;
    let matched = 0;
    const size = solutionMatrix.length;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (solutionMatrix[r][c] === 1) {
          totalTarget++;
          if (userGrid[r][c] === 1) matched++;
        }
      }
    }

    if (totalTarget === 0) return 100;
    return Math.min(100, Math.round((matched / totalTarget) * 100));
  }
}

if (typeof module !== 'undefined') {
  module.exports = NonogramLogic;
}
