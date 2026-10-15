# ATLAS Roadmap

Updated: 2026-10-15. Framework **0.2.0-alpha.88**, HA app **0.1.306**.

This is the current open ATLAS backlog. Completed work belongs in
[the sprint ledger](docs/sprints/) and Git history, not in this list.
The four stabilization items are closed; evidence and test boundaries are in
[the stabilization record](docs/deployment/ATLAS_STABILIZATION_2026_10.md).

## Agreed priorities / Vereinbarte nächste Schritte

Agreed on 2026-10-13. Preserve existing settings, encrypted credentials,
projects and installed plugins throughout future work.

| ID | Open work | Abschlusskriterium |
| --- | --- | --- |
| A7 | Qualify further HA versions and future data-format conversions when required. | Bestehende Einstellungen, Projekte und Plugins bei Versionsmigrationen erhalten. |

**A7 Linux/systemd is implemented and verified on Debian 12 amd64 LXC and
native Raspberry Pi OS / Debian 13 aarch64 on Pi 4.**
Installation, real update, rollback, backup, restart and recovery after an
unhealthy update preserve configuration, identity and plugin/project fixtures.
Evidence and Linux host limits are in
[Sprint G2.5.9283](docs/sprints/Sprint-G2.5.9283.md).
The native Pi 4 check covers real 0.1.303 -> 0.1.304 update/rollback,
backup/restart, automatic unhealthy-update recovery and native PTY execution.
See [Sprint G2.5.9307](docs/sprints/Sprint-G2.5.9307.md) for preservation and
backup boundaries; further distributions and hardware remain separate checks.
Pi 4 LAN exposure of only combined port 4176 and actual Chrome Administration,
Hub and Editor rendering are now verified after a fresh PC-verified ATLAS backup.
Internal ports remain loopback-only. See
[Sprint G2.5.9308](docs/sprints/Sprint-G2.5.9308.md) for first-visit identity
initialization and standalone/no-HA-connection boundaries.
The native Pi 4 now also connects to Proxmox HA with Administration-owned
credentials: 3,736 live entities, search/domain filtering and automatic Editor
reconnection after a direct browser reload are verified. Plugin/project state
and unrelated Administration settings are preserved. See
[Sprint G2.5.9309](docs/sprints/Sprint-G2.5.9309.md) for backup and test limits.
App0.1.305 additionally preserves the remembered HA connection in an encrypted
private Linux installation store. A real Pi 4 reboot, fresh HA authentication
before Administration reload, direct Editor reconnection and data preservation
pass after backed-up token adoption. See
[Sprint G2.5.9311](docs/sprints/Sprint-G2.5.9311.md). Other distributions and
HA App environment-owned credentials retain their separate qualification limits.
The App0.1.305 update is now also verified on Proxmox and Pi 5 after fresh
backups: env-owned HA authentication, direct/embedded Administration and Hub,
live Editor connection, terminal access and existing plugin/project/config
preservation pass. At that checkpoint the HACS integration remained0.1.301. See
[Sprint G2.5.9312](docs/sprints/Sprint-G2.5.9312.md) for targeted VM backup and
file-check boundaries.
The HACS integration release upgrade 0.1.301 -> 0.1.306 is now qualified on
Proxmox and Pi 5 after checked backups and real HA Core restarts. Stored entry
identity/schema 1.1/URL, existing plugin/project state and checked files remain
unchanged. Isolated rollback/re-update and refusal of unknown schema 1.2 also pass.
See [Sprint G2.5.9314](docs/sprints/Sprint-G2.5.9314.md) for the PC-verified VM
backup, storage recovery and test boundaries. Further HA versions and actual
conversion between different production schemas remain open; no unnecessary
format change was introduced just for qualification.
The optional native HA panel/config-entry integration is implemented in 0.1.299
and verified with isolated Home Assistant Core 2026.10.1 and its real frontend.
Native installation/setup and embedded project access are verified on Proxmox
and Pi 5. The Pi HACS installation, HA restart, configuration and panel checks
are recorded in [Sprint G2.5.9290](docs/sprints/Sprint-G2.5.9290.md).
Native HACS commit updates followed by HA Core restart are verified on Pi 5 and
Proxmox, with settings, local/editor server projects and shared plugins preserved.
At that earlier checkpoint both integrations remained at 0.1.301; their source was unchanged across
the tested commits. That check did not qualify a release/schema migration.
See [Sprint G2.5.9292](docs/sprints/Sprint-G2.5.9292.md).
Catalog inclusion is not claimed. Preserve the existing runtime address,
installation identity and add-on Ingress access. See
[Sprint G2.5.9284](docs/sprints/Sprint-G2.5.9284.md).
The HACS download diagnosis and qualification boundary are recorded in
[Sprint G2.5.9285](docs/sprints/Sprint-G2.5.9285.md).
Shared plugin management with explicit, backed-up adoption is implemented in
0.1.300 and verified across separate browser origins. Proxmox adoption is confirmed
by the user; native Pi adoption is verified at revision 1 with five repositories,
five external metadata entries and six active plugins shared by App, direct Runtime
and the embedded HA panel. Existing settings and projects are preserved. See
[Sprint G2.5.9291](docs/sprints/Sprint-G2.5.9291.md). Editor
projects, credentials and external plugin settings remain outside this migration.
See [Sprint G2.5.9286](docs/sprints/Sprint-G2.5.9286.md).
Named Expert editor project storage is implemented in 0.1.301 with explicit
save/open previews, workspace backups, revision checks and separate local drafts.
Native App/Runtime project adoption on Proxmox is verified, including the embedded
HA Runtime panel, round-trip project equivalence, stale-save conflict rejection,
reload persistence and original local configuration preservation. The same
App/Ingress to direct Runtime round trip is verified on the real Pi 5 after
updating from 0.1.300 to 0.1.301. The Pi HA Runtime panel is now configured and
opens the same server project after HA restart. Diverse real user projects
remain follow-up qualification;
external-plugin projects and browser preferences remain separate. See
[Sprint G2.5.9287](docs/sprints/Sprint-G2.5.9287.md).
Native evidence and backup boundaries are recorded in
[Sprint G2.5.9288](docs/sprints/Sprint-G2.5.9288.md).
Pi update, backup and project-preservation evidence are recorded in
[Sprint G2.5.9289](docs/sprints/Sprint-G2.5.9289.md).

