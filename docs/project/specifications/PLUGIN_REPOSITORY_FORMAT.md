# ATLAS Plugin Repository Format

Status: Draft for the first public demo repository.

An ATLAS plugin repository is a static HTTP-accessible catalog. The first
Administration implementation loads a `repository.json`, shows installable
plugins, installs from package or manifest URLs, compares versions and can
remove repository-installed plugins from the local Administration plugin store.

## Repository File

The repository entry point is `repository.json`.

```json
{
  "kind": "atlas.plugin.repository",
  "name": "ATLAS Plugin Demo Repository",
  "version": "1",
  "plugins": []
}
```

| Field | Required | Description |
|---|---:|---|
| `kind` | yes | Must be `atlas.plugin.repository`. |
| `name` | yes | Human-readable repository name. |
| `version` | yes | Repository format version. Start with `1`. |
| `homepage` | no | Project or documentation URL. |
| `maintainer` | no | Maintainer name or organization. |
| `plugins` | yes | List of installable plugin entries. |

## Plugin Entry

```json
{
  "id": "atlas.demo.simple-file-editor",
  "name": "ATLAS Simple File Editor",
  "version": "0.1.0",
  "description": "Demo plugin for repository install, update and removal tests.",
  "icon": "./plugins/simple-file-editor/icon.svg",
  "logo": "./plugins/simple-file-editor/logo.svg",
  "preview": "./plugins/simple-file-editor/preview.svg",
  "entry": "/plugin-assets/simple-file-editor/index.html",
  "package": "./plugins/simple-file-editor/simple-file-editor.atlas-plugin.json",
  "manifest": "./plugins/simple-file-editor/atlas-plugin.json",
  "capabilities": [
    "atlas.plugin.demo",
    "homeassistant.file-editor"
  ],
  "compatibility": {
    "atlas": ">=0.1.30",
    "host": "administration-local",
    "homeAssistant": ">=2026.8"
  }
}
```

| Field | Required | Description |
|---|---:|---|
| `id` | yes | Stable unique plugin id. |
| `name` | yes | Display name in Administration and Plugin Hub. |
| `version` | yes | Published plugin version. |
| `description` | no | Short explanation for users. |
| `icon` | recommended | Relative or absolute URL to a compact square plugin icon. |
| `logo` | recommended | Relative or absolute URL to a wider ATLAS-branded plugin logo. |
| `preview` | recommended | Relative or absolute URL to a preview image or screenshot. |
| `entry` | recommended | Plugin launch path used by the App Hub after the repository plugin is installed and synchronized by Administration. Local plugins can omit `entry` when their plugin folder contains an `index.html`; ATLAS then exposes `/plugin-assets/<plugin-folder>/index.html` automatically. |
| `package` | recommended | Relative or absolute URL to an install package. |
| `manifest` | fallback | Relative or absolute URL to a plugin manifest. |
| `capabilities` | no | Declared capability strings shown before install. |
| `compatibility` | no | Compatibility metadata for ATLAS and host targets. |

At least one of `package` or `manifest` should be present. If both are present,
Administration installs from `package` first and uses `manifest` as a fallback
descriptor source.

## Install Package

The package URL points to an ATLAS runtime plugin install package:

```json
{
  "kind": "atlas.runtime.plugin.install-package",
  "filename": "simple-file-editor.atlas-plugin.json",
  "plugin": {
    "id": "atlas.demo.simple-file-editor",
    "name": "ATLAS Simple File Editor",
    "version": "0.1.0",
    "description": "Demo plugin for repository install, update and removal tests.",
    "icon": "icon.svg",
    "logo": "logo.svg",
    "preview": "preview.svg",
    "dependencies": [],
    "extensionPoints": ["atlas.plugin.demo"],
    "provides": ["atlas.plugin.demo", "homeassistant.file-editor"]
  },
  "files": []
}
```

The first Administration implementation stores the descriptor and package files
locally. It does not execute plugin code from repository packages yet.

## Demo Repository Path

The planned public demo repository is `atlas-plugin-repository-demo`. It should
contain:

```text
repository.json
plugins/
  simple-file-editor/
    atlas-plugin.json
    simple-file-editor.atlas-plugin.json
    icon.svg
    logo.svg
    preview.svg
    README.md
README.md
```

This demo repository is the future seed for an official ATLAS plugin template
and a later generator that creates new plugin folders with the expected
metadata and assets.

## Plugin Asset Convention

Every user-facing plugin should carry its own visual identity while staying
recognizable as part of ATLAS:

| Asset | Shape | Purpose |
|---|---|---|
| `icon` | square, usually SVG or PNG | Compact lists, small status rows and fallback thumbnails. |
| `logo` | wide, usually SVG or PNG | Administration cards, Hub branding and repository previews. |
| `preview` | 16:9 image | Visual Hub card preview or plugin screenshot. |

The plugin-specific symbol should describe the function, for example a card
layout for the Card Editor or a text document for a File Editor. The ATLAS
overlay or mark should stay consistent across plugins so users can distinguish
ATLAS plugins from generic Home Assistant or HACS entries.
