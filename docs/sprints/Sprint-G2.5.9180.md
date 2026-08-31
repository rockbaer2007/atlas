# Sprint G2.5.9180

## Goal

Tune the Card Editor Expert mode dark theme for Home Assistant testing.

## Changes

- Kept the Expert card list, selected entity cards and editor grid on a light
  grey working surface in dark mode.
- Changed Expert mode dropdowns to a dark ATLAS green treatment.
- Restyled Expert toolbar and action buttons with neutral dark controls,
  green hover states and a stronger green scan action.
- Bumped the Home Assistant App/Add-on preview package to `0.1.17`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm build`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.17` and still contains `editor_start_mode`.
- Confirmed prepared Card Editor HTML contains the Expert dark theme CSS for
  the light grey working surfaces, green dropdowns and Expert action buttons.
- `docker build -t atlas-ha-app:0.1.17 output/home-assistant-app/atlas`
- `git diff --check`
