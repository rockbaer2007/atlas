# Sprint G2.5.3650 - HACS Readiness README Resource

## Summary

- Added the `readme-mentions-resource-path` readiness check.
- Reported whether the README documents the generated HACS resource path.
- Kept README resource guidance visible in import review output.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
