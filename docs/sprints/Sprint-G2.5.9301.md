# Sprint G2.5.9301 - Guarded plugin recovery in Administration

2026-10-15. App/Add-on 0.1.304; framework and HA integration versions unchanged.

## Backup and scope

Retain Atlas, add-on and documentation Git bundles before editing in private
`C:/Users/rockb/source/backups/atlas-plugin-recovery-ui-20261015`.
Preserve user-owned untracked roadmap files and docs `work/`.
Do not modify either native HA installation during implementation. Existing
native backups and the 0.1.303/0.1.9 host state from Sprint G2.5.9300 remain.
All mutation tests use separate data roots, disposable projects and an isolated
browser origin; no user tokens, projects or native plugin data are copied there.

## Implementation

- Existing-package import opens an explicit DE/EN/FR replacement preview.
  Show current/target versions, SemVer upgrade/downgrade/replacement direction,
  capabilities and compatibility. Unknown compatibility requires a checkbox;
  incompatible candidates cannot be applied. Cancel does not write anything.
- Each external plugin has Restore: list retained versions, preview the chosen
  snapshot, then Back up and apply. Empty/unreadable lists stay blocked. The
  bundled reference Card Editor cannot be independently replaced or restored.
- Extend compatibility preview with installed-file/shared-state fingerprint and
  candidate digest. UI passes both back; stale state or changed candidates
  reject before replacement. Compatibility is independently rechecked on apply,
  including authenticated HA discovery for declared HA ranges.
- Before replacing code, retain a checked snapshot of the exact original bytes,
  manifest and previous plugin metadata under `ATLAS_PLUGIN_DATA_ROOT/.recovery`.
  This uses existing Docker/HA/Linux persistent storage. Hidden asset directories
  are not publicly served. GET recovery returns version/date/id only, not files.
- Guarded file replacement and known shared plugin metadata update form one
  synchronous commit. Caught failures restore original files, raw shared state
  and removal markers; retained recovery material survives. Successful restore
  also backs up the version being replaced. Preserve activation, repositories,
  credentials, editor projects and plugin browser data. Refresh shared UI state
  after commit without overwriting pending local plugin-management edits.
- Retain both HA constraint spellings and host alternatives in shared metadata.
  Existing API clients remain supported; new UI previews carry explicit guards.
- Bound snapshots to 300 files/20 MB, recovery storage to 256 MiB/200 records per
  plugin. Refuse linked/unsupported files, corrupt or foreign-id snapshots and
  full recovery storage. Never automatically purge prior backups.
- Bump App/config/changelog to 0.1.304 and synchronize both HA package copies.
  Update policy, roadmap and user/developer documentation together in DE/EN/FR.

## Verification

- App tests: 37/37; HA package tests: 163/163. Full pnpm build, changed JS syntax,
  docs build and whitespace checks pass. Docs retains its existing chunk-size
  advisory. Both canonical and separate HA repositories verify 500 package files.
- Transaction fixtures cover exact binary/CRLF recovery, metadata-write failure
  after a partial write, stale shared state, candidate changes, corrupt backups,
  foreign identities, quota exhaustion, linked files, activation/repository
  preservation and version direction.
- Real App subprocess lifecycle covers API origin checks, preview requirement,
  retained backups after restart, shared-version consistency, fresh HA rejection
  on restore, unchanged project/settings fixtures and inaccessible hidden assets.
- Actual browser workflow uses published Icon Library 0.1.8/0.1.9 on isolated
  `atlas-recovery.localhost:4176`. Cancel leaves 0.1.8 with no snapshots. Import
  updates to 0.1.9; Restore returns 0.1.8; another Restore returns 0.1.9, retaining
  both versions. The original server project and activation compare unchanged.
- Known-supported and known-incompatible UI fixtures verify the correct apply
  state and absence of an unknown-review bypass. DE/EN/FR dialogs and 390px
  French layout checked; temporary viewport reset. Snapshot evidence stays in
  private backup directory. Isolated runtime stopped after testing.

## Qualification boundary

Native 0.1.304 update and UI recovery on Pi/Proxmox remain next qualification,
with fresh native backups before any changes. Code recovery is not a data-format
migration, whole-HA recovery or portable encrypted-secrets export. Browser-only
collections and plugin-owned data need separate backups. Power-loss recovery,
generic reverse migrations and other plugin families are not claimed.
