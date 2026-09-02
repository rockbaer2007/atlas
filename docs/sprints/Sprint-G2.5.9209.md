# Sprint G2.5.9209

## Goal

Make Home Assistant sidebar usage discoverable from the Plugin Hub.

## Changes

- Added a Plugin Hub hint that ATLAS plugins can be added to the Home
  Assistant sidebar as Webpage dashboards.
- Linked the hint to Administration for the sidebar entry helper.
- Show direct sidebar URLs on launchable plugin cards, including File Studio.
- Bumped the Home Assistant App/Add-on package to `0.1.101`.

## Verification

- `node --check examples/plugin-hub/app.js`
- `git diff --check`
- `pnpm build`
- `npm run docs:build` in `ugso-opensource-docs`
- Local smoke check on `http://127.0.0.1:4376/hub` and `/api/plugins`
