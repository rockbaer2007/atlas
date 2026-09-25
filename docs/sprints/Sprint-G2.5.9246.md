# Sprint G2.5.9246 - Custom PNG Icons in the Plugin Generator

## Goal

Let plugin authors choose either a searchable MDI icon or their own colored PNG icon.

## Changes

- Added an MDI/PNG source selector to the Administration plugin generator.
- Added PNG signature validation and a 512 KiB upload limit, with an inline preview.
- Included the selected PNG in the generated install package and referenced it from the plugin manifest and starter page.
- Preserved PNG icon previews for locally imported packages without putting image data into the shared catalog cookie.
- Kept MDI attribution and license files exclusive to packages that use MDI icons.
- Added explicit base64 encoding support for binary install-package assets.
- Bumped the Home Assistant App package to 0.1.235.

## Verification

- `node --check examples/admin-demo/app.js`
- `pnpm --filter @atlas/runtime test`
- `pnpm build`
- `pnpm ha:app:prepare`
- `git diff --check`
