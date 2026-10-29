/**
 * Puzles del Club — Salón de la Fama de Maestros (Zero-Login)
 * Reservado exclusivamente para los niveles de alta maestría:
 * 'Difícil' (96 piezas) y 'Muy Difícil' (150+ piezas).
 * Segmentado por Naciones, Ciudades y Generaciones.
 */

class PuzlesHallOfFame {
  constructor() {
    this.STORAGE_KEY = 'puzles_hall_of_fame_masters_v1';
    this.USER_PROFILE_KEY = 'puzles_master_profile_v1';

    this.DEFAULT_MASTERS = [
      {
        id: 'master_founder_guillermo',
        name: 'Guillermo T.',
        flag: '🇪🇸',
        country: 'ES',
        countryName: 'España',
        city: 'Valencia',
        age: 73,
        ageGroup: 'legend', // Leyendas 65+
        difficulty: 'muy_dificil',
        diffLabel: 'Muy Difícil',
        score: 14850,
        timeSeconds: 980,
        formattedTime: '16:20',
        pureMastery: true,
        puzzleTitle: 'Riviera Mediterránea (150 piezas)',
        date: '2026-10-24'
      },
      {
        id: 'master_2',
        name: 'Elena S. M.',
        flag: '🇪🇸',
        country: 'ES',
        countryName: 'España',
        city: 'Zaragoza',
        age: 58,
        ageGroup: 'senior', // Senior 50-64
        difficulty: 'muy_dificil',
        diffLabel: 'Muy Difícil',
        score: 13920,
        timeSeconds: 1140,
        formattedTime: '19:00',
        pureMastery: true,
        puzzleTitle: 'Lago Alpino al Atardecer (150 piezas)',
        date: '2026-10-25'
      },
      {
        id: 'master_3',
        name: 'Kenji Takahashi',
        flag: '🇯🇵',
        country: 'JA',
        countryName: 'Japón',
        city: 'Kioto',
        age: 46,
        ageGroup: 'adult', // Adultos 18-49
        difficulty: 'dificil',
        diffLabel: 'Difícil',
        score: 9850,
        timeSeconds: 520,
        formattedTime: '08:40',
        pureMastery: true,
        puzzleTitle: 'Gran Canal de Venecia (96 piezas)',
        date: '2026-10-26'
      },
      {
        id: 'master_4',
        name: 'Margot Laurent',
        flag: '🇫🇷',
        country: 'FR',
        countryName: 'Francia',
        city: 'Lyon',
        age: 34,
        ageGroup: 'adult',
        difficulty: 'dificil',
        diffLabel: 'Difícil',
        score: 9420,
        timeSeconds: 585,
        formattedTime: '09:45',
        pureMastery: false,
        puzzleTitle: 'Riviera Mediterránea (96 piezas)',
        date: '2026-10-27'
      },
      {
        id: 'master_5',
        name: 'Stefan Weber',
        flag: '🇩🇪',
        country: 'DE',
        countryName: 'Alemania',
        city: 'Múnich',
        age: 67,
        ageGroup: 'legend',
        difficulty: 'dificil',
        diffLabel: 'Difícil',
        score: 9150,
        timeSeconds: 610,
        formattedTime: '10:10',
        pureMastery: true,
        puzzleTitle: 'Lago Alpino al Atardecer (96 piezas)',
        date: '2026-10-28'
      }
    ];

    this.masters = this.loadMasters();
  }

  loadMasters() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const stored = JSON.parse(data);
        return [...this.DEFAULT_MASTERS, ...stored];
      }
    } catch (e) {
      console.warn('Error cargando Salón de la Fama:', e);
    }
    return [...this.DEFAULT_MASTERS];
  }

  getUserProfile() {
    try {
      const data = localStorage.getItem(this.USER_PROFILE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  saveUserProfile(profile) {
    try {
      localStorage.setItem(this.USER_PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Error guardando perfil:', e);
    }
  }

  /**
   * Registra una victoria calificada en Difícil o Muy Difícil
   */
  registerMasterRecord(recordData) {
    if (recordData.difficulty !== 'dificil' && recordData.difficulty !== 'muy_dificil') {
      return false; // Solo accesible para niveles altos
    }

    const newRecord = {
      id: 'usr_' + Date.now(),
      name: recordData.name || 'Maestro Anónimo',
      flag: recordData.flag || '🇪🇸',
      country: recordData.country || 'ES',
      countryName: recordData.countryName || 'España',
      city: recordData.city || 'Valencia',
      age: recordData.age || 40,
      ageGroup: this.getAgeGroup(recordData.age || 40),
      difficulty: recordData.difficulty,
      diffLabel: recordData.difficulty === 'muy_dificil' ? 'Muy Difícil' : 'Difícil',
      score: recordData.score,
      timeSeconds: recordData.timeSeconds,
      formattedTime: recordData.formattedTime,
      pureMastery: recordData.pureMastery,
      puzzleTitle: recordData.puzzleTitle || 'Puzle Panorámico',
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const stored = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
      stored.unshift(newRecord);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stored));
      this.masters = this.loadMasters();
      return newRecord;
    } catch (e) {
      console.warn('Error guardando récord de maestro:', e);
      return false;
    }
  }

  getAgeGroup(age) {
    if (age >= 65) return 'legend';
    if (age >= 50) return 'senior';
    if (age >= 18) return 'adult';
    return 'junior';
  }

  getFilteredMasters(tab = 'all', diffFilter = 'all') {
    let list = [...this.masters];

    if (diffFilter !== 'all') {
      list = list.filter(m => m.difficulty === diffFilter);
    }

    if (tab === 'nations') {
      // Agrupar por país
      const byCountry = new Map();
      list.forEach(m => {
        if (!byCountry.has(m.country)) byCountry.set(m.country, []);
        byCountry.get(m.country).push(m);
      });
      return Array.from(byCountry.values()).map(arr => arr.sort((a, b) => b.score - a.score)[0]);
    } else if (tab === 'cities') {
      // Agrupar por ciudad
      const byCity = new Map();
      list.forEach(m => {
        const key = `${m.city}_${m.country}`;
        if (!byCity.has(key)) byCity.set(key, []);
        byCity.get(key).push(m);
      });
      return Array.from(byCity.values()).map(arr => arr.sort((a, b) => b.score - a.score)[0]);
    } else if (tab === 'generations') {
      // Filtrar por grupos de edad ordenados
      return list.sort((a, b) => b.score - a.score);
    }

    // Por defecto: ordenar por puntuación descendente y tiempo ascendente
    return list.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeSeconds - b.timeSeconds;
    });
  }
}

window.PuzlesHallOfFame = PuzlesHallOfFame;
