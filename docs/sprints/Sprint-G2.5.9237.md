# Sprint G2.5.9237 - Grant Supervisor CLI Permissions

Goal:

Allow the Home Assistant CLI in the local ATLAS Terminal session to execute
Supervisor commands such as `ha core check` without an insufficient-permissions
response.

Implementation:

* Set the Home Assistant App/Add-on Supervisor API role to `manager`, matching
  the role used by the official Advanced SSH & Web Terminal app.
* Document the administrative scope of this role and bump the add-on to
  `0.1.209` and the framework package to `0.2.0-alpha.77`.

Validation:

* `pnpm test`
* `pnpm check`
* `pnpm build`
* `git diff --check`

Live validation requires restarting the updated Home Assistant App/Add-on and
running `ha core check` in its Terminal.

Status:

Completed.
