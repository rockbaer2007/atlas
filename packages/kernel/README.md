# @atlas/kernel

Kernel package for ATLAS application contracts, service composition and module
infrastructure.

---

# Status

Active workspace package.

Current release line:

**0.2.0-alpha.1**

---

# Public API

The package root exports:

- application and kernel contracts
- service-container contracts and implementations
- dependency-injection contracts and implementations
- module contracts and infrastructure
- event contracts

Use `@atlas/kernel` rather than deep imports. EventBus implementations remain
internal until their public lifecycle and compatibility guarantees are defined.

---

# Dependencies

The kernel depends only on `@atlas/foundation`.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
