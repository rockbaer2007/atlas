# Sprint G2.5.9201

## Goal

Keep the File Studio Dateibaum header compact and stable in narrow layouts.

## Changes

- Split the Dateibaum header into a title/path row and a separate icon toolbar
  row.
- Kept the Dateibaum toolbar left-aligned and wrapping inside the tree panel so
  icons do not slide into the neighboring column.
- Bumped File Studio to `0.1.31` and the Home Assistant App/Add-on package to
  `0.1.93`.

## Verification

- `node --check scripts/atlas-app-server.mjs`
- `pnpm --filter @atlas/file-studio test`
- `pnpm build`
- `pnpm ha:app:prepare`
- Local File Studio layout check on `http://127.0.0.1:4176/` confirmed the
  Dateibaum toolbar stays inside the tree panel with `32x32` icon buttons.
