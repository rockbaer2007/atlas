# Sprint G2.5.3639 - HACS Readiness Locale Metadata

## Summary

- Added the `locale-meta-language-present` readiness check.
- Reported missing `_meta.language` values in declared locale files.
- Kept locale metadata failures separate from JSON parsing failures.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
