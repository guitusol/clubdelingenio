/**
 * Puzles del Club — Motor de Tablero y Física de Piezas (HTML5 Canvas 2D)
 * Soporta renderizado de alta definición, clustering de piezas unidas,
 * atracción magnética, sombras y bisel 3D, organización en alas laterales,
 * filtro de marco ("Solo bordes"), imagen guía fantasma y zoom/panorámica.
 */

class PuzzleBoard {
  constructor(canvas, soundEngine, scoringEngine) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.sound = soundEngine;
    this.scoring = scoringEngine;

    // Estado del puzle
    this.image = null;
    this.pieces = [];
    this.clusters = new Map(); // clusterId -> Set de piezas
    this.grid = { cols: 6, rows: 4, totalPieces: 24 };
    this.seed = 12345;
    this.difficulty = 'facil';

    // Dimensiones lógicas del tablero central de ensamblaje
    this.boardWidth = 900;
    this.boardHeight = 500;
    this.boardX = 0; // Coordenada X del tablero central en el mundo virtual
    this.boardY = 0; // Coordenada Y del tablero central en el mundo virtual

    this.width = 1200;
    this.height = 700;

    // Dimensiones y márgenes de la mesa de trabajo
    this.worldWidth = 2400;
    this.worldHeight = 1400;

    // Transformaciones de cámara (Zoom y Desplazamiento)
    this.scale = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.isPanning = false;
    this.panStartX = 0;
    this.panStartY = 0;

    // Estado de interacción de piezas
    this.draggedCluster = null;
    this.dragOffset = { x: 0, y: 0 };
    this.topZIndex = 10;

    // Modos de ayuda
    this.showOnlyEdges = false;
    this.ghostOpacity = 0.0; // 0 = apagada, hasta 0.5
    this.snapThreshold = 30; // Distancia en píxeles para encaje magnético

    // Progreso
    this.placedCount = 0;
    this.onPiecePlaced = null;
    this.onVictory = null;

    this.dpr = window.devicePixelRatio || 1;
    this.generator = new JigsawGenerator();

