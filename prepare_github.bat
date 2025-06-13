@echo off
echo 🚀 Preparing Math Quiz Generator for GitHub...

cd /d "%~dp0"

echo.
echo 📋 Checking Git status...
git status

echo.
echo 📦 Adding all files...
git add .

echo.
echo 💬 Creating commit...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Initial commit: Math Quiz Generator with React frontend and Python backend

git commit -m "%commit_message%"

echo.
echo 🌐 GitHub setup instructions:
echo.
echo 1. Go to GitHub.com and create a new repository named "math-quiz-generator"
echo 2. Copy the repository URL (should look like: https://github.com/yourusername/math-quiz-generator.git)
echo 3. Run the following commands:
echo.
echo    git remote add origin YOUR_REPOSITORY_URL
echo    git branch -M main
echo    git push -u origin main
echo.
echo ✅ Your code is ready for GitHub!
echo.
echo 📝 Don't forget to:
echo - Update README.md with your GitHub username
echo - Add screenshots to the screenshots/ folder
echo - Update the LICENSE file with your name
echo.
pause
