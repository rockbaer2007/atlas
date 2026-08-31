# Sprint G2.5.9162 - Admin Editor Same Frame Navigation

## Summary

- Corrected the Administration "Open Card Editor" action to navigate the current Home Assistant content frame instead of opening a new browser tab.
- Kept Administration settings persistence before navigation so the Card Editor can restore the connection through the Admin API.

## Verification

- `node --check examples/admin-demo/app.js`
- `git diff --check`
