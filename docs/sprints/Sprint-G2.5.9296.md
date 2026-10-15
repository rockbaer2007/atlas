# Sprint G2.5.9296 - Native 0.1.302 update qualification

2026-10-15. Native App/Add-on qualification on Proxmox amd64 and Raspberry Pi 5
ARM64. HACS integration source/version remains 0.1.301.

## Recovery boundary

Before updates, retain Git bundles and private settings/plugin/editor exports in
`C:/Users/rockb/source/backups/atlas-native-0302-20261015`.
Archive both original empty editor workspaces and existing named two-field
server projects. Keep credentials private and compare their status only.
Native encrypted local backups completed before changes:

- Pi: `3093cff7`, 129.09 MB; HA settings/history, ATLAS 0.1.301, Get HACS and
  Matter Server.
- Proxmox: `bec53b68`, 4.67 GB; HA settings and ATLAS 0.1.301. Other apps omitted
  from this targeted backup.

## Proxmox qualification

- Native amd64 build completes, App updates from 0.1.301 to 0.1.302 and restarts
  successfully. Healthy backend and six active plugins verified.
- Native Administration package-import checks reject an ATLAS >=99 candidate.
  Legacy metadata and matching ATLAS/host with unknown HA version require review;
  cancel both confirmations. No fixture is installed or existing plugin replaced.
- Before/after exports match: settings, plugin metadata, secret-status summary,
  shared current state/revision, original editor workspace excluding export time,
  server project fields, surface, grid, card name and script filename.
- Direct Runtime and embedded HA panel show the healthy backend and shared six
  plugins. Original App/Ingress Hub shows six active plugins after one reload
  following the App restart. Restore the original empty editor draft after the
  read-only named-project inspection.

## Pi storage recovery

Supervisor initially blocks repository refresh and SSH installation at 1.9 GB
free. User explicitly authorizes removal of exactly four older own ATLAS test
backups (515.84 MB total). Retain the latest pre-update backup and all unrelated
backups. One old HACS backup is archived and its tar structure verified on PC;
the user knows the other three PC downloads did not complete before deletion.
Do not bypass Chrome download protection or the Supervisor free-space guard.

Storage remains at 1.9 GB after deletion and cancellation of pending downloads.
With explicit user approval, perform a native ordered full Pi host restart.
HA recovers and reports 2.5 GB free. Deleted open file handles are a possible
explanation; no process-level cause is proved. User identifies the boot medium
as a 16 GB SD card, with a 128 GB USB stick available. No storage migration occurs.
Repository refresh now succeeds and the native ARM64 0.1.302 build starts.

## Pi qualification

- Native ARM64 build/update succeeds; App info and backend health confirm
  0.1.302, started at 12:39:16 local time. Six active plugins remain.
- The same incompatible local package is rejected with the actual 0.1.302
  version in the reason. Legacy and unknown HA-version candidates prompt for
  review; both are cancelled. No fixture installed.
- Before/after settings, plugin metadata, secret-status summary, shared current
  state/revision and complete original editor export match (export timestamp
  excluded). The complete named two-field project export also matches with only
  its export timestamp excluded. Reload restores the original empty draft.
- Embedded HA panel confirms healthy 0.1.302, shared six-plugin management,
  original empty editor workspace and the existing named server project list.
- Original App/Ingress Hub works after one reload and shows all six active
  plugins. Final Pi storage reports 2.2 GB free after the build/update.

## Record checks

Only the roadmap and this sprint record change in Git. `git diff --check` passes.
No runtime/package source changes or version bump are needed for this deployment
qualification. Native Supervisor builds cover amd64 and ARM64; no separate local
Docker build is claimed. Retain private UI screenshots and export comparisons
with the backups; no credentials or backup contents are committed.

## Qualification boundary

Native package-import checks qualify refusal/review paths, not replacement of a real
external plugin. Successful replacement and preservation were covered by the
isolated backend lifecycle in Sprint G2.5.9295. Verified HA-version discovery,
real integration schema migration and broader host compatibility remain open.
