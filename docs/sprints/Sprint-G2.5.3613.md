# Sprint G2.5.3613 - Check HACS Bundle Manifest Consistency

## Summary

- Added HACS manifest metadata to readable Home Assistant card bundle imports.
- Verified that `hacs.json` declares a script filename that exists as a root `.js` file in the archive.
- Verified that the HACS manifest filename matches the embedded ATLAS card package script filename case-sensitively.
- Added regression coverage for valid bundle metadata and mismatched HACS manifest filenames.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
