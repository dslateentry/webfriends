# ============================================
# WebFRIENDS - Script auxiliar
# Uso: .\actualizar_mds.ps1
# o:   pwsh -File actualizar_mds.ps1
# ============================================
# Este script NO edita los .md automáticamente.
# Sirve como ayuda-memoria y abre los archivos
# para revisión manual si se desea.
# ============================================
# La actualización real de los .md la hace
# el agente IA con el prompt:
#   "actualiza los 4 .md con <descripción de cambios>"
# ============================================

param(
  [switch]$abrir,
  [switch]$status,
  [switch]$help
)

$root = "C:\WEBFRIENDS"

$archivos = @(
  @{Nombre="sesion.md";   Desc="Registro de conversación y código generado"},
  @{Nombre="contrato.md"; Desc="Contexto, rol, restricciones y arquitectura"},
  @{Nombre="manual.md";   Desc="Manual paso a paso de aprendizaje"},
  @{Nombre="plan.md";     Desc="Plan de construcción, stack, features"}
)

function Mostrar-Status {
  Write-Host "`n============================================" -ForegroundColor Cyan
  Write-Host "  WebFRIENDS - Estado de archivos .md" -ForegroundColor Cyan
  Write-Host "============================================`n" -ForegroundColor Cyan

  foreach ($f in $archivos) {
    $ruta = Join-Path $root $f.Nombre
    if (Test-Path $ruta) {
      $tamano = (Get-Item $ruta).Length
      $lineas = (Get-Content $ruta | Measure-Object -Line).Lines
      $mod = (Get-Item $ruta).LastWriteTime.ToString("yyyy-MM-dd HH:mm")
      Write-Host " [$($f.Nombre)]" -ForegroundColor Green -NoNewline
      Write-Host " ${lineas} líneas | ${tamano} bytes | $mod"
      Write-Host "   $($f.Desc)" -ForegroundColor Gray
    } else {
      Write-Host " [$($f.Nombre)]" -ForegroundColor Red -NoNewline
      Write-Host " NO EXISTE" -ForegroundColor Red
    }
  }

  Write-Host "`n--------------------------------------------" -ForegroundColor DarkGray
  Write-Host "Prompt para actualizar los 4 .md:" -ForegroundColor Yellow
  Write-Host '  "actualiza los 4 .md con <descripción de cambios>"' -ForegroundColor White
  Write-Host "--------------------------------------------`n" -ForegroundColor DarkGray
}

function Abrir-Archivos {
  foreach ($f in $archivos) {
    $ruta = Join-Path $root $f.Nombre
    if (Test-Path $ruta) {
      Start-Process $ruta
    }
  }
}

function Mostrar-Help {
  Write-Host "`nWebFRIENDS - Comandos disponibles:`n" -ForegroundColor Cyan
  Write-Host "  .\actualizar_mds.ps1           Muestra estado de los 4 .md" -ForegroundColor White
  Write-Host "  .\actualizar_mds.ps1 -status   Igual que arriba" -ForegroundColor White
  Write-Host "  .\actualizar_mds.ps1 -abrir    Abre los 4 .md en editor" -ForegroundColor White
  Write-Host "  .\actualizar_mds.ps1 -help     Muestra esta ayuda" -ForegroundColor White
  Write-Host ""
  Write-Host "Para actualizar el contenido de los .md, dile al agente IA:" -ForegroundColor Yellow
  Write-Host '  "actualiza los 4 .md"' -ForegroundColor White
  Write-Host "  (el agente actualizará según los cambios realizados)`n" -ForegroundColor Gray
}

# --- EJECUCIÓN PRINCIPAL ---
if ($help) {
  Mostrar-Help
} elseif ($abrir) {
  Abrir-Archivos
} elseif ($status -or (-not ($abrir -or $help))) {
  Mostrar-Status
}
