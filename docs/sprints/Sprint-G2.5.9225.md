# Sprint G2.5.9225 - Expert Zoom Slider Width

## Goal

Correct the Expert Card Editor Zoom slider width so it is wider than the compact
X/Y sliders instead of smaller.

## Changes

- Set the Zoom slider column to about one and a half times the X/Y slider width.
- Corrected the previous changelog wording for the percent Zoom slider.
- Bumped the Home Assistant Card Editor plugin to `0.2.0-alpha.45`.
- Bumped the Home Assistant App/Add-on package to `0.1.117`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm build`
- `pnpm ha:app:prepare`
