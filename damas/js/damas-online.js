/**
 * Damas Online Multiplayer Manager
 * Handles Room Creation, Joining, State Polling, Move Synchronization & WhatsApp Sharing
 * Zero-Login Architecture with Device UUID & 24h Resilient Rooms
 * Club del Ingenio
 */

export class DamasOnlineManager {
  constructor(app) {
    this.app = app;
    this.apiUrl = '../api/damas_room.php';
    this.roomCode = null;
    this.playerId = this.getOrCreatePlayerId();
    this.playerName = localStorage.getItem('damas_player_name') || 'Jugador del Club';
    this.myColor = null; // 'W' or 'B'
    this.opponentName = null;
    this.status = null; // 'waiting', 'playing', 'finished'
    this.pollInterval = null;
    this.localMoveCount = 0;
    this.isPolling = false;
  }

  getOrCreatePlayerId() {
    let id = localStorage.getItem('damas_player_id');
    if (!id) {
      id = 'usr_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem('damas_player_id', id);
    }
    return id;
  }

  setPlayerName(name) {
    if (name && name.trim()) {
      this.playerName = name.trim();
      localStorage.setItem('damas_player_name', this.playerName);
    }
  }

  getShareableUrl() {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    return `${origin}${pathname}?sala=${this.roomCode}`;
  }

  getWhatsAppShareUrl() {
    const url = this.getShareableUrl();
    const text = encodeURIComponent(
      `¡Te reto a una partida de Damas en Club del Ingenio! 👑⚪⚫\n\nEntra en mi sala online para jugar en 3D en tiempo real (gratis y sin registro):\n👉 ${url}`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  }

  /**
   * Crear nueva sala
   */
  async createRoom(preferredColor = 'W', name = null) {
    if (name) this.setPlayerName(name);

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          player_id: this.playerId,
          player_name: this.playerName,
          color: preferredColor
        })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Error al crear la sala');
      }

      this.roomCode = data.room_code;
      this.myColor = data.your_color;
      this.status = 'waiting';
      this.localMoveCount = 0;

      // Actualizar URL sin recargar
      const newUrl = `${window.location.pathname}?sala=${this.roomCode}`;
      window.history.replaceState({ sala: this.roomCode }, '', newUrl);

      this.startPolling();
      return { success: true, roomCode: this.roomCode, color: this.myColor };
    } catch (err) {
      console.error('Error al crear sala:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Unirse a sala existente
   */
  async joinRoom(roomCode, name = null) {
    if (name) this.setPlayerName(name);
    const cleanCode = roomCode.trim().toUpperCase();

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'join',
          room_code: cleanCode,
          player_id: this.playerId,
          player_name: this.playerName
        })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Error al unirse a la sala');
      }

      this.roomCode = data.room_code;
      this.myColor = data.your_color;
      this.status = data.room.status;
      this.localMoveCount = data.room.move_count || 0;

      if (this.myColor === 'W') {
        this.opponentName = data.room.player_black_name;
      } else {
        this.opponentName = data.room.player_white_name;
      }

      // Actualizar URL
      const newUrl = `${window.location.pathname}?sala=${this.roomCode}`;
      window.history.replaceState({ sala: this.roomCode }, '', newUrl);

      this.startPolling();
      return { 
        success: true, 
        roomCode: this.roomCode, 
        color: this.myColor, 
        room: data.room 
      };
    } catch (err) {
      console.error('Error al unirse a sala:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Iniciar bucle de sondeo (polling cada 1.2s)
   */
  startPolling() {
    this.stopPolling();
    this.poll(); // Primer sondeo inmediato
    this.pollInterval = setInterval(() => this.poll(), 1250);
  }

  stopPolling() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  /**
   * Consultar estado del servidor
   */
  async poll() {
    if (!this.roomCode || this.isPolling) return;
    this.isPolling = true;

    try {
      const url = `${this.apiUrl}?action=status&room_code=${this.roomCode}&player_id=${this.playerId}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.success) {
        console.warn('Sondeo de sala sin éxito:', data.error);
        this.isPolling = false;
        return;
      }

      const prevStatus = this.status;
      this.status = data.status;

      // Actualizar datos del rival
      if (this.myColor === 'W') {
        this.opponentName = data.player_black_name;
      } else {
        this.opponentName = data.player_white_name;
      }

      // Notificar si el rival acaba de unirse a la sala
      if (prevStatus === 'waiting' && data.status === 'playing') {
        this.app.onOnlineOpponentJoined(this.opponentName);
      }

      // Actualizar interfaz online (indicadores de turno y estado del rival)
      this.app.updateOnlineUI(data);

      // Si ha habido un movimiento nuevo en el servidor por parte del rival
      if (data.move_count > this.localMoveCount && data.last_move) {
        this.localMoveCount = data.move_count;
        await this.app.applyRemoteMove(data.last_move, data.board, data.turn, data.winner);
      }

      // Si la partida ha terminado
      if (data.status === 'finished' && data.winner && !this.app.isGameOverModalOpen()) {
        this.app.handleOnlineGameOver(data.winner);
      }

    } catch (err) {
      console.warn('Error en sondeo de sala:', err);
    } finally {
      this.isPolling = false;
    }
  }

  /**
   * Enviar movimiento realizado por el jugador local
   */
  async sendMove(move, board, winner = null) {
    if (!this.roomCode) return false;

    this.localMoveCount++;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'move',
          room_code: this.roomCode,
          player_id: this.playerId,
          move: move,
          board: board,
          winner: winner
        })
      });

      const data = await response.json();
      return data.success;
    } catch (err) {
      console.error('Error enviando movimiento online:', err);
      return false;
    }
  }

  /**
   * Solicitar o aceptar revancha en la misma sala
   */
  async requestRematch() {
    if (!this.roomCode) return false;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'rematch',
          room_code: this.roomCode
        })
      });

      const data = await response.json();
      if (data.success) {
        // En revancha se intercambian los colores
        this.myColor = this.myColor === 'W' ? 'B' : 'W';
        this.localMoveCount = 0;
        this.status = 'playing';
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error solicitando revancha:', err);
      return false;
    }
  }

  /**
   * Salir o abandonar la sala
   */
  async leaveRoom() {
    if (this.roomCode) {
      try {
        await fetch(this.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'leave',
            room_code: this.roomCode,
            player_id: this.playerId
          })
        });
      } catch (err) {
        // Silenciar error en abandono
      }
    }

    this.stopPolling();
    this.roomCode = null;
    this.status = null;
    this.myColor = null;
    this.localMoveCount = 0;

    // Limpiar parámetro de URL
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, '', cleanUrl);
  }
}
