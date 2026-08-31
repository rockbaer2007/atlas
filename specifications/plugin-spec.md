# Plugin Specification

A Plugin:
- declares metadata
- has a version
- declares dependencies
- is initialized through the kernel
- can be adapted to a Runtime module while preserving plugin metadata
- can expose extension points and provided capabilities for future discovery
- may provide optional deactivate and dispose hooks that are called through Runtime shutdown
- can be registered in a runtime plugin catalog for discovery by extension point or capability
- can be projected into an administration view with status and management actions
- can be exported into an install-package description with manifest, README and additional files

## Plugin Folder Contract

An installed plugin folder should contain:

- `atlas-plugin.json`
- an icon asset
- a preview asset
- optional runtime files such as `dist/`
- optional `README.md`

The manifest is the required contract for discovery. It should declare:

- `id`
- `name`
- `version`
- `description`
- `entry`
- `icon`
- `preview`
- `capabilities`
- `status`
- optional minimum ATLAS version
- optional repository or update source

## Hub Start Rules

- 0 active plugins: ATLAS shows the Plugin Hub with an Administration hint.
- 1 active plugin: ATLAS opens that plugin directly.
- 2 or more active plugins: ATLAS shows the visual Plugin Hub.
- Planned or disabled plugins can appear in Hub/Admin, but do not count as auto-start targets.

## Plugin Repository Flow

ATLAS plugin repositories should behave similarly to a lightweight HACS-style
catalog. Administration keeps a custom repository list with a repository URL
and source type such as plugin, card, integration, tool or theme. Each entry can
load `repository.json`, show available plugins with icons and previews, validate
compatibility and install the referenced package.

Adding a repository should happen through an Atlas-branded intermediate
Administration view or dialog. The user enters the repository URL, selects the
source type, previews the repository metadata and confirms the addition before
the repository becomes part of the managed list. Local ZIP import remains the
manual developer and offline fallback.

## Theme Surface Requirements

The ATLAS theme system should provide a dedicated dark design for
Administration, the Plugin Hub and plugin surfaces. The UI theme switch should
support light, dark and automatic modes, persist the chosen mode and be able to
follow the surrounding Home Assistant frame when embedded through ingress or a
webpage panel.

Administration owns the first shared browser preference through
`atlas.themePreference`. ATLAS surfaces can resolve that preference locally so
the Plugin Hub and later plugins follow the same light, dark or automatic mode.

## Reference Plugin: ATLAS File Studio

ATLAS File Studio is planned as the second official reference plugin. It should
provide Home Assistant configuration editing capabilities similar in scope to
the Home Assistant File editor, but with an ATLAS/Card-Editor-aligned interface.

The initial capability set should include:

- a file tree rooted at `/config` by default
- a focused editor surface with syntax highlighting
- YAML validation for Home Assistant configuration files
- upload and download actions
- optional later Git support for diffs, commits, branches and pushes
- optional later Home Assistant helper lists for entities, services, triggers,
  events and conditions

File Studio must not become an unrestricted root file manager by default. A
controlled "one level up" or extended-area action can expose approved parent or
neighbor paths behind `/config`, but only when Administration grants the
corresponding capability. Planned path capabilities include `config`, `www`,
`custom_components`, `addons` and optional `parent-of-config`.
