# Sporting LS — Team Homework

A tiny static website for practice homework: video clips + drill instructions +
setup diagrams. No build step, no frameworks. Hosts multiple teams under one
GitHub Pages domain.

## Live URLs

- **All teams (landing):** https://th12eat.github.io/sporting-ls-soccer/
- **3rd Grade Girls:** https://th12eat.github.io/sporting-ls-soccer/3rd-grade-girls/
- **1st Grade Girls:** https://th12eat.github.io/sporting-ls-soccer/1st-grade-girls/ (placeholder)

## Structure

```
/                     landing page linking to each team
├── index.html        the team picker
├── 3rd-grade-girls/  full team site
│   ├── index.html    page structure + styling
│   ├── app.js        renders the page from data.js (don't need to edit)
│   ├── data.js       ⭐ THE ONLY FILE YOU EDIT each week for this team
│   └── drills/       diagram images (SVG/PNG/JPG)
└── 1st-grade-girls/  placeholder page (to be built out later)
    └── index.html
```

## Adding a new week (for 3rd Grade Girls)

1. Open `3rd-grade-girls/data.js`.
2. Copy one whole `{ ... }` practice block.
3. Paste it at the **top** of the `PRACTICES` list (newest first).
4. Update: attendance, warm-up, drills, scrimmage, and homework. Paste YouTube
   links (any normal format works) and reference diagrams in `drills/`.
5. Save. Ask Claude to push, or push yourself (see below).

## Adding a second team

Copy the whole `3rd-grade-girls/` folder to a new folder (e.g. `1st-grade-girls/`),
then edit that folder's `data.js`. Add a card for it on the root `index.html`.

## Preview locally

```bash
cd soccer-homework
python3 -m http.server 8000
# open http://localhost:8000
```

## Publishing updates

The repo (`th12eat/sporting-ls-soccer`) allows direct pushes to `main`
(force-push and branch deletion are blocked). To publish:

```bash
git add -A && git commit -m "Add practice N" && git push
```

Pushes go over SSH (the `github-personal` key), which the Claude sandbox blocks,
so when Claude pushes it disables the sandbox for that one command.
GitHub Pages rebuilds automatically (~1 min) — no Actions workflow file needed.
