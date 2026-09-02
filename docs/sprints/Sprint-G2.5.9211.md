# Sprint G2.5.9211

## Goal

Make Home Assistant sidebar preparation happen directly in the Plugin Hub.

## Changes

- Moved the sidebar helper dialog into the Plugin Hub.
- Removed the visible Administration button for sidebar preparation.
- Added ready-to-copy `panel_iframe` YAML blocks in the Hub dialog.
- Added a File Studio URL fallback for older plugin state without `entryUrl`.
- Bumped the Home Assistant App/Add-on package to `0.1.103`.

## Verification

- `node --check examples/plugin-hub/app.js`
- `node --check examples/admin-demo/app.js`
- `git diff --check`
- `pnpm build`
- `npm run docs:build` in `ugso-opensource-docs`
- Local smoke check on `http://127.0.0.1:4376/hub`, `/admin` and `/api/plugins`
