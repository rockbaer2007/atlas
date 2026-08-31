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
  "preview": "./plugins/simple-file-editor/preview.svg",
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
| `icon` | no | Relative or absolute URL to an icon. |
| `preview` | no | Relative or absolute URL to a preview image. |
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
    preview.svg
    README.md
README.md
```

This demo repository is the future seed for an official ATLAS plugin template
and a later generator that creates new plugin folders with the expected
metadata and assets.
