/**
 * Puzles del Club — Generador Matemático de Troquelado Jigsaw
 * Genera piezas entrelazadas realistas con curvas de Bézier cúbicas,
 * pestañas convexas (machos) y entrantes (hembras) únicas por semilla (seed).
 * Permite despiezar cualquier imagen múltiples veces con cortes completamente distintos.
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

  // Genera un número pseudoaleatorio entre min y max usando la semilla activa
  randomRange(min, max) {
    const val = this.mulberry32(this.rngSeed++);
    return min + val * (max - min);
  }

  // Configuración de cuadrícula según nivel de dificultad y relación de aspecto
  calculateGrid(pieceCount, imageWidth, imageHeight) {
    const aspect = imageWidth / imageHeight;
    // Buscamos columnas y filas cuyo producto sea lo más cercano posible a pieceCount
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
   * @param {number} boardW - Ancho del tablero
   * @param {number} boardH - Alto del tablero
   * @param {number} cols - Columnas
   * @param {number} rows - Filas
   * @param {number} seed - Semilla matemática para reproducir o cambiar cortes
   */
  generatePieces(boardW, boardH, cols, rows, seed = Date.now()) {
    this.rngSeed = seed;

    const pieceW = boardW / cols;
    const pieceH = boardH / rows;

    // Generar perfiles de aristas horizontales y verticales
    // horizontalEdges[r][c] separa la fila r de la r+1 en la columna c (r de 0 a rows-2, c de 0 a cols-1)
    const horizontalEdges = [];
    for (let r = 0; r < rows - 1; r++) {
      horizontalEdges[r] = [];
      for (let c = 0; c < cols; c++) {
        // Tab direction: 1 (hacia abajo / fila r+1), -1 (hacia arriba / fila r)
        const dir = this.mulberry32(this.rngSeed++) > 0.5 ? 1 : -1;
        horizontalEdges[r][c] = this.createEdgeProfile(pieceW, dir);
      }
    }

    // verticalEdges[r][c] separa la columna c de la c+1 en la fila r (r de 0 a rows-1, c de 0 a cols-2)
    const verticalEdges = [];
    for (let r = 0; r < rows; r++) {
      verticalEdges[r] = [];
      for (let c = 0; c < cols - 1; c++) {
        // Tab direction: 1 (hacia la derecha / col c+1), -1 (hacia la izquierda / col c)
        const dir = this.mulberry32(this.rngSeed++) > 0.5 ? 1 : -1;
        verticalEdges[r][c] = this.createEdgeProfile(pieceH, dir);
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

        // Tipo de pieza para puntuación cognitiva: 'corner', 'edge', 'inner'
        const type = isCorner ? 'corner' : (isEdge ? 'edge' : 'inner');

        // Obtener o invertir los 4 lados de la pieza:
        // top, right, bottom, left
        const topEdge = isTop ? null : horizontalEdges[r - 1][c];
        const rightEdge = isRight ? null : verticalEdges[r][c];
        const bottomEdge = isBottom ? null : horizontalEdges[r][c];
        const leftEdge = isLeft ? null : verticalEdges[r][c - 1];

        // Definir la trayectoria del contorno de la pieza
        const pathData = this.buildPiecePath(
          pieceW,
          pieceH,
          topEdge,    // Top edge profile (o null si es borde plano)
          rightEdge,  // Right edge profile (o null si es borde plano)
          bottomEdge, // Bottom edge profile (o null si es borde plano)
          leftEdge,   // Left edge profile (o null si es borde plano)
          isTop, isRight, isBottom, isLeft
        );

        // Puntos de corrección de posición exacta en el tablero
        const targetX = c * pieceW;
        const targetY = r * pieceH;

        // Bounding box con margen de seguridad para salientes (tab extensions ~30% del tamaño)
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
          // Propiedades dinámicas en juego
          currentX: 0,
          currentY: 0,
          isPlaced: false,
          clusterId: id, // Inicialmente cada pieza es su propio grupo
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
   * Crea las curvas de Bézier orgánicas para una pestaña de acople clásica
   * @param {number} length - Longitud del lado
   * @param {number} dir - Dirección del saliente (1 o -1)
   */
  createEdgeProfile(length, dir) {
    // Parámetros con leve variación orgánica (Mulberry32)
    const tabCenter = length * this.randomRange(0.48, 0.52);
    const tabSize = length * this.randomRange(0.24, 0.28);
    const tabHeight = length * this.randomRange(0.20, 0.25) * dir;
    const neckPinch = tabSize * this.randomRange(0.28, 0.34);

    return {
      length,
      dir,
      tabCenter,
      tabSize,
      tabHeight,
      neckPinch
    };
  }

  /**
   * Construye el Path2D relativo a (0, 0) de la casilla de la pieza
   */
  buildPiecePath(w, h, topEdge, rightEdge, bottomEdge, leftEdge, isTop, isRight, isBottom, isLeft) {
    const path = new Path2D();

    // Comenzamos en la esquina superior izquierda (0, 0)
    path.moveTo(0, 0);

    // 1. LADO SUPERIOR (de (0, 0) a (w, 0))
    if (isTop || !topEdge) {
      path.lineTo(w, 0);
    } else {
      // Invertimos la dirección respecto al bottomEdge de la celda superior
      this.drawEdgeHorizontal(path, 0, w, 0, topEdge, -topEdge.dir);
    }

    // 2. LADO DERECHO (de (w, 0) a (w, h))
    if (isRight || !rightEdge) {
      path.lineTo(w, h);
    } else {
      this.drawEdgeVertical(path, 0, h, w, rightEdge, rightEdge.dir);
    }

    // 3. LADO INFERIOR (de (w, h) a (0, h))
    if (isBottom || !bottomEdge) {
      path.lineTo(0, h);
    } else {
      this.drawEdgeHorizontalReverse(path, w, 0, h, bottomEdge, bottomEdge.dir);
    }

    // 4. LADO IZQUIERDO (de (0, h) a (0, 0))
    if (isLeft || !leftEdge) {
      path.lineTo(0, 0);
    } else {
      this.drawEdgeVerticalReverse(path, h, 0, 0, leftEdge, -leftEdge.dir);
    }

    path.closePath();
    return path;
  }

  // Dibuja borde horizontal de izquierda a derecha
  drawEdgeHorizontal(path, startX, endX, y, edge, dir) {
    const len = endX - startX;
    const c = startX + edge.tabCenter;
    const halfBase = edge.tabSize;
    const neck = edge.neckPinch;
    const h = Math.abs(edge.tabHeight) * dir;

    const p0x = c - halfBase;
    const p1x = c - neck;
    const p2x = c + neck;
    const p3x = c + halfBase;

    // Línea base hasta el cuello de la pestaña
    path.lineTo(p0x, y);

    // Curva de entrada al cuello y cabeza del saliente (curva de Bézier cúbica)
    path.bezierCurveTo(
      p0x + (p1x - p0x) * 0.2, y + h * 0.1,
      p1x - (p2x - p1x) * 0.5, y + h * 0.8,
      c - edge.tabSize * 0.55, y + h
    );

    // Corona / domo superior de la pestaña
    path.bezierCurveTo(
      c - edge.tabSize * 0.2, y + h * 1.25,
      c + edge.tabSize * 0.2, y + h * 1.25,
      c + edge.tabSize * 0.55, y + h
    );

    // Curva de salida del saliente hacia la base
    path.bezierCurveTo(
      p2x + (p2x - p1x) * 0.5, y + h * 0.8,
      p3x - (p3x - p2x) * 0.2, y + h * 0.1,
      p3x, y
    );

    // Resto de la línea horizontal
    path.lineTo(endX, y);
  }

  // Dibuja borde horizontal de derecha a izquierda
  drawEdgeHorizontalReverse(path, startX, endX, y, edge, dir) {
    const c = endX + (edge.length - edge.tabCenter);
    const halfBase = edge.tabSize;
    const neck = edge.neckPinch;
    const h = Math.abs(edge.tabHeight) * dir;

    const p0x = c + halfBase;
    const p1x = c + neck;
    const p2x = c - neck;
    const p3x = c - halfBase;

    path.lineTo(p0x, y);

    path.bezierCurveTo(
      p0x - (p0x - p1x) * 0.2, y + h * 0.1,
      p1x + (p1x - p2x) * 0.5, y + h * 0.8,
      c + edge.tabSize * 0.55, y + h
    );

    path.bezierCurveTo(
      c + edge.tabSize * 0.2, y + h * 1.25,
      c - edge.tabSize * 0.2, y + h * 1.25,
      c - edge.tabSize * 0.55, y + h
    );

    path.bezierCurveTo(
      p2x - (p1x - p2x) * 0.5, y + h * 0.8,
      p3x + (p0x - p3x) * 0.2, y + h * 0.1,
      p3x, y
    );

    path.lineTo(endX, y);
  }

  // Dibuja borde vertical de arriba hacia abajo
  drawEdgeVertical(path, startY, endY, x, edge, dir) {
    const c = startY + edge.tabCenter;
    const halfBase = edge.tabSize;
    const neck = edge.neckPinch;
    const h = Math.abs(edge.tabHeight) * dir;

    const p0y = c - halfBase;
    const p1y = c - neck;
    const p2y = c + neck;
    const p3y = c + halfBase;

    path.lineTo(x, p0y);

    path.bezierCurveTo(
      x + h * 0.1, p0y + (p1y - p0y) * 0.2,
      x + h * 0.8, p1y - (p2y - p1y) * 0.5,
      x + h, c - edge.tabSize * 0.55
    );

    path.bezierCurveTo(
      x + h * 1.25, c - edge.tabSize * 0.2,
      x + h * 1.25, c + edge.tabSize * 0.2,
      x + h, c + edge.tabSize * 0.55
    );

    path.bezierCurveTo(
      x + h * 0.8, p2y + (p2y - p1y) * 0.5,
      x + h * 0.1, p3y - (p3y - p2y) * 0.2,
      x, p3y
    );

    path.lineTo(x, endY);
  }

  // Dibuja borde vertical de abajo hacia arriba
  drawEdgeVerticalReverse(path, startY, endY, x, edge, dir) {
    const c = endY + (edge.length - edge.tabCenter);
    const halfBase = edge.tabSize;
    const neck = edge.neckPinch;
    const h = Math.abs(edge.tabHeight) * dir;

    const p0y = c + halfBase;
    const p1y = c + neck;
    const p2y = c - neck;
    const p3y = c - halfBase;

    path.lineTo(x, p0y);

    path.bezierCurveTo(
      x + h * 0.1, p0y - (p0y - p1y) * 0.2,
      x + h * 0.8, p1y + (p1y - p2y) * 0.5,
      x + h, c + edge.tabSize * 0.55
    );

    path.bezierCurveTo(
      x + h * 1.25, c + edge.tabSize * 0.2,
      x + h * 1.25, c - edge.tabSize * 0.2,
      x + h, c - edge.tabSize * 0.55
    );

    path.bezierCurveTo(
      x + h * 0.8, p2y - (p1y - p2y) * 0.5,
      x + h * 0.1, p3y + (p0y - p3y) * 0.2,
      x, p3y
    );

    path.lineTo(x, endY);
  }
}

window.JigsawGenerator = JigsawGenerator;
