/**
 * CLUB DEL INGENIO — Módulo Salón de la Fama Global
 * Carga reactiva de Maestros desde api/hall_of_fame.php con fallback resiliente offline
 * Renderizado de Podio Top 3, Tabla interactiva y Desafío directo de partidas
 */

export class HallOfFameWidget {
  constructor() {
    this.apiUrl = 'api/hall_of_fame.php';
    this.masters = [];
    this.currentFilter = 'all';

    // Banco de Maestros de referencia del Cuadro de Honor
    this.fallbackMasters = [
      {
        id: 'remote_1',
        deviceUuid: 'bench_master_3',
        name: 'Kenji Takahashi',
        flag: '🇯🇵',
        country: 'JP',
        countryName: 'Japón',
        city: 'Tokio',
        age: 41,
        ageGroup: 'adult',
        difficulty: 'endemoniado',
        diffLabel: 'Endemoniado',
        score: 1920,
        timeSeconds: 410,
        autonomyIndex: 93,
        peeksCount: 0,
        errorsCount: 0,
        seed: 91024,
        verified: true,
        rank: 'Gran Maestro',
        date: '2026-10-22'
      },
      {
        id: 'remote_2',
        deviceUuid: 'bench_master_6',
        name: 'Carlos Rodríguez',
        flag: '🇦🇷',
        country: 'AR',
        countryName: 'Argentina',
        city: 'Buenos Aires',
        age: 26,
        ageGroup: 'adult',
        difficulty: 'endemoniado',
        diffLabel: 'Endemoniado',
        score: 1890,
        timeSeconds: 435,
        autonomyIndex: 92,
        peeksCount: 0,
        errorsCount: 0,
        seed: 54109,
        verified: true,
        rank: 'Gran Maestro',
        date: '2026-10-19'
      },
      {
        id: 'remote_3',
        deviceUuid: 'founder_guillermo',
        name: 'Guillermo T.',
        flag: '🇪🇸',
        country: 'ES',
        countryName: 'España',
        city: 'Valencia',
        age: 73,
        ageGroup: 'legend',
        difficulty: 'dificil',
        diffLabel: 'Difícil',
        score: 1705,
        timeSeconds: 1286,
        autonomyIndex: 93,
        peeksCount: 0,
        errorsCount: 9,
        seed: 67890,
        verified: true,
        rank: 'Gran Maestro',
        isFounder: false,
        date: '2024-10-24'
      },
      {
        id: 'remote_4',
        deviceUuid: 'bench_master_1',
        name: 'Javier Navarro',
        flag: '🇪🇸',
        country: 'ES',
        countryName: 'España',
        city: 'Madrid',
        age: 52,
        ageGroup: 'senior',
        difficulty: 'dificil',
        diffLabel: 'Difícil',
        score: 1485,
        timeSeconds: 272,
        autonomyIndex: 94,
        peeksCount: 0,
        errorsCount: 0,
        seed: 78421,
        verified: true,
        rank: 'Gran Maestro',
        date: '2026-10-24'
      },
      {
        id: 'remote_5',
        deviceUuid: 'bench_master_7',
        name: 'Sofia Meyer',
        flag: '🇩🇪',
        country: 'DE',
        countryName: 'Alemania',
        city: 'Múnich',
        age: 17,
        ageGroup: 'junior',
        difficulty: 'dificil',
        diffLabel: 'Difícil',
        score: 1465,
        timeSeconds: 295,
        autonomyIndex: 91,
        peeksCount: 0,
        errorsCount: 0,
        seed: 12890,
        verified: true,
        rank: 'Gran Maestro',
        date: '2026-10-18'
      },
      {
        id: 'remote_6',
        deviceUuid: 'bench_master_5',
        name: 'Jean-Luc Dubois',
        flag: '🇫🇷',
        country: 'FR',
        countryName: 'Francia',
        city: 'Lyon',
        age: 68,
        ageGroup: 'legend',
        difficulty: 'dificil',
        diffLabel: 'Difícil',
        score: 1445,
        timeSeconds: 308,
        autonomyIndex: 98,
        peeksCount: 0,
        errorsCount: 0,
        seed: 33205,
        verified: true,
        rank: 'Gran Maestro',
        date: '2026-10-20'
      },
      {
        id: 'remote_7',
        deviceUuid: 'bench_master_2',
        name: 'Elena Morales',
        flag: '🇪🇸',
        country: 'ES',
        countryName: 'España',
        city: 'Valencia',
        age: 34,
        ageGroup: 'adult',
        difficulty: 'dificil',
        diffLabel: 'Difícil',
        score: 1420,
        timeSeconds: 315,
        autonomyIndex: 95,
        peeksCount: 0,
        errorsCount: 0,
        seed: 64120,
        verified: true,
        rank: 'Gran Maestro',
        date: '2026-10-23'
      },
      {
        id: 'remote_8',
        deviceUuid: 'bench_master_4',
        name: 'Marta Gómez',
        flag: '🇪🇸',
        country: 'ES',
        countryName: 'España',
        city: 'Barcelona',
        age: 71,
        ageGroup: 'legend',
        difficulty: 'dificil',
        diffLabel: 'Difícil',
        score: 1410,
        timeSeconds: 325,
        autonomyIndex: 92,
        peeksCount: 0,
        errorsCount: 0,
        seed: 45290,
        verified: true,
        rank: 'Gran Maestro',
        date: '2026-10-21'
      },
      {
        id: 'remote_9',
        deviceUuid: 'bench_master_8',
        name: 'Mateo Silva',
        flag: '🇲🇽',
        country: 'MX',
        countryName: 'México',
        city: 'Guadalajara',
        age: 58,
        ageGroup: 'senior',
        difficulty: 'dificil',
        diffLabel: 'Difícil',
        score: 1395,
        timeSeconds: 340,
        autonomyIndex: 90,
        peeksCount: 0,
        errorsCount: 0,
        seed: 83712,
        verified: true,
        rank: 'Gran Maestro',
        date: '2026-10-17'
      }
    ];
  }

