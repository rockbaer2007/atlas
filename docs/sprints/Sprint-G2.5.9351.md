# Sprint G2.5.9351 - Native 0.1.316 Bubble CSS and UIX qualification

2026-10-17. HA App 0.1.316, framework 0.2.0-alpha.88;
HACS integration 0.1.306 unchanged. Qualification of the already released fixes
from Sprint9350; no runtime/package changes or additional version bump.

## Backup and update

- Fresh local HA backups completed before either update: Proxmox `95ae96ab`
  (4.67 GB) and Pi 5 `9fd0f6cb` (136.79 MB), named for 0.1.316 CSS qualification.
  Proxmox includes HA settings/history, SSL and ATLAS; Pi includes HA, SSL and
  all three installed Apps. These native archives remain on their hosts.
- PC evidence includes repository Git bundles, persistent-file mirrors/tars,
  selected HA configuration files and original complete local Editor exports.
  These file mirrors are not described as full HA backup archives.
- Native App UI updates from 0.1.315 to 0.1.316 completed on Proxmox and Pi 5,
  with the previous-version backup option enabled. Health endpoints report
  0.1.316. HA remains 2026.10.1 and the integration remains 0.1.306.

## Native rendering and roundtrip

- Six owned Core/Bubble/Mushroom cards per host, native reference alongside the
  generated script, with UIX 8.4.0 and Mushroom 5.2.3. Native Bubble resource
  versions differ: Proxmox 3.4.2, Pi 3.4.1; neither was updated for this test.
- Existing dark theme retained. Only passive existing sensors are read; no
  devices, automations or synthetic entity states are changed.
- YAML and JSON imports preserve the exact Bubble CSS string and per-card UIX
  styles, including root-stack custom-property ownership. Actual UI HACS export,
  file import and re-export pass 112/112 package-readiness checks per host.
- HACS ZIP pairs are byte-identical: Proxmox SHA-256
  `d6a131de0f3ab0a3e1e1f20dee2c7b0bbe5536ddea019d15424e65fb753b93ef`, Pi
  `a82736955a24b7baa8255827df41ce8ec2cb3be0049ae7f756fa05468953c5d2`.
- 240 computed-style comparisons pass: ten nodes, six properties, two snapshots
  (initial/reload), two hosts. Native/export values agree for foreground,
  background, border width/color, radius and inherited custom property.
  The distinct green parent accent is inherited; Bubble overrides retain the
  authored background, border color and 9-px radius. Existing browser zoom can
  quantize the authored 3-px border; comparison uses the native reference.
- Complete original local Editor configurations were restored through their
  ordinary import UI and re-exported: exact JSON equality except `createdAt`.
  One new, separate server test project per host remains available.

## Preservation and cleanup

- Original persistent files match SHA-256: 244 Proxmox / 279 Pi files, apart
  from the expected project index extension for the additional owned project.
  All four original projects and six plugins per host are unchanged, as are
  plugin management, Terminal configuration and HA connection/version settings.
- Original trash entries (three Proxmox / four Pi) and history files remain
  intact. Added files are confined to owned test-project workspace/backups and
  the recoverable trash entries created during this cleanup.
- Selected original HA files/dashboards match exactly. Proxmox resources differ
  only by three removals the user explicitly confirmed making concurrently:
  lumina-energy-card, thermal_comfort_icons and custom-icon-color. Those user
  changes were retained; no causal link to the ATLAS update is claimed.
- After explicit user confirmation, removed both owned dashboards
  `ATLAS 0.1.316 CSS temporärer Test` and the two owned script resources.
  Own WWW folders were moved into File Studio trash; nothing was purged.
- Proxmox's original UIX was retained. Pi had no UIX initially: official UIX
  8.4.0 was temporarily installed/configured for qualification, then its owned
  entry removed and its component folder moved to recoverable trash.
  Ordered HA Core restarts activated and subsequently unloaded it. Pi original
  resource registry and missing UIX manifest state match the initial capture.

## Evidence, docs and boundaries

- Private evidence: `C:/Users/rockb/source/backups/atlas-native-0316-css-20261017`.
  Contains before/checkpoint/after captures, actual browser ZIPs, CSS measurements,
  screenshots, local Editor exports, `final-style-proof.json`, `zip-proof.json`
  and `preservation-proof.json`. Private state/credentials are not committed.
- DE/EN/FR Card Editor and development-status documentation updated and built
  with `npm run docs:build`; only the existing large-chunk advisory remains.
  Repository diff whitespace checks pass. Runtime source was unchanged, so the
  prior increment's 204 tests/build were not repeated for this evidence update.
- Native scope is the existing dark theme and tested UIX versions. This is not
  pixel equality, an ARM browser benchmark or live theme-switch qualification.
  Existing scripts still require re-export; lost old CSS requires its original
  source/backup. Next: isolate theme switches on continuously mounted cards.
