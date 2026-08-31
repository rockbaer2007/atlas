# Sprint G2.5.9185

## Goal

Keep the detected Home Assistant entities table out of the way by default.

## Changes

- Removed the default open state from `In HA erkannte Entitäten`.
- Kept the detected entity table as a separate manually collapsible section for
  both Simple and Expert mode.
- Bumped the Home Assistant App/Add-on preview package to `0.1.22`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check -- examples/status-demo/index.html packaging/home-assistant-app/atlas/config.yaml packaging/home-assistant-app/atlas/CHANGELOG.md docs/sprints/Sprint-G2.5.9185.md`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.22` and still contains `editor_start_mode`.
- Confirmed prepared Card Editor output renders `selected-entities-panel`
  without the initial `open` attribute.
- `docker build -t atlas-ha-app:0.1.22 output/home-assistant-app/atlas`
