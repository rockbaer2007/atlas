# Sprint G2.5.9239 - Render Oh My Posh Nerd Font in Web Terminal

Goal:

Make installed Meslo Nerd Font glyphs available to the ATLAS browser terminal.

Implementation:

* Prefer `MesloLGM Nerd Font Mono` before the existing monospace fallbacks.
* Document that fonts are installed on the browser client, not in Home Assistant.
* Release standalone Terminal plugin `0.1.4` and Home Assistant App/Add-on `0.1.212`.

Validation:

* Terminal plugin bundle and install package build.
* Home Assistant app package preparation.
* Root build, tests and checks.
* `git diff --check`.

Status:

Completed. The Meslo font files are also confirmed installed in the current Windows user profile. The browser may need a full restart after the updated plugin is deployed so its font cache and plugin assets refresh.
