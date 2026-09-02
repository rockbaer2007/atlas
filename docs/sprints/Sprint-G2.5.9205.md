# Sprint G2.5.9205

## Goal

Finish the Atlas File Studio and Plugin Hub readiness pass for Home Assistant.

## Changes

- Added explicit File Studio path capability switches for `www`,
  `custom_components`, `addons` and `parent-of-config`.
- Kept `/config` as the default File Studio scope.
- Passed the new Home Assistant Add-on options into the Atlas app server.
- Finalized Plugin Hub behavior for zero, one and multiple active plugins.
- Kept planned or disabled plugins visible but non-launchable.
- Aligned Plugin Hub action styling with the ATLAS teal/orange UI language.
- Documented Home Assistant `old` and `target` update labels.
- Bumped File Studio to `0.1.35` and the Home Assistant App/Add-on package to
  `0.1.97`.

## Verification

- `node --check scripts/atlas-app-server.mjs`
- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `node --check examples/plugin-hub/app.js`
- `pnpm --filter @atlas/file-studio test`
- `pnpm build`
- `pnpm ha:app:prepare`
- Local File Studio API smoke test on `http://127.0.0.1:4376/` confirmed
  `/config/www`, `/config/custom_components`, `/addons` and
  `/parent-of-config` return HTTP `403` without approval and HTTP `200` with
  Admin approval.
- Local plugin catalog smoke test confirmed two active launchable plugins and
  one planned non-launchable plugin for the Hub selection state.
- `npm run docs:build` in `ugso-opensource-docs`
