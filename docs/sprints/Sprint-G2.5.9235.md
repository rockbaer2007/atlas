# Sprint G2.5.9235 - Home Assistant CLI in Terminal

Goal:

Make Home Assistant commands such as `ha core check` available in the ATLAS
Terminal local shell.

Implementation:

* Install the official Home Assistant CLI in the Home Assistant App image.
* Enable the Supervisor API permission required by the CLI.
* Pass `SUPERVISOR_TOKEN` only to authenticated local terminal shells; remove it
  from SSH child processes and other secret environment variables.
* Document that local terminal access now grants Supervisor-level operations.
* Bump framework and Home Assistant App versions.

Validation:

* `pnpm test`
* `pnpm check`
* `pnpm build`
* `git diff --check`

Status:

Completed.
