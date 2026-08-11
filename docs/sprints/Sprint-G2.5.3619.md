# Sprint G2.5.3619 - Format HACS Locale Review Lines

## Summary

- Added a reusable HACS bundle package review formatter in `@atlas/homeassistant`.
- Included required, archived, missing and invalid locale details in HACS ZIP import review lines.
- Updated the status demo to use the shared formatter instead of local review string assembly.
- Added regression coverage for missing and mismatched locale review output.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
