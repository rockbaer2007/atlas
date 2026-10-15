# Sprint G2.5.9305 - Correct stored Terminal App-version requirements

Date: 2026-10-15

## ATLAS scope

Correct the demonstrated framework/App identity mix-up in the existing shared
Terminal metadata on Proxmox and Pi 5. Preserve settings, files, projects and
installed packages. ATLAS App stays 0.1.304; no runtime/add-on code or package
change. External Terminal release implementation is maintained separately in
its own repository, not counted as ATLAS sprint implementation.

The old Terminal requirement `>=0.2.0-alpha.79` refers to a framework version.
`compatibility.atlas` must identify the App/runtime. The corrected declaration is
`>=0.1.215 <0.2.0`, based on the previously documented minimum for root working
directory and collapsible token controls. The existing host and HA constraints
are preserved; known incompatibility is never overridden. Runtime verification
here covers App 0.1.304 / HA Core 2026.10.1, not every declared historical App.

## Backups and constrained correction

Fresh encrypted local HA backups, verified before native mutation:

- VM `632964a0`, 4.67 GB, pre-correction HA settings/SSL/ATLAS 0.1.304;
  separate MariaDB app excluded.
- Pi `a284fd64`, 133.13 MB, full HA/history/media/SSL/share/all three apps.

PC Git bundles, exact original eight Terminal assets, catalog/shared-state,
named projects, four native config-file hashes/size/mtime and Admin/shared exports
stay under `source/backups/atlas-terminal-compatibility-fix-20261015`, outside Git.
No raw access tokens extracted or printed.

Inventory confirms no existing Terminal recovery snapshots on either native
host. Do not rewrite snapshot files or their checksums. The private correction
refuses to proceed if native snapshots exist, a baseline changes, the Terminal ID/
installed 0.1.9 differs, the exact old range is absent, or the HA backup is not ready.

Use the existing guarded shared-state update API. Deep-compare fresh state with
the PC baseline, clone it and change only Terminal `compatibility.atlas`. Supply
the current revision. The server retains its own prior-state backup before
committing. Verify its backed-up result and exact expected next state.

- VM revision 5 -> 6; Pi revision 6 -> 7.
- Installed Terminal remains 0.1.9 with all eight assets byte-identical.
- All other shared descriptor fields, requirements, repositories, activation and
  complete catalog entries compare unchanged. Six plugins remain active.
- Named server projects/list revisions and all four selected native config-file
  hashes, sizes and mtimes match. Admin settings/file access and configured-secret
  summaries match; exported plugin settings differ only in the intended range.

No plugin install, HA/App restart, token reset, native file edit or deletion is
performed. Earlier encrypted backups and plugin recovery histories are retained.

## Verification

Isolated data roots reproduce the old native descriptor. Correct it with the
same revision-checked API and automatic prior-state backup. Actual UI replacement
0.1.9 -> 0.1.8 captures a new original snapshot with the corrected requirement;
Restore now previews supported and returns exact original 0.1.9 assets. Fixture
files, public Terminal config, projects, activation and other shared content
match the baseline apart from the intended correction/revision changes. This
does not rewrite older retained snapshots or claim Windows PTY qualification.

The released external Terminal 0.1.10 metadata is separately referenced at
`atlas-terminal-plugin` commit `b2b8565`. Katalog/package/manifest now agree and
preserve host `administration-local` and HA `>=2026.8`. No frontend behavior assets
change. Its package validation and six real server checker boundary cases pass:
App 0.1.214 rejected, 0.1.215/0.1.304 accepted, 0.2.0 and the framework alpha
identity rejected, HA 2026.7 rejected. These are range checks, not runtime tests
of all older versions. The external release is not installed on the native hosts.

On both real hosts, read-only server previews accept original Terminal 0.1.9
with the corrected stored catalog and the new 0.1.10 package with all declared
constraints. Actual UI import preview for 0.1.10 shows App 0.1.304, host and
authenticated HA 2026.10.1 matching, with apply available and no unknown-review
bypass. Cancel both previews; installed 0.1.9 remains untouched. Captured screenshots
show this result. Native package downgrade/restore cycles remain follow-up.

DE/EN/FR Terminal documentation corrected separately in the documentation repo;
its build passes with the existing bundle-size advisory. Whitespace checks pass.
Unchanged ATLAS runtime code is not rebuilt for this metadata-only increment.

## Boundaries

This is a deliberate correction of two known legacy descriptors, not an automatic
global migration or an alias that compares framework versions to App versions.
Refreshing a repository does not repair an already saved descriptor. Existing
wrongly constrained recovery snapshots elsewhere still need reviewed treatment;
their integrity checks and compatibility enforcement remain intact. No Raspberry
Pi OS host is installed or reconfigured in this increment.
