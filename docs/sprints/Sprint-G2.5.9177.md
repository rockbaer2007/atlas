# Sprint G2.5.9177

## Goal

Add the shared ATLAS theme selection to the Card Editor surface.

## Changes

- Added the Auto/Light/Dark theme selector to the Card Editor header.
- Connected the Card Editor to the shared `atlas.themePreference` storage key
  used by Administration and the Plugin Hub.
- Added dark-mode Card Editor surface styling for Home Assistant embedding.
- Bumped the Home Assistant App/Add-on preview package to `0.1.14`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm build`
- `pnpm ha:app:prepare`
- Confirmed prepared output `config.yaml` version is `0.1.14`.
- Confirmed local Card Editor HTML and JavaScript expose the shared theme
  selector and `atlas.themePreference` handling.
- `docker build -t atlas-ha-app:0.1.14 output/home-assistant-app/atlas`
- Confirmed the Docker image answers `/health` and serves the Card Editor theme
  selector.
- `git diff --check`
