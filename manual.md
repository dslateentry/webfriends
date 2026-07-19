# Manual de Referencia Arquitectónica - WebFRIENDS

Este documento detalla la estructura interna de `index.html`. 

## 1. Estructura General del Documento
- `<head>`: Declaración de fuentes (Google Fonts), CDNs (Supabase, PeerJS), y bloque masivo de `<style>` (CSS Vanilla).
- `<body>`: UI estática del fondo (canvas de estrellas, tape, scanlines).
- `#app-main`: Contenedor principal para el Sidebar y las vistas (Views).
- `<script>`: Bloque final con la inicialización, utilidades globales, listeners y lógica de UI.

## 2. CSS: Convenciones y Layout
- **Variables CSS**: Definidas en `:root` (colores, sombras, bordes).
- **Sidebar (`#sidebar`)**: Fijo a la izquierda (`185px`). Transición al colapsar (`.sb-hidden`), ajustando `#app-main`.
- **Z-Index System**:
  - `0 - 10`: Backgrounds, partículas, estrellas.
  - `15`: Polaroids en el escritorio.
  - `25`: User Cards (tarjetas de inicio).
  - `100 - 400`: Popups Win95, Widgets Flotantes.
  - `500+`: Controles vitales (iPod), Fullscreen btn, Overlays de Auth.
- **iPod Player**: Ahora usa layout natural (`position: relative`, `margin: 0 auto`) para adaptarse al ancho y fluir armónicamente entre los mensajes de chat de iPhone y los botones de la zona baja.

## 3. HTML: Vistas y Pop-ups
- **Views (SPA)**: Seis bloques `.view-panel` (ej. `view-home`, `view-avatar`, `view-hub`). Solo uno lleva `.active`.
- **Avatar Studio**: Integración de imagen de perfil y un input `#av-username` de "DISPLAY NAME" que sobreescribe dinámicamente títulos de tarjetas.
- **Start Menu**: Se activa con el botón de MENU en el Sidebar. Despliega opciones a componentes Win95 flotantes.
- **Widgets Flotantes**: Winamp, Tamagotchi, TV, Flip Phone. Ubicados con posicionamiento absoluto en la esquina inferior derecha.

## 4. JS: Lógica y Subsistemas
- **SPA Routing (`navigateTo`)**: Oculta/Muestra paneles quitando `.active`.
- **Drag & Drop**: Lógica general para popups (`.w-title`) y notas adhesivas (`.floating-note`).
- **Autenticación (Supabase)**: `doAuth()` maneja el login con Email. El frontend extrae el username desde `C.user_metadata.username` y oculta el correo.
- **iPod Player (`playYT`)**: Modifica el `innerHTML` de `.ipod-screen` inyectando un iframe de YouTube con parámetros de AutoPlay (`?autoplay=1`). Alterna entre estados con los botones ▶ y ⏸.
- **Tamagotchi (`tamaDecay`)**: Loop cada 40s que modifica stats (Hambre, Felicidad, Energía) de 0 a 100, y lo guarda en `localStorage`.
- **WebRTC (`initPeer`)**: Usa PeerJS para inicializar llamadas P2P de video.

## 5. Persistencia
- **Supabase**: Base de datos, autenticación y (a futuro) almacenamiento de avatares.
- **LocalStorage**: Caché en el navegador para sesiones temporales (`wf12_tama`, `wf_username`, URL de Spotify, etc.).
- Las fotos en el "Fotolog" se almacenan localmente y pueden ser eliminadas permanentemente mediante los controles de UI.
