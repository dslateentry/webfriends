# Contrato de Desarrollo - Monitor de Humedales Urbanos

Este documento establece los lineamientos técnicos, estéticos y arquitectónicos acordados para el desarrollo de la interfaz de la herramienta de gestión ambiental.

## 1. Rol y Enfoque
- **Rol:** Desarrollador Web Geoespacial experto.
- **Enfoque Principal:** Simplicidad extrema, adhiriéndose al principio **KISS** (Keep It Stupid Simple).

## 2. Restricciones Técnicas
- **Archivo Único:** Toda la estructura, diseño y lógica (HTML, CSS, JS) debe estar contenida en un único archivo `index.html`.
- **Tecnologías Base:** Estrictamente HTML5 y Vanilla JS. Queda prohibido el uso de frameworks o librerías reactivas como React, Angular, Vue, etc.
- **Estilos (CSS):** Prohibido el uso de CSS personalizado (`<style>` o archivos `.css` externos propios). El diseño debe lograrse exclusivamente utilizando clases utilitarias a través del CDN oficial de **Tailwind CSS**.
- **Motor de Mapas:** Uso de **MapLibre GL JS** integrado mediante sus CDNs oficiales (JS y CSS).

## 3. Arquitectura Visual (UI) y Layout
- **Dimensiones:** La aplicación debe ocupar la pantalla completa en todo momento (`h-screen w-full`).
- **Comportamiento:** Prohibido el uso de barras de desplazamiento globales (scroll oculto). El panel lateral izquierdo usa scroll continuo único (`overflow-y-scroll scroll-smooth`) que abarca todo el contenido debajo del título (panel de estado + filtros + exportación + buffer + intersección), maximizando el espacio vertical disponible para cada sección. La barra de scroll personalizada mide 6px de ancho, con track semi-transparente (`rgba(15,23,42,0.6)`) y thumb cyan neón semi-transparente (`rgba(34,211,238,0.3)`) que se ilumina al hover (`rgba(34,211,238,0.6)`), manteniendo la estética cyber-hud sin depender de librerías externas.
- **Responsividad Móvil (max-width: 1023px):**
  - El panel lateral se oculta completamente por defecto (`transform:translateY(100%)`) y solo se despliega como overlay al tocar el FAB (`#panel-fab`). No tiene peek inicial (ya no muestra 44px del handle). Al tocar el backdrop o fuera del panel, se cierra completamente (no solo se minimiza).
  - El dashboard mantiene la barra de control (`#dashboard-toggle`) visible en todos los tamaños de pantalla. El cuerpo del dashboard (`#dashboard-body`) reduce su altura normal a `140px` (vs `160px` en desktop). La altura se maneja desde CSS (`#dashboard-body{height:160px}` base, `height:140px` en mobile) sin `!important` para que JS (`CHART._bodyHeight`, `style.height`) pueda modificarla dinámicamente al colapsar/expandir. `CHART._bodyHeight` se inicializa según `window.innerWidth` (140 si ≤1023px, 160 si no). El restore desde expandido usa `CHART._bodyHeight` en vez del valor hardcodeado 160. `#dashboard-bar` tiene `position:relative;z-index:50` en mobile para quedar sobre el overlay del panel lateral (`z-index:40`). `#dashboard-toggle,#dashboard-maximize` tienen `touch-action:manipulation` para responder correctamente al tacto.
  - En mobile, `#dashboard-body` cambia a `flex-direction:column` con `overflow-y:scroll`. Cada contenedor de gráfico (hijo directo) ocupa ancho completo (`min-width:0`), altura mínima `180px` (`flex:1 0 auto`) y se separa con borde inferior sutil. `barMaxWidth` de las barras escala dinámicamente con `CHART._bw(n)` según `_bodyHeight` para evitar que barras adyacentes se solapen en pantallas angostas. Esto evita que 3 gráficos se superpongan, permitiendo scroll vertical dentro del dashboard. Los gráficos de barras horizontales (vistas HA, DECL, cuenta, comunas, toneladas, establec, regxt) muestran como máximo 8 categorías en vez de 10 para reducir densidad de etiquetas en mobile.
  - El handle del panel (`.panel-handle`) está oculto en desktop y visible solo en móvil como indicador visual.
- **Estética General:** Neobrutalismo (tech-brutalism) + cyber-hud / dark mode avanzado. Fondo oscuro profundo (`bg-slate-950`) con tipografía monoespaciada (`font-mono`) en colores claros para mayor contraste técnico.
- **Estructura Principal:** El diseño se divide en dos secciones principales dentro de un flex container:
  - **Panel Lateral Izquierdo (`#side-panel`):** Ocupa el 25% del ancho de la pantalla inicialmente (`style="width:25%"`). Tiene diseño translúcido (*glassmorphism*) y bordes/sombras de efecto neón color cyan. Es **retráctil**: el usuario puede colapsarlo a `width:0` con un botón toggle flotante (`#panel-toggle`) posicionado en el borde entre panel y main. Al colapsar, el panel oculta su contenido (`overflow:hidden`) y elimina el padding (`p-6` → 0). El botón toggle se mueve a `left:0` y cambia su icono de `◀` a `▶`. Al expandir, restaura `width:25%`, padding y el botón vuelve a `left:25%`. El mapa y dashboard se redimensionan automáticamente (350ms de transición CSS + `map.resize()` + `CHART._resize()`).
  - **Contenedor Principal (Derecho):** Ocupa el espacio restante con `flex-1 min-w-0` y layout `flex flex-col`. La parte superior es el mapa (`flex-1`) y la parte inferior es el dashboard colapsable con **3 estados** (colapsado `h-0`, normal `140px` mobile / `160px` desktop, expandido hasta `70vh`/`700px`), permitiendo que el mapa ocupe todo el espacio vertical cuando el dashboard está minimizado. La altura del dashboard se modifica sin `!important` para que JS pueda controlarla dinámicamente. `_defaultBodyHeight` guarda el valor original y nunca se sobreescribe, mientras `_bodyHeight` cambia según el estado. El botón de expandir (`#dashboard-maximize`) alterna entre normal y expandido. La flecha (`#dashboard-chevron`) en estado expandido restaura la vista normal; en estado normal colapsa/expande el dashboard. `_scale()` usa `Math.min(1.3, _bodyHeight / 160)` para evitar que etiquetas crezcan demasiado en modo expandido.

## 4. Lógica Espacial y Elementos UI
- **Contenedor del Mapa:** Dentro del contenedor principal debe existir un elemento vacío con el identificador `map` (`<div id="map"></div>`), el cual servirá como lienzo para MapLibre.
- **Contenido del Panel Lateral:**
  - Un título principal con el texto: **"Monitor de Humedales Urbanos"** (acompañado de una sub-etiqueta tipo sistema, ej: `[ SYS.v1.0 ]`). Es el único elemento fijo fuera del scroll.
  - Un único contenedor scrollable que agrupa: **Panel de Estado / Descripción** (estilo cyber-hud que indica inicialización y conteo de datos), filtros, exportación, áreas de influencia e intersección espacial. Todo excepto el título comparte el mismo scroll continuo, maximizando el espacio disponible para cada sección.
  - Un botón de acción con estética tech-brutalism (bordes rectos y sombras sólidas) y el texto: **"> Cargar_Capas_"** (sin funcionalidad programada por el momento, en espera de la siguiente fase lógica).

## 5. Panel de Filtros (Interactivo)
- **Ubicación:** Dentro del panel lateral izquierdo, debajo del panel de estado.
- **Visibilidad:** Oculto hasta que se carguen los datos geoespaciales.
- **Controles:** Toggles de capa (`<button>` o `<input type="checkbox">`) para activar/desactivar la visibilidad de las capas geoespaciales, seguidos de menús desplegables clásicos (`<select>`) para cada atributo filtrable.
- **Campos de filtro:**
  - `Mostrar Humedales` (toggle on/off — controla visibilidad de la capa de humedales)
  - `Mostrar Generadores` (toggle on/off — controla visibilidad de la capa GI-SINADER)
  - `Región` (15 valores únicos)
  - `Comuna` (65 valores únicos)
  - `Humedal` (107 valores únicos — nombre del humedal)
  - `Área (ha)` (rangos predefinidos: 0-10, 10-50, 50-100, 100-500, 500+)
  - `Proceso` (2 valores: "Municipal" / "de Oficio")
