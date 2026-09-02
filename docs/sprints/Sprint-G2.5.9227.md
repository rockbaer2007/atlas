# Sprint G2.5.9227 - Expert Slider Text Contrast

## Goal

Make the Expert Card Editor X/Y/Zoom slider text easier to read in dark mode.

## Changes

- Lightened the compact grid slider text in dark mode.
- Kept the Zoom/X/Y output values in the Atlas teal accent.
- Bumped the Home Assistant Card Editor plugin to `0.2.0-alpha.47`.
- Bumped the Home Assistant App/Add-on package to `0.1.119`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm build`
- `pnpm ha:app:prepare`
