# CONTRATO DE DESARROLLO - WebFRIENDS

## 1. Arquitectura KISS
- **Archivo único**: Todo en `index.html` (HTML + CSS + JS)
- **Cero frameworks**: Sin React, Vue, npm, Webpack
- **CDNs**: Tailwind CSS, Supabase JS, PeerJS, Google Fonts

## 2. Estética Y2K / Frutiger Aero
- Ventanas arrastrables estilo Windows 95/XP
- Degradados Y2K, elementos holográficos, bordes 3D, cursores pixelados
- Componentes retro: iPod, Tamagotchi, Flip Phone, Boombox
- Fuentes: Silkscreen, Press Start 2P, Comic Sans MS, VT323
- Paleta: pink (#ff1493), cyan (#0ff), lime (#cf0), purple (#c471ed)

## 3. Autenticación (Supabase)
- Login SIEMPRE con email + password
- Registro captura email + username
- `loadUserProfile()` mapea perfiles desde Supabase o metadata
- Username se guarda en localStorage para display

## 4. DOM y Manipulación JS
- No romper IDs ni clases existentes
- Usar funciones inline (`onclick=""`) o listeners en DOMContentLoaded
- Cuidado con reemplazos de strings y comillas en HTML generado por JS

## 5. Prácticas de Edición
- Leer código antes de editar
- Validar que los reemplazos apliquen correctamente
- No truncar cadenas ni romper sintaxis
- `git commit` + `git push` frecuentes

## 6. Reproductores
- YouTube: `playYT(muted)` — autoplay muteado en restore, con sonido en click manual
- Spotify: iframe embed con fallback de link
- Ambos persisten vía localStorage

## 7. Persistencia
- localStorage: fotos, username, avatar, tamagotchi, URLs de reproductores
- Supabase: auth, perfiles (futuro: fotos compartidas, chat realtime)
