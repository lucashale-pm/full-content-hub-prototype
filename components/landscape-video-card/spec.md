# Landscape video card

## Summary

A minimal YouTube video treatment for inserting a landscape video into the article feed.

## Purpose

Add a channel video without competing with the richer article, vertical-video, or feature
cards around it.

## Inputs

- Video title.
- YouTube video ID.

## Behavior

- Renders a responsive 16:9 YouTube embed with lazy loading.
- The title is the only editorial text shown.
- Provider controls and playback state remain owned by YouTube.

## Constraints

- Mobile feed width with the same divider and vertical spacing as other cards.
- No local API or data connection; only the supplied YouTube embed URL is used.

## Reuse guidance

Pass a different YouTube ID and title for future GamesRadar channel videos. Keep provider
parameters in this component so editorial content stays data-only.
