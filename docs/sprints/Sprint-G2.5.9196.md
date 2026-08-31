# Sprint G2.5.9196

## Goal

Add a consistent ATLAS plugin icon and logo convention and apply it to the
first plugin surfaces.

## Changes

- Added `logo` support to runtime plugin descriptors and install packages.
- Added `logoUrl` resolution to the app plugin catalog.
- Show plugin logos in the Plugin Hub and Administration plugin lists.
- Updated the built-in Card Editor and Simple Editor plugin manifests with
  `icon`, `logo` and `preview` assets.
- Reworked Card Editor and Simple Editor icons as function-specific ATLAS
  overlay assets.
- Documented the icon, logo and preview convention in the repository format
  and architecture roadmap.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/plugin-hub/app.js`
- `node --check scripts/atlas-app-server.mjs`
- Validated demo repository JSON, manifest and install package.
- `pnpm --filter @atlas/runtime test`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm build`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on package contains version
  `0.1.32`.
- Confirmed `/api/plugins` exposes `iconUrl`, `logoUrl` and `previewUrl`.
- Confirmed local Card Editor and Simple Editor plugin logos return HTTP `200`
  with `image/svg+xml`.
- `docker build -t atlas-ha-app:0.1.32 output/home-assistant-app/atlas`
