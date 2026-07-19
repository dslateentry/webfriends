# Registro de Sesión - WebFRIENDS v12.10

**884 líneas** | Supabase + PeerJS + Vanilla JS

## Vistas SPA (8)
| Vista | ID |
|-------|-----|
| Inicio | view-home |
| Avatar Studio | view-avatar |
| Foryou 💅✨ | view-hub |
| Foodie | view-food |
| Notepad | view-blog |
| Notitas 💕 | view-postit |
| Calendario | view-calendar |
| Fotolog | view-album |

## Pop-ups (4)
Tamagotchi, Boombox/CD, MSN Chat, TV FaceTime (WebRTC)

## Sidebar
8 botones + MENU + widgets (Now Playing, Theme, Emoji Drop, New Note) + Logout

## Reproductores
- **iPod**: YouTube con autoplay muteado al recargar, con sonido al click manual
- **Boombox**: CD player retro + Spotify embed + botón ▶/⏸

## Layout
- `#app-main` usa `position:absolute;left:185px;top:0;right:0;bottom:0`
- Sidebar toggle cambia `left:0` / `left:185px`
- Vistas no-Home: `padding-left:190px` (se quita con sidebar oculto)
- iPod fuera de `#desktop-area`, centrado en `#app-main` vía `left:50%+translateX(-50%)`

## Backend
- Supabase: `https://gtizbvbufskdkemtuems.supabase.co`
- Auth: login/register con email + loadUserProfile
- localStorage: fotos, username, avatar, tamagotchi, URLs reproductores

## URL
https://dslateentry.github.io/webfriends/
