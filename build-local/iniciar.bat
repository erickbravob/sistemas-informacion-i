@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if errorlevel 1 (
  echo Python 3 no esta instalado o no esta disponible en PATH.
  echo Instala Python 3 y vuelve a abrir iniciar.bat.
  pause
  exit /b 1
)
py -3 server.py
if errorlevel 1 (
  echo El espacio local no pudo iniciarse.
  pause
)
