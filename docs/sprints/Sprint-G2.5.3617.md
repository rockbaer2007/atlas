# Sprint G2.5.3617 - Validate HACS Bundle Manifest Locales

## Summary

- Added package-aware HACS bundle locale readiness checks after reading the embedded ATLAS card package.
- Verified that every language declared by the embedded package manifest has a matching `locales/*.json` file in the archive.
- Rejected HACS bundle imports when declared locale files are missing or their `_meta.language` does not match the locale path.
- Updated the status demo HACS ZIP review to show required and included locale files.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
