# Sprint G2.5.3636 - HACS Readiness Package Readability

## Summary

- Added the `atlas-package-readable` readiness check.
- Reported whether the embedded ATLAS package can be parsed into an import summary.
- Marked the check pending until a package file is available.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
