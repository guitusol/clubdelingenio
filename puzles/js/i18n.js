/**
 * Puzles del Club — Internacionalización Exhaustiva en 9 Idiomas
 * Cobertura al 100% de la interfaz, modales, alertas y avisos ergonómicos:
 * ES (Español), EN (English), JA (Japonés), FR (Français), DE (Deutsch),
 * CA (Català), VA (Valencià), EU (Euskara), GL (Galego).
 */

const PUZLES_TRANSLATIONS = {
  es: {
    app_title: 'PUZLES DEL CLUB',
    app_subtitle: '🧩 Rompecabezas Panorámicos & Táctica Espacial',
    btn_club: 'Club',
    btn_sound_title: 'Sonido de encajes y efectos',
    btn_rules_title: 'Reglas y puntuación cognitiva',
    btn_vault_title: 'Galería y Mis Puzles',
    btn_weekly_title: 'Reto Semanal Oficial',
    btn_hof_title: 'Salón de la Fama (Difícil y Muy Difícil)',
    btn_lang_title: 'Seleccionar idioma',

    // Barra de control
    diff_facil: 'Fácil (24)',
    diff_medio: 'Medio (48)',
    diff_dificil: 'Difícil (96)',
    diff_muy_dificil: 'Muy Difícil (150)',
    btn_recut: '🎲 Nuevo Corte',
    btn_recut_title: 'Despiezar esta misma imagen con piezas y curvas diferentes',
    btn_edges_only: '🧩 Solo Bordes',
    btn_ghost: '👻 Imagen Guía',
    btn_sort_wings: '↔️ Ordenar Laterales',
    btn_reset_zoom: '🔍 Ajustar Zoom',
    btn_share_whatsapp: '📱 Retar WhatsApp',

    // Marcadores
    stat_pieces: 'Piezas',
    stat_score: 'Puntos',
    stat_time: 'Tiempo',
    stat_combo: '¡Racha!',

    // Aviso ergonómico de pantalla
    device_advice_title: '📱 Recomendación Ergonómica',
    device_advice_text: 'Este puzle cuenta con {count} piezas detalladas. Para disfrutar de una experiencia visual óptima y cómoda, se recomienda realizarlo en una pantalla más amplia (tablet u ordenador).',
    device_advice_continue: 'Continuar en móvil de todos modos',
    device_advice_change: 'Cambiar a nivel Fácil (24 piezas)',

    // Bóveda / Mis Puzles
    vault_title: '🖼️ Galería de Panorámicas y Mis Puzles',
    tab_presets: 'Colección Oficial',
    tab_my_puzzles: 'Mis Puzles Personales',
    vault_upload_btn: '📤 Subir Foto desde mi Equipo',
    vault_camera_btn: '📷 Hacer Foto con la Cámara',
    vault_drag_drop: 'Arrastra y suelta aquí cualquier archivo de imagen (JPG, PNG, WebP) o pulsa Ctrl+V para pegar',
    vault_empty_user: 'Aún no has incorporado fotografías propias. ¡Sube tus fotos de vacaciones o paisajes favoritos para convertirlas en puzle!',
    vault_select_puzzle: 'Jugar este Puzle',
    vault_delete: 'Eliminar',

    // Reto Semanal
    weekly_title: '📅 Reto Semanal del Club',
    weekly_badge_dia: 'Corona de Diamante',
    weekly_badge_oro: 'Medalla de Oro',
    weekly_badge_pla: 'Medalla de Plata',
    weekly_badge_bro: 'Medalla de Bronce',
    weekly_completed_msg: '¡Completado esta semana con {badge} en {time}!',
    weekly_play_btn: 'Aceptar el Desafío Semanal',

    // Salón de la Fama
    hof_title: '🏛️ Salón de la Fama de Maestros',
    hof_subtitle: 'Reservado a resoluciones de alta maestría en niveles Difícil (96) y Muy Difícil (150+)',
    hof_tab_all: '🌍 Todo el Mundo',
    hof_tab_nations: '🏳️ Copa de Naciones',
    hof_tab_cities: '🏙️ Orgullo Local',
    hof_tab_generations: '🎂 Generaciones',
    hof_register_btn: 'Inscribir mi Marca en el Cuadro de Honor',
    hof_pure_badge: 'Maestría Pura (Sin Imagen Guía)',
    hof_assisted_badge: 'Con Imagen Guía',

    // Victoria
    victory_title: '🎉 ¡ENHORABUENA, PUZLE COMPLETADO! 🏆',
    victory_time: 'Tiempo Total:',
    victory_score: 'Puntuación Cognitiva:',
    victory_purity: 'Autonomía:',
    victory_pure_yes: '100% Pura (Sin Guías)',
    victory_pure_no: 'Asistida con Guía',
    victory_share_btn: '📱 Desafiar a Amigos por WhatsApp',
    victory_new_game: 'Elegir Otro Puzle',

    // Reglas
    rules_title: '📖 Escuela de Puzles del Club',
    rules_p1: 'Puzles del Club es una experiencia de estimulación espacial y concentración donde cada pieza se troquela matemáticamente mediante curvas orgánicas de Bézier.',
    rules_p2: '• **Despiece múltiple:** Puedes pulsar "Nuevo Corte" en cualquier momento para volver a cortar la misma imagen con piezas totalmente distintas.',
    rules_p3: '• **Agrupación magnética:** Al aproximar dos piezas contiguas o colocarlas cerca de su hueco definitivo, se atraen magnéticamente y se mueven en bloque.',
    rules_p4: '• **Puntuación:** Las piezas interiores otorgan más puntos (120 pts) que las esquinas o marcos (40-60 pts). Encajar varias piezas seguidas activa multiplicadores de combo (hasta x2.0).',
    rules_close: 'Entendido, ¡a jugar!'
  },

  en: {
    app_title: 'CLUB PUZZLES',
    app_subtitle: '🧩 Panoramic Jigsaw & Spatial Tactics',
    btn_club: 'Club',
    btn_sound_title: 'Snapping sound & effects',
    btn_rules_title: 'Rules & cognitive scoring',
    btn_vault_title: 'Gallery & My Puzzles',
    btn_weekly_title: 'Official Weekly Challenge',
    btn_hof_title: 'Hall of Fame (Hard & Very Hard)',
    btn_lang_title: 'Select language',

    diff_facil: 'Easy (24)',
    diff_medio: 'Medium (48)',
    diff_dificil: 'Hard (96)',
    diff_muy_dificil: 'Very Hard (150)',
    btn_recut: '🎲 Re-cut Pieces',
    btn_recut_title: 'Cut the same picture with completely different pieces and curves',
    btn_edges_only: '🧩 Edges Only',
    btn_ghost: '👻 Guide Image',
    btn_sort_wings: '↔️ Sort to Wings',
    btn_reset_zoom: '🔍 Reset Zoom',
    btn_share_whatsapp: '📱 Share on WhatsApp',

    stat_pieces: 'Pieces',
    stat_score: 'Score',
    stat_time: 'Time',
    stat_combo: 'Streak!',

    device_advice_title: '📱 Ergonomic Recommendation',
    device_advice_text: 'This puzzle has {count} detailed pieces. For an optimal and comfortable visual experience, playing on a larger screen (tablet or desktop computer) is recommended.',
    device_advice_continue: 'Continue on mobile anyway',
    device_advice_change: 'Switch to Easy level (24 pieces)',

    vault_title: '🖼️ Panoramic Gallery & My Puzzles',
    tab_presets: 'Official Collection',
    tab_my_puzzles: 'My Personal Puzzles',
    vault_upload_btn: '📤 Upload Photo from Device',
    vault_camera_btn: '📷 Take Photo with Camera',
    vault_drag_drop: 'Drag and drop any image file (JPG, PNG, WebP) here or press Ctrl+V to paste',
    vault_empty_user: 'You haven\'t added custom photos yet. Upload your favorite vacation or landscape pictures to turn them into puzzles!',
    vault_select_puzzle: 'Play this Puzzle',
    vault_delete: 'Delete',

    weekly_title: '📅 Official Club Weekly Challenge',
    weekly_badge_dia: 'Diamond Crown',
    weekly_badge_oro: 'Gold Medal',
    weekly_badge_pla: 'Silver Medal',
    weekly_badge_bro: 'Bronze Medal',
    weekly_completed_msg: 'Completed this week with {badge} in {time}!',
    weekly_play_btn: 'Accept the Weekly Challenge',

    hof_title: '🏛️ Masters Hall of Fame',
    hof_subtitle: 'Reserved for high-mastery solutions in Hard (96) and Very Hard (150+) levels',
    hof_tab_all: '🌍 Worldwide',
    hof_tab_nations: '🏳️ Nations Cup',
    hof_tab_cities: '🏙️ Local Pride',
    hof_tab_generations: '🎂 Generations',
    hof_register_btn: 'Register my Mark on the Honor Roll',
    hof_pure_badge: 'Pure Mastery (No Guide Image)',
    hof_assisted_badge: 'With Guide Image',

    victory_title: '🎉 CONGRATULATIONS, PUZZLE COMPLETED! 🏆',
    victory_time: 'Total Time:',
    victory_score: 'Cognitive Score:',
    victory_purity: 'Autonomy:',
    victory_pure_yes: '100% Pure (No Guides)',
    victory_pure_no: 'Assisted with Guide',
    victory_share_btn: '📱 Challenge Friends on WhatsApp',
    victory_new_game: 'Choose Another Puzzle',

    rules_title: '📖 Club Puzzles School',
    rules_p1: 'Club Puzzles is a spatial stimulation and focus experience where every piece is mathematically cut with organic cubic Bézier curves.',
    rules_p2: '• **Multiple Cuts:** You can press "Re-cut Pieces" at any time to re-slice the exact same picture with entirely different pieces.',
    rules_p3: '• **Magnetic Grouping:** Bringing two neighboring pieces close together snaps them magnetically into a single movable cluster.',
    rules_p4: '• **Scoring:** Inner pieces yield more points (120 pts) than corners or edges (40-60 pts). Quick consecutive placements trigger combo multipliers (up to 2.0x).',
    rules_close: 'Got it, let\'s play!'
  },

  ja: {
    app_title: 'クラブ・パズル',
    app_subtitle: '🧩 パノラマ・ジグソー＆空間戦術パズル',
    btn_club: 'クラブ',
    btn_sound_title: 'はめ込み音と効果音',
    btn_rules_title: 'ルールと認知スコア',
    btn_vault_title: 'ギャラリー＆マイトレイ',
    btn_weekly_title: '公式ウィークリーチャレンジ',
    btn_hof_title: '名人殿堂（上級・超上級）',
    btn_lang_title: '言語を選択',

    diff_facil: '初級 (24)',
    diff_medio: '中級 (48)',
    diff_dificil: '上級 (96)',
    diff_muy_dificil: '超上級 (150)',
    btn_recut: '🎲 新しいカット',
    btn_recut_title: '同じ画像を全く新しい形のピースと曲線で再分割します',
    btn_edges_only: '🧩 枠ピースのみ',
    btn_ghost: '👻 下絵ガイド',
    btn_sort_wings: '↔️ 左右トレイに整列',
    btn_reset_zoom: '🔍 ズーム初期化',
    btn_share_whatsapp: '📱 WhatsAppで挑戦',

    stat_pieces: 'ピース',
    stat_score: '得点',
    stat_time: '時間',
    stat_combo: '連鎖！',

    device_advice_title: '📱 画面サイズ推奨',
    device_advice_text: 'このパズルは{count}ピースの細密な難易度です。快適な操作と視認性のため、タブレットまたはパソコンの大画面でのプレイを推奨します。',
    device_advice_continue: 'このままスマートフォンでプレイ',
    device_advice_change: '初級（24ピース）に変更',

    vault_title: '🖼️ パノラマギャラリー＆マイパズル',
    tab_presets: '公式名画コレクション',
    tab_my_puzzles: 'マイパズル（自作）',
    vault_upload_btn: '📤 写真・画像をアップロード',
    vault_camera_btn: '📷 カメラで撮影',
    vault_drag_drop: '画像ファイル（JPG, PNG, WebP）をここにドロップするか、Ctrl+Vで貼り付け',
    vault_empty_user: 'まだ写真が登録されていません。お気に入りの風景や思い出の写真をパズルにしてみましょう！',
    vault_select_puzzle: 'このパズルを遊ぶ',
    vault_delete: '削除',

    weekly_title: '📅 公式ウィークリーパズル',
    weekly_badge_dia: 'ダイヤモンドの王冠',
    weekly_badge_oro: '金メダル',
    weekly_badge_pla: '銀メダル',
    weekly_badge_bro: '銅メダル',
    weekly_completed_msg: '今週の挑戦をクリア：{badge}（タイム {time}）！',
    weekly_play_btn: '週間チャレンジに挑む',

    hof_title: '🏛️ 名人殿堂（Hall of Fame）',
    hof_subtitle: '上級（96ピース）および超上級（150ピース以上）を達成した達人の記録',
    hof_tab_all: '🌍 世界ランキング',
    hof_tab_nations: '🏳️ 国別ランキング',
    hof_tab_cities: '🏙️ 都市別',
    hof_tab_generations: '🎂 世代別',
    hof_register_btn: '殿堂にスコアを登録する',
    hof_pure_badge: '純粋名人（ガイド不使用）',
    hof_assisted_badge: 'ガイド使用',

    victory_title: '🎉 おめでとうございます！パズル完成！ 🏆',
    victory_time: '完成時間:',
    victory_score: '認知スコア:',
    victory_purity: '自立度:',
    victory_pure_yes: '100%自力（ガイドなし）',
    victory_pure_no: 'ガイド下絵あり',
    victory_share_btn: '📱 友人に挑戦状を送る',
    victory_new_game: '別のパズルを選ぶ',

    rules_title: '📖 クラブ・パズルの心得',
    rules_p1: 'クラブ・パズルは、ベジェ曲線による有機的なカットを特徴とする空間認識と集中の知的ゲームです。',
    rules_p2: '• **多様なカット:** 「新しいカット」を押すたびに、同じ絵画でも全く異なるピース形状で何度でも楽しめます。',
    rules_p3: '• **磁石のように吸着:** 隣り合う正しいピース同士が近づくと、磁力で結合してひとつの塊として一緒に動かせます。',
    rules_p4: '• **得点計算:** 内側ピース（120点）は枠ピース（40〜60点）より高得点です。素早い連続配置でコンボ倍率（最大2.0倍）が発動します。',
    rules_close: '理解しました、遊ぶ！'
  },

  fr: {
    app_title: 'PUZZLES DU CLUB',
    app_subtitle: '🧩 Puzzles Panoramiques & Tactique Spatiale',
    btn_club: 'Club',
    btn_sound_title: 'Son d\'emboîtement et effets',
    btn_rules_title: 'Règles et score cognitif',
    btn_vault_title: 'Galerie & Mes Puzzles',
    btn_weekly_title: 'Défi Hebdomadaire Officiel',
    btn_hof_title: 'Temple de la Renommée (Difficile & Très Difficile)',
    btn_lang_title: 'Choisir la langue',

    diff_facil: 'Facile (24)',
    diff_medio: 'Moyen (48)',
    diff_dificil: 'Difficile (96)',
    diff_muy_dificil: 'Très Difficile (150)',
    btn_recut: '🎲 Nouveau Découpage',
    btn_recut_title: 'Découper la même image avec des pièces et courbes différentes',
    btn_edges_only: '🧩 Bords Uniquement',
    btn_ghost: '👻 Image Guide',
    btn_sort_wings: '↔️ Ranger sur les Ailes',
    btn_reset_zoom: '🔍 Réinitialiser Zoom',
    btn_share_whatsapp: '📱 Défier sur WhatsApp',

    stat_pieces: 'Pièces',
    stat_score: 'Points',
    stat_time: 'Temps',
    stat_combo: 'Série !',

    device_advice_title: '📱 Recommandation Ergonomique',
    device_advice_text: 'Ce puzzle contient {count} pièces détaillées. Pour une expérience confortable, il est recommandé de jouer sur un écran plus grand (tablette ou ordinateur).',
    device_advice_continue: 'Continuer sur mobile malgré tout',
    device_advice_change: 'Passer au niveau Facile (24 pièces)',

    vault_title: '🖼️ Galerie Panoramique & Mes Puzzles',
    tab_presets: 'Collection Officielle',
    tab_my_puzzles: 'Mes Puzzles Personnels',
    vault_upload_btn: '📤 Importer une Photo',
    vault_camera_btn: '📷 Prendre une Photo',
    vault_drag_drop: 'Glissez-déposez une image ici ou collez avec Ctrl+V',
    vault_empty_user: 'Aucune photo personnelle pour le moment. Téléversez vos paysages préférés !',
    vault_select_puzzle: 'Jouer ce Puzzle',
    vault_delete: 'Supprimer',

    weekly_title: '📅 Défi Hebdomadaire Officiel',
    weekly_badge_dia: 'Couronne de Diamant',
    weekly_badge_oro: 'Médaille d\'Or',
    weekly_badge_pla: 'Médaille d\'Argent',
    weekly_badge_bro: 'Médaille de Bronze',
    weekly_completed_msg: 'Terminé cette semaine avec {badge} en {time} !',
    weekly_play_btn: 'Relever le Défi',

    hof_title: '🏛️ Temple de la Renommée des Maîtres',
    hof_subtitle: 'Réservé aux réussites de haut niveau en Difficile (96) et Très Difficile (150+)',
    hof_tab_all: '🌍 Monde Entier',
    hof_tab_nations: '🏳️ Coupe des Nations',
    hof_tab_cities: '🏙️ Fierté Locale',
    hof_tab_generations: '🎂 Générations',
    hof_register_btn: 'Inscrire mon Record',
    hof_pure_badge: 'Maîtrise Pure (Sans Guide)',
    hof_assisted_badge: 'Avec Guide',

    victory_title: '🎉 FÉLICITATIONS, PUZZLE TERMINÉ ! 🏆',
    victory_time: 'Temps Total :',
    victory_score: 'Score Cognitif :',
    victory_purity: 'Autonomie :',
    victory_pure_yes: '100% Pure (Sans Guide)',
    victory_pure_no: 'Avec Guide Visuel',
    victory_share_btn: '📱 Défier sur WhatsApp',
    victory_new_game: 'Choisir un Autre Puzzle',

    rules_title: '📖 École des Puzzles du Club',
    rules_p1: 'Les Puzzles du Club offrent une expérience de stimulation spatiale avec découpage mathématique par courbes de Bézier.',
    rules_p2: '• **Découpage multiple :** Recoupez la même image à tout moment avec de nouvelles formes uniques.',
    rules_p3: '• **Assemblage magnétique :** Deux pièces voisines s\'attirent et se déplacent ensemble en bloc.',
    rules_p4: '• **Score :** Les pièces intérieures rapportent plus de points (120 pts). Enchaîner les placements active des combos jusqu\'à x2.0.',
    rules_close: 'Compris, jouons !'
  },

  de: {
    app_title: 'CLUB PUZZLES',
    app_subtitle: '🧩 Panorama-Puzzles & Räumliche Taktik',
    btn_club: 'Club',
    btn_sound_title: 'Klickgeräusche und Effekte',
    btn_rules_title: 'Regeln und Kognitive Wertung',
    btn_vault_title: 'Galerie & Eigene Puzzles',
    btn_weekly_title: 'Offizielle Wochen-Herausforderung',
    btn_hof_title: 'Ruhmeshalle (Schwer & Sehr Schwer)',
    btn_lang_title: 'Sprache wählen',

    diff_facil: 'Einfach (24)',
    diff_medio: 'Mittel (48)',
    diff_dificil: 'Schwer (96)',
    diff_muy_dificil: 'Sehr Schwer (150)',
    btn_recut: '🎲 Neuer Schnitt',
    btn_recut_title: 'Dasselbe Bild mit völlig neuen Teilen und Kurven schneiden',
    btn_edges_only: '🧩 Nur Randteile',
    btn_ghost: '👻 Vorlage einblenden',
    btn_sort_wings: '↔️ Auf Seitenflügel ordnen',
    btn_reset_zoom: '🔍 Zoom zurücksetzen',
    btn_share_whatsapp: '📱 WhatsApp Herausforderung',

    stat_pieces: 'Teile',
    stat_score: 'Punkte',
    stat_time: 'Zeit',
    stat_combo: 'Serie!',

    device_advice_title: '📱 Ergonomische Empfehlung',
    device_advice_text: 'Dieses Puzzle besteht aus {count} Teilen. Für ein optimales Spielerlebnis wird ein größerer Bildschirm (Tablet oder Computer) empfohlen.',
    device_advice_continue: 'Trotzdem auf dem Smartphone weiterspielen',
    device_advice_change: 'Zu Einfach wechseln (24 Teile)',

    vault_title: '🖼️ Panorama-Galerie & Eigene Puzzles',
    tab_presets: 'Offizielle Sammlung',
    tab_my_puzzles: 'Eigene Puzzles',
    vault_upload_btn: '📤 Eigenes Foto hochladen',
    vault_camera_btn: '📷 Foto mit Kamera aufnehmen',
    vault_drag_drop: 'Bilddatei hierher ziehen oder mit Strg+V einfügen',
    vault_empty_user: 'Noch keine eigenen Fotos vorhanden. Verwandle deine Lieblingsfotos in Puzzles!',
    vault_select_puzzle: 'Dieses Puzzle spielen',
    vault_delete: 'Löschen',

    weekly_title: '📅 Wöchentliche Club-Herausforderung',
    weekly_badge_dia: 'Diamanten-Krone',
    weekly_badge_oro: 'Goldmedaille',
    weekly_badge_pla: 'Silbermedaille',
    weekly_badge_bro: 'Bronzemedaille',
    weekly_completed_msg: 'Diese Woche mit {badge} in {time} abgeschlossen!',
    weekly_play_btn: 'Herausforderung annehmen',

    hof_title: '🏛️ Ruhmeshalle der Meister',
    hof_subtitle: 'Vorbehalten für Meisterleistungen in Schwer (96) und Sehr Schwer (150+)',
    hof_tab_all: '🌍 Weltweit',
    hof_tab_nations: '🏳️ Nationenpokal',
    hof_tab_cities: '🏙️ Lokaler Stolz',
    hof_tab_generations: '🎂 Generationen',
    hof_register_btn: 'Rekord eintragen',
    hof_pure_badge: 'Reine Meisterschaft (Ohne Vorlage)',
    hof_assisted_badge: 'Mit Vorlage',

    victory_title: '🎉 HERZLICHEN GLÜCKWUNSCH! PUZZLE GELÖST! 🏆',
    victory_time: 'Gesamtzeit:',
    victory_score: 'Kognitiver Score:',
    victory_purity: 'Autonomie:',
    victory_pure_yes: '100% Rein (Ohne Hilfe)',
    victory_pure_no: 'Mit Bildvorlage',
    victory_share_btn: '📱 Freunde auf WhatsApp herausfordern',
    victory_new_game: 'Anderes Puzzle wählen',

    rules_title: '📖 Puzzlegrundsätze des Clubs',
    rules_p1: 'Club Puzzles verbindet räumliches Denken und Ruhe durch mathematisch präzise Bézier-Kurven.',
    rules_p2: '• **Mehrfacher Zuschnitt:** Drücke "Neuer Schnitt", um dasselbe Motiv immer wieder neu zu zerlegen.',
    rules_p3: '• **Magnetisches Einrasten:** Passende Teile ziehen sich an und bewegen sich als Gruppe.',
    rules_p4: '• **Wertung:** Innenteile bringen mehr Punkte (120 Pkt.). Schnelle Züge aktivieren Boni bis zu 2.0x.',
    rules_close: 'Verstanden, los geht\'s!'
  },

  ca: {
    app_title: 'PUZLES DEL CLUB',
    app_subtitle: '🧩 Trencaclosques Panoràmics & Tàctica Espacial',
    btn_club: 'Club',
    btn_sound_title: 'So d\'encaix i efectes',
    btn_rules_title: 'Regles i puntuació cognitiva',
    btn_vault_title: 'Galeria i Els Meus Puzles',
    btn_weekly_title: 'Repte Setmanal Oficial',
    btn_hof_title: 'Saló de la Fama (Difícil i Molt Difícil)',
    btn_lang_title: 'Seleccionar idioma',

    diff_facil: 'Fàcil (24)',
    diff_medio: 'Mitjà (48)',
    diff_dificil: 'Difícil (96)',
    diff_muy_dificil: 'Molt Difícil (150)',
    btn_recut: '🎲 Nou Tall',
    btn_recut_title: 'Despecejar la mateixa imatge amb peces i corbes diferents',
    btn_edges_only: '🧩 Només Vores',
    btn_ghost: '👻 Imatge Guia',
    btn_sort_wings: '↔️ Ordenar Laterals',
    btn_reset_zoom: '🔍 Ajustar Zoom',
    btn_share_whatsapp: '📱 Repte WhatsApp',

    stat_pieces: 'Peces',
    stat_score: 'Punts',
    stat_time: 'Temps',
    stat_combo: 'Ratxa!',

    device_advice_title: '📱 Recomanació Ergonòmica',
    device_advice_text: 'Aquest puzle té {count} peces detallades. Per a una comoditat visual òptima, es recomana jugar en una pantalla més gran (tauleta o ordinador).',
    device_advice_continue: 'Continuar al mòbil',
    device_advice_change: 'Canviar a nivell Fàcil (24 peces)',

    vault_title: '🖼️ Galeria Panoràmica i Els Meus Puzles',
    tab_presets: 'Col·lecció Oficial',
    tab_my_puzzles: 'Els Meus Puzles Personals',
    vault_upload_btn: '📤 Pujar Foto des del Dispositiu',
    vault_camera_btn: '📷 Fer Foto amb la Càmera',
    vault_drag_drop: 'Arrossega i deixa anar una imatge aquí o prem Ctrl+V',
    vault_empty_user: 'Encara no has afegit fotos pròpies. Puja els teus paisatges preferits!',
    vault_select_puzzle: 'Jugar aquest Puzle',
    vault_delete: 'Eliminar',

    weekly_title: '📅 Repte Setmanal del Club',
    weekly_badge_dia: 'Corona de Diamant',
    weekly_badge_oro: 'Medalla d\'Or',
    weekly_badge_pla: 'Medalla de Plata',
    weekly_badge_bro: 'Medalla de Bronze',
    weekly_completed_msg: 'Completat aquesta setmana amb {badge} en {time}!',
    weekly_play_btn: 'Acceptar el Repte Setmanal',

    hof_title: '🏛️ Saló de la Fama de Mestres',
    hof_subtitle: 'Reservat a resolucions d\'alta mestria en nivells Difícil (96) i Molt Difícil (150+)',
    hof_tab_all: '🌍 Arreu del Món',
    hof_tab_nations: '🏳️ Copa de Nacions',
    hof_tab_cities: '🏙️ Orgull Local',
    hof_tab_generations: '🎂 Generacions',
    hof_register_btn: 'Inscriure la meva Marca',
    hof_pure_badge: 'Mestria Pura (Sense Guia)',
    hof_assisted_badge: 'Amb Imatge Guia',

    victory_title: '🎉 ENHORABONA, PUZLE COMPLETAT! 🏆',
    victory_time: 'Temps Total:',
    victory_score: 'Puntuació Cognitiva:',
    victory_purity: 'Autonomia:',
    victory_pure_yes: '100% Pura (Sense Guies)',
    victory_pure_no: 'Amb Imatge Guia',
    victory_share_btn: '📱 Desafiar Amics per WhatsApp',
    victory_new_game: 'Triar un Altre Puzle',

    rules_title: '📖 Escola de Puzles del Club',
    rules_p1: 'Puzles del Club ofereix una experiència d\'estimulació espacial amb peces corbades matemàticament amb Bézier.',
    rules_p2: '• **Tall múltiple:** Pots prémer "Nou Tall" en qualsevol moment per retallar la mateixa imatge de forma única.',
    rules_p3: '• **Agrupació magnètica:** En apropar peces contigües s\'atreuen i es desplacen juntes.',
    rules_p4: '• **Puntuació:** Les peces interiors atorguen més punts (120 pts). Els encavalcaments ràpids activen combos fins a x2.0.',
    rules_close: 'Entès, a jugar!'
  },

  va: {
    app_title: 'PUZLES DEL CLUB',
    app_subtitle: '🧩 Trencaclosques Panoràmics & Tàctica Espacial',
    btn_club: 'Club',
    btn_sound_title: 'So d\'encaix i efectes',
    btn_rules_title: 'Regles i puntuació cognitiva',
    btn_vault_title: 'Galeria i Els Meus Puzles',
    btn_weekly_title: 'Repte Setmanal Oficial',
    btn_hof_title: 'Saló de la Fama (Difícil i Molt Difícil)',
    btn_lang_title: 'Seleccionar idioma',

    diff_facil: 'Fàcil (24)',
    diff_medio: 'Mig (48)',
    diff_dificil: 'Difícil (96)',
    diff_muy_dificil: 'Molt Difícil (150)',
    btn_recut: '🎲 Nou Tall',
    btn_recut_title: 'Tallar la mateixa imatge amb peces i corbes diferents',
    btn_edges_only: '🧩 Sols Vores',
    btn_ghost: '👻 Imatge Guia',
    btn_sort_wings: '↔️ Ordenar Laterals',
    btn_reset_zoom: '🔍 Ajustar Zoom',
    btn_share_whatsapp: '📱 Repte WhatsApp',

    stat_pieces: 'Peces',
    stat_score: 'Punts',
    stat_time: 'Temps',
    stat_combo: 'Ratxa!',

    device_advice_title: '📱 Recomanació Ergonòmica',
    device_advice_text: 'Este puzle té {count} peces detallades. Per a una comoditat visual òptima, es recomana jugar en una pantalla més gran (tauleta o ordinador).',
    device_advice_continue: 'Continuar al mòbil',
    device_advice_change: 'Canviar a nivell Fàcil (24 peces)',

    vault_title: '🖼️ Galeria Panoràmica i Els Meus Puzles',
    tab_presets: 'Col·lecció Oficial',
    tab_my_puzzles: 'Els Meus Puzles Personals',
    vault_upload_btn: '📤 Pujar Foto des de l\'Ordinador',
    vault_camera_btn: '📷 Fer Foto amb la Càmera',
    vault_drag_drop: 'Arrossega una imatge ací o prem Ctrl+V',
    vault_empty_user: 'Encara no has afegit fotos pròpies. Puja els teus paisatges preferits!',
    vault_select_puzzle: 'Jugar este Puzle',
    vault_delete: 'Eliminar',

    weekly_title: '📅 Repte Setmanal del Club',
    weekly_badge_dia: 'Corona de Diamant',
    weekly_badge_oro: 'Medalla d\'Or',
    weekly_badge_pla: 'Medalla de Plata',
    weekly_badge_bro: 'Medalla de Bronze',
    weekly_completed_msg: 'Completat esta setmana amb {badge} en {time}!',
    weekly_play_btn: 'Acceptar el Repte Setmanal',

    hof_title: '🏛️ Saló de la Fama de Mestres',
    hof_subtitle: 'Reservat a resolucions d\'alta mestria en nivells Difícil (96) i Molt Difícil (150+)',
    hof_tab_all: '🌍 Arreu del Món',
    hof_tab_nations: '🏳️ Copa de Nacions',
    hof_tab_cities: '🏙️ Orgull Local',
    hof_tab_generations: '🎂 Generacions',
    hof_register_btn: 'Inscriure la meua Marca',
    hof_pure_badge: 'Mestria Pura (Sense Guia)',
    hof_assisted_badge: 'Amb Imatge Guia',

    victory_title: '🎉 ENHORABONA, PUZLE COMPLETAT! 🏆',
    victory_time: 'Temps Total:',
    victory_score: 'Puntuació Cognitiva:',
    victory_purity: 'Autonomia:',
    victory_pure_yes: '100% Pura (Sense Guies)',
    victory_pure_no: 'Amb Imatge Guia',
    victory_share_btn: '📱 Desafiar Amics per WhatsApp',
    victory_new_game: 'Triar un Altre Puzle',

    rules_title: '📖 Escola de Puzles del Club',
    rules_p1: 'Puzles del Club oferix una experiència d\'estimulació espacial amb peces corbades matemàticament amb Bézier.',
    rules_p2: '• **Tall múltiple:** Pots prémer "Nou Tall" en qualsevol moment per a retallar la mateixa imatge.',
    rules_p3: '• **Agrupació magnètica:** En apropar peces contigües s\'atrauen i es desplacen juntes.',
    rules_p4: '• **Puntuació:** Les peces interiors atorguen més punts (120 pts).',
    rules_close: 'Entés, a jugar!'
  },

  eu: {
    app_title: 'KLUBAREN PUZZLEAK',
    app_subtitle: '🧩 Puzzle Panoramikoak & Taktika Espaziala',
    btn_club: 'Kluba',
    btn_sound_title: 'Lotura soinuak eta efektuak',
    btn_rules_title: 'Arauak eta puntuazio kognitiboa',
    btn_vault_title: 'Galeria eta Nire Puzzleak',
    btn_weekly_title: 'Asteroko Erronka Ofiziala',
    btn_hof_title: 'Ospearen Aretoa (Zaila eta Oso Zaila)',
    btn_lang_title: 'Hizkuntza aukeratu',

    diff_facil: 'Erraza (24)',
    diff_medio: 'Ertaina (48)',
    diff_dificil: 'Zaila (96)',
    diff_muy_dificil: 'Oso Zaila (150)',
    btn_recut: '🎲 Ebaki Berria',
    btn_recut_title: 'Irudi bera pieza eta kurba desberdinekin moztu',
    btn_edges_only: '🧩 Ertzak Bakarrik',
    btn_ghost: '👻 Gida Irudia',
    btn_sort_wings: '↔️ Hegaletan Ordenatu',
    btn_reset_zoom: '🔍 Zoom Berrezarri',
    btn_share_whatsapp: '📱 WhatsApp Erronka',

    stat_pieces: 'Piezak',
    stat_score: 'Puntuak',
    stat_time: 'Denbora',
    stat_combo: 'Segida!',

    device_advice_title: '📱 Gomendio Ergonomikoa',
    device_advice_text: 'Puzzle honek {count} pieza ditu. Erosotasun handiagoz jokatzeko, pantaila handiago batean egitea gomendatzen da (tableta edo ordenagailua).',
    device_advice_continue: 'Mugikorrean jarraitu',
    device_advice_change: 'Maila errazera aldatu (24 pieza)',

    vault_title: '🖼️ Galeria Panoramikoa eta Nire Puzzleak',
    tab_presets: 'Bilduma Ofiziala',
    tab_my_puzzles: 'Nire Puzzleak',
    vault_upload_btn: '📤 Argazkia Igo',
    vault_camera_btn: '📷 Argazkia Atera',
    vault_drag_drop: 'Arrastatu irudia hona edo itsatsi Ctrl+V bidez',
    vault_empty_user: 'Oraindik ez duzu zure argazkirik gehitu.',
    vault_select_puzzle: 'Puzzle hau Jokatu',
    vault_delete: 'Ezabatu',

    weekly_title: '📅 Klubaren Asteroko Erronka',
    weekly_badge_dia: 'Diamante Koroa',
    weekly_badge_oro: 'Urrezko Domina',
    weekly_badge_pla: 'Zilarrezko Domina',
    weekly_badge_bro: 'Brontzezko Domina',
    weekly_completed_msg: 'Aste honetan amaitua: {badge} ({time})!',
    weekly_play_btn: 'Erronka Onartu',

    hof_title: '🏛️ Maisuen Ospearen Aretoa',
    hof_subtitle: 'Zaila (96) eta Oso Zaila (150+) mailetako maisuentzat gordea',
    hof_tab_all: '🌍 Mundu Osoa',
    hof_tab_nations: '🏳️ Nazioen Kopa',
    hof_tab_cities: '🏙️ Tokiko Harrotasuna',
    hof_tab_generations: '🎂 Belaunaldiak',
    hof_register_btn: 'Nire Marka Erregistratu',
    hof_pure_badge: 'Maisutza Garbia (Gidarik Gabe)',
    hof_assisted_badge: 'Gidarekin',

    victory_title: '🎉 ZORIONAK, PUZZLEA AMAITUTA! 🏆',
    victory_time: 'Guztizko Denbora:',
    victory_score: 'Puntuazio Kognitiboa:',
    victory_purity: 'Autonomia:',
    victory_pure_yes: '%100 Garbia',
    victory_pure_no: 'Gidarekin Lagunduta',
    victory_share_btn: '📱 Lagunak Erronkatu WhatsApp bidez',
    victory_new_game: 'Beste Puzzle bat Aukeratu',

    rules_title: '📖 Klubaren Puzzleen Eskola',
    rules_p1: 'Klubaren Puzzleak Bézier kurben bidez sortutako arreta eta logika espazialeko esperientzia bat da.',
    rules_p2: '• **Ebaketa anitza:** Sakatu "Ebaki Berria" irudi bera modu desberdinean mozteko.',
    rules_p3: '• **Taldekatze magnetikoa:** Elkarren ondoan dauden piezak elkartu egiten dira.',
    rules_p4: '• **Puntuak:** Barneko piezek puntu gehiago ematen dituzte (120 puntu).',
    rules_close: 'Ulertuta, jokatu!'
  },

  gl: {
    app_title: 'PUZLES DO CLUB',
    app_subtitle: '🧩 Puzles Panorámicos & Táctica Espacial',
    btn_club: 'Club',
    btn_sound_title: 'Son de encaixe e efectos',
    btn_rules_title: 'Regras e puntuación cognitiva',
    btn_vault_title: 'Galería e Os Meus Puzles',
    btn_weekly_title: 'Reto Semanal Oficial',
    btn_hof_title: 'Salón da Fama (Difícil e Moi Difícil)',
    btn_lang_title: 'Seleccionar idioma',

    diff_facil: 'Fácil (24)',
    diff_medio: 'Medio (48)',
    diff_dificil: 'Difícil (96)',
    diff_muy_dificil: 'Moi Difícil (150)',
    btn_recut: '🎲 Novo Corte',
    btn_recut_title: 'Cortar a mesma imaxe con pezas e curvas diferentes',
    btn_edges_only: '🧩 Só Bordes',
    btn_ghost: '👻 Imaxe Guía',
    btn_sort_wings: '↔️ Ordenar Laterais',
    btn_reset_zoom: '🔍 Axustar Zoom',
    btn_share_whatsapp: '📱 Retar WhatsApp',

    stat_pieces: 'Pezas',
    stat_score: 'Puntos',
    stat_time: 'Tempo',
    stat_combo: 'Racha!',

    device_advice_title: '📱 Recomendación Ergonómica',
    device_advice_text: 'Este puzle conta con {count} pezas detalladas. Para maior comodidade visual, recoméndase xogar nunha pantalla máis ampla (tableta ou ordenador).',
    device_advice_continue: 'Continuar no móbil',
    device_advice_change: 'Cambiar a nivel Fácil (24 pezas)',

    vault_title: '🖼️ Galería Panorámica e Os Meus Puzles',
    tab_presets: 'Colección Oficial',
    tab_my_puzzles: 'Os Meus Puzles',
    vault_upload_btn: '📤 Subir Foto',
    vault_camera_btn: '📷 Facer Foto',
    vault_drag_drop: 'Arrastra unha imaxe aquí ou pega con Ctrl+V',
    vault_empty_user: 'Aínda non engadiches fotos persoais.',
    vault_select_puzzle: 'Xogar este Puzle',
    vault_delete: 'Eliminar',

    weekly_title: '📅 Reto Semanal do Club',
    weekly_badge_dia: 'Coroa de Diamante',
    weekly_badge_oro: 'Medalla de Ouro',
    weekly_badge_pla: 'Medalla de Prata',
    weekly_badge_bro: 'Medalla de Bronce',
    weekly_completed_msg: 'Completado esta semana con {badge} en {time}!',
    weekly_play_btn: 'Aceptar o Reto',

    hof_title: '🏛️ Salón da Fama de Mestres',
    hof_subtitle: 'Reservado a resolucións de alta mestría en Difícil (96) e Moi Difícil (150+)',
    hof_tab_all: '🌍 Todo o Mundo',
    hof_tab_nations: '🏳️ Copa de Nacións',
    hof_tab_cities: '🏙️ Orgullo Local',
    hof_tab_generations: '🎂 Xeracións',
    hof_register_btn: 'Inscribir a miña Marca',
    hof_pure_badge: 'Mestría Pura (Sen Guía)',
    hof_assisted_badge: 'Con Guía',

    victory_title: '🎉 PARABÉNS, PUZLE COMPLETADO! 🏆',
    victory_time: 'Tempo Total:',
    victory_score: 'Puntuación Cognitiva:',
    victory_purity: 'Autonomía:',
    victory_pure_yes: '100% Pura',
    victory_pure_no: 'Con Imaxe Guía',
    victory_share_btn: '📱 Desafiar Amigos por WhatsApp',
    victory_new_game: 'Elixir Outro Puzle',

    rules_title: '📖 Escola de Puzles do Club',
    rules_p1: 'Puzles do Club combina estimulación espacial e curvas de Bézier orgánicas.',
    rules_p2: '• **Novo corte:** Podes cortar a mesma imaxe tantas veces como queiras con formas únicas.',
    rules_p3: '• **Encaixe magnético:** As pezas veciñas xúntanse e móvense como un só bloque.',
    rules_p4: '• **Puntuación:** As pezas interiores suman máis puntos (120 pts).',
    rules_close: 'Entendido, a xogar!'
  }
};

