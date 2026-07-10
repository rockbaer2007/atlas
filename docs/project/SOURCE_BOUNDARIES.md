# Source Boundaries

This document records the public source boundaries of the current ATLAS
workspace. It describes the repository as it is built and published today,
not a future package layout.

---

# Active Workspace Packages

| Package | Status | Public boundary |
| --- | --- | --- |
| `@atlas/foundation` | Active | Root barrel exports for the foundation domains in `src`. |
| `@atlas/core` | Planned | Empty entry point; no public API yet. |
| `@atlas/runtime` | Planned | Empty entry point; no public API yet. |
| `@atlas/renderer` | Planned | Empty entry point; no public API yet. |
| `@atlas/theme` | Planned | Empty entry point; no public API yet. |
| `@atlas/homeassistant` | Planned | Empty entry point; no public API yet. |
| `@atlas/devtools` | Planned | Empty entry point; no public API yet. |

All active workspace package manifests publish from `dist`. TypeScript source
under `src` is authoritative; generated output is excluded from version
control.

---

# Foundation Boundary

`@atlas/foundation` is the only active public workspace package. Its root
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

# Kernel Reference Source

`packages/kernel` contains historical kernel, event and module source plus
tests. It has no `package.json` or TypeScript build configuration and is not
included in the PNPM workspace. It is therefore not an installable
`@atlas/kernel` package and has no current public package API.

The reference source imports only from `@atlas/foundation`. Workspace packages
must not depend on it until a dedicated architecture decision either promotes
it to a configured workspace package or formally archives or migrates it.

---

# Enforcement

- Public APIs are exposed through package-root barrel exports.
- Package dependencies follow `docs/project/specifications/DEPENDENCY_RULES.md`.
- `pnpm check`, `pnpm build` and `pnpm test` validate the configured workspace.
- A future kernel decision must add its own package manifest, build setup and
  dependency checks before it becomes a public package.
