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

Native qualification and final three-backup retention are pending at this
implementation commit. Public DE/EN/FR documentation will record the final scope.
