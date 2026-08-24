# Prototype content

The app uses local content only; it never fetches an API or live feed.

- `source/en_feed_fd62aacd.json` is the untouched export supplied for this prototype.
- `articles.json` is the normalized article collection used by the app. It keeps the
  title, type, categories, tags, dates, canonical URL, Future CDN thumbnail, parsed
  article blocks, and original HTML body.
- `feed.json` controls display order and points to records in `articles.json` using
  `sourceId`.
- `authors.json` contains the temporary author pool used while the source export does
  not provide individual article authors. Assignment is stable per article ID, so it
  looks varied without changing on every render.
- `articles.json` includes deterministic prototype-only `reactionCount` and
  `commentCount` values. They are generated from the article ID and can later be
  replaced with supplied metrics without changing the card component.
- Each normalized article also has a `game` label used by the card topic row, so the
  feed does not show the generic `RPG` category when a specific game is known.
- `big-preview.json` stores the separate Marvel's Wolverine package: its lead article,
  supplied hero image, author, and three related live article links for the horizontal
  “Related” rail.
- `stances.json` stores the editorial primer, verified opinions, local vote seed data,
  and seeded comments for each Stance detail page. Add another record to support a
  second Stance without changing the components.

When a new export arrives, replace the source snapshot and run `npm run normalize:feed`.
Do not hand-edit `articles.json`; edit the source export or the normalizer instead.

Add entries to `items` in display order. The current article entries use `type: "article"`.
Future supported `type` values are:

- `article` — standard or featured story.
- `video` — use `orientation` of `vertical` or `horizontal`.
- `articleUpdate` — a new development on an existing story; include `parentId`.
- `comment` — a surfaced reader/expert comment; include `parentId`.
- `stance` — a lead story plus two or three contributor viewpoints.

All remote media must use a full HTTPS URL from the approved GamesRadar/Future CDN.
Keep a useful `alt` value for every image or video poster. No media is uploaded
or fetched during the build.

The first content pass will add the complete item examples and their validation
rules once the supplied articles are available.
