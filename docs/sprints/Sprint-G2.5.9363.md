# Sprint G2.5.9363 - Native App 0.1.320 literal-name qualification

2026-10-18. Qualification and documentation only; no runtime/version changes.
Only approved test hosts 192.168.178.177 and 192.168.178.68 are contacted.

## Backup before updates

- Fresh complete encrypted HA backups: .177 ID 0196f88a, 138.52 MB; .68 ID
  4182f9aa, 139.70 MB. Both created at 12:24 CEST, shown by HA as
  Custom backup 2026.10.2. The supplied custom names were not applied by HA.
- Backup details visibly include HA settings/history 2026.10.2, SSL, media,
  share and all installed Apps, including ATLAS 0.1.319. Archives remain on
  their hosts; this report does not claim a PC copy of the full HA archives.
- Git bundles, original local Editor exports, file snapshots, fixtures, actual
  downloads and captured results are saved at
  `C:/Users/rockb/source/backups/atlas-native-0320-20261018`.

## Native update and exact-name evidence

- Both existing Apps update from 0.1.319 to 0.1.320 through HA's native update
  dialog after repository refresh. HA remains 2026.10.2; no HA Core restart.
  Existing connection settings reconnect automatically after App startup.
- Four original Entity names: empty string, one space, outer spaces around
  Literal name, and outer tabs around Küche. Both standalone Entity cards and
  doubly nested Conditionals are imported from actual files and the paste UI,
  in JSON and YAML, on each host: 64 cases, 128 import/reload output captures.
- Every generated object matches its original unparsed source exactly. Numeric
  zero bounds, OR/state lists, screen conditions and distinct condition/card
  entities stay intact. Expected names are not normalized by the test oracle.
- Sixteen actual Card package JSON downloads (eight per host; JSON/YAML content)
  retain the source through chooser reimport and reload. All package content
  and restored output objects match. No new native HACS ZIP or HA rendering
  qualification is claimed for these literal-name fixtures.

## Preservation and closure

- Original local Editor configurations are reimported through the product's
  confirmation dialog, reloaded and exported; only createdAt is excluded from
  their exact comparison with the fresh pre-update originals.
- .177: all 396 persistent file hashes, including project index, match; captured
  HA configuration and supplemental settings also match. .68: all nine files
  in the existing approved /config scope match; private plugin files remain
  covered by the full HA backup. No access permissions are expanded.
- Seven original server projects and six plugins per host, management/terminal
  settings and trash entries remain identical. No server project is written;
  no HA entity, resource, dashboard or WWW test file is created.
- Aggregate verification: 64 source-exact cases, 128 samples, 16 package
  roundtrips, two original Editors restored, persistent data unchanged.
- Own browser tabs are closed. Backups and local evidence remain available.
- DE/EN/FR public docs and roadmap updated; docs build and git diff checks pass.
  User roadmaps and untracked docs work remain untouched.

Remaining scope: a native HACS ZIP roundtrip and HA rendering of these literal
names, after fresh backups and only on .177/.68.
