# Sprint G2.5.9210

## Goal

Make the Plugin Hub sidebar helper direct and useful for File Studio.

## Changes

- Changed the Plugin Hub sidebar hint button to open the Administration sidebar
  helper dialog directly.
- Added ready-to-copy `panel_iframe` YAML blocks to the plugin sidebar helper.
- Kept direct plugin URLs visible, including ATLAS File Studio at
  `/plugin-assets/file-studio/index.html`.
- Bumped the Home Assistant App/Add-on package to `0.1.102`.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/plugin-hub/app.js`
- `git diff --check`
- `pnpm build`
- `npm run docs:build` in `ugso-opensource-docs`
- Local smoke check on `http://127.0.0.1:4376/hub`,
  `http://127.0.0.1:4376/admin?sidebar=plugins` and `/api/plugins`
