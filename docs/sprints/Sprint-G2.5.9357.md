# Sprint G2.5.9357 - Extended Conditional qualification

2026-10-18. Completed; network tests only on approved .177 and .68.
HA 2026.10.2, ATLAS 0.1.317. No runtime source or package change.

Evidence: `C:/Users/rockb/source/backups/atlas-conditional-extended-20261018`.
Main/docs Git bundles and fresh full encrypted HA backups precede test writes.
.177 backup 2d97febf (138.45 MB); .68 initial backup 0d7c8e85 (25.83 MB).
After user-approved ATLAS installation and LAN port4176 exposure on the clone,
additional backup8a89a460 (139.62 MB) includes ATLAS and all existing Apps.
The user configures the clone token; authenticated HA version detection passes.
Only the additional File Studio WWW capability was approved; no broader access
was enabled. Ports4174/4175 remain unavailable from the LAN.

## Passed

- Six original server projects and six plugins captured per host. .177 has a
  377-file persistent mirror/tar; .68 private plugin storage is covered by its
  full HA backup, with semantic project/plugin/trash snapshots and nine allowed
  config-file snapshots. Do not claim a private-file mirror on the clone.
- Both raw JSON/YAML imports, guarded server saves and reopenings preserve the
  copied Card code exactly. Each host has one separate new own server project.
- Actual HACS UI roundtrips on .177: both formats112/112, source-exact and
  byte-identical. Both .68 formats also112/112, source-exact and byte-identical
  after actual UI reimport/re-export. User completes Chrome security release.
- 14 variants: implicit AND, nested AND/OR/NOT, state/state_not lists,
  entity_id, strict numeric zero/entity bounds, screen and user conditions,
  and nested Conditional cards with Core Entity leaves. Six synthetic state
  cases at898 and2560 CSS pixels match native references and both exported
  scripts:1,008 visibility decisions, no visible HA error cards in passing runs.
- Native positive user condition uses the actual signed-in user; negative uses
  an excluded test ID. No real device service calls. No other hosts contacted.
- Both original local Editor configurations restored by UI import/confirmation;
  actual subsequent exports match completely excluding createdAt.

## Harness corrections and limits

The browser viewport override did not resize existing Chrome tabs. The user
resized a separate Chrome window; new test tabs expose898 CSS pixels while the
original test tabs expose2560. This is a two-width rendering comparison, not a
claim of stable Card identities across an in-place resize.

Own clone ZIP extraction initially included the dist folder in the served path.
Scripts/locales were copied to their registered paths without overwriting existing
data. A query parameter on the own resource URLs clears cached failed module
loads. Failed setup observations remain separate from final passing samples.

Actual Markdown-leaf import failed despite a positive preview. The supported
fixture uses Core Entity leaves; the preview/import mismatch is an open finding.
This matrix does not qualify every possible HA card or condition type.

## Final preservation and cleanup

- Explicit user confirmation covers only the two owned dashboards, six resources
  and eight synthetic states. These are removed; HA's native state filter reports
  no matching test entities on either host. Own WWW directories are recoverable
  in File Studio trash. All backups and separate new server projects are retained.
- Final .177 capture preserves all 377 original persistent files except the
  deliberately additive project index; 396 files now include new own test backups.
  Original six projects, plugins/management, Terminal config, HA configs,
  resources/dashboard settings, supplemental files and previous trash entries
  compare exactly. Seven projects and six plugins remain.
- Final .68 scoped comparison preserves all six original projects, plugins,
  management, Terminal config, nine config files and original trash entries.
  Seven projects and six plugins remain; private-file backup scope stays as above.
- `verify.mjs` passes all 1,008 decisions, eight archive proofs and original local
  Editor comparisons. DE/EN/FR docs include actual coverage and the Markdown
  preview/import finding. No version bump is needed for qualification-only docs.
