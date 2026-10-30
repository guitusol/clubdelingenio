/**
 * Léxico Táctico - Motor de Diccionario y Distribución de Letras
 * Validación ultrarrápida en cliente y bolsas de fichas por idioma.
 */

const LETTER_DISTRIBUTIONS = {
  es: {
    name: 'Español',
    totalTiles: 100,
    tiles: [
      { l: 'A', pts: 1, count: 12 }, { l: 'E', pts: 1, count: 12 }, { l: 'O', pts: 1, count: 9 },
      { l: 'I', pts: 1, count: 6 },  { l: 'S', pts: 1, count: 6 },  { l: 'N', pts: 1, count: 5 },
      { l: 'L', pts: 1, count: 4 },  { l: 'R', pts: 1, count: 5 },  { l: 'U', pts: 1, count: 5 },
      { l: 'T', pts: 1, count: 4 },  { l: 'D', pts: 2, count: 5 },  { l: 'G', pts: 2, count: 2 },
      { l: 'C', pts: 3, count: 4 },  { l: 'B', pts: 3, count: 2 },  { l: 'M', pts: 3, count: 2 },
      { l: 'P', pts: 3, count: 2 },  { l: 'H', pts: 4, count: 2 },  { l: 'F', pts: 4, count: 1 },
      { l: 'V', pts: 4, count: 1 },  { l: 'Y', pts: 4, count: 1 },  { l: 'Q', pts: 5, count: 1 },
      { l: 'J', pts: 8, count: 1 },  { l: 'Ñ', pts: 8, count: 1 },  { l: 'X', pts: 8, count: 1 },
      { l: 'Z', pts: 10, count: 1 }, { l: '★', pts: 0, count: 2 } // Comodín / Blanco
    ]
  },
  en: {
    name: 'English',
    totalTiles: 100,
    tiles: [
      { l: 'E', pts: 1, count: 12 }, { l: 'A', pts: 1, count: 9 },  { l: 'I', pts: 1, count: 9 },
      { l: 'O', pts: 1, count: 8 },  { l: 'N', pts: 1, count: 6 },  { l: 'R', pts: 1, count: 6 },
      { l: 'T', pts: 1, count: 6 },  { l: 'L', pts: 1, count: 4 },  { l: 'S', pts: 1, count: 4 },
      { l: 'U', pts: 1, count: 4 },  { l: 'D', pts: 2, count: 4 },  { l: 'G', pts: 2, count: 3 },
      { l: 'B', pts: 3, count: 2 },  { l: 'C', pts: 3, count: 2 },  { l: 'M', pts: 3, count: 2 },
      { l: 'P', pts: 3, count: 2 },  { l: 'F', pts: 4, count: 2 },  { l: 'H', pts: 4, count: 2 },
      { l: 'V', pts: 4, count: 2 },  { l: 'W', pts: 4, count: 2 },  { l: 'Y', pts: 4, count: 2 },
      { l: 'K', pts: 5, count: 1 },  { l: 'J', pts: 8, count: 1 },  { l: 'X', pts: 8, count: 1 },
      { l: 'Q', pts: 10, count: 1 }, { l: 'Z', pts: 10, count: 1 }, { l: '★', pts: 0, count: 2 }
    ]
  },
  pt: {
    name: 'Português',
    totalTiles: 100,
    tiles: [
      { l: 'A', pts: 1, count: 14 }, { l: 'E', pts: 1, count: 11 }, { l: 'I', pts: 1, count: 10 },
      { l: 'O', pts: 1, count: 10 }, { l: 'S', pts: 1, count: 8 },  { l: 'U', pts: 1, count: 7 },
      { l: 'M', pts: 1, count: 6 },  { l: 'R', pts: 1, count: 6 },  { l: 'T', pts: 1, count: 5 },
      { l: 'C', pts: 2, count: 4 },  { l: 'D', pts: 2, count: 5 },  { l: 'L', pts: 2, count: 5 },
      { l: 'P', pts: 2, count: 4 },  { l: 'N', pts: 3, count: 4 },  { l: 'B', pts: 3, count: 3 },
      { l: 'Ç', pts: 3, count: 2 },  { l: 'F', pts: 4, count: 2 },  { l: 'G', pts: 4, count: 2 },
      { l: 'H', pts: 4, count: 2 },  { l: 'V', pts: 4, count: 2 },  { l: 'J', pts: 5, count: 2 },
      { l: 'Q', pts: 6, count: 1 },  { l: 'X', pts: 8, count: 1 },  { l: 'Z', pts: 8, count: 1 },
      { l: '★', pts: 0, count: 2 }
    ]
  },
  fr: {
    name: 'Français',
    totalTiles: 102,
    tiles: [
      { l: 'E', pts: 1, count: 15 }, { l: 'A', pts: 1, count: 9 },  { l: 'I', pts: 1, count: 8 },
      { l: 'N', pts: 1, count: 6 },  { l: 'O', pts: 1, count: 6 },  { l: 'R', pts: 1, count: 6 },
      { l: 'S', pts: 1, count: 6 },  { l: 'T', pts: 1, count: 6 },  { l: 'U', pts: 1, count: 6 },
      { l: 'L', pts: 1, count: 5 },  { l: 'D', pts: 2, count: 3 },  { l: 'M', pts: 2, count: 3 },
      { l: 'G', pts: 2, count: 2 },  { l: 'B', pts: 3, count: 2 },  { l: 'C', pts: 3, count: 2 },
      { l: 'P', pts: 3, count: 2 },  { l: 'F', pts: 4, count: 2 },  { l: 'H', pts: 4, count: 2 },
      { l: 'V', pts: 4, count: 2 },  { l: 'J', pts: 8, count: 1 },  { l: 'Q', pts: 8, count: 1 },
      { l: 'K', pts: 10, count: 1 }, { l: 'W', pts: 10, count: 1 }, { l: 'X', pts: 10, count: 1 },
      { l: 'Y', pts: 10, count: 1 }, { l: 'Z', pts: 10, count: 1 }, { l: '★', pts: 0, count: 2 }
    ]
  },
  ca: {
    name: 'Català / Valencià',
    totalTiles: 100,
    tiles: [
      { l: 'E', pts: 1, count: 13 }, { l: 'A', pts: 1, count: 12 }, { l: 'I', pts: 1, count: 8 },
      { l: 'R', pts: 1, count: 8 },  { l: 'S', pts: 1, count: 8 },  { l: 'N', pts: 1, count: 6 },
      { l: 'O', pts: 1, count: 5 },  { l: 'T', pts: 1, count: 5 },  { l: 'L', pts: 1, count: 4 },
      { l: 'U', pts: 1, count: 4 },  { l: 'C', pts: 2, count: 3 },  { l: 'D', pts: 2, count: 3 },
      { l: 'M', pts: 2, count: 3 },  { l: 'B', pts: 3, count: 2 },  { l: 'G', pts: 3, count: 2 },
      { l: 'P', pts: 3, count: 2 },  { l: 'Ç', pts: 4, count: 1 },  { l: 'F', pts: 4, count: 1 },
      { l: 'V', pts: 4, count: 1 },  { l: 'H', pts: 8, count: 1 },  { l: 'J', pts: 8, count: 1 },
      { l: 'Q', pts: 8, count: 1 },  { l: 'Z', pts: 8, count: 1 },  { l: 'X', pts: 10, count: 1 },
      { l: '★', pts: 0, count: 2 }
    ]
  }
};

