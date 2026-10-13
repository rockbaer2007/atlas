# Sprint G2.5.9268 - A5 native integration and preservation evidence

2026-10-13. Evidence follow-up for HA app 0.1.294; no runtime change.

The user additionally confirms functional use in a macOS Ventura VM, but
reports very sluggish operation. This is user-reported functional evidence,
not performance acceptance or an independently measured browser matrix.
The cause of the slowdown is not established.

Fresh Admin exports and Git bundles are saved outside Git in
`C:/Users/rockb/source/backups/atlas-a5-plugins-20261013`. The encrypted local
Pi and Proxmox HA backups from Sprint 9266 remain available. Update only the
ATLAS app, retaining settings, projects and the six active plugin IDs.

Both native installations report ATLAS 0.1.294 healthy. Before/after Admin
exports have identical settings, encryption metadata and secret summaries.
All imported descriptors are unchanged except the intentionally updated
external Icon Studio version and installation timestamp. External plugin
implementation changes belong to their own repositories, not this sprint.
Original editor exports compare exactly after removing only the export
timestamp; both original layouts contain zero fields. User-owned roadmaps
remain untouched.

With the original Pi project backed up, load 100 prepared test fields. The
user disconnects the Pi LAN cable for about twelve seconds and reconnects it.
The sampled editor remains connected with all 100 fields. Afterwards the Pi
backup state changes idle -> create_backup -> idle in the same editor without
reload. This verifies resumed live data after the physical interruption, not
a newly established WebSocket: no closed state or new authentication is
observed. The explicit eight-second endpoint failure and socket-recovery
regression remain isolated evidence from Sprint 9267. Restore and compare
the original Pi project after the test.

Native integration checks cover the existing local Terminal session on both
hosts with a harmless printf marker, then disconnect; File Studio edit/save,
history and recoverable delete/restore of private test data; safe analysis of
system automations after timestamped backups; test-only automation export
and opening in File Studio; MDI search/copy; and icon collection/drawing
controls. The user confirms File Studio download on the Pi; an isolated
download check also passes. Browser download-event capture alone is not
reliable evidence. Move only our own test file/export folder to recoverable
trash. Do not purge trash or change system automations or credentials.

Build Docker image `atlas:a5-0.1.294`. An isolated container with temporary
data reports /health ok and Administration/Card Editor ready; remove only
that test container. The source checks, 162 HA tests, workspace build and
isolated A5 regression already pass in Sprint 9267. Public DE/EN/FR status
documentation now distinguishes the real cable interruption from forced
socket recovery and records the preservation comparisons.

A5 remains open for diverse user projects/card families, native backend load,
broader renderer/theme/plugin lifecycle compatibility and forced native
transport closure. Custom iconset discovery and SSH were not established by
these checks. Findings in external plugin-owned counters are separate
follow-ups, not completed ATLAS implementation work.
