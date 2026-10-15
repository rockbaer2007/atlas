# Sprint G2.5.9314 - Native HACS Runtime 0.1.306 qualification

2026-10-15. Continue A7 after isolated release update/rollback qualification in
Sprint 9313. Private evidence and PC backups:
`C:/Users/rockb/source/backups/atlas-hacs-migration-20261015`.

## Backups and preservation boundary

- Pi native full backup `88b92b60`, 134.36 MiB, contains HA and all three Apps.
- Proxmox native partial backup `386c2195`, 5,018,572,800 bytes, contains HA and
  ATLAS App0.1.305. The requested CLI database-exclusion flag did not take effect:
  actual metadata says `homeassistant_exclude_database: false`; do not describe
  this as a database-free backup. The archive filled remaining available space.
- Chrome downloads were blocked by organization policy/authorization errors.
  Preserve policy and use the existing authorized local Supervisor connection to
  copy the native backup to the user's PC. Initial fetch-based transfer was
  terminated at 4,204,265,472 bytes; resume with verified HTTP206 and bounded
  native stream backpressure. A one-use, source-IP-restricted PC upload receiver
  accepts no reads and closes after completion. No credentials are extracted or
  printed. The receiver is stopped after the completed transfer.
- PC file `proxmox-386c2195.tar` matches the native exact size, SHA256
  `f27ed25d3c027f76b21fcdde43e9aba2eeaa219133cdf35997bd61bfad957e48`.
  Independent PC hashing, both complete gzip CRC checks, 34,711 HA files and 172
  App files pass. The old integration0.1.301, exact own HA config entry and
  project store are present. Keep this private, unencrypted full-content archive.
- After explicit user confirmation, delete only this newly created HA-local
  copy; retain its checked PC copy and every older native backup. The supervisor
  confirms the deleted backup no longer exists. Available blocks initially
  remain zero despite no client downloads. Ordered HA Core restart releases
  held download storage; `df` then reports 4.6 GiB available and 96% usage.
- Capture both existing named server projects in full, shared management state,
  plugin metadata and 33 selected installed external asset files per host. Hash
  four config files, terminal configuration and File Studio trash metadata.
  This is not an exhaustive filesystem audit. Native backups cover broader data.

## Results

- Pi HACS downloads commit `9a6f7967`; configuration check and actual HA Core
  restart pass. HA integration page reports loaded version0.1.306. Compare all
  eleven installed integration files against canonical source: equal.
- Pi original entry ID `01M4ZCSSCNZP7FVMYQ0R007MCD`, schema1.1, runtime address,
  data and options are exactly preserved. Runtime Hub has six active plugins;
  Administration retains its masked connection, DE/dark preferences and healthy
  App0.1.305. Embedded Editor reconnects to 32 live entities without new token.
- Pi plugin files/metadata, named project, management revision10, four checked
  config files and terminal/trash settings compare equal before/after, including
  a second comparison after browser initialization. Temporary terminal closed.
- Proxmox HACS downloads the same tested commit after storage recovery.
  Configuration check and second ordered Core restart succeed. HA's integration
  page reports0.1.306; all eleven installed files match canonical source. Original
  entry `01M4XRD08A5VB579MWNFKDS787`, schema1.1, data/options and runtime address
  remain exactly equal. Fresh authenticated HA version discovery passes.
- Proxmox embedded Hub displays six active plugins; Editor authenticates again
  and receives live states (3,560 during the post-start check; entity counts vary
  during HA integration startup). Administration retains masked credentials and
  DE/dark presentation. Existing App0.1.305 remains healthy without restart.
- Proxmox named project, selected assets/metadata, shared revision9, four config
  files, terminal configuration and trash metadata remain equal after restart
  and browser initialization. This does not qualify availability of every HA
  device or every external plugin feature. Only the own integration was updated.
- Independently exercise actual HA setup with a future minor-schema fixture1.2:
  refuse setup, do not register own panel and retain every entry field. Restore
  only the isolated fixture to schema1.1 and verify normal setup again.
- Correct the older Python contract that equated integration and App release
  versions. Integration manifest must match its own static-module version;
  independently released Node App versions may differ. Eleven contracts pass.

This release preserves existing schema1.1. Actual conversion between different
production data formats and additional HA Core versions remain open. The App
on both native HA hosts stays0.1.305; only the HACS integration is updated here.
