# Sprint G2.5.9233 - Authenticated Terminal Plugin

Goal:

Add the first ATLAS Terminal plugin with a usable browser terminal, readable
colored output and a user-adjustable font size.

Implementation:

* Added the ATLAS Terminal plugin manifest, responsive interface and xterm.js UI.
* Added a local pseudo-terminal and an optional fixed server-configured SSH target.
* Kept terminal access disabled by default and required a server-side URL-safe
  token plus same-origin WebSocket connection.
* Kept tokens, SSH destinations and key paths out of browser storage and
  browser-controlled command arguments; enforced SSH host-key verification.
* Added Docker runtime dependencies and documented setup and shell-access risks.
* Updated the framework package version, changelog, manifest and sprint index.

Validation:

* `node --check scripts/atlas-app-server.mjs`
* `pnpm check`
* `pnpm build`
* `pnpm test`
* `git diff --check`

Status:

Completed.
