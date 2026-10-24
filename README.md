# Portfolio

Jared Kell's one-page portfolio, live at **https://portfolio.jarediso.com**. Plain HTML, CSS and JavaScript with no build step, so it can be served from any static host as-is.

- `index.html`: the page (hero, case study, projects, experience, contact)
- `styles.css`: Material-style design tokens, light and dark themes
- `main.js`: theme toggle, scroll reveal, nav highlight, button ripples
- `assets/`: the DotHub tour video and its poster frame
- `design-prompt.md`: the design brief the page was built from
- `CNAME`: the custom domain, written by GitHub Pages
- `404.html`: the not-found page GitHub Pages serves for any missing path (root-relative links)
- `og-image.png`: the link-preview image, a 1200×630 screenshot of the hero
- `sitemap.xml`, `robots.txt`: for search engines; regenerate if pages are added

## Run locally

```bash
python -m http.server 8765
```

Then open http://localhost:8765.

## Deploy

GitHub Pages serves `main` from the repo root, so pushing to `main` publishes the site; it rebuilds in about a minute.

The custom domain works like this:

- Fastmail DNS for `jarediso.com` has a `CNAME` record: `portfolio` → `jaredkiso.github.io`.
- The repo's **Settings → Pages** has `portfolio.jarediso.com` as the custom domain, with **Enforce HTTPS** on. GitHub issues and renews the certificate itself.
- The old `https://jaredkiso.github.io/portfolio/` address redirects to the custom domain.
