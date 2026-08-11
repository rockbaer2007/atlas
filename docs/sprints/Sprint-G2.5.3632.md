# Sprint G2.5.3632 - HACS Readiness ATLAS Package Presence

## Summary

- Added the `has-atlas-package` readiness check.
- Reported whether an embedded `atlas/*.atlas-card.json` package exists.
- Listed detected embedded ATLAS packages in the readiness detail.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
