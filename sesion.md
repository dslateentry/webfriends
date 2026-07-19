# Registro de Sesión - WebFRIENDS

> ⚡ **SKILLS**: `frontend-design`, `design-taste-frontend`, `ui-ux-pro-max`, `find-skills`, `threejs`, `motion-doctrine`, `figma-implement-design`, `figma-create-design-system-rules`, `supabase-help`, `a11y-testing`

---

## Estado Actual: v12.5 — 975 líneas, 79 KB

### Arquitectura
- **Sidebar izquierdo** 185px collapsible (◀▶ toggle, slide 0.3s)
- **8 vistas SPA** con navegación por sidebar
- **4 pop-ups Win95** arrastrables con posiciones iniciales fijas
- **Widgets flotantes derecha**: 🎵 Winamp, 🥚 Tamagotchi, 📺 TV, 📱 Flip Phone

### Vistas
| # | Vista | Destacado |
|---|-------|-----------|
| 🖥️ Desktop | view-home | Filmstrip polaroid infinita + iPod player + burbujas iPhone secuenciales + user cards + polaroids álbum |
| 👗 Avatar | view-avatar | Paper Doll Bratz PNGs con género F/M/X + Sims 2 bubbles |
| 🎯 Hub | view-hub | MySpace panels, Individual/Grupal × 6 |
| 🍕 Food | view-food | Gothic/Fanzine cards con estrellas |
| 📝 Notepad | view-blog | MS Paint windows, 4 fuentes |
| 📌 Pinboard | view-postit | Corcho con notas arrastrables |
| 📅 Calendar | view-calendar | Grid mensual con eventos |
| 📷 Album | view-album | Corcho virtual + Arcade |

### Home/Desktop (enriquecido)
- **Filmstrip polaroid**: 10 GIFs Y2K duplicados, scroll izquierdo infinito 40s, pausa al hover
- **iPod/MP4 player**: carcasa gris, pantalla negra, rueda click (⏮▶⏭), barra URL + GO, mejor contraste en botones
- **Burbujas iPhone**: 5 conversaciones, mensajes aparecen secuencialmente (800ms delay cada uno), rotan cada 20s
- **User cards**: 6 usuarios ejemplo estilo Paint (untitled - Paint) con foto y nombre. Primeros 3 alineados izquierda post-sidebar. Siguientes en posiciones aleatorias. Se reposicionan al colapsar sidebar
- **Polaroids álbum**: 6 fotos más recientes del álbum aparecen como polaroids en posiciones variadas
- **Botones retro game**: 4 variantes aleatorias (GameBoy/Arcade/Cyber/SNES). Botón muestra ☀️ LIGHT o 🌙 DARK según modo

### Tamagotchi
- Diseño huevo rosa con LCD verde
- Evolución: 🥚 → 🐣 → 🐤 → 🐔 (huevo → pollito → pollo → gallina)
- Animaciones por stage: baby (bounce), teen (float), adult (spin)
- Stats con loading bars + edad en días + peso
- Botones circulares integrados en la carcasa

### Temas
- **Dark** (default): gradiente purple animado + sparkles + tape strips
- **Light** (sky toggle): gradiente azul cielo. Sidebar cambia colores, botón muestra 🌙 DARK
- Sidebar widget THEME muestra icono actual (🌙/☀️)

### Backend
- Supabase URL: `https://gtizbvbufskdkemtuems.supabase.co`
- PeerJS CDN para WebRTC
- CSP restrictivo activo

### Archivos
- `index.html` — 1065 líneas, 83 KB
- `schema.sql` — Tablas + RLS
- `sesion.md` — Este archivo
- `contrato.md`, `plan.md`, `manual.md` — Actualizados

### Últimos cambios (v12.6)
- iPod `position:absolute;bottom:8px` — fijo abajo, no se mueve con mensajes
- User cards: columna izq (y:280/385/490), draggables, z-index 25
- Desktop polaroids: áreas seguras, draggables, z-index 15
- CD player retro: fondo rosa/magenta, disco multicolor
- FaceTime: solo Mac titlebar (sin doble head Win95)
- Upload múltiple con caption, aparece en polaroids + corcho
- Tama titlebar rosa `#ff69b4→#c01070`

---

## ⭐ IMPORTANTE: Para publicar

Los reproductores de YouTube/Spotify requieren HTTP. Subir a:

- **GitHub Pages** (gratis): Settings > Pages > Source: main > Save
- **Netlify** (gratis): arrastrar `index.html` a https://app.netlify.com/drop
- **En local**: ejecutar `ABRIR.bat` o `WebFRIENDS.ps1`
