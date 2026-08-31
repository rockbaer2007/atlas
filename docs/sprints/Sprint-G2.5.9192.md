# Sprint G2.5.9192

## Goal

Fix the ATLAS repository button icon in Home Assistant.

## Changes

- Changed the repository button icon path to the Admin demo asset route so it
  works outside the local file URL context.
- Bumped the Home Assistant App/Add-on preview package to `0.1.29`.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `pnpm build`
- `pnpm --filter @atlas/homeassistant test`
- `git diff --check -- examples/admin-demo/index.html packaging/home-assistant-app/atlas/config.yaml packaging/home-assistant-app/atlas/CHANGELOG.md docs/sprints/Sprint-G2.5.9192.md`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.29`.
- Confirmed prepared Administration output uses
  `/examples/admin-demo/atlas-icon.png`.
- Confirmed local Administration serves the icon with HTTP `200` and
  `image/png`.
- `docker build -t atlas-ha-app:0.1.29 output/home-assistant-app/atlas`
