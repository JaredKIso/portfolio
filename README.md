# Portfolio

Jared Kell's one-page portfolio. Plain HTML, CSS and JavaScript with no build step, so it can be served from any static host as-is.

- `index.html`: the page (hero, case study, projects, experience, contact)
- `styles.css`: Material-style design tokens, light and dark themes
- `main.js`: theme toggle, scroll reveal, nav highlight, button ripples
- `assets/`: the DotHub tour video and its poster frame
- `design-prompt.md`: the design brief the page was built from

## Run locally

```bash
python -m http.server 8765
```

Then open http://localhost:8765.

## Deploy to GitHub Pages

1. Create a public repo (for example `JaredKIso/portfolio`) and push this folder to `main`.
2. In the repo, go to **Settings → Pages**, choose **Deploy from a branch**, then pick `main` and `/ (root)`.
3. The site goes live at `https://jaredkiso.github.io/portfolio/`.

To serve it from your own domain (for example `jarediso.com`), add the domain under **Settings → Pages → Custom domain**, then add the DNS records GitHub shows you at your DNS provider.
