# Sprint G2.5.9327 - Persistent File Studio retention

2026-10-16. App0.1.312 fixes backend trash/history storage. Integration0.1.306,
reference plugin and external File Studio0.1.51 remain unchanged. Pi 5 and
Proxmox are neither queried nor modified in this increment.

## Backup and implementation

- Before editing, retain main/add-on/docs Git bundles and both user roadmaps
  under private source/backups/atlas-file-retention-20261016. Back up the
  isolated old0.1.311 container's legacy stores, persistent data and config.
- Default stores now live under the persistent plugin data root in
  .file-studio/history and .file-studio/trash. Docker/App therefore uses
  /data/atlas-plugins/.file-studio. Explicit Linux/custom roots remain in use.
- A standalone helper copies legacy stores before the first container update.
  Preflight both trees; refuse conflicts/links; verify copies; preserve file
  timestamps, empty directories, IDs and source data. Journal completion per
  source/target so restored entries never reappear from stale legacy copies.
- First-update boundary: run the new helper INSIDE the OLD container, pause
  writes, then back up prepared persistent data before replacement. A new
  container cannot recover already discarded old-container data. Document this
  in DE/EN/FR and the bilingual App packaging instructions.

## Isolated qualification

- Actual old0.1.311 image creates trash/history via backend APIs, with external
  File Studio0.1.51, shared plugin state, a named project and config/settings.
  Prepare both legacy stores inside that old image; retain before/prepared tar
  archives. Actual replacement with0.1.312 preserves complete metadata/payloads.
- Restore the prepared snapshot into a fresh container, fresh volume and fresh
  config directory. Compare full project/state/catalog and retention metadata.
  Both restore APIs recover original file bytes; overwritten edit remains in
  history. Subsequent normal startup keeps trash empty and both history entries.
- Compare91 plugin/project/management files byte-for-byte before replacement,
  after replacement, backup recovery and file restoration. Settings match too.
- Visible File Studio browser checks show the old retained version, then the
  restored original content, restored trash file, empty trash and two versions.
  Screenshots and private JSON proofs retained outside Git.
- The first recovery harness incorrectly re-extracted the original archive on
  every restart and reproduced its old trash. Correct the harness to boot a
  normal container on the recovered volume, then repeat with a fresh fixture;
  final checks pass. This is not a product resurrection failure.
- Retain test containers/volumes and backups; stop own running test container.
  This bounded tar/volume recovery is not HAOS-native backup restoration.

## Verification

- App tests43/43, including four retention tests (migration, conflicts,
  custom roots and actual backend restart/restore); timestamp assertion included.
- pnpm build and Docker build pass; isolated0.1.312 health is ready.
- Windows Linux-installer suite:2 pass,15 Linux-only skips; no claim of full
  Linux execution here. GitHub Linux checks remain part of publication.
- Documentation build and package synchronization checked before publication.
- Native0.1.312 update qualification with old-container preparation remains
  follow-up work. Existing native installations remain unchanged.
