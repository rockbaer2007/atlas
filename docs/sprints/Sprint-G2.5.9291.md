# Sprint G2.5.9291 - Native Pi shared plugin management adoption

2026-10-15. Configure existing ATLAS 0.1.301 shared plugin management on the
real Pi 5 using the original App browser state as the source.

## Backup and preview

Private evidence directory:
`C:/Users/rockb/source/backups/atlas-pi-shared-plugins-20261015`.

- Atlas and add-on Git bundles before work.
- Original App and direct Runtime Administration exports and separate normalized
  plugin-management backups before adoption. Keep their original browser data.
- Native local encrypted HA backup `ATLAS Pi vor gemeinsamer Plugin-Verwaltung
  2026-10-15`, detail ID `9f9e1304`, created at 11:09, 129.02 MB. Detail view
  confirms HA settings/history, ATLAS 0.1.301, Get HACS and Matter Server included.
  This includes existing server projects and persistent App data.
- Both management clients initially report no shared server state. Preview
  adoption from the original App access: five repositories, five external plugin
  entries, six active IDs including the bundled editor, zero conflicts.
- Keep the default server-on-conflict preference and explicitly apply the
  backed-up adoption. The server snapshots previous/incoming state and writes
  revision 1 through the existing atomic store implementation.

## Native verification

- Load server state in direct Runtime. Both clients show six plugins, all active.
- App and Runtime backup exports have identical normalized current state,
  exactly matching the original App source; both report revision 1.
- Reload both Administrations: the common six-plugin catalog persists.
- Embedded HA Runtime Administration also shows six active plugins and shared
  server status; its export matches the original App source at revision 1.
- Both origins' non-plugin Administration settings and secret-status summaries
  compare equal before/after. Plugin management is the intentional shared change.
- Original local editor configuration matches its prior export after excluding
  export time. The existing named server project still opens in the panel;
  fields, surface size, grid size, project name and script filename match the
  previous fixture exactly. No server project save, deletion or new revision.
- Reload the editor after inspecting it: original empty workspace restored.

Evidence includes `ha-backup-before.png`, `adoption-preview.png`,
`native-panel-shared-plugin-manager.png` and private before/after exports.
Do not commit credentials, private exports or Ingress addresses.

## Final state and limits

App, direct Runtime and embedded HA panel now use the same five repositories,
five external plugin entries and six active plugins. The prior separate Runtime
browser catalog no longer controls the loaded shared view; its backup is retained.
Original App source metadata are unchanged. No external package is installed,
updated or removed, no filesystem capability is widened, and no token is changed.
The offered Icon Library update is deliberately left untouched.

No runtime source/release change or HA restart was needed. Tests here are native
adoption, export equivalence, reload persistence and project/settings preservation;
this does not claim a new backend restart, plugin-function or conflict stress test.

Review the public DE/EN/FR frontend instructions after this fifth Atlas commit
since the previous external documentation update. They already describe this
exact backup/preview/adopt/load flow and its exclusions; no docs change is needed.
The documentation repository's user-owned `work/` folder remains untouched.
