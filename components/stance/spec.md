# Stance

## Summary

An editorial debate format made of a compact feed card and a mobile-first detail page.

## Purpose

Surface a clear GamesRadar editorial question, show curated informed viewpoints, and let
readers add a lightweight local vote or comment.

## Inputs

- `content/stances.json` contains a `stances` collection, so a second Stance can be added
  without changing component code.
- Each record includes the editorial primer, contributor credentials, vote options, and
  seeded comment thread.

## Components

- `StanceFeedCard` links to `/stance/:id`; verification is deliberately omitted here.
- `StanceUpdateCard` surfaces a newly added expert take above its originating Stance card.
  It uses a full-bleed black Substack-inspired surface, puts a full-width viewpoint label
  first, places contributor credentials inline beneath the byline, and leads with the
  complete added argument before the article image and CTA context.
- `StanceDetailPage` includes the verified editor treatment, primer, debate, vote, CTA,
  and comments.
- `StanceOpinionCard`, `StanceVotePanel`, and `StanceAvatar` are reusable detail-page
  building blocks.
- The debate uses a chronological update rail; each opinion carries its own `addedLabel`
  and the page summarizes the latest local update.

## States and behavior

- Vote selection updates the local percentage bar and selected button only; it resets on
  refresh and makes no API call.
- Comment submission appends a local “You” comment only; it also resets on refresh.
- Missing Stance IDs render a concise not-found state.

## Constraints

- Mobile-only layout, existing GamesRadar colors, Figtree typography, and Lucide icons.
- Verified labels are specific to Stance detail pages, not standard feed cards.
- Update cards omit comment metadata, show the first two credentials, and use the parent
  Stance hero image when available.
- Placeholder avatars use initials; opinion records can optionally supply an image URL.

## Reuse guidance

Add future Stances as records in `content/stances.json`. Keep editorial content, vote
counts, and comments out of React components.
