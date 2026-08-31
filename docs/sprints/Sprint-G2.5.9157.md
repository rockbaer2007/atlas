# Sprint G2.5.9157 - Home Assistant App Preview Target

## Summary

- Added a Home Assistant App/Add-on `.dockerignore` so prepared package builds exclude stale `dist`, `node_modules` and TypeScript build-info files.
- Reused the verified exec-form container health check in the Home Assistant App/Add-on Dockerfile.
- Added `ATLAS_DISTRIBUTION_TARGET` so `/app` reports `home-assistant-app-preview` for the App/Add-on container and keeps the standalone Docker preview distinct.
- Updated app packaging docs and release readiness to mark the Home Assistant App/Add-on scaffold as an in-progress preview built from the verified container runtime.

## Verification

- `pnpm ha:app:prepare`
- `docker build --no-cache -t atlas-home-assistant-app:local output/home-assistant-app/atlas`
- `docker run -d --name atlas-ha-app-test -p 4176:4176 -p 4175:4175 -p 4174:4174 atlas-home-assistant-app:local`
- `GET http://127.0.0.1:4176/app` reports `home-assistant-app-preview`
- `GET http://127.0.0.1:4176/health`
- `docker inspect atlas-ha-app-test --format '{{json .State.Health}}'`
- `node --check scripts/atlas-app-server.mjs`
- `node --check examples/admin-demo/app.js`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm build`