- **Comportamiento de toggles:** Cada toggle controla la visibilidad de su capa mediante `map.setLayoutProperty(layerId, 'visibility', 'visible'|'none')`. Los toggles son independientes entre sí y también independientes de los selects de atributos: se puede ocultar humedales pero mantener sus filtros activos, o mostrar generadores sin haber seleccionado ningún filtro de atributo.
- **Comportamiento de selects:** Cada cambio en un select aplica el filtro en tiempo real mediante `map.setFilter()` de MapLibre.
- **Filtro en cascada:** Al seleccionar un valor en cualquier filtro, los demás selects se repueblan mostrando solo las opciones compatibles con la selección actual. Por ejemplo, seleccionar una Región reduce las comunas disponibles a solo aquellas dentro de esa región. Los toggles de capa no afectan el repoblamiento en cascada.
- **Zoom automático:** Al aplicar un filtro, el mapa hace `fitBounds()` al conjunto de features visibles, centrando la vista en los humedales filtrados.
- **Botón "> LIMPIAR FILTROS":** Restablece todos los selects a "Todos", activa ambos toggles (mostrar humedales y mostrar generadores), remueve los filtros del mapa y re-zoom al total de features.
- **Contador dinámico:** El panel de estado muestra `"N / 107 HUMEDALES VISIBLES"` y `"M / 9176 GENERADORES VISIBLES"` según los filtros activos y el estado de los toggles de cada capa.
- **Carga de datos:** El GeoJSON se embebe como variable JS `GEOJSON_DATA` directamente en el HTML. No requiere servidor HTTP ni interacción del usuario. La capa se agrega al mapa al emitirse el evento `load` de MapLibre.
- **Popup al pasar el cursor (hover):** Al hacer `mouseenter` sobre un polígono (humedales), punto (generadores), área de influencia (buffer) o entidad intersectada se muestra un popup flotante con estética cyber-hud. El contenedor usa `bg-slate-900/92` con borde `border-cyan-500/60` y sombra neón `shadow-[0_0_12px_rgba(6,182,212,0.35)]`. Los datos se muestran en `font-mono`. Se reutiliza una única instancia global `popupHover` (`maplibregl.Popup` con `closeButton: false`, `closeOnClick: false`) para evitar creación/destrucción de nodos DOM y prevenir flickering. El cursor cambia a `pointer` al entrar y se restaura al salir.
- **Atributos del popup (Humedales):** `nombre_humedal` (título, `text-sm font-bold`), `region`, `comuna`, `ha` (formato `XX.XX ha`), `proceso_humedal_urbano`. Labels en `text-[10px] text-cyan-600 uppercase tracking-wider`, valores en `text-xs text-cyan-300 font-medium`. Layout flex con `justify-between` para jerarquía visual y máximo data-ink ratio (sin bordes entre filas, sin tablas HTML).
- **Atributos del popup (Generadores):** `nombre` (título), `rubro`, `region`, `comuna`, `total_toneladas` (formato `XX.XXX t`), `declaraciones`. Mismo estilo y layout que humedales.
- **Atributos del popup (Buffer / Áreas de Influencia):** Badge fucsia "ÁREA DE INFLUENCIA". Si el buffer se generó desde un humedal: `nombre_humedal` (título), `region`, `comuna`, `ha`. Si se generó desde un generador: `nombre` (título), `rubro`, `region`, `comuna`. Detección automática según propiedades disponibles.
- **Atributos del popup (Intersección):** Badge verde "INTERSECCIÓN". Si la intersección contiene datos de humedal: `nombre_humedal` (título), `region`, `comuna`, `ha`, `proceso`. Si contiene datos de generador: `nombre` (título), `rubro`, `region`, `comuna`, `total_toneladas`. Detección automática según propiedades disponibles.
- **Eventos:** `mouseenter` (muestra popup), `mousemove` (sigue cursor), `mouseleave` (oculta popup) en capas: humedales, generadores, buffer e intersección. `click` en humedales: usa bandera `_humedalClicked` para sincronizar filtros del panel (region, comuna, nombre, ha, proceso) y aplicar filtro via `map.setFilter()` sin cambiar zoom. El canvas click verifica la bandera para no limpiar filtros cuando se clickeó un humedal. `click` en canvas (fuera de polígonos): limpia todos los filtros y restaura vista completa sin zoom.
- **Reinicio:** Al salir del polígono/punto, el popup se oculta con `popupHover.remove()`. Al hacer clic fuera de cualquier humedal, los filtros se reinician a valores por defecto ("Todos") y el mapa muestra todos los features sin cambiar el zoom actual.
- **Limpieza al recargar página:** Al recargar el navegador, se ejecuta limpieza automática en el evento `load` del mapa: filtros de humedales (region, comuna, nombre, ha, proceso) se resetean a "Todos", toggles se activan, y si existen resultados de buffer o intersección en memoria se eliminan con `BUFFER.limpiar()` e `INTERSECT.limpiar()`. Esto garantiza un estado limpio en cada sesión.

## 6. Instanciación Cartográfica (MapLibre)
- **Lógica de Inicialización:** Instanciado al final del `<body>` mediante un bloque `<script>` utilizando Vanilla JS nativo.
- **Contenedor Destino:** El mapa apunta directamente al `id="map"` definido en la estructura HTML principal.
- **Mapa Base (Estilo):** Utiliza el mapa base oscuro de **CartoDB Dark Matter** (`https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json`), en consonancia con la directriz estética general del proyecto (dark mode avanzado / tech-brutalism).
- **Encuadre Inicial:** El mapa inicia centrado en las coordenadas geográficas correspondientes a **Chile** (`[-71.542969, -35.675147]`).
- **Nivel de Zoom:** El zoom inicial se fija en `4` para tener una panorámica del territorio.

## 7. Capa de Generadores Industriales (GI-SINADER 2024)

- **Archivo fuente:** `gi-sinader-2024-ckan.xlsx` (241.687 registros de declaraciones, ~41 MB)
- **Archivo procesado:** `gi-sinader-2024.geojson` (9.176 establecimientos únicos agregados, ~3.5 MB)
- **Conversión:** Script `convertir_geojson.py` — lee la hoja `Datos` del xlsx con openpyxl, agrupa por establecimiento (nombre + lat + lon), filtra coordenadas fuera de Chile (bounding box: lon -76/-66, lat -57/-17), corrige el orden de coordenadas a `[lon, lat]` (estándar GeoJSON) y genera GeoJSON de puntos. Se descartaron 11 establecimientos con coordenadas fuera del rango válido.
- **Carga en mapa:** El GeoJSON se embebe como variable JS `GI_GEOJSON` directamente en el HTML (igual que `GEOJSON_DATA` para humedales). La función `cargarCapaIndustrial()` lee esta variable al inicio. No requiere servidor HTTP ni `fetch()` para funcionar.
- **Estilo:** Coloreado dinámico por atributo `rubro` (19 categorías) usando módulo `COLOR.aplicar()` con paleta neón de alto contraste. Detección automática de tipo categórico. Puntos de radio fijo (4px) sin borde, opacidad 0.9.
- **KISS aplicado:** Separación clara entre `cargarCapaIndustrial()` (lectura/fetch) y `dibujarCapaIndustrial()` (estilo visual + interacción).
- **Disponibilidad global:** Los datos se exponen en `window.GI_DATA` (variable global) para que gráficos y filtros existentes puedan consumirlos sin modificar la lógica de humedales.
- **Popup (hover):** Muestra nombre, rubro, región, comuna, toneladas totales y número de declaraciones al pasar el cursor. Reutiliza la misma instancia global `popupHover` que los humedales. Estilo consistente con cyber-hud.

### 7.1 Esquema de Atributos (GeoJSON)

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `nombre` | str | Nombre del establecimiento |
| `razon_social` | str | Razón social del titular |
| `rut` | str | RUT del titular |
| `rubro` | str | Rubro industrial (19 categorías) |
| `region` | str | Región |
| `provincia` | str | Provincia |
| `comuna` | str | Comuna |
| `declaraciones` | int | N° de declaraciones en 2024 |
| `total_toneladas` | float | Total de residuos declarados (ton) |

## 8. Fuente de Datos Geoespacial (Humedales)
- **Archivo:** `Humedales Urbanos.geojson` (FeatureCollection)
- **CRS:** OGC 1.3:CRS84 (WGS84)
- **Total de features:** 107 humedales urbanos
- **Tipo de geometría:** MultiPolygon (todos los features)

### 8.1 Esquema de Atributos

| Atributo | Tipo | Ejemplo | Descripción |
|----------|------|---------|-------------|
| `objectid` | int | 1 | ID interno del feature |
| `region` | str | "Metropolitana de Santiago" | Región administrativa |
| `comuna` | str | "Lo Barnechea" | Comuna |
| `cod_humedal` | str | "HU-0001" | Código del humedal |
| `nombre_humedal` | str | "Embalse Larrain" | Nombre del humedal |
| `ha` | float | 0.859851 | Superficie en hectáreas |
| `proceso_humedal_urbano` | str | "Municipal" | Tipo de proceso |
| `resolucion` | str | "RE N° 533/ 2021" | Resolución asociada |
| `url_res_bcn` | str | "http://bcn.cl/2t5ho" | URL resolución BCN |
| `url_simbio` | str | "https://sistemahumedales.mma.gob.cl/..." | URL SimBio |
| `srid` | str | "EPSG: 4326" | Sistema de referencia |

## 9. Módulo de Exportación Client-Side

- **Propósito:** Exportar las entidades espaciales resultantes de los filtros activos (humedales + generadores industriales) en formatos GeoJSON y Shapefile, todo 100% client-side.
- **Dependencia externa:** `JSZip` (CDN `cdnjs.cloudflare.com`) para compresión ZIP de los componentes Shapefile.
- **Arquitectura (KISS):** El módulo `EXPORT` expone métodos públicos (`exportGeoJSON`, `exportSHP`) y privados (`_buildSHP`, `_buildDBF`, `_buildPRJ`, etc.) claramente separados. La UI se actualiza reactivamente mediante eventos `filter-change` y `gi-cargado`. Todo el código está comentado con JSDoc inline.

### 9.1 Metodología de Extracción de Datos

Se utiliza `featureCumple()` (la misma función del sistema de filtros en cascada) sobre los objetos `geoData` y `GI_DATA` en memoria. **Justificación:** `querySourceFeatures` de MapLibre solo retorna features visibles en el viewport o sin filtro aplicado; `queryRenderedFeatures` solo retorna lo dibujado en pantalla. Para exportar la totalidad de features que cumplen los filtros (incluso fuera del viewport), se itera sobre las colecciones globales aplicando la misma lógica de `featureCumple()` y `filtrosActivos()` que el resto del visor. Esto evita inconsistencias y mantiene el principio KISS.

Para la capa GI (Generadores Industriales), los filtros se aplican solo sobre los campos compartidos `region` y `comuna` — el resto de filtros específicos de humedales (`nombre_humedal`, `proceso_humedal_urbano`, `ha`) no se pasan a GI ya que no existen en sus atributos.

### 9.2 Formatos de Exportación

| Formato | Extensión | Implementación |
|---------|-----------|----------------|
| **GeoJSON** | `.geojson` | `JSON.stringify()` + `Blob` + descarga directa |
| **Shapefile** | `.zip` (contiene .shp, .shx, .dbf, .prj) | Serialización binaria manual de los componentes ESRI Shapefile + empaquetado ZIP con JSZip |

### 9.3 Componentes Shapefile Generados

- **`puntos.shp` / `poligonos.shp` / `lineas.shp`** — Geometrías en formato binario ESRI Shapefile (Point type 1, Polygon type 5, PolyLine type 3). Cabecera de 100 bytes con campos en orden correcto según especificación ESRI: FileCode(0), FileLength(20), Version(24), ShapeType(28), BBox(32+).
- **`puntos.shx` / `poligonos.shx` / `lineas.shx`** — Índice de offsets para acceso aleatorio (8 bytes por registro: offset en words 16-bit + content length en words 16-bit).
- **`puntos.dbf` / `poligonos.dbf` / `lineas.dbf`** — Atributos en formato dBase III (cabecera + field descriptors + registros).
- **`puntos.prj` / `poligonos.prj` / `lineas.prj`** — Proyección WGS84 (EPSG:4326) en formato WKT.
- Se generan archivos separados por tipo de geometría (puntos, polígonos y líneas) dentro del mismo ZIP, ya que el formato Shapefile no soporta geometrías mixtas en un solo archivo.
- **Extracción de anillos:** `_buildPolygonSHP` usa `extraerAnillos()` que normaliza Polygon y MultiPolygon a un array plano de anillos, evitando el bug de `useIdx` que solo verificaba el tipo del primer feature. Para líneas, `_buildPolylineSHP` usa `extraerSegmentos()` con la misma lógica multiparte pero shape type 3.

