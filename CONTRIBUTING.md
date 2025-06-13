# Contributing to Math Quiz Generator

Thank you for your interest in contributing to the Math Quiz Generator! We welcome contributions from everyone.

## How to Contribute

### 1. Fork the Repository
- Fork the project on GitHub
- Clone your fork locally

### 2. Set Up Development Environment
```bash
git clone https://github.com/yourusername/math-quiz-generator.git
cd math-quiz-generator
./setup.bat  # Windows
```

### 3. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes
- Write clean, readable code
- Follow existing code style
- Add comments where necessary
- Test your changes locally

### 5. Test Your Changes
```bash
# Test backend
cd backend
python app.py

# Test frontend
cd frontend
npm start
```

### 6. Commit Your Changes
```bash
git add .
git commit -m "Add: your descriptive commit message"
```

### 7. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```
Then create a Pull Request on GitHub.

## Code Style Guidelines

### Python (Backend)
- Follow PEP 8 style guide
- Use meaningful variable names
- Add docstrings to functions
- Keep functions small and focused

### JavaScript/React (Frontend)
- Use functional components with hooks
- Follow React best practices
- Use meaningful component and variable names
- Keep components small and reusable

## Types of Contributions

### 🐛 Bug Reports
- Use the issue template
- Include steps to reproduce
- Provide system information

### 💡 Feature Requests
- Describe the feature clearly
- Explain why it would be useful
- Consider implementation complexity

### 📝 Documentation
- Fix typos or unclear instructions
- Add examples
- Improve README sections

### 🎨 UI/UX Improvements
- Enhance visual design
- Improve user experience
- Ensure mobile responsiveness

## Development Tips

### Backend Development
```python
# Example: Adding a new question type
def generate_fraction_question(self, difficulty):
    numerator = random.randint(1, difficulty * 5)
    denominator = random.randint(2, difficulty * 3)
    # ... rest of implementation
```

### Frontend Development
```javascript
// Example: Adding a new component
const NewComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  return (
    <StyledComponent>
      {/* Component content */}
    </StyledComponent>
  );
};
```

## Questions?

If you have questions about contributing:
1. Check existing issues and discussions
2. Create a new issue with the "question" label
3. Be specific about what you're trying to achieve

## Recognition

Contributors will be recognized in:
- README.md contributor section
- Release notes for significant contributions
- GitHub contributor statistics

Thank you for making Math Quiz Generator better! 🎉
