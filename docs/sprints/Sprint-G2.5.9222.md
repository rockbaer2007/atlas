# Sprint G2.5.9222 - Expert Grid Cell Rendering

## Goal

Make the Expert Card Editor raster sliders visibly add real grid fields instead
of making the existing grid look stretched.

## Changes

- Rendered each Expert Card Editor raster cell as an explicit DOM element.
- Applied explicit grid column and row geometry to the editor surface.
- Re-rendered the editor surface after zoom changes so cell size and visible
  fields stay synchronized.
- Bumped the Home Assistant Card Editor plugin to `0.2.0-alpha.42`.
- Bumped the Home Assistant App/Add-on package to `0.1.114`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm build`
- `pnpm ha:app:prepare`
