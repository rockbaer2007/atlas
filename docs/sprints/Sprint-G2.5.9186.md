# Sprint G2.5.9186

## Goal

Show Card entities and detected Home Assistant entities as two separate
collapsible tables.

## Changes

- Added a compact multi-column overview table to `Entities for the card`.
- Kept the lower `Entities detected in HA` table separate and sortable.
- Left both entity sections independently collapsible in Simple and Expert
  mode.
- Bumped the Home Assistant App/Add-on preview package to `0.1.23`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check -- examples/status-demo/index.html examples/status-demo/app.js packaging/home-assistant-app/atlas/config.yaml packaging/home-assistant-app/atlas/CHANGELOG.md docs/sprints/Sprint-G2.5.9186.md`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.23` and still contains `editor_start_mode`.
- Confirmed prepared Card Editor output contains `card-entity-overview`,
  `atlas-card-entity-overview-table` and `renderCardEntityOverview`.
- `docker build -t atlas-ha-app:0.1.23 output/home-assistant-app/atlas`
