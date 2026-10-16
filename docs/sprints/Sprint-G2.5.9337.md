# Sprint G2.5.9337 - Isolated larger Expert project under load

2026-10-16. Qualification only; ATLAS stays0.1.312. Pi 5 and Proxmox are
neither queried nor changed. No plugin or production settings updated.

## Backup and isolation

- Full-history ATLAS/docs Git bundles, copies of both untracked user roadmaps,
  private runtime-before copy and hashed eight-file baseline retained at
  source/backups/atlas-expert-load-20261016.
- Clone a stopped earlier isolated HA2026.10.1 volume through a read-only source
  mount into a new own volume/container. Full clone-before archive SHA256:
  4a2b28076f1cffde9060f13fcd2a9cf9f215c3455810204128c9fc629a29e6ab.
  Original fixture remains unchanged. Only isolated generated credentials reused.
- HA loopback4234; own transport proxy4235. App/Admin/Editor use standard
  4176/4175/4174 on fresh127.0.0.26 to avoid existing browser-origin settings.
  Initial127.0.0.1 pages were observed only and moved before editor mutations.
- Pinned existing Bubble3.4.2/Mushroom5.2.3 assets copied from earlier fixture.
  Test uses two local entities, no real devices, remote services or AI adapter.

## End-to-end results

-36fields:12Core entities,12Bubble switches,12Mushroom Template cards,
  4x2each, positions across12columns/24rows, no overlaps. Two entities are
  intentionally reused; this is not36unique entity coverage or a capacity limit.
- Import actual ZIP via HA-card package chooser; readiness112/112. Save as new
  named server project through preview/confirmation, then save revision2 during
  reconnect. Original complete named project and all other baseline bytes exact.
- Browser export, import its downloaded ZIP, export while offline, reload Editor,
  preview/open saved server project and re-export: all36field records and generated
  card configuration exact. Select identical EN/DE/FR export options for comparison;
  those options are separate from server project data. All three compared UI ZIPs
  are62543bytes with SHA256
  d201699fc21f4b56b2382685756697719275c94cbb28617c82de4c315d70439d.
- Real HA shadow DOM confirms12hui-entity-card/12bubble-card/12mushroom-template-card
  and no hui-error-card. Generated configuration renders as stacks, not identical
  editor pixel geometry. Browser-exported script/locales also deployed together
  and verified at a fresh own resource path; all36cards render without repair notice.
-360fixture lamp changes at nominal500ms intervals complete in190206ms including
  service-call time. First two proxy outages last11535/23775ms and interrupt Editor;
  third61592ms interrupts both Editor and rendered HA view. Existing sockets are
  terminated and new attempts refused while offline. Each Editor reconnects without
  reload; the third also restores HA without reload. Proxy reports two active new
  sockets after recovery. All36editor fields remain throughout.
- Twelve Bubble cards show the live fixture state before/after recovery and the
  actual exported package also changes all12on/off. Reset lamp off at completion.
- After three recovery proofs, a separate HA restart reloads fixture YAML with
  the actual export's new resource URL. Reopening the Editor server project
  retains fields; original project/config/plugin/history/trash fixtures unchanged.

## Checks and limits

-180Home Assistant tests and3shared-project persistence tests pass. Public
  DE/EN/FR docs build and diff checks pass; no runtime build/version bump needed.
- During manual replacement at the SAME static resource URL, cached old script
  plus new locale files correctly produced a package-consistency repair notice.
  A fresh resource path loads the complete actual export without notice. This
  qualification does not claim automatic browser-cache invalidation or HACS update.
- State load continues at HA during proxy outages. This simulates transport loss
  for browser connections, not physical LAN loss, HAOS failure, browser suspension
  or a server crash. No long-duration CPU/RAM or ARM64 performance claim. Only
  contextual process/container memory snapshots, not browser memory profiling.
- DE/FR locale files remain declared English fallbacks; no translation executed.
  No dynamic authored Mushroom Jinja-template qualification is claimed.
- Keep all backups/evidence, stop own test processes/container and close own tabs.
