# Sprint G2.5.9198

## Goal

Make ATLAS File Studio `/addons` access explicit and environment aware.

## Changes

- Added a Home Assistant App/Add-on option `allow_addons_path` for File Studio
  access to `/addons`.
- Kept the `/addons` approval read-only in Administration when ATLAS runs as a
  Home Assistant App/Add-on.
- Kept standalone/Docker Administration writable for the same approval.
- Updated the File Studio server API to expose `/config` by default and `/addons`
  only when the effective approval is active.
- Updated File Studio root status text so the UI shows when `/addons` is
  visible.
- Bumped Atlas Framework packages to `0.2.0-alpha.32`, Home Assistant App/Add-on
  to `0.1.74`, and File Studio to `0.1.16`.
- Added File Studio image previews for PNG, JPG/JPEG, SVG, GIF, WebP, BMP and
  ICO files through the scoped asset route.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `node --check scripts/atlas-app-server.mjs`
- `pnpm --filter @atlas/file-studio test`
- `pnpm --filter @atlas/file-studio build`
- `pnpm build`
- `pnpm ha:app:prepare`
- Local app smoke test with `ATLAS_FILE_STUDIO_ALLOW_ADDONS=1` returned `/config`
  and `/addons` roots.
- Local app smoke test with `ATLAS_FILE_STUDIO_ALLOW_ADDONS=0` returned `/config`
  and rejected `/addons` with HTTP 403.
