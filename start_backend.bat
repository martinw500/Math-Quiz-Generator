@echo off
cd /d "%~dp0"
echo Starting Python Flask Backend...
cd backend
python app.py
pause