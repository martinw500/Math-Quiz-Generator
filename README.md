# Math Quiz Generator

🎉 **Live Demo**: [https://martinw500.github.io/Math-Quiz-Generator](https://martinw500.github.io/Math-Quiz-Generator)

A modern web-based math quiz application with a React frontend and Python Flask backend.

## Features

- 🎯 **10 Difficulty Levels** with intelligent operation selection
  - Levels 1-3: Basic addition & subtraction with smaller numbers
  - Levels 4-5: Multiplication & division automatically included
  - Levels 6-7: Square roots & exponents automatically included
  - Levels 8-10: Expert level with all operations and large number ranges
- 🔢 Variable number of questions (5-25)
- ➕ Basic operations: Addition, Subtraction
- ✖️ Advanced operations: Multiplication, Division
- 🔺 Complex operations: Square roots, Exponents
- 📐 **Mathematical Notation**: Proper display of exponents (2⁴) and square roots (√16) using MathJax
- 🧠 **Smart difficulty scaling** - Higher difficulties favor complex operations
- 📊 Real-time progress tracking
- 🎨 Modern, responsive UI with smooth animations
- 📱 Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client for API calls
- **MathJax** - Mathematical notation rendering

### Backend
- **Python 3.8+** - Core language
- **Flask** - Lightweight web framework
- **Flask-CORS** - Cross-origin resource sharing

## 🌐 GitHub Pages Version

This project is also available as a **frontend-only version** deployed on GitHub Pages:

- **Live Demo**: [martinw500.github.io/Math-Quiz-Generator](https://martinw500.github.io/Math-Quiz-Generator)
- **Branch**: `gh-pages`
- **Features**: Same functionality, but runs entirely in the browser without needing a backend server

To switch to the GitHub Pages version:
```bash
git checkout gh-pages
```

## Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download here](https://python.org/)

### Quick Start (Windows)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/martinw500/Math-Quiz-Generator.git
   cd Math-Quiz-Generator
   ```

2. **Automated Setup:**
   ```bash
   setup.bat
   ```

3. **Start the application:**
   ```bash
   start_both.bat
   ```

4. **Open your browser:**
   - Frontend: http://localhost:3000

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
     - **Levels 1-3**: Basic addition & subtraction
     - **Levels 4-5**: Multiplication & division automatically included
     - **Levels 6-7**: Square roots & exponents automatically included
     - **Levels 8-10**: Expert level with maximum complexity
   - Choose number of questions (5-25)
   - Optionally force include advanced operations at lower levels

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
│   │   └── components/
│   │       ├── QuizSetup.js   # Quiz configuration
│   │       ├── QuizGame.js    # Quiz gameplay
│   │       └── Results.js     # Results display
│   └── package.json       # Node.js dependencies
├── setup.bat              # Automated setup script
├── start_both.bat         # Start both servers
├── check_setup.bat        # Diagnostic tool
├── .gitignore            # Git ignore rules
├── LICENSE               # MIT License
└── README.md             # This file
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made by Martin
