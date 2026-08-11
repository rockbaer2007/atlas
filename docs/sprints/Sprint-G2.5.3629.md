# Sprint G2.5.3629 - HACS Readiness README Presence

## Summary

- Added the `has-readme` readiness check.
- Made `README.md` archive presence visible before README content validation.
- Preserved later README resource and card type checks as separate report items.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
