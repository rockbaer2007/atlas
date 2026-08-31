# Sprint G2.5.9188

## Goal

Finish the first usable ATLAS repository installation flow in Administration.

## Changes

- Enabled repository plugin installation from `package` or `manifest` URLs in
  `repository.json`.
- Store installed repository plugins in the persisted Administration plugin
  state with source and repository metadata.
- Added per-plugin update detection against the repository version.
- Activated the Repository preview actions for `Installieren`,
  `Aktualisieren` and `Entfernen`.
- Bumped the Home Assistant App/Add-on preview package to `0.1.25`.

## Verification

- `node --check examples/admin-demo/app.js`
- `pnpm build`
- `pnpm --filter @atlas/homeassistant test`
- `git diff --check -- examples/admin-demo/app.js packaging/home-assistant-app/atlas/config.yaml packaging/home-assistant-app/atlas/CHANGELOG.md docs/sprints/Sprint-G2.5.9188.md`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.25` and still contains `editor_start_mode`.
- Confirmed prepared Administration output contains repository install and
  update action wiring.
- Confirmed local app server `/health` reports ready Administration and Card
  Editor surfaces.
- Confirmed Administration and Card Editor return HTTP `200` locally.
- `docker build -t atlas-ha-app:0.1.25 output/home-assistant-app/atlas`
