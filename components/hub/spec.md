# Hub page

## Summary

A mobile RPG destination composed from a section menu, featured coverage, editorial
timeline, editor Stances, lightweight reactions, a reader choice, and short-form video.
It also includes a non-sticky “Since you were last here” entry point into a five-step
recap takeover.

## Purpose

Give readers a single place to understand and participate in RPG coverage before moving
into the chronological /feed experience.

## Inputs

- content/hub.json owns the Hub copy and sequence: article references, five editorial
  timeline entries, two editor Stances, hot takes, and the reader-versus choice.
- content/last-visit.json owns the recap updates, missed video, stance, quiz, and weekly
  wrap content shown by the takeover.
- articles.json and authors.json provide the real article material used in Featured.
- HubPage composes the page; the child components take typed data rather than embed
  RPG-specific content.

## States

- HubSectionNav opens a menu and scrolls to a selected section.
- HubSectionNav is smart-sticky: it hides while scrolling down and returns on upward
  scroll, while staying visible near the top of the page.
- HubTimeline keeps one dated editorial entry open at a time.
- HubEditorialStances: each card records one local agree/disagree state and accepts a
  local comment.
- HubHotTakes and HubVersus: each records a local one-choice reaction.
- The Hub follow button is local only.
- SinceLastVisit opens a full-height local takeover; its current screen and quiz choice
  reset when it is closed or refreshed.

## Behavior

- The burger menu scrolls to Featured, Timeline, Stances, Takes, Vote, or Clips; the
  matching visible tab bar sits at the bottom of the Hero. The menu also links to /feed.
- The Hero uses one full-width Follow control; it does not repeat a feed CTA.
- Clips use one 24px bold heading, “Watch Today’s Videos”; the embedded carousel suppresses
  its standalone card heading in this context.
- Broad “latest” CTAs link to /feed; supplied article URLs retain their canonical
  external destinations.
- The Hub’s featured-story area uses the existing FeaturedArticleCard for its first,
  full-width lead item, then the exact standard ArticleCard used by /feed for the rest;
  the Hub only supplies its section heading and “Go to the RPG Feed” destination.
- Initials-based comment avatars use a deterministic coloured gradient, keeping the
  same user visually consistent across nested replies and Hub comment previews.
- Agree/disagree and hot-take selections surface a shared, auto-dismissing bottom
  engagement toast so feedback feels connected to the stance-page interaction pattern.
- The hero is intentionally compact enough to bring the title and follow action into
  the first viewport. “Since you were last here” states its action directly, and the
  Hub video embed uses the surrounding section rhythm without adding a duplicate rule.
- The feed begins with a normal-flow “Back to RPG Hub” banner. It is intentionally not
  sticky and resolves the correct local root for both local and GitHub Pages paths.
- The Hub logo uses the same root-path helper. Bare `/stance/` paths normalise back to
  the Hub root instead of rendering Hub content under a stance URL, and the section
  menu stays inside the 430px mobile canvas rather than using browser viewport width.
- The Stance and Timeline copy is sourced from the supplied Figma Make baseline:
  five dated coverage moments, Ali Jones’s turn-based Stance, and Josh West’s
  focused-campaigns Stance.
- The reader-versus choice runs through five questions. Each pick briefly reveals the
  community percentage on both images, then advances to a final GR+ audience match score.
- The “Since you were last here” banner is in normal page flow, not sticky. The takeover
  keeps “Tap to continue” anchored to the viewport bottom on every screen. Each screen
  is intentionally fitted to the viewport with no internal scrolling; tapping its
  non-interactive surface advances, while links, buttons, and controls keep their own
  behavior.
- Takeover headings use the Hub’s Figtree display hierarchy (32px/semibold) rather than
  introducing a separate headline scale. Its five progress segments stretch across the
  available header width; the close control is icon-only with no surface.
- The Figma trending bar remains intentionally omitted.
- The end-of-Hub “Make Your Mark” module offers four contribution routes, a local rank
  preview, and two participation prompts. It is a live component based on the supplied
  visual reference, rather than an embedded screenshot, so its typography and actions
  stay aligned with the Hub.

## Constraints

- Mobile-only, 430px maximum canvas; Figtree, existing GamesRadar palette, and
  rounded-3xl surfaces.
- Use Lucide icons for interface controls; the hot-take rating scale deliberately uses
  the supplied emoji vocabulary.
- All engagement is local prototype state: no identity, persistence, analytics,
  content publishing, or live data source.

## Reuse guidance

HubSectionNav, HubTimeline, HubEditorialStances, and HubParticipation are
category-agnostic. Reuse them with a new HubDocument record rather than forking their
structure; keep editorial copy and media references in JSON.

HubMakeYourMark is a reusable participation pattern. Keep its four-route configuration
and rank values separate if it is promoted beyond this RPG prototype.

## Open items

- Production requires authenticated contribution, moderation, analytics, and destination
  URLs for each timeline entry.
- Replace initial RPG hero/versus imagery with supplied final category art when available.
