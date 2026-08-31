# Sprint G2.5.9178

## Goal

Align Administration navigation and connection editing with the new Plugin Hub
and Home Assistant App/Add-on option flow.

## Changes

- Renamed the Administration launch action to Plugin Hub.
- Changed the launch action to open the Plugin Hub instead of the Card Editor
  directly.
- Added Home Assistant App/Add-on runtime detection for connection controls.
- Made Home Assistant URL, access token, remember-token and auto-connect
  controls read-only/display-only in the Home Assistant App/Add-on mode.
- Kept connection controls editable for Docker and Linux distribution targets.
- Bumped the Home Assistant App/Add-on preview package to `0.1.15`.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `node --check scripts/atlas-app-server.mjs`
- `pnpm build`
- `pnpm ha:app:prepare`
- Confirmed prepared output `config.yaml` version is `0.1.15`.
- Confirmed local Home Assistant App preview mode reports the full option token,
  `rememberToken`, `autoConnectEditor` and `distributionTarget`.
- `docker build -t atlas-ha-app:0.1.15 output/home-assistant-app/atlas`
- Confirmed the Docker image answers `/health`, reports
  `home-assistant-app-preview`, exposes the Hub URL and serves the Admin Hub
  button with read-only connection control wiring.
- `git diff --check`
