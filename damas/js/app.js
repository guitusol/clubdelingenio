/**
 * Main Application Controller - Damas del Club
 * Integrates 3D Graphics, Rules Engine, Tactical AI, Sound, Puzzles, and 9-language i18n
 * Club del Ingenio
 */

import { i18n } from './i18n.js';
import { sound } from './sound.js';
import { DamasRules, WHITE, BLACK, WHITE_KING, BLACK_KING, EMPTY } from './damas-rules.js';
import { DamasAI } from './damas-ai.js';
import { Damas3D } from './damas-3d.js';

// Pre-arranged tactical salon puzzles for Club del Ingenio
const PUZZLES = [
  {
    id: 1,
    titleKey: "puzzle_1_title",
    descKey: "puzzle_1_desc",
    board: (() => {
      const b = Array(8).fill(null).map(() => Array(8).fill(EMPTY));
      b[5][2] = WHITE; // White man jumps over (4,3) to (3,4), then over (2,5) to (1,6) and crowns!
      b[4][3] = BLACK;
      b[2][5] = BLACK;
      b[1][2] = BLACK;
      return b;
    })(),
    requiredKills: 2,
    playerTurn: WHITE
  },
  {
    id: 2,
    titleKey: "puzzle_2_title",
    descKey: "puzzle_2_desc",
    board: (() => {
      const b = Array(8).fill(null).map(() => Array(8).fill(EMPTY));
      b[7][0] = WHITE_KING; // Flying King sweeps 3 pieces along intersecting diagonals
      b[5][2] = BLACK;
      b[3][4] = BLACK;
      b[1][6] = BLACK;
      b[0][1] = BLACK_KING;
      return b;
    })(),
    requiredKills: 3,
    playerTurn: WHITE
  },
  {
    id: 3,
    titleKey: "puzzle_3_title",
    descKey: "puzzle_3_desc",
    board: (() => {
      const b = Array(8).fill(null).map(() => Array(8).fill(EMPTY));
      b[5][4] = WHITE;
      b[6][1] = WHITE;
      b[4][3] = BLACK;
      b[2][3] = BLACK;
      b[2][5] = BLACK;
      return b;
    })(),
    requiredKills: 3,
    playerTurn: WHITE
  },
  {
    id: 4,
    titleKey: "puzzle_4_title",
    descKey: "puzzle_4_desc",
    board: (() => {
      const b = Array(8).fill(null).map(() => Array(8).fill(EMPTY));
      b[6][5] = WHITE_KING;
      b[5][2] = BLACK_KING;
      b[3][4] = BLACK;
      b[1][2] = BLACK;
      return b;
    })(),
    requiredKills: 3,
    playerTurn: WHITE
  }
];

class DamasApp {
  constructor() {
    this.mode = 'ai'; // 'ai', 'pvp', 'puzzles'
    this.difficulty = 'medium'; // 'easy', 'medium', 'hard'
    this.playerColor = WHITE;
    this.pvpAutoRotate = true;
    this.currentPuzzleIdx = 0;
    this.isAiThinking = false;
    this.selectedSquare = null;
    this.legalMovesForSelected = [];

    // Core instances
    this.rules = new DamasRules();
    this.ai = new DamasAI(this.rules);

    // UI elements cache
    this.canvasContainer = document.getElementById('damas-canvas-container');
    this.turnBadge = document.getElementById('turn-badge');
    this.whiteCountEl = document.getElementById('stat-white-val');
    this.blackCountEl = document.getElementById('stat-black-val');
    this.movesCountEl = document.getElementById('stat-moves-val');
    this.whiteQueensEl = document.getElementById('stat-white-queens');
    this.blackQueensEl = document.getElementById('stat-black-queens');
    this.statusMsgEl = document.getElementById('game-status-msg');

    // 3D Engine with square click callback
    this.view3d = new Damas3D(this.canvasContainer, (r, c, move) => {
      this.onSquareClick(r, c, move);
    });

    this.init();
  }

