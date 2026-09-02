# Sprint G2.5.9204

## Goal

Polish the File Studio trash control with a dedicated icon and clearer state.

## Changes

- Added a dedicated MIT-licensed SVG trash icon for File Studio.
- Moved the trash control to the far right of the editor toolbar behind a
  separator.
- Added empty/full trash states: gray when empty, red when entries exist.
- Bumped File Studio to `0.1.34` and the Home Assistant App/Add-on package to
  `0.1.96`.

## Verification

- `node --check scripts/atlas-app-server.mjs`
- `pnpm --filter @atlas/file-studio test`
- `pnpm build`
- `pnpm ha:app:prepare`
- Local File Studio UI check on `http://127.0.0.1:4176/` confirmed the trash
  button is `32x32`, right-aligned behind a separator and switches from gray
  empty state to red full state without console errors.
- `npm run docs:build` in `ugso-opensource-docs`
