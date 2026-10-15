# Sprint G2.5.9312 - Native HA App0.1.305 qualification

Date: 2026-10-15

## Scope and backups

Qualify the published App0.1.304 -> 0.1.305 update on Proxmox amd64 and a
real Pi 5 ARM64. Both use HAOS18.3/Core2026.10.1. No source behavior change or
new package version in this evidence increment. Preserve existing settings,
files, projects and external plugins; do not migrate the HACS integration.

Private PC evidence `source/backups/atlas-native-0305-20261015` retains a source
Git bundle, parsed Administration/shared-management/local-draft exports,
catalog/shared state, full named project payloads, four config YAML files and
33 selected external-plugin assets per host, including exact bytes and hashes.
Access tokens are not extracted from browser storage or included in Git.
Treat the private configuration backups and exports as confidential.

Fresh native HA backups are completed and their detail pages inspected before
either update starts:

- Pi `5ea79c30`, 133.76 MB, encrypted full backup: HA settings/history, media,
  SSL, share and all three Apps, including ATLAS0.1.304.
- VM has only 4.5 GB free. Its manual full/all-app wizard estimates13.52GB, so
  cancel that wizard without starting it. Through the existing authenticated
  ATLAS Terminal, inspect CLI help and use the supported `ha backups new --app`
  command to create ATLAS-only partial backup `c05b65f0`,110.48MB, local and
  unencrypted. It includes ATLAS0.1.304 and its data/options. Existing HA backups
  remain untouched; no deletion or global backup preference change is made.

These fresh HA backups stay on their respective hosts, not copied/decrypted on
the PC. The VM backup is not a new full HA/system backup. PC config/project/plugin
exports supplement that targeted backup; external services such as MariaDB are
outside the App update and fresh VM backup scope.

## Actual updates and native behavior

Refresh repository metadata with the native HA CLI. Both real HA update dialogs
offer installed0.1.304/latest0.1.305 with the expected changelog. Start each update
only after the backups and PC captures succeed. Preserve the original disabled
additional-update-backup toggle because fresh backups already exist.

- VM starts healthy0.1.305 at20:15:22 CEST; Pi at20:17:45 CEST.
- Both native HA update dialogs subsequently report Current and installed/latest
  0.1.305. No HA Core or host restart is needed or performed.
- Before reloading Administration, authenticated REST discovery succeeds with
  HA2026.10.1 on each newly restarted App. Environment-owned HA credentials are
  restored without re-entry. The new Linux-only encrypted store does not replace
  HA App option ownership.
- Reloaded Administration displays0.1.305, restored redacted credentials and
  unchanged connection/path options. Shared Plugin Manager shows six active
  plugins and the common server state on each system.
- Fresh direct Hub and/or reloaded embedded HA Runtime Hub renders all six
  plugins. Embedded Administration also displays the healthy0.1.305 runtime.
- Direct Editor reload connects automatically: VM3,734 live entities, Pi32.
  Existing direct-origin local drafts remain empty; named server projects are
  captured separately and never opened or overwritten during the checks.
- Terminal reconnects using its pre-existing saved access. Read-only `uname -m`
  returns x86_64/aarch64. VM aliens theme, Pi Standard theme and14px font persist.
  Disconnect both own test shell sessions after verification.

## Preservation and limits

After update and again after the new Administration/UI initialization paths,
require exact equality for catalog, shared state/revision, complete project list
and payloads, selected plugin assets, four config files, trash metadata and
terminal capabilities. All pass. Revisions remain VM9/Pi10, each host retains
one named server project and six plugins. The intentionally different File Studio
versions stay VM0.1.50/Pi0.1.51; Terminal stays0.1.10. No plugin update is applied.

Parsed before/after browser exports match for all Administration settings,
configured-secret summaries and plugin metadata. Complete local draft exports
match after excluding only their generated export timestamp. German/dark
preferences remain. Inspected screenshots of both embedded healthy runtimes and
connected Editors are retained privately.

Read the installed HA integration manifests: both remain0.1.301. This qualifies
the App update with unchanged integration code, not a real HACS version/schema
migration, a host reboot, every plugin operation or a whole-filesystem hash audit.
Asset coverage is the selected33 files per host; the native backups protect the
broader App data. No HA entity/service/automation/dashboard or user project is
written. No raw token or backup encryption code is requested or exported to Git.

Preservation assertions and whitespace checks pass. Builds/regressions for the
unchanged release are recorded in Sprint9311; they are not repeated for this
documentation-only native qualification.
