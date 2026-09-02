# Sprint G2.5.9217 - Expert Grid Slider Geometry

## Goal

Fix Expert Card Editor raster controls so horizontal and vertical sliders add
real grid fields while Zoom remains responsible for visual scale.

## Changes

- Included grid gaps in the Expert editor surface width and height
  calculation.
- Bound the rendered surface grid to the computed dimensions so rows and
  columns keep square geometry.
- Bumped the Home Assistant Card Editor plugin to `0.2.0-alpha.39`.
- Bumped the Home Assistant App/Add-on package to `0.1.109`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm build`
- Local browser smoke test of Expert grid sliders and zoom
- `git diff --check`
- `pnpm ha:app:prepare`
