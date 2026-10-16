# Sprint G2.5.9329 - Full HAOS backup restore into a fresh VM

2026-10-16. Native Supervisor full-backup recovery with owned fixtures on separate
local Hyper-V amd64 HAOS VMs. No ATLAS code/version changes. Pi 5 and Proxmox
are neither queried nor modified. App0.1.312 and integration0.1.306 retained.

## Isolation and backups

- Private evidence: source/backups/atlas-haos-restore-20261016. Retain Git bundle,
  both user roadmaps, pre-existing Hyper-V/switch inventory and official image.
  No pre-existing HAOS VM was available. DockerDesktopVM remains off/unchanged.
- Official HAOS18.3 VHDX ZIP SHA256 verified against its GitHub release digest:
  f6218e9e32415c0d1ada87852a3ac2b16cdbc203481ee241b420c8de927b8d00.
  Create separate source/target Gen2 VMs, each4GB/2vCPU, from pristine disks.
  Keep pre-boot checkpoints and a complete-source checkpoint as extra recovery.
- Use the local Default Switch NAT; per-VM outbound ACLs deny the home subnet,
  IPv6 and IPv4 multicast. No physical device passthrough or native host access.
  Deliberately reuse the SOURCE test MAC/address only after the source is off,
  preserving existing test URLs. No LAN switch/NAT/firewall configuration changed.
- Windows denies mounting a new CONFIG VHD without elevation. Do not request
  elevated access or format any physical disk. Instead create a local CONFIG ISO
  with an own test SSH public key; HAOS imports it through its documented CONFIG
  mechanism (read-only auto filesystem mount). Keys stay private outside Git.

## Source fixture and full backup

- Fresh HAOS18.3, Supervisor2026.10.2, Docker29.7.2, HA2026.10.1; install published
  ATLAS0.1.312 from its repository. Create an owned test account/credentials only.
  HA now redirects8123 to80; canonical80 avoids WebSocket307 and stripped
  Authorization headers across port redirects. Correct the harness accordingly.
- Seed5 external plugin directories from existing PC copies, without production
  settings/credentials/projects. Six active backend catalog entries/Hub cards:
  reference alpha.108, File Studio0.1.50, Terminal0.1.10, Automation0.1.28,
  Icon Library0.1.9, Icon Studio0.1.16. Shared fixture has active IDs, empty
  repository/installed-metadata arrays; this is not a five-repository UI migration.
- Set owned App options/installation ID and auto-connect credentials, a full
  named Expert project, input_boolean config and ATLAS runtime config entry.
  Active binary/YAML fixtures, one prior YAML version, one nested trash folder
  with two files, plus own share/media/SSL files. All original production data
  remains outside this test. No physical service actions.
- Create native FULL encrypted/compressed backup47b0ff3f via Supervisor CLI,
  including HA database, every installed App (ATLAS), share, local Apps, SSL,
  media and repository configuration. Download111308800bytes to PC and inspect
  outer tar members/metadata. SHA256:
  912445110af3dfcaefcb15808814757e5b87c50e06e7298bfb358ca05d5e9052.
  Own account/token/backup password retained privately; no production secrets used.

## Fresh target restoration and preservation

- Shut source down cleanly; retain it and its checkpoint/data. Start the target
  from a pristine official disk, not the source disk/checkpoint. Target has a
  different machine ID, no ATLAS installed and no completed onboarding steps.
- Upload the PC backup to the fresh target, verify its SHA256 again, reload
  backup inventory and execute native full restore with its own password.
  Supervisor returns success; App starts at0.1.312 without manual installation.
- Compare all154 selected file hashes (all persistent plugin/project/trash/history
  files, fixture config/binary/YAML, integration source, HA UUID/auth-provider
  store), canonical App options digest, HA configuration/entry IDs, shared plugin
  state/catalog, full project payload, trash IDs/content and history names/content.
  Match source exactly. Share/media/SSL hashes match; restored token authenticates
  against HA2026.10.1. Database inclusion confirmed by backup metadata; do not
  claim byte identity for the running database or volatile logs/session timestamps.
- Browser login with the restored own account succeeds. Standard panel Reload
  resolves an initially pending iframe; embedded Hub shows all6 plugins and
  Card Editor auto-connects to22 live HA entities. File Studio shows the retained
  version and trash count1. Screenshots kept. No retention entry restored/deleted
  for another test. Own browser tabs closed after inspection.
- Reboot only the restored target: changed kernel boot ID, automatic App startup
  and authenticated HA discovery pass without manual starts. Final comparison of
  all154 files/settings/state/retention against the source still matches exactly.
  The Windows Node helper hit a forced-exit assertion after writing success;
  remove its abrupt process.exit and independently verify the boot proof and
  final snapshot with a clean successful command. No ATLAS fault or code change.
- Retain both VM disks/checkpoints, original encrypted backup, its PC copy and
  private proof files. Shut the restored target down cleanly after verification;
  source stays off. Own test SSH access remains only in these stopped test VMs.

## Documentation and verification

- Update roadmap and DE/EN/FR File Studio recovery notes. Build documentation,
  check diffs and publish main/docs commits separately. No new product sources
  changed; no new App/add-on package or version bump required.
- Backup metadata: full, protected, compressed, HA database included and all
  installed Apps/folders covered. Outer archive is readable and upload hash
  matches PC hash. Native full restore success verifies actual encrypted payload
  readability rather than treating a filesystem tar extraction as HAOS recovery.

## Limits

- This qualifies a bounded encrypted full Supervisor backup restore into fresh
  HAOS on local Hyper-V amd64 with synthetic settings/data, not a production
  archive restoration, ARM64/hardware recovery, another OS version, a changed
  network address or every third-party App/data format.
- Full HAOS backup is supervised configuration/App-data recovery, not a disk-image
  restore of the host OS. The target keeps its separately provisioned host identity
  and test SSH access. Source and backup remain available for reproducibility.
