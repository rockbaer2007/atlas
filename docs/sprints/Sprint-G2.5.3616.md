# Sprint G2.5.3616 - Require HACS Bundle English Locale

## Summary

- Added HACS bundle archive inspection for included `locales/*.json` files.
- Required `locales/en.json` as the import fallback locale for ATLAS Home Assistant HACS card bundles.
- Added a structured `missing-locale-file` issue for bundles without the required English fallback locale.
- Updated regression coverage for valid bundles and incomplete bundles missing their locale fallback.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
