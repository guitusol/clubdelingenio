/**
 * Internationalization (i18n) Module
 * Supports 9 languages matching the Club del Ingenio standard
 * (ES, EN, FR, DE, CA, VA, EU, GL, JA)
 */

export const I18N = {
  es: {
    app_title: "Cubo de Rubik 3D",
    app_subtitle: "Lógica Espacial & Competición",
    back_to_club: "Sede Central",
    mode_free: "Modo Libre",
    mode_timer: "Speedcubing WCA",
    mode_tutor: "Escuela del Cubo",
    mode_patterns: "Patrones & Arte",
    
    // Actions & Buttons
    btn_scramble: "Mezclar Cubo",
    btn_solve: "Resolver",
    btn_reset: "Reiniciar",
    btn_undo: "Deshacer",
    btn_redo: "Rehacer",
    btn_hint: "Pista / Tutor",
    btn_next_step: "Siguiente Paso",
    btn_auto_step: "Ejecutar Paso",
    
    // Speedcubing & Timer
    timer_ready: "Mantén pulsado Espacio / Pantalla",
    timer_holding: "¡Listo! Suelta para arrancar...",
    timer_running: "¡Resolviendo! Pulsa para detener",
    timer_inspection: "Inspección: ",
    stat_time: "Tiempo",
    stat_moves: "Movimientos",
    stat_tps: "Giros/s (TPS)",
    stat_best: "Mejor (PB)",
    stat_ao5: "Media de 5 (Ao5)",
    
    // Layers & Notation
    face_u: "Arriba (U)",
    face_d: "Abajo (D)",
    face_f: "Frente (F)",
    face_b: "Atrás (B)",
    face_l: "Izquierda (L)",
    face_r: "Derecha (R)",
    
    // Tutor Steps
    step_cross: "Paso 1: Cruz Blanca",
    step_cross_desc: "Forma una cruz blanca en la cara superior haciendo coincidir el lateral de cada arista con su centro correspondiente.",
    step_corners: "Paso 2: Esquinas de la 1ª Capa",
    step_corners_desc: "Coloca las 4 esquinas blancas en su posición correcta usando el algoritmo 'Sexy Move' (R U R' U').",
    step_middle: "Paso 3: Capa Media (Segunda Capa)",
    step_middle_desc: "Inserta las 4 aristas centrales sin color amarillo en su ranura izquierda o derecha.",
    step_yellow_cross: "Paso 4: Cruz Amarilla Superior",
    step_yellow_cross_desc: "Aplica el algoritmo F (R U R' U') F' para pasar de punto a línea o 'L', hasta obtener la cruz amarilla.",
    step_yellow_edges: "Paso 5: Orientar Aristas Amarillas",
    step_yellow_edges_desc: "Intercambia aristas superiores adyacentes para que sus colores coincidan con los centros laterales.",
    step_yellow_corners_pos: "Paso 6: Posicionar Esquinas Amarillas",
    step_yellow_corners_pos_desc: "Lleva cada esquina a su vértice correcto (aunque esté rotada) usando U R U' L' U R' U' L.",
    step_yellow_corners_orient: "Paso 7: Orientar Esquinas Finales",
    step_yellow_corners_orient_desc: "Aplica (R' D' R D) repetidamente hasta que el amarillo mire hacia arriba. ¡El cubo se resolverá!",
    step_solved: "¡Enhorabuena! Cubo 100% Resuelto",
    step_solved_desc: "Has completado con éxito todas las capas mediante lógica y deducción.",
    
    // Patterns
    pat_checkerboard: "Tablero de Ajedrez",
    pat_dots: "Puntos Centrales",
    pat_crosses: "Cruces Alternas",
    pat_cube_in_cube: "Cubo en el Cubo",
    
    // Modals
    help_title: "Guía de Manejo & Atajos",
    help_drag_cube: "Arrastra en el fondo para rotar la cámara en 3D.",
    help_drag_layer: "Toca y arrastra una cara del cubo para girar esa capa en esa dirección.",
    help_keys: "Teclas WCA: U, D, L, R, F, B (Mayús = antihorario). Espacio = Iniciar/Parar cronómetro.",
    btn_close: "Cerrar",
    
    // Toast & Alerts
    scrambled_msg: "¡Cubo mezclado aleatoriamente (20 giros WCA)!",
    solved_victory: "¡Extraordinario! ¡Has resuelto el Cubo de Rubik!"
  },
  
  en: {
    app_title: "3D Rubik's Cube",
    app_subtitle: "Spatial Logic & Competition",
    back_to_club: "Main Hub",
    mode_free: "Free Play",
    mode_timer: "WCA Speedcubing",
    mode_tutor: "Cube Academy",
    mode_patterns: "Patterns & Art",
    
    btn_scramble: "Scramble",
    btn_solve: "Solve",
    btn_reset: "Reset",
    btn_undo: "Undo",
    btn_redo: "Redo",
    btn_hint: "Hint / Tutor",
    btn_next_step: "Next Step",
    btn_auto_step: "Execute Step",
    
    timer_ready: "Hold Space / Touch screen",
    timer_holding: "Ready! Release to start...",
    timer_running: "Solving! Click/Tap to stop",
    timer_inspection: "Inspection: ",
    stat_time: "Time",
    stat_moves: "Moves",
    stat_tps: "Turns/sec (TPS)",
    stat_best: "Personal Best (PB)",
    stat_ao5: "Average of 5 (Ao5)",
    
    face_u: "Up (U)",
    face_d: "Down (D)",
    face_f: "Front (F)",
    face_b: "Back (B)",
    face_l: "Left (L)",
    face_r: "Right (R)",
    
    step_cross: "Step 1: White Cross",
    step_cross_desc: "Form a white cross on the top face, matching each edge's side color with its adjacent center.",
    step_corners: "Step 2: 1st Layer Corners",
    step_corners_desc: "Place the 4 white corners in their correct slots using the 'Sexy Move' (R U R' U').",
    step_middle: "Step 3: Middle Layer Edges",
    step_middle_desc: "Insert the 4 non-yellow middle edges into their proper left or right slots.",
    step_yellow_cross: "Step 4: Top Yellow Cross",
    step_yellow_cross_desc: "Apply F (R U R' U') F' to transition from dot to hook or bar, completing the yellow cross.",
    step_yellow_edges: "Step 5: Orient Yellow Edges",
    step_yellow_edges_desc: "Cycle adjacent top edges so each matches its lateral center color.",
    step_yellow_corners_pos: "Step 6: Permute Yellow Corners",
    step_yellow_corners_pos_desc: "Cycle corners to their correct vertices using U R U' L' U R' U' L.",
    step_yellow_corners_orient: "Step 7: Orient Final Corners",
    step_yellow_corners_orient_desc: "Apply (R' D' R D) repeatedly until the yellow face is complete. Solved!",
    step_solved: "Congratulations! Cube 100% Solved",
    step_solved_desc: "You have masterfully conquered the cube through spatial deduction.",
    
    pat_checkerboard: "Checkerboard",
    pat_dots: "Center Dots",
    pat_crosses: "Alternating Crosses",
    pat_cube_in_cube: "Cube in a Cube",
    
    help_title: "Controls & Hotkeys",
    help_drag_cube: "Drag background to orbit camera around the cube in 3D.",
    help_drag_layer: "Touch and drag directly on any sticker to rotate that layer in that direction.",
    help_keys: "WCA Keys: U, D, L, R, F, B (Shift = counter-clockwise). Spacebar = Start/Stop timer.",
    btn_close: "Close",
    
    scrambled_msg: "Cube randomly scrambled (20 WCA moves)!",
    solved_victory: "Outstanding! You solved the Rubik's Cube!"
  },

  ja: {
    app_title: "3D ルービックキューブ",
    app_subtitle: "空間論理 & スピードキュービング",
    back_to_club: "クラブ本部",
    mode_free: "フリープレイ",
    mode_timer: "WCAタイマー",
    mode_tutor: "キューブ教室",
    mode_patterns: "パターン模様",
    
    btn_scramble: "スクランブル",
    btn_solve: "揃える",
    btn_reset: "初期化",
    btn_undo: "元に戻す",
    btn_redo: "やり直す",
    btn_hint: "ヒント / 手順",
    btn_next_step: "次のステップ",
    btn_auto_step: "ステップ実行",
    
    timer_ready: "スペースキー / 画面を長押し",
    timer_holding: "準備完了！離してスタート...",
    timer_running: "計測中！タップで停止",
    timer_inspection: "インスペクション: ",
    stat_time: "タイム",
    stat_moves: "手手 (手数)",
    stat_tps: "回転/秒 (TPS)",
    stat_best: "自己ベスト (PB)",
    stat_ao5: "5回平均 (Ao5)",
    
    face_u: "上 (U)",
    face_d: "下 (D)",
    face_f: "前 (F)",
    face_b: "後 (B)",
    face_l: "左 (L)",
    face_r: "右 (R)",
    
    step_cross: "第1手: 白十字",
    step_cross_desc: "上面に白い十字を作り、各エッジの側面の色を隣接するセンターと一致させます。",
    step_corners: "第2手: 完全1層のコーナー",
    step_corners_desc: "基本手順（セクシームーブ: R U R' U'）を使い、白の4つの角を正しい位置に入れます。",
    step_middle: "第3手: 第2層のエッジ",
    step_middle_desc: "黄色を含まない4つのエッジを中段の正しいスロットに配置します。",
    step_yellow_cross: "第4手: 黄色十字",
    step_yellow_cross_desc: "F (R U R' U') F' を用いて上面に黄色い十字を作ります。",
    step_yellow_edges: "第5手: 黄色エッジの向き",
    step_yellow_edges_desc: "上面のエッジの位置を入れ替え、各側面の中央色と揃えます。",
    step_yellow_corners_pos: "第6手: 黄色コーナーの位置",
    step_yellow_corners_pos_desc: "U R U' L' U R' U' L を使って、各コーナーを正しい頂点に移動させます。",
    step_yellow_corners_orient: "第7手: 最終コーナーの向き",
    step_yellow_corners_orient_desc: "(R' D' R D) を繰り返して黄色を上面に向けます。完成です！",
    step_solved: "おめでとうございます！完全攻略！",
    step_solved_desc: "空間論理と思考力で見事にルービックキューブを解き明かしました。",
    
    pat_checkerboard: "市松模様（チェッカー）",
    pat_dots: "へそキューブ（センター入替）",
    pat_crosses: "交互十字",
    pat_cube_in_cube: "キューブ・イン・キューブ",
    
    help_title: "操作方法とショートカット",
    help_drag_cube: "背景をドラッグすると3D視点を自由に回転できます。",
    help_drag_layer: "キューブの面を直接ドラッグして、その方向に層を回転させます。",
    help_keys: "WCA記号キー: U, D, L, R, F, B (Shift = 反時計回り)。スペース = タイマー開始/停止。",
    btn_close: "閉じる",
    
    scrambled_msg: "公式20手でランダムにシャッフルしました！",
    solved_victory: "見事です！ルービックキューブをクリアしました！"
  },

  fr: {
    app_title: "Rubik's Cube 3D",
    app_subtitle: "Logique Spatiale & Compétition",
    back_to_club: "Siège Central",
    mode_free: "Mode Libre",
    mode_timer: "Speedcubing WCA",
    mode_tutor: "École du Cube",
    mode_patterns: "Motifs & Art",
    btn_scramble: "Mélanger",
    btn_solve: "Résoudre",
    btn_reset: "Réinitialiser",
    btn_undo: "Annuler",
    btn_redo: "Rétablir",
    btn_hint: "Indice / Tuteur",
    btn_next_step: "Étape Suivante",
    btn_auto_step: "Exécuter l'étape",
    timer_ready: "Maintenir Espace / Écran",
    timer_holding: "Prêt ! Relâchez pour lancer...",
    timer_running: "En cours ! Cliquez pour arrêter",
    timer_inspection: "Inspection : ",
    stat_time: "Temps",
    stat_moves: "Mouvements",
    stat_tps: "Tours/s (TPS)",
    stat_best: "Meilleur (PB)",
    stat_ao5: "Moyenne de 5 (Ao5)",
    face_u: "Haut (U)", face_d: "Bas (D)", face_f: "Face (F)", face_b: "Arrière (B)", face_l: "Gauche (L)", face_r: "Droite (R)",
    step_cross: "Étape 1 : Croix Blanche",
    step_cross_desc: "Formez une croix blanche en alignant chaque arête avec son centre adjacent.",
    step_corners: "Étape 2 : Coins de la 1ère Couronne",
    step_corners_desc: "Placez les 4 coins blancs grâce à la formule (R U R' U').",
    step_middle: "Étape 3 : Deuxième Couronne",
    step_middle_desc: "Insérez les arêtes centrales sans jaune dans leur emplacement gauche ou droit.",
    step_yellow_cross: "Étape 4 : Croix Jaune Supérieure",
    step_yellow_cross_desc: "Appliquez F (R U R' U') F' pour construire la croix jaune.",
    step_yellow_edges: "Étape 5 : Orienter les Arêtes Jaunes",
    step_yellow_edges_desc: "Échangez les arêtes adjacentes pour correspondre aux centres latéraux.",
    step_yellow_corners_pos: "Étape 6 : Placer les Coins Jaunes",
    step_yellow_corners_pos_desc: "Amenez chaque coin à son sommet avec U R U' L' U R' U' L.",
    step_yellow_corners_orient: "Étape 7 : Orienter les Coins Finaux",
    step_yellow_corners_orient_desc: "Répétez (R' D' R D) jusqu'à ce que le jaune soit orienté. Résolu !",
    step_solved: "Félicitations ! Cube 100% Résolu",
    step_solved_desc: "Vous avez brillamment conquis le cube par pure déduction.",
    pat_checkerboard: "Échiquier", pat_dots: "Points Centraux", pat_crosses: "Croix Alternées", pat_cube_in_cube: "Cube dans un Cube",
    help_title: "Commandes & Raccourcis",
    help_drag_cube: "Glissez sur le fond pour orbiter autour du cube en 3D.",
    help_drag_layer: "Touchez et glissez sur une étiquette pour faire tourner la couche correspondante.",
    help_keys: "Touches WCA : U, D, L, R, F, B (Maj = sens antihoraire). Espace = Chronomètre.",
    btn_close: "Fermer",
    scrambled_msg: "Cube mélangé aléatoirement (20 coups WCA) !",
    solved_victory: "Bravo ! Vous avez résolu le Rubik's Cube !"
  },

  de: {
    app_title: "3D Zauberwürfel",
    app_subtitle: "Räumliche Logik & Speedcubing",
    back_to_club: "Hauptzentrale",
    mode_free: "Freies Spiel",
    mode_timer: "WCA Speedcubing",
    mode_tutor: "Würfelschule",
    mode_patterns: "Muster & Kunst",
    btn_scramble: "Mischen",
    btn_solve: "Lösen",
    btn_reset: "Zurücksetzen",
    btn_undo: "Rückgängig",
    btn_redo: "Wiederholen",
    btn_hint: "Tipp / Tutor",
    btn_next_step: "Nächster Schritt",
    btn_auto_step: "Schritt ausführen",
    timer_ready: "Leertaste / Bildschirm gedrückt halten",
    timer_holding: "Bereit! Loslassen zum Starten...",
    timer_running: "Laufend! Tippen zum Stoppen",
    timer_inspection: "Inspektion: ",
    stat_time: "Zeit",
    stat_moves: "Züge",
    stat_tps: "Drehungen/s (TPS)",
    stat_best: "Persönliche Bestzeit (PB)",
    stat_ao5: "5er-Schnitt (Ao5)",
    face_u: "Oben (U)", face_d: "Unten (D)", face_f: "Vorne (F)", face_b: "Hinten (B)", face_l: "Links (L)", face_r: "Rechts (R)",
    step_cross: "Schritt 1: Weißes Kreuz",
    step_cross_desc: "Bilde ein weißes Kreuz und richte die Kantenfarben an den Zentren aus.",
    step_corners: "Schritt 2: Ecken der ersten Ebene",
    step_corners_desc: "Setze die 4 weißen Ecken mit dem 'Sexy Move' (R U R' U') ein.",
    step_middle: "Schritt 3: Mittlere Ebene",
    step_middle_desc: "Bringe die Kanten ohne Gelb in die mittlere Ebene ein.",
    step_yellow_cross: "Schritt 4: Gelbes Kreuz",
    step_yellow_cross_desc: "Wende F (R U R' U') F' an, um das gelbe Kreuz zu bilden.",
    step_yellow_edges: "Schritt 5: Gelbe Kanten ausrichten",
    step_yellow_edges_desc: "Passe die Kanten an ihre Seitenmitten an.",
    step_yellow_corners_pos: "Schritt 6: Gelbe Ecken positionieren",
    step_yellow_corners_pos_desc: "Platziere die Ecken mit U R U' L' U R' U' L an den richtigen Positionen.",
    step_yellow_corners_orient: "Schritt 7: Letzte Ecken drehen",
    step_yellow_corners_orient_desc: "Wiederhole (R' D' R D), bis alle gelben Flächen oben sind. Gelöst!",
    step_solved: "Herzlichen Glückwunsch! Würfel gelöst!",
    step_solved_desc: "Mit logischer Deduktion hast du den Zauberwürfel bezwungen.",
    pat_checkerboard: "Schachbrettmuster", pat_dots: "Mittelpunkte", pat_crosses: "Wechselkreuze", pat_cube_in_cube: "Würfel im Würfel",
    help_title: "Steuerung & Tastenkürzel",
    help_drag_cube: "Ziehe im Hintergrund, um die 3D-Kamera zu drehen.",
    help_drag_layer: "Tippe und ziehe eine Fläche, um die Ebene zu drehen.",
    help_keys: "WCA-Tasten: U, D, L, R, F, B (Umschalt = gegen Uhrzeigersinn). Leertaste = Stoppuhr.",
    btn_close: "Schließen",
    scrambled_msg: "Würfel nach WCA-Standard (20 Züge) gemischt!",
    solved_victory: "Großartig! Du hast den Zauberwürfel gelöst!"
  },

  ca: {
    app_title: "Cub de Rubik 3D",
    app_subtitle: "Lògica Espacial & Competició",
    back_to_club: "Seu Central",
    mode_free: "Mode Lliure",
    mode_timer: "Speedcubing WCA",
    mode_tutor: "Escola del Cub",
    mode_patterns: "Patrons & Art",
    btn_scramble: "Barrejar Cub",
    btn_solve: "Resoldre",
    btn_reset: "Reiniciar",
    btn_undo: "Desfer",
    btn_redo: "Refer",
    btn_hint: "Pista / Tutor",
    btn_next_step: "Següent Pas",
    btn_auto_step: "Executar Pas",
    timer_ready: "Mantingues premut Espai / Pantalla",
    timer_holding: "A punt! Deixa anar per començar...",
    timer_running: "Resolent! Clica per aturar",
    timer_inspection: "Inspecció: ",
    stat_time: "Temps",
    stat_moves: "Moviments",
    stat_tps: "Girs/s (TPS)",
    stat_best: "Millor (PB)",
    stat_ao5: "Mitjana de 5 (Ao5)",
    face_u: "Dalt (U)", face_d: "Baix (D)", face_f: "Front (F)", face_b: "Darrere (B)", face_l: "Esquerra (L)", face_r: "Dreta (R)",
    step_cross: "Pas 1: Creu Blanca",
    step_cross_desc: "Forma una creu blanca a la cara superior fent coincidir el lateral de cada aresta amb el seu centre.",
    step_corners: "Pas 2: Cantonades de la 1a Capa",
    step_corners_desc: "Col·loca les 4 cantonades blanques amb l'algorisme 'Sexy Move' (R U R' U').",
    step_middle: "Pas 3: Segona Capa (Mitjana)",
    step_middle_desc: "Insereix les 4 arestes centrals sense groc a la seva posició esquerra o dreta.",
    step_yellow_cross: "Pas 4: Creu Groga Superior",
    step_yellow_cross_desc: "Aplica F (R U R' U') F' per aconseguir la creu groga.",
    step_yellow_edges: "Pas 5: Orientar Arestes Grogues",
    step_yellow_edges_desc: "Intercanvia arestes superiors adjacents perquè coincideixin amb els centres.",
    step_yellow_corners_pos: "Pas 6: Posicionar Cantonades Grogues",
    step_yellow_corners_pos_desc: "Porta cada cantonada al seu vèrtex amb U R U' L' U R' U' L.",
    step_yellow_corners_orient: "Pas 7: Orientar Cantonades Finals",
    step_yellow_corners_orient_desc: "Aplica (R' D' R D) repetidament fins que el groc quedi a dalt. Resolut!",
    step_solved: "Enhorabona! Cub 100% Resolut",
    step_solved_desc: "Has completat amb èxit el cub amb lògica i destresa.",
    pat_checkerboard: "Tauler d'Escacs", pat_dots: "Punts Centrals", pat_crosses: "Creus Alternes", pat_cube_in_cube: "Cub en el Cub",
    help_title: "Guia de Control & Dreceres",
    help_drag_cube: "Arrossega pel fons per rotar la càmera 3D.",
    help_drag_layer: "Toca i arrossega una cara per girar la capa en aquesta direcció.",
    help_keys: "Tecles WCA: U, D, L, R, F, B (Maj = antihorari). Espai = Cronòmetre.",
    btn_close: "Tancar",
    scrambled_msg: "Cub barrejat aleatòriament (20 girs WCA)!",
    solved_victory: "Extraordinari! Has resolt el Cub de Rubik!"
  },

  va: {
    app_title: "Cub de Rubik 3D",
    app_subtitle: "Lògica Espacial & Competició",
    back_to_club: "Seu Central",
    mode_free: "Mode Lliure",
    mode_timer: "Speedcubing WCA",
    mode_tutor: "Escola del Cub",
    mode_patterns: "Patrons & Art",
    btn_scramble: "Mesclar Cub",
    btn_solve: "Resoldre",
    btn_reset: "Reiniciar",
    btn_undo: "Desfer",
    btn_redo: "Refer",
    btn_hint: "Pista / Tutor",
    btn_next_step: "Següent Pas",
    btn_auto_step: "Executar Pas",
    timer_ready: "Mantingues polsat Espai / Pantalla",
    timer_holding: "A punt! Solta per començar...",
    timer_running: "Resolent! Polsa per detindre",
    timer_inspection: "Inspecció: ",
    stat_time: "Temps",
    stat_moves: "Moviments",
    stat_tps: "Girs/s (TPS)",
    stat_best: "Millor (PB)",
    stat_ao5: "Mitjana de 5 (Ao5)",
    face_u: "Dalt (U)", face_d: "Baix (D)", face_f: "Front (F)", face_b: "Darrere (B)", face_l: "Esquerra (L)", face_r: "Dreta (R)",
    step_cross: "Pas 1: Creu Blanca",
    step_cross_desc: "Forma una creu blanca a la cara superior fent coincidir el lateral de cada aresta amb el seu centre.",
    step_corners: "Pas 2: Cantonades de la 1a Capa",
    step_corners_desc: "Col·loca les 4 cantonades blanques amb l'algorisme 'Sexy Move' (R U R' U').",
    step_middle: "Pas 3: Segona Capa (Mitjana)",
    step_middle_desc: "Insereix les 4 arestes centrals sense groc a la seua posició.",
    step_yellow_cross: "Pas 4: Creu Groga Superior",
    step_yellow_cross_desc: "Aplica F (R U R' U') F' per a aconseguir la creu groga.",
    step_yellow_edges: "Pas 5: Orientar Arestes Grogues",
    step_yellow_edges_desc: "Intercanvia arestes superiors adjacents perquè coincidisquen amb els centres.",
    step_yellow_corners_pos: "Pas 6: Posicionar Cantonades Grogues",
    step_yellow_corners_pos_desc: "Porta cada cantonada al seu vèrtex amb U R U' L' U R' U' L.",
    step_yellow_corners_orient: "Pas 7: Orientar Cantonades Finals",
    step_yellow_corners_orient_desc: "Aplica (R' D' R D) repetidament fins que el groc quede a dalt. Resolori!",
    step_solved: "Enhorabona! Cub 100% Resolt",
    step_solved_desc: "Has completat amb èxit el cub amb pura lògica.",
    pat_checkerboard: "Tauler d'Escacs", pat_dots: "Punts Centrals", pat_crosses: "Creus Alternes", pat_cube_in_cube: "Cub en el Cub",
    help_title: "Guia de Control & Dreceres",
    help_drag_cube: "Arrossega pel fons per a rotar la càmera 3D.",
    help_drag_layer: "Toca i arrossega una cara per a girar la capa en eixa direcció.",
    help_keys: "Tecles WCA: U, D, L, R, F, B (Maj = antihorari). Espai = Cronòmetre.",
    btn_close: "Tancar",
    scrambled_msg: "Cub mesclat aleatòriament (20 girs WCA)!",
    solved_victory: "Extraordinari! Has resolt el Cub de Rubik!"
  },

  eu: {
    app_title: "Rubik Kuboa 3D",
    app_subtitle: "Espazio Logika & Speedcubing",
    back_to_club: "Egoitza Nagusia",
    mode_free: "Joko Askea",
    mode_timer: "WCA Kronometroa",
    mode_tutor: "Kuboaren Eskola",
    mode_patterns: "Ereduak eta Artea",
    btn_scramble: "Nahastu",
    btn_solve: "Ebatzi",
    btn_reset: "Berrezarri",
    btn_undo: "Desegin",
    btn_redo: "Berregin",
    btn_hint: "Aholkua / Tutorea",
    btn_next_step: "Hurrengo Urratsa",
    btn_auto_step: "Urratsa Exekutatu",
    timer_ready: "Mantendu Zuriunea / Pantaila sakatuta",
    timer_holding: "Prest! Askatu hasteko...",
    timer_running: "Ebasten! Ukitu gelditzeko",
    timer_inspection: "Ikuskapena: ",
    stat_time: "Denbora",
    stat_moves: "Mugimenduak",
    stat_tps: "Bira/s (TPS)",
    stat_best: "Onena (PB)",
    stat_ao5: "5en Batez Bestekoa (Ao5)",
    face_u: "Gora (U)", face_d: "Behera (D)", face_f: "Aurrera (F)", face_b: "Atzera (B)", face_l: "Ezkerra (L)", face_r: "Eskuina (R)",
    step_cross: "1. Urratsa: Gurutze Zuria",
    step_cross_desc: "Goiko aurpegian gurutze zuri bat sortu ertzetako koloreak zentroekin bat etorriz.",
    step_corners: "2. Urratsa: 1. Geruzako Izkina Zuriak",
    step_corners_desc: "Kokatu 4 izkin zuriak 'Sexy Move' algoritmoa (R U R' U') erabiliz.",
    step_middle: "3. Urratsa: Erdiko Geruza",
    step_middle_desc: "Txertatu horirik gabeko 4 ertzak dagokien zirrikituan.",
    step_yellow_cross: "4. Urratsa: Goiko Gurutze Horia",
    step_yellow_cross_desc: "Erabili F (R U R' U') F' gurutze horia lortzeko.",
    step_yellow_edges: "5. Urratsa: Ertz Horiak Orientatu",
    step_yellow_edges_desc: "Trukatu ondoko ertzak koloreak alboko zentroekin bat etor daitezen.",
    step_yellow_corners_pos: "6. Urratsa: Izkin Horiak Kokatu",
    step_yellow_corners_pos_desc: "Eraman izkina bakoitza bere erpinera U R U' L' U R' U' L bidez.",
    step_yellow_corners_orient: "7. Urratsa: Azken Izkinak Orientatu",
    step_yellow_corners_orient_desc: "Aplikatu (R' D' R D) behin eta berriz horia gora begira egon arte. Ebatzita!",
    step_solved: "Zorionak! Kuboa %100 Ebatzita",
    step_solved_desc: "Trebetasun eta logika espazialarekin lortu duzu.",
    pat_checkerboard: "Xake Taula", pat_dots: "Erdiko Puntuak", pat_crosses: "Txandakako Gurutzeak", pat_cube_in_cube: "Kuboa Kuboan",
    help_title: "Kontrolak eta Lasterbideak",
    help_drag_cube: "Arrastatu atzealdean kamera 3Dn biratzeko.",
    help_drag_layer: "Ukitu eta arrastatu aurpegia geruza biratzeko.",
    help_keys: "WCA teklak: U, D, L, R, F, B (Shift = erlojuaren kontra). Zuriunea = Kronometroa.",
    btn_close: "Itxi",
    scrambled_msg: "Kuboa ausaz nahastuta (20 mugimendu)!",
    solved_victory: "Bikain! Rubik Kuboa ebatzi duzu!"
  },

  gl: {
    app_title: "Cubo de Rubik 3D",
    app_subtitle: "Lóxica Espacial & Competición",
    back_to_club: "Sede Central",
    mode_free: "Modo Libre",
    mode_timer: "Speedcubing WCA",
    mode_tutor: "Escola do Cubo",
    mode_patterns: "Patróns & Arte",
    btn_scramble: "Mesturar Cubo",
    btn_solve: "Resolver",
    btn_reset: "Reiniciar",
    btn_undo: "Desfacer",
    btn_redo: "Refacer",
    btn_hint: "Pista / Titor",
    btn_next_step: "Seguinte Paso",
    btn_auto_step: "Executar Paso",
    timer_ready: "Manteña premido Espazo / Pantalla",
    timer_holding: "Listo! Solte para arrincar...",
    timer_running: "Resolvendo! Prema para deter",
    timer_inspection: "Inspección: ",
    stat_time: "Tempo",
    stat_moves: "Movementos",
    stat_tps: "Xiros/s (TPS)",
    stat_best: "Mellor (PB)",
    stat_ao5: "Media de 5 (Ao5)",
    face_u: "Arriba (U)", face_d: "Abaixo (D)", face_f: "Fronte (F)", face_b: "Atrás (B)", face_l: "Esquerda (L)", face_r: "Dereita (R)",
    step_cross: "Paso 1: Cruz Branca",
    step_cross_desc: "Forma unha cruz branca na cara superior facendo coincidir cada aresta co seu centro.",
    step_corners: "Paso 2: Cantos da 1ª Capa",
    step_corners_desc: "Coloca os 4 cantos brancos co algoritmo 'Sexy Move' (R U R' U').",
    step_middle: "Paso 3: Segunda Capa (Media)",
    step_middle_desc: "Insire as 4 arestas centrais sen amarelo no seu lugar.",
    step_yellow_cross: "Paso 4: Cruz Amarela Superior",
    step_yellow_cross_desc: "Aplica F (R U R' U') F' para obter a cruz amarela.",
    step_yellow_edges: "Paso 5: Orientar Arestas Amarelas",
    step_yellow_edges_desc: "Intercambia arestas superiores para cadrar cos centros laterais.",
    step_yellow_corners_pos: "Paso 6: Posicionar Cantos Amarelos",
    step_yellow_corners_pos_desc: "Leva cada canto ao seu vértice con U R U' L' U R' U' L.",
    step_yellow_corners_orient: "Paso 7: Orientar Cantos Finais",
    step_yellow_corners_orient_desc: "Aplica (R' D' R D) repetidamente ata que o amarelo mire arriba. Resolto!",
    step_solved: "Parabéns! Cubo 100% Resolto",
    step_solved_desc: "Completaches con éxito o cubo con lóxica e precisión.",
    pat_checkerboard: "Taboleiro de Xadrez", pat_dots: "Puntos Centrais", pat_crosses: "Cruces Alternas", pat_cube_in_cube: "Cubo no Cubo",
    help_title: "Guía de Manexo & Atallos",
    help_drag_cube: "Arrastra polo fondo para xirar a cámara 3D.",
    help_drag_layer: "Toca e arrastra unha cara para xirar a capa nesa dirección.",
    help_keys: "Teclas WCA: U, D, L, R, F, B (Maiús = antihorario). Espazo = Cronómetro.",
    btn_close: "Pechar",
    scrambled_msg: "Cubo mesturado ao chou (20 movementos WCA)!",
    solved_victory: "Extraordinario! Resolviches o Cubo de Rubik!"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = this.detectLanguage();
  }

  detectLanguage() {
    // 1. URL parameter ?lang=
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang && I18N[urlLang]) return urlLang;

    // 2. Central Club del Ingenio localStorage
    const saved = localStorage.getItem('club_ingenio_lang') || localStorage.getItem('club_rubik_lang');
    if (saved && I18N[saved]) return saved;

    // 3. Browser language
    const navLang = (navigator.language || 'es').slice(0, 2).toLowerCase();
    if (I18N[navLang]) return navLang;

    return 'es';
  }

  setLanguage(lang) {
    if (!I18N[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('club_ingenio_lang', lang);
    localStorage.setItem('club_rubik_lang', lang);
    this.applyTranslations();
  }

  t(key) {
    const dict = I18N[this.currentLang] || I18N['es'];
    return dict[key] || I18N['es'][key] || key;
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      if (text) {
        if (el.tagName === 'INPUT' && el.type === 'button') {
          el.value = text;
        } else {
          el.textContent = text;
        }
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const text = this.t(key);
      if (text) el.title = text;
    });

    // Update language badge code in header if present
    const langCodeEl = document.getElementById('current-lang-code');
    if (langCodeEl) langCodeEl.textContent = this.currentLang.toUpperCase();

    // Update active highlight in language modal buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLang);
    });

    // Update html lang attribute
    document.documentElement.lang = this.currentLang;
  }
}

export const i18n = new I18nManager();
