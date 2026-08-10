# Sprint G2.5.3612 - Validate HACS Bundle Package Import

## Summary

- Added import summaries to readable ATLAS Home Assistant HACS card bundle packages.
- Made HACS bundle imports reject archives whose embedded ATLAS card package cannot be parsed into a supported card.
- Reused the package import summary in the status demo so HACS ZIP imports follow the same apply path as normal card imports.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm build`
- `git diff --check`
