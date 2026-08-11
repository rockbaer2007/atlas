# Sprint G2.5.3647 - HACS Readiness Example JSON

## Summary

- Added the `example-json-readable` readiness check.
- Reported invalid Lovelace example JSON as a failed report item.
- Kept example JSON parsing separate from example type validation.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
