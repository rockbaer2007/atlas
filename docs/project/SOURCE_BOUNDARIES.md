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
| `@atlas/core` | Active | Root exports for the Core Runtime host entry point. |
| `@atlas/runtime` | Active | Root exports for runtime lifecycle host, configuration, diagnostics and events. |
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

# Core Boundary

`@atlas/core` depends on `@atlas/runtime`. Its package-root API exposes the
first Core Runtime entry point: `createCoreRuntimeHost`, `CoreRuntimeHost` and
`CoreRuntimeHostConfiguration`.

Core is intentionally thin in this phase. It provides a stable framework-level
entry point above Runtime without adding domain, rendering or integration
behavior yet.

---

# Runtime Boundary

`@atlas/runtime` depends on `@atlas/foundation` and `@atlas/kernel`. Its root
exports `RuntimeHost`, `RuntimeHostConfiguration`, runtime diagnostics and
`RuntimeEvent`. The host owns application lifecycle state, a Kernel service
container and runtime lifecycle events through an `EventBus`.
`RuntimeServiceKeys` exposes the application and EventBus entries.

`RuntimeHostConfiguration` provides the public object-based host configuration
boundary. Runtime validates application identity, application version parts,
module manifests, dependency declarations and module initialize functions before
configuration is accepted for startup.

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

`RuntimeHost.health` provides a public host-level health summary derived from
module diagnostics. Runtime health is `failed` when any module failed,
`degraded` when any module is registered or stopped but none failed, and
`healthy` when all modules are initialized, disposed or absent.

`RuntimeHost.diagnostics` adapts Runtime health into Foundation
`DiagnosticReport` values with stable Runtime issue codes for degraded and
failed modules.

Runtime publishes `runtime.diagnostics.changed` events when aggregate Runtime
health changes. The event payload includes the previous health state, current
health state and current health report.

Module registration is a synchronous boundary. It updates Runtime module
diagnostics and health immediately, but does not publish hidden asynchronous
diagnostic events. Diagnostic change events are emitted by awaited Runtime
lifecycle operations.

Runtime public API coverage is enforced through package-root contract tests.
Consumers should import Runtime APIs from `@atlas/runtime` instead of deep
source paths.

Runtime does not yet own rendering.

---

# Enforcement

- Public APIs are exposed through package-root barrel exports.
- Package dependencies follow `docs/project/specifications/DEPENDENCY_RULES.md`.
- `pnpm check`, `pnpm build` and `pnpm test` validate the configured workspace.
- Kernel changes must preserve its dependency on Foundation only.
