# ATLAS Roadmap

Updated: 2026-10-13. Framework **0.2.0-alpha.88**, HA app **0.1.287**.

This is the current open ATLAS backlog. Completed work belongs in
[the sprint ledger](docs/sprints/) and Git history, not in this list.
The four stabilization items are closed; evidence and test boundaries are in
[the stabilization record](docs/deployment/ATLAS_STABILIZATION_2026_10.md).

## Agreed priorities / Vereinbarte nächste Schritte

Agreed on 2026-10-13. Preserve existing settings, encrypted credentials,
projects and installed plugins throughout future work.

| ID | Open work | Abschlusskriterium |
| --- | --- | --- |
| A1 | Verify the real HA installation at 0.1.287: Supervisor update, Ingress, entities and installed plugins. | Aktualisierung und Neustart an echtem HA prüfen; Einstellungen, Projekte und Plugins bleiben erhalten. |
| A2 | Verify ARM64/Raspberry Pi and mobile browsers. | ARM64-Image auf passender Hardware prüfen; mobile Bedienung, Layout, Import/Export und Dialoge kontrollieren. |
| A3 | Resolve the Simple/Expert UI requirement. The current UI intentionally starts in Expert without a visible mode switch. | Sichtbaren Wechsel mit der bisherigen Expert-Startvorgabe abgleichen; gespeicherte Projekte und Expert-Funktionen erhalten. |
| A5 | Bring Renderer, Theme and plugin APIs closer to production readiness. | Größere reale Projekte, Live-HA-Updates, Fehler-/Wiederverbindungswege, Leistung und Plugin-Kompatibilität prüfen; API-/Lebenszyklusfragen konkretisieren. |
| A6 | Complete French documentation and keep DE/EN/FR consistent. | FR-Platzhalter übersetzen und fachlich prüfen; Navigation, Struktur und Verhalten der angebotenen Sprachen abgleichen. |
| A7 | Add later deployment paths: Linux/systemd installer and native ATLAS HA/HACS frontend integration. | Dieselbe geprüfte Laufzeit verwenden; Installation, Updates, Identität und Wiederherstellung dokumentieren und prüfen. |

**A1 is next.** The former A4 (roadmap cleanup) is complete in Sprint
G2.5.9255 and is no longer open. A3 is an unresolved product decision;
this documentation update does not change the current Expert UI.

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
2. HA app/add-on from the same runtime (implemented; A1/A2 remain).
3. Optional Linux VM/LXC/bare-Linux installer with systemd (A7).
4. Native ATLAS Home Assistant/HACS frontend integration where useful (A7).

HACS card-package export exists; A7 concerns hosting/integrating ATLAS itself.
Passing isolated checks do not establish a real Supervisor upgrade, hardware
actions, mobile support, ARM64 execution or production readiness.

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
