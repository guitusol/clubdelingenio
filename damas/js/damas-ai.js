/**
 * Damas Tactical AI Engine (Minimax with Alpha-Beta Pruning)
 * 3 Difficulty levels: Novice (Iniciado), Tactician (Táctico), Grandmaster (Gran Maestro)
 * Non-blocking asynchronous calculation for smooth 60 FPS UI.
 */

import { WHITE, BLACK, WHITE_KING, BLACK_KING, EMPTY } from './damas-rules.js';

export class DamasAI {
  constructor(rules) {
    this.rules = rules;
  }

  /**
   * Calculate best move for the AI's turn
   * @param {string} difficulty 'easy', 'medium', 'hard'
   * @returns {Promise<Object>} Best move object
   */
  async getBestMove(difficulty = 'medium') {
    return new Promise(resolve => {
      // Yield to UI thread so "Thinking..." status renders cleanly
      setTimeout(() => {
        const legalMoves = this.rules.getLegalMovesForTurn();
        if (legalMoves.length === 0) {
          resolve(null);
          return;
        }

        if (legalMoves.length === 1) {
          resolve(legalMoves[0]);
          return;
        }

        // Easy mode: occasional random mistake
        if (difficulty === 'easy' && Math.random() < 0.35) {
          const randomIndex = Math.floor(Math.random() * legalMoves.length);
          resolve(legalMoves[randomIndex]);
          return;
        }

        const depth = difficulty === 'hard' ? 5 : difficulty === 'medium' ? 3 : 2;
        const isMaximizing = this.rules.turn === BLACK;

        let bestMove = legalMoves[0];
        let bestScore = isMaximizing ? -Infinity : Infinity;

        for (const move of legalMoves) {
          // Clone rules state
          const simRules = this.cloneRules(this.rules);
          simRules.makeMove(move);

          const score = this.minimax(simRules, depth - 1, -Infinity, Infinity, !isMaximizing);

          if (isMaximizing) {
            if (score > bestScore) {
              bestScore = score;
              bestMove = move;
            }
          } else {
            if (score < bestScore) {
              bestScore = score;
              bestMove = move;
            }
          }
        }

        resolve(bestMove);
      }, 70);
    });
  }

  minimax(rules, depth, alpha, beta, isMaximizing) {
    const gameOver = rules.isGameOver();
    if (gameOver.over) {
      if (gameOver.winner === BLACK) return 10000 + depth;
      if (gameOver.winner === WHITE) return -10000 - depth;
      return 0; // Draw
    }

    if (depth <= 0) {
      return this.evaluateBoard(rules.board);
    }

    const legalMoves = rules.getLegalMovesForTurn();
    if (legalMoves.length === 0) {
      return isMaximizing ? -9000 : 9000;
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of legalMoves) {
        const simRules = this.cloneRules(rules);
        simRules.makeMove(move);
        const evalScore = this.minimax(simRules, depth - 1, alpha, beta, false);
        maxEval = Math.max(maxEval, evalScore);
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) break; // Beta cutoff
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of legalMoves) {
        const simRules = this.cloneRules(rules);
        simRules.makeMove(move);
        const evalScore = this.minimax(simRules, depth - 1, alpha, beta, true);
        minEval = Math.min(minEval, evalScore);
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) break; // Alpha cutoff
      }
      return minEval;
    }
  }

  /**
   * Static board evaluation heuristic
   * Positive score favours BLACK (AI), Negative favours WHITE (Player)
   */
  evaluateBoard(board) {
    let score = 0;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (!p) continue;

        let pieceVal = 100;
        let positionalVal = 0;

        // Kings are worth more than 3x normal men in Damas
        if (p === WHITE_KING || p === BLACK_KING) {
          pieceVal = 320;
          // Kings favor open central control
          const centerDist = Math.abs(3.5 - r) + Math.abs(3.5 - c);
          positionalVal += (7 - centerDist) * 8;
        } else {
          // Advancement bonus for men
          if (p === BLACK) {
            positionalVal += r * 8; // Closer to crowning at r=7
            // Edge protection bonus
            if (c === 0 || c === 7) positionalVal += 12;
            // Back rank defense bonus early on
            if (r === 0) positionalVal += 18;
          } else {
            positionalVal += (7 - r) * 8; // Closer to crowning at r=0
            if (c === 0 || c === 7) positionalVal += 12;
            if (r === 7) positionalVal += 18;
          }
        }

        const total = pieceVal + positionalVal;
        if (p.startsWith(BLACK)) {
          score += total;
        } else {
          score -= total;
        }
      }
    }

    return score;
  }

  cloneRules(rules) {
    const clone = new rules.constructor();
    clone.board = rules.board.map(row => [...row]);
    clone.turn = rules.turn;
    clone.capturedWhite = rules.capturedWhite;
    clone.capturedBlack = rules.capturedBlack;
    clone.moveCount = rules.moveCount;
    clone.activeMultiJumpPiece = rules.activeMultiJumpPiece
      ? { ...rules.activeMultiJumpPiece }
      : null;
    return clone;
  }
}
