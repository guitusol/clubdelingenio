/**
 * DEDUCCIÓN LÓGICA — Banco Oficial de Expedientes y Enigmas
 * 9 Idiomas Oficiales de Club del Ingenio (ES, EN, FR, DE, CA, VA, EU, GL, JA)
 */

const LOGIC_CASES = [
  // =========================================================================
  // CASO 1: LA LLAVE DE LA BIBLIOTECA ANTIGUA (Iniciación - 3x3x3)
  // =========================================================================
  {
    id: "caso_1",
    difficulty: "facil",
    title_es: "La Llave de la Biblioteca Antigua",
    title_en: "The Key of the Ancient Library",
    title_fr: "La Clé de la Bibliothèque Ancienne",
    title_de: "Der Schlüssel der Alten Bibliothek",
    title_ca: "La Clau de la Biblioteca Antiga",
    title_va: "La Clau de la Biblioteca Antiga",
    title_eu: "Liburutegi Zaharreko Giltza",
    title_gl: "A Chave da Biblioteca Antiga",
    title_ja: "古き図書館の鍵",

    intro_es: "En una tarde de lluvia en el Club del Ingenio, tres distinguidos miembros (Lord Henry, Baronesa Dupuis y el Doctor Aris) fueron vistos en tres salas distintas con tres objetos históricos. ¿Quién estuvo dónde y qué objeto llevaba?",
    intro_en: "On a rainy afternoon at Club del Ingenio, three distinguished members (Lord Henry, Baroness Dupuis, and Doctor Aris) were seen in three different rooms with three historic items. Who was where and what did they carry?",
    intro_fr: "Par un après-midi pluvieux au Club del Ingenio, trois membres distingués (Lord Henry, la baronne Dupuis et le docteur Aris) ont été aperçus dans trois salles avec trois objets historiques. Qui était où et quel objet portait-il ?",
    intro_de: "An einem regnerischen Nachmittag im Club del Ingenio wurden drei angesehene Mitglieder (Lord Henry, Baronesse Dupuis und Doktor Aris) in drei verschiedenen Räumen mit drei historischen Objekten gesehen. Wer war wo und was trug er bei sich?",
    intro_ca: "En una tarda plujosa al Club de l'Enginy, tres distingits membres (Lord Henry, la Baronessa Dupuis i el Doctor Aris) van ser vistos a tres sales diferents amb tres objectes històrics. Qui va ser on i quin objecte duia?",
    intro_va: "En una vesprada plujosa al Club de l'Enginy, tres distingits membres (Lord Henry, la Baronessa Dupuis i el Doctor Aris) van ser vistos en tres sales diferents amb tres objectes històrics. Qui va estar on i quin objecte duia?",
    intro_eu: "Arratsalde euritsu batean Ingenio Klubean, hiru kide ospetsu (Lord Henry, Dupuis Baronesa eta Aris Doktorea) hiru gela desberdinetan ikusi zituzten hiru objektu historikorekin. Nor egon zen non eta zer objektu zeraman?",
    intro_gl: "Nunha tarde de choiva no Club do Enxeño, tres distinguidos membros (Lord Henry, a Baronesa Dupuis e o Doutor Aris) foron vistos en tres salas distintas con tres obxectos históricos. Quen estivo onde e que obxecto levaba?",
    intro_ja: "ある雨の午後、クラブ・デル・インヘニオにて、3名の名誉会員（ヘンリー卿、デュピュイ男爵夫人、アリス医師）が3つの別々の部屋で歴史的遺物と共に目撃されました。誰がどの部屋でどの品を持っていたのでしょうか？",

    categories: [
      {
        id: "person",
        name_es: "Miembro",
        name_en: "Member",
        name_fr: "Membre",
        name_de: "Mitglied",
        name_ca: "Membre",
        name_va: "Membre",
        name_eu: "Kidea",
        name_gl: "Membro",
        name_ja: "会員",
        items: [
          {
            id: "henry",
            name_es: "Lord Henry", name_en: "Lord Henry", name_fr: "Lord Henry", name_de: "Lord Henry",
            name_ca: "Lord Henry", name_va: "Lord Henry", name_eu: "Lord Henry", name_gl: "Lord Henry",
            name_ja: "ヘンリー卿", icon: "🎩"
          },
          {
            id: "dupuis",
            name_es: "Baronesa Dupuis", name_en: "Baroness Dupuis", name_fr: "Baronne Dupuis", name_de: "Baronesse Dupuis",
            name_ca: "Baronessa Dupuis", name_va: "Baronessa Dupuis", name_eu: "Dupuis Baronesa", name_gl: "Baronesa Dupuis",
            name_ja: "デュピュイ夫人", icon: "👑"
          },
          {
            id: "aris",
            name_es: "Doctor Aris", name_en: "Doctor Aris", name_fr: "Docteur Aris", name_de: "Doktor Aris",
            name_ca: "Doctor Aris", name_va: "Doctor Aris", name_eu: "Aris Doktorea", name_gl: "Doutor Aris",
            name_ja: "アリス医師", icon: "🩺"
          }
        ]
      },
      {
        id: "room",
        name_es: "Estancia",
        name_en: "Room",
        name_fr: "Pièce",
        name_de: "Raum",
        name_ca: "Estança",
        name_va: "Estança",
        name_eu: "Gela",
        name_gl: "Estadía",
        name_ja: "部屋",
        items: [
          {
            id: "biblioteca",
            name_es: "Biblioteca", name_en: "Library", name_fr: "Bibliothèque", name_de: "Bibliothek",
            name_ca: "Biblioteca", name_va: "Biblioteca", name_eu: "Liburutegia", name_gl: "Biblioteca",
            name_ja: "図書館", icon: "📚"
          },
          {
            id: "observatorio",
            name_es: "Observatorio", name_en: "Observatory", name_fr: "Observatoire", name_de: "Observatorium",
            name_ca: "Observatori", name_va: "Observatori", name_eu: "Behatokia", name_gl: "Observatorio",
            name_ja: "天文台", icon: "🔭"
          },
          {
            id: "bodega",
            name_es: "Bodega Noble", name_en: "Wine Cellar", name_fr: "Cave Noble", name_de: "Weinkeller",
            name_ca: "Celler Noble", name_va: "Celler Noble", name_eu: "Upategia", name_gl: "Adega Nobre",
            name_ja: "ワインセラー", icon: "🍷"
          }
        ]
      },
      {
        id: "item",
        name_es: "Reliquia",
        name_en: "Relic",
        name_fr: "Relique",
        name_de: "Relikt",
        name_ca: "Relíquia",
        name_va: "Relíquia",
        name_eu: "Erlikia",
        name_gl: "Reliquia",
        name_ja: "遺物",
        items: [
          {
            id: "reloj",
            name_es: "Reloj de Oro", name_en: "Gold Watch", name_fr: "Montre en Or", name_de: "Golduhr",
            name_ca: "Rellotge d'Or", name_va: "Rellotge d'Or", name_eu: "Urrezko Erlojua", name_gl: "Reloxo de Ouro",
            name_ja: "金の懐中時計", icon: "⏱️"
          },
          {
            id: "llave",
            name_es: "Llave de Plata", name_en: "Silver Key", name_fr: "Clé en Argent", name_de: "Silberschlüssel",
            name_ca: "Clau de Plata", name_va: "Clau de Plata", name_eu: "Zilarrezko Giltza", name_gl: "Chave de Prata",
            name_ja: "銀の鍵", icon: "🗝️"
          },
          {
            id: "manuscrito",
            name_es: "Manuscrito", name_en: "Manuscript", name_fr: "Manuscrit", name_de: "Manuskript",
            name_ca: "Manuscrit", name_va: "Manuscrit", name_eu: "Eskuizkribua", name_gl: "Manuscrito",
            name_ja: "古文書", icon: "📜"
          }
        ]
      }
    ],

    clues: [
      {
        id: "c1",
        text_es: "El Doctor Aris estuvo en el Observatorio estudiando los astros.",
        text_en: "Doctor Aris was in the Observatory studying the stars.",
        text_fr: "Le docteur Aris était à l'Observatoire pour étudier les astres.",
        text_de: "Doktor Aris war im Observatorium und beobachtete die Sterne.",
        text_ca: "El Doctor Aris va ser a l'Observatori estudiant els astres.",
        text_va: "El Doctor Aris va estar a l'Observatori estudiant els astres.",
        text_eu: "Aris Doktorea Behatokian egon zen astroak aztertzen.",
        text_gl: "O Doutor Aris estivo no Observatorio estudando os astros.",
        text_ja: "アリス医師は天文台で星々を観察していました。"
      },
      {
        id: "c2",
        text_es: "Quien tenía la Llave de Plata se encontraba en la Biblioteca.",
        text_en: "The person holding the Silver Key was in the Library.",
        text_fr: "La personne qui possédait la Clé en Argent se trouvait dans la Bibliothèque.",
        text_de: "Wer den Silberschlüssel besaß, befand sich in der Bibliothek.",
        text_ca: "Qui tenia la Clau de Plata es trobava a la Biblioteca.",
        text_va: "Qui tenia la Clau de Plata es trobava a la Biblioteca.",
        text_eu: "Zilarrezko Giltza zuena Liburutegian zegoen.",
        text_gl: "Quen tiña a Chave de Prata atopábase na Biblioteca.",
        text_ja: "銀の鍵を持っていた者は図書館にいました。"
      },
      {
        id: "c3",
        text_es: "Lord Henry jamás ha llevado consigo el Manuscrito antiguo.",
        text_en: "Lord Henry has never carried the ancient Manuscript.",
        text_fr: "Lord Henry n'a jamais porté sur lui l'ancien Manuscrit.",
        text_de: "Lord Henry hat das alte Manuskript niemals bei sich getragen.",
        text_ca: "Lord Henry mai ha dut amb ell el Manuscrit antic.",
        text_va: "Lord Henry mai ha portat amb ell el Manuscrit antic.",
        text_eu: "Lord Henryk ez du inoiz berekin Eskuizkribu zaharra eraman.",
        text_gl: "Lord Henry xamais levou consigo o Manuscrito antigo.",
        text_ja: "ヘンリー卿は古文書を一度も所持したことがありません。"
      },
      {
        id: "c4",
        text_es: "La persona con el Reloj de Oro no bajó a la Bodega Noble.",
        text_en: "The person with the Gold Watch did not go down to the Wine Cellar.",
        text_fr: "La personne portant la Montre en Or n'est pas descendue à la Cave Noble.",
        text_de: "Die Person mit der Golduhr stieg nicht in den Weinkeller hinab.",
        text_ca: "La persona amb el Rellotge d'Or no va baixar al Celler Noble.",
        text_va: "La persona amb el Rellotge d'Or no va baixar al Celler Noble.",
        text_eu: "Urrezko Erlojua zuen pertsona ez zen Upategira jaitsi.",
        text_gl: "A persoa co Reloxo de Ouro non baixou á Adega Nobre.",
        text_ja: "金の懐中時計を持っていた者はワインセラーには降りませんでした。"
      }
    ],

    solution: {
      henry: { room: "bodega", item: "llave" },
      dupuis: { room: "biblioteca", item: "manuscrito" },
      aris: { room: "observatorio", item: "reloj" }
    }
  },

  // =========================================================================
  // CASO 2: EL GRAN TORNEO DE AJEDREZ (Medio - 4x4x4)
  // =========================================================================
  {
    id: "caso_2",
    difficulty: "medio",
    title_es: "El Enigma del Torneo de Ajedrez",
    title_en: "The Chess Tournament Enigma",
    title_fr: "L'Énigme du Tournoi d'Échecs",
    title_de: "Das Schachturnier-Rätsel",
    title_ca: "L'Enigma del Torneig d'Escacs",
    title_va: "L'Enigma del Torneig d'Escacs",
    title_eu: "Xake Txapelketako Enigma",
    title_gl: "O Enigma do Torneo de Xadrez",
    title_ja: "チェス大会の謎",

    intro_es: "Cuatro maestros internacionales de ajedrez (Guillermo, Magnus, Judith y Nakamura) se alojaron en 4 hoteles de lujo y bebieron su infusión favorita antes de la gran partida final. ¿Qué consumió cada gran maestro?",
    intro_en: "Four international chess grandmasters (Guillermo, Magnus, Judith, and Nakamura) stayed in 4 luxury hotels and had their favorite beverage before the final match. What did each grandmaster have?",
    intro_fr: "Quatre grands maîtres internationaux d'échecs (Guillermo, Magnus, Judith et Nakamura) ont séjourné dans 4 hôtels de luxe et bu leur boisson préférée avant la finale. Qu'a consommé chaque grand maître ?",
    intro_de: "Vier internationale Schach-Großmeister (Guillermo, Magnus, Judith und Nakamura) logierten in 4 Luxushotels und tranken vor dem großen Finale ihr Lieblingsgetränk. Was trank jeder Meister?",
    intro_ca: "Quatre mestres internacionals d'escacs (Guillermo, Magnus, Judith i Nakamura) es van allotjar a 4 hotels de luxe i van prendre la seva infusió preferida abans de la gran partida final. Què va consumir cada gran mestre?",
    intro_va: "Quatre mestres internacionals d'escacs (Guillermo, Magnus, Judith i Nakamura) es van allotjar en 4 hotels de luxe i van prendre la seua infusió preferida abans de la gran partida final. Què va consumir cada gran mestre?",
    intro_eu: "Nazioarteko lau xake-maisuk (Guillermo, Magnus, Judith eta Nakamura) luxuzko 4 hoteletan hartu zuten ostatu eta azken partida handiaren aurretik euren edari gogokoena edan zuten. Zer hartu zuen bakoitzak?",
    intro_gl: "Catro mestres internacionais de xadrez (Guillermo, Magnus, Judith e Nakamura) aloxáronse en 4 hoteis de luxo e beberon a súa infusión favorita antes da gran partida final. Que consumiu cada gran mestre?",
    intro_ja: "4名の国際チェス名誉会員（ギジェルモ、マグヌス、ユーディット、ナカムラ）が4つの高級ホテルに宿泊し、大一番の前にそれぞれ愛用の飲み物を嗜みました。誰がどのホテルで何を飲んだのでしょうか？",

    categories: [
      {
        id: "person",
        name_es: "Maestro",
        name_en: "Grandmaster",
        name_fr: "Grand Maître",
        name_de: "Großmeister",
        name_ca: "Mestre",
        name_va: "Mestre",
        name_eu: "Maisua",
        name_gl: "Mestre",
        name_ja: "名手",
        items: [
          {
            id: "guillermo",
            name_es: "D. Guillermo", name_en: "G. Tudela", name_fr: "G. Tudela", name_de: "G. Tudela",
            name_ca: "D. Guillermo", name_va: "D. Guillermo", name_eu: "Guillermo J.", name_gl: "D. Guillermo",
            name_ja: "ギジェルモ", icon: "👑"
          },
          {
            id: "magnus",
            name_es: "Magnus", name_en: "Magnus", name_fr: "Magnus", name_de: "Magnus",
            name_ca: "Magnus", name_va: "Magnus", name_eu: "Magnus", name_gl: "Magnus",
            name_ja: "マグヌス", icon: "♟️"
          },
          {
            id: "judith",
            name_es: "Judith", name_en: "Judith", name_fr: "Judith", name_de: "Judith",
            name_ca: "Judith", name_va: "Judith", name_eu: "Judith", name_gl: "Judith",
            name_ja: "ユーディット", icon: "👸"
          },
          {
            id: "nakamura",
            name_es: "Nakamura", name_en: "Nakamura", name_fr: "Nakamura", name_de: "Nakamura",
            name_ca: "Nakamura", name_va: "Nakamura", name_eu: "Nakamura", name_gl: "Nakamura",
            name_ja: "ナカムラ", icon: "⚡"
          }
        ]
      },
      {
        id: "hotel",
        name_es: "Hotel",
        name_en: "Hotel",
        name_fr: "Hôtel",
        name_de: "Hotel",
        name_ca: "Hotel",
        name_va: "Hotel",
        name_eu: "Hotela",
        name_gl: "Hotel",
        name_ja: "ホテル",
        items: [
          {
            id: "ritz",
            name_es: "Hotel Ritz", name_en: "The Ritz", name_fr: "Hôtel Ritz", name_de: "Hotel Ritz",
            name_ca: "Hotel Ritz", name_va: "Hotel Ritz", name_eu: "Ritz Hotela", name_gl: "Hotel Ritz",
            name_ja: "ホテル・リッツ", icon: "🏛️"
          },
          {
            id: "palace",
            name_es: "The Palace", name_en: "The Palace", name_fr: "The Palace", name_de: "The Palace",
            name_ca: "The Palace", name_va: "The Palace", name_eu: "The Palace", name_gl: "The Palace",
            name_ja: "ザ・パレス", icon: "🏰"
          },
          {
            id: "astoria",
            name_es: "Astoria Club", name_en: "Astoria Club", name_fr: "Astoria Club", name_de: "Astoria Club",
            name_ca: "Astoria Club", name_va: "Astoria Club", name_eu: "Astoria Kluba", name_gl: "Astoria Club",
            name_ja: "アストリア", icon: "🏨"
          },
          {
            id: "savoy",
            name_es: "Grand Savoy", name_en: "Grand Savoy", name_fr: "Grand Savoy", name_de: "Grand Savoy",
            name_ca: "Grand Savoy", name_va: "Grand Savoy", name_eu: "Grand Savoy", name_gl: "Grand Savoy",
            name_ja: "サヴォイ", icon: "✨"
          }
        ]
      },
      {
        id: "drink",
        name_es: "Infusión",
        name_en: "Beverage",
        name_fr: "Boisson",
        name_de: "Aufguss",
        name_ca: "Infusió",
        name_va: "Infusió",
        name_eu: "Edaria",
        name_gl: "Infusión",
        name_ja: "飲み物",
        items: [
          {
            id: "te_negro",
            name_es: "Té Negro", name_en: "Black Tea", name_fr: "Thé Noir", name_de: "Schwarzer Tee",
            name_ca: "Te Negre", name_va: "Te Negre", name_eu: "Te Beltza", name_gl: "Té Negro",
            name_ja: "紅茶", icon: "☕"
          },
          {
            id: "cafe",
            name_es: "Café Espresso", name_en: "Espresso", name_fr: "Café Espresso", name_de: "Espresso",
            name_ca: "Cafè Espresso", name_va: "Café Espresso", name_eu: "Espresso Kafea", name_gl: "Café Espresso",
            name_ja: "エスプレッソ", icon: "🫘"
          },
          {
            id: "verde",
            name_es: "Té Matcha", name_en: "Matcha Tea", name_fr: "Thé Matcha", name_de: "Matcha-Tee",
            name_ca: "Te Matcha", name_va: "Te Matcha", name_eu: "Matcha Tea", name_gl: "Té Matcha",
            name_ja: "抹茶", icon: "🍵"
          },
          {
            id: "miel",
            name_es: "Manzanilla", name_en: "Chamomile", name_fr: "Camomille", name_de: "Kamille",
            name_ca: "Camamilla", name_va: "Camamilla", name_eu: "Kamamila", name_gl: "Macela",
            name_ja: "カモミール", icon: "🍯"
          }
        ]
      }
    ],

    clues: [
      {
        id: "c1",
        text_es: "Magnus se alojó en The Palace, pero no tomó Café Espresso ni Té Matcha.",
        text_en: "Magnus stayed at The Palace, but drank neither Espresso nor Matcha Tea.",
        text_fr: "Magnus a séjourné au Palace, mais n'a bu ni Espresso ni Thé Matcha.",
        text_de: "Magnus übernachtete im Palace, trank aber weder Espresso noch Matcha-Tee.",
        text_ca: "En Magnus es va allotjar a The Palace, però no va prendre Cafè Espresso ni Te Matcha.",
        text_va: "Magnus es va allotjar en The Palace, però no va prendre Café Espresso ni Te Matcha.",
        text_eu: "Magnus The Palace-n geratu zen, baina ez zuen Espresso Kaferik ez Matcha Terik hartu.",
        text_gl: "Magnus aloxouse en The Palace, pero non tomou Café Espresso nin Té Matcha.",
        text_ja: "マグヌスはザ・パレスに滞在しましたが、エスプレッソも抹茶も飲みませんでした。"
      },
      {
        id: "c2",
        text_es: "El maestro alojado en el Hotel Ritz siempre desayuna Té Matcha.",
        text_en: "The grandmaster staying at The Ritz always has Matcha Tea for breakfast.",
        text_fr: "Le maître séjournant à l'Hôtel Ritz prend toujours du Thé Matcha au petit-déjeuner.",
        text_de: "Der im Hotel Ritz wohnende Meister frühstückt stets Matcha-Tee.",
        text_ca: "El mestre allotjat a l'Hotel Ritz sempre esmorza Te Matcha.",
        text_va: "El mestre allotjat en l'Hotel Ritz sempre desdejuna Te Matcha.",
        text_eu: "Ritz Hotelean ostatu hartutako maisuak beti Matcha Tea gosaltzen du.",
        text_gl: "O mestre aloxado no Hotel Ritz sempre almorza Té Matcha.",
        text_ja: "ホテル・リッツに滞在した名手は、常に朝食に抹茶を嗜みます。"
      },
      {
        id: "c3",
        text_es: "Don Guillermo se alojó en el Grand Savoy y compitió con gran energía.",
        text_en: "G. Tudela stayed at Grand Savoy and competed with great energy.",
        text_fr: "G. Tudela a séjourné au Grand Savoy et a concouru avec une grande énergie.",
        text_de: "G. Tudela logierte im Grand Savoy und trat voller Energie an.",
        text_ca: "En Guillermo es va allotjar al Grand Savoy i va competir amb gran energia.",
        text_va: "Guillermo es va allotjar en el Grand Savoy i va competir amb gran energia.",
        text_eu: "Guillermo Grand Savoy-n egon zen eta energia handiz lehiatu zen.",
        text_gl: "Don Guillermo aloxouse no Grand Savoy e competiu con gran enerxía.",
        text_ja: "ギジェルモはグランド・サヴォイに宿泊し、気迫に満ちて対局しました。"
      },
      {
        id: "c4",
        text_es: "Judith no se hospedó en el Hotel Ritz.",
        text_en: "Judith did not stay at The Ritz.",
        text_fr: "Judith n'a pas séjourné à l'Hôtel Ritz.",
        text_de: "Judith übernachtete nicht im Hotel Ritz.",
        text_ca: "La Judith no es va allotjar a l'Hotel Ritz.",
        text_va: "Judith no es va allotjar en l'Hotel Ritz.",
        text_eu: "Judith ez zen Ritz Hotelean geratu.",
        text_gl: "Judith non se hospedou no Hotel Ritz.",
        text_ja: "ユーディットはホテル・リッツには宿泊していません。"
      },
      {
        id: "c5",
        text_es: "Quien tomó Café Espresso no se hospedó en el Grand Savoy.",
        text_en: "The person who drank Espresso did not stay at Grand Savoy.",
        text_fr: "La personne qui a bu du Café Espresso n'a pas logé au Grand Savoy.",
        text_de: "Wer Espresso trank, logierte nicht im Grand Savoy.",
        text_ca: "Qui va prendre Cafè Espresso no es va allotjar al Grand Savoy.",
        text_va: "Qui va prendre Café Espresso no es va allotjar en el Grand Savoy.",
        text_eu: "Espresso Kafea hartu zuena ez zen Grand Savoy-n geratu.",
        text_gl: "Quen tomou Café Espresso non se hospedou no Grand Savoy.",
        text_ja: "エスプレッソを飲んだ者はグランド・サヴォイには宿泊しませんでした。"
      }
    ],

    solution: {
      guillermo: { hotel: "savoy", drink: "te_negro" },
      magnus: { hotel: "palace", drink: "miel" },
      judith: { hotel: "astoria", drink: "cafe" },
      nakamura: { hotel: "ritz", drink: "verde" }
    }
  },

  // =========================================================================
  // CASO 3: EL ROBO DEL DIAMANTE AZUL EN EL EXPRESO (Difícil - 4x4x4)
  // =========================================================================
  {
    id: "caso_3",
    difficulty: "dificil",
    title_es: "El Robo del Diamante Azul en el Expreso",
    title_en: "The Blue Diamond Robbery on the Express",
    title_fr: "Le Vol du Diamant Bleu dans l'Express",
    title_de: "Der Raub des Blauen Diamanten im Express",
    title_ca: "El Robatori del Diamant Blau a l'Exprés",
    title_va: "El Robatori del Diamant Blau a l'Exprés",
    title_eu: "Diamante Urdinaren Lapurreta Expresoan",
    title_gl: "O Roubo do Diamante Azul no Expreso",
    title_ja: "特急列車の青いダイヤ盗難事件",

    intro_es: "Durante el trayecto nocturno del tren Expreso, el Diamante Azul desapareció. Cuatro sospechosos viajaban en cuatro vagones distintos y portaban un equipaje singular. ¿Podrás reconstruir el caso completo?",
    intro_en: "During the overnight journey of the Express, the Blue Diamond vanished. Four suspects traveled in four distinct train cars carrying unique luggage. Can you reconstruct the entire case?",
    intro_fr: "Durant le trajet nocturne du train Express, le Diamant Bleu a disparu. Quatre suspects voyageaient dans quatre wagons distincts avec un bagage singulier. Pouvez-vous reconstituer l'affaire ?",
    intro_de: "Während der Nachtfahrt des Expresszuges verschwand der Blaue Diamant. Vier Verdächtige reisten in vier verschiedenen Waggons mit auffälligem Gepäck. Kannst du den Fall lösen?",
    intro_ca: "Durant el trajecte nocturn del tren Exprés, el Diamant Blau va desaparèixer. Quatre sospitosos viatjaven en quatre vagons diferents i duien un equipatge singular. Podràs reconstruir el cas sencer?",
    intro_va: "Durant el trajecte nocturn del tren Exprés, el Diamant Blau va desaparéixer. Quatre sospitosos viatjaven en quatre vagons diferents i portaven un equipatge singular. Podràs reconstruir el cas sencer?",
    intro_eu: "Expreso trenaren gaueko bidaian zehar, Diamante Urdina desagertu egin zen. Lau susmagarri lau bagoitan bidaiatzen ari ziren maleta bereziekin. Kasu osoa argituko al duzu?",
    intro_gl: "Durante o traxecto nocturno do tren Expreso, o Diamante Azul desapareceu. Catro sospeitosos viaxaban en catro vagóns distintos e portaban unha bagaxe singular. Poderás reconstruír o caso completo?",
    intro_ja: "夜行特急列車の運行中、青いダイヤモンドが忽然と姿を消しました。4名の容疑者はそれぞれ異なる車両に乗り、独自の手荷物を持っていました。事件の全貌を暴けるでしょうか？",

    categories: [
      {
        id: "suspect",
        name_es: "Sospechoso",
        name_en: "Suspect",
        name_fr: "Suspect",
        name_de: "Verdächtiger",
        name_ca: "Sospitós",
        name_va: "Sospitós",
        name_eu: "Susmagarria",
        name_gl: "Sospeitoso",
        name_ja: "容疑者",
        items: [
          {
            id: "coronel",
            name_es: "Cnel. Mustard", name_en: "Col. Mustard", name_fr: "Col. Mustard", name_de: "Oberst Mustard",
            name_ca: "Cnel. Mustard", name_va: "Cnel. Mustard", name_eu: "Mustard Koronela", name_gl: "Coronel Mustard",
            name_ja: "マスタード大佐", icon: "🎖️"
          },
          {
            id: "lady",
            name_es: "Lady Rose", name_en: "Lady Rose", name_fr: "Lady Rose", name_de: "Lady Rose",
            name_ca: "Lady Rose", name_va: "Lady Rose", name_eu: "Lady Rose", name_gl: "Lady Rose",
            name_ja: "レディ・ローズ", icon: "🌹"
          },
          {
            id: "profesor",
            name_es: "Prof. Plum", name_en: "Prof. Plum", name_fr: "Prof. Plum", name_de: "Prof. Plum",
            name_ca: "Prof. Plum", name_va: "Prof. Plum", name_eu: "Plum Irakaslea", name_gl: "Prof. Plum",
            name_ja: "プラム教授", icon: "🔬"
          },
          {
            id: "conde",
            name_es: "Conde Raven", name_en: "Count Raven", name_fr: "Comte Raven", name_de: "Graf Raven",
            name_ca: "Comte Raven", name_va: "Comte Raven", name_eu: "Raven Kondea", name_gl: "Conde Raven",
            name_ja: "レイヴン伯爵", icon: "🦅"
          }
        ]
      },
      {
        id: "car",
        name_es: "Vagón",
        name_en: "Train Car",
        name_fr: "Wagon",
        name_de: "Waggon",
        name_ca: "Vagó",
        name_va: "Vagó",
        name_eu: "Bagoia",
        name_gl: "Vagón",
        name_ja: "車両",
        items: [
          {
            id: "restaurante",
            name_es: "Restaurante", name_en: "Dining Car", name_fr: "Restaurant", name_de: "Speisewagen",
            name_ca: "Restaurant", name_va: "Restaurant", name_eu: "Jantoki-Bagoia", name_gl: "Restaurante",
            name_ja: "食堂車", icon: "🍽️"
          },
          {
            id: "primera",
            name_es: "1ª Clase", name_en: "1st Class", name_fr: "1re Classe", name_de: "1. Klasse",
            name_ca: "1a Classe", name_va: "1a Classe", name_eu: "1. Klasea", name_gl: "1ª Clase",
            name_ja: "一等車両", icon: "🛋️"
          },
          {
            id: "furgon",
            name_es: "Furgón Cola", name_en: "Baggage Car", name_fr: "Fourgon", name_de: "Packwagen",
            name_ca: "Furgó Cua", name_va: "Furgó Cua", name_eu: "Furgonetxea", name_gl: "Furgón Cola",
            name_ja: "荷物車", icon: "📦"
          },
          {
            id: "mirador",
            name_es: "Mirador", name_en: "Observation", name_fr: "Mirador", name_de: "Aussichtswagen",
            name_ca: "Mirador", name_va: "Mirador", name_eu: "Behatoki-Bagoia", name_gl: "Miradoiro",
            name_ja: "展望車", icon: "🔭"
          }
        ]
      },
      {
        id: "luggage",
        name_es: "Equipaje",
        name_en: "Luggage",
        name_fr: "Bagage",
        name_de: "Gepäck",
        name_ca: "Equipatge",
        name_va: "Equipatge",
        name_eu: "Maletak",
        name_gl: "Bagaxe",
        name_ja: "手荷物",
        items: [
          {
            id: "maletin",
            name_es: "Maletín Cuero", name_en: "Briefcase", name_fr: "Mallette", name_de: "Ledertasche",
            name_ca: "Maletí Cuir", name_va: "Maletí Cuir", name_eu: "Larruzko Zorroa", name_gl: "Maletín Coiro",
            name_ja: "革製鞄", icon: "💼"
          },
          {
            id: "sombrerera",
            name_es: "Sombrerera", name_en: "Hatbox", name_fr: "Boîte à Chapeau", name_de: "Hutschachtel",
            name_ca: "Sombrerera", name_va: "Sombrerera", name_eu: "Txapel-Kaxa", name_gl: "Chapeleira",
            name_ja: "帽子箱", icon: "👒"
          },
          {
            id: "violin",
            name_es: "Violín", name_en: "Violin Case", name_fr: "Violon", name_de: "Geigenkasten",
            name_ca: "Violí", name_va: "Violí", name_eu: "Biolin Kaxa", name_gl: "Violín",
            name_ja: "バイオリン", icon: "🎻"
          },
          {
            id: "baul",
            name_es: "Baúl Metal", name_en: "Metal Trunk", name_fr: "Malle Métal", name_de: "Metallkiste",
            name_ca: "Baül Metall", name_va: "Baül Metall", name_eu: "Metalezko Kutxa", name_gl: "Baúl Metal",
            name_ja: "金属トランク", icon: "🧰"
          }
        ]
      }
    ],

    clues: [
      {
        id: "c1",
        text_es: "Lady Rose viajaba en el Coche Mirador admirando el paisaje alpino.",
        text_en: "Lady Rose was traveling in the Observation Car admiring the alpine scenery.",
        text_fr: "Lady Rose voyageait dans le wagon Mirador en admirant le paysage alpin.",
        text_de: "Lady Rose reiste im Aussichtswagen und bewunderte die Berglandschaft.",
        text_ca: "Lady Rose viatjava al Cotxe Mirador admirant el paisatge alpí.",
        text_va: "Lady Rose viatjava en el Cotxe Mirador admirant el paisatge alpí.",
        text_eu: "Lady Rose Behatoki-Bagoian zihoan mendiko paisaiari begira.",
        text_gl: "Lady Rose viaxaba no Coche Mirador admirando a paisaxe alpina.",
        text_ja: "レディ・ローズはアルプスの絶景を眺めながら展望車に乗っていました。"
      },
      {
        id: "c2",
        text_es: "Quien custodiaba el Estuche de Violín fue visto en el Vagón Restaurante.",
        text_en: "The passenger carrying the Violin Case was seen in the Dining Car.",
        text_fr: "La personne qui gardait l'étui à violon a été vue dans le wagon Restaurant.",
        text_de: "Wer den Geigenkasten hütete, wurde im Speisewagen gesehen.",
        text_ca: "Qui custodiava l'Estuig de Violí va ser vist al Vagó Restaurant.",
        text_va: "Qui custodiava l'Estuig de Violí va ser vist en el Vagó Restaurant.",
        text_eu: "Biolin Kaxa zaintzen zuena Jantoki-Bagoian ikusi zuten.",
        text_gl: "Quen custodiaba o Estoxo de Violín foi visto no Vagón Restaurante.",
        text_ja: "バイオリンケースを持っていた者は食堂車で目撃されました。"
      },
      {
        id: "c3",
        text_es: "El Coronel Mustard jamás ha tocado un instrumento musical ni lleva sombrero.",
        text_en: "Colonel Mustard has never played an instrument and carries no hatbox.",
        text_fr: "Le colonel Mustard n'a jamais joué d'instrument et ne porte pas de boîte à chapeau.",
        text_de: "Oberst Mustard hat nie ein Instrument gespielt und besitzt keine Hutschachtel.",
        text_ca: "El Coronel Mustard mai ha tocat cap instrument musical ni duu barret.",
        text_va: "El Coronel Mustard mai ha tocat cap instrument musical ni porta barret.",
        text_eu: "Mustard Koronelak ez du inoiz musika-tresnarik jo eta ez du txapel-kaxarik.",
        text_gl: "O Coronel Mustard xamais tocou un instrumento musical nin leva chapeu.",
        text_ja: "マスタード大佐は楽器を一度も弾いたことがなく、帽子箱も持っていません。"
      },
      {
        id: "c4",
        text_es: "El pasajero del Furgón de Cola portaba el pesado Baúl Metálico.",
        text_en: "The passenger in the Baggage Car carried the heavy Metal Trunk.",
        text_fr: "Le passager du wagon Fourgon portait la lourde Malle Métallique.",
        text_de: "Der Passagier im Packwagen trug die schwere Metallkiste.",
        text_ca: "El passatger del Furgó de Cua duia el feixuc Baül Metàl·lic.",
        text_va: "El passatger del Furgó de Cua portava el pesat Baül Metàl·lic.",
        text_eu: "Furgonetxeko bidaiariak Metalezko Kutxa astuna zeraman.",
        text_gl: "O pasaxeiro do Furgón de Cola portaba o pesado Baúl Metálico.",
        text_ja: "最後尾の荷物車の乗客は、重厚な金属トランクを所持していました。"
      },
      {
        id: "c5",
        text_es: "El Profesor Plum no se encontraba en el Furgón de Cola ni en Primera Clase.",
        text_en: "Professor Plum was neither in the Baggage Car nor in First Class.",
        text_fr: "Le professeur Plum ne se trouvait ni dans le Fourgon ni en 1re Classe.",
        text_de: "Professor Plum war weder im Packwagen noch in der 1. Klasse.",
        text_ca: "El Professor Plum no es trobava ni al Furgó de Cua ni a Primera Classe.",
        text_va: "El Professor Plum no es trobava ni en el Furgó de Cua ni en Primera Classe.",
        text_eu: "Plum Irakaslea ez zegoen ez Furgonetxean ezta 1. Klasean ere.",
        text_gl: "O Profesor Plum non se atopaba nin no Furgón de Cola nin en 1ª Clase.",
        text_ja: "プラム教授は荷物車にも一等車両にもいませんでした。"
      },
      {
        id: "c6",
        text_es: "Lady Rose portaba una elegante Sombrerera de terciopelo.",
        text_en: "Lady Rose carried an elegant velvet Hatbox.",
        text_fr: "Lady Rose portait une élégante boîte à chapeau en velours.",
        text_de: "Lady Rose trug eine elegante Samt-Hutschachtel.",
        text_ca: "Lady Rose duia una elegant Sombrerera de vellut.",
        text_va: "Lady Rose portava una elegant Sombrerera de vellut.",
        text_eu: "Lady Rosek belarrezko txapel-kaxa dotorea zeraman.",
        text_gl: "Lady Rose portaba unha elegante Chapeleira de veludo.",
        text_ja: "レディ・ローズは優雅なビロードの帽子箱を手にしていました。"
      }
    ],

    solution: {
      coronel: { car: "primera", luggage: "maletin" },
      lady: { car: "mirador", luggage: "sombrerera" },
      profesor: { car: "restaurante", luggage: "violin" },
      conde: { car: "furgon", luggage: "baul" }
    }
  },

  // =========================================================================
  // CASO 4: EL SECRETO DEL OBSERVATORIO SECRETO (Medio - 3x3x3)
  // =========================================================================
  {
    id: "caso_4",
    difficulty: "medio",
    title_es: "El Secreto del Astrónomo del Club",
    title_en: "The Club Astronomer's Secret",
    title_fr: "Le Secret de l'Astronome du Club",
    title_de: "Das Geheimnis des Club-Astronomen",
    title_ca: "El Secret de l'Astrònom del Club",
    title_va: "El Secret de l'Astrònom del Club",
    title_eu: "Klubeko Astronomoaren Sekretua",
    title_gl: "O Secreto do Astrónomo do Club",
    title_ja: "クラブ天文学者の秘密",

    intro_es: "Tres sabios astrónomos del Club (Galileo, Kepler y Copérnico) utilizaron tres instrumentos de bronce distintos para estudiar tres constelaciones nocturnas. ¿Quién utilizó cada instrumento y qué constelación observó?",
    intro_en: "Three scholarly astronomers at the Club (Galileo, Kepler, and Copernicus) used three distinct bronze instruments to study three nighttime constellations. Who used which instrument and observed which constellation?",
    intro_fr: "Trois savants astronomes du Club (Galilée, Kepler et Copernic) ont utilisé trois instruments en bronze pour observer trois constellations. Qui a utilisé quel instrument et quelle constellation a-t-il observée ?",
    intro_de: "Drei gelehrte Astronomen des Clubs (Galileo, Kepler und Kopernikus) nutzten drei verschiedene Bronzeinstrumente zur Beobachtung von drei Sternbildern. Wer nutzte welches Instrument und beobachtete welches Sternbild?",
    intro_ca: "Tres savis astrònoms del Club (Galileo, Kepler i Copèrnic) van utilitzar tres instruments de bronze diferents per estudiar tres constel·lacions nocturnes. Qui va fer servir cada instrument i quina constel·lació va observar?",
    intro_va: "Tres savis astrònoms del Club (Galileo, Kepler i Copèrnic) van utilitzar tres instruments de bronze diferents per estudiar tres constel·lacions nocturnes. Qui va usar cada instrument i quina constel·lació va observar?",
    intro_eu: "Klubeko hiru astronomo jakintsu (Galileo, Kepler eta Koperniko) brontzezko hiru tresna desberdinekin aritu ziren gaueko hiru konstelazio behatzen. Nork zer tresna erabili zuen eta zer konstelazio behatu zuen?",
    intro_gl: "Tres sabios astrónomos do Club (Galileo, Kepler e Copérnico) empregaron tres instrumentos de bronce distintos para estudar tres constelacións nocturnas. Quen usou cada instrumento e que constelación observou?",
    intro_ja: "クラブの3名の天文学者（ガリレオ、ケプラー、コペルニクス）が、3つの青銅製器具を用いて夜空の3つの星座を観測しました。誰がどの器具を使い、どの星座を研究したのでしょうか？",

    categories: [
      {
        id: "scholar",
        name_es: "Astrónomo",
        name_en: "Astronomer",
        name_fr: "Astronome",
        name_de: "Astronom",
        name_ca: "Astrònom",
        name_va: "Astrònom",
        name_eu: "Astronomoa",
        name_gl: "Astrónomo",
        name_ja: "天文学者",
        items: [
          {
            id: "galileo",
            name_es: "Galileo", name_en: "Galileo", name_fr: "Galilée", name_de: "Galileo",
            name_ca: "Galileo", name_va: "Galileo", name_eu: "Galileo", name_gl: "Galileo",
            name_ja: "ガリレオ", icon: "🔭"
          },
          {
            id: "kepler",
            name_es: "Kepler", name_en: "Kepler", name_fr: "Kepler", name_de: "Kepler",
            name_ca: "Kepler", name_va: "Kepler", name_eu: "Kepler", name_gl: "Kepler",
            name_ja: "ケプラー", icon: "📐"
          },
          {
            id: "copernico",
            name_es: "Copérnico", name_en: "Copernicus", name_fr: "Copernic", name_de: "Kopernikus",
            name_ca: "Copèrnic", name_va: "Copèrnic", name_eu: "Koperniko", name_gl: "Copérnico",
            name_ja: "コペルニクス", icon: "☀️"
          }
        ]
      },
      {
        id: "tool",
        name_es: "Instrumento",
        name_en: "Instrument",
        name_fr: "Instrument",
        name_de: "Instrument",
        name_ca: "Instrument",
        name_va: "Instrument",
        name_eu: "Tresna",
        name_gl: "Instrumento",
        name_ja: "観測器具",
        items: [
          {
            id: "astrolabio",
            name_es: "Astrolabio", name_en: "Astrolabe", name_fr: "Astrolabe", name_de: "Astrolabium",
            name_ca: "Astrolabi", name_va: "Astrolabi", name_eu: "Astrolabioa", name_gl: "Astrolabio",
            name_ja: "アストロラーベ", icon: "🧭"
          },
          {
            id: "sextante",
            name_es: "Sextante", name_en: "Sextant", name_fr: "Sextant", name_de: "Sextant",
            name_ca: "Sextant", name_va: "Sextant", name_eu: "Sextantea", name_gl: "Sextante",
            name_ja: "六分儀", icon: "📐"
          },
          {
            id: "anteojo",
            name_es: "Catalejo", name_en: "Spyglass", name_fr: "Longue-vue", name_de: "Fernrohr",
            name_ca: "Ullera", name_va: "Ullera", name_eu: "Kataloxa", name_gl: "Monóculo",
            name_ja: "望遠鏡", icon: "🔍"
          }
        ]
      },
      {
        id: "star",
        name_es: "Constelación",
        name_en: "Constellation",
        name_fr: "Constellation",
        name_de: "Sternbild",
        name_ca: "Constel·lació",
        name_va: "Constel·lació",
        name_eu: "Konstelazioa",
        name_gl: "Constelación",
        name_ja: "星座",
        items: [
          {
            id: "orion",
            name_es: "Orión", name_en: "Orion", name_fr: "Orion", name_de: "Orion",
            name_ca: "Orió", name_va: "Orió", name_eu: "Orion", name_gl: "Orión",
            name_ja: "オリオン座", icon: "🏹"
          },
          {
            id: "pegaso",
            name_es: "Pegaso", name_en: "Pegasus", name_fr: "Pégase", name_de: "Pegasus",
            name_ca: "Pegàs", name_va: "Pegàs", name_eu: "Pegaso", name_gl: "Pegaso",
            name_ja: "ペガスス座", icon: "🐎"
          },
          {
            id: "fénix",
            name_es: "Fénix", name_en: "Phoenix", name_fr: "Phénix", name_de: "Phönix",
            name_ca: "Fènix", name_va: "Fènix", name_eu: "Fenix", name_gl: "Fénix",
            name_ja: "ほうおう座", icon: "🦅"
          }
        ]
      }
    ],

    clues: [
      {
        id: "c1",
        text_es: "Galileo utilizó el Catalejo para una de sus observaciones más memorables.",
        text_en: "Galileo used the Spyglass for one of his most memorable observations.",
        text_fr: "Galilée a utilisé la Longue-vue pour l'une de ses observations les plus mémorables.",
        text_de: "Galileo nutzte das Fernrohr für eine seiner denkwürdigsten Beobachtungen.",
        text_ca: "En Galileo va fer servir l'Ullera per a una de les seves observacions més memorables.",
        text_va: "Galileo va utilitzar l'Ullera per a una de les seues observacions més memorables.",
        text_eu: "Galileok Kataloxa erabili zuen bere behaketa gogoangarrienetako baterako.",
        text_gl: "Galileo utilizou o Monóculo para unha das súas observacións máis memorables.",
        text_ja: "ガリレオは記念碑的な観測の1つに望遠鏡を用いました。"
      },
      {
        id: "c2",
        text_es: "Quien observó la constelación de Pegaso manejaba el Astrolabio de bronce.",
        text_en: "The astronomer who observed Pegasus handled the bronze Astrolabe.",
        text_fr: "Celui qui observait la constellation de Pégase maniait l'Astrolabe de bronze.",
        text_de: "Wer das Sternbild Pegasus beobachtete, bediente das bronzene Astrolabium.",
        text_ca: "Qui va observar la constel·lació de Pegàs manipulava l'Astrolabi de bronze.",
        text_va: "Qui va observar la constel·lació de Pegàs manejava l'Astrolabi de bronze.",
        text_eu: "Pegaso konstelazioa behatu zuenak brontzezko Astrolabioa erabili zuen.",
        text_gl: "Quen observou a constelación de Pegaso manexaba o Astrolabio de bronce.",
        text_ja: "ペガスス座を観測した学者は青銅製のアストロラーベを操作していました。"
      },
      {
        id: "c3",
        text_es: "Kepler se concentró en la constelación de Orión durante toda la noche.",
        text_en: "Kepler focused on the constellation of Orion all night long.",
        text_fr: "Kepler s'est concentré sur la constellation d'Orion toute la nuit.",
        text_de: "Kepler konzentrierte sich die ganze Nacht auf das Sternbild Orion.",
        text_ca: "En Kepler es va concentrar en la constel·lació d'Orió durant tota la nit.",
        text_va: "Kepler es va concentrar en la constel·lació d'Orió durant tota la nit.",
        text_eu: "Kepler Orion konstelazioan zentratu zen gau osoan zehar.",
        text_gl: "Kepler concentrouse na constelación de Orión durante toda a noite.",
        text_ja: "ケプラーは夜通しオリオン座の観測に集中していました。"
      },
      {
        id: "c4",
        text_es: "Copérnico no empleó el Sextante.",
        text_en: "Copernicus did not use the Sextant.",
        text_fr: "Copernic n'a pas utilisé le Sextant.",
        text_de: "Kopernikus verwendete nicht den Sextanten.",
        text_ca: "En Copèrnic no va fer servir el Sextant.",
        text_va: "Copèrnic no va utilitzar el Sextant.",
        text_eu: "Kopernikok ez zuen Sextantea erabili.",
        text_gl: "Copérnico non empregou o Sextante.",
        text_ja: "コペルニクスは六分儀を使用しませんでした。"
      }
    ],

    solution: {
      galileo: { tool: "anteojo", star: "fénix" },
      kepler: { tool: "sextante", star: "orion" },
      copernico: { tool: "astrolabio", star: "pegaso" }
    }
  },

  // =========================================================================
  // CASO 5: MISIÓN EN LA ESTACIÓN ESPACIAL (Fácil - 3x3x3)
  // =========================================================================
  {
    id: "caso_5",
    difficulty: "facil",
    title_es: "Misión en la Estación Espacial",
    title_en: "Space Station Mission",
    title_fr: "Mission à la Station Spatiale",
    title_de: "Mission auf der Raumstation",
    title_ca: "Missió a l'Estació Espacial",
    title_va: "Missió a l'Estació Espacial",
    title_eu: "Misioa Espazio Estazioan",
    title_gl: "Misión na Estación Espacial",
    title_ja: "宇宙ステーションの任務",

    intro_es: "Tres astronautas de la estación orbital (Sarah, Yuri y Leo) realizan tareas críticas en tres módulos distintos de la nave (Cúpula de Observación, Laboratorio Bio y Módulo de Propulsión). ¿Quién estuvo en qué módulo y qué tarea llevó a cabo?",
    intro_en: "Three orbital station astronauts (Sarah, Yuri, and Leo) carry out critical tasks across three different ship modules (Cupola Observatory, Bio Lab, and Propulsion Module). Who was in which module and what task did they perform?",
    intro_fr: "Trois astronautes de la station orbitale (Sarah, Youri et Léo) mènent des tâches critiques dans trois modules du vaisseau (Coupole d'observation, Laboratoire Bio et Module de propulsion). Qui était dans quel module et quelle tâche a-t-il accomplie ?",
    intro_de: "Drei Astronauten der Orbitalstation (Sarah, Juri und Leo) führen wichtige Aufgaben in drei verschiedenen Modulen des Raumschiffs durch (Aussichtskuppel, Bio-Labor und Antriebsmodul). Wer war in welchem Modul und welche Aufgabe wurde erledigt?",
    intro_ca: "Tres astronautes de l'estació orbital (Sarah, Yuri i Leo) duen a terme tasques crítiques a tres mòduls de la nau (Cúpula d'Observació, Laboratori Bio i Mòdul de Propulsió). Qui va ser a quin mòdul i quina tasca va realitzar?",
    intro_va: "Tres astronautes de l'estació orbital (Sarah, Yuri i Leo) duen a terme tasques crítiques en tres mòduls de la nau (Cúpula d'Observació, Laboratori Bio i Mòdul de Propulsió). Qui va estar en quin mòdul i quina tasca va realitzar?",
    intro_eu: "Estazio orbitaleko hiru astronautak (Sarah, Yuri eta Leo) zeregin kritikoak betetzen dituzte ontziaren hiru modulutan (Behaketa Kupula, Bio-Laborategia eta Propultsio Modulua). Nor egon zen modulu bakoitzean eta zer zeregin burutu zuen?",
    intro_gl: "Tres astronautas da estación orbital (Sarah, Yuri e Leo) realizan tarefas críticas en tres módulos distintos da nave (Cúpula de Observación, Laboratorio Bio e Módulo de Propulsión). Quen estivo en que módulo e que tarefa levou a cabo?",
    intro_ja: "軌道ステーションの3名の宇宙飛行士（サラ、ユーリ、レオ）が船内の3つの区画（展望キューポラ、バイオ研究室、推進モジュール）で重要な任務を遂行しています。誰がどの区画で何の任務を担当したのでしょうか？",

    categories: [
      {
        id: "astronaut",
        name_es: "Astronauta",
        name_en: "Astronaut",
        name_fr: "Astronaute",
        name_de: "Astronaut",
        name_ca: "Astronauta",
        name_va: "Astronauta",
        name_eu: "Astronauta",
        name_gl: "Astronauta",
        name_ja: "宇宙飛行士",
        items: [
          {
            id: "sarah",
            name_es: "Sarah", name_en: "Sarah", name_fr: "Sarah", name_de: "Sarah",
            name_ca: "Sarah", name_va: "Sarah", name_eu: "Sarah", name_gl: "Sarah",
            name_ja: "サラ", icon: "👩‍🚀"
          },
          {
            id: "yuri",
            name_es: "Yuri", name_en: "Yuri", name_fr: "Youri", name_de: "Juri",
            name_ca: "Yuri", name_va: "Yuri", name_eu: "Yuri", name_gl: "Yuri",
            name_ja: "ユーリ", icon: "👨‍🚀"
          },
          {
            id: "leo",
            name_es: "Leo", name_en: "Leo", name_fr: "Léo", name_de: "Leo",
            name_ca: "Leo", name_va: "Leo", name_eu: "Leo", name_gl: "Leo",
            name_ja: "レオ", icon: "🧑‍🚀"
          }
        ]
      },
      {
        id: "module",
        name_es: "Módulo",
        name_en: "Module",
        name_fr: "Module",
        name_de: "Modul",
        name_ca: "Mòdul",
        name_va: "Mòdul",
        name_eu: "Modulua",
        name_gl: "Módulo",
        name_ja: "区画",
        items: [
          {
            id: "cupula",
            name_es: "Cúpula", name_en: "Cupola", name_fr: "Coupole", name_de: "Kuppel",
            name_ca: "Cúpula", name_va: "Cúpula", name_eu: "Kupula", name_gl: "Cúpula",
            name_ja: "展望キューポラ", icon: "🔭"
          },
          {
            id: "laboratorio",
            name_es: "Laboratorio Bio", name_en: "Bio Lab", name_fr: "Laboratoire Bio", name_de: "Bio-Labor",
            name_ca: "Laboratori Bio", name_va: "Laboratori Bio", name_eu: "Bio-Laborategia", name_gl: "Laboratorio Bio",
            name_ja: "バイオ研究室", icon: "🧪"
          },
          {
            id: "propulsion",
            name_es: "Propulsión", name_en: "Propulsion", name_fr: "Propulsion", name_de: "Antrieb",
            name_ca: "Propulsió", name_va: "Propulsió", name_eu: "Propultsioa", name_gl: "Propulsión",
            name_ja: "推進モジュール", icon: "🚀"
          }
        ]
      },
      {
        id: "task",
        name_es: "Misión",
        name_en: "Task",
        name_fr: "Mission",
        name_de: "Aufgabe",
        name_ca: "Missió",
        name_va: "Missió",
        name_eu: "Eginkizuna",
        name_gl: "Misión",
        name_ja: "任務",
        items: [
          {
            id: "antena",
            name_es: "Calibrar Antena", name_en: "Antenna Tuning", name_fr: "Régler l'antenne", name_de: "Antenne justieren",
            name_ca: "Calibrar Antena", name_va: "Calibrar Antena", name_eu: "Antena Kalibratu", name_gl: "Calibrar Antena",
            name_ja: "アンテナ調整", icon: "📡"
          },
          {
            id: "cultivo",
            name_es: "Hidroponía", name_en: "Hydroponics", name_fr: "Culture hydroponique", name_de: "Hydrokultur",
            name_ca: "Hidroponia", name_va: "Hidroponia", name_eu: "Hidroponia", name_gl: "Hidroponía",
            name_ja: "水耕栽培", icon: "🌱"
          },
          {
            id: "paseo",
            name_es: "Paseo Espacial", name_en: "Spacewalk", name_fr: "Sortie spatiale", name_de: "Weltraumspaziergang",
            name_ca: "Passeig Espacial", name_va: "Passeig Espacial", name_eu: "Espazio-Ibilaldia", name_gl: "Paseo Espacial",
            name_ja: "宇宙遊泳", icon: "🛰️"
          }
        ]
      }
    ],

    clues: [
      {
        id: "c1",
        text_es: "El experimento de Hidroponía se desarrolló en el Laboratorio Bio.",
        text_en: "The Hydroponics experiment took place inside the Bio Lab.",
        text_fr: "L'expérience de culture hydroponique s'est déroulée dans le Laboratoire Bio.",
        text_de: "Das Hydrokultur-Experiment fand im Bio-Labor statt.",
        text_ca: "L'experiment d'Hidroponia es va dur a terme al Laboratori Bio.",
        text_va: "L'experiment d'Hidroponia es va dur a terme en el Laboratori Bio.",
        text_eu: "Hidroponia esperimentua Bio-Laborategian garatu zen.",
        text_gl: "O experimento de Hidroponía desenvolveuse no Laboratorio Bio.",
        text_ja: "水耕栽培の実験はバイオ研究室内で行われました。"
      },
      {
        id: "c2",
        text_es: "Yuri fue el astronauta encargado de calibrar la Antena.",
        text_en: "Yuri was the astronaut in charge of tuning the Antenna.",
        text_fr: "Youri était l'astronaute chargé de régler l'antenne.",
        text_de: "Juri war der für die Justierung der Antenne zuständige Astronaut.",
        text_ca: "En Yuri va ser l'astronauta encarregat de calibrar l'Antena.",
        text_va: "Yuri va ser l'astronauta encarregat de calibrar l'Antena.",
        text_eu: "Yuri izan zen Antena kalibratzeaz arduratu zen astronauta.",
        text_gl: "Yuri foi o astronauta encargado de calibrar a Antena.",
        text_ja: "アンテナ調整を担当した宇宙飛行士はユーリでした。"
      },
      {
        id: "c3",
        text_es: "La calibración de la Antena se gestionó desde el Módulo de Propulsión.",
        text_en: "Antenna tuning was managed from the Propulsion Module.",
        text_fr: "Le réglage de l'antenne a été géré depuis le Module de propulsion.",
        text_de: "Die Justierung der Antenne wurde vom Antriebsmodul aus gesteuert.",
        text_ca: "La calibració de l'Antena es va gestionar des del Mòdul de Propulsió.",
        text_va: "La calibració de l'Antena es va gestionar des del Mòdul de Propulsió.",
        text_eu: "Antenaren kalibrazioa Propultsio Modulutik kudeatu zen.",
        text_gl: "A calibración da Antena xestionouse desde o Módulo de Propulsión.",
        text_ja: "アンテナ調整は推進モジュールから管理されました。"
      },
      {
        id: "c4",
        text_es: "Sarah coordinó su Paseo Espacial observando las estrellas desde la Cúpula.",
        text_en: "Sarah coordinated her Spacewalk while watching the stars from the Cupola.",
        text_fr: "Sarah a coordonné sa sortie spatiale en observant les étoiles depuis la Coupole.",
        text_de: "Sarah koordinierte ihren Weltraumspaziergang beim Blick auf die Sterne aus der Kuppel.",
        text_ca: "La Sarah va coordinar el seu Passeig Espacial observant els estels des de la Cúpula.",
        text_va: "Sarah va coordinar el seu Passeig Espacial observant les estrelles des de la Cúpula.",
        text_eu: "Sarahek bere Espazio-Ibilaldia koordinatu zuen Kupulatik izarrak behatuz.",
        text_gl: "Sarah coordinou o seu Paseo Espacial observando as estrelas desde a Cúpula.",
        text_ja: "サラは展望キューポラから星空を眺めながら宇宙遊泳を調整しました。"
      }
    ],

    solution: {
      sarah: { module: "cupula", task: "paseo" },
      yuri: { module: "propulsion", task: "antena" },
      leo: { module: "laboratorio", task: "cultivo" }
    }
  },

  // =========================================================================
  // CASO 6: EXPEDICIÓN AL TEMPLO DE LA SELVA (Medio - 4x4x4)
  // =========================================================================
  {
    id: "caso_6",
    difficulty: "medio",
    title_es: "Expedición al Templo de la Selva",
    title_en: "Expedition to the Jungle Temple",
    title_fr: "Expédition au Temple de la Jungle",
    title_de: "Expedition zum Dschungeltempel",
    title_ca: "Expedició al Temple de la Selva",
    title_va: "Expedició al Temple de la Selva",
    title_eu: "Oihaneko Tenplurako Espedizioa",
    title_gl: "Expedición ao Templo da Selva",
    title_ja: "密林の失われた寺院",

    intro_es: "Cuatro exploradores de élite (Dra. Elena, Capitán Drake, Mateo el Guía y Lin la Botánica) se adentraron en cuatro sectores de la densa selva (Ruinas del Templo, Cascada Secreta, Cañón Nuboso y Río Esmeralda), avistando cada uno un animal legendario (Jaguar Dorado, Guacamayo Escarlata, Anaconda Gigante y Mono Aullador). ¿Quién exploró cada sector y qué fauna halló?",
    intro_en: "Four elite explorers (Dr. Elena, Captain Drake, Guide Mateo, and Botanist Lin) ventured into four jungle sectors (Temple Ruins, Secret Waterfall, Misty Canyon, and Emerald River), each spotting a legendary animal (Golden Jaguar, Scarlet Macaw, Giant Anaconda, and Howler Monkey). Who explored which sector and what wildlife did they discover?",
    intro_fr: "Quatre explorateurs d'élite (Dre Elena, Capitaine Drake, Mateo le Guide et Lin la Botaniste) se sont aventurés dans quatre secteurs de la jungle (Ruines du Temple, Cascade Secrète, Canyon Brumeux et Rivière Émeraude), apercevant chacun un animal légendaire (Jaguar Doré, Ara Écarlate, Anaconda Géant et Singe Hurleur). Qui a exploré quel secteur et quelle faune a-t-il découverte ?",
    intro_de: "Vier Elite-Forscher (Dr. Elena, Kapitän Drake, Mateo der Führer und Lin die Botanikerin) drangen in vier Dschungelsektoren vor (Tempelruinen, Geheimer Wasserfall, Nebelschlucht und Smaragdfluss), und jeder erblickte ein legendäres Tier (Goldener Jaguar, Scharlachara, Riesenanakonda und Brüllaffe). Wer erforschte welchen Sektor und welche Tierart wurde entdeckt?",
    intro_ca: "Quatre exploradors d'elit (Dra. Elena, Capità Drake, Mateo el Guia i Lin la Botànica) es van endinsar a quatre sectors de la selva (Ruïnes del Temple, Cascada Secreta, Canyó Enboirat i Riu Esmaragda), albirant cadascun un animal llegendari (Jaguar Daurat, Guacamai Escarlata, Anaconda Gegant i Mico Cridaner). Qui va explorar cada sector i quina fauna va trobar?",
    intro_va: "Quatre exploradors d'elit (Dra. Elena, Capità Drake, Mateo el Guia i Lin la Botànica) es van endinsar en quatre sectors de la selva (Ruïnes del Temple, Cascada Secreta, Canyó Enboirat i Riu Maragda), albirant cadascun un animal llegendari (Jaguar Daurat, Guacamai Escarlata, Anaconda Gegant i Mico Cridaner). Qui va explorar cada sector i quina fauna va trobar?",
    intro_eu: "Lau eliteko esploratzailek (Elena Doktorea, Drake Kapitaina, Mateo Gidaria eta Lin Botanikaria) oihaneko lau sektoretan barneratu ziren (Tenpluaren Hondakinak, Ur-jauzi Sekretua, Arroila Lainotsua eta Esmeralda Ibaia), bakoitzak animalia mitiko bat ikusiz (Urrezko Jaguara, Guakamayo Gorria, Anakonda Erraldoia eta Tximino Huilalaria). Nork esploratu zuen sektore bakoitza eta zer fauna aurkitu zuen?",
    intro_gl: "Catro exploradores de elite (Dra. Elena, Capitán Drake, Mateo o Guía e Lin a Botánica) adentráronse en catro sectores da densa selva (Ruínas do Templo, Fervenza Secreta, Canón Nubrado e Río Esmeralda), avistando cada un un animal lendario (Xaguar Dourado, Guacamaio Escarlata, Anaconda Xigante e Mono Ouveador). Quen explorou cada sector e que fauna atopou?",
    intro_ja: "4名のエリート探検家（エレナ博士、ドレイク船長、案内人マテオ、植物学者リン）が密林の4つのエリア（寺院の遺跡、秘密の滝、霧の渓谷、エメラルド川）に分け入り、それぞれ伝説の生物（黄金のジャガー、コンゴウインコ、オオアナコンダ、ホエザル）を目撃しました。誰がどこを探検し、何の動物を見つけたのでしょうか？",

    categories: [
      {
        id: "explorer",
        name_es: "Explorador",
        name_en: "Explorer",
        name_fr: "Explorateur",
        name_de: "Forscher",
        name_ca: "Explorador",
        name_va: "Explorador",
        name_eu: "Esploratzailea",
        name_gl: "Explorador",
        name_ja: "探検家",
        items: [
          {
            id: "elena",
            name_es: "Dra. Elena", name_en: "Dr. Elena", name_fr: "Dre Elena", name_de: "Dr. Elena",
            name_ca: "Dra. Elena", name_va: "Dra. Elena", name_eu: "Elena Doktorea", name_gl: "Dra. Elena",
            name_ja: "エレナ博士", icon: "🧭"
          },
          {
            id: "drake",
            name_es: "Capitán Drake", name_en: "Captain Drake", name_fr: "Capitaine Drake", name_de: "Kapitän Drake",
            name_ca: "Capità Drake", name_va: "Capità Drake", name_eu: "Drake Kapitaina", name_gl: "Capitán Drake",
            name_ja: "ドレイク船長", icon: "🤠"
          },
          {
            id: "mateo",
            name_es: "Mateo Guía", name_en: "Mateo Guide", name_fr: "Mateo Guide", name_de: "Mateo Führer",
            name_ca: "Mateo Guia", name_va: "Mateo Guia", name_eu: "Mateo Gidaria", name_gl: "Mateo Guía",
            name_ja: "案内人マテオ", icon: "🔦"
          },
          {
            id: "lin",
            name_es: "Lin Botánica", name_en: "Lin Botanist", name_fr: "Lin Botaniste", name_de: "Lin Botanikerin",
            name_ca: "Lin Botànica", name_va: "Lin Botànica", name_eu: "Lin Botanikaria", name_gl: "Lin Botánica",
            name_ja: "植物学者リン", icon: "🌿"
          }
        ]
      },
      {
        id: "sector",
        name_es: "Sector",
        name_en: "Sector",
        name_fr: "Secteur",
        name_de: "Sektor",
        name_ca: "Sector",
        name_va: "Sector",
        name_eu: "Sektorea",
        name_gl: "Sector",
        name_ja: "エリア",
        items: [
          {
            id: "templo",
            name_es: "Ruinas Templo", name_en: "Temple Ruins", name_fr: "Ruines Temple", name_de: "Tempelruinen",
            name_ca: "Ruïnes Temple", name_va: "Ruïnes Temple", name_eu: "Tenpluko Hondakinak", name_gl: "Ruínas Templo",
            name_ja: "寺院の遺跡", icon: "🏛️"
          },
          {
            id: "cascada",
            name_es: "Cascada Secreta", name_en: "Secret Falls", name_fr: "Cascade Secrète", name_de: "Geheimer Wasserfall",
            name_ca: "Cascada Secreta", name_va: "Cascada Secreta", name_eu: "Ur-jauzi Sekretua", name_gl: "Fervenza Secreta",
            name_ja: "秘密の滝", icon: "🌊"
          },
          {
            id: "canon",
            name_es: "Cañón Nuboso", name_en: "Misty Canyon", name_fr: "Canyon Brumeux", name_de: "Nebelschlucht",
            name_ca: "Canyó Enboirat", name_va: "Canyó Enboirat", name_eu: "Arroila Lainotsua", name_gl: "Canón Nubrado",
            name_ja: "霧の渓谷", icon: "⛰️"
          },
          {
            id: "rio",
            name_es: "Río Esmeralda", name_en: "Emerald River", name_fr: "Rivière Émeraude", name_de: "Smaragdfluss",
            name_ca: "Riu Esmaragda", name_va: "Riu Maragda", name_eu: "Esmeralda Ibaia", name_gl: "Río Esmeralda",
            name_ja: "エメラルド川", icon: "🛶"
          }
        ]
      },
      {
        id: "animal",
        name_es: "Fauna",
        name_en: "Wildlife",
        name_fr: "Faune",
        name_de: "Tierwelt",
        name_ca: "Fauna",
        name_va: "Fauna",
        name_eu: "Fauna",
        name_gl: "Fauna",
        name_ja: "野生動物",
        items: [
          {
            id: "jaguar",
            name_es: "Jaguar Dorado", name_en: "Golden Jaguar", name_fr: "Jaguar Doré", name_de: "Goldener Jaguar",
            name_ca: "Jaguar Daurat", name_va: "Jaguar Daurat", name_eu: "Urrezko Jaguara", name_gl: "Xaguar Dourado",
            name_ja: "黄金のジャガー", icon: "🐆"
          },
          {
            id: "guacamayo",
            name_es: "Guacamayo", name_en: "Macaw", name_fr: "Ara Écarlate", name_de: "Scharlachara",
            name_ca: "Guacamai", name_va: "Guacamai", name_eu: "Guakamayoa", name_gl: "Guacamaio",
            name_ja: "コンゴウインコ", icon: "🦜"
          },
          {
            id: "anaconda",
            name_es: "Anaconda", name_en: "Anaconda", name_fr: "Anaconda", name_de: "Anakonda",
            name_ca: "Anaconda", name_va: "Anaconda", name_eu: "Anakonda", name_gl: "Anaconda",
            name_ja: "オオアナコンダ", icon: "🐍"
          },
          {
            id: "mono",
            name_es: "Mono Aullador", name_en: "Howler Monkey", name_fr: "Singe Hurleur", name_de: "Brüllaffe",
            name_ca: "Mico Cridaner", name_va: "Mico Cridaner", name_eu: "Tximino Huilalaria", name_gl: "Mono Ouveador",
            name_ja: "ホエザル", icon: "🐒"
          }
        ]
      }
    ],

    clues: [
      {
        id: "c1",
        text_es: "Mateo el Guía dirigió su balsa por las corrientes del Río Esmeralda.",
        text_en: "Guide Mateo steered his raft along the currents of the Emerald River.",
        text_fr: "Mateo le Guide a dirigé son radeau sur les courants de la Rivière Émeraude.",
        text_de: "Mateo der Führer lenkte sein Floß durch die Strömung des Smaragdflusses.",
        text_ca: "En Mateo el Guia va dirigir el seu rai pels corrents del Riu Esmaragda.",
        text_va: "Mateo el Guia va dirigir la seua balsa pels corrents del Riu Maragda.",
        text_eu: "Mateo Gidariak bere almadia gidatu zuen Esmeralda Ibaiaren korronteetan zehar.",
        text_gl: "Mateo o Guía dirixiu a súa balsa polas correntes do Río Esmeralda.",
        text_ja: "案内人マテオはいかだを操り、エメラルド川の流れを進みました。"
      },
      {
        id: "c2",
        text_es: "El explorador que se internó en el Cañón Nuboso escuchó los bramidos del Mono Aullador.",
        text_en: "The explorer who ventured into the Misty Canyon heard the cries of the Howler Monkey.",
        text_fr: "L'explorateur qui s'est aventuré dans le Canyon Brumeux a entendu les cris du Singe Hurleur.",
        text_de: "Der Forscher, der sich in die Nebelschlucht wagte, hörte die Rufe des Brüllaffen.",
        text_ca: "L'explorador que es va endinsar al Canyó Enboirat va escoltar els brams del Mico Cridaner.",
        text_va: "L'explorador que es va endinsar en el Canyó Enboirat va escoltar els brams del Mico Cridaner.",
        text_eu: "Arroila Lainotsuan sartu zen esploratzaileak Tximino Huilalariaren orroak entzun zituen.",
        text_gl: "O explorador que se internou no Canón Nubrado escoitou os berros do Mono Ouveador.",
        text_ja: "霧の渓谷へと足を踏み入れた探検家は、ホエザルの咆哮を耳にしました。"
      },
      {
        id: "c3",
        text_es: "La Dra. Elena logró fotografiar al sigiloso Jaguar Dorado.",
        text_en: "Dr. Elena successfully photographed the stealthy Golden Jaguar.",
        text_fr: "La Dre Elena a réussi à photographier le furtif Jaguar Doré.",
        text_de: "Dr. Elena gelang es, den lautlosen Goldenen Jaguar zu fotografieren.",
        text_ca: "La Dra. Elena va aconseguir fotografiar el sigil·lós Jaguar Daurat.",
        text_va: "La Dra. Elena va aconseguir fotografiar el sigil·lós Jaguar Daurat.",
        text_eu: "Elena Doktoreak Urrezko Jaguar iheskorra argazkitzea lortu zuen.",
        text_gl: "A Dra. Elena logrou fotografar o sigiloso Xaguar Dourado.",
        text_ja: "エレナ博士は音もなく忍び寄る黄金のジャガーを撮影することに成功しました。"
      },
      {
        id: "c4",
        text_es: "Quien recorrió el Río Esmeralda se topó cara a cara con la Anaconda Gigante.",
        text_en: "Whoever traveled down the Emerald River came face to face with the Giant Anaconda.",
        text_fr: "Quiconque a descendu la Rivière Émeraude s'est retrouvé face à face avec l'Anaconda Géant.",
        text_de: "Wer den Smaragdfluss befuhr, stand der Riesenanakonda Auge in Auge gegenüber.",
        text_ca: "Qui va recórrer el Riu Esmaragda es va topar cara a cara amb l'Anaconda Gegant.",
        text_va: "Qui va recórrer el Riu Maragda es va topar cara a cara amb l'Anaconda Gegant.",
        text_eu: "Esmeralda Ibaian ibili zena aurrez aurre topo egin zuen Anakonda Erraldoiarekin.",
        text_gl: "Quen percorreu o Río Esmeralda atopouse cara a cara coa Anaconda Xigante.",
        text_ja: "エメラルド川を進んだ探検家は、巨大なオオアナコンダと鉢合わせました。"
      },
      {
        id: "c5",
        text_es: "El Capitán Drake no exploró las Ruinas del Templo ni la Cascada Secreta.",
        text_en: "Captain Drake explored neither the Temple Ruins nor the Secret Waterfall.",
        text_fr: "Le Capitaine Drake n'a exploré ni les Ruines du Temple ni la Cascade Secrète.",
        text_de: "Kapitän Drake erkundete weder die Tempelruinen noch den Geheimen Wasserfall.",
        text_ca: "El Capità Drake no va explorar ni les Ruïnes del Temple ni la Cascada Secreta.",
        text_va: "El Capità Drake no va explorar ni les Ruïnes del Temple ni la Cascada Secreta.",
        text_eu: "Drake Kapitainak ez zituen ez Tenpluko Hondakinak ez Ur-jauzi Sekretua arakatu.",
        text_gl: "O Capitán Drake non explorou as Ruínas do Templo nin a Fervenza Secreta.",
        text_ja: "ドレイク船長は寺院の遺跡も秘密の滝も探検しませんでした。"
      },
      {
        id: "c6",
        text_es: "Lin la Botánica observó al colorido Guacamayo Escarlata sobrevolar la Cascada Secreta.",
        text_en: "Botanist Lin watched the colorful Scarlet Macaw soar over the Secret Waterfall.",
        text_fr: "Lin la Botaniste a observé le coloré Ara Écarlate survoler la Cascade Secrète.",
        text_de: "Lin die Botanikerin beobachtete, wie der farbenprächtige Scharlachara über den Geheimen Wasserfall flog.",
        text_ca: "La Lin la Botànica va observar el colorit Guacamai Escarlata sobrevolar la Cascada Secreta.",
        text_va: "Lin la Botànica va observar el colorit Guacamai Escarlata sobrevolar la Cascada Secreta.",
        text_eu: "Lin Botanikariak Guakamayo Gorri koloretsua ikusi zuen Ur-jauzi Sekretuaren gainetik hegan.",
        text_gl: "Lin a Botánica observou o colorido Guacamaio Escarlata sobrevoar a Fervenza Secreta.",
        text_ja: "植物学者リンは、秘密の滝の上空を舞う鮮やかなコンゴウインコを観察しました。"
      }
    ],

    solution: {
      elena: { sector: "templo", animal: "jaguar" },
      drake: { sector: "canon", animal: "mono" },
      mateo: { sector: "rio", animal: "anaconda" },
      lin: { sector: "cascada", animal: "guacamayo" }
    }
  },

  // =========================================================================
  // CASO 7: ¿QUIÉN MATÓ AL DUQUE DE RAVENSWOOD? (Difícil - 5x5x5)
  // =========================================================================
  {
    id: "caso_7",
    difficulty: "dificil",
    title_es: "¿Quién Mató al Duque de Ravenswood?",
    title_en: "Who Killed the Duke of Ravenswood?",
    title_fr: "Qui a Tué le Duc de Ravenswood ?",
    title_de: "Wer Ermordete den Herzog von Ravenswood?",
    title_ca: "Qui va Matar el Duc de Ravenswood?",
    title_va: "Qui va Matar el Duc de Ravenswood?",
    title_eu: "Nork Hil Zuen Ravenswoodeko Dukea?",
    title_gl: "Quen Matou ao Duque de Ravenswood?",
    title_ja: "レイヴンズウッド公爵暗殺事件",

    intro_es: "A medianoche, el Duque de Ravenswood fue hallado sin vida en su mansión. Cinco sospechosos (Lady Margaret, Lord Charles, Sir Arthur, Madame Claire y el mayordomo Mortimer) se hallaban en cinco estancias portando objetos cruciales. ¿Quién cometió el crimen y dónde estaba cada uno?",
    intro_en: "At midnight, the Duke of Ravenswood was found lifeless in his manor. Five suspects (Lady Margaret, Lord Charles, Sir Arthur, Madame Claire, and Mortimer the butler) were in five rooms carrying crucial items. Who committed the murder and where was everyone?",
    intro_fr: "À minuit, le duc de Ravenswood a été retrouvé sans vie dans son manoir. Cinq suspects (Lady Margaret, Lord Charles, Sir Arthur, Madame Claire et le majordome Mortimer) se trouvaient dans cinq pièces avec des objets cruciaux. Qui a commis le crime et où était chacun ?",
    intro_de: "Um Mitternacht wurde der Herzog von Ravenswood leblos auf seinem Anwesen aufgefunden. Fünf Verdächtige (Lady Margaret, Lord Charles, Sir Arthur, Madame Claire und Butler Mortimer) hielten sich in fünf Räumen auf und trugen verdächtige Gegenstände. Wer beging das Verbrechen und wer war wo?",
    intro_ca: "A mitjanit, el Duc de Ravenswood va ser trobat sense vida a la seva mansió. Cinc sospitosos (Lady Margaret, Lord Charles, Sir Arthur, Madame Claire i el majordom Mortimer) es trobaven a cinc estances portant objectes crucials. Qui va cometre el crim i on era cadascú?",
    intro_va: "A mitjanit, el Duc de Ravenswood va ser trobat sense vida en la seua mansió. Cinc sospitosos (Lady Margaret, Lord Charles, Sir Arthur, Madame Claire i el majordom Mortimer) es trobaven en cinc estances portant objectes crucials. Qui va cometre el crim i on estava cadascú?",
    intro_eu: "Gauerdian, Ravenswoodeko Dukea hilda aurkitu zuten bere jauregian. Bost susmagarri (Lady Margaret, Lord Charles, Sir Arthur, Madame Claire eta Mortimer maiordomoa) bost gelatan zeuden objektu garrantzitsuekin. Nork egin zuen krimena eta non zegoen bakoitza?",
    intro_gl: "A medianoite, o Duque de Ravenswood foi achado sen vida na súa mansión. Cinco sospeitosos (Lady Margaret, Lord Charles, Sir Arthur, Madame Claire e o mordomo Mortimer) atopábanse en cinco estancias portando obxectos cruciais. Quen cometeu o crime e onde estaba cada un?",
    intro_ja: "真夜中、レイヴンズウッド公爵が屋敷で遺体となって発見されました。5人の容疑者（レディ・マーガレット、チャールズ卿、アーサー卿、マダム・クレア、執事モーティマー）は5つの部屋におり、決定的な品を持っていました。犯人は誰で、それぞれどこにいたのでしょうか？",

    categories: [
      {
        id: "suspect",
        name_es: "Sospechoso",
        name_en: "Suspect",
        name_fr: "Suspect",
        name_de: "Verdächtiger",
        name_ca: "Sospitós",
        name_va: "Sospitós",
        name_eu: "Susmagarria",
        name_gl: "Sospeitoso",
        name_ja: "容疑者",
        items: [
          {
            id: "lady_margaret",
            name_es: "Lady Margaret", name_en: "Lady Margaret", name_fr: "Lady Margaret", name_de: "Lady Margaret",
            name_ca: "Lady Margaret", name_va: "Lady Margaret", name_eu: "Lady Margaret", name_gl: "Lady Margaret",
            name_ja: "レディ・マーガレット", icon: "🥀"
          },
          {
            id: "lord_charles",
            name_es: "Lord Charles", name_en: "Lord Charles", name_fr: "Lord Charles", name_de: "Lord Charles",
            name_ca: "Lord Charles", name_va: "Lord Charles", name_eu: "Lord Charles", name_gl: "Lord Charles",
            name_ja: "チャールズ卿", icon: "🍷"
          },
          {
            id: "sir_arthur",
            name_es: "Sir Arthur", name_en: "Sir Arthur", name_fr: "Sir Arthur", name_de: "Sir Arthur",
            name_ca: "Sir Arthur", name_va: "Sir Arthur", name_eu: "Sir Arthur", name_gl: "Sir Arthur",
            name_ja: "アーサー卿", icon: "🎖️"
          },
          {
            id: "madame_claire",
            name_es: "Madame Claire", name_en: "Madame Claire", name_fr: "Madame Claire", name_de: "Madame Claire",
            name_ca: "Madame Claire", name_va: "Madame Claire", name_eu: "Madame Claire", name_gl: "Madame Claire",
            name_ja: "マダム・クレア", icon: "🔮"
          },
          {
            id: "mayordomo_mortimer",
            name_es: "Mortimer", name_en: "Mortimer", name_fr: "Mortimer", name_de: "Mortimer",
            name_ca: "Mortimer", name_va: "Mortimer", name_eu: "Mortimer", name_gl: "Mortimer",
            name_ja: "モーティマー", icon: "🗝️"
          }
        ]
      },
      {
        id: "room",
        name_es: "Estancia",
        name_en: "Room",
        name_fr: "Pièce",
        name_de: "Raum",
        name_ca: "Estança",
        name_va: "Estança",
        name_eu: "Gela",
        name_gl: "Estadía",
        name_ja: "部屋",
        items: [
          {
            id: "despacho",
            name_es: "Despacho Duque", name_en: "Duke's Study", name_fr: "Bureau du Duc", name_de: "Arbeitszimmer",
            name_ca: "Despatx Duc", name_va: "Despatx Duc", name_eu: "Dukeraren Bulegoa", name_gl: "Despacho Duque",
            name_ja: "公爵の書斎", icon: "📜"
          },
          {
            id: "invernadero",
            name_es: "Invernadero", name_en: "Greenhouse", name_fr: "Serre", name_de: "Gewächshaus",
            name_ca: "Hivernacle", name_va: "Hivernacle", name_eu: "Negutegia", name_gl: "Invernadoiro",
            name_ja: "温室", icon: "🌺"
          },
          {
            id: "sala_billar",
            name_es: "Sala Billar", name_en: "Billiard Room", name_fr: "Salle de Billard", name_de: "Billardzimmer",
            name_ca: "Sala de Billar", name_va: "Sala de Billar", name_eu: "Bila-Gela", name_gl: "Sala Billar",
            name_ja: "ビリヤード室", icon: "🎱"
          },
          {
            id: "armeria",
            name_es: "Sala Armas", name_en: "Armory", name_fr: "Armurerie", name_de: "Waffenkammer",
            name_ca: "Sala d'Armes", name_va: "Sala d'Armes", name_eu: "Arma-Gela", name_gl: "Sala de Armas",
            name_ja: "武器庫", icon: "⚔️"
          },
          {
            id: "galeria",
            name_es: "Galería Arte", name_en: "Art Gallery", name_fr: "Galerie d'Art", name_de: "Galerie",
            name_ca: "Galeria d'Art", name_va: "Galeria d'Art", name_eu: "Arte Galeria", name_gl: "Galería de Arte",
            name_ja: "絵画回廊", icon: "🖼️"
          }
        ]
      },
      {
        id: "weapon",
        name_es: "Objeto",
        name_en: "Item",
        name_fr: "Objet",
        name_de: "Gegenstand",
        name_ca: "Objecte",
        name_va: "Objecte",
        name_eu: "Objektua",
        name_gl: "Obxecto",
        name_ja: "物品",
        items: [
          {
            id: "veneno",
            name_es: "Frasco Veneno", name_en: "Poison Vial", name_fr: "Flacon de Poison", name_de: "Giftfläschchen",
            name_ca: "Frasc de Verí", name_va: "Frasc de Verí", name_eu: "Pozoi Botilatxoa", name_gl: "Frasco de Veneno",
            name_ja: "毒薬の小瓶", icon: "🧪"
          },
          {
            id: "daga",
            name_es: "Daga Ceremonial", name_en: "Ceremonial Dagger", name_fr: "Dague Cérémoniale", name_de: "Zeremoniendolch",
            name_ca: "Daga Ceremonial", name_va: "Daga Ceremonial", name_eu: "Daga Zeremoniala", name_gl: "Daga Cerimonial",
            name_ja: "儀礼用短剣", icon: "🗡️"
          },
          {
            id: "revolver",
            name_es: "Revólver Marfil", name_en: "Ivory Revolver", name_fr: "Revolver en Ivoire", name_de: "Elfenbeinrevolver",
            name_ca: "Revòlver de Marfil", name_va: "Revòlver de Marfil", name_eu: "Boli-Errebolberra", name_gl: "Revólver de Marfil",
            name_ja: "象牙のリボルバー", icon: "🔫"
          },
          {
            id: "candelabro",
            name_es: "Candelabro Plata", name_en: "Silver Candlestick", name_fr: "Chandelier en Argent", name_de: "Silberleuchter",
            name_ca: "Canelobre de Plata", name_va: "Canelobre de Plata", name_eu: "Zilarrezko Kandela", name_gl: "Candelabro de Prata",
            name_ja: "銀の燭台", icon: "🕯️"
          },
          {
            id: "cuerda",
            name_es: "Cuerda Seda", name_en: "Silk Rope", name_fr: "Corde de Soie", name_de: "Seidenseil",
            name_ca: "Corda de Seda", name_va: "Corda de Seda", name_eu: "Zetazko Soka", name_gl: "Corda de Seda",
            name_ja: "絹のロープ", icon: "🪢"
          }
        ]
      }
    ],

    clues: [
      {
        id: "c1",
        text_es: "Quien se encontraba en la Sala de Billar portaba el elegante Revólver de Marfil.",
        text_en: "The person inside the Billiard Room carried the elegant Ivory Revolver.",
        text_fr: "La personne qui se trouvait dans la Salle de Billard portait l'élégant Revolver en Ivoire.",
        text_de: "Die Person im Billardzimmer trug den eleganten Elfenbeinrevolver bei sich.",
        text_ca: "Qui es trobava a la Sala de Billar duia l'elegant Revòlver de Marfil.",
        text_va: "Qui es trobava en la Sala de Billar duia l'elegant Revòlver de Marfil.",
        text_eu: "Bila-Gelan zegoenak Boli-Errebolber dotorea zeraman soinean.",
        text_gl: "Quen se atopaba na Sala de Billar portaba o elegante Revólver de Marfil.",
        text_ja: "ビリヤード室にいた人物は、優美な象牙のリボルバーを所持していました。"
      },
      {
        id: "c2",
        text_es: "Sir Arthur pasó la noche en la Sala de Armas admirando antiguas reliquias bélicas.",
        text_en: "Sir Arthur spent the night in the Armory admiring ancient war relics.",
        text_fr: "Sir Arthur a passé la nuit dans l'Armurerie à admirer d'anciennes reliques de guerre.",
        text_de: "Sir Arthur verbrachte die Nacht in der Waffenkammer und bewunderte alte Kriegsreliquien.",
        text_ca: "En Sir Arthur va passar la nit a la Sala d'Armes admirant antigues relíquies bèl·liques.",
        text_va: "Sir Arthur va passar la nit en la Sala d'Armes admirant antigues relíquies bèl·liques.",
        text_eu: "Sir Arthurrek Arma-Gelan igaro zuen gaua antzinako gerra-erlikiei begira.",
        text_gl: "Sir Arthur pasou a noite na Sala de Armas admirando antigas reliquias bélicas.",
        text_ja: "アーサー卿は武器庫で夜を過ごし、古の軍事遺物を眺めていました。"
      },
      {
        id: "c3",
        text_es: "El Frasco de Veneno letal fue localizado dentro del Despacho del Duque.",
        text_en: "The lethal Poison Vial was located inside the Duke's Study.",
        text_fr: "Le Flacon de Poison mortel a été localisé à l'intérieur du Bureau du Duc.",
        text_de: "Das tödliche Giftfläschchen wurde im Arbeitszimmer des Herzogs sichergestellt.",
        text_ca: "El Frasc de Verí letal va ser localitzat a l'interior del Despatx del Duc.",
        text_va: "El Frasc de Verí letal va ser localitzat a l'interior del Despatx del Duc.",
        text_eu: "Pozoi Botilatxo hilgarria Dukeraren Bulego barruan aurkitu zuten.",
        text_gl: "O Frasco de Veneno letal foi localizado dentro do Despacho do Duque.",
        text_ja: "猛毒の入った小瓶は、公爵の書斎の中から発見されました。"
      },
      {
        id: "c4",
        text_es: "Lady Margaret no bajó a la Sala de Billar ni pisó en ningún momento el Invernadero.",
        text_en: "Lady Margaret neither went down to the Billiard Room nor stepped into the Greenhouse.",
        text_fr: "Lady Margaret n'est ni descendue à la Salle de Billard ni entrée dans la Serre.",
        text_de: "Lady Margaret ging weder ins Billardzimmer noch betrat sie das Gewächshaus.",
        text_ca: "La Lady Margaret no va baixar a la Sala de Billar ni va trepitjar mai l'Hivernacle.",
        text_va: "Lady Margaret no va baixar a la Sala de Billar ni va trepitjar mai l'Hivernacle.",
        text_eu: "Lady Margaret ez zen Bila-Gelara jaitsi, ezta une batez ere Negutegian sartu.",
        text_gl: "Lady Margaret non baixou á Sala de Billar nin pisou en ningún momento o Invernadoiro.",
        text_ja: "レディ・マーガレットはビリヤード室にも降りず、温室にも一歩も入りませんでした。"
      },
      {
        id: "c5",
        text_es: "Madame Claire fue sorprendida en el Invernadero sosteniendo una Cuerda de Seda.",
        text_en: "Madame Claire was caught in the Greenhouse holding a Silk Rope.",
        text_fr: "Madame Claire a été surprise dans la Serre tenant une Corde de Soie.",
        text_de: "Madame Claire wurde im Gewächshaus mit einem Seidenseil ertappt.",
        text_ca: "La Madame Claire va ser sorpresa a l'Hivernacle sostenint una Corda de Seda.",
        text_va: "Madame Claire va ser sorpresa en l'Hivernacle sostenint una Corda de Seda.",
        text_eu: "Madame Claire Negutegian harrapatu zuten Zetazko Soka bat eskuetan zuela.",
        text_gl: "Madame Claire foi sorprendida no Invernadoiro sostendo unha Corda de Seda.",
        text_ja: "マダム・クレアは温室で絹のロープを手にしているところを目撃されました。"
      },
      {
        id: "c6",
        text_es: "La persona que llevaba el Candelabro de Plata fue vista en la Galería de Arte.",
        text_en: "The person carrying the Silver Candlestick was seen in the Art Gallery.",
        text_fr: "La personne qui portait le Chandelier en Argent a été vue dans la Galerie d'Art.",
        text_de: "Die Person mit dem Silberleuchter wurde in der Galerie gesehen.",
        text_ca: "La persona que duia el Canelobre de Plata va ser vista a la Galeria d'Art.",
        text_va: "La persona que duia el Canelobre de Plata va ser vista en la Galeria d'Art.",
        text_eu: "Zilarrezko Kandela zeraman pertsona Arte Galerian ikusi zuten.",
        text_gl: "A persoa que levaba o Candelabro de Prata foi vista na Galería de Arte.",
        text_ja: "銀の燭台を持っていた人物は、絵画回廊で目撃されていました。"
      },
      {
        id: "c7",
        text_es: "Lady Margaret se desplazaba por la mansión iluminándose con el Candelabro de Plata.",
        text_en: "Lady Margaret walked through the manor holding the Silver Candlestick for light.",
        text_fr: "Lady Margaret se déplaçait dans le manoir en s'éclairant avec le Chandelier en Argent.",
        text_de: "Lady Margaret durchquerte das Anwesen im Schein des Silberleuchters.",
        text_ca: "La Lady Margaret es desplaçava per la mansió il·luminant-se amb el Canelobre de Plata.",
        text_va: "Lady Margaret es desplaçava per la mansió il·luminant-se amb el Canelobre de Plata.",
        text_eu: "Lady Margaret jauregian zehar ibili zen Zilarrezko Kandelarekin argituz.",
        text_gl: "Lady Margaret desprazábase pola mansión iluminándose co Candelabro de Prata.",
        text_ja: "レディ・マーガレットは銀の燭台を灯しながら屋敷内を移動していました。"
      },
      {
        id: "c8",
        text_es: "Lord Charles reconoció ser el poseedor del Revólver de Marfil.",
        text_en: "Lord Charles admitted to being the owner of the Ivory Revolver.",
        text_fr: "Lord Charles a reconnu être le propriétaire du Revolver en Ivoire.",
        text_de: "Lord Charles gab zu, der Besitzer des Elfenbeinrevolvers zu sein.",
        text_ca: "En Lord Charles va reconèixer ser el posseïdor del Revòlver de Marfil.",
        text_va: "Lord Charles va reconéixer ser el posseïdor del Revòlver de Marfil.",
        text_eu: "Lord Charlesek Boli-Errebolberraren jabea zela onartu zuen.",
        text_gl: "Lord Charles recoñeceu ser o posuidor do Revólver de Marfil.",
        text_ja: "チャールズ卿は象牙のリボルバーの所有者であることを認めました。"
      },
      {
        id: "c9",
        text_es: "La Daga Ceremonial de hoja curva permaneció guardada en la Sala de Armas.",
        text_en: "The curved Ceremonial Dagger remained stored inside the Armory.",
        text_fr: "La Dague Cérémoniale à lame recourbée est restée rangée dans l'Armurerie.",
        text_de: "Der Zeremoniendolch mit gekrümmter Klinge verblieb in der Waffenkammer.",
        text_ca: "La Daga Ceremonial de fulla corbada va romandre desada a la Sala d'Armes.",
        text_va: "La Daga Ceremonial de fulla corbada va romandre guardada en la Sala d'Armes.",
        text_eu: "Xabla kurbatuko Daga Zeremoniala Arma-Gelan gordeta geratu zen.",
        text_gl: "A Daga Cerimonial de folla curva permaneceu gardada na Sala de Armas.",
        text_ja: "湾曲した刃を持つ儀礼用短剣は武器庫に保管されていました。"
      }
    ],

    solution: {
      lady_margaret: { room: "galeria", weapon: "candelabro" },
      lord_charles: { room: "sala_billar", weapon: "revolver" },
      sir_arthur: { room: "armeria", weapon: "daga" },
      madame_claire: { room: "invernadero", weapon: "cuerda" },
      mayordomo_mortimer: { room: "despacho", weapon: "veneno" }
    }
  }
];

if (typeof window !== 'undefined') {
  window.LOGIC_CASES = LOGIC_CASES;
}


