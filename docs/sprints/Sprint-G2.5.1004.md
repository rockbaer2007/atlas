# Sprint G2.5.1004 - Fix external plugin installation through Ingress

Goal:

Allow plugins from separate repositories to install in the Home Assistant add-on.

Implementation:

* Validate Home Assistant Ingress forwarded origins using trusted Ingress headers and source address.
* Show the server's plugin-installation error in the Plugin Manager.
* Add regression tests and bump the Home Assistant app package to 0.1.243.

Validation:

* `node --test scripts/atlas-request-origin.test.mjs`
* `pnpm test`
* `pnpm build`
* `pnpm ha:app:prepare`
* `git diff --check`
