# Sprint G2.5.3649 - HACS Readiness Example Match

## Summary

- Added the `example-type-matches-package` readiness check.
- Reported whether the Lovelace example type matches the embedded package card type.
- Connected example readiness validation to the shared 30-check report.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
