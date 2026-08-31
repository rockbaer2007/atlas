# Sprint G2.5.9182

## Goal

Split the Card Editor entity areas into clearer collapsible sections and make
the detected Home Assistant entities easier to scan.

## Changes

- Renamed the entity picker section to `Entities for the card` / `Entitäten für
  die Card`.
- Renamed the lower selected entity section to `Entities detected in HA` / `In
  HA erkannte Entitäten`.
- Converted the lower entity list from individual cards into a table with
  columns for entity, state, type/source and actions.
- Kept both entity areas as separate collapsible sections.
- Bumped the Home Assistant App/Add-on preview package to `0.1.19`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check -- examples/status-demo/index.html examples/status-demo/app.js packaging/home-assistant-app/atlas/config.yaml packaging/home-assistant-app/atlas/CHANGELOG.md docs/sprints/Sprint-G2.5.9182.md`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.19` and still contains `editor_start_mode`.
- Confirmed prepared Card Editor output contains the new entity headings and
  `atlas-entity-table` markup/style hooks.
- `docker build -t atlas-ha-app:0.1.19 output/home-assistant-app/atlas`
