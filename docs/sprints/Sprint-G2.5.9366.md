# Sprint G2.5.9366 - Native 0.1.321 update and original HACS title regression ZIPs

2026-10-18. App 0.1.321; HACS integration remains 0.1.306.

## Backup and boundaries

Only the authorized test systems 192.168.178.177 and 192.168.178.68 are used,
both with HA 2026.10.2. No other host, local preview server or Docker instance
is contacted/started. Complete Git bundles, fresh local Editor exports, persistent
file hashes/mirror and semantic state captures are stored at
`C:/Users/rockb/source/backups/atlas-native-0321-20261018`.

Fresh full HA backups were completed and their native restore contents checked
before updating: 62d3a495 on .177 (138.53 MB) and 66524782 on .68 (139.71 MB),
both created at 13:12 CEST, listed by HA as `Custom backup 2026.10.2` despite
custom names entered in the creation form. Settings/history, SSL, media, share
and all installed Apps including ATLAS 0.1.320 are present. These HA backups
remain on their hosts; no additional PC download of the full HA archives is claimed.

## Native qualification

- Refresh the native HA App catalogs and update both installations from 0.1.320
  to 0.1.321 through the native update dialog. Both running App APIs and native
  HA version displays confirm 0.1.321 after App restart; HA Core is not restarted.
- Import exactly the four original failing ZIPs from Sprint9364: JSON and YAML
  exports for each host, with the empty-name Entity first and no leading control
  card. The original saved archives are not modified or regenerated for the test.
- All four actual Editor imports now reach 112/112 readiness, zero failed or
  pending checks. JSON/YAML output captures after import and reload retain all
  eight original card entries and Conditional conditions exactly. Explicit names
  remain empty, one space, outer spaces and outer tabs. Grid columns remain four;
  existing layout normalization is compared semantically, not raw root text.
- Four actual browser HACS reexports, after reload, are fully downloaded following
  the user's Chrome security handoff. Each complete archive is byte-identical to
  its original failure ZIP. Evidence and hashes are in verification.json.
- Restore both fresh original local Editor exports through the complete config
  import, reload and export again. Parsed configurations match exactly apart from
  their export createdAt timestamps.
- The final captures preserve all 405 persistent plugin/project/trash/history
  files on .177, its additional HA/config/theme file hashes, and the nine approved
  HA/config files on .68. Seven projects and six plugins per host, shared plugin
  state, trash, Terminal configuration and reported HA version are unchanged.
  Private plugin file storage on .68 remains covered by its full HA backup;
  no unapproved capability is enabled to inspect it.

## Completion and limits

No new HA dashboard, resource, synthetic entity or WWW test file is created.
All four own browser tabs are closed. Prior HA rendering evidence remains from
Sprint9364; this increment verifies native deployment, original-ZIP readiness,
literal data preservation and archive roundtrips, not another rendering matrix
or new GitHub/HACS repository installation.

DE/EN/FR Card Editor and development-status documentation is updated together.
The external docs build and both repository diff checks pass. Runtime source and
App package are unchanged from the already published 0.1.321; no new package
version or App-repository synchronization is needed for this qualification.
