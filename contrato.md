# CONTRATO DE DESARROLLO - WebFRIENDS

Al modificar o expandir el proyecto **WebFRIENDS**, los agentes de IA (y desarrolladores) deben adherirse ESTRICTAMENTE a las siguientes reglas:

## 1. Arquitectura KISS (Keep It Simple, Stupid)
- **Archivo único**: TODO el HTML, CSS y JavaScript principal debe vivir en `index.html`. No separar en múltiples archivos ni usar empaquetadores como Webpack, Vite, React, etc.
- **Cero dependencias pesadas**: No se permite npm, node_modules, ni frameworks. Solo usar CDNs autorizados (Supabase, PeerJS, Tailwind si aplica, fuentes de Google Fonts).

## 2. Estética Y2K / Frutiger Aero
- **Fidelidad Visual**: Mantener y respetar los estilos visuales: ventanas arrastrables estilo Windows 95/XP, degradados Y2K, elementos holográficos, bordes inset/outset 3D, cursores pixelados y componentes retro (iPod, Tamagotchi, Flip Phone).
- **Fuentes y Colores**: Usar tipografías declaradas en el CSS base ('Silkscreen', 'Press Start 2P', 'Comic Sans MS'). Evitar blancos o negros absolutos a menos que sea intencional; usar el esquema de variables `var(--pink)`, `var(--cyan)`, etc.

## 3. Autenticación y Backend (Supabase)
- **Supabase es la fuente de verdad**: Todo dato relacional y persistente a largo plazo debe ir a Supabase.
- **Regla Intocable de Auth**: El inicio de sesión (Login) en Supabase SIEMPRE debe ser con Email y Password. La API nativa no permite login directo con Username. El registro (Sign Up) debe recopilar el Username para guardarlo en `user_metadata` o la tabla `profiles`.
- El frontend debe mapear visualmente los perfiles usando `user_metadata.username` para proteger la privacidad del correo.

## 4. DOM y Manipulación JS
- **No romper el Markup**: NO borrar IDs ni clases existentes. Muchos componentes (como el iPod o los popups Win95) dependen de estilos en cascada e identificadores precisos. 
- Si se modifica el layout (ej. hacer el iPod responsive), adapta el CSS (usando flexbox, flow natural, etc.) pero mantén los selectores que el JS utiliza (ej: `#ipod-anchor`, `#ipod-play`).
- **Event Listeners**: Usa funciones inline (`onclick=""`) o listeners atados en el DOMContentLoaded para mantener la simplicidad y lectura lineal en un solo archivo.

## 5. Prácticas de Edición y Pushing
- Leer detalladamente el código antes de editar o reemplazar. Cuidado con el truncamiento de cadenas y el uso de comillas dentro del HTML generado por JS.
- Validar SIEMPRE que los bloqueos de reemplazo (diffs) apliquen correctamente para evitar errores de sintaxis catastróficos que quiebren el parsing del archivo entero.
- Hacer `git commit` y `git push` regularmente para reflejar avances en GitHub.
