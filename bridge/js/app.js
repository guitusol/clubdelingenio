/**
 * Bridge del Club — Interfaz de Usuario y Controlador Principal
 * Con soporte para Escuela de Carteo, Salón Libre, Salón de Torneo Oficial
 * y Sistema de Internacionalización Completo en 9 Idiomas Oficiales.
 */

import { BridgeAudio } from './audio.js';
import { BridgeEngine } from './engine.js';
import { SCENARIOS, generateRandomDeal } from './scenarios.js';
import { PLAYER_NAMES, SUITS } from './deck.js';
import { STRAINS, SAYCAssistant } from './bidding.js';
import { i18n, BRIDGE_I18N } from './i18n.js';

class BridgeApp {
  constructor() {
    this.audio = new BridgeAudio();
    this.engine = new BridgeEngine(this.audio);
    this.currentScenarioIndex = 0;
    this.activeMode = 'school'; // 'school' | 'freeplay' | 'tournament'
    this.bidButtons = {};

    this.initDOM();
    this.initBiddingBox();
    this.bindEvents();
    
    // Inicializar traducción
    i18n.translateDOM();
    this.updateActiveLangCard();
    this.updateScenarioOptions();
    this.renderRulesModal();
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

      // Selectores y Botones de Barra de Control
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

      // Controles Modo Torneo
      tournamentControls: document.getElementById('tournament-controls'),
      dealerSelect: document.getElementById('dealer-select'),
      btnDealTournament: document.getElementById('btn-deal-tournament'),

      // Panel de Subasta & Bidding Box
      auctionOverlay: document.getElementById('auction-overlay'),
      auctionDealerText: document.getElementById('auction-dealer-text'),
      saycRecText: document.getElementById('sayc-recommendation-text'),
      auctionTbody: document.getElementById('auction-calls-tbody'),
      biddingBoxContainer: document.getElementById('bidding-box-container'),
      biddingLevelsGrid: document.getElementById('bidding-levels-grid'),
      biddingBoxStatus: document.getElementById('bidding-box-status'),
      btnCallPass: document.getElementById('btn-call-pass'),
      btnCallDouble: document.getElementById('btn-call-double'),
      btnCallRedouble: document.getElementById('btn-call-redouble'),

      // Modal de Idiomas
      btnOpenLang: document.getElementById('btn-open-lang'),
      modalLang: document.getElementById('modal-lang'),
      btnCloseLang: document.getElementById('btn-close-lang'),
      langButtons: document.querySelectorAll('.lang-select-btn'),
      currentLangCode: document.getElementById('current-lang-code'),

      // Modales
      modalResult: document.getElementById('modal-result'),
      resultTitle: document.getElementById('result-title'),
      resultBadge: document.getElementById('result-badge'),
      resultDetails: document.getElementById('result-details'),
      btnResultNext: document.getElementById('btn-result-next'),
      btnResultRetry: document.getElementById('btn-result-retry'),
      btnResultClose: document.getElementById('btn-result-close'),

      modalRules: document.getElementById('modal-rules'),
      rulesModalBody: document.getElementById('rules-modal-body'),
      btnCloseRules: document.getElementById('btn-close-rules'),
      btnCloseRulesBottom: document.getElementById('btn-close-rules-bottom')
    };
  }

  /**
   * Genera dinámicamente la cuadrícula de la Bidding Box (niveles 1-7 y 5 palos)
   */
  initBiddingBox() {
    if (!this.dom.biddingLevelsGrid) return;
    this.dom.biddingLevelsGrid.innerHTML = '';
    this.bidButtons = {};

    for (let level = 1; level <= 7; level++) {
      const col = document.createElement('div');
      col.className = 'bidding-level-col';

      STRAINS.forEach(strain => {
        const bid = `${level}${strain.key}`;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-bid';
        btn.dataset.bid = bid;
        btn.innerHTML = `<span style="color:${strain.color}">${level}${strain.symbol}</span>`;
        btn.title = `${level} ${strain.name}`;

        btn.addEventListener('click', () => {
          this.engine.makeBid(bid);
        });

        this.bidButtons[bid] = btn;
        col.appendChild(btn);
      });

      this.dom.biddingLevelsGrid.appendChild(col);
    }
  }

  bindEvents() {
    // Motor callbacks
    this.engine.onStateChange = () => this.render();
    this.engine.onAuctionChange = () => this.renderAuction();
    this.engine.onTrickComplete = (result, tricksWon) => this.onTrickFinished(result, tricksWon);
    this.engine.onGameFinished = (summary) => this.onGameEnd(summary);

    // Idioma
    if (this.dom.btnOpenLang) {
      this.dom.btnOpenLang.addEventListener('click', () => {
        this.updateActiveLangCard();
        this.dom.modalLang.classList.remove('hidden');
      });
    }

    if (this.dom.btnCloseLang) {
      this.dom.btnCloseLang.addEventListener('click', () => {
        this.dom.modalLang.classList.add('hidden');
      });
    }

    this.dom.langButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        i18n.setLanguage(lang);
        this.dom.modalLang.classList.add('hidden');
        this.updateActiveLangCard();
        this.updateScenarioOptions();
        this.renderRulesModal();
        this.render();
      });
    });

    // Controles de escenario (Escuela)
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

    // Botón Reiniciar
    if (this.dom.btnRestart) {
      this.dom.btnRestart.addEventListener('click', () => {
        if (this.activeMode === 'tournament') {
          this.startNewTournamentGame();
        } else {
          this.engine.loadScenario(this.engine.scenario);
        }
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

    // Modo Torneo
    if (this.dom.btnDealTournament) {
      this.dom.btnDealTournament.addEventListener('click', () => {
        this.startNewTournamentGame();
      });
    }

    // Cantes especiales de la Bidding Box
    if (this.dom.btnCallPass) {
      this.dom.btnCallPass.addEventListener('click', () => {
        this.engine.makeBid('PASS');
      });
    }
    if (this.dom.btnCallDouble) {
      this.dom.btnCallDouble.addEventListener('click', () => {
        this.engine.makeBid('X');
      });
    }
    if (this.dom.btnCallRedouble) {
      this.dom.btnCallRedouble.addEventListener('click', () => {
        this.engine.makeBid('XX');
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
          if (this.dom.tournamentControls) this.dom.tournamentControls.style.display = 'none';
          if (this.dom.auctionOverlay) this.dom.auctionOverlay.classList.add('hidden');
          this.loadScenarioByIndex(this.currentScenarioIndex);
        } else if (mode === 'freeplay') {
          this.dom.schoolControls.style.display = 'none';
          this.dom.freeplayControls.style.display = 'flex';
          if (this.dom.tournamentControls) this.dom.tournamentControls.style.display = 'none';
          if (this.dom.auctionOverlay) this.dom.auctionOverlay.classList.add('hidden');
          const contract = this.dom.freeContractSelect.value;
          this.engine.loadScenario(generateRandomDeal(contract));
        } else if (mode === 'tournament') {
          this.dom.schoolControls.style.display = 'none';
          this.dom.freeplayControls.style.display = 'none';
          if (this.dom.tournamentControls) this.dom.tournamentControls.style.display = 'flex';
          this.startNewTournamentGame();
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
        this.dom.btnMute.title = i18n.t('btn_sound_title');
      });
    }

    // Reglas modal
    if (this.dom.btnRules) {
      this.dom.btnRules.addEventListener('click', () => {
        this.renderRulesModal();
        this.dom.modalRules.classList.remove('hidden');
      });
    }
    if (this.dom.btnCloseRules) {
      this.dom.btnCloseRules.addEventListener('click', () => {
        this.dom.modalRules.classList.add('hidden');
      });
    }
    if (this.dom.btnCloseRulesBottom) {
      this.dom.btnCloseRulesBottom.addEventListener('click', () => {
        this.dom.modalRules.classList.add('hidden');
      });
    }

    // Modal resultado
    if (this.dom.btnResultRetry) {
      this.dom.btnResultRetry.addEventListener('click', () => {
        this.dom.modalResult.classList.add('hidden');
        if (this.activeMode === 'tournament') {
          this.startNewTournamentGame();
        } else {
          this.engine.loadScenario(this.engine.scenario);
        }
      });
    }
    if (this.dom.btnResultNext) {
      this.dom.btnResultNext.addEventListener('click', () => {
        this.dom.modalResult.classList.add('hidden');
        if (this.activeMode === 'school' && this.currentScenarioIndex < SCENARIOS.length - 1) {
          this.loadScenarioByIndex(this.currentScenarioIndex + 1);
        } else if (this.activeMode === 'tournament') {
          this.startNewTournamentGame();
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

  updateActiveLangCard() {
    const current = i18n.currentLang;
    this.dom.langButtons.forEach(btn => {
      if (btn.dataset.lang === current) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    if (this.dom.currentLangCode) {
      this.dom.currentLangCode.textContent = current.toUpperCase();
    }
  }

  getPlayerName(pos) {
    const map = { N: 'seat_north', S: 'seat_south', W: 'seat_west', E: 'seat_east' };
    return map[pos] ? i18n.t(map[pos]) : pos;
  }

  updateScenarioOptions() {
    if (this.dom.scenarioSelect) {
      const currentVal = this.dom.scenarioSelect.value;
      this.dom.scenarioSelect.innerHTML = `
        <option value="0">${i18n.t('scenario_1')}</option>
        <option value="1">${i18n.t('scenario_2')}</option>
        <option value="2">${i18n.t('scenario_3')}</option>
        <option value="3">${i18n.t('scenario_4')}</option>
        <option value="4">${i18n.t('scenario_5')}</option>
      `;
      this.dom.scenarioSelect.value = currentVal;
    }

    if (this.dom.freeContractSelect) {
      const curContract = this.dom.freeContractSelect.value;
      this.dom.freeContractSelect.innerHTML = `
        <option value="1NT">${i18n.t('free_1nt')}</option>
        <option value="2H">${i18n.t('free_2h')}</option>
        <option value="3NT">${i18n.t('free_3nt')}</option>
        <option value="4S">${i18n.t('free_4s')}</option>
        <option value="6NT">${i18n.t('free_6nt')}</option>
      `;
      this.dom.freeContractSelect.value = curContract;
    }

    if (this.dom.dealerSelect) {
      const curDealer = this.dom.dealerSelect.value;
      this.dom.dealerSelect.innerHTML = `
        <option value="W">${i18n.t('dealer_w')}</option>
        <option value="N">${i18n.t('dealer_n')}</option>
        <option value="E">${i18n.t('dealer_e')}</option>
        <option value="S">${i18n.t('dealer_s')}</option>
      `;
      this.dom.dealerSelect.value = curDealer;
    }
  }

  renderRulesModal() {
    if (!this.dom.rulesModalBody) return;
    const rules = i18n.getRules();
    this.dom.rulesModalBody.innerHTML = rules.map(r => `
      <div class="rules-section">
        <h4>${r.title}</h4>
        <p>${r.desc}</p>
      </div>
    `).join('');
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

  startNewTournamentGame() {
    const dealer = this.dom.dealerSelect ? this.dom.dealerSelect.value : 'W';
    const deal = generateRandomDeal('3NT');
    this.engine.startTournamentDeal(deal, dealer);
  }

  render() {
    const sc = this.engine.scenario;

    // Si estamos en fase de subasta de torneo
    if (this.engine.phase === 'auction') {
      this.renderAuction();
      if (this.dom.tableName) this.dom.tableName.textContent = i18n.t('mode_tournament');
      if (this.dom.contractBadge) this.dom.contractBadge.textContent = '...';
      if (this.dom.targetBadge) this.dom.targetBadge.textContent = '—';
      if (this.dom.tricksNs) this.dom.tricksNs.textContent = '0';
      if (this.dom.tricksEw) this.dom.tricksEw.textContent = '0';
      if (this.dom.tricksRemain) this.dom.tricksRemain.textContent = `13 ${i18n.t('hud_tricks_suffix')}`;
      if (this.dom.turnIndicator) this.dom.turnIndicator.innerHTML = i18n.t('bidding_box_title');
      
      // Renderizar manos
      this.renderHand('S', this.dom.handS, true);
      this.renderHand('N', this.dom.handN, false);
      this.renderHand('W', this.dom.handW, false);
      this.renderHand('E', this.dom.handE, false);
      this.renderTrickCards();
      return;
    }

    if (!sc) return;

    // Ocultar subasta si ya no está activa
    if (this.dom.auctionOverlay) {
      this.dom.auctionOverlay.classList.add('hidden');
    }

    // Actualizar HUD
    if (this.dom.tableName) {
      if (this.activeMode === 'school') {
        this.dom.tableName.textContent = i18n.t(`scenario_${this.currentScenarioIndex + 1}`);
      } else {
        this.dom.tableName.textContent = sc.title;
      }
    }

    if (this.dom.contractBadge) {
      const trumpSym = sc.trumpSuit === 'NT' ? 'NT' : SUITS[sc.trumpSuit]?.symbol;
      this.dom.contractBadge.innerHTML = `<span class="trump-badge trump-${sc.trumpSuit}">${sc.contract} (${trumpSym})</span>`;
    }
    if (this.dom.targetBadge) this.dom.targetBadge.textContent = `${sc.targetTricks} ${i18n.t('hud_tricks_suffix')}`;
    if (this.dom.tricksNs) this.dom.tricksNs.textContent = this.engine.tricksWon.NS;
    if (this.dom.tricksEw) this.dom.tricksEw.textContent = this.engine.tricksWon.EW;
    if (this.dom.tricksRemain) {
      const remainingForContract = Math.max(0, sc.targetTricks - this.engine.tricksWon.NS);
      this.dom.tricksRemain.textContent = remainingForContract === 0 ? i18n.t('hud_fulfilled') : `${remainingForContract} ${i18n.t('hud_remaining_suffix')}`;
    }

    // Indicador de turno
    this.renderTurnIndicator();

    // Renderizar manos
    this.renderHand('S', this.dom.handS, true);
    this.renderHand('N', this.dom.handN, true); // El Muerto abierto durante el carteo
    this.renderHand('W', this.dom.handW, false); // Oponentes cerrados
    this.renderHand('E', this.dom.handE, false);

    // Renderizar baza central
    this.renderTrickCards();

    // Pista pedagógica
    if (this.dom.hintText) {
      this.dom.hintText.textContent = this.engine.getTeacherHint();
    }
  }

  renderAuction() {
    if (!this.dom.auctionOverlay) return;

    if (this.engine.phase !== 'auction' || !this.engine.auction) {
      this.dom.auctionOverlay.classList.add('hidden');
      return;
    }

    this.dom.auctionOverlay.classList.remove('hidden');

    const auction = this.engine.auction;
    const currentBidder = auction.currentBidder;
    const isSouthTurn = (currentBidder === 'S');

    // Información de cabecera
    if (this.dom.auctionDealerText) {
      const dealerName = this.getPlayerName(auction.dealer);
      const turnName = this.getPlayerName(currentBidder);
      this.dom.auctionDealerText.innerHTML = i18n.t('auction_dealer_info', { dealer: dealerName, turn: turnName });
    }

    // Asistente Pedagógico SAYC
    if (this.dom.saycRecText && this.engine.hands.S) {
      const evalS = SAYCAssistant.evaluateHand(this.engine.hands.S);
      const rec = SAYCAssistant.getRecommendedCall('S', this.engine.hands.S, auction);
      const c = evalS.counts;
      const countsText = `♠${c.S}  ♥${c.H}  ♦${c.D}  ♣${c.C}`;
      const distDesc = evalS.isBalanced ? i18n.t('sayc_dist_balanced') : i18n.t('sayc_dist_unbalanced');

      this.dom.saycRecText.innerHTML = `
        <div style="margin-bottom:0.3rem;">
          <strong>${i18n.t('sayc_hcp_label')}</strong> <span class="highlight-gold" style="font-weight:800; font-size:1.05rem;">${evalS.hcp} pts</span> 
          <span style="color:var(--text-muted); font-size:0.8rem;">(${distDesc} • ${countsText})</span>
        </div>
        <div>
          <strong>${i18n.t('sayc_rec_label')}</strong> 
          <span class="highlight-cyan" style="font-weight:800; font-size:1rem; padding:0.15rem 0.45rem; background:rgba(56,189,248,0.15); border-radius:4px; border:1px solid #38bdf8;">${rec.call}</span>
          <span style="color:#fde68a; margin-left:0.4rem; font-size:0.85rem;">— ${rec.reason}</span>
        </div>
      `;
    }

    // Tabla de Cantes Oficial (Oeste, Norte, Este, Sur)
    if (this.dom.auctionTbody) {
      this.dom.auctionTbody.innerHTML = '';
      const cols = ['W', 'N', 'E', 'S'];
      const dealerIdx = cols.indexOf(auction.dealer);

      let currentRow = [];
      for (let i = 0; i < dealerIdx; i++) {
        currentRow.push('');
      }

      auction.history.forEach(item => {
        currentRow.push(item.call);
        if (currentRow.length === 4) {
          this.appendAuctionRow(currentRow);
          currentRow = [];
        }
      });

      if (currentRow.length > 0) {
        while (currentRow.length < 4) {
          currentRow.push('');
        }
        this.appendAuctionRow(currentRow);
      }
    }

    // Estado de la Bidding Box
    if (this.dom.biddingBoxStatus) {
      this.dom.biddingBoxStatus.textContent = isSouthTurn ? i18n.t('bidding_your_turn') : i18n.t('bidding_waiting_for', { player: this.getPlayerName(currentBidder) });
      this.dom.biddingBoxStatus.style.color = isSouthTurn ? '#34d399' : 'var(--text-muted)';
    }

    // Actualizar botones de cante en la cuadrícula
    const rec = SAYCAssistant.getRecommendedCall('S', this.engine.hands.S, auction);
    for (let bid in this.bidButtons) {
      const btn = this.bidButtons[bid];
      const isLegal = isSouthTurn && auction.isCallLegal(bid, 'S');
      btn.disabled = !isLegal;

      if (isSouthTurn && bid === rec.call) {
        btn.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.9)';
        btn.style.borderColor = '#38bdf8';
        btn.style.background = 'rgba(56, 189, 248, 0.2)';
      } else {
        btn.style.boxShadow = '';
        btn.style.borderColor = '';
        btn.style.background = '';
      }
    }

    // Botones especiales
    if (this.dom.btnCallPass) {
      this.dom.btnCallPass.disabled = !isSouthTurn;
      this.dom.btnCallPass.textContent = i18n.t('btn_pass');
    }
    if (this.dom.btnCallDouble) {
      this.dom.btnCallDouble.disabled = !isSouthTurn || !auction.isCallLegal('X', 'S');
      this.dom.btnCallDouble.textContent = i18n.t('btn_double');
    }
    if (this.dom.btnCallRedouble) {
      this.dom.btnCallRedouble.disabled = !isSouthTurn || !auction.isCallLegal('XX', 'S');
      this.dom.btnCallRedouble.textContent = i18n.t('btn_redouble');
    }
  }

  appendAuctionRow(rowCells) {
    const tr = document.createElement('tr');
    rowCells.forEach(call => {
      const td = document.createElement('td');
      if (!call) {
        td.textContent = '—';
        td.style.color = 'var(--text-muted)';
      } else if (call === 'PASS') {
        td.innerHTML = `<span class="bid-badge bid-PASS">${i18n.t('call_pass')}</span>`;
      } else if (call === 'X') {
        td.innerHTML = `<span class="bid-badge bid-X">${i18n.t('call_double')}</span>`;
      } else if (call === 'XX') {
        td.innerHTML = `<span class="bid-badge bid-XX">${i18n.t('call_redouble')}</span>`;
      } else {
        const strain = call.substring(1);
        const strainObj = STRAINS.find(s => s.key === strain);
        const color = strainObj ? strainObj.color : '#fff';
        const sym = strainObj ? strainObj.symbol : strain;
        td.innerHTML = `<span class="bid-badge" style="background:#1e293b; color:${color}; border:1px solid rgba(255,255,255,0.1);">${call[0]}${sym}</span>`;
      }
      tr.appendChild(td);
    });
    this.dom.auctionTbody.appendChild(tr);
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
        this.dom.turnIndicator.innerHTML = i18n.t('turn_your_south');
      } else if (turn === 'N') {
        this.dom.turnIndicator.innerHTML = i18n.t('turn_your_north');
      } else if (turn === 'W') {
        this.dom.turnIndicator.innerHTML = i18n.t('turn_west_ai');
      } else if (turn === 'E') {
        this.dom.turnIndicator.innerHTML = i18n.t('turn_east_ai');
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

    cards.forEach((card) => {
      const el = document.createElement('div');
      el.className = `bridge-card ${card.suit.color === '#ef4444' || card.suit.color === '#f59e0b' ? 'suit-red' : 'suit-black'}`;

      if (!isFaceUp) {
        el.classList.add('card-back');
        container.appendChild(el);
        return;
      }

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

  onTrickFinished(result) {
    if (this.dom.lastTrickWinner) {
      const winnerName = this.getPlayerName(result.winner);
      this.dom.lastTrickWinner.textContent = i18n.t('trick_won_by', { player: winnerName, card: result.winningCard.toString() });
    }
  }

  onGameEnd(summary) {
    if (!this.dom.modalResult) return;

    // Desglose oficial de Torneo Duplicado
    if (summary.tournamentScore) {
      const sc = summary.tournamentScore;
      const isPlus = sc.totalScore > 0;
      const sign = isPlus ? '+' : '';
      
      let breakdownRows = sc.breakdown.map(item => `
        <tr>
          <td>${item.concept}</td>
          <td style="text-align:right; font-family:var(--font-mono); font-weight:700; color:${item.points >= 0 ? '#34d399' : '#f87171'}">
            ${item.points > 0 ? '+' : ''}${item.points} pts
          </td>
        </tr>
      `).join('');

      this.dom.resultTitle.textContent = sc.isSuccess ? i18n.t('res_tournament_win') : i18n.t('res_tournament_loss');
      this.dom.resultTitle.style.color = sc.isSuccess ? '#34d399' : '#f87171';
      this.dom.resultBadge.className = sc.isSuccess ? 'result-badge success' : 'result-badge failure';
      this.dom.resultBadge.textContent = `${sign}${sc.totalScore} pts`;

      this.dom.resultDetails.innerHTML = `
        <p>${i18n.t('hud_contract')}: <strong>${sc.contract}</strong> | ${i18n.t('hud_tricks_ns')}: <strong>${sc.tricksWon} de 13</strong> (${i18n.t('hud_target')}: ${sc.targetTricks}).</p>
        <div style="margin-top: 1rem; background: rgba(0,0,0,0.3); border:1px solid var(--border-subtle); border-radius:12px; padding:0.75rem 1rem;">
          <h4 style="font-family:var(--font-title); color:var(--gold-light); margin-bottom:0.5rem; font-size:0.95rem;">
            ${i18n.t('res_score_sheet_title')}
          </h4>
          <table class="score-breakdown-table">
            <tbody>
              ${breakdownRows}
              <tr class="row-total">
                <td>${i18n.t('res_score_total')}</td>
                <td style="text-align:right; color:${isPlus ? '#34d399' : '#f87171'}">${sign}${sc.totalScore} pts</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      this.dom.btnResultNext.textContent = i18n.t('res_btn_next_deal');
      this.dom.btnResultNext.style.display = 'inline-block';
      this.dom.modalResult.classList.remove('hidden');
      return;
    }

    // Modo Escuela / Libre
    if (summary.success) {
      this.dom.resultTitle.textContent = i18n.t('res_school_win');
      this.dom.resultTitle.style.color = '#34d399';
      this.dom.resultBadge.className = 'result-badge success';
      this.dom.resultBadge.textContent = i18n.t('res_overtricks', { n: summary.difference });
      this.dom.resultDetails.innerHTML = `
        <p><strong>${summary.achieved} bazas</strong> (${i18n.t('hud_target')}: ${summary.target}).</p>
        <div class="lesson-recap">
          <strong>${i18n.t('res_lesson_mastered')}</strong>
          <p>${summary.scenario.lesson}</p>
        </div>
      `;
      this.dom.btnResultNext.textContent = i18n.t('res_btn_next');
      this.dom.btnResultNext.style.display = 'inline-block';
    } else {
      this.dom.resultTitle.textContent = i18n.t('res_school_loss');
      this.dom.resultTitle.style.color = '#f87171';
      this.dom.resultBadge.className = 'result-badge failure';
      this.dom.resultBadge.textContent = i18n.t('res_undertricks', { n: summary.difference });
      this.dom.resultDetails.innerHTML = `
        <p><strong>${summary.achieved} de ${summary.target}</strong> ${i18n.t('hud_tricks_suffix')}.</p>
        <div class="lesson-recap">
          <strong>${i18n.t('res_tip')}</strong>
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
