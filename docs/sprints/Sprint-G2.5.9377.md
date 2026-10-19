# Sprint G2.5.9377 - UIX tablet soak completed

2026-10-19. App 0.1.327 / HA 2026.10.2 unchanged. Network targets only .177/.68.
The user confirms a completed 60-minute tablet run on each host, including theme
changes and automatic reconnection. Samsung Galaxy Tab A6, Android 11 / LineageOS,
Chrome Mobile 155 are user-reported device details. This is functional user
qualification, not independently collected tablet telemetry or a leak/FPS claim.

## Backup and preservation

Evidence: `C:/Users/rockb/source/backups/atlas-tablet-uix-soak-20261019`.
Git bundles and fresh read-only data/file captures precede changes.
Fresh encrypted full HA backups: .177 d06aab40 (139.59 MB), .68 e1a698d2
(140.72 MB), displayed as Custom backup 2026.10.2. Both restore inventories
include HA settings/history, SSL, share/media and all three Apps, ATLAS 0.1.327,
Get HACS 1.3.1, Matter 9.2.0. No full archive PC download/restore claimed.
All seven projects, six plugins and existing trash entries per host are captured.
Approved original file counts are 551 (.177) and nine (.68); .68 protected plugin
directories remain covered by its full backup without permission expansion.

## Isolated owned fixture on the authorized test hosts

UIX 8.4.0 installed via HACS and configured after orderly HA Core restarts.
No Card-Mod module exists in the baseline configuration/resources; the owned
loader contains no Card-Mod import. UIX processes both existing card_mod styles
and native uix styles. Original Bubble/Mushroom resources remain unchanged.

Own sidebar-visible dashboards, without Admin-only:
`/atlas-tablet-uix-soak-20261019/720` on both hosts. Own module:
`/local/atlas-tablet-uix-soak-20261019/loader-r2.js`. Files stay in that owned WWW
directory. Only marker-guarded sensor.atlas_tablet_uix_soak_20261019_value is
written; all real-device actions remain disabled. No original Editor is opened
or modified. Genuine generated 720-leaf HACS fixture passes package readiness.

User starts each 60-minute run explicitly on the tablet. Controller toggles the
state about every ten seconds, themes at minutes 10/20/30/40/50 and reconnects
at 15/30/45. Finish/Stop restores the original theme. UIX remains active until
the user reports results and the owned test setup can be cleaned safely.
Request round-trip times and timer gaps are recorded locally, not FPS or
rendering latency. No telemetry or credential reading. The local result marker
belongs only to the test; no automatic restart/resume after page reload.

## Verification boundaries and handoff

PC preflight counts 180 Entity, 180 Button, 180 Bubble and 180 Mushroom Cards
per host, no error Cards. UIX yields 3px/19px card_mod borders/radii and native
uix Button 5px/23px. Timer/state changes and light/dark controls are checked.
Reconnection closes the old socket and reconnects automatically. HA reconstructs
the view after reconnect; revision 2 preserves the module-scoped run over this
normal reconstruction. An old cached helper is excluded from final qualification.
The scheduler's 10/20/30/40/50 and 15/30/45 minute thresholds and 60-minute stop
are simulated locally; simulation is not a real hour on the tablet.

Revision 2 preflight is confirmed on both hosts: timer stays active across the
manual socket interruption, one ready event, old socket closed, further state
updates and no error. Both short PC runs are stopped at 85 seconds before handoff.
Prepared preservation comparisons pass for every captured original file/project/
plugin and old trash entry, allowing only the named registrations. Syntax and
local scheduler checks pass; DE/EN/FR VitePress build and diff whitespace checks
pass. No application logic is changed, so there is no new App release.

Retention is already normalized to three full backups after preparation:
.177 d06aab40/d352abe0/fcd40035; .68 e1a698d2/5a0986d5/538b69e2.
Only oldest own test backups 86fcaf3c and 2003c901 are removed under the user's
explicit test-backup cleanup authorization; no additional full PC copy of those
two old archives is claimed. Unfiltered lists show exactly three per host.

## Tablet report and completed cleanup

The user reports the .177 hour complete with working theme changes/reconnection,
then the same successful outcome after the .68 hour. No per-minute JSON logs,
precise reconnect counts, timer gaps or independently measured rendering timings
are supplied. Detailed rotation/scrolling results are not inferred from this
general success report. The desktop and simulated checks above remain separate.

Owned dashboards and script resources are removed. Marker-guarded synthetic
states are removed via the public HA API. The entire owned WWW directory moves
to recoverable File Studio trash on each host. Temporary UIX config entries and
their automatically managed resources are removed; HACS removes the newly
installed UIX package. /config/custom_components/uix no longer exists on either
host. Own script and UIX script URLs return 404. No File Studio permissions are
expanded, no original integration is removed and no installed update is reverted.

Final capture.mjs comparisons pass: all seven projects, six plugins, 551 original
approved files on .177 and nine on .68, old trash entries, original integration
and Lovelace registries and frontend theme files match the pre-test baseline.
Only owned history/trash files and the one recoverable owned WWW trash entry
are added. Original Editors were never opened or modified during the workflow.
PC evidence remains retained. Final unfiltered HA lists retain the same three
full backups per host listed above; no further backup deletion is needed.

Public DE/EN/FR documentation records the user-confirmed outcome, completed
cleanup and measurement boundaries. Temporary live test links are retired.