**Manejo de errores en serialización binaria:** Cada `exportSHP` usa `try/catch` para la lógica síncrona y `.catch()` en la Promise de `zip.generateAsync()` para capturar errores de compresión. Errores como buffer insuficiente o DataView out-of-bounds (causados por bugs en cálculo de tamaño del BBox) se muestran en el panel de estado: `"> ERROR: Offset is outside the bounds of the DataView"`.

### 9.4 UI/UX

- **Botones:** "GEOJSON" y "SHP ZIP" en el panel lateral, debajo de "LIMPIAR FILTROS".
- **Estados:** Los botones se deshabilitan (`disabled`) cuando:
  - No hay datos cargados (`geoData` o `GI_DATA` nulos).
  - El resultado de los filtros activos es 0 features.
  - Hay una exportación en curso (`EXPORT.ocupado = true`).
- **Feedback visual:** Texto de estado debajo de los botones muestra:
  - `> N ENTIDADES LISTAS` (en reposo).
  - `⟳ EXPORTANDO GEOJSON...` / `⟳ COMPRIMIENDO SHP...` (durante proceso, con spinner animado).
  - `> N ENTIDADES EXPORTADAS` / `> N ENTIDADES COMPRIMIDAS` (al completar).
  - `> ERROR: ...` (si falla).
  - `> SIN DATOS PARA EXPORTAR` (si no hay features).
