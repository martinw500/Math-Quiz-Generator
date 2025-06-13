@echo off
cd /d "%~dp0"
echo Checking your setup...
echo.

echo Checking Python...
python --version 2>nul
if errorlevel 1 (
    echo ❌ Python not found! Install from python.org
) else (
    echo ✅ Python found
)

echo.
echo Checking Node.js...
node --version 2>nul
if errorlevel 1 (
    echo ❌ Node.js not found! Install from nodejs.org
) else (
    echo ✅ Node.js found
)

echo.
echo Checking NPM...
npm --version 2>nul
if errorlevel 1 (
    echo ❌ NPM not found! Install Node.js from nodejs.org
) else (
    echo ✅ NPM found
)

echo.
echo Checking folders...
if exist "backend\app.py" (
    echo ✅ Backend folder exists
) else (
    echo ❌ Backend folder missing
)

if exist "frontend\package.json" (
    echo ✅ Frontend folder exists
) else (
    echo ❌ Frontend folder missing
)

if exist "frontend\node_modules" (
    echo ✅ Node modules installed
) else (
    echo ❌ Node modules missing - run setup.bat first
)

echo.
echo If you see any ❌, fix those issues first!
pause
