# Sprint G2.5.9265 - A5 live ordering and large synthetic projects

2026-10-13. HA 0.1.293 / HA package alpha.81 / reference editor alpha.100.

## Backup and fixes

Create a HEAD Git bundle and copy the two user-owned untracked roadmaps to
`C:/Users/rockb/source/backups/atlas-a5-20261013` before editing. No real HA
settings, projects, credentials, hardware or installed plugins are changed.

Two new regression tests fail before the fixes: a failed replacement socket
leaves getLifecycle reading the disconnected old client, and an async entity
snapshot can finish after a newer live event and overwrite its displayed value.
Clear the old client on replacement, use the authoritative runtime lifecycle,
and serialize WebSocket messages in arrival order. Ignore queued messages
after close and stop a partially published snapshot without issuing callbacks
after closure. A third test covers queued authentication after remote close.
Clear the UI reconnect timer handle on connected as defensive cleanup; its
timeout callback already cleared it, so repeated reconnect failure was not
independently established as a separate pre-fix bug.

## A5 verification scope

The new isolated local Edge check renders 100 1x1 entity cards, loads 2001 mock
HA entities, changes themes, repeats three remote close/reconnect cycles,
receives 50-event bursts per cycle and preserves fields through DE/EN/FR JSON
export/import. Fake session token only; external requests blocked; no services
called. An early test waited on the collapsed diagnostic list rather than the
visible entity overview; correcting that locator makes live-value assertions
meaningful. Both library bugs were independently reproduced by unit tests.

The initial successful run measures 258 ms for 100-card reload, 1027-1043 ms
reconnect (including the intended 1 s retry delay), and 112-141 ms for 50-event
bursts. These are PC/mock timings, not Pi benchmarks, performance guarantees,
or proof that arbitrary real projects/plugins are production-ready.

Final browser verification adds exact 100-tile DOM counts and dark/light/system
theme preservation. It passes with 370 ms load, 1035-1046 ms reconnect, and
124-146 ms bursts. Retain its report/screenshot with the pre-change backup.

Validation: build/type checks, 162 HA tests, two packaging tests, 469-file
package parity and local A5 browser checks pass. The HA Docker image and public
DE/EN/FR docs build successfully. The earlier Docker container-start blockage prevents
claiming a new full Docker workflow; do not restart the user's Docker/HA to
work around it. A5 remains open for real populated-project and native-load
tests plus broader renderer/theme and external-plugin lifecycle compatibility.

The complete workspace test command also passes, including Renderer, Theme,
Runtime plugin lifecycle and all other package suites. This broadens library
regression coverage without claiming native external-plugin end-to-end behavior.
