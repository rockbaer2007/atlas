# ATLAS Roadmap

Updated: 2026-10-17. Framework **0.2.0-alpha.88**, HA app **0.1.316**.

This is the current open ATLAS backlog. Completed work belongs in
[the sprint ledger](docs/sprints/) and Git history, not in this list.
The four stabilization items are closed; evidence and test boundaries are in
[the stabilization record](docs/deployment/ATLAS_STABILIZATION_2026_10.md).

## Agreed priorities / Vereinbarte nächste Schritte

App0.1.314 aligns YAML/JSON HACS readiness with the supported export/import
formats. Both isolated browser roundtrips pass 112/112 checks and byte-identical
re-export with template preservation. See [Sprint9343](docs/sprints/Sprint-G2.5.9343.md).
Pi 5 and Proxmox remain unchanged at the previously qualified App0.1.313.
App0.1.315 fixes imported card_mod/uix/uix_style preservation in structured
card data, YAML/JSON, HACS packages and generated scripts, including structural
UIX export conversion and exact style ownership. Isolated qualification and
limits are in [Sprint9344](docs/sprints/Sprint-G2.5.9344.md).
The native App0.1.313 -> 0.1.315 update now also passes on Proxmox and Pi5
after fresh backups: YAML/Card-Mod and JSON/UIX export/re-import/re-export
achieve112/112 checks and byte-identical archives, preserving original data,
projects, plugins, trash/history and complete local Editor configurations.
See [Sprint9345](docs/sprints/Sprint-G2.5.9345.md).
Actual CSS rendering now passes in separate isolated HA2026.10.1 instances
with Mushroom5.2.3 and Card-Mod4.2.1 / UIX8.4.0: generated scripts match native
reference cards for dynamic CSS, current shadow selectors and UIX radii.
The check exposes configuration limits: CSS templates require config.entity,
old Mushroom selectors need reviewing, uix_style is preserved but not executed,
and UIX prefers uix over card_mod. See [Sprint9346](docs/sprints/Sprint-G2.5.9346.md).
Native CSS qualification now also passes after fresh backups on Proxmox and
Pi5: both Card-Mod4.2.1 and UIX8.4.0, each tested separately with App0.1.315,
HA2026.10.1 and Mushroom5.2.3. Export/native pairs match in909computed-style
checks including natural Jinja color changes and reload. Original data and
extension configuration are restored; see [Sprint9347](docs/sprints/Sprint-G2.5.9347.md).
App 0.1.316 now fixes Bubble string CSS import and root-stack UIX inheritance.
The same isolated HA 2026.10.1 fixture passes YAML/JSON and actual HACS UI
roundtrip with byte-identical ZIPs, 112/112 readiness checks, and 180 computed-CSS
comparisons across light/dark/reload. Native and exported parent accents now
match even when distinct from fallback colors. Existing data and projects stay
unchanged; old lost CSS requires the original source and existing scripts must
be regenerated. See [Sprint9350](docs/sprints/Sprint-G2.5.9350.md). Findings
and earlier negative evidence remain in [Sprint9349](docs/sprints/Sprint-G2.5.9349.md).
The native 0.1.315 -> 0.1.316 update now also passes on Proxmox and Pi 5 after
fresh HA backups: 240 additional computed-CSS comparisons including reload,
YAML/JSON style preservation and actual HACS UI roundtrips with byte-identical
archives and 112/112 readiness checks per host. Original local Editor states,
files, projects, plugins, trash and history are preserved. Three resource removals
made by the user on Proxmox were explicitly confirmed and retained. Owned test
dashboards/resources and temporary Pi UIX were removed after confirmation.
See [Sprint9351](docs/sprints/Sprint-G2.5.9351.md).
Next: qualify in-place light/dark theme switches on continuously mounted Cards
in isolation. Further HA/styling versions remain separate qualification scopes.

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
The compatibility matrix now also qualifies HA Core 2026.9.4 in a fresh isolated
amd64 installation with integration0.1.306 and Runtime0.1.306: real setup/options,
reload/restart, embedded Hub/Administration/Editor, live entity selection and
fixture preservation pass. CI runs the eleven integration contracts against
both 2026.9.4 and 2026.10.1. This does not qualify every intervening version,
9.4 HACS downloads or native ARM64 execution. Pi 5 and Proxmox were untouched.
See [Sprint G2.5.9315](docs/sprints/Sprint-G2.5.9315.md).
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

App0.1.313 corrects the normal Mushroom YAML/JSON import losses identified in
[Sprint G2.5.9340](docs/sprints/Sprint-G2.5.9340.md): single cards retain their
Mushroom type and text/icon/color templates, as do nested entries. YAML block
scalars preserve indentation and blank lines. Isolated regression and actual
HA execution evidence is recorded in [Sprint G2.5.9341](docs/sprints/Sprint-G2.5.9341.md).
The backed-up native App0.1.313 update now also passes on Proxmox and Pi 5:
all four normal import paths, exact templates, save/open, actual HACS round trips
and real HA preview text/icon/color changes on natural minute boundaries.
Original data and complete local Editor configurations are retained. See
[Sprint G2.5.9342](docs/sprints/Sprint-G2.5.9342.md) for native scope and boundaries.

