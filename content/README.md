# Prototype content

The app uses local content only; it never fetches an API or live feed.

- `source/en_feed_fd62aacd.json` is the untouched export supplied for this prototype.
- `articles.json` is the normalized article collection used by the app. It keeps the
  title, type, categories, tags, dates, canonical URL, Future CDN thumbnail, parsed
  article blocks, and original HTML body.
- `feed.json` controls display order and points to records in `articles.json` using
  `sourceId`.
- The Hub's editor timeline, Stances, hot takes, and reader-versus choice now live in
  `hub.json`; keep this editorial copy and its ordering out of React components.
- `hub.json` controls the RPG Hub at `/`: its editorial story references, dated coverage
  timeline, editor Stances, hot takes, and reader-versus choice. Keep Hub copy and
  ordering here rather than in `HubPage.tsx`.
- `last-visit.json` controls the five-screen “Since you were last here” recap takeover.
  It is intentionally local prototype content and can be replaced with personalized
  activity data later.
- `authors.json` contains the temporary author pool used while the source export does
  not provide individual article authors. Assignment is stable per article ID, so it
  looks varied without changing on every render.
- `editorial-contexts.json` is an optional article-ID mapping for the richer context-card
  variant. Each entry has an editorial label and a curated sentence explaining reader
  value; it should not be generated from the article body.
- `articles.json` includes deterministic prototype-only `reactionCount` and
  `commentCount` values. They are generated from the article ID and can later be
  replaced with supplied metrics without changing the card component.
- Each normalized article also has a `game` label used by the card topic row, so the
  feed does not show the generic `RPG` category when a specific game is known.
- `big-preview.json` stores the separate Marvel's Wolverine package: its lead article,
  package intro, supplied hero image, author, and three related live article links for
  the horizontal “Related” rail.
- `stances.json` stores the editorial primer, chronological contributor opinions, local
  vote seed data, and seeded comments for each Stance detail page. An opinion can use
  either text paragraphs or an optional Firework `video` object. The current Helldivers 2
  Stance includes Maya Smith's vertical video viewpoint using `marie_claire_uk` / `ojpmrK`.
  Add another Stance record without changing the components.

When a new export arrives, replace the source snapshot and run `npm run normalize:feed`.
Do not hand-edit `articles.json`; edit the source export or the normalizer instead.

Add entries to `items` in display order. The current article entries use `type: "article"`.
Future supported `type` values are:

- `article` — standard or featured story.
- `video` — use `orientation` of `vertical` or `horizontal`.
- `articleUpdate` — a new development on an existing story; include `parentId`.
- `comment` — a surfaced reader/expert comment; include `parentId`.
- `stance` — a lead story plus contributor viewpoints; each viewpoint may be text or a
  vertical Firework video.

All remote media must use a full HTTPS URL from the approved GamesRadar/Future CDN.
Keep a useful `alt` value for every image or video poster. No media is uploaded
or fetched during the build.

Editorial context is deliberately hand-written. Keep it short, specific, and useful to
the reader: labels such as `What changed`, `Why it matters`, and `What you need to know`
should explain why a story deserves attention rather than repeat the article summary.
