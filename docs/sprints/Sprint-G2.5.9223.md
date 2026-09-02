# Sprint G2.5.9223 - Compact Expert Grid Controls

## Goal

Make the Expert Card Editor grid controls smaller and place X, Y and Zoom
together above the editor grid.

## Changes

- Moved X, Y and Zoom into one compact toolbar above the Expert editor grid.
- Changed X and Y slider display to show additional fields from `0` to `+5`.
- Changed the Zoom display to percentages.
- Collapsed the "Entities for the card" panel by default.
- Bumped the Home Assistant Card Editor plugin to `0.2.0-alpha.43`.
- Bumped the Home Assistant App/Add-on package to `0.1.115`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm build`
- `pnpm ha:app:prepare`
