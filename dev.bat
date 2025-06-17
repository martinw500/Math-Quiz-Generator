@echo off
cd /d "%~dp0"
echo.
echo ============================================
echo     Math Quiz Generator - Development Only
echo ============================================
echo.

set /p choice="Start [B]ackend, [F]rontend, or [Q]uit? "

if /i "%choice%"=="B" goto :backend
if /i "%choice%"=="F" goto :frontend
if /i "%choice%"=="Q" goto :end
echo Invalid choice. Please enter B, F, or Q.
pause
goto :end

:backend
echo.
echo 🐍 Starting Python Flask Backend only...
cd backend
python app.py
pause
goto :end

:frontend
echo.
echo ⚛️ Starting React Frontend only...
cd frontend
npm start
pause
goto :end

:end
