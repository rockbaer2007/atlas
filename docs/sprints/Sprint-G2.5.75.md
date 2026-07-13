# Sprint G2.5.75 - Renderer Platform Adapter Conflict Readiness

## Goal

Define Renderer platform adapter conflict contracts before detection behavior.

---

## Deliverables

- Renderer platform adapter conflict contract
- Renderer platform adapter conflict creation helper
- Platform adapter conflict boundary tests
- Sprint documentation

---

## Implementation

Added `RendererPlatformAdapterConflict` to describe duplicate-platform adapter
groups at the Renderer contract boundary.

Conflict creation copies the platform adapter list so later source-array
mutations do not alter the produced conflict.

---

## Public API

Added Renderer platform adapter conflict exports:

- `RendererPlatformAdapterConflict`
- `createRendererPlatformAdapterConflict`

---

## Boundary

Platform adapter conflicts remain contract-only behavior. Renderer does not yet
detect platform adapter conflicts, select platform adapters, resolve conflicts,
perform DOM mounting or define Home Assistant card integration behavior.

---

## Validation

- `pnpm --filter @atlas/renderer check`
- `pnpm --filter @atlas/renderer test`
- `pnpm check`
- `pnpm build`
- `pnpm test`
- `git diff --check`

---

## Status

Completed.

---

## Next Sprint

G2.5.76 - Renderer Platform Adapter Conflict Review

Suggested focus:

- Review Renderer platform adapter conflict package-root exports
- Cover empty platform adapter conflict groups
- Document platform adapter conflict readiness before detection behavior
