# @atlas/homeassistant

Home Assistant status panel integration for the ATLAS Framework.

---

# Status

Active status panel integration package.

The package provides a first themed status panel through the active Renderer and
Theme surface path. It intentionally excludes websocket clients, entity access,
service calls and general card infrastructure.

The package root exports the status panel contract and renderer-backed panel
execution only. Its dependency direction runs through Theme rather than a direct
Renderer dependency.

The integration boundary remains intentionally narrow: status panels can mount
to a configured DOM-compatible surface, while all runtime and Home Assistant
transport concerns remain outside the package.

Concrete Home Assistant websocket clients, entity abstraction, service calls and
general card infrastructure remain planned future work.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
