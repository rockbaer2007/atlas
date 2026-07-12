# @atlas/renderer

Renderer package for future rendering pipeline and component output
infrastructure.

---

# Status

Active rendering integration package.

Renderer is the first integration package above `@atlas/core`. It provides a
small package-root API for creating a renderer host context from a Core Runtime
host, defining ordered renderer pipeline stages and executing those stages
sequentially. It also defines a first output shape without binding output to a
target, DOM, Home Assistant surface or theme model yet. Renderer targets are
descriptive only and do not mount output yet.

---

# Public API

`@atlas/renderer` exports:

- `RendererHostContext`
- `RendererAdapter`
- `RendererAdapterConflict`
- `RendererAdapterLookupRequest`
- `RendererAdapterLookupResult`
- `RendererAdapterMountResult`
- `RendererAdapterRegistry`
- `RendererMountRequest`
- `RendererMountResult`
- `RendererOutput`
- `RendererOutputKind`
- `RendererPipeline`
- `RendererPipelineExecutionResult`
- `RendererPipelineStage`
- `RendererPipelineStageResult`
- `RendererTarget`
- `RendererTargetKind`
- `createRendererAdapter`
- `createRendererAdapterConflict`
- `createRendererAdapterLookupRequest`
- `createRendererAdapterLookupResult`
- `createRendererAdapterRegistry`
- `createRendererHostContext`
- `createRendererMountRequest`
- `createRendererMountResult`
- `createRendererOutput`
- `createRendererPipeline`
- `createRendererTarget`
- `executeRendererPipeline`
- `findRendererAdapter`
- `findRendererAdapterConflicts`

Renderer currently depends on `@atlas/core` and keeps its public surface compact
while rendering contracts are defined. The package-root value and type surface
is protected by public API contract tests. Pipeline creation preserves the
ordered stage boundary without linking the resulting pipeline to later source
array mutations. Pipeline execution runs stages sequentially and reports their
stage results without defining component output or theme resolution. Empty
pipelines complete successfully, and asynchronous stages are awaited before the
next stage runs. Renderer output currently captures output kind, name and
optional string content only. Output content is optional, and the current output
kinds are `fragment` and `document`. Renderer targets currently capture target
kind, name and optional identifier only. Target identifiers are optional, and
the current target kinds are `memory` and `surface`. Renderer mount contracts
currently describe output-to-target requests and mount results without platform
adapters, DOM references, Home Assistant surfaces or side effects. Mount
results currently report only whether the output is mounted, together with the
output and target contract shapes. Renderer adapters currently describe a named
mount contract that can return a mount result synchronously or asynchronously.
Adapter names are preserved for future registration, and adapter mount handlers
receive Renderer mount request contracts directly. No adapter registry or
concrete platform implementation is defined yet. Renderer adapter registries
currently capture an ordered adapter list without lookup, conflict resolution or
platform execution behavior. Empty adapter registries are supported as a valid
contract state before adapter discovery is introduced. Renderer adapter lookup
contracts currently describe lookup requests and results without executing
registry search, adapter selection or conflict resolution behavior. Lookup
requests and results are stable contract shapes, and lookup results may describe
matched or missing adapters. Renderer adapter registry search currently finds
the first adapter with a matching name and reports misses without conflict
resolution or adapter selection policies. Duplicate adapter names currently
resolve to the first matching adapter in registry order. Renderer adapter
conflicts currently describe duplicate-name adapter groups without enforcing a
resolution policy. Empty conflict adapter groups are supported as a valid
contract state before Renderer defines conflict detection behavior. Renderer
adapter conflict detection now reports duplicate-name adapter groups from a
registry without selecting, reordering or resolving those adapters.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
