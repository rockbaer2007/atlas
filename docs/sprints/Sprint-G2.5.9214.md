# Sprint G2.5.9214

## Goal

Separate Expert Card Editor grid field count from zoom.

## Changes

- Added a Zoom slider for the Expert editor grid cell size.
- Kept the horizontal slider dedicated to the column count.
- Kept the vertical slider dedicated to the row count.
- Repositioned the vertical slider so it stays beside the editor surface.
- Persisted the Zoom value with the local editor configuration.
- Bumped the Home Assistant App/Add-on package to `0.1.106`.

## Verification

- `node --check examples/status-demo/app.js`
- `git diff --check`
- `pnpm build`
- `pnpm --filter @atlas/homeassistant test`
- `npm run docs:build` in `ugso-opensource-docs`
- Local smoke check on `http://127.0.0.1:4374/`
