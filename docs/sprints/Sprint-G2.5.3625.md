# Sprint G2.5.3625 - HACS Readiness ZIP Check

## Summary

- Added the `zip-readable` readiness check to the HACS bundle import report.
- Counted unreadable ZIP archives as failed readiness instead of a generic import failure only.
- Kept rejected archives visible through the same 30-check report shape.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
