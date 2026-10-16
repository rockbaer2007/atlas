# Sprint G2.5.9330 - Full HAOS recovery at a changed IP

2026-10-16. Isolated qualification, App0.1.312/integration0.1.306 unchanged.
Pi 5 and Proxmox are neither queried nor modified. No product code changes.

## Backups and isolation

- Private evidence: source/backups/atlas-haos-changed-ip-20261016. Preserve a new
  Git bundle and both user roadmaps. Copy the already verified encrypted FULL
  HAOS backup47b0ff3f into this separate folder and verify SHA256 again:
  912445110af3dfcaefcb15808814757e5b87c50e06e7298bfb358ca05d5e9052.
  Size111308800bytes. Existing source/target disks and checkpoints remain intact.
- Create a THIRD fresh Gen2 Hyper-V VM from the official HAOS18.3 image,
  4GB/2vCPU, automatic start disabled, isolated Default Switch NAT. Per-VM ACLs
  block192.168.178.0/24, IPv6 and IPv4 multicast. Existing DockerDesktopVM and
  both earlier qualification VMs remain off. No global networking changes.
- New test MAC00155D000203 receives172.21.99.162, different from the source's
  172.21.104.229. Fresh target machine ID35373c049bac4cb2b5feaa7809525502 differs
  from both earlier VMs. No ATLAS installed and all onboarding steps incomplete.
- Retain pristine pre-boot checkpoint and restored-before-URL-adaptation
  checkpoint. Owned SSH key, account/token and backup password remain private.

## Actual restore and address adaptation

- Upload the PC full backup, verify remote SHA256, reload Supervisor backup
  inventory and run native full restore with its existing own password.
  Supervisor completes successfully, including HA database/all installed Apps
  and backed-up folders. This is not a checkpoint or manual volume restoration.
- Before any URL edits, compare all154 selected file hashes, App option digest,
  complete config entries, HA configuration, shared plugin state, full project,
  trash/history and share/media/SSL fixtures against the source: exact match.
  App HA version discovery is unavailable because its stored URL still points
  at the old address. Both old-address VMs remain off, preventing false success.
- Catalog links are generated from the current request origin. Compare their
  known entry/icon/logo/preview URL fields with only the origin changed; all
  names, versions, paths, statuses and capabilities remain exact. This expected
  API difference must not be mistaken for stored plugin corruption.
- Update ONLY home_assistant_url in App options using the Supervisor API;
  restart the App. Preserve every other option, including installation identity,
  token, path permissions and autoconnect settings. Assert the complete options
  object matches the original plus this one URL change without printing secrets.
- Use the integration's supported HA options flow to set runtime_url to the
  new App origin including4176. Keep the original config-entry ID/schema/data;
  options override the previous URL. Automatic reload registers the new panel.
  Apart from options/runtime_url and its modified timestamp, entries match.
- Existing restored token authenticates HA2026.10.1 at the new address. No new
  credential or account is required. Generated plugin links already use the
  new origin; do not rewrite plugin/project/retention files or raw .storage.
- Repeat complete snapshot comparison after URL adaptation and after a real
  HAOS reboot: all154 files, six backend catalog plugins, one full project,
  one nested trash entry and one history version remain intact. Only the two
  explicitly approved URL settings and entry modified time differ from source.
- Changed kernel boot ID proves reboot; App starts automatically and discovers
  authenticated HA again without manual App startup or token entry.
- Browser login with the restored own account succeeds at the new address.
  Embedded Runtime Hub shows all6 active plugins and links to the new origin;
  embedded Editor auto-connects to22 live entities. Preview and load the existing
  named project through its backed-up UI flow: one field appears, no server save.
  That normal load creates one new243-byte workspace safety backup of the empty
  browser workspace. Verify its exact path/hash/content separately in the final
  comparison; all original154 files and server project remain exact. Retain the
  new backup instead of deleting it. Screenshots retained privately. Close the
  own tab after verification.
- Shut down the third VM cleanly and retain a completed checkpoint. All three
  own HAOS VMs and the pre-existing DockerDesktopVM finish off. Keep encrypted
  backups, snapshots, disks and private test credentials for later recovery tests.

## Verification boundaries

- An early harness snapshot ran while Core was still starting and lacked three
  generated Python cache files. Wait for native restore completion; the repeated
  complete154-file comparison passes without excluding or replacing any files.
- Source plugin fixture contains six installed directories/active catalog IDs
  but empty repository/install-metadata arrays. This is not qualification of a
  five-repository Admin metadata migration or every external plugin action.
- No automatic IP rewriting/discovery is implemented or claimed. This qualifies
  explicit configuration updates after full restore into fresh local amd64 HAOS,
  not production archives, physical/ARM64 recovery, a different HA version,
  external HA servers or arbitrary custom URLs inside user content.
- DE/EN/FR recovery instructions updated together; documentation build passes.
  No product version bump or add-on update required for qualification-only work.
