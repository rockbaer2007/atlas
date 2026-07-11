# Dependency Rules

Dependencies must follow the current active package boundaries.

Active workspace dependencies:

- `@atlas/foundation` has no workspace package dependencies.
- `@atlas/kernel` depends on `@atlas/foundation`.
- `@atlas/runtime` depends on `@atlas/foundation` and `@atlas/kernel`.
- `@atlas/core` depends on `@atlas/runtime`.

Planned packages must stay dependency-light until their owning architecture
phase defines their public contracts.
