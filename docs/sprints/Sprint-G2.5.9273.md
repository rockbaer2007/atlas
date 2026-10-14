# Sprint G2.5.9273 - A5 native HACS verification on Pi 5 ARM64

2026-10-14. HA app 0.1.296 / reference Card Editor alpha.102.

After the user installs HACS, Bubble Card and Mushroom on Pi, create fresh
Administration/project exports and Git bundles before testing. Private backups,
fixtures, unchanged generated YAML, screenshots and preservation results are in
`C:/Users/rockb/source/backups/atlas-a5-arm64-hacs-20261014`.

The editor connects to real HA with 31 entities and reports Bubble/Mushroom as
installed. Import an isolated three-field Core Entity/Bubble state/Mushroom
Template fixture using an existing read-only backup-manager entity. Copy the
actual visible ATLAS YAML output unchanged into HA's unsaved manual-card preview
on the real Pi 5 ARM64 installation. All three native HA/HACS components render
without configuration errors. Core and Bubble display the real HA state; Mushroom
retains the exported static secondary entity identifier. A separate native
Mushroom Jinja template evaluates `states(...)` and displays the live HA value.
Save is enabled, but neither test configuration is saved or used to control a
physical device. Inspect the successful screenshot against the accessibility
tree before recording the result.

Use a separate empty administrator-only test dashboard, excluded from the sidebar.
Cancel the card preview, exit dashboard editing and delete only this dashboard
after explicit user confirmation. The original dashboard list remains.
Restore the original ATLAS editor project and take fresh after exports.
The preservation script confirms the entire project and Administration data
match exactly after excluding only their export timestamps. Settings, encrypted
data and plugin descriptors are unchanged; all six plugins remain active.

Update roadmap and DE/EN/FR public documentation with the bounded ARM64 result.
No runtime, schema or packaging changes are necessary; version stays 0.1.296.

Limits: native execution is now verified for these card families on both Pi and
Proxmox, but full HACS bundle deployment, diverse user-owned layouts, native
backend load and forced closed-transport recovery remain separate A5 work.
Chrome executes on the Windows client; this is not ARM64 browser performance
or Safari evidence. The resource summary reports two Lovelace resources but
zero `/hacsfiles` scan entries on this installation; installed-card recognition
and actual execution pass. Resource-summary classification is not treated as
proof of deployment, and broader scan compatibility remains unverified.
