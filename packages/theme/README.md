# @atlas/theme

Theme package for future design tokens, theme resolution and styling
integration.

---

# Status

Planned theme package.

Theme work is intentionally deferred until the rendering model is defined. When
activated, Theme is expected to depend upward on Core and later rendering
contracts rather than being consumed by lower layers.

The package now carries internal activation-readiness checks for the future
theme model. These checks define the required Core and Renderer layers, keep
theme data token-only before activation, and verify that the package root
remains closed.

Concrete style injection, Renderer coupling, Home Assistant theme bridging and
third-party styling dependencies remain outside this package until the
activation gate is opened in a later sprint.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
