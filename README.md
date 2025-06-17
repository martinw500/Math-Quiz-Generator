# Math Quiz Generator

**Live Webpage**: [https://martinw500.github.io/Math-Quiz-Generator](https://martinw500.github.io/Math-Quiz-Generator)

A modern web-based math quiz application with a React frontend and Python Flask backend.

## Features

- 🎯 **10 Difficulty Levels** with intelligent operation selection
  - Levels 1-3: Basic addition & subtraction with smaller numbers
  - Levels 4-5: Multiplication & division automatically included and enforced
  - Levels 6-7: Square roots & exponents automatically included and enforced
  - Levels 8-10: Expert level with all operations and maximum complexity
- 🔢 Variable number of questions (5-25)
- ➕ Basic operations: Addition, Subtraction
- ✖️ Advanced operations: Multiplication, Division
- 🔺 Complex operations: Square roots, Exponents
- 🧠 Smart difficulty scaling - Higher difficulties favor complex operations
- 📊 Real-time progress tracking

## Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Styled Components** - CSS-in-JS styling
- **MathJax** - Mathematical notation rendering
- **Frontend Quiz Logic** - Self-contained quiz generation for GitHub Pages deployment

### Backend
- **Python 3.8+** - Core language
- **Flask** - Lightweight web framework
- **Flask-CORS** - Cross-origin resource sharing

### Deployment
- **GitHub Actions** - Automated deployment to GitHub Pages
- **Dual Mode** - Works both locally (full-stack) and online (frontend-only)

## 🌐 Online Version

This project is automatically deployed to GitHub Pages via GitHub Actions:

- **Live Site**: [martinw500.github.io/Math-Quiz-Generator](https://martinw500.github.io/Math-Quiz-Generator)
- **Auto-Deployment**: Automatically updates when you push to the `main` branch
- **Process**: GitHub Actions builds the React app and deploys it to GitHub Pages
- **Frontend-Only**: Runs entirely in the browser using JavaScript quiz logic

The online version mirrors all functionality of the local version but doesn't require any installation.

## Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download here](https://python.org/)

### Quick Start (Windows)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/martinw500/Math-Quiz-Generator.git
   cd Math-Quiz-Generator
   ```

2. **One-click setup and start:**
   ```bash
   start.bat
   ```
   *This automatically detects first-time setup, installs dependencies, and starts both servers*

3. **Access the application:**
   - Local: http://localhost:3000
   - Online: https://martinw500.github.io/Math-Quiz-Generator

### Development Mode
```bash
dev.bat
```
*Choose to start backend only, frontend only, or quit - meant for development*

### Manual Setup

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Usage

1. **Configure your quiz:**
   - Set difficulty level (1-10)
     - **Levels 1-3**: Basic addition & subtraction only
     - **Levels 4-5**: Multiplication & division automatically enforced (checkboxes auto-checked and disabled)
     - **Levels 6-7**: Square roots & exponents automatically enforced (checkboxes auto-checked and disabled)
     - **Levels 8-10**: Expert level with maximum complexity and all operations enforced
   - Choose number of questions (5-25)
   - Manual operation selection available only at lower difficulty levels

2. **Take the quiz:**
   - Answer each math question
   - Get instant feedback
   - Track your progress

3. **View results:**
   - See your score and percentage
   - Get encouraging feedback
   - Take another quiz

## Troubleshooting

### Windows PowerShell Execution Policy Issues

If you encounter errors when running the setup or start scripts, you may need to adjust your PowerShell execution policy:

1. **Open PowerShell as Administrator:**
   - Right-click on PowerShell and select "Run as Administrator"

2. **Check current execution policy:**
   ```powershell
   Get-ExecutionPolicy
   ```

3. **If the policy is "Restricted", enable script execution:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
   ```

4. **Alternative: Run batch files directly from Command Prompt:**
   - Open Command Prompt (cmd) instead of PowerShell
   - Navigate to the project folder and run the `.bat` files

### Common Issues

- **"Python not found"**: Make sure Python is installed and added to your system PATH
- **"Node.js not found"**: Make sure Node.js is installed and added to your system PATH  
- **Port already in use**: Close any applications using ports 3000 or 5000
- **Dependencies fail to install**: Try running as administrator or check your internet connection
- **Servers won't start**: Run `dev.bat` to start servers individually for better error diagnosis


## Project Structure

```
Math-Quiz-Generator/
├── backend/
│   ├── app.py              # Flask server
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # React entry point
│   │   ├── components/
│   │   │   ├── QuizSetup.js   # Quiz configuration
│   │   │   ├── QuizGame.js    # Quiz gameplay
│   │   │   ├── Results.js     # Results display
│   │   │   └── MathExpression.js # Math rendering
│   │   └── utils/
│   │       └── quizGenerator.js # Frontend quiz logic
│   └── package.json       # Node.js dependencies
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions auto-deployment
├── start.bat              # One-click setup and start (combines old setup + start scripts)
├── dev.bat                # Development mode (start individual servers)
├── DEPLOYMENT.md          # Deployment guide
├── .gitignore            # Git ignore rules
├── LICENSE               # MIT License
└── README.md             # This file
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made by Martin
