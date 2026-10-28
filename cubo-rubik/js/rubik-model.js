/**
 * Rubik's Cube Logical State & Mathematical Model
 * Follows standard WCA color scheme and notation
 * 
 * Faces:
 * U (Up): 0, White ('W')
 * R (Right): 1, Red ('R')
 * F (Front): 2, Green ('G')
 * D (Down): 3, Yellow ('Y')
 * L (Left): 4, Orange ('O')
 * B (Back): 5, Blue ('B')
 */

export const COLOR_MAP = {
  U: '#ffffff', // White
  R: '#c41e3a', // Red
  F: '#009b48', // Green
  D: '#ffd500', // Yellow
  L: '#ff5800', // Orange
  B: '#0046ad'  // Blue
};

export const COLOR_NAMES = {
  U: 'White',
  R: 'Red',
  F: 'Green',
  D: 'Yellow',
  L: 'Orange',
  B: 'Blue'
};

export class RubikModel {
  constructor() {
    this.reset();
  }

  reset() {
    // 6 faces, each 3x3 array of facelet colors
    // Face indices: 0: U, 1: R, 2: F, 3: D, 4: L, 5: B
    this.faces = {
      U: Array(9).fill('U'),
      R: Array(9).fill('R'),
      F: Array(9).fill('F'),
      D: Array(9).fill('D'),
      L: Array(9).fill('L'),
      B: Array(9).fill('B')
    };

    this.history = [];
    this.redoStack = [];
    this.moveCount = 0;
  }

