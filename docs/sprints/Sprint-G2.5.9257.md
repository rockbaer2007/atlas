# Sprint G2.5.9257 - ARM64 and mobile emulation (A2)

2026-10-13. Framework 0.2.0-alpha.88; HA app 0.1.289;
reference Card Editor 0.2.0-alpha.97.

## Scope and safety

Use fresh test-owned browser contexts, directories and containers. Keep real
Home Assistant settings, projects and installed plugins untouched. Source Git
bundles and the user-owned local roadmaps are backed up outside the repository
at `C:/Users/rockb/source/backups/atlas-a2-20261013`.

The available real HA host identifies itself as Virtual Machine / ova.
The Docker host is x86_64 and advertises linux/arm64 emulation. A native
Raspberry Pi/ARM64 target and physical mobile browser are not yet available.

## Findings and changes

- Mobile Chromium can enlarge innerWidth to accommodate overflowing content.
  Check geometry against the requested viewport, not that enlarged innerWidth.
- Administration fields and panels exceeded a 360 px viewport. Allow grid
  tracks/fields to shrink and wrap headings; use compact mobile padding.
- Card Editor main sizing, implicit grid tracks and fixed workbench columns
  caused overflow at phone/tablet landscape widths. Use bounded tracks, the
  intended single-column export controls and a narrow workbench up to 1180 px.
- Bound shared modal sizing; problem-report, YAML-import and export dialogs
  fit phone/tablet widths and heights without changing stored project data.
- Extend the preservation runner with image/platform selection, actual Node
  architecture verification and touch-context mobile checks in DE/EN/FR.
  Record whether development-only HTML overrides were used.

## Verification

Both final HA images build. Runs without HTML overrides pass 24 checkpoints
on amd64 mobile and 24 on ARM64 mobile under Docker emulation. Node reports
arm64 inside the ARM64 container; both surfaces become ready. The amd64
desktop workflow also passes all 16 checkpoints. There are no browser errors
or HA service calls. Installed-plugin fixture settings remain byte-identical;
populated editor fields, metadata, active IDs and preferences survive reload,
DE/EN/FR JSON/HACS ZIP imports, dialog operations and container restart.

Only repository lastChecked timestamps are excluded from Admin comparisons:
opening the manager refreshes them legitimately. Locale selection is restored
before comparing; no actual settings fields or repository URLs are excluded.

159 HA tests, two packaging tests, all workspace type checks/build, syntax
checks, all 469 package-file comparisons and diff checks pass. The DE/EN/FR
documentation build passes. Final local reports/screenshots:

- amd64 mobile: `C:/Users/rockb/AppData/Local/Temp/atlas-e2e-4LUhcn`
- amd64 desktop: `C:/Users/rockb/AppData/Local/Temp/atlas-e2e-W45hqL`
- ARM64 mobile emulation: `C:/Users/rockb/AppData/Local/Temp/atlas-e2e-palNLD`

Relevant checks: amd64/arm64 HA Docker builds; mobile Chromium 360x800,
390x844, 844x390 and 768x1024; plugin-manager/report/YAML/export dialog geometry;
settings/project/plugin preservation through locale changes, JSON/HACS ZIP
roundtrips and container restart; workspace type checks/build, HA tests,
source-package parity, syntax and diff checks; DE/EN/FR docs build.

## Boundary

No native Raspberry Pi performance, actual mobile Safari/Android browser,
touch drag/drop, real virtual keyboard, phone file picker or phone download
handling is claimed. Test fixtures use a fake HA token and deny external
browser requests; there are no HA service calls. HA images run the legacy
settings fixture in standalone mode, not Supervisor-owned read-only mode.
All owned containers and browsers are closed after each run.

Status: emulation increment complete. A2 remains open for physical checks.
The user is preparing Home Assistant on a Raspberry Pi 5 for the native test.
