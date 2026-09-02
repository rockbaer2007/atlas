# Sprint G2.5.9226 - Expert Zoom Step Size

## Goal

Make the Expert Card Editor Zoom slider move in clean 5-percent steps.

## Changes

- Changed the Zoom slider range to `75%` through `150%` with 5-percent steps.
- Rounded restored Zoom values to the nearest 5-percent step.
- Bumped the Home Assistant Card Editor plugin to `0.2.0-alpha.46`.
- Bumped the Home Assistant App/Add-on package to `0.1.118`.

## Verification

- `node --check examples/status-demo/app.js`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm build`
- `pnpm ha:app:prepare`
