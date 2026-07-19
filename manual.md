# Manual de Construcción - WebFRIENDS

> **Objetivo**: Que puedas entender y modificar cada parte del código.

---

## Índice
1. [Estructura del index.html](#1-estructura)
2. [CSS: Capas y Componentes](#2-css)
3. [HTML: Vistas y Pop-ups](#3-html)
4. [JS: Lógica y Eventos](#4-js)
5. [Subsistemas clave](#5-subsistemas)

---

## 1. Estructura del index.html (842 líneas)

```
<head>       — Meta tags + CSP + 4 CDNs + Google Fonts
<style>      — ~350 líneas de CSS
<body>       — HTML de vistas, sidebar, pop-ups, widgets
<script>     — ~400 líneas de JS vanilla
```

---

## 2. CSS: Capas y Componentes

### 2.1 Variables y Reset
```css
:root { --pink:#ff1493; --cyan:#0ff; --lime:#cf0; --bg:#0a0a14; ... }
* { margin:0; padding:0; box-sizing:border-box; }
```

### 2.2 Fondo (3 capas)
- `body`: gradiente animado `bgShift` 20s (400% size)
- `#star-cnv`: Canvas 2D con 80 estrellas animadas (draw loop con requestAnimationFrame)
- `.checkerboard`: overlay con checkerboard + radial glows (position:fixed, z-index:-2)
- `#scanlines`: líneas CRT horizontales (opacidad 0.01)

### 2.3 Efectos decorativos
- `.sparkle`: 35 partículas brillantes (posiciones aleatorias, animación pulse 1.2-4.2s)
- `.tape-strip`: 5 tiras de cinta adhesiva scrapbook (rotación aleatoria)
- `@keyframes bgShift`: mueve el gradiente de fondo (0%→100%→0% en 20s)
- `@keyframes spark`: opacidad 0.1→1→0.1 con scale 1→3

### 2.4 Sidebar (#sidebar, 185px)
- `position:fixed; left:0; top:0; bottom:0`
- `transition: transform .3s ease` (para collapsible)
- `.sb-btn`: botones de navegación con hover translateX(3px)
- `.sb-btn.active`: gradiente rosa con glow
- `.sb-widget`: widgets interactivos (theme, music, emoji, note)
- `.sb-toggle`: botón en borde izquierdo para ocultar/mostrar

### 2.5 Contenido principal (#app-main)
- `margin-left:185px` con `transition: margin-left .3s ease`
- Cuando sidebar oculto: `body.sb-hidden #app-main { margin-left:0 }`

### 2.6 Vistas (.view-panel)
- `display:none` por defecto, `.active` → `display:block`
- Animación: `@keyframes vIn` (opacity 0→1, translateY 4→0, 0.15s)

### 2.7 Componentes de Home
- `.ipod-player`: carcasa gris con bordes redondeados, sombra 3D
- `.ipod-screen`: pantalla negra con borde inset para iframe YouTube
- `.ipod-wheel`: botones circulares (⏮ ▶ ⏭)
- `.ipod-url-bar`: input + botón GO debajo del reproductor
- `.iphone-msg .imsg`: burbujas verdes (usuario) y grises (reply)
- `.game-btn.gba/.gbb/.gbc/.gbd`: 4 variantes de botones retro (GameBoy, Arcade, Cyber, SNES)

### 2.8 Ventanas (MS Paint + Win95)
- `.paint-window`: borde 3D `var(--mspaint)`, titlebar gradiente rosa
- `.w-popup`: popup Win95 con `border:2px solid #fff/#000`, titlebar azul (#000080→#1084d0)
- `.w-title`: cursor:move para drag & drop
- `.load-bar`: barra de carga con animación barber-shop (repeating-linear-gradient scroll)

### 2.9 Widgets flotantes derecha
- `.float-widget`: círculos con sombra, hover scale(1.15)
- `.fw-music`: morado, position:fixed bottom:325px right:10px
- `.fw-tama`: rosa, bottom:265px right:8px
- `.fw-tv`: oscuro, bottom:207px right:11px
- `#flip-phone`: teléfono RAZR rosa, bottom:50px right:8px

### 2.10 Avatar Studio
- `.av-doll`: position:relative con 5 `<img>` layers superpuestas (z-index 1→5)
- `.av-g-btn`: botones de género (♀ F / ♂ M / ⚧ NB)
- `.av-cat`: chips de categoría horizontales
- `.av-item`: cards de 65px con miniatura de la prenda
- `.sims-bubble`: burbujas ovaladas que aparecen al click en el avatar

---

## 3. HTML: Vistas y Pop-ups

### 3.1 Sidebar (#sidebar)
```
✦ WebFRIENDS (título)
✦ MENU (sb-start → abre start-menu)
8 botones sb-btn con data-view
Widgets: THEME, MUSIC, EMOJI, NOTE
Reloj digital
```

### 3.2 Start Menu (#start-menu)
```
position:fixed, aparece al click en MENU
4 items: Tamagotchi, Winamp, MSN Chat, TV Stream
Se cierra al click fuera
```

### 3.3 Vistas (dentro de #app-main)
Cada vista es un `<div class="view-panel" id="view-XXX">`. Solo una tiene clase `active`.

### 3.4 Pop-ups (fuera de #app-main, position:fixed)
```
popup-tama: carcasa plástica rosa + LCD verde GameBoy
popup-winamp: reproductor oscuro + Spotify iframe
popup-chat: chat MSN + guest link
popup-tv: TV CRT + WebRTC video + stream chat
```

---

## 4. JS: Lógica y Eventos

### 4.1 Inicialización (DOMContentLoaded)
```javascript
initStars()       // Canvas 2D: 80 estrellas con draw loop
initSparkles()    // 35 sparkle divs
initTape()        // 5 tape strips
updateClock()     // Reloj sidebar (setInterval 1s)
// SPA routing: listeners en .sb-btn[data-view]
initAvatar()      // Paper Doll + Sims bubbles
initHub()         // MySpace panels
initFoodStars()   // 5-star rating
initCalendar()    // Calendario mensual
initAlbum()       // Corcho virtual
initTama()        // Tamagotchi (decay 40s)
initWinamp()      // Visualizer 8 barras
initPeer()        // WebRTC PeerJS
```

### 4.2 SPA Routing (navigateTo)
```javascript
function navigateTo(viewId) {
  // 1. Quitar .active de todas las vistas
  // 2. Quitar .active de todos los .sb-btn
  // 3. Activar vista y botón objetivo
}
```

### 4.3 Pop-up Drag & Drop
```javascript
let drag=null, dOX=0, dOY=0;
// mousedown en .w-title → guardar popup + offset
// mousemove → mover popup
// mouseup → soltar
// z-index dinámico: ++pZ cada vez que se agarra
```

### 4.4 Avatar Paper Doll
```javascript
const DOLL_BASES = { f:'url_base_f', m:'url_base_m', x:'url_base_x' };
const AV = { hair:[], top:[], bottom:[], shoes:[] };
// Cada item tiene: id, n (nombre), u (url), g (género: f/m/u)
// avGender filtra items: item.g === 'u' || item.g === avGender || avGender === 'x'
// updateDoll(): asigna src a los 4 <img> layers
```

### 4.5 Sims 2 Bubbles
```javascript
function toggleSimsBubbles(e) {
  // Crea 7 .sims-bubble con opciones (Pose, Flirt, Call, Dance, Taunt, Sing, Fashion)
  // Posiciones calculadas alrededor del avatar
  // Auto-destrucción en 4 segundos
}
```

### 4.6 YouTube (iPod Player)
```javascript
function playYT() {
  // Regex: extrae ID de youtube.com/watch?v= o youtu.be/ o youtube.com/embed/
  // Inserta iframe en #ipod-screen
  // Actualiza sidebar widget "Now Playing"
}
```

### 4.7 iPhone Bubbles (Home)
```javascript
const MSGS = [['msg1','msg2','msg3'], ...]; // 5 conversaciones
function rotateBubbles() {
  // Selecciona conversación aleatoria
  // Renderiza burbujas .imsg (pares=reply gris, impares=verde)
}
setInterval(rotateBubbles, 18000); // Cambia cada 18 segundos
```

### 4.8 Game Button Randomizer
```javascript
setTimeout(() => {
  const variants = ['gba','gbb','gbc','gbd'];
  document.querySelectorAll('.game-btn').forEach(b => {
    b.classList.add(variants[random]); // Variante aleatoria al cargar
  });
}, 100);
```

### 4.9 Sidebar Toggle
```javascript
function toggleSidebar() {
  document.body.classList.toggle('sb-hidden');
  // CSS: body.sb-hidden #sidebar { transform: translateX(-185px) }
  // CSS: body.sb-hidden #app-main { margin-left: 0 }
}
```

### 4.10 Tamagotchi
```javascript
let tama = { hunger:50, happiness:50, energy:50, stage:1 };
setInterval(tamaDecay, 40000); // Decay cada 40 segundos
function tamaAction(a) { /* feed/play/clean/heal: modifica stats */ }
// Evolución: stage++ cuando los 3 stats = 100 (max stage 3)
// Visual: 🥚 → 👾 → 👽 → 🌟
// Persistencia: localStorage
```

### 4.11 Winamp + Spotify
```javascript
function initWinamp() { /* Crea 8 barras de visualizer */ }
function embedSpotify() { /* Regex spotify URL → iframe sandbox */ }
```

### 4.12 MSN Chat + Guest Link
```javascript
function sendChat() { /* Añade mensaje al chat + actualiza flip phone */ }
function generateGuestLink() { /* UUID, TTL 5min, countdown, sendBeacon */ }
```

### 4.13 WebRTC (PeerJS)
```javascript
let peer = new Peer('wf12-'+id, { iceServers: [STUN google] });
peer.on('call', async call => { /* getUserMedia → answer → handleCall */ });
function startCall() { /* peer.call(targetId, stream) */ }
function startScreenShare() { /* getDisplayMedia → replaceTrack */ }
```

### 4.14 Emoji Drop + Post-its
```javascript
function emojiDrop() { /* 6 emojis aleatorios con animación fadeOut, 180ms entre cada uno */ }
function spawnPostIt() { /* prompt → div arrastrable con botón ✕ */ }
```

### 4.15 Toggle Sky
```javascript
function toggleSky() {
  document.body.classList.toggle('sky');
  // body.sky: fondo azul cielo gradiente, sin animación bgShift
  // Actualiza icono del widget THEME (🌙 ↔ ☀️)
}
```

---

## 5. Subsistemas Clave

### 5.1 Persistencia (localStorage)
- `wf12_tama`: estado del Tamagotchi
- `wf12_avatar`: estado del avatar (próximamente)
- `wf11_visitors`: contador de visitas

### 5.2 Seguridad
- CSP meta tag: solo scripts de CDNs autorizados
- Spotify iframe: sandbox + allow solo encrypted-media
- Guest links: UUID v4, TTL 5 min, sendBeacon en tab close
- Supabase RLS: políticas por usuario en todas las tablas

### 5.3 Temas
- Night (default): gradiente dark purple animado
- Sky: gradiente azul cielo estático
- Sidebar se adapta: `.sb-btn` cambia color en sky mode
- Widget THEME muestra 🌙 o ☀️

### 5.4 Responsive (mínimo, diseño desktop-first)
- Sidebar: ancho fijo 185px
- Contenido: ocupa el resto (flex:1)
- Pop-ups: tamaños fijos, arrastrables