class I18nManager {
  constructor() {
    this.currentLang = this.detectLanguage();
  }

  detectLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && PUZLES_TRANSLATIONS[urlLang.toLowerCase()]) {
      return urlLang.toLowerCase();
    }

    const saved = localStorage.getItem('puzles_lang');
    if (saved && PUZLES_TRANSLATIONS[saved]) return saved;

    const nav = (navigator.language || 'es').slice(0, 2).toLowerCase();
    if (PUZLES_TRANSLATIONS[nav]) return nav;

    return 'es';
  }

  setLanguage(lang) {
    if (!PUZLES_TRANSLATIONS[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('puzles_lang', lang);
    this.applyTranslations();
  }

  t(key, replacements = {}) {
    const dict = PUZLES_TRANSLATIONS[this.currentLang] || PUZLES_TRANSLATIONS.es;
    let str = dict[key] || PUZLES_TRANSLATIONS.es[key] || key;

    for (const [k, v] of Object.entries(replacements)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
    return str;
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.innerHTML = this.t(key);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.setAttribute('title', this.t(key));
    });

    const langCodeEl = document.getElementById('current-lang-code');
    if (langCodeEl) {
      langCodeEl.textContent = this.currentLang.toUpperCase();
    }
  }
}

window.I18nManager = I18nManager;
window.PUZLES_TRANSLATIONS = PUZLES_TRANSLATIONS;
