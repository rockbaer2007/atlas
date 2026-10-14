# ATLAS Roadmap

Updated: 2026-10-14. Framework **0.2.0-alpha.88**, HA app **0.1.297**.

This is the current open ATLAS backlog. Completed work belongs in
[the sprint ledger](docs/sprints/) and Git history, not in this list.
The four stabilization items are closed; evidence and test boundaries are in
[the stabilization record](docs/deployment/ATLAS_STABILIZATION_2026_10.md).

## Agreed priorities / Vereinbarte nächste Schritte

Agreed on 2026-10-13. Preserve existing settings, encrypted credentials,
projects and installed plugins throughout future work.

| ID | Open work | Abschlusskriterium |
| --- | --- | --- |
| A5 | Bring Renderer, Theme and plugin APIs closer to production readiness. | Größere reale Projekte, Live-HA-Updates, Fehler-/Wiederverbindungswege, Leistung und Plugin-Kompatibilität prüfen; API-/Lebenszyklusfragen konkretisieren. |
| A6 | Complete French documentation and keep DE/EN/FR consistent. | FR-Platzhalter übersetzen und fachlich prüfen; Navigation, Struktur und Verhalten der angebotenen Sprachen abgleichen. |
| A7 | Add later deployment paths: Linux/systemd installer and native ATLAS HA/HACS frontend integration. | Dieselbe geprüfte Laufzeit verwenden; Installation, Updates, Identität und Wiederherstellung dokumentieren und prüfen. |

**A5 is next.** Preserve the Expert-only product decision and existing project
compatibility. Completed priorities and their test boundaries are recorded in
the sprint ledger, including user acceptance of A2 and retirement of Simple
mode (A3) in [Sprint G2.5.9263](docs/sprints/Sprint-G2.5.9263.md).

A5 is in progress. The first increment verifies a synthetic 100-card project,
2001 mock entities, repeated reconnects and live-event ordering; fixes and
test boundaries are in [Sprint G2.5.9265](docs/sprints/Sprint-G2.5.9265.md).
The native follow-up loads 100 compact and 24 larger test cards on both real
HA installations, observes Pi backup-state live changes and restores the exact
original editor/Admin exports. Proxmox also reconnects after a user-initiated
host restart. Scope and limits: [Sprint G2.5.9266](docs/sprints/Sprint-G2.5.9266.md).
Remaining: diverse user-owned projects/card families, native backend load
measurements, native recovery after a closed transport and broader plugin/renderer/theme
lifecycle compatibility. Desktop-browser rendering is not a Pi performance
benchmark; the VM CPU value did not change during observation.

0.1.294 fixes recovery after outages that exceed the previous three attempts;
retries continue with a delay capped at 30 seconds, while rejected credentials
stop automatic retries. The isolated regression is recorded in
[Sprint G2.5.9267](docs/sprints/Sprint-G2.5.9267.md). A real twelve-second Pi LAN
interruption preserves 100 test fields and resumes live data without reload;
the existing socket remains connected in the observed samples. Native plugin
integration, Docker health and unchanged Admin/original-project exports are
recorded in [Sprint G2.5.9268](docs/sprints/Sprint-G2.5.9268.md). This does not
prove a new native socket connection after a forced transport closure.

0.1.295 makes direct plugin launch links use the same browser-held Administration
status as the Hub. Isolated app-server tests verify install, rejected update,
replacement, restart, uninstall and package restore while retaining unrelated
plugin descriptors and fixture data. Evidence and limits are in
[Sprint G2.5.9269](docs/sprints/Sprint-G2.5.9269.md). This is not native HA
deployment evidence or an authorization boundary for plugin assets.

The deferred Docker checks now pass for standalone and HA-package Linux amd64
images, including real container restart and the plugin lifecycle with isolated
data. Limits and preservation evidence are in
[Sprint G2.5.9270](docs/sprints/Sprint-G2.5.9270.md). Native HA deployment and
renderer/theme checks remain open.

0.1.296 corrects dark renderer status colors and unreadable Expert field rows.
Synthetic mixed-family previews pass DE/EN/FR theme/state, reload and viewport
checks without changing field data. Evidence and remaining native/HACS limits:
[Sprint G2.5.9271](docs/sprints/Sprint-G2.5.9271.md).

