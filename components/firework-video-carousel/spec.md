# Firework video carousel

## Summary

A title-led horizontal Firework playlist embedded directly in the mobile feed.

## Inputs

- Firework channel, playlist, display mode, and player placement configured in the component.

## Behavior

- Displays the supplied GamesRadar row playlist beneath “Watch Today’s Videos”.
- Video playback and loading are owned by Firework.

## Constraints

- Uses the Firework FWN scripts loaded once in `index.html`.
- Contains no additional editorial text, controls, or local data calls.

## Reuse guidance

Keep provider configuration isolated here. Future playlist variants should change only the
channel or playlist properties.
