# Sprint G2.5.9307 - Native Pi 4 ARM64 Linux/systemd qualification

Date: 2026-10-15

## Scope and host

Verify the existing Linux installer on the user's separate headless Raspberry
Pi 4 test system: Raspberry Pi OS / Debian 13.7 Trixie, aarch64, glibc 2.41,
systemd 257, approximately 4 GB RAM and a 16 GB SD card. Initially 9.6 GB free.
No ATLAS installation, service, account or data existed; ports 4174-4176 were
free. No Pi 5 or Proxmox HA instance is changed. This is qualification evidence,
not a new runtime implementation or App release; ATLAS remains 0.1.304.

## Backup and preparation

Dedicated temporary restricted SSH key, installed by the user. Passwordless sudo
is unavailable; the user starts the reviewed root test script manually. No
password is obtained or recorded and no sudoers/authentication policy is changed.

- Original home configuration/SSH archive copied to the PC and verified by SHA256.
- Before system installation, root creates an archive of `/etc`, `/home`, `/opt`
  and `/usr/local`, excluding the private build/test work directory. This is a
  targeted configuration/custom-software backup, not a full SD-card image or
  a complete `/var/lib` application-state backup. No existing ATLAS data exists.
- Root backup is retained under `/var/backups/atlas-pi4-before-20261015` and
  copied to the PC. The script waits until the PC hash matches and tar listing
  verifies expected entries before installation is allowed to continue.
- PC backup SHA256:
  `8632e09351b585d37ca15c43d93093b69dc0c752ab0e1f7a3363850a7aa6fe1f`.
  Additional source bundle, exact archives, logs and assertions remain private
  under `source/backups/atlas-pi4-linux-20261015`, outside Git.

Build actual 0.1.303 source `2a022c7d` and current 0.1.304 source `9a049371`
on the Pi, using frozen pnpm 11.9.0 lockfiles and official Node v22.23.3
linux-arm64, verified against nodejs.org SHA256 checksums. Compile node-pty
natively. Both complete builds pass. All 17 Linux installer regressions pass
on ARM64 with zero skips. Runtime manifests match Linux/arm64/glibc/Node ABI127.
Build tools stay in the private work directory. Install the dedicated official
Node runtime under `/opt/atlas-node-v22.23.3`; no existing global Node is replaced.

## Native lifecycle and preservation

Use the real installer and actual systemd service, unprivileged `atlas` account,
separate immutable releases and persistent state. Verify the generated unit with
systemd-analyze. Keep all ports loopback-only; do not expose Administration to LAN.

The private fixture initially creates a root-owned plugin parent and its API
write fails with HTTP400. Stop before update. Correct only fixture ownership
to the service account, then resume. This is a test-fixture issue, not an ATLAS
code change or a compatibility-check bypass. Original backups stay available.

Verified sequence:

1. Install actual 0.1.303; service enabled, active and healthy.
2. Seed synthetic plugin/activation metadata, exact-byte plugin text, named
   project, explicit fixture identity and systemd MemoryMax drop-in.
3. Update to actual 0.1.304.
4. Invoke rollback through `/opt/atlas/current` back to 0.1.303, then rollback
   again forward to the retained 0.1.304 release.
5. Run the installer backup command and restart the service.
6. Deploy a private candidate with a deliberately failing app-server entry point.
   Installer failure restores the previous healthy 0.1.304 runtime automatically.

At all six comparison points, persistent file bytes, owners, groups, modes,
environment, systemd drop-in, shared plugin state and named project/list compare
equal to the seeded baseline. Six persistent files are included. Installer
timestamped backups and releases are retained. Rollback preserves current data;
this does not claim generic restoration of plugin-owned schema migrations.

Archive the synthetic fixture state/drop-in under the root backup directory,
restore the clean newly installed persistent state/environment, and leave
0.1.304 active and enabled with no synthetic project or adopted plugin state.
The user's original installation had no ATLAS settings/projects/plugins.

## Final verification and boundaries

- `/health` and `/app` report healthy App0.1.304, distribution linux-installer.
- Administration, Editor and Hub return HTML HTTP200 through the real app server.
- Native node-pty spawns a shell and `uname -m` returns aarch64. This tests native
  PTY execution, not an authenticated browser Terminal-plugin session.
- systemd runs as User/Group atlas, active/running and enabled at boot.
  Ports 4174,4175,4176 listen only on 127.0.0.1. No OS reboot/boot-cycle test.
- 637 readable original archived files retain bytes/modes/owners. All original
  passwd/group entries remain and only the intended atlas entries are added.
  Twenty root-protected original files are retained in the backup but cannot be
  compared through the unprivileged SSH session. Do not claim they were hashed.
  Account-management backup files and the deliberately changed test SSH key are
  excluded from the unchanged-file comparison.
- Final free storage approximately 7.3 GB. Build/release/backup artifacts remain;
  this is not a CPU/RAM load benchmark or qualification of all ARM64 systems.

DE/EN/FR public Linux documentation and the roadmap are aligned with this native
qualification. No runtime/add-on source changes; no package version bump needed.

Remove only the dedicated temporary authorized-key line after evidence capture;
preserve remaining authorized-key bytes, file owner/group and mode. A fresh
SSH attempt with that key is rejected afterwards. Normal password login is not
changed. The private key and backup artifacts stay in the private PC evidence
folder; the removed key grants no continuing access to the Pi.
