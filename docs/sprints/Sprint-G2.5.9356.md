# Sprint G2.5.9356 - Native 0.1.317 combined-project qualification

2026-10-17. Proxmox amd64 and physical Pi 5 ARM64 updated from App0.1.316
to0.1.317. HA2026.10.1 and HACS integration0.1.306 remain unchanged.
No ATLAS runtime/source/package changes in this qualification increment.

## Backup and preservation boundaries

- Evidence: `C:/Users/rockb/source/backups/atlas-native-0317-total-20261017`.
  Main/docs Git bundles, persistent plugin-data mirrors/tars, project/config
  snapshots, original local Editor JSON exports, HACS archives and UI/CSS proofs.
- Fresh encrypted local HA backups: Proxmox9f59e80c, 4.64GB,
  `ATLAS Proxmox vor 0.1.317 Gesamtprojekt 2026-10-17`; Pi6805faf4,138.11MB,
  `ATLAS Pi vor 0.1.317 Gesamtprojekt 2026-10-17`. Both at16:54CEST.
  VM backup covers HA settings/history, SSL and ATLAS; Pi additionally includes
  its Get HACS and Matter Server Apps. These archives stay on their hosts,
  not additionally downloaded as complete archives to the PC in this check.
- Before test writes, each real317 update passes exact preservation of all
  270/363 captured persistent files, five existing projects, six plugins,
  management settings, Terminal config and HA version information.
- Final checks retain every original persistent file except the additive project
  index; all five original project entries remain exact. Each host retains one
  separate new own server project and its guarded backup snapshots.
- Original selected HA configs, automation/script/scene files, resources and
  dashboards remain byte-exact, with no extra test dashboard storage files.
  Existing trash entries and history files remain exact; new own test entries
  are additive. Supplemental22/2 config-entry/theme/frontend-preference files
  are byte-exact after restoring the original automatic design-mode setting.
- Original local Editor configurations restored through actual JSON import and
  confirmation. Actual re-exports match completely excluding export timestamps.
  Backups and user untracked roadmaps/docs work are retained.

## Actual UI and native rendering

- VM uses JSON/UIX8.4.0 already installed, Bubble3.4.2; Pi uses YAML and a
  separately registered own Card-Mod4.2.1 resource, Bubble3.4.1. Mushroom5.2.3
  on both. Chrome on the PC; no new Pi UIX integration or engine switch.
- Nine native and nine generated leaves per host: Core/Bubble/Mushroom within
  vertical/horizontal stacks, grid and numeric Conditional above:-1. Own synthetic
  sensor/binary_sensor states have collision guards; no device services invoked.
- Actual raw import, guarded save/reopen, HACS UI upload/re-export pass.112/112
  readiness checks and byte-identical ZIP roundtrip per host. User completes
  Chrome's download-security confirmations. Old missing-threshold archives are
  visibly rejected without replacing the current valid workspace.
- Conditional hides the third native/generated row at-2 and restores it at18:
  19 observed Card/root nodes ->13 ->19. Jinja18/off ->28/on changes all six
  Mushroom texts, SVG geometry and blue/red computed colors per host.
  HA's text/icon subscriptions complete separately: the first warm snapshot
  still has blue icons; later settled warm and post-restart samples are red.
  Evidence retains that intermediate state instead of claiming atomic updates.
- Two in-place light/dark transitions per host retain all19 observed identities,
  probe session and document time origin. Inherited background, accents and
  18px/26px radii follow the theme.756 native/generated CSS comparisons pass.
  Use regular Masonry views as CSS reference: panel layout can intentionally
  override inherited radii. Fixture setup/remounts are outside that sequence.
- Ordered HA Core restart on each host, with no running automations/scripts
  reported in the native restart dialog. Open Editors reconnect without reload;
  copied Card code remains exact and fresh Jinja changes work. HA test pages keep
  their document time origin across restart. VM connecting/disconnected states
  are sampled. Pi's first sample is already connected; its transient state was
  not captured. Its synthetic states disappear on restart and are deliberately
  recreated through the owned fixture before fresh template checks.

## Cleanup, documentation and validation

- User explicitly confirms deletion of only both owned temporary dashboards,
  five owned resource registrations and synthetic states. All removed. Own WWW
  directories and theme files moved to recoverable File Studio Trash. Original
  VM UIX and resource configuration remain intact; no backups purged.
- Probe setup remounted after dashboard editing, so its remembered theme no
  longer represented the original preference. Explicit standard-theme restore
  followed by native Profile -> Auto restores both original frontend preference
  files byte-exactly. No original preference file is overwritten directly.
- `proof.json` passes; capture/supplement comparisons and restored local Editor
  JSON comparisons pass. DE/EN/FR Card Editor/development-status docs updated.
  `npm run docs:build` passes with the existing Vite large-chunk advisory.
  Both Git whitespace checks and510-file HA App package consistency pass.
  Source/package builds from Sprint9355 remain valid; no code/package changed.

## Remaining qualification scope

Broader real user projects, other conditional schemas and further HA/styling
versions remain separate checks. Numeric-condition validation is targeted,
not a full HA schema validator. Previously lost thresholds need the original
source/backup; existing exported scripts must be regenerated.
