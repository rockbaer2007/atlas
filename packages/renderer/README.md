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
- `RendererOutput`
- `RendererOutputKind`
- `RendererPipeline`
- `RendererPipelineExecutionResult`
- `RendererPipelineStage`
- `RendererPipelineStageResult`
- `RendererTarget`
- `RendererTargetKind`
- `createRendererHostContext`
- `createRendererOutput`
- `createRendererPipeline`
- `createRendererTarget`
- `executeRendererPipeline`

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
the current target kinds are `memory` and `surface`.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
