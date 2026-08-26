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
- A 430px maximum mobile canvas for the Hub, Feed, and Stance pages; `/desktop` is an
  isolated 1200px desktop Hub composition reusing the same content and components.
- Path routes keep the RPG Hub at `/`, the chronological feed at `/feed`, the desktop
  Hub prototype at `/desktop`, and Stances at
  `/stance/<id>`; the Pages fallback preserves direct links for the static deployment.
- The feed is assembled in `src/app/App.tsx` from reusable cards. Its current sequence
  includes compact/context article cards, a Stance update, the Stance card, vertical and
  landscape video cards, Firework carousel content, and the Big Preview package.
- `content/feed.json`, `content/articles.json`, `content/editorial-contexts.json`,
  `content/stances.json`, and `content/big-preview.json` hold the editable content.
- Component decisions and handoff notes live beside each reusable pattern in
  `components/*/spec.md`.
- `.github/workflows/deploy-pages.yml` builds and deploys the `dist` folder after
  this project is pushed to a repository's `main` branch with GitHub Pages enabled.

## Architecture and handoff

`src/app/App.tsx` owns page composition and chooses which view to render. JSON content
stays outside React components: article records are normalized in `content/articles.json`,
feed display order is in `content/feed.json`, Hub arrangement is in `content/hub.json`,
and optional editorial context is mapped by article ID in `content/editorial-contexts.json`.

`src/components/ArticleCard.tsx` supports the compact default and the richer editorial
context treatment. `StanceDetailPage.tsx` is a local, mobile-first debate experience:
the page has a GamesRadar header, an ongoing-status strip, separate game and Stance
follow actions, a primer, text or Firework video opinions, a local poll, comments, and a
delayed engagement dock. The burger menu contains the reversible engagement-demo toggle.

All votes, follows, reactions, comments, engagement-demo state, and membership prompt
states are local React state. There is no authentication, persistence, analytics, live
API, or membership service behind them. Refreshing resets the demo state.

The feed includes a few intentionally seeded followed games plus three saved and three
reacted article cards. These are presentation defaults only and are defined explicitly
in `GameFollowRow.tsx` and `App.tsx`.

`HubPage.tsx` is the mobile RPG destination. It composes dedicated section navigation,
`HubTimeline`, `HubEditorialStances`,
and `HubParticipation` components. The editorial timeline and Stance content come from
`content/hub.json`; local Hub interactions reset on refresh.

Remote media is intentionally referenced by HTTPS URL. Firework storyblocks are enabled
by the scripts in `index.html`; the vertical Stance video is data-driven with an opinion
`video` object containing its Firework channel and video ID.

## Publish to GitHub Pages

In the repository settings, select **Pages** and set the publishing source to
**GitHub Actions**. Every push to `main` then builds and deploys the latest version.

The published project site is:
`https://lucashale-pm.github.io/full-content-hub-prototype/`

For a safe content-only update, edit the relevant JSON, run `npm run build`, review the
mobile feed locally with `npm run dev`, then commit and push to `main`.
