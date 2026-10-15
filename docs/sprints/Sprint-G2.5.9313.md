# Sprint G2.5.9313 - HACS integration release preservation

2026-10-15. Prepare Runtime integration 0.1.306 after private Git-bundle backups.
The independently installed App remains 0.1.305 during native HACS qualification;
the matching App source package is published as 0.1.306.

- Preserve config-entry schema 1.1. Release numbers are not data-schema versions;
  do not invent a destructive or unnecessary migration for qualification.
- Add an explicit migration hook that accepts the current schema without writes
  and refuses unknown major/minor schemas without relabeling stored data.
- Invalid saved runtime URLs now produce a controlled ConfigEntryError before
  static paths/panels are registered. Valid options can recover missing original
  URL data; neither branch rewrites the stored entry or logs the rejected value.
- Eleven Python contracts pass against actual HA Core 2026.10.1 dependencies.
- Isolated HA Core release cycle 0.1.301 -> 0.1.306 -> 0.1.301 -> 0.1.306
  passes across real process restarts. Stored entry identity, schema, options,
  runtime address and unrelated panels remain unchanged; versioned module serves.
- Frontend six tests, HA package 163 tests, App 39 tests and workspace build pass.
- Canonical package synchronization and whitespace checks pass.

Private evidence: `C:/Users/rockb/source/backups/atlas-hacs-migration-20261015`.
Native Pi/Proxmox qualification is pending at publication. Existing integration
schema remains 1.1: this is a real release upgrade/rollback check, not evidence
of conversion between different data formats. Further HA versions remain open.