  isSolved() {
    for (const face of ['U', 'R', 'F', 'D', 'L', 'B']) {
      const target = this.faces[face][4]; // center piece
      if (this.faces[face].some(c => c !== target)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Rotate a 3x3 face matrix clockwise (90 deg)
   */
  rotateFaceClockwise(face) {
    const f = this.faces[face];
    const prev = [...f];
    f[0] = prev[6]; f[1] = prev[3]; f[2] = prev[0];
    f[3] = prev[7]; f[4] = prev[4]; f[5] = prev[1];
    f[6] = prev[8]; f[7] = prev[5]; f[8] = prev[2];
  }

  /**
   * Rotate a 3x3 face matrix counter-clockwise (90 deg)
   */
  rotateFaceCounterClockwise(face) {
    const f = this.faces[face];
    const prev = [...f];
    f[0] = prev[2]; f[1] = prev[5]; f[2] = prev[8];
    f[3] = prev[1]; f[4] = prev[4]; f[5] = prev[7];
    f[6] = prev[0]; f[7] = prev[3]; f[8] = prev[6];
  }

  /**
   * Execute logical move on faces
   * @param {string} move Standard notation: U, U', U2, etc.
   */
  applyMove(move) {
    const base = move[0].toUpperCase();
    const modifier = move.slice(1);

    const times = modifier === '2' ? 2 : modifier.includes("'") ? 3 : 1;

    for (let i = 0; i < times; i++) {
      this.stepQuarterTurn(base);
    }

    this.history.push(move);
    this.moveCount++;
  }

  stepQuarterTurn(face) {
    this.rotateFaceClockwise(face);

    const U = this.faces.U;
    const D = this.faces.D;
    const F = this.faces.F;
    const B = this.faces.B;
    const L = this.faces.L;
    const R = this.faces.R;

    if (face === 'U') {
      // Adjacent faces: F[0,1,2] <- R[0,1,2] <- B[0,1,2] <- L[0,1,2] <- F[0,1,2]
      const temp = [F[0], F[1], F[2]];
      F[0] = R[0]; F[1] = R[1]; F[2] = R[2];
      R[0] = B[0]; R[1] = B[1]; R[2] = B[2];
      B[0] = L[0]; B[1] = L[1]; B[2] = L[2];
      L[0] = temp[0]; L[1] = temp[1]; L[2] = temp[2];
    } else if (face === 'D') {
      // Adjacent faces: F[6,7,8] -> R[6,7,8] -> B[6,7,8] -> L[6,7,8] -> F[6,7,8]
      const temp = [F[6], F[7], F[8]];
      F[6] = L[6]; F[7] = L[7]; F[8] = L[8];
      L[6] = B[6]; L[7] = B[7]; L[8] = B[8];
      B[6] = R[6]; B[7] = R[7]; B[8] = R[8];
      R[6] = temp[0]; R[7] = temp[1]; R[8] = temp[2];
    } else if (face === 'R') {
      // Adjacent faces: U[2,5,8], B[6,3,0], D[2,5,8], F[2,5,8]
      const temp = [U[2], U[5], U[8]];
      U[2] = F[2]; U[5] = F[5]; U[8] = F[8];
      F[2] = D[2]; F[5] = D[5]; F[8] = D[8];
      D[2] = B[6]; D[5] = B[3]; D[8] = B[0];
      B[6] = temp[0]; B[3] = temp[1]; B[0] = temp[2];
    } else if (face === 'L') {
      // Adjacent faces: U[0,3,6], F[0,3,6], D[0,3,6], B[8,5,2]
      const temp = [U[0], U[3], U[6]];
      U[0] = B[8]; U[3] = B[5]; U[6] = B[2];
      B[8] = D[0]; B[5] = D[3]; B[2] = D[6];
      D[0] = F[0]; D[3] = F[3]; D[6] = F[6];
      F[0] = temp[0]; F[3] = temp[1]; F[6] = temp[2];
    } else if (face === 'F') {
      // Adjacent faces: U[6,7,8], R[0,3,6], D[2,1,0], L[8,5,2]
      const temp = [U[6], U[7], U[8]];
      U[6] = L[8]; U[7] = L[5]; U[8] = L[2];
      L[8] = D[2]; L[5] = D[1]; L[2] = D[0];
      D[2] = R[6]; D[1] = R[3]; D[0] = R[0];
      R[6] = temp[2]; R[3] = temp[1]; R[0] = temp[0];
    } else if (face === 'B') {
      // Adjacent faces: U[2,1,0], L[0,3,6], D[6,7,8], R[8,5,2]
      const temp = [U[2], U[1], U[0]];
      U[2] = R[8]; U[1] = R[5]; U[0] = R[2];
      R[8] = D[6]; R[5] = D[7]; R[2] = D[8];
      D[6] = L[0]; D[7] = L[3]; D[8] = L[6];
      L[0] = temp[0]; L[3] = temp[1]; L[6] = temp[2];
    }
  }

  /**
   * Invert a move (e.g. R -> R', R' -> R, R2 -> R2)
   */
  static invertMove(move) {
    if (move.endsWith('2')) return move;
    if (move.endsWith("'")) return move.slice(0, -1);
    return move + "'";
  }

  /**
   * Generate an official WCA-compliant Scramble (20-25 moves)
   * Avoids consecutive moves on the same axis (e.g. never R R' or R L R)
   */
  static generateScramble(length = 21) {
    const faces = ['U', 'D', 'L', 'R', 'F', 'B'];
    const modifiers = ['', "'", '2'];
    const axis = {
      U: 0, D: 0,
      L: 1, R: 1,
      F: 2, B: 2
    };

    const scramble = [];
    let lastAxis = -1;
    let secondLastAxis = -1;

    while (scramble.length < length) {
      const face = faces[Math.floor(Math.random() * faces.length)];
      const currentAxis = axis[face];

      if (currentAxis === lastAxis) continue;
      if (currentAxis === secondLastAxis && lastAxis === currentAxis) continue;

      const mod = modifiers[Math.floor(Math.random() * modifiers.length)];
      scramble.push(face + mod);

      secondLastAxis = lastAxis;
      lastAxis = currentAxis;
    }

    return scramble;
  }
}
