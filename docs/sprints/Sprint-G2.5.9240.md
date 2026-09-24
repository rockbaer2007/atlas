# Sprint G2.5.9240 - Show Current Terminal Version in Overview

Goal:

Keep the ATLAS Administration plugin overview in sync with the standalone Terminal plugin.

Implementation:

* Update the bundled Terminal catalog entry from its stale `0.1.1` metadata to `0.1.4`.
* Include the selectable Oh My Posh themes capability in the overview details.
* Bump the Home Assistant App/Add-on package to `0.1.213`.

Validation:

* `node --check examples/admin-demo/app.js`
* `pnpm build`
* `pnpm ha:app:prepare`
* `git diff --check`

Status:

Completed.
