# K‑Pop Memory Puzzle (PWA, Levels)

Installable PWA memory game with level progression.

## Deploy (GitHub + Netlify)
1. Create a new GitHub repo and upload the *contents* of this folder.
2. On Netlify, **New site from Git**, pick the repo, keep defaults (build command: none, publish directory: root).
3. After deploy, open the site and the app will be installable. Works offline after first load.

## Run locally
```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Levels
- Level 1: 2 pairs
- Level 2: 3 pairs
- Level 3: 6 pairs
- Level 4: 8 pairs
- Level 5: 9 pairs
- Level 6: 12 pairs

Change these in `app.js` (LEVELS array).
