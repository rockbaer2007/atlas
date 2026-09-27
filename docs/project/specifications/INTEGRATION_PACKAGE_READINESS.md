# Integration Package Readiness

This specification records the readiness boundary for ATLAS packages that sit
above Core.

---

# Active Integration Packages

The following integration packages are active:

- `@atlas/renderer`
- `@atlas/theme`
- `@atlas/homeassistant`
- `@atlas/devtools`

Active integration packages must expose public APIs through the package root
and must not be imported by Foundation, Kernel, Runtime or Core.

---

# Planned Integration Packages

There are currently no planned integration packages with an empty public root.

---

# Dependency Direction

Integration packages may depend upward on the stable Core package once they are
activated.

Allowed future direction:

- `@atlas/renderer` depends on `@atlas/core`.
- `@atlas/theme` depends on Renderer for the active rendering path.
- `@atlas/homeassistant` depends on Theme for the active themed status-panel path.
- `@atlas/devtools` currently depends only on Foundation for read-only
  diagnostic report summaries. Interactive runtime or UI diagnostics may depend
  on Core or other active boundaries only after defining a separate contract.

Integration packages must not be imported by Foundation, Kernel, Runtime or
Core.

---

# Activation Requirements

Before a planned integration package becomes active, the activating sprint must:

- declare the package public boundary;
- add explicit workspace dependencies to `package.json`;
- expose public APIs through the package root only;
- add package-root public API contract tests;
- update source-boundary and dependency-rule documentation;
- pass `pnpm check`, `pnpm build` and `pnpm test`.

---

# Next Candidate

No additional integration package is currently queued for activation. Future
packages should enter this list with an explicit contract and owner sprint.
