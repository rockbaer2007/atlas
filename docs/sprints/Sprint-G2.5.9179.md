# Sprint G2.5.9179

## Goal

Finish the Home Assistant App/Add-on editor start-mode option and close the
remaining bright Card Editor surfaces in dark mode.

## Changes

- Added `editor_start_mode` to the Home Assistant App/Add-on options with
  `simple` and `expert` choices.
- Passed the selected start mode from Home Assistant options into the
  Administration server, saved Admin settings, the shared browser handoff and
  the Card Editor startup flow.
- Kept the editor start mode control editable for standalone Docker/Linux
  Administration and read-only when Administration runs from the Home Assistant
  App/Add-on option-managed environment.
- Improved Card Editor dark mode for entity shortcut buttons, entity search,
  resource hints, card previews, expert palette surfaces and related badges.
- Bumped the Home Assistant App/Add-on preview package to `0.1.16`.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.16` and contains `editor_start_mode`.
- Confirmed local app runtime imports `ATLAS_ADMIN_EDITOR_START_MODE=expert`,
  preserves the full Home Assistant token length and serves the Editor/Admin
  surfaces.
- `docker build -t atlas-ha-app:0.1.16 output/home-assistant-app/atlas`
- Confirmed Docker runtime health, full token length, auto-connect setting and
  `editorStartMode: expert`.
- `git diff --check`
