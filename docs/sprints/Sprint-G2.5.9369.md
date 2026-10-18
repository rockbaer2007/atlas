# Sprint G2.5.9369 - Explain HACS ZIP failures without invented missing files

2026-10-18. App 0.1.323; HACS integration remains 0.1.306.

## Backup and scope

Before edits, Git bundles of ATLAS, the App repository and public docs are saved
at `C:/Users/rockb/source/backups/atlas-hacs-diagnostics-20261018`. Fresh full HA
backups complete on .177 (73e24753, 138.59 MB) and .68 (ab1e48cd, 139.74 MB)
with HA 2026.10.2 and App 0.1.322. Native restore lists include settings/history,
SSL, media, share and all installed Apps. Full HA archives remain on their hosts;
no complete PC archive download is claimed. Additional local Editor JSON exports,
405 persistent files on .177 and nine approved config files on .68 are captured.
Both hosts retain seven projects and six plugins as their preservation baseline.
Private .68 plugin storage remains covered by its HA backup without expanded access.

Network, update and browser tests are restricted to .177/.68. Local static/unit
checks do not start other servers. Existing user roadmaps are preserved.

## Correction and local checks

Archive inspection exposes an explicit verified/integrity-error/unreadable status.
A discarded inventory reports one ZIP error and no invented missing-file lists.
The stable 112-check report marks dependent file/content checks pending with an
explanation, while ZIP verification is its first failed check. Verified archives
retain genuine missing-file diagnostics. Rejected imports still expose no package
content and cannot replace the Editor state. No storage migration is introduced.

All 378 Home Assistant package tests pass, including 54 integrity cases whose
independent ZIP mutations also assert honest pending statuses, primary failure,
review lines and unchanged input bytes. Existing missing-file and valid JSON/YAML
controls pass. Full workspace build, JavaScript syntax check and two package
preservation tests pass; both App copies are synchronized from canonical sources.

## Native qualification and preservation

Both authorized hosts update to 0.1.323 with HA 2026.10.2. Their pre-existing
Editor code survives the update. The actual file-picker imports repeat all 32
saved fixtures on each host: 60 invalid packages reject, four original JSON/YAML
controls pass 112/112. All 26 cases with unavailable inventories report ZIP
verification as the first failure without invented missing-file claims. Genuine
missing-file cases still report the actual omissions. Code remains exact after
each rejection and reload. Complete Editor configuration exports after all
negative imports and after valid-control restoration match the originals except
the export timestamp. Source cards match independently, including empty/spaced
Entity names and Conditional conditions.

Final capture and `verify.mjs` pass: 405 persistent files plus checked HA/config,
themes and supplement data on .177, nine approved config files on .68, seven
projects and six plugins per host, checked management, trash and history remain
unchanged. Private .68 plugin files retain their full-backup coverage. Four
byte-identical archive roundtrips are local checks; native controls are actual
imports, not a new native ZIP reexport claim. No HA Core restart or new dashboard,
resource, synthetic entity, WWW file or persisted test project is introduced.

The browser download-event waiter timed out after its first successful JSON
download. The complete file was verified from Downloads and the UI workflow
resumed through fresh tabs. This tool timeout is not a product failure.

Evidence is saved under the backup directory above: full native report text per
case, both original and final Editor exports, file/hash captures, fixture hashes,
`native-results.json`, `verification.json`, backup restore listings and the visible
CRC report screenshot. The existing 112-check list is retained; unverified content
checks are pending, so a corrupt ZIP intentionally does not reach 112/112.

DE/EN/FR public documentation describes the corrected diagnostic behavior. The
VitePress build passes with only the large-chunk advisory. Source/package syntax,
both 514-file canonical App copies and whitespace checks pass.

## Retention

After explicit user confirmation, only 62d3a495 on .177 and 66524782 on .68,
both Custom backup 2026.10.2 from 18 October 13:12, are permanently deleted.
Unfiltered native lists confirm exactly three complete backups per host:

- .177: 73e24753, 3193821e, 6cb9f8fc.
- .68: ab1e48cd, 71391a3e, a98ca2b0.

The newest full backups, installed updates and all PC backups remain preserved.
`deleted-backups.json` and final native list text/screenshots record the cleanup.
Both remaining backup verification tabs are closed.