// Asignaciones directas para variantes de la misma familia
LETTER_DISTRIBUTIONS.va = LETTER_DISTRIBUTIONS.ca;
LETTER_DISTRIBUTIONS.gl = LETTER_DISTRIBUTIONS.es;
LETTER_DISTRIBUTIONS.eu = LETTER_DISTRIBUTIONS.es;
LETTER_DISTRIBUTIONS.de = LETTER_DISTRIBUTIONS.en;
LETTER_DISTRIBUTIONS.ja = LETTER_DISTRIBUTIONS.en; // Modo internacional para JA
LETTER_DISTRIBUTIONS.zh = LETTER_DISTRIBUTIONS.en; // Modo internacional para ZH

/**
 * Vocabularios enriquecidos embebidos de alta frecuencia para juego autónomo 100% offline
 */
const BASE_DICTIONARY = {
  es: [
    // 2 letras
    "AL", "AS", "DE", "DO", "EL", "EN", "ES", "EX", "HA", "HE", "LA", "LE", "LO", "ME", "MI", "NO", "OS", "RE", "SE", "SI", "SO", "SU", "TE", "TI", "TU", "VA", "VE", "VI", "YA", "YO",
    // 3 letras
    "ACA", "AJO", "ALA", "AMO", "ANA", "ANO", "ARO", "ASA", "ASI", "ATU", "AVE", "AYU", "AZA", "BAR", "BES", "BOA", "BUS", "CAL", "CAO", "CAS", "CHE", "COL", "CON", "COR", "CRU", "DAR", "DEL", "DIA", "DIO", "DOS", "DUO", "ECO", "ERA", "ESE", "ESO", "FAN", "FAS", "FEO", "FIN", "GEL", "GOL", "GAS", "HOY", "HUM", "IBA", "IDA", "IDO", "IRA", "ISL", "IVA", "JAR", "JET", "LEA", "LEO", "LEY", "LIA", "LUZ", "MAL", "MAS", "MES", "MIO", "MUY", "NON", "NOS", "OLA", "OJO", "ORO", "OSA", "OSO", "PAN", "PAZ", "PEZ", "PIE", "PIN", "POR", "QUE", "RED", "REY", "RIO", "ROL", "SAL", "SAN", "SED", "SER", "SOL", "SON", "SUR", "TAN", "TIA", "TIO", "TOP", "TOS", "TUS", "UNO", "UVA", "VAN", "VAS", "VEO", "VER", "VIA", "VID", "VIS", "VOZ",
    // 4 letras
    "ACTO", "AGUA", "AIRE", "ALBA", "ALMA", "ALTO", "AMAR", "AMOR", "AQUI", "ARTE", "AUTO", "AZUL", "BAJO", "BASE", "BIEN", "BOCA", "BUEY", "CABO", "CAFE", "CAJA", "CAMA", "CASA", "CASO", "CERO", "CINE", "CLUB", "COLA", "COMA", "COMO", "COSA", "CRUZ", "CUBO", "DADO", "DAMA", "DATO", "DIOS", "DOCE", "DONA", "DUNA", "DURO", "EDAD", "FAMA", "FARO", "FASE", "FOCA", "FOTO", "FUEG", "GATO", "GIRO", "GOCE", "GRAN", "GUIA", "HADA", "HORA", "HOYA", "HUMO", "IDEA", "ISLA", "JAZZ", "JEFE", "JOYA", "JUAN", "JUEZ", "JUGO", "LADO", "LAGO", "LANA", "LEER", "LEON", "LIGA", "LIMA", "LINO", "LOBO", "LODO", "LONA", "LUNA", "MAIZ", "MANO", "MAPA", "MARE", "MASA", "MAYO", "MESA", "META", "MIEL", "MINA", "MIRA", "MODO", "MONO", "MORA", "MURO", "NAVE", "NETO", "NIDO", "NINO", "NODO", "NOTA", "NUBE", "OBRA", "OIDO", "ONDA", "OTRO", "PALA", "PALO", "PAPA", "PASO", "PATO", "PELE", "PELO", "PENA", "PESO", "PIEL", "PINA", "PISO", "PLAN", "POCO", "POLO", "PUMA", "PUNO", "RAMA", "RAMO", "RARO", "RATO", "RAYO", "RAZA", "REGL", "RELO", "RETO", "RICO", "RIMA", "ROCA", "ROJO", "ROSA", "ROTO", "RUDA", "RUTA", "SACO", "SALA", "SECO", "SEDE", "SETA", "SIGO", "SOLO", "SOPA", "SUMA", "TAZA", "TELA", "TEMA", "TIPO", "TREN", "TUBO", "VALE", "VINO", "VIVA", "VIVO", "YATE", "YESO", "ZONA", "ZUMO",
    // 5 letras
    "ABRIL", "ACERO", "ACTOR", "AGUDO", "AGUJA", "ALFAS", "ALTAR", "AMIGO", "ANCHO", "ANTES", "APICE", "ARBOL", "ARENA", "AROMA", "ARTEO", "ATLAS", "ATRAS", "AVION", "BARCO", "BARRA", "BELLO", "BRAVO", "BRAZO", "BRISA", "BRUJA", "BUENO", "CABRA", "CALLE", "CAMPO", "CANTO", "CAPAZ", "CARNE", "CARTA", "CAUSA", "CEBRA", "CERRO", "CHICO", "CIELO", "CINCO", "CISNE", "CLARO", "CLAVE", "CLIMA", "CORAL", "CORTO", "COSTA", "CREMA", "CRUCE", "DADOS", "DAMAS", "DANZA", "DESEO", "DISCO", "DOBLE", "DONDE", "DRAMA", "DULCE", "ENERO", "ENLIL", "ERROR", "ESPIA", "EXITO", "FACIL", "FIESTA", "FINAL", "FIRMA", "FLOR", "FUEGO", "FUERZ", "FURIA", "GATOS", "GENIO", "GLOBO", "GOLPE", "GRANO", "GRUPO", "HABER", "HACHA", "HASTA", "HECHO", "HIELO", "HIQUE", "HONOR", "HORNO", "HOTEL", "HUESO", "HUEVO", "ICONO", "IDEAL", "IGUAL", "ISLAS", "JABON", "JAMON", "JARDIN", "JOVEN", "JUEGO", "JUNTO", "LABIO", "LANCE", "LECHE", "LENTO", "LETRA", "LIBRO", "LINEA", "LIRIO", "LOGRO", "LUCES", "LUGAR", "LUNAR", "LLAVE", "MADRE", "MAGIA", "MANGO", "MANTO", "MARZO", "MATRI", "MAYOR", "MEDIO", "MENTE", "METRO", "MIEDO", "MONTE", "MOTOR", "MUNDO", "MUSEO", "NADIE", "NARIZ", "NIEVE", "NOBLE", "NOCHE", "NORTE", "NUEVE", "NUEVO", "NUNCA", "OCASO", "ORDEN", "PADRE", "PANEL", "PAPEL", "PARDO", "PARTE", "PASMO", "PASTO", "PECHO", "PERRO", "PIANO", "PIEZA", "PILAR", "PINTO", "PISTA", "PLANO", "PLATA", "PLAYA", "PLAZA", "PLUMA", "PODER", "POLVO", "POETA", "PRIMO", "PUNTO", "QUESO", "RADAR", "RADIO", "RAMAS", "RATON", "RAYOS", "REGLA", "RELOJ", "REINO", "RESTO", "ROBOT", "SABER", "SABOR", "SALUD", "SANTO", "SELVA", "SERIO", "SIGLO", "SIGNO", "SOBRE", "SOLAR", "SUELO", "TABLA", "TACTO", "TARDE", "TECHO", "TECLA", "TEXTO", "TIEMPO", "TIGRE", "TORRE", "TRAMA", "TRECE", "TRUCO", "UNION", "VALOR", "VAPOR", "VERDE", "VIAJE", "VIEJO", "VIENTO", "VISTA", "VOCAL", "VUELO", "ZORRO",
    // 6 letras
    "ABUELO", "ACCION", "ACENTO", "ACERTI", "ACTIVO", "ACUERD", "AGENDA", "AGUDAS", "ALAMIS", "ALERTA", "AMABLE", "AMIGOS", "ANILLO", "ANIMAL", "ARENAS", "ARROYO", "ASTUTO", "ATAQUE", "AUDITO", "AUXILI", "AZUCAR", "BALCON", "BLANCO", "BONDAD", "BOSQUE", "BOTELL", "BRAZOS", "BRIDGE", "BRUJAS", "BUENOS", "CABINA", "CADENA", "CALIDO", "CAMARA", "CAMBIO", "CAMINO", "CAMISA", "CANCIO", "CANCHA", "CANTAR", "CAPRIC", "CARTAS", "CASTIL", "CAUDAL", "CENTRO", "CEREBR", "CIERTO", "CIRCUL", "CIUDAD", "COCINA", "CODIGO", "COLINA", "COMBAT", "COMPRA", "CORONA", "CORREO", "CRISTAL", "CUADRO", "CUARTO", "CUENTA", "CUERPO", "CUMBRE", "DEBATE", "DECADA", "DEDUCE", "DEFENS", "DELFIN", "DENTRO", "DESAFIO", "DESIER", "DIARIO", "DIENTE", "DINERO", "DISEÑO", "DOCTOR", "DOMINO", "DORMIR", "DUELOS", "EFECTO", "EJEMPL", "EMPUJE", "ENLACE", "EQUIPO", "ESCADA", "ESCUDO", "ESFERA", "ESPADA", "ESPEJO", "ESPERA", "ESTILO", "ESTUDI", "EXACTO", "FAMOSO", "FIGURA", "FLECHA", "FRESCO", "FRUTAS", "FUERZA", "FUTURO", "GALAXI", "GIGANT", "GRANDE", "GUITAR", "HERMAN", "HIERRO", "HOMBRE", "HUELLA", "HUEVOS", "IDIOMA", "IMAGEN", "JARDIN", "JINETE", "JUEGOS", "JUGADA", "JUGAR", "JURADO", "LENGUA", "LETRAS", "LEXICO", "LIBRES", "LIMITE", "LLUVIA", "MADERA", "MAGICO", "MANUAL", "MANZAN", "MARINA", "MAXIMO", "MEDIDA", "MEMORIA", "MINUTO", "MISTER", "MODELO", "MONEDA", "MUSICA", "NACION", "NUMERO", "ORIGEN", "PAJARO", "PALABRA", "PANTAL", "PARQUE", "PASADO", "PASION", "PATRIA", "PELOTA", "PIEDRA", "PINTOR", "PIRATA", "PLANTA", "PREMIO", "PRINCE", "PUEBLO", "PUENTE", "PUERTA", "PUZLES", "RADIAL", "RAPIDO", "RATONES", "RAZONA", "RECORD", "REGALO", "REGLAS", "RELOJES", "RESUEL", "RITMOS", "SABADO", "SABROS", "SALIDA", "SECTOR", "SEMANA", "SEMILLA", "SIERRA", "SOLUCI", "SONIDO", "SUDOKU", "TACTICA", "TECLADO", "TIEMPO", "TIERRA", "TITULO", "TORNEO", "TRENES", "TRIUNF", "ULTIMO", "VALIOS", "VERDAD", "VIENTO", "VISION", "VICTOR", "VIRTUD", "VOCALES", "VUELOS", "ZAPATO",
    // 7 letras (Bingos tácticos)
    "ABUELOS", "ACERTIJ", "ACUERDO", "AFICION", "AJEDREZ", "ALEGRIA", "ALIANZA", "AMISTAD", "ANCIANO", "APLAUSO", "APRENDE", "ARMARIO", "ARQUITEC", "AVENTUR", "BATALLA", "BELLEZA", "BONDADES", "BOSQUES", "CABALLO", "CALCULO", "CAMINOS", "CAMPEON", "CAPITAN", "CEREBRO", "CIENCIA", "CIRCULO", "CIUDADES", "CLARIDAD", "COMBATE", "COMPLEJ", "CONSEJO", "CONTROL", "CORAZON", "CORONA", "CULTURA", "DECISION", "DEDUCE", "DEFENSA", "DESTINO", "DIAMANT", "DIRECTO", "DISCRETO", "DOMINGO", "DUELISTA", "EJEMPLO", "EMPRESA", "ENERGIA", "ENIGMAS", "ESCUELA", "ESPACIO", "ESPERAR", "ESTRELLA", "EXAMEN", "FAMILIA", "FORTUNA", "FUTUROS", "GALERIA", "GENERAL", "GIGANTE", "GLORIAS", "GRACIAS", "GUERRAS", "HISTORIA", "HORIZON", "IMAGENES", "INGENIO", "INTELPO", "INTELIG", "JUGADOR", "JUSTICIA", "LECTURA", "LIBERTAD", "LOGICAS", "LUMINOS", "MAESTRO", "MEMORIA", "MINUTOS", "MISTERIO", "MODELOS", "MUNDIAL", "NATURAL", "NOVEDAD", "NUMEROS", "OFICIAL", "ORIGINAL", "PALABRA", "PASAPOR", "PENSAR", "PIEDRAS", "PLANETA", "PODEROS", "PREMIOS", "PRIMERO", "PROYECT", "PUERTAS", "QUIJOTE", "RAPIDEZ", "RECORDS", "REGLAMENTO", "RESOLVER", "RESPUESTA", "SEMANAS", "SEMITAS", "SISTEMA", "SOLDADO", "SOLUCION", "SUERTE", "TABLERO", "TACTICA", "TALENTO", "TARJETAS", "TIEMPOS", "TRIUNFO", "VALIENT", "VENTANA", "VICTORIA", "VIRTUDES"
  ],
  en: [
    "AT", "BE", "BY", "DO", "GO", "HE", "HI", "IF", "IN", "IS", "IT", "ME", "MY", "NO", "OF", "ON", "OR", "SO", "TO", "UP", "US", "WE",
    "ACT", "ADD", "AGE", "AGO", "AIR", "ALL", "AND", "ANY", "ART", "ASK", "BAD", "BAG", "BAR", "BED", "BEE", "BIG", "BOX", "BOY", "BUS", "BUY", "CAN", "CAR", "CAT", "CUP", "CUT", "DAY", "DOG", "DRY", "EAR", "EAT", "EGG", "END", "EYE", "FAR", "FEW", "FIT", "FLY", "FOR", "FOX", "FUN", "GET", "GOD", "GUN", "GUY", "HAT", "HIT", "HOT", "HOW", "ICE", "JOB", "JOY", "KEY", "KID", "LAW", "LAY", "LEG", "LET", "LIE", "LOW", "MAN", "MAP", "MAY", "MEN", "NET", "NEW", "NOT", "NOW", "OFF", "OLD", "ONE", "OUR", "OUT", "PAN", "PAY", "PEN", "PIE", "PIN", "PUT", "RED", "RUN", "SAY", "SEA", "SEE", "SET", "SHE", "SIR", "SIX", "SKY", "SON", "SUN", "TAX", "TEA", "TEN", "THE", "TIE", "TIP", "TOE", "TOP", "TOY", "TRY", "TWO", "USE", "WAR", "WAY", "WHO", "WHY", "WIN", "YES", "YET", "YOU", "ZOO",
    "ABLE", "ACID", "AGED", "ALSO", "AREA", "ARMY", "AWAY", "BABY", "BACK", "BALL", "BAND", "BANK", "BASE", "BATH", "BEAR", "BEAT", "BEER", "BELL", "BELT", "BEST", "BIRD", "BLUE", "BOAT", "BODY", "BOND", "BONE", "BOOK", "BORN", "BOSS", "BOWL", "BULK", "BURN", "BUSH", "BUSY", "CALL", "CALM", "CAMP", "CARD", "CARE", "CASE", "CASH", "CAST", "CELL", "CHAT", "CHEF", "CITY", "CLUB", "COAL", "COAT", "CODE", "COLD", "COME", "COOK", "COOL", "COPE", "CORE", "COST", "CREW", "CROP", "DARK", "DATA", "DATE", "DAWN", "DAYS", "DEAD", "DEAL", "DEAR", "DEBT", "DEEP", "DESK", "DIET", "DISK", "DOOR", "DRAW", "DROP", "DRUG", "DUAL", "DUST", "DUTY", "EACH", "EARN", "EAST", "EASY", "EDGE", "ELSE", "EVEN", "EVER", "FACE", "FACT", "FAIL", "FAIR", "FALL", "FARM", "FAST", "FATE", "FEAR", "FEED", "FEEL", "FILE", "FILL", "FILM", "FIND", "FINE", "FIRE", "FIRM", "FISH", "FIVE", "FLAT", "FLOW", "FOOD", "FOOT", "FORD", "FORM", "FORT", "FOUR", "FREE", "FROM", "FUEL", "FULL", "FUND", "GAIN", "GAME", "GATE", "GEAR", "GIFT", "GIRL", "GIVE", "GLAD", "GOAL", "GOES", "GOLD", "GOLF", "GONE", "GOOD", "GRAY", "GREW", "GROW", "GULF", "HAIR", "HALF", "HALL", "HAND", "HANG", "HARD", "HARM", "HATE", "HAVE", "HEAD", "HEAR", "HEAT", "HELD", "HELL", "HELP", "HERE", "HERO", "HIGH", "HILL", "HIRE", "HOLD", "HOLE", "HOLY", "HOME", "HOPE", "HOST", "HOUR", "HUGE", "HUNG", "HUNT", "HURT", "IDEA", "INTO", "IRON", "ITEM", "JOIN", "JUMP", "JUST", "KEEP", "KILL", "KIND", "KING", "KNEE", "KNEW", "KNOW", "LACK", "LADY", "LAID", "LAKE", "LAND", "LANE", "LAST", "LATE", "LEAD", "LEFT", "LESS", "LIFE", "LIFT", "LIKE", "LINE", "LINK", "LION", "LIST", "LIVE", "LOAD", "LOAN", "LOCK", "LOGO", "LONG", "LOOK", "LORD", "LOSE", "LOSS", "LOST", "LOVE", "LUCK", "MADE", "MAIL", "MAIN", "MAKE", "MALE", "MANY", "MARK", "MASS", "MEAL", "MEAN", "MEAT", "MEET", "MENU", "MIND", "MINE", "MOOD", "MOON", "MORE", "MOST", "MOVE", "MUCH", "MUST", "NAME", "NAVY", "NEAR", "NECK", "NEED", "NEWS", "NEXT", "NICE", "NINE", "NONE", "NOON", "NOSE", "NOTE", "OKAY", "ONCE", "ONLY", "OPEN", "ORAL", "OVER", "PACE", "PACK", "PAGE", "PAID", "PAIN", "PAIR", "PALM", "PARK", "PART", "PASS", "PAST", "PATH", "PEAK", "PEER", "PICK", "PILE", "PINK", "PIPE", "PLAN", "PLAY", "PLOT", "PLUG", "PLUS", "POEM", "POET", "POLL", "POOL", "POOR", "PORT", "POST", "PRAY", "PURE", "PUSH", "RACE", "RAIL", "RAIN", "RANK", "RARE", "RATE", "READ", "REAL", "REAR", "RELY", "RENT", "REST", "RICE", "RICH", "RIDE", "RING", "RISE", "RISK", "ROAD", "ROCK", "ROLE", "ROLL", "ROOF", "ROOM", "ROOT", "ROSE", "RULE", "RUSH", "SAFE", "SAID", "SAIL", "SALE", "SALT", "SAME", "SAND", "SAVE", "SEAT", "SEED", "SEEK", "SEEM", "SEEN", "SELF", "SELL", "SEND", "SENT", "SEPT", "SHIP", "SHOP", "SHOT", "SHOW", "SHUT", "SICK", "SIDE", "SIGN", "SITE", "SIZE", "SKIN", "SLIP", "SLOW", "SNOW", "SOFT", "SOIL", "SOLD", "SOLE", "SOME", "SONG", "SOON", "SORT", "SOUL", "SPOT", "STAR", "STAY", "STEP", "STOP", "SUCH", "SUIT", "SURE", "TAKE", "TALE", "TALK", "TALL", "TANK", "TAPE", "TASK", "TEAM", "TELL", "TENT", "TERM", "TEST", "TEXT", "THAT", "THEM", "THEN", "THEY", "THIN", "THIS", "THUS", "TIDE", "TIEK", "TIME", "TINY", "TIRE", "TOOL", "TOUR", "TOWN", "TREE", "TRIP", "TRUE", "TUNE", "TURN", "TWIN", "TYPE", "UNIT", "UPON", "USED", "USER", "VARY", "VAST", "VERY", "VICE", "VIEW", "VOTE", "WAGE", "WAIT", "WAKE", "WALK", "WALL", "WANT", "WARM", "WARN", "WASH", "WAVE", "WEAK", "WEAR", "WEEK", "WELL", "WENT", "WEST", "WHAT", "WHEN", "WHOM", "WIDE", "WIFE", "WILD", "WILL", "WIND", "WINE", "WING", "WIPE", "WIRE", "WISE", "WISH", "WITH", "WOOD", "WORD", "WORK", "YARD", "YEAR", "ZERO", "ZONE",
    "ABOUT", "ABOVE", "ABUSE", "ACTOR", "ACUTE", "ADMIT", "ADOPT", "ADULT", "AFTER", "AGAIN", "AGENT", "AGREE", "AHEAD", "ALARM", "ALBUM", "ALERT", "ALIKE", "ALIVE", "ALLOW", "ALONE", "ALONG", "ALTER", "AMONG", "ANGER", "ANGLE", "ANGRY", "APART", "APPLE", "APPLY", "ARENA", "ARGUE", "ARISE", "ARRAY", "ASIDE", "ASSET", "AUDIO", "AUDIT", "AVOID", "AWARD", "AWARE", "BADLY", "BAKER", "BASES", "BASIC", "BASIS", "BEACH", "BEGAN", "BEGIN", "BEGUN", "BEING", "BELOW", "BENCH", "BILLY", "BIRTH", "BLACK", "BLAME", "BLIND", "BLOCK", "BLOOD", "BOARD", "BOOST", "BOOTH", "BOUND", "BRAIN", "BRAND", "BREAD", "BREAK", "BREED", "BRIEF", "BRING", "BROAD", "BROKE", "BROWN", "BUILD", "BUILT", "BUYER", "CABLE", "CALIF", "CARRY", "CATCH", "CAUSE", "CHAIN", "CHAIR", "CHART", "CHASE", "CHEAP", "CHECK", "CHEST", "CHIEF", "CHILD", "CHINA", "CHOSE", "CIVIL", "CLAIM", "CLASS", "CLEAN", "CLEAR", "CLICK", "CLOCK", "CLOSE", "COACH", "COAST", "COULD", "COUNT", "COURT", "COVER", "CRAFT", "CRASH", "CREAM", "CRIME", "CROSS", "CROWD", "CROWN", "CURVE", "CYCLE", "DAILY", "DANCE", "DATED", "DEALT", "DEATH", "DEBUT", "DELAY", "DEPTH", "DOING", "DOUBT", "DOZEN", "DRAFT", "DRAMA", "DRAWN", "DREAM", "DRESS", "DRILL", "DRINK", "DRIVE", "DROVE", "DYING", "EAGER", "EARLY", "EARTH", "EIGHT", "ELITE", "EMPTY", "ENEMY", "ENJOY", "ENTER", "ENTRY", "EQUAL", "ERROR", "EVENT", "EVERY", "EXACT", "EXIST", "EXTRA", "FAITH", "FALSE", "FAULT", "FIBER", "FIELD", "FIFTH", "FIFTY", "FIGHT", "FINAL", "FIRST", "FIXED", "FLASH", "FLEET", "FLOOR", "FLUID", "FOCUS", "FORCE", "FORTH", "FORTY", "FORUM", "FOUND", "FRAME", "FRANK", "FRAUD", "FRESH", "FRONT", "FRUIT", "FULLY", "FUNNY", "GIANT", "GIVEN", "GLASS", "GLOBE", "GOING", "GRACE", "GRADE", "GRAND", "GRANT", "GRASS", "GREAT", "GREEN", "GROSS", "GROUP", "GROWN", "GUARD", "GUESS", "GUEST", "GUIDE", "HAPPY", "HARRY", "HEART", "HEAVY", "HENCE", "HENRY", "HORSE", "HOTEL", "HOUSE", "HUMAN", "IDEAL", "IMAGE", "INDEX", "INNER", "INPUT", "ISSUE", "JAPAN", "JIMMY", "JOINT", "JONES", "JUDGE", "KNOWN", "LABEL", "LARGE", "LASER", "LATER", "LAUGH", "LAYER", "LEARN", "LEASE", "LEAST", "LEAVE", "LEGAL", "LEVEL", "LEWIS", "LIGHT", "LIMIT", "LINKS", "LIVES", "LOCAL", "LOGIC", "LOOSE", "LOWER", "LUCKY", "LUNCH", "LYING", "MAGIC", "MAJOR", "MAKER", "MARCH", "MATCH", "MAYOR", "MEANT", "MEDIA", "METAL", "MIGHT", "MINOR", "MINUS", "MIXED", "MODEL", "MONEY", "MONTH", "MORAL", "MOTOR", "MOUNT", "MOUSE", "MOUTH", "MOVIE", "MUSIC", "NEEDS", "NEVER", "NEWLY", "NIGHT", "NOISE", "NORTH", "NOTED", "NOVEL", "NURSE", "OCCUR", "OCEAN", "OFFER", "OFTEN", "ORDER", "OTHER", "OUGHT", "PAINT", "PANEL", "PAPER", "PARTY", "PEACE", "PETER", "PHASE", "PHONE", "PHOTO", "PIECE", "PILOT", "PITCH", "PLACE", "PLAIN", "PLANE", "PLANT", "PLATE", "POINT", "POUND", "POWER", "PRESS", "PRICE", "PRIDE", "PRIME", "PRINT", "PRIOR", "PRIZE", "PROOF", "PROUD", "PROVE", "QUEEN", "QUICK", "QUIET", "QUITE", "RADIO", "RAISE", "RANGE", "RAPID", "RATIO", "REACH", "READY", "REFER", "RIGHT", "RIVAL", "RIVER", "ROBIN", "ROGER", "ROMAN", "ROUGH", "ROUND", "ROUTE", "ROYAL", "RURAL", "SCALE", "SCENE", "SCOPE", "SCORE", "SENSE", "SERVE", "SEVEN", "SHALL", "SHAPE", "SHARE", "SHARP", "SHEET", "SHELF", "SHELL", "SHIFT", "SHIRT", "SHOCK", "SHOOT", "SHORT", "SHOWN", "SIGHT", "SINCE", "SIXTY", "SKILL", "SLEEP", "SLIDE", "SMALL", "SMART", "SMILE", "SMITH", "SMOKE", "SOLID", "SOLVE", "SORRY", "SOUND", "SOUTH", "SPACE", "SPARE", "SPEAK", "SPEED", "SPEND", "SPENT", "SPLIT", "SPOKE", "SPORT", "STAFF", "STAGE", "STAKE", "STAND", "START", "STATE", "STEAM", "STEEL", "STICK", "STILL", "STOCK", "STONE", "STOOD", "STORE", "STORM", "STORY", "STRIP", "STUDY", "STYLE", "SUGAR", "SUITE", "SUPER", "SWEET", "TABLE", "TAKEN", "TASTE", "TAXES", "TEACH", "TEETH", "TERRY", "TEXAS", "THANK", "THEFT", "THEIR", "THEME", "THERE", "THESE", "THICK", "THING", "THINK", "THIRD", "THOSE", "THREE", "THREW", "THROW", "TIGHT", "TIMES", "TIRED", "TITLE", "TODAY", "TOPIC", "TOTAL", "TOUCH", "TOUGH", "TOWER", "TRACK", "TRADE", "TRAIN", "TREAT", "TREND", "TRIAL", "TRIED", "TRIES", "TRUCK", "TRULY", "TRUST", "TRUTH", "TWICE", "UNDER", "UNDUE", "UNION", "UNITY", "UNTIL", "UPPER", "UPSET", "URBAN", "USAGE", "USUAL", "VALID", "VALUE", "VIDEO", "VIRUS", "VISIT", "VITAL", "VOICE", "WASTE", "WATCH", "WATER", "WHEEL", "WHERE", "WHICH", "WHILE", "WHITE", "WHOLE", "WHOSE", "WOMAN", "WOMEN", "WORLD", "WORRY", "WORSE", "WORST", "WORTH", "WOULD", "WOUND", "WRITE", "WRONG", "WROTE", "YIELD", "YOUNG", "YOUTH"
  ],
  pt: [
    "AO", "DA", "DE", "DO", "EM", "EU", "JA", "NA", "NO", "OU", "SE", "SO", "UM",
    "ANO", "BEM", "BOA", "BOM", "CAO", "CEU", "COR", "DIA", "DOR", "ELE", "ELA", "ERA", "FIM", "FOI", "LEI", "LUZ", "MAE", "MAO", "MAR", "MES", "MIL", "NAO", "PAI", "PAO", "PAZ", "QUE", "REI", "RIO", "RUA", "SIM", "SOL", "SUA", "TEM", "TER", "UM", "VER", "VOZ",
    "AGUA", "ALMA", "ALTO", "AMOR", "AZUL", "BOCA", "CADA", "CAFE", "CAMA", "CASA", "CEDO", "CENA", "CUME", "DADO", "DAMA", "DOCE", "DUAS", "FATO", "FOGO", "HORA", "IDOU", "ISSO", "JOGO", "LADO", "LEVE", "LIVR", "LOBO", "LUGAR", "LUNA", "MAIO", "MAIS", "MESA", "MEIO", "MUIT", "MURO", "NOME", "NOVE", "NOVO", "ONDE", "OURO", "PATO", "PELE", "POVO", "QUAL", "REDE", "ROSA", "ROXO", "SALA", "SETE", "SOMA", "SONO", "TELA", "VIDA", "VOTO", "ZERO", "ZONA",
    "AMIGO", "BARCO", "CAMPO", "CANTO", "CERTO", "CHAVE", "CLUBE", "CORPO", "DUELO", "EXAME", "FORTE", "GRATO", "HOMEM", "IDEAL", "JOGOS", "LIVRO", "MUNDO", "NAVIO", "NOBRE", "NOITE", "NORTE", "NUNCA", "ORDEM", "PARTE", "PEDRA", "PLANO", "PODER", "PORTA", "PONTO", "QUASE", "REGRA", "SABER", "SENSO", "TEMPO", "TERRA", "TEXTO", "TOTAL", "UNIAO", "VALOR", "VELHO", "VERDE", "VISTA",
    "CIDADE", "CODIGO", "DIRETO", "DUELOS", "EQUIPE", "FESTAS", "FUTURO", "HOMENS", "LETRAS", "LEXICO", "LOGICA", "MANUAL", "MEDIDA", "NUMERO", "ORIGEM", "PADRAO", "PALAVRA", "PONTOS", "RAPIDO", "REGRAS", "SEMANA", "TABELA", "TACTIC", "TEMPOS", "VIAGEM", "VITORIA",
    "CAMPEAO", "CEREBRO", "DESAFIO", "DUELISTA", "INGENHO", "JOGADOR", "LEITURA", "MAESTRO", "MEMORIA", "PALAVRAS", "PRIMEIR", "RESOLVER", "SISTEMA", "SUCESSO", "TABULEIR", "TALENTO", "VITORIAS"
  ],
  fr: [
    "AU", "DE", "DU", "EN", "ET", "IL", "LA", "LE", "ON", "OU", "SA", "SE", "SI", "TA", "TE", "TU", "UN", "VA", "VU",
    "AME", "AMI", "ANS", "ART", "BAC", "BAS", "BEC", "BLE", "BON", "BUS", "CAP", "CAS", "CLE", "COL", "COQ", "COR", "COU", "CRI", "DIX", "DOS", "EAU", "ECU", "ETE", "FER", "FEU", "FIL", "FIN", "FOU", "GAZ", "GEL", "ILE", "JEU", "LAC", "LOI", "MAI", "MAL", "MER", "MET", "MOI", "MOT", "MUR", "NEZ", "NID", "NOM", "NON", "NUL", "OIE", "OUI", "PAR", "PAS", "PEU", "PIE", "PLI", "POT", "PRE", "PRIX", "PUR", "RANG", "RAT", "RIEN", "ROI", "RUE", "SAC", "SEL", "SIX", "SKI", "SOL", "SUD", "SUR", "THE", "TIR", "TOI", "TON", "TOP", "TOUR", "UNS", "VAL", "VAN", "VIE", "VIN", "VOL", "VOX", "VUE",
    "AIDE", "AILE", "AIRS", "AMIS", "ANGE", "ARME", "AVEC", "BAIE", "BANC", "BEAU", "BLEU", "BOIS", "BORD", "BRAS", "BURE", "CAFE", "CAMP", "CASE", "CHAT", "CHEF", "CIEL", "CLEF", "CLOU", "CLUB", "COIN", "CORP", "COTE", "COUP", "COUR", "CUBE", "DAME", "DANS", "DATE", "DEUX", "DIEU", "DOME", "DOUX", "DUEL", "EGAL", "ELFE", "ETAT", "FAIM", "FAIT", "FAUX", "FILS", "FLIC", "FLOU", "FOIS", "FOND", "FORT", "GARE", "GENS", "GOUT", "GRIS", "GROS", "HAUT", "HIER", "HORS", "HOTE", "IDEE", "ILES", "JEUX", "JOIE", "JOUR", "JUGE", "LAME", "LION", "LIRE", "LOGE", "LOIN", "LONG", "LUMI", "LUNE", "MAIN", "MAIS", "MARE", "MARS", "MENU", "MERE", "MIDI", "MIEL", "MODE", "MOIS", "MONT", "MORT", "MURS", "NAGE", "NEUF", "NOIR", "NORD", "NOTE", "NUIT", "ONCE", "ONDE", "ONZE", "PAIN", "PAIX", "PARC", "PARI", "PAYS", "PEAU", "PERE", "PEUR", "PIED", "PLAN", "PLAT", "PLUS", "PONT", "PORT", "POUR", "QUAI", "QUEL", "RAID", "RANG", "RARE", "REIN", "RIEN", "ROBE", "ROSE", "ROUE", "SAGE", "SANG", "SAUT", "SENS", "SEUL", "SITE", "SOIR", "SOIN", "SORT", "SOUS", "TACT", "TARD", "TAUX", "TELE", "TETE", "TOUT", "TOUR", "TRAIN", "TRES", "UNIS", "VENT", "VERT", "VIDE", "VIFS", "VOIE", "VOIX", "VRAI", "YEUX", "ZERO", "ZONE",
    "ACTION", "ADULTE", "AFFAIR", "AMOURS", "ANANAS", "ANGLAI", "ANIMAL", "ARGENT", "AVENIR", "BATEAU", "BLANCS", "BOITES", "BONBON", "BOUCHE", "BUREAU", "CADEAU", "CAHIER", "CANARD", "CARTES", "CHAINE", "CHAMPS", "CHANCE", "CHAUD", "CHEMIN", "CHEVAL", "CHOSES", "CLASSE", "CLIENT", "COEUR", "COLERE", "COMBAT", "COMPTE", "COPAIN", "CORPS", "COURS", "CRAYON", "CUISIN", "DANGER", "DEBOUT", "DEFAUT", "DEPART", "DESSIN", "DEVOIR", "DOIGTS", "DONNER", "DROITE", "ECOLE", "EFFORT", "ENFANT", "EQUIPE", "ERREUR", "ESPRIT", "ETOILE", "EXEMPLE", "FACILE", "FAMILL", "FEMMES", "FIGURE", "FINALE", "FLEURS", "FORCE", "FORME", "FRANCE", "FRERES", "GARCON", "GENOUX", "GLACES", "GRANDE", "HEURES", "HISTOI", "HOMMES", "IMAGES", "IMPACT", "JARDIN", "JOURS", "JOUEUR", "LETTRE", "LEXIQUE", "LIBRES", "LIGNES", "LIVRES", "LUMIERE", "MAISON", "MAITRE", "MANUEL", "MEMOIR", "MINUTE", "MODERN", "MOMENT", "MONDES", "MOTEUR", "MOYEN", "MUSEES", "MUSIQU", "NATION", "NATURE", "NOMBRE", "NOUVEL", "OISEAU", "ORDRES", "PAPIER", "PARLER", "PAROIS", "PARTIE", "PATRON", "PENSER", "PEUPLE", "PIERRE", "PLACES", "PLANCH", "PLANTE", "POESIE", "POINTS", "POISSO", "POLICE", "PORTES", "PREMIER", "PRINCE", "PRISON", "PROJET", "QUART", "RAISON", "REGLES", "RETOUR", "REVUES", "ROCHES", "SAISON", "SALLES", "SECRET", "SEMAINE", "SENTIR", "SILENC", "SOLEIL", "SOMME", "SOURCE", "STATUE", "TABLES", "TACTIC", "TEMPLE", "TERRES", "TITRES", "TOMBER", "TOUCHE", "TRAVAIL", "TRESOR", "TROUPE", "VALEUR", "VALISE", "VENTES", "VERITE", "VICTOR", "VILLAG", "VISAGE", "VOYAGE"
  ]
};