The isolated mixed Core/Bubble/Mushroom HACS-card bundle round trip is qualified
in [Sprint G2.5.9316](docs/sprints/Sprint-G2.5.9316.md). Actual browser download,
reimport/re-export and real HA rendering retain the checked fields/configuration.
App0.1.307 fixes false title conflicts when a project's name differs from its
first nested card. Grid metadata round-trips; HA uses generated stacks rather
than identical pixel geometry. App0.1.308 loads exported Card locale files,
follows the HA language or an explicit Card language, and applies per-field EN
fallbacks. DE/FR exports still need translation/review when no adapter runs.
See [Sprint G2.5.9318](docs/sprints/Sprint-G2.5.9318.md). App0.1.309 exports
the dist repository layout. Isolated HACS2.0.5 download methods install the
script/locales together and the real /hacsfiles/ endpoint serves them in HA.
See [Sprint G2.5.9319](docs/sprints/Sprint-G2.5.9319.md) for fixture transport and
release/filename boundaries. Real GitHub OAuth, custom Dashboard repository
registration, branch installation and automatic module registration now pass
in isolated HA2026.10.1/HACS2.0.5; see
[Sprint G2.5.9320](docs/sprints/Sprint-G2.5.9320.md). Native hosts were untouched.
Real tagged releases v0.1.0/v0.1.1, HACS update detection, installation and
manual reinstallation of v0.1.0 also pass, including exact script/locale bytes,
stable module identity and preserved configuration after restart; see
[Sprint G2.5.9321](docs/sprints/Sprint-G2.5.9321.md).
Controlled download failure after a real script write restores v0.1.0 through
HACS2.0.5. A hard process interruption leaves a partial installation after
restart; normal HACS reinstallation and a separate complete configuration-volume
snapshot recovery both pass. See [Sprint G2.5.9322](docs/sprints/Sprint-G2.5.9322.md)
for fault-injection scope and the absence of automatic crash recovery.
App0.1.310 adds an embedded EN/DE/FR repair notice to newly generated Cards:
declared locale files are checked even when inactive, while English fallback
and live child Cards remain usable. Isolated missing-file/repair verification
and the re-export boundary are recorded in
[Sprint G2.5.9323](docs/sprints/Sprint-G2.5.9323.md).
Native App0.1.310 updates and generated-Card missing-FR/EN checks also pass on
Proxmox/Pi 5 after fresh backups; existing settings, projects and external plugins
are preserved. See [Sprint G2.5.9324](docs/sprints/Sprint-G2.5.9324.md) for the
manual /local/ test resource scope and transient VM preview read-failure boundary.
App0.1.311 additionally pairs newly generated scripts and locales with a
deterministic package marker. Mixed/unmarked locales are excluded and reported;
isolated generated-runtime and HA browser checks are recorded in
[Sprint G2.5.9325](docs/sprints/Sprint-G2.5.9325.md). Existing deployed scripts
need deliberate re-export. This is not signature verification or automatic repair.
Native0.1.311 App updates and own generated-Card mixed EN/FR, unmarked FR and
repair checks pass on both hosts; see [Sprint G2.5.9326](docs/sprints/Sprint-G2.5.9326.md).
The same update exposed a File Studio retention limitation: trash/history
defaulted to the replaceable container filesystem. The only pre-existing trash
entries were our previous test folders; these were reconstructed from PC copies
with original metadata after the update. App0.1.312 now uses persistent plugin
installation data, with isolated old-container migration, replacement, backup
recovery and actual file restoration qualified in
[Sprint G2.5.9327](docs/sprints/Sprint-G2.5.9327.md). Before the FIRST update,
prepare legacy stores inside the OLD container and back up the prepared data;
already lost stores require an earlier backup. Native0.1.312 preparation and
updates now pass on Proxmox and Pi 5 after fresh HA backups plus PC copies of
legacy/prepared data: both original trash entries, all12 history files and
all169/174 persistent files remain intact, alongside configuration/projects.
See [Sprint G2.5.9328](docs/sprints/Sprint-G2.5.9328.md). This does not qualify
HAOS-native backup restoration or recovery of previously discarded stores.

A separate native HAOS full-backup restore is now qualified with owned fixtures:
HAOS18.3/HA2026.10.1/Supervisor2026.10.2, encrypted full backup downloaded to PC,
then uploaded and restored through Supervisor into a fresh Hyper-V amd64 VM.
All154 checked files, App options, HA settings/config entries, six plugin catalog
entries, the named project and retained trash/history match the source exactly.
See [Sprint G2.5.9329](docs/sprints/Sprint-G2.5.9329.md). Pi 5 and Proxmox were
untouched; real production backup archives were not restored. The isolated test
address was deliberately retained. A second fresh HAOS target now also qualifies
recovery under a different isolated IP: the full restore retains all154 checked
files and existing credentials; update only the App's HA URL and the Runtime
integration's options URL through their supported configuration interfaces.
Generated plugin links follow the new request origin automatically. No automatic
rewrite of stored addresses is promised. See
[Sprint G2.5.9330](docs/sprints/Sprint-G2.5.9330.md).

