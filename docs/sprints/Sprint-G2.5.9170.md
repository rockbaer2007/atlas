# Sprint G2.5.9170 - Plugin Hub Start Rules

## Summary

- Added Plugin Hub start rules to the ATLAS roadmap and plugin specification.
- Changed the app root to open the only active plugin directly, while keeping
  the Hub available for zero or multiple active plugins.
- Marked the Home Assistant Card Editor manifest as the first active plugin and
  kept the Simple Editor as a planned discovery entry.
- Added the first Administration repository URL preview flow for loading a
  HACS-like `repository.json` catalog.
- Pointed Home Assistant App/Add-on ingress at the ATLAS app runtime on port
  `4176` so the plugin start decision runs before plugin launch.
- Bumped the Home Assistant App/Add-on preview package to `0.1.10`.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/plugin-hub/app.js`
- `node --check scripts/atlas-app-server.mjs`
- `pnpm ha:app:prepare`
- Local app server root redirect test on `4276`
- Local Plugin Hub and `/api/plugins` checks
- Home Assistant App/Add-on Docker build
- Home Assistant App/Add-on container root redirect, `/api/plugins` and health checks
- `git diff --check`
