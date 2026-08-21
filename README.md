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
- Hash routes (`#/item/<id>`) so direct links work on GitHub Pages.
- `content/feed.json` is the editable content source. It is intentionally empty
  until the first supplied article batch arrives.
- `.github/workflows/deploy-pages.yml` builds and deploys the `dist` folder after
  this project is pushed to a repository's `main` branch with GitHub Pages enabled.

## Next implementation pass

Define and build the feed cards from the supplied designs, beginning with a standard
article and a stance item. The existing files in `games-radar-content-hub` remain a
reference source; this project does not depend on its Twig/Flexi runtime.
