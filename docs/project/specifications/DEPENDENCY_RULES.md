# Dependency Rules

Dependencies must follow the current active package boundaries.

Active workspace dependencies:

- `@atlas/foundation` has no workspace package dependencies.
- `@atlas/kernel` depends on `@atlas/foundation`.
- `@atlas/runtime` depends on `@atlas/foundation` and `@atlas/kernel`.
- `@atlas/core` depends on `@atlas/runtime`.

Planned packages must stay dependency-light until their owning architecture
phase defines their public contracts.

Integration packages above Core are governed by
`docs/project/specifications/INTEGRATION_PACKAGE_READINESS.md`. They may depend
on `@atlas/core` only after an activating sprint defines their package-root API,
contract tests and dependency documentation.
