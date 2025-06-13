@echo off
cd /d "%~dp0"
echo Setting up Math Quiz Generator...

echo.
echo Installing Python dependencies...
cd backend
pip install flask flask-cors
cd ..

echo.
echo Installing React dependencies...
cd frontend
npm install
cd ..

echo.
echo Setup complete!
echo.
echo To run the application, double-click 'start_both.bat'
pause