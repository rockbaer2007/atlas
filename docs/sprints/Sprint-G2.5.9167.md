# Sprint G2.5.9167 - Ingress Auto-Connect Paths

## Summary

- Changed Card Editor Admin API calls from root-relative to ingress-safe
  relative paths so saved Add-on options load before auto-connect.
- Changed the Card Editor Administration link from `/admin` to `admin` for the
  same ingress-safe behavior.
- Bumped the Home Assistant App/Add-on preview package to `0.1.7`.

## Verification

- `node --check examples/status-demo/app.js`
- `node --check examples/status-demo/server.mjs`
- `pnpm ha:app:prepare`
- `docker build --no-cache -t atlas-home-assistant-app:local output\home-assistant-app\atlas`
- `GET http://127.0.0.1:4174/api/admin-connection` returns `autoConnectEditor: true` and the full token in the simulated Add-on run
- Docker health check
- `git diff --check`
