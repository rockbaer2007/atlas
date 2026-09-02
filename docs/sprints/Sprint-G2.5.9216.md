# Sprint G2.5.9216 - Automatic Plugin URLs

## Goal

Make newly loaded local ATLAS plugins easier to use in the Hub and Home
Assistant sidebar.

## Changes

- Added automatic plugin launch URL detection for local plugin folders that
  contain `index.html` but omit `entry` in `atlas-plugin.json`.
- Exposed the plugin folder slug in the app plugin catalog.
- Documented the fallback rule for plugin authors.
- Bumped the Home Assistant App/Add-on package to `0.1.108`.

## Verification

- `node --check scripts/atlas-app-server.mjs examples/plugin-hub/app.js examples/admin-demo/app.js`
- `pnpm build`
- `git diff --check`
- `pnpm ha:app:prepare`
