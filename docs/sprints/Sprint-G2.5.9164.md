# Sprint G2.5.9164 - Admin Editor Host Navigation

## Summary

- Updated the Administration "Open Card Editor" action to derive the editor URL
  from the current browser host instead of the fixed `127.0.0.1` loopback URL.
- Bumped the Home Assistant App/Add-on preview package to `0.1.4`.

## Verification

- `node --check examples/admin-demo/app.js`
- `pnpm ha:app:prepare`
- `git diff --check`
