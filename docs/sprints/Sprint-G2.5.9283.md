# Sprint G2.5.9283 - A7 Linux/systemd installer

2026-10-14. ATLAS app and HA package 0.1.298.

Back up Atlas, documentation and add-on Git repositories as bundles before
editing; retain user-owned untracked roadmaps. Private backup location:
`C:/Users/rockb/source/backups/atlas-a7-linux-20261014`.
Create Proxmox snapshot `atlas-a7-before-20261014` before changing test LXC 104.

Add a Linux x64/arm64 runtime preparation path using the same app sources as
Docker. Build native dependencies on glibc Linux, record architecture, libc
and Node ABI, and reject incompatible/incomplete packages before deployment.
The Debian builder exports a runtime archive and the official Node binary with
license and SHA256 checksums. No compilation is needed on the small target LXC.

Install as an unprivileged atlas systemd service, with separate immutable
releases, persistent state, protected environment and installation metadata.
Use atomic current-release switching, stopped-service timestamped backups,
readiness checks, explicit rollback and recovery after unhealthy updates.
Preserve environment overrides, installation identity, plugin data and service
enablement. Reject unmanaged installations, edited managed units, symlinked
managed directories and occupied ports. Local systemd drop-ins remain supported.
Runtime rollback does not restore or discard current user data.

Correct two issues found during native testing: resolve the real CLI path when
called through the current-release symlink; await readiness after a backup
restarts an active service. Add meaningful regression coverage for both.

Update Administration's Linux target guidance in DE/EN/FR. Add matching
Linux installation/update/backup/recovery guides and navigation to the external
documentation repo. Synchronize canonical HA package and add-on repository;
existing HA settings and plugins require no migration.

Verification:

- 17 Linux installer regressions pass on Debian/glibc; isolated fixture data only.
- 163 Home Assistant tests and 11 app/lifecycle tests pass; workspace build passes.
- Linux runtime build, native dependency loading and systemd unit verification pass.
- Standalone Docker build and app/health checks pass.
- Real Debian 12 amd64 LXC 104: installation, actual CLI update, rollback,
  backup, systemd restart and automatic recovery after a deliberately unhealthy
  candidate pass. Compare environment, identity, plugin manifest and synthetic
  project bytes exactly; all remain unchanged. Archive the own test fixture.
- FHEM remains disabled; its pre-installation file hashes remain unchanged.
- After explicit user approval, bind only port 4176 to the LXC LAN address.
  Browser Administration and Expert Editor load in DE/EN/FR; internal ports
  4174/4175 stay loopback. Verify an update also preserves this LAN binding.
- Documentation build and whitespace/canonical-package checks pass.

Native ARM64 Linux installer, other distributions, bare metal and broader plugin
workloads remain unqualified. An idle memory observation is not a load benchmark.
No existing Pi/Proxmox HA installation or external plugin code is changed.
Native ATLAS HA/HACS frontend integration remains the open A7 item.
