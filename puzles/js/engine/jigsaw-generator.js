/**
 * Puzles del Club — Generador Matemático de Troquelado Jigsaw
 * Genera piezas entrelazadas realistas con curvas de Bézier cúbicas,
 * pestañas convexas (machos) y entrantes (hembras) con simetría matemática exacta.
 * Garantiza que cada pestaña macho encaja al 100% en la hembra correspondiente
 * y permite despiezar cualquier imagen múltiples veces con cortes completamente distintos.
 */

class JigsawGenerator {
  constructor() {
    this.rngSeed = 123456789;
  }

  // Generador pseudoaleatorio Mulberry32 para consistencia estricta por semilla
  mulberry32(seed) {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  randomRange(min, max) {
    const val = this.mulberry32(this.rngSeed++);
    return min + val * (max - min);
  }

  calculateGrid(pieceCount, imageWidth, imageHeight) {
    const aspect = imageWidth / imageHeight;
    let bestCols = Math.round(Math.sqrt(pieceCount * aspect));
    bestCols = Math.max(3, bestCols);
    let bestRows = Math.round(pieceCount / bestCols);
    bestRows = Math.max(2, bestRows);

    return {
      cols: bestCols,
      rows: bestRows,
      totalPieces: bestCols * bestRows
    };
  }

  /**
   * Genera la lista completa de piezas con sus trayectorias geométricas
   */
  generatePieces(boardW, boardH, cols, rows, seed = Date.now()) {
    this.rngSeed = seed;

    const pieceW = boardW / cols;
    const pieceH = boardH / rows;

    // Generar perfiles canónicos para aristas horizontales y verticales
    // horizontalEdges[r][c] separa la fila r de la r+1 en la columna c
    const horizontalEdges = [];
    for (let r = 0; r < rows - 1; r++) {
      horizontalEdges[r] = [];
      for (let c = 0; c < cols; c++) {
        // dir: +1 (macho en fila r, hembra en fila r+1), -1 (hembra en fila r, macho en fila r+1)
        const dir = this.mulberry32(this.rngSeed++) > 0.5 ? 1 : -1;
        horizontalEdges[r][c] = this.createCanonicalEdge(pieceW, dir);
      }
    }

    // verticalEdges[r][c] separa la columna c de la c+1 en la fila r
    const verticalEdges = [];
    for (let r = 0; r < rows; r++) {
      verticalEdges[r] = [];
      for (let c = 0; c < cols - 1; c++) {
        // dir: +1 (macho en col c, hembra en col c+1), -1 (hembra en col c, macho en col c+1)
        const dir = this.mulberry32(this.rngSeed++) > 0.5 ? 1 : -1;
        verticalEdges[r][c] = this.createCanonicalEdge(pieceH, dir);
      }
    }

    const pieces = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const id = r * cols + c;
        const isTop = r === 0;
        const isBottom = r === rows - 1;
        const isLeft = c === 0;
        const isRight = c === cols - 1;

        const isCorner = (isTop || isBottom) && (isLeft || isRight);
        const isEdge = isTop || isBottom || isLeft || isRight;
        const isInner = !isEdge;
        const type = isCorner ? 'corner' : (isEdge ? 'edge' : 'inner');

        const topEdge = isTop ? null : horizontalEdges[r - 1][c];
        const rightEdge = isRight ? null : verticalEdges[r][c];
        const bottomEdge = isBottom ? null : horizontalEdges[r][c];
        const leftEdge = isLeft ? null : verticalEdges[r][c - 1];

        // Construir el contorno Bézier simétrico de la pieza
        const pathData = this.buildPiecePath(
          pieceW,
          pieceH,
          topEdge,
          rightEdge,
          bottomEdge,
          leftEdge,
          isTop, isRight, isBottom, isLeft
        );

        const targetX = c * pieceW;
        const targetY = r * pieceH;
        const tabMarginX = pieceW * 0.35;
        const tabMarginY = pieceH * 0.35;

        pieces.push({
          id,
          row: r,
          col: c,
          type,
          isCorner,
          isEdge,
          isInner,
          targetX,
          targetY,
          width: pieceW,
          height: pieceH,
          tabMarginX,
          tabMarginY,
          pathData,
          currentX: 0,
          currentY: 0,
          isPlaced: false,
          clusterId: id,
          zIndex: 1
        });
      }
    }

