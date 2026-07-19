# Plan de Construcción - WebFRIENDS

---

## Stack
HTML5 + CSS vanilla + Vanilla JS + Supabase + PeerJS + Tailwind CDN

---

## Funcionalidades Implementadas (Fases completadas)

### Core (✅)
- Auth Supabase (login/registro/whitelist)
- Perfiles de usuario
- Feed de fotos polaroid
- Comentarios y reacciones
- Series/Anime Tracker

### Social (✅)
- Spotify Embeds (sandbox iframe)
- Guestbook
- Hub de Recomendaciones (Individual/Grupal × 6 categorías)
- MSN Chat global

### Creative (✅)
- Avatar Paper Doll con imágenes Bratz reales (pixeldolls.net)
- Dress to Impress UI con género F/M/X
- Sims 2 bubbles de interacción
- Sticker Wall / Pinboard
- Food Review Diary (estilos Gothic/Fanzine)
- Notepad blog (MS Paint windows, 4 fuentes)
- Calendario colaborativo con eventos
- Photo Album (corcho virtual)
- Arcade Zone

### Comunicaciones (✅)
- WebRTC P2P (PeerJS CDN)
- Screen sharing (getDisplayMedia)
- Stream chat separado
- Ephemeral guest links (UUID, TTL 5 min, sendBeacon)

### Entretenimiento (✅)
- Tamagotchi Grupal (3 stats, decay 40s, evolución 3 stages)
- Winamp/Spotify player con visualizer
- Flip phone RAZR (notificaciones chat)
- Emoji Drop (30 emojis, 6 por burst)
- Post-its caóticos arrastrables con botón ✕
- YouTube embed (iPod/MP4 player en Home)

### UI (✅)
- SPA routing con sidebar izquierdo (collapsible)
- Pop-ups Win95 arrastrables
- 3 temas: Night / Sky (toggle)
- Sidebar widgets interactivos (theme, music, emoji, note)
- Contraste mejorado en ventanas
- Botones retro game con variantes aleatorias
- Burbujas chat iPhone (rotan cada 18s)

---

## Futuras Mejoras (TO-DO)

- [ ] Integración real con Supabase (actualmente localStorage)
- [ ] Supabase Realtime para chat/Tamagotchi sincronizado
- [ ] Minijuegos embebidos en Arcade
- [ ] Leaderboards del grupo
- [ ] Efemérides (cumpleaños)
- [ ] Temas personalizados por usuario
- [ ] GIFs animados y stickers custom

---

## Notas KISS
- Todo en un solo `index.html`
- Sin webpack, vite, npm, node_modules
- Editar con cualquier editor, abrir con cualquier navegador
