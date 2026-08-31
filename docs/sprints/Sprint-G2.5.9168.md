# Sprint G2.5.9168 - Ingress Base Auto-Connect

## Summary

- Resolved Card Editor Admin API URLs against the current editor surface with a
  normalized trailing slash so Home Assistant ingress paths without a trailing
  slash still reach the Add-on API.
- Bumped the Home Assistant App/Add-on preview package to `0.1.8`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm ha:app:prepare`
- URL resolution check for direct port and Home Assistant ingress-style paths
- `docker build --no-cache -t atlas-home-assistant-app:local output\home-assistant-app\atlas`
- `GET http://127.0.0.1:4174/api/admin-connection` returns `autoConnectEditor: true` and the full token in the simulated Add-on run
- Docker health check
- `git diff --check`