A6 documentation alignment is complete; the 21 ATLAS/plugin
pages per language, navigation, locale routes and technical examples are
reviewed in DE/EN/FR. Evidence and remaining external-plugin UI translation
limits are recorded in [Sprint G2.5.9282](docs/sprints/Sprint-G2.5.9282.md).
A5 is complete as the documented stabilization and verification
increment, not as production approval. Criteria, API boundaries, regression
results and native test limits are recorded in
[the A5 review](docs/deployment/ATLAS_A5_REVIEW_2026_10.md) and
[Sprint G2.5.9281](docs/sprints/Sprint-G2.5.9281.md).

## Open follow-up qualification

- Diverse real user projects, entities, Custom Cards and theme combinations.
- Longer CPU/RAM profiles and repeated instrumented network outages under project load.
- Stable production plugin/API contracts and broader host compatibility. Release/version/migration rules and the plugin compatibility gate are defined in [the policy](docs/project/specifications/VERSION_COMPATIBILITY_POLICY.md). Native 0.1.302 gate refusal/review paths are recorded in [Sprint G2.5.9296](docs/sprints/Sprint-G2.5.9296.md). Updates to 0.1.303 and authenticated HA discovery are recorded in [Sprint G2.5.9298](docs/sprints/Sprint-G2.5.9298.md). Real Icon Library 0.1.8/0.1.9 backend replacement and recovery passed on Proxmox/Pi with original assets/shared metadata/projects restored; see [Sprint G2.5.9300](docs/sprints/Sprint-G2.5.9300.md). Native 0.1.304 updates, UI cancellation/replacement/recovery and guarded shared metadata adoption now pass on both hosts after fresh backups; see [Sprint G2.5.9302](docs/sprints/Sprint-G2.5.9302.md). Further plugin families, real migrations and generic plugin-data rollback remain open.
- HACS repository/release distribution and full exported-card locale runtime coverage.
- Linux installer qualification on further distributions and additional bare-metal hardware beyond the verified Pi 4 ARM64 host.

The completed bounded checks stay in the sprint ledger and the review above.
These follow-ups remain open; no hardware benchmark, stable 1.0 API or complete
browser/host compatibility is claimed. Preserve Expert-only legacy import
compatibility, settings, encrypted credentials, projects and plugins.

The ATLAS recovery path is additionally qualified with File Studio 0.1.50/0.1.51
after isolated 0.1.49 replacement/recovery, then native Proxmox/Pi cycles. Original
plugin bytes, selected config files, projects, settings and visible browser
preferences are preserved; declared-capability metadata is refreshed as intended.
See [Sprint G2.5.9303](docs/sprints/Sprint-G2.5.9303.md) for backup and file-check
boundaries. Further families and real data migrations remain separate work.

Terminal 0.1.9 -> 0.1.10 catalog updates and UI recovery back to exact original
0.1.9, then forward to retained 0.1.10, now pass after the guarded metadata
correction: first isolated, then Proxmox and Pi 5. Both native hosts finish at
0.1.10 with functional local shells and preserved settings, selected config files,
named projects and other plugins. See
[Sprint G2.5.9306](docs/sprints/Sprint-G2.5.9306.md) for backup boundaries.
Existing wrongly constrained snapshots on other installations still require
reviewed treatment without weakening compatibility or integrity checks.

## Remaining product directions

These are longer-term directions, not claims that basic infrastructure is
missing. Prefer concrete, verified product increments over additional
architecture contract expansion.

- Stabilize extension/API boundaries and implement the documented compatibility,
  migration and recovery rules for a production release.
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
3. Optional Linux/systemd installer (implemented; Debian 12 amd64 LXC verified).
4. Native ATLAS Runtime HA panel (implemented; native HACS commit update/restart verified; version migration open).

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
