# Sprint G2.5.9159 - Add-on Admin Token Options

## Summary

- Added Home Assistant URL, token, token-import and Card Editor auto-connect options to the Home Assistant App/Add-on configuration.
- Added German and English option labels for the Add-on configuration UI.
- Passed Add-on options from `/data/options.json` into ATLAS Administration during container startup.
- Seeded the Admin connection API from the Add-on-provided values while keeping the Card Editor on session handoff only.
- Bumped the Add-on preview version to `0.1.1` and documented the new connection options.

## Verification

- `pnpm ha:app:prepare`
- `node --check examples/admin-demo/server.mjs`
- `docker build --no-cache -t atlas-home-assistant-app:local output/home-assistant-app/atlas`
- `docker run` with simulated `/data/options.json`
- `GET http://127.0.0.1:4175/api/admin-connection?includeSecrets=1`
- `GET http://127.0.0.1:4176/health`
- `docker inspect atlas-ha-app-test --format '{{json .State.Health}}'`
