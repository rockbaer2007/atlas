# Sprint G2.5.3640 - HACS Readiness Locale Path Match

## Summary

- Added the `locale-language-matches-path` readiness check.
- Reported locale files whose `_meta.language` does not match the path.
- Kept path-sensitive HACS locale validation explicit for Linux installs.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
