# Sprint G2.5.3605 - Translation Module Handoff Without Token

## Summary

- Allowed Atlas Administration to open the Card Editor and send translation module settings without a Home Assistant token.
- Updated the Card Editor to treat translation-provider-only settings as a valid Admin handoff.
- Kept Home Assistant connection itself token-protected.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/status-demo/app.js`
- `git diff --check`
- `pnpm build`
