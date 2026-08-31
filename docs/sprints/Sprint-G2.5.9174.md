# Sprint G2.5.9174

## Goal

Begin the real ATLAS light/dark/auto theme implementation.

## Changes

- Added a visible light/dark/auto theme switch to ATLAS Administration.
- Persisted the selected theme preference as shared browser state.
- Added dark ATLAS design variables for Administration.
- Updated Plugin Hub to follow the shared ATLAS theme preference.
- Added explicit dark status colors for readiness and plugin states.
- Bumped the Home Assistant App/Add-on package version to `0.1.13`.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/plugin-hub/app.js`
- `pnpm ha:app:prepare`
- Local app smoke test on test ports: `/health`, Administration theme HTML,
  Plugin Hub theme script and `/api/plugins`
- `docker build -t atlas-ha-app:0.1.13 output/home-assistant-app/atlas`
- Container smoke test on test ports: `/health`, Administration theme HTML,
  Plugin Hub theme script and `/api/plugins`
- `git diff --check`
