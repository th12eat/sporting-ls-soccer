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
│   ├── index.html    page structure + styling  (shared, identical per team)
│   ├── app.js        renders the page          (shared, identical per team)
│   ├── data.js       ⭐ THE ONLY FILE YOU EDIT for this team
│   └── drills/       diagram images (SVG/PNG/JPG)
└── 1st-grade-girls/  same structure; data.js starts mostly empty
    ├── index.html
    ├── app.js
    ├── data.js       ⭐ edit this for the 1st-grade team
    └── drills/
```

`index.html` and `app.js` are the same in every team folder — only `data.js`
differs. If you change the shared page/renderer, copy it to each team folder.

## Tabs

Each team page has five tabs: **Practice** (default) · **Games** · **Homework**
· **Drills** · **Roster**. Homework & Drills also show inline inside each
practice; the Homework/Drills tabs collate them all with a search box. The
light-blue word in the header ("Team _Practice_") changes with the tab.

## What's in `data.js`

- `TEAM` — name, `coaches`, `defaultTime` (6:00pm), `venue`
- `PRACTICES` — newest first; each has attendance, warm-up items, drills,
  scrimmage, homework, plus `time` (optional) and `weather`
- `GAMES` — newest first; opponent, score, scorers, weather
- `ROSTER` — each player's goals/assists/saves/games/practices + goalie & captain
  flags (`"yes"` ✓ / `"no"` ✗ / `""` neutral)

## Weather workflow

Each session stores its own weather. When you add a **new** practice/game:
1. Set the practice that just happened to the **actual** weather.
2. Put the **forecast** on the new upcoming one (e.g. `condition: "Forecast: Sunny"`),
   then replace it with the actual afterward.
Default time is 6:00pm; only set `time:` when a session differs.

## Adding a new week (for 3rd Grade Girls)

1. Open `3rd-grade-girls/data.js`.
2. Copy one whole `{ ... }` practice block, paste at the **top** of `PRACTICES`.
3. Update attendance, warm-up items, drills, scrimmage, homework, weather.
   A drill with BOTH a `diagram` and a `youtube` link gets a Diagram/Video toggle.
4. Save. Ask Claude to push, or push yourself (see below).

## Adding a third team

Copy any team folder to a new one, edit its `data.js`, and add a card on the
root `index.html`.

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
