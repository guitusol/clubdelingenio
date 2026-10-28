/**
 * 3D Rubik's Cube Renderer & Interactive Physics Engine
 * Powered by Three.js
 * Dark Luxury aesthetics, chamfered cubies, dynamic lighting,
 * and intuitive screen-space raycast drag controls.
 */

import { sound } from './sound.js';

export class RubikRenderer {
  constructor(canvasContainer, onMoveExecuted) {
    this.container = canvasContainer;
    this.onMoveExecuted = onMoveExecuted;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.cubeGroup = null;
    this.cubies = [];
    
    // Animation queue
    this.moveQueue = [];
    this.isAnimating = false;
    this.animationSpeed = 220; // ms per 90 deg turn

    // Interaction state
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.isPointerDown = false;
    this.pointerStart = { x: 0, y: 0 };
    this.dragTarget = null; // { cubie, faceNormal, startScreenPoint }
    
    // Camera orbit state
    this.isOrbiting = false;
    this.cameraDistance = 7.5;
    this.spherical = {
      radius: 7.5,
      theta: Math.PI / 4,      // Horizontal angle
      phi: Math.PI / 3         // Vertical angle
    };
    this.targetLookAt = new THREE.Vector3(0, 0, 0);

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    if (width < 600) {
      this.spherical.radius = 8.4;
    } else {
      this.spherical.radius = 7.5;
    }

    // 1. Scene setup
    this.scene = new THREE.Scene();

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.updateCameraPosition();

    // 3. Renderer setup with high visual quality
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

    // 4. Lighting setup (Dark Luxury atmosphere)
    this.setupLighting();

    // 5. Build 3D Rubik's Cube
    this.cubeGroup = new THREE.Group();
    this.scene.add(this.cubeGroup);
    this.buildCube();

    // 6. Event listeners
    this.bindEvents();

    // 7. Render loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupLighting() {
    // Soft ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(ambientLight);

    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xfff8ed, 1.2);
    keyLight.position.set(8, 12, 10);
    this.scene.add(keyLight);

    // Cool rim light (cyan luxury glow)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.7);
    rimLight.position.set(-10, -6, -8);
    this.scene.add(rimLight);

