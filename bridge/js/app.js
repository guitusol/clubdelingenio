/**
 * Bridge del Club — Interfaz de Usuario y Controlador Principal
 */

import { BridgeAudio } from './audio.js';
import { BridgeEngine } from './engine.js';
import { SCENARIOS, generateRandomDeal } from './scenarios.js';
import { PLAYER_NAMES, SUITS } from './deck.js';

class BridgeApp {
  constructor() {
    this.audio = new BridgeAudio();
    this.engine = new BridgeEngine(this.audio);
    this.currentScenarioIndex = 0;
    this.activeMode = 'school'; // 'school' | 'freeplay'

    this.initDOM();
    this.bindEvents();
    this.loadScenarioByIndex(0);
  }

  initDOM() {
    this.dom = {
      tableName: document.getElementById('table-title'),
      contractBadge: document.getElementById('hud-contract'),
      targetBadge: document.getElementById('hud-target'),
      tricksNs: document.getElementById('hud-ns-tricks'),
      tricksEw: document.getElementById('hud-ew-tricks'),
      tricksRemain: document.getElementById('hud-remain-tricks'),
      turnIndicator: document.getElementById('turn-indicator-text'),
      turnBadge: document.getElementById('turn-badge'),
      hintText: document.getElementById('teacher-hint-text'),
      btnHintToggle: document.getElementById('btn-toggle-hint'),
      hintContainer: document.getElementById('teacher-hint-box'),
      
      // Manos
      handN: document.getElementById('hand-north'),
      handS: document.getElementById('hand-south'),
      handW: document.getElementById('hand-west'),
      handE: document.getElementById('hand-east'),
      
      // Baza central
      trickArea: document.getElementById('trick-cards-area'),
      trickSlotN: document.getElementById('trick-slot-N'),
      trickSlotS: document.getElementById('trick-slot-S'),
      trickSlotE: document.getElementById('trick-slot-E'),
      trickSlotW: document.getElementById('trick-slot-W'),
      lastTrickWinner: document.getElementById('last-trick-winner-text'),

      // Selectores y Botones
      btnPrevScenario: document.getElementById('btn-prev-scenario'),
      btnNextScenario: document.getElementById('btn-next-scenario'),
      scenarioSelect: document.getElementById('scenario-select'),
      btnRestart: document.getElementById('btn-restart-deal'),
      btnRules: document.getElementById('btn-open-rules'),
      btnMute: document.getElementById('btn-toggle-sound'),
      modeTabs: document.querySelectorAll('.mode-tab'),
      freeContractSelect: document.getElementById('free-contract-select'),
      btnDealRandom: document.getElementById('btn-deal-random'),
      freeplayControls: document.getElementById('freeplay-controls'),
      schoolControls: document.getElementById('school-controls'),

      // Modales
      modalResult: document.getElementById('modal-result'),
      resultTitle: document.getElementById('result-title'),
      resultBadge: document.getElementById('result-badge'),
      resultDetails: document.getElementById('result-details'),
      btnResultNext: document.getElementById('btn-result-next'),
      btnResultRetry: document.getElementById('btn-result-retry'),
      btnResultClose: document.getElementById('btn-result-close'),

      modalRules: document.getElementById('modal-rules'),
      btnCloseRules: document.getElementById('btn-close-rules')
    };
  }

