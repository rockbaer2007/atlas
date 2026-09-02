# Sprint G2.5.9213

## Goal

Keep the Card Editor Expert grid square while making the field count adjustable.

## Changes

- Replaced the Expert editor surface stretch handle with two sliders.
- Added a horizontal grid slider above the work surface.
- Added a vertical grid slider to the left of the work surface.
- Reused the previous resize range as `12` to `17` columns and rows.
- Kept grid cells square by sizing both axes from one cell-size variable.
- Bumped the Home Assistant App/Add-on package to `0.1.105`.

## Verification

- `node --check examples/status-demo/app.js`
- `git diff --check`
- `pnpm build`
- `pnpm --filter @atlas/homeassistant test`
- `npm run docs:build` in `ugso-opensource-docs`
- Local smoke check on `http://127.0.0.1:4374/`
