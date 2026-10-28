/**
 * Damas Rules Engine (Spanish Draughts / Flying Kings & Quantity Law)
 * 8x8 Board, 12 pieces per side on dark squares.
 * Clean, decoupled state model ready for Local Play, AI, and Online Multiplayer.
 */

export const EMPTY = null;
export const WHITE = 'W';
export const BLACK = 'B';
export const WHITE_KING = 'WK';
export const BLACK_KING = 'BK';

export class DamasRules {
  constructor() {
    this.board = this.createInitialBoard();
    this.turn = WHITE; // WHITE moves first
    this.history = [];
    this.capturedWhite = 0;
    this.capturedBlack = 0;
    this.moveCount = 0;
    this.activeMultiJumpPiece = null; // During multi-jump chains
  }

  createInitialBoard() {
    const board = Array(8).fill(null).map(() => Array(8).fill(EMPTY));
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        // Dark playable squares: (r + c) is odd
        if ((r + c) % 2 === 1) {
          if (r < 3) board[r][c] = BLACK;
          else if (r > 4) board[r][c] = WHITE;
        }
      }
    }
    return board;
  }

  reset() {
    this.board = this.createInitialBoard();
    this.turn = WHITE;
    this.history = [];
    this.capturedWhite = 0;
    this.capturedBlack = 0;
    this.moveCount = 0;
    this.activeMultiJumpPiece = null;
  }

  isPieceOwnedBy(piece, player) {
    if (!piece) return false;
    return piece.startsWith(player);
  }

  isKing(piece) {
    return piece === WHITE_KING || piece === BLACK_KING;
  }

  getOpponent(player) {
    return player === WHITE ? BLACK : WHITE;
  }

  /**
   * Find all legal moves for the current player
   * Strictly enforces Spanish Draughts rules:
   * 1. Mandatory capture
   * 2. Ley de la Cantidad (Maximum captures)
   * 3. Ley de la Calidad (Capture more kings, and prioritize king capture)
   */
  getLegalMovesForTurn() {
    const player = this.turn;
    const allCaptures = [];

    // 1. Check all possible capture sequences across the entire board
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (this.isPieceOwnedBy(piece, player)) {
          const jumps = this.getCapturesFromSquare(r, c, piece, this.board);
          allCaptures.push(...jumps);
        }
      }
    }

    // If any captures exist, player MUST capture (Quantity & Quality rules apply)
    if (allCaptures.length > 0) {
      return this.filterByQualityAndQuantity(allCaptures);
    }

    // 2. If no captures exist, regular non-capturing quiet moves
    const quietMoves = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (this.isPieceOwnedBy(piece, player)) {
          quietMoves.push(...this.getQuietMovesFromSquare(r, c, piece, this.board));
        }
      }
    }

    return quietMoves;
  }

  /**
   * Filter captures strictly by:
   * 1. Ley de la Cantidad: Maximum number of captured pieces.
   * 2. Ley de la Calidad (piezas capturadas): Maximum number of enemy Kings/Damas captured.
   * 3. Ley de la Calidad (pieza capturadora): Prioritize captures made by a King over a Man.
   */
  filterByQualityAndQuantity(movesList) {
    if (movesList.length === 0) return [];

    // 1. LEY DE LA CANTIDAD: Mayor número de piezas capturadas
    let maxKills = 0;
    movesList.forEach(m => {
      const kills = m.capturedPositions ? m.capturedPositions.length : 0;
      if (kills > maxKills) maxKills = kills;
    });
    let filtered = movesList.filter(m => (m.capturedPositions ? m.capturedPositions.length : 0) === maxKills);
    if (filtered.length <= 1) return filtered;

    // 2. LEY DE LA CALIDAD (PIEZAS CAPTURADAS): Mayor número de Damas capturadas
    let maxKingsKilled = 0;
    filtered.forEach(m => {
      const kingsKilled = m.capturedPositions
        ? m.capturedPositions.filter(p => this.isKing(p.piece)).length
        : 0;
      if (kingsKilled > maxKingsKilled) maxKingsKilled = kingsKilled;
    });
    filtered = filtered.filter(m => {
      const kingsKilled = m.capturedPositions
        ? m.capturedPositions.filter(p => this.isKing(p.piece)).length
        : 0;
      return kingsKilled === maxKingsKilled;
    });
    if (filtered.length <= 1) return filtered;

    // 3. LEY DE LA CALIDAD (PIEZA CAPTURADORA): A igualdad estricta, comer con la Dama antes que con Peón
    const hasKingMove = filtered.some(m => this.isKing(this.board[m.from.r][m.from.c]));
    if (hasKingMove) {
      filtered = filtered.filter(m => this.isKing(this.board[m.from.r][m.from.c]));
    }

    return filtered;
  }

  filterByMaxCaptures(movesList) {
    return this.filterByQualityAndQuantity(movesList);
  }

  /**
   * Non-capturing regular diagonal moves
   */
  getQuietMovesFromSquare(r, c, piece, board) {
    const moves = [];
    const isWhite = piece.startsWith(WHITE);
    const king = this.isKing(piece);

    // Diagonal directions
    const dirs = king
      ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
      : isWhite ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];

    dirs.forEach(([dr, dc]) => {
      if (king) {
        // Flying king moves any distance along open diagonal
        let step = 1;
        while (true) {
          const nr = r + dr * step;
          const nc = c + dc * step;
          if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
          if (board[nr][nc] !== EMPTY) break;
          moves.push({
            from: { r, c },
            to: { r: nr, c: nc },
            isCapture: false,
            capturedPositions: []
          });
          step++;
        }
      } else {
        // Regular man moves 1 square forward
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && board[nr][nc] === EMPTY) {
          moves.push({
            from: { r, c },
            to: { r: nr, c: nc },
            isCapture: false,
            capturedPositions: []
          });
        }
      }
    });

    return moves;
  }

  /**
   * Recursively discover full multi-jump capture paths from square (r, c)
   */
  getCapturesFromSquare(r, c, piece, board, capturedSoFar = []) {
    const isWhite = piece.startsWith(WHITE);
    const opponent = isWhite ? BLACK : WHITE;
    const king = this.isKing(piece);

    // En damas españolas: La Dama puede saltar en 4 diagonales; el Peón sólo come hacia adelante
    const dirs = king
      ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
      : (isWhite ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]]);

    const completedPaths = [];

    dirs.forEach(([dr, dc]) => {
      if (king) {
        // Flying King jump: search along diagonal for an opponent piece
        let step = 1;
        let enemyPos = null;

        while (true) {
          const checkR = r + dr * step;
          const checkC = c + dc * step;
          if (checkR < 0 || checkR >= 8 || checkC < 0 || checkC >= 8) break;

          const sq = board[checkR][checkC];
          // If already captured in this multi-jump sequence, ignore
          const alreadyCaptured = capturedSoFar.some(p => p.r === checkR && p.c === checkC);

          if (sq !== EMPTY && !alreadyCaptured) {
            if (this.isPieceOwnedBy(sq, opponent)) {
              if (enemyPos === null) {
                enemyPos = { r: checkR, c: checkC, piece: sq };
              } else {
                // Second piece in line, cannot jump two pieces together
                break;
              }
            } else {
              // Own piece blocks
              break;
            }
          } else if (enemyPos !== null) {
            // Landing square after enemy piece
            const landingPos = { r: checkR, c: checkC };
            const newCaptured = [...capturedSoFar, enemyPos];

            // Temporary clone to explore next jump
            const subBoard = board.map(row => [...row]);
            subBoard[r][c] = EMPTY;
            subBoard[landingPos.r][landingPos.c] = piece;

            const furtherJumps = this.getCapturesFromSquare(landingPos.r, landingPos.c, piece, subBoard, newCaptured);
            if (furtherJumps.length > 0) {
              furtherJumps.forEach(fj => {
                completedPaths.push({
                  from: { r, c },
                  to: fj.to,
                  path: [{ r: landingPos.r, c: landingPos.c }, ...fj.path],
                  isCapture: true,
                  capturedPositions: fj.capturedPositions
                });
              });
            } else {
              completedPaths.push({
                from: { r, c },
                to: landingPos,
                path: [{ r: landingPos.r, c: landingPos.c }],
                isCapture: true,
                capturedPositions: newCaptured
              });
            }
          }
          step++;
        }
      } else {
        // Regular Man jump: 2 squares away in forward diagonal directions only
        const enemyR = r + dr;
        const enemyC = c + dc;
        const landR = r + dr * 2;
        const landC = c + dc * 2;

        if (landR >= 0 && landR < 8 && landC >= 0 && landC < 8) {
          const enemyPiece = board[enemyR][enemyC];
          const landSquare = board[landR][landC];
          const alreadyCaptured = capturedSoFar.some(p => p.r === enemyR && p.c === enemyC);

          if (enemyPiece !== EMPTY && !alreadyCaptured && this.isPieceOwnedBy(enemyPiece, opponent)) {
            if (landSquare === EMPTY || (landR === r && landC === c)) {
              const enemyPos = { r: enemyR, c: enemyC, piece: enemyPiece };
              const newCaptured = [...capturedSoFar, enemyPos];

              // En damas españolas: Si el peón llega a la última fila durante una captura,
              // corona a DAMA y su turno termina inmediatamente (no sigue comiendo en este turno).
              const crowns = (isWhite && landR === 0) || (!isWhite && landR === 7);

              if (crowns) {
                completedPaths.push({
                  from: { r, c },
                  to: { r: landR, c: landC },
                  path: [{ r: landR, c: landC }],
                  isCapture: true,
                  capturedPositions: newCaptured
                });
              } else {
                const subBoard = board.map(row => [...row]);
                subBoard[r][c] = EMPTY;
                subBoard[landR][landC] = piece;

                const furtherJumps = this.getCapturesFromSquare(landR, landC, piece, subBoard, newCaptured);
                if (furtherJumps.length > 0) {
                  furtherJumps.forEach(fj => {
                    completedPaths.push({
                      from: { r, c },
                      to: fj.to,
                      path: [{ r: landR, c: landC }, ...fj.path],
                      isCapture: true,
                      capturedPositions: fj.capturedPositions
                    });
                  });
                } else {
                  completedPaths.push({
                    from: { r, c },
                    to: { r: landR, c: landC },
                    path: [{ r: landR, c: landC }],
                    isCapture: true,
                    capturedPositions: newCaptured
                  });
                }
              }
            }
          }
        }
      }
    });

    return completedPaths;
  }

  /**
   * Apply move execution
   */
  makeMove(move) {
    const { from, to, isCapture, capturedPositions } = move;
    const piece = this.board[from.r][from.c];

    // Save snapshot for Undo
    this.history.push({
      board: this.board.map(row => [...row]),
      turn: this.turn,
      capturedWhite: this.capturedWhite,
      capturedBlack: this.capturedBlack,
      moveCount: this.moveCount,
      lastMove: move
    });

    this.board[from.r][from.c] = EMPTY;

    // Check Coronation (Becoming Dama)
    let finalPiece = piece;
    let crowned = false;
    if (piece === WHITE && to.r === 0) {
      finalPiece = WHITE_KING;
      crowned = true;
    } else if (piece === BLACK && to.r === 7) {
      finalPiece = BLACK_KING;
      crowned = true;
    }

    this.board[to.r][to.c] = finalPiece;

    // Remove captured enemy pieces
    if (isCapture && capturedPositions && capturedPositions.length > 0) {
      capturedPositions.forEach(pos => {
        const deadPiece = this.board[pos.r][pos.c];
        if (deadPiece && deadPiece.startsWith(WHITE)) this.capturedWhite++;
        if (deadPiece && deadPiece.startsWith(BLACK)) this.capturedBlack++;
        this.board[pos.r][pos.c] = EMPTY;
      });
    }

    this.moveCount++;
    this.turn = this.getOpponent(this.turn);
    this.activeMultiJumpPiece = null;

    return { crowned, isCapture, capturedCount: capturedPositions ? capturedPositions.length : 0 };
  }

  undo() {
    if (this.history.length === 0) return false;
    const last = this.history.pop();
    this.board = last.board;
    this.turn = last.turn;
    this.capturedWhite = last.capturedWhite;
    this.capturedBlack = last.capturedBlack;
    this.moveCount = last.moveCount;
    this.activeMultiJumpPiece = null;
    return true;
  }

  isGameOver() {
    const legalMoves = this.getLegalMovesForTurn();
    if (legalMoves.length === 0) {
      // Current player has no legal moves -> opponent wins!
      return {
        over: true,
        winner: this.getOpponent(this.turn),
        reason: 'no_moves'
      };
    }

    // Check if one side has 0 pieces
    let whiteCount = 0;
    let blackCount = 0;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = this.board[r][c];
        if (p && p.startsWith(WHITE)) whiteCount++;
        if (p && p.startsWith(BLACK)) blackCount++;
      }
    }

    if (whiteCount === 0) return { over: true, winner: BLACK, reason: 'all_captured' };
    if (blackCount === 0) return { over: true, winner: WHITE, reason: 'all_captured' };

    return { over: false, winner: null };
  }

  countPieces() {
    let white = 0, black = 0, whiteKings = 0, blackKings = 0;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = this.board[r][c];
        if (p === WHITE) white++;
        if (p === WHITE_KING) { white++; whiteKings++; }
        if (p === BLACK) black++;
        if (p === BLACK_KING) { black++; blackKings++; }
      }
    }
    return { white, black, whiteKings, blackKings };
  }
}
