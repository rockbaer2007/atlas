# Sprint G2.5.9316 - Isolated HACS card export/import qualification

2026-10-16. Preserve existing settings, files, projects and plugins. Pi 5 and
Proxmox are neither queried nor modified. Their installed Apps/integrations are
not updated by this increment.

## Backup and isolation

- Complete-history ATLAS, documentation and add-on repository Git bundles;
  copies of the user's two untracked roadmap files. Originals remain untouched.
- Private fixture/evidence root:
  `C:/Users/rockb/source/backups/atlas-card-roundtrip-20261016`.
- New official HA2026.10.1 amd64 container/volume, loopback4204; separate
  runtime4205 and internal4206/4207, all persistent roots confined to this fixture.
- Generated local-only HA credentials, template temperature21.5 and own lamp
  input_boolean. No production token or network device is used.
- Own pre-existing eight-file runtime fixture copied from the previous isolated
  backup: project, shared plugin metadata/assets and config preserved. Runtime
  backup/baseline and full HA fixture archive retained on PC. Archive SHA256:
  `293bfd381f69012718c108fd42daee4504c4fd60a1f27efda5460844692f67db`.
- A failed Windows bind mount was replaced with a new private Docker volume.
  After Codex restart restored browser control, Docker reported a locked
  sailor-ingest socket. `docker desktop stop` removed the stale socket; normal
  restart retained images, containers and volumes. No data reset or diagnostic
  upload was performed.

## Actual browser and HA results

- Construct and normalize three Expert fields: Core entity4x2 at0/0, Bubble
  switch4x2 at4/0 and Mushroom Template8x2 at0/2. Different project/child names.
- Import real `.hacs.zip` through the Editor file chooser. All three fields,
  positions, dimensions and resize/template metadata survive. Editor DE/EN/FR
  switches retain fields and generated card configuration.
- Actual Chrome export downloads `atlas-card-roundtrip.hacs.zip`,15,266 bytes.
  Browser download-event notification times out, but the native completed file
  is present and independently read/copied/hashed. No security warning bypass.
- Reimport that exact downloaded ZIP through the UI and export again. Both
  archives have SHA256
  `39ec8fff2d5f00495102ca07088ea1149fcf631dc95da38c862d29b09088c050`.
  Typed reader checks actual ZIP fields against the original normalized plan,
  card configuration, script name, EN/DE/FR and fallback metadata: equal.
- Copy actual exported script bytes into isolated HA; container and PC hash
  match `41474f95496c369c73f076d8be567cfdf2854d7e05871a5fbbc2576c5e7fb2d6`.
  Original fixture script has those same bytes. Real Lovelace renders Core,
  official Bubble3.4.2 and Mushroom5.2.3, without error cards. Exact official
  release URLs and asset hashes remain in private provenance.json.
- HA profile DE/EN/FR renders the same three cards. Temperature uses localized
  numeric formatting; Bubble state is Ein/On/Activé and changes live to Aus/
  Désactivé when the own fixture is switched off. Mushroom authored text stays
  unchanged as intended. Restore the own fixture lamp to off; the own new HA
  test profile finishes in French. No existing user profile is changed.
- Final runtime comparison preserves all eight fixture file hashes, named
  original project and shared management revision1. No server-project save or
  plugin replacement is used for the browser import test.

## Product correction and automated checks

- Browser import reveals false readiness failures: script/example project title
  was compared with the first inner card title. Compare against the validated
  package manifest name, retaining the original card summary and mismatch checks.
  Actual imported ZIP improves from110/112 to112/112 readiness checks passed.
- Regression checks distinguish a valid distinct child title from a wrong
  script default title. Add mixed Core/Bubble/Mushroom ZIP import/re-export,
  field/config equality, explicit fallback metadata and byte equality coverage.
- App0.1.307, HA package0.2.0-alpha.84 and reference plugin0.2.0-alpha.104;
  optional HA integration remains independently0.1.306. No data schema changes.
- Workspace build,164 HA tests,39 App tests and DE/EN/FR docs build pass.
  VitePress retains its existing large-chunk advisory. Canonical502-file add-on
  copies are synchronized with the separate add-on repository.
- Docker build succeeds; the loopback4208 preview reports ready Administration
  and Editor from `/health`, with package version0.1.307 inside the container.
- Own browser tabs, three local runtime processes and both own test containers
  are closed/stopped after the final preservation comparison. Keep fixtures,
  downloaded ZIPs and checked backups for follow-up qualification.

## Boundaries

- Exported grid metadata round-trips, while HA renders generated stacks, not
  identical free-surface pixel geometry.
- Resources are served by real HA `/local/`; this does not exercise GitHub/HACS
  repository delivery, catalog acceptance or native ARM64 rendering.
- DE/FR locale files are marked English fallbacks without an enabled translation
  adapter. Generated Expert scripts do not load/apply these locale files yet.
  Successful DE/EN/FR HA rendering does not establish translated authored text.
- This is a three-field bounded test, not a large-project performance profile.
