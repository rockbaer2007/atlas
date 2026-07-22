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
- `RendererMountLifecycleRecord`
- `RendererMountLifecycleReport`
- `RendererMountLifecycleState`
- `RendererMountPlan`
- `RendererMountPlanExecution`
- `RendererMountPlanQualityGate`
- `RendererMountPlanReport`
- `RendererMountPlanStatus`
- `RendererMountPlanStrategy`
- `RendererMountReport`
- `RendererMountReportIssue`
- `RendererMountReportSummary`
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
- `createDefaultRendererMountPlan`
- `createRendererMountPlan`
- `createRendererMountReport`
- `createRendererMountRequest`
- `createRendererMountLifecycleRecord`
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
- `executeRendererMountPlan`
- `executeRendererPipeline`
- `findRendererAdapter`
- `findRendererAdapterConflicts`
- `findRendererPlatformAdapter`
- `findRendererPlatformAdapterConflicts`
- `inspectRendererMountLifecycleRecord`
- `inspectRendererMountPlan`
- `inspectRendererMountResult`
- `isRendererMountPlanReady`
- `mountResolvedRendererAdapter`
- `mountResolvedRendererPlatformAdapter`
- `recordRendererMountLifecycleExecution`
- `recordRendererMountLifecycleReport`
- `resolveRendererAdapterConflictWithFirstCandidate`
- `resolveRendererAdapterRegistryConflictsWithFirstCandidate`
- `resolveRendererPlatformAdapterConflictWithFirstCandidate`
- `resolveRendererPlatformAdapterRegistryConflictsWithFirstCandidate`
- `selectFirstRendererAdapterCandidate`
- `selectFirstRendererPlatformAdapterCandidate`
- `summarizeRendererMountReports`

