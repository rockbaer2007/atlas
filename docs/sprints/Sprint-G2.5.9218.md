# Sprint G2.5.9218 - Card Editor Column Layouts

## Goal

Make the Card Editor export and import/entity areas easier to scan on wide Home
Assistant screens.

## Changes

- Reworked the export area into three columns: card settings, export languages
  and action/resource controls.
- Reworked the import and entity picker area into three columns: import/debug,
  entity IDs/filter shortcuts and entity selection/live overview.
- Added a responsive single-column fallback for narrower screens.
- Bumped the Home Assistant Card Editor plugin to `0.2.0-alpha.40`.
- Bumped the Home Assistant App/Add-on package to `0.1.110`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm build`
- `git diff --check`
- `pnpm ha:app:prepare`
