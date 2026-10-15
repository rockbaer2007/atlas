# Sprint G2.5.9300 - Real plugin replacement and recovery qualification

2026-10-15. Qualify existing ATLAS 0.1.303 installation API with actual published
Icon Library packages. No ATLAS/plugin release, source change or HA restart.

## Recovery boundary and artifacts

- Preserve source bundle, test script/results, original packages and complete
  server project/shared-plugin snapshots in private
  `C:/Users/rockb/source/backups/atlas-real-plugin-update-20261015`.
- Proxmox encrypted local native backup `4983b12`,
  `ATLAS Proxmox vor Plugin-Zyklus 2026-10-15`, 16:19, 4.67 GB.
  Includes HA settings, SSL and ATLAS 0.1.303; unrelated apps/media/share omitted.
  HA detail labels settings/history; external database coverage not independently
  verified. Select only local system, no Cloud/SFTP destination.
- Pi encrypted local full backup `dc0fe159`,
  `ATLAS Pi vor Plugin-Zyklus 2026-10-15`, 16:19, 129.36 MB.
  Includes HA settings/history, media/SSL/share and ATLAS/Get HACS/Matter apps.
- Complete both native backups before replacing any native plugin assets.
  Keep previous backups. No backup restore of the entire HA system is performed.

## Actual release pair and method

All five external plugins are already current. Exercise the historical real
Icon Library 0.1.8 -> 0.1.9 update and return to 0.1.8, then restore the original
0.1.9. Do not invent a newer version or install a synthetic plugin on live hosts.
Published source repository: `rockbaer2007/atlas-icon-library-plugin`.

- 0.1.8 commit `22f2fc614556c5e8f2fc5a305bfc39a08c61e3fb`.
- 0.1.9 commit `eec04c1dbe90ed726232476eac188276c3d9986b`, matches remote main.
- Each package contains ten actual manifest, HTML, JS, CSS, catalog and image
  files. Archive the installed native bytes as base64 restore packages before
  testing. Installed files match the release after normalizing line endings and
  trailing whitespace; restore the captured original bytes, not reformatted ones.
- Use existing `/api/plugins/check-compatibility` and `/api/plugins/install`.
  Both versions are supported on each host using the repository's Atlas/host
  constraints; unknown compatibility is not accepted. No credentials are read.

## Results, in order

1. Isolated real App backend with separate data root and readiness stubs:
   install 0.1.8, update 0.1.9, recover 0.1.8, reinstall 0.1.9. SHA-256 checks
   pass for every package asset after each replacement. Actual project API
   fixture/revision, shared state and a separate Admin settings fixture remain
   unchanged; no staging/previous directory remains. Child server stopped.
2. Proxmox: capture original six-plugin catalog, shared state/revision, named
   project list and complete project contents. Prepare 0.1.8, update to captured
   0.1.9, recover 0.1.8, restore original 0.1.9. Exact final before/after snapshot
   equality and all original asset hashes pass. Other five plugins unchanged.
3. Pi ARM64: same sequence after Proxmox succeeds; same preservation assertions
   pass. One existing named project per host; no project save or new revision.
4. Both native restored libraries load 7,447 MDI icons and return nonempty search
   results. Clear temporary search input. Both Admin views show Icon Library
   0.1.9 and six active plugins. Private screenshots retain evidence.

No Admin settings, credentials, plugin-owned browser databases or local editor
drafts are migrated or deliberately changed. Older plugin UI is not opened on
the live browser origins. This does not establish browser database migration
or restore coverage; the isolated settings assertion uses a fixture, not the
user's encrypted credentials. Full native backups retain recovery protection.

## UI limitation and next increment

This is a real backend replacement/recovery test, not a native repository
Update-button qualification: no newer release is available. The current
package-import UI rejects an already installed plugin ID, and repository update
controls offer newer versions only. No safe rollback button or package overwrite
preview is claimed. Shared metadata is intentionally unchanged throughout this
API test, so native metadata adoption during a UI-driven update remains open.

Next: explicit backed-up package replacement/recovery preview with consistent
shared metadata, preserved plugin data, and confirmation of version direction.
Qualify the full repository UI path when a real newer plugin release exists.
Other plugin families, failed migrations, power loss and whole-HA recovery remain
outside this bounded check. Do not force failures on either live host.

Only qualification records/roadmap change. Private test script syntax and
`git diff --check` pass; no runtime build is necessary for docs-only changes.
