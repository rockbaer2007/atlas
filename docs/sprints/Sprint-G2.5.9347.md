# Sprint G2.5.9347 - Native Card-Mod and UIX CSS rendering

2026-10-17. Qualification only; App0.1.315, HACS integration0.1.306 and
HA2026.10.1 unchanged. No ATLAS code/package change or new release.

## Backups and original state

- Evidence/private PC copies: source/backups/atlas-native-css-20261017.
  ATLAS/docs Git bundles, roadmap, full persistent ATLAS file mirrors/tars,
  plugin/management/terminal state, complete server projects and selected HA
  configuration/dashboard/resource files captured before native writes.
- Fresh encrypted local HA backups at13:14CEST: Proxmox b6684b25,4.67GB,
  HA settings/history, SSL and ATLAS0.1.315; Pi ae7bf165,136.13MB, HA settings/
  history, SSL and all3apps (ATLAS, Get HACS, Matter Server). Other Proxmox
  apps are outside this targeted backup. Complete HA archives remain on hosts;
  PC file mirrors are not complete HA backup archives. No backup deleted.
- Persistent tar SHA256: Proxmox
  15586e0ec5daed319822993dda7eb9e2e5c528fc2ae72da2509a6f5b94a7b4a0;
  Pi c403283161219fa75bb8ca8f8b6d0b0f740f8ea63daa2e60f9faf3c2b402d582.
- Original238VM/243Pi persistent files,4existing projects per host,6plugins.
  Proxmox already has UIX8.4.0 configured; Pi has neither styling engine.
  Both have Mushroom5.2.3. User's untracked roadmaps and docs work/ preserved.

## Native setup and actual browser checks

- Own /config/www/atlas-native-css-20261017 folders, generated scripts/locales,
  one own resource per script and own ATLAS CSS temporaerer Test dashboards
  (/atlas-native-css-20261017). Original dashboards/cards never edited.
- Existing public ATLAS generator produces native qualification scripts with
  the same six-card configuration as native reference stacks: dynamic Mushroom,
  UIX-only radius, unstyled same entity, opaque uix_style, conflicting blocks
  and static Core CSS. Both rawCard and matching plan entries supplied. This
  checks generated scripts, not an additional manual Editor UI roundtrip.
- Only passive sensor.cpu_speed / sensor.backup_backup_manager_state are read.
  Jinja now().minute parity changes CSS naturally; no device service calls or
  helper/entity creation. No native Editor local storage/settings changed.
- Official tagged Card-Mod4.2.1 and UIX8.4.0 artifacts are the same verified
  downloads as Sprint9346. Card-Mod loaded through a Lovelace module resource.
  Pi UIX installed manually, HA restarted, service added normally; no HACS
  registration or unrelated integration/plugin update.
- Engines tested separately: Pi Card-Mod then UIX; VM existing UIX then
  Card-Mod. Pi's own Card-Mod resource temporarily points to an inert own module
  before UIX setup. VM UIX entry temporarily disabled, original UIX resource
  temporarily points to Card-Mod, and HA restarted before Card-Mod measurement.
  Existing resource ID and UIX integration entry retained, never deleted.
- Actual DOM getComputedStyle and nested shadow-root measurements compare
  generated versus native cards.909assertions pass across17snapshots:
  dynamic foreground/border red and blue without reload; authored4px border;
  ha-tile-info$ -> .info letter-spacing3px; background rgb(12,34,56), authored
  6px border rgb(210,120,30), radius23px; unstyled cards unaffected.
- UIX radius17px versus Card-Mod default12px; conflicting blocks37px UIX
  versus31px Card-Mod; uix_style padding7px ignored by both (actual0px).
  Reload passes in all4host/engine combinations. Native VM browser scaling
  quantizes authored4px/6px borders to computed3.63636px/5.45455px; exact pair
  equality and bounded rasterization tolerance used, without changing user zoom.
- Screenshots pi-cardmod.png, pi-uix.png, vm-uix.png, vm-cardmod.png and all
  raw computed-style/shadow data retained. No general arbitrary-CSS claim.

## Restoration, preservation and public documentation

- User explicitly approves deleting only both own dashboards/cards, own script
  resources, Pi inert resource and newly created Pi UIX entry. Removing this
  entry removes its auto resource. Original VM UIX resource URL restored and
  existing entry re-enabled. Fresh page confirms17px UIX radius again.
- Own test directories and Pi-only UIX files moved into recoverable File Studio
  trash; no existing trash/history entry purged. Pi HA restarted again to remove
  the temporary integration's loaded code. No native ATLAS app restart/update.
- Original plugin, management, terminal, HA version and4projects per host stay
  exact. All238VM/243Pi original persistent file contents and59VM/13Pi selected
  HA config/resource/dashboard paths match the pre-test snapshots, including
  original resource IDs. Both original trash entries per host remain exact.
  Only own recoverable trash additions:6files/1entry VM,36files/2entries Pi.
- Public Card Editor and development status updated in DE/EN/FR with versions,
  native checks, passive-sensor scope, setup/restoration and CSS limits. Roadmap
  closes the named native qualification and retains other versions/themes/card
  families as separate checks.
- npm run docs:build passes (existing large-chunk advisory only); both repos'
  git diff --check pass. No runtime tests/build repeated for documentation-only
  qualification changes. Close only own browser tabs after final checks.
