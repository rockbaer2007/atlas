# Sprint G2.5.1002 - Use Native Home Assistant Terminal Banner

Goal:

Match the Home Assistant terminal startup output, including network addresses, versions, and URLs.

Implementation:

* Use the Home Assistant CLI's native `ha banner --no-wait` command instead of a hand-built banner.
* Keep the banner limited to local terminal sessions and initialize Oh My Posh afterward.

Validation:

* `node --check scripts/atlas-app-server.mjs`
* `git diff --check`
* `pnpm build`
* `pnpm ha:app:prepare`
