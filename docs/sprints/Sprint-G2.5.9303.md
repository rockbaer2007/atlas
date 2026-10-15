# Sprint G2.5.9303 - File Studio recovery qualification

Date: 2026-10-15

## Scope

Qualify ATLAS 0.1.304 guarded package replacement/recovery with the external File
Studio plugin: isolated first, then Proxmox amd64 and real Pi 5 ARM64. No ATLAS
runtime or external-plugin implementation change; no package version bump.
Existing user files are never edited, saved, uploaded, renamed or deleted.

Preserve the actual starting versions: VM 0.1.50 (85 assets), Pi 0.1.51 (86 assets,
including `icons/open-icon-studio.svg`). Do not overwrite the newer Pi version
with the VM version. Pin published package sources to these commits:

- 0.1.49: `a3617179890b203ea505a3c299108eed4dd8c762`.
- 0.1.50: `b394baada500a74037e16d09c0324b26edd60a7d`.
- 0.1.51: `fa906d081cb39e25b0bcf6e7eff422c6896d9649`.

The changes in this range concern presentation and an explicit Icon Studio
handoff, with no automatic file-data-format migration. Test the published legacy
`atlas.plugin.package` import through Administration's normal conversion, not a
synthetically edited native package. Restore the actual captured original bytes.

## Safeguards and backups

Fresh encrypted local HA backups created before native mutations:

- VM `5b34b32f`, "ATLAS Proxmox vor File Studio Wiederherstellung 2026-10-15",
  4.67 GB: HA settings, SSL and ATLAS 0.1.304. Separate MariaDB app excluded.
- Pi `0d84d309`, "ATLAS Pi vor File Studio Wiederherstellung 2026-10-15",
  132.31 MB: full HA/history/media/SSL/share and all three apps.

PC evidence stays outside Git under
`source/backups/atlas-file-studio-recovery-20261015`: source bundle, pinned release
packages, complete original plugin assets, catalog/shared state, named server
projects, encrypted Admin exports, shared-management and local draft exports.
No raw credentials printed. Before/after file checks retain only hashes, size and
mtime for configuration.yaml, automations.yaml, scripts.yaml and scenes.yaml.
Do not read secrets.yaml. No backup or recovery history is purged.

Capture visible File Studio preferences from the DOM, without reading browser
storage directly: theme/language, favorites, font size, wrapping, height/width
limits and saved pane widths. All compare unchanged after older-version loads
and final recovery on the same origins.

## Isolated qualification

Separate config/history/trash/plugin/Admin roots and browser origin. Fixtures
include CRLF YAML, a binary file, a genuine File Studio write-generated history
entry and a recoverable trash entry. No native credentials or config copied.

- Cancel preserves assets, projects, shared revision and all fixture file bytes.
- Actual UI 0.1.50 -> 0.1.49 -> retained original 0.1.50 passes (85 exact assets).
- Repeat with 0.1.51 -> 0.1.49 -> retained original 0.1.51 (86 exact assets).
- Config, binary content, history, trash and Admin fixture hashes stay identical.
- Non-default browser preferences (16px, no wrapping, dark, unlimited width)
  survive reloads and both cycles. Editor reads the original fixture correctly.

The first harness request used the legacy package envelope directly against the
internal install endpoint and was correctly refused; normalize the envelope for
isolated setup, while actual UI imports keep the original published files.
An initial strict shared-metadata comparison also exposed expected capability
enrichment described below; no native mutation occurred before isolating it.

## Native results

Both actual Administration UIs pass cancellation, guarded replacement to 0.1.49,
and Restore from the retained original snapshot. Unknown constraints on the
import require the review checkbox; apply is initially disabled. Restore previews
match the retained Atlas/host requirements and display the correct target version.

Final VM: 0.1.50, all 85 original asset hashes equal, shared revision 3 -> 5.
Final Pi: 0.1.51, all 86 original asset hashes equal, shared revision 4 -> 6.
All six plugins remain active. Retain 0.1.49 plus the host's original version as
product recovery snapshots. Other catalog entries, repositories, activation,
named server projects/revisions and local drafts remain unchanged. The native
trash listing also compares unchanged; all four selected config-file hashes,
sizes and mtimes match exactly. No native test files are created or removed.

Existing shared File Studio descriptors had empty capabilities/provides arrays
despite the actual manifests declaring 15 capabilities. The 0.1.304 replacement
contract refreshes these arrays from restored code. Final comparisons explicitly
verify the 15 declarations, while requiring all other shared descriptor content,
Admin settings, file-access permissions and configured-secret summaries to match.
This is metadata enrichment, not a grant of broader filesystem permissions or an
exact-byte shared-state rollback. Cancel does not enrich metadata.

Both restored File Studios load the tree and read scenes.yaml; YAML basis checks
pass with Save disabled. Browser preferences match the original DOM captures.
Both App health endpoints report Administration/Card Editor ready; authenticated
HA discovery still reports Core 2026.10.1. No HA/App restart is needed for package
replacement. Native users' file contents are not copied into the sprint record.

## Boundaries

This qualifies ATLAS package recovery for these File Studio versions and hosts.
Full HA backups protect the wider native configuration; byte comparison covers
the complete plugin asset sets and four selected native config files, not every
file in a continuously running HA filesystem. Native history directories are not
claimed as comprehensively hashed: full history/trash/binary-byte preservation is
demonstrated in the isolated fixture. Browser preference checks are DOM-based,
not a full portable browser-storage backup. No data-format reverse migration,
power-loss recovery or generic third-party-plugin compatibility is claimed.

Private scripts/comparisons, native UI evidence and whitespace checks pass.
Unchanged product sources do not require repeating source builds. No external
plugin implementation is recorded as ATLAS sprint work.
