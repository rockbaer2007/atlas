# Sprint G2.5.9361 - Native App 0.1.319 import qualification

2026-10-18. Qualification only; no runtime/version/package changes.
Only approved test hosts 192.168.178.177 and 192.168.178.68 are contacted.

## Backup and update

- Before updates: complete HA backups 7de7635c (.177, 138.51 MB) and
  60f57d80 (.68, 139.69 MB), including settings, Apps, media/share and history.
  Full archives remain on their hosts; no claim of a PC full-archive copy.
- Git bundles, file mirrors, original Editor exports and test evidence are in
  `C:/Users/rockb/source/backups/atlas-native-0319-20261018`.
- Both Apps update from 0.1.318 to 0.1.319; HA stays at 2026.10.2.
  HACS integration remains 0.1.306. No HA Core restart is required.

## Actual browser evidence

- Both hosts execute JSON/YAML file and paste imports followed by reload:
  48 cases, 96 captured output samples. Conditions include strict numeric zero
  bounds, OR/state lists/screen conditions, distinct condition/card entities,
  nested Conditional cards and an iframe child without an entity.
- 32 cases preserve the original card structure and normal custom Entity name
  exactly. Explicit iframe aspect_ratio 50% avoids conflating a parser default
  with data loss. No iframe navigation or device command is part of this test.
- 16 additional controls reproduce existing name normalization: empty names
  become Imported entity card, outer whitespace is trimmed. Their expected
  normalized result is explicitly separate from the original source. This is
  an open limitation, not a successful literal-name preservation claim.
- Eight real Card package JSON downloads (Entity/Conditional, JSON/YAML content,
  both hosts) preserve source content and pass actual chooser reimport/reload.
  This increment does not claim a new native HACS ZIP or HA rendering test.
- The earlier Sprint9360 empty/whitespace-name statement is corrected: its
  local tests compared after parser normalization and missed this boundary.

## Preservation and closure

- Original local Editor configurations on both hosts are reimported, reloaded,
  exported and compared with the fresh pre-update originals (createdAt excluded).
- .177: all 396 persistent file hashes match, including the project index.
  .68: all nine files in the existing approved /config scope match; private
  plugin files remain covered by the full HA backup, without broader access.
- Seven server projects and six plugins per host, management, terminal settings,
  trash and captured HA configuration remain unchanged. No server project,
  HA dashboard/resource/entity or WWW test file is created.
- Aggregate verification passes 96 samples, 32 source-exact cases, 16 explicit
  normalization controls, eight package roundtrips and two restored Editors.
- DE/EN/FR public documentation records the native result and remaining boundary.
  Documentation build and git diff checks pass. User roadmaps/docs work untouched.

Next: preserve empty/whitespace Entity names before normalization and test against
the original source. Only .177/.68 are authorized for future network tests.
