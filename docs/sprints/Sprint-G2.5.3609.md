# Sprint G2.5.3609 - Preserve Admin Translation Provider

## Summary

- Merged Admin server and shared-cookie connection settings so stale `none` provider values no longer hide a configured module.
- Preserved the last known Card Editor translation provider in local editor settings.
- Prevented stale Admin server restores from overwriting a local non-default provider selection.
- Added a visible "not configured" translation-module status when no provider is available.

## Verification

- `node --check examples/status-demo/app.js`
- `node --check examples/admin-demo/app.js`
- `git diff --check`
- `pnpm build`
