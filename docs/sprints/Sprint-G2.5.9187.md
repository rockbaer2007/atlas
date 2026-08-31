# Sprint G2.5.9187

## Goal

Make the detected Home Assistant entities table easier to scan when many
entities are loaded.

## Changes

- Limited the `In HA erkannte Entitäten` table container to roughly ten visible
  rows.
- Added an internal scrollbar to the detected entities table.
- Kept the table header sticky while scrolling.
- Bumped the Home Assistant App/Add-on preview package to `0.1.24`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check -- examples/status-demo/index.html packaging/home-assistant-app/atlas/config.yaml packaging/home-assistant-app/atlas/CHANGELOG.md docs/sprints/Sprint-G2.5.9187.md`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.24` and still contains `editor_start_mode`.
- Confirmed prepared Card Editor output contains the detected entity table
  height limit, stable scrollbar gutter and sticky table header.
- `docker build -t atlas-ha-app:0.1.24 output/home-assistant-app/atlas`
