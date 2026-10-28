/**
 * Bridge del Club — Motor de Internacionalización (i18n)
 * Cobertura completa en los 9 idiomas oficiales de Club del Ingenio:
 * ES (Español), EN (English), FR (Français), DE (Deutsch),
 * CA (Català), VA (Valencià), EU (Euskara), GL (Galego), JA (日本語).
 */

export const BRIDGE_I18N = {
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    native: 'Español',
    app_title: 'Bridge del Club',
    app_subtitle: 'Escuela de Carteo & Torneo Oficial',
    
    // Modos
    mode_school: 'Escuela de Carteo',
    mode_freeplay: 'Mesa de Salón Libre',
    mode_tournament: 'Salón de Torneo (Subasta & SAYC)',
    
    // Acciones Cabecera
    btn_rules: '¿Cómo se Juega?',
    btn_rules_title: 'Aprende las reglas de Bridge en 2 minutos',
    btn_sound_title: 'Sonido (Activar / Silenciar)',
    btn_lang_title: 'Seleccionar idioma',

    // Barra de Escenarios
    scenario_1: 'Misión 1: Mi Primera Baza (Sin Triunfo 1NT)',
    scenario_2: 'Misión 2: El Corte con Triunfo (2 Corazones ♥)',
    scenario_3: 'Misión 3: El Arte de la Impasse / Finesse (3NT)',
    scenario_4: 'Misión 4: Promocionar un Palo Largo (4 Picas ♠)',
    scenario_5: 'Misión 5: Manga Mayor en Sin Triunfo (3NT)',
    lbl_contract: 'Contrato:',
    free_1nt: '1NT — 7 Bazas (Sin Triunfo)',
    free_2h: '2♥ — 8 Bazas (Corazones)',
    free_3nt: '3NT — 9 Bazas (Manga Sin Triunfo)',
    free_4s: '4♠ — 10 Bazas (Manga Mayor)',
    free_6nt: '6NT — 12 Bazas (Pequeño Slam)',
    btn_deal_random: '🔀 Repartir Nueva Mano',
    lbl_dealer: 'Dador:',
    dealer_s: 'Sur (Tú)',
    dealer_w: 'Oeste',
    dealer_n: 'Norte (Compañero)',
    dealer_e: 'Este',
    btn_deal_tournament: '🔀 Repartir Mano de Torneo',
    btn_restart_deal: '🔄 Reiniciar Mano',

    // HUD Marcador
    hud_mission: 'Misión Actual',
    hud_contract: 'Contrato en Juego',
    hud_target: 'Objetivo de Bazas',
    hud_tricks_ns: 'Bazas Nosotros (NS)',
    hud_tricks_ew: 'Bazas Rivales (EO)',
    hud_remain: 'Para Cumplir',
    hud_fulfilled: '¡Cumplido!',
    hud_tricks_suffix: 'bazas',
    hud_remaining_suffix: 'restantes',

    // Asientos y Jugadores
    seat_north: 'NORTE (El Muerto)',
    seat_south: 'SUR (Tú — Declarador)',
    seat_west: 'OESTE (Defensa)',
    seat_east: 'ESTE (Defensa)',
    turn_your_south: '<strong>Tu turno en Sur:</strong> Haz clic en una carta de tu mano para jugarla',
    turn_your_north: '<strong>Tu turno en Norte (El Muerto):</strong> Como declarador, elige qué carta de tu compañero jugar',
    turn_west_ai: '<em>Turno de Oeste (Defensa)... pensando jugada</em>',
    turn_east_ai: '<em>Turno de Este (Defensa)... pensando jugada</em>',
    trick_won_by: 'Baza ganada por: {player} con {card}',

    // Pistas de Carteo
    hint_waiting: 'Esperando inicio...',
    hint_hand_ended: 'La mano ha concluido.',
    hint_waiting_player: 'Esperando la jugada de {player}...',
    hint_lead_trump: '💡 Consejo: Al inicio de una mano con triunfo suele ser buena idea "destriunfar" a los rivales jugando cartas altas de triunfo para quitarles las suyas.',
    hint_lead_general: '💡 Consejo: Juega hacia los honores de la otra mano o ataca un palo largo para promocionar cartas firmes.',
    hint_must_follow: '💡 Regla de Oro: La salida fue {suit}. Es obligatorio asistir con una de tus cartas de ese palo.',
    hint_can_trump: '💡 ¡Oportunidad!: No tienes {suit}. ¡Puedes jugar un triunfo ({trump}) y cortar para llevarte la baza!',
    hint_can_discard: '💡 Descarte: No tienes {suit}. Descarta la carta más baja de tu palo más débil que no te sirva.',

    // Subasta y Bidding Box
    auction_title: '🏛️ Subasta Reglamentaria (Bidding Box)',
    auction_dealer_info: 'Dador: <strong>{dealer}</strong> | Turno de cante: <strong style="color:var(--gold-accent)">{turn}</strong>',
    sayc_box_title: '💡 ASISTENTE PEDAGÓGICO SAYC (MAYOR QUINTO)',
    sayc_hcp_label: 'Tus Puntos de Honor (HCP):',
    sayc_dist_balanced: 'Mano Equilibrada',
    sayc_dist_unbalanced: 'Mano Desigual',
    sayc_rec_label: 'Voz recomendada SAYC:',
    col_west: 'OESTE',
    col_north: 'NORTE (COMPAÑERO)',
    col_east: 'ESTE',
    col_south: 'SUR (TÚ)',
    bidding_box_title: 'Tus opciones de cante (Niveles 1 al 7 y palos oficiales)',
    bidding_your_turn: '¡Es tu turno de cantar!',
    bidding_waiting_for: 'Esperando cante de {player}...',
    btn_pass: 'PASO (Pass)',
    btn_double: 'DOBLO (X)',
    btn_redouble: 'REDOBLO (XX)',
    call_pass: 'Paso',
    call_double: 'Doblo',
    call_redouble: 'Redoblo',

    // Palos
    suit_clubs: 'Tréboles',
    suit_diamonds: 'Diamantes',
    suit_hearts: 'Corazones',
    suit_spades: 'Picas',
    suit_nt: 'Sin Triunfo',

    // Modales de Resultado
    res_school_win: '🎉 ¡CONTRATO CUMPLIDO!',
    res_school_loss: '❌ CONTRATO CAÍDO',
    res_overtricks: '+{n} bazas de sobre',
    res_undertricks: '{n} bazas para cumplir',
    res_lesson_mastered: 'Lección dominada:',
    res_tip: 'Consejo para superar esta mano:',
    res_btn_retry: '🔄 Reintentar Mano',
    res_btn_next: '➡️ Siguiente Misión',
    res_tournament_win: '🏆 ¡MANO DE TORNEO CUMPLIDA!',
    res_tournament_loss: '❌ MANO DE TORNEO CAÍDA',
    res_score_sheet_title: '📜 Hoja Oficial de Torneo Duplicado',
    res_score_contract_tricks: 'Bazas contratadas ({contract})',
    res_score_game_bonus: 'Bonificación de Manga (Game)',
    res_score_partscore_bonus: 'Bonificación de Contrato Parcial',
    res_score_small_slam: 'Bonificación de Pequeño Slam (12 bazas)',
    res_score_grand_slam: 'Bonificación de Gran Slam (13 bazas)',
    res_score_overtricks: 'Sobrebazas (+{n} extra)',
    res_score_penalties: 'Multas por caída (-{n} bazas)',
    res_score_total: 'Puntuación Total Duplicada',
    res_btn_next_deal: '🔀 Siguiente Mano de Torneo',

    // Modal de Idiomas
    modal_lang_title: '🌐 Seleccionar Idioma',
    modal_lang_sub: 'Elige tu lengua para toda la experiencia del Bridge del Club:'
  },

  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    native: 'English',
    app_title: 'Club Bridge',
    app_subtitle: 'Trick-Taking School & Official Tournament',
    mode_school: 'Play School',
    mode_freeplay: 'Casual Club Table',
    mode_tournament: 'Tournament Room (Auction & SAYC)',
    btn_rules: 'How to Play?',
    btn_rules_title: 'Learn Bridge rules in 2 minutes',
    btn_sound_title: 'Sound (Mute / Unmute)',
    btn_lang_title: 'Select language',
    scenario_1: 'Mission 1: My First Trick (No Trump 1NT)',
    scenario_2: 'Mission 2: Ruffing with Trump (2 Hearts ♥)',
    scenario_3: 'Mission 3: The Art of the Finesse (3NT)',
    scenario_4: 'Mission 4: Promoting a Long Suit (4 Spades ♠)',
    scenario_5: 'Mission 5: Major Game in No Trump (3NT)',
    lbl_contract: 'Contract:',
    free_1nt: '1NT — 7 Tricks (No Trump)',
    free_2h: '2♥ — 8 Tricks (Hearts)',
    free_3nt: '3NT — 9 Tricks (Game No Trump)',
    free_4s: '4♠ — 10 Tricks (Major Game)',
    free_6nt: '6NT — 12 Tricks (Small Slam)',
    btn_deal_random: '🔀 Deal New Hand',
    lbl_dealer: 'Dealer:',
    dealer_s: 'South (You)',
    dealer_w: 'West',
    dealer_n: 'North (Partner)',
    dealer_e: 'East',
    btn_deal_tournament: '🔀 Deal Tournament Hand',
    btn_restart_deal: '🔄 Restart Hand',
    hud_mission: 'Current Mission',
    hud_contract: 'Active Contract',
    hud_target: 'Target Tricks',
    hud_tricks_ns: 'Our Tricks (NS)',
    hud_tricks_ew: 'Opponents Tricks (EW)',
    hud_remain: 'Needed to Make',
    hud_fulfilled: 'Contract Made!',
    hud_tricks_suffix: 'tricks',
    hud_remaining_suffix: 'remaining',
    seat_north: 'NORTH (The Dummy)',
    seat_south: 'SOUTH (You — Declarer)',
    seat_west: 'WEST (Defense)',
    seat_east: 'EAST (Defense)',
    turn_your_south: '<strong>Your turn in South:</strong> Click a card from your hand to play it',
    turn_your_north: '<strong>Your turn in North (Dummy):</strong> As declarer, choose which partner card to play',
    turn_west_ai: '<em>West\'s turn (Defense)... thinking play</em>',
    turn_east_ai: '<em>East\'s turn (Defense)... thinking play</em>',
    trick_won_by: 'Trick won by: {player} with {card}',
    hint_waiting: 'Waiting for start...',
    hint_hand_ended: 'The hand has ended.',
    hint_waiting_player: 'Waiting for {player}\'s play...',
    hint_lead_trump: '💡 Tip: In a trump contract, it is usually wise to "draw trumps" early to strip opponents of their trumps.',
    hint_lead_general: '💡 Tip: Lead towards your honours or attack a long suit to establish winners.',
    hint_must_follow: '💡 Golden Rule: Lead suit is {suit}. You are required to follow suit.',
    hint_can_trump: '💡 Opportunity!: You are void in {suit}. You may play a trump ({trump}) and ruff to win the trick!',
    hint_can_discard: '💡 Discard: You have no {suit}. Discard the lowest card of your weakest suit.',
    auction_title: '🏛️ Official Auction (Bidding Box)',
    auction_dealer_info: 'Dealer: <strong>{dealer}</strong> | Turn: <strong style="color:var(--gold-accent)">{turn}</strong>',
    sayc_box_title: '💡 SAYC TUTOR (FIVE-CARD MAJORS)',
    sayc_hcp_label: 'Your High Card Points (HCP):',
    sayc_dist_balanced: 'Balanced Hand',
    sayc_dist_unbalanced: 'Unbalanced Hand',
    sayc_rec_label: 'Recommended SAYC Call:',
    col_west: 'WEST',
    col_north: 'NORTH (PARTNER)',
    col_east: 'EAST',
    col_south: 'SOUTH (YOU)',
    bidding_box_title: 'Your Bidding Options (Levels 1 to 7 and official suits)',
    bidding_your_turn: 'It is your turn to bid!',
    bidding_waiting_for: 'Waiting for {player}\'s call...',
    btn_pass: 'PASS',
    btn_double: 'DOUBLE (X)',
    btn_redouble: 'REDOUBLE (XX)',
    call_pass: 'Pass',
    call_double: 'Dbl',
    call_redouble: 'Rdbl',
    suit_clubs: 'Clubs',
    suit_diamonds: 'Diamonds',
    suit_hearts: 'Hearts',
    suit_spades: 'Spades',
    suit_nt: 'No Trump',
    res_school_win: '🎉 CONTRACT MADE!',
    res_school_loss: '❌ CONTRACT DEFEATED',
    res_overtricks: '+{n} overtricks',
    res_undertricks: '{n} tricks short',
    res_lesson_mastered: 'Mastered lesson:',
    res_tip: 'Tip for this deal:',
    res_btn_retry: '🔄 Retry Hand',
    res_btn_next: '➡️ Next Mission',
    res_tournament_win: '🏆 TOURNAMENT DEAL MADE!',
    res_tournament_loss: '❌ TOURNAMENT DEAL DEFEATED',
    res_score_sheet_title: '📜 Official Duplicate Score Sheet',
    res_score_contract_tricks: 'Contract trick points ({contract})',
    res_score_game_bonus: 'Game Bonus',
    res_score_partscore_bonus: 'Partscore Bonus',
    res_score_small_slam: 'Small Slam Bonus (12 tricks)',
    res_score_grand_slam: 'Grand Slam Bonus (13 tricks)',
    res_score_overtricks: 'Overtricks (+{n} extra)',
    res_score_penalties: 'Undertrick penalties (-{n} tricks)',
    res_score_total: 'Total Duplicate Score',
    res_btn_next_deal: '🔀 Next Tournament Deal',
    modal_lang_title: '🌐 Select Language',
    modal_lang_sub: 'Choose your preferred language for the Club Bridge experience:'
  },

  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    native: 'Français',
    app_title: 'Bridge du Club',
    app_subtitle: 'École de Jeu de la Carte & Tournoi Officiel',
    mode_school: 'École de Jeu',
    mode_freeplay: 'Table Libre',
    mode_tournament: 'Salle de Tournoi (Enchères & SAYC)',
    btn_rules: 'Comment Jouer ?',
    btn_rules_title: 'Apprenez les règles du Bridge en 2 minutes',
    btn_sound_title: 'Son (Activer / Couper)',
    btn_lang_title: 'Choisir la langue',
    scenario_1: 'Mission 1: Ma Première Levée (Sans-Atout 1SA)',
    scenario_2: 'Mission 2: Couper à l\'Atout (2 Cœurs ♥)',
    scenario_3: 'Mission 3: L\'Art de l\'Impasse (3SA)',
    scenario_4: 'Mission 4: Affranchir une Couleur Longue (4 Piques ♠)',
    scenario_5: 'Mission 5: Manche Majeure à Sans-Atout (3SA)',
    lbl_contract: 'Contrat:',
    free_1nt: '1SA — 7 Levées (Sans-Atout)',
    free_2h: '2♥ — 8 Levées (Cœurs)',
    free_3nt: '3SA — 9 Levées (Manche Sans-Atout)',
    free_4s: '4♠ — 10 Levées (Manche Majeure)',
    free_6nt: '6SA — 12 Levées (Petit Chelem)',
    btn_deal_random: '🔀 Distribuer Nouvelle Donne',
    lbl_dealer: 'Donneur:',
    dealer_s: 'Sud (Vous)',
    dealer_w: 'Ouest',
    dealer_n: 'Nord (Partenaire)',
    dealer_e: 'Est',
    btn_deal_tournament: '🔀 Distribuer Donne de Tournoi',
    btn_restart_deal: '🔄 Recommencer la Donne',
    hud_mission: 'Mission Actuelle',
    hud_contract: 'Contrat en Jeu',
    hud_target: 'Objectif de Levées',
    hud_tricks_ns: 'Nos Levées (NS)',
    hud_tricks_ew: 'Levées Adverses (EO)',
    hud_remain: 'Pour Réaliser',
    hud_fulfilled: 'Contrat Réalisé !',
    hud_tricks_suffix: 'levées',
    hud_remaining_suffix: 'restantes',
    seat_north: 'NORD (Le Mort)',
    seat_south: 'SUD (Vous — Déclarant)',
    seat_west: 'OUEST (Flanc)',
    seat_east: 'EST (Flanc)',
    turn_your_south: '<strong>Votre tour en Sud:</strong> Cliquez sur une carte pour la jouer',
    turn_your_north: '<strong>Votre tour en Nord (Le Mort):</strong> En tant que déclarant, choisissez la carte du mort',
    turn_west_ai: '<em>Tour d\'Ouest (Défense)... réflexion</em>',
    turn_east_ai: '<em>Tour d\'Est (Défense)... réflexion</em>',
    trick_won_by: 'Levée gagnée par: {player} avec {card}',
    hint_waiting: 'En attente...',
    hint_hand_ended: 'La donne est terminée.',
    hint_waiting_player: 'En attente de la carte de {player}...',
    hint_lead_trump: '💡 Conseil: À l\'atout, il est souvent judicieux de purger les atouts des adversaires.',
    hint_lead_general: '💡 Conseil: Jouez vers vos honneurs ou affranchissez une couleur longue.',
    hint_must_follow: '💡 Règle d\'Or: Entame à {suit}. Vous devez obligatoirement fournir à la couleur.',
    hint_can_trump: '💡 Opportunité: Vous n\'avez pas de {suit}. Vous pouvez couper à l\'atout ({trump}) !',
    hint_can_discard: '💡 Défausse: Vous n\'avez pas de {suit}. Défaussez la plus basse carte inutile.',
    auction_title: '🏛️ Enchères Réglementaires (Boîte à Enchères)',
    auction_dealer_info: 'Donneur: <strong>{dealer}</strong> | Tour: <strong style="color:var(--gold-accent)">{turn}</strong>',
    sayc_box_title: '💡 TUTEUR SAYC (MAJEURE CINQUIÈME)',
    sayc_hcp_label: 'Vos Points d\'Honneur (H):',
    sayc_dist_balanced: 'Main Régulière',
    sayc_dist_unbalanced: 'Main Irrégulière',
    sayc_rec_label: 'Enchère Recommandée:',
    col_west: 'OUEST',
    col_north: 'NORD (PARTENAIRE)',
    col_east: 'EST',
    col_south: 'SUD (VOUS)',
    bidding_box_title: 'Vos options d\'enchères (Paliers 1 à 7 et couleurs)',
    bidding_your_turn: 'C\'est à vous d\'enchérir !',
    bidding_waiting_for: 'En attente de {player}...',
    btn_pass: 'PASSE',
    btn_double: 'CONTRE (X)',
    btn_redouble: 'SURCONTRE (XX)',
    call_pass: 'Passe',
    call_double: 'Contre',
    call_redouble: 'Surcontre',
    suit_clubs: 'Trèfle',
    suit_diamonds: 'Carreau',
    suit_hearts: 'Cœur',
    suit_spades: 'Pique',
    suit_nt: 'Sans-Atout',
    res_school_win: '🎉 CONTRAT RÉALISÉ !',
    res_school_loss: '❌ CONTRAT CHUTÉ',
    res_overtricks: '+{n} levée(s) de surbise',
    res_undertricks: '{n} de chute',
    res_lesson_mastered: 'Leçon maîtrisée:',
    res_tip: 'Conseil:',
    res_btn_retry: '🔄 Rejouer la Donne',
    res_btn_next: '➡️ Mission Suivante',
    res_tournament_win: '🏆 DONNE DE TOURNOI RÉALISÉE !',
    res_tournament_loss: '❌ DONNE DE TOURNOI CHUTÉE',
    res_score_sheet_title: '📜 Feuille Officielle de Tournoi Duplicaté',
    res_score_contract_tricks: 'Points de contrat ({contract})',
    res_score_game_bonus: 'Prime de Manche',
    res_score_partscore_bonus: 'Prime de Partielle',
    res_score_small_slam: 'Prime de Petit Chelem (12 levées)',
    res_score_grand_slam: 'Prime de Grand Chelem (13 levées)',
    res_score_overtricks: 'Levées de surbise (+{n})',
    res_score_penalties: 'Pénalités de chute (-{n} levées)',
    res_score_total: 'Score Total Duplicaté',
    res_btn_next_deal: '🔀 Donne de Tournoi Suivante',
    modal_lang_title: '🌐 Sélectionner la Langue',
    modal_lang_sub: 'Choisissez votre langue pour toute l\'expérience du Bridge du Club:'
  },

  de: {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪',
    native: 'Deutsch',
    app_title: 'Club Bridge',
    app_subtitle: 'Spieltechnik-Schule & Offizielles Turnier',
    mode_school: 'Spieltechnik-Schule',
    mode_freeplay: 'Freies Spiel',
    mode_tournament: 'Turniersaal (Reizung & SAYC)',
    btn_rules: 'Wie spielt man?',
    btn_rules_title: 'Lerne die Bridge-Regeln in 2 Minuten',
    btn_sound_title: 'Ton (Ein / Aus)',
    btn_lang_title: 'Sprache wählen',
    scenario_1: 'Mission 1: Mein erster Stich (Ohne Trumpf 1NT)',
    scenario_2: 'Mission 2: Stechen mit Trumpf (2 Coeur ♥)',
    scenario_3: 'Mission 3: Die Kunst des Schnitts (3NT)',
    scenario_4: 'Mission 4: Eine lange Farbe entwickeln (4 Pik ♠)',
    scenario_5: 'Mission 5: Vollspiel in Sans Atout (3NT)',
    lbl_contract: 'Kontrakt:',
    free_1nt: '1NT — 7 Stiche (Ohne Trumpf)',
    free_2h: '2♥ — 8 Stiche (Coeur)',
    free_3nt: '3NT — 9 Stiche (Vollspiel Ohne Trumpf)',
    free_4s: '4♠ — 10 Stiche (Vollspiel Pik)',
    free_6nt: '6NT — 12 Stiche (Kleiner Schlemm)',
    btn_deal_random: '🔀 Neues Spiel geben',
    lbl_dealer: 'Teiler:',
    dealer_s: 'Süd (Du)',
    dealer_w: 'West',
    dealer_n: 'Nord (Partner)',
    dealer_e: 'Ost',
    btn_deal_tournament: '🔀 Turnier-Hand geben',
    btn_restart_deal: '🔄 Hand neu starten',
    hud_mission: 'Aktuelle Mission',
    hud_contract: 'Gespielter Kontrakt',
    hud_target: 'Ziel-Stiche',
    hud_tricks_ns: 'Unsere Stiche (NS)',
    hud_tricks_ew: 'Gegner-Stiche (OW)',
    hud_remain: 'Bis zum Ziel',
    hud_fulfilled: 'Erfüllt!',
    hud_tricks_suffix: 'Stiche',
    hud_remaining_suffix: 'fehlen',
    seat_north: 'NORD (Der Dummy)',
    seat_south: 'SÜD (Du — Alleinspieler)',
    seat_west: 'WEST (Gegenspiel)',
    seat_east: 'OST (Gegenspiel)',
    turn_your_south: '<strong>Du bist in Süd am Zug:</strong> Klicke auf eine Karte, um sie zu spielen',
    turn_your_north: '<strong>Du bist in Nord am Zug (Dummy):</strong> Wähle als Alleinspieler die Partnerkarte',
    turn_west_ai: '<em>West ist am Zug (Gegenspiel)...</em>',
    turn_east_ai: '<em>Ost ist am Zug (Gegenspiel)...</em>',
    trick_won_by: 'Stich gewonnen von: {player} mit {card}',
    hint_waiting: 'Warten auf Start...',
    hint_hand_ended: 'Das Spiel ist beendet.',
    hint_waiting_player: 'Warte auf {player}...',
    hint_lead_trump: '💡 Tipp: Ziehe frühzeitig die Trümpfe der Gegner ab.',
    hint_lead_general: '💡 Tipp: Spiele zu den Figuren der Gegenhand oder entwickle eine lange Farbe.',
    hint_must_follow: '💡 Grundregel: Ausgespielt wurde {suit}. Farbe muss bedient werden!',
    hint_can_trump: '💡 Chance: Du hast kein {suit}. Du darfst stechen ({trump}) und den Stich holen!',
    hint_can_discard: '💡 Abwurf: Du hast kein {suit}. Wirf eine niedrige Karte ab.',
    auction_title: '🏛️ Offizielle Reizung (Bidding-Box)',
    auction_dealer_info: 'Teiler: <strong>{dealer}</strong> | Am Zug: <strong style="color:var(--gold-accent)">{turn}</strong>',
    sayc_box_title: '💡 SAYC-LEHRER (FÜNFER-MAJOR)',
    sayc_hcp_label: 'Deine Figurenpunkte (HCP):',
    sayc_dist_balanced: 'Ausgeglichenes Blatt',
    sayc_dist_unbalanced: 'Ungleichmäßiges Blatt',
    sayc_rec_label: 'Empfohlenes Gebot:',
    col_west: 'WEST',
    col_north: 'NORD (PARTNER)',
    col_east: 'OST',
    col_south: 'SÜD (DU)',
    bidding_box_title: 'Reizmöglicheiten (Stufen 1 bis 7 und Farben)',
    bidding_your_turn: 'Du bist am Zug zum Reizen!',
    bidding_waiting_for: 'Warte auf Gebot von {player}...',
    btn_pass: 'PASS',
    btn_double: 'KONTRA (X)',
    btn_redouble: 'REKONTRA (XX)',
    call_pass: 'Pass',
    call_double: 'Kontra',
    call_redouble: 'Rekontra',
    suit_clubs: 'Treff',
    suit_diamonds: 'Karo',
    suit_hearts: 'Coeur',
    suit_spades: 'Pik',
    suit_nt: 'Ohne Trumpf',
    res_school_win: '🎉 KONTRAKT ERFÜLLT!',
    res_school_loss: '❌ KONTRAKT GEFALLEN',
    res_overtricks: '+{n} Überstiche',
    res_undertricks: '{n} Fallstiche',
    res_lesson_mastered: 'Gelernte Lektion:',
    res_tip: 'Tipp:',
    res_btn_retry: '🔄 Hand wiederholen',
    res_btn_next: '➡️ Nächste Mission',
    res_tournament_win: '🏆 TURNIERSPIEL ERFÜLLT!',
    res_tournament_loss: '❌ TURNIERSPIEL GEFALLEN',
    res_score_sheet_title: '📜 Offizieller Turnier-Erfassungsbogen',
    res_score_contract_tricks: 'Stichpunkte ({contract})',
    res_score_game_bonus: 'Vollspiel-Prämie',
    res_score_partscore_bonus: 'Teilspiel-Prämie',
    res_score_small_slam: 'Kleiner Schlemm Prämie (12 Stiche)',
    res_score_grand_slam: 'Großer Schlemm Prämie (13 Stiche)',
    res_score_overtricks: 'Überstiche (+{n})',
    res_score_penalties: 'Fallstrafen (-{n} Stiche)',
    res_score_total: 'Gesamtpunktzahl Turnier',
    res_btn_next_deal: '🔀 Nächstes Turnierspiel',
    modal_lang_title: '🌐 Sprache wählen',
    modal_lang_sub: 'Wähle deine bevorzugte Sprache für Club Bridge:'
  },

  ca: {
    code: 'ca',
    name: 'Català',
    flag: '🏴󠁥󠁳󠁣󠁴󠁿',
    native: 'Català',
    app_title: 'Bridge del Club',
    app_subtitle: 'Escola de Carteig & Torneig Oficial',
    mode_school: 'Escola de Carteig',
    mode_freeplay: 'Mesa de Saló Lliure',
    mode_tournament: 'Saló de Torneig (Subhasta & SAYC)',
    btn_rules: 'Com es juga?',
    btn_rules_title: 'Aprèn les regles del Bridge en 2 minuts',
    btn_sound_title: 'So (Activar / Silenciar)',
    btn_lang_title: 'Seleccionar idioma',
    scenario_1: 'Missió 1: La meva primera basa (Sense Triomf 1NT)',
    scenario_2: 'Missió 2: Tallar amb triomf (2 Cors ♥)',
    scenario_3: 'Missió 3: L\'art de l\'impasse (3NT)',
    scenario_4: 'Missió 4: Promocionar un pal llarg (4 Piques ♠)',
    scenario_5: 'Missió 5: Mànega major en Sense Triomf (3NT)',
    lbl_contract: 'Contracte:',
    free_1nt: '1NT — 7 Bases (Sense Triomf)',
    free_2h: '2♥ — 8 Bases (Cors)',
    free_3nt: '3NT — 9 Bases (Mànega Sense Triomf)',
    free_4s: '4♠ — 10 Bases (Mànega Major)',
    free_6nt: '6NT — 12 Bases (Petit Slam)',
    btn_deal_random: '🔀 Repartir nova mà',
    lbl_dealer: 'Dador:',
    dealer_s: 'Sud (Tu)',
    dealer_w: 'Oest',
    dealer_n: 'Nord (Company)',
    dealer_e: 'Est',
    btn_deal_tournament: '🔀 Repartir mà de torneig',
    btn_restart_deal: '🔄 Reiniciar mà',
    hud_mission: 'Missió Actual',
    hud_contract: 'Contracte en Joc',
    hud_target: 'Objectiu de Bases',
    hud_tricks_ns: 'Bases Nosaltres (NS)',
    hud_tricks_ew: 'Bases Rivals (EO)',
    hud_remain: 'Per Complir',
    hud_fulfilled: 'Complert!',
    hud_tricks_suffix: 'bases',
    hud_remaining_suffix: 'restants',
    seat_north: 'NORD (El Mort)',
    seat_south: 'SUD (Tu — Declarant)',
    seat_west: 'OEST (Defensa)',
    seat_east: 'EST (Defensa)',
    turn_your_south: '<strong>El teu torn a Sud:</strong> Clica una carta de la mà per jugar-la',
    turn_your_north: '<strong>El teu torn a Nord (El Mort):</strong> Com a declarant, tria quina carta del company jugar',
    turn_west_ai: '<em>Torn d\'Oest (Defensa)... pensant</em>',
    turn_east_ai: '<em>Torn d\'Est (Defensa)... pensant</em>',
    trick_won_by: 'Basa guanyada per: {player} amb {card}',
    hint_waiting: 'Esperant inici...',
    hint_hand_ended: 'La mà ha acabat.',
    hint_waiting_player: 'Esperant la jugada de {player}...',
    hint_lead_trump: '💡 Consell: En mans amb triomf convé "destriomfar" d\'hora als rivals.',
    hint_lead_general: '💡 Consell: Juga cap als honors de l\'altra mà o ataca un pal llarg.',
    hint_must_follow: '💡 Regla d\'Or: La sortida ha estat {suit}. És obligatori assistir al pal!',
    hint_can_trump: '💡 Oportunitat: No tens {suit}. Pots jugar un triomf ({trump}) i tallar per guanyar la basa!',
    hint_can_discard: '💡 Descart: No tens {suit}. Descarta la carta més baixa del teu pal feble.',
    auction_title: '🏛️ Subhasta Reglamentària (Caixa de Cants)',
    auction_dealer_info: 'Dador: <strong>{dealer}</strong> | Torn: <strong style="color:var(--gold-accent)">{turn}</strong>',
    sayc_box_title: '💡 ASISTENT PEDAGÒGIC SAYC (MAJOR CINQUÈ)',
    sayc_hcp_label: 'Els teus Punts d\'Honor (HCP):',
    sayc_dist_balanced: 'Mà Equilibrada',
    sayc_dist_unbalanced: 'Mà Desigual',
    sayc_rec_label: 'Veu recomanada SAYC:',
    col_west: 'OEST',
    col_north: 'NORD (COMPANY)',
    col_east: 'EST',
    col_south: 'SUD (TU)',
    bidding_box_title: 'Opcions de cantades (Nivells 1 al 7 i pals oficials)',
    bidding_your_turn: 'És el teu torn de cantar!',
    bidding_waiting_for: 'Esperant cant de {player}...',
    btn_pass: 'PAS (Pass)',
    btn_double: 'DOBLE (X)',
    btn_redouble: 'REDOBLE (XX)',
    call_pass: 'Pas',
    call_double: 'Doble',
    call_redouble: 'Redoble',
    suit_clubs: 'Trèvols',
    suit_diamonds: 'Diamants',
    suit_hearts: 'Cors',
    suit_spades: 'Piques',
    suit_nt: 'Sense Triomf',
    res_school_win: '🎉 CONTRACTE COMPLERT!',
    res_school_loss: '❌ CONTRACTE CAIGUT',
    res_overtricks: '+{n} bases de sobre',
    res_undertricks: '{n} bases per complir',
    res_lesson_mastered: 'Lliçó dominada:',
    res_tip: 'Consell:',
    res_btn_retry: '🔄 Reintentar mà',
    res_btn_next: '➡️ Següent Missió',
    res_tournament_win: '🏆 MÀ DE TORNEIG COMPLERTA!',
    res_tournament_loss: '❌ MÀ DE TORNEIG CAIGUDA',
    res_score_sheet_title: '📜 Full Oficial de Torneig Duplicat',
    res_score_contract_tricks: 'Bases contractades ({contract})',
    res_score_game_bonus: 'Bonificació de Mànega (Game)',
    res_score_partscore_bonus: 'Bonificació de Parcial',
    res_score_small_slam: 'Bonificació de Petit Slam (12 bases)',
    res_score_grand_slam: 'Bonificació de Gran Slam (13 bases)',
    res_score_overtricks: 'Sobrebases (+{n})',
    res_score_penalties: 'Multes per caiguda (-{n} bases)',
    res_score_total: 'Puntuació Total Duplicada',
    res_btn_next_deal: '🔀 Següent mà de torneig',
    modal_lang_title: '🌐 Seleccionar Idioma',
    modal_lang_sub: 'Tria la teva llengua per a tota l\'experiència del Bridge:'
  },

  va: {
    code: 'va',
    name: 'Valencià',
    flag: '🦇',
    native: 'Valencià',
    app_title: 'Bridge del Club',
    app_subtitle: 'Escola de Carteig & Torneig Oficial',
    mode_school: 'Escola de Carteig',
    mode_freeplay: 'Taula de Saló Lliure',
    mode_tournament: 'Saló de Torneig (Subhasta & SAYC)',
    btn_rules: 'Com es juga?',
    btn_rules_title: 'Aprén les regles del Bridge en 2 minuts',
    btn_sound_title: 'So (Activar / Silenciar)',
    btn_lang_title: 'Seleccionar idioma',
    scenario_1: 'Missió 1: La meua primera basa (Sense Triomf 1NT)',
    scenario_2: 'Missió 2: Tallar amb triomf (2 Cors ♥)',
    scenario_3: 'Missió 3: L\'art de l\'impasse (3NT)',
    scenario_4: 'Missió 4: Promocionar un pal llarg (4 Piques ♠)',
    scenario_5: 'Missió 5: Mànega major en Sense Triomf (3NT)',
    lbl_contract: 'Contracte:',
    free_1nt: '1NT — 7 Bases (Sense Triomf)',
    free_2h: '2♥ — 8 Bases (Cors)',
    free_3nt: '3NT — 9 Bases (Mànega Sense Triomf)',
    free_4s: '4♠ — 10 Bases (Mànega Major)',
    free_6nt: '6NT — 12 Bases (Petit Slam)',
    btn_deal_random: '🔀 Repartir nova mà',
    lbl_dealer: 'Dador:',
    dealer_s: 'Sud (Tu)',
    dealer_w: 'Oest',
    dealer_n: 'Nord (Company)',
    dealer_e: 'Est',
    btn_deal_tournament: '🔀 Repartir mà de torneig',
    btn_restart_deal: '🔄 Reiniciar mà',
    hud_mission: 'Missió Actual',
    hud_contract: 'Contracte en Joc',
    hud_target: 'Objectiu de Bases',
    hud_tricks_ns: 'Bases Nosaltres (NS)',
    hud_tricks_ew: 'Bases Rivals (EO)',
    hud_remain: 'Per Complir',
    hud_fulfilled: 'Complert!',
    hud_tricks_suffix: 'bases',
    hud_remaining_suffix: 'restants',
    seat_north: 'NORD (El Mort)',
    seat_south: 'SUD (Tu — Declarant)',
    seat_west: 'OEST (Defensa)',
    seat_east: 'EST (Defensa)',
    turn_your_south: '<strong>El teu torn a Sud:</strong> Fes clic en una carta per a jugar-la',
    turn_your_north: '<strong>El teu torn a Nord (El Mort):</strong> Com a declarant, tria quina carta jugar',
    turn_west_ai: '<em>Torn d\'Oest (Defensa)... pensant</em>',
    turn_east_ai: '<em>Torn d\'Est (Defensa)... pensant</em>',
    trick_won_by: 'Basa guanyada per: {player} amb {card}',
    hint_waiting: 'Esperant inici...',
    hint_hand_ended: 'La mà ha acabat.',
    hint_waiting_player: 'Esperant la jugada de {player}...',
    hint_lead_trump: '💡 Consell: En mans amb triomf convé destriomfar prompte als rivals.',
    hint_lead_general: '💡 Consell: Juga cap als honors de l\'altra mà o ataca un pal llarg.',
    hint_must_follow: '💡 Regla d\'Or: L\'eixida ha sigut {suit}. És obligatori assistir al pal!',
    hint_can_trump: '💡 Oportunitat: No tens {suit}. Pots jugar un triomf ({trump}) i tallar per a guanyar la basa!',
    hint_can_discard: '💡 Descart: No tens {suit}. Descarta la carta més baixa del teu pal feble.',
    auction_title: '🏛️ Subhasta Reglamentària (Caixa de Cants)',
    auction_dealer_info: 'Dador: <strong>{dealer}</strong> | Torn: <strong style="color:var(--gold-accent)">{turn}</strong>',
    sayc_box_title: '💡 ASISTENT PEDAGÒGIC SAYC (MAJOR CINQUÉ)',
    sayc_hcp_label: 'Els teus Punts d\'Honor (HCP):',
    sayc_dist_balanced: 'Mà Equilibrada',
    sayc_dist_unbalanced: 'Mà Desigual',
    sayc_rec_label: 'Veu recomanada SAYC:',
    col_west: 'OEST',
    col_north: 'NORD (COMPANY)',
    col_east: 'EST',
    col_south: 'SUD (TU)',
    bidding_box_title: 'Opcions de cantades (Nivells 1 al 7 i pals oficials)',
    bidding_your_turn: 'És el teu torn de cantar!',
    bidding_waiting_for: 'Esperant cant de {player}...',
    btn_pass: 'PAS (Pass)',
    btn_double: 'DOBLE (X)',
    btn_redouble: 'REDOBLE (XX)',
    call_pass: 'Pas',
    call_double: 'Doble',
    call_redouble: 'Redoble',
    suit_clubs: 'Trèvols',
    suit_diamonds: 'Diamants',
    suit_hearts: 'Cors',
    suit_spades: 'Piques',
    suit_nt: 'Sense Triomf',
    res_school_win: '🎉 CONTRACTE COMPLERT!',
    res_school_loss: '❌ CONTRACTE CAIGUT',
    res_overtricks: '+{n} bases de sobre',
    res_undertricks: '{n} bases per complir',
    res_lesson_mastered: 'Lliçó dominada:',
    res_tip: 'Consell:',
    res_btn_retry: '🔄 Reintentar mà',
    res_btn_next: '➡️ Següent Missió',
    res_tournament_win: '🏆 MÀ DE TORNEIG COMPLERTA!',
    res_tournament_loss: '❌ MÀ DE TORNEIG CAIGUDA',
    res_score_sheet_title: '📜 Full Oficial de Torneig Duplicat',
    res_score_contract_tricks: 'Bases contractades ({contract})',
    res_score_game_bonus: 'Bonificació de Mànega (Game)',
    res_score_partscore_bonus: 'Bonificació de Parcial',
    res_score_small_slam: 'Bonificació de Petit Slam (12 bases)',
    res_score_grand_slam: 'Bonificació de Gran Slam (13 bases)',
    res_score_overtricks: 'Sobrebases (+{n})',
    res_score_penalties: 'Multes per caiguda (-{n} bases)',
    res_score_total: 'Puntuació Total Duplicada',
    res_btn_next_deal: '🔀 Següent mà de torneig',
    modal_lang_title: '🌐 Seleccionar Idioma',
    modal_lang_sub: 'Tria la teua llengua per a tota l\'experiència del Bridge:'
  },

  eu: {
    code: 'eu',
    name: 'Euskara',
    flag: '🟩',
    native: 'Euskara',
    app_title: 'Klubeko Bridgea',
    app_subtitle: 'Karta-Joko Eskola & Txapelketa Ofiziala',
    mode_school: 'Joko Eskola',
    mode_freeplay: 'Mahaia Askea',
    mode_tournament: 'Txapelketa Aretoa (Enkantea & SAYC)',
    btn_rules: 'Nola jolasten da?',
    btn_rules_title: 'Ikasi Bridge arauak 2 minututan',
    btn_sound_title: 'Soinua (Aktibatu / Isilarazi)',
    btn_lang_title: 'Aukeratu hizkuntza',
    scenario_1: '1. Misioa: Nire lehen baza (1NT Triunforik Gabe)',
    scenario_2: '2. Misioa: Triunfoz moztea (2 Bihotz ♥)',
    scenario_3: '3. Misioa: Impasse-aren artea (3NT)',
    scenario_4: '4. Misioa: Palo luzea garatzea (4 Pika ♠)',
    scenario_5: '5. Misioa: Manga Nagusia Triunforik Gabe (3NT)',
    lbl_contract: 'Kontratua:',
    free_1nt: '1NT — 7 Baza (Triunforik Gabe)',
    free_2h: '2♥ — 8 Baza (Bihotzak)',
    free_3nt: '3NT — 9 Baza (Manga Triunforik Gabe)',
    free_4s: '4♠ — 10 Baza (Manga Nagusia)',
    free_6nt: '6NT — 12 Baza (Slam Txikia)',
    btn_deal_random: '🔀 Banatu esku berria',
    lbl_dealer: 'Banatzailea:',
    dealer_s: 'Hegoaldea (Zu)',
    dealer_w: 'Mendebaldea',
    dealer_n: 'Iparraldea (Kidea)',
    dealer_e: 'Ekialdea',
    btn_deal_tournament: '🔀 Banatu txapelketa-eskua',
    btn_restart_deal: '🔄 Berrabiarazi eskua',
    hud_mission: 'Uneko Misioa',
    hud_contract: 'Jokoan dagoen Kontratua',
    hud_target: 'Baza Helburua',
    hud_tricks_ns: 'Gure Bazak (HI)',
    hud_tricks_ew: 'Aurkarien Bazak (ME)',
    hud_remain: 'Betetzeko',
    hud_fulfilled: 'Bete da!',
    hud_tricks_suffix: 'baza',
    hud_remaining_suffix: 'falta dira',
    seat_north: 'IPARRALDEA (Hildakoa)',
    seat_south: 'HEGOALDEA (Zu — Deklaratzailea)',
    seat_west: 'MENDEBALDEA (Defentsa)',
    seat_east: 'EKIALDEA (Defentsa)',
    turn_your_south: '<strong>Zure txanda Hegoaldean:</strong> Egin klik karta batean jokatzeko',
    turn_your_north: '<strong>Zure txanda Iparraldean (Hildakoa):</strong> Aukeratu kidearen karta',
    turn_west_ai: '<em>Mendebaldearen txanda... pentsatzen</em>',
    turn_east_ai: '<em>Ekialdearen txanda... pentsatzen</em>',
    trick_won_by: 'Bazaren irabazlea: {player} ({card})',
    hint_waiting: 'Hasteko zain...',
    hint_hand_ended: 'Eskua amaitu da.',
    hint_waiting_player: '{player}-(r)en zain...',
    hint_lead_trump: '💡 Aholkua: Triunfozko eskuetan aurkarien triunfoak garbitzea komeni da.',
    hint_lead_general: '💡 Aholkua: Jokatu beste eskuko ohoreetara edo palo luze bat garatu.',
    hint_must_follow: '💡 Urrezko Araua: Irteera {suit} izan da. Paloari erantzutea derrigorrezkoa da!',
    hint_can_trump: '💡 Aukera: Ez duzu {suit}. Triunfo bat jokatu dezakezu ({trump}) mozteko!',
    hint_can_discard: '💡 Baztertzea: Ez duzu {suit}. Bota zure kartarik txarrena.',
    auction_title: '🏛️ Enkante Ofiziala (Bidding Box)',
    auction_dealer_info: 'Banatzailea: <strong>{dealer}</strong> | Txanda: <strong style="color:var(--gold-accent)">{turn}</strong>',
    sayc_box_title: '💡 SAYC IRAKASLEA (BOST KARTAKO MAJORRA)',
    sayc_hcp_label: 'Zure Ohore Puntuak (HCP):',
    sayc_dist_balanced: 'Esku Orekatua',
    sayc_dist_unbalanced: 'Esku Desorekatua',
    sayc_rec_label: 'Gomendatutako Deia:',
    col_west: 'MENDEBALDEA',
    col_north: 'IPARRALDEA (KIDEA)',
    col_east: 'EKIALDEA',
    col_south: 'HEGOALDEA (ZU)',
    bidding_box_title: 'Zure dei aukerak (1etik 7rako mailak eta paloak)',
    bidding_your_turn: 'Zure txanda da deitzeko!',
    bidding_waiting_for: '{player}-(r)en zain...',
    btn_pass: 'PASA (Pass)',
    btn_double: 'BIKOITZA (X)',
    btn_redouble: 'BIRBIKOITZA (XX)',
    call_pass: 'Pasa',
    call_double: 'Bikoitza',
    call_redouble: 'Birbikoitza',
    suit_clubs: 'Trebolak',
    suit_diamonds: 'Diamanteak',
    suit_hearts: 'Bihotzak',
    suit_spades: 'Pikak',
    suit_nt: 'Triunforik Gabe',
    res_school_win: '🎉 KONTRATUA BETE DA!',
    res_school_loss: '❌ KONTRATUA ERORI DA',
    res_overtricks: '+{n} gainbaza',
    res_undertricks: '{n} baza falta',
    res_lesson_mastered: 'Ikasitako ikasgaia:',
    res_tip: 'Aholkua:',
    res_btn_retry: '🔄 Berriro saiatu',
    res_btn_next: '➡️ Hurrengo Misioa',
    res_tournament_win: '🏆 TXAPELKETA ESKUA BETE DA!',
    res_tournament_loss: '❌ TXAPELKETA ESKUA ERORI DA',
    res_score_sheet_title: '📜 Txapelketa Orri Ofiziala',
    res_score_contract_tricks: 'Kontratuko bazak ({contract})',
    res_score_game_bonus: 'Manga Bonua',
    res_score_partscore_bonus: 'Partzialeko Bonua',
    res_score_small_slam: 'Slam Txikiaren Bonua (12 baza)',
    res_score_grand_slam: 'Slam Handiaren Bonua (13 baza)',
    res_score_overtricks: 'Gainbazak (+{n})',
    res_score_penalties: 'Erortze zigorrak (-{n} baza)',
    res_score_total: 'Guztizko Puntuazioa',
    res_btn_next_deal: '🔀 Hurrengo txapelketa-eskua',
    modal_lang_title: '🌐 Aukeratu Hizkuntza',
    modal_lang_sub: 'Aukeratu zure hizkuntza Bridge esperientziarako:'
  },

  gl: {
    code: 'gl',
    name: 'Galego',
    flag: '🟦',
    native: 'Galego',
    app_title: 'Bridge do Club',
    app_subtitle: 'Escola de Carteo & Torneo Oficial',
    mode_school: 'Escola de Carteo',
    mode_freeplay: 'Mesa de Salón Libre',
    mode_tournament: 'Salón de Torneo (Poxas & SAYC)',
    btn_rules: 'Como se xoga?',
    btn_rules_title: 'Aprende as regras do Bridge en 2 minutos',
    btn_sound_title: 'Son (Activar / Silenciar)',
    btn_lang_title: 'Seleccionar idioma',
    scenario_1: 'Misión 1: A miña primeira baza (Sen Triunfo 1NT)',
    scenario_2: 'Misión 2: Cortar con triunfo (2 Corazóns ♥)',
    scenario_3: 'Misión 3: A arte da impasse (3NT)',
    scenario_4: 'Misión 4: Promocionar un pau longo (4 Picas ♠)',
    scenario_5: 'Misión 5: Manga maior en Sen Triunfo (3NT)',
    lbl_contract: 'Contrato:',
    free_1nt: '1NT — 7 Bazas (Sen Triunfo)',
    free_2h: '2♥ — 8 Bazas (Corazóns)',
    free_3nt: '3NT — 9 Bazas (Manga Sen Triunfo)',
    free_4s: '4♠ — 10 Bazas (Manga Maior)',
    free_6nt: '6NT — 12 Bazas (Pequeno Slam)',
    btn_deal_random: '🔀 Repartir nova man',
    lbl_dealer: 'Dador:',
    dealer_s: 'Sur (Ti)',
    dealer_w: 'Oeste',
    dealer_n: 'Norte (Compañeiro)',
    dealer_e: 'Este',
    btn_deal_tournament: '🔀 Repartir man de torneo',
    btn_restart_deal: '🔄 Reiniciar man',
    hud_mission: 'Misión Actual',
    hud_contract: 'Contrato en Xogo',
    hud_target: 'Obxectivo de Bazas',
    hud_tricks_ns: 'Bazas Nós (NS)',
    hud_tricks_ew: 'Bazas Rivais (LO)',
    hud_remain: 'Para Cumprir',
    hud_fulfilled: 'Cumprido!',
    hud_tricks_suffix: 'bazas',
    hud_remaining_suffix: 'restantes',
    seat_north: 'NORTE (O Morto)',
    seat_south: 'SUR (Ti — Declarador)',
    seat_west: 'OESTE (Defensa)',
    seat_east: 'LESTE (Defensa)',
    turn_your_south: '<strong>A túa quenda en Sur:</strong> Clica nunha carta para xogala',
    turn_your_north: '<strong>A túa quenda en Norte (O Morto):</strong> Como declarador, elixe a carta do compañeiro',
    turn_west_ai: '<em>Quenda de Oeste (Defensa)... pensando</em>',
    turn_east_ai: '<em>Quenda de Leste (Defensa)... pensando</em>',
    trick_won_by: 'Baza gañada por: {player} con {card}',
    hint_waiting: 'Agardando inicio...',
    hint_hand_ended: 'A man rematou.',
    hint_waiting_player: 'Agardando a xogada de {player}...',
    hint_lead_trump: '💡 Consello: En mans con triunfo convén destriunfar axiña aos rivais.',
    hint_lead_general: '💡 Consello: Xoga cara aos honores da outra man ou ataca un pau longo.',
    hint_must_follow: '💡 Regra de Ouro: A saída foi {suit}. É obrigatorio asistir ao pau!',
    hint_can_trump: '💡 Oportunidade: Non tes {suit}. Podes xogar un triunfo ({trump}) e cortar para gañar a baza!',
    hint_can_discard: '💡 Descarte: Non tes {suit}. Descarta a carta máis baixa do teu pau feble.',
    auction_title: '🏛️ Poxa Regulamentaria (Caixa de Poxas)',
    auction_dealer_info: 'Dador: <strong>{dealer}</strong> | Quenda: <strong style="color:var(--gold-accent)">{turn}</strong>',
    sayc_box_title: '💡 TITOR SAYC (MAIOR QUINTO)',
    sayc_hcp_label: 'Os teus Puntos de Honor (HCP):',
    sayc_dist_balanced: 'Man Equilibrada',
    sayc_dist_unbalanced: 'Man Desigual',
    sayc_rec_label: 'Voz recomendada SAYC:',
    col_west: 'OESTE',
    col_north: 'NORTE (COMPAÑEIRO)',
    col_east: 'LESTE',
    col_south: 'SUR (TI)',
    bidding_box_title: 'Opcións de poxas (Niveis 1 ao 7 e paus oficiais)',
    bidding_your_turn: 'É a túa quenda de poxar!',
    bidding_waiting_for: 'Agardando poxa de {player}...',
    btn_pass: 'PASO (Pass)',
    btn_double: 'DOBRADO (X)',
    btn_redouble: 'REDOBRADO (XX)',
    call_pass: 'Paso',
    call_double: 'Dobrado',
    call_redouble: 'Redobrado',
    suit_clubs: 'Tréboles',
    suit_diamonds: 'Diamantes',
    suit_hearts: 'Corazóns',
    suit_spades: 'Picas',
    suit_nt: 'Sen Triunfo',
    res_school_win: '🎉 CONTRATO CUMPRIDO!',
    res_school_loss: '❌ CONTRATO CAÍDO',
    res_overtricks: '+{n} bazas de sobre',
    res_undertricks: '{n} bazas para cumprir',
    res_lesson_mastered: 'Lección dominada:',
    res_tip: 'Consello:',
    res_btn_retry: '🔄 Reintentar man',
    res_btn_next: '➡️ Seguinte Misión',
    res_tournament_win: '🏆 MAN DE TORNEO CUMPRIDA!',
    res_tournament_loss: '❌ MAN DE TORNEO CAÍDA',
    res_score_sheet_title: '📜 Folla Oficial de Torneo Duplicado',
    res_score_contract_tricks: 'Bazas contratadas ({contract})',
    res_score_game_bonus: 'Bonificación de Manga (Game)',
    res_score_partscore_bonus: 'Bonificación de Parcial',
    res_score_small_slam: 'Bonificación de Pequeno Slam (12 bazas)',
    res_score_grand_slam: 'Bonificación de Gran Slam (13 bazas)',
    res_score_overtricks: 'Sobrebazas (+{n})',
    res_score_penalties: 'Multas por caída (-{n} bazas)',
    res_score_total: 'Puntuación Total Duplicada',
    res_btn_next_deal: '🔀 Seguinte man de torneo',
    modal_lang_title: '🌐 Seleccionar Idioma',
    modal_lang_sub: 'Elixe a túa lingua para toda a experiencia do Bridge:'
  },

  ja: {
    code: 'ja',
    name: '日本語',
    flag: '🇯🇵',
    native: '日本語',
    app_title: 'クラブ・コントラクトブリッジ',
    app_subtitle: 'プレイ練習スクール & 公式トーナメントサロン',
    mode_school: 'プレイ練習スクール',
    mode_freeplay: 'フリーサロン卓',
    mode_tournament: 'トーナメント公式卓（ビディング & SAYC）',
    btn_rules: '遊び方ガイド',
    btn_rules_title: '2分でわかるコントラクトブリッジの公式ルール',
    btn_sound_title: 'サウンド（ON / OFF）',
    btn_lang_title: '言語を選択',
    scenario_1: 'ミッション1: 初めてのトリック（1NT ノートランプ）',
    scenario_2: 'ミッション2: 切り札で切る（2ハート ♥）',
    scenario_3: 'ミッション3: フィネスの技術（3NT）',
    scenario_4: 'ミッション4: ロングスーツの確立（4スペード ♠）',
    scenario_5: 'ミッション5: ノートランプのメジャーゲーム（3NT）',
    lbl_contract: 'コントラクト:',
    free_1nt: '1NT — 7トリック（ノートランプ）',
    free_2h: '2♥ — 8トリック（ハート）',
    free_3nt: '3NT — 9トリック（ゲーム ノートランプ）',
    free_4s: '4♠ — 10トリック（メジャーゲーム）',
    free_6nt: '6NT — 12トリック（スモールスラム）',
    btn_deal_random: '🔀 新しいハンドを配る',
    lbl_dealer: 'ディーラー:',
    dealer_s: '南（あなた）',
    dealer_w: '西',
    dealer_n: '北（パートナー）',
    dealer_e: '東',
    btn_deal_tournament: '🔀 トーナメント用ハンドを配る',
    btn_restart_deal: '🔄 ハンドをやり直す',
    hud_mission: '現在のミッション',
    hud_contract: '現在のコントラクト',
    hud_target: '目標トリック',
    hud_tricks_ns: '獲得トリック（南北）',
    hud_tricks_ew: '相手トリック（東西）',
    hud_remain: '達成まで',
    hud_fulfilled: '達成！',
    hud_tricks_suffix: 'トリック',
    hud_remaining_suffix: '残り',
    seat_north: '北（ダミー・パートナー）',
    seat_south: '南（あなた — ディクレアラー）',
    seat_west: '西（ディフェンダー）',
    seat_east: '東（ディフェンダー）',
    turn_your_south: '<strong>南（あなた）の手番:</strong> 手札をクリックしてプレイしてください',
    turn_your_north: '<strong>北（ダミー）の手番:</strong> ディクレアラーとしてパートナーのカードを選択してください',
    turn_west_ai: '<em>西（AI守備側）の手番... 考慮中</em>',
    turn_east_ai: '<em>東（AI守備側）の手番... 考慮中</em>',
    trick_won_by: 'トリック獲得者: {player}（{card}）',
    hint_waiting: '開始を待機中...',
    hint_hand_ended: 'ハンドが終了しました。',
    hint_waiting_player: '{player}の手番を待っています...',
    hint_lead_trump: '💡 戦術ヒント: 切り札コントラクトでは、序盤に相手の切り札を狩る（ドロー・トランプ）のが基本定石です。',
    hint_lead_general: '💡 戦術ヒント: 向かい側の絵札へ向かってプレイするか、長いスートを攻撃して勝手札を育てましょう。',
    hint_must_follow: '💡 マストフォローの鉄則: リードは{suit}です。同じスートのカードを持っていれば必ず出さなければなりません。',
    hint_can_trump: '💡 チャンス到来！: {suit}を持っていません。切り札（{trump}）を出してラフ（切る）すればトリックを奪えます！',
    hint_can_discard: '💡 ディスカード: {suit}を持っていません。最も弱い不要なカードを捨ててください。',
    auction_title: '🏛️ 公式オークション（ビディングボックス）',
    auction_dealer_info: 'ディーラー: <strong>{dealer}</strong> | ビッド番: <strong style="color:var(--gold-accent)">{turn}</strong>',
    sayc_box_title: '💡 SAYC戦術チューター（5枚メジャー標準システム）',
    sayc_hcp_label: 'あなたのハイカードポイント（HCP）:',
    sayc_dist_balanced: 'バランスハンド（均等型）',
    sayc_dist_unbalanced: 'アンバランスハンド（偏り型）',
    sayc_rec_label: 'SAYC推奨コール:',
    col_west: '西',
    col_north: '北（パートナー）',
    col_east: '東',
    col_south: '南（あなた）',
    bidding_box_title: 'ビディング選択肢（レベル1〜7 & 各スート）',
    bidding_your_turn: 'あなたのビッドの番です！',
    bidding_waiting_for: '{player}のコールを待っています...',
    btn_pass: 'パス (Pass)',
    btn_double: 'ダブル (X)',
    btn_redouble: 'リダブル (XX)',
    call_pass: 'パス',
    call_double: 'ダブル',
    call_redouble: 'リダブル',
    suit_clubs: 'クラブ',
    suit_diamonds: 'ダイヤ',
    suit_hearts: 'ハート',
    suit_spades: 'スペード',
    suit_nt: 'ノートランプ',
    res_school_win: '🎉 コントラクト達成！',
    res_school_loss: '❌ コントラクト失敗（ダウン）',
    res_overtricks: '+{n} オーバートリック',
    res_undertricks: '{n} トリック不足',
    res_lesson_mastered: 'マスターした戦術:',
    res_tip: '攻略アドバイス:',
    res_btn_retry: '🔄 もう一度挑戦',
    res_btn_next: '➡️ 次のミッション',
    res_tournament_win: '🏆 トーナメントディール達成！',
    res_tournament_loss: '❌ トーナメントディール失敗',
    res_score_sheet_title: '📜 公式デュプリケートスコアシート',
    res_score_contract_tricks: 'コントラクトトリック得点（{contract}）',
    res_score_game_bonus: 'ゲームボーナス',
    res_score_partscore_bonus: 'パートスコアボーナス',
    res_score_small_slam: 'スモールスラムボーナス（12トリック）',
    res_score_grand_slam: 'グランドスラムボーナス（13トリック）',
    res_score_overtricks: 'オーバートリック得点（+{n}）',
    res_score_penalties: 'ダウン罰点（-{n}トリック）',
    res_score_total: 'デュプリケート合計スコア',
    res_btn_next_deal: '🔀 次のトーナメントハンド',
    modal_lang_title: '🌐 言語を選択してください',
    modal_lang_sub: 'クラブ・コントラクトブリッジの言語を選択してください:'
  }
};

