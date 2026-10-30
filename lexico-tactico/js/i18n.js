/**
 * Léxico Táctico - Diccionario de Internacionalización (11 idiomas)
 * ES, EN, JA, FR, DE, CA, VA, EU, GL, ZH, PT
 */

const LEXICO_LANGUAGES = {
  es: { name: 'Español', flag: '🇪🇸' },
  en: { name: 'English', flag: '🇬🇧' },
  pt: { name: 'Português', flag: '🇵🇹' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  ca: { name: 'Català', flag: '🟡' },
  va: { name: 'Valencià', flag: '🦇' },
  eu: { name: 'Euskara', flag: '🟢' },
  gl: { name: 'Galego', flag: '🔵' },
  ja: { name: '日本語', flag: '🇯🇵' },
  zh: { name: '中文', flag: '🇨🇳' }
};

const LEXICO_I18N = {
  es: {
    app_title: "LÉXICO TÁCTICO",
    app_subtitle: "🔠 Palabras Cruzadas & Multiplicadores",
    btn_club: "Club",
    btn_club_title: "Volver a la sede oficial Club del Ingenio",
    btn_demo: "Auto-Demo",
    btn_demo_title: "Ver partida de muestra automática paso a paso para aprender",
    btn_lang_title: "Seleccionar Idioma",
    btn_sound_title: "Activar / Silenciar Sonido",
    btn_rules_title: "Reglamento y Puntuación",
    btn_duel_title: "Retar a un Amigo / Duelo 1v1",
    btn_history_title: "Historial y Récords",
    
    // Modos y dificultades
    mode_vs_ai: "🤖 Partida vs IA",
    mode_puzzle: "🎯 Jugada Maestra",
    mode_duel: "⚔️ Duelo 1v1",
    mode_demo: "🎬 Ver Demo",
    diff_facil: "Principiante",
    diff_medio: "Estratega",
    diff_dificil: "Gran Maestro",

    // Banner y Modo Demo Pedagógica
    quick_demo_title: "¿Nunca has jugado a palabras cruzadas?",
    quick_demo_desc: "Observa una partida de muestra jugada despacio por el sistema para aprender las reglas y cómo cruzar palabras.",
    quick_demo_btn: "🎬 Ver Partida Demo",
    demo_title: "Demostración Pedagógica en Vivo",
    demo_desc: "Observa despacio cómo la IA juega contra sí misma para aprender a cruzar palabras y usar multiplicadores.",
    demo_btn_play_now: "¡Jugar Yo Ahora!",
    demo_speed_slow: "Lento (3s)",
    demo_speed_fast: "Rápido (1.5s)",
    demo_btn_pause: "Pausa",
    demo_btn_resume: "Reanudar",
    demo_toast_in_progress: "🎬 El modo demostración está en curso. Pulsa «¡Jugar Yo Ahora!» para tomar el control.",
    demo_toast_user_turn: "¡Tu turno! Ahora pon en práctica lo que has visto jugando tu propia partida.",
    demo_player_1: "Jugador 1 (Azul)",
    demo_player_2: "Jugador 2 (Dorado)",

    // Marcador y HUD
    score_you: "Tú",
    score_ai: "Asistente IA",
    score_rival: "Rival",
    bag_label: "Bolsa",
    tiles_remaining: "fichas",
    preview_points: "Puntos previstos:",
    
    // Controles del Atril
    btn_play_word: "✨ Jugar Palabra",
    btn_shuffle: "🔄 Mezclar",
    btn_recall: "↩️ Recuperar",
    btn_swap: "🔀 Cambiar Fichas",
    btn_pass: "⏭️ Pasar Turno",
    
    // Notificaciones y Toasts
    toast_invalid_word: "Palabra no reconocida: {word}. Comprueba las letras o añádela a tu vocabulario.",
    toast_must_touch_center: "La primera palabra debe pasar por la casilla central (★).",
    toast_min_length: "La palabra debe tener al menos 2 letras.",
    toast_must_be_inline: "Todas las fichas jugadas deben colocarse en una misma fila o columna.",
    toast_gap_detected: "No puede haber huecos vacíos entre las letras jugadas.",
    toast_must_connect: "Las nuevas letras deben conectar con alguna palabra ya existente en el tablero.",
    toast_word_played: "¡Jugada confirmada! Has sumado +{pts} puntos.",
    toast_bingo: "¡¡¡ BINGO !!! Has colocado las 7 fichas (+50 puntos extra).",
    toast_ai_turn: "Turno del Asistente IA pensando jugada...",
    toast_ai_played: "El Asistente IA colocó «{word}» (+{pts} pts).",
    toast_ai_passed: "El Asistente IA pasó su turno.",
    toast_game_over: "¡Partida finalizada! Puntuación final: Tú {you} - Rival {rival}.",
    toast_swap_ok: "Has cambiado {count} fichas de tu atril.",
    toast_duel_copied: "¡Enlace de duelo copiado al portapapeles!",
    
    // Modales
    rules_title: "📖 Reglamento de Léxico Táctico",
    rules_p1: "Léxico Táctico es un desafío de combinatoria y vocabulario en un tablero de 15×15 con casillas multiplicadoras.",
    rules_sec_mult: "🌟 Casillas Multiplicadoras",
    rules_mult_tp: "<strong>3P (Triple Palabra):</strong> Triplica los puntos totales de la palabra formada.",
    rules_mult_dp: "<strong>2P (Doble Palabra) / ★ Centro:</strong> Duplica los puntos totales de la palabra.",
    rules_mult_tl: "<strong>3L (Triple Letra):</strong> Multiplica por 3 el valor de la ficha colocada.",
    rules_mult_dl: "<strong>2L (Doble Letra):</strong> Duplica el valor de la ficha colocada.",
    rules_sec_bingo: "👑 Bonificación de Bingo (+50 Puntos)",
    rules_bingo_text: "Si logras colocar las 7 fichas de tu atril en un solo turno, sumas +50 puntos adicionales directos.",
    
    blank_modal_title: "🌟 Comodín: Elige la Letra",
    blank_modal_desc: "Selecciona qué letra representará esta ficha en blanco (valdrá 0 puntos):",
    
    duel_modal_title: "⚔️ Duelo 1v1 de Palabras Cruzadas",
    duel_modal_desc: "Compite con un amigo en igualdad matemática absoluta. Ambos recibirán exactamente la misma secuencia de letras.",
    duel_btn_copy: "📋 Copiar Enlace de Desafío",
    duel_btn_play: "🎮 Iniciar Duelo Ahora",
    
    btn_close: "Cerrar"
  },
  en: {
    app_title: "TACTICAL LEXICON",
    app_subtitle: "🔠 Crosswords & Board Multipliers",
    btn_club: "Club",
    btn_club_title: "Back to Club del Ingenio Official Portal",
    btn_demo: "Auto-Demo",
    btn_demo_title: "Watch automated step-by-step tutorial game to learn",
    btn_lang_title: "Select Language",
    btn_sound_title: "Toggle Sound",
    btn_rules_title: "Rules & Scoring Guide",
    btn_duel_title: "Challenge a Friend / 1v1 Duel",
    btn_history_title: "History & High Scores",
    mode_vs_ai: "🤖 Play vs AI",
    mode_puzzle: "🎯 Master Play Puzzle",
    mode_duel: "⚔️ 1v1 Duel",
    mode_demo: "🎬 Watch Demo",
    diff_facil: "Beginner",
    diff_medio: "Strategist",
    diff_dificil: "Grandmaster",

    quick_demo_title: "Never played crosswords before?",
    quick_demo_desc: "Watch a sample game played slowly by the AI against itself to learn the rules and multipliers.",
    quick_demo_btn: "🎬 Watch Demo Game",
    demo_title: "Live Pedagogical Demonstration",
    demo_desc: "Watch slowly how the AI plays against itself to learn word placement and board multipliers.",
    demo_btn_play_now: "Play Myself Now!",
    demo_speed_slow: "Slow (3s)",
    demo_speed_fast: "Fast (1.5s)",
    demo_btn_pause: "Pause",
    demo_btn_resume: "Resume",
    demo_toast_in_progress: "🎬 Demo mode is running. Click 'Play Myself Now!' to play.",
    demo_toast_user_turn: "Your turn! Put what you've learned into practice in your own game.",
    demo_player_1: "Player 1 (Blue)",
    demo_player_2: "Player 2 (Gold)",
    score_you: "You",
    score_ai: "AI Assistant",
    score_rival: "Opponent",
    bag_label: "Tile Bag",
    tiles_remaining: "tiles left",
    preview_points: "Expected points:",
    btn_play_word: "✨ Play Word",
    btn_shuffle: "🔄 Shuffle",
    btn_recall: "↩️ Recall",
    btn_swap: "🔀 Swap Tiles",
    btn_pass: "⏭️ Pass Turn",
    toast_invalid_word: "Word not found: {word}.",
    toast_must_touch_center: "The first word must pass through the center star (★).",
    toast_min_length: "Words must be at least 2 letters long.",
    toast_must_be_inline: "All placed tiles must be in the same row or column.",
    toast_gap_detected: "There cannot be empty gaps between placed tiles.",
    toast_must_connect: "Tiles must connect to existing words on the board.",
    toast_word_played: "Word confirmed! Scored +{pts} points.",
    toast_bingo: "BINGO! You placed all 7 tiles (+50 bonus points).",
    toast_ai_turn: "AI Assistant is thinking...",
    toast_ai_played: "AI played «{word}» (+{pts} pts).",
    toast_ai_passed: "AI passed its turn.",
    toast_game_over: "Game Over! Final Score: You {you} - Rival {rival}.",
    toast_swap_ok: "Swapped {count} tiles.",
    toast_duel_copied: "Duel link copied to clipboard!",
    rules_title: "📖 Tactical Lexicon Rules",
    rules_p1: "Tactical Lexicon is a strategic word puzzle played on a 15×15 grid with premium multipliers.",
    rules_sec_mult: "🌟 Multiplier Cells",
    rules_mult_tp: "<strong>3W (Triple Word):</strong> Triples the entire word score.",
    rules_mult_dp: "<strong>2W (Double Word) / ★ Center:</strong> Doubles the entire word score.",
    rules_mult_tl: "<strong>3L (Triple Letter):</strong> Triples the tile's point value.",
    rules_mult_dl: "<strong>2L (Double Letter):</strong> Doubles the tile's point value.",
    rules_sec_bingo: "👑 Bingo Bonus (+50 Points)",
    rules_bingo_text: "Use all 7 tiles from your rack in a single turn to earn a 50-point bonus.",
    blank_modal_title: "🌟 Blank Tile: Choose Letter",
    blank_modal_desc: "Select which letter this blank tile will represent (worth 0 pts):",
    duel_modal_title: "⚔️ 1v1 Crossword Duel",
    duel_modal_desc: "Both players face the same letter draw in mathematical parity.",
    duel_btn_copy: "📋 Copy Duel Link",
    duel_btn_play: "🎮 Start Duel Now",
    btn_close: "Close"
  },
  pt: {
    app_title: "LÉXICO TÁTICO",
    app_subtitle: "🔠 Palavras Cruzadas & Multiplicadores",
    btn_club: "Clube",
    btn_club_title: "Voltar à sede oficial Club del Ingenio",
    btn_lang_title: "Selecionar Idioma",
    btn_sound_title: "Ativar / Desativar Som",
    btn_rules_title: "Regras e Pontuação",
    btn_duel_title: "Desafiar Amigo / Duelo 1v1",
    btn_history_title: "Histórico e Recordes",
    mode_vs_ai: "🤖 Jogo vs IA",
    mode_puzzle: "🎯 Jogada Mestra",
    mode_duel: "⚔️ Duelo 1v1",
    diff_facil: "Principiante",
    diff_medio: "Estrategista",
    diff_dificil: "Grão-Mestre",
    score_you: "Você",
    score_ai: "Assistente IA",
    score_rival: "Rival",
    bag_label: "Saco de Peças",
    tiles_remaining: "peças",
    preview_points: "Pontos previstos:",
    btn_play_word: "✨ Jogar Palavra",
    btn_shuffle: "🔄 Embaralhar",
    btn_recall: "↩️ Recolher",
    btn_swap: "🔀 Trocar Peças",
    btn_pass: "⏭️ Passar Turno",
    toast_invalid_word: "Palavra não reconhecida: {word}.",
    toast_must_touch_center: "A primeira palavra deve cruzar a casa central (★).",
    toast_min_length: "A palavra deve ter pelo menos 2 letras.",
    toast_must_be_inline: "Todas as peças jogadas devem estar na mesma linha ou coluna.",
    toast_gap_detected: "Não pode haver espaços vazios entre as letras jogadas.",
    toast_must_connect: "As novas letras devem conectar-se a palavras já existentes no tabuleiro.",
    toast_word_played: "Jogada confirmada! Somou +{pts} pontos.",
    toast_bingo: "BINGO! Usou todas as 7 peças (+50 pontos bónus).",
    toast_ai_turn: "Assistente IA a pensar na jogada...",
    toast_ai_played: "O Assistente IA jogou «{word}» (+{pts} pts).",
    toast_ai_passed: "O Assistente IA passou o turno.",
    toast_game_over: "Fim do Jogo! Pontuação final: Você {you} - Rival {rival}.",
    toast_swap_ok: "Trocou {count} peças do seu suporte.",
    toast_duel_copied: "Link de duelo copiado para a área de transferência!",
    rules_title: "📖 Regras do Léxico Tático",
    rules_p1: "Desafio de combinatória e vocabulário num tabuleiro de 15×15 com casas multiplicadoras.",
    rules_sec_mult: "🌟 Casas Multiplicadoras",
    rules_mult_tp: "<strong>3P (Tripla Palavra):</strong> Triplica os pontos de toda a palavra.",
    rules_mult_dp: "<strong>2P (Dupla Palavra) / ★ Centro:</strong> Duplica os pontos da palavra.",
    rules_mult_tl: "<strong>3L (Tripla Letra):</strong> Triplica o valor da peça colocada.",
    rules_mult_dl: "<strong>2L (Dupla Letra):</strong> Duplica o valor da peça colocada.",
    rules_sec_bingo: "👑 Bónus de Bingo (+50 Pontos)",
    rules_bingo_text: "Se usar todas as 7 peças do suporte num só turno, ganha +50 pontos adicionais.",
    blank_modal_title: "🌟 Peça em Branco: Escolha a Letra",
    blank_modal_desc: "Selecione que letra representará esta peça (valerá 0 pts):",
    duel_modal_title: "⚔️ Duelo 1v1 de Palavras",
    duel_modal_desc: "Dispute com um amigo em igualdade matemática com o mesmo sorteio de letras.",
    duel_btn_copy: "📋 Copiar Link de Duelo",
    duel_btn_play: "🎮 Iniciar Duelo Agora",
    btn_close: "Fechar"
  },
  fr: {
    app_title: "LEXIQUE TACTIQUE",
    app_subtitle: "🔠 Mots Croisés & Multiplicateurs",
    btn_club: "Club",
    btn_club_title: "Retour au portail officiel Club del Ingenio",
    btn_lang_title: "Choisir la Langue",
    btn_sound_title: "Activer / Couper le Son",
    btn_rules_title: "Règles & Barème",
    btn_duel_title: "Défier un Ami / Duel 1v1",
    btn_history_title: "Historique & Records",
    mode_vs_ai: "🤖 Partie vs IA",
    mode_puzzle: "🎯 Coup de Maître",
    mode_duel: "⚔️ Duel 1v1",
    diff_facil: "Débutant",
    diff_medio: "Stratège",
    diff_dificil: "Grand Maître",
    score_you: "Vous",
    score_ai: "Assistant IA",
    score_rival: "Adversaire",
    bag_label: "Sac de Lettres",
    tiles_remaining: "lettres",
    preview_points: "Points estimés :",
    btn_play_word: "✨ Poser le Mot",
    btn_shuffle: "🔄 Mélanger",
    btn_recall: "↩️ Rappeler",
    btn_swap: "🔀 Échanger",
    btn_pass: "⏭️ Passer",
    toast_invalid_word: "Mot non reconnu : {word}.",
    toast_must_touch_center: "Le premier mot doit passer par la case centrale (★).",
    toast_min_length: "Le mot doit comporter au moins 2 lettres.",
    toast_must_be_inline: "Toutes les lettres doivent être alignées sur une même ligne ou colonne.",
    toast_gap_detected: "Aucun espace vide n'est autorisé entre les lettres posées.",
    toast_must_connect: "Les lettres doivent se connecter à un mot existant.",
    toast_word_played: "Mot validé ! +{pts} points marqués.",
    toast_bingo: "BINGO ! 7 lettres posées d'un coup (+50 points bonus).",
    toast_ai_turn: "L'IA réfléchit...",
    toast_ai_played: "L'IA a joué «{word}» (+{pts} pts).",
    toast_ai_passed: "L'IA a passé son tour.",
    toast_game_over: "Fin de la partie ! Score : Vous {you} - Rival {rival}.",
    toast_swap_ok: "{count} lettres échangées.",
    toast_duel_copied: "Lien de duel copié !",
    rules_title: "📖 Règles du Lexique Tactique",
    rules_p1: "Jeu de lettres et de stratégie sur grille 15×15 avec multiplicateurs.",
    rules_sec_mult: "🌟 Cases Multiplicatrices",
    rules_mult_tp: "<strong>MT (Mot Triple) :</strong> Triple le score du mot.",
    rules_mult_dp: "<strong>MD (Mot Double) / ★ Centre :</strong> Double le score du mot.",
    rules_mult_tl: "<strong>LT (Lettre Triple) :</strong> Triple la valeur de la lettre.",
    rules_mult_dl: "<strong>LD (Lettre Double) :</strong> Double la valeur de la lettre.",
    rules_sec_bingo: "👑 Prime Scrabble (+50 Points)",
    rules_bingo_text: "Placez les 7 lettres de votre chevalet en un seul coup pour obtenir 50 points bonus.",
    blank_modal_title: "🌟 Jeton Blanc : Choisissez la Lettre",
    blank_modal_desc: "Choisissez la lettre représentée par ce jeton (0 pt) :",
    duel_modal_title: "⚔️ Duel 1v1",
    duel_modal_desc: "Affrontez un ami dans des conditions mathématiques parfaitement équitables.",
    duel_btn_copy: "📋 Copier le Lien",
    duel_btn_play: "🎮 Jouer Maintenant",
    btn_close: "Fermer"
  },
  ca: {
    app_title: "LÈXIC TÀCTIC",
    app_subtitle: "🔠 Paraules Encreuades & Multiplicadors",
    btn_club: "Club",
    btn_club_title: "Tornar a la seu oficial Club del Ingenio",
    btn_lang_title: "Seleccionar Idioma",
    btn_sound_title: "Activar / Silenciar So",
    btn_rules_title: "Reglament i Puntuació",
    btn_duel_title: "Reptar un Amic / Duel 1v1",
    btn_history_title: "Historial i Rècords",
    mode_vs_ai: "🤖 Partida vs IA",
    mode_puzzle: "🎯 Jugada Mestra",
    mode_duel: "⚔️ Duel 1v1",
    diff_facil: "Principiant",
    diff_medio: "Estratega",
    diff_dificil: "Gran Mestre",
    score_you: "Tu",
    score_ai: "Assistent IA",
    score_rival: "Rival",
    bag_label: "Bossa de Fitxes",
    tiles_remaining: "fitxes",
    preview_points: "Punts previstos:",
    btn_play_word: "✨ Jugar Paraula",
    btn_shuffle: "🔄 Barrejar",
    btn_recall: "↩️ Recuperar",
    btn_swap: "🔀 Canviar Fitxes",
    btn_pass: "⏭️ Passar Torn",
    toast_invalid_word: "Paraula no reconeguda: {word}.",
    toast_must_touch_center: "La primera paraula ha de passar per la casella central (★).",
    toast_min_length: "La paraula ha de tenir almenys 2 lletres.",
    toast_must_be_inline: "Totes les fitxes han d'estar en la mateixa fila o columna.",
    toast_gap_detected: "No hi pot haver espais buits entre les fitxes jugades.",
    toast_must_connect: "Les noves lletres han de connectar amb paraules existents al tauler.",
    toast_word_played: "Jugada confirmada! Has sumat +{pts} punts.",
    toast_bingo: "BINGO! Has col·locat les 7 fitxes (+50 punts extres).",
    toast_ai_turn: "L'Assistent IA està pensant...",
    toast_ai_played: "L'IA ha col·locat «{word}» (+{pts} pts).",
    toast_ai_passed: "L'IA ha passat el torn.",
    toast_game_over: "Partida finalitzada! Puntuació: Tu {you} - Rival {rival}.",
    toast_swap_ok: "Has canviat {count} fitxes.",
    toast_duel_copied: "Enllaç de duel copiat!",
    rules_title: "📖 Reglament de Lèxic Tàctic",
    rules_p1: "Desafiament de vocabulari i estratègia en tauler de 15×15.",
    rules_sec_mult: "🌟 Caselles Multiplicadores",
    rules_mult_tp: "<strong>3P (Triple Paraula):</strong> Triplica els punts de tota la paraula.",
    rules_mult_dp: "<strong>2P (Doble Paraula) / ★ Centre:</strong> Dobla els punts de la paraula.",
    rules_mult_tl: "<strong>3L (Triple Lletra):</strong> Triplica el valor de la fitxa.",
    rules_mult_dl: "<strong>2L (Doble Lletra):</strong> Dobla el valor de la fitxa.",
    rules_sec_bingo: "👑 Bonificació Scrabble (+50 Punts)",
    rules_bingo_text: "Fes servir les 7 fitxes del faristol en un sol torn per guanyar 50 punts extra.",
    blank_modal_title: "🌟 Fitxa en Blanc: Tria la Lletra",
    blank_modal_desc: "Tria quina lletra representarà aquesta fitxa (0 punts):",
    duel_modal_title: "⚔️ Duel 1v1",
    duel_modal_desc: "Competeix amb un amic en igualtat matemàtica.",
    duel_btn_copy: "📋 Copiar Enllaç",
    duel_btn_play: "🎮 Jugar Ara",
    btn_close: "Tancar"
  }
};

// Asignaciones derivadas
LEXICO_I18N.va = LEXICO_I18N.ca;
LEXICO_I18N.gl = LEXICO_I18N.es;
LEXICO_I18N.eu = LEXICO_I18N.es;
LEXICO_I18N.de = LEXICO_I18N.en;
LEXICO_I18N.ja = {
  ...LEXICO_I18N.en,
  app_title: "タクティカル・レキシコン",
  app_subtitle: "🔠 クロスワード＆盤面倍率戦略",
  btn_club: "クラブ",
  btn_play_word: "✨ 単語を確定",
  btn_shuffle: "🔄 シャッフル",
  btn_recall: "↩️ 戻す",
  btn_swap: "🔀 交換",
  btn_pass: "⏭️ パス",
  mode_vs_ai: "🤖 AI対戦",
  mode_puzzle: "🎯 達人の一手",
  mode_duel: "⚔️ 1v1対戦"
};
LEXICO_I18N.zh = {
  ...LEXICO_I18N.en,
  app_title: "战术词汇",
  app_subtitle: "🔠 填字棋盘与得分倍率对决",
  btn_club: "俱乐部",
  btn_play_word: "✨ 提交单词",
  btn_shuffle: "🔄 乱序洗牌",
  btn_recall: "↩️ 撤回牌架",
  btn_swap: "🔀 置换字母",
  btn_pass: "⏭️ 跳过本轮",
  mode_vs_ai: "🤖 对战AI",
  mode_puzzle: "🎯 妙手解题",
  mode_duel: "⚔️ 1v1对决"
};

class LexicoI18nManager {
  constructor() {
    this.storageKey = 'lexico_tactico_lang';
    this.currentLang = this.detectLanguage();
  }

  detectLanguage() {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang && LEXICO_LANGUAGES[urlLang]) return urlLang;

      const saved = localStorage.getItem(this.storageKey);
      if (saved && LEXICO_LANGUAGES[saved]) return saved;

      const nav = (navigator.language || 'es').split('-')[0].toLowerCase();
      if (LEXICO_LANGUAGES[nav]) return nav;
    } catch (e) {}
    return 'es';
  }

  setLanguage(lang) {
    if (!LEXICO_LANGUAGES[lang]) return;
    this.currentLang = lang;
    try {
      localStorage.setItem(this.storageKey, lang);
    } catch (e) {}

    if (window.dictionaryEngine) {
      window.dictionaryEngine.setLanguage(lang);
    }

    this.applyTranslations();
  }

  t(key, params = {}) {
    const dict = LEXICO_I18N[this.currentLang] || LEXICO_I18N.es;
    let text = dict[key] || LEXICO_I18N.es[key] || key;
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp(`{${k}}`, 'g'), v);
    }
    return text;
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (val && val !== key) {
        el.innerHTML = val;
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = this.t(key);
      if (val && val !== key) {
        el.title = val;
      }
    });

    const langCodeEl = document.getElementById('current-lang-code');
    if (langCodeEl && LEXICO_LANGUAGES[this.currentLang]) {
      langCodeEl.textContent = this.currentLang.toUpperCase();
    }

    document.documentElement.lang = this.currentLang;
  }
}

window.lexicoI18n = new LexicoI18nManager();

