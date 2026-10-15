# Sprint G2.5.9304 - Terminal recovery qualification finds metadata blocker

Date: 2026-10-15

## Scope and outcome

Requested: isolated Terminal recovery first, then Proxmox and Pi 5, with backups
and preservation of settings, files, projects and plugins.

**Not qualified.** Isolated UI replacement succeeds, but Restore of Terminal
0.1.9 is blocked by historical catalog compatibility. The gate correctly refuses
the mismatch. Do not perform the native downgrade when its normal recovery path
is already known to be blocked. Both native installations remain on their exact
original Terminal 0.1.9; ATLAS remains 0.1.304. No runtime/package changes here.

## Evidence

Pinned published packages:

- 0.1.8: `a5f9e1ace10dcd00479881463102b6e3084b2e4b`.
- 0.1.9: `bb2de64f5a25d5f91b148377fb2494ddafc8e1b1`.

Each legacy package lists nine records, with README.md repeated identically:
eight distinct installed files. Capture all eight exact native assets, complete
catalog/shared state, named server projects and hashes/size/mtime of four central
HA config files. Capture public Terminal enabled/SSH/theme availability without
reading stored access tokens. Native shared revisions start at VM 5 and Pi 6.
Private evidence/source bundle stays outside Git in
`source/backups/atlas-terminal-recovery-20261015`.

Both native shared Terminal descriptors and the published repository contain
`compatibility.atlas: ">=0.2.0-alpha.79"`, referring historically to a framework
version. The adopted policy defines this field as the App/runtime version.
Actual App 0.1.304 therefore does not satisfy it. No alias or unknown-review
override may turn a known incompatibility into support.

The initial isolated setup with this catalog is refused with 422, as expected.
Reproduce the existing native state in separate fixture storage: manually seed
the genuine legacy file package (reviewed unknown metadata), then store the same
historical catalog constraints as the real installations. This is test setup,
not a native permission or compatibility bypass.

Actual isolated Administration workflow:

1. Import genuine 0.1.8, preview downgrade, explicitly review missing constraints.
2. Back up and apply creates a retained original 0.1.9 package snapshot.
3. Restore selects that snapshot, shows 0.1.8 -> 0.1.9 and the Atlas range mismatch.
   Back up and apply is disabled; there is no unknown-review bypass.
4. Cancel. Clean up the isolated fixture by explicit manual reimport of its exact
   original eight asset bytes, not by claiming a successful Restore operation.
   Original fixture files/projects/Admin configuration preserved. Test snapshots
   retained privately. A first canonical reimport differed in line endings;
   base64 original-byte package restores exact hashes. Its UI envelope retains
   required media types.

Read-only compatibility previews on both real hosts independently return
unsupported for the same original 0.1.9 plus stored catalog requirements. No
native install, shared-metadata edit or recovery mutation is attempted.

## Backups and native preservation

Fresh encrypted local HA backups created and verified:

- VM `9c26baa1`, "ATLAS Proxmox vor Terminal Wiederherstellung 2026-10-15",
  4.67 GB: HA settings/SSL/ATLAS 0.1.304. Separate MariaDB app excluded.
- Pi `55359b76`, "ATLAS Pi vor Terminal Wiederherstellung 2026-10-15",
  133.13 MB: full HA/history/media/SSL/share/all three apps.

Both existing Terminals successfully connect using their browser-held tokens,
without extracting, displaying or changing tokens. Close only the two newly
opened test sessions and reload those test tabs. No shell commands, file edits,
uploads, renames or deletions are sent. Existing sessions in other tabs are not
closed. Native font/language/target/selected prompt theme match before/after DOM
captures. The prior VM `aliens` prompt selection and Pi default are preserved.

Final comparisons: all eight plugin asset hashes, complete catalog and shared
state including unchanged revisions, named projects/revisions, public Terminal
configuration and four selected native file hashes/size/mtime match. All six
plugins remain active; no native recovery snapshots have been created.

Docker is inactive. Isolated UI gate testing uses the local Windows runtime,
not a claimed Linux container. Its Windows ConPTY shell exits immediately and
reports AttachConsole failure during shutdown; isolated functional PTY coverage
is therefore not claimed. Native original-shell connections work on both Linux
hosts. Temporary local runtime/preview processes stopped; ports 4173-4176 free.

## Required follow-up

Correct historical Terminal catalog/runtime version declarations with explicit
release provenance and safe adoption of existing shared metadata. Then repeat
isolated and native recovery without weakening the compatibility gate. Updating
only the online repository would not fix already retained snapshot metadata.
No generic migration or completed native recovery qualification is claimed.
