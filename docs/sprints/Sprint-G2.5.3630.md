# Sprint G2.5.3630 - HACS Readiness Example Presence

## Summary

- Added the `has-example-card` readiness check.
- Made `examples/lovelace-card.json` presence visible in the report.
- Kept example JSON and type validation as independent follow-up checks.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