  init() {
    i18n.applyTranslations();
    this.bindDOMEvents();
    this.startNewGame();
  }

  bindDOMEvents() {
    // Mode switcher buttons
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const newMode = e.currentTarget.getAttribute('data-mode');
        this.switchMode(newMode);
      });
    });

    // Side Selection (White / Black) vs AI
    const btnWhite = document.getElementById('btn-side-white');
    const btnBlack = document.getElementById('btn-side-black');
    if (btnWhite && btnBlack) {
      btnWhite.addEventListener('click', () => {
        btnWhite.classList.add('active');
        btnBlack.classList.remove('active');
        this.playerColor = WHITE;
        this.view3d.rotateCameraToSide(WHITE);
        this.startNewGame();
      });
      btnBlack.addEventListener('click', () => {
        btnBlack.classList.add('active');
        btnWhite.classList.remove('active');
        this.playerColor = BLACK;
        this.view3d.rotateCameraToSide(BLACK);
        this.startNewGame();
      });
    }

    // PvP Auto-rotation toggle
    const btnRotate = document.getElementById('btn-pvp-rotate');
    if (btnRotate) {
      btnRotate.addEventListener('click', () => {
        this.pvpAutoRotate = !this.pvpAutoRotate;
        btnRotate.classList.toggle('active', this.pvpAutoRotate);
        const textKey = this.pvpAutoRotate ? 'pvp_rotate_on' : 'pvp_rotate_off';
        const spanText = document.getElementById('pvp-rotate-text');
        if (spanText) spanText.textContent = i18n.t(textKey);
      });
    }

    // Puzzle Navigation buttons
    const btnPrevPuz = document.getElementById('btn-prev-puzzle');
    const btnNextPuz = document.getElementById('btn-next-puzzle');
    if (btnPrevPuz) {
      btnPrevPuz.addEventListener('click', () => {
        if (this.currentPuzzleIdx > 0) {
          this.currentPuzzleIdx--;
          this.loadPuzzle(this.currentPuzzleIdx);
        }
      });
    }
    if (btnNextPuz) {
      btnNextPuz.addEventListener('click', () => {
        if (this.currentPuzzleIdx < PUZZLES.length - 1) {
          this.currentPuzzleIdx++;
          this.loadPuzzle(this.currentPuzzleIdx);
        }
      });
    }

    // Difficulty selector buttons
    document.querySelectorAll('.diff-btn[data-diff]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.diff-btn[data-diff]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.difficulty = e.currentTarget.getAttribute('data-diff');
      });
    });

    // Top Header Buttons
    document.getElementById('btn-sound').addEventListener('click', () => {
      const enabled = sound.toggleSound();
      document.getElementById('sound-icon').textContent = enabled ? '🔊' : '🔇';
    });

    document.getElementById('btn-lang').addEventListener('click', () => {
      this.openModal('modal-lang');
    });

    document.getElementById('btn-rules').addEventListener('click', () => {
      this.openModal('modal-rules');
    });

    // Language selection
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang');
        i18n.setLanguage(lang);
        this.closeModals();
        this.updateHUD();
      });
    });

    // Action buttons
    document.getElementById('btn-new-game').addEventListener('click', () => this.startNewGame());
    document.getElementById('btn-undo').addEventListener('click', () => this.undoMove());
    document.getElementById('btn-view-mode').addEventListener('click', () => {
      const isTopDown = this.view3d.toggleViewMode();
      this.showToast(isTopDown ? "Vista Cenital 2.5D" : "Vista Libre 3D");
    });

    // Rematch button in GameOver modal
    const btnRematch = document.getElementById('btn-rematch');
    if (btnRematch) {
      btnRematch.addEventListener('click', () => {
        this.closeModals();
        this.startNewGame();
      });
    }

    // Share Challenge on WhatsApp
    const btnShare = document.getElementById('btn-share-duel');
    if (btnShare) {
      btnShare.addEventListener('click', () => {
        this.shareWhatsAppChallenge();
      });
    }

    // Modal close buttons
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => this.closeModals());
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModals();
      });
    });
  }

  switchMode(mode) {
    const normalizedMode = (mode === 'puzzle' || mode === 'puzzles') ? 'puzzles' : mode;
    this.mode = normalizedMode;
    document.querySelectorAll('.mode-tab').forEach(tab => {
      const tabMode = tab.getAttribute('data-mode');
      const isMatch = tabMode === normalizedMode || (tabMode === 'puzzles' && normalizedMode === 'puzzles');
      tab.classList.toggle('active', isMatch);
    });

    const aiControls = document.getElementById('ai-difficulty-controls');
    const sideControls = document.getElementById('side-controls');
    const pvpControls = document.getElementById('pvp-controls');
    const puzzleControls = document.getElementById('puzzle-controls');

    if (aiControls) aiControls.style.display = normalizedMode === 'ai' ? 'flex' : 'none';
    if (sideControls) sideControls.style.display = normalizedMode === 'ai' ? 'flex' : 'none';
    if (pvpControls) pvpControls.style.display = normalizedMode === 'pvp' ? 'flex' : 'none';
    if (puzzleControls) puzzleControls.style.display = normalizedMode === 'puzzles' ? 'flex' : 'none';

    if (normalizedMode === 'puzzles') {
      this.loadPuzzle(this.currentPuzzleIdx);
    } else {
      this.startNewGame();
    }
  }

  loadPuzzle(idx) {
    const puzzle = PUZZLES[idx];
    if (!puzzle) return;

    this.rules.reset();
    this.rules.board = puzzle.board.map(row => [...row]);
    this.rules.turn = puzzle.playerTurn;

    this.selectedSquare = null;
    this.legalMovesForSelected = [];
    this.view3d.clearMarkers();
    this.view3d.syncPieces(this.rules.board);
    this.view3d.rotateCameraToSide(WHITE, true);

    const badge = document.getElementById('puzzle-info-badge');
    if (badge) {
      badge.textContent = `${i18n.t(puzzle.titleKey)} (${idx + 1}/${PUZZLES.length})`;
    }

    this.updateHUD();
    this.showToast(i18n.t(puzzle.descKey));
  }

  startNewGame() {
    this.rules.reset();
    this.selectedSquare = null;
    this.legalMovesForSelected = [];
    this.view3d.clearMarkers();
    this.view3d.syncPieces(this.rules.board);

    // Camera angle according to mode & player color
    if (this.mode === 'ai') {
      this.view3d.rotateCameraToSide(this.playerColor, true);
    } else {
      this.view3d.rotateCameraToSide(WHITE, true);
    }

    this.updateHUD();

    // If player chose BLACK against AI, AI starts moving as WHITE
    if (this.mode === 'ai' && this.playerColor === BLACK) {
      this.triggerAiTurn();
    }
  }

  /**
   * Handle user interaction on board squares / pieces
   */
  async onSquareClick(r, c, moveFromMarker) {
    if (this.isAiThinking) return;

    const currentTurn = this.rules.turn;
    const isPlayerTurn = this.mode === 'pvp' ||
                         this.mode === 'puzzles' ||
                         (this.mode === 'ai' && currentTurn === this.playerColor);
    if (!isPlayerTurn) return;

    // 1. If clicked directly on a destination marker (or square containing one)
    if (moveFromMarker) {
      await this.executeUserMove(moveFromMarker);
      return;
    }

    const clickedPiece = this.rules.board[r][c];

    // 2. Clicked on a piece belonging to current turn player
    if (clickedPiece && this.rules.isPieceOwnedBy(clickedPiece, currentTurn)) {
      const allLegalMoves = this.rules.getLegalMovesForTurn();
      const movesForThisPiece = allLegalMoves.filter(m => m.from.r === r && m.from.c === c);

      if (movesForThisPiece.length > 0) {
        this.selectedSquare = { r, c };
        this.legalMovesForSelected = movesForThisPiece;
        this.view3d.showLegalMoveMarkers(movesForThisPiece);
        sound.playClick();
      } else {
        const anyCaptures = allLegalMoves.some(m => m.isCapture);
        if (anyCaptures) {
          this.showToast(i18n.t('mandatory_capture'));
        }
      }
      return;
    }

    // 3. Clicked empty square: check if it matches a legal destination
    if (this.selectedSquare && this.legalMovesForSelected.length > 0) {
      const matchedMove = this.legalMovesForSelected.find(m => m.to.r === r && m.to.c === c);
      if (matchedMove) {
        await this.executeUserMove(matchedMove);
        return;
      }
    }

    // Otherwise clear selection
    this.selectedSquare = null;
    this.legalMovesForSelected = [];
    this.view3d.clearMarkers();
  }

  async executeUserMove(move) {
    this.selectedSquare = null;
    this.legalMovesForSelected = [];
    this.view3d.clearMarkers();

    // 1. Animate move in 3D
    const { from, to, isCapture } = move;
    const isWhite = this.rules.board[from.r][from.c].startsWith(WHITE);
    const willCrown = (isWhite && to.r === 0) || (!isWhite && to.r === 7);

    await new Promise(resolve => {
      this.view3d.animateMove(move, willCrown, resolve);
    });

    // 2. Update logical rules state
    this.rules.makeMove(move);
    this.view3d.syncPieces(this.rules.board);
    this.updateHUD();

    // 3. Check Puzzle Victory
    if (this.mode === 'puzzles') {
      const puzzle = PUZZLES[this.currentPuzzleIdx];
      const capturedCount = move.capturedPositions ? move.capturedPositions.length : 0;
      if (capturedCount >= puzzle.requiredKills) {
        sound.playVictory();
        this.showToast(i18n.t('puzzle_solved'));
        setTimeout(() => {
          if (this.currentPuzzleIdx < PUZZLES.length - 1) {
            this.currentPuzzleIdx++;
            this.loadPuzzle(this.currentPuzzleIdx);
          }
        }, 1800);
        return;
      }
    }

    // 4. Check Game Over
    const gameOver = this.rules.isGameOver();
    if (gameOver.over) {
      this.handleGameOver(gameOver.winner);
      return;
    }

    // 5. In PvP mode: Auto-rotate camera to the other player if enabled
    if (this.mode === 'pvp' && this.pvpAutoRotate) {
      this.view3d.rotateCameraToSide(this.rules.turn, true);
    }

    // 6. If AI mode and now AI's turn, trigger AI calculation
    const isAiTurn = (this.mode === 'ai' && this.rules.turn !== this.playerColor);
    if (isAiTurn) {
      this.triggerAiTurn();
    }
  }

  async triggerAiTurn() {
    this.isAiThinking = true;
    if (this.statusMsgEl) this.statusMsgEl.textContent = i18n.t('thinking_ai');
    this.updateHUD();

    const bestMove = await this.ai.getBestMove(this.difficulty);

    if (bestMove) {
      const { from, to } = bestMove;
      const piece = this.rules.board[from.r][from.c];
      const isWhite = piece && piece.startsWith(WHITE);
      const willCrown = (isWhite && to.r === 0) || (!isWhite && to.r === 7);

      await new Promise(resolve => {
        this.view3d.animateMove(bestMove, willCrown, resolve);
      });

      this.rules.makeMove(bestMove);
      this.view3d.syncPieces(this.rules.board);
    }

    this.isAiThinking = false;
    this.updateHUD();

    const gameOver = this.rules.isGameOver();
    if (gameOver.over) {
      this.handleGameOver(gameOver.winner);
    }
  }

  undoMove() {
    if (this.isAiThinking) return;

    if (this.mode === 'ai') {
      if (this.rules.history.length >= 2) {
        this.rules.undo();
        this.rules.undo();
      } else if (this.rules.history.length === 1) {
        this.rules.undo();
      }
    } else {
      this.rules.undo();
    }

    this.selectedSquare = null;
    this.legalMovesForSelected = [];
    this.view3d.clearMarkers();
    this.view3d.syncPieces(this.rules.board);
    this.updateHUD();
    this.showToast(i18n.t('btn_undo'));
  }

  updateHUD() {
    const counts = this.rules.countPieces();

    if (this.whiteCountEl) this.whiteCountEl.textContent = counts.white;
    if (this.blackCountEl) this.blackCountEl.textContent = counts.black;
    if (this.movesCountEl) this.movesCountEl.textContent = this.rules.moveCount;
    if (this.whiteQueensEl) this.whiteQueensEl.textContent = counts.whiteKings;
    if (this.blackQueensEl) this.blackQueensEl.textContent = counts.blackKings;

    if (this.turnBadge) {
      if (this.rules.turn === WHITE) {
        const text = (this.mode === 'ai' && this.playerColor === BLACK)
          ? i18n.t('turn_white_ai') || "Turno: Blancas (IA)"
          : i18n.t('turn_white');
        this.turnBadge.textContent = text;
        this.turnBadge.className = 'turn-badge white';
      } else {
        const text = (this.mode === 'ai' && this.playerColor === BLACK)
          ? i18n.t('turn_black_user') || "Turno: Negras (Tú)"
          : (this.mode === 'pvp' ? i18n.t('turn_black_pvp') : i18n.t('turn_black'));
        this.turnBadge.textContent = text;
        this.turnBadge.className = 'turn-badge black';
      }
    }

    if (this.statusMsgEl) {
      if (this.isAiThinking) {
        this.statusMsgEl.textContent = i18n.t('thinking_ai');
      } else {
        this.statusMsgEl.textContent = '';
      }
    }
  }

  handleGameOver(winner) {
    sound.playVictory();

    // Populate Game Over Modal
    const modal = document.getElementById('modal-game-over');
    const titleEl = document.getElementById('game-over-title');
    const descEl = document.getElementById('game-over-desc');
    const iconEl = document.getElementById('game-over-icon');
    const movesEl = document.getElementById('go-stat-moves');
    const capEl = document.getElementById('go-stat-captures');
    const queensEl = document.getElementById('go-stat-queens');

    const isWhite = winner === WHITE;
    if (titleEl) {
      titleEl.textContent = isWhite ? i18n.t('game_over_white') : i18n.t('game_over_black');
    }
    if (iconEl) {
      iconEl.textContent = isWhite ? '⚪👑' : '⚫👑';
    }
    if (descEl) {
      const isPlayerWinner = (this.mode === 'ai' && winner === this.playerColor) || this.mode === 'pvp';
      descEl.textContent = isPlayerWinner
        ? i18n.t('puzzle_solved_desc')
        : "Partida finalizada. ¡Inténtalo de nuevo!";
    }

    const counts = this.rules.countPieces();
    if (movesEl) movesEl.textContent = this.rules.moveCount;
    if (capEl) capEl.textContent = isWhite ? this.rules.capturedBlack : this.rules.capturedWhite;
    if (queensEl) queensEl.textContent = counts.whiteKings + counts.blackKings;

    this.openModal('modal-game-over');
  }

  shareWhatsAppChallenge() {
    const text = encodeURIComponent(
      `¡Te reto a una partida de Damas en Club del Ingenio! ¿Podrás vencerme en el tablero de 3D? Juega gratis y sin anuncios aquí: https://clubdelingenio.com/damas/`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  }

  showToast(msg) {
    const toast = document.getElementById('damas-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3800);
  }

  openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
  }

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.damasApp = new DamasApp();
});
