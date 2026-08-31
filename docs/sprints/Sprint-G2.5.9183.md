# Sprint G2.5.9183

## Goal

Add sorting to the detected Home Assistant entities table.

## Changes

- Added clickable sort controls to the `Entity`, `State` and `Type / source`
  table headers.
- Defaulted the detected entity table to `Type / source` sorting with entity
  name/entity ID as the stable fallback.
- Added ascending/descending toggling and `aria-sort` state on sortable table
  headers.
- Bumped the Home Assistant App/Add-on preview package to `0.1.20`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check -- examples/status-demo/index.html examples/status-demo/app.js packaging/home-assistant-app/atlas/config.yaml packaging/home-assistant-app/atlas/CHANGELOG.md docs/sprints/Sprint-G2.5.9183.md`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.20` and still contains `editor_start_mode`.
- Confirmed prepared Card Editor output contains `entityTableSort`,
  `atlas-entity-sort-button` and `aria-sort`.
- `docker build -t atlas-ha-app:0.1.20 output/home-assistant-app/atlas`