    return {
      pieces,
      pieceW,
      pieceH,
      cols,
      rows,
      boardW,
      boardH,
      seed
    };
  }

  /**
   * Crea los 3 segmentos Bézier canónicos de una pestaña con variación orgánica
   * @param {number} length - Longitud del lado
   * @param {number} dir - +1 o -1
   */
  createCanonicalEdge(length, dir) {
    const c = length * this.randomRange(0.48, 0.52);
    const halfBase = length * this.randomRange(0.12, 0.14);
    const neck = halfBase * this.randomRange(0.28, 0.34);
    const h = length * this.randomRange(0.20, 0.24) * dir;

    // Puntos clave a lo largo del eje:
    const p0 = c - halfBase;
    const p1 = c - neck;
    const p2 = c + neck;
    const p3 = c + halfBase;

    // Segmento 1: Cuello de entrada
    const seg1 = {
      cp1: { s: p0 + (p1 - p0) * 0.2, d: h * 0.1 },
      cp2: { s: p1 - (p2 - p1) * 0.5, d: h * 0.8 },
      end: { s: c - halfBase * 0.55,   d: h }
    };

    // Segmento 2: Cabeza / cúpula del saliente
    const seg2 = {
      cp1: { s: c - halfBase * 0.2, d: h * 1.25 },
      cp2: { s: c + halfBase * 0.2, d: h * 1.25 },
      end: { s: c + halfBase * 0.55, d: h }
    };

    // Segmento 3: Cuello de salida
    const seg3 = {
      cp1: { s: p2 + (p2 - p1) * 0.5, d: h * 0.8 },
      cp2: { s: p3 - (p3 - p2) * 0.2, d: h * 0.1 },
      end: { s: p3,                   d: 0 }
    };

    return {
      length,
      dir,
      p0,
      p3,
      seg1,
      seg2,
      seg3
    };
  }

  /**
   * Construye el Path2D cerrado de la pieza combinando los 4 lados en sentido horario
   */
  buildPiecePath(w, h, topEdge, rightEdge, bottomEdge, leftEdge, isTop, isRight, isBottom, isLeft) {
    const path = new Path2D();

    // Empezar en (0, 0)
    path.moveTo(0, 0);

    // 1. LADO SUPERIOR (x va de 0 a w a lo largo de y = 0)
    // Para la pieza inferior, el borde superior recibe la pestaña de la pieza superior
    if (isTop || !topEdge) {
      path.lineTo(w, 0);
    } else {
      this.drawEdgeHorizontalForward(path, 0, w, 0, topEdge);
    }

    // 2. LADO DERECHO (y va de 0 a h a lo largo de x = w)
    // Para la pieza izquierda, el borde derecho proyecta o recibe hacia la derecha
    if (isRight || !rightEdge) {
      path.lineTo(w, h);
    } else {
      this.drawEdgeVerticalForward(path, 0, h, w, rightEdge);
    }

    // 3. LADO INFERIOR (x va de w a 0 a lo largo de y = h)
    // Para la pieza superior, el borde inferior coincide exactamente con el superior de la de abajo
    if (isBottom || !bottomEdge) {
      path.lineTo(0, h);
    } else {
      this.drawEdgeHorizontalReverse(path, w, 0, h, bottomEdge);
    }

    // 4. LADO IZQUIERDO (y va de h a 0 a lo largo de x = 0)
    // Para la pieza derecha, el borde izquierdo coincide exactamente con el derecho de la de la izquierda
    if (isLeft || !leftEdge) {
      path.lineTo(0, 0);
    } else {
      this.drawEdgeVerticalReverse(path, h, 0, 0, leftEdge);
    }

    path.closePath();
    return path;
  }

  // Lado horizontal hacia adelante: de x=0 a x=w
  drawEdgeHorizontalForward(path, startX, endX, y, edge) {
    path.lineTo(edge.p0, y);

    path.bezierCurveTo(
      edge.seg1.cp1.s, y + edge.seg1.cp1.d,
      edge.seg1.cp2.s, y + edge.seg1.cp2.d,
      edge.seg1.end.s, y + edge.seg1.end.d
    );

    path.bezierCurveTo(
      edge.seg2.cp1.s, y + edge.seg2.cp1.d,
      edge.seg2.cp2.s, y + edge.seg2.cp2.d,
      edge.seg2.end.s, y + edge.seg2.end.d
    );

    path.bezierCurveTo(
      edge.seg3.cp1.s, y + edge.seg3.cp1.d,
      edge.seg3.cp2.s, y + edge.seg3.cp2.d,
      edge.seg3.end.s, y + edge.seg3.end.d
    );

    path.lineTo(endX, y);
  }

  // Lado horizontal hacia atrás: de x=w a x=0 (inversión matemática exacta)
  drawEdgeHorizontalReverse(path, startX, endX, y, edge) {
    path.lineTo(edge.p3, y);

    // Invertir segmento 3
    path.bezierCurveTo(
      edge.seg3.cp2.s, y + edge.seg3.cp2.d,
      edge.seg3.cp1.s, y + edge.seg3.cp1.d,
      edge.seg2.end.s, y + edge.seg2.end.d
    );

    // Invertir segmento 2
    path.bezierCurveTo(
      edge.seg2.cp2.s, y + edge.seg2.cp2.d,
      edge.seg2.cp1.s, y + edge.seg2.cp1.d,
      edge.seg1.end.s, y + edge.seg1.end.d
    );

    // Invertir segmento 1
    path.bezierCurveTo(
      edge.seg1.cp2.s, y + edge.seg1.cp2.d,
      edge.seg1.cp1.s, y + edge.seg1.cp1.d,
      edge.p0,         y
    );

    path.lineTo(endX, y);
  }

  // Lado vertical hacia adelante: de y=0 a y=h
  drawEdgeVerticalForward(path, startY, endY, x, edge) {
    path.lineTo(x, edge.p0);

    path.bezierCurveTo(
      x + edge.seg1.cp1.d, edge.seg1.cp1.s,
      x + edge.seg1.cp2.d, edge.seg1.cp2.s,
      x + edge.seg1.end.d, edge.seg1.end.s
    );

    path.bezierCurveTo(
      x + edge.seg2.cp1.d, edge.seg2.cp1.s,
      x + edge.seg2.cp2.d, edge.seg2.cp2.s,
      x + edge.seg2.end.d, edge.seg2.end.s
    );

    path.bezierCurveTo(
      x + edge.seg3.cp1.d, edge.seg3.cp1.s,
      x + edge.seg3.cp2.d, edge.seg3.cp2.s,
      x + edge.seg3.end.d, edge.seg3.end.s
    );

    path.lineTo(x, endY);
  }

  // Lado vertical hacia atrás: de y=h a y=0 (inversión matemática exacta)
  drawEdgeVerticalReverse(path, startY, endY, x, edge) {
    path.lineTo(x, edge.p3);

    path.bezierCurveTo(
      x + edge.seg3.cp2.d, edge.seg3.cp2.s,
      x + edge.seg3.cp1.d, edge.seg3.cp1.s,
      x + edge.seg2.end.d, edge.seg2.end.s
    );

    path.bezierCurveTo(
      x + edge.seg2.cp2.d, edge.seg2.cp2.s,
      x + edge.seg2.cp1.d, edge.seg2.cp1.s,
      x + edge.seg1.end.d, edge.seg1.end.s
    );

    path.bezierCurveTo(
      x + edge.seg1.cp2.d, edge.seg1.cp2.s,
      x + edge.seg1.cp1.d, edge.seg1.cp1.s,
      x,                   edge.p0
    );

    path.lineTo(x, endY);
  }
}

window.JigsawGenerator = JigsawGenerator;
