# Sprint G2.5.9173

## Goal

Record ATLAS File Studio as the second reference plugin direction.

## Changes

- Added ATLAS File Studio to the plugin ecosystem roadmap.
- Captured the intended Home Assistant File editor-inspired feature scope:
  file tree, editor surface, syntax highlighting, YAML validation,
  upload/download and later Git support.
- Documented safe default access rooted at `/config`.
- Added the controlled extended-area idea for approved paths behind `/config`
  without making root access the default.
- Defined planned Administration-owned path capabilities for `config`, `www`,
  `custom_components`, `addons` and optional `parent-of-config`.

## Verification

- Documentation-only change reviewed with `git diff --check`.
