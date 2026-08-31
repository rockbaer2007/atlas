# Sprint G2.5.9163 - Home Assistant Ingress Auto-Connect

## Summary

- Routed Card Editor Admin API calls through the Card Editor server so Home Assistant ingress can load saved Add-on connection settings without opening Administration first.
- Kept the Home Assistant token and auto-connect option available to the Editor on the same ingress surface.
- Bumped the Home Assistant App/Add-on preview package to `0.1.3`.

## Verification

- `node --check examples/status-demo/app.js`
- `node --check examples/status-demo/server.mjs`
- `pnpm ha:app:prepare`
- `docker build --no-cache -t atlas-home-assistant-app:local output\home-assistant-app\atlas`
- `Invoke-RestMethod http://127.0.0.1:4174/api/admin-connection`
- `Invoke-RestMethod http://127.0.0.1:4176/health`
- `docker inspect -f '{{.State.Health.Status}}' atlas-ha-app-test`
