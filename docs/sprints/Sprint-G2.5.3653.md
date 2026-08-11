# Sprint G2.5.3653 - HACS Readiness ATLAS Export

## Summary

- Added the `package-is-atlas-export` readiness check.
- Reported whether the embedded package is recognized as an ATLAS card export.
- Kept package provenance visible in the import readiness report.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
