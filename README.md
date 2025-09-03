# Math Quiz Generator

**Live:** https://martinw500.github.io/Math-Quiz-Generator

A React + Flask math quiz app. Frontend can run standalone (GitHub Pages) or together with the backend locally.

## Features

- 10 difficulty levels with automatic unlocking of harder operations
- Operations: +, −, ×, ÷, exponents, square roots
- Smart scaling: higher levels bias toward complex operations
- 5–25 questions per quiz, progress + instant feedback
- Fully client‑side in the deployed (Pages) version

Difficulty tiers (auto‑enforced operations):
1–3 basic | 4–5 add mult/div | 6–7 add roots/exponents | 8–10 all

## Tech

Frontend: React 18, Styled Components, MathJax

Backend: Python 3.8+, Flask (+ CORS)

CI / Deploy: GitHub Actions → GitHub Pages (push to `main` builds & deploys)

## Run (Windows)

Fast start (installs on first run):
```bash
start.bat
```
Then open http://localhost:3000 (or use the live link above).

Dev menu (pick services):
```bash
dev.bat
```

Manual (optional):
```bash
cd backend && pip install -r requirements.txt && python app.py
cd frontend && npm install && npm start
```

## Usage
1. Pick difficulty (auto locks advanced ops as levels rise)
2. Select question count
3. Answer; feedback + progress shown
4. View score & retry

## Troubleshooting (quick)
- Script blocked: run PowerShell as Admin → `Set-ExecutionPolicy RemoteSigned`
- Port busy: stop other apps on 3000 / 5000
- Missing deps: rerun `start.bat` or reinstall Node/Python
- Diagnose separately: `dev.bat`

## Structure (brief)
```
backend/ app.py
frontend/ (React app: components/, quiz logic, MathJax)
.github/workflows/deploy.yml (Pages build)
start.bat / dev.bat
```

## License
MIT – see `LICENSE`.

---
Made by Martin
