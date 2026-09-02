# Sprint G2.5.9208

## Goal

Help users add ATLAS plugins to the Home Assistant sidebar.

## Changes

- Added an Atlas Administration button for preparing plugin sidebar entries.
- Added a modal dialog capped at `80vw` and `80vh`.
- Listed plugins dynamically with name, URL, version, status and icon
  suggestion.
- Added a copy action for Home Assistant Webpage dashboard fields.
- Included a short Webpage dashboard setup guide in the dialog.
- Bumped the Home Assistant App/Add-on package to `0.1.100`.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `git diff --check`
- `pnpm build`
- `pnpm ha:app:prepare`
- Local app smoke test on `http://127.0.0.1:4376/` confirmed the dialog markup,
  `80vw`/`80vh` limits and Admin JavaScript wiring.
- `npm run docs:build` in `ugso-opensource-docs`
