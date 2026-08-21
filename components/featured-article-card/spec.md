# Featured article card

## Summary

An editorial “big read” card based on the existing GamesRadar featured-card reference.

## Purpose

Give substantial features more attention than a standard feed row without presenting
them as breaking news. The treatment uses a strong kicker, large image, larger title,
dek, and explicit read CTA.

## Inputs

- Normalized article record from `content/articles.json`.
- Author record from `content/authors.json`.
- First structured article image is preferred as the hero, with thumbnail fallback.

## States

- Hero image available or missing.
- Missing date or summary.
- Default unsaved state with display-only engagement indicators.

## Behavior

- Hero, title, and CTA link to the canonical article in a new tab.
- Card remains on the feed surface and does not create a separate route.

## Constraints

- Mobile-only, 16px viewport inset, and no separate card surface.
- Uses the same typography, orange action color, author row, and footer metrics as
  the standard and video cards.

## Reuse guidance

Use for occasional high-value features or deep reads. Do not use it for every article;
the feed should retain the standard card as its default treatment.

## Open items

- Confirm final editorial kicker and CTA language.
- Decide whether featured cards should support video or stance content later.
