# Sprint G2.5.9258 - Native Raspberry Pi 5 verification (A2)

2026-10-13. Documentation and real-installation checks only. Runtime remains
framework 0.2.0-alpha.88 / HA app 0.1.289 / reference Card Editor alpha.97.

## Native evidence

- HA Hardware identifies Raspberry Pi 5 / rpi5-64, 8 GB memory.
- Existing Terminal access runs a real PTY through Ingress. `uname -m` returns
  aarch64; `node -p process.arch` returns arm64. Oh My Posh reports 31.3.0.
- HA OS 18.3 and Core 2026.10.1; ATLAS 0.1.289 is already current and running.
  No update, rebuild, plugin installation or permission expansion is needed.
- Administration reports runtime ok; the editor connects automatically to real
  HA and receives 27 entities. No Lovelace resources are installed on this
  fresh HA instance. The existing Expert canvas has zero fields.
- All six native plugin surfaces and Hub navigation load: Card Editor alpha.97,
  File Studio 0.1.51, Automation Exporter 0.1.27, Terminal 0.1.9,
  Icon Library 0.1.8 and Icon Studio 0.1.15.
- File Studio loads the already-approved paths; Icon Library loads 7447 MDI
  icons. Plugin implementation is external; this sprint records interoperability.

## Safety and preservation

- Export existing Administration settings and the complete editor configuration
  before restart to a local directory outside Git.
- The new HA instance has no backup yet. Complete backup onboarding with
  schedule Never, keeping future automatic backups unplanned. Create a local
  encrypted backup `Automatic backup 2026.10.1`, 105.18 MB, including ATLAS
  0.1.289, HA settings/history and Matter Server. Verify contents in HA.
- Keep the downloaded emergency kit private outside Git. No backup/key is
  uploaded to cloud services, repositories or issues.
- Close owned Terminal sessions, then restart only the ATLAS app. Ingress Hub
  still lists six active plugins; Administration reports a new startup time
  and runtime ok. Editor reconnects with 27 real entities.
- Compare exports: settings, plugin descriptors/active IDs and secret-configured
  flags are exactly equal. Complete editor configuration matches except the
  export timestamp. No field edits, file edits or HA device actions occur.
- Backup evidence and local exports:
  `C:/Users/rockb/source/backups/atlas-pi5-a2-20261013`.

## Real-host responsive checks and limits

Desktop Chrome opens the real Pi through HA Ingress at 390x844 and 844x390.
Editor document client/scroll widths match (375/375 and 829/829; native
scrollbars consume 15 px). Screenshots are retained and viewport overrides
are reset afterwards. This is viewport testing, not a physical mobile browser.

Status: native ARM64 execution and existing-state restart preservation passed.
A2 remains open for physical Android/iOS, touch drag/resize, virtual keyboards
and native file/download dialogs. Large populated projects, arbitrary plugin
project formats, load/performance, hardware actions and an ARM64 Supervisor
upgrade are not claimed by this fresh-installation smoke check.

Update roadmap and DE/EN/FR public status together. Run documentation build
and diff checks; no runtime suite is repeated for this documentation-only change.