  async init() {
    this.setupFilterButtons();
    await this.loadMasters();
  }

  async loadMasters() {
    try {
      const response = await fetch(this.apiUrl, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data && data.success && Array.isArray(data.masters) && data.masters.length > 0) {
        this.masters = data.masters;
      } else {
        this.masters = this.fallbackMasters;
      }
    } catch (e) {
      // Fallback transparente sin interrupción del usuario
      this.masters = this.fallbackMasters;
    }

    // Ordenar siempre por puntuación descendente y tiempo ascendente
    this.masters.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeSeconds - b.timeSeconds;
    });

    this.render();
  }

  setupFilterButtons() {
    const buttons = document.querySelectorAll('.hof-filter-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-filter') || 'all';
        this.render();
      });
    });
  }

  getFilteredMasters() {
    let list = [...this.masters];
    if (this.currentFilter === 'endemoniado') list = list.filter(m => m.difficulty === 'endemoniado');
    else if (this.currentFilter === 'dificil') list = list.filter(m => m.difficulty === 'dificil');
    else if (this.currentFilter === 'legend') list = list.filter(m => m.ageGroup === 'legend' || m.age >= 65);
    else if (this.currentFilter === 'ES') list = list.filter(m => m.country === 'ES');

    // ORDENACIÓN ÉTICA Y MATEMÁTICA: Puntuación más alta primero; en empate, menor tiempo
    return list.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeSeconds - b.timeSeconds;
    });
  }

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  render() {
    const filtered = this.getFilteredMasters();
    this.renderPodium(filtered.slice(0, 3));
    this.renderTable(filtered);
  }

  getInitials(name) {
    if (!name) return 'GM';
    const clean = name.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').trim();
    const parts = clean.split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  getPodiumAvatarHtml(master, place) {
    const initials = this.getInitials(master.name);
    const isFounder = master.deviceUuid === 'founder_guillermo' || master.isFounder;
    const crownIcon = place === 1 ? '👑' : (place === 2 ? '🥈' : '🥉');
    const flagEmoji = master.flag || '🇪🇸';
    const countryCode = master.country || 'ES';
    const cssClass = place === 1 ? 'gold' : (place === 2 ? 'silver' : 'bronze');

    return `
      <div class="podium-avatar podium-avatar-${cssClass} ${isFounder ? 'is-founder' : ''}">
        <div class="avatar-crown">${crownIcon}</div>
        <div class="avatar-crest">
          <span class="avatar-initials">${initials}</span>
        </div>
        <div class="avatar-country-pill" title="${master.countryName || countryCode}">
          <span class="pill-flag">${flagEmoji}</span>
        </div>
      </div>
    `;
  }

  getTableAvatarHtml(master) {
    const initials = this.getInitials(master.name);
    const isFounder = master.deviceUuid === 'founder_guillermo' || master.isFounder;
    const flagEmoji = master.flag || '🇪🇸';
    const countryCode = master.country || 'ES';

    return `
      <div class="table-avatar-badge ${isFounder ? 'founder-avatar' : ''}">
        <span class="table-initials">${initials}</span>
        <span class="table-flag-mini" title="${master.countryName || countryCode}">${flagEmoji}</span>
      </div>
    `;
  }

  renderPodium(top3) {
    const podiumEl = document.getElementById('hof-podium');
    if (!podiumEl) return;

    if (!top3 || top3.length === 0) {
      podiumEl.innerHTML = `<div class="hof-empty-msg">No hay registros certificados en este filtro.</div>`;
      return;
    }

    // Configuración de puestos: [Plata (#2), Oro (#1), Bronce (#3)] para visualización deportiva
    let podiumOrder = [];
    if (top3.length >= 3) {
      podiumOrder = [
        { master: top3[1], place: 2, badge: '🥈', css: 'silver' },
        { master: top3[0], place: 1, badge: '🥇', css: 'gold' },
        { master: top3[2], place: 3, badge: '🥉', css: 'bronze' }
      ];
    } else if (top3.length === 2) {
      podiumOrder = [
        { master: top3[1], place: 2, badge: '🥈', css: 'silver' },
        { master: top3[0], place: 1, badge: '🥇', css: 'gold' }
      ];
    } else {
      podiumOrder = [
        { master: top3[0], place: 1, badge: '🥇', css: 'gold' }
      ];
    }

    const currentLang = window.clubI18n?.currentLang || 'es';

    podiumEl.innerHTML = podiumOrder.map(item => {
      const m = item.master;
      const isFounder = m.deviceUuid === 'founder_guillermo' || m.isFounder;
      const diffClass = m.difficulty === 'endemoniado' ? 'tag-purple' : 'tag-gold';
      const challengeUrl = `sudoku-arena/?semilla=${m.seed}&nivel=${m.difficulty}&lang=${currentLang}`;

      return `
        <div class="podium-card podium-${item.css} ${isFounder ? 'is-founder' : ''}">
          <div class="podium-rank-badge">${item.badge} #${item.place}</div>
          ${this.getPodiumAvatarHtml(m, item.place)}
          <div class="podium-info">
            <h4 class="podium-name">${m.name}</h4>
            <p class="podium-location">${m.city}, ${m.countryName || m.country}</p>
            <div class="podium-badges">
              <span class="hof-badge ${diffClass}">${m.diffLabel || m.difficulty}</span>
              <span class="hof-badge tag-autonomy">${m.autonomyIndex}% Autonomía</span>
            </div>
            <div class="podium-stats">
              <div class="stat-col">
                <span class="stat-val">${m.score.toLocaleString()}</span>
                <span class="stat-lbl">Puntos</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-col">
                <span class="stat-val">${this.formatTime(m.timeSeconds)}</span>
                <span class="stat-lbl">Tiempo</span>
              </div>
            </div>
            <a href="${challengeUrl}" class="podium-challenge-btn" title="Desafiar en Sudoku Arena con semilla #${m.seed}">
              <span>⚔️ Desafiar Semilla #${m.seed}</span>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  renderTable(masters) {
    const tableBody = document.getElementById('hof-table-body');
    if (!tableBody) return;

    if (!masters || masters.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400">No se encontraron registros de Maestros para este filtro.</td></tr>`;
      return;
    }

    const currentLang = window.clubI18n?.currentLang || 'es';

    tableBody.innerHTML = masters.map((m, idx) => {
      const position = idx + 1;
      let posHtml = `#${position}`;
      if (position === 1) posHtml = `🥇 #1`;
      else if (position === 2) posHtml = `🥈 #2`;
      else if (position === 3) posHtml = `🥉 #3`;

      const isFounder = m.deviceUuid === 'founder_guillermo' || m.isFounder;
      const diffClass = m.difficulty === 'endemoniado' ? 'tag-purple' : 'tag-gold';
      const challengeUrl = `sudoku-arena/?semilla=${m.seed}&nivel=${m.difficulty}&lang=${currentLang}`;

      // Tramo generacional
      let ageLabel = `${m.age} años`;
      if (m.ageGroup === 'legend' || m.age >= 65) ageLabel += ' • 🧠 Master (65+)';
      else if (m.ageGroup === 'senior') ageLabel += ' • 🧠 Senior';
      else if (m.ageGroup === 'junior') ageLabel += ' • 🐣 Júnior';

      return `
        <tr class="${isFounder ? 'founder-row' : ''}">
          <td class="td-rank"><strong>${posHtml}</strong></td>
          <td class="td-master">
            <div class="master-cell">
              ${this.getTableAvatarHtml(m)}
              <div class="master-texts">
                <strong>${m.name}</strong>
                <small>${m.city}, ${m.countryName || m.country} • ${ageLabel}</small>
              </div>
            </div>
          </td>
          <td class="td-diff">
            <span class="hof-badge ${diffClass}">${m.diffLabel || m.difficulty}</span>
          </td>
          <td class="td-score">
            <strong class="score-highlight">${m.score.toLocaleString()}</strong>
          </td>
          <td class="td-time font-mono">
            ⏱️ ${this.formatTime(m.timeSeconds)}
          </td>
          <td class="td-autonomy">
            <div class="autonomy-box">
              <div class="autonomy-bar-bg">
                <div class="autonomy-bar-fill" style="width: ${m.autonomyIndex}%;"></div>
              </div>
              <span class="autonomy-val">${m.autonomyIndex}%</span>
            </div>
          </td>
          <td class="td-action text-right">
            <a href="${challengeUrl}" class="btn-table-challenge" title="Retar en Sudoku Arena con la misma semilla matemática">
              <span>⚔️ Retar</span>
            </a>
          </td>
        </tr>
      `;
    }).join('');
  }
}
