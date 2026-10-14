# Sprint G2.5.9274 - A5 generated Expert bundle runtime

2026-10-14. HA app 0.1.297 / reference editor alpha.103 / HA package alpha.83.

Fresh Pi/Proxmox Administration and original project exports plus Git history
are saved in `C:/Users/rockb/source/backups/atlas-a5-bundle-20261014` before
the bundle test. The original 0.1.296 native export contains seven valid archive
files but reveals a functional defect: the generated JavaScript renders only
an entity list rather than the embedded Expert card layout. The unmodified
original export is retained as reproduction evidence.

Fix Expert script generation by embedding the existing structured card
configuration and mounting it through Home Assistant card helpers. Preserve
nested Core/Community cards and configuration, remap configured entity IDs,
forward current and later hass state to the child without recreating it, and
guard asynchronous creation against stale configuration results. Keep the
legacy script branch and existing default config/import contracts unchanged.
Register each generated custom element/palette entry at most once.

The generated-runtime regression executes the exported JavaScript and verifies
all three card types, entity remapping, state before/after async mounting, live
updates without remounting and duplicate registration. All 163 HA tests and
11 app-server/origin/packaging tests pass. Workspace build, JavaScript syntax,
canonical add-on synchronization and local editor UI are checked.
The canonical HA Docker image builds and both app surfaces report ready through
the real container health endpoint with isolated disposable data.

Native bundle deployment is the next verification in this same A5 increment;
the previous native YAML checks do not prove generated-script installation.
No existing native dashboard/resource or external plugin is replaced by this
fix. Test projects are restored before native package updates.

Both real HA installations update from 0.1.296 to 0.1.297 with the HA backup
option enabled. Fresh Admin and editor after exports compare exactly to before
after excluding only timestamps. All six plugins remain active. The corrected
seven-file bundle is exported from the updated native Pi editor, but Chrome
holds its ZIP download for user confirmation. No generated script is installed
and no HA resource is registered yet. Native execution of this bundle remains
pending; prepared empty `/config/www/community/atlas` directories on both hosts
contain no test script. Existing HA resources are saved as private UI snapshots.

## Native bundle deployment completed

After the user confirms the corrected ZIP download, inspect its seven files and
embedded Expert configuration. Upload the exact generated JavaScript through
File Studio to the new `/config/www/community/atlas` directory on both hosts.
Register only `/hacsfiles/atlas/atlas-a5-bundle-20261014.js` as a JavaScript module
through HA's resource UI. Fresh native dashboard pages list the generated card
in the card catalog. The unchanged `examples/lovelace-card.json` from the ZIP
instantiates `custom:atlas-a5-bundle-20261014` and successfully mounts Core Entity,
Bubble state and Mushroom Template on both Pi 5 ARM64 and Proxmox amd64.
Core/Bubble display the real HA state; Mushroom retains the exported secondary
entity identifier. No configuration error occurs. Screenshots and accessibility
evidence are saved privately. The installed custom element, rather than a pasted
underlying stack, is used for this check.

Cancel both unsaved card previews and exit editing without saving dashboard
changes. After explicit current-turn user confirmation, remove only the own
resource entries, own test folders/scripts and empty Pi test dashboard. The
folders move to File Studio trash; existing trash is not emptied. Refresh HA
when it requests reload after removing resources. Pi's two original visible
resource URLs match exactly; all 38 VM URLs captured before testing remain
present after reload. The virtualized VM table additionally exposes the next
row, so this is not a complete 143-resource export comparison.

Final Administration exports on both hosts match the fresh before exports
exactly except timestamps, including settings, encrypted data and plugin
descriptors. All six plugins remain active. Fresh final editor exports also
match the original exports exactly except timestamps after the completed
installation and cleanup. Close the own browser tabs after cleanup.

This verifies manual installation and native execution of the generated runtime
from the bundle. HACS repository publication/release distribution, localization
runtime coverage, diverse user layouts, backend load and closed-transport
recovery are separate work. Entity replacement/live-update forwarding are
covered by the generated-runtime regression; the native test uses the existing
backup-manager entity without changing a physical device or its state.
