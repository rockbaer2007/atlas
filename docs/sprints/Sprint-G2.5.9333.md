# Sprint G2.5.9333 - Isolated Automation plugin recovery qualification

2026-10-16. Qualify the existing ATLAS guarded plugin recovery path with actual
external Automation Exporter / Editor packages0.1.27 and0.1.28. No external plugin
implementation or ATLAS runtime/package change. App remains0.1.312. Pi 5 and
Proxmox are neither queried nor changed.

## Safeguards and setup

- Retain Git bundles of ATLAS, the external plugin and public documentation,
  original package copies, before-state hashes and a complete stopped fixture
  tar under source/backups/automation-recovery-isolated-20261016.
- Start a separate loopback App with its real Administration and Card Editor
  surfaces, private plugin/config/history/trash paths and pinned synthetic
  installation identity. No production data or credentials. HA version discovery
  uses a local synthetic /api/config endpoint, not real HA authentication.
- Install actual File Studio0.1.52 as a sibling. Seed modern/classic automation
  YAML, a pre-existing export, binary/config files, named server project, history
  version and trash entry. A deliberately invalid repository URL is preserved;
  repository update checks cannot succeed, and no GitHub update is claimed.

## Completed checks

- Real compatibility preview passes without overrides and preserves data/state.
  Backend27->28->restore27->28->App restart retains exact assets: seven old and
  nine current files, including removal of new-only assets during recovery.
- A real management change invalidates an approved recovery preview:409 before
  replacement. Restore the fixture's previous management selection explicitly,
  preview again and complete recovery. Other descriptors/activation/repository
  metadata match the original; only the plugin version/revision change.
- In Chrome, use the real recovery dialog: inspect direction/compatibility,
  cancel without replacement, reopen and apply27. Exact package and complete
  checkpoint hashes match. The still-open plugin session remains unchanged.
- Reapply28 through the real backend and restart. Verify checkpoint content,
  project, installation identity, File Studio assets, history and trash again.
- Before and after recovery, load synthetic system automations, create exact
  safety copies, analyze and export both automations. DE/EN/FR show correct root
  counts after returning to28. Four export/import pairs preserve YAML semantics,
  time strings/templates and export IDs; only cleaned import versions omit IDs.
  Open an exported YAML in actual File Studio without saving or changing it.
- Theme persists on reload. Loaded analysis, selection, filters, typed export
  folder and export overview are session state, not durable project storage.
  Original files remain unchanged; only expected new safety copies/exports are
  added. Stop the isolated App and its owned surfaces after final comparisons.

## Documentation and limits

- Correct DE/EN's obsolete future-plugin wording. Document safe package recovery
  steps, session limits and the distinction from restoring automation data in
  DE/EN/FR. Clarify that the loaded source is backed up before analysis; bytes
  must first be read to create the copy. No system-file write-back is added.
- Six existing ATLAS recovery contract tests and nine plugin analysis tests pass.
  Public VitePress build and whitespace checks validate the documentation.
- Preserve early private harness attempts. They exposed fixture errors: an
  intentionally short synthetic token, lazy identity with ATLAS_INSTANCE_ID and
  no-op merge semantics. Use plausible synthetic credentials, identity API and
  actual update/revision assertions in the fresh successful fixture. No product
  defect was established and no compatibility/integrity gate was weakened.
- Native hardware/HA qualification, real GitHub repository updates, whole-HA
  restoration, browser-origin migration and plugin data-format rollback remain
  separate work. No production readiness or automatic universal recovery claim.
