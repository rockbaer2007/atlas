# Sprint G2.5.3601 - Encrypted Admin Settings Export

## Summary

- Expanded encrypted Admin secret persistence to cover the Home Assistant token and all translation provider API keys.
- Removed the raw Home Assistant token from the shared Admin connection cookie.
- Added `atlas-admin-settings.json` export with readable settings and AES-GCM-encrypted secrets.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `git diff --check`
- `pnpm build`
