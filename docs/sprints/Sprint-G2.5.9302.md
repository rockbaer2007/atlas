# Sprint G2.5.9302 - Native 0.1.304 update and recovery UI qualification

Date: 2026-10-15

## Scope and safeguards

Qualify the released 0.1.304 App and guarded plugin replacement/recovery UI on
Proxmox amd64 and a real Pi 5 ARM64 (8 GB). Both run HA Core 2026.10.1; the HA
integration remains 0.1.301 without an integration/schema migration. No code or
package behavior changes in this increment, so no new package version.

Before updates, retain fresh encrypted HA backups and PC exports of Admin
settings, shared plugin management and complete local editor drafts. Read-only
captures preserve the catalog, shared state, named projects and actual original
Icon Library file bytes. The source Git bundle and private evidence are outside
the repo in `source/backups/atlas-native-0304-recovery-20261015`.

- VM backup `f20433c0`: 4.67 GB, HA settings, SSL and ATLAS 0.1.303, local.
  The separate MariaDB app is not included in this targeted backup.
- Pi backup `15d862e7`: 129.39 MB, full HA/history/media/SSL/share and all three
  apps including ATLAS 0.1.303, local.
- VM initially refuses update with 0.4 GB free. After explicit user approval,
  remove only four older own test backups: Plugin-Zyklus, Ladefix, pre-0.1.303
  and pre-0.1.302 (about 18.7 GB). Fresh list confirms their absence and retention
  of the new backup, older HACS backup and other backups. Update then succeeds.

## Native results

Both native HA update dialogs install 0.1.304 and restart the App successfully.
No HA Core restart or change to connections, credentials or installation identity
is needed. VM reports healthy start at 17:06:06; Pi also reports 0.1.304 healthy.

Use the genuine published Icon Library 0.1.8 package from commit
`22f2fc614556c5e8f2fc5a305bfc39a08c61e3fb` with all ten assets. Do not apply
synthetic compatibility fixtures on either real host.

On each system, exercise the actual Administration UI:

1. Restore initially has no snapshots and cannot apply.
2. Existing-package import previews 0.1.9 -> 0.1.8 with downgrade direction and
   declared capabilities. Missing package constraints require explicit review;
   apply remains disabled before checking the unknown-compatibility checkbox.
3. Cancel preserves exact original asset bytes, all shared state and projects;
   no recovery snapshot is created (VM revision 1, Pi revision 2 unchanged).
4. Reimport, accept the reviewed unknown compatibility and use Back up and apply.
   Installed file version and shared metadata become 0.1.8; six plugins stay active.
5. Restore lists the newly captured original 0.1.9 snapshot with date. Its retained
   Atlas/host requirements match 0.1.304 and the native host. Apply restores all
   ten original files byte-for-byte and retains a second snapshot of 0.1.8.

Final shared revisions are VM 3 and Pi 4, reflecting the two intended version
changes. Other shared content, repositories, plugin activation and complete
external catalog entries equal the before captures. Each named two-field server
project, its revision/list metadata and all local draft fields compare unchanged.
Admin settings, exported plugin configuration and configured-secret summary also
compare unchanged. No raw secrets are logged or passed to external plugins.

Both embedded HA Runtime Administration panels show the common server state,
six active plugins and original Icon Library 0.1.9. Restored libraries load 7,447
MDI icons; searching `abacus` yields the single expected icon. Test search fields
are cleared. No user iconsets are scanned, imported or overwritten. Original
server projects are verified by complete API capture without changing the drafts.
Retained product recovery snapshots and pre-update HA backups stay available.

## Verification boundary

Qualification passes for actual UI replacement/cancel/recovery of this published
plugin on these two hosts. It is not generic plugin-data rollback, a reverse data
migration, native power-loss recovery, browser-database export or qualification of
every plugin family. Do not count the newer selected App version as a new HACS
integration version. Existing isolated 200-test/build and DE/EN/FR UI evidence is
in Sprint G2.5.9301; this documentation-only increment uses native comparisons
and whitespace checks without repeating unchanged source builds.
