# Registro de Sesión - WebFRIENDS

> 💡 **SKILLS**: `frontend-design`, `design-taste-frontend`, `ui-ux-pro-max`, `find-skills`, `threejs`, `motion-doctrine`, `figma-implement-design`, `figma-create-design-system-rules`, `supabase-help`, `a11y-testing`

---

## Estado Actual: v12.9 — 889 líneas

### Arquitectura
- **Sidebar izquierdo** 185px collapsible con 8 vistas SPA + widgets + logout
- **4 pop-ups Win95** arrastrables (Tamagotchi, Boombox, MSN Chat, TV FaceTime)
- **Widgets flotantes derecha**: 🎵 Winamp, 🥚 Tamagotchi, 📺 TV, 📱 Flip Phone, ⛶ Fullscreen
- **iPod player**: position absolute al fondo del desktop-area, responsive, autoplay muteado al recargar

### Vistas
| # | Vista | Contenido |
|---|-------|-----------|
| 🏠 Inicio | view-home | Filmstrip GIFs + burbujas iPhone secuenciales + iPod player + user cards + polaroids álbum |
| 👗 Avatar Studio | view-avatar | Paper Doll Bratz PNGs (F/M/X) + Sims 2 bubbles + username + profile photo |
| 🌐 Foryou 💅✨ | view-hub | MySpace panels, Individual/Grupal × 6 |
| 🍕 Foodie | view-food | Gothic/Fanzine cards con estrellas |
| 📝 Notepad | view-blog | MS Paint windows, 4 fuentes |
| 📌 Notitas 💕 | view-postit | Corcho con notas arrastrables |
| 📅 Calendario | view-calendar | Grid mensual con eventos |
| 📸 Fotolog | view-album | Corcho virtual + persistencia localStorage + delete (X rojo) |

### Reproductores
- **YouTube**: autoplay muteado al recargar (`playYT(true)` con `&mute=1`). Click manual en Play/GO → con sonido
- **Spotify**: iframe embed + botón OPEN IN SPOTIFY como fallback
- **Boombox**: CD player retro con botones ▶/⏸, disco giratorio, display LED verde

### Auth
- Login/Register con Supabase Auth
- `loadUserProfile()` carga username desde Supabase o metadata
- Logout en sidebar (🚪)

### Backend
- Supabase URL: `https://gtizbvbufskdkemtuems.supabase.co`
- PeerJS CDN para WebRTC
- localStorage para persistencia (fotos, username, avatar, tamagotchi, reproductores)

### Archivos
- `index.html` — 889 líneas
- `schema.sql` — Tablas + RLS
- `sesion.md`, `contrato.md`, `plan.md`, `manual.md`
- `WebFRIENDS.ps1` — Servidor auto-contenido
- `ABRIR.bat` — Launcher
