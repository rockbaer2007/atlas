# Sprint G2.5.9311 - Encrypted Linux Administration connection persistence

Date: 2026-10-15. App version: 0.1.305.

## Backup and implementation

Fix the Pi 4 reboot failure recorded in Sprint9310. Retain settings, identity,
files, plugins and projects. Git bundles retain the pre-change ATLAS/docs heads.
User creates a fresh installer backup:
`/var/backups/atlas/2026-10-15T17-53-23-123Z-w4cQg7`.
Copy an archive to private PC evidence `source/backups/atlas-token-persistence-20261015`,
verify readable data/config/unit/manifest entries and matching SHA256:
`ec5c70ff97fff59d6f33782350decefa0dd89a7ec96ef99ee57dcf6a4a9aab1a`.

Linux Administration now retains normalized connection settings in an AES-GCM
encrypted private file beside the existing installation identity. A random
32-byte key remains in a separate 0600 private installation file outside the
runtime/repository. Ciphertext authenticates the existing installation binding;
the API/browser export never supplies that key. Remember-token controls whether
the HA token is retained. Existing translation-key behavior is preserved in the
encrypted connection. No plaintext token is added to configuration or env files.

Load the connection before the server starts accepting requests. Save via an
atomic replacement only after encryption succeeds, and update memory only after
successful persistence. Preserve an unreadable encrypted file and reject silent
overwrites. Forgetting the token persists an empty token. HA App environment-
owned connections retain their existing path; this new store is Linux-only.

Browser initialization restores the server connection before it can send empty
settings. Explicit Save waits for the server response; failures are displayed in
DE/EN/FR. Existing browser encrypted-cookie storage remains available; Linux
restoration no longer depends on browser Web Crypto over LAN HTTP.

## Verification and native deployment

- Isolated tests exercise actual Administration process restart, retained token,
  provider key and access flags, forgetting, binding/tamper refusal, absence of
  plaintext secrets in ciphertext, and blocked overwrite after corrupt startup.
- Full App tests and Home Assistant package tests pass; full build passes.
- Isolated Chrome Administration save, actual App process restart, reload with
  restored redacted token, then forgetting of the disposable fixture pass.
- Native Pi 4 ARM64 build and both new tests pass. All 17 Linux installer tests
  pass on Linux (Windows skips 15 Linux-only cases). The final UI source matches
  the PC SHA256 after the small initialization-guard correction.
- Normalize read/execute permissions only on the newly built public runtime
  package before installation; persistent data/backups retain private modes.
- Existing installer updates Pi 4 from 0.1.304 to 0.1.305. Automatic pre-update
  backup: `/var/backups/atlas/2026-10-15T17-58-39-554Z-BR6zOv`.
- Root-side snapshots compare persistent files/hashes/owners/modes, env, unit,
  catalog, shared plugin store and projects exactly after update. No user state
  is migrated or replaced. Only new encrypted connection/key files are allowed
  in subsequent checks. Host retains one reference plugin and zero named projects.

The user must save their existing HA token once under 0.1.305 because 0.1.304
may only have held it in memory. At this record's creation that step and the
final physical host reboot are pending. Do not claim native reboot acceptance
until a changed boot ID, authenticated version discovery before Administration
reload, automatic service start, fresh Editor connection and final preservation
checks succeed. Temporary restricted SSH test access is removed after completion.

Both published App source copies are synchronized and checked. DE/EN/FR Linux
documentation explains activation, private key/data backup and recovery limits;
the docs build passes with its existing large-chunk advisory. No native Pi 5 or
Proxmox update, HA integration schema migration, whole-SD image, power-loss test
or broader browser qualification is claimed.
