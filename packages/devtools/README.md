# @atlas/devtools

Developer tooling package for future diagnostics, validation and project
workflow utilities.

---

# Status

Planned developer experience package.

Tooling work will follow the stabilization of core framework contracts and the
active diagnostic boundaries it needs to inspect. This package remains a
placeholder until its public tooling contracts are defined.

The package now carries internal activation-readiness checks for future
diagnostics tooling. These checks define the required Foundation, Kernel,
Runtime and Core layers, keep Devtools inspection-only before activation, and
verify that the package root remains closed.

Concrete workspace mutation, Renderer coupling, Theme integration and build
tool dependencies remain outside this package until the activation gate is
opened in a later sprint.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
