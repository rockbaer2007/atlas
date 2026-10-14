# Sprint G2.5.9272 - A5 native HA and HACS execution

2026-10-14. HA app 0.1.296 / reference Card Editor alpha.102.

Back up Git history, user-owned roadmaps and fresh Administration/editor
exports in `C:/Users/rockb/source/backups/atlas-a5-ha-hacs-20261014`.
Refresh the Supervisor package list and update existing ATLAS 0.1.294 to
0.1.296 on real Pi 5 ARM64 and Proxmox amd64, with the HA backup option enabled
for both updates. Both app pages and Admin health report 0.1.296 afterwards.

The VM discovers 143 Lovelace resources, 114 recognized palette entries and
101 HACS resources. Import a separate three-field fixture and read the actual
ATLAS-generated YAML from the visible output. Execute this unchanged
horizontal-stack export in HA's unsaved manual-card preview. Core Entity,
Bubble state and Mushroom Template render without configuration errors.
Core/Bubble display the real backup-manager state; Mushroom preserves the
exported static secondary entity identifier. A separate handwritten Mushroom
template also evaluates the real state. These are actual HA/HACS components,
not ATLAS's generic editor previews.

Pi's unchanged single-field ATLAS Core Entity export also renders the real
backup-manager state in native HA without configuration errors. Pi has no
configured HACS integration and no registered Lovelace resources. Native
Bubble/Mushroom execution there cannot be claimed; no integration is installed.

Neither test card is saved and no physical control action is invoked. The
existing VM dashboard remains unchanged. Pi initially has no editable card
dashboard: create an empty administrator-only test dashboard outside the
sidebar, then delete only it after explicit user confirmation and verify the
original list remains.

Restore both original editor projects. Fresh before/after exports match exactly
after removing only `createdAt`. Admin exports match exactly after removing
only `exportedAt`, including settings, encrypted data, plugin descriptors and
secret metadata. All six plugins remain active on both hosts. Screenshots,
fixtures and generated YAML remain private in the backup folder.

Update public DE/EN/FR documentation and roadmap. This verification increment
does not change runtime or schemas; application version remains 0.1.296.

Limits: native HACS execution on Pi requires HACS/card installation. Full HACS
bundle installation, diverse user projects, native backend load and forced
closed-transport recovery remain separate A5 checks. This does not prove
Safari compatibility or ARM64 performance; Chrome runs on the Windows client.
