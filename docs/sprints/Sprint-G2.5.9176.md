# Sprint G2.5.9176

## Goal

Bring the Home Assistant App/Add-on changelog up to the current preview
version.

## Changes

- Added Home Assistant App/Add-on changelog entries for `0.1.11`, `0.1.12`
  and `0.1.13`.
- Rebuilt the prepared Home Assistant test package output.

## Verification

- `pnpm ha:app:prepare`
- Confirmed prepared output changelog starts at `0.1.13`
- Confirmed prepared output `config.yaml` version is `0.1.13`
- `docker build -t atlas-ha-app:0.1.13 output/home-assistant-app/atlas`
- `git diff --check`
