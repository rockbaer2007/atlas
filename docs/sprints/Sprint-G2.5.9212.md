# Sprint G2.5.9212

## Goal

Support both Home Assistant sidebar setup paths from the Plugin Hub helper.

## Changes

- Added a separate URL copy action next to the YAML copy action.
- Kept the `panel_iframe` YAML copy path for `configuration.yaml` users.
- Bumped the Home Assistant App/Add-on package to `0.1.104`.

## Verification

- `node --check examples/plugin-hub/app.js`
- `git diff --check`
- `pnpm build`
- `npm run docs:build` in `ugso-opensource-docs`
- Local smoke check on `http://127.0.0.1:4376/hub` and `/api/plugins`
