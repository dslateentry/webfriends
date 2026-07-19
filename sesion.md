# Registro de Sesión - WebFRIENDS

> 💡 **SKILLS**: `frontend-design`, `design-taste-frontend`, `ui-ux-pro-max`, `find-skills`, `threejs`, `motion-doctrine`, `figma-implement-design`, `figma-create-design-system-rules`, `supabase-help`, `a11y-testing`

---

## Estado Actual: v12.7

### Arquitectura
- **Sidebar izquierdo** 185px collapsible (▶/◀ toggle, slide 0.3s). Font size aumentado, sección "Foryou 💅✨".
- **8 vistas SPA** con navegación por sidebar.
- **4 pop-ups Win95** arrastrables con posiciones iniciales fijas.
- **Widgets flotantes derecha**: 💿 Winamp, 🐣 Tamagotchi, 📺 TV, 📱 Flip Phone.

### Vistas
| # | Vista | Destacado |
|---|-------|-----------|
| 🏠 Inicio | view-home | Filmstrip polaroid infinita + iPod player (responsive) + burbujas iPhone secuenciales + user cards + polaroids álbum. |
| 👗 Avatar | view-avatar | Paper Doll Bratz PNGs con género F/M/X + Sims 2 bubbles + DISPLAY NAME input + PROFILE PHOTO. |
| 🌐 Foryou 💅✨ | view-hub | MySpace panels, Individual/Grupal - 6. |
| 🍕 Foodie | view-food | Gothic/Fanzine cards con estrellas. |
| 📝 Notepad | view-blog | MS Paint windows, 4 fuentes. |
| 📌 Notitas 💕 | view-postit | Corcho con notas arrastrables. |
| 📅 Calendario | view-calendar | Grid mensual con eventos. |
| 📸 Fotolog | view-album | Corcho virtual + Arcade. Persistencia y borrado permanente de fotos. |

### Home/Desktop (enriquecido)
- **Filmstrip polaroid**: 10 GIFs Y2K duplicados, scroll izquierdo infinito 40s, pausa al hover.
- **iPod/MP4 player**: Layout relative (responsive, ya no se superpone a los mensajes). Botones ▶ y ⏸. Autoplay integrado con iframe de YouTube (`?autoplay=1`).
- **Burbujas iPhone**: 5 conversaciones, mensajes aparecen secuencialmente, rotan cada 20s.
- **User cards**: 6 usuarios ejemplo. El usuario 1 se mapea automáticamente con el `username` de Supabase o el nombre ingresado en Avatar Studio. El subtítulo "untitled - Paint" es reemplazado por el Display Name personalizado.
- **Fullscreen**: Botón ⛶ FS añadido debajo del teléfono para pantalla completa.

### Backend (Supabase)
- **URL**: `https://gtizbvbufskdkemtuems.supabase.co`
- **Auth**: El inicio de sesión (Login) requiere Email + Password debido a políticas nativas de Supabase. El Registro captura Email, Password y Username.
- **Profiles**: Triggers en Postgres (`handle_new_user`) para crear perfiles. 

### Últimos cambios (v12.7)
- **iPod Responsive**: Se removió `position: fixed` para que fluya en el DOM debajo de los mensajes y se adapte al ancho.
- **iPod Controles**: Botones Play/Pause cambiados por ▶/⏸. Video arranca automáticamente.
- **Username Mapeo**: Resuelto bug donde se mostraba el email en lugar del nombre de usuario. Ahora usa `C.user_metadata.username` y el input de Avatar Studio.
- **Avatar Display Name**: Agregado input en Avatar Studio que se vincula con la tarjeta del escritorio.
- **Botón Logout**: Añadido (🚪) en la parte inferior del Sidebar.
- **Renombrado y UI**: Aumento general de font-size en Sidebar. Renombres (Desktop -> Inicio, Hub -> Foryou 💅✨, Food Diary -> Foodie, Pinboard -> Notitas 💕, Album -> Fotolog).
- **Bug Fix**: Corrección de un error crítico de sintaxis en JS provocado por modificaciones previas al array `EU` de usuarios y `spawnPostIt`.
