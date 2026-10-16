# Sprint G2.5.9335 - Isolated Icon Studio recovery qualification

2026-10-16. Qualify ATLAS's existing guarded recovery against Icon Studio and
its distinct browser stores. ATLAS stays0.1.312; Pi 5 and Proxmox neither queried
nor changed. External plugin implementation/release17 is separate work in
atlas-icon-studio-plugin; its report is docs/RECOVERY_VERIFICATION_0.1.17.md there.

## Safeguards

- Before edits, retain three Git bundles, original16 package, own loopback fixture
  and pre-fix16 stopped-server archive under
  source/backups/icon-studio-recovery-isolated-20261016. Preserve first attempt.
- Use fresh private config/plugin/history/trash roots with real local App,
  Administration and Editor. No HA credentials or live HA connection. Maintain
  the same own browser origin after restarting the fixture, without production
  browser data.15 package was retained as reference but not qualified here.
- Import128 synthetic collection icons through the actual visible label/file
  chooser. Export all131 including3defaults before16->17. Complete content
  remains exact after that upgrade. The16 text-creation failure is reproduced
  and corrected in the external plugin; no ATLAS runtime change is made.
- Create2colored text shapes on17 including umlaut/XML characters and duplicate.
  Verify reload persistence. Retain actual browser-downloaded JSON collection,
  JS iconset and SVG drawing plus DOM evidence before recovery. Stop/archive/
  list/restart the complete server fixture after establishing the data.

## Recovery verification

- Backend compatibility preview/install17->16 retains original17 snapshot.
  All12older assets match exactly; no compatibility override. Browser remains
  on its already-open page until17 is restored.
- Actual Administration UI: inspect17 direction/capabilities, cancel without
  replacement, reopen and restore17. All12restored assets match exactly.
- App restart and browser reload preserve complete named server project, config,
  binary and existing www iconset files, File Studio52 sibling, installation
  identity, original history and trash. Shared descriptors/activation/repositories
  match except normal target version/revision counters.
- Same browser origin/profile reload retains FR language,131icons and both
  colored text shapes. Re-exported collection JSON, iconset JavaScript and
  drawing SVG are byte-identical to before replacement. Validate all131defs
  against expected reference+fixture icons, generated-JS semantics and escaped
  text, colors/positions. Drawing DOM is exact after reload.
- New text creation after recovery succeeds; undo and reload return the drawing
  DOM to the exact original2objects. Stop owned test services and close own tabs.

## Documentation and limits

- DE/EN/FR docs distinguish package replacement, server files, IndexedDB collection
  and local-storage drawing draft. Browser data is not included in HA/server
  backups. JSON/JS collection exports exclude colored drawings; SVG is not a
  complete editable-draft/undo backup. Tool/search/undo state is session-only.
- Fifteen external plugin Node tests, package validation and syntax check pass.
  Browser verification uses connected Chrome UI. The extended standalone
  Playwright runner is not separately executed. Public docs build/diff checks
  validate the documentation; no ATLAS/add-on version bump is needed.
- No full browser-profile restore, deleted-store recovery, new-origin migration,
  native HA/ARM64 installation, real repository update or data-format conversion
  is claimed. Native Icon Studio17 update/recovery remains a next qualification.
