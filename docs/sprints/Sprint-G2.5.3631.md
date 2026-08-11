# Sprint G2.5.3631 - HACS Readiness Root Script Presence

## Summary

- Added the `has-root-script` readiness check.
- Reported whether a root JavaScript file exists in the HACS archive.
- Listed detected root scripts in the readiness detail.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
