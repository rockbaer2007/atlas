# Sprint G2.5.9193

## Goal

Make the ATLAS repository button look more distinctly ATLAS-branded.

## Changes

- Darkened the repository button to an ATLAS blue/teal treatment.
- Kept the orange accent as a bottom inset line.
- Changed the right ATLAS capsule to a dark treatment with a subtle icon ring.
- Bumped the Home Assistant App/Add-on preview package to `0.1.30`.

## Verification

- `node --check examples/admin-demo/app.js`
- `node --check examples/admin-demo/server.mjs`
- `pnpm build`
- `pnpm --filter @atlas/homeassistant test`
- `git diff --check -- examples/admin-demo/index.html packaging/home-assistant-app/atlas/config.yaml packaging/home-assistant-app/atlas/CHANGELOG.md docs/sprints/Sprint-G2.5.9193.md`
- `pnpm ha:app:prepare`
- Confirmed prepared Home Assistant App/Add-on `config.yaml` version is
  `0.1.30`.
- Confirmed prepared Administration output contains the darker ATLAS
  repository button colors.
- `docker build -t atlas-ha-app:0.1.30 output/home-assistant-app/atlas`
