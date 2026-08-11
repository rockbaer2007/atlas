# Sprint G2.5.3627 - HACS Readiness Unique Paths

## Summary

- Added the `unique-paths` readiness check for HACS bundle archives.
- Reported duplicate ZIP entries as a failed readiness item.
- Kept duplicate-path diagnostics aligned with archive inspection issues.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
