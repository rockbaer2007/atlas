# Sprint G2.5.9324 - Native App0.1.310 and Card locale checks

2026-10-16. Qualify the published App update and generated Card locale repair
notice on Proxmox amd64 and Pi 5 ARM64. Preserve existing configuration, files,
projects and plugins. No product implementation/version change in this increment.

## Backups and initial state

- Private evidence: `C:/Users/rockb/source/backups/atlas-native-0310-20261016`.
  ATLAS/add-on/docs Git bundles, before/after app/catalog/shared state, complete
  named project payloads, 33 selected external-plugin asset bytes per host,
  four HA YAML files and non-secret visible Admin values are retained on PC.
  Do not publish private configuration backups or browser credentials.
- Before updating either host, create and inspect a fresh local encrypted HA
  backup. Proxmox `81a3607e`, 4.67GB, includes HA settings/history, SSL and
  ATLAS0.1.306. Pi `2f4694ec`,134.03MB, includes HA settings/history, SSL and
  all three installed Apps including ATLAS0.1.305. The UI retains the default
  title Custom backup2026.10.1 despite the prepared name; identify by ID/time.
  These backups remain on their hosts, not newly downloaded/decrypted on PC.
  VM backup excludes unrelated Apps/media/share; it is not a full all-App backup.
- Pi HA uses port80; the old8123 URL refuses connections. The user confirms
  port80. Proxmox still responds at8123 and not80. Preserve saved Admin URLs:
  Pi http://192.168.178.177; VM http://homeassistant2.local:8123.
- Both hosts have six active plugins, one named project; shared revisions remain
  Pi10/VM9. File Studio remains Pi0.1.51/VM0.1.50, Terminal0.1.10,
  Automation Exporter0.1.28, Icon Library0.1.9 and Icon Studio0.1.16.

## Actual App updates and preservation

- Refresh native App repository information; wait for the real update dialogs
  to offer0.1.310 rather than transient older cached versions. Start update only
  after backup completion and private preservation capture. Fresh manual backups
  already exist, so retain the original disabled extra update-backup toggle.
- Actual amd64/ARM64 builds finish and both /app endpoints report0.1.310.
  No HA Core or host reboot is performed. The bundled reference plugin becomes
  0.2.0-alpha.107 as expected; external plugin versions/assets/activation remain.
- Exact before/after assertions pass for shared state/revision, full project
  list/payloads, 33 selected external-plugin assets, four YAML files, terminal
  capabilities and original trash metadata. Catalog comparison permits only
  the intended bundled reference-plugin version change.
- Visible non-secret Admin controls match exactly. Tokens remain masked and
  are never read from browser storage. Authenticated server discovery still
  succeeds against HA2026.10.1 on both hosts without re-entering credentials.
- Before adding any test resource/dashboard, compare all selected HA dashboard,
  resource and integration files: Pi4/VM18 unchanged. Both HACS Runtime manifests
  remain0.1.306. This is an App update, not a HACS integration update.

## Native generated Card qualification

- Generate a unique Expert Card from the published0.1.310 source with declared
  EN/DE/FR and read-only sun.sun entity references. Use only own new files beneath
  /config/www/atlas-native-0310-20261016 and one separate JavaScript module resource
  per host. This is manual /local/ resource qualification, not another native
  GitHub/HACS repository installation or an update to existing exported Cards.
- Create own admin-only, hidden-from-sidebar dashboards named
  ATLAS0.1.310 Sprachdateitest temporär, URL atlas-native-0310-test. Save the own
  generated mixed Core/Bubble/Mushroom Card only there; no existing dashboard,
  Card or named editor project is changed. Existing resource counts are Pi2/VM144.
- Complete language files: Card renders and no repair notice. Rename only own
  FR to a disabled test filename and reload. Both German-language Cards report
  locales/fr.json while all mixed fields remain rendered. Restore FR, reload:
  notice disappears. This also verifies checking an inactive declared locale.
- Independently rename only own EN and reload: both show the built-in German
  repair text naming locales/en.json, independently of external EN availability.
  Restore EN and reload: complete Cards render with no notice on either host.
  No real HA entity is toggled; sun.sun state is only read.
- In the heavily populated VM Card picker, the first preview temporarily reports
  all three locales unreadable despite direct HTTP200 files. A fresh page reload
  clears that warning; the subsequent explicit missing-FR/EN tests identify only
  the intended file. The exact cause is not established. The bounded availability
  check can report transient read failures; it is not a permanent-corruption verdict.
- Original installed Cards are not silently rewritten. The check belongs to
  newly generated scripts; older exports require deliberate re-export/deployment.

## Cleanup and outcome

- With explicit user confirmation, delete only the two own dashboards and own
  module resource registrations. Move each own test folder into File Studio
  trash; retain PC copies and both new native backups.
- Final exact preservation assertions pass on both hosts: shared state/project
  payloads, external assets, configuration, terminal capabilities and original
  trash entries. Only one new own test-folder trash entry per host is permitted.
- All original selected HA dashboard/resource/integration files match exactly
  again after cleanup: Pi4/VM18. Original resource counts are Pi2/VM144.
- Public DE/EN/FR documentation records the bounded native qualification and
  temporary-read-failure behavior. Its VitePress production build passes.
- Private evidence retains final captures and screenshots; commit and CI results
  are recorded in the private task report. No runtime source/version change.
