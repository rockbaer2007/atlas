# Sprint G2.5.9374 - Repeated large HACS imports on the two test hosts

Date: 2026-10-19. App 0.1.327, framework 0.2.0-alpha.89, HA 2026.10.2.
Qualification and documentation only; no code, package, deployment or permission
change. Network/browser work is restricted to .177 and .68.

## Safety and evidence

Evidence: `C:/Users/rockb/source/backups/atlas-hacs-soak-20261019`.
Git bundles preserve ATLAS and the public documentation before edits. Fresh
encrypted full HA backups completed at 14:21 CEST before native qualification:

- .177: 86fcaf3c, 138.81 MB, ATLAS 177 vor HACS Import Dauerlast 2026-10-19.
- .68: 2003c901, 140.01 MB, corresponding ATLAS 68 name.

Their restore lists include HA settings/history, SSL, media, share and all three
Apps, including ATLAS 0.1.327. No full-archive PC download or backup restoration is
claimed. Complete original Editor JSON exports and separate read-only server
captures precede imports. They cover seven projects and six plugins per host,
417 approved files on .177 and nine approved configuration files on .68.
Private .68 plugin files remain covered by its full backup; access is not widened.

## Fixtures and protocol

The current built ATLAS generators create two genuine Expert projects, each with
36 fields arranged in twelve rows of three. Every field contains a vertical
stack with ten or twenty child Cards: 360 children in JSON or 720 in YAML.
Conditional state lists, empty and spaced names, Mushroom Jinja text/icon/color,
Bubble string CSS, Card-Mod and UIX content are deliberately retained. Only the
passive sun.sun entity is used. No service action, HA test state, dashboard,
resource, WWW file or shared server project is created.

The JSON fixture is 683,736 bytes and the YAML fixture 1,209,016 bytes. A third
valid fixture adds stored ancillary files to the actual 720-Card project, reaching
exactly 24 MiB total content (25,167,130 archive bytes), with no file over 8 MiB.
This is CRC/inventory workload, not 24 MiB of authored Cards. All three fixtures
pass the real package reader/readiness locally before browser use.

The native sequence contains 181 completed file selections per host: 60 series
adoptions, two further actual browser-export reimports, 59 active cancellations
and 60 ready-preview cancellations. After the two initial adoptions, cycles
3 through 60 alternate JSON/YAML and each perform:

1. Choose the large padded package, observe reading or checking, then Cancel.
2. Validate the real project to 112/112, then cancel its ready preview.
3. Select that identical file again, validate and explicitly Apply.

There are 30 observed reading cancellations and 29 checking cancellations per
host. Each cancellation asserts complete visible authored code, name, script,
entities and field count against the preceding loaded project. The next result
is checked before adoption, preventing an old late result from silently passing.
Every adoption matches the corresponding verified 36-field baseline.

## Results

- 120 series adoptions and four actual HACS reimports pass; 116 same-file retries.
- 238 cancellations preserve the current project and leave no adoptable result.
- Four real browser HACS export/import/re-export runs pass 112/112 and are
  byte-identical: JSON and YAML on both hosts. Authored child configurations
  match the generator source; normal App export additionally adds grid columns
  to its 36 field stacks. Arbitrary ancillary files are not claimed to round-trip.
- Both full 24-MiB packages independently reach 112/112 at the end, then are
  deliberately cancelled without changing the current project.
- Reload checkpoints after series adoptions 12, 24 and 60 preserve all loaded
  fields, authored code, format and names on each host. The observed window from
  first selection to the last checkpoint is 1,483.008 seconds on .177 and
  1,482.717 seconds on .68, approximately 24 minutes 43 seconds, including
  evidence/automation overhead rather than a claim of uninterrupted CPU load.
- Supported full-configuration import restores both original local Editors,
  followed by reload and a fresh complete JSON export. Before/after exports
  match except createdAt, including all original groups and preferences.
- All captured files, plugin metadata, configuration, seven server projects,
  terminal settings and trash match before/after. App remains 0.1.327.

`roundtrips.py` verifies original authored Cards and exact returned archives.
`verify.mjs` independently validates all labelled cancellation/adoption results,
reload checkpoints, original Editor JSON and captured server state.
`verification.json`, individual native JSON records, fixture hashes and the
ready-24MiB screenshots retain the detailed evidence outside Git.

## Measurement and operational limits

The 10-second monitor records all Windows Chrome processes, including unrelated
tabs. It is not per-tab ATLAS memory, server memory, an ARM64 browser benchmark
or proof of absence of leaks. Browser-wide private/working-set values and process
counts are retained as raw context without attributing their growth to ATLAS.
After correcting the monitor's initial response-field assumption, 140 samples
validate both /health responses as ok with Administration/Editor ready; all 159
request batches complete without an HTTP error. The first 19 samples lack the
health-schema assertion and are excluded from that stronger claim. Maximum
observed health-request duration is 65.353 ms, not a rendering or Cancel latency.

Two native filechooser events time out in browser automation: after a reload
during cycle 25 on .68 and before original restoration on .177. Fresh UI
observation and retry succeed without an unintended import. No content assertion
fails. HA frontend module-load errors occur later in the old backup tabs;
the recorded scope and cleanup outcome below distinguish this from ATLAS imports.

No claim is made for actual HA rendering of all 720 Cards, isolated memory
stability, other browsers/Ingress, larger projects beyond the fixed limits,
longer unattended operation or source-authenticity verification.

## Closure

DE/EN/FR Card Editor and development-status documentation builds successfully
with the existing large-chunk advisory only. Source and documentation whitespace
checks pass. No runtime source changes require another release or repeat of the
previous 431-test code qualification; this increment validates deployed 0.1.327.

Old HA tabs report dynamic module-load failures and fresh tabs initially leave
the backup list loading. The user confirms both lists open normally; regular
HA navigation and refreshed list observations subsequently permit cleanup.
No HA restart, cache purge, configuration change or diagnosis of the underlying
HA/frontend cause is claimed. Import qualification had already completed and
both original Editors were restored before this maintenance issue.

After concrete user approval at action time, old full backups eb88cc4a (.177)
and a3308ae6 (.68), dated 18 October at 15:10/15:11 CEST, are permanently removed.
Final unfiltered lists show exactly three backups each: .177 retains 86fcaf3c,
760ac463 and 5a52e7ab; .68 retains 2003c901, 38a20113 and 9dfbb12e. PC copies
and installed App 0.1.327 remain intact. Final list text and screenshots are in
backups-177-final.txt/png and backups-68-final.txt/png in the evidence folder.
The monitor is stopped. A final browser inventory confirms no remaining tabs
among the six task-owned Editor/backup tab IDs. Existing user tabs are preserved.
