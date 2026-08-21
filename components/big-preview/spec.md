# Big Preview card

## Summary

An editorial hub card for a GamesRadar Big Preview package: one lead article followed
by a horizontally scrollable rail of related coverage.

## Purpose

Make a sustained preview package feel like a destination inside the feed rather than
another large article card.

## Inputs

- `content/big-preview.json` containing the lead article, hero media, author, and related links.
- Related article records with title, author, URL, and metrics.
- Lead game label with a local Follow control above the author byline.

## States

- Lead hero image loaded or unavailable.
- Related rail with one or more linked items.
- Display-only saved, reaction, comment, and share controls.

## Behavior

- Lead image and title link to the live Big Preview article.
- Related items scroll horizontally on mobile and open their live articles in a new tab.
- The related section is labelled “Related”, not “More stories”.

## Constraints

- Hero breaks out to the full mobile canvas width and uses intrinsic image height to preserve the supplied image ratio.
- No separate feed surface; the package sits on the page background.
- Related cards intentionally have no images or straplines in this first pass.

## Reuse guidance

Use for event, game, or launch packages with several connected articles. Keep the
related rail data-driven so other Big Preview packages can reuse the component.

## Open items

- Confirm whether related cards should eventually show author/date metadata.
- Add package-specific Firework or video content when the live hub exposes it.
