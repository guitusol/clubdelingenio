/**
 * 3D Graphics & Physics Renderer for Damas (Three.js)
 * Dark Luxury aesthetic: Ebony & Marble board, carved metallic pieces,
 * 3D golden crown coronation animation, and parabolic jump arcs.
 * Club del Ingenio
 */

import { sound } from './sound.js';
import { WHITE, BLACK, WHITE_KING, BLACK_KING, EMPTY } from './damas-rules.js';

export class Damas3D {
  constructor(container, onSquareClicked) {
    this.container = container;
    this.onSquareClicked = onSquareClicked;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.boardGroup = null;
    this.piecesGroup = null;
    this.markersGroup = null;
    this.crownGroup = null;

    // Raycasting & Interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.isPointerDown = false;
    this.pointerStart = { x: 0, y: 0 };
    this.isOrbiting = false;

    // Camera Spherical coords (3D default)
    this.isTopDown = false;
    this.spherical = {
      radius: 12.0,
      theta: 0,                 // Facing White pieces by default
      phi: Math.PI / 3.2        // Angle looking down
    };

    // Piece meshes dictionary: 'r_c' -> THREE.Mesh
    this.pieceMeshes = {};
    this.squareMeshes = [];

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    if (width < 600) {
      this.spherical.radius = 13.5;
    } else {
      this.spherical.radius = 12.0;
    }

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.updateCameraPosition();

    // 3. Renderer with ACES Filmic tone mapping
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting setup (Luxury Atmosphere)
    this.setupLighting();

    // 5. Build Board & Pieces
    this.boardGroup = new THREE.Group();
    this.piecesGroup = new THREE.Group();
    this.markersGroup = new THREE.Group();
    this.scene.add(this.boardGroup);
    this.scene.add(this.piecesGroup);
    this.scene.add(this.markersGroup);

    this.buildBoard();
    this.bindEvents();

    // 6. Animation loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    // Key Light (warm gold/white highlight)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.3);
    keyLight.position.set(10, 15, 10);
    this.scene.add(keyLight);

    // Rim Light (cool cyan glow)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.75);
    rimLight.position.set(-10, 10, -10);
    this.scene.add(rimLight);

    // Subtle fill light
    const fillLight = new THREE.DirectionalLight(0xf59e0b, 0.4);
    fillLight.position.set(0, -10, 10);
    this.scene.add(fillLight);
  }

  updateCameraPosition() {
    if (this.isTopDown) {
      this.camera.position.set(0, 13.5, 0.01);
      this.camera.lookAt(0, 0, 0);
      return;
    }

    this.spherical.phi = Math.max(0.2, Math.min(Math.PI / 2 - 0.05, this.spherical.phi));
    this.camera.position.x = this.spherical.radius * Math.sin(this.spherical.phi) * Math.sin(this.spherical.theta);
    this.camera.position.y = this.spherical.radius * Math.cos(this.spherical.phi);
    this.camera.position.z = this.spherical.radius * Math.sin(this.spherical.phi) * Math.cos(this.spherical.theta);
    this.camera.lookAt(0, 0, 0);
  }

  toggleViewMode() {
    this.isTopDown = !this.isTopDown;
    this.updateCameraPosition();
    return this.isTopDown;
  }

