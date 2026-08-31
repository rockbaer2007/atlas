# Sprint G2.5.9169 - Plugin Hub Manifest Discovery

## Summary

- Added an `atlas-plugins` manifest folder structure with preview/icon assets.
- Added the first Plugin Hub surface on the app server with automatic manifest
  discovery and visual plugin cards.
- Added a planned Simple Editor manifest as the second-plugin discovery test.
- Exposed the plugin catalog through `/api/plugins` and `/app`.
- Packaged plugin manifests and the hub surface in standalone Docker and the
  Home Assistant App/Add-on preview.
- Bumped the Home Assistant App/Add-on preview package to `0.1.9`.

## Verification

- `node --check scripts/atlas-app-server.mjs`
- `node --check examples/plugin-hub/app.js`
- `pnpm ha:app:prepare`
- Local app server on ports `4274`, `4275` and `4276`
- `GET http://127.0.0.1:4276/api/plugins` returns Card Editor and Simple Editor manifests
- `GET http://127.0.0.1:4276/hub`
- `GET http://127.0.0.1:4276/plugin-assets/homeassistant-card-editor/preview.svg`
- `docker build --no-cache -t atlas-home-assistant-app:local output\home-assistant-app\atlas`
- Home Assistant App/Add-on container `/api/plugins`, `/hub`, plugin asset and health checks
- `docker build --no-cache -t atlas:local .`
- `git diff --check`
