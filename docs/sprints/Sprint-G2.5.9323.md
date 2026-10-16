# Sprint G2.5.9323 - Exported Card locale availability checks

2026-10-16. Add visible diagnosis and repair guidance for missing/unreadable
exported Card locale files. Work and verification stay isolated; Pi 5 and
Proxmox are neither queried nor changed.

## Backup and preservation

- Before edits, retain ATLAS/add-on/documentation Git bundles, both user
  roadmaps and a full stopped HA fixture archive under
  `C:/Users/rockb/source/backups/atlas-card-integrity-20261016`.
- `ha-before.tar` SHA256:
  `80a26b08c0e8b8db6e810cb1261257ac86f8a41464f760156de68d50f8e99f2e`.
- Clone into new HA2026.10.1/HACS2.0.5 volume/container
  `atlas-card-integrity-20261016`, loopback4228 only. Earlier fixtures and all
  native hosts remain untouched. No HACS source instrumentation is used.
- Only own cloned Card script/compressed script and locale files change for
  verification. Other 72 HA/dependency files, eight non-HACS configuration
  entries and eight retained original runtime files match the earlier baseline.
  Original project plan/fields/entities/geometry survive candidate bundle
  reimport exactly. No stored data or credential schema migration is introduced.

## Implementation

- Script export accepts the declared locale list. The editor passes the selected
  Card languages to JSON package and standalone JS export; HACS generation from
  an editor plan passes the package manifest languages. Existing supplied scripts
  are preserved, not rewritten during legacy imports.
- Newly generated modules fetch EN, declared export languages and the active
  language concurrently, with the existing per-module cache, 3-second deadline,
  64KiB JSON limit, same-origin/redirect restrictions and omitted credentials.
  An unavailable active language not declared by the export still falls back
  normally; it is not incorrectly reported as a missing exported file.
- Missing/unreadable/invalid declared files produce a compact status notice
  listing safe locale paths. Repair text is embedded independently in EN/DE/FR;
  it cannot disappear together with the locale files or show raw server errors.
  Redownload the complete Card package, reload the browser, restore backup if
  needed. No automatic file writes, network repair or HACS rollback is added.
- Expert child rendering, live state forwarding, user title/hint overrides and
  supported legacy rendering remain functional. The notice is appended without
  replacing child Cards. Complete packages show no notice. Repair plus full
  browser reload clears cached failures and removes the notice.
- This is an availability/format check, not a cryptographic or version-consistency
  check. Partial translation keys retain field-wise fallback. Existing installed
  scripts need re-export and redistribution to gain this feature.

## Verification and delivery

- 176 Home Assistant package tests pass, including missing inactive FR, missing
  EN/malformed JSON, all three built-in repair languages, preserved live states,
  exact request caching and disappearance after repair/module reload.
- Real candidate bundle reimports with the identical original editor plan.
  In the cloned HA, complete EN/DE/FR gives zero notices; deleting only own FR
  shows DE and FR notices naming locales/fr.json in both complete mixed
  Core/Bubble/Mushroom Cards. Missing EN+FR lists both files and embedded EN
  keeps rendering. Both Cards receive a live lamp on update; restore original
  off state. Restore original locales from the backup and reload: no notices.
- Main build and JS syntax check pass; 39 App and six frontend tests pass.
  The first concurrent App run reached the fixture readiness timeout; the focused
  lifecycle rerun and subsequent full App run both pass without code changes.
- Build isolated Docker image atlas:integrity-0310 and check /health at the own
  loopback4240 preview. Internal Administration4175/Card Editor4174 are ready.
  DE/EN/FR documentation build passes with the existing chunk-size advisory.
- Release App0.1.310, Home Assistant package0.2.0-alpha.87 and reference
  plugin0.2.0-alpha.107. Integration remains0.1.306. Synchronize canonical
  add-on sources and the separate add-on repository; document all three locales.
- Keep backups/proof, stop only own preview/HA containers and close own test tab
  after verification. Final commits, archive hash and CI outcome are recorded
  in the task report and private evidence.
