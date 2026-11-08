# 🧊 Manual del Usuario & Guía de Competición — Cubo de Rubik 3D
### Club del Ingenio · Lógica Espacial, Speedcubing Oficial WCA & Escuela de Resolución

Bienvenido a la aplicación oficial del **Cubo de Rubik 3D** de **Club del Ingenio**. Este manual describe exhaustivamente el funcionamiento de la aplicación, el motor gráfico y físico tridimensional, los controles ergonómicos adaptados tanto a dispositivos móviles (smartphones y tablets) como a ordenadores de escritorio, la notación internacional WCA, el cronómetro de speedcubing y la escuela de resolución paso a paso.

---

## 📑 Índice de Contenidos

1. [Visión General & Filosofía de Diseño](#1-visión-general--filosofía-de-diseño)
2. [Controles y Manejo en Dispositivos Móviles (Smartphones y Tablets)](#2-controles-y-manejo-en-dispositivos-móviles-smartphones-y-tablets)
   - [A. Blindaje Anti-Scroll y Estabilidad de Pantalla](#a-blindaje-anti-scroll-y-estabilidad-de-pantalla)
   - [B. Selector de Modo Táctil (Rotar Cubo vs. Girar Caras)](#b-selector-de-modo-táctil-rotar-cubo-vs-girar-caras)
   - [C. Controles de Ángulo y Rotación Rápida (90°)](#c-controles-de-ángulo-y-rotación-rápida-90)
   - [D. Gestos Multi-Touch (2 Dedos y Zoom por Pellizco)](#d-gestos-multi-touch-2-dedos-y-zoom-por-pellizco)
   - [E. Botonera Táctil WCA Ergonómica](#e-botonera-táctil-wca-ergonómica)
3. [Controles y Manejo en Ordenador (Ratón y Teclado)](#3-controles-y-manejo-en-ordenador-ratón-y-teclado)
4. [Los 4 Modos de Interacción](#4-los-4-modos-de-interacción)
   - [Modo 1: Modo Libre (Práctica y Exploración)](#modo-1-modo-libre-práctica-y-exploración)
   - [Modo 2: Speedcubing WCA (Competición Oficial con Inspección)](#modo-2-speedcubing-wca-competición-oficial-con-inspección)
   - [Modo 3: Escuela del Cubo (Tutor Paso a Paso)](#modo-3-escuela-del-cubo-tutor-paso-a-paso)
   - [Modo 4: Patrones Artísticos](#modo-4-patrones-artísticos)
5. [Notación Oficial WCA (World Cube Association)](#5-notación-oficial-wca-world-cube-association)
6. [Métricas en Tiempo Real y Auditoría de Movimientos](#6-métricas-en-tiempo-real-y-auditoría-de-movimientos)
7. [Internacionalización Multilingüe (9 Idiomas)](#7-internacionalización-multilingüe-9-idiomas)
8. [Arquitectura Técnica y Motor 3D](#8-arquitectura-técnica-y-motor-3d)

---

## 1. Visión General & Filosofía de Diseño

El Cubo de Rubik 3D de Club del Ingenio ha sido desarrollado con un estándar estético **Dark Luxury** (fondos obsidiana profunda, acentos dorados y cian luminiscente) y un motor tridimensional de alta precisión basado en **Three.js**.

A diferencia de los simuladores convencionales, incorpora:
* **Física de rotación suave con cubic ease-out**: los giros de capas se ejecutan con transiciones visuales realistas y chasquido mecánico sonoro.
* **Geometría con biselado táctil**: cada pieza individual (*cubie*) está separada por un borde milimétrico que facilita la identificación de caras y el guiado visual.
* **Control de estado determinista**: un modelo lógico matricial interno sincronizado en todo momento con la representación gráfica tridimensional.

---

## 2. Controles y Manejo en Dispositivos Móviles (Smartphones y Tablets)

Jugar con un cubo de Rubik tridimensional en una pantalla táctil pequeña presenta retos ergonómicos particulares: la necesidad de rotar el cubo entero para ver todas las caras en 360° sin descolocar piezas accidentalmente, y la necesidad de girar capas individuales sin que la pantalla de la página web se desplace.

La aplicación incorpora una suite completa de optimizaciones móviles:

```
┌────────────────────────────────────────────────────────┐
│               [ 🔄 Rotar Cubo ]  [ 🧩 Girar Caras ]     │ <── Selector Táctil
├────────────────────────────────────────────────────────┤
│                                                        │
│                                                        │
│                    CUBO 3D                             │
│                  INTERACTIVO                           │
│                                                        │
│                                                        │
├────────────────────────────────────────────────────────┤
│     [ ↺ 90° ]  [ ⬆ ]  [ ⟲ Centrar ]  [ ⬇ ]  [ 90° ↻ ]  │ <── Orientación Rápida
└────────────────────────────────────────────────────────┘
```

### A. Blindaje Anti-Scroll y Estabilidad de Pantalla
El lienzo de juego cuenta con aislamiento táctil estricto (`touch-action: none !important; overscroll-behavior: none !important;` y captura de puntero con `e.preventDefault()`). 

* **Efecto práctico**: Al apoyar el dedo o deslizar sobre el cubo o su entorno, **la pantalla móvil permanece fija e inmóvil como una roca**, eliminando por completo los molestos desplazamientos verticales, saltos de página o el refresco involuntario (*pull-to-refresh*).

### B. Selector de Modo Táctil (Rotar Cubo vs. Girar Caras)
En la parte superior del visor 3D se encuentra un interruptor flotante con dos modos claramente diferenciados:

1. **`[ 🔄 Rotar Cubo ]` (Modo Inspección / Vista General - Activo por Defecto en Móvil):**
   * Deslizar con **1 dedo en cualquier punto de la pantalla** (incluso directamente sobre las piezas del cubo) gira la cámara esférica en 360° con total fluidez.
   * Permite examinar la cara trasera, la cara inferior o buscar colores concretos con total tranquilidad, **sin riesgo de mover ninguna cara por error**.
2. **`[ 🧩 Girar Caras ]` (Modo Resolución Táctil):**
   * Al pulsar sobre una pieza del cubo y arrastrar el dedo en una dirección, el sistema proyecta vectorialmente el gesto y **hace girar esa capa concreta** con precisión milimétrica.
   * Si tocas en el fondo oscuro fuera del cubo, sigue permitiendo orbitar la vista.

### C. Controles de Ángulo y Rotación Rápida (90°)
En la parte inferior del visor se sitúa una pastilla de controles directos para operar el cubo cómodamente con el pulgar:
* **`↺ 90°`**: Rota la vista 90 grados hacia la izquierda de forma instantánea y suave.
* **`90° ↻`**: Rota la vista 90 grados hacia la derecha.
* **`⬆`**: Inclina la cámara hacia arriba para observar la cara superior (*Up*).
* **`⬇`**: Inclina la cámara hacia abajo para observar la cara inferior (*Down*).
* **`⟲ Centrar`**: Restablece la vista canónica isométrica original en perspectiva limpia.

### D. Gestos Multi-Touch (2 Dedos y Zoom por Pellizco)
En cualquier momento y sin importar qué modo esté activo:
* **Deslizar con 2 dedos simultáneos**: Rota la vista del cubo libremente por el espacio tridimensional.
* **Pellizcar (Pinch In / Pinch Out)**: Acerca o aleja el cubo (zoom suave continuo).

### E. Botonera Táctil WCA Ergonómica
Debajo del cubo se ofrece una botonera con todas las caras oficiales WCA (**`U, U', D, D', L, L', R, R', F, F', B, B'`**). 
* Los botones cuentan con un tamaño optimizado para el pulgar (área táctil mínima de 38x36 px).
* Cada pulsación genera una confirmación háptica (vibración física leve de 10-14 ms en dispositivos compatibles) y sonido analógico de giro.

---

## 3. Controles y Manejo en Ordenador (Ratón y Teclado)

Para usuarios de sobremesa o portátiles, la interacción combina ratón de precisión y atajos de teclado estándar:

### Manejo con Ratón
* **Clic Izquierdo + Arrastre sobre pieza**: Gira la capa correspondiente en la dirección del arrastre.
* **Clic Derecho + Arrastre** (o Clic Izquierdo sobre el fondo): Rota la cámara orbital 3D.
* **Rueda de desplazamiento (Scroll)**: Zoom dinámico (acercar / alejar el cubo).

### Atajos de Teclado
* **Giros de Caras (Sentido Horario)**:
  * `U`: Capa Superior (*Up*)
  * `D`: Capa Inferior (*Down*)
  * `L`: Capa Izquierda (*Left*)
  * `R`: Capa Derecha (*Right*)
  * `F`: Capa Frontal (*Front*)
  * `B`: Capa Trasera (*Back*)
* **Giros en Sentido Antihorario (Prima `'`)**:
  * Mantén pulsada la tecla **`Mayús` (Shift)** mientras pulsas la letra de la cara (por ejemplo, `Mayús + R` ejecuta `R'`).
* **Cronómetro Speedcubing**:
  * **Barra Espaciadora**: Mantén pulsada para armar el cronómetro (se iluminará en rojo y pasará a verde); suelta para arrancar a resolver. Vuelve a pulsar cualquier tecla para detenerlo al terminar el último giro.
* **Historial**:
  * **`Ctrl + Z`**: Deshacer el último movimiento ejecutado.

---

## 4. Los 4 Modos de Interacción

La barra superior permite alternar instantáneamente entre los 4 modos de juego:

### Modo 1: Modo Libre (Práctica y Exploración)
* Ideal para practicar movimientos, experimentar con algoritmos o resolver el cubo a tu propio ritmo.
* Muestra el contador de giros totales y la velocidad en tiempo real de giros por segundo (TPS).
* Ofrece las métricas de **Mejor Tiempo Personal (PB)** y **Media de 5 (Ao5)**.

### Modo 2: Speedcubing WCA (Competición Oficial con Inspección)
* Emula fielmente las condiciones de una competición reglamentaria de la **WCA (World Cube Association)**.
* **Fase de Preparación**: Mantén pulsada la barra espaciadora en PC o toca y mantén el área del cronómetro en móvil.
* El cronómetro se ilumina en **rojo** (cargando) y cambia a **verde esmeralda** tras 0.5 segundos (listo).
* Al soltar, el cronómetro arranca a contar con precisión de milésimas de segundo (`00:00.000`).
* En cuanto finalices el último giro que resuelva el cubo por completo, el cronómetro se detiene automáticamente y registra la marca.

### Modo 3: Escuela del Cubo (Tutor Paso a Paso)
* Guía interactiva pedagógica para aprender a resolver el cubo desde cero utilizando el método clásico por capas (**Fridrich / CFOP simplificado**):
  1. **Paso 1: Cruz Blanca** (Alineación de aristas blancas con los centros laterales).
  2. **Paso 2: Esquinas de la Primera Capa** (Algoritmo *Sexy Move*: `R U R' U'`).
  3. **Paso 3: Segunda Capa / Aristas Centrales**.
  4. **Paso 4: Cruz Amarilla Superior** (`F R U R' U' F'`).
  5. **Paso 5: Orientación de Aristas Amarillas**.
  6. **Paso 6: Permutación de Esquinas Amarillas**.
  7. **Paso 7: Orientación Final de Esquinas** (Resolución completa).
* Incluye el botón **`✨ Ejecutar Paso`** para ver la animación guiada a velocidad didáctica.

### Modo 4: Patrones Artísticos
* Catálogo de patrones geométricos y banderas icónicas para decorar el cubo:
  * **Tablero de Ajedrez (*Checkerboard*)**: `M2 E2 S2` o `R2 L2 U2 D2 F2 B2`.
  * **Puntos Centrales Opuestos (*Cube in a Cube*)**.
  * **Cruz Doble y Anillos Concéntricos**.
* Con un solo clic, el cubo ejecuta la coreografía de movimientos para formar la figura seleccionada.

---

## 5. Notación Oficial WCA (World Cube Association)

El sistema emplea el código internacional oficial de movimientos en 3D:

| Notación | Nombre | Cara | Giro |
| :---: | :--- | :--- | :--- |
| **U** | Up | Capa Superior | 90° horario (visto desde arriba) |
| **U'** | Up Prime | Capa Superior | 90° antihorario |
| **U2** | Up Double | Capa Superior | 180° (doble giro) |
| **D / D'** | Down | Capa Inferior | Giro horario / antihorario |
| **R / R'** | Right | Capa Derecha | Giro horario / antihorario |
| **L / L'** | Left | Capa Izquierda | Giro horario / antihorario |
| **F / F'** | Front | Capa Frontal (verde) | Giro horario / antihorario |
| **B / B'** | Back | Capa Trasera (azul) | Giro horario / antihorario |

---

## 6. Métricas en Tiempo Real y Auditoría de Movimientos

* **Contador de Movimientos**: Registra cada rotación de capa unitaria ejecutada (métrica HTM - *Half Turn Metric*).
* **Giros por Segundo (TPS)**: Mide la cadencia y velocidad de manos del jugador en una ventana deslizante.
* **Scramble WCA Determinista**: Genera secuencias de mezcla oficiales de 20 a 25 movimientos con filtrado anti-redundancia (evita giros consecutivos de la misma cara o cancelaciones triviales como `R R'`).

---

## 7. Internacionalización Multilingüe (9 Idiomas)

Cumpliendo los estándares de calidad de **Club del Ingenio**, la aplicación y todos sus textos, ayudas, botones y nombres de capas están completamente traducidos a **9 idiomas**:
* 🇪🇸 **Español**
* 🇬🇧 **English**
* 🏛️ **Català**
* 🦇 **Valencià**
* 🌊 **Galego**
* 🏔️ **Euskara**
* 🇫🇷 **Français**
* 🇩🇪 **Deutsch**
* 🇯🇵 **日本語 (Japonés)**
* 🇨🇳 **中文 (Chino)**
* 🇵🇹 **Português**

El cambio de idioma se realiza al instante mediante el botón **🌐 Idioma** en la cabecera, guardando la preferencia del usuario en el navegador.

---

## 8. Arquitectura Técnica y Motor 3D

Para desarrolladores y mantenimiento de la plataforma:
* **`cubo-rubik/index.html`**: Estructura semántica, cabecera de prestigio, viewport 3D y modales.
* **`cubo-rubik/css/style.css`**: Identidad visual *Dark Luxury*, maquetación CSS Grid/Flexbox responsiva, directivas de aislamiento táctil `touch-action: none`.
* **`cubo-rubik/js/rubik-renderer.js`**: Motor Three.js, raycasting sobre piezas, proyección de vectores pantalla a giros WCA, controles esféricos de cámara y soporte para gestos táctiles multi-touch.
* **`cubo-rubik/js/rubik-model.js`**: Estado lógico del cubo (26 cubies con orientación y posición en un grafo 3x3x3).
* **`cubo-rubik/js/rubik-solver.js`**: Solucionador algorítmico y generador de patrones geométricos.
* **`cubo-rubik/js/rubik-timer.js`**: Motor de cronometraje WCA de alta precisión con fases de inspección y retención.
* **`cubo-rubik/js/sound.js`**: Sintetizador de audio Web Audio API para chasquidos mecánicos sin necesidad de cargar ficheros externos pesados.
* **`cubo-rubik/js/i18n.js`**: Motor de internacionalización reactivo en 9 lenguas.

---

*Manual oficial aprobado para Club del Ingenio.*  
*Director Técnico & Software Architect: Guillermo Tudela Soler / Conectividad y Comunicaciones, S.L.*

