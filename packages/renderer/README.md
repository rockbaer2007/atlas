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
- `RendererAdapterConflictResolution`
- `RendererAdapterLookupRequest`
- `RendererAdapterLookupResult`
- `RendererAdapterMountResult`
- `RendererAdapterRegistry`
- `RendererAdapterSelectionRequest`
- `RendererAdapterSelectionResult`
- `RendererMountRequest`
- `RendererMountResult`
- `RendererMountDiagnosticCodes`
- `RendererMountDiagnosticReport`
- `RendererOutput`
- `RendererOutputKind`
- `RendererPipeline`
- `RendererPipelineExecutionResult`
- `RendererPlatformAdapter`
- `RendererPlatformAdapterConflict`
- `RendererPlatformAdapterConflictResolution`
- `RendererPlatformAdapterLookupRequest`
- `RendererPlatformAdapterLookupResult`
- `RendererPlatformAdapterRegistry`
- `RendererPlatformAdapterSelectionRequest`
- `RendererPlatformAdapterSelectionResult`
- `RendererPipelineStage`
- `RendererPipelineStageResult`
- `RendererTarget`
- `RendererTargetKind`
- `createRendererAdapter`
- `createRendererAdapterConflict`
- `createRendererAdapterConflictResolution`
- `createRendererAdapterLookupRequest`
- `createRendererAdapterLookupResult`
- `createRendererAdapterRegistry`
- `createRendererAdapterSelectionRequest`
- `createRendererAdapterSelectionResult`
- `createRendererHostContext`
- `createRendererMountRequest`
- `createRendererMountResult`
- `createRendererOutput`
- `createRendererPipeline`
- `createRendererPlatformAdapter`
- `createRendererPlatformAdapterConflict`
- `createRendererPlatformAdapterConflictResolution`
- `createRendererPlatformAdapterLookupRequest`
- `createRendererPlatformAdapterLookupResult`
- `createRendererPlatformAdapterRegistry`
- `createRendererPlatformAdapterSelectionRequest`
- `createRendererPlatformAdapterSelectionResult`
- `createRendererTarget`
- `executeRendererPipeline`
- `findRendererAdapter`
- `findRendererAdapterConflicts`
- `findRendererPlatformAdapter`
- `findRendererPlatformAdapterConflicts`
- `inspectRendererMountResult`
- `mountResolvedRendererAdapter`
- `mountResolvedRendererPlatformAdapter`
- `resolveRendererAdapterConflictWithFirstCandidate`
- `resolveRendererAdapterRegistryConflictsWithFirstCandidate`
- `resolveRendererPlatformAdapterConflictWithFirstCandidate`
- `resolveRendererPlatformAdapterRegistryConflictsWithFirstCandidate`
- `selectFirstRendererAdapterCandidate`
- `selectFirstRendererPlatformAdapterCandidate`

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
registry without selecting, reordering or resolving those adapters. Empty
registries do not produce conflict reports. Renderer adapter conflict
resolution contracts can describe unresolved conflicts or explicitly selected
adapters, and resolution creation protects embedded conflict adapter lists from
later source-array mutations. Renderer adapter selection contracts describe
candidate adapter selection requests and selected or unselected results without
automatic conflict policies. Empty selection candidate lists are supported as a
valid request state before policy helpers exist. Renderer now includes an
explicit first-candidate selection helper that selects the first available
candidate or reports an unselected result without resolving conflicts
automatically. First-candidate selection preserves candidate request order and
remains disconnected from conflict integration. Renderer adapter conflicts can
now be resolved through first-candidate selection, while registry lookup,
platform mounting, Home Assistant cards, device targets and theme resolution
remain outside this integration boundary. Conflict integration preserves
conflict copy boundaries so later source-array mutations do not alter produced
resolutions. Renderer adapter registry conflicts can now be resolved through
first-candidate selection without executing platform mounting or changing
registry lookup behavior. Registry conflict resolutions preserve duplicate
conflict order from registry insertion order. Resolved adapter choices can now
drive guarded mount execution, while unresolved choices return an unmounted
result without invoking an adapter. Resolved adapter mounting supports
asynchronous adapter mount handlers before platform-specific adapters exist.
Rejected resolved adapter mounts return unmounted results with optional error
messages. Non-Error adapter mount rejections are stringified for stable failure
reporting. Renderer mount failures can now be inspected as Foundation-compatible
diagnostic reports without introducing platform-specific diagnostics. Successful
Renderer mount results now produce empty successful diagnostic reports, keeping
the diagnostics contract ready for future platform adapters. Renderer platform
adapter contracts now describe platform metadata, the underlying Renderer
adapter and declared capabilities without introducing concrete DOM, Home
Assistant card or device integration behavior. Platform adapter capability
lists are copied at creation time, and empty capability lists remain a valid
contract state before concrete platform integrations exist. Renderer platform
adapter registries now capture ordered platform adapter lists without lookup,
selection, conflict handling or concrete integration execution. Empty platform
adapter registries are supported through the package root before platform
adapter lookup behavior is introduced. Renderer platform adapter lookup
contracts now describe platform lookup requests and matched or missing platform
adapter results without executing registry search. Platform adapter lookup
requests and results are protected through package-root copy behavior before
registry search is introduced. Renderer platform adapter registry search now
finds the first platform adapter with a matching platform and reports misses
without selection, conflict handling or concrete platform execution. Platform
adapter search is protected through the package root and remains first-match
behavior before conflict handling exists. Renderer platform adapter conflicts
now describe duplicate-platform adapter groups without detecting or resolving
those conflicts automatically. Empty platform adapter conflict groups are
supported through the package root and remain copy-protected before conflict
detection behavior exists. Renderer platform adapter conflict detection now
reports duplicate-platform adapter groups from registries without selecting or
resolving those adapters. Unique and empty platform adapter registries are
protected through the package root as no-conflict states before resolution
behavior exists. Renderer platform adapter conflict resolution contracts can now
describe unresolved conflicts or explicitly selected platform adapters without
defining selection policies. Platform adapter conflict resolution review
protects package-root exports and embedded conflict copy behavior before
selection policies exist. Renderer platform adapter selection contracts now
describe platform-specific candidate selection requests and selected or
unselected platform adapter results without automatic conflict policies. Empty
platform adapter selection candidate lists are supported as a valid request
state before policy helpers exist.
Renderer platform adapter first-candidate selection now selects the first
available platform adapter candidate or reports an unselected result without
resolving conflicts automatically. Platform adapter selection policy review
protects candidate order before conflict integration exists.
Renderer platform adapter conflicts can now be resolved through first-candidate
selection, while concrete mounting, Home Assistant cards, device targets and
theme resolution remain outside this integration boundary. Platform adapter
conflict integration preserves conflict copy boundaries so later source-array
mutations do not alter produced resolutions.
Renderer platform adapter registry conflicts can now be resolved through
first-candidate selection without executing concrete mounting or changing
registry lookup behavior. Registry conflict resolutions preserve duplicate
platform conflict order from registry insertion order.
Resolved platform adapter choices can now drive guarded mount execution through
their underlying Renderer adapter, while unresolved choices return an unmounted
result without invoking an adapter. Resolved platform adapter mounting supports
asynchronous adapter mount handlers before concrete integrations exist.
Rejected resolved platform adapter mounts return unmounted results with optional
error messages. Non-Error platform adapter mount rejections are stringified for
stable failure reporting.
Platform adapter mount failures can now be inspected as Foundation-compatible
diagnostic reports without introducing concrete platform diagnostics.
Successful platform adapter mount results now produce empty successful
diagnostic reports, keeping diagnostics ready for concrete integrations.
Renderer platform adapter contracts remain metadata-driven before concrete
integrations; platform names and capability lists do not trigger special DOM or
Home Assistant behavior inside Renderer.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
