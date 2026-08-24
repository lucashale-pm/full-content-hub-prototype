# Article card

## Summary

React/Tailwind replication of the existing GamesRadar mobile article-card reference,
used for the first ten records in the RPG feed.

## Purpose

Give readers a compact, scannable article update with source, date, topic, title,
summary, thumbnail, and lightweight engagement context.

## Inputs

- Normalized article record from `content/articles.json`.
- The normalized record's game label for the topic row.
- Author record from `content/authors.json`.
- Game label with a local Follow control; the game is the primary social identity.
- Prototype-only reaction and comment counts from the normalized article record.
- Optional editorial context from `content/editorial-contexts.json`, containing a short
  label and curated reader-value sentence.
- `isFirst` controls whether the divider is omitted from the first card.
- Thumbnail is optional; the card remains usable without it.

## States

- Default article.
- Missing thumbnail.
- Missing date.
- Supplied author avatar and name.
- First card without divider; subsequent cards with divider.
- Three selected feed cards render as saved and three different cards render as reacted
  for demonstration. The chosen IDs are explicit in `src/app/App.tsx` so the lived-in
  state remains stable and easy to replace with real user state later.
- Context variant: a 4:3 full-width image, editorial label, fuller headline, and a
  curated sentence replace the compact thumbnail and extracted article summary.

## Behavior

- Article body links to the canonical GamesRadar URL in a new tab.
- Bookmark, reaction, comment, and share indicators are display-only in this pass.
- Reaction, comment, and share sit together in one inline footer group.
- The feed owns ordering and chooses how many cards to render.
- Context copy is editorially supplied and should answer a reader question such as
  “What changed?”, “Why it matters”, or “What we know”; it is not a generic strapline.

## Constraints

- Mobile-only layout, 16px horizontal inset from the viewport and 430px maximum feed shell.
- Remote images must use HTTPS media URLs supplied in the content data.
- Card uses semantic `article`, `header`, `footer`, `time`, and image alt text.

## Reuse guidance

Keep content mapping outside `ArticleCard`. Future video, update, comment, and stance
posts should be sibling feed components that share the same shell and token layer.

Use the context variant only when an editor has supplied a useful reading cue. Do not
promote every story by default; cards without context retain the compact treatment.

## Open items

- Confirm real author/avatar fields when supplied.
- Replace generated engagement metrics when real or scenario-specific values are supplied.
- Decide whether canonical links should remain external or route into local story views.
