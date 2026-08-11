# Sprint G2.5.3651 - HACS Readiness README Card Type

## Summary

- Added the `readme-mentions-card-type` readiness check.
- Reported whether the README documents the generated custom card type.
- Kept README card usage guidance visible in import review output.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
