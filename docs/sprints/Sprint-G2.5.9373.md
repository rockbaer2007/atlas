# Sprint G2.5.9373 - Bounded HACS validation with reliable worker cancellation

2026-10-19. Final App 0.1.327, framework 0.2.0-alpha.89; integration stays 0.1.306.
Network/browser qualification uses only .177/.68, both on HA 2026.10.2.
No other host or local preview server is started.

## Backups and existing data

ATLAS, App repository and documentation Git bundles plus all evidence reside at
`C:/Users/rockb/source/backups/atlas-hacs-bounded-import-20261019`.
Before native changes, encrypted full HA backups include settings/history, SSL,
media, share and all three Apps: .177 760ac463 (138.74 MB, 19 October 13:13 CEST),
.68 38a20113 (139.94 MB, 13:14). Restore listings are checked; no full HA archive
download or actual HA restore is claimed. PC captures additionally preserve both
complete original Editor JSON files, seven server projects and six plugins per
host, 417 approved files on .177 and nine approved config files on .68.
Private .68 plugin files retain full-backup coverage without expanded permissions.

## Implementation

- Fixed exported import policy: 32 MiB ZIP, 2048 entries, 8 MiB compressed or
  expanded bytes per entry, 24 MiB declared total and 1024 UTF-8 path bytes.
  Browser File.size is checked before reading/worker creation; the reader also
  checks actual archive bytes. All metadata budgets precede CRC iteration.
- Structured `archive-limit` / `limit-exceeded` diagnostics discard unverified
  inventory without manufacturing missing-file errors. Existing CRC, identity,
  duplicate/unsafe-path, JSON/YAML and readiness guards remain active.
- A same-origin packaged worker reads the File and runs CRC, JSON and complete
  readiness checks. Build and canonical App inventory include its source/bundle.
  No credentials or Admin settings are passed to it. No synchronous fallback.
- Each selection owns one worker. Cancel terminates it, rejects its task and
  ignores late messages. A 15-second watchdog does the same on timeout, subject
  to browser timer scheduling. Worker/clone/message failures fail closed.
- A successful result stays in preview until explicit Apply. Cancel also
  discards checked results. Generations block stale adoption and pending state
  is cleared before committing, so repeated Apply cannot duplicate the import.
  This final user-confirmed Editor mutation is not a further cancellable check.
- File selection is reset immediately while retaining the captured File, allowing
  same-file retry after cancellation. Cancel occupies a fixed grid cell above
  variable progress text, so it does not move when Apply appears.

## Verification and release sequence

App 0.1.325 introduced the worker and budgets; 0.1.326 fixed same-file retry.
During the native .177 check, clicks at the active-to-ready transition could
miss the moving Cancel control and leave a checked preview. The Editor was not
changed. App 0.1.327 fixes the control layout; its complete bounded qualification
is repeated on both hosts. Pre-327 logs are separately retained under `pre327`
and are not counted as final success evidence. Native installs follow
0.1.324 -> 0.1.325 -> 0.1.326 -> 0.1.327 under the same fresh backup baseline.

All 431 Home Assistant package tests pass. New coverage includes exact and
one-byte-over limits, entry-count boundaries, multibyte paths, forged expanded
sizes and limit rejection before an earlier corrupt CRC. Controller tests cover
cancel/replacement/late results, timeout, worker failures and retry. An actual
busy Node worker is terminated without waiting for its event loop; the actual
Editor handlers reject a valid late result after Cancel and guard double Apply.
The built worker also executes the ten fixture cases in a local VM harness.
The full workspace build, source/bundle syntax, two source-package preservation
tests and canonical comparison of 520 files in both App copies pass.
Served main/worker bundles on both hosts also match the canonical local bytes
by SHA-256 after installation (four asset comparisons).

Final native 0.1.327 evidence covers twenty regular chooser cases, ten per host:
eight checks ready at 112/112, twelve rejections. Ready boundaries include 2048
entries, exactly 8 MiB per entry and exactly 24 MiB total. Exceeding any of those
by one entry/byte, a ZIP over 32 MiB, oversized Deflate declarations and truncated
archives reject without changing the Editor. Every successful check also keeps
the original until Apply. Six further Cancel cases cover observed reading,
observed checking and ready preview on each host; no late adoptable result
reappears. Same-file retry succeeds twice without reload. Two explicit Apply
actions import the valid control, then supported full-configuration restore
returns both Editors to their complete originals. Post-reload JSON exports match
before files except createdAt, including groups and authored Card data.

`verify.mjs` independently checks fixture hashes, final release-labelled results,
full Editor JSON, cancel/retry/adoption states and all captured server state.
Existing files, configuration, plugins, projects, management and trash remain
unchanged apart from the intended runtime update. No HA Core restart, test
dashboard/resource/entity, WWW fixture or additional permission is needed.

## Scope and closure

Native tests use Windows Chrome against the direct App Editors. They are not
an ARM64 browser benchmark, all-browser/Ingress qualification or measured memory
ceiling. Timeout and worker-load failure are fault-tested locally, not induced
on HA hosts. Compression remains unsupported; CRC32 is not authenticity checking.
The limits are fixed rather than user-disableable. Larger exports require smaller
packages; no automatic splitting or universal project-size claim is introduced.

Public DE/EN/FR guides preserve the historical 0.1.324 finding and document the
new limits, worker lifecycle and explicit adoption. The final documentation build
passes with the existing large-chunk advisory only; source and documentation
whitespace checks pass.

After specific user approval, old full backups 7e8be012 (.177) and 7908320e
(.68) were permanently deleted. Unfiltered backup lists confirm exactly three
remaining backups on each host: .177 retains 760ac463, 5a52e7ab and eb88cc4a;
.68 retains 38a20113, 9dfbb12e and a3308ae6. PC backups and installed 0.1.327
remain intact. Final lists and screenshots are saved as backups-177-final.txt/png
and backups-68-final.txt/png in the evidence folder. All four task-owned Editor
and backup browser tabs are closed.
