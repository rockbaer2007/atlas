# Sprint G2.5.26 - Integration Package Readiness

## Goal

Review planned integration package boundaries and document dependency direction
above Core before activating the first integration package.

---

## Deliverables

- Integration package readiness specification
- Planned integration package boundary review
- Integration dependency direction documentation
- Sprint documentation

---

## Implementation

Added `docs/project/specifications/INTEGRATION_PACKAGE_READINESS.md` to define
the current readiness boundary for packages above Core.

The specification confirms that `@atlas/renderer`, `@atlas/theme`,
`@atlas/homeassistant` and `@atlas/devtools` remain empty placeholders until an
activating sprint defines their public contract, dependencies and package-root
contract tests.

The documented future dependency direction allows activated integration
packages to depend on `@atlas/core`, while preventing lower layers from
depending on integration packages.

---

## Package Review

Reviewed planned package manifests and root entry points:

- `@atlas/renderer`
- `@atlas/theme`
- `@atlas/homeassistant`
- `@atlas/devtools`

All four remain dependency-light placeholders with empty root entry points.

---

## Next Candidate

`@atlas/renderer` is the next likely activation candidate because it is the
first package expected to consume Core before theme, Home Assistant or developer
tooling contracts are introduced.

---

## Validation

- `pnpm check`
- `pnpm build`
- `pnpm test`
- `git diff --check`

---

## Status

Completed.

---

## Next Sprint

G2.5.27 - Renderer Activation Readiness

Suggested focus:

- Define initial Renderer package contract shape
- Confirm Renderer dependency on Core
- Add Renderer package-root API contract tests
