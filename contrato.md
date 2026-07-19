# Contrato de Desarrollo - WebFRIENDS

> ⚡ **SKILLS**: `frontend-design`, `design-taste-frontend`, `ui-ux-pro-max`, `find-skills`, `threejs`, `motion-doctrine`, `figma-implement-design`, `figma-create-design-system-rules`, `supabase-help`, `a11y-testing`

---

## 1. Contexto
Plataforma web privada para grupo de amigos (5-20 personas). Estética Y2K maximalista, Neocities, Gyaru, Anime 90s.

---

## 2. Stack y Restricciones
- **Archivo único**: `index.html` (HTML + CSS + JS)
- **Sin build**: Cero webpack, vite, npm
- **Sin frameworks**: Vanilla JS puro
- **CDNs**: Tailwind CSS, Supabase JS, PeerJS, Google Fonts (VT323, Silkscreen, Press Start 2P, Orbitron)

### Credenciales
- Supabase URL: `https://gtizbvbufskdkemtuems.supabase.co`
- Anon Key: `sb_publishable_TH4BwX7f0byE09zRWdtVtg_TyczbAP3`

---

## 3. Arquitectura v12.0 — SPA Hybrid

```
┌─ Sidebar ────┬── Main Content ──────────────────────┬─ Widgets ─┐
│ 185px        │ 8 Views (SPA toggle)                 │ 🎵 Winamp │
│ collapsible  │                                       │ 🥚 Tama   │
│              │ Desktop: iPod+GIFs+burbujas+game btns│ 📺 TV     │
│ ✦ Title     │ Avatar: Bratz PNGs + Sims bubbles     │           │
│ ▸ Desktop   │ Hub: MySpace panels × 6               │           │
│ ▸ Avatar    │ Food: Gothic/Fanzine cards            │ 📱 RAZR   │
│ ▸ Hub       │ Blog: MS Paint windows                │           │
│ ▸ Food      │ Pinboard: cork notes                  │           │
│ ▸ Notepad   │ Calendar: monthly grid                │           │
│ ▸ Pinboard  │ Album: cork photos + Arcade           │           │
│ ▸ Calendar  │                                       │           │
│ ▸ Album     │                                       │           │
│             │                                       │           │
│ ★ Theme 🌙  │                                       │           │
│ ★ Music ♫   │                                       │           │
│ ★ Emoji 💖  │                                       │           │
│ ★ Note 📝   │                                       │           │
│ Clock 00:00 │                                       │           │
└─────────────┴───────────────────────────────────────┴───────────┘
  Pop-ups Win95 (z-index 720+, arrastrables):
  popup-tama | popup-winamp | popup-chat | popup-tv
```

---

## 4. Paleta y Diseño

| Variable | Hex | Uso |
|----------|-----|-----|
| `--pink` | #ff1493 | Bordes, acentos, glow |
| `--cyan` | #0ff | Acento secundario |
| `--lime` | #cf0 | CTA, activo |
| `--purple` | #c471ed | Titlebar gradiente |
| `--bg` | #0a0a14 | Fondo night mode |
| `--txt` | #ffeef7 | Texto principal |

**Fondo**: Gradiente animado 400% 20s + 80 estrellas canvas + 35 sparkles + 5 tape strips scrapbook + checkerboard overlay

**Tipografía**: Press Start 2P (headings), Silkscreen (UI), VT323 (body), Comic Sans (post-its)

**Ventanas**: MS Paint con bordes pixelados rosados + Win95 popups con titlebar azul gradiente y botones 3D

---

## 5. Seguridad
- CSP meta tag restrictivo
- Spotify iframe sandbox: `allow-scripts allow-same-origin`, `allow="encrypted-media"`
- Ephemeral guest links: UUID v4, TTL 5 min, `sendBeacon` en tab close
- RLS en Supabase para todas las tablas

---

## 6. CDNs
| CDN | URL | Propósito |
|-----|-----|-----------|
| Tailwind CSS | cdn.tailwindcss.com | CSS utilitario |
| Supabase JS | cdn.jsdelivr.net/npm/@supabase/supabase-js@2 | Backend |
| PeerJS | unpkg.com/peerjs@1.5.1 | WebRTC P2P |
| Google Fonts | fonts.googleapis.com | 4 fuentes |
