# @atlas/core

Core package for ATLAS framework-level contracts and shared public entry
points.

---

# Status

Active core integration package.

`@atlas/core` is the first framework-level entry point above Runtime. It
provides a package-root API for creating a Runtime host through Core without
requiring consumers to deep-import Runtime internals.

---

# Public API

`@atlas/core` exports:

- `CoreRuntimeHost`
- `CoreRuntimeHostConfiguration`
- `createCoreRuntimeHost`

Core currently depends on `@atlas/runtime` and intentionally keeps its public
surface compact while higher-level Core concepts are defined.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
