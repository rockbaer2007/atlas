# Sprint G2.5.9161 - Admin Editor New Tab

## Summary

- Changed the Administration "Open Card Editor" action to open a fresh browser tab instead of reusing the named editor window.
- Kept the existing Administration-to-Editor session handoff attempts for the newly opened tab.

## Verification

- `node --check examples/admin-demo/app.js`
- `git diff --check`
