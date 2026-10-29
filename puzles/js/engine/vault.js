/**
 * Puzles del Club — Bóveda de Imágenes ("Mis Puzles" & Galería Oficial)
 * Gestiona la biblioteca de panorámicas oficiales de alta resolución y
 * permite a los usuarios importar sus propias fotos desde PC o móvil
 * (subida, arrastrar/soltar, portapapeles o cámara) persistidas en cliente.
 */

class PuzzleVault {
  constructor() {
    this.STORAGE_KEY = 'puzles_user_vault_v1';
    this.ACTIVE_IMAGE_KEY = 'puzles_active_image_id_v1';

    // Galería Oficial Predefinida (Panorámicas y Arte)
    this.PRESET_IMAGES = [
      {
        id: 'preset_riviera',
        title: 'Riviera Mediterránea',
        subtitle: 'Pueblo costero, acantilados y mar turquesa',
        category: 'costa',
        // Panorámica mediterránea estilizada generada en alta resolución
        type: 'preset',
        src: 'images/mediterranean_town.jpg',
        fallbackGenerator: 'drawRivieraArt'
      },
      {
        id: 'preset_alpes',
        title: 'Lago Alpino al Atardecer',
        subtitle: 'Reflejos cristalinos y cumbres nevadas',
        category: 'naturaleza',
        type: 'preset',
        src: 'images/alpine_sunset_lake.jpg',
        fallbackGenerator: 'drawAlpineArt'
      },
      {
        id: 'preset_venecia',
        title: 'Gran Canal de Venecia',
        subtitle: 'Góndolas, palacios y reflejos venecianos',
        category: 'ciudades',
        type: 'preset',
        src: 'images/venice_grand_canal.jpg',
        fallbackGenerator: 'drawVeniceArt'
      },
      {
        id: 'preset_cosmos',
        title: 'Nebulosa del Ingenio',
        subtitle: 'Polvo cósmico, estrellas y constelaciones doradas',
        category: 'arte',
        type: 'preset',
        src: 'images/cosmic_nebula.jpg',
        fallbackGenerator: 'drawCosmosArt'
      }
    ];

    this.userVault = this.loadUserVault();
  }

