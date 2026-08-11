# Sprint G2.5.3652 - HACS Readiness Package Entities

## Summary

- Added the `package-contains-entities` readiness check.
- Reported whether the embedded ATLAS package contains importable entity IDs.
- Kept empty-package diagnostics ready for later editor import UX.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
