# Sprint G2.5.1006 - Surface Plugin Manager install status

Goal:

Make external plugin installation failures visible while the Plugin Manager dialog is open.

Implementation:

* Show install progress, success and detailed failures in the Plugin Manager itself.
* Show detailed uninstall failures there as well.
* Clarify that the Plugin Manager uses the Administration language selection.
* Bump the Home Assistant app package to 0.1.245.

Validation:

* `node --check examples/admin-demo/app.js`
* `pnpm build`
* `pnpm ha:app:prepare`
* `git diff --check`
