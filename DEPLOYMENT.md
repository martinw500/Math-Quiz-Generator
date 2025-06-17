# Auto-Deploy to GitHub Pages

GitHub Actions automatically deploys the React app to GitHub Pages when you push to `main`.

## Setup Required
1. Go to repo Settings → Pages
2. Set source to "GitHub Actions"

## Manual Deploy (if needed)
```bash
cd frontend
npm run build
# Copy build files to gh-pages branch
```