export const BRIDGE_RULES = {
  es: [
    {
      title: '1. ¿Qué es una Baza?',
      desc: 'En cada ronda, los 4 jugadores tiran una carta al centro en el sentido de las agujas del reloj. El que juegue la carta más alta gana la baza y se la lleva para su pareja. La mano consta de un total de <strong>13 bazas</strong>.'
    },
    {
      title: '2. La Regla de Oro: Asistir al Palo',
      desc: 'El primer jugador que tira carta marca el <strong>Palo de Salida</strong> (♠, ♥, ♦ o ♣). Los demás jugadores están <strong>obligados por reglamento a tirar una carta de ese mismo palo</strong> si tienen alguna en la mano.'
    },
    {
      title: '3. ¿Y si no tengo cartas de ese palo?',
      desc: 'Si no tienes cartas del palo jugado:<br>• Si hay palo de <strong>Triunfo</strong>, ¡puedes tirar un triunfo para <em>cortar</em> y ganar la baza!<br>• Si juegas en <strong>Sin Triunfo (NT)</strong> o prefieres guardar tus triunfos, puedes <em>descartar</em> cualquier carta que no te sirva.'
    },
    {
      title: '4. El Muerto (Tu Gran Compañero)',
      desc: 'Tú juegas en <strong>Sur</strong>. Al empezar el carteo, tu compañero de <strong>Norte (El Muerto)</strong> extiende todas sus cartas boca arriba sobre la mesa. <strong>Tú controlas tanto tus cartas como las del Muerto</strong> cuando le toque el turno. ¡Esto te permite armar jugadas maestras combinadas!'
    },
    {
      title: '5. El Contrato',
      desc: 'El contrato indica cuántas bazas por encima de 6 debes ganar:<br>• <strong>1NT</strong> = 6 + 1 = 7 bazas.<br>• <strong>2♥</strong> = 6 + 2 = 8 bazas.<br>• <strong>3NT</strong> = 6 + 3 = 9 bazas (Manga).<br>• <strong>4♠</strong> = 6 + 4 = 10 bazas (Manga mayor).'
    },
    {
      title: '6. La Subasta Oficial y el Bidding Box',
      desc: 'Antes de cartear, los jugadores subastan para fijar el contrato. Con el <strong>Asistente SAYC</strong> aprenderás a evaluar tus <strong>Puntos de Honor (HCP: As=4, Rey=3, Dama=2, Jota=1)</strong> y abrir en Mayor Quinto. Tres Pasos consecutivos sellan el contrato final.'
    }
  ],

  en: [
    {
      title: '1. What is a Trick?',
      desc: 'In each round, all 4 players play one card clockwise to the center. The highest card wins the trick for their partnership. A full deal consists of <strong>13 tricks</strong>.'
    },
    {
      title: '2. The Golden Rule: Follow Suit',
      desc: 'The opening player leads a card marking the <strong>Lead Suit</strong> (♠, ♥, ♦ or ♣). All other players are <strong>strictly required by rule to follow suit</strong> if they hold any card of that suit.'
    },
    {
      title: '3. What if you are void in that suit?',
      desc: 'If you have no cards of the led suit:<br>• In a <strong>Trump contract</strong>, you can play a trump to <em>ruff</em> and win the trick!<br>• In <strong>No Trump (NT)</strong> or if saving trumps, you may <em>discard</em> an unwanted card.'
    },
    {
      title: '4. The Dummy (Your Great Partner)',
      desc: 'You play in <strong>South</strong>. When play begins, your partner in <strong>North (The Dummy)</strong> lays all their cards face up on the table. <strong>You control both hands</strong>, planning cooperative masterstrokes!'
    },
    {
      title: '5. The Contract',
      desc: 'The contract states how many tricks over 6 you must win:<br>• <strong>1NT</strong> = 6 + 1 = 7 tricks.<br>• <strong>2♥</strong> = 6 + 2 = 8 tricks.<br>• <strong>3NT</strong> = 6 + 3 = 9 tricks (Game).<br>• <strong>4♠</strong> = 6 + 4 = 10 tricks (Major Game).'
    },
    {
      title: '6. The Official Auction & Bidding Box',
      desc: 'Before card play, players bid in turn. With the <strong>SAYC Tutor</strong> you will evaluate <strong>High Card Points (HCP: A=4, K=3, Q=2, J=1)</strong> and five-card majors. 3 consecutive passes seal the final contract.'
    }
  ],

  fr: [
    {
      title: '1. Qu\'est-ce qu\'une Levée ?',
      desc: 'À chaque tour, les 4 joueurs posent une carte au centre dans le sens horaire. La plus forte carte remporte la levée (le pli). Une donne compte <strong>13 levées</strong>.'
    },
    {
      title: '2. La Règle d\'Or : Fournir à la Couleur',
      desc: 'Le premier joueur entame et fixe la couleur. Tous les joueurs ont l\'<strong>obligation absolue de fournir à la couleur</strong> s\'ils en possèdent.'
    },
    {
      title: '3. Que faire si l\'on ne possède pas la couleur ?',
      desc: 'Si vous n\'avez pas de la couleur demandée :<br>• À l\'<strong>Atout</strong>, vous pouvez couper avec un atout pour remporter le pli !<br>• À <strong>Sans-Atout (SA)</strong>, vous défaussez une carte inutile.'
    },
    {
      title: '4. Le Mort (Votre Partenaire)',
      desc: 'Vous jouez en <strong>Sud</strong>. À l\'entame, votre partenaire en <strong>Nord (Le Mort)</strong> étale son jeu visible sur la table. <strong>Vous maniez les deux jeux</strong> pour exécuter votre plan de jeu !'
    },
    {
      title: '5. Le Contrat',
      desc: 'Le contrat indique le nombre de levées à réaliser au-delà de 6 :<br>• <strong>1SA</strong> = 7 levées.<br>• <strong>2♥</strong> = 8 levées.<br>• <strong>3SA</strong> = 9 levées (Manche).<br>• <strong>4♠</strong> = 10 levées (Manche majeure).'
    },
    {
      title: '6. Les Enchères Réglementaires',
      desc: 'Avant le jeu de la carte, les enchères déterminent le contrat. Le <strong>Tuteur SAYC</strong> calcule vos <strong>Points d\'Honneur (As=4, Roi=3, Dame=2, Valet=1)</strong> et applique la majeure cinquième. Trois passes consécutifs scellent le contrat.'
    }
  ],

  de: [
    {
      title: '1. Was ist ein Stich?',
      desc: 'In jeder Runde spielen die 4 Spieler im Uhrzeigersinn je eine Karte in die Mitte. Die höchste Karte gewinnt den Stich. Eine Hand besteht aus <strong>13 Stichen</strong>.'
    },
    {
      title: '2. Die goldene Regel: Farbe bedienen',
      desc: 'Die erste Karte bestimmt die ausgespielte Farbe. Alle Spieler <strong>müssen die Farbe bedienen</strong>, wenn sie eine Karte dieser Farbe besitzen.'
    },
    {
      title: '3. Was tun, wenn man die Farbe nicht hat?',
      desc: 'Wenn man die Farbe nicht bedienen kann:<br>• Bei <strong>Trumpf</strong> kann man mit einem Trumpf <em>stechen</em> und den Stich gewinnen!<br>• Bei <strong>Ohne Trumpf (NT)</strong> wirft man eine unbrauchbare Karte ab.'
    },
    {
      title: '4. Der Dummy (Dein Partner)',
      desc: 'Du spielst in <strong>Süd</strong>. Bei Spielbeginn legt der Partner in <strong>Nord (Dummy)</strong> alle Karten offen auf den Tisch. <strong>Du steuerst beide Hände</strong>!'
    },
    {
      title: '5. Der Kontrakt',
      desc: 'Der Kontrakt gibt an, wie viele Stiche über 6 erzielt werden müssen:<br>• <strong>1NT</strong> = 6 + 1 = 7 Stiche.<br>• <strong>2♥</strong> = 6 + 2 = 8 Stiche.<br>• <strong>3NT</strong> = 6 + 3 = 9 Stiche (Vollspiel).<br>• <strong>4♠</strong> = 6 + 4 = 10 Stiche (Vollspiel).'
    },
    {
      title: '6. Die offizielle Reizung',
      desc: 'Vor dem Kartenspiel reizen die Spieler. Der <strong>SAYC-Lehrer</strong> berechnet <strong>Figurenpunkte (Ass=4, König=3, Dame=2, Bube=1)</strong> und 5er-Majors. Drei aufeinanderfolgende Pässe besiegeln den Kontrakt.'
    }
  ],

  ca: [
    {
      title: '1. Què és una Basa?',
      desc: 'En cada ronda, els 4 jugadors tiren una carta al centre en sentit horari. Qui juga la carta més alta guanya la basa per a la parella. La mà consta de <strong>13 bases</strong>.'
    },
    {
      title: '2. La Regla d\'Or: Assistir al Pal',
      desc: 'El primer jugador marca el pal de sortida. La resta de jugadors estan <strong>obligats per reglament a assistir al pal</strong> si en tenen alguna carta a la mà.'
    },
    {
      title: '3. I si no tinc cartes d\'eix pal?',
      desc: 'Si no tens cartes del pal jugat:<br>• Amb <strong>Triomf</strong>, pots tirar un triomf per <em>tallar</em> i guanyar la basa!<br>• A <strong>Sense Triomf (NT)</strong>, pots descartar una carta que no et servisca.'
    },
    {
      title: '4. El Mort (El teu gran company)',
      desc: 'Tu jugues a <strong>Sud</strong>. En començar, el company de <strong>Nord (El Mort)</strong> estén les cartes de cara amunt. <strong>Tu controles ambdues mans</strong>!'
    },
    {
      title: '5. El Contracte',
      desc: 'El contracte indica les bases per damunt de 6 a aconseguir:<br>• <strong>1NT</strong> = 7 bases.<br>• <strong>2♥</strong> = 8 bases.<br>• <strong>3NT</strong> = 9 bases (Mànega).<br>• <strong>4♠</strong> = 10 bases (Mànega major).'
    },
    {
      title: '6. La Subhasta Oficial',
      desc: 'Abans de jugar, se subhasta el contracte. L\'<strong>Assistent SAYC</strong> calcula els <strong>Punts d\'Honor (HCP: As=4, Rei=3, Dama=2, Valet=1)</strong> i recomana la millor veu. Tres passos consecutius fixen el contracte.'
    }
  ],

  va: [
    {
      title: '1. Què és una Basa?',
      desc: 'En cada ronda, els 4 jugadors tiren una carta al centre en sentit horari. Qui juga la carta més alta guanya la basa per a la parella. La mà consta de <strong>13 bases</strong>.'
    },
    {
      title: '2. La Regla d\'Or: Assistir al Pal',
      desc: 'El primer jugador marca el pal d\'eixida. La resta de jugadors estan <strong>obligats per reglament a assistir al pal</strong> si en tenen a la mà.'
    },
    {
      title: '3. I si no tinc cartes d\'eixe pal?',
      desc: 'Si no tens cartes del pal jugat:<br>• Amb <strong>Triomf</strong>, pots jugar un triomf per a tallar i guanyar la basa!<br>• En <strong>Sense Triomf (NT)</strong>, descartes una carta inútil.'
    },
    {
      title: '4. El Mort (El teu gran company)',
      desc: 'Tu jugues en <strong>Sud</strong>. En començar, el company de <strong>Nord (El Mort)</strong> estén les seues cartes. <strong>Tu controles les dos mans</strong> per a guanyar!'
    },
    {
      title: '5. El Contracte',
      desc: 'El contracte indica les bases per damunt de 6:<br>• <strong>1NT</strong> = 7 bases.<br>• <strong>2♥</strong> = 8 bases.<br>• <strong>3NT</strong> = 9 bases (Mànega).<br>• <strong>4♠</strong> = 10 bases (Mànega major).'
    },
    {
      title: '6. La Subhasta Oficial',
      desc: 'Abans de cartejar, se subhasta el contracte. L\'<strong>Assistent SAYC</strong> avalua els <strong>Punts d\'Honor (As=4, Rei=3, Dama=2, Valet=1)</strong> i major cinqué.'
    }
  ],

  eu: [
    {
      title: '1. Zer da Baza bat?',
      desc: 'Erronda bakoitzean 4 jokalariek karta bana botatzen dute zentruan. Kartarik altuenak baza irabazten du. Esku batek <strong>13 baza</strong> ditu.'
    },
    {
      title: '2. Urrezko Araua: Paloari Erantzutea',
      desc: 'Lehen jokalariak irteera-paloa markatzen du. Gainerako jokalariak <strong>derrigortuta daude palo horretako karta botatzera</strong> baldin badute.'
    },
    {
      title: '3. Eta palo horretako kartarik ez badut?',
      desc: 'Palo horretako kartarik ez baduzu:<br>• <strong>Triunfo</strong> kontratuan, triunfo batekin moztu dezakezu baza eramateko!<br>• <strong>Triunforik Gabe (NT)</strong>, balio ez duen karta bat bota dezakezu.'
    },
    {
      title: '4. Hildakoa (Zure laguna)',
      desc: 'Zu <strong>Hegoaldean</strong> zaude. Jokoa hastean, <strong>Iparraldeak (Hildakoa)</strong> bere kartak mahai gainean irekitzen ditu. <strong>Zuk bi eskuak kontrolatzen dituzu</strong>!'
    },
    {
      title: '5. Kontratua',
      desc: 'Kontratuak 6tik gora zenbat baza irabazi behar dituzun dio:<br>• <strong>1NT</strong> = 7 baza.<br>• <strong>2♥</strong> = 8 baza.<br>• <strong>3NT</strong> = 9 baza (Manga).<br>• <strong>4♠</strong> = 10 baza (Manga nagusia).'
    },
    {
      title: '6. Enkante Ofiziala',
      desc: 'Jokatu aurretik enkantea egiten da. <strong>SAYC Irakasleak</strong> zure <strong>Ohore Puntuak (HCP: A=4, K=3, Q=2, J=1)</strong> kalkulatzen ditu.'
    }
  ],

  gl: [
    {
      title: '1. Que é unha Baza?',
      desc: 'En cada rolda, os 4 xogadores tiran unha carta ao centro no sentido horario. Quen xogue a máis alta gaña a baza. A man ten <strong>13 bazas</strong>.'
    },
    {
      title: '2. A Regra de Ouro: Asistir ao Pau',
      desc: 'O primeiro xogador marca o pau de saída. Os demais están <strong>obrigatoriamente obrigados a asistir ao mesmo pau</strong> se teñen cartas del.'
    },
    {
      title: '3. E se non teño cartas dese pau?',
      desc: 'Se non tes cartas dese pau:<br>• Con <strong>Triunfo</strong>, podes xogar un triunfo para cortar e gañar a baza!<br>• En <strong>Sen Triunfo (NT)</strong>, podes descartar unha carta que non che sirva.'
    },
    {
      title: '4. O Morto (O teu gran compañeiro)',
      desc: 'Ti xogas en <strong>Sur</strong>. Ao comezar, o compañeiro de <strong>Norte (O Morto)</strong> estende as cartas boca arriba. <strong>Ti manexas ambas as dúas mans</strong>!'
    },
    {
      title: '5. O Contrato',
      desc: 'O contrato indica cantas bazas por riba de 6 debes gañar:<br>• <strong>1NT</strong> = 7 bazas.<br>• <strong>2♥</strong> = 8 bazas.<br>• <strong>3NT</strong> = 9 bazas (Manga).<br>• <strong>4♠</strong> = 10 bazas (Manga maior).'
    },
    {
      title: '6. A Poxa Oficial',
      desc: 'Antes de cartear, celébrase a poxa. O <strong>Titor SAYC</strong> axúdache a calcular os <strong>Puntos de Honor (HCP: As=4, Rei=3, Dama=2, Valete=1)</strong>.'
    }
  ],

  ja: [
    {
      title: '1. トリックとは？',
      desc: '各ラウンドで4人のプレイヤーが時計回りにカードを1枚ずつ中央に出します。最も強いカードを出したプレイヤーがそのトリック（場札）を獲得します。1ディールは全部で<strong>13トリック</strong>です。'
    },
    {
      title: '2. マストフォローの鉄則（同じスートを出す義務）',
      desc: '最初に出されたカードが「リードスート」となります。他のプレイヤーは、そのスートのカードを手札に持っていれば<strong>必ずそのスートを出さなければならない</strong>絶対ルールがあります。'
    },
    {
      title: '3. リードスートの手札がないときは？',
      desc: '出されたスートを持たない場合：<br>• <strong>切り札（トランプ）</strong>がある契約なら、切り札を出してラフ（切る）すればトリックを奪えます！<br>• <strong>ノートランプ（NT）</strong>なら、不要な最も弱いカードを捨てます（ディスカード）。'
    },
    {
      title: '4. ダミー（頼もしいパートナー）',
      desc: 'あなたは<strong>南（ディクレアラー）</strong>です。オープニングリード後、パートナーの<strong>北（ダミー）</strong>は手札をすべてテーブル上に表向きで公開します。<strong>あなたは自分とダミーの2つの手を両方指揮します</strong>！'
    },
    {
      title: '5. コントラクト（契約）',
      desc: 'コントラクトは、6トリックに加えてあと何トリック勝つかを示します：<br>• <strong>1NT</strong> = 6 + 1 = 7トリック。<br>• <strong>2♥</strong> = 6 + 2 = 8トリック。<br>• <strong>3NT</strong> = 6 + 3 = 9トリック（ゲーム）。<br>• <strong>4♠</strong> = 6 + 4 = 10トリック（メジャーゲーム）。'
    },
    {
      title: '6. 公式オークションとビディングボックス',
      desc: 'プレイの前にビディング（競り）を行います。<strong>SAYC戦術チューター</strong>が手札の<strong>ハイカードポイント（HCP: A=4, K=3, Q=2, J=1）</strong>と5枚メジャールールを判定し、最適なコールを案内します。3連続パスで契約が確定します。'
    }
  ]
};