  loadUserVault() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error leyendo bóveda de usuario:', e);
      return [];
    }
  }

  saveUserVault() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.userVault));
    } catch (e) {
      console.warn('Almacenamiento lleno al guardar en bóveda:', e);
    }
  }

  getAllImages() {
    return [...this.PRESET_IMAGES, ...this.userVault];
  }

  getImageById(id) {
    return this.getAllImages().find(img => img.id === id) || this.PRESET_IMAGES[0];
  }

  getActiveImageId() {
    return localStorage.getItem(this.ACTIVE_IMAGE_KEY) || 'preset_riviera';
  }

  setActiveImageId(id) {
    localStorage.setItem(this.ACTIVE_IMAGE_KEY, id);
  }

  /**
   * Procesa y añade una imagen de usuario (desde archivo, drop, paste o cámara)
   * Redimensiona para fluidez y genera miniatura para la biblioteca
   */
  async addUserImage(fileOrBlob, customTitle = null) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
            // Optimizar tamaño panorámico máximo (1920x1080 manteniendo relación de aspecto)
            const maxW = 1600;
            const maxH = 900;
            let targetW = img.width;
            let targetH = img.height;

            if (targetW > maxW || targetH > maxH) {
              const ratio = Math.min(maxW / targetW, maxH / targetH);
              targetW = Math.round(targetW * ratio);
              targetH = Math.round(targetH * ratio);
            }

            const canvas = document.createElement('canvas');
            canvas.width = targetW;
            canvas.height = targetH;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, targetW, targetH);
            const fullDataUrl = canvas.toDataURL('image/jpeg', 0.85);

            // Generar miniatura cuadrada/panorámica compacta para la lista (240x135)
            const thumbCanvas = document.createElement('canvas');
            thumbCanvas.width = 240;
            thumbCanvas.height = 135;
            const thumbCtx = thumbCanvas.getContext('2d');
            thumbCtx.drawImage(canvas, 0, 0, 240, 135);
            const thumbDataUrl = thumbCanvas.toDataURL('image/jpeg', 0.7);

            const newEntry = {
              id: 'user_' + Date.now(),
              title: customTitle || 'Mi Puzle ' + (this.userVault.length + 1),
              subtitle: `${targetW} × ${targetH} px · Imagen Personal`,
              category: 'usuario',
              type: 'user',
              src: fullDataUrl,
              thumb: thumbDataUrl,
              createdAt: new Date().toLocaleDateString()
            };

            // Máximo 10 puzles de usuario para no saturar memoria local
            if (this.userVault.length >= 10) {
              this.userVault.pop();
            }

            this.userVault.unshift(newEntry);
            this.saveUserVault();
            this.setActiveImageId(newEntry.id);
            resolve(newEntry);
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = () => reject(new Error('No se pudo cargar la imagen'));
        img.src = e.target.result;
      };

      reader.onerror = () => reject(new Error('Error de lectura de archivo'));
      reader.readAsDataURL(fileOrBlob);
    });
  }

  deleteUserImage(id) {
    this.userVault = this.userVault.filter(img => img.id !== id);
    this.saveUserVault();
    if (this.getActiveImageId() === id) {
      this.setActiveImageId(this.PRESET_IMAGES[0].id);
    }
  }

  /**
   * Carga la imagen activa como HTMLImageElement lista para dibujar
   */
  async loadActiveImage() {
    const item = this.getImageById(this.getActiveImageId());
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => resolve({ img, item });

      img.onerror = () => {
        // Si la imagen física no carga o no existe, generamos un tapiz de alta resolución procedimentalmente
        console.warn('Usando generador procedimental de respaldo para:', item.id);
        const proceduralCanvas = this.generateProceduralArt(item.fallbackGenerator || 'drawRivieraArt');
        const fallbackImg = new Image();
        fallbackImg.onload = () => resolve({ img: fallbackImg, item });
        fallbackImg.src = proceduralCanvas.toDataURL('image/jpeg', 0.9);
      };

      img.src = item.src || '';
      if (!item.src) {
        // Disparar fallback directamente
        img.onerror();
      }
    });
  }

  // Generadores procedimentales de arte de alta definición de respaldo
  generateProceduralArt(type) {
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    if (type === 'drawAlpineArt') {
      this.drawAlpineScene(ctx, 1600, 700);
    } else if (type === 'drawVeniceArt') {
      this.drawVeniceScene(ctx, 1600, 700);
    } else if (type === 'drawCosmosArt') {
      this.drawCosmosScene(ctx, 1600, 700);
    } else {
      this.drawRivieraScene(ctx, 1600, 700);
    }

    return canvas;
  }

  // Riviera Mediterránea procedimental artística
  drawRivieraScene(ctx, w, h) {
    // Cielo degradado mediterráneo
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
    skyGrad.addColorStop(0, '#38bdf8');
    skyGrad.addColorStop(0.7, '#93c5fd');
    skyGrad.addColorStop(1, '#fed7aa');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.5);

    // Sol dorado
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(w * 0.75, h * 0.22, 60, 0, Math.PI * 2);
    ctx.fill();

    // Mar azul profundo con degradado turquesa
    const seaGrad = ctx.createLinearGradient(0, h * 0.45, 0, h);
    seaGrad.addColorStop(0, '#0284c7');
    seaGrad.addColorStop(0.4, '#0ea5e9');
    seaGrad.addColorStop(1, '#0891b2');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, h * 0.45, w, h * 0.55);

    // Acantilados rocosos a la izquierda
    ctx.fillStyle = '#78716c';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.2);
    ctx.lineTo(w * 0.35, h * 0.5);
    ctx.lineTo(w * 0.2, h * 0.8);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Casas de colores pastel apiladas estilo Positano / Riviera
    const houseColors = ['#f87171', '#fbbf24', '#f472b6', '#fed7aa', '#38bdf8', '#fb923c'];
    for (let i = 0; i < 28; i++) {
      const hx = 30 + (i % 7) * 45 + Math.sin(i) * 20;
      const hy = h * 0.25 + Math.floor(i / 7) * 40;
      const hw = 36;
      const hh = 42;

      ctx.fillStyle = houseColors[i % houseColors.length];
      ctx.fillRect(hx, hy, hw, hh);

      // Tejado terracota
      ctx.fillStyle = '#b91c1c';
      ctx.beginPath();
      ctx.moveTo(hx - 4, hy);
      ctx.lineTo(hx + hw / 2, hy - 14);
      ctx.lineTo(hx + hw + 4, hy);
      ctx.closePath();
      ctx.fill();

      // Ventanitas
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(hx + 8, hy + 10, 8, 12);
      ctx.fillRect(hx + 20, hy + 10, 8, 12);
    }

    // Barcos de vela en el mar
    for (let b = 0; b < 6; b++) {
      const bx = w * 0.45 + b * 160 + (b % 2) * 50;
      const by = h * 0.55 + (b % 3) * 60;
      // Casco
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(bx - 20, by);
      ctx.lineTo(bx + 20, by);
      ctx.lineTo(bx + 14, by + 8);
      ctx.lineTo(bx - 14, by + 8);
      ctx.closePath();
      ctx.fill();
      // Vela blanca
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(bx, by - 26);
      ctx.lineTo(bx + 16, by);
      ctx.lineTo(bx, by);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Lago alpino procedimental
  drawAlpineScene(ctx, w, h) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.5);
    sky.addColorStop(0, '#f97316');
    sky.addColorStop(0.5, '#f43f5e');
    sky.addColorStop(1, '#a855f7');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h * 0.5);

    // Montañas nevadas
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.45);
    ctx.lineTo(w * 0.25, h * 0.15);
    ctx.lineTo(w * 0.45, h * 0.35);
    ctx.lineTo(w * 0.65, h * 0.12);
    ctx.lineTo(w * 0.85, h * 0.38);
    ctx.lineTo(w, h * 0.25);
    ctx.lineTo(w, h * 0.5);
    ctx.lineTo(0, h * 0.5);
    ctx.closePath();
    ctx.fill();

    // Picos de nieve blanca
    ctx.fillStyle = '#f8fafc';
    [
      { x: w * 0.25, y: h * 0.15, s: 70 },
      { x: w * 0.65, y: h * 0.12, s: 80 },
      { x: w, y: h * 0.25, s: 60 }
    ].forEach(p => {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.s * 0.5, p.y + p.s * 0.6);
      ctx.lineTo(p.x + p.s * 0.5, p.y + p.s * 0.6);
      ctx.closePath();
      ctx.fill();
    });

    // Lago turquesa reflejando el atardecer
    const lake = ctx.createLinearGradient(0, h * 0.5, 0, h);
    lake.addColorStop(0, '#0284c7');
    lake.addColorStop(0.5, '#0f766e');
    lake.addColorStop(1, '#115e59');
    ctx.fillStyle = lake;
    ctx.fillRect(0, h * 0.5, w, h * 0.5);

    // Bosque de pinos verdes
    ctx.fillStyle = '#064e3b';
    for (let x = 0; x < w; x += 15) {
      const ph = 35 + Math.sin(x * 0.05) * 15;
      ctx.beginPath();
      ctx.moveTo(x, h * 0.52);
      ctx.lineTo(x + 7, h * 0.52 - ph);
      ctx.lineTo(x + 14, h * 0.52);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Gran Canal de Venecia
  drawVeniceScene(ctx, w, h) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.45);
    sky.addColorStop(0, '#1e1b4b');
    sky.addColorStop(0.6, '#312e81');
    sky.addColorStop(1, '#f59e0b');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h * 0.45);

    // Agua del canal
    const water = ctx.createLinearGradient(0, h * 0.45, 0, h);
    water.addColorStop(0, '#047857');
    water.addColorStop(0.5, '#065f46');
    water.addColorStop(1, '#064e3b');
    ctx.fillStyle = water;
    ctx.fillRect(0, h * 0.45, w, h * 0.55);

    // Fachadas de palacios venecianos a ambos lados
    ctx.fillStyle = '#b45309';
    ctx.fillRect(0, h * 0.2, w * 0.35, h * 0.4);
    ctx.fillStyle = '#92400e';
    ctx.fillRect(w * 0.65, h * 0.15, w * 0.35, h * 0.45);

    // Arcos góticos venecianos
    ctx.fillStyle = '#fef3c7';
    for (let c = 0; c < 5; c++) {
      ctx.beginPath();
      ctx.arc(30 + c * 40, h * 0.35, 12, Math.PI, 0);
      ctx.lineTo(42 + c * 40, h * 0.45);
      ctx.lineTo(18 + c * 40, h * 0.45);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Nebulosa del Ingenio
  drawCosmosScene(ctx, w, h) {
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, w, h);

    // Nubes de gas cósmico
    const grad1 = ctx.createRadialGradient(w * 0.3, h * 0.4, 20, w * 0.3, h * 0.4, 350);
    grad1.addColorStop(0, 'rgba(236, 72, 153, 0.4)');
    grad1.addColorStop(0.6, 'rgba(147, 51, 234, 0.2)');
    grad1.addColorStop(1, 'transparent');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, w, h);

    const grad2 = ctx.createRadialGradient(w * 0.7, h * 0.5, 30, w * 0.7, h * 0.5, 400);
    grad2.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
    grad2.addColorStop(0.7, 'rgba(245, 158, 11, 0.2)');
    grad2.addColorStop(1, 'transparent');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, w, h);

    // Estrellas titilantes
    for (let i = 0; i < 300; i++) {
      const sx = (i * 137.5) % w;
      const sy = (i * 93.3) % h;
      const sr = (i % 5 === 0) ? 2.5 : 1.2;
      ctx.fillStyle = (i % 3 === 0) ? '#fef08a' : ((i % 2 === 0) ? '#38bdf8' : '#ffffff');
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

window.PuzzleVault = PuzzleVault;
