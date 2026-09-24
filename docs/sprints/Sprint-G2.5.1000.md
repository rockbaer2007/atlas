# Sprint G2.5.1000 - Fix Oh My Posh Terminal Prompt Cursor

Goal:

Keep the terminal cursor at the end of the Oh My Posh prompt when a theme is enabled.

Implementation:

* Do not export Atlas's fallback `PS1` when the themed Bash startup initializes Oh My Posh.
* Preserve the fallback prompt for unthemed local Linux sessions.

Validation:

* `node --check scripts/atlas-app-server.mjs`
* `git diff --check`
