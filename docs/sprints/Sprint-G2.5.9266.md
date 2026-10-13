# Sprint G2.5.9266 - A5 native projects and restoration

2026-10-13. HA 0.1.293 remains unchanged; test fixture and evidence only.

## Backup and native scope

Before imports, create a Git bundle and private Admin/editor exports under
`C:/Users/rockb/source/backups/atlas-a5-native-20261013`. Both HA installations
have successful encrypted manual backups named `Custom backup 2026.10.1`,
stored only on their local system: Pi backup 90e49e39 (105.28 MB, 19:11) and
Proxmox backup 199b7e86 (6.71 GB, 19:13). Do not publish exports, credentials,
Ingress session URLs or private entity catalogs in Git.

Use the real Pi 5 ARM64/8 GB installation on HTTP port 80 and the Proxmox amd64
VM on port 8123 through Chrome and HA Ingress. Each imports a uniquely identified
100-card 1x1 layout and a 24-card 3x2 layout, with zero overlaps. Pi loads 27
real HA entities; the VM initially loads 3711 and 143 Lovelace resources, with
114 mapped palette entries (101 HACS). Test projects use repeated read-only
entity cards, not diverse user-owned production projects. Rendering happens in
the desktop browser; no native backend performance benchmark is established.

Both retain 100 fields through dark/light/system theme changes and full HA
page reload followed by reopening the editor from the Hub. Both retain the
24-field layout through EN/FR/DE changes. Pi live data visibly changes from
idle to create_backup and back to idle during one additional local backup.
The VM CPU Speed value remains 3.49 GHz during observation: a working snapshot
is verified, but a changing native VM live value is not established.

## Exact restoration and restart

Import the original full editor configurations on both hosts. Before/after
JSON comparisons are exact after excluding only createdAt. Admin exports on
both hosts are exact after excluding only exportedAt, including settings,
activePluginIds, importedPluginDescriptors, encryption and secretSummary.
All six plugins remain active. File Studio was configured at 0.1.51 on Pi and
0.1.50 on VM; these baseline descriptor versions remain unchanged.

During the final VM navigation, Chrome temporarily reports a blocked embedded
page; regular reload then reports HA Supervisor state shutdown. The user
confirms a deliberate Proxmox restart and asks to pause. Resume only after the
user reports availability. The VM runtime restarts at 19:50:28, Ingress and
editor reconnect, and 143 resources return (3705 entities in that startup
snapshot). The editor export remains identical to its original backup after
this host restart. No browser security settings or warnings are bypassed.

## Isolated regression check and remaining work

Give each synthetic stress-test field its own ID instead of cloning one ID
100 times. The isolated A5 test passes again: 100 rendered cards, 2001 mock
entities, three remote-close reconnects, 150 live updates, theme changes and
DE/EN/FR project roundtrips. Timings are 255 ms load, 1032-1056 ms reconnect
(including the intended 1 s delay), and 121-146 ms per 50-event burst. These
are PC/mock timings, not native hardware guarantees.

Native forced network-loss auto-reconnect, backend load measurements, diverse
card families and external plugin-owned project/lifecycle checks remain open
in A5. The verified host restart is separate from the isolated forced socket
closures. No runtime/package change or version bump is needed for test-only
evidence. Public DE/EN/FR development status records this distinction.
