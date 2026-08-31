# Sprint G2.5.9160 - Add-on Token Placeholder Guard

## Summary

- Changed the Home Assistant token Add-on option from password schema to plain string schema to avoid shortened password placeholders.
- Added startup validation so ATLAS Administration ignores masked or implausibly short Add-on token values.
- Logged only token lengths when Add-on token import is accepted or ignored.
- Documented why the Add-on token appears as a text field and remains owned by Administration.

## Verification

- `pnpm ha:app:prepare`
- `node --check examples/admin-demo/server.mjs`
- `docker build --no-cache -t atlas-home-assistant-app:local output/home-assistant-app/atlas`
- Simulated `/data/options.json` with masked short token: Admin receives no token.
- Simulated `/data/options.json` with long token: Admin receives the full token length.
- `GET http://127.0.0.1:4176/health`
- `docker inspect atlas-ha-app-test --format '{{json .State.Health}}'`
- `git diff --check`