  bindEvents() {
    // Motor callbacks
    this.engine.onStateChange = () => this.render();
    this.engine.onTrickComplete = (result, tricksWon) => this.onTrickFinished(result, tricksWon);
    this.engine.onGameFinished = (summary) => this.onGameEnd(summary);

    // Controles de escenario
    if (this.dom.scenarioSelect) {
      this.dom.scenarioSelect.addEventListener('change', (e) => {
        this.loadScenarioByIndex(parseInt(e.target.value, 10));
      });
    }

    if (this.dom.btnPrevScenario) {
      this.dom.btnPrevScenario.addEventListener('click', () => {
        if (this.currentScenarioIndex > 0) {
          this.loadScenarioByIndex(this.currentScenarioIndex - 1);
        }
      });
    }

    if (this.dom.btnNextScenario) {
      this.dom.btnNextScenario.addEventListener('click', () => {
        if (this.currentScenarioIndex < SCENARIOS.length - 1) {
          this.loadScenarioByIndex(this.currentScenarioIndex + 1);
        }
      });
    }

    if (this.dom.btnRestart) {
      this.dom.btnRestart.addEventListener('click', () => {
        this.engine.loadScenario(this.engine.scenario);
      });
    }

    // Modo libre
    if (this.dom.btnDealRandom) {
      this.dom.btnDealRandom.addEventListener('click', () => {
        const contract = this.dom.freeContractSelect.value;
        const deal = generateRandomDeal(contract);
        this.engine.loadScenario(deal);
      });
    }

    // Pestañas de modo
    this.dom.modeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.dom.modeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const mode = tab.dataset.mode;
        this.activeMode = mode;

        if (mode === 'school') {
          this.dom.schoolControls.style.display = 'flex';
          this.dom.freeplayControls.style.display = 'none';
          this.loadScenarioByIndex(this.currentScenarioIndex);
        } else {
          this.dom.schoolControls.style.display = 'none';
          this.dom.freeplayControls.style.display = 'flex';
          const contract = this.dom.freeContractSelect.value;
          this.engine.loadScenario(generateRandomDeal(contract));
        }
      });
    });

    // Pista del maestro
    if (this.dom.btnHintToggle) {
      this.dom.btnHintToggle.addEventListener('click', () => {
        this.dom.hintContainer.classList.toggle('expanded');
      });
    }

    // Sonido
    if (this.dom.btnMute) {
      this.dom.btnMute.addEventListener('click', () => {
        const isMuted = this.audio.toggleMute();
        this.dom.btnMute.textContent = isMuted ? '🔇' : '🔊';
        this.dom.btnMute.title = isMuted ? 'Activar sonido' : 'Silenciar sonido';
      });
    }

    // Reglas modal
    if (this.dom.btnRules) {
      this.dom.btnRules.addEventListener('click', () => {
        this.dom.modalRules.classList.remove('hidden');
      });
    }
    if (this.dom.btnCloseRules) {
      this.dom.btnCloseRules.addEventListener('click', () => {
        this.dom.modalRules.classList.add('hidden');
      });
    }

    // Modal resultado
    if (this.dom.btnResultRetry) {
      this.dom.btnResultRetry.addEventListener('click', () => {
        this.dom.modalResult.classList.add('hidden');
        this.engine.loadScenario(this.engine.scenario);
      });
    }
    if (this.dom.btnResultNext) {
      this.dom.btnResultNext.addEventListener('click', () => {
        this.dom.modalResult.classList.add('hidden');
        if (this.activeMode === 'school' && this.currentScenarioIndex < SCENARIOS.length - 1) {
          this.loadScenarioByIndex(this.currentScenarioIndex + 1);
        } else {
          const contract = this.dom.freeContractSelect ? this.dom.freeContractSelect.value : '3NT';
          this.engine.loadScenario(generateRandomDeal(contract));
        }
      });
    }
    if (this.dom.btnResultClose) {
      this.dom.btnResultClose.addEventListener('click', () => {
        this.dom.modalResult.classList.add('hidden');
      });
    }
  }

  loadScenarioByIndex(index) {
    if (index < 0 || index >= SCENARIOS.length) return;
    this.currentScenarioIndex = index;
    if (this.dom.scenarioSelect) {
      this.dom.scenarioSelect.value = index;
    }
    const scenario = SCENARIOS[index];
    this.engine.loadScenario(scenario);
  }

  render() {
    const sc = this.engine.scenario;
    if (!sc) return;

    // Actualizar HUD
    if (this.dom.tableName) this.dom.tableName.textContent = sc.title;
    if (this.dom.contractBadge) {
      const trumpSym = sc.trumpSuit === 'NT' ? 'NT' : SUITS[sc.trumpSuit]?.symbol;
      this.dom.contractBadge.innerHTML = `<span class="trump-badge trump-${sc.trumpSuit}">${sc.contract} (${trumpSym})</span>`;
    }
    if (this.dom.targetBadge) this.dom.targetBadge.textContent = `${sc.targetTricks} bazas`;
    if (this.dom.tricksNs) this.dom.tricksNs.textContent = this.engine.tricksWon.NS;
    if (this.dom.tricksEw) this.dom.tricksEw.textContent = this.engine.tricksWon.EW;
    if (this.dom.tricksRemain) {
      const remainingForContract = Math.max(0, sc.targetTricks - this.engine.tricksWon.NS);
      this.dom.tricksRemain.textContent = remainingForContract === 0 ? '¡Cumplido!' : `${remainingForContract} restantes`;
    }

    // Indicador de turno
    this.renderTurnIndicator();

    // Renderizar manos
    this.renderHand('S', this.dom.handS, true);
    this.renderHand('N', this.dom.handN, true); // El Muerto siempre abierto
    this.renderHand('W', this.dom.handW, false); // Oponentes cerrados
    this.renderHand('E', this.dom.handE, false);

    // Renderizar baza central
    this.renderTrickCards();

    // Pista pedagógica
    if (this.dom.hintText) {
      this.dom.hintText.textContent = this.engine.getTeacherHint();
    }
  }

  renderTurnIndicator() {
    const turn = this.engine.currentTurn;
    const isUserControl = (turn === 'S' || turn === 'N');

    if (this.dom.turnBadge) {
      this.dom.turnBadge.textContent = turn;
      this.dom.turnBadge.className = `turn-badge turn-${turn} ${isUserControl ? 'turn-user' : ''}`;
    }

    if (this.dom.turnIndicator) {
      if (turn === 'S') {
        this.dom.turnIndicator.innerHTML = '<strong>Tu turno en Sur:</strong> Haz clic en una carta de tu mano para jugarla';
      } else if (turn === 'N') {
        this.dom.turnIndicator.innerHTML = '<strong>Tu turno en Norte (El Muerto):</strong> Como declarador, elige qué carta de tu compañero jugar';
      } else if (turn === 'W') {
        this.dom.turnIndicator.innerHTML = '<em>Turno de Oeste (Defensa)... pensando jugada</em>';
      } else if (turn === 'E') {
        this.dom.turnIndicator.innerHTML = '<em>Turno de Este (Defensa)... pensando jugada</em>';
      }
    }
  }

  renderHand(player, container, isFaceUp) {
    if (!container) return;
    container.innerHTML = '';

    const cards = this.engine.hands[player];
    const isCurrentTurn = (this.engine.currentTurn === player);
    const legalCards = (isCurrentTurn && (player === 'S' || player === 'N'))
      ? this.engine.getLegalCards(player)
      : [];

    const isLegalMap = new Set(legalCards.map(c => c.id));

    cards.forEach((card, index) => {
      const el = document.createElement('div');
      el.className = `bridge-card ${card.suit.color === '#ef4444' || card.suit.color === '#f59e0b' ? 'suit-red' : 'suit-black'}`;

      if (!isFaceUp) {
        el.classList.add('card-back');
        container.appendChild(el);
        return;
      }

      // Si es cara arriba
      const isLegal = isLegalMap.has(card.id);
      if (isCurrentTurn && (player === 'S' || player === 'N')) {
        if (isLegal) {
          el.classList.add('card-playable');
        } else {
          el.classList.add('card-dimmed');
        }
      }

      el.innerHTML = `
        <div class="card-corner top-left">
          <span class="card-rank">${card.rankLabel}</span>
          <span class="card-suit">${card.suit.symbol}</span>
        </div>
        <div class="card-center">
          <span class="card-big-suit">${card.suit.symbol}</span>
        </div>
        <div class="card-corner bottom-right">
          <span class="card-rank">${card.rankLabel}</span>
          <span class="card-suit">${card.suit.symbol}</span>
        </div>
      `;

      if (isCurrentTurn && (player === 'S' || player === 'N') && isLegal) {
        el.addEventListener('click', () => {
          this.engine.playCard(player, card);
        });
      }

      container.appendChild(el);
    });
  }

  renderTrickCards() {
    ['N', 'S', 'E', 'W'].forEach(pos => {
      const slot = this.dom[`trickSlot${pos}`];
      if (!slot) return;
      slot.innerHTML = '';
      slot.classList.remove('has-card');

      const played = this.engine.currentTrick.find(t => t.player === pos);
      if (played) {
        slot.classList.add('has-card');
        const c = played.card;
        const isRed = (c.suit.color === '#ef4444' || c.suit.color === '#f59e0b');

        const cardEl = document.createElement('div');
        cardEl.className = `bridge-card trick-card-played ${isRed ? 'suit-red' : 'suit-black'}`;
        cardEl.innerHTML = `
          <div class="card-corner top-left">
            <span class="card-rank">${c.rankLabel}</span>
            <span class="card-suit">${c.suit.symbol}</span>
          </div>
          <div class="card-center">
            <span class="card-big-suit">${c.suit.symbol}</span>
          </div>
          <div class="card-corner bottom-right">
            <span class="card-rank">${c.rankLabel}</span>
            <span class="card-suit">${c.suit.symbol}</span>
          </div>
        `;
        slot.appendChild(cardEl);
      }
    });
  }

  onTrickFinished(result, tricksWon) {
    if (this.dom.lastTrickWinner) {
      const winnerName = PLAYER_NAMES[result.winner];
      this.dom.lastTrickWinner.textContent = `Baza ganada por: ${winnerName} con ${result.winningCard.toString()}`;
    }
  }

  onGameEnd(summary) {
    if (!this.dom.modalResult) return;

    if (summary.success) {
      this.dom.resultTitle.textContent = '🎉 ¡CONTRATO CUMPLIDO!';
      this.dom.resultTitle.style.color = '#34d399';
      this.dom.resultBadge.className = 'result-badge success';
      this.dom.resultBadge.textContent = `+${summary.difference} bazas de sobre`;
      this.dom.resultDetails.innerHTML = `
        <p>¡Extraordinaria labor de deducción! Has ganado <strong>${summary.achieved} bazas</strong> (objetivo: ${summary.target}).</p>
        <div class="lesson-recap">
          <strong>Lección dominada:</strong>
          <p>${summary.scenario.lesson}</p>
        </div>
      `;
      this.dom.btnResultNext.textContent = '➡️ Siguiente Misión';
      this.dom.btnResultNext.style.display = 'inline-block';
    } else {
      this.dom.resultTitle.textContent = '❌ CONTRATO CAÍDO';
      this.dom.resultTitle.style.color = '#f87171';
      this.dom.resultBadge.className = 'result-badge failure';
      this.dom.resultBadge.textContent = `${summary.difference} bazas para cumplir`;
      this.dom.resultDetails.innerHTML = `
        <p>Has ganado <strong>${summary.achieved} de las ${summary.target} bazas</strong> necesarias.</p>
        <div class="lesson-recap">
          <strong>Consejo para superar esta mano:</strong>
          <p>${summary.scenario.tip}</p>
        </div>
      `;
      this.dom.btnResultNext.style.display = 'none';
    }

    this.dom.modalResult.classList.remove('hidden');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.bridgeApp = new BridgeApp();
  });
} else {
  window.bridgeApp = new BridgeApp();
}

