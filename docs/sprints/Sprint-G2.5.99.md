# Sprint G2.5.99 - Home Assistant Dependency Boundary Review

## Goal

Review Home Assistant package dependency boundaries before activation.

---

## Deliverables

- Internal dependency boundary inspection
- Forbidden pre-activation dependency coverage
- Deferred Home Assistant dependency documentation
- Sprint documentation

---

## Implementation

Added internal dependency boundary checks that keep concrete Renderer, Runtime,
Theme and Home Assistant websocket coupling out of the package before
activation.

---

## Public API

No public Home Assistant APIs were added.

---

## Validation

- `pnpm --filter @atlas/homeassistant check`
- `pnpm --filter @atlas/homeassistant test`
- `pnpm check`
- `pnpm build`
- `pnpm test`
- `git diff --check`

---

## Status

Completed.

---

## Next Sprint

G2.5.100 - Home Assistant Public API Closure Review
