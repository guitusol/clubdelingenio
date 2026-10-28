/**
 * Rubik's Cube Solver, Step-by-Step Tutor & Artistic Patterns
 * Layer-by-Layer pedagogical guide & artistic pattern generators
 */

export const PATTERNS = [
  {
    id: 'checkerboard',
    nameKey: 'pat_checkerboard',
    icon: '🏁',
    moves: ['R2', 'L2', 'U2', 'D2', 'F2', 'B2']
  },
  {
    id: 'dots',
    nameKey: 'pat_dots',
    icon: '🎯',
    moves: ["U", "D'", "R", "L'", "F", "B'", "U", "D'"]
  },
  {
    id: 'crosses',
    nameKey: 'pat_crosses',
    icon: '✝️',
    moves: ['R2', "L'", 'D', 'F2', "R'", "D'", "R'", "L'", "D'", "F'", 'R2', "U'", 'D', 'R2']
  },
  {
    id: 'cube_in_cube',
    nameKey: 'pat_cube_in_cube',
    icon: '📦',
    moves: ['F', 'L', 'F', "U'", 'R', 'U', 'F2', 'L2', "U'", "L'", 'B', "D'", "B'", 'L2', 'U']
  }
];

export const TUTOR_STAGES = [
  {
    id: 'cross',
    titleKey: 'step_cross',
    descKey: 'step_cross_desc',
    sampleAlgo: "F R U R' U' F'",
    badge: '1/7'
  },
  {
    id: 'corners',
    titleKey: 'step_corners',
    descKey: 'step_corners_desc',
    sampleAlgo: "R U R' U'",
    badge: '2/7'
  },
  {
    id: 'middle',
    titleKey: 'step_middle',
    descKey: 'step_middle_desc',
    sampleAlgo: "U R U' R' U' F' U F",
    badge: '3/7'
  },
  {
    id: 'yellow_cross',
    titleKey: 'step_yellow_cross',
    descKey: 'step_yellow_cross_desc',
    sampleAlgo: "F (R U R' U') F'",
    badge: '4/7'
  },
  {
    id: 'yellow_edges',
    titleKey: 'step_yellow_edges',
    descKey: 'step_yellow_edges_desc',
    sampleAlgo: "R U R' U R U2 R'",
    badge: '5/7'
  },
  {
    id: 'yellow_corners_pos',
    titleKey: 'step_yellow_corners_pos',
    descKey: 'step_yellow_corners_pos_desc',
    sampleAlgo: "U R U' L' U R' U' L",
    badge: '6/7'
  },
  {
    id: 'yellow_corners_orient',
    titleKey: 'step_yellow_corners_orient',
    descKey: 'step_yellow_corners_orient_desc',
    sampleAlgo: "(R' D' R D) × 2 o 4",
    badge: '7/7'
  }
];

export class RubikSolver {
  constructor(model) {
    this.model = model;
  }

  /**
   * Determine the current pedagogical stage of the cube based on face state
   */
  evaluateCurrentStage() {
    if (this.model.isSolved()) {
      return {
        stageIndex: 7,
        isSolved: true,
        titleKey: 'step_solved',
        descKey: 'step_solved_desc',
        algo: '—'
      };
    }

    // Check White Cross: U[1, 3, 5, 7] === 'U'
    const U = this.model.faces.U;
    const isWhiteCross = (U[1] === 'U' && U[3] === 'U' && U[5] === 'U' && U[7] === 'U');
    if (!isWhiteCross) {
      return { ...TUTOR_STAGES[0], stageIndex: 0 };
    }

    // Check White Face (1st layer corners): U[0, 2, 6, 8] === 'U'
    const isWhiteFace = U.every(c => c === 'U');
    if (!isWhiteFace) {
      return { ...TUTOR_STAGES[1], stageIndex: 1 };
    }

    // Check 2nd Layer (Middle edges): F[3,5], R[3,5], B[3,5], L[3,5]
    const F = this.model.faces.F;
    const R = this.model.faces.R;
    const B = this.model.faces.B;
    const L = this.model.faces.L;
    const isSecondLayer = (
      F[3] === 'F' && F[5] === 'F' &&
      R[3] === 'R' && R[5] === 'R' &&
      B[3] === 'B' && B[5] === 'B' &&
      L[3] === 'L' && L[5] === 'L'
    );
    if (!isSecondLayer) {
      return { ...TUTOR_STAGES[2], stageIndex: 2 };
    }

    // Check Yellow Cross: D[1, 3, 5, 7] === 'D'
    const D = this.model.faces.D;
    const isYellowCross = (D[1] === 'D' && D[3] === 'D' && D[5] === 'D' && D[7] === 'D');
    if (!isYellowCross) {
      return { ...TUTOR_STAGES[3], stageIndex: 3 };
    }

    // Check Yellow Edges matching lateral centers
    const isYellowEdgesAligned = (F[7] === 'F' && R[7] === 'R' && B[7] === 'B' && L[7] === 'L');
    if (!isYellowEdgesAligned) {
      return { ...TUTOR_STAGES[4], stageIndex: 4 };
    }

    // Check Yellow corners positioned
    const isYellowFaceComplete = D.every(c => c === 'D');
    if (!isYellowFaceComplete) {
      return { ...TUTOR_STAGES[5], stageIndex: 5 };
    }

    return { ...TUTOR_STAGES[6], stageIndex: 6 };
  }

  /**
   * Calculate clean reversal path from history
   */
  getReverseHistorySolution() {
    const history = [...this.model.history];
    if (history.length === 0) return [];
    
    // Invert moves in reverse order
    const reverseMoves = [];
    for (let i = history.length - 1; i >= 0; i--) {
      const m = history[i];
      if (m.endsWith('2')) {
        reverseMoves.push(m);
      } else if (m.endsWith("'")) {
        reverseMoves.push(m.slice(0, -1));
      } else {
        reverseMoves.push(m + "'");
      }
    }
    return reverseMoves;
  }
}
