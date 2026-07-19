# Manual de Referencia - WebFRIENDS

## Estructura del index.html (889 líneas)

```
<head>     — CDNs + Google Fonts + CSP
<style>    — CSS completo (~350 líneas)
<body>     — Auth overlay + canvas + vistas + sidebar + popups + widgets
<script>   — JS vanilla (~500 líneas)
```

## CSS: Sistema de Capas

### Z-Index
- `-2 a 5`: Backgrounds, partículas, estrellas, tape strips
- `15-25`: User cards, polaroids en escritorio
- `50-55`: Elementos del desktop
- `100-400`: Popups Win95, widgets flotantes
- `500`: iPod + botones
- `720+`: Popups arrastrables
- `9999`: Auth overlay

### Sidebar (#sidebar)
- 185px fijo izquierda, collapsible (`.sb-hidden`)
- Transiciones: `transform .3s`, `margin-left .3s`

### iPod Player
- Posición absoluta al fondo del desktop-area
- Responsive: `max-width:min(360px, calc(100vw - 220px))`
- Autoplay inteligente: `playYT(muted)` con `?autoplay=1&mute=1` en restore

## JS: Funciones Clave

### Auth
- `doAuth()` — login/register con Supabase
- `loadUserProfile(user)` — carga username desde Supabase o metadata
- `checkSession()` — verifica sesión al cargar

### Reproductores
- `playYT(muted)` — crea iframe YouTube con/sin mute
- `waPlay()` — toggle play/pause boombox (▶/⏸)
- `embedSpotify()` — iframe Spotify

### Desktop
- `updateDeskItems()` — renderiza user cards + polaroids en escritorio
- `navigateTo(vid)` — SPA routing entre vistas
- `toggleSidebar()` — colapsa/expande sidebar

### Persistencia
- `saveCork()` — guarda fotos en localStorage
- `saveTama2()` — guarda tamagotchi
- `updateUsername()` — guarda username

### Restore
- Al cargar: restaura YouTube URL + llama `playYT(true)` (muted)
- Al cargar: restaura Spotify URL + llama `embedSpotify()`
- Al cargar: restaura username en input de Avatar Studio
