# Plan de Construcción - WebFRIENDS

---

## Stack
HTML5 + CSS vanilla + Vanilla JS + Supabase + PeerJS

---

## Funcionalidades Implementadas (Fases completadas)

### Core (✅)
- Auth Supabase (login/registro). Login usando Email, renderizando perfiles por Username.
- Perfiles de usuario dinámicos (User Cards en el home leyendo metadata de Supabase y localStorage).
- Botón Logout implementado.
- Feed de fotos polaroid.
- UI Responsiva básica (iPod y Sidebar).

### Social (✅)
- Spotify Embeds (sandbox iframe).
- Guestbook y MSN Chat global.
- Hub de Recomendaciones (Foryou 💅✨).

### Creative (✅)
- Avatar Paper Doll con imágenes Bratz reales (pixeldolls.net) y selector de Display Name.
- Dress to Impress UI con género F/M/X y Sims 2 bubbles.
- Notepad blog (MS Paint windows, 4 fuentes).
- Corcho virtual (Notitas 💕) y Fotolog con capacidad de persistencia y eliminación (botón rojo X).
- Calendario colaborativo con eventos.

### Comunicaciones (✅)
- WebRTC P2P (PeerJS CDN).
- Screen sharing (getDisplayMedia).
- Stream chat separado.
- Ephemeral guest links (UUID, TTL 5 min).

### Entretenimiento (✅)
- Tamagotchi Grupal (3 stats, decay 40s, evolución 3 stages).
- Winamp/Spotify player con visualizer.
- Flip phone RAZR (notificaciones chat).
- Emoji Drop (30 emojis) y Post-its caóticos arrastrables.
- YouTube embed (iPod/MP4 player en Home) adaptado a ventanas pequeñas, con Autoplay y botones ▶/⏸.

### UI (✅)
- SPA routing con sidebar izquierdo (collapsible). Textos ampliados.
- Pop-ups Win95 arrastrables (Z-index dinámico).
- 3 temas: Night / Sky (toggle).
- Botones retro game con variantes aleatorias.
- Fullscreen Support (botón ⛶ FS).

---

## Futuras Mejoras (TO-DO)

- [ ] Integración total de persistencia de Avatares, Fotolog y Tamagotchi a Supabase.
- [ ] Supabase Realtime para chat sincronizado global en tiempo real.
- [ ] Leaderboards del grupo y ranking.
- [ ] Temas personalizados almacenados por usuario en la Base de Datos.
- [ ] Soporte para uploads directos a Supabase Storage para imágenes.
