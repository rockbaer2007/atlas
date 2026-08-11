# Sprint G2.5.3638 - HACS Readiness Locale JSON

## Summary

- Added the `locale-json-readable` readiness check.
- Reported invalid JSON in declared locale files as a failed report item.
- Kept locale parsing failures visible without losing the archive review context.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
