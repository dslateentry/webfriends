@echo off
title WebFRIENDS
echo Iniciando WebFRIENDS...
echo.
echo ========================================
echo   WebFRIENDS se abrira en tu navegador
echo   Si no se abre, ve a:
echo   http://localhost:8080
echo ========================================
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0WebFRIENDS.ps1"
pause
