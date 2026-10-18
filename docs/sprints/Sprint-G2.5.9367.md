# Sprint G2.5.9367 - Native HACS rejection checks and test backup retention

2026-10-18. App remains 0.1.321; HACS integration remains 0.1.306.

## Backup and scope

Only 192.168.178.177 and 192.168.178.68 are tested, with HA 2026.10.2.
Git bundles, exact fresh local Editor exports, persistent data mirrors/hashes,
fixtures and per-case evidence are stored at
`C:/Users/rockb/source/backups/atlas-hacs-negative-20261018`.

Before imports, fresh encrypted full HA backups are completed and inspected:
6cb9f8fc on .177 (138.54 MB) and a98ca2b0 on .68 (139.72 MB), both at 13:41 CEST.
They include settings/history, SSL, media, share and all Apps including ATLAS
0.1.321. They remain on their hosts; no new PC copy of these full archives is
claimed. Existing PC archives and source ZIPs remain untouched.

## Native matrix

Each host imports the same 21 fixtures through the actual Editor file chooser:

- Eight invalid-name cases: missing, empty, whitespace-only and conflicting names
  in either hacs.json or the embedded package manifest. The source Card's first
  Entity name is empty, without a leading named control Card.
- Seven absent required files: HACS manifest, README, example Card, script,
  embedded package, English locale and declared French locale.
- Four malformed structures: non-ZIP bytes, truncated end directory, invalid
  HACS JSON and invalid embedded-package JSON.
- One CRC-damaged README archive and the unchanged valid original control ZIP.

All 19 ordinary negative fixtures are rejected on each host. After each
rejection, generated Card code matches the original Editor. Reload and complete
configuration export also match the fresh original configuration, excluding only
the export createdAt timestamp. All 38 rejection cases pass these comparisons.
Both valid controls import successfully at 112/112.

## Open finding: CRC corruption falsely accepted

The fixture changes an ordinary README byte in the original stored ZIP without
updating either CRC field. Python's independent zipfile reader rejects that entry
with BadZipFile/CRC mismatch. ATLAS 0.1.321 instead accepts it at 112/112 on both
hosts and imports the embedded Card package, replacing the local Editor content.
Full exported configurations prove the replacement. No generated test script is
registered or executed in HA. This is a failed integrity qualification, not a
successful rejection or automatic recovery result.

The reader checks ZIP signatures/bounds and semantic bundle content but does not
validate stored entry CRC values. Implement CRC/structural validation before
Editor adoption in a separate increment. The current native evidence specifically
covers damaged README bytes; it does not claim all possible corruption variants.

After each CRC and valid-control import, the complete original local Editor is
restored through the normal config import/confirmation. Final full exports match
both original configurations exactly except createdAt. Both original Editors are
preserved, not left on the test fixtures.

## Retention and preservation

The user explicitly confirms three concrete batches of permanent HA-backup
deletions: 14 older named ATLAS tests first, 13 older manual/clone entries after
the new retention instruction, then two previously hidden automatic/App-update
entries on .177. Total: 29 backups removed, 22 on .177 and seven on .68. The first
inventory used the manual filter; final qualification deliberately uses the
unfiltered list and includes all backup types. IDs, sizes, dates and deletion
evidence remain in the evidence folder. No blanket automated purge is introduced.

Exactly three latest full backups remain per host:

- .177: 6cb9f8fc, 62d3a495, a84e5539.
- .68: a98ca2b0, 66524782, f9df37a6.

The final System UI reports 91.3 GB free on .177 and 39.2 GB on .68, versus
88.8/31.7 GB before cleanup. AGENTS.md and ROADMAP.md preserve the user's standing
three-full-backup rule after completed tests, with concrete browser confirmation
for permanent deletions and no limit applied to PC backups.

Final captures preserve all 405 persistent plugin/project/trash/history files on
.177 plus its checked HA config/theme files, and nine approved HA/config files
on .68. Private plugin storage on .68 stays covered by the full HA backup; no new
file capability is granted. Seven projects, six plugins, shared management state,
Terminal config, HA configuration and trash are unchanged on both hosts. No new
HA dashboard, resource, entity, WWW file, plugin, App update or HA restart.

The browser batch exceeded its tool timeout after 17 saved Pi cases. A fresh
browser binding continues only the outstanding cases. The first in-REPL deep
comparison also reported a mismatch; independent Node deep comparisons confirm
only createdAt differs, and all 38 final configuration
exports are compared independently. Neither harness issue is a product finding.
Current two test tabs are closed; two older own tabs from the interrupted batch
could not be closed through the detached browser handles and remain open on
their restored Editor state. No user tab is closed.

DE/EN/FR public docs describe passed rejections and the open CRC gap separately.
The external docs build and repository diff checks pass. No runtime change,
package version bump or App-repository update is part of this qualification.
