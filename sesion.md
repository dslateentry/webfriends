# Registro de Sesión - WebFRIENDS

> 💡 **SKILLS**: `frontend-design`, `design-taste-frontend`, `ui-ux-pro-max`, `find-skills`, `threejs`, `motion-doctrine`, `figma-implement-design`, `figma-create-design-system-rules`, `supabase-help`, `a11y-testing`

---

## Estado Actual: v12.8

### Arquitectura
- **Sidebar izquierdo** 185px collapsible con 8 vistas SPA + widgets + logout
- **4 pop-ups Win95** arrastrables (Tamagotchi, Winamp/Boombox, MSN Chat, TV FaceTime)
- **Widgets flotantes derecha**: 🎵 Winamp, 🥚 Tamagotchi, 📺 TV, 📱 Flip Phone, ⛶ Fullscreen

### Vistas
| # | Vista | Contenido |
|---|-------|-----------|
| 🏠 Inicio | view-home | Filmstrip GIFs + burbujas iPhone + iPod player (autoplay) + user cards + polaroids |
| 👗 Avatar Studio | view-avatar | Paper Doll Bratz PNGs (F/M/X) + Sims 2 bubbles + username + profile photo |
| 🌐 Foryou 💅✨ | view-hub | MySpace panels, Individual/Grupal × 6 |
| 🍕 Foodie | view-food | Gothic/Fanzine cards con estrellas |
| 📝 Notepad | view-blog | MS Paint windows, 4 fuentes |
| 📌 Notitas 💕 | view-postit | Corcho con notas arrastrables |
| 📅 Calendario | view-calendar | Grid mensual con eventos |
| 📸 Fotolog | view-album | Corcho virtual + persistencia localStorage + delete |

### Home/Desktop
- **iPod player**: position absolute al fondo del desktop-area, responsive, autoplay en carga/recarga, botón Play/Pause
- **User cards**: 6 usuarios ejemplo + usuario logueado automático, draggables, dentro de desktop-area
- **Polaroids álbum**: última 6 fotos, draggables, doble-click → Fotolog

### Backend
- Supabase Auth (login/registro con email)
- URL: `https://gtizbvbufskdkemtuems.supabase.co`

### Archivos
- `index.html` — 896 líneas
- `schema.sql` — Tablas + RLS
- `sesion.md`, `contrato.md`, `plan.md`, `manual.md`
- `WebFRIENDS.ps1` — Servidor auto-contenido
- `ABRIR.bat` — Launcher
