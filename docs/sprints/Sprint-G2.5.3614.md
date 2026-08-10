# Sprint G2.5.3614 - Reject Unsafe HACS Bundle Paths

## Summary

- Added HACS bundle archive checks for unsafe ZIP paths such as parent traversal, absolute paths, drive paths and backslash paths.
- Added duplicate path detection to HACS card bundle archive inspection.
- Made unsafe or duplicate archive paths block ATLAS HACS card package import.
- Added regression coverage for safe generated bundles and rejected unsafe or duplicate bundle paths.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
