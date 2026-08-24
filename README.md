# Full content hub prototype

A mobile-only GamesRadar RPG feed prototype. It is static by design: React provides
the interaction layer while all editorial data comes from local JSON. Media can use
full HTTPS URLs from the GamesRadar/Future CDN.

## Start locally

```bash
npm install
npm run dev
```

## Project choices

- Vite + React + TypeScript + Tailwind CSS.
- A 430px maximum mobile canvas; desktop is only a centred preview surface.
- Path routes keep the feed at `/` and Stances at `/stance/<id>`; the Pages fallback
  preserves direct links for the static deployment.
- `content/feed.json`, `content/articles.json`, and `content/big-preview.json`
  hold the editable feed content.
- `.github/workflows/deploy-pages.yml` builds and deploys the `dist` folder after
  this project is pushed to a repository's `main` branch with GitHub Pages enabled.

## Publish to GitHub Pages

In the repository settings, select **Pages** and set the publishing source to
**GitHub Actions**. Every push to `main` then builds and deploys the latest version.
