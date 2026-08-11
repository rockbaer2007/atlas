# Sprint G2.5.3626 - HACS Readiness Safe Paths

## Summary

- Added the `safe-paths` readiness check for HACS bundle archives.
- Surfaced unsafe ZIP paths as failed report items with the offending paths listed.
- Preserved the existing structured unsafe-path archive issue.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
