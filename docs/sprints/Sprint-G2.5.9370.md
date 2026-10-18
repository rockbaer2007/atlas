# Sprint G2.5.9370 - Native HACS ambiguity qualification

2026-10-18. App stays 0.1.323, HACS integration stays 0.1.306.

## Backups and boundaries

Git bundles of ATLAS and public docs are saved before edits at
`C:/Users/rockb/source/backups/atlas-hacs-ambiguity-20261018`. Fresh encrypted full
HA backups finish on .177 (7e8be012, 138.59 MB, 14:54 CEST) and .68 (7908320e,
139.75 MB, 14:55 CEST). Both keep the HA-generated name Custom backup 2026.10.2;
the entered custom names did not persist. Exact IDs and native restore listings
identify them, with settings/history, SSL, media, share and all installed Apps,
including ATLAS 0.1.323. No complete PC download of these HA archives is claimed.

Additional PC captures include 405 persistent files plus checked config/theme/
supplement files on .177, nine approved config files on .68, and complete local
Editor JSON exports. Seven projects and six plugins per host are the baseline;
private .68 plugin files remain covered by its full backup without new access.
All network and browser work stays on .177/.68 with HA 2026.10.2. No runtime or
package source changes, updates, HA restarts or permission changes are made.

## Fixtures and actual imports

Twenty-three fixtures per host cover three valid controls (JSON, YAML and
dist-only layout), multiple project files in reversed order, distinct projects
sharing an identity, multiple root scripts, direct manifest/script conflicts,
an inconsistent Editor plan, exact duplicated metadata/script/package/locale
paths, conflicting duplicated package bytes and logical root/dist aliases.

Fixtures contain simple Entity plan markers field-A, field-B and field-OTHER.
Their selection identifies the chosen project. This is an ambiguity/import-gate
test, not a new nested Card or renderer-preservation qualification. Python zipfile
independently reads every ZIP member by entry, including duplicate names, and
verifies all CRCs: no corrupt-CRC shortcut explains a rejection. Seven cases have
exact duplicate paths; the two logical aliases use distinct physical ZIP paths.
An initial generator lookup expected root paths while the exporter produced
dist paths; the fixture layout was corrected before native testing.

All 46 actual file-picker imports reproduce the local Reader result:

- 26 correct rejections, including exact/logical duplicate paths and direct
  manifest/script mismatches. Rejection leaves the original Editor code intact.
- Six valid controls are accepted at 112/112.
- Twelve incorrect imports occur despite a blocked report at 111/112. Six cases
  per host have multiple embedded project files or additional root scripts. The
  Reader selects the first embedded package; the Editor trusts its importable
  flag instead of the blocked readiness report. Reversing two same-identity
  project entries changes field-A into field-OTHER. With distinct identities,
  reversing entries can change acceptance into rejection.
- Two further incorrect imports pass 112/112: Editor plan scriptFilename differs
  from the HACS/package script filename. The Editor adopts ambiguity-b.js while
  manifest/script metadata reference ambiguity-a.js. The conflicting field is not
  checked against all other identities.

After every accepted test import, the full original Editor configuration is
restored through its normal JSON import and confirmation. After every case,
reload plus a fresh complete Editor export match the baseline except createdAt.
`verify.mjs` checks all 46 cases, original JSON equality, fixture hashes, the order
effect, the Editor plan conflict and unchanged captured existing data. Final
captures preserve projects, plugin management, original trash/history and files.
No HA dashboard, resource, synthetic state, WWW file or server project is created.

The first six-case UI batch hit the tool's 30-second boundary after four saved
results; a fifth import was in progress. Fresh tabs explicitly restored the
original Editor before resuming smaller bounded batches. Duplicate case results
are replaced by host/name; the final record has 46 unique cases. This helper
timeout is not counted as a product result.

## Result and follow-up

Qualification fails for the 14 incorrect imports. Preserve this negative evidence;
do not claim that a blocked report alone protects the Editor. Align the actual
import gate, exact project/script cardinality and all declared script identities
before repeat qualification. Existing CRC and duplicate-path checks remain valid.
DE/EN/FR public documentation records the limitation and recommends using only
unambiguous exports, with original backups for recovery of an overwritten draft.

The DE/EN/FR documentation build passes with only the large-chunk advisory;
main/public documentation whitespace checks pass. No new package version is
introduced because this increment records qualification, not a runtime correction.

## Retention and completion

After explicit user confirmation, only 6cb9f8fc (.177) and a98ca2b0 (.68), both
18 October 13:41, are permanently deleted. Unfiltered native lists confirm three
full backups on each host:

- .177: 7e8be012, 73e24753, 3193821e.
- .68: 7908320e, ab1e48cd, 71391a3e.

PC backups and installed updates remain. Final list text/screenshots and
`deleted-backups.json` record the cleanup. The two fresh recovery/backup tabs
are closed; detached handles from the earlier helper timeout cannot be controlled
through their old debugger bindings. Both restored persistent Editor states are
verified independently of those handles. The test is complete with a negative
qualification result; correcting the actual import gate is the next open task.