- **Carga asíncrona:** El proceso se ejecuta con `setTimeout` para liberar el hilo principal; el ZIP utiliza `generateAsync` (Promise) de JSZip. Durante la compresión del ZIP y la exportación GeoJSON se muestra un spinner animado (`animate-spin` de Tailwind + carácter &#9696;) integrado en el texto de estado, coherente con la estética HUD.

### 9.5 Eventos

- `filter-change` — Disparado por `applyFilters()` para que el módulo de exportación actualice su conteo cuando cambian los filtros.
- `gi-cargado` — Disparado por `dibujarCapaIndustrial()` cuando termina de cargar la capa de generadores.

### 9.6 Módulo de Coloreo Dinámico (COLOR)

- **Propósito:** Asignar colores dinámicamente a cualquier capa del mapa según los valores de un campo específico, con soporte para datos categóricos (texto) y numéricos (rangos).
- **Arquitectura (KISS):** Módulo `COLOR` con método público `aplicar()` y métodos privados de detección y generación de expresiones MapLibre. Separa completamente la lógica de coloreo de la lógica de capas.

#### 9.6.1 API Pública

```javascript
COLOR.aplicar(map, layerId, config, features)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `map` | MapLibre | Instancia del mapa |
| `layerId` | string | ID de la capa a colorear |
| `config` | Object | `{ campo, tipo?, colores?, shape ('fill'\|'circle'\|'line'), legendCat }` |
| `features` | Array | Features para detectar valores únicos o rango |

**Propiedades de config:**

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `campo` | string | requerido | Nombre del campo de las properties para colorear |
| `tipo` | string | auto | `'categorical'` o `'numerical'` (auto-detecta si no se especifica) |
| `colores` | array | NEON palette | Array de hex strings para el coloreo |
| `shape` | string | `'circle'` | Forma del swatch en la leyenda: `'fill'`, `'circle'`, `'line'` |
| `legendCat` | string | `'gi'` | ID de categoría en LEGEND donde mostrar los items |

**Ejemplo humedales:**
```javascript
COLOR.aplicar(map, 'humedales', { campo: 'region', shape: 'fill', legendCat: 'humedales' }, data.features);
```

**Ejemplo GI:**
```javascript
COLOR.aplicar(map, 'generadores-industriales', { campo: 'rubro', shape: 'circle', legendCat: 'gi' }, GI_DATA.features);
```

**Retorna:** Objeto `{ campo, tipo, reglas }` para la leyenda.

#### 9.6.2 Detección Automática de Tipo

Si `config.tipo` no se especifica, `COLOR` analiza las primeras 50 features:
- Si >70% de los valores son numéricos → `numerical` (interpolación lineal)
- Si no → `categorical` (match expression)

#### 9.6.3 Paleta Neón por Defecto

19 colores de alto contraste sobre fondo oscuro:

```
#ff007f  #00f0ff  #ffea00  #ff6600  #aa00ff
#00ff88  #ff00ff  #00aaff  #ffaa00  #ff0044
#44ff00  #8844ff  #ff4488  #00ffcc  #ffcc00
#00ccff  #cc00ff  #ff8800  #ff0088
```

**Por qué funcionan:** Alta saturación (100%) + luminancia variable → contraste máximo contra CartoDB Dark Matter. Sin colores apagados que se pierdan en el fondo.

#### 9.6.4 Colores Personalizados

`COLOR.aplicar()` acepta `config.colores` como array de hex strings. Si no se pasa, usa la paleta NEON por defecto.

#### 9.6.5 Integración con Leyenda

- `COLOR.aplicar()` invoca `LEGEND.setItems('gi', items)` y `LEGEND.setVisible('gi', true)` automáticamente.
- `COLOR.limpiar()` limpia la categoría GI de la leyenda.
- Los items se generan como `{label: valor, color: hex, shape: 'circle'}` (un swatch circular por cada rubro).

#### 9.6.6 Coloreo Interactivo (Cambio de Campo)

- `COLOR.cambiarCampo(layerId, campo, features, legendCat)` limpia `_reglas` y re-aplica `COLOR.aplicar()` con el nuevo campo.
- La leyenda genera `<select>` dinámicos dentro de las categorías GI y Humedales con todos los campos disponibles.
- **GI:** `<select id="legend-color-field">` con campos de `GI_DATA.features[0].properties`. Default: `rubro`.
- **Humedales:** `<select id="legend-color-field-humedales">` con campos de `geoData.features[0].properties`. Default: `region`.
- La detección automática `COLOR._esNumerico()` determina si el campo es categórico o numérico (>70% numérico → numerical).
- `config.legendCat` permite que `COLOR.aplicar()` actualice la categoría correcta en LEGEND (no solo 'gi').

#### 9.6.7 Separación KISS

- `COLOR` no modifica el DOM del panel lateral ni de la leyenda — delega en `LEGEND`.
- `COLOR` no depende de `FILTERS`, `BUFFER` ni `INTERSECT`.
- Cada capa puede tener su propia regla de coloreo; `LEGEND` muestra todas las categorías activas.

## 9.7 Módulo de Leyenda Unificada (LEGEND)

- **Propósito:** gestionar una leyenda centralizada en el mapa que muestra la simbología de todas las capas activas (humedales, GI, buffer, intersección, GIs asociados), con categorías colapsables.
- **Posición:** Esquina inferior derecha del mapa (`absolute bottom-4 right-4`).
- **Estilo:** Cyber-hud consistente (`bg-slate-900/95`, borde `border-cyan-500/30`, sombra neón `shadow-[0_0_25px_rgba(6,182,212,0.15)]`). Indicador luminoso cyan en el header.
- **Dimensiones:** Ancho fijo `w-60`, altura máxima `max-h-[70vh]`, con scroll interno.

### 9.7.1 Categorías

| ID | Título | Color | Se muestra cuando |
|----|--------|-------|-------------------|
| `humedales` | HUMEDALES URBANOS | `#22d3ee` | `initApp()` carga humedales |
| `gi` | GENERADORES INDUSTRIALES | `#00f0ff` | `COLOR.aplicar()` en GI |
| `buffer` | ÁREAS DE INFLUENCIA | `#ff00ff` | `BUFFER._mostrarEnMapa()` |
| `intersect` | INTERSECCIÓN | `#00ffcc` | `INTERSECT._mostrarEnMapa()` |
| `gis-asociados` | GIs ASOCIADOS | `#ffff00` | `INTERSECT._mostrarGIAsociados()` |

### 9.7.2 API Pública

```javascript
LEGEND.setItems(catId, items)    // items: [{label, color, shape: 'fill'|'circle'|'line', opacity?}]
LEGEND.setVisible(catId, visible)
LEGEND.toggleAll()               // expande/colapsa todas las categorías
LEGEND.toggleCat(catId)          // expande/colapsa una categoría
```

### 9.7.3 Comportamiento

- **Categorías colapsables:** Cada categoría tiene un header clickeable con chevron ▼/▶. Click expande/colapsa.
- **Estado inicial:** Todas las categorías comienzan colapsadas (`expanded: false`) para maximizar el espacio del mapa en la carga inicial. El botón global de toggle refleja el estado actual mostrando ▶ (colapsado) o ▼ (expandido).
- **Toggle global:** Botón en el header "LEYENDA" expande/colapsa todas las categorías.
- **Auto-ocultación:** Si no hay categorías visibles con items, la leyenda se oculta completamente.
- **Swatches:**
  - `shape: 'fill'` → cuadrado 12×12px con opacidad configurable
  - `shape: 'circle'` → círculo 10×10px (puntos)
  - `shape: 'line'` → línea 16×2px (contornos)
- **Selector de campo interactivo:** Las categorías GI y Humedales renderizan un `<select>` con todos los campos disponibles de sus features respectivas.
  - **GI:** `<select id="legend-color-field">` — campos de `GI_DATA.features[0].properties`. Default: `rubro`.
  - **Humedales:** `<select id="legend-color-field-humedales">` — campos de `geoData.features[0].properties`. Default: `region`.
- **Campo actual:** `LEGEND._colorCampo` (GI) y `LEGEND._colorCampoHumedales` (Humedales) se sincronizan con sus selects y se preservan entre re-renders.

### 9.7.4 Arquitectura

```
LEGEND
├── init()                       → Vincula DOM (legend, legend-body, legend-toggle-all)
├── setItems(catId, items)       → Asigna items a una categoría y re-renderiza
├── setVisible(catId, vis)       → Muestra/oculta una categoría
├── toggleAll()                  → Expande/colapsa todas las categorías
├── toggleCat(catId)             → Expande/colapsa una categoría individual
├── _colorCampo                  → Campo activo de coloreo GI (default: 'rubro')
├── _colorCampoHumedales         → Campo activo de coloreo Humedales (default: 'region')
└── _render()                    → Reconstruye el DOM completo desde CATS (full re-render)
    ├── Si catId='gi'       → Renderiza <select id="legend-color-field"> de campos GI
    └── Si catId='humedales' → Renderiza <select id="legend-color-field-humedales"> de campos humedales
```

- **Full re-render:** `_render()` reconstruye todo el DOM de la leyenda en cada llamada. KISS: sin diffing, sin virtual DOM. El DOM es pequeño (<50 nodos) y solo se reconstruye cuando cambia el estado.
- **Acoplamiento selectivo:** `LEGEND._render()` accede a `GI_DATA` y `COLOR` solo cuando renderiza la categoría GI. Las demás categorías son genéricas.

## 10. Módulo de Geoprocesamiento — Áreas de Influencia (Buffer)

- **Propósito:** Generar buffers paramétricos en metros sobre las entidades del visor (humedales + generadores industriales), con opción de disolver polígonos superpuestos.
- **Dependencia externa:** `Turf.js` v6 (CDN `cdn.jsdelivr.net`) para cálculo geoespacial (`turf.buffer`, `turf.dissolve`). `JSZip` para empaquetado Shapefile.
- **Arquitectura (KISS):** Módulo `BUFFER` con métodos públicos (`generar`, `limpiar`, `exportarGeoJSON`, `exportarSHP`) y privados (`_crearWorker`, `_obtenerFeatures`, `_mostrarEnMapa`, `_guardarCache`, `_cargarCache`).

### 10.1 Ejecución Asíncrona con Lotes

El geoproceso se ejecuta en **lotes de 200 features** encadenados con `setTimeout(fn, 10)` para liberar el hilo principal entre cada lote. El progreso se muestra en la UI en tiempo real (`"123/9283 (1%) ERR:0"`), manteniendo la interfaz fluida incluso durante el procesamiento de ~9.200 features.

**Justificación:** Se evaluó Web Workers inline (Blob URL + `importScripts`), pero presentan restricciones CORS en despliegues estáticos como GitHub Pages. El procesamiento por lotes con `setTimeout` es más simple (KISS), confiable y proporciona feedback visual sin bloquear el navegador.

### 10.2 Control de Contexto (Alcance)

| Opción | Descripción |
|--------|-------------|
| `Filtrados` | Procesa solo las entidades resultantes de los filtros activos (usa `EXPORT.recolectarFeatures()`) |
| `Todos` | Procesa la totalidad de datos cargados en memoria (`geoData` + `GI_DATA`) |

### 10.3 Dissolve (Unión de Polígonos)

Cuando se activa la opción **DISOLVER**, primero se intenta `turf.dissolve()` sobre la FeatureCollection. Si falla o retorna el mismo número de features, se usa `turf.union()` en modo pairwise como fallback, mergeando los polígonos de buffer que se superponen y eliminando bordes internos.

**Límite:** Si hay más de 500 buffers generados, la operación de dissolve se omite y se muestra `"> DEMASIADOS (N) PARA DISOLVER"` para evitar congelar el navegador. El límite protege contra el costo O(n) de `turf.union` pairwise.

### 10.3.1 Traza de Coordenadas Originales (`_origCoordsMap`)

**Problema:** `turf.dissolve()` y `turf.union()` crean nuevas geometrías pero **eliminan las properties** originales. Esto rompe la trazabilidad entre un buffer disuelto y el GI/umbral que lo originó.

**Solución (KISS):** Antes del dissolve, se guarda `_origCoordsList[i]` = coordenadas del feature original `i`. Después del dissolve, se construye `BUFFER._origCoordsMap[dIdx]` = array de coordenadas originales que caen dentro de la feature disuelta `dIdx`, usando `turf.booleanPointInPolygon`:

```
buffered[0] → _origCoordsList[0] = [lonGI, latGI]     (GI buffer)
buffered[1] → _origCoordsList[1] = [lonHum, latHum]   (humedal buffer)
    ↓ dissolve
resultado[0] → _origCoordsMap[0] = [[lonHum, latHum]]  (solo humedal cae dentro)
```

**Persistencia:** `_origCoordsMap` se almacena en IndexedDB bajo la key `buffer-result-coords` junto con el GeoJSON, y se restaura al cargar caché.

### 10.4 Caché con IndexedDB

Los resultados se almacenan en **IndexedDB** (`monitor-humedales.geoprocess`) para:
- Evitar recálculo al navegar entre pestañas
- Permitir exportación sin regenerar
- Persistir entre sesiones del navegador

| Operación | Método |
|-----------|--------|
| Guardar | `_guardarCache(geojson)` — `put()` en store `geoprocess` con key `buffer-result` + `buffer-result-coords` (`_origCoordsMap`) |
| Cargar | `_cargarCache()` — `get()` al inicializar, restaura capa + `_origCoordsMap` si existe |
| Limpiar | `_limpiarCache()` — `delete()` de ambas keys al presionar LIMPIAR |

### 10.5 UI/UX

- **Panel:** Sección "ÁREAS DE INFLUENCIA" dentro del panel lateral, oculta hasta que se carguen datos.
- **Controles:**
  - Input numérico + Select de unidad: Radio con selector de unidad `m` / `km`. En modo metros (100–50.000, default 1.000, step 100). En modo kilómetros (0.1–50, default 1, step 0.1). El valor se convierte a metros antes de pasar a `turf.buffer()`.
  - Select: Alcance (`Filtrados` / `Todos`)
  - Checkbox: `DISOLVER (UNIR POLÍGONOS)`
  - Botones: `GENERAR`, `LIMPIAR`, `GEOJSON`, `SHP ZIP`
- **Spinner:** Durante el procesamiento se muestra progreso en tiempo real: `"⟳ 400/9283 (4%) ERR:0"` con spinner animado.
- **Errores:** Si alguna geometría falla al generar buffer, se muestra el contador de errores y el primer mensaje de error en el estado.
- **Capa resultado:** Semi-transparente fuchsia (`#ff00ff`, opacity 0.2) con borde sólido.
- **Exportación:** Reutiliza `_buildPolygonSHP` y `_buildDBF` del módulo `EXPORT` para generar Shapefile desde la caché. La exportación incluye spinner, `.catch()` en la Promise de JSZip y feedback de error visible en el panel de estado.

### 10.6 Eventos

- `gi-cargado` — Actualiza UI del buffer cuando se carga la capa industrial.
- `filter-change` — Actualiza UI del buffer cuando cambian los filtros.

## 11. Módulo de Intersección Espacial — Arquitectura y Diseño Detallado

### 11.0 Rol y Responsabilidad

**Propósito:** Ejecutar operaciones de intersección espacial entre pares de capas del visor (humedales, generadores industriales, áreas de influencia) para extraer entidades que cumplen condiciones topológicas, y exportar los resultados en formatos interoperables (GeoJSON + Shapefile).

**Responsabilidades del módulo:**
1. Selección dinámica de capas A/B con detección automática de tipo geométrico.
2. Validación rigurosa de CRS (EPSG:4326) con descarte informado de geometrías inválidas.
3. Ejecución asíncrona del geoprocesamiento sin bloquear el hilo principal.
4. Manejo de errores topológicos (geometrías auto-intersectadas, polígonos degenerados).
5. Caché persistente en IndexedDB para evitar recálculos.
6. Renderizado del resultado en el mapa con estilo diferenciado por tipo geométrico.
7. Exportación en GeoJSON y Shapefile (.shp + .shx + .dbf + .prj empaquetados en .zip).

### 11.1 Dependencias Externas y Justificación Metodológica

| Dependencia | Versión | CDN | Propósito | Justificación |
|-------------|---------|-----|-----------|---------------|
| **Turf.js** | v6 | `cdn.jsdelivr.net/npm/@turf/turf@6` | Geoprocesamiento espacial: `turf.intersect`, `turf.booleanPointInPolygon`, `turf.booleanCrosses`, `turf.booleanWithin`, `turf.dissolve`, `turf.union` | Librería geoespacial liviana (~800 KB gzipped) que implementa operaciones topológicas OGC estándar en JS puro. No requiere WASM ni backend. API funcional composable, ideal para arquitectura KISS. Reemplaza a JSTS y Turf v5 por rendimiento y mantenibilidad. Se elige sobre JSTS por tener bindings directos a operaciones booleanas OGC sin necesidad de convertir entre formatos geométricos. |
| **JSZip** | 3.10 | `cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js` | Empaquetado ZIP del Shapefile | Única librería client-side que genera ZIPs compatibles con la especificación PKWARE sin depender del sistema de archivos. Se usa `generateAsync({type:'blob'})` para descarga directa. Alternativa nativa `CompressionStream` descartada por falta de soporte en Safari. |
| **MapLibre GL JS** | latest | `unpkg.com/maplibre-gl` | Renderizado de capa resultado en el mapa | Único motor GL open-source que soporta CSS-like styling expressions. Permite agregar capas de resultado con `map.addLayer()` y estilos dinámicos (`circle-color`, `fill-opacity`, etc.) sin recargar el mapa. |
| **IndexedDB** | nativa | — | Caché persistente de resultados | API de almacenamiento estructurado del navegador. Permite persistir FeatureCollections completas (>10 MB) sin límite de tamaño (vs localStorage con 5 MB). La operación `put()` serializa automáticamente objetos JS, y `get()` los restaura. Se encapsula en `_abrirDB` con manejo de `onupgradeneeded` para crear el object store. |

### 11.2 Arquitectura y Separación de Responsabilidades

El módulo `INTERSECT` implementa el patrón **Módulo JS** (Revealing Module Pattern) con métodos públicos y privados claramente separados:

```
INTERSECT
├── init()                          → Vincula DOM, eventos, carga caché, actualiza opciones
├── _obtenerCapa(key)               → Retorna FeatureCollection aplicando filtros activos si alcance es "Filtrados"
├── ejecutar()                      → Orquesta: validación → detección → geoprocesamiento → finalización
│   ├── _validarFeature(feature)    → Filtra geometrías con CRS inválido (EPSG:4326)
│   ├── _detectarTipo(features)     → Clasifica colección (point / polygon / line) por mayoría
│   ├── lotePointInPoly()           → Punto × Polígono (setTimeout batch 50)
│   ├── lotePolyInPoint()           → Polígono × Punto (setTimeout batch 50)
│   ├── loteIntersect()             → Polígono × Polígono (setTimeout batch 50) — cada HIT obtiene `_bufferIdx = i`
│   ├── loteLineInPoly()            → Línea × Polígono (setTimeout batch 50)
│   └── lotePolyInLine()            → Polígono × Línea (setTimeout batch 50)
├── _finalizarIntersect(resultado)  → Si hay _pendienteC, ejecuta Capa C → cachea, muestra en mapa, feedback UI
│   └── loteC()                     → Segunda pasada: resultado × capaC (linked mode + geometric fallback)
├── _extraerGIAsociados()           → Extrae GIs únicos del resultado (Point directo o via _origCoords/_bufferIdx)
├── _mostrarGIAsociados()           → Resalta GIs en mapa (amarillo #ffff00, borde negro, radio 7)
├── _quitarGIAsociados()            → Elimina capa de GIs asociados
├── exportarGIAsociados()           → Exporta GIs como gis-asociados.geojson
├── limpiar()                       → Limpia mapa, caché, GIs asociados y UI
├── _mostrarEnMapa(geojson)         → Renderiza (circle / fill+outline / line según tipo)
├── _quitarDelMapa()                → Elimina capas del mapa
├── _actualizarUI()                 → Habilita/deshabilita botones + opciones + scope + GIs ASOCIADOS
├── _actualizarOpciones()           → Puebla selects con conteos filtrados o totales según alcance
├── exportarGeoJSON()               → Blob + descarga directa
├── exportarSHP()                   → JSZip + .shp/.shx/.dbf/.prj + .catch()
└── Cache (IndexedDB):
    ├── _abrirDB()                  → Promise<IDBDatabase>
    ├── _guardarCache(geojson)      → put(intersect-result)
    ├── _cargarCache()              → get(intersect-result) → restaura capa
    └── _limpiarCache()             → delete(intersect-result)
```

**Trazabilidad `_bufferIdx`:** Cada feature resultado de polygon×polygon recibe `properties._bufferIdx = i` (índice de la feature A que la generó). Esto permite a Capa C resolver, vía `BUFFER._origCoordsMap[_bufferIdx]`, qué GIs originaron esa intersección — incluso cuando `turf.dissolve` ha destruido las properties originales.

**Separación de responsabilidades:** El geoprocesamiento pesado (bucles anidados de intersección) se ejecuta en lotes asíncronos mediante `setTimeout(fn, 10)`, liberando el hilo principal entre cada lote. Esto evita que la UI se congele durante el proceso. La interfaz (DOM, eventos, feedback) se mantiene en métodos separados (`_actualizarUI`, `_actualizarOpciones`) que no contienen lógica geoespacial.

### 11.3 Operaciones Soportadas

| Capa A (contenedor) | Capa B (recorte) | Operación Lógica | Función Turf.js | Complejidad |
|---------------------|------------------|------------------|-----------------|-------------|
| Punto | Polígono | Punto dentro de polígono (distribución espacial) | `turf.booleanPointInPolygon(P, Poly)` | O(n × m) |
| Polígono | Punto | Polígono contiene punto (inverso) | `turf.booleanPointInPolygon(P, Poly)` invertido | O(n × m) |
| Polígono | Polígono | Intersección geométrica (superposición) | `turf.intersect(A, B)` | O(n × m) — alto costo |
| Línea | Polígono | Línea cruza o está contenida | `turf.booleanCrosses(line, poly) \|\| turf.booleanWithin(line, poly)` | O(n × m) |
| Polígono | Línea | Línea cruza o está contenida (inverso) | `turf.booleanCrosses(line, poly) \|\| turf.booleanWithin(line, poly)` | O(n × m) |

**Nota:** Todas las combinaciones se resuelven autónomamente por `_detectarTipo()` sin intervención del usuario. El usuario solo selecciona capas; el sistema determina qué rama de geoprocesamiento ejecutar.

### 11.4 Validación de Sistema de Coordenadas (CRS)

El módulo valida **obligatoriamente** que todas las coordenadas estén en **EPSG:4326 (WGS84)** con el siguiente criterio:

```javascript
function validarCoordenada(lon, lat) {
    return typeof lon === "number" && typeof lat === "number"
        && isFinite(lon) && isFinite(lat)
        && lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90;
}
```

**Alcance de la validación por tipo geométrico:**

| Tipo | Validación | Comportamiento |
|------|-----------|----------------|
| Point | Coordenada [lon, lat] | Se valida la coordenada individual |
| MultiPoint | Cada punto | `.every()` — todos deben ser válidos |
| Polygon | Cada anillo | Todos los vértices de todos los anillos |
| MultiPolygon | Cada sub-polígono | Todos los vértices de todos los sub-polígonos |
| LineString | Cada vértice | Todos los puntos de la línea |
| MultiLineString | Cada segmento | Todos los puntos de todos los segmentos |

**Qué sucede con features inválidas:**
- Se descartan **silenciosamente** (no se muestran en feedback para evitar ruido).
- Se acumula un contador `invalidos` que se muestra al final: `"| 2 descartadas por CRS"`.
- La validación usa `Array.every()` (no `.some()`) para garantizar que **todas** las coordenadas cumplan, no solo una.

**Justificación de EPSG:4326 sobre 3857:** Los datos fuente están en CRS84 (WGS84 geográfico), que hereda de OGC 1.3. EPSG:3857 (Web Mercator) introduciría distorsión de área en las operaciones de intersección sobre polígonos en latitudes chilenas (17°S a 56°S). `turf.intersect` opera en coordenadas geográficas sin reproyectar, por lo que mantener EPSG:4326 evita errores de buffer y clipping.

### 11.5 Manejo de Errores Topológicos

Cada operación de intersección se ejecuta dentro de un bloque `try/catch` individual. Se manejan los siguientes casos patológicos:

| Caso | Síntoma | Manejo |
|------|---------|--------|
| Geometría auto-intersectada (bow-tie) | `turf.intersect` lanza error | Descarte silencioso del feature + contador `erroresOp++` |
| Polígono degenerado (0 área) | `turf.booleanPointInPolygon` retorna false | No se agrega al resultado (comportamiento esperado) |
| Coordenadas NaN/Infinity | Filtradas por `_validarFeature` antes de llegar a Turf | Descarte + contador `invalidos` |
| Feature sin geometría | `!f.geometry` → descarte inmediato | No llega a Turf |
| Anillos vacíos | `.length === 0` en coordenadas | Filtrado por `_validarFeature` |
| Tipos mixtos en misma capa | `_detectarTipo` elige por mayoría | El tipo minoritario se omite del proceso |

**Feedback al usuario:**
```
> 54 ENTIDADES INTERSECTADAS (3 errores topológicos) | 2 descartadas por CRS
```
Cuando no hay intersección: `> SIN INTERSECCIÓN DETECTADA. Ver casilla informativa [i] para combinaciones recomendadas.` (sin volcar detalles de depuración; estos van a `console.log`).

### 11.6 Ejecución Asíncrona — Aislamiento del Hilo Principal

El geoprocesamiento se ejecuta en **lotes de 50 features por iteración**, encadenados con `setTimeout(fn, 10)`. Esto proporciona un aislamiento práctico del hilo principal sin requerir Web Workers:

```
Ciclo de procesamiento:
  [Lote 0]: features[0..49]  → procesar → setTimeout(fn, 10) → UI update
  [Lote 1]: features[50..99] → procesar → setTimeout(fn, 10) → UI update
  ...
  [Lote N]: features[N..fin] → procesar → finalizar()
```

**Justificación de setTimeout sobre Web Workers:**

Se evaluaron dos enfoques:

| Enfoque | Ventajas | Desventajas | Decisión |
|---------|----------|-------------|----------|
| **Web Worker inline** (Blob URL + importScripts) | Aislamiento real del hilo principal | `importScripts` con URL de CDN externo falla por **CORS** en GitHub Pages (el worker se hospeda en blob:, el script se solicita desde origen cruzado). El worker no tiene acceso al DOM ni a variables globales como `geoData`, `turf`. | ❌ Rechazado |
| **setTimeout batch** | Sin restricciones CORS. Acceso completo a closures y variables globales. Feedbacks en UI en tiempo real. | No es verdadero paralelismo (el hilo principal se usa pero se libera cada 10ms). | ✅ **Seleccionado** |

El lote de 50 features se calibró experimentalmente: lotes mayores (>200) causan micro-congelamientos perceptibles en combinaciones punto×polígono (9.176 puntos × 107 polígonos ≈ 981.832 operaciones). Lotes de 50 mantienen ~16 fps durante el procesamiento.

**Progreso en UI:**
```
⟳ 400/9176 puntos (4%)
```

### 11.7 Selección Dinámica de Capas y Alcance

El usuario selecciona **Alcance** (`Todos los cargados` / `Solo filtrados`), luego **Capa A** (contenedor), **Capa B** (recorte) y opcionalmente **Capa C** desde los `<select>`. Las opciones se actualizan dinámicamente según el alcance y las capas cargadas, excluyendo de Capa B las opciones ya seleccionadas en A, y de Capa C las opciones ya seleccionadas en A y B.

| Capa | Disponible cuando | Tipo detectado |
|------|-------------------|----------------|
| Humedales Urbanos | `geoData` cargado (no nulo) | MultiPolygon → polygon |
| Generadores Industriales | `GI_DATA` cargado (no nulo) | Point → point |
| Áreas de Influencia | `BUFFER.resultado` generado | Polygon/MultiPolygon → polygon |

**Alcance "Solo filtrados":** Cuando se selecciona, `_obtenerCapa(key)` aplica `filter()` sobre los features usando `featureCumple()` con los filtros activos del panel (región, comuna, etc.). Para la capa GI solo se aplican filtros de `region` y `comuna` (los demás campos no existen en sus atributos). Para la capa de **Áreas de Influencia (buffer)** no se aplican filtros de atributos (sus features no heredan el esquema de humedales/GI), por lo que siempre se retorna el conjunto completo. El conteo en los `<select>` refleja el número de features que cumplen los filtros:

```
Ej: "Humedales Urbanos (12 polígonos)"  (de 107 totales, solo 12 en la región filtrada)
```

**Alcance "Todos los cargados":** Usa los datos completos sin filtrar, comportamiento original.

**Validaciones antes de ejecutar:**
1. `selectA.value !== ''` y `selectB.value !== ''`
2. `selectA.value !== selectB.value` (no se permite A = B)
3. `_obtenerCapa(A)` y `_obtenerCapa(B)` retornan FeatureCollection no vacía (conteo > 0)
4. `_detectarTipo` retorna tipo válido para ambas capas
5. La combinación (tipoA × tipoB) tiene una rama de procesamiento implementada

### 11.7.1 Capa C — Segunda Pasada (Linked Mode + Fallback Geométrico)

Cuando se selecciona Capa C, después de completar A×B se ejecuta una segunda pasada `loteC()` que procesa `resultado(A×B) × capaC`:

**Linked mode** (polygon × point): Para cada feature resultado de A×B, resuelve qué GIs la originaron usando la cadena de trazabilidad:

```
resultado[i].properties._bufferIdx
    → BUFFER._origCoordsMap[_bufferIdx]
        → array de coordenadas [lon, lat] originales
            → match exacto contra featuresC[j].geometry.coordinates
```

Esto permite encontrar GIs cuyo **buffer** tocó un humedal, incluso si el GI en sí no está dentro del polígono de intersección (que es el overlap buffer∩humedal).

**Fallback geométrico:** Si `_bufferIdx` no está disponible (cache vieja, tipos mixtos), se usa `turf.booleanPointInPolygon(gi, resultado[i])` como alternativa.

**Bug fix (break prematuro):** El loop externo de linked mode NO debe hacer `break` al encontrar el primer match — debe iterar TODOS los `_origCoords` del dissolve mapping para encontrar TODOS los GIs asociados.

### 11.7.2 GIs Asociados — Resaltado y Exportación

- `_extraerGIAsociados()`: Extrae GIs únicos del resultado final (Point directo, `_origCoords`, o `_bufferIdx` → `_origCoordsMap`).
- `_mostrarGIAsociados()`: Agrega capa de puntos amarillos (`#ffff00`, radio 7, borde negro 2px) sobre el mapa.
- `exportarGIAsociados()`: Exporta la lista como `gis-asociados.geojson`.
- Botón UI "GIs ASOCIADOS" (amarillo), se habilita solo cuando `_giCountCache > 0`.

### 11.8 Caché con IndexedDB

Los resultados se almacenan en la base de datos **`monitor-humedales.geoprocess`** con key `intersect-result`:

| Operación | Método | Implementación |
|-----------|--------|----------------|
| Guardar | `_guardarCache(geojson)` | `put(intersect-result, geojson)` en store `geoprocess` |
| Cargar | `_cargarCache()` | `get(intersect-result)` al inicializar, restaura capa si existe |
| Limpiar | `_limpiarCache()` | `delete(intersect-result)` al presionar LIMPIAR |

**Ventajas de IndexedDB sobre alternativas:**
- **localStorage:** Límite de 5 MB — insuficiente para una FeatureCollection con 9.176 puntos + atributos (~3.5 MB solo para GI).
- **SessionStorage:** No persiste entre pestañas ni sesiones.
- **IndexedDB:** Sin límite práctico (hasta ~50% del disco). Persiste entre sesiones y pestañas. La API asíncrona evita bloqueos.

### 11.9 UI/UX — Flujo de Interacción

```
1. [PANEL OCULTO] → Se detecta carga de datos → panel.classList.remove('hidden')
2. [SELECTS] → _actualizarOpciones() puebla Capa A y Capa B con conteos
   └─ Ej: "Humedales Urbanos (107 polígonos)" | "Generadores Industriales (9176 puntos)"
3. [USUARIO] → Selecciona Capa A ≠ Capa B → se habilita botón EJECUTAR
4. [USUARIO] → Click EJECUTAR
   ├─ Spinner + progreso: "⟳ 400/9176 puntos (4%)"
   ├─ Botones deshabilitados (INTERSECT.ocupado = true)
   └─ Al finalizar:
       ├─ "> 54 ENTIDADES INTERSECTADAS (3 errores topológicos)"
       └─ Se habilita LIMPIAR, GEOJSON, SHP ZIP
5. [USUARIO] → Click GEOJSON → descarga directa
6. [USUARIO] → Click SHP ZIP → spinner "COMPRIMIENDO SHP..." → descarga .zip
```

**Botón [i] de información:** Al lado del título "INTERSECCIÓN ESPACIAL" hay un botón `[i]` que muestra un dropdown con las combinaciones recomendadas:

| Combinación | Capa A | Capa B | Capa C | Descripción |
|-------------|--------|--------|--------|-------------|
| Buffer × Humedal | Áreas de Influencia | Humedales | — | Busca humedales dentro del radio de influencia |
| Buffer × GI | Áreas de Influencia | GI | — | Busca generadores dentro del buffer |
| Buffer × Humedal + GI | Áreas de Influencia | Humedales | GI | Encuentra GIs cuyo buffer toca un humedal |

- Dropdown estilo cyber-hud (`bg-slate-900/95`, borde `border-cyan-500/40`, sombra neón).
- El dropdown se crea dinámicamente en `INTERSECT.init()` mediante `document.createElement()` y se appendea a `document.body`, con `position: fixed` y `z-index: 9999`. Se posiciona vía `getBoundingClientRect()` justo debajo del botón [i], sin quedar recortado por el `overflow-y: auto` del panel de filtros.
- Se cierra automáticamente al hacer clic fuera.
- Alcance recomendado: "Solo filtrados".

**Estados del botón EJECUTAR:**
| Estado | Botón | Razón |
|--------|-------|-------|
| Sin capas cargadas | `disabled` | `!geoData && !GI_DATA && !BUFFER.resultado` |
| Capas seleccionadas A=B | `disabled` | `layerA.value === layerB.value` |
| Capas seleccionadas A≠B | `enabled` | Listo para ejecutar |
| Procesando | `disabled` | `ocupado = true` |
| Resultado en mapa | `disabled` | Ya hay resultado (usar LIMPIAR primero) |

**Estilo de la capa resultado en mapa:**
| Tipo geométrico | Tipo de capa MapLibre | Estilo |
|----------------|----------------------|--------|
| Punto | `circle` | Radio 5px, color `#00ffcc`, opacidad 0.9, borde 1px |
| Polígono | `fill` + `line` | Relleno `#00ffcc` 25% opacidad + borde `#00ffcc` 1.5px 80% |
| Línea | `line` | Color `#00ffcc`, ancho 2px, opacidad 0.9 |

### 11.10 Exportación de Resultados

Ambos formatos operan sobre `INTERSECT.resultado` (FeatureCollection en memoria).

**GeoJSON:**
```javascript
var blob = new Blob([JSON.stringify(INTERSECT.resultado, null, 2)],
    {type: 'application/geo+json'});
var url = URL.createObjectURL(blob);
// <a download="interseccion.geojson" href={url}> → click()
URL.revokeObjectURL(url);
```

**Shapefile (.zip):**
El ZIP contiene archivos separados por tipo de geometría, ya que el formato Shapefile no admite geometrías mixtas:

| Archivo | Contenido | Fuente |
|---------|-----------|--------|
| `intersect-puntos.shp/.shx/.dbf/.prj` | Features Point | `EXPORT._buildPointSHP` + `_buildDBF` + `_buildPRJ` |
| `intersect-poligonos.shp/.shx/.dbf/.prj` | Features Polygon/MultiPolygon | `EXPORT._buildPolygonSHP` + `_buildDBF` + `_buildPRJ` |
| `intersect-lineas.shp/.shx/.dbf/.prj` | Features LineString/MultiLineString | `EXPORT._buildPolylineSHP` + `_buildDBF` + `_buildPRJ` |

**Manejo de errores en exportación:**
- `try/catch` para la serialización síncrona (DataView, buffer allocation)
- `.catch()` en la Promise `zip.generateAsync()` para errores de compresión
- Feedback visible: `"> ERROR: Offset is outside the bounds of the DataView"`
- Spinner animado durante la compresión: `<span class="inline-block animate-spin">&#9696;</span> COMPRIMIENDO SHP...`

### 11.11 Eventos del Sistema

| Evento | Disparado por | Efecto en INTERSECT |
|--------|---------------|---------------------|
| `gi-cargado` | `dibujarCapaIndustrial()` al terminar carga GI | `_actualizarUI()` — muestra opción GI en selects |
| `filter-change` | `applyFilters()` al cambiar filtros | `_actualizarUI()` — actualiza conteos de capas disponibles |

### 11.12 Diagrama de Flujo Completo

```
Inicio
  │
  ├─ init()
  │   ├─ Vincular DOM (panel, selects, botones)
  │   ├─ _cargarCache() → si hay resultado previo en IndexedDB → _mostrarEnMapa()
  │   └─ _actualizarUI() → _actualizarOpciones()
  │
  ├─ [Usuario cambia filtros o se carga GI]
  │   └─ _actualizarUI() → _actualizarOpciones()
  │
  ├─ [Usuario click EJECUTAR]
  │   ├─ Obtener: capaA = _obtenerCapa(A)  (aplica filtros si alcance = "filtered")
  │   │            capaB = _obtenerCapa(B)
  │   │            capaC = _obtenerCapa(C) (si se seleccionó)
  │   ├─ Validar: capas seleccionadas ∧ A≠B≠C ∧ features.length > 0
  │   ├─ _detectarTipo(capaA.features) → tipoA
  │   ├─ _detectarTipo(capaB.features) → tipoB
  │   ├─ _detectarTipo(capaC?.features) → tipoC (si existe)
  │   ├─ Filtrar CRS: capaA.features.filter(_validarFeature)
  │   │                capaB.features.filter(_validarFeature)
  │   │                capaC?.features.filter(_validarFeature)
  │   ├─ Guardar capaC en _pendienteC para segunda pasada
  │   ├─ Ejecutar rama según tipoA × tipoB:
  │   │   ├─ point × polygon → lotePointInPoly(featuresA, featuresB)
  │   │   ├─ polygon × point → lotePolyInPoint(featuresA, featuresB)
  │   │   ├─ polygon × polygon → loteIntersect(featuresA, featuresB)
  │   │   ├─ line × polygon → loteLineInPoly(featuresA, featuresB)
  │   │   └─ polygon × line → lotePolyInLine(featuresA, featuresB)
  │   └─ _finalizarIntersect(resultado)
  │       ├─ ¿Hay _pendienteC y resultado > 0?
  │       │   └─ Sí → loteC(): resultado × capaC
  │       │         ├─ Linked mode: _bufferIdx → BUFFER._origCoordsMap → match coords contra Capa C
  │       │         ├─ Geometric fallback: booleanPointInPolygon(ci, resultado[i])
  │       │         └─ _finalizarIntersect(resultadoC) — recursivo
  │       │             └─ _extraerGIAsociados() → _mostrarGIAsociados() (puntos amarillos)
  │       ├─ _guardarCache(resultado)
  │       ├─ _mostrarEnMapa(resultado)
  │       └─ Feedback UI: "N ENTIDADES INTERSECTADAS | M GIs ASOCIADOS"
  │
  ├─ [Usuario click LIMPIAR]
  │   ├─ resultado = null
  │   ├─ _quitarDelMapa()
  │   ├─ _limpiarCache()
  │   └─ Feedback: "SELECCIONAR CAPAS"
  │
  ├─ [Usuario click GEOJSON]
  │   └─ exportarGeoJSON() → Blob → descarga
  │
  └─ [Usuario click SHP ZIP]
       └─ exportarSHP() → JSZip → .catch() → descarga

## 12. Módulo de Dashboard Interactivo — Propuesta de Visualización

(Analítica — pendiente de validación antes del desarrollo)

### 12.1 Análisis de Atributos y Gráficos Recomendados

**Capa Humedales (107 features):**

| Variable | Tipo | Gráfico | Insight |
|----------|------|---------|---------|
| `ha` (superficie) | Numérica continua | Histograma + barras horizontales por región | Distribución de tamaños, regiones con humedales más grandes |
| `proceso_humedal_urbano` | Categórica (2) | Donut chart | Proporción Municipal vs de Oficio |
| `region` | Categórica (15) | Bar chart horizontal (top 10) | Regiones con mayor concentración |
| `comuna` | Categórica (65) | Bar chart horizontal (top 10) | Comunas con más humedales |

**Capa Generadores Industriales (9.176 features):**

| Variable | Tipo | Gráfico | Insight |
|----------|------|---------|---------|
| `rubro` | Categórica (19) | Bar chart horizontal | Rubros industriales predominantes |
| `total_toneladas` | Numérica continua | Barras por región + histograma | Distribución de residuos |
| `declaraciones` | Numérica discreta | Barras por región | Frecuencia de declaración |
| `total_toneladas` vs `declaraciones` | Numérica × Numérica | Scatter plot | Detección de outliers |

### 12.2 Layout Propuesto — Dashboard Compacto Inferior Colapsable

Para no restar protagonismo al mapa (75% ancho), los gráficos se ubican en una franja horizontal en la parte inferior del contenedor principal, **colapsable mediante toggle**:

```
┌───────────────────────────────────────────────────┐
│                      MAPA                          │
│                                                    │
│                                                    │
│  ┌── Dashboard [▼] ─────────────────────────────┐ │
│  ├──────────┬──────────────┬────────────────────┤ │
│  │ Humed.   │ Proceso      │ Top Rubros         │ │
│  │ x Región │ (Donut)      │ GI (barras)        │ │
│  └──────────┴──────────────┴────────────────────┘ │
└───────────────────────────────────────────────────┘
```

- **Toggle handle:** Barra horizontal de ~24px en la parte superior del dashboard con texto `DASHBOARD` y chevron `▼`. Click colapsa/expande los gráficos.
- **Expandido:** 3 slots de chart de 160px de alto, cada uno con toolbar de tabs en la parte superior (14px) para cambiar entre vistas.
- **Colapsado:** Los charts se ocultan (`height: 0`, `overflow: hidden`), el mapa ocupa el 100% vertical restante. El chevron rota 180° indicando que se puede expandir.
- **Toolbars:** Cada chart container tiene un toolbar interno (`#tb-region`, `#tb-proceso`, `#tb-rubros`) con `position: absolute` y botones de 6px font que permiten cambiar interactivamente el tipo de gráfico mostrado. El botón activo se resalta con `bg-cyan-900/40 text-cyan-300 border-cyan-500/50`.
- **Transición:** `transition-all duration-300 ease-in-out` en el contenedor de charts para animación suave.
- **Resize automático:** Al colapsar/expandir se llama `map.resize()` y `CHART._resize()` después de 350ms para que MapLibre y ECharts recalculen sus dimensiones.
- **Decoraciones de esquina:** Posicionadas dentro del `#map` (no del `main`), usando `absolute bottom-6` para que siempre marquen el marco del mapa independientemente del estado del dashboard.

### 12.3 Selección de Librería: ECharts

| Criterio | ECharts | Chart.js | Decisión |
|----------|---------|----------|----------|
| Bundle (CDN gzip) | ~300 KB | ~60 KB | ✅ Chart.js |
| Tipos de gráfico | 20+ (scatter, boxplot, parallel, heatmap) | 8 (bar, doughnut, scatter, line) | ✅ **ECharts** |
| Rendimiento 9k+ puntos | Canvas batch optimizado | Lento >5k puntos | ✅ **ECharts** |
| Dark theme nativo | `echarts.init(dom, 'dark')` | Plugin externo | ✅ **ECharts** |
| Click events | `chart.on('click', fn)` con datos | `chart.onClick` | ✅ Ambos |
| API funcional | `setOption()` re-render total (KISS) | `update()` mutaciones | ✅ Ambos |

**Veredicto: ECharts** — rendimiento superior con 9k+ puntos, dark theme nativo coherente con cyber-hud, y variedad de gráficos (scatter, boxplot).

CDN: `https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js`

### 12.4 Arquitectura Cross-Filtering (KISS)

```
  ┌──────────┐   filter-change   ┌──────────┐
  │  MAP     │ ────────────────→ │  CHARTS  │
  │ (Filtros)│ ←──────────────── │(gráficos)│
  └──────────┘   chart-filter    └──────────┘
```

Módulo `CHART` (Revealing Module Pattern):

```javascript
var CHART = {
    containers: {},  instancias: {},

    init: function() {
        window.addEventListener('filter-change', CHART._actualizarTodos);
        // chart.on('click', ...) → dispatches 'chart-filter'
        window.addEventListener('chart-filter', CHART._aplicarFiltroDesdeGrafico);
    },

    _obtenerDatosFiltrados: function() {
        // Reutiliza featureCumple() + filtrosActivos() existentes
        // Sin lógica de filtrado duplicada
    },

    _actualizarTodos: function() {
        // Filtra datos con featureCumple(), llama setOption() en cada instancia
    },

    _aplicarFiltroDesdeGrafico: function(e) {
        // e.detail = { campo: 'region', valor: 'Metropolitana' }
        FILTERS[e.detail.campo].value = e.detail.valor;
        applyFilters();
    }
};
```

**Principios KISS:**
1. Reutiliza `featureCumple()` + `filtrosActivos()` existentes — cero duplicación
2. Escucha evento `filter-change` ya existente — sin nuevo event bus
3. `setOption()` completo en cada actualización — sin diffing ni estado compartido
4. Click en chart → evento `chart-filter` → `applyFilters()` actualiza mapa + charts

### 12.5 Herencia de Diseño (Cyber-HUD)

```javascript
let chart = echarts.init(dom, 'dark');
chart.setOption({
    backgroundColor: 'transparent',
    grid: { show: false, containLabel: true, borderWidth: 0 },
    xAxis: {
        axisLine: { lineStyle: { color: '#22d3ee' } },
        axisLabel: { color: '#67e8f9', fontFamily: 'monospace', fontSize: 9 }
    },
    yAxis: {
        axisLabel: { color: '#67e8f9', fontFamily: 'monospace', fontSize: 9 }
    },
    tooltip: {
        backgroundColor: 'rgba(15,23,42,0.95)',
        borderColor: '#06b6d4',
        textStyle: { color: '#22d3ee', fontFamily: 'monospace', fontSize: 10 }
    }
});
```

- Sin grid vertical, sin leyenda redundante, sin bordes de gráfico (máximo data-ink ratio)
- Tooltip con fondo oscuro y borde cyan (idéntico al popup hover del mapa)
- Tipografía monoespaciada en ejes

### 12.6 Gráficos Multi-View (Fase 1 — 12 vistas en 3 slots)

Cada slot del dashboard tiene una toolbar con tabs que permite cambiar entre 4 vistas diferentes. Total: 12 visualizaciones distintas.

| Slot | Tab | Tipo ECharts | Métrica | Cross-filter | Prioridad |
|------|-----|--------------|---------|--------------|-----------|
| 1 — Humedales | **CUENTA** | `bar` horiz. | top 10 regiones por conteo | `FILTERS.region` | P0 |
| 1 — Humedales | **HA** | `bar` horiz. | top 10 regiones por suma ha | `FILTERS.region` | P0 |
| 1 — Humedales | **COMUNA** | `bar` horiz. | top 10 comunas por conteo | `FILTERS.comuna` | P0 |
| 1 — Humedales | **STACK** | `bar` apilada horiz. | top 8 regiones × proceso (Municipal/De Oficio) | `FILTERS.region` | P0 |
| 2 — Proceso | **DONUT** | `pie` donut | conteo por proceso | `FILTERS.proceso` | P0 |
| 2 — Proceso | **HA** | `pie` donut | suma ha por proceso | `FILTERS.proceso` | P0 |
| 2 — Proceso | **HIST HA** | `bar` vertical | histograma de ha (5 buckets predefinidos) | `FILTERS.ha` | P0 |
| 2 — Proceso | **AÑOS** | `bar` vertical | conteo por año (desde resolución) | solo lectura | P0 |
| 3 — GI | **TON.** | `bar` horiz. | top 10 rubros por suma toneladas | solo lectura | P0 |
| 3 — GI | **DECL.** | `bar` horiz. | top 10 rubros por suma declaraciones | solo lectura | P0 |
| 3 — GI | **CANT.** | `bar` horiz. | top 10 rubros por cantidad de establecimientos | solo lectura | P0 |
| 3 — GI | **REG x T** | `bar` horiz. | top 10 regiones por suma toneladas | `FILTERS.region` | P0 |

### 12.7 Eventos

| Evento | Origen | Efecto |
|--------|--------|--------|
| `filter-change` | Filtros del panel o `applyFilters()` | `CHART._renderTodos()` — re-renderiza los 3 slots con datos filtrados |
| Click en toolbar tab | Toolbar del slot | `CHART._switchView(slot, key)` — cambia vista y re-renderiza ese slot |
| Click en elemento de chart | Serie del gráfico | `FILTERS[campo].value = valor` + `applyFilters()` solo en slots con cross-filter

### 12.8 Fase de Implementación (post-validación)

1. Agregar CDN de ECharts en `<head>`
2. Agregar contenedores de gráficos en HTML (franja inferior del mapa)
3. Implementar módulo `CHART` con `init`, `_obtenerDatosFiltrados`, `_actualizarTodos`, `_aplicarFiltroDesdeGrafico`
4. Renderizar gráficos P0 (3 charts)
5. Vincular eventos cross-filtering bidireccional

### 12.9 Dashboard Colapsable (3 Estados — Colapsado / Normal / Expandido)

El dashboard tiene **3 estados de altura** controlados por `CHART._collapsed` y `CHART._expanded`:

| Estado | `_collapsed` | `_expanded` | Altura `#dashboard-body` | Chevron | Indicador |
|--------|:---:|:---:|---|---|---|
| **Colapsado** | `true` | `false` | `height: 0` | `rotate(180deg)` ▼→▲ | Click toggle expande a normal |
| **Normal** | `false` | `false` | `height: 160px` | sin rotar ▼ | Estado por defecto |
| **Expandido** | `false` | `true` | `70vh` (max `700px`) | `rotate(270deg)` ▼→◀ (apunta derecha) | Botón `⛶` en toggle bar |

- **Handle:** `#dashboard-toggle` — barra horizontal clickeable en la parte superior del dashboard. Estilo `bg-slate-900/60`, `hover:bg-cyan-950/20`.
- **Chevron:** `#dashboard-chevron` — rota 180° en colapsado, 270° en expandido vía `transform`.
- **Botón Expandir (`#dashboard-maximize`):** Icono `⛶`. Alterna `CHART._expanded`. Si estaba colapsado, primero restaura a normal.
- **Contenedor:** `#dashboard-body` — transición CSS `transition-all duration-300 ease-in-out` en `height`.
- **Toggle JS:**
  - `CHART._toggleDashboard()`: Si está expandido → vuelve a normal (160px). Si no → alterna colapsado (0 ↔ 160px).
  - `CHART._toggleExpand()`: Si colapsado → restaura normal. Alterna expandido (160px ↔ 70vh/700px). Setea chevron 270° en expandido.
  - `CHART._setBodyHeight(h)`: Setter genérico que actualiza `_bodyHeight`, ajusta altura del DOM, y tras 350ms llama `map.resize()` + `CHART._resize()` + `CHART._renderTodos()`.
- **Resize:** Llama `map.resize()` + `CHART._resize()` tras 350ms para que mapa y charts (incluyendo toolbars via `_rebuildToolbars()`) recalculen dimensiones.

### 12.10 Arquitectura Multi-View

- **Estado:** `CHART._views = { region: 'cuenta', proceso: 'donut', rubros: 'toneladas' }` — almacena la vista activa de cada slot.
- **Toolbar builder:** `CHART._buildToolbar(slot)` — recibe el id del slot, crea botones `<button>` en `#tb-{slot}` usando `CHART._toolbarTpl[slot]` (array de `{key, label}`). Marca el botón activo según `CHART._views[slot]`. Estilo cyber-hud compacto: 6px font, uppercase, tracking-wider.
- **Switch view:** `CHART._switchView(slot, key)` — actualiza `_views[slot]`, reconstruye toolbar, re-renderiza ese slot con los datos filtrados actuales.
- **Render dispatch:** Cada `_renderHumedalesRegion`, `_renderProceso`, `_renderGIRubros` es un dispatcher que lee `CHART._views[slot]` y ejecuta el branch correspondiente (`if view === 'cuenta' {...} else if view === 'ha' {...}`).
- **Click handlers:** Cada branch registra `inst.on('click', fn)` específico para esa vista, usando `inst.off('click')` previo para evitar acumulación de listeners.
- **Datos:** Todos los branches reciben `features` ya filtrados por `_datosFiltrados()` (reutiliza `featureCumple` + `filtrosActivos`).
- **Grid layout:** `grid.top: 22` en charts de barras para dejar espacio al toolbar (14px) + título implícito. En donuts no se necesita grid (el pie se centra automáticamente).
- **Paletas diferenciadas por vista:** Cada vista usa un gradiente lineal distinto (cyan, teal, azul, violeta, rosa, etc.) para que el cambio de vista sea visualmente evidente.

### 12.11 Escalado Dinámico de Fuentes

Para mantener la legibilidad tanto en modo normal (160px) como expandido (70vh), los tamaños de fuente se escalan dinámicamente según la altura del dashboard:

- **Escala base:** `_scale() = clamp(0.7, bodyHeight / 160, 1.5)`
  - A 160px (normal): `scale = 1.0` — fuentes en tamaño base
  - A 240px+: `scale = 1.5` (capped) — fuentes 1.5× más grandes
  - A <112px (transición colapsado): `scale = 0.7` (capped)
- **Función de escalado:** `_fs(base) = Math.round(base × _scale())` — aplica el factor a cualquier valor base.
- **Uso en charts:** Todos los `fontSize` en opciones de ECharts (labels de ejes, tooltips, labels de serie, leyenda) usan `CHART._fs(7)` o `CHART._fs(9)` en lugar de valores fijos.
- **Toolbar buttons:** Los botones de las toolbars (`#tb-region`, `#tb-proceso`, `#tb-rubros`) usan `btn.style.fontSize = CHART._fs(6) + 'px'` en lugar de la clase fija `text-[6px]`.
- **Reconstrucción en resize:** `CHART._rebuildToolbars()` reconstruye las toolbars en cada `CHART._resize()`, asegurando que los botones se redimensionen al expandir/colapsar el dashboard o el panel lateral.

### 12.12 Despliegue — GitHub Pages

- **Repositorio:** `github.com/dgeoiacl/urban-wetlandMS-cl`
- **URL pública:** `https://dgeoiacl.github.io/urban-wetlandMS-cl/`
- **Activación:** Vía API de GitHub (`gh api repos/:owner/:repo/pages --method POST`), con fuente `{branch: "main", path: "/"}`.
- **Archivos publicados:** `index.html`, `README.md`, `.gitignore`.
- **Arquitectura:** Sin build step — el `index.html` funciona directamente desde la raíz del repositorio gracias a que todas las dependencias (Tailwind, MapLibre, ECharts, Turf.js, JSZip) se cargan vía CDN.
- **Datos embebidos:** Los GeoJSON de humedales (107 features) y generadores industriales (9.176 features) están incrustados como variables JS en el HTML, no requieren archivos externos ni servidor.
- **Control de versiones:** Git + GitHub. Commits con prefijo convencional (`feat:`, `fix:`, `docs:`). Rama `main` como fuente de Pages.

## 13. Responsividad — Adaptación a Móviles (< 1024px)

El layout se adapta a pantallas menores a 1024px usando `flex-col lg:flex-row` en el body y media queries en un bloque `<style>`, sin duplicar DOM.

### 13.1 Bottom Sheet (Panel Lateral)

| Estado | Descripción | CSS |
|--------|-------------|-----|
| **Peek** (defecto) | Panel oculto salvo el handle de 44px en la parte inferior | `transform: translateY(calc(100% - 44px))` |
| **Open** | Panel deslizado hacia arriba (máx 70vh) | `transform: translateY(0)` |

- **Handle:** Barra horizontal dentro del `<aside>` con clase `panel-handle`. Visible solo en móvil (`hidden lg:hidden` → `display:flex` vía media query). Contiene dos líneas decorativas + texto "Panel de Control". Al hacer clic, alterna `mobile-open` en `#side-panel`.
- **Backdrop:** `<div id="panel-backdrop">` fijo con `background: rgba(0,0,0,0.6)` y `backdrop-filter: blur(2px)`. Aparece con transición de opacidad al abrir el panel. Al hacer clic, cierra el panel.
- **FAB:** Botón flotante `#panel-fab` (☰) en la esquina inferior izquierda del mapa, visible solo en móvil (`display:none` → `flex` vía media query). También alterna el panel.
- **Transición:** `transform .35s cubic-bezier(.4,0,.2,1)` — alto rendimiento por usar `transform` y `opacity`, no layout.

### 13.2 Desktop Toggle

En desktop (≥1024px), el botón `#panel-toggle` (◀/▶) en el borde entre panel y main sigue funcionando como antes. En móvil se oculta (`display:none!important`).

### 13.3 Dashboard en Móvil

- Altura reducida a `120px` (`#dashboard-body{height:120px!important}`) para dejar más espacio al mapa.
- Dashboard expansible funciona igual (3 estados), pero la altura base es menor.
- El toggle `#dashboard-toggle` y botón ⛶ siguen activos.
- `map.resize()` se llama al cambiar orientación o alternar cualquier panel.

### 13.4 `map.resize()` Obligatorio

Cada apertura/cierre de panel (desktop o móvil) ejecuta `map.resize()` + `CHART._resize()` después de 350ms para evitar desfases del canvas. También hay un listener global `window.addEventListener('resize', ...)` que ejecuta ambos resize en cada cambio de viewport.

### 13.5 Principios KISS Aplicados

- **0% duplicación de DOM** — el mismo `<aside>` sirve para desktop y móvil
- **Solo CSS + JS ligero** — 3 media queries, 4 event listeners, 1 función toggle
- **Sin librerías externas** — bottom sheet nativo con transform CSS
- **Rendimiento** — `transform` y `opacity` son propiedades que no disparan layout ni paint completos (compositor-only en Chromium y WebKit)
```
