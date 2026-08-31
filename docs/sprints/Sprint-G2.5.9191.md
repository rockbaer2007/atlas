# Sprint G2.5.9191

## Goal

Keep the upper Home Assistant entity summary readable when many entities are
detected.

## Changes

- Replaced long selected-entity summary text with compact chips.
- Show only the important entity counts for ready, pending and blocked states.
- Keep detailed entity names and values in the existing scrollable entity
  table instead of duplicating them in the summary.
- Applied the same compact summary path for Simple and Expert workflows.
- Bumped the Home Assistant App/Add-on preview package to `0.1.28`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm build`
- `pnpm --filter @atlas/homeassistant test`
- `git diff --check -- examples/status-demo/app.js examples/status-demo/index.html packaging/home-assistant-app/atlas/config.yaml packaging/home-assistant-app/atlas/CHANGELOG.md docs/sprints/Sprint-G2.5.9191.md`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.28`.
- Confirmed prepared Card Editor output contains the compact entity summary
  chip renderer and no long attention entity list in the upper summary.
- Confirmed local Card Editor returns HTTP `200`.
- Confirmed local app server `/health` reports ready Administration and Card
  Editor surfaces.
- `docker build -t atlas-ha-app:0.1.28 output/home-assistant-app/atlas`
