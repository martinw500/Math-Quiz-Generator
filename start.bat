@echo off
cd /d "%~dp0"
echo.
echo ============================================
echo     Math Quiz Generator - Setup & Start
echo ============================================
echo.

REM Check if this is first-time setup
if not exist "frontend\node_modules" (
    echo 🔧 First time setup detected...
    goto :setup
)

REM Quick dependency check
echo 🔍 Quick system check...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found! Please install from python.org
    pause
    exit /b 1
)

node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found! Please install from nodejs.org
    pause
    exit /b 1
)

echo ✅ Dependencies look good!
echo.
goto :start

:setup
echo.
echo 📦 Installing dependencies...
echo.

echo Installing Python dependencies...
cd backend
pip install flask flask-cors
if errorlevel 1 (
    echo ❌ Failed to install Python dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo Installing React dependencies...
cd frontend
npm install
if errorlevel 1 (
    echo ❌ Failed to install Node dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo ✅ Setup complete!
echo.

:start
echo 🚀 Starting Math Quiz Generator...
echo.

echo Starting backend server...
start "Math Quiz Backend" /d "%~dp0backend" cmd /c "python app.py && pause"

echo Waiting 5 seconds for backend to initialize...
timeout /t 5 /nobreak > nul

echo Starting frontend server...
start "Math Quiz Frontend" /d "%~dp0frontend" cmd /c "npm start && pause"

echo.
echo ============================================
echo     Servers Starting...
echo ============================================
echo 🔗 Backend:  http://localhost:5000
echo 🌐 Frontend: http://localhost:3000
echo 📱 Online:   https://martinw500.github.io/Math-Quiz-Generator
echo.
echo ⏳ Wait for both windows to show "ready" messages
echo 🌐 Then open: http://localhost:3000
echo.
echo ℹ️  Close this window after both servers start successfully
echo ============================================
pause
