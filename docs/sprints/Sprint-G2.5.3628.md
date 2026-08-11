# Sprint G2.5.3628 - HACS Readiness Manifest Presence

## Summary

- Added the `has-hacs-manifest` readiness check.
- Made `hacs.json` presence visible in the shared readiness report.
- Kept missing manifest failures separate from later manifest content checks.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
