# Sprint G2.5.9236 - Register Terminal in Plugin Administration

Goal:

Show the bundled ATLAS Terminal in the Administration plugin manager and include
the recent terminal releases in the Home Assistant Add-on changelog.

Implementation:

* Register the Terminal manifest and capabilities in the Administration plugin
  catalog.
* Add Terminal navigation to the Admin plugin sidebar dialog.
* Restore the missing Add-on changelog entries for versions `0.1.205` through
  `0.1.207`, then document the Admin registration in `0.1.208`.
* Bump the framework and Home Assistant package to `0.2.0-alpha.76`.

Validation:

* `pnpm test`
* `pnpm check`
* `pnpm build`
* `git diff --check`

Status:

Completed.
