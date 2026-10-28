/**
 * DEDUCCIÓN LÓGICA — BANCO OFICIAL DE ENIGMAS CLÁSICOS & DILEMAS DE LA MENTE
 * 9 Grandes Enigmas de la Historia del Pensamiento
 * 9 Idiomas Oficiales de Club del Ingenio (ES, EN, FR, DE, CA, VA, EU, GL, JA)
 */

const CLASSIC_ENIGMAS = [
  // =========================================================================
  // ENIGMA 1: LA ISLA DE LOS OJOS AZULES (Lógica Epistémica & Common Knowledge)
  // =========================================================================
  {
    id: "ojos_azules",
    icon: "🏝️",
    badge_es: "LÓGICA EPISTÉMICA",
    badge_en: "EPISTEMIC LOGIC",
    badge_fr: "LOGIQUE ÉPISTÉMIQUE",
    badge_de: "EPISTEMISCHE LOGIK",
    badge_ca: "LÒGICA EPISTÈMICA",
    badge_va: "LÒGICA EPISTÈMICA",
    badge_eu: "LOGIKA EPISTEMIKOA",
    badge_gl: "LÓXICA EPISTÉMICA",
    badge_ja: "認識論理学",

    title_es: "La Isla de los Ojos Azules",
    title_en: "The Blue-Eyed Islanders",
    title_fr: "L'Île aux Yeux Bleus",
    title_de: "Die Insel der blauäugigen Bewohner",
    title_ca: "L'Illa dels Ulls Blaus",
    title_va: "L'Illa dels Ulls Blaus",
    title_eu: "Begi Urdinen Uhartea",
    title_gl: "A Illa dos Ollos Azuis",
    title_ja: "青い目の島民のパラドックス",

    subtitle_es: "El poder del Conocimiento Común y la inducción matemática perfecta.",
    subtitle_en: "The power of Common Knowledge and flawless mathematical induction.",
    subtitle_fr: "Le pouvoir de la Connaissance Commune et de l'induction parfaite.",
    subtitle_de: "Die Kraft des gemeinsamen Wissens und fehlerfreier Induktion.",
    subtitle_ca: "El poder del Coneixement Comú i la inducció matemàtica perfecta.",
    subtitle_va: "El poder del Coneixement Comú i la inducció matemàtica perfecta.",
    subtitle_eu: "Ezagutza Komunaren eta indukzio matematiko perfektuaren indarra.",
    subtitle_gl: "O poder do Coñecemento Común e a indución matemática perfecta.",
    subtitle_ja: "共通知識（Common Knowledge）と完全なる数学的帰納法の力。",

    story_es: "En una isla remota habitan 100 personas. Todos tienen o bien ojos azules o bien ojos marrones. Todos ven el color exacto de los ojos de los demás, pero nadie conoce su propio color. No hay espejos, el agua no refleja y una ley sagrada prohíbe terminantemente hablar o comunicarse sobre el color de los ojos.\n\nLa ley establece que si alguien descubre con certeza matemática que tiene los ojos azules, debe abandonar la isla en el barco ritual de las 8:00 de la mañana siguientes. Todos los isleños poseen una lógica perfecta y saben que los demás también razonan de forma infalible.\n\nUn día, un forastero desembarca, reúne a todos los habitantes y proclama en voz alta sin señalar a nadie: «¡Qué alegría ver al menos a una persona con ojos azules en esta isla!»",
    story_en: "On a remote island live 100 inhabitants. Each has either blue eyes or brown eyes. Everyone sees the eye color of all other islanders, but no one knows their own color. There are no mirrors, the water offers no reflection, and a sacred law strictly forbids speaking about eye color.\n\nThe law dictates that if anyone deduces with mathematical certainty that their eyes are blue, they must leave the island on the ritual ferry at 8:00 AM the following morning. All islanders possess perfect deductive logic and know that everyone else reasons flawlessly.\n\nOne day, a visitor arrives, gathers all 100 inhabitants, and publicly announces to everyone without pointing at anyone: 'How wonderful it is to see at least one blue-eyed person on this island!'",
    story_fr: "Sur une île isolée vivent 100 habitants. Chacun a soit les yeux bleus, soit les yeux marron. Tout le monde voit la couleur des yeux des autres, mais personne ne connaît la sienne. Il n'y a pas de miroirs et une loi sacrée interdit de parler de la couleur des yeux.\n\nLa loi stipule que si quelqu'un déduit avec certitude absolue qu'il a les yeux bleus, il doit quitter l'île par le bateau rituel le lendemain matin à 8h00. Tous les insulaires ont une logique parfaite.\n\nUn jour, un étranger débarque, rassemble tous les insulaires et déclare à haute voix sans désigner personne : « Quelle joie de voir au moins une personne aux yeux bleus sur cette île ! »",
    story_de: "Auf einer abgelegenen Insel leben 100 Bewohner. Jeder hat entweder blaue oder braune Augen. Jeder sieht die Augenfarbe aller anderen, aber niemand kennt seine eigene. Es gibt keine Spiegel und ein heiliges Gesetz verbietet jegliche Kommunikation über Augenfarben.\n\nDas Gesetz besagt: Wenn jemand mit logischer Gewissheit feststellt, dass er blaue Augen hat, muss er die Insel am nächsten Morgen um 8:00 Uhr mit dem Boot verlassen. Alle Bewohner besitzen vollkommene Logik.\n\nEines Tages versammelt ein Fremder alle 100 Bewohner und ruft laut aus: „Wie schön, mindestens eine Person mit blauen Augen auf dieser Insel zu sehen!“",
    story_ca: "En una illa remota viuen 100 persones. Tots tenen o bé ulls blaus o bé ulls marrons. Cadascú veu el color dels ulls de tots els altres, però ningú sap el seu propi color. No hi ha miralls i una llei sagrada prohibeix comunicar-se sobre el color dels ulls.\n\nLa llei estableix que si algú descobreix amb certesa matemàtica que té els ulls blaus, ha d'abandonar l'illa en el vaixell de les 8:00 del matí següent. Tots tenen una lògica impecable.\n\nUn dia, un foraster arriba, reuneix tots els habitants i diu en veu alta sense assenyalar ningú: «Quina alegria veure com a mínim una persona amb ulls blaus en aquesta illa!»",
    story_va: "En una illa remota viuen 100 persones. Tots tenen o bé ulls blaus o bé ulls marrons. Cadascú veu el color dels ulls de tots els altres, però ningú sap el seu propi color. No hi ha miralls i una llei sagrada prohibeix comunicar-se sobre el color dels ulls.\n\nLa llei estableix que si algú descobreix amb certesa matemàtica que té els ulls blaus, ha d'abandonar l'illa en el vaixell de les 8:00 del matí següent. Tots tenen una lògica impecable.\n\nUn dia, un foraster arriba, reuneix tots els habitants i diu en veu alta sense assenyalar ningú: «Quina alegria vore almenys una persona amb ulls blaus en esta illa!»",
    story_eu: "Uharte urrun batean 100 biztanle bizi dira. Guztiek begi urdinak edo marroiak dituzte. Bakoitzak besteen begien kolorea ikusten du, baina inork ez daki berea. Ez dago ispilurik eta lege sakratu batek debekatu egiten du begien koloreaz hitz egitea.\n\nLegeak ezartzen du inork ziurtasun osoz jakiten badu begi urdinak dituela, hurrengo goizeko 8:00etako itsasontzian uhartea utzi behar duela. Denek dute logika akatsgabea.\n\nEgun batean, kanpoko bisitari batek denak biltzen ditu eta esaten du: «Zein pozgarria den uharte honetan gutxienez begi urdineko pertsona bat ikustea!»",
    story_gl: "Nunha illa remota habitan 100 persoas. Todos teñen ou ben ollos azuis ou ben ollos marróns. Cada un ve a cor dos ollos dos demais, pero ninguén coñece a súa propia. Non hai espellos e unha lei sagrada prohibe falar da cor dos ollos.\n\nA lei establece que se alguén deduce con certeza absoluta que ten os ollos azuis, debe marchar da illa no barco das 8:00 da mañá seguinte. Todos posúen unha lóxica perfecta.\n\nUn día, un forasteiro reúne a todos os habitantes e proclama: «Que ledicia ver polo menos unha persoa con ollos azuis nesta illa!»",
    story_ja: "孤島に100人の島民が暮らしています。全員が青い目か茶色い目のどちらかを持っています。全員が自分以外の全員の目の色を見ることができますが、自分の目の色は知りません。鏡はなく、目の色について話すことは固く禁じられています。\n\n掟により、もし自分が青い目であると論理的必然性をもって確信した者は、翌朝午前8時の舟で島を去らねばなりません。島民は全員、完全無欠な論理的思考力を備えています。\n\nある日、島を訪れた旅人が島民全員を集め、誰をも指さずにこう言いました。「この島で、少なくとも1人は青い目の人に出会えたことを心から嬉しく思います！」",

    question_es: "¿Qué consecuencias trajo este comentario a los habitantes de la isla?",
    question_en: "What consequences did this announcement bring to the islanders?",
    question_fr: "Quelles conséquences cette annonce a-t-elle eues sur les habitants de l'île ?",
    question_de: "Welche Konsequenzen hatte diese Bemerkung für die Inselbewohner?",
    question_ca: "Quines conseqüències va portar aquest comentari als habitants de l'illa?",
    question_va: "Quines conseqüències va portar este comentari als habitants de l'illa?",
    question_eu: "Zer ondorio ekarri zizkien iruzkin honek uharteko biztanleei?",
    question_gl: "Que consecuencias trouxo este comentario aos habitantes da illa?",
    question_ja: "この発言は島民たちにどのような結果をもたらしたでしょうか？",

    options: [
      {
        id: "opt_nothing",
        text_es: "Ninguna consecuencia: todos ya veían a personas con ojos azules antes de que hablara el forastero.",
        text_en: "No consequences: everyone already saw people with blue eyes before the visitor spoke.",
        text_fr: "Aucune conséquence : tout le monde voyait déjà des personnes aux yeux bleus avant la déclaration.",
        text_de: "Keine Konsequenzen: Jeder sah bereits blauäugige Personen, bevor der Fremde sprach.",
        text_ca: "Cap conseqüència: tothom ja veia persones amb ulls blaus abans de parlar el foraster.",
        text_va: "Cap conseqüència: tot el món ja veia persones amb ulls blaus abans de parlar el foraster.",
        text_eu: "Ondoriorik ez: denek ikusten zituzten jada begi urdineko pertsonak kanpotarrak hitz egin aurretik.",
        text_gl: "Ningunha consecuencia: todos xa vían a persoas con ollos azuis antes de falar o forasteiro.",
        text_ja: "何の影響もない：旅人が話す前から、全員が青い目の人が存在することを目撃していたため。",
        isCorrect: false,
        feedback_es: "Incorrecto. Aunque todos ya veían ojos azules, el forastero transformó esa información en Conocimiento Común."
      },
      {
        id: "opt_next_day",
        text_es: "A las 8:00 AM del día siguiente, todos los habitantes de la isla se marcharon.",
        text_en: "At 8:00 AM the next day, all inhabitants left the island.",
        text_fr: "À 8h00 le lendemain matin, tous les habitants de l'île sont partis.",
        text_de: "Am nächsten Tag um 8:00 Uhr verließen alle Bewohner die Insel.",
        text_ca: "A les 8:00 del matí següent, tots els habitants de l'illa van marxar.",
        text_va: "A les 8:00 del matí següent, tots els habitants de l'illa se'n van anar.",
        text_eu: "Hurrengo goizeko 8:00etan, uharteko biztanle guztiek alde egin zuten.",
        text_gl: "Ás 8:00 da mañá seguinte, todos os habitantes marcharon da illa.",
        text_ja: "翌朝午前8時、島民全員が島を去った。",
        isCorrect: false,
        feedback_es: "Incorrecto. Solo se irían al día siguiente si hubiera exactamente una persona con ojos azules en la isla."
      },
      {
        id: "opt_induction",
        text_es: "Si hay k personas con ojos azules, nadie se va durante k-1 días; en la mañana del día k a las 8:00 AM, TODOS los de ojos azules se marchan juntos.",
        text_en: "If there are k blue-eyed people, no one leaves for k-1 days; on morning k at 8:00 AM, ALL blue-eyed people leave together.",
        text_fr: "S'il y a k personnes aux yeux bleus, personne ne part pendant k-1 jours ; au matin du jour k à 8h00, TOUS les yeux bleus partent ensemble.",
        text_de: "Gibt es k Personen mit blauen Augen, geht k-1 Tage lang niemand; am Morgen von Tag k um 8:00 Uhr verlassen ALLE Blauäugigen gemeinsam die Insel.",
        text_ca: "Si hi ha k persones amb ulls blaus, ningú marxa durant k-1 dies; el matí del dia k a les 8:00, TOTS els d'ulls blaus marxen junts.",
        text_va: "Si hi ha k persones amb ulls blaus, ningú se'n va durant k-1 dies; el matí del dia k a les 8:00, TOTS els d'ulls blaus se'n van junts.",
        text_eu: "k pertsonak badituzte begi urdinak, inork ez du alde egiten k-1 egunez; k eguneko goizeko 8:00etan, begi urdineko GUZTIEK batera egiten dute alde.",
        text_gl: "Se hai k persoas con ollos azuis, ninguén marcha durante k-1 días; na mañá do día k ás 8:00, TODOS os de ollos azuis marchan xuntos.",
        text_ja: "青い目の島民がk人いる場合、k-1日間は誰も島を去らず、k日目の朝8時に青い目の島民全員が一斉に島を離れる。",
        isCorrect: true,
        feedback_es: "¡Brillante! Has deducido la esencia de la inducción matemática y el conocimiento común."
      },
      {
        id: "opt_oldest",
        text_es: "Solo el habitante de mayor edad con ojos azules dedujo su color y se marchó solo.",
        text_en: "Only the oldest blue-eyed inhabitant deduced their color and left alone.",
        text_fr: "Seul l'habitant le plus âgé aux yeux bleus a déduit sa couleur et est parti seul.",
        text_de: "Nur der älteste blauäugige Bewohner schloss auf seine Augenfarbe und ging allein.",
        text_ca: "Només l'habitant més vell amb ulls blaus va deduir el seu color i va marxar sol.",
        text_va: "Només l'habitant més vell amb ulls blaus va deduir el seu color i se'n va anar a soles.",
        text_eu: "Begi urdinak zituen biztanle zaharrenak soilik asmatu zuen bere kolorea eta bakarrik joan zen.",
        text_gl: "Só o habitante de maior idade con ollos azuis deduciu a súa cor e marchou só.",
        text_ja: "最も年長の青い目の島民1人だけが自分の目の色を推論し、1人で島を去った。",
        isCorrect: false,
        feedback_es: "Incorrecto. La edad no influye; todos son razonadores lógicos perfectos y deducen en el mismo instante."
      }
    ],

    interactiveType: "induction_blue_eyes",

    solution_title_es: "Demostración Rigurosa por Inducción Matemática",
    solution_title_en: "Rigorous Proof by Mathematical Induction",
    solution_title_fr: "Démonstration Rigoureuse par Induction Mathématique",
    solution_title_de: "Strenger Beweis durch vollständige Induktion",
    solution_title_ca: "Demostració Rigorosa per Inducció Matemàtica",
    solution_title_va: "Demostració Rigorosa per Inducció Matemàtica",
    solution_title_eu: "Frogapen Zorrotza Indukzio Matematiko Bidez",
    solution_title_gl: "Demostración Rigorosa por Indución Matemática",
    solution_title_ja: "数学的帰納法による厳密な証明",

    solution_explanation_es: `
      <div class="proof-steps">
        <div class="proof-step">
          <strong>1. Caso Base (k = 1 persona de ojos azules):</strong>
          <p>Imagina que solo hay 1 habitante con ojos azules. Esta persona mira a su alrededor y ve a 99 personas con ojos marrones. Al oír al forastero decir <em>«veo al menos una persona con ojos azules»</em>, deduce de inmediato: <em>«Dado que todos los demás tienen ojos marrones, ¡esa persona tengo que ser yo!»</em>. Se marcha en el barco a las 8:00 AM del <strong>Día 1</strong>.</p>
        </div>
        <div class="proof-step">
          <strong>2. Caso Inductivo (k = 2 personas de ojos azules, A y B):</strong>
          <p>Cada una de las dos personas de ojos azules ve a 1 persona de ojos azules y 98 de ojos marrones. A piensa: <em>«Si yo tuviera ojos marrones, B sería el único con ojos azules y se marcharía el Día 1 a las 8:00 AM según el Caso Base»</em>. B piensa exactamente lo mismo respecto a A. Llega la mañana del Día 1 y <strong>nadie se marcha</strong>. A y B razonan al unísono: <em>«¡Si B no se marchó, es porque me ve a mí con ojos azules!»</em>. Ambos se presentan a las 8:00 AM del <strong>Día 2</strong> y abandonan la isla juntos.</p>
        </div>
        <div class="proof-step">
          <strong>3. Generalización Inductiva (k personas de ojos azules):</strong>
          <p>Cada habitante de ojos azules ve a k-1 personas de ojos azules. Esperan que si solo hubiera k-1, se marcharían en la mañana del día k-1. Al ver que nadie se marcha en el día k-1, cada uno deduce que él es el k-ésimo azul. En consecuencia, el <strong>Día k a las 8:00 AM</strong>, los k habitantes de ojos azules se marchan simultáneamente.</p>
        </div>
      </div>
    `,
    curiosity_es: "Este enigma fue formalizado por el matemático Terry Tao y el premio Nobel Robert Aumann para ilustrar el concepto de 'Conocimiento Común': la información no solo debe ser conocida por todos, sino que todos deben saber que todos saben que todos saben."
  },

  // =========================================================================
  // ENIGMA 2: LA PUERTA INFERNAL Y LOS DOS CENTINELAS (Lógica Veraz y Falsa)
  // =========================================================================
  {
    id: "puerta_infernal",
    icon: "🚪",
    badge_es: "LÓGICA VERAZ Y FALSA",
    badge_en: "TRUTH & LIE LOGIC",
    badge_fr: "LOGIQUE VÉRITÉ ET MENSONGE",
    badge_de: "WAHRHEIT & LÜGE",
    badge_ca: "LÒGICA VERITAT I MENTIDA",
    badge_va: "LÒGICA VERITAT I MENTIDA",
    badge_eu: "EGIA ETA GEZURRAREN LOGIKA",
    badge_gl: "LÓXICA DE VERDADE E MENTIRA",
    badge_ja: "真実と嘘の論理学",

    title_es: "La Puerta Infernal y los Dos Centinelas",
    title_en: "The Infernal Door and the Two Guards",
    title_fr: "La Porte Infernale et les Deux Sentinelles",
    title_de: "Die Höllentür und die zwei Wächter",
    title_ca: "La Porta Infernal i els Dos Sentinelles",
    title_va: "La Porta Infernal i els Dos Sentinelles",
    title_eu: "Ate Infernukoa eta Bi Zaindariak",
    title_gl: "A Porta Infernal e os Dous Sentinelas",
    title_ja: "冥府の扉と二人の門番",

    subtitle_es: "Uno siempre dice la verdad, el otro siempre miente. Una sola pregunta para salvar tu vida.",
    subtitle_en: "One always tells the truth, the other always lies. A single question to save your life.",
    subtitle_fr: "L'un dit toujours la vérité, l'autre ment toujours. Une seule question pour survivre.",
    subtitle_de: "Einer sagt stets die Wahrheit, einer lügt immer. Eine einzige Frage rettet dein Leben.",
    subtitle_ca: "Un sempre diu la veritat, l'altre sempre menteix. Una sola pregunta per salvar la vida.",
    subtitle_va: "Un sempre diu la veritat, l'altre sempre mentix. Una sola pregunta per salvar la vida.",
    subtitle_eu: "Batek beti egia dio, besteak beti gezurra. Galdera bakarra zure bizitza salbatzeko.",
    subtitle_gl: "Un sempre di a verdade, o outro sempre minte. Unha soa pregunta para salvar a vida.",
    subtitle_ja: "1人は常に真実を語り、もう1人は常に嘘をつく。命を救うたった一つの質問。",

    story_es: "Estás encerrado en una mazmorra con dos puertas idénticas custodiadas por dos centinelas:\n\n• Una puerta conduce a la LIBERTAD ✨.\n• La otra puerta conduce a la MUERTE SEGURA 💀.\n\nSabes que uno de los centinelas SIEMPRE dice la verdad, y el otro centinela SIEMPRE miente, pero no sabes cuál es cuál. Puedes elegir a uno de ellos y hacerle una única pregunta antes de abrir una puerta.",
    story_en: "You are locked in a room with two identical doors guarded by two sentinels:\n\n• One door leads to FREEDOM ✨.\n• The other door leads to CERTAIN DEATH 💀.\n\nYou know that one guard ALWAYS tells the truth, and the other ALWAYS lies, but you don't know who is who. You may ask one question to one guard before making your choice.",
    story_fr: "Vous êtes enfermé dans une pièce dotée de deux portes gardées par deux sentinelles :\n\n• Une porte mène à la LIBERTÉ ✨.\n• L'autre porte mène à la MORT CERTAINE 💀.\n\nL'un dit TOUJOURS la vérité, l'autre ment TOUJOURS. Vous pouvez poser une seule question à l'un d'eux avant de choisir votre porte.",
    story_de: "Du bist in einem Raum mit zwei Türen und zwei Wächtern eingesperrt:\n\n• Eine Tür führt in die FREIHEIT ✨.\n• Die andere Tür führt in den SICHEREN TOD 💀.\n\nEin Wächter sagt IMMER die Wahrheit, der andere lügt IMMER. Du darfst einem Wächter genau eine Frage stellen.",
    story_ca: "Estàs tancat en una cambra amb dues portes vigilades per dos sentinelles:\n\n• Una porta duu a la LLIBERTAT ✨.\n• L'altra porta duu a la MORT SEGURA 💀.\n\nUn sentinella diu SEMPRE la veritat i l'altre menteix SEMPRE. Pots fer una sola pregunta a un d'ells abans de triar.",
    story_va: "Estàs tancat en una cambra amb dos portes vigilades per dos sentinelles:\n\n• Una porta duu a la LLIBERTAT ✨.\n• L'altra porta duu a la MORT SEGURA 💀.\n\nUn sentinella diu SEMPRE la veritat i l'altre mentix SEMPRE. Pots fer una sola pregunta a un d'ells abans de triar.",
    story_eu: "Bi ate berdin dituen gela batean giltzapetuta zaude, bi zaindarik zainduta:\n\n• Ate batek ASKATASUNERA darama ✨.\n• Besteak HERIOTZARA darama 💀.\n\nZaindari batek BETI egia dio, eta besteak BETI gezurra. Galdera bakarra egin diezaiokezu bati ate bat aukeratu aurretik.",
    story_gl: "Estás pechado nunha estancia con dúas portas vixiadas por dous sentinelas:\n\n• Unha porta conduce á LIBERDADE ✨.\n• A outra conduce á MORTE SEGURA 💀.\n\nUn sentinela SEMPRE di a verdade e o outro SEMPRE minte. Podes facerlle unha soa pregunta a un deles.",
    story_ja: "あなたは2つの扉と2人の門番がいる部屋に閉じ込められています：\n\n• 1つの扉は「自由」へと続きます ✨。\n• もう1つの扉は「確実な死」へと続きます 💀。\n\n1人の門番は「常に真実」を語り、もう1人は「常に嘘」をつきますが、どちらがどちらかは分かりません。どちらか1人に一度だけ質問できます。",

    question_es: "¿Qué pregunta harías para salvar tu vida con 100% de certeza?",
    question_en: "What question would you ask to guarantee your survival with 100% certainty?",
    question_fr: "Quelle question devez-vous poser pour sauver votre vie à coup sûr ?",
    question_de: "Welche Frage garantiert dein Überleben mit 100%iger Sicherheit?",
    question_ca: "Quina pregunta faries per salvar la teva vida amb un 100% de certesa?",
    question_va: "Quina pregunta faries per salvar la teua vida amb un 100% de certesa?",
    question_eu: "Zer galdera egingo zenuke zure bizitza %100eko ziurtasunez salbatzeko?",
    question_gl: "Que pregunta farías para salvar a túa vida con total certeza?",
    question_ja: "100%確実に命を救う扉を見極める質問はどれでしょうか？",

    options: [
      {
        id: "opt_directa",
        text_es: "«¿Cuál es la puerta que lleva a la libertad?»",
        text_en: "'Which door leads to freedom?'",
        text_fr: "« Quelle porte mène à la liberté ? »",
        text_de: "„Welche Tür führt in die Freiheit?“",
        text_ca: "«Quina és la porta que duu a la llibertat?»",
        text_va: "«Quina és la porta que duu a la llibertat?»",
        text_eu: "«Zein da askatasunera daraman atea?»",
        text_gl: "«Cal é a porta que conduce á liberdade?»",
        text_ja: "「自由への扉はどちらですか？」",
        isCorrect: false,
        feedback_es: "Inútil. Si le preguntas al mentiroso te señalará la muerte, y si le preguntas al veraz te señalará la libertad, sin saber quién es quién."
      },
      {
        id: "opt_compuesta",
        text_es: "«¿Qué me diría el otro centinela si le pregunto cuál es la puerta segura?»",
        text_en: "'What would the other guard say if I asked him which door is safe?'",
        text_fr: "« Que me répondrait l'autre sentinelle si je lui demandais quelle est la bonne porte ? »",
        text_de: "„Was würde der andere Wächter antworten, wenn ich ihn frage, welche Tür sicher ist?“",
        text_ca: "«Què em diria l'altre sentinella si li pregunto quina és la porta segura?»",
        text_va: "«Què em diria l'altre sentinella si li pregunte quina és la porta segura?»",
        text_eu: "«Zer esango lidake beste zaindariak ate segurua zein den galdetuko banio?»",
        text_gl: "«Que me diría o outro sentinela se lle pregunto cal é a porta segura?»",
        text_ja: "「もう1人の門番に『安全な扉はどれか』と尋ねたら、彼はどちらの扉だと答えますか？」",
        isCorrect: true,
        feedback_es: "¡Perfecto! Al forzar una doble negación lógica (+ × - = -), ambos centinelas señalarán inevitablemente la puerta de la muerte."
      },
      {
        id: "opt_identidad",
        text_es: "«¿Eres tú el que siempre dice la verdad?»",
        text_en: "'Are you the one who always tells the truth?'",
        text_fr: "« Es-tu celui qui dit toujours la vérité ? »",
        text_de: "„Bist du derjenige, der immer die Wahrheit sagt?“",
        text_ca: "«Ets tu el que sempre diu la veritat?»",
        text_va: "«Eres tu el que sempre diu la veritat?»",
        text_eu: "«Zeu zara beti egia esaten duena?»",
        text_gl: "«Es ti quen sempre di a verdade?»",
        text_ja: "「あなたは常に真実を話す門番ですか？」",
        isCorrect: false,
        feedback_es: "Ambos centinelas responderán «SÍ», por lo que no obtienes información sobre las puertas."
      }
    ],

    interactiveType: "guards_simulator",

    solution_title_es: "El Producto Lógico de la Mentira (+ × - = -)",
    solution_title_en: "The Inversion Logic of Falsehood (+ × - = -)",
    solution_title_fr: "Le Produit Logique du Mensonge (+ × - = -)",
    solution_title_de: "Die logische Multiplikation der Lüge (+ × - = -)",
    solution_title_ca: "El Producte Lògic de la Mentida (+ × - = -)",
    solution_title_va: "El Producte Lògic de la Mentida (+ × - = -)",
    solution_title_eu: "Gezurraren Biderketa Logikoa (+ × - = -)",
    solution_title_gl: "O Produto Lóxico da Mentira (+ × - = -)",
    solution_title_ja: "嘘の論理積反転回路（真実×嘘＝嘘）",

    solution_explanation_es: `
      <div class="proof-steps">
        <div class="proof-step">
          <strong>1. Caso A: Si le preguntas al centinela VERAZ:</strong>
          <p>Él dice la verdad sobre lo que diría el mentiroso. Como el mentiroso señalaría la puerta de la MUERTE 💀, el veraz te dirá con total honestidad: <em>«El otro te diría que la puerta segura es la de la Muerte»</em>.</p>
        </div>
        <div class="proof-step">
          <strong>2. Caso B: Si le preguntas al centinela MENTIROSO:</strong>
          <p>El mentiroso sabe que el veraz señalaría la puerta de la LIBERTAD ✨. Pero como el mentiroso está obligado a mentir, te dirá lo contrario: <em>«El otro te diría que la puerta segura es la de la Muerte»</em>.</p>
        </div>
        <div class="proof-step">
          <strong>3. Regla de Oro Infalible:</strong>
          <p>No importa a cuál de los dos le preguntes: <strong>AMBOS te señalarán la puerta de la muerte</strong>. Por tanto, solo tienes que <strong>elegir la puerta opuesta a la que te indiquen</strong> para salir en libertad.</p>
        </div>
      </div>
    `,
    curiosity_es: "Inmortalizado en la película 'Dentro del Laberinto' (1986) con David Bowie, este acertijo fue diseñado por el lógico matemático Raymond Smullyan en su obra '¿Cómo se llama este libro?'."
  },

  // =========================================================================
  // ENIGMA 3: EL CAMINO DEL MONJE EN LA MONTAÑA (Topología & Valor Intermedio)
  // =========================================================================
  {
    id: "camino_monje",
    icon: "🧘",
    badge_es: "TOPOLOGÍA & VALOR INTERMEDIO",
    badge_en: "TOPOLOGY & INTERMEDIATE VALUE",
    badge_fr: "TOPOLOGIE & VALEUR INTERMÉDIAIRE",
    badge_de: "TOPOLOGIE & ZWISCHENWERTSATZ",
    badge_ca: "TOPOLOGIA & VALOR INTERMEDI",
    badge_va: "TOPOLOGIA & VALOR INTERMEDI",
    badge_eu: "TOPOLOGIA ETA TARTEKO BALIOA",
    badge_gl: "TOPOLOXÍA E VALOR INTERMEDIO",
    badge_ja: "位相幾何学と中間値の定理",

    title_es: "El Camino del Monje en la Montaña",
    title_en: "The Monk's Mountain Path",
    title_fr: "Le Chemin du Moine sur la Montagne",
    title_de: "Des Mönchs Bergpfad",
    title_ca: "El Camí del Monjo a la Muntanya",
    title_va: "El Camí del Monjo a la Muntanya",
    title_eu: "Mugimenduaren Bidea Mendian",
    title_gl: "O Camiño do Monxe na Montaña",
    title_ja: "僧侶の登山道（中間値の定理）",

    subtitle_es: "¿Existe un punto exacto donde el reloj marcó la misma hora en subida y bajada?",
    subtitle_en: "Is there an exact spot where the clock showed the same time going up and down?",
    subtitle_fr: "Existe-t-il un point exact où la montre indiquait la même heure à l'aller et au retour ?",
    subtitle_de: "Gibt es einen Punkt, an dem die Uhr bei Auf- und Abstieg dieselbe Zeit anzeigte?",
    subtitle_ca: "Existeix un punt exacte on el rellotge marcava la mateixa hora en pujar i baixar?",
    subtitle_va: "Existix un punt exacte on el rellotge marcava la mateixa hora en pujar i baixar?",
    subtitle_eu: "Ba al dago leku zehatz bat non erlojuak ordu bera markatu zuen igotzean eta jaistean?",
    subtitle_gl: "Existe un punto exacto onde o reloxo marcaba a mesma hora ao subir e ao baixar?",
    subtitle_ja: "行きと帰りで、時計が全く同じ時刻を指した地点が必ず存在する理由とは？",

    story_es: "Un monje budista parte al amanecer de su monasterio situado en el valle para subir a un santuario en la cima de la montaña. El sendero es estrecho y sinuoso.\n\nEl monje tarda varias horas en subir: camina a ritmo desigual, acelera, se sienta a descansar a la sombra de un árbol y finalmente llega a la cima al atardecer. Pasa la noche rezando y durmiendo en el templo.\n\nA la mañana siguiente, exactamente a la misma hora del amanecer, inicia el camino de regreso hacia el monasterio por el mismo y único sendero. Baja a una velocidad diferente a la de subida, hace pausas distintas y tarda menos tiempo en llegar al valle.\n\nA pesar de las diferencias de velocidad, paradas y tiempo total: se afirma que <strong>el monje pasó por algún punto exacto del sendero a la misma hora del reloj en ambos días</strong>.",
    story_en: "A monk departs at dawn from his valley monastery to climb up to a mountain peak shrine. The path is narrow and winding.\n\nThe monk ascends at varying speeds, stops to rest under trees, and reaches the top at dusk. He spends the night praying and sleeping.\n\nThe next morning, at the exact same time of dawn, he begins his descent along the exact same path. He moves faster, takes different breaks, and arrives at the monastery in less time.\n\nYet, it is mathematically proven that <strong>the monk crossed an exact spot on the trail at the exact same hour and minute on both days</strong>.",
    story_fr: "Un moine part à l'aube de son monastère pour gravir une montagne. Le sentier est étroit et sinueux. Il monte à des vitesses variables, s'arrête pour méditer et arrive au sommet au crépuscule. Il y passe la nuit.\n\nLe lendemain, exactement à la même heure de l'aube, il redescend par le même chemin. Il marche à un rythme différent, fait d'autres pauses et arrive plus vite au monastère.\n\nPourtant, il est prouvé que <strong>le moine est passé par un endroit précis du sentier exactement à la même heure les deux jours</strong>.",
    story_de: "Ein Mönch bricht im Morgengrauen auf, um einen Berggipfel zu erklimmen. Er wandert mit wechselndem Tempo, ruht sich aus und erreicht den Gipfel am Abend. Er übernachtet dort.\n\nAm nächsten Morgen um dieselbe Uhrzeit wandert er denselben Pfad hinab. Er läuft schneller und pausiert anders.\n\nDennoch steht fest: <strong>Es gibt einen Punkt auf dem Pfad, den der Mönch an beiden Tagen zur exakt selben Uhrzeit passierte</strong>.",
    story_ca: "Un monjo surt a trenc d'alba del seu monestir per pujar al cim d'una muntanya. Camina a velocitats desiguals, descansa i arriba al capvespre. Hi passa la nit.\n\nL'endemà, a la mateixa hora exacta de l'alba, baixa pel mateix sender a un altre ritme.\n\nMalgrat tot, es demostra que <strong>el monjo va passar per un punt exacte del camí a la mateixa hora del rellotge en ambdós dies</strong>.",
    story_va: "Un monjo ix a punta d'alba del seu monestir per pujar al cim d'una muntanya. Camina a velocitats desiguals, descansa i arriba a poqueta nit. Hi passa la nit.\n\nL'endemà, a la mateixa hora exacta de l'alba, baixa pel mateix sender a un altre ritme.\n\nMalgrat tot, es demostra que <strong>el monjo va passar per un punt exacte del camí a la mateixa hora del rellotge en dos dies</strong>.",
    story_eu: "Monje batek goizaldean mendi tontorrera igotzen du. Abiadura aldakorrean ibiltzen da, atseden hartzen du eta ilunabarrean iristen da. Bertan igarotzen du gaua.\n\nHurrengo goizean, ordu berean, bide beretik jaisten da beste erritmo batean.\n\nFrogatuta dago <strong>monjea bi egunetan ordu berdinean bideko puntu zehatz batetik igaro zela</strong>.",
    story_gl: "Un monxe sae ao amencer para subir ao cumio dunha montaña. Camiña a ritmo desigual, descansa e chega ao solpor. Pasa a noite alí.\n\nÁ mañá seguinte, exactamente á mesma hora do amencer, baixa polo mesmo carreiro.\n\nDemóstrase que <strong>o monxe pasou por algún punto exacto do camiño á mesma hora nos dous días</strong>.",
    story_ja: "ある僧侶が夜明けとともに麓の寺を出発し、山頂の聖堂へと登り始めました。歩く速さは一定でなく、途中で休んだりしながら夕方に山頂へ到着し、一晩過ごしました。\n\n翌朝、前日と全く同じ夜明けの時刻に、同じ一本道を麓へ向かって下り始めました。下りは登りとは違う速度で歩き、休憩のタイミングも異なっていました。\n\n歩く速度や休憩にかかわらず、<strong>僧侶は行きと帰りで、1日のうちのまったく同じ時刻に通過した地点が必ず存在する</strong>と言われています。",

    question_es: "¿Por qué estamos 100% seguros de que este punto existe?",
    question_en: "Why are we 100% certain that such a point exists?",
    question_fr: "Pourquoi sommes-nous certains à 100 % que ce point existe ?",
    question_de: "Warum sind wir absolut sicher, dass dieser Punkt existiert?",
    question_ca: "Per què estem 100% segurs que aquest punt existeix?",
    question_va: "Per què estem 100% segurs que este punt existix?",
    question_eu: "Zergatik gaude %100 ziur puntu hori existitzen dela?",
    question_gl: "Por que estamos 100% seguros de que este punto existe?",
    question_ja: "なぜそのような地点が確実に存在すると証明できるのでしょうか？",

    options: [
      {
        id: "opt_velocidad",
        text_es: "Solo existe si la velocidad promedio de subida fue exactamente igual a la de bajada.",
        text_en: "It only exists if the average uphill speed equaled the downhill speed.",
        text_fr: "Il n'existe que si la vitesse moyenne de montée était égale à celle de descente.",
        text_de: "Nur wahr, wenn die Durchschnittsgeschwindigkeit exakt gleich war.",
        text_ca: "Només existeix si la velocitat mitjana de pujada i baixada va ser idèntica.",
        text_va: "Només existix si la velocitat mitjana de pujada i baixada va ser idèntica.",
        text_eu: "Igotzeko eta jaisteko batez besteko abiadura bera zenean bakarrik gertatzen da.",
        text_gl: "Só existe se a velocidade media de subida e baixada foi idéntica.",
        text_ja: "行きと帰りの平均速度が完全に一致していた場合のみ成り立つ。",
        isCorrect: false,
        feedback_es: "Falso. La velocidad no influye en absoluto; pueden correr, tropezar o pararse horas."
      },
      {
        id: "opt_dos_monjes",
        text_es: "Basta imaginar a DOS monjes saliendo el mismo día a la misma hora (uno desde la cima y otro desde el valle): al seguir el mismo sendero, obligatoriamente se cruzan.",
        text_en: "Imagine TWO monks starting on the same day at the same time (one from the valley, one from the peak): sharing one path, they must cross paths.",
        text_fr: "Il suffit d'imaginer DEUX moines partant le même jour à la même heure : sur un seul sentier, ils doivent forcément se croiser.",
        text_de: "Man stelle sich ZWEI Mönche vor, die am selben Tag zeitgleich von oben und unten starten: Sie müssen sich auf dem Pfad begegnen.",
        text_ca: "Només cal imaginar DOS monjos sortint el mateix dia a la mateixa hora des dels dos extrems: s'han de creuar per força.",
        text_va: "Només cal imaginar DOS monjos eixint el mateix dia a la mateixa hora des dels dos extrems: s'han de creuar per força.",
        text_eu: "Nahikoa da egun berean eta ordu berean kontrako muturretatik irteten diren BI monje irudikatzea: ezinbestean topo egingo dute.",
        text_gl: "Basta imaxinar a DOUS monxes saíndo o mesmo día á mesma hora dende os dous extremos: teñen que cruzarse.",
        text_ja: "「同じ日の同じ時刻に出発した2人の僧侶」（1人は登り、もう1人は下り）を想像すれば、1本道である以上、途中で必ずすれ違う瞬間がある。",
        isCorrect: true,
        feedback_es: "¡Genial! Este truco de perspectiva geométrica ilustra el Teorema del Valor Intermedio de Bolzano."
      },
      {
        id: "opt_mediodia",
        text_es: "Ocurre únicamente en el punto medio geométrico de la montaña exactamente a las 12:00 del mediodía.",
        text_en: "It happens strictly at the exact geometric midpoint of the mountain at noon.",
        text_fr: "Cela ne se produit qu'au milieu géométrique de la montagne à midi pile.",
        text_de: "Es geschieht exakt am geografischen Mittelpunkt um 12:00 Uhr mittags.",
        text_ca: "Passa estrictament al punt mitjà geomètric de la muntanya al migdia.",
        text_va: "Passa estrictament al punt mitjà geomètric de la muntanya al migdia.",
        text_eu: "Mendiaren erdiko puntu geometrikoan bakarrik gertatzen da eguerdian.",
        text_gl: "Acontece unicamente no punto medio xeométrico da montaña ao mediodía.",
        text_ja: "正午（12:00）ちょうどに、山の幾何学的な中間地点でのみ発生する。",
        isCorrect: false,
        feedback_es: "Incorrecto. El punto de encuentro no tiene por qué ser el centro ni ocurrir al mediodía."
      }
    ],

    interactiveType: "monk_simulator",

    solution_title_es: "El Teorema de Bolzano y la Equivalencia de Dos Monjes",
    solution_title_en: "Bolzano's Theorem & The Two Monks Equivalence",
    solution_title_fr: "Le Théorème de Bolzano et l'Équivalence des Deux Moines",
    solution_title_de: "Der Zwischenwertsatz von Bolzano & die Zwei-Mönche-Analogie",
    solution_title_ca: "El Teorema de Bolzano i l'Equivalència dels Dos Monjos",
    solution_title_va: "El Teorema de Bolzano i l'Equivalència dels Dos Monjos",
    solution_title_eu: "Bolzanoren Teorema eta Bi Monjeen Baliokidetasuna",
    solution_title_gl: "O Teorema de Bolzano e a Equivalencia dos Dous Monxes",
    solution_title_ja: "ボルツァーノの中間値の定理と「2人の僧侶」の空間同一化",

    solution_explanation_es: `
      <div class="proof-steps">
        <div class="proof-step">
          <strong>1. La Transformación del Problema:</strong>
          <p>En lugar de pensar en el mismo monje en dos días distintos, <strong>imagina que son dos monjes gemelos que parten el mismo día a la misma hora del amanecer</strong>: el Monje A sale del monasterio subiendo hacia la cima, y el Monje B sale de la cima bajando hacia el monasterio.</p>
        </div>
        <div class="proof-step">
          <strong>2. El Encuentro Inevitable:</strong>
          <p>Como ambos caminan por el mismo sendero continuo y van en direcciones opuestas entre el amanecer y el anochecer, <strong>en algún momento del día se tienen que cruzar físicamente cara a cara</strong>. En ese instante exacto del reloj, ambos están exactamente en el mismo punto del sendero.</p>
        </div>
        <div class="proof-step">
          <strong>3. Demostración Matemática Formal:</strong>
          <p>Sea $f(t)$ la posición del monje el día 1 y $g(t)$ su posición el día 2. Definimos $h(t) = f(t) - g(t)$. En $t = \text{amanecer}$, $h(t) < 0$. En $t = \text{anochecer}$, $h(t) > 0$. Por el <strong>Teorema del Valor Intermedio (Bolzano)</strong> para funciones continuas, existe obligatoriamente un instante $t^*$ tal que $h(t^*) = 0$, es decir, $f(t^*) = g(t^*)$.</p>
        </div>
      </div>
    `,
    curiosity_es: "Propuesto en 1952 por el matemático Karl Duncker, es el ejemplo pedagógico por excelencia de cómo cambiar el marco de referencia temporal a uno espacial resuelve paradojas al instante."
  },

  // =========================================================================
  // ENIGMA 4: LAS TRES CAJAS DE FRUTA MAL ETIQUETADAS (Teoría de la Información)
  // =========================================================================
  {
    id: "cajas_frutas",
    icon: "🍎",
    badge_es: "TEORÍA DE LA INFORMACIÓN",
    badge_en: "INFORMATION THEORY",
    badge_fr: "THÉORIE DE L'INFORMATION",
    badge_de: "INFORMATIONSTHEORIE",
    badge_ca: "TEORIA DE LA INFORMACIÓ",
    badge_va: "TEORIA DE LA INFORMACIÓ",
    badge_eu: "INFORMAZIOAREN TEORIA",
    badge_gl: "TEORÍA DA INFORMACIÓN",
    badge_ja: "情報理論と最小サンプリング",

    title_es: "Manzanas Traigo (Las Tres Cajas)",
    title_en: "The Three Mislabelled Fruit Boxes",
    title_fr: "Les Trois Boîtes de Fruits Mal Étiquetées",
    title_de: "Die drei falsch beschrifteten Obstkisten",
    title_ca: "Les Tres Caixes de Fruita Mal Etiquetades",
    title_va: "Les Tres Caixes de Fruita Mal Etiquetades",
    title_eu: "Gaizki Etiketatutako Hiru Fruta Kutxak",
    title_gl: "As Tres Caixas de Froita Mal Etiquetadas",
    title_ja: "ラベルが全て間違っている3つの果物箱",

    subtitle_es: "Sacando una sola fruta de una sola caja puedes identificar las tres cajas. ¿Cómo?",
    subtitle_en: "By picking just one fruit from one box, you can label all three. How?",
    subtitle_fr: "En piochant un seul fruit d'une seule boîte, vous identifiez les trois. Comment ?",
    subtitle_de: "Ziehe eine einzige Frucht aus einer Kiste und ordne alle drei zu. Wie?",
    subtitle_ca: "Traient una sola fruita d'una sola caixa pots identificar-les totes tres. Com?",
    subtitle_va: "Traient una sola fruita d'una sola caixa pots identificar-les totes tres. Com?",
    subtitle_eu: "Kutxa bakar batetik fruta bakarra aterata, hiru kutxak identifikatu ditzakezu. Nola?",
    subtitle_gl: "Sacando unha soa froita dunha soa caixa podes identificar as tres. Como?",
    subtitle_ja: "たった1つの箱から果物を1個だけ取り出すことで、3つの箱の中身をすべて特定する方法とは？",

    story_es: "Regentas una distinguida frutería y recibes tres cajas de madera opacas cerradas:\n\n• Una caja contiene únicamente MANZANAS 🍎.\n• Otra caja contiene únicamente NARANJAS 🍊.\n• La tercera caja contiene una mezcla de MANZANAS Y NARANJAS 🍎🍊.\n\nCada caja lleva una etiqueta adherida: «Manzanas», «Naranjas» y «Manzanas y Naranjas».\n\nEl distribuidor te avisa: <strong>«¡Ojo! Las tres cajas están completamente mal etiquetadas: NINGUNA caja tiene la etiqueta que le corresponde»</strong>.\n\nSolo se te permite meter la mano con los ojos vendados en <strong>UNA sola caja y extraer UNA sola pieza de fruta</strong>.",
    story_en: "You run a store and receive three sealed wooden boxes:\n\n• One box contains only APPLES 🍎.\n• One box contains only ORANGES 🍊.\n• The third box contains a MIX of both 🍎🍊.\n\nThe boxes are labelled: 'Apples', 'Oranges', and 'Apples & Oranges'.\n\nYou are informed: <strong>'Every single box is mislabelled. Not a single label is correct!'</strong>\n\nYou are allowed to reach into <strong>ONE box only and pull out exactly ONE fruit</strong>.",
    story_fr: "Vous recevez trois caisses fermées :\n\n• Une ne contient que des POMMES 🍎.\n• Une ne contient que des ORANGES 🍊.\n• Une contient un MÉLANGE des deux 🍎🍊.\n\nElles sont étiquetées : « Pommes », « Oranges » et « Pommes et Oranges ».\n\nLe livreur vous avertit : <strong>« Toutes les étiquettes sont fausses sans exception ! »</strong>\n\nVous ne pouvez tirer <strong>qu'un seul fruit d'une seule boîte</strong>.",
    story_de: "Du erhältst drei verschlossene Kisten:\n\n• Eine enthält nur ÄPFEL 🍎.\n• Eine enthält nur ORANGEN 🍊.\n• Eine enthält eine MISCHUNG 🍎🍊.\n\nDie Kisten tragen die Schilder: „Äpfel“, „Orangen“ und „Mischung“.\n\nDu weißt: <strong>Jede Kiste ist garantiert falsch beschriftet!</strong>\n\nDu darfst <strong>eine einzige Frucht aus nur einer Kiste</strong> ziehen.",
    story_ca: "Rebeu tres caixes tancades:\n\n• Una conté només POMES 🍎.\n• Una conté només TARONGES 🍊.\n• La tercera conté una MESCLA de pomes i taronges 🍎🍊.\n\nLes etiquetes són: «Pomes», «Taronges» i «Pomes i Taronges».\n\nUs adverteixen: <strong>«Totes les caixes estan mal etiquetades!»</strong>\n\nNomés podeu treure <strong>una sola fruita d'una sola caixa</strong>.",
    story_va: "Rebeu tres caixes tancades:\n\n• Una conté només POMES 🍎.\n• Una conté només TARONGES 🍊.\n• La tercera conté una MESCLA de pomes i taronges 🍎🍊.\n\nLes etiquetes són: «Pomes», «Taronges» i «Pomes i Taronges».\n\nVos advertixen: <strong>«Totes les caixes estan mal etiquetades!»</strong>\n\nNomés podeu traure <strong>una sola fruita d'una sola caixa</strong>.",
    story_eu: "Hiru kutxa itxi jasotzen dituzu:\n\n• Batek SAGARRAK bakarrik ditu 🍎.\n• Beste batek LARRANJAK bakarrik ditu 🍊.\n• Hirugarrenak NAHASTURA du 🍎🍊.\n\nJakinarazten dizute: <strong>«Kutxa guztiak gaizki etiketatuta daude!»</strong>\n\n<strong>Kutxa bakar batetik fruta bakar bat</strong> atera dezakezu.",
    story_gl: "Recibes tres caixas pechadas:\n\n• Unha contén só MAZÁS 🍎.\n• Outra contén só LARANXAS 🍊.\n• A terceira contén unha MESTURA 🍎🍊.\n\nAvísante: <strong>«Todas as caixas están mal etiquetadas!»</strong>\n\nSó podes sacar <strong>unha soa froita dunha soa caixa</strong>.",
    story_ja: "あなたは3つの閉ざされた木箱を受け取りました：\n\n• 1つは「リンゴのみ」 🍎。\n• 1つは「ミカンのみ」 🍊。\n• 1つは「リンゴとミカンの混合」 🍎🍊。\n\n箱にはそれぞれ「リンゴ」「ミカン」「リンゴとミカン」と書かれたラベルが貼られています。\n\n送り主から警告されました：<strong>「すべてのラベルは完全に間違っており、正しく貼られている箱は1つもありません！」</strong>\n\nあなたは<strong>どれか1つの箱から、果物を1個だけ取り出す</strong>ことが許されています。",

    question_es: "¿De qué caja debes sacar esa única pieza de fruta para conocer el contenido de las tres?",
    question_en: "From which box must you pick that single fruit to deduce all three?",
    question_fr: "De quelle boîte devez-vous tirer ce fruit unique pour déduire les trois ?",
    question_de: "Aus welcher Kiste musst du die Frucht ziehen, um alle drei zu bestimmen?",
    question_ca: "De quina caixa has de treure aquesta única fruita per conèixer les tres?",
    question_va: "De quina caixa has de traure esta única fruita per conèixer les tres?",
    question_eu: "Zein kutxatatik atera behar duzu fruta hiru kutxen edukia jakiteko?",
    question_gl: "De que caixa debes sacar esa única froita para coñecer o contido das tres?",
    question_ja: "3つの箱すべての中身を完璧に特定するには、どのラベルの箱から果物を取り出すべきでしょうか？",

    options: [
      {
        id: "opt_manzanas",
        text_es: "De la caja etiquetada como «Manzanas».",
        text_en: "From the box labelled 'Apples'.",
        text_fr: "De la boîte étiquetée « Pommes ».",
        text_de: "Aus der Kiste mit der Aufschrift „Äpfel“.",
        text_ca: "De la caixa etiquetada com a «Pomes».",
        text_va: "De la caixa etiquetada com a «Pomes».",
        text_eu: "«Sagarrak» etiketa duen kutxatik.",
        text_gl: "Da caixa etiquetada como «Mazás».",
        text_ja: "「リンゴ」と書かれた箱。",
        isCorrect: false,
        feedback_es: "Incorrecto. Si sacas una naranja de la caja 'Manzanas', no sabes si es la de solo naranjas o la mixta."
      },
      {
        id: "opt_naranjas",
        text_es: "De la caja etiquetada como «Naranjas».",
        text_en: "From the box labelled 'Oranges'.",
        text_fr: "De la boîte étiquetée « Oranges ».",
        text_de: "Aus der Kiste mit der Aufschrift „Orangen“.",
        text_ca: "De la caixa etiquetada com a «Taronges».",
        text_va: "De la caixa etiquetada com a «Taronges».",
        text_eu: "«Laranjak» etiketa duen kutxatik.",
        text_gl: "Da caixa etiquetada como «Laranxas».",
        text_ja: "「ミカン」と書かれた箱。",
        isCorrect: false,
        feedback_es: "Incorrecto. Presenta la misma ambigüedad simétrica que la caja de manzanas."
      },
      {
        id: "opt_mixta",
        text_es: "De la caja etiquetada como «Manzanas y Naranjas».",
        text_en: "From the box labelled 'Apples & Oranges'.",
        text_fr: "De la boîte étiquetée « Pommes et Oranges ».",
        text_de: "Aus der Kiste mit der Aufschrift „Äpfel und Orangen“ (Mischung).",
        text_ca: "De la caixa etiquetada com a «Pomes i Taronges».",
        text_va: "De la caixa etiquetada com a «Pomes i Taronges».",
        text_eu: "«Sagarrak eta Laranjak» etiketa duen kutxatik.",
        text_gl: "Da caixa etiquetada como «Mazás e Laranxas».",
        text_ja: "「リンゴとミカン」（混合）と書かれた箱。",
        isCorrect: true,
        feedback_es: "¡Brillante! Como está mal etiquetada, sabes con certeza que NO es mixta. La fruta que saques define esa caja por completo."
      }
    ],

    interactiveType: "fruit_boxes_sim",

    solution_title_es: "El Poder del Descarte en Cascada",
    solution_title_en: "The Power of Cascade Elimination",
    solution_title_fr: "La Puissance de l'Élimination en Cascade",
    solution_title_de: "Die Macht der Kaskaden-Ausschlusslogik",
    solution_title_ca: "El Poder del Descart en Cascada",
    solution_title_va: "El Poder del Descart en Cascada",
    solution_title_eu: "Kaskadako Baztertzearen Indarra",
    solution_title_gl: "O Poder do Descarte en Cascada",
    solution_title_ja: "ドミノ連鎖消去法の数理",

    solution_explanation_es: `
      <div class="proof-steps">
        <div class="proof-step">
          <strong>1. La Caja Clave («Manzanas y Naranjas»):</strong>
          <p>Como sabemos que <em>todas están mal etiquetadas</em>, la caja con la etiqueta «Manzanas y Naranjas» <strong>NO puede ser la mezcla</strong>. Por tanto, o bien es 100% Manzanas, o bien es 100% Naranjas.</p>
        </div>
        <div class="proof-step">
          <strong>2. Si sacas una MANZANA 🍎:</strong>
          <p>Esa caja es indiscutiblemente la de <strong>solo manzanas</strong>. Ahora quedan dos cajas mal etiquetadas («Manzanas» y «Naranjas»). La caja con la etiqueta «Manzanas» no puede tener manzanas (están en la primera) ni puede ser manzanas (su etiqueta mentiría): ¡por tanto tiene que ser <strong>la mezcla 🍎🍊</strong>! Y la etiquetada como «Naranjas» tiene que ser <strong>solo naranjas 🍊</strong>.</p>
        </div>
        <div class="proof-step">
          <strong>3. Si sacas una NARANJA 🍊:</strong>
          <p>Ocurre exactamente lo simétrico: la caja elegida es solo naranjas, la etiquetada como «Naranjas» es la mezcla y la etiquetada como «Manzanas» es solo manzanas.</p>
        </div>
      </div>
    `,
    curiosity_es: "Un enigma clásico de las entrevistas técnicas de Google y Bell Labs para evaluar la capacidad de maximizar la entropía de información con la menor muestra física posible."
  },

  // =========================================================================
  // ENIGMA 5: LA CONTRASEÑA DEL CUARTEL SECRETO (Criptografía & Trampa Inductiva)
  // =========================================================================
  {
    id: "contrasena_policial",
    icon: "🕵️‍♂️",
    badge_es: "TRAMPA INDUCTIVA",
    badge_en: "INDUCTIVE TRAP",
    badge_fr: "PIÈGE INDUCTIF",
    badge_de: "INDUKTIONSFALLE",
    badge_ca: "TRAMPA INDUCTIVA",
    badge_va: "TRAMPA INDUCTIVA",
    badge_eu: "LOMBIAR INDUKTIBOA",
    badge_gl: "TRAMPA INDUCTIVA",
    badge_ja: "帰納的推論の罠",

    title_es: "La Contraseña del Cuartel Secreto",
    title_en: "The Secret Headquarters Password",
    title_fr: "Le Mot de Passe du Repaire Secret",
    title_de: "Das Passwort des Geheimquartiers",
    title_ca: "La Contrasenya de la Seu Secreta",
    title_va: "La Contrasenya de la Seu Secreta",
    title_eu: "Kuartel Sekretuaren Pasahitza",
    title_gl: "O Contrasinal do Cuartel Secreto",
    title_ja: "秘密アジトの暗号パスワード",

    subtitle_es: "18→9, 8→4, 14→7... ¿Por qué decir 0 ante '0' y 3 ante '6' fue fatal?",
    subtitle_en: "18→9, 8→4, 14→7... Why answering 0 to '0' and 3 to '6' was fatal?",
    subtitle_fr: "18→9, 8→4, 14→7... Pourquoi répondre 0 à « 0 » a été mortel ?",
    subtitle_de: "18→9, 8→4, 14→7... Warum war 0 auf „0“ und 3 auf „6“ tödlich?",
    subtitle_ca: "18→9, 8→4, 14→7... Per què dir 0 davant '0' i 3 davant '6' va ser fatal?",
    subtitle_va: "18→9, 8→4, 14→7... Per què dir 0 davant '0' i 3 davant '6' va ser fatal?",
    subtitle_eu: "18→9, 8→4, 14→7... Zergatik izan zen hilgarria?",
    subtitle_gl: "18→9, 8→4, 14→7... Por que dicir 0 ante '0' e 3 ante '6' foi fatal?",
    subtitle_ja: "18→9, 8→4, 14→7… なぜ「0に0」「6に3」と答えた潜入捜査官は射殺されたのか？",

    story_es: "Un grupo de policías de élite vigila la puerta blindada del cuartel general de una banda criminal. Necesitan la contraseña secreta para infiltrarse y escuchan a través de micrófonos:\n\n• Un delincuente se acerca a la mirilla. Desde dentro le dicen: «18». El hombre contesta: «9». La puerta se abre.\n• Llega otro sospechoso. Desde dentro le dicen: «8». El tipo contesta: «4». Lo dejan entrar.\n• Llega un tercero. Le dicen: «14». Contesta: «7» y le abren la puerta.\n\nLos inspectores se frotan las manos: *«¡Está chupado! Solo hay que dividir entre dos el número que digan»*.\n\nEnvían a su primer agente infiltrado. Desde el interior le dicen: «0». El policía responde confiado: «0». Inmediatamente le disparan y lo abaten. Envían a un segundo agente. Le dicen: «6». Responde: «3». Vuelven a disparar y lo matan.",
    story_en: "Police officers stake out the hideout of a criminal gang to find the password:\n\n• First gangster arrives: Guard says '18'. He answers '9'. Door opens.\n• Second arrives: Guard says '8'. He answers '4'. Door opens.\n• Third arrives: Guard says '14'. He answers '7'. Door opens.\n\nPolice deduce: 'It's half! Divide by two!'\n\nThey send an agent. Guard says '0'. Agent says '0'. Gunshots! He's killed. They send another. Guard says '6'. Agent says '3'. Gunshots again!",
    story_fr: "Des policiers surveillent le repaire d'un gang pour intercepter le mot de passe :\n\n• Un homme arrive : la sentinelle dit « 18 ». Il répond « 9 ». La porte s'ouvre.\n• Un autre arrive : on lui dit « 8 ». Il répond « 4 ». Il entre.\n• Un troisième arrive : « 14 » -> il répond « 7 ». Il entre.\n\nLes policiers concluent : « Il suffit de diviser par deux ! »\n\nPremier agent envoyé : la sentinelle dit « 0 ». L'agent répond « 0 ». Tirs mortels ! Second agent : « 6 » -> il répond « 3 ». Tirs mortels !",
    story_de: "Polizisten belauschen das Hauptquartier einer Bande:\n\n• Ein Typ kommt: Drinnen ruft man „18“. Er antwortet „9“. Tür öffnet sich.\n• Der nächste: „8“ -> Er sagt „4“. Er darf rein.\n• Ein dritter: „14“ -> Er sagt „7“. Er darf rein.\n\nPolizisten: „Man muss einfach durch zwei teilen!“\n\nAgent 1 geht hin: Man ruft „0“. Er sagt „0“. Schüsse, er stirbt! Agent 2 geht hin: Man ruft „6“. Er sagt „3“. Wieder Schüsse!",
    story_ca: "Uns policies vigilen la porta d'una banda per esbrinar la contrasenya:\n\n• Arriba un: li diuen «18». Contesta «9». Obre.\n• Arriba un altre: «8» -> «4». Obre.\n• Un tercer: «14» -> «7». Obre.\n\nEls policies pensen: «Només cal dividir per dos!»\n\nEnvien un agent: li diuen «0». Diu «0». Li disparen! Enviaren un altre: «6» -> diu «3». Li disparen també!",
    story_va: "Uns policies vigilen la porta d'una banda per esbrinar la contrasenya:\n\n• Arriba un: li diuen «18». Contesta «9». Obri.\n• Arriba un altre: «8» -> «4». Obri.\n• Un tercer: «14» -> «7». Obri.\n\nEls policies pensen: «Només cal dividir per dos!»\n\nEnvien un agent: li diuen «0». Diu «0». Li disparen! Enviaren un altre: «6» -> diu «3». Li disparen també!",
    story_eu: "Poliziek koadrilaren pasahitza asmatu nahi dute:\n\n• «18» esaten dute -> «9» erantzuten du. Irekitzen dute.\n• «8» -> «4». Irekitzen dute.\n• «14» -> «7». Irekitzen dute.\n\nPoliziek bitan banatu behar dela uste dute. «0» esatean «0» erantzun eta tiro egiten diote!",
    story_gl: "A policía investiga o contrasinal:\n\n• Din «18» -> Responde «9». Abre.\n• Din «8» -> Responde «4». Abre.\n• Din «14» -> Responde «7». Abre.\n\nCrearon que era dividir entre dous. Ante «0» dixeron «0» e matárono; ante «6» dixeron «3» e matárono tamén.",
    story_ja: "警察が犯罪組織のアジトに潜入するため合言葉を盗聴していました：\n\n• 1人目：合言葉「18」に対し「9」と答え、扉が開いた。\n• 2人目：「8」に対し「4」と答え、扉が開いた。\n• 3人目：「14」に対し「7」と答え、扉が開いた。\n\n「簡単だ！ 言われた数を2で割ればいいのだ」と考えた警察は潜入捜査官を派遣しました。門番が「0」と言うと捜査官は「0」と答え射殺されました。別の捜査官が「6」に「3」と答え、再び射殺されました。",

    question_es: "¿Cuál fue el fatal error de los policías y cuál era la verdadera clave?",
    question_en: "What was the fatal mistake and what was the real password rule?",
    question_fr: "Quelle était l'erreur fatale et quelle était la vraie règle ?",
    question_de: "Was war der fatale Fehler und was war die wahre Regel?",
    question_ca: "Quin va ser l'error fatal i quina era la clau real?",
    question_va: "Quin va ser l'error fatal i quina era la clau real?",
    question_eu: "Zein izan zen akats larria eta zein zen benetako araua?",
    question_gl: "Cal foi o erro fatal e cal era a verdadeira clave?",
    question_ja: "警察が犯した致命的な勘違いと、合言葉の真の法則は何だったでしょうか？",

    options: [
      {
        id: "opt_resta",
        text_es: "Debían restar 9 en lugar de dividir.",
        text_en: "They had to subtract 9 instead of dividing.",
        text_fr: "Il fallait soustraire 9 au lieu de diviser.",
        text_de: "Sie hätten 9 subtrahieren müssen statt zu teilen.",
        text_ca: "Havien de restar 9 en lloc de dividir.",
        text_va: "Havien de restar 9 en lloc de dividir.",
        text_eu: "9 kendu behar zuten zatitu beharrean.",
        text_gl: "Debían restar 9 en lugar de dividir.",
        text_ja: "割り算ではなく、9を引き算すべきだった。",
        isCorrect: false,
        feedback_es: "Incorrecto. 8 - 9 daría negativo y no encaja con el resto de números."
      },
      {
        id: "opt_letras",
        text_es: "La contraseña consistía en decir el NÚMERO DE LETRAS del nombre del número en voz alta.",
        text_en: "The password was to say the NUMBER OF LETTERS in the spoken word of the number.",
        text_fr: "Le mot de passe consistait à dire le NOMBRE DE LETTRES du mot prononcé.",
        text_de: "Das Passwort bestand darin, die ANZAHL DER BUCHSTABEN des gesprochenen Zahlwortes zu nennen.",
        text_ca: "La contrasenya consistia a dir el NOMBRE DE LLETRES de la paraula pronunciada.",
        text_va: "La contrasenya consistia a dir el NOMBRE DE LLETRES de la paraula pronunciada.",
        text_eu: "Pasahitza ahoskatutako zenbaki-hitzaren HIZKI KOPURUA esatea zen.",
        text_gl: "O contrasinal consistía en dicir o NÚMERO DE LETRAS da palabra pronunciada.",
        text_ja: "合言葉は、言われた数字の言葉の「文字数」を答えることだった。",
        isCorrect: true,
        feedback_es: "¡Extraordinario! Cayeron en la trampa del sesgo inductivo: una coincidencia matemática ocultaba un patrón lingüístico (Dieciocho=9, Ocho=4, Catorce=7; Cero=4, Seis=4)."
      },
      {
        id: "opt_hora",
        text_es: "La contraseña cambiaba en función de la hora del reloj y los turnos de guardia.",
        text_en: "The password changed based on the hour and guard shifts.",
        text_fr: "Le mot de passe changeait selon l'heure de la garde.",
        text_de: "Das Passwort wechselte stündlich mit der Wache.",
        text_ca: "La contrasenya canviava segons l'hora del rellotge.",
        text_va: "La contrasenya canviava segons l'hora del rellotge.",
        text_eu: "Pasahitza orduaren arabera aldatzen zen.",
        text_gl: "O contrasinal cambiaba en función da hora.",
        text_ja: "合言葉は時間帯やシフトによって変化する暗号だった。",
        isCorrect: false,
        feedback_es: "Falso. La regla era constante en todo momento, pero no matemática."
      }
    ],

    interactiveType: "password_words_sim",

    solution_title_es: "La Trampa del Sesgo de Confirmación Aritmético",
    solution_title_en: "The Arithmetic Confirmation Bias Trap",
    solution_title_fr: "Le Piège du Biais de Confirmation Arithmétique",
    solution_title_de: "Die Falle des arithmetischen Bestätigungsfehlers",
    solution_title_ca: "La Trampa del Biaix de Confirmació Aritmètic",
    solution_title_va: "La Trampa del Biaix de Confirmació Aritmètic",
    solution_title_eu: "Baieztatze-Aldrebeskeria Aritmetikoaren Tranpa",
    solution_title_gl: "A Trampa do Nesgo de Confirmación Aritmético",
    solution_title_ja: "確証バイアスの罠：数学的偶然に隠された言語的規則",

    solution_explanation_es: `
      <div class="proof-steps">
        <div class="proof-step">
          <strong>1. La Coincidencia Inicial:</strong>
          <p>Los tres primeros ejemplos coincidieron de forma casual con su mitad exacta:</p>
          <ul style="margin: 0.5rem 0 0.5rem 1.5rem; line-height:1.6;">
            <li><strong>D-I-E-C-I-O-C-H-O</strong>: 9 letras (18 / 2 = 9).</li>
            <li><strong>O-C-H-O</strong>: 4 letras (8 / 2 = 4).</li>
            <li><strong>C-A-T-O-R-C-E</strong>: 7 letras (14 / 2 = 7).</li>
          </ul>
        </div>
        <div class="proof-step">
          <strong>2. La Ruptura de la Hipótesis:</strong>
          <p>Al llegar los agentes encubiertos, los números solicitados revelaron la verdadera regla:</p>
          <ul style="margin: 0.5rem 0 0.5rem 1.5rem; line-height:1.6;">
            <li>A «0» (<strong>C-E-R-O</strong>): tiene <strong>4 letras</strong> (responder '0' fue el error fatal).</li>
            <li>A «6» (<strong>S-E-I-S</strong>): tiene <strong>4 letras</strong> (responder '3' fue el segundo error).</li>
          </ul>
        </div>
        <div class="proof-step">
          <strong>3. Lección Epistemológica:</strong>
          <p>La inducción científica exige verificar las hipótesis contra datos no observados. Asumir un patrón con solo tres muestras idénticas es la trampa mental más común en el análisis de inteligencia.</p>
        </div>
      </div>
    `,
    curiosity_es: "Este acertijo se utiliza ampliamente en cursos de pensamiento crítico y epistemología para ilustrar cómo el cerebro humano impone patrones matemáticos complejos sobre reglas gramaticales sencillas."
  },

  // =========================================================================
  // ENIGMA 6: LA SUCESIÓN MÁS DIFÍCIL (Pensamiento Lateral)
  // =========================================================================
  {
    id: "sucesion_dificil",
    icon: "🔢",
    badge_es: "PENSAMIENTO LATERAL",
    badge_en: "LATERAL THINKING",
    badge_fr: "PENSÉE LATÉRALE",
    badge_de: "LATERALES DENKEN",
    badge_ca: "PENSAMENT LATERAL",
    badge_va: "PENSAMENT LATERAL",
    badge_eu: "ALBO PENTSAMENDUA",
    badge_gl: "PENSAMENTO LATERAL",
    badge_ja: "水平思考（ラテラル・シンキング）",

    title_es: "La Sucesión Más Difícil",
    title_en: "The Most Deceptive Sequence",
    title_fr: "La Suite la Plus Trompeuse",
    title_de: "Die trügerischste Zahlenfolge",
    title_ca: "La Successió Més Enganyosa",
    title_va: "La Successió Més Enganyosa",
    title_eu: "Segidarik Zailena",
    title_gl: "A Sucesión Máis Difícil",
    title_ja: "最も難解な数列（言葉の隠された法則）",

    subtitle_es: "1 - 2 - 4 - 5 - 8 - 1000… ¿Qué número sigue en esta desconcertante secuencia?",
    subtitle_en: "1 - 2 - 4 - 5 - 8 - 1000… What is the next number in this puzzling sequence?",
    subtitle_fr: "1 - 2 - 4 - 5 - 8 - 1000… Quel nombre suit cette séquence déroutante ?",
    subtitle_de: "1 - 2 - 4 - 5 - 8 - 1000… Welche Zahl folgt dieser verblüffenden Folge?",
    subtitle_ca: "1 - 2 - 4 - 5 - 8 - 1000… Quin número segueix en aquesta successió?",
    subtitle_va: "1 - 2 - 4 - 5 - 8 - 1000… Quin número seguix en esta successió?",
    subtitle_eu: "1 - 2 - 4 - 5 - 8 - 1000… Zein zenbaki dator segida harrigarri honetan?",
    subtitle_gl: "1 - 2 - 4 - 5 - 8 - 1000… Que número segue nesta desconcertante secuencia?",
    subtitle_ja: "1 - 2 - 4 - 5 - 8 - 1000… この常識破りな数列の次に来る数字は何でしょう？",

    story_es: "Un renombrado catedrático de matemáticas escribe en la pizarra de la academia la siguiente serie numérica y reta a sus alumnos:\n\n<div style=\"font-family:var(--font-mono); font-size:1.4rem; color:var(--gold-light); text-align:center; padding:1rem;\">1 — 2 — 4 — 5 — 8 — 1000 — ¿...?</div>\n\nLos estudiantes intentan progresiones aritméticas, potencias, polinomios de interpolación de Lagrange, fractales y sucesiones de Fibonacci sin éxito.\n\nEl profesor añade con una sonrisa enigmática: *«No busquéis en las calculadoras lo que está escrito en vuestra lengua materna»*.",
    story_en: "A professor writes the sequence on the blackboard:\n\n<div style=\"font-family:var(--font-mono); font-size:1.4rem; color:var(--gold-light); text-align:center; padding:1rem;\">1 — 2 — 4 — 5 — 8 — 1000 — ¿...?</div>\n\nStudents try polynomial interpolation, powers, and prime factorization in vain.\n\nThe professor smiles: 'Do not look into algebra for what is woven into natural language.'",
    story_fr: "Un professeur écrit au tableau :\n\n<div style=\"font-family:var(--font-mono); font-size:1.4rem; color:var(--gold-light); text-align:center; padding:1rem;\">1 — 2 — 4 — 5 — 8 — 1000 — ¿...?</div>\n\nTous les calculs mathématiques échouent. Le professeur sourit : « Ne cherchez pas dans les formules ce qui est écrit dans votre langue. »",
    story_de: "Ein Professor schreibt an die Tafel:\n\n<div style=\"font-family:var(--font-mono); font-size:1.4rem; color:var(--gold-light); text-align:center; padding:1rem;\">1 — 2 — 4 — 5 — 8 — 1000 — ¿...?</div>\n\nAlle Formeln scheitern. Der Professor schmunzelt: „Sucht nicht in den Zahlen, was in der Sprache verborgen liegt.“",
    story_ca: "Un professor escriu a la pissarra:\n\n<div style=\"font-family:var(--font-mono); font-size:1.4rem; color:var(--gold-light); text-align:center; padding:1rem;\">1 — 2 — 4 — 5 — 8 — 1000 — ¿...?</div>\n\nCap fórmula no funciona. El professor diu: «No cerqueu en l'àlgebra allò escrit en la vostra pròpia llengua.»",
    story_va: "Un professor escriu a la pissarra:\n\n<div style=\"font-family:var(--font-mono); font-size:1.4rem; color:var(--gold-light); text-align:center; padding:1rem;\">1 — 2 — 4 — 5 — 8 — 1000 — ¿...?</div>\n\nCap fórmula no funciona. El professor diu: «No busqueu en l'àlgebra allò escrit en la vostra pròpia llengua.»",
    story_eu: "Irakasle batek arbelan idazten du:\n\n<div style=\"font-family:var(--font-mono); font-size:1.4rem; color:var(--gold-light); text-align:center; padding:1rem;\">1 — 2 — 4 — 5 — 8 — 1000 — ¿...?</div>\n\nAljebra hutsalak ez du balio: «Ez bilatu kalkuluetan hizkuntzan idatzita dagoena.»",
    story_gl: "Un profesor escribe no encerado:\n\n<div style=\"font-family:var(--font-mono); font-size:1.4rem; color:var(--gold-light); text-align:center; padding:1rem;\">1 — 2 — 4 — 5 — 8 — 1000 — ¿...?</div>\n\nO profesor engade: «Non busquedes nas fórmulas o que está na vosa lingua.»",
    story_ja: "数学の教授が黒板に以下の数列を書き、学生たちに問いかけました：\n\n<div style=\"font-family:var(--font-mono); font-size:1.4rem; color:var(--gold-light); text-align:center; padding:1rem;\">1 — 2 — 4 — 5 — 8 — 1000 — ¿...?</div>\n\n学生たちはあらゆる数式を試しますが解けません。教授は微笑んで言いました：「言語の中に織り込まれた規則に目を向けなさい」。",

    question_es: "¿Qué número continúa exactamente la sucesión?",
    question_en: "Which number accurately continues the sequence?",
    question_fr: "Quel nombre poursuit exactement cette suite ?",
    question_de: "Welche Zahl setzt die Folge exakt fort?",
    question_ca: "Quin número continua exactament la successió?",
    question_va: "Quin número continua exactament la successió?",
    question_eu: "Zein zenbakik jarraitzen du segida?",
    question_gl: "Que número continúa exactamente a sucesión?",
    question_ja: "この数列の次に来る数字はどれでしょうか？",

    options: [
      {
        id: "opt_1001",
        text_es: "1001",
        text_en: "1001",
        text_fr: "1001",
        text_de: "1001",
        text_ca: "1001",
        text_va: "1001",
        text_eu: "1001",
        text_gl: "1001",
        text_ja: "1001",
        isCorrect: true,
        feedback_es: "¡Brillante pensamiento lateral! Uno, dos, cuatro, cinco, ocho, mil... y mil uno. Todos se escriben sin la letra 'E'."
      },
      {
        id: "opt_2000",
        text_es: "2000",
        text_en: "2000",
        text_fr: "2000",
        text_de: "2000",
        text_ca: "2000",
        text_va: "2000",
        text_eu: "2000",
        text_gl: "2000",
        text_ja: "2000",
        isCorrect: false,
        feedback_es: "Incorrecto. Antes de 2000 existen otros números que cumplen la condición primero (como 1001)."
      },
      {
        id: "opt_10000",
        text_es: "10000",
        text_en: "10000",
        text_fr: "10000",
        text_de: "10000",
        text_ca: "10000",
        text_va: "10000",
        text_eu: "10000",
        text_gl: "10000",
        text_ja: "10000",
        isCorrect: false,
        feedback_es: "Incorrecto. 10.000 se salta muchos números intermedios que cumplen el criterio."
      }
    ],

    interactiveType: "sequence_letter_sim",

    solution_title_es: "Pensamiento Lateral: Cuando el Patrón es Ortográfico",
    solution_title_en: "Lateral Thinking: Orthographic Number Patterns",
    solution_title_fr: "Pensée Latérale : Quand le Modèle est Orthographique",
    solution_title_de: "Laterales Denken: Orthographische Zahlenmuster",
    solution_title_ca: "Pensament Lateral: Quan el Patró és Ortogràfic",
    solution_title_va: "Pensament Lateral: Quan el Patró és Ortogràfic",
    solution_title_eu: "Albo Pentsamendua: Eredua Ortografikoa Denean",
    solution_title_gl: "Pensamento Lateral: Cando o Patrón é Ortográfico",
    solution_title_ja: "ラテラル・シンキング：言語のスペリングに潜む数学的秩序",

    solution_explanation_es: `
      <div class="proof-steps">
        <div class="proof-step">
          <strong>1. La Regla de la Ausencia de la 'E':</strong>
          <p>Escribe el nombre de cada número en castellano y observa sus letras:</p>
          <ul style="margin: 0.5rem 0 0.5rem 1.5rem; line-height:1.6;">
            <li>1: <strong>Un-o</strong> (sin 'e')</li>
            <li>2: <strong>D-o-s</strong> (sin 'e')</li>
            <li>3: <em>Tr-<strong>e</strong>-s</em> ❌ (contiene 'e', se descarta)</li>
            <li>4: <strong>C-u-a-t-r-o</strong> (sin 'e')</li>
            <li>5: <strong>C-i-n-c-o</strong> (sin 'e')</li>
            <li>6: <em>S-<strong>e</strong>-i-s</em> ❌ (contiene 'e')</li>
            <li>7: <em>S-i-<strong>e</strong>-t-<strong>e</strong></em> ❌ (contiene 'e')</li>
            <li>8: <strong>O-c-h-o</strong> (sin 'e')</li>
            <li>9: <em>N-u-<strong>e</strong>-v-<strong>e</strong></em> ❌, 10: <em>D-i-<strong>e</strong>-z</em> ❌... y así hasta <strong>Mil</strong>.</li>
            <li>El siguiente número entero natural tras 1000 sin 'e' es <strong>1001 (Mil uno)</strong>.</li>
          </ul>
        </div>
        <div class="proof-step">
          <strong>2. Acertijo Gemelo de Bonificación:</strong>
          <p>¿Qué letra continúa la serie: <strong>U, D, T, C, C, S, S, ...</strong>?</p>
          <p>¡La letra <strong>O</strong>! Son las iniciales de los números: <strong>U</strong>no, <strong>D</strong>os, <strong>T</strong>res, <strong>C</strong>uatro, <strong>C</strong>inco, <strong>S</strong>eis, <strong>S</strong>iete, <strong>O</strong>cho.</p>
        </div>
      </div>
    `,
    curiosity_es: "Este tipo de acertijos fue introducido en los círculos matemáticos por Martin Gardner en su columna de Scientific American para entrenar a los estudiantes a romper la 'ceguera de túnel' analítica."
  },

  // =========================================================================
  // ENIGMA 7: LOS TRES SOMBREROS EN FILA INDIA (3 Negros y 2 Blancos)
  // =========================================================================
  {
    id: "tres_sombreros",
    icon: "🎩",
    badge_es: "DEDUCCIÓN POR SILENCIO",
    badge_en: "DEDUCTION FROM SILENCE",
    badge_fr: "DÉDUCTION PAR LE SILENCE",
    badge_de: "SCHLUSSFOLGERN AUS SCHWEIGEN",
    badge_ca: "DEDUCCIÓ PER SILENCI",
    badge_va: "DEDUCCIÓ PER SILENCI",
    badge_eu: "ISILTASUNETIK ERATORRITAKO ONDORIOA",
    badge_gl: "DEDUCIÓN POR SILENZO",
    badge_ja: "沈黙からの論理的帰結",

    title_es: "Los Tres Sombreros en Fila India",
    title_en: "The Three Hats in Single File",
    title_fr: "Les Trois Chapeaux en File Indienne",
    title_de: "Die drei Hüte in einer Reihe",
    title_ca: "Els Tres Barrets en Fila Índia",
    title_va: "Els Tres Barrets en Fila Índia",
    title_eu: "Hiru Kapelak Ilara Batean",
    title_gl: "Os Tres Sombreiros en Ringleira",
    title_ja: "一列に並んだ3つの帽子（黒3枚・白2枚）",

    subtitle_es: "3 sombreros negros y 2 blancos. Dos dicen 'no lo sé'. El primero deduce el suyo sin ver nada.",
    subtitle_en: "3 black hats and 2 white hats. Two say 'I don't know'. The first deduces his without seeing.",
    subtitle_fr: "3 chapeaux noirs et 2 blancs. Deux disent « je ne sais pas ». Le premier déduit le sien.",
    subtitle_de: "3 schwarze und 2 weiße Hüte. Zwei sagen „Ich weiß nicht“. Der Erste folgert seinen Hut.",
    subtitle_ca: "3 barrets negres i 2 blancs. Dos diuen 'no ho sé'. El primer dedueix el seu sense veure res.",
    subtitle_va: "3 barrets negres i 2 blancs. Dos diuen 'no ho sé'. El primer deduïx el seu sense vore res.",
    subtitle_eu: "3 kapela beltz eta 2 zuri. Bik 'ez dakit' diote. Lehenengoak berea asmatzen du ezer ikusi gabe.",
    subtitle_gl: "3 sombreiros negros e 2 brancos. Dous din 'non o sei'. O primeiro deduce o seu sen ver nada.",
    subtitle_ja: "黒3枚・白2枚の帽子。前2人が「分からない」と答えた時、先頭が自分の色を看破した論理。",

    story_es: "En una mesa hay cinco sombreros: tres negros ⚫⚫⚫ y dos blancos ⚪⚪. Tres personas (A, B y C) se ponen un sombrero al azar sin mirar su color y se colocan en fila india mirando hacia adelante:\n\n• El tercero, C (al fondo), ve el sombrero de B y el de A.\n• El segundo, B (en medio), solo ve el sombrero de A.\n• El primero, A (al frente), no ve ningún sombrero.\n\nSe le pregunta a C si sabe el color de su sombrero. Contesta que **NO**.\nSe le hace la misma pregunta a B. Contesta que **NO**.\nFinalmente se le pregunta a A (que no ve nada). Sonríe y dice: **«¡Sé perfectamente de qué color es el mío!»**.",
    story_en: "On a table are five hats: three black ⚫⚫⚫ and two white ⚪⚪. Three people (A, B, C) put on a hat at random without looking and stand in single file facing forward:\n\n• C (back) sees B and A.\n• B (middle) sees only A.\n• A (front) sees no one.\n\nC is asked his color. He answers **NO**.\nB is asked his color. He answers **NO**.\nA (who sees nothing) states: **'I know with complete certainty what color my hat is!'**",
    story_fr: "Sur une table se trouvent 3 chapeaux noirs ⚫⚫⚫ et 2 blancs ⚪⚪. Trois personnes (A, B, C) enfilent un chapeau au hasard et se placent en file indienne face devant :\n\n• C voit B et A. Questionné, C répond **NON**.\n• B ne voit que A. Questionné, B répond **NON**.\n• A (qui ne voit rien) affirme : **« Je sais avec certitude la couleur du mien ! »**",
    story_de: "Auf einem Tisch liegen 3 schwarze ⚫⚫⚫ und 2 weiße ⚪⚪ Hüte. Drei Personen (A, B, C) setzen blind einen Hut auf und stehen hintereinander:\n\n• C sieht B und A. Er sagt: **NEIN**.\n• B sieht nur A. Er sagt: **NEIN**.\n• A (sieht niemanden) verkündet: **„Ich weiß genau, welche Farbe mein Hut hat!“**",
    story_ca: "En una taula hi ha 3 barrets negres ⚫⚫⚫ i 2 blancs ⚪⚪. Tres persones es col·loquen en fila índia mirant endavant:\n\n• C veu B i A. Respon **NO**.\n• B només veu A. Respon **NO**.\n• A (no veu ningú) diu: **«Sé perfectament quin color té el meu!»**",
    story_va: "En una taula hi ha 3 barrets negres ⚫⚫⚫ i 2 blancs ⚪⚪. Tres persones es col·loquen en fila índia mirant avant:\n\n• C veu B i A. Respon **NO**.\n• B només veu A. Respon **NO**.\n• A (no veu ningú) diu: **«Sé perfectament quin color té el meu!»**",
    story_eu: "Mahai batean 3 kapela beltz ⚫⚫⚫ eta 2 zuri ⚪⚪ daude. Hiru lagun ilaran jartzen dira aurrera begira:\n\n• C-k B eta A ikusten ditu. **EZ** erantzuten du.\n• B-k A bakarrik ikusten du. **EZ** erantzuten du.\n• A-k (ez du inor ikusten) dio: **«Seguru dakit nirea zein den!»**",
    story_gl: "Nunha mesa hai 3 sombreiros negros ⚫⚫⚫ e 2 brancos ⚪⚪. Tres persoas colócanse en ringleira cara adiante:\n\n• C ve a B e a A. Responde **NON**.\n• B só ve a A. Responde **NON**.\n• A (non ve a ninguén) di: **«Sei perfectamente de que cor é o meu!»**",
    story_ja: "テーブルに黒3枚 ⚫⚫⚫、白2枚 ⚪⚪の計5枚の帽子があります。3人（A、B、C）が色を見ずに帽子をかぶり、前を向いて一列に並びました：\n\n• C（最後列）はBとAが見えます。自分の色を聞かれ「分からない」と答えた。\n• B（真ん中）はAだけが見えます。「私も分からない」と答えた。\n• A（先頭・誰の帽子も見えない）は言った：「自分の帽子の色が完全に分かりました！」",

    question_es: "¿De qué color es el sombrero de A y qué lógica siguió?",
    question_en: "What color is A's hat and what logic did he follow?",
    question_fr: "De quelle couleur est le chapeau de A et quelle logique a-t-il suivie ?",
    question_de: "Welche Farbe hat As Hut und welcher Logik folgte er?",
    question_ca: "De quin color és el barret d'A i quina lògica va seguir?",
    question_va: "De quin color és el barret d'A i quina lògica va seguir?",
    question_eu: "Zein koloretakoa da Aren kapela eta zer logika jarraitu zuen?",
    question_gl: "De que cor é o sombreiro de A e que lóxica seguiu?",
    question_ja: "Aの帽子は何色で、どのような論理でそれを確信したでしょうか？",

    options: [
      {
        id: "opt_negro_deducido",
        text_es: "NEGRO: deducido gracias a que ni C ni B pudieron saber el suyo.",
        text_en: "BLACK: deduced from the fact that neither C nor B could determine theirs.",
        text_fr: "NOIR : déduit du fait que ni C ni B n'ont pu déterminer le leur.",
        text_de: "SCHWARZ: gefolgert daraus, dass weder C noch B ihren Hut bestimmen konnten.",
        text_ca: "NEGRE: deduït a partir del fet que ni C ni B van poder saber el seu.",
        text_va: "NEGRE: deduït a partir del fet que ni C ni B van poder saber el seu.",
        text_eu: "BELTZA: C-k eta B-k euren kapela jakin ez izanetik eratorria.",
        text_gl: "NEGRO: deducido a partir de que nin C nin B puideron saber o seu.",
        text_ja: "黒：CもBも自分の色を特定できなかったという事実から演繹。",
        isCorrect: true,
        feedback_es: "¡Impecable! La respuesta 'no sé' de los compañeros elimina ramas del árbol de posibilidades."
      },
      {
        id: "opt_blanco_deducido",
        text_es: "BLANCO: porque como hay más negros que blancos, el primero siempre se queda con el color minoritario.",
        text_en: "WHITE: because there are fewer white hats, the first always gets the minority color.",
        text_fr: "BLANC : parce qu'il y a moins de blancs que de noirs.",
        text_de: "WEISS: Weil weniger weiße Hüte vorhanden sind.",
        text_ca: "BLANC: perquè com que hi ha menys blancs, el primer rep el color minoritari.",
        text_va: "BLANC: perquè com que hi ha menys blancs, el primer rep el color minoritari.",
        text_eu: "ZURIA: zuri gutxiago daudelako beltzak baino.",
        text_gl: "BRANCO: porque como hai menos brancos, o primeiro queda coa minoría.",
        text_ja: "白：白の帽子の方が数が少ないため、先頭は少数色になる。",
        isCorrect: false,
        feedback_es: "Incorrecto. Si A fuera blanco, B habría cantado victoria antes que él."
      },
      {
        id: "opt_imposible_saber",
        text_es: "Es imposible saberlo: sin espejos ni ver a los demás, solo fue una corazonada con 50% de probabilidad.",
        text_en: "Impossible to know: without seeing anyone, it was just a 50/50 guess.",
        text_fr: "Impossible à savoir : sans rien voir, ce n'est qu'un coup de chance.",
        text_de: "Unmöglich zu wissen: Ohne Sicht ist es reiner Zufall.",
        text_ca: "Impossible de saber: sense veure ningú, només és una intuïció.",
        text_va: "Impossible de saber: sense vore ningú, només és una intuïció.",
        text_eu: "Ezinezkoa da jakitea: inor ikusi gabe, zorte hutsa da.",
        text_gl: "Imposible de saber: sen ver a ninguén, foi só un golpe de sorte.",
        text_ja: "知ることは不可能：前が見えない以上、50%の当てずっぽうに過ぎない。",
        isCorrect: false,
        feedback_es: "Falso. La deducción lógica pura ofrece certeza absoluta del 100%."
      }
    ],

    interactiveType: "hats_three_black_sim",

    solution_title_es: "La Deducción Formal del Sabio Frontal",
    solution_title_en: "The Formal Deduction of the Front Sage",
    solution_title_fr: "La Déduction Formelle du Sage de Tête",
    solution_title_de: "Die formale Schlussfolgerung des vorderen Weisen",
    solution_title_ca: "La Deducció Formal del Savi Frontal",
    solution_title_va: "La Deducció Formal del Savi Frontal",
    solution_title_eu: "Aurreko Jakintsuaren Ondorio Formala",
    solution_title_gl: "A Dedución Formal do Sabio Frontal",
    solution_title_ja: "先頭の賢者による完全情報消去の証明",

    solution_explanation_es: `
      <div class="proof-steps">
        <div class="proof-step">
          <strong>1. La Declaración de C («No lo sé»):</strong>
          <p>Solo hay 2 sombreros blancos ⚪⚪. Si C hubiera visto que B y A llevaban ambos sombreros blancos, C habría sabido de inmediato que el suyo era negro ⚫. Al decir «No lo sé», C informa a todos de que <strong>B y A no son ambos blancos</strong> (al menos uno de los dos es negro, o los dos son negros).</p>
        </div>
        <div class="proof-step">
          <strong>2. La Declaración de B («Yo tampoco lo sé»):</strong>
          <p>B razona: <em>«Si A tuviera un sombrero blanco ⚪, dado que los dos no podemos ser blancos según lo dicho por C, ¡el mío tendría que ser obligatoriamente negro ⚫!»</em>. Por tanto, si A fuera blanco, B habría sabido de inmediato el suyo. Al responder B «Yo tampoco lo sé», B le revela a A que <strong>A NO lleva un sombrero blanco</strong>.</p>
        </div>
        <div class="proof-step">
          <strong>3. La Certeza de A:</strong>
          <p>A razona: <em>«Si mi sombrero fuera blanco, B habría sabido que el suyo era negro. Como B no lo supo, ¡mi sombrero tiene que ser <strong>NEGRO ⚫</strong> obligatoriamente!»</em>.</p>
        </div>
      </div>
    `,
    curiosity_es: "Este dilema fue analizado exhaustivamente por el filósofo y matemático Charles Sanders Peirce en sus tratados sobre la abducción e inferencia reflexiva."
  },

  // =========================================================================
  // ENIGMA 8: LA PARADOJA DE MONTY HALL (Probabilidad Condicional & 3 Puertas)
  // =========================================================================
  {
    id: "monty_hall",
    icon: "🚪",
    badge_es: "PROBABILIDAD CONTRAINTUITIVA",
    badge_en: "COUNTERINTUITIVE PROBABILITY",
    badge_fr: "PROBABILITÉS CONTRE-INTUITIVES",
    badge_de: "KONTRAINTUITIVE WAHRSCHEINLICHKEIT",
    badge_ca: "PROBABILITAT CONTRAINTUÏTIVA",
    badge_va: "PROBABILITAT CONTRAINTUÏTIVA",
    badge_eu: "PROBABILITATE KONTRAINTUITIBOA",
    badge_gl: "PROBABILIDADE CONTRAINTUITIVA",
    badge_ja: "直感に反する確率論",

    title_es: "La Paradoja de Monty Hall",
    title_en: "The Monty Hall Dilemma",
    title_fr: "Le Paradoxe de Monty Hall",
    title_de: "Das Monty-Hall-Problem",
    title_ca: "La Paradoxa de Monty Hall",
    title_va: "La Paradoxa de Monty Hall",
    title_eu: "Monty Hallen Paradoxa",
    title_gl: "O Paradoxal de Monty Hall",
    title_ja: "モンティ・ホール問題",

    subtitle_es: "¿Cambiarías de puerta? La decisión matemática que desafió a los mayores genios.",
    subtitle_en: "Would you switch doors? The mathematical decision that baffled great minds.",
    subtitle_fr: "Changeriez-vous de porte ? La décision mathématique qui a dérouté les plus grands esprits.",
    subtitle_de: "Würdest du wechseln? Die Entscheidung, die selbst Spitzenmathematiker verblüffte.",
    subtitle_ca: "Canviaries de porta? La decisió matemàtica que va desafiar les ments més brillants.",
    subtitle_va: "Canviaries de porta? La decisió matemàtica que va desafiar les ments més brillants.",
    subtitle_eu: "Atea aldatuko zenuke? Adimen bikainenak harritu zituen erabaki matematikoa.",
    subtitle_gl: "Cambiarías de porta? A decisión matemática que desafiou ás mentes máis brillantes.",
    subtitle_ja: "ドアを変えるべきか？ 一流数学者たちをも翻弄した世紀のパラドックス。",

    story_es: "Estás concursando en un legendario programa de televisión. Ante ti hay tres puertas cerradas:\n\n• Detrás de una de ellas hay un automóvil de lujo 🚗.\n• Detrás de las otras dos hay cabras 🐐 🐐.\n\nEliges la Puerta 1. El presentador, que sabe exactamente qué hay detrás de cada puerta, abre la Puerta 3 y revela una cabra 🐐.\n\nEntonces te mira y te hace la pregunta definitiva: «¿Deseas quedarte con la Puerta 1 o prefieres cambiar a la Puerta 2?»",
    story_en: "You are on a famous game show. Facing you are three closed doors:\n\n• Behind one is a brand-new sports car 🚗.\n• Behind the other two are goats 🐐 🐐.\n\nYou pick Door 1. The host, who knows what is behind every door, opens Door 3, revealing a goat 🐐.\n\nHe then turns to you and asks: 'Do you want to stick with Door 1, or would you like to switch to Door 2?'",
    story_fr: "Vous participez à un célèbre jeu télévisé. Devant vous se trouvent trois portes fermées :\n\n• Derrière l'une se trouve une voiture de luxe 🚗.\n• Derrière les deux autres se trouvent des chèvres 🐐 🐐.\n\nVous choisissez la Porte 1. L'animateur, qui sait où se trouve la voiture, ouvre la Porte 3 et révèle une chèvre 🐐.\n\nIl vous demande alors : « Voulez-vous garder la Porte 1 ou changer pour la Porte 2 ? »",
    story_de: "Du bist Kandidat in einer Fernsehshow. Vor dir stehen drei geschlossene Türen:\n\n• Hinter einer steht ein Sportwagen 🚗.\n• Hinter den beiden anderen stehen Ziegen 🐐 🐐.\n\nDu wählst Tür 1. Der Moderator, der genau weiß, was sich hinter jeder Tür befindet, öffnet Tür 3 und zeigt eine Ziege 🐐.\n\nEr fragt dich: „Möchtest du bei Tür 1 bleiben oder zu Tür 2 wechseln?“",
    story_ca: "Estàs concursant en un mític programa de televisió. Davant teu hi ha tres portes tancades:\n\n• Darrere d'una hi ha un cotxe de luxe 🚗.\n• Darrere de les altres dues hi ha cabres 🐐 🐐.\n\nTries la Porta 1. El presentador, que sap on és el cotxe, obre la Porta 3 i mostra una cabra 🐐.\n\nEt pregunta: «Vols quedar-te amb la Porta 1 o prefereixes canviar a la Porta 2?»",
    story_va: "Estàs concursant en un mític programa de televisió. Davant teu hi ha tres portes tancades:\n\n• Darrere d'una hi ha un cotxe de luxe 🚗.\n• Darrere de les altres dues hi ha cabres 🐐 🐐.\n\nTries la Porta 1. El presentador, que sap on és el cotxe, obri la Porta 3 i mostra una cabra 🐐.\n\nEt pregunta: «Vols quedar-te amb la Porta 1 o prefereixes canviar a la Porta 2?»",
    story_eu: "Telebista saio ezagun batean zaude. Zure aurrean hiru ate itxi daude:\n\n• Baten atzean auto bikain bat dago 🚗.\n• Beste biren atzean ahuntzak daude 🐐 🐐.\n\n1. atea aukeratzen duzu. Aurkezleak, autoa non dagoen dakienak, 3. atea ireki eta ahuntz bat erakusten du 🐐.\n\nOrduan galdetzen dizu: «1. atearekin geratu nahi duzu ala 2. atera aldatu nahi duzu?»",
    story_gl: "Estás concursando nun célebre programa de televisión. Diante de ti hai tres portas pechadas:\n\n• Detrás dunha hai un coche de luxo 🚗.\n• Detrás das outras dúas hai cabras 🐐 🐐.\n\nElixes a Porta 1. O presentador, que sabe onde está o coche, abre a Porta 3 e amosa unha cabra 🐐.\n\nPregúntache: «Queres quedar coa Porta 1 ou prefires cambiar á Porta 2?»",
    story_ja: "あなたはテレビのクイズ番組に出演しています。目の前には3つの閉ざされたドアがあります：\n\n• 1つのドアの背後には新車のスポーツカー 🚗。\n• 残り2つの背後にはヤギ 🐐 🐐。\n\nあなたが1番のドアを選ぶと、正解を知っている司会者はヤギがいる3番のドアを開けてみせました 🐐。\n\nそして司会者は尋ねます：「1番のドアのままでいきますか？ それとも2番のドアに変えますか？」",

    question_es: "¿Cuál es la decisión matemáticamente óptima?",
    question_en: "What is the mathematically optimal choice?",
    question_fr: "Quel est le choix mathématiquement optimal ?",
    question_de: "Was ist die mathematisch optimale Wahl?",
    question_ca: "Quina és la decisió matemàticament òptima?",
    question_va: "Quina és la decisió matemàticament òptima?",
    question_eu: "Zein da matematikoki erabakirik onena?",
    question_gl: "Cal é a decisión matematicamente óptima?",
    question_ja: "数学的に最も有利な選択はどれでしょうか？",

    options: [
      {
        id: "opt_stay",
        text_es: "Quedarse con la Puerta 1: tu intuición inicial siempre tiene más probabilidad.",
        text_en: "Stay with Door 1: your first intuition always holds a higher chance.",
        text_fr: "Garder la Porte 1 : votre première intuition a toujours plus de chances.",
        text_de: "Bei Tür 1 bleiben: Die erste Intuition ist meist die beste.",
        text_ca: "Quedar-te amb la Porta 1: la intuïció inicial sempre té més probabilitat.",
        text_va: "Quedar-te amb la Porta 1: la intuïció inicial sempre té més probabilitat.",
        text_eu: "1. atearekin geratu: hasierako intuizioak aukera gehiago ditu beti.",
        text_gl: "Quedar coa Porta 1: a intuición inicial sempre ten máis probabilidade.",
        text_ja: "1番のドアにとどまる：最初の直感が最も確率が高いため。",
        isCorrect: false,
        feedback_es: "Falso. Al quedarte solo tienes 1/3 (33.3%) de probabilidades de ganar."
      },
      {
        id: "opt_equal",
        text_es: "Da igual cambiar o quedarse: al quedar dos puertas, la probabilidad es del 50% para cada una.",
        text_en: "It makes no difference: with two doors left, it is a 50/50 coin flip.",
        text_fr: "Cela ne change rien : avec deux portes restantes, c'est du 50/50.",
        text_de: "Es ist völlig egal: Bei zwei verbleibenden Türen liegt die Chance bei genau 50%.",
        text_ca: "És igual canviar o quedar-se: en quedar dues portes, la probabilitat és del 50%.",
        text_va: "És igual canviar o quedar-se: en quedar dos portes, la probabilitat és del 50%.",
        text_eu: "Berdin dio aldatu ala geratu: bi ate geratzean probabilitatea %50ekoa da.",
        text_gl: "Dá igual cambiar ou quedar: ao quedar dúas portas, a probabilidade é do 50%.",
        text_ja: "どちらでも確率は同じ：残った2つのドアの確率はそれぞれ50%ずつ。",
        isCorrect: false,
        feedback_es: "Esta es la trampa intuitiva más célebre del mundo. La probabilidad NO es del 50% porque Monty no elige al azar."
      },
      {
        id: "opt_switch",
        text_es: "Cambiar SIEMPRE a la otra puerta disponible.",
        text_en: "ALWAYS switch to the other available door.",
        text_fr: "TOUJOURS changer pour l'autre porte disponible.",
        text_de: "IMMER zur anderen verfügbaren Tür wechseln.",
        text_ca: "Canviar SEMPRE a l'altra porta disponible.",
        text_va: "Canviar SEMPRE a l'altra porta disponible.",
        text_eu: "BETI beste atera aldatu.",
        text_gl: "Cambiar SEMPRE á outra porta dispoñible.",
        text_ja: "常に残されたもう1つのドアに変更する。",
        isCorrect: true,
        feedback_es: "¡Exacto! Cambiar duplica tus probabilidades (de 1/3 a 2/3). ¡Compruébalo tú mismo en el simulador interactivo!"
      }
    ],

    interactiveType: "monty_hall_sim",

    solution_title_es: "Por qué Cambiar Duplica la Probabilidad (2/3)",
    solution_title_en: "Why Switching Doubles Your Odds to 2/3",
    solution_title_fr: "Pourquoi Changer Double la Probabilité (2/3)",
    solution_title_de: "Warum Wechseln die Gewinnchance auf 2/3 verdoppelt",
    solution_title_ca: "Per què Canviar Duplica la Probabilitat (2/3)",
    solution_title_va: "Per què Canviar Duplica la Probabilitat (2/3)",
    solution_title_eu: "Zergatik Aldatzeak Probabilitatea Bikoizten Duen (2/3)",
    solution_title_gl: "Por que Cambiar Duplica a Probabilidade (2/3)",
    solution_title_ja: "ドアを変更すると勝率が2/3になる数学的理由",

    solution_explanation_es: `
      <div class="proof-steps">
        <div class="proof-step">
          <strong>1. Elección Inicial:</strong>
          <p>Al elegir tu puerta al principio, la probabilidad de haber acertado el coche es de solo <strong>1/3 (33.3%)</strong>. La probabilidad de que el coche esté en una de las otras dos puertas es de <strong>2/3 (66.7%)</strong>.</p>
        </div>
        <div class="proof-step">
          <strong>2. La Intervención del Presentador:</strong>
          <p>Monty Hall <em>no abre una puerta al azar</em>: abre deliberadamente una puerta con cabra de entre las que tú no elegiste. Al eliminar una cabra garantizada, los <strong>2/3 de probabilidad</strong> que pertenecían al conjunto de las otras dos puertas se concentran por completo en la única puerta restante.</p>
        </div>
        <div class="proof-step">
          <strong>3. Regla Simple:</strong>
          <p>Solo pierdes si cambias cuando tu elección original fue el coche (1 de cada 3 veces). Si tu elección original fue una cabra (2 de cada 3 veces), ¡al cambiar ganas obligatoriamente el coche!</p>
        </div>
      </div>
    `,
    curiosity_es: "Cuando Marilyn vos Savant publicó la solución en 1990 en la revista Parade, recibió cerca de 10.000 cartas, cientos de ellas de doctores en matemáticas que la insultaban diciendo que estaba equivocada. Las simulaciones demostraron que ella tenía toda la razón."
  },

  // =========================================================================
  // ENIGMA 9: LOS 100 PRISIONEROS Y LAS CAJAS (Teoría de Ciclos)
  // =========================================================================
  {
    id: "cien_prisioneros",
    icon: "📦",
    badge_es: "TEORÍA DE CICLOS & COMBINATORIA",
    badge_en: "CYCLE THEORY & COMBINATORICS",
    badge_fr: "THÉORIE DES CYCLES & COMBINATOIRE",
    badge_de: "ZYKLENTHEORIE & KOMBINATORIK",
    badge_ca: "TEORIA DE CICLES & COMBINATÒRIA",
    badge_va: "TEORIA DE CICLES & COMBINATÒRIA",
    badge_eu: "ZIKLOEN TEORIA ETA KONBINATORIA",
    badge_gl: "TEORÍA DE CICLOS & COMBINATORIA",
    badge_ja: "置換サイクルと順列理論",

    title_es: "Los 100 Prisioneros y las Cajas",
    title_en: "The 100 Prisoners Problem",
    title_fr: "Les 100 Prisonniers et les Boîtes",
    title_de: "Das Problem der 100 Gefangenen",
    title_ca: "Els 100 Presoners i les Caixes",
    title_va: "Els 100 Presoners i les Caixes",
    title_eu: "100 Presoak eta Kutxak",
    title_gl: "Os 100 Prisioneiros e as Caixas",
    title_ja: "100人の囚人と箱のパズル",

    subtitle_es: "De una probabilidad casi nula a más del 31% mediante ciclos de permutación.",
    subtitle_en: "From near-zero probability to over 31% via permutation cycles.",
    subtitle_fr: "D'une probabilité quasi-nulle à plus de 31% grâce aux cycles de permutation.",
    subtitle_de: "Von fast 0% auf über 31% durch Permutationszyklen.",
    subtitle_ca: "D'una probabilitat gairebé nul·la a més del 31% mitjançant cicles de permutació.",
    subtitle_va: "D'una probabilitat quasi nul·la a més del 31% mitjançant cicles de permutació.",
    subtitle_eu: "Ia %0tik %31 baino gehiagora permutazio-zikloen bidez.",
    subtitle_gl: "Dunha probabilidade case nula a máis do 31% mediante ciclos de permutación.",
    subtitle_ja: "絶望の0%から31.18%へ奇跡を起こす置換ループ戦略。",

    story_es: "100 prisioneros numerados del 1 al 100 están condenados. En una sala hay 100 cajas cerradas con los números del 1 al 100 repartidos aleatoriamente.\n\nCada prisionero entra por separado y puede abrir hasta 50 cajas para buscar su número. Deja las cajas cerradas al salir y no puede comunicarse.\n\n• Si TODOS encuentran su número, todos son liberados.\n• Si un solo prisionero falla, todos son ejecutados.\n\nAl azar, la probabilidad de éxito conjunto es (1/2)^100 ≈ 0.0000000000000000000000000000008%. Sin embargo, acuerdan una estrategia antes de empezar.",
    story_en: "100 numbered prisoners (1 to 100) face execution. A room holds 100 closed boxes with numbers 1 to 100 randomized.\n\nEach prisoner enters alone and opens up to 50 boxes to find their number.\n\n• If ALL find their number, all are freed.\n• If even one fails, all are executed.\n\nRandom chance gives (1/2)^100. Yet, an algebraic strategy changes everything.",
    story_fr: "100 prisonniers numérotés de 1 à 100 doivent trouver leur numéro dans 100 boîtes fermées en ouvrant au maximum 50 boîtes chacun.\n\n• Si TOUS trouvent leur numéro, ils sont libres.\n• Si un seul échoue, tous meurent.\n\nAu hasard : quasi 0%. Une stratégie collective fait des miracles.",
    story_de: "100 Gefangene (1 bis 100) dürfen je 50 von 100 Kisten öffnen, um ihre Nummer zu finden.\n\n• Finden ALLE ihre Nummer, sind alle frei.\n• Scheitert einer, sterben alle.\n\nDurch Permutationszyklen steigt die Chance auf über 31%.",
    story_ca: "100 presoners numerats de l'1 al 100 poden obrir fins a 50 de 100 caixes per trobar el seu número.\n\n• Si TOTS el troben, s'alliberen.\n• Si un falla, moren tots.\n\nPacten una estratègia matemàtica que eleva la probabilitat a més del 31%.",
    story_va: "100 presoners numerats de l'1 al 100 poden obrir fins a 50 de 100 caixes per trobar el seu número.\n\n• Si TOTS el troben, s'alliberen.\n• Si un falla, moren tots.\n\nPacten una estratègia matemàtica que eleva la probabilitat a més del 31%.",
    story_eu: "1etik 100era zenbatutako 100 presok euren zenbakia aurkitu behar dute 100 kutxatan (gehienez 50 irekita).\n\nDENEK lortzen badute, aske geratzen dira. Zikloen bidez %31tik gorako arrakasta lortzen dute.",
    story_gl: "100 prisioneiros poden abrir até 50 de 100 caixas para atopar o seu número.\n\n• Se TODOS o atopan, son liberados.\n• Se un falla, morren todos.\n\nCunha estratexia de ciclos obteñen máis do 31% de éxito.",
    story_ja: "100人の囚人が100個の箱（最大50個）から自分の番号を探す試練。\n\n全員が見つかれば釈放、1人でも失敗すれば全員処刑。\n\nランダムではほぼ0%ですが、置換サイクル戦略により31.18%以上へと跳ね上がります。",

    question_es: "¿Cuál es la estrategia óptima y qué probabilidad de victoria otorga?",
    question_en: "What is the optimal strategy and what winning probability does it achieve?",
    question_fr: "Quelle est la stratégie optimale et quelle probabilité de victoire offre-t-elle ?",
    question_de: "Was ist die optimale Strategie und welche Gewinnwahrscheinlichkeit erzielt sie?",
    question_ca: "Quina és l'estratègia òptima i quina probabilitat de victòria assoleix?",
    question_va: "Quina és l'estratègia òptima i quina probabilitat de victòria aconseguix?",
    question_eu: "Zein da estrategiarik onena eta zer probabilitate lortzen du?",
    question_gl: "Cal é a estratexia óptima e que probabilidade acada?",
    question_ja: "最適な戦略と、それがもたらす驚異の勝率はどれでしょうか？",

    options: [
      {
        id: "opt_cycles",
        text_es: "Estrategia de Ciclos: cada prisionero abre la caja con su número y sigue el puntero del número encontrado.",
        text_en: "Cycle Strategy: each prisoner opens the box of their own number and follows the pointer of the number found.",
        text_fr: "Stratégie des Cycles : chaque prisonnier ouvre la boîte portant son numéro puis suit le pointeur.",
        text_de: "Zyklus-Strategie: Jeder öffnet zuerst die Kiste seiner Nummer und folgt dem Zeiger.",
        text_ca: "Estratègia de Cicles: cadascú obre la caixa amb el seu número i segueix el punter trobat.",
        text_va: "Estratègia de Cicles: cadascú obri la caixa amb el seu número i seguix el punter trobat.",
        text_eu: "Ziklo Estrategia: bakoitzak bere zenbakiko kutxa irekitzen du eta aurkitutako zenbakiaren punteroei jarraitzen die.",
        text_gl: "Estratexia de Ciclos: cada un abre a caixa co seu número e segue os punteiros do número atopado.",
        text_ja: "サイクル連鎖戦略：各自が自分の番号の箱を開け、中に入っていた番号の箱を順に開けてループを辿る。",
        isCorrect: true,
        feedback_es: "¡Extraordinario! Al seguir los ciclos de la permutación, la probabilidad conjunta asciende a más del 31.18%."
      },
      {
        id: "opt_paridad",
        text_es: "Estrategia de Paridad: los números impares abren las primeras 50 cajas y los pares las 50 restantes.",
        text_en: "Parity Strategy: odds open the first 50 boxes and evens open the remaining 50.",
        text_fr: "Stratégie de Parité : les impairs ouvrent les 50 premières et les pairs les 50 suivantes.",
        text_de: "Paritäts-Strategie: Ungerade öffnen die ersten 50 und Gerade die restlichen 50.",
        text_ca: "Estratègia de Paritat: senars obren les primeres 50 caixes i parells les 50 restants.",
        text_va: "Estratègia de Paritat: senars obrin les primeres 50 caixes i parells les 50 restants.",
        text_eu: "Bikoiti-bakoiti Estrategia: bakoitiek lehen 50ak irekitzen dituzte eta bikoitiek gainerako 50ak.",
        text_gl: "Estratexia de Paridade: os impares abren as primeiras 50 caixas e os pares as restantes.",
        text_ja: "偶奇分割戦略：奇数は前半50個、偶数は後半50個の箱を開ける。",
        isCorrect: false,
        feedback_es: "Incorrecto. Esta estrategia sigue teniendo una probabilidad microscópica cercana a cero."
      },
      {
        id: "opt_imposible",
        text_es: "Es matemáticamente imposible superar el 1%, cualquier estrategia ronda el 0%.",
        text_en: "It is mathematically impossible to exceed 1%, any strategy stays near 0%.",
        text_fr: "Mathématiquement impossible de dépasser 1%, toute stratégie est proche de 0%.",
        text_de: "Mathematisch unmöglich über 1% zu kommen, jede Strategie liegt nahe 0%.",
        text_ca: "Matemàticament impossible de superar l'1%, qualsevol estratègia voreja el 0%.",
        text_va: "Matemàticament impossible de superar l'1%, qualsevol estratègia voreja el 0%.",
        text_eu: "Matematikoki ezinezkoa da %1 gainditzea, edozein estrategia %0 inguruan dago.",
        text_gl: "Matematicamente昆 imposible superar o 1%, calquera estratexia rolda o 0%.",
        text_ja: "1%を超えることは数学的に不可能であり、どのような戦略でもほぼ0%である。",
        isCorrect: false,
        feedback_es: "¡Sorprendente pero falso! La teoría de permutaciones descompone las cajas en bucles cerrados."
      }
    ],

    interactiveType: "cycles_visualizer",

    solution_title_es: "El Milagro de los Ciclos de Permutación",
    solution_title_en: "The Miracle of Permutation Cycles",
    solution_title_fr: "Le Miracle des Cycles de Permutation",
    solution_title_de: "Das Wunder der Permutationszyklen",
    solution_title_ca: "El Miracle dels Cicles de Permutació",
    solution_title_va: "El Miracle dels Cicles de Permutació",
    solution_title_eu: "Permutazio Zikloen Miraria",
    solution_title_gl: "O Milagre dos Ciclos de Permutación",
    solution_title_ja: "置換順列サイクルによる奇跡の数理",

    solution_explanation_es: `
      <div class="proof-steps">
        <div class="proof-step">
          <strong>1. La Estrategia del Puntero:</strong>
          <p>El prisionero entra y abre la caja que lleva SU número. Si no es su número, mira el número dentro (ej. 42) y va a abrir la caja 42. Repite el proceso siguiendo los punteros.</p>
        </div>
        <div class="proof-step">
          <strong>2. Estructura de Ciclos:</strong>
          <p>Toda permutación finita se descompone en un conjunto de ciclos disjuntos cerrados. El prisionero siempre pertenecerá a un único ciclo. Encontrará su número siempre y cuando la longitud del ciclo no supere las 50 cajas.</p>
        </div>
        <div class="proof-step">
          <strong>3. El Secreto Colectivo:</strong>
          <p>La probabilidad de que una permutación aleatoria de 100 elementos NO tenga NINGÚN ciclo de longitud mayor a 50 es exactamente <strong>1 - ln(2) ≈ 31.18%</strong>.</p>
        </div>
      </div>
    `,
    curiosity_es: "Propuesto en 2003 por la matemática danesa Anna Gál y Peter Bro Miltersen, es considerado uno de los resultados más deslumbrantes y contraintuitivos del álgebra moderna."
  }
];

// Exponer globalmente
if (typeof window !== 'undefined') {
  window.CLASSIC_ENIGMAS = CLASSIC_ENIGMAS;
}