class BridgeI18nManager {
  constructor() {
    this.currentLang = this.detectLanguage();
  }

  detectLanguage() {
    // 1. URL param: ?lang=en
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && BRIDGE_I18N[langParam]) {
      return langParam;
    }

    // 2. localStorage
    const stored = localStorage.getItem('bridge_lang');
    if (stored && BRIDGE_I18N[stored]) {
      return stored;
    }

    // 3. Browser language
    const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase().split('-')[0];
    if (BRIDGE_I18N[navLang]) {
      return navLang;
    }

    return 'es'; // Por defecto
  }

  t(key, params = {}) {
    const dict = BRIDGE_I18N[this.currentLang] || BRIDGE_I18N['es'];
    let str = dict[key] || BRIDGE_I18N['es'][key] || key;

    for (const [pKey, pVal] of Object.entries(params)) {
      str = str.replace(new RegExp(`\\{${pKey}\\}`, 'g'), pVal);
    }
    return str;
  }

  getRules() {
    return BRIDGE_RULES[this.currentLang] || BRIDGE_RULES['es'];
  }

  setLanguage(lang) {
    if (!BRIDGE_I18N[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('bridge_lang', lang);

    // Actualizar atributos data-i18n en el DOM
    this.translateDOM();

    // Actualizar indicador en cabecera
    const codeEl = document.getElementById('current-lang-code');
    if (codeEl) {
      codeEl.textContent = lang.toUpperCase();
    }

    // Evento personalizado
    window.dispatchEvent(new CustomEvent('bridgeLanguageChanged', { detail: { lang } }));
  }

  translateDOM() {
    // Traducir textos
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        el.innerHTML = translation;
      }
    });

    // Traducir títulos (tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translation = this.t(key);
      if (translation) {
        el.setAttribute('title', translation);
      }
    });
  }
}

export const i18n = new BridgeI18nManager();