Renderer currently depends on `@atlas/core` and keeps its public surface compact
while rendering contracts are defined. The package-root value and type surface
is protected by public API contract tests. Pipeline creation preserves the
ordered stage boundary without linking the resulting pipeline to later source
array mutations. Pipeline execution runs stages sequentially and reports their
stage results without defining component output or theme resolution. Empty
pipelines complete successfully, and asynchronous stages are awaited before the
next stage runs. Pipeline execution passes the same Renderer host context to
every stage, preserves stage result objects in completion order and rejects on
stage failures without running later stages. Renderer output currently captures
output kind, name and optional string content only. Output content is optional,
explicit empty content is preserved, and the current output kinds are
`fragment` and `document`. Outputs remain independent from targets, mounts,
adapters, platforms and render functions. Renderer targets currently capture
target kind, name and optional identifier only. Target identifiers are optional,
explicit empty identifiers are preserved, and the current target kinds are
`memory` and `surface`. Targets remain independent from outputs, adapters,
platforms and concrete surface elements. Renderer mount contracts currently
describe output-to-target requests and mount results without platform adapters,
DOM references, Home Assistant surfaces or side effects. Mount requests and
results keep references to existing output and target objects. Mount results
currently report only whether the output is mounted, together with the output
and target contract shapes, and optional explicit failure messages. Successful
mount results do not include failure messages. Renderer adapters currently
describe a named mount contract that can return a mount result synchronously or
asynchronously. Adapter creation preserves mount handler references and remains
limited to name and mount contracts without platform, capability or registry
metadata. Adapter names are preserved for future registration, including
explicit empty names, and adapter mount handlers receive Renderer mount request
contracts directly while preserving output and target references in returned
mount results. Adapter mount results remain independent from adapter metadata.
Renderer adapter registries currently capture an ordered adapter list without
platform execution behavior. Empty adapter registries are supported as a valid
contract state before concrete adapter discovery is introduced. Registry
creation preserves adapter references and insertion order while protecting the
registry from later source-array mutations. Renderer adapter lookup contracts
currently describe lookup requests and results without executing adapter
selection or conflict resolution behavior. Lookup requests and results are
stable contract shapes, and lookup results may describe matched or missing
adapters while preserving matched adapter references. Renderer adapter registry
search currently finds the first adapter with a matching name and reports misses
without conflict resolution or adapter selection policies. Duplicate adapter
names currently resolve to the first matching adapter in registry order.
Renderer adapter conflicts currently describe duplicate-name adapter groups
without enforcing a resolution policy. Conflict creation preserves adapter
references, copies conflict adapter lists and preserves explicit empty conflict
names. Empty conflict adapter groups are supported as a valid contract state.
Renderer adapter conflict detection reports duplicate-name adapter groups from a
registry without selecting, reordering or resolving those adapters. Multiple
conflict groups follow first-duplicate registry order, while unique and empty
registries do not produce conflict reports. Renderer adapter conflict
resolution contracts can describe unresolved conflicts or explicitly selected
adapters, and resolution creation protects embedded conflict adapter lists from
later source-array mutations. Unresolved resolutions omit adapter fields.
First-candidate conflict resolution selects adapter references without invoking
mount handlers. Guarded mount execution invokes only resolved adapter choices;
unresolved resolutions return unmounted results, preserve request output and
target references, and do not invoke adapters even when an adapter field is
present. Rejected resolved adapter mounts preserve request output and target
references while reporting optional error messages. Renderer adapter selection
contracts describe candidate adapter selection requests and selected or
unselected results without automatic conflict policies. Empty selection
candidate lists are supported as a valid request state before policy helpers
exist. Selection requests preserve candidate adapter references while protecting
candidate lists from source-array mutation. Selection names, including explicit
empty names, remain plain string data. Selection results preserve selected
adapter references and omit adapter fields when unselected. Renderer now
includes an explicit first-candidate selection helper that selects the first
available candidate by reference or reports an unselected result without
resolving conflicts automatically. First-candidate selection preserves
candidate request order, does not invoke mount handlers and remains
disconnected from conflict integration. Renderer adapter conflicts can
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
Assistant card or device integration behavior. Platform adapter creation
remains limited to platform, adapter and capabilities fields, preserves the
underlying adapter reference, preserves explicit empty platform names and copies
capability lists at creation time. Empty capability lists remain a valid
contract state before concrete platform integrations exist. Renderer platform
adapter registries now capture ordered platform adapter lists without selection,
conflict handling or concrete integration execution. Empty platform adapter
registries are supported through the package root. Registry creation preserves
platform adapter references and insertion order while protecting registry lists
from later source-array mutation. Renderer platform adapter lookup contracts
now describe platform lookup requests and matched or missing platform adapter
results without executing selection or conflict resolution behavior. Platform
adapter lookup requests and results are protected through package-root copy
behavior, preserve explicit empty platform names and preserve matched platform
adapter references. Renderer platform adapter registry search now finds the
first platform adapter with a matching platform and reports misses without
selection, conflict handling or concrete platform execution. Missing lookup
results omit platformAdapter fields, and duplicate platform matches resolve to
the first registry entry. Platform adapter search is protected through the
package root and remains first-match behavior before conflict handling exists.
Renderer platform adapter conflicts now describe duplicate-platform adapter
groups without detecting or resolving those conflicts automatically. Empty
platform adapter conflict groups and explicit empty platform names are supported
through the package root, conflict lists remain copy-protected, and conflict
entries preserve their platform adapter references. Renderer platform adapter
conflict detection now reports duplicate-platform adapter groups from
registries without selecting, resolving or mounting those adapters. Multiple
conflict groups follow first-duplicate registry order, and unique or empty
platform adapter registries remain no-conflict states. Renderer platform
adapter conflict resolution contracts can now describe unresolved conflicts or
explicitly selected platform adapters without defining selection policies.
Unresolved resolutions omit platformAdapter fields, resolved resolutions
preserve selected platform adapter references, and embedded conflict lists stay
copy-protected. Renderer platform adapter selection contracts now describe
platform-specific candidate selection requests and selected or unselected
platform adapter results without automatic conflict policies. Selection requests
preserve platform adapter candidate references while protecting candidate lists
from source-array mutation. Empty platform adapter selection candidate lists are
supported as a valid request state, and explicit empty platform names remain
request data without normalization. Selection results preserve selected platform
adapter references, omit platformAdapter fields for unselected results and keep
explicit empty platform names as result data.
Renderer platform adapter first-candidate selection now selects the first
available platform adapter candidate or reports an unselected result without
resolving conflicts automatically. Platform adapter selection policy review
protects candidate order and confirms selection does not invoke platform
adapter mount handlers before conflict integration or guarded mounting.
Renderer platform adapter conflicts can now be resolved through first-candidate
selection without invoking selected platform adapter mount handlers, while
concrete mounting, Home Assistant cards, device targets and theme resolution
remain outside this integration boundary. Platform adapter conflict integration
preserves conflict copy boundaries so later source-array mutations do not alter
produced resolutions.
Renderer platform adapter registry conflicts can now be resolved through
first-candidate selection without executing concrete mounting or changing
registry lookup behavior. Registry conflict resolutions preserve duplicate
platform conflict order from registry insertion order.
Resolved platform adapter choices can now drive guarded mount execution through
their underlying Renderer adapter, while unresolved choices return an unmounted
result without invoking an adapter. Resolved platform adapter mounting supports
asynchronous adapter mount handlers before concrete integrations exist.
Unresolved guarded mount results preserve request output and target references
even if a platform adapter field is present on the resolution.
Rejected resolved platform adapter mounts return unmounted results with optional
error messages while preserving request output and target references. Non-Error
platform adapter mount rejections are stringified for stable failure reporting.
Platform adapter mount failures can now be inspected as Foundation-compatible
diagnostic reports without introducing concrete platform diagnostics. Failed
platform adapter mounts reuse the exported Renderer mount failure code, preserve
Error and string failure messages and report error severity. Successful platform
adapter mount results now produce empty successful diagnostic reports, and
unresolved guarded mount results without error messages remain successful
diagnostic reports. Platform adapter diagnostic reports stay at the
`renderer.mount` context, omit concrete platform metadata and are created as
independent report objects on each inspection, keeping diagnostics ready for
concrete integrations.
Renderer platform adapter contracts remain metadata-driven before concrete
integrations; platform names and capability lists do not trigger special DOM or
Home Assistant behavior inside Renderer. Home Assistant-style platform metadata
can move through platform adapter creation, registry storage, lookup, selection,
conflict resolution, guarded mounting and diagnostics as ordinary Renderer data.
Renderer does not export Home Assistant activation helpers, does not create
cards, dashboards or themes, and does not add concrete platform fields to mount
results or diagnostic reports.

