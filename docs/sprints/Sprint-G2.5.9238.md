# Sprint G2.5.9238 - Add Terminal Hub Navigation

Goal:

Provide a visible way to return from the standalone ATLAS Terminal plugin to
the Plugin Hub while preserving Home Assistant Ingress paths.

Implementation:

* Add a localized toolbar link using a relative Hub route, preserving any
  Home Assistant Ingress prefix.
* Release the standalone plugin as `0.1.2`, the add-on as `0.1.210` and the
  framework package as `0.2.0-alpha.78`.

Validation:

* `pnpm test`
* `pnpm check`
* `pnpm build`
* Standalone plugin package build
* `git diff --check`

Live navigation in Home Assistant requires installing the updated plugin and
restarting the ATLAS Add-on.

Status:

Completed.
