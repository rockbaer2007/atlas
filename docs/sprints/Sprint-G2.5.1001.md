# Sprint G2.5.1001 - Home Assistant Terminal Welcome Banner

Goal:

Show the familiar Home Assistant welcome and system information when opening the local ATLAS terminal.

Implementation:

* Print the welcome banner once when the local interactive Bash session starts.
* Display system information through the available `ha info` command.
* Keep SSH terminal sessions unchanged and initialize Oh My Posh after the welcome output.

Validation:

* `node --check scripts/atlas-app-server.mjs`
* `git diff --check`
* `pnpm build`
* `pnpm ha:app:prepare`
