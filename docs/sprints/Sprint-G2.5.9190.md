# Sprint G2.5.9190

## Goal

Use the real ATLAS app icon in the branded repository install button.

## Changes

- Added the ATLAS app icon to the Administration demo assets.
- Replaced the inline repository button mark with the real ATLAS app icon.
- Added explicit PNG serving support to the Administration demo server.
- Bumped the Home Assistant App/Add-on preview package to `0.1.27`.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `pnpm build`
- `pnpm --filter @atlas/homeassistant test`
- `git diff --check -- examples/admin-demo/index.html examples/admin-demo/server.mjs packaging/home-assistant-app/atlas/config.yaml packaging/home-assistant-app/atlas/CHANGELOG.md docs/sprints/Sprint-G2.5.9190.md`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.27`.
- Confirmed prepared Administration output contains `atlas-icon.png`.
- Confirmed local Administration serves `atlas-icon.png` as `image/png` with
  HTTP `200`.
- Confirmed local app server `/health` reports ready Administration and Card
  Editor surfaces.
- `docker build -t atlas-ha-app:0.1.27 output/home-assistant-app/atlas`
