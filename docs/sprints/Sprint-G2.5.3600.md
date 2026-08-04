# Sprint G2.5.3600 - Encrypted Admin API Key Cookie

## Summary

- Moved provider API-key persistence out of the normal Admin local configuration.
- Added an encrypted long-term Admin cookie for translation provider API keys.
- Kept raw provider keys out of the shared handoff cookie and the Card Editor handoff payload.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `git diff --check`
- `pnpm build`