    this.initEvents();
  }

  // Redimensionar canvas manteniendo nitidez retina
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width > 0 ? rect.width : (window.innerWidth || 1200);
    this.height = rect.height > 0 ? rect.height : (window.innerHeight - 120 || 700);

    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);

    this.render();
  }

  /**
   * Carga una nueva partida con una imagen y número de piezas
   */
  loadPuzzle(image, difficulty = 'facil', seed = Date.now()) {
    this.image = image;
    this.difficulty = difficulty;
    this.seed = seed;
    this.placedCount = 0;
    this.draggedCluster = null;
    this.clusters.clear();

    // Determinar cantidad de piezas objetivo por dificultad
    let targetPieces = 24;
    switch (difficulty) {
      case 'facil': targetPieces = 24; break;
      case 'medio': targetPieces = 48; break;
      case 'dificil': targetPieces = 96; break;
      case 'muy_dificil': targetPieces = 150; break;
    }

    // Calcular columnas y filas
    this.grid = this.generator.calculateGrid(targetPieces, image.width, image.height);

    // Calcular tamaño del tablero central adaptado al aspect ratio de la imagen
    const aspect = image.width / image.height;
    const baseW = 960;
    this.boardWidth = baseW;
    this.boardHeight = baseW / aspect;

    // Centrar tablero en el mundo virtual
    this.boardX = (this.worldWidth - this.boardWidth) / 2;
    this.boardY = (this.worldHeight - this.boardHeight) / 2;

    // Generar piezas con el troquelador Bézier
    const genResult = this.generator.generatePieces(
      this.boardWidth,
      this.boardHeight,
      this.grid.cols,
      this.grid.rows,
      this.seed
    );

    this.pieces = genResult.pieces;

    // Inicializar clusters y posiciones iniciales (alas laterales)
    this.pieces.forEach(p => {
      p.isPlaced = false;
      p.clusterId = p.id;
      this.clusters.set(p.clusterId, new Set([p]));
    });

    // Distribuir piezas en las alas izquierda y derecha
    this.distributePiecesToWings();

    // Inicializar motor de puntuación
    this.scoring.init(difficulty, this.pieces);

    // Ajustar cámara para que todo el tablero y alas quepan elegantemente
    this.resetCamera();
    this.render();
  }

  // Re-troquelar el puzle actual con una nueva semilla (despiece diferente)
  recutPuzzle() {
    this.loadPuzzle(this.image, this.difficulty, Math.floor(Math.random() * 10000000));
    this.sound.playShuffle();
  }

  /**
   * Distribuye las piezas no colocadas en las alas laterales izquierda y derecha
   * emulando un tapete de trabajo físico despejado al centro
   */
  distributePiecesToWings() {
    const leftMargin = 80;
    const rightMargin = this.boardX + this.boardWidth + 80;
    const wingWidth = this.boardX - 160;
    const availableHeight = this.worldHeight - 200;

    const unplaced = this.pieces.filter(p => !p.isPlaced);
    const half = Math.ceil(unplaced.length / 2);

    unplaced.forEach((p, index) => {
      const isLeft = index < half;
      const colInWing = index % 3;
      const rowInWing = Math.floor((isLeft ? index : (index - half)) / 3);

      const cellW = (wingWidth > 200 ? wingWidth / 3 : 110);
      const cellH = 100;

      const baseX = isLeft ? leftMargin : rightMargin;
      const jitterX = (this.generator.mulberry32(p.id * 17) - 0.5) * 20;
      const jitterY = (this.generator.mulberry32(p.id * 31) - 0.5) * 20;

      p.currentX = baseX + colInWing * cellW + jitterX;
      p.currentY = 100 + (rowInWing * cellH) % availableHeight + jitterY;
      p.zIndex = p.id;
    });

    this.render();
  }

  // Ajusta el zoom y centrado de cámara al tamaño de la pantalla
  resetCamera() {
    const padding = 40;
    const scaleX = this.width / (this.worldWidth + padding);
    const scaleY = this.height / (this.worldHeight + padding);
    this.scale = Math.min(scaleX, scaleY, 1.2);
    this.scale = Math.max(this.scale, 0.45);

    // Centrar la mesa de trabajo en el canvas
    this.panX = (this.width - this.worldWidth * this.scale) / 2;
    this.panY = (this.height - this.worldHeight * this.scale) / 2;

    this.render();
  }

  // Conversión de coordenadas de pantalla a coordenadas del mundo virtual
  screenToWorld(screenX, screenY) {
    return {
      x: (screenX - this.panX) / this.scale,
      y: (screenY - this.panY) / this.scale
    };
  }

  // Conversión de coordenadas de mundo a pantalla
  worldToScreen(worldX, worldY) {
    return {
      x: worldX * this.scale + this.panX,
      y: worldY * this.scale + this.panY
    };
  }

  // ============================================================================
  // EVENTOS DE RATÓN Y TÁCTILES
  // ============================================================================
  initEvents() {
    const cvs = this.canvas;

    // MOUSE DOWN
    cvs.addEventListener('mousedown', (e) => {
      const rect = cvs.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Clic derecho o barra espaciadora pulsada: inicio de Panorámica (Arrastre de tapete)
      if (e.button === 2 || e.button === 1 || e.shiftKey) {
        this.isPanning = true;
        this.panStartX = mouseX - this.panX;
        this.panStartY = mouseY - this.panY;
        cvs.style.cursor = 'grabbing';
        e.preventDefault();
        return;
      }

      if (e.button === 0) {
        const worldPos = this.screenToWorld(mouseX, mouseY);
        const hitPiece = this.findTopPieceAt(worldPos.x, worldPos.y);

        if (hitPiece && !hitPiece.isPlaced) {
          // Seleccionar todo el grupo (cluster) de la pieza
          const clusterSet = this.clusters.get(hitPiece.clusterId) || new Set([hitPiece]);
          this.draggedCluster = {
            mainPiece: hitPiece,
            pieces: Array.from(clusterSet),
            startMouseX: worldPos.x,
            startMouseY: worldPos.y,
            initialPositions: Array.from(clusterSet).map(p => ({ p, x: p.currentX, y: p.currentY }))
          };

          // Elevar al frente todas las piezas del cluster
          this.topZIndex += 2;
          this.draggedCluster.pieces.forEach(p => {
            p.zIndex = this.topZIndex;
          });

          this.sound.playPickup();
          cvs.style.cursor = 'grabbing';
          this.render();
        } else {
          // Clic en zona vacía: arrastrar tapete
          this.isPanning = true;
          this.panStartX = mouseX - this.panX;
          this.panStartY = mouseY - this.panY;
          cvs.style.cursor = 'grabbing';
        }
      }
    });

    // MOUSE MOVE
    window.addEventListener('mousemove', (e) => {
      const rect = cvs.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (this.isPanning) {
        this.panX = mouseX - this.panStartX;
        this.panY = mouseY - this.panStartY;
        this.render();
        return;
      }

      if (this.draggedCluster) {
        const worldPos = this.screenToWorld(mouseX, mouseY);
        const dx = worldPos.x - this.draggedCluster.startMouseX;
        const dy = worldPos.y - this.draggedCluster.startMouseY;

        this.draggedCluster.initialPositions.forEach(({ p, x, y }) => {
          p.currentX = x + dx;
          p.currentY = y + dy;
        });

        this.render();
      }
    });

    // MOUSE UP
    window.addEventListener('mouseup', () => {
      if (this.isPanning) {
        this.isPanning = false;
        cvs.style.cursor = 'grab';
      }

      if (this.draggedCluster) {
        this.checkClusterSnapping(this.draggedCluster);
        this.draggedCluster = null;
        cvs.style.cursor = 'grab';
        this.render();
      }
    });

    // PREVENIR MENÚ CONTEXTUAL PARA USAR CLIC DERECHO COMO PAN
    cvs.addEventListener('contextmenu', (e) => e.preventDefault());

    // RUEDA DEL RATÓN: ZOOM FLUIDO ALREDEDOR DEL CURSOR
    cvs.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = cvs.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
      const newScale = Math.min(2.5, Math.max(0.35, this.scale * zoomFactor));

      // Mantener la posición del cursor fija durante el zoom
      this.panX = mouseX - (mouseX - this.panX) * (newScale / this.scale);
      this.panY = mouseY - (mouseY - this.panY) * (newScale / this.scale);
      this.scale = newScale;

      this.render();
    }, { passive: false });

    // SOPORTE TÁCTIL (MÓVILES Y TABLETS)
    let touchStartDist = 0;
    let touchStartScale = 1;

    cvs.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = cvs.getBoundingClientRect();
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;
        const worldPos = this.screenToWorld(touchX, touchY);

        const hitPiece = this.findTopPieceAt(worldPos.x, worldPos.y);
        if (hitPiece && !hitPiece.isPlaced) {
          const clusterSet = this.clusters.get(hitPiece.clusterId) || new Set([hitPiece]);
          this.draggedCluster = {
            mainPiece: hitPiece,
            pieces: Array.from(clusterSet),
            startMouseX: worldPos.x,
            startMouseY: worldPos.y,
            initialPositions: Array.from(clusterSet).map(p => ({ p, x: p.currentX, y: p.currentY }))
          };

          this.topZIndex += 2;
          this.draggedCluster.pieces.forEach(p => p.zIndex = this.topZIndex);
          this.sound.playPickup();
          this.render();
        } else {
          this.isPanning = true;
          this.panStartX = touchX - this.panX;
          this.panStartY = touchY - this.panY;
        }
      } else if (e.touches.length === 2) {
        // Gesto de pellizco (Pinch to Zoom)
        this.isPanning = false;
        this.draggedCluster = null;
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        touchStartDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        touchStartScale = this.scale;
      }
    }, { passive: false });

    cvs.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = cvs.getBoundingClientRect();

      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;

        if (this.isPanning) {
          this.panX = touchX - this.panStartX;
          this.panY = touchY - this.panStartY;
          this.render();
        } else if (this.draggedCluster) {
          const worldPos = this.screenToWorld(touchX, touchY);
          const dx = worldPos.x - this.draggedCluster.startMouseX;
          const dy = worldPos.y - this.draggedCluster.startMouseY;

          this.draggedCluster.initialPositions.forEach(({ p, x, y }) => {
            p.currentX = x + dx;
            p.currentY = y + dy;
          });
          this.render();
        }
      } else if (e.touches.length === 2 && touchStartDist > 0) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const midX = (t1.clientX + t2.clientX) / 2 - rect.left;
        const midY = (t1.clientY + t2.clientY) / 2 - rect.top;

        const newScale = Math.min(2.5, Math.max(0.35, touchStartScale * (dist / touchStartDist)));
        this.panX = midX - (midX - this.panX) * (newScale / this.scale);
        this.panY = midY - (midY - this.panY) * (newScale / this.scale);
        this.scale = newScale;

        this.render();
      }
    }, { passive: false });

    cvs.addEventListener('touchend', () => {
      if (this.isPanning) this.isPanning = false;
      if (this.draggedCluster) {
        this.checkClusterSnapping(this.draggedCluster);
        this.draggedCluster = null;
        this.render();
      }
      touchStartDist = 0;
    });
  }

  /**
   * Busca la pieza situada más arriba (mayor zIndex) en la coordenada (x, y)
   */
  findTopPieceAt(worldX, worldY) {
    let topPiece = null;
    let maxZ = -1;

    for (const p of this.pieces) {
      if (p.isPlaced) continue; // Las piezas colocadas en el tablero ya no se levantan

      // Bounding box aproximado con margen de salientes
      const minX = p.currentX - p.tabMarginX;
      const maxX = p.currentX + p.width + p.tabMarginX;
      const minY = p.currentY - p.tabMarginY;
      const maxY = p.currentY + p.height + p.tabMarginY;

      if (worldX >= minX && worldX <= maxX && worldY >= minY && worldY <= maxY) {
        if (p.zIndex > maxZ) {
          maxZ = p.zIndex;
          topPiece = p;
        }
      }
    }

    return topPiece;
  }

  // ============================================================================
  // LÓGICA DE ENCAJE MAGNÉTICO (A TABLERO Y ENTRE PIEZAS VECINAS)
  // ============================================================================
  checkClusterSnapping(clusterData) {
    const clusterPieces = clusterData.pieces;
    let didSnapToBoard = false;
    let didSnapToNeighbor = false;

    // 1. COMPROBAR SI ALGUNA PIEZA DEL CLUSTER ESTÁ CERCA DE SU POSICIÓN FINAL EN EL TABLERO
    for (const p of clusterPieces) {
      const targetBoardX = this.boardX + p.targetX;
      const targetBoardY = this.boardY + p.targetY;
      const dist = Math.hypot(p.currentX - targetBoardX, p.currentY - targetBoardY);

      if (dist < this.snapThreshold) {
        // ¡ENCAJE DIRECTO EN EL TABLERO!
        const shiftX = targetBoardX - p.currentX;
        const shiftY = targetBoardY - p.currentY;

        // Alinear todo el grupo exactamente en el tablero
        clusterPieces.forEach(member => {
          member.currentX += shiftX;
          member.currentY += shiftY;
          member.isPlaced = true;
          this.placedCount++;
          this.scoring.scorePiecePlacement(member, this.ghostOpacity > 0.05);
        });

        didSnapToBoard = true;
        this.sound.playSnap();
        if (clusterPieces.length > 1) {
          this.sound.playGroupSnap();
        }
        break;
      }
    }

    // 2. SI NO ENCAJÓ AL TABLERO, COMPROBAR SI ENCAJA CON PIEZAS VECINAS SUELTAS
    if (!didSnapToBoard) {
      for (const p of clusterPieces) {
        // Buscar vecinos inmediatos en la cuadrícula (arriba, derecha, abajo, izquierda)
        const neighbors = this.findAdjacentNeighbors(p);

        for (const neighbor of neighbors) {
          // Si el vecino ya está en el mismo cluster o está colocado en el tablero, saltar
          if (neighbor.clusterId === p.clusterId || neighbor.isPlaced) continue;

          // La distancia relativa ideal entre p y neighbor
          const idealDx = neighbor.targetX - p.targetX;
          const idealDy = neighbor.targetY - p.targetY;

          // Distancia actual real entre ambas
          const actualDx = neighbor.currentX - p.currentX;
          const actualDy = neighbor.currentY - p.currentY;

          const errorDist = Math.hypot(actualDx - idealDx, actualDy - idealDy);

          if (errorDist < this.snapThreshold) {
            // ¡ENCAJE MAGNÉTICO ENTRE DOS GRUPOS!
            // Alinear el cluster del vecino a la posición ideal respecto a nuestro cluster
            const targetNeighborX = p.currentX + idealDx;
            const targetNeighborY = p.currentY + idealDy;
            const shiftX = targetNeighborX - neighbor.currentX;
            const shiftY = targetNeighborY - neighbor.currentY;

            const neighborCluster = this.clusters.get(neighbor.clusterId) || new Set([neighbor]);
            neighborCluster.forEach(nMember => {
              nMember.currentX += shiftX;
              nMember.currentY += shiftY;
            });

            // Fusionar los dos clusters
            this.mergeClusters(p.clusterId, neighbor.clusterId);
            didSnapToNeighbor = true;
            this.sound.playSnap();
            break;
          }
        }
        if (didSnapToNeighbor) break;
      }
    }

    // Notificar progreso a la interfaz
    if (this.onPiecePlaced) {
      this.onPiecePlaced(this.placedCount, this.pieces.length);
    }

    // Comprobar condición de victoria total
    if (this.placedCount >= this.pieces.length) {
      this.sound.playVictory();
      if (this.onVictory) {
        this.onVictory(this.scoring.calculateFinalVictoryScore());
      }
    }
  }

  // Encuentra las piezas adyacentes en la matriz (ortogonales)
  findAdjacentNeighbors(p) {
    const res = [];
    const { row, col } = p;
    const cols = this.grid.cols;

    if (row > 0) res.push(this.pieces[(row - 1) * cols + col]); // Arriba
    if (row < this.grid.rows - 1) res.push(this.pieces[(row + 1) * cols + col]); // Abajo
    if (col > 0) res.push(this.pieces[row * cols + (col - 1)]); // Izquierda
    if (col < cols - 1) res.push(this.pieces[row * cols + (col + 1)]); // Derecha

    return res.filter(Boolean);
  }

  // Fusiona dos clusters en uno solo
  mergeClusters(idA, idB) {
    const setA = this.clusters.get(idA) || new Set();
    const setB = this.clusters.get(idB) || new Set();

    setB.forEach(p => {
      p.clusterId = idA;
      setA.add(p);
    });

    this.clusters.set(idA, setA);
    this.clusters.delete(idB);
  }

  // ============================================================================
  // RENDERIZADO VISUAL EN EL TAPETE (CANVAS)
  // ============================================================================
  render() {
    const ctx = this.ctx;
    ctx.save();

    // Limpiar canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Ajuste de escala DPR
    ctx.scale(this.dpr, this.dpr);

    // DIBUJAR TAPETE DE FONDO (Felt Mat estilo pizarra/tela con textura táctil)
    this.drawFeltBackground(ctx);

    // APLICAR TRANSFORMACIONES DE CÁMARA (PAN & ZOOM)
    ctx.save();
    ctx.translate(this.panX, this.panY);
    ctx.scale(this.scale, this.scale);

    // 1. ZONA DEL TABLERO CENTRAL DE ENSAMBLAJE
    this.drawAssemblyBoardArea(ctx);

    // 2. DIBUJAR TODAS LAS PIEZAS COLOCADAS EN EL TABLERO (en el fondo)
    this.pieces.filter(p => p.isPlaced).forEach(p => {
      this.drawPiece(ctx, p, true);
    });

    // 3. DIBUJAR PIEZAS SUELTAS (ordenadas por su zIndex)
    const loosePieces = this.pieces.filter(p => !p.isPlaced);
    loosePieces.sort((a, b) => a.zIndex - b.zIndex);

    loosePieces.forEach(p => {
      this.drawPiece(ctx, p, false);
    });

    ctx.restore();
    ctx.restore();
  }

  // Dibuja el tapete de fieltro con sutil grano y marco de costura
  drawFeltBackground(ctx) {
    const w = Math.max(100, Number.isFinite(this.width) ? this.width : 1200);
    const h = Math.max(100, Number.isFinite(this.height) ? this.height : 700);
    const radius = Math.max(w, h, 200);

    // Degradado radial oscuro estilo Dark Luxury Felt (pizarra gris carbón azulada)
    const grad = ctx.createRadialGradient(w * 0.5, h * 0.45, 10, w * 0.5, h * 0.5, radius);
    grad.addColorStop(0, '#2d333b');
    grad.addColorStop(0.6, '#1e2228');
    grad.addColorStop(1, '#121519');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Borde de costura perimetral elegante
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    ctx.strokeRect(16, 16, Math.max(10, w - 32), Math.max(10, h - 32));
  }

  // Dibuja la silueta, imagen fantasma y cuadrícula guía en el centro del tapete
  drawAssemblyBoardArea(ctx) {
    const bx = this.boardX;
    const by = this.boardY;
    const bw = this.boardWidth;
    const bh = this.boardHeight;

    // Sombra proyectada del tablero sobre el fieltro
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 35;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 15;

    // Marco exterior con relieve biselado
    ctx.fillStyle = '#181b20';
    ctx.fillRect(bx - 6, by - 6, bw + 12, bh + 12);
    ctx.restore();

    // Borde dorado sutil
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(bx - 2, by - 2, bw + 4, bh + 4);

    // Fondo del tablero (hueco donde se montan las piezas)
    ctx.fillStyle = '#14171c';
    ctx.fillRect(bx, by, bw, bh);

    // IMAGEN GUÍA FANTASMA (si está habilitada por el usuario)
    if (this.ghostOpacity > 0 && this.image) {
      ctx.save();
      ctx.globalAlpha = this.ghostOpacity;
      ctx.drawImage(this.image, bx, by, bw, bh);
      ctx.restore();
    }

    // Cuadrícula sutil de las celdas
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let c = 1; c < this.grid.cols; c++) {
      const gx = bx + (bw / this.grid.cols) * c;
      ctx.beginPath();
      ctx.moveTo(gx, by);
      ctx.lineTo(gx, by + bh);
      ctx.stroke();
    }
    for (let r = 1; r < this.grid.rows; r++) {
      const gy = by + (bh / this.grid.rows) * r;
      ctx.beginPath();
      ctx.moveTo(bx, gy);
      ctx.lineTo(bx + bw, gy);
      ctx.stroke();
    }
  }

  /**
   * Dibuja una pieza de puzle con su imagen recortada, bisel 3D y sombra
   */
  drawPiece(ctx, p, isLockedOnBoard) {
    if (!this.image) return;

    // Filtro "Solo bordes": atenuar piezas interiores si está activo
    const isDimmed = this.showOnlyEdges && !p.isEdge && !p.isPlaced;
    const alpha = isDimmed ? 0.18 : 1.0;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(p.currentX, p.currentY);

    // 1. SOMBRA ARROJADA (solo para piezas flotantes sobre el tapete)
    if (!isLockedOnBoard) {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 6;
      ctx.fillStyle = '#000000';
      ctx.fill(p.pathData);
      ctx.restore();
    }

    // 2. RECORTE DE LA IMAGEN CON LA SILUETA TROQUELADA
    ctx.save();
    ctx.clip(p.pathData);

    // Dibujar la porción exacta de la imagen fuente escalada
    const scaleFactor = this.boardWidth / this.image.width;
    const srcX = (p.targetX / this.boardWidth) * this.image.width;
    const srcY = (p.targetY / this.boardHeight) * this.image.height;
    const srcW = (p.width / this.boardWidth) * this.image.width;
    const srcH = (p.height / this.boardHeight) * this.image.height;

    // Dibujamos con margen de extensión para cubrir completamente las pestañas
    const mFactorX = (p.tabMarginX / this.boardWidth) * this.image.width;
    const mFactorY = (p.tabMarginY / this.boardHeight) * this.image.height;

    ctx.drawImage(
      this.image,
      srcX - mFactorX,
      srcY - mFactorY,
      srcW + mFactorX * 2,
      srcH + mFactorY * 2,
      -p.tabMarginX,
      -p.tabMarginY,
      p.width + p.tabMarginX * 2,
      p.height + p.tabMarginY * 2
    );

    // 3. BISEL 3D TÁCTIL (Relieve realista de pieza de cartón/madera prensada)
    // Sombra interior en bordes inferiores
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineWidth = 2.5;
    ctx.stroke(p.pathData);

    // Brillo suave en bordes superiores
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.2;
    ctx.stroke(p.pathData);

    ctx.restore(); // Termina clip

    // Contorno exterior muy sutil para delimitar las piezas unidas
    ctx.strokeStyle = isLockedOnBoard ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke(p.pathData);

    ctx.restore();
  }
}

window.PuzzleBoard = PuzzleBoard;
