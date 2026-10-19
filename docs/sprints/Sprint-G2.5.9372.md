# Sprint G2.5.9372 - Large HACS archives and interruption boundaries

2026-10-19. App remains 0.1.324, framework 0.2.0-alpha.88, integration 0.1.306.
This is qualification and documentation work; no runtime update is introduced.

## Backup and preservation

Evidence and Git bundles of ATLAS/public documentation are stored at
`C:/Users/rockb/source/backups/atlas-hacs-large-20261019`.
Fresh encrypted full HA backups complete on HA 2026.10.2, including settings,
history, SSL, media, share and all three Apps: .177 5a52e7ab (138.73 MB),
.68 9dfbb12e (139.93 MB), both 19 October at 12:02 CEST. Their restore listings
are checked; no full PC download or restoration of these HA archives is claimed.
Additional PC copies cover both complete original Editor JSON exports, seven
server projects and six plugins per host. Approved file access captures 417
files on .177 and nine config files on .68. Private .68 plugin bytes remain
covered by the full backup rather than a new permission grant.

## Bounded fixture checks

Twelve SHA-256 recorded fixtures derive from an existing valid, synthetic
one-entity HACS package. Python zipfile independently checks stored-entry CRCs.
The source reader/readiness functions are bundled with esbuild for local checks:

- Valid control and 1,000 / 10,000 / 30,000 additional one-byte asset entries:
  8 / 1,008 / 10,008 / 30,008 total entries, all accepted at 112/112.
- One extra stored asset of 4 / 16 / 64 MiB and a README padded with 16 MiB:
  accepted at 112/112; largest ZIP is 67,137,032 bytes.
- Deflate with 128 MiB actual uncompressed padding and a separate compressed
  entry claiming 0xfffffffe bytes: rejected for unsupported compression, not
  for an enforced size or expansion-ratio limit. No decompression is performed.
- A 16-MiB archive cut in half or missing its final eleven bytes: rejected as
  unreadable without changing the Editor.

All twelve cases run through actual file choosers in the installed Editors on
.177 and .68: 24 regular cases, 16 imports and eight rejections, with recorded
readiness and visible authored Card code. Extra valid control attempts during
browser-harness recovery are not included in that count. Both original Editors
are restored through their supported full-configuration import. Fresh final
exports match the complete original JSON except createdAt; visible Card code,
names, script filenames and entity lists also match after reload. The independent
`verify.mjs` checks every fixture hash, unique host/case result, rejected-state
preservation, complete Editor JSON and before/after server state. All captured
files, projects, plugins, management, trash and configuration remain unchanged.

## Interruptions, observations and remaining gaps

Opening file selection then navigating away before assigning a file preserves
the Editor on each host. The automation API cannot submit an empty file list;
that unsupported API attempt is not counted as a native Cancel-button test.
Selecting the 64-MiB archive and immediately requesting reload preserves the
original Editor in one observed attempt per host. This is a timing-dependent
navigation interruption, not evidence of cancellation after CRC work has begun.
No partial adoption or damaged persisted Editor is observed in these attempts.

Source review finds no explicit archive-byte, entry-count, per-entry or total
uncompressed-byte policy limits. The handler calls file.arrayBuffer() first;
CRC/inventory/JSON/readiness work is synchronous on the browser UI thread, with
no AbortSignal, worker or Cancel action. One local Node pass of the 64-MiB
fixture takes approximately 1.5 seconds. That is a diagnostic on this Windows
PC, not a browser long-task measurement, service latency or ARM64 benchmark.
Native checks use the same Windows Chrome client for both host installations.
No general responsiveness, memory ceiling, zip-bomb protection or reliable
mid-processing cancellation is qualified. Those are the next open product tasks.

The first automation helper mixed dialog timing and retained function bindings,
causing selector/filechooser timeouts during restoration. The user confirmed
one original-configuration dialog. Subsequent tests use separately observed
chooser/result/dialog steps. No older evidence directory is written, and final
independent state comparisons pass. A transient automation error is not reported
as an ATLAS import defect.

## Verification and cleanup

All 196 selected existing HACS, CRC, identity, literal-name, single-card and
Conditional regression tests pass. No server, dashboard, resource, entity or WWW
test object is created. App 0.1.324 and existing user roadmaps remain unchanged.
DE/EN/FR public Card Editor and development-status documentation is updated with
the observed scope and explicit remaining size/cancellation gap.
The DE/EN/FR documentation build passes with only the existing large-chunk
advisory. Whitespace checks pass. After concrete user confirmation, only the
old full backups .177 73e24753 and .68 ab1e48cd (18 October 14:25 / 14:26) are
deleted. Unfiltered final lists show exactly three full backups per host:
.177 retains 5a52e7ab, eb88cc4a and 7e8be012; .68 retains 9dfbb12e, a3308ae6
and 7908320e. Final list text/screenshots are retained in the evidence directory.
PC backups and installed updates remain intact. All four owned test tabs are
closed at closure.
