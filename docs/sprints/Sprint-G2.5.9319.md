# Sprint G2.5.9319 - HACS delivery of Card language files

2026-10-16. Export an installable repository layout for the Card script and
language files. Pi 5 and Proxmox are neither queried nor changed. Existing
settings, files, projects and plugins remain intact.

## Backup

Private evidence is retained under
`C:/Users/rockb/source/backups/atlas-hacs-locale-delivery-20261016`:
verified ATLAS Git bundle, add-on/documentation bundles, original user roadmaps,
eight-file runtime backup/baseline and fresh HA fixture archive.
`ha-before-browser.tar` SHA256:
`90814f2bbf8b330f079bfc2b9b78a0ce64b2e850058500f374fb4dd6cd93ddc9`.

## Changes

- App0.1.309, HA package0.2.0-alpha.86, reference plugin0.2.0-alpha.106;
  HA integration remains0.1.306. No stored schema migrations.
- Bundles contain root hacs.json/README/project/example and one runtime under
  dist/: script plus sibling locales/en.json, de.json, fr.json as selected.
  HACS strips dist/ while retaining the locale subdirectory on installation.
- Bundle resource URLs use a dedicated repository named after the script
  basename, rather than the ATLAS integration's repository. README/install
  steps explain extraction, HACS Dashboard registration and YAML resources.
- Reader maps only supported dist runtime entries to semantic installation
  paths; physical ZIP inventory is retained. Legacy root-layout bundles import.
  Unsafe physical paths and ambiguous root/dist aliases are rejected.
- HACS2.0.5 can omit nested locales for script basenames beginning with dist.
  Export blocks this case with a localized DE/EN/FR message, before translation
  or download. User projects remain intact; another script filename is required.
- UI export status still lists EN/DE/FR correctly with the new physical paths.
  Public DE/EN/FR documentation is updated separately.

## Isolated verification

- Official HACS2.0.5 release ZIP SHA256:
  `97be6b824a4f38e683728cc6dd72367f6b8bad0a43428b1b3b987a3087adf413`.
  Source tag resolves to c0dfd8b. Actual unmodified HacsPluginRepository methods
  update_filenames, gather_files_to_download and download_content run inside
  HA Core2026.10.1. Only GitHub file transport/save callbacks point at a private
  repository fixture and dedicated volume; no GitHub account/token is used.
- All four runtime files are selected and installed byte-for-byte at
  www/community/atlas-localized-card/. Independent project sentinel is retained.
  Negative fixtures reproduce dist-prefix loss, root-script precedence and
  standalone JavaScript release precedence using actual HACS selection code.
- A fixture component invokes HACS's unchanged frontend-endpoint setup method.
  Script and all three JSON files return HTTP200 through /hacsfiles/. Browser
  renders mixed Core/Bubble/Mushroom cards with manually translated test files:
  Wohnzimmer, Salon, English room fallback and Manual title/Manual hint overrides.
  Default exported fallback files are restored through the same download path.
- Browser imports the dist ZIP with112/112 readiness checks. It displays the
  filename boundary message and then exports eight files with en,de,fr after
  choosing a supported name. Actual downloaded ZIP reimports with original three
  fields/geometry, correct repository resource URL and dist language files.
  The previous0.1.308 root-layout browser ZIP remains importable.
-172 HA package tests,39 App tests,6 frontend tests, full build and syntax check
  pass. Runtime preservation compares all eight file hashes and shared
  project/plugin metadata. User roadmap hashes remain unchanged.
- Canonical add-on inventory contains504 synchronized files. Docker build and
  isolated health check pass. External documentation builds with its existing
  large-chunk advisory. Own fixture processes are stopped after verification.

## Boundaries

This qualifies HACS2.0.5 dist-layout selection, download/save and HTTP delivery,
not live GitHub authentication, custom-repository registration UI, public
release publication, every HACS version or native-host installation. The ZIP
must be extracted into the repository; it is not a zip_release asset. Do not
publish a competing root script or standalone JS release asset. Generated DE/FR
still need review/translation when no adapter executes. The optional fixture
frontend is test-only and is not shipped with ATLAS.

References: [HACS plugin publishing](https://www.hacs.xyz/docs/publish/plugin/),
[HACS2.0.5 download implementation](https://github.com/hacs/integration/blob/2.0.5/custom_components/hacs/repositories/base.py),
[HACS2.0.5 plugin selection](https://github.com/hacs/integration/blob/2.0.5/custom_components/hacs/repositories/plugin.py).
Final commits and GitHub CI outcome are recorded in the task report/private evidence.
