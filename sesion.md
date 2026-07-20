# Registro de Sesión - WebFRIENDS v12.13

**887 líneas** | Supabase + PeerJS + Vanilla JS

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

## Persistencia
- **Posiciones**: user cards (por nombre) y polaroids (por ID) guardan posición en localStorage (`parseFloat`)
- Foto subida/borrado/caption se ve en vivo en todos los usuarios (Supabase Realtime)

## Layout
- `#app-main` usa `flex:1;margin-left:185px;position:relative`

## Backend
- Supabase: `https://gtizbvbufskdkemtuems.supabase.co`
- Auth: login/register con email + loadUserProfile
- **Fotos**: Supabase Storage (bucket `photos`) + tabla `photos` con RLS
- localStorage: username, avatar, tamagotchi, URLs reproductores

## URL
https://dslateentry.github.io/webfriends/
