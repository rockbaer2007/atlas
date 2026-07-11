# Integration Package Readiness

This specification records the readiness boundary for ATLAS packages that sit
above Core.

---

# Active Integration Packages

The following integration packages are active:

- `@atlas/renderer`

Active integration packages must expose public APIs through the package root
and must not be imported by Foundation, Kernel, Runtime or Core.

---

# Planned Integration Packages

The following packages remain planned and intentionally empty:

- `@atlas/theme`
- `@atlas/homeassistant`
- `@atlas/devtools`

Their root entry points must keep exporting `export {}` until the owning sprint
defines a public contract, dependency direction and package-root contract tests.

---

# Dependency Direction

Integration packages may depend upward on the stable Core package once they are
activated.

Allowed future direction:

- `@atlas/renderer` depends on `@atlas/core`.
- `@atlas/theme` may depend on `@atlas/core` and later rendering contracts once
  those contracts exist.
- `@atlas/homeassistant` may depend on `@atlas/core` and later renderer/theme
  contracts once those contracts exist.
- `@atlas/devtools` may depend on `@atlas/core` and active diagnostic
  boundaries once those contracts exist.

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

`@atlas/theme` is the next likely activation candidate after Renderer because
theme contracts are expected to shape rendering output before Home Assistant or
developer tooling integrations become active.
