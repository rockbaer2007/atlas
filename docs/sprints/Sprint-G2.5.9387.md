# Sprint G2.5.9387 - Combined two-tab draft recovery during a HA outage

2026-10-21. Qualification only, unchanged App 0.1.330 and reference Editor
0.2.0-alpha.111 on .68, HA 2026.10.2. No product code/package/version change.
.177 is never accessed. The cloned Runtime integration URL is not changed or
opened. Existing settings, files, projects, plugins and draft sources are retained.

## Backup and controlled fixture

Evidence: `C:/Users/rockb/source/backups/atlas-combined-drafts-68-20261021`.
Source/docs Git archives, complete original Editor export, raw local draft
inventory, settings/project/plugin/trash inventories and ten file copies precede
fault testing. All 40 pre-existing draft sources are backed up in the raw inventory.

Full encrypted HA backup 7556d862, ATLAS 68 vor Zwei-Tab-Kombination 0.1.330
2026-10-21, completes at 21:09 local, 142.58 MB. Its UI inventory includes HA
settings/history 2026.10.2, share/media/SSL, ATLAS 0.1.330, Get HACS 1.3.1 and
Matter Server 9.2.0. No full archive PC download or restore is claimed.

An owned, unregistered two-file probe folder serves the installed, unchanged
Editor bundle. Only its page realm blocks native session methods; it uses no
browser permission changes, arbitrary localStorage clearing or credential reads.
A separate server project atlas-combined-drafts-0330-68-20261021 contains one
passive sun.sun Entity card, ST68 Combined Sun, 4x3. It stays at revision 1.
The installed bundle and draft-module hashes match before and after testing.

## Combined native run

1. Both tabs open the owned revision-1 project through normal preview/apply.
   A first establishes its own session pointer, then blocks session reads/writes.
   B blocks session writes from startup and has no session pointer. Their current
   local draft IDs differ. Both edit distinct A/B names and show the partial-save
   notice; complete configuration exports work. All 40 old raw sources are equal.
2. HA is restarted once through its normal System controls on .68. No automation
   or script is running when the HA confirmation is shown. A visibly reports
   closed/not connected (including WebSocket code 1006); B shows reconnect attempts.
   During the outage, both keep editing distinct During HA outage names and
   export complete configurations. Both local records contain the intended names.
   The server project is still revision 1 and all seven original projects match.
3. Without manual connection or Editor reload, both return to connected with an
   active subscription. Their session warning remains. The test then reloads A
   with the read/write block and B with the write block still active. Neither
   auto-applies a source: both start with an empty original workspace and empty
   draft selection. Manual preview/backed-up apply of the matching A/B source
   recovers each workspace; both full exports equal their own outage exports,
   excluding generated createdAt only. The session warning remains accurate.
4. Lifting the session block alone does not clear the warning. A subsequent
   successful save confirms intent plus pointer and clears it. Restoring each
   original outage name preserves exact full-export equivalence. After another
   reload without the block, each selector defaults to its own distinct recovered
   ID. Explicit recovery again produces the matching complete outage export.

This run qualifies the combination of per-tab session method failure with a real
HA restart/reconnection on the same Chrome origin/profile. It does not qualify
WLAN loss, an ATLAS HTTP-server outage, a forced browser-process termination,
cross-device storage, disk failure or an atomic native Storage interruption.
Actual quota exhaustion and getter failures remain separately qualified in 9386.

## Restoration and cleanup

Both complete original Editor configurations are restored through the normal
file-import controls and confirmed. Re-exported configurations equal the original
except createdAt. All 40 old raw sources remain byte-identical at every captured
checkpoint. Both probe inventories show zero owned local/session filler entries.
New test recovery sources and PC exports remain available; no draft purge occurs.

The owned project is removed and the original project-store bytes restored.
Final comparison passes for seven projects, six plugins, connection/management/
Terminal settings, twenty pre-existing trash entries and ten file hashes,
including HA config entries and the project store. Only the two-file probe folder
is moved into recoverable trash (21 entries total). App startedAt is unchanged;
only HA Core is intentionally restarted. All three owned browser tabs are closed.

Early helper reuse placed some new exports in the prior run's evidence folder.
They are copied into the current evidence folder before comparison; the prior
original Editor and inventory files are restored byte-for-byte from their exact
original browser downloads. No product data or recovery source is lost.

Under the user's standing disposable-test backup rule, only oldest full backup
c0f15050 (ATLAS 68 vor Entwurfswiederherstellung 0.1.329 2026-10-21, 142.39 MB,
19:53) is removed. The unfiltered HA list confirms exactly three full backups:
7556d862 (142.58 MB), 205c94c3 (142.51 MB), fe0f6a0e (142.45 MB). No extra full
PC archive of the removed backup is claimed. Installed updates and PC backups stay.

The source roadmap and DE/EN/FR Card Editor/development-status documentation
record this combined qualification and its boundary. Product code is unchanged;
only documentation checks/builds are needed for this increment.
