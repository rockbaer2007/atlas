# Sprint G2.5.3602 - Bound Admin Secrets To Installation

## Summary

- Added a local Atlas Administration installation identity served through `/api/admin-device`.
- Bound encrypted Admin secrets to that installation identity so copied settings are invalid on another instance.
- Documented `ATLAS_INSTANCE_ID` for deliberate Docker/server identity pinning.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `git diff --check`
- `pnpm build`
