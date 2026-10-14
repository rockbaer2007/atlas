# Sprint G2.5.9287 - Shared Expert editor projects

2026-10-14. Runtime, HA package and integration version 0.1.301.
Create Atlas/docs/add-on Git bundles before editing in
`C:/Users/rockb/source/backups/atlas-shared-projects-20261014`.
Preserve user-owned untracked roadmaps and documentation work files.
No production Home Assistant settings, projects or plugins are changed.

Add named server projects under the existing persistent plugin data root,
`.projects/projects.json`. Snapshot Expert fields and nested Card configurations,
name, script filename, surface size and grid size. Save and open only after an
explicit preview and confirmation. New IDs allow identical project names
without replacing an existing project. Revision checks reject stale writes and
stale open previews. Changes to the workspace after a save preview require
another preview. Keep other projects intact during updates.

Back up the current workspace to `.projects/workspaces/` before opening/saving;
also offer a downloaded backup. Back up existing server data before atomic
updates under `.projects/backups/`. Damaged state is never replaced. Enforce
bounded requests, trusted origins, project counts/sizes and safe structured data.
Use HTTP-LAN-compatible browser randomness for new project IDs.

Retain the original browser project key. Shared work uses a separate local draft
with explicit draft recovery after reload. Add backup-file inspection/recovery
with preview. Keep settings, credentials, plugin management, palette preferences
and external plugin projects outside the transfer. Do not automatically replace
the current workspace from another browser.

DE/EN/FR controls and documentation describe first saving a new project through
the original App editor, then selecting/opening it through Runtime. Update version
metadata, README and canonical HA/add-on source inventory (493 matching files).

Validation:

- Workspace build; 20 app/store/lifecycle checks; 163 HA package tests; 6 native
  frontend contracts; syntax and whitespace checks pass.
- Actual backend saves multiple projects, survives restart, rejects stale
  revisions and unrelated origins, and preserves plugin state and fixture files.
- Browser QA on localhost/127.0.0.1: save existing workspace, open same fields and
  geometry in another origin, create a distinct second project, DE/EN/FR controls,
  draft recovery after reload, exact original-browser-project preservation.
  Evidence: `shared-projects.png` in the private backup directory.
- Docker image builds; project store tests and health readiness pass. An actual
  saved project persists after container restart (confirmed after verification).
- Documentation build passes with the existing large-chunk warning only.

Native Pi/Proxmox adoption remains a follow-up after the runtime update. No claim
of migrating external plugin projects or unsaved work across devices is made.

## Handoff saved on 2026-10-14

The user reports updating to 0.1.301 and asks to defer the Proxmox App/Runtime
editor-project adoption check until tomorrow (2026-10-15). The next step is
recorded in ROADMAP.md: backup first, then explicit save/open verification with
original settings, projects and installed plugins preserved. The reported update
is not independent native test evidence. No native systems were changed for
this handoff.