Both real HA installations now run 0.1.296 after backup-enabled updates. Actual
ATLAS YAML exports render in native HA: Core on Pi 5 and Core/Bubble/Mushroom
on Proxmox, with exact original project/Admin export preservation. Evidence:
[Sprint G2.5.9272](docs/sprints/Sprint-G2.5.9272.md).
After the user installs HACS/Bubble/Mushroom on Pi, the unchanged mixed-family
ATLAS export also passes native ARM64 execution; a separate Mushroom Jinja
template evaluates real HA state. Settings/projects/plugins remain identical
apart from export timestamps. Full bundle deployment, broader resource-scan
compatibility and the remaining A5 load/recovery work are still open. Evidence:
[Sprint G2.5.9273](docs/sprints/Sprint-G2.5.9273.md).

0.1.297 fixes generated Expert scripts that previously ignored the embedded
layout and rendered only an entity list. HA card helpers now mount the actual
configuration and retain child cards during live updates. Manual installation
of the generated module and native custom-card execution now pass on Pi and
Proxmox. Original settings/projects/plugins and tracked resource URLs remain
preserved after removal of own test artifacts. HACS repository publication and
release distribution remain separate from this local bundle test; evidence:
[Sprint G2.5.9274](docs/sprints/Sprint-G2.5.9274.md).

## Remaining product directions

These are longer-term directions, not claims that basic infrastructure is
missing. Prefer concrete, verified product increments over additional
architecture contract expansion.

- Define stable extension/API boundaries, compatibility policy, versioning,
  recovery and maintenance strategy for a production release.
- Expand Renderer/Theme integration with measured performance, larger layouts,
  dynamic theme inheritance and real host integration where still needed.
- Review external card-builder interoperability through explicit schemas and
  attribution. `studiobts/home-assistant-card-builder` remains an AGPL-3.0 reference
  to evaluate; do not copy its source into ATLAS blindly.
- Improve guidance for unknown HACS card types and consider a reviewed community
  mapping exchange. Preserve existing local mapping and import/export behavior.
- Evaluate broader repository artifact types (cards, integrations, tools and
  themes) with explicit installation/compatibility contracts. Basic plugin
  discovery, installation, updates and administration are already implemented.
- Review broader code/documentation generators and architecture validation
  against the existing CLI and generator before planning more implementation.
- Consider additional platforms and community extensions after core deployment
  and compatibility paths have been verified.

## Deployment order and test boundaries

1. Standalone Docker runtime (implemented; continue real deployment checks).
2. HA app/add-on from the same runtime (implemented; real A1 verified; A2 accepted).
3. Optional Linux VM/LXC/bare-Linux installer with systemd (A7).
4. Native ATLAS Home Assistant/HACS frontend integration where useful (A7).

HACS card-package export exists; A7 concerns hosting/integrating ATLAS itself.
The real Supervisor upgrade and Ingress checks are recorded in Sprint
G2.5.9256. They do not establish hardware actions, mobile support, ARM64
execution, every plugin-owned project format or production readiness.

## Separate projects and preserved references

The Card Editor is the integrated ATLAS reference plugin. File Studio, Terminal,
Automation Exporter, Blocks, Studio and other standalone projects have their own
backlogs. Their implementations are not open ATLAS work or ATLAS sprint work.

Preserve these future cross-project references without starting them as part of
the priorities above:

- **Lovelace UV Card**: original UGSo/ATLAS implementation inspired by
  `https://github.com/filipnet/haos-uv-index`; UV sensors, risk colors, WHO-style
  protection guidance, Mushroom-compatible presentation and optional alerts.
- **Parcel integration evaluation**: `TA2k/ioBroker.parcel` remains optional
  inspiration for normalized parcel data and a possible HA bridge/integration.
  No implementation or provider choice is agreed.
- **HTML-to-VitePress converter**: possible independent helper for HTML/CSS/assets
  to Markdown/frontmatter conversion; keep its implementation in its own project.

## Keeping the roadmap current

- Remove completed items from the open list; retain their evidence in sprints.
- Keep unresolved and unverified work open. Cleaning this document does not
  complete implementation or deployment checks.
- Maintain DE/EN public documentation together, with reviewed French wherever
  offered. Standalone plugin locale coverage belongs to those projects.
- Preserve credential boundaries, Linux-sensitive HA resource paths, English
  card-language fallback and the established backup/restore rules.
