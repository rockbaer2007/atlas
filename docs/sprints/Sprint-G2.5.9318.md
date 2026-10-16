# Sprint G2.5.9318 - Exported Card locale runtime

2026-10-16. Load and apply exported Card language files with English fallback.
All checks use fresh loopback fixtures; Pi 5 and Proxmox are neither queried
nor changed. Existing settings, files, projects and plugins remain intact.

## Backup and scope

- Verified Git bundles for ATLAS, add-on and external documentation, copies of
  user-owned roadmaps, and an eight-file runtime preservation baseline are kept
  under `C:/Users/rockb/source/backups/atlas-card-locales-20261016`.
- The fresh HA fixture's PC archive `ha-before-browser.tar` has SHA256
  `16738faee54842e032c90233e66734d57022d69bdc70855bbec6101fa1bf03ac`.
- App0.1.308, HA package0.2.0-alpha.85, reference plugin0.2.0-alpha.105.
  HA integration remains0.1.306. No stored schema or backend changes.

## Behavior

- Exported module scripts load sibling `locales/en.json` and the requested
  language on the same origin, with credentials omitted and redirects rejected.
  Requests revalidate browser cache, have a three-second abort deadline, and
  accept only bounded, matching-language string fields.
- HA language is automatic; per-Card `language` overrides it. Regional language
  values normalize to their base. Missing/invalid/partial strings fall back
  individually to external EN, then embedded EN. Per-module language caching
  avoids repeat requests on ordinary state updates; reload after file edits.
- Project heading, missing-demo-entity hint and script-owned render failure
  use translated strings. Authored nested names and entity IDs stay unchanged.
  Distinct explicit title/hint values take precedence. Existing child cards
  remain mounted for ordinary HA state changes; stale language results cannot
  replace a newer selection. Supported legacy generated scripts also load locales.
- Bundle README and DE/EN/FR public documentation explain module registration,
  sibling file deployment, language selection, fallback and cache behavior.

## Verification

- Home Assistant package:168 tests pass, including live state forwarding,
  language changes, partial/invalid/missing locales, stale responses, timeout,
  explicit overrides and legacy rendering. All39 App tests and full build pass.
- Real HA Core2026.10.1 at loopback4214 renders the generated mixed
  Core/Bubble/Mushroom Card. Private manually translated fixtures show
  Wohnzimmer (DE), Salon (FR), English room (unknown-language EN fallback),
  and Manual title/Manual hint overrides. Changing the HA profile to French
  changes the automatic Card title to Salon.
- Invalid DE JSON visibly falls back to external English room; additionally
  invalid EN falls back to embedded Locale test card. Good files are restored.
  The explicit missing-entity fixture intentionally displays HA's warning.
- Browser imports the new ZIP with112/112 readiness checks. Actual browser
  re-export/reimport preserves all three fields, geometry and EN/DE/FR files.
- Docker build passes; isolated preview4218 reports healthy Admin and Editor,
  with App0.1.308. Canonical add-on copies contain503 synchronized files.
- External documentation build passes (existing large-chunk advisory).
  Original fixture files/shared metadata/project and user roadmaps remain intact.

## Limits

DE/FR files generated without an executed translation adapter remain marked
English fallbacks. Test translations demonstrate loading, not automatic
translation. HA/community-owned labels follow their own localization. A
filename-only HACS manifest does not establish delivery of locale JSON files;
HACS repository/release distribution remains separate qualification work.

Final GitHub CI outcome is recorded in the task report and private evidence.
