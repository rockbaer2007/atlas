# Sprint G2.5.9195

## Goal

Define the concrete ATLAS plugin repository format and prepare the demo
repository path.

## Changes

- Added the first `repository.json` format specification.
- Documented fields for repository name, version, plugin icon, preview,
  package, manifest, capabilities and compatibility.
- Documented the install package fallback behavior.
- Added Administration preview support for repository icon, preview and
  compatibility metadata.
- Added SVG asset serving support to the Administration demo server.
- Documented the planned `atlas-plugin-repository-demo` layout as the future
  plugin template seed.

## Verification

- Created and pushed public demo repository:
  `https://github.com/rockbaer2007/atlas-plugin-repository-demo`
- Validated demo `repository.json`, manifest and install package as JSON.
- Loaded the demo `repository.json` and install package from GitHub raw URLs.
- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `pnpm build`
- `pnpm --filter @atlas/homeassistant test`
- `git diff --check -- examples/admin-demo/app.js examples/admin-demo/index.html examples/admin-demo/server.mjs packaging/home-assistant-app/atlas/config.yaml packaging/home-assistant-app/atlas/CHANGELOG.md docs/project/specifications/PLUGIN_REPOSITORY_FORMAT.md docs/sprints/Sprint-G2.5.9195.md`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.31`.
- Confirmed prepared Administration output contains repository icon, preview
  and compatibility rendering.
- Confirmed local Administration serves SVG assets with HTTP `200` and
  `image/svg+xml`.
- Confirmed local app server `/health` reports ready Administration and Card
  Editor surfaces.
- `docker build -t atlas-ha-app:0.1.31 output/home-assistant-app/atlas`
