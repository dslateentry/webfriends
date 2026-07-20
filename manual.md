# WebFRIENDS — Manual Técnico

## Estructura (index.html, 887 líneas)
- `<style>` — CSS (~350 líneas): variables, sidebar, vistas, popups, reproductores, widgets, layout
- `<body>` — HTML: auth overlay, canvas, 8 vistas, sidebar, 4 popups, widgets flotantes, iPod
- `<script>` — JS (~500 líneas): auth, routing, reproductores, desktop, persistencia

## Layout
- `#app-main{flex:1;margin-left:185px;position:relative}` — llena espacio derecho del sidebar
- `body.sb-hidden #app-main{margin-left:0}` — sidebar oculto expande app-main
- `#app-main{transition:margin-left .3s ease}` — animación al colapsar sidebar
- `#view-avatar,#view-hub,#view-food,#view-blog,#view-postit,#view-calendar,#view-album{padding-left:190px}` — vistas no-Home
- `#view-home{padding-left:0!important}` — Home sin padding extra
- `body.sb-hidden .view-panel{padding-left:0!important}` — padding se quita al ocultar sidebar
- iPod: fuera de `#desktop-area`, `position:absolute;left:50%;transform:translateX(-50%)` relativo a `#app-main`
- `toggleSidebar()` ajusta `ipod.style.marginLeft` al ocultar/mostrar sidebar

## Funciones clave
| Función | Qué hace |
|---------|----------|
| `playYT(muted)` | Crea iframe YouTube. `muted=true` → `&mute=1` (restore). Sin parámetro → con sonido (click) |
| `waPlay()` | Toggle ▶/⏸ en boombox, pausa/reanuda CD |
| `embedSpotify()` | Iframe Spotify + fallback link |
| `updateDeskItems()` | Renderiza user cards + polaroids (desde Supabase) en escritorio |
| `navigateTo(vid)` | SPA routing entre vistas |
| `doAuth()` | Login/register con Supabase + initAlbum |
| `loadUserProfile(user)` | Carga username desde BD o metadata |
| `initAlbum()` | Carga fotos desde tabla `photos` en Supabase + configura event delegation |
| `uploadCork(e)` | Sube foto a Supabase Storage + inserta metadata en tabla `photos` |
| `deletePhoto(id)` | Borra foto del bucket + tabla `photos` (solo dueño) |
| `addPhotoCaption(id)` | Actualiza caption en tabla `photos` |
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
