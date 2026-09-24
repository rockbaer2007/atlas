# Sprint G2.5.9234 - Remember Terminal Access Token

Goal:

Remember the user's ATLAS Terminal access token between browser visits.

Implementation:

* Save the token in browser local storage while the user types it.
* Restore it into the masked token field when reopening the Terminal plugin.
* Keep it on disconnect and add a control to forget it explicitly.
* Explain local browser storage and its same-origin script access in the UI and
  Add-on documentation.
* Bump ATLAS, Terminal plugin and Home Assistant Add-on versions.

Validation:

* `pnpm test`
* `pnpm check`
* `pnpm build`
* `git diff --check`

Status:

Completed.
