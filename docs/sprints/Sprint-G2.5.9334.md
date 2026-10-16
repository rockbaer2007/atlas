# Sprint G2.5.9334 - Native Automation plugin recovery qualification

2026-10-16. Qualify ATLAS's existing guarded recovery UI on Pi 5 and Proxmox
using external Automation Exporter / Editor packages. No ATLAS runtime or
external plugin implementation change; App0.1.312 and plugin0.1.28 retained.

## Backups and boundaries

- Retain Git bundles of ATLAS, the plugin and public docs before changes under
  source/backups/automation-recovery-native-20261016. Preserve user roadmaps/work.
- Create new encrypted local HA backups before replacing plugins: Pi8ebc1e4f,
  135.31MB, HA settings/history, SSL and all three installed apps; VM50ee03a3,
  4.67GB, HA settings/history, SSL and ATLAS only. Both dated17:36CEST. HA assigns
  generic Custom backup names despite the requested labels. VM cloud/SFTP
  targets excluded. These are not complete backups of all unrelated VM apps.
- Copy complete persistent plugin roots to PC and tar/list them; retain original
  served plugin packages as base64. Compare core YAML, integration manifest,
  Lovelace files and existing atlas_exports/automation safety-backup files.
  Selected PC copies are not full downloaded HA backup archives.
- Pi backup finishes first, so qualify Pi before VM while the latter is still
  creating its backup. VM replacement waits for verified backup completion.

## Native recovery and preservation

- Both start at28 without any Automation recovery entries. Apply actual reviewed
  package27 through backend compatibility preview/expected fingerprint, with
  current catalog constraints and no override. Retain automatic original28
  snapshot. Exact old seven assets replace the original nine.
- In the real Administration UI, inspect the28 snapshot, direction and matching
  compatibility. Cancel without replacement, reopen and use Sichern und
  übernehmen. Original28 assets are restored byte-for-byte on both hosts.
- Preserve every original persistent file outside replaced plugin/management
  state, including all other plugin assets, complete server project, Terminal
  configuration, two trash entries and twelve history files on each host.
  Preserve hashes/mtime except unchanged .removed-plugins.json rewritten mtime.
- Shared state changes only version/expected declared metadata during27 and
  revisions. Final metadata, repositories and activation match the original.
  Existing descriptor's older compatibility metadata is restored exactly;
  the27 preview used current HA>=2026.8 metadata and real authenticated2026.10.1.
- Selected core/config files22VM/8Pi match. All35VM/3Pi existing export/automation
  safety-backup files match, including metadata. No automation file write-back,
  user-automation export or service execution. Newly retained server files are
  only recovery/management backups; no deletion or cleanup performed.
- Upload own synthetic YAML into the browser before/after. DOM analysis matches
  exactly, including modern/classic root counts. Admin language/theme, HA URL,
  remember/auto-connect and approved roots match. App start timestamps and
  authenticated HA version unchanged. No HA, App or host restart performed.
- Fresh Administration reload shows the correct shared server state. The open
  dialog briefly reports unsaved shared changes after restoring older metadata;
  do not overwrite the server with a local adoption. Record this UI boundary
  and the reload step in DE/EN/FR; backend final comparison remains exact.

## Documentation and validation

- Extend DE/EN/FR recovery guidance with native scope and preserved-data checks;
  keep isolated versus native, package recovery versus data rollback, and
  synthetic analysis versus real user automation execution explicit.
- Private before/old/restored/final checks all pass, with9final assets,6active
  plugins and1named project per host. Keep snapshots, archives and screenshots.
  VitePress build and whitespace checks validate documentation; no runtime
  version bump or deployment is needed for qualification records alone.
- No new GitHub release update, full HA recovery or data-format conversion is
  claimed. Previously isolated restart/fault tests are not rerun on these hosts.
