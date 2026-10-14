# Sprint G2.5.9269 - A5 app-server plugin lifecycle

2026-10-14. HA app 0.1.295; framework/package versions unchanged.

Before changes, save ATLAS and add-on Git bundles outside Git in
`C:/Users/rockb/source/backups/atlas-a5-lifecycle-20261014`. Preserve both
user-owned untracked roadmaps. Do not start the macOS VM or change live HA
installations, settings, projects or plugin collections.

The isolated backend regression reproduces a lifecycle inconsistency:
Administration reports a plugin disabled/available, but its direct `/launch/`
route redirects to the active plugin. The route omitted the shared catalog
cookie when resolving its launchable catalog. Forward that cookie and reuse
the existing catalog logic; no data migration or credential change is needed.
This is a browser-held UI preference, not an authorization boundary. Raw
plugin assets remain accessible under the existing contract.

`pnpm test:app` includes the new integration test, existing origin checks and
source-packaging regressions. The new test starts the real combined app
server on temporary loopback ports and uses disposable plugin data. Admin
and editor readiness stubs prevent starting or reusing production surfaces.
Only a generated fixture plugin is installed/updated/uninstalled/restored.

Verify initial launch; disabled and available statuses; rejection of conflicting
package files without replacing the working installation; successful update;
server restart; package restoration after uninstall; unchanged unrelated
catalog descriptors and fixture project/settings bytes. These fixture checks
do not prove browser storage restoration, native backend load, renderer/theme
compatibility or native transport closure. A5 remains open for those items.

Validation: all 11 app-server/origin/packaging checks, 55 runtime tests and
162 Home Assistant tests pass. The workspace build, syntax/diff checks and
470-file canonical HA package comparison pass. The local fixture Hub endpoint
responds and direct launch preserves language/theme parameters and slug aliases.
Docker is unavailable: the Docker Desktop Linux engine is not running. No VM
or Docker service is started, preserving resources for Agent DVR.

Public DE/EN/FR documentation describes the corrected browser-held launch
status and distinguishes it from access control and native test evidence.