- Diverse real user projects, entities, Custom Cards and theme combinations.
  A bounded isolated36-field Core/Bubble/Mushroom project now passes actual UI
  save/reopen, byte-identical HACS export/import and real HA rendering. During
  360 fixture state changes over190seconds, controlled12/24/62second transport
  outages recover automatically without reload; the longest includes both
  Editor and HA browser sockets. Existing fixture data remains intact and
  native hosts are untouched. See [Sprint G2.5.9337](docs/sprints/Sprint-G2.5.9337.md).
  The same 36-field save/reopen and actual browser HACS-export/import workflow
  now also passes on Proxmox and Pi 5 after fresh backups. Repeated exports are
  byte-identical per host; original local Editor configurations are restored.
  Existing Editors recover after a real VM reboot and user-performed Pi LAN
  interruption; all 36 HA cards remain rendered. Native checks use passive real
  sensors, not the isolated 360 synthetic changes or ARM64 browser benchmarking.
  See [Sprint G2.5.9338](docs/sprints/Sprint-G2.5.9338.md).
  A full isolated 60-minute run now also passes with 36 distinct fixture entities:
  720 update batches, 10,080 successful service calls and automatic recovery
  after 15/45/90-second transport outages. Actual browser export/import,
  save/reopen, final entity states and original fixture preservation pass.
  App/HA memory sampling and its browser-wide/late process-tree limits are in
  [Sprint G2.5.9339](docs/sprints/Sprint-G2.5.9339.md). Native hosts were untouched.
- Longer or more precisely isolated CPU/RAM profiles, larger entity counts and
  further network failure variants beyond that bounded 60-minute fixture check.
- Stable production plugin/API contracts and broader host compatibility. Release/version/migration rules and the plugin compatibility gate are defined in [the policy](docs/project/specifications/VERSION_COMPATIBILITY_POLICY.md). Native 0.1.302 gate refusal/review paths are recorded in [Sprint G2.5.9296](docs/sprints/Sprint-G2.5.9296.md). Updates to 0.1.303 and authenticated HA discovery are recorded in [Sprint G2.5.9298](docs/sprints/Sprint-G2.5.9298.md). Real Icon Library 0.1.8/0.1.9 backend replacement and recovery passed on Proxmox/Pi with original assets/shared metadata/projects restored; see [Sprint G2.5.9300](docs/sprints/Sprint-G2.5.9300.md). Native 0.1.304 updates, UI cancellation/replacement/recovery and guarded shared metadata adoption now pass on both hosts after fresh backups; see [Sprint G2.5.9302](docs/sprints/Sprint-G2.5.9302.md). Further plugin families, real migrations and generic plugin-data rollback remain open.
- Further real network/storage failure variants, HAOS recovery on physical/ARM64 hardware and additional HACS versions beyond the bounded isolated checks. No automatic HACS crash rollback is promised.
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

The ATLAS guarded recovery path now also passes with actual Automation Exporter /
Editor packages0.1.27/0.1.28 in an isolated local App: non-mutating preview,
cancellation, stale-preview rejection after a real management change, exact
package recovery, re-update/restart and source/export/project/history/trash
preservation. Browser analysis/export and File Studio handoff pass. See
[Sprint G2.5.9333](docs/sprints/Sprint-G2.5.9333.md).
Native Pi 5 and Proxmox28->27->original28 recovery now also passes after fresh
local HA backups and PC copies: exact plugin/source/export/retention/project
preservation, UI cancellation/recovery and identical synthetic YAML analysis.
App312 and authenticated HA2026.10.1 remain unchanged, with no restart needed.
See [Sprint G2.5.9334](docs/sprints/Sprint-G2.5.9334.md). Real data-format
migration, new GitHub release qualification and full HA restore remain distinct.

Icon Studio package recovery is now also qualified in an isolated App312 with
actual16/17 packages, guarded UI cancellation/recovery and App restart. On the
same browser origin/profile, all131collection icons and2drawing text objects
survive; re-exported collection JSON, iconset JS and drawing SVG match exactly.
Server files, named project, sibling plugin, trash and history remain intact.
Browser stores are outside HA/server backups; no deleted-storage recovery or
origin/profile migration is claimed.
See [Sprint G2.5.9335](docs/sprints/Sprint-G2.5.9335.md).
Native Pi 5 and Proxmox16->17->original16->17 now also pass after fresh local
HA backups and PC copies. All12package assets, existing server files, shared
settings, six active plugins, named project, trash and history are preserved.
Direct and HA Ingress browser origins retain their three reference icons and
empty drawing drafts; collection JSON is byte-identical. New text creation,
undo and reload pass. App312 and HA2026.10.1 need no restart. After recovery,
reload Administration before another update if a stale preview is rejected.
See [Sprint G2.5.9336](docs/sprints/Sprint-G2.5.9336.md).

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
4. Native ATLAS Runtime HA panel (implemented; native release update/restart verified; additional HA versions and future schema conversions remain separate qualification).

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
