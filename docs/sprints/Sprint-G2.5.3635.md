# Sprint G2.5.3635 - HACS Readiness Script In Archive

## Summary

- Added the `hacs-script-in-archive` readiness check.
- Reported whether the manifest filename matches a root script file.
- Kept archive filename drift visible before package-level script matching.

## Verification

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `node --check examples/status-demo/app.js`
- `pnpm build`
- `git diff --check`
