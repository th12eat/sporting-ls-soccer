# Team Homework — Sporting LS 3rd Grade Girls

A tiny static website for practice homework: video clips + drill instructions +
setup diagrams. No build step, no frameworks — just open `index.html`.

## Files

| File | What it's for |
|------|----------------|
| **`data.js`** | ⭐ **The only file you edit each week.** Add practices & drills here. |
| `index.html` | Page structure + styling. |
| `app.js` | Renders the page from `data.js`. You won't need to touch this. |
| `drills/` | Diagram images (SVG/PNG/JPG) referenced by drills. |

## Adding a new week (the 30-second version)

1. Open `data.js`.
2. Copy one whole `{ ... }` practice block.
3. Paste it at the **top** of the `PRACTICES` list (newest first).
4. Update the date, title, drills, and paste your YouTube link(s).
5. Save. Refresh the page.

YouTube links work in any normal form (`watch?v=`, `youtu.be/`, `/shorts/`).
Videos only load when a parent taps play, so the page stays fast.

## Preview locally

```bash
cd soccer-homework
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish free on GitHub Pages

```bash
cd soccer-homework
git init && git add . && git commit -m "Team homework site"
gh repo create sporting-ls-homework --public --source=. --push
```

Then on GitHub: **Settings → Pages → Source: `main` / root**.
Your site goes live at `https://<your-username>.github.io/sporting-ls-homework/`.

Share that link with the other parents. To update, edit `data.js`, then:

```bash
git add . && git commit -m "Add practice N" && git push
```