// Aliases para catalán / valenciano y gallego / euskera
BASE_DICTIONARY.ca = [
  ...BASE_DICTIONARY.es.filter(w => w.length <= 4),
  "AIGUA", "AMIC", "AMICS", "ARBRE", "BLAU", "BONA", "BONS", "CAMP", "CAMPS", "CASA", "CASES", "CEL", "CIUTAT", "CLAU", "CLUB", "CODI", "COR", "CREU", "DESAFIAMENT", "DIARI", "DONA", "DUEL", "ESCOLA", "ESPAI", "FOC", "FORA", "FORÇA", "FUTUR", "GAT", "GENI", "GOS", "HISTÒRIA", "HORA", "JOC", "JOCS", "JUGADOR", "LLETRA", "LLETRES", "LLIBRE", "LLOC", "LLUM", "MARE", "MEMÒRIA", "MÓN", "NORD", "NOU", "NÚMERO", "PALLA", "PARAULA", "PARAULES", "PARE", "PARC", "PARTIDA", "PEIX", "PONT", "PORTA", "PUNT", "PUNTS", "REGLA", "REGLES", "SETMANA", "SISTEMA", "SOL", "SUD", "TAULA", "TÀCTICA", "TEMPS", "TERRA", "VENT", "VIATGE", "VIDA"
];
BASE_DICTIONARY.va = BASE_DICTIONARY.ca;
BASE_DICTIONARY.gl = BASE_DICTIONARY.es;
BASE_DICTIONARY.eu = BASE_DICTIONARY.es;
BASE_DICTIONARY.de = BASE_DICTIONARY.en;
BASE_DICTIONARY.ja = BASE_DICTIONARY.en;
BASE_DICTIONARY.zh = BASE_DICTIONARY.en;

