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

## Screenshots

![Quiz Setup](screenshots/setup.png)
![Quiz Game](screenshots/game.png)
![Results](screenshots/results.png)

## Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client for API calls
- **Modern ES6+** JavaScript

### Backend
- **Python 3.8+** - Core language
- **Flask** - Lightweight web framework
- **Flask-CORS** - Cross-origin resource sharing

## Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download here](https://python.org/)
- **Git** - [Download here](https://git-scm.com/)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/math-quiz-generator.git
   cd math-quiz-generator
   ```

2. **Automated Setup (Windows):**
   ```bash
   # Double-click setup.bat or run:
   setup.bat
   ```

3. **Start the application:**
   ```bash
   # Double-click start_both.bat or run:
   start_both.bat
   ```

4. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

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

## API Endpoints

### `POST /api/generate-quiz`
Generate a new quiz with specified parameters.

**Request body:**
```json
{
  "difficulty": 3,
  "numQuestions": 10,
  "includeMultDiv": false,
  "includeSqrtExp": false
}
```

**Response:**
```json
{
  "questions": [
    {
      "question": "15 + 23",
      "answer": 38.0
    }
  ]
}
```

### `POST /api/submit-answer`
Check if a submitted answer is correct.

**Request body:**
```json
{
  "userAnswer": 38,
  "correctAnswer": 38.0
}
```

**Response:**
```json
{
  "correct": true,
  "correctAnswer": 38.0
}
```

## Project Structure

```
math-quiz-generator/
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
│   ├── package.json       # Node.js dependencies
│   └── package-lock.json  # Dependency lock file
├── setup.bat              # Automated setup script
├── start_both.bat         # Start both servers
├── start_backend.bat      # Start backend only
├── start_frontend.bat     # Start frontend only
├── check_setup.bat        # Diagnostic tool
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Development

### Adding New Question Types
Edit `backend/app.py` in the `generate_question` method to add new mathematical operations.

### Customizing UI
Edit React components in `frontend/src/components/` to modify the user interface.

### Environment Variables
Create a `.env` file in the backend directory for configuration:
```
FLASK_ENV=development
FLASK_DEBUG=True
PORT=5000
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with modern web technologies
- Inspired by the need for interactive math education
- Designed for learners of all ages

## Support

If you encounter any issues:
1. Run `check_setup.bat` to diagnose problems
2. Check the [Issues](https://github.com/yourusername/math-quiz-generator/issues) page
3. Create a new issue with detailed information

## Future Enhancements

- [ ] Timer mode for time-based challenges
- [ ] Leaderboard system
- [ ] User accounts and progress tracking
- [ ] More complex mathematical operations
- [ ] Offline mode support
- [ ] Mobile app version
- [ ] Multiplayer quiz battles

---

Made with ❤️ by [Your Name]
