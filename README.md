# Math Quiz Generator

A modern web-based math quiz application with a React frontend and Python Flask backend.

## Features

- 🎯 Customizable difficulty levels (1-5)
- 🔢 Variable number of questions (5-25)
- ➕ Basic operations: Addition, Subtraction
- ✖️ Advanced operations: Multiplication, Division (optional)
- 🔺 Complex operations: Square roots, Exponents (optional)
- 📊 Real-time progress tracking
- 🎨 Modern, responsive UI with smooth animations
- 📱 Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client for API calls

### Backend
- **Python 3.8+** - Core language
- **Flask** - Lightweight web framework
- **Flask-CORS** - Cross-origin resource sharing

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
   - Set difficulty level (1-5)
   - Choose number of questions (5-25)
   - Select operation types

2. **Take the quiz:**
   - Answer each math question
   - Get instant feedback
   - Track your progress

3. **View results:**
   - See your score and percentage
   - Get encouraging feedback
   - Take another quiz

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