class DictionaryEngine {
  constructor() {
    this.wordsSet = new Set();
    this.currentLang = 'es';
    this.userCustomWords = new Set();
    this.loadCustomWords();
    this.setLanguage('es');
  }

  loadCustomWords() {
    try {
      const saved = localStorage.getItem('lexico_custom_words');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) {
          arr.forEach(w => this.userCustomWords.add(w.toUpperCase().trim()));
        }
      }
    } catch (e) {}
  }

  saveCustomWords() {
    try {
      localStorage.setItem('lexico_custom_words', JSON.stringify([...this.userCustomWords]));
    } catch (e) {}
  }

  setLanguage(lang = 'es') {
    this.currentLang = LETTER_DISTRIBUTIONS[lang] ? lang : 'es';
    this.wordsSet.clear();

    const baseList = BASE_DICTIONARY[this.currentLang] || BASE_DICTIONARY.es;
    baseList.forEach(w => this.wordsSet.add(w.toUpperCase().trim()));

    // Añadir palabras personalizadas aprendidas
    this.userCustomWords.forEach(w => this.wordsSet.add(w));
  }

  normalizeWord(word) {
    if (!word) return '';
    return word.toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover tildes para búsqueda flexible
      .trim();
  }

  isValidWord(word) {
    if (!word || word.length < 2) return false;
    const clean = this.normalizeWord(word);
    return this.wordsSet.has(clean) || this.wordsSet.has(word.toUpperCase());
  }

  addWord(word) {
    if (!word || word.length < 2) return false;
    const clean = this.normalizeWord(word);
    this.wordsSet.add(clean);
    this.userCustomWords.add(clean);
    this.saveCustomWords();
    return true;
  }

  /**
   * Crea una nueva bolsa de fichas mezclada para el idioma activo
   */
  createTileBag(lang = this.currentLang) {
    const dist = LETTER_DISTRIBUTIONS[lang] || LETTER_DISTRIBUTIONS.es;
    const bag = [];

    dist.tiles.forEach(item => {
      for (let i = 0; i < item.count; i++) {
        bag.push({
          letter: item.l,
          points: item.pts,
          id: `${item.l}_${i}_${Math.random().toString(36).substring(2, 6)}`,
          isBlank: item.l === '★' || item.pts === 0
        });
      }
    });

    // Barajado Fisher-Yates
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }

    return bag;
  }

  getTilePoints(letter, lang = this.currentLang) {
    const dist = LETTER_DISTRIBUTIONS[lang] || LETTER_DISTRIBUTIONS.es;
    const clean = letter.toUpperCase();
    const found = dist.tiles.find(t => t.l === clean);
    return found ? found.pts : 1;
  }
}

window.dictionaryEngine = new DictionaryEngine();

