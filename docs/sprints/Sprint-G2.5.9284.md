# Sprint G2.5.9284 - A7 Home Assistant frontend integration

2026-10-14. ATLAS app, HA package and optional integration version 0.1.299.

Create Git bundles of Atlas, documentation and add-on repositories before
editing; preserve user-owned untracked roadmaps. Private backup/evidence:
`C:/Users/rockb/source/backups/atlas-a7-frontend-20261014`.

Add the HACS-compatible `custom_components/atlas_frontend` integration,
root HACS metadata and existing ATLAS branding. Configuration and options flows
accept an explicit browser-accessible runtime base URL, including port 80 and
reverse-proxy prefixes. Reject credentials, queries, fragments, unsafe schemes
and unsafe paths. Register only the own `atlas-runtime` panel, require an HA
administrator and refuse collisions with existing panels.

The native HA Web Component embeds the existing ATLAS runtime. Hub, Expert
Editor and Administration can be opened without forwarding HA authentication
or entity state. Ordinary HA state updates retain the frame. Localized DE/EN/FR
controls explain mixed-content restrictions and offer an external link.
Keep the existing ATLAS browser origin and installation identity; do not migrate
settings, credentials, projects or plugins. Add-on Ingress remains separate.
Document the browser's possible separate storage context for externally
embedded runtimes; keep the separately opened original address/export path.
No cross-context storage migration is claimed.

Fix the existing Admin/Editor detection of combined app routes on mapped ports
and behind reverse-proxy prefixes. Preserve origin checks and standalone demo
behavior. Correct panel viewport height based on the actual HA layout; include
HA's standard menu event for mobile sidebar access.

Provide all integration files in standalone/Docker/Linux/HA package inventories
without automatically installing them into HA. Add CI checks and DE/EN/FR
installation, update, rollback/data-preservation and embedding guidance in the
external documentation repo. Synchronize canonical HA and add-on packages.

Verification:

- 6 frontend regressions cover safe targets, proxy/port preservation, mixed
  content and retaining the frame during 100 ordinary HA state updates.
- 7 Python contract checks run with actual HA Core 2026.10.1 dependencies.
- Isolated HA Core 2026.10.1: config flow, invalid URL handling, options flow,
  admin-only panel metadata, static module and entry reload pass. Other panels
  remain unchanged. A HA restart preserves config-entry file bytes exactly.
- Real HA browser frontend loads the embedded runtime; Administration/Editor
  navigation uses the mapped port. An own demo field survives HA state updates
  and explicit frame reload. Desktop and mobile layout checks pass. The menu
  event contract passes; a temporary isolated probe confirms dispatch and
  propagation in the normal viewport. Under the simulated mobile viewport,
  browser automation does not dispatch the click or keyboard action. A real
  mobile touch/opening check stays open; do not claim it passed. The temporary
  probe and its logs are excluded from the product sources.
- 163 HA tests, 11 app/lifecycle tests, workspace build, Linux runtime preparation
  and 17 installer regressions pass. Docker build and health checks pass.
- DE/EN/FR documentation build, local links and whitespace/canonical checks pass.

This is a native HA config-entry/panel integration around the existing backend,
not a replacement backend inside HA Core. The real user Pi/HA VM/LXC data and
external plugin code are unchanged. Native Pi/Proxmox installation through
HACS, further HA versions, native ARM64 and catalog/release qualification stay
open. Keep those as A7 follow-up checks in the roadmap.
