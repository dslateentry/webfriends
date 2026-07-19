# WebFRIENDS — Manual Técnico

## Estructura (index.html, 889 líneas)
- `<style>` — CSS (~350 líneas): variables, sidebar, vistas, popups, reproductores, widgets
- `<body>` — HTML: auth overlay, canvas, 8 vistas, sidebar, 4 popups, widgets flotantes, iPod
- `<script>` — JS (~500 líneas): auth, routing, reproductores, desktop, persistencia

## Funciones clave
| Función | Qué hace |
|---------|----------|
| `playYT(muted)` | Crea iframe YouTube. `muted=true` → `&mute=1` (restore). Sin parámetro → con sonido (click) |
| `waPlay()` | Toggle ▶/⏸ en boombox, pausa/reanuda CD |
| `embedSpotify()` | Iframe Spotify + fallback link |
| `updateDeskItems()` | Renderiza user cards + polaroids en escritorio |
| `navigateTo(vid)` | SPA routing entre vistas |
| `doAuth()` | Login/register con Supabase |
| `loadUserProfile(user)` | Carga username desde BD o metadata |
| `saveCork()` | Persiste fotos en localStorage |
| `updateUsername()` | Guarda username en localStorage y actualiza UI |

## Z-Index
- `-2 a 5`: fondos, estrellas, tape
- `15-25`: user cards, polaroids
- `500`: iPod + botones
- `720+`: popups arrastrables
- `9999`: auth overlay

## URLs
- Web: https://dslateentry.github.io/webfriends/
- Supabase: https://gtizbvbufskdkemtuems.supabase.co
