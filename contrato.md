# WebFRIENDS — Contrato Técnico

## Stack
1 archivo `index.html` (HTML + CSS + JS). CDNs: Tailwind, Supabase, PeerJS, Google Fonts.

## UI
- Sidebar 185px collapsible, 8 vistas SPA, 4 pop-ups Win95 arrastrables
- Widgets flotantes: Winamp, Tamagotchi, TV, Flip Phone, Fullscreen
- Paleta: pink/cyan/lime/purple sobre fondo dark animado
- Fuentes: Silkscreen, Press Start 2P, Comic Sans MS, VT323

## Layout
- `#app-main{position:absolute;left:185px;top:0;right:0;bottom:0}`
- `body.sb-hidden #app-main{left:0}`
- Non-Home views: `padding-left:190px`
- iPod: fuera de `#desktop-area`, centrado con `left:50%+translateX(-50%)` relativo a `#app-main`

## Auth
- Supabase Auth (email + password)
- `loadUserProfile()` carga username desde BD o metadata
- Logout en sidebar

## Reproductores
- YouTube: `playYT(muted)` — muteado en restore, con sonido en click manual
- Spotify: iframe embed

## Persistencia
- localStorage: fotos (corkPhotos), username, avatar, tamagotchi, URLs
- Supabase: auth y perfiles

## Reglas
- No romper IDs existentes
- No duplicar elementos HTML ni funciones JS
- `git commit` + `git push` frecuentes
