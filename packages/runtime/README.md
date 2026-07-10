# @atlas/runtime

Runtime package for application startup, service orchestration and framework
execution flow.

---

# Status

Active runtime package.

The first runtime component is `RuntimeHost`, which owns an application,
coordinates its lifecycle and publishes runtime lifecycle events through the
Kernel EventBus.

---

# Public API

`@atlas/runtime` exports:

- `RuntimeHost`
- `RuntimeEvent`
- `RuntimeModule`
- `RuntimeServiceKeys`

`RuntimeHost` depends on `@atlas/foundation` lifecycle states and the
`@atlas/kernel` application and event contracts. Consumers may provide their
own `EventBus`, or use the default `DefaultEventBus`.

`RuntimeHost` owns a Kernel service container and registers its application and
EventBus under `RuntimeServiceKeys.application` and `RuntimeServiceKeys.events`.

Modules are registered with `RuntimeHost.registerModule` before startup. They
initialize once in registration order and may contribute services through the
Kernel module context. Required dependencies initialize before their dependents;
missing required dependencies and cycles reject startup. Missing optional
dependencies are allowed.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
