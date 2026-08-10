# Sprint G2.5.3618 - Detail HACS Locale Validation

## Summary

- Added per-file invalid locale diagnostics for HACS bundle package imports.
- Reported expected language, actual `_meta.language` and failure reason for invalid locale files.
- Added regression coverage for locale metadata mismatches in declared package locales.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
