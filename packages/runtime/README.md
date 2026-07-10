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
- `RuntimeServiceKeys`

`RuntimeHost` depends on `@atlas/foundation` lifecycle states and the
`@atlas/kernel` application and event contracts. Consumers may provide their
own `EventBus`, or use the default `DefaultEventBus`.

`RuntimeHost` owns a Kernel service container and registers its application and
EventBus under `RuntimeServiceKeys.application` and `RuntimeServiceKeys.events`.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
