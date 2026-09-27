# Sprint G2.5.9247 - Install published ATLAS plugin packages

Goal:

Install plugins from separate repositories that publish the ATLAS plugin-package schema.

Implementation:

* Normalize `atlas.plugin.package` schema version 1 into the Runtime install-package contract.
* Infer missing asset media types from their file extensions.
* Cover valid and invalid schema cases with Runtime parser tests.
* Bump the Home Assistant app package to 0.1.246.

Validation:

* `pnpm --filter @atlas/runtime test`
* `pnpm --filter @atlas/runtime check`
* `pnpm build`
* `pnpm ha:app:prepare`
* `git diff --check`
