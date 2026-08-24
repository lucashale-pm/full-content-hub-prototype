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
- `StanceEngagementDock` is a delayed, fixed mobile prompt that collapses while readers
  scroll and expands only after an explicit tap or an overall vote.
- `OpinionReactionRow` lets a reader agree or disagree with an individual expert view;
  this is intentionally separate from the overall Stance vote.
- The debate uses a chronological update rail; each opinion carries its own `addedLabel`
  and the page summarizes the latest local update.

## States and behavior

- Vote selection updates the local percentage bar and selected button only; it resets on
  refresh and makes no API call.
- Comment submission appends a local “You” comment only; it also resets on refresh.
- Missing Stance IDs render a concise not-found state.
- The engagement dock appears only once the debate section reaches the lower half of the
  viewport. Its compact copy reflects the expert opinion currently being read.
- The dock has three states: compact or overall-vote selection, optional viewpoint
  explanation, and local submission confirmation. It collapses on scroll while choosing
  a vote, but never forces expansion.
- The top-right Stance-page options menu contains the “Engagement demo” control. It
  removes both the dock and inline opinion reactions, making comparison reversible in
  one tap without adding reader-facing page chrome.

## Behavior

- An opinion reaction does not change the overall vote or open a text field.
- An overall vote from either the dock or the main poll opens the optional explanation
  state in the dock. Submitting the explanation appends it to the local comment thread.
- The confirmation action scrolls to the discussion instead of creating a second comment
  destination.

## Constraints

- Mobile-only layout, existing GamesRadar colors, Figtree typography, and Lucide icons.
- Verified labels are specific to Stance detail pages, not standard feed cards.
- Update cards omit comment metadata, show the first two credentials, and use the parent
  Stance hero image when available.
- Placeholder avatars use initials; opinion records can optionally supply an image URL.
- The dock is mobile-only, fixed above the safe bottom edge, and must not cover a focused
  input. All controls expose pressed state or accessible names.

## Reuse guidance

Add future Stances as records in `content/stances.json`. Keep editorial content, vote
counts, and comments out of React components.

Keep the engagement dock generic: it receives the current Stance, active opinion, and
local callbacks rather than embedding Helldivers-specific copy or counts.

## Open items

- Production needs identity, moderation, persistence, and analytics before submissions
  can be published beyond this local prototype.
- Test the delayed-entry threshold and the wording of the compact prompt against reader
  completion and contribution quality.