    // Gold subtle fill light
    const fillLight = new THREE.DirectionalLight(0xf59e0b, 0.4);
    fillLight.position.set(0, -10, 8);
    this.scene.add(fillLight);
  }

  updateCameraPosition() {
    this.spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.spherical.phi));
    this.camera.position.x = this.spherical.radius * Math.sin(this.spherical.phi) * Math.sin(this.spherical.theta);
    this.camera.position.y = this.spherical.radius * Math.cos(this.spherical.phi);
    this.camera.position.z = this.spherical.radius * Math.sin(this.spherical.phi) * Math.cos(this.spherical.theta);
    this.camera.lookAt(this.targetLookAt);
  }

  buildCube() {
    // Official WCA face colors:
    // Right (+X): Red, Left (-X): Orange
    // Up (+Y): White, Down (-Y): Yellow
    // Front (+Z): Green, Back (-Z): Blue
    const colors = {
      px: 0xc41e3a, // +X: Red
      nx: 0xff5800, // -X: Orange
      py: 0xf8fafc, // +Y: White
      ny: 0xffd500, // -Y: Yellow
      pz: 0x009b48, // +Z: Green
      nz: 0x0046ad, // -Z: Blue
      inner: 0x12141a // Obsidian body
    };

    const size = 0.94; // slightly smaller than 1.0 for gap / tactile border
    const geometry = new THREE.BoxGeometry(size, size, size);

    this.cubies = [];

    // Create materials generator for a piece at (x, y, z)
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue; // Skip core center

          // 6 materials for BoxGeometry: [+X, -X, +Y, -Y, +Z, -Z]
          const mats = [
            this.createStickerMaterial(x === 1 ? colors.px : colors.inner),
            this.createStickerMaterial(x === -1 ? colors.nx : colors.inner),
            this.createStickerMaterial(y === 1 ? colors.py : colors.inner),
            this.createStickerMaterial(y === -1 ? colors.ny : colors.inner),
            this.createStickerMaterial(z === 1 ? colors.pz : colors.inner),
            this.createStickerMaterial(z === -1 ? colors.nz : colors.inner)
          ];

          const cubie = new THREE.Mesh(geometry, mats);
          cubie.position.set(x, y, z);
          cubie.userData = {
            initialPos: new THREE.Vector3(x, y, z),
            currentPos: new THREE.Vector3(x, y, z),
            isCubie: true
          };

          this.cubeGroup.add(cubie);
          this.cubies.push(cubie);
        }
      }
    }
  }

  createStickerMaterial(colorHex) {
    const isInner = colorHex === 0x12141a;
    return new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness: isInner ? 0.8 : 0.25,
      metalness: isInner ? 0.05 : 0.12,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1
    });
  }

  /**
   * Queue a standard WCA move (e.g. "R", "U'", "F2")
   */
  queueMove(move, speed = null) {
    this.moveQueue.push({ move, speed });
    this.processQueue();
  }

  /**
   * Queue multiple moves in sequence (e.g. Scramble or Solver)
   */
  queueMoves(movesArray, speed = 80) {
    movesArray.forEach(m => this.moveQueue.push({ move: m, speed }));
    this.processQueue();
  }

  processQueue() {
    if (this.isAnimating || this.moveQueue.length === 0) return;

    const item = this.moveQueue.shift();
    const duration = item.speed || this.animationSpeed;
    this.executeMove(item.move, duration, () => {
      if (this.onMoveExecuted) {
        this.onMoveExecuted(item.move);
      }
      this.processQueue();
    });
  }

  /**
   * Execute single WCA move animation on 3D pieces
   */
  executeMove(move, duration, onComplete) {
    const face = move[0].toUpperCase();
    const modifier = move.slice(1);
    const isDouble = modifier === '2';
    const isCounter = modifier.includes("'");

    // Mapping face to rotation axis, layer coordinate and direction
    // Look along the positive axis:
    // U (+Y): Clockwise looks like rotation angle -PI/2
    // D (-Y): Clockwise looks like rotation angle +PI/2
    // R (+X): Clockwise looks like rotation angle -PI/2
    // L (-X): Clockwise looks like rotation angle +PI/2
    // F (+Z): Clockwise looks like rotation angle -PI/2
    // B (-Z): Clockwise looks like rotation angle +PI/2
    let axis = 'y';
    let sliceCoord = 1;
    let baseAngle = -Math.PI / 2;

    switch (face) {
      case 'U':
        axis = 'y'; sliceCoord = 1; baseAngle = -Math.PI / 2; break;
      case 'D':
        axis = 'y'; sliceCoord = -1; baseAngle = Math.PI / 2; break;
      case 'R':
        axis = 'x'; sliceCoord = 1; baseAngle = -Math.PI / 2; break;
      case 'L':
        axis = 'x'; sliceCoord = -1; baseAngle = Math.PI / 2; break;
      case 'F':
        axis = 'z'; sliceCoord = 1; baseAngle = -Math.PI / 2; break;
      case 'B':
        axis = 'z'; sliceCoord = -1; baseAngle = Math.PI / 2; break;
    }

    if (isCounter) baseAngle = -baseAngle;
    if (isDouble) baseAngle *= 2;

    this.animateLayerRotation(axis, sliceCoord, baseAngle, duration, onComplete);
  }

  animateLayerRotation(axis, sliceCoord, targetAngle, duration, onComplete) {
    this.isAnimating = true;

    // Filter cubies that belong to this layer based on world position
    const activeCubies = [];
    this.cubies.forEach(cubie => {
      const pos = new THREE.Vector3();
      cubie.getWorldPosition(pos);
      if (Math.abs(Math.round(pos[axis]) - sliceCoord) < 0.2) {
        activeCubies.push(cubie);
      }
    });

    // Create temporary pivot at scene origin
    const pivot = new THREE.Group();
    this.scene.add(pivot);

    activeCubies.forEach(cubie => {
      pivot.attach(cubie);
    });

    const startTime = performance.now();
    const animateTurn = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      pivot.rotation[axis] = targetAngle * ease;

      if (progress < 1) {
        requestAnimationFrame(animateTurn);
      } else {
        pivot.rotation[axis] = targetAngle;
        pivot.updateMatrixWorld(true);

        // Detach pieces back to main cube group and snap coordinates
        activeCubies.forEach(cubie => {
          this.cubeGroup.attach(cubie);
          // Snap position to exact integers
          cubie.position.x = Math.round(cubie.position.x);
          cubie.position.y = Math.round(cubie.position.y);
          cubie.position.z = Math.round(cubie.position.z);
          // Snap rotation to multiples of PI/2
          const euler = new THREE.Euler().setFromQuaternion(cubie.quaternion, 'XYZ');
          euler.x = Math.round(euler.x / (Math.PI / 2)) * (Math.PI / 2);
          euler.y = Math.round(euler.y / (Math.PI / 2)) * (Math.PI / 2);
          euler.z = Math.round(euler.z / (Math.PI / 2)) * (Math.PI / 2);
          cubie.quaternion.setFromEuler(euler);
        });

        this.scene.remove(pivot);
        this.isAnimating = false;

        // Play tactile sound
        if (duration >= 120) {
          sound.playTurn();
        } else {
          sound.playScrambleTick();
        }

        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(animateTurn);
  }

  /**
   * Reset cube to solved 3D state
   */
  resetVisual() {
    this.moveQueue = [];
    this.isAnimating = false;
    while (this.cubeGroup.children.length > 0) {
      this.cubeGroup.remove(this.cubeGroup.children[0]);
    }
    this.buildCube();
  }

  // =========================================================================
  // INTERACTION: Raycast Drag & Orbit Controls
  // =========================================================================

  bindEvents() {
    const el = this.renderer.domElement;

    // Mouse / Touch start
    el.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('pointerup', (e) => this.onPointerUp(e));
    window.addEventListener('pointercancel', (e) => this.onPointerUp(e));

    // Mouse wheel zoom
    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.spherical.radius = Math.max(5.0, Math.min(13.0, this.spherical.radius + e.deltaY * 0.005));
      this.updateCameraPosition();
    }, { passive: false });

    // Window resize
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    if (width < 600) {
      this.spherical.radius = 8.4;
    } else {
      this.spherical.radius = 7.5;
    }
    this.updateCameraPosition();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  onPointerDown(e) {
    if (this.isAnimating) return;

    this.isPointerDown = true;
    this.pointerStart = { x: e.clientX, y: e.clientY };

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.cubies, false);

    if (intersects.length > 0 && e.button !== 2) {
      // User clicked directly on a cubie face!
      const hit = intersects[0];
      // Normal vector in world coordinates
      const worldNormal = hit.face.normal.clone().applyQuaternion(hit.object.getWorldQuaternion(new THREE.Quaternion())).round();
      
      this.dragTarget = {
        cubie: hit.object,
        faceNormal: worldNormal,
        startPoint: { x: e.clientX, y: e.clientY }
      };
      this.isOrbiting = false;
    } else {
      // Clicked background or right-clicked: Orbit camera
      this.dragTarget = null;
      this.isOrbiting = true;
    }
  }

  onPointerMove(e) {
    if (!this.isPointerDown) return;

    const dx = e.clientX - this.pointerStart.x;
    const dy = e.clientY - this.pointerStart.y;
    const dist = Math.hypot(dx, dy);

    // 1. If currently dragging a cube face
    if (this.dragTarget) {
      if (dist > 18) { // Drag threshold crossed
        this.resolveDragMove(this.dragTarget, dx, dy);
        this.dragTarget = null;
        this.isPointerDown = false;
      }
      return;
    }

    // 2. Otherwise orbit camera
    if (this.isOrbiting) {
      const deltaX = e.clientX - this.pointerStart.x;
      const deltaY = e.clientY - this.pointerStart.y;
      this.pointerStart = { x: e.clientX, y: e.clientY };

      const rotateSpeed = 0.007;
      this.spherical.theta -= deltaX * rotateSpeed;
      this.spherical.phi -= deltaY * rotateSpeed;
      this.updateCameraPosition();
    }
  }

  onPointerUp() {
    this.isPointerDown = false;
    this.isOrbiting = false;
    this.dragTarget = null;
  }

  /**
   * Resolve user 2D screen drag on a 3D cubie face into a WCA layer turn
   */
  resolveDragMove(target, screenDx, screenDy) {
    const { cubie, faceNormal } = target;
    const pos = new THREE.Vector3();
    cubie.getWorldPosition(pos);
    const roundedPos = pos.round();

    // Screen-space 2D drag vector (normalized)
    const dragVec = new THREE.Vector2(screenDx, -screenDy).normalize();

    // Determine the two candidate tangent axes for this face normal
    // E.g. Normal along Z => Tangents are X and Y
    const candidateAxes = [];
    if (Math.abs(faceNormal.x) > 0.5) candidateAxes.push('y', 'z');
    else if (Math.abs(faceNormal.y) > 0.5) candidateAxes.push('x', 'z');
    else if (Math.abs(faceNormal.z) > 0.5) candidateAxes.push('x', 'y');

    let bestMove = null;
    let maxDot = -Infinity;

    // For each candidate tangent axis, project + and - motion to screen space
    candidateAxes.forEach(tangentAxis => {
      const tangentDir = new THREE.Vector3();
      tangentDir[tangentAxis] = 1;

      // Project tangent vector to screen space
      const screenTangent = this.projectVectorToScreen(tangentDir, pos);
      const dot = dragVec.dot(screenTangent);

      if (Math.abs(dot) > maxDot) {
        maxDot = Math.abs(dot);
        // The rotation axis is normal x tangent
        const rotAxis = new THREE.Vector3().crossVectors(faceNormal, tangentDir).round();
        const sign = dot > 0 ? 1 : -1;
        bestMove = this.mapRotationToWCA(rotAxis, roundedPos, sign);
      }
    });

    if (bestMove) {
      this.queueMove(bestMove);
    }
  }

  projectVectorToScreen(vector, worldOrigin) {
    const p1 = worldOrigin.clone().project(this.camera);
    const p2 = worldOrigin.clone().add(vector).project(this.camera);
    return new THREE.Vector2(p2.x - p1.x, p2.y - p1.y).normalize();
  }

  /**
   * Convert rotation axis and piece position to standard WCA move
   */
  mapRotationToWCA(rotAxis, pos, sign) {
    // If rotAxis is along Y: Layers are U (y=1) or D (y=-1)
    if (Math.abs(rotAxis.y) > 0.5) {
      const sliceY = pos.y;
      if (sliceY === 1) return sign > 0 ? "U'" : "U";
      if (sliceY === -1) return sign > 0 ? "D" : "D'";
    }

    // If rotAxis is along X: Layers are R (x=1) or L (x=-1)
    if (Math.abs(rotAxis.x) > 0.5) {
      const sliceX = pos.x;
      if (sliceX === 1) return sign > 0 ? "R'" : "R";
      if (sliceX === -1) return sign > 0 ? "L" : "L'";
    }

    // If rotAxis is along Z: Layers are F (z=1) or B (z=-1)
    if (Math.abs(rotAxis.z) > 0.5) {
      const sliceZ = pos.z;
      if (sliceZ === 1) return sign > 0 ? "F'" : "F";
      if (sliceZ === -1) return sign > 0 ? "B" : "B'";
    }

    return null;
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }
}