Renderer mount planning describes the next output-to-target mounting capability
before concrete execution changes. Mount plans capture a request, strategy,
planned status and quality gates, copy quality gate lists away from caller-owned
arrays, report output and target names without executing adapter mount handlers,
and keep plans free of mounted state, adapter metadata, platform metadata, DOM
bindings, Home Assistant surfaces and Theme bindings.

Renderer mount plan execution can now route ready plans through existing
guarded adapter and platform-adapter resolution helpers. Manual plans remain
non-executing and return unmounted results, incomplete plans fail with stable
error messages, missing adapter resolutions are reported without invoking mount
handlers, and execution results remain ordinary `RendererMountResult` objects
without plan metadata, platform metadata, DOM bindings, Home Assistant surfaces
or Theme bindings.

Renderer mount lifecycle records now describe planned, executed and reported
mount work. Lifecycle records preserve plan, result and diagnostic report
references, can create reports from existing mount diagnostics, support
reporting before execution as a successful empty diagnostic state, and expose a
compact lifecycle inspection report without adding integration metadata, DOM
elements, Home Assistant fields or Theme fields.

Renderer mount reports now aggregate lifecycle records into compact reporting
shapes. Reports include plan strategy, output and target names, copied quality
gates, lifecycle flags, mounted status, diagnostics state and diagnostic issues.
Report summaries count planned, executed, reported, mounted, diagnostics-ok and
failed records without adding platform metadata, DOM elements, Home Assistant
fields or Theme fields.

Renderer host contexts remain thin references to Core Runtime hosts. Renderer
does not clone, wrap or reclassify Runtime state, diagnostics, events or
lifecycle behavior; pipelines receive the same Core Runtime host reference that
was used to create the context.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
