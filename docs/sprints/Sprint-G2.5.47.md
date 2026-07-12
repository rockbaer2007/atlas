# Sprint G2.5.47 - Renderer Adapter Conflict Readiness

## Goal

Define Renderer adapter conflict contracts before policy behavior.

---

## Deliverables

- Renderer adapter conflict contract
- Renderer adapter conflict creation helper
- Renderer adapter conflict contract tests
- Sprint documentation

---

## Implementation

Added `RendererAdapterConflict` and `createRendererAdapterConflict` to describe
duplicate-name adapter groups.

The conflict helper copies the source adapter array so later source mutations
do not change the conflict contract.

---

## Public API

Added Renderer adapter conflict exports:

- `RendererAdapterConflict`
- `createRendererAdapterConflict`

---

## Boundary

Renderer adapter conflicts are descriptive only. Renderer does not yet define
conflict detection, conflict resolution policies, platform mounting, Home
Assistant cards, device targets or theme resolution.

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

G2.5.48 - Renderer Adapter Conflict Review

Suggested focus:

- Review Renderer adapter conflict package-root exports
- Add empty conflict adapter coverage
- Document conflict readiness before policy behavior
