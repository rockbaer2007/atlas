# Sprint G2.5.9181

## Goal

Polish the Expert card-list favorite checkbox in dark mode.

## Changes

- Styled the Expert card-list favorite checkbox with a dark ATLAS green field
  and light green check color in dark mode.
- Bumped the Home Assistant App/Add-on preview package to `0.1.18`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.18` and still contains `editor_start_mode`.
- Confirmed prepared Card Editor HTML contains the dark mode favorite checkbox
  styling with green field and light ATLAS green check color.
- `docker build -t atlas-ha-app:0.1.18 output/home-assistant-app/atlas`
