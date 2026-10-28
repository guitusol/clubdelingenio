/**
 * Main Application Controller - Damas del Club
 * Integrates 3D Graphics, Rules Engine, Tactical AI, Online Multiplayer, Sound, Puzzles, and 9-language i18n
 * Club del Ingenio
 */

import { i18n } from './i18n.js';
import { sound } from './sound.js';
import { DamasRules, WHITE, BLACK, WHITE_KING, BLACK_KING, EMPTY } from './damas-rules.js';
import { DamasAI } from './damas-ai.js';
import { Damas3D } from './damas-3d.js';
import { DamasOnlineManager } from './damas-online.js';

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
    this.mode = 'ai'; // 'ai', 'pvp', 'online', 'puzzles'
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
    this.onlineManager = new DamasOnlineManager(this);

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

    // Comprobar si hay una sala compartida en la URL (ej. ?sala=DAMAS-XXXXXX)
    const urlParams = new URLSearchParams(window.location.search);
    const roomFromUrl = urlParams.get('sala');
    if (roomFromUrl) {
      this.switchMode('online');
      const inputCode = document.getElementById('online-input-code');
      if (inputCode) inputCode.value = roomFromUrl.toUpperCase();
      this.activateOnlineTab('join');
      this.openModal('modal-online-lobby');
    } else {
      this.startNewGame();
    }
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
    document.getElementById('btn-new-game').addEventListener('click', () => {
      if (this.mode === 'online') {
        this.openModal('modal-online-lobby');
      } else {
        this.startNewGame();
      }
    });

    document.getElementById('btn-undo').addEventListener('click', () => {
      if (this.mode === 'online') {
        this.showToast('No es posible deshacer en partidas online.');
      } else {
        this.undoMove();
      }
    });

    document.getElementById('btn-view-mode').addEventListener('click', () => {
      const isTopDown = this.view3d.toggleViewMode();
      this.showToast(isTopDown ? "Vista Cenital 2.5D" : "Vista Libre 3D");
    });

    // Rematch button in GameOver modal
    const btnRematch = document.getElementById('btn-rematch');
    if (btnRematch) {
      btnRematch.addEventListener('click', async () => {
        this.closeModals();
        if (this.mode === 'online') {
          const success = await this.onlineManager.requestRematch();
          if (success) {
            this.rules.reset();
            this.view3d.rotateCameraToSide(this.onlineManager.myColor, true);
            this.view3d.syncPieces(this.rules.board);
            this.updateHUD();
            this.showToast('¡Revancha iniciada! Cambiando colores.');
          }
        } else {
          this.startNewGame();
        }
      });
    }

    // Share Challenge on WhatsApp
    const btnShare = document.getElementById('btn-share-duel');
    if (btnShare) {
      btnShare.addEventListener('click', () => {
        this.shareWhatsAppChallenge();
      });
    }

    // =========================================================================
    // EVENTOS PARA DUELO ONLINE Y LOBBY
    // =========================================================================

    // Cambio de pestañas en modal online (Crear / Unirse)
    document.querySelectorAll('.online-tab-btn').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const target = e.currentTarget.getAttribute('data-online-tab');
        this.activateOnlineTab(target);
      });
    });

    // Selector de bando en creación de sala
    const pickWhite = document.getElementById('pick-side-white');
    const pickBlack = document.getElementById('pick-side-black');
    if (pickWhite && pickBlack) {
      pickWhite.addEventListener('click', () => {
        pickWhite.classList.add('active');
        pickBlack.classList.remove('active');
      });
      pickBlack.addEventListener('click', () => {
        pickBlack.classList.add('active');
        pickWhite.classList.remove('active');
      });
    }

    // Botón: Crear Sala
    const btnSubmitCreate = document.getElementById('btn-submit-create-room');
    if (btnSubmitCreate) {
      btnSubmitCreate.addEventListener('click', async () => {
        const nameInput = document.getElementById('online-creator-name');
        const name = nameInput ? nameInput.value.trim() : 'Comandante';
        const color = (pickBlack && pickBlack.classList.contains('active')) ? BLACK : WHITE;

        btnSubmitCreate.disabled = true;
        btnSubmitCreate.textContent = 'Creando sala...';

        const res = await this.onlineManager.createRoom(color, name);
        btnSubmitCreate.disabled = false;
        btnSubmitCreate.innerHTML = `<span>🚀</span> <span>${i18n.t('online_btn_create')}</span>`;

        if (res.success) {
          // Mostrar tarjeta de sala creada y enlace
          document.getElementById('panel-create-room').style.display = 'none';
          document.getElementById('panel-join-room').style.display = 'none';
          document.getElementById('online-created-card').style.display = 'block';

          const dispCode = document.getElementById('display-room-code');
          if (dispCode) dispCode.textContent = res.roomCode;

          const dispUrl = document.getElementById('display-room-url');
          if (dispUrl) dispUrl.value = this.onlineManager.getShareableUrl();

          // Actualizar barra de estado del juego
          this.rules.reset();
          this.view3d.syncPieces(this.rules.board);
          this.view3d.rotateCameraToSide(res.color, true);
          this.updateHUD();

          this.showToast(i18n.t('online_room_created'));
        } else {
          this.showToast(res.error || 'Error creando sala');
        }
      });
    }

    // Botón: Unirse a Sala
    const btnSubmitJoin = document.getElementById('btn-submit-join-room');
    if (btnSubmitJoin) {
      btnSubmitJoin.addEventListener('click', async () => {
        const nameInput = document.getElementById('online-joiner-name');
        const codeInput = document.getElementById('online-input-code');
        const name = nameInput ? nameInput.value.trim() : 'Rival';
        const code = codeInput ? codeInput.value.trim().toUpperCase() : '';

        if (!code) {
          this.showToast('Por favor, introduce el código de sala.');
          return;
        }

        btnSubmitJoin.disabled = true;
        btnSubmitJoin.textContent = 'Uniéndose...';

        const res = await this.onlineManager.joinRoom(code, name);
        btnSubmitJoin.disabled = false;
        btnSubmitJoin.innerHTML = `<span>⚔️</span> <span>${i18n.t('online_btn_join')}</span>`;

        if (res.success) {
          this.closeModals();
          this.rules.reset();
          if (res.room && res.room.board) {
            this.rules.board = res.room.board;
          }
          this.view3d.syncPieces(this.rules.board);
          this.view3d.rotateCameraToSide(res.color, true);
          this.updateHUD();
          sound.playVictory();
          this.showToast(i18n.t('online_opponent_connected'));
        } else {
          this.showToast(res.error || 'No se pudo conectar a la sala.');
        }
      });
    }

    // Copiar enlace directo
    const btnCopyLink = document.getElementById('btn-copy-room-link');
    const boxCopyCode = document.getElementById('btn-copy-code-direct');
    const badgeRoom = document.getElementById('online-room-badge');

    const copyAction = () => {
      const url = this.onlineManager.getShareableUrl();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          this.showToast(i18n.t('online_copied_toast'));
        }).catch(() => {
          this.showToast(url);
        });
      } else {
        this.showToast(url);
      }
    };

    if (btnCopyLink) btnCopyLink.addEventListener('click', copyAction);
    if (boxCopyCode) boxCopyCode.addEventListener('click', copyAction);
    if (badgeRoom) badgeRoom.addEventListener('click', copyAction);

    // Compartir por WhatsApp desde Modal o Barra Superior
    const btnWaModal = document.getElementById('btn-modal-whatsapp');
    const btnWaTop = document.getElementById('btn-online-wa');
    const openWa = () => {
      const waUrl = this.onlineManager.getWhatsAppShareUrl();
      window.open(waUrl, '_blank');
    };
    if (btnWaModal) btnWaModal.addEventListener('click', openWa);
    if (btnWaTop) btnWaTop.addEventListener('click', openWa);

    // Salir de la Sala Online
    const btnLeave = document.getElementById('btn-online-leave');
    if (btnLeave) {
      btnLeave.addEventListener('click', () => {
        if (confirm(i18n.t('online_leave_confirm') || '¿Deseas salir de la sala de juego online?')) {
          this.onlineManager.leaveRoom();
          this.switchMode('ai');
          this.showToast('Has salido de la sala.');
        }
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

  activateOnlineTab(tabName) {
    const tabCreate = document.getElementById('tab-btn-create');
    const tabJoin = document.getElementById('tab-btn-join');
    const panelCreate = document.getElementById('panel-create-room');
    const panelJoin = document.getElementById('panel-join-room');
    const panelCreated = document.getElementById('online-created-card');

    if (tabName === 'create') {
      if (tabCreate) tabCreate.classList.add('active');
      if (tabJoin) tabJoin.classList.remove('active');
      if (panelCreate) panelCreate.style.display = 'block';
      if (panelJoin) panelJoin.style.display = 'none';
      if (panelCreated) panelCreated.style.display = 'none';
    } else {
      if (tabJoin) tabJoin.classList.add('active');
      if (tabCreate) tabCreate.classList.remove('active');
      if (panelJoin) panelJoin.style.display = 'block';
      if (panelCreate) panelCreate.style.display = 'none';
      if (panelCreated) panelCreated.style.display = 'none';
    }
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
    const onlineControls = document.getElementById('online-controls');

    if (aiControls) aiControls.style.display = normalizedMode === 'ai' ? 'flex' : 'none';
    if (sideControls) sideControls.style.display = normalizedMode === 'ai' ? 'flex' : 'none';
    if (pvpControls) pvpControls.style.display = normalizedMode === 'pvp' ? 'flex' : 'none';
    if (puzzleControls) puzzleControls.style.display = normalizedMode === 'puzzles' ? 'flex' : 'none';
    if (onlineControls) onlineControls.style.display = normalizedMode === 'online' ? 'flex' : 'none';

    if (normalizedMode === 'puzzles') {
      this.loadPuzzle(this.currentPuzzleIdx);
    } else if (normalizedMode === 'online') {
      if (!this.onlineManager.roomCode) {
        this.openModal('modal-online-lobby');
      } else {
        this.onlineManager.startPolling();
      }
    } else {
      // Si salimos de modo online y había sala, abandonarla
      if (this.onlineManager.roomCode) {
        this.onlineManager.leaveRoom();
      }
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
    } else if (this.mode === 'online' && this.onlineManager.myColor) {
      this.view3d.rotateCameraToSide(this.onlineManager.myColor, true);
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

    // Validación de turno según modo de juego
    if (this.mode === 'online') {
      if (this.onlineManager.status !== 'playing') {
        this.showToast(i18n.t('online_waiting_opponent'));
        return;
      }
      if (currentTurn !== this.onlineManager.myColor) {
        this.showToast(i18n.t('online_opponent_turn'));
        return;
      }
    } else if (this.mode === 'ai') {
      if (currentTurn !== this.playerColor) return;
    }

    // 1. Si se hace clic directamente en un marcador de destino
    if (moveFromMarker) {
      await this.executeUserMove(moveFromMarker);
      return;
    }

    const clickedPiece = this.rules.board[r][c];

    // 2. Clic en una pieza propia del jugador con turno
    const allowedSide = (this.mode === 'online') ? this.onlineManager.myColor : currentTurn;
    if (clickedPiece && this.rules.isPieceOwnedBy(clickedPiece, allowedSide)) {
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

    // 3. Clic en casilla vacía legal
    if (this.selectedSquare && this.legalMovesForSelected.length > 0) {
      const matchedMove = this.legalMovesForSelected.find(m => m.to.r === r && m.to.c === c);
      if (matchedMove) {
        await this.executeUserMove(matchedMove);
        return;
      }
    }

    // Limpiar selección
    this.selectedSquare = null;
    this.legalMovesForSelected = [];
    this.view3d.clearMarkers();
  }

  async executeUserMove(move) {
    this.selectedSquare = null;
    this.legalMovesForSelected = [];
    this.view3d.clearMarkers();

    // 1. Animar movimiento en 3D
    const { from, to, isCapture } = move;
    const isWhite = this.rules.board[from.r][from.c].startsWith(WHITE);
    const willCrown = (isWhite && to.r === 0) || (!isWhite && to.r === 7);

    await new Promise(resolve => {
      this.view3d.animateMove(move, willCrown, resolve);
    });

    // 2. Aplicar movimiento a las reglas lógicas
    this.rules.makeMove(move);
    this.view3d.syncPieces(this.rules.board);
    this.updateHUD();

    // 3. Comprobar Puzles
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

    // 4. Comprobar Fin de Partida
    const gameOver = this.rules.isGameOver();

    // 5. Enviar movimiento al servidor en modo Online
    if (this.mode === 'online') {
      const winner = gameOver.over ? gameOver.winner : null;
      await this.onlineManager.sendMove(move, this.rules.board, winner);
    }

    if (gameOver.over) {
      this.handleGameOver(gameOver.winner);
      return;
    }

    // 6. En PvP: Girar cámara automáticamente si está habilitado
    if (this.mode === 'pvp' && this.pvpAutoRotate) {
      this.view3d.rotateCameraToSide(this.rules.turn, true);
    }

    // 7. En IA: Lanzar cálculo de IA si es su turno
    const isAiTurn = (this.mode === 'ai' && this.rules.turn !== this.playerColor);
    if (isAiTurn) {
      this.triggerAiTurn();
    }
  }

  /**
   * Aplicar jugada remota recibida desde el servidor en Duelo Online
   */
  async applyRemoteMove(move, newBoard, newTurn, winner) {
    const { from, to } = move;
    const piece = this.rules.board[from.r] ? this.rules.board[from.r][from.c] : null;
    const isWhite = piece && piece.startsWith(WHITE);
    const willCrown = (isWhite && to.r === 0) || (!isWhite && to.r === 7);

    // Reproducir animación 3D de la jugada del rival
    await new Promise(resolve => {
      this.view3d.animateMove(move, willCrown, resolve);
    });

    // Sincronizar tablero y estado
    this.rules.board = newBoard;
    this.rules.turn = newTurn;
    this.rules.moveCount = this.onlineManager.localMoveCount;
    this.view3d.syncPieces(this.rules.board);
    this.updateHUD();

    if (winner) {
      this.handleGameOver(winner);
    } else if (newTurn === this.onlineManager.myColor) {
      sound.playClick();
      this.showToast(i18n.t('online_your_turn'));
    }
  }

  /**
   * Notificación cuando el rival se conecta a la sala online
   */
  onOnlineOpponentJoined(opponentName) {
    sound.playVictory();
    this.closeModals();
    this.view3d.rotateCameraToSide(this.onlineManager.myColor, true);
    this.updateHUD();
    this.showToast(`${i18n.t('online_opponent_connected')} (${opponentName})`);
  }

  /**
   * Actualizar indicadores de la barra superior para modo Online
   */
  updateOnlineUI(data) {
    const badgeCode = document.getElementById('online-badge-code');
    if (badgeCode) badgeCode.textContent = data.room_code;

    const statusDot = document.getElementById('online-status-dot');
    const statusText = document.getElementById('online-status-text');

    if (statusDot && statusText) {
      if (data.status === 'playing') {
        statusDot.className = 'status-dot connected';
        const oppName = this.onlineManager.opponentName || 'Rival';
        statusText.textContent = `${oppName} (Conectado)`;
      } else {
        statusDot.className = 'status-dot waiting';
        statusText.textContent = i18n.t('online_waiting_opponent');
      }
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
      if (this.mode === 'online') {
        const isMyTurn = this.rules.turn === this.onlineManager.myColor;
        const colorName = this.rules.turn === WHITE ? i18n.t('side_white') : i18n.t('side_black');
        if (isMyTurn) {
          this.turnBadge.textContent = `${i18n.t('online_your_turn')} (${colorName})`;
          this.turnBadge.className = this.rules.turn === WHITE ? 'turn-badge white' : 'turn-badge black';
        } else {
          this.turnBadge.textContent = `${i18n.t('online_opponent_turn')}`;
          this.turnBadge.className = 'turn-badge black';
        }
      } else if (this.rules.turn === WHITE) {
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

  isGameOverModalOpen() {
    const modal = document.getElementById('modal-game-over');
    return modal && modal.classList.contains('active');
  }

  handleGameOver(winner) {
    sound.playVictory();

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
      let isPlayerWinner = false;
      if (this.mode === 'online') {
        isPlayerWinner = (winner === this.onlineManager.myColor);
      } else if (this.mode === 'ai') {
        isPlayerWinner = (winner === this.playerColor);
      } else {
        isPlayerWinner = true;
      }

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
      `¡Te reto a una partida de Damas en Club del Ingenio! ¿Podrás vencerme en el tablero 3D? Juega gratis y sin anuncios aquí: https://clubdelingenio.com/damas/`
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
