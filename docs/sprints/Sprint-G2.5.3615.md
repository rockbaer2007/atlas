# Sprint G2.5.3615 - Structure HACS Bundle Import Diagnostics

## Summary

- Added structured HACS bundle archive issues for missing files, unsafe paths and duplicate paths.
- Kept the existing human-readable archive rejection reason generated from the structured issues.
- Added regression coverage for valid bundles, missing bundle files and unsafe duplicate paths.
- Updated the status demo to show HACS ZIP import diagnostics as multiline review details with script metadata and issue paths.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
