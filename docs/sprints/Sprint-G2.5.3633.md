# Sprint G2.5.3633 - HACS Readiness English Locale

## Summary

- Added the `has-english-locale` readiness check.
- Made the required `locales/en.json` fallback visible in the report.
- Kept English locale presence separate from declared-language completeness.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
