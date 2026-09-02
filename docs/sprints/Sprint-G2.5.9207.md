# Sprint G2.5.9207

## Goal

Keep File Studio status text visible when editing large files.

## Changes

- Changed the File Studio editor panel to a fixed-height flex layout.
- Made large file content scroll inside the editor instead of expanding the
  whole panel.
- Kept the editor status row outside the scrolling region.
- Bumped File Studio to `0.1.36` and the Home Assistant App/Add-on package to
  `0.1.99`.

## Verification

- `node --check scripts/atlas-app-server.mjs`
- `node --check examples/admin-demo/app.js`
- `node --check examples/plugin-hub/app.js`
- `git diff --check`
- `pnpm --filter @atlas/file-studio test`
- `pnpm build`
- `pnpm ha:app:prepare`
- `npm run docs:build` in `ugso-opensource-docs`
