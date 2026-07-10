# Source Boundaries

This document records the public source boundaries of the current ATLAS
workspace. It describes the repository as it is built and published today,
not a future package layout.

---

# Active Workspace Packages

| Package | Status | Public boundary |
| --- | --- | --- |
| `@atlas/foundation` | Active | Root barrel exports for the foundation domains in `src`. |
| `@atlas/kernel` | Active | Root barrel exports for kernel contracts, containers, DI, modules, event contracts and `DefaultEventBus`. |
| `@atlas/core` | Planned | Empty entry point; no public API yet. |
| `@atlas/runtime` | Active | Root exports for runtime lifecycle host and events. |
| `@atlas/renderer` | Planned | Empty entry point; no public API yet. |
| `@atlas/theme` | Planned | Empty entry point; no public API yet. |
| `@atlas/homeassistant` | Planned | Empty entry point; no public API yet. |
| `@atlas/devtools` | Planned | Empty entry point; no public API yet. |

All active workspace package manifests publish from `dist`. TypeScript source
under `src` is authoritative; generated output is excluded from version
control.

---

# Foundation Boundary

`@atlas/foundation` provides the lower-level public workspace API. Its root
entry point exposes the following foundation domains:

- capabilities
- diagnostics
- identity
- lifecycle
- metadata
- registry
- result
- types

Consumers use the package root rather than deep imports. Foundation must not
depend on higher-level workspace packages.

---

# Placeholder Boundaries

The planned workspace packages intentionally export `export {}` only. This
reserves their package names and build locations without creating an API that
would need to be supported prematurely.

No implementation should be added to a placeholder package until its owning
architecture phase defines its public contracts, dependencies and tests.

---

# Kernel Boundary

`@atlas/kernel` is an active workspace package that depends only on
`@atlas/foundation`. Its package-root API exposes kernel contracts, service
composition, dependency injection, modules, event contracts and
`DefaultEventBus`.

Event subscriptions and handler storage remain internal. Consumers must not
deep-import those implementation files.

---

# Runtime Boundary

`@atlas/runtime` depends on `@atlas/foundation` and `@atlas/kernel`. Its root
exports `RuntimeHost` and `RuntimeEvent`. The host owns application lifecycle
state, a Kernel service container and runtime lifecycle events through an
`EventBus`. `RuntimeServiceKeys` exposes the application and EventBus entries.

`RuntimeModule` registrations are accepted before startup and initialize once
in dependency order. Missing required dependencies and cycles reject startup;
missing optional dependencies are allowed.

Module versions use stable `MAJOR.MINOR.PATCH` values. Exact requirements must
match exactly, `^` requirements use SemVer compatibility and `*` accepts any
available version. Pre-release identifiers are not yet part of this boundary.

Runtime stop is restart-safe and does not shut modules down. Terminal Runtime
disposal invokes optional module stop and dispose capabilities in reverse
dependency order.

`RuntimeHost.moduleDiagnostics` provides public module lifecycle snapshots with
status, timing, timestamps and the latest activation or shutdown error.

Runtime does not yet own service registration, module activation or rendering.

---

# Enforcement

- Public APIs are exposed through package-root barrel exports.
- Package dependencies follow `docs/project/specifications/DEPENDENCY_RULES.md`.
- `pnpm check`, `pnpm build` and `pnpm test` validate the configured workspace.
- Kernel changes must preserve its dependency on Foundation only.
