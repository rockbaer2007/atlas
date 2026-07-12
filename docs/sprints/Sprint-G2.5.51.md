# Sprint G2.5.51 - Renderer Adapter Conflict Resolution Readiness

## Goal

Define Renderer adapter conflict resolution result contracts before selection
policies.

---

## Deliverables

- Renderer adapter conflict resolution result contract
- Renderer unresolved conflict resolution coverage
- Renderer explicit adapter resolution coverage
- Sprint documentation

---

## Implementation

Added `RendererAdapterConflictResolution` and
`createRendererAdapterConflictResolution` to describe the outcome of a Renderer
adapter conflict resolution step.

The result contract can describe unresolved conflicts and explicit adapter
resolutions. The helper copies the embedded conflict contract so later source
array mutations do not change the resolution shape.

---

## Public API

Added Renderer adapter conflict resolution exports:

- `RendererAdapterConflictResolution`
- `createRendererAdapterConflictResolution`

---

## Boundary

Renderer adapter conflict resolution contracts are descriptive only. Renderer
does not yet define automatic selection policies, preference rules, platform
mounting, Home Assistant cards, device targets or theme resolution.

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

G2.5.52 - Renderer Adapter Conflict Resolution Review

Suggested focus:

- Review Renderer adapter conflict resolution package-root exports
- Add conflict resolution copy behavior coverage
- Document resolution readiness before selection policies
