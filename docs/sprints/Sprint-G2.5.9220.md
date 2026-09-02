# Sprint G2.5.9220 - Visible Card Editor Columns

## Goal

Make the Card Editor column layout visibly read as three side-by-side areas.

## Changes

- Changed the export and import/entity layouts to equal-width three-column
  grids on wide screens.
- Added visible column panel borders and backgrounds so the grouping is clear.
- Kept the existing responsive single-column fallback.
- Bumped the Home Assistant Card Editor plugin to `0.2.0-alpha.41`.
- Bumped the Home Assistant App/Add-on package to `0.1.112`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm build`
- `git diff --check`
- `pnpm ha:app:prepare`
