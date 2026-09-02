# Sprint G2.5.9202

## Goal

Complete the next File Studio comfort expansion stage.

## Changes

- Replaced browser prompts, alerts and confirmations with compact File Studio
  in-app dialogs.
- Added multi-select delete, copy and move support for marked tree and folder
  entries.
- Added drag-and-drop uploads into the selected folder.
- Added File Studio search filters for files, directories, YAML, images and
  archives with optional content search.
- Added backup comparison from the File Studio history dialog.
- Clarified the visible `/config` and `/addons` access state.
- Bumped File Studio to `0.1.32` and the Home Assistant App/Add-on package to
  `0.1.94`.

## Verification

- `node --check scripts/atlas-app-server.mjs`
- `pnpm --filter @atlas/file-studio test`
- `pnpm build`
- `pnpm ha:app:prepare`
- File Studio API smoke test on `http://127.0.0.1:4176/` for binary upload,
  history comparison and filtered YAML search.
- Local File Studio UI check on `http://127.0.0.1:4176/` confirmed the dialog,
  multi-upload input, drop zones and tree toolbar without console errors.
