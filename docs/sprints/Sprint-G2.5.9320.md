# Sprint G2.5.9320 - Live GitHub and HACS Card registration

2026-10-16. Verify real GitHub authorization, custom HACS repository registration
and installation of the exported Card in a new isolated Home Assistant instance.
Pi 5 and Proxmox are neither queried nor changed.

## Backup and publication

- Git bundles for ATLAS, add-on and documentation, original user roadmaps,
  exact source ZIP, repository baseline, eight runtime files and HA archive are
  retained under `C:/Users/rockb/source/backups/atlas-hacs-github-20261016`.
- `ha-before-hacs.tar` SHA256:
  `6b807ba90db642640fde454dac62fc693c29b048b236a312f1979584a2745e5a`.
- Publish a dedicated public verification repository:
  [atlas-hacs-delivery-card](https://github.com/rockbaer2007/atlas-hacs-delivery-card),
  commit `d62382db47a6901b736ac1b0268d9819e01512c6`. It contains the actual
  browser-exported eight-file bundle from Sprint9319 plus the MIT license and
  a README notice identifying version0.1.0 as a test fixture. No release/assets
  are created. Preflight excludes credentials and private host addresses;
  only safe demo entities are published. A verified initial Git bundle is kept.
- Real unauthenticated GitHub raw endpoints return all four runtime files with
  exact Git blob bytes. The HA token and GitHub OAuth credentials stay private.

## Live HACS flow

- Official HA Core2026.10.1/HACS2.0.5, new Docker container/volume
  `atlas-hacs-github-20261016`, bound only to127.0.0.1:4224. No fixture HTTP
  transport overrides, custom endpoint adapter or copied HACS state is used.
- Start the real HACS integration through HA's UI. The user approves GitHub
  Device OAuth themselves. Existing gh/native-HA credentials are not copied
  into the fixture. HACS initializes successfully against live GitHub.
- In HACS main menu, Custom repositories, add the GitHub URL as Dashboard.
  Open Locale test card and download commit d62382d from main.
- HACS installs script plus locales/en.json, de.json and fr.json beneath
  www/community/atlas-hacs-delivery-card/. All four /hacsfiles/ responses are
  HTTP200 and byte-identical to GitHub blobs. HACS automatically creates the
  module resource with its hacstag; no manual resource registration is needed.
- Install the example's dependencies through live HACS as well:
  Mushroom5.2.3 and Bubble Card3.4.2. The pre-created test dashboard renders
  Core Temperature21.5C, Bubble Lamp and Mushroom Lamp in both requested Card
  languages. DE/FR files intentionally retain their marked English fallbacks.
- Change only the fixture lamp off/on/off; both Card instances receive the
  live state without reloading. The original off state is restored.
- Restart only the isolated container. HACS persistence reports the repository
  installed at d62382d, all files and automatic module resource survive, and
  the browser renders both complete Card instances again. An immediate check
  before HACS endpoint startup initially returns404; once integration startup
  finishes, the same verification passes without any file/config correction.

## Preservation and outcome

- Compare all eight non-HACS configuration entries, dashboard/config hashes
  and eight retained original runtime file hashes before installation, after
  installation and after restart: unchanged. No data schemas, storage logic,
  production settings, files, projects or plugins are changed.
- Public DE/EN/FR documentation explains the actual custom-repository UI flow,
  example URL, dependency requirements and distinction from the default HACS list.
  Documentation build passes, with its existing chunk-size advisory.
- ATLAS remains0.1.309 and the integration0.1.306. Verification/documentation-only
  ATLAS changes require no new package version or add-on source update.
- Own browser test tabs close and the isolated HA container stops after proof;
  private backups/evidence and the public example repository remain available.

## Remaining boundaries

Registration is local to this HACS installation; this is not submission to the
central HACS default catalog. Only the real main-branch install is qualified.
Tagged releases, Card update/rollback distribution, additional HACS versions
and native-host installation remain separate work. No blanket plugin/host
compatibility or completed DE/FR translation is claimed.

Final ATLAS/documentation commits and GitHub CI result are recorded in the task
report and private evidence. The public repository contains no HA/GitHub secrets.
