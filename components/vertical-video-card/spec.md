# Vertical video card

## Summary

An article-led vertical video treatment using the supplied Firework Storyblock embed.

## Purpose

Give a feed article a stronger video-first presentation while preserving the author,
headline, strapline, article CTA, and engagement footer.

## Inputs

- Normalized article record from `content/articles.json`.
- Author record from `content/authors.json`.
- Game label with a local Follow control above the author byline.
- Firework channel and video ID configured in the component.

## States

- Firework loading or unavailable state is owned by the provider.
- Article CTA remains available if video loading fails.
- Missing article date or summary is supported.

## Behavior

- Firework Storyblock is configured for one autoplaying vertical video.
- Follow is a local prototype interaction and changes to Following when selected.
- “click here to read more” opens the canonical article in a new tab.
- Engagement indicators are display-only in this pass.

## Constraints

- Mobile-only 9:16 media slot with rounded corners.
- Firework scripts load once from `index.html`; no API call is made by React.
- The card sits directly in the feed with no separate feed surface.

## Reuse guidance

Keep provider configuration separate from the article data model. Future Firework cards
can supply a different channel/video ID without changing the surrounding card layout.

## Open items

- Confirm provider loading and autoplay behaviour in the target browser.
- Replace the temporary video/article pairing when editorial video content is supplied.
