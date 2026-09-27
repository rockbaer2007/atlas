# Sprint G2.5.9249 - French Plugin Hub and accessible Renderer status

Goal:

Continue the French ATLAS UI in small sections and make the live Renderer status
surface accessible and safe for dynamic Home Assistant entity text.

Implementation:

* Translate all existing Administration dictionary keys into French.
* Add French language selection, persistence, route propagation, document title
  and interface translations to Plugin Hub.
* Explain that plugin-provided names and descriptions may use their available
  language when a French value is not supplied.
* Render Theme status fragments as a polite atomic live region.
* Verify dynamically supplied title and detail values are escaped before DOM
  mounting.
* Bump the framework manifest to `0.2.0-alpha.81` and Home Assistant App to
  `0.1.259`.

Validation:

* `node --check examples/admin-demo/app.js`
* `node --check examples/plugin-hub/app.js`
* `pnpm --filter @atlas/theme test`
* `pnpm --filter @atlas/homeassistant test`
* `pnpm --filter @atlas/homeassistant check`
* `pnpm build`
* `pnpm ha:app:prepare`
* Browser check of Administration and Plugin Hub at French locale.
* `git diff --check`

Status:

Completed.
