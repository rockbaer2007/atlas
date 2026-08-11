# Sprint G2.5.3623 - Validate HACS Script Readiness

## Summary

- Added script readiness diagnostics for ATLAS Home Assistant HACS card bundle imports.
- Verified that the bundled JavaScript defines the embedded ATLAS custom element.
- Rejected HACS bundle imports when the script content no longer matches the packaged card export.
- Added review-line output and regression coverage for script readiness.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
