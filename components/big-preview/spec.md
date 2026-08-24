# Big Preview card

## Summary

An editorial hub card for a GamesRadar Big Preview package: a branded, high-priority
editorial surface with one lead article followed by a horizontally scrollable rail of
related coverage.

## Purpose

Make a sustained preview package feel like a destination inside the feed rather than
another large article card.

## Inputs

- `content/big-preview.json` containing the lead article, hero media, author, and related links.
- Related article records with title, author, URL, and metrics.
- Optional package intro that explains why the preview deserves attention.

## States

- Lead hero image loaded or unavailable.
- Related rail with one or more linked items.
- Display-only saved, reaction, comment, and share controls.

## Behavior

- Lead image and title link to the live Big Preview article.
- The branded “The Big Preview” pill and package intro establish the package as a
  special editorial destination rather than another context card.
- Related items scroll horizontally on mobile and open their live articles in a new tab.
- The related section is labelled “Related”, not “More stories”.

## Constraints

- Hero breaks out to the full mobile canvas width and uses intrinsic image height to preserve the supplied image ratio.
- The package uses a rounded black surface to separate it from standard/context cards.
- The repeated game-follow row is removed from the top of this package; the game is
  conveyed through the title, hero, and package intro instead.
- Related cards intentionally have no images or straplines in this first pass.

## Reuse guidance

Use for event, game, or launch packages with several connected articles. Keep the
related rail data-driven so other Big Preview packages can reuse the component.

## Open items

- Confirm whether related cards should eventually show author/date metadata.
- Add package-specific Firework or video content when the live hub exposes it.
