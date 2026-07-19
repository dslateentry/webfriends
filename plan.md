# Plan de Construcción - WebFRIENDS

---

## Stack
HTML5 + CSS vanilla + Vanilla JS + Supabase + PeerJS

---

## Funcionalidades Implementadas

### Core (✅)
- Auth Supabase (login/registro con email)
- Perfiles de usuario dinámicos (user cards mapean username)
- Logout en sidebar

### Social (✅)
- Spotify Embeds (iframe + fallback link)
- MSN Chat global con guest links efímeros
- Hub de Recomendaciones (Foryou 💅✨, Individual/Grupal × 6)

### Creative (✅)
- Avatar Paper Doll con imágenes Bratz reales (pixeldolls.net)
- Dress to Impress UI con género F/M/X + Sims 2 bubbles
- Profile photo (upload o selección de GIFs)
- Display Name input en Avatar Studio
- Notepad blog (MS Paint windows, 4 fuentes)
- Corcho virtual (Notitas 💕)
- Fotolog con persistencia localStorage + delete (X rojo) + captions
- Calendario colaborativo con eventos

### Media (✅)
- iPod/MP4 player con YouTube embed
- Autoplay inteligente: muteado al recargar, con sonido al click manual
- Boombox/CD player retro con Spotify
- Botones Play/Pause (▶/⏸) sincronizados

### UI (✅)
- Sidebar collapsible con 8 vistas SPA
- 4 pop-ups Win95 arrastrables
- Widgets flotantes derecha
- Fullscreen button
- 3 temas: Night / Sky (toggle)
- User cards draggables en el escritorio
- Polaroids de álbum en el escritorio
- Burbujas iPhone secuenciales
- Filmstrip GIFs infinito

### Comunicaciones (✅)
- WebRTC P2P (PeerJS CDN)
- Screen sharing
- Stream chat separado
- Ephemeral guest links (UUID, TTL 5 min, sendBeacon)

### Entretenimiento (✅)
- Tamagotchi Grupal (3 stats, decay 40s, evolución 🥚→🐣→🐤→🐔)
- Emoji Drop (30 emojis, 6 por burst)
- Post-its caóticos arrastrables

---

## TO-DO
- [ ] Fotos compartidas entre usuarios (Supabase Storage)
- [ ] Realtime chat (Supabase Realtime)
- [ ] Minijuegos en Arcade
- [ ] Leaderboards
