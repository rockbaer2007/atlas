# Sprint G2.5.9203

## Goal

Finish the File Studio YAML, trash, favorites, icon and polish stage.

## Changes

- Added a restorable ATLAS trash flow for File Studio delete operations.
- Added a File Studio trash dialog with restore support.
- Added File Studio favorites for quick access to common files and folders.
- Expanded Home Assistant YAML hints for common root keys, automation shape,
  script shape and direct secret-like values.
- Refined file-type icons with compact type badges.
- Bumped File Studio to `0.1.33` and the Home Assistant App/Add-on package to
  `0.1.95`.

## Verification

- `node --check scripts/atlas-app-server.mjs`
- `pnpm --filter @atlas/file-studio test`
- `pnpm build`
- `pnpm ha:app:prepare`
- File Studio API smoke test on `http://127.0.0.1:4176/` for YAML warnings,
  trash delete, trash listing and restore.
- Local File Studio UI check on `http://127.0.0.1:4176/` confirmed favorites,
  trash control, type badges and no console errors.
- `npm run docs:build` in `ugso-opensource-docs`
