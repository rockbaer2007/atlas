# Sprint G2.5.9285 - A7 native HACS download diagnosis

2026-10-14. Documentation and qualification only; runtime/package version
remains 0.1.299. No integration code or add-on package changes.

Back up the current Atlas, documentation and add-on Git histories before work:
`C:/Users/rockb/source/backups/atlas-hacs-download-20261014`.
Preserve user-owned untracked roadmaps and documentation work files.

Read the actual Proxmox Home Assistant error log for the HACS installation.
The exception occurs in HACS `hacs_repository_download` when accessing
`repository.data.installed`: `AttributeError: 'NoneType' object has no attribute
'data'`. The failure precedes the package download; it is not evidence of an
invalid ATLAS archive. Reload the HACS page and reopen the repository successfully.
Confirm ATLAS Runtime under pending restart after the user's renewed download.
After the user's HA restart, confirm commit 15646ad as the downloaded version.
Save that visible result as `hacs-installed.png` in the private backup directory.

Document the specific error and retry procedure consistently in DE/EN/FR;
different unknown errors still require their own log diagnosis. Update the
roadmap to distinguish the completed Proxmox download from pending native
configuration, embedding, update and Pi HACS qualification.

Do not restart HA, remove HACS repositories, alter existing integration files,
change runtime addresses or modify projects/settings/plugins. Native setup and
activation remain pending.

Validation: `npm run docs:build` passes (existing large-chunk warning only).
Whitespace checks pass in Atlas and documentation. Runtime source and packages
are unchanged, so no runtime rebuild or version bump is required.
