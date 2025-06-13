@echo off
cd /d "%~dp0"
echo Starting Math Quiz Generator...

echo Starting backend...
start "Backend" cmd /c "cd /d "%~dp0backend" && python app.py && pause"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo Starting frontend...
start "Frontend" cmd /c "cd /d "%~dp0frontend" && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Wait for both windows to show "ready" messages, then open:
echo http://localhost:3000
echo.
echo Close this window after both servers start successfully.
pause