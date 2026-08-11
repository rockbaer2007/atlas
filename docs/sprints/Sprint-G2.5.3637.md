# Sprint G2.5.3637 - HACS Readiness Declared Locales

## Summary

- Added the `declared-locales-present` readiness check.
- Reported missing locale files declared by the embedded ATLAS package.
- Kept required locale completeness visible in the shared report.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