  buildBoard() {
    const boardSize = 8;
    const sqSize = 1.0;
    const half = (boardSize * sqSize) / 2;

    // Outer Wooden/Marble Frame
    const frameGeo = new THREE.BoxGeometry(boardSize + 0.8, 0.4, boardSize + 0.8);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.15
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = -0.22;
    this.boardGroup.add(frame);

    // Golden Accent Trim on Frame
    const trimGeo = new THREE.BoxGeometry(boardSize + 0.1, 0.44, boardSize + 0.1);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.75
    });
    const trim = new THREE.Mesh(trimGeo, trimMat);
    trim.position.y = -0.24;
    this.boardGroup.add(trim);

    // Square materials
    const lightMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6,
      metalness: 0.08
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x070a13,
      roughness: 0.25,
      metalness: 0.25
    });

    const sqGeo = new THREE.BoxGeometry(sqSize * 0.98, 0.1, sqSize * 0.98);

    this.squareMeshes = [];

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const isDark = (r + c) % 2 === 1;
        const mesh = new THREE.Mesh(sqGeo, isDark ? darkMat : lightMat);

        // Center squares at (0, 0)
        const x = (c - 3.5) * sqSize;
        const z = (r - 3.5) * sqSize;
        mesh.position.set(x, 0, z);

        mesh.userData = { r, c, isPlayable: isDark, isSquare: true };
        this.boardGroup.add(mesh);
        this.squareMeshes.push(mesh);
      }
    }
  }

  /**
   * Sync 3D pieces with the DamasRules board array
   */
  syncPieces(board) {
    // Clear existing piece meshes
    while (this.piecesGroup.children.length > 0) {
      this.piecesGroup.remove(this.piecesGroup.children[0]);
    }
    this.pieceMeshes = {};

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece) {
          this.createPieceMesh(r, c, piece);
        }
      }
    }
  }

  createPieceMesh(r, c, piece) {
    const isWhite = piece.startsWith(WHITE);
    const isKing = piece === WHITE_KING || piece === BLACK_KING;

    const group = new THREE.Group();

    // Piece Body: Cylindrical carved token
    const radius = 0.38;
    const height = 0.16;
    const bodyGeo = new THREE.CylinderGeometry(radius, radius, height, 32);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: isWhite ? 0xf8fafc : 0x11141a,
      roughness: isWhite ? 0.35 : 0.22,
      metalness: isWhite ? 0.1 : 0.3,
      bumpScale: 0.05
    });

    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.y = height / 2;
    group.add(bodyMesh);

    // Metallic Outer Rim
    const rimGeo = new THREE.TorusGeometry(radius * 0.95, 0.02, 16, 32);
    const rimMat = new THREE.MeshStandardMaterial({
      color: isWhite ? 0xfbbf24 : 0x38bdf8,
      roughness: 0.2,
      metalness: 0.8
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = height + 0.005;
    group.add(rim);

    // Inner Crest Emblem (Club symbol)
    const innerEmblemGeo = new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, 0.01, 16);
    const emblemMat = new THREE.MeshStandardMaterial({
      color: isWhite ? 0xfde047 : 0x2563eb,
      roughness: 0.3,
      metalness: 0.6
    });
    const emblem = new THREE.Mesh(innerEmblemGeo, emblemMat);
    emblem.position.y = height + 0.01;
    group.add(emblem);

    // 3D Golden Crown (if King / Dama)
    if (isKing) {
      this.attachCrown(group, height);
    }

    const sqSize = 1.0;
    const x = (c - 3.5) * sqSize;
    const z = (r - 3.5) * sqSize;
    group.position.set(x, 0.05, z);

    group.userData = { r, c, piece, isPiece: true };

    this.piecesGroup.add(group);
    this.pieceMeshes[`${r}_${c}`] = group;

    return group;
  }

  attachCrown(group, pieceHeight) {
    const crown = new THREE.Group();
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.15,
      metalness: 0.85
    });

    // Crown Base Ring
    const baseGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.08, 16);
    const baseMesh = new THREE.Mesh(baseGeo, goldMat);
    baseMesh.position.y = 0.04;
    crown.add(baseMesh);

    // 5 Crown Spikes
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const spikeGeo = new THREE.ConeGeometry(0.04, 0.12, 8);
      const spike = new THREE.Mesh(spikeGeo, goldMat);
      spike.position.x = Math.sin(angle) * 0.16;
      spike.position.z = Math.cos(angle) * 0.16;
      spike.position.y = 0.12;
      crown.add(spike);
    }

    crown.position.y = pieceHeight + 0.04;
    group.add(crown);
  }

  /**
   * Smooth camera rotation to face White (theta=0) or Black (theta=PI)
   */
  rotateCameraToSide(side, animate = true) {
    if (this.isTopDown) return;
    const targetTheta = side === BLACK ? Math.PI : 0;
    if (!animate) {
      this.spherical.theta = targetTheta;
      this.updateCameraPosition();
      return;
    }

    let diff = targetTheta - this.spherical.theta;
    // Normalize angle difference to [-PI, PI]
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;

    const startTheta = this.spherical.theta;
    const startTime = performance.now();
    const duration = 600;

    const animLoop = (time) => {
      const p = Math.min((time - startTime) / duration, 1);
      const ease = p * (2 - p);
      this.spherical.theta = startTheta + diff * ease;
      this.updateCameraPosition();
      if (p < 1) requestAnimationFrame(animLoop);
    };
    requestAnimationFrame(animLoop);
  }

  /**
   * Animate smooth parabolic move/jump (with multi-hop support for chains)
   */
  animateMove(move, crowned, onComplete) {
    const { from, to, isCapture, path, capturedPositions } = move;
    const meshKey = `${from.r}_${from.c}`;
    const mesh = this.pieceMeshes[meshKey];

    if (!mesh) {
      if (onComplete) onComplete();
      return;
    }

    delete this.pieceMeshes[meshKey];
    this.pieceMeshes[`${to.r}_${to.c}`] = mesh;
    mesh.userData.r = to.r;
    mesh.userData.c = to.c;

    const sqSize = 1.0;
    const waypoints = (path && path.length > 0) ? path : [to];

    let currentWaypointIdx = 0;
    let currentStartX = mesh.position.x;
    let currentStartZ = mesh.position.z;

    const animateHop = () => {
      if (currentWaypointIdx >= waypoints.length) {
        if (crowned) {
          this.attachCrown(mesh, 0.16);
          sound.playCoronation();
        }
        if (onComplete) onComplete();
        return;
      }

      const targetSq = waypoints[currentWaypointIdx];
      const targetX = (targetSq.c - 3.5) * sqSize;
      const targetZ = (targetSq.r - 3.5) * sqSize;

      const duration = isCapture ? 270 : 200;
      const arcHeight = isCapture ? 0.95 : 0.3;
      const startTime = performance.now();

      const loop = (time) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 2);

        mesh.position.x = currentStartX + (targetX - currentStartX) * ease;
        mesh.position.z = currentStartZ + (targetZ - currentStartZ) * ease;
        mesh.position.y = 0.05 + Math.sin(progress * Math.PI) * arcHeight;

        if (progress < 1) {
          requestAnimationFrame(loop);
        } else {
          mesh.position.set(targetX, 0.05, targetZ);
          currentStartX = targetX;
          currentStartZ = targetZ;

          if (isCapture) sound.playCapture();
          else sound.playMove();

          // Remove the piece captured in this hop if applicable
          if (capturedPositions && capturedPositions[currentWaypointIdx]) {
            const cap = capturedPositions[currentWaypointIdx];
            const capMesh = this.pieceMeshes[`${cap.r}_${cap.c}`];
            if (capMesh) {
              this.piecesGroup.remove(capMesh);
              delete this.pieceMeshes[`${cap.r}_${cap.c}`];
            }
          }

          currentWaypointIdx++;
          if (currentWaypointIdx < waypoints.length) {
            setTimeout(animateHop, 50);
          } else {
            animateHop();
          }
        }
      };

      requestAnimationFrame(loop);
    };

    animateHop();
  }

  /**
   * Highlight legal moves for the selected piece with solid clickable discs
   */
  showLegalMoveMarkers(moves) {
    this.clearMarkers();

    moves.forEach(m => {
      const sqSize = 1.0;
      const x = (m.to.c - 3.5) * sqSize;
      const z = (m.to.r - 3.5) * sqSize;

      // Solid clickable disc (catches all clicks inside the square)
      const discGeo = new THREE.CircleGeometry(0.42, 32);
      const discMat = new THREE.MeshBasicMaterial({
        color: m.isCapture ? 0xf43f5e : 0x10b981,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: m.isCapture ? 0.6 : 0.5
      });
      const disc = new THREE.Mesh(discGeo, discMat);
      disc.rotation.x = -Math.PI / 2;
      disc.position.set(x, 0.06, z);

      // Accent border ring
      const ringGeo = new THREE.RingGeometry(0.38, 0.44, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: m.isCapture ? 0xff2d55 : 0x34d399,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = 0.001;
      disc.add(ring);

      disc.userData = { r: m.to.r, c: m.to.c, isMarker: true, move: m };
      this.markersGroup.add(disc);
    });
  }

  clearMarkers() {
    while (this.markersGroup.children.length > 0) {
      this.markersGroup.remove(this.markersGroup.children[0]);
    }
  }

  // =========================================================================
  // INTERACTION: Raycasting Click & Camera Orbit
  // =========================================================================

  bindEvents() {
    const el = this.renderer.domElement;

    el.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('pointerup', (e) => this.onPointerUp(e));
    window.addEventListener('pointercancel', (e) => this.onPointerUp(e));

    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.spherical.radius = Math.max(7.5, Math.min(18.0, this.spherical.radius + e.deltaY * 0.008));
      this.updateCameraPosition();
    }, { passive: false });

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    if (width < 600) {
      this.spherical.radius = 13.5;
    } else {
      this.spherical.radius = 12.0;
    }
    this.updateCameraPosition();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  onPointerDown(e) {
    this.isPointerDown = true;
    this.pointerStart = { x: e.clientX, y: e.clientY };

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Check hit on markers, pieces or board squares
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // 1. First priority: Check clicked destination marker (solid disc)
    const markerHits = this.raycaster.intersectObjects(this.markersGroup.children, true);
    if (markerHits.length > 0) {
      let topMarker = markerHits[0].object;
      while (topMarker.parent && !topMarker.userData.isMarker) {
        topMarker = topMarker.parent;
      }
      if (topMarker && topMarker.userData.isMarker && this.onSquareClicked) {
        this.onSquareClicked(topMarker.userData.r, topMarker.userData.c, topMarker.userData.move);
        this.isOrbiting = false;
        return;
      }
    }

    // 2. Second priority: Check piece clicks
    const pieceHits = this.raycaster.intersectObjects(this.piecesGroup.children, true);
    if (pieceHits.length > 0) {
      let topObj = pieceHits[0].object;
      while (topObj.parent && !topObj.userData.isPiece) {
        topObj = topObj.parent;
      }
      if (topObj && topObj.userData.isPiece) {
        if (this.onSquareClicked) {
          this.onSquareClicked(topObj.userData.r, topObj.userData.c, null);
        }
        this.isOrbiting = false;
        return;
      }
    }

    // 3. Third priority: Check if clicked on a playable square that has a legal marker
    const squareHits = this.raycaster.intersectObjects(this.squareMeshes);
    if (squareHits.length > 0) {
      const sq = squareHits[0].object;
      if (sq.userData && sq.userData.isPlayable) {
        const matchedMarker = this.markersGroup.children.find(
          m => m.userData.r === sq.userData.r && m.userData.c === sq.userData.c
        );
        if (matchedMarker && this.onSquareClicked) {
          this.onSquareClicked(sq.userData.r, sq.userData.c, matchedMarker.userData.move);
          this.isOrbiting = false;
          return;
        }
      }
    }

    // 4. Otherwise: Orbit camera
    this.isOrbiting = true;
  }

  onPointerMove(e) {
    if (!this.isPointerDown || !this.isOrbiting || this.isTopDown) return;

    const dx = e.clientX - this.pointerStart.x;
    const dy = e.clientY - this.pointerStart.y;
    this.pointerStart = { x: e.clientX, y: e.clientY };

    const speed = 0.007;
    this.spherical.theta -= dx * speed;
    this.spherical.phi -= dy * speed;
    this.updateCameraPosition();
  }

  onPointerUp() {
    this.isPointerDown = false;
    this.isOrbiting = false;
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }
}
