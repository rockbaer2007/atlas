# Sprint G2.5.9286 - Shared plugin management and safe adoption

2026-10-14. ATLAS runtime, HA package and integration version 0.1.300.

Before edits, create Git bundles of Atlas, documentation and add-on repositories
in `C:/Users/rockb/source/backups/atlas-shared-plugins-20261014`.
Preserve the two user-owned untracked roadmaps and documentation work files.
Production Home Assistant data are not altered during this increment.

Add persistent server metadata under the existing plugin data root:
`.management/state.json`. Share repository definitions, imported plugin metadata
and activation state across App/Ingress and Runtime browser addresses.
Until explicit adoption, retain existing local configuration and cookie behavior.
After adoption, server catalog/launch status uses shared activation, while assets
and executable entries still come from installed server manifests.

Provide a DE/EN/FR Plugin Manager section with local-state preview, conflict
preference, metadata backup export and backup inspection. Merge entries without
removing server-only entries; empty adoption cannot clear existing state.
Conflicts retain server values by default. Require revision agreement on writes;
reject stale previews and concurrent edits without changing the saved state.
Save incoming metadata and the previous server file before atomic replacement.
Do not overwrite corrupt server state. Retain original local plugin data; keep
unsaved shared edits in a separate local recovery key.

Use trusted-origin checks for mutations and cross-origin reads, bounded JSON
requests and a metadata allowlist. Exclude credential fields, package contents,
temporary Ingress paths and browser-specific asset URLs. Preserve URL path case.
Do not automatically install/uninstall plugins or migrate projects, access
permissions, HA tokens, provider keys or external-plugin settings.

Update DE/EN/FR public documentation, README, package versions and canonical
HA/add-on package inventories. Native App/Pi/Proxmox adoption remains a follow-up
after the runtime update; an HACS-only update cannot add backend storage.

Validation:

- Workspace build passes; final Admin bundle regenerated after UI changes.
- App checks: 16 tests pass, including real backend lifecycle/restart, shared
  activation despite conflicting cookies, rejected origins, stale revisions,
  backups, merge conflicts, damaged files and credential exclusion.
- Home Assistant package: 163 tests pass; frontend panel contracts: 6 pass.
- Real browser, isolated localhost/127.0.0.1 origins: adoption, matching plugin
  counts, cross-origin activation changes, stale-preview rejection, DE/EN/FR
  controls and preservation of original local repository, activation and project
  fixtures. Evidence: `shared-management.png` and `revision-conflict.png`.
- Documentation build passes, with the existing large-chunk warning only.
- Canonical HA and add-on inventories agree (490 files).
- Final standalone Docker image 0.1.300 builds and reports both surfaces ready.
  Metadata-store tests pass inside the image; actual API adoption and a container
  restart preserve the saved repository and active reference plugin. Archive
  the disposable Docker management state in the private backup directory.
- Syntax and whitespace checks pass. Native production migration is not claimed.
