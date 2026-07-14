# @atlas/homeassistant

Home Assistant integration package for future dashboard, card and service
integration support.

---

# Status

Planned integration package.

Home Assistant support is deferred until the runtime, renderer and theme layers
provide stable extension points. This package remains an integration
placeholder and must not define public APIs before its activation sprint.

The package now carries internal readiness checks for the future integration
boundary. These checks define the required Atlas layers, keep concrete Home
Assistant behavior above Renderer, and verify that the package root remains
closed before activation.

Concrete Home Assistant dependencies, websocket clients, card mounting and
theme binding remain outside this package until the activation gate is opened
in a later sprint.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
