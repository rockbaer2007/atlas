# Sprint G2.5.9241 - Serve Meslo Nerd Font to Browser Terminal

Goal:

Render Oh My Posh glyphs in the ATLAS browser terminal without installing fonts on every client device.

Implementation:

* Load the regular and bold Meslo LGM Nerd Font Mono files from Home Assistant `/local/fonts/` or `/local/`.
* Keep fallback fonts available when the webfont files are unavailable.
* Release terminal plugin `0.1.5` and Home Assistant App/Add-on `0.1.214`.

Validation:

* `pnpm build`
* `pnpm ha:app:prepare`
* Standalone terminal plugin package build
* `node --check examples/admin-demo/app.js`
* `git diff --check`

Status:

Completed.
