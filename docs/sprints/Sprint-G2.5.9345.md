# Sprint G2.5.9345 - Native App0.1.315 Card-Mod/UIX export qualification

2026-10-17. Qualification only: App0.1.313 -> 0.1.315 on Proxmox and Pi5.
HA2026.10.1 and integration0.1.306 unchanged; only the ATLAS App restarts.
No runtime code change or additional release.

## Backup and scope

- Before updates, Git history bundles, both user roadmaps, original persistent
  ATLAS mirrors/tars and selected HA files saved privately in
  source/backups/atlas-native-0315-styles-20261017.
- Complete current local Editor JSON exported before test imports and restored
  afterward. Both actually contain1field at this checkpoint; no assumption that
  an older36field workspace is still the user's current local state.
- Fresh encrypted local HA backups at12:34CEST: VMfa23990a,4.67GB, HA settings/
  history, media, share, SSL and ATLAS0.1.313; Pi0605b6fe,136.12MB, HA settings/
  history, SSL and all3installed apps. Other VM apps are outside its targeted
  backup. Complete HA archives remain on hosts; PC mirrors are not full HA
  backup archives. No existing backup deleted.
- Initial free space55.9GB VM and96.7GB Pi. Metadata refresh exposes exactly
  target0.1.315. Keep previous App version backup enabled on both updates.
  Pi update started while the larger VM backup completed; each update started
  only after its own fresh backup and local file capture were confirmed.

## Update and actual native browser workflow

- /app monitor observes0.1.313 -> short unavailability -> 0.1.315 on each host.
  Independent post-update checkpoints preserve all232VM/237Pi original ATLAS
  files, plugin/management/terminal state, trash and all3original projects.
- Passive sensor.cpu_speed on VM and sensor.backup_backup_manager_state on Pi;
  four cards share one entity to expose wrong style ownership. Root Card-Mod,
  Mushroom selector-map Card-Mod, Mushroom UIX, unstyled Core card and Core
  uix_style fixture. CSS boundary newlines, indentation, shadow selectors and
  Jinja strings retained exactly. No device service calls.
- Actual UI YAML/Card-Mod export -> completed ZIP import -> export passes
  112/112 on each host and is byte-identical. JSON with UIX export selection
  follows the same actual workflow and passes112/112 with byte-identical output.
  Existing uix/uix_style preserved; unstyled card remains unstyled.
- Parsed package content, configuration regenerated from embedded Editor plan
  and DEFAULT_CARD in actual exported script match all style objects and
  text/icon/color source values. This validates script data, not native script
  installation or CSS engine execution.
- Own separate Card-Mod UIX server project per host saved at revision2; fields
  equal actual YAML bundle fields. Original three project entries, contents and
  revisions remain exact. Test projects retained separately.
- User performs all Chrome security handoffs. The last four re-exports require
  a repeated Keep confirmation; partial .crdownload files are never used.
- Complete original local Editor configurations restored via import and normal
  confirmation. Fresh actual JSON exports match exactly except createdAt.
  Direct Editor reconnects, direct Hub and embedded Runtime Hub show6active
  plugins, DE/dark retained. No tokens extracted or new access configured.

## Archive checksums and preservation

- VM YAML36,568bytes SHA256
  835129372f50c92d457d3e6a943a5fc451dc32ca9396a2d8dc5da0d9a310a67e.
  VM UIX JSON36,825bytes SHA256
  08d4bdcd14c723a326500bcbbc31d18e52b6e96a04f3488a33f8e5ba41d6d288.
- Pi YAML37,046bytes SHA256
  6ac1971dbd3c86b22c23bedf2acb8525812088efa8366c3bd3e36b0c4163ccf0.
  Pi UIX JSON37,303bytes SHA256
  2c8bcea22e7af134892ac543035c4717f36067efe7bf5fe42f6d099739ca7f2d.
- Final232VM/237Pi original file contents exact except projects index extended
  by own entry. Six new project workspace/backup files per host are the only
  additions. Existing configuration, automation/script/scene files, resources,
  dashboard registry, integration manifest, checked export/icon files, history
  and trash remain exact. Original local mappings/groups/export choices retained.
- Before tar SHA256: VM
  f500311ce3958036c7037c5e408d4b3bf4b16a9ea47e2f6bab13d0d0b2d3a4f8;
  Pi f561c325fa57516fc52114b547355d240f1e2878cbdf3b2e21ede7474a6fff1f.
- Preserve private proof JSON, snapshots, helpers, completed ZIPs and backups.
  No HA dashboard, resource, test file or styling extension created. No native
  Core restart, device operation or unrelated plugin/App update performed.

## Documentation and limits

- DE/EN/FR public Card Editor/status pages and ROADMAP updated to distinguish
  completed native qualification from earlier isolated checks. Documentation
  build and Git diff checks pass. No runtime rebuild/version bump needed for
  this qualification-only increment.
- Actual CSS rendering depends on installed Card-Mod/UIX versions and remains
  a separate test. This increment qualifies export data, ownership, conversion,
  re-import and preservation. Previously discarded styles still need originals.
- Close only the four own browser tabs. Both native ATLAS installations remain
  running. No local Docker test or long-running helper remains from this task.
