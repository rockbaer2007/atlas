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
