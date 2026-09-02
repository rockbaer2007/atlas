# Sprint G2.5.9224 - Expert Zoom Percent Slider

## Goal

Make the Expert Card Editor Zoom control smaller and express it as a percentage
range.

## Changes

- Made the Zoom slider about half as wide as the X and Y sliders.
- Changed the Zoom slider to run from `74%` to `150%`.
- Kept the editor grid cell geometry internally synchronized from the selected
  Zoom percentage.
- Bumped the Home Assistant Card Editor plugin to `0.2.0-alpha.44`.
- Bumped the Home Assistant App/Add-on package to `0.1.116`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm build`
- `pnpm ha:app:prepare`
