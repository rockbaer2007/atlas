# Sprint G2.5.9184

## Goal

Avoid empty Home Assistant dashboard cards when exporting a Simple card without
selected entities.

## Changes

- Added a Simple card export fallback to `binary_sensor.atlas_status` and
  `sensor.atlas_temperature` when no entities are selected.
- Kept the editor entity input unchanged; the fallback is only applied to the
  generated export/copy/package payload.
- Added a visible status hint when ATLAS example entities are inserted for an
  export.
- Bumped the Home Assistant App/Add-on preview package to `0.1.21`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check -- examples/status-demo/app.js packaging/home-assistant-app/atlas/config.yaml packaging/home-assistant-app/atlas/CHANGELOG.md docs/sprints/Sprint-G2.5.9184.md`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.21` and still contains `editor_start_mode`.
- Confirmed prepared Card Editor output contains `defaultAtlasExportEntityIds`,
  `cardExportEntityIds`, `useExportFallback` and the fallback status messages.
- `docker build -t atlas-ha-app:0.1.21 output/home-assistant-app/atlas`
