# ATLAS Framework

# Sprint History

This directory contains the complete development history of the ATLAS Framework.

Each sprint documents the goals, architectural decisions, implementation work,
quality validation and the delivered results.

---

## Sprint Timeline

| Sprint | Codename | Status | Snapshot |
|---------|----------|--------|----------|
| G2.5.1a | Foundation Cleanup | Completed | S0001 |
| G2.5.1b | Event Infrastructure | Completed | - |
| G2.5.1b-R1 | Architecture Cleanup | Completed | - |
| G2.5.1b-R2 | Heartbeat | Completed | S0002 |
| G2.5.2 | Project Identity | Completed | - |
| G2.5.3 | Foundation Alignment | Completed | - |
| G2.5.4 | Artifact Cleanup | Completed | - |
| G2.5.5 | Source Boundary Review | Completed | - |
| G2.5.6 | Kernel Workspace Decision | Completed | - |
| G2.5.7 | Kernel API Validation | Completed | - |
| G2.5.8 | Runtime Integration Readiness | Completed | - |
| G2.5.9 | Runtime Service Composition | Completed | - |
| G2.5.10 | Runtime Module Activation | Completed | - |
| G2.5.11 | Runtime Module Dependencies | Completed | - |
| G2.5.12 | Runtime Module Shutdown | Completed | - |
| G2.5.13 | Runtime Module Versioning | Completed | - |
| G2.5.14 | Runtime Module Observability | Completed | - |
| G2.5.15 | Runtime Configuration | Completed | - |
| G2.5.16 | Runtime Health Reporting | Completed | - |
| G2.5.17 | Runtime Diagnostics Reports | Completed | - |
| G2.5.18 | Runtime Event Diagnostics | Completed | - |
| G2.5.19 | Runtime Event Semantics | Completed | - |
| G2.5.20 | Runtime API Review | Completed | - |
| G2.5.21 | Core Integration Readiness | Completed | - |
| G2.5.22 | Core Runtime Diagnostics | Completed | - |
| G2.5.23 | Core Runtime Lifecycle | Completed | - |
| G2.5.24 | Core Runtime Events | Completed | - |
| G2.5.25 | Core API Review | Completed | - |
| G2.5.26 | Integration Package Readiness | Completed | - |
| G2.5.27 | Renderer Activation Readiness | Completed | - |
| G2.5.28 | Renderer API Review | Completed | - |
| G2.5.29 | Renderer Pipeline Boundary | Completed | - |
| G2.5.30 | Renderer Pipeline Review | Completed | - |
| G2.5.31 | Renderer Pipeline Execution Readiness | Completed | - |
| G2.5.32 | Renderer Pipeline Execution Review | Completed | - |
| G2.5.33 | Renderer Output Boundary | Completed | - |
| G2.5.34 | Renderer Output Review | Completed | - |
| G2.5.35 | Renderer Target Boundary | Completed | - |
| G2.5.36 | Renderer Target Review | Completed | - |
| G2.5.37 | Renderer Mounting Readiness | Completed | - |
| G2.5.38 | Renderer Mounting Review | Completed | - |
| G2.5.39 | Renderer Adapter Readiness | Completed | - |
| G2.5.40 | Renderer Adapter Review | Completed | - |
| G2.5.41 | Renderer Adapter Registry Readiness | Completed | - |
| G2.5.42 | Renderer Adapter Registry Review | Completed | - |
| G2.5.43 | Renderer Adapter Lookup Readiness | Completed | - |
| G2.5.44 | Renderer Adapter Lookup Review | Completed | - |
| G2.5.45 | Renderer Adapter Registry Search Readiness | Planned | - |

---

# Completed Sprints

## G2.5.1a - Foundation Cleanup

Initial cleanup of the repository and package architecture.

Snapshot

**S0001**

---

## G2.5.1b - Event Infrastructure

Started the implementation of the ATLAS event system.

Highlights

- Initial contracts
- Architecture exploration
- EventBus concept

---

## G2.5.1b-R1 - Architecture Cleanup

Focused on simplifying the event architecture.

Highlights

- Removed unnecessary abstractions
- Simplified package layout
- Prepared Heartbeat

---

## G2.5.1b-R2 - Heartbeat

First production-ready Event Infrastructure.

Highlights

- Event contracts
- Default EventBus
- Event subscriptions
- Unit tests
- ADR documentation
- Package documentation

Snapshot

**S0002**

---

## G2.5.2 - Project Identity

Established the public repository identity and contributor entry points.

Highlights

- ATLAS project identity
- Root README refresh
- Sprint index
- Snapshot index
- GitHub issue templates
- Pull request template

---

## G2.5.3 - Foundation Alignment

Aligned package documentation, roadmap status and build output configuration.

Highlights

- Package README alignment
- Package TypeScript output alignment
- Build artifact policy
- Roadmap foundation/runtime boundary cleanup

---

## G2.5.4 - Artifact Cleanup

Removed generated build artifacts from version control.

Highlights

- Removed generated files from `src`
- Removed tracked TypeScript build metadata
- Removed tracked `dist` output
- Confirmed build reproducibility

---

## G2.5.5 - Source Boundary Review

Documented the current public source boundaries.

Highlights

- Confirmed `@atlas/foundation` as the active public workspace package
- Confirmed six planned packages remain intentionally empty
- Recorded that `packages/kernel` is reference source, not a workspace package
- Corrected package documentation that implied a public Foundation EventBus

---

## G2.5.6 - Kernel Workspace Decision

Promoted the historical kernel source to an active workspace package.

Highlights

- Added `@atlas/kernel` package metadata and build configuration
- Added the kernel package to workspace checks, builds and tests
- Published kernel contracts, containers, DI, modules and event contracts
- Kept EventBus implementations internal

---

## G2.5.7 - Kernel API Validation

Validated the kernel package surface and published the standard EventBus.

Highlights

- Added a package-root API test
- Published `DefaultEventBus` from `@atlas/kernel`
- Preserved subscriptions and handler storage as internal details
- Updated source-boundary documentation

---

## G2.5.8 - Runtime Integration Readiness

Established the first Runtime API on top of Foundation and Kernel.

Highlights

- Added `RuntimeHost` lifecycle implementation
- Published runtime lifecycle events through the Kernel EventBus
- Added consumer-level runtime integration tests
- Updated dependency and package-boundary documentation

---

## G2.5.9 - Runtime Service Composition

Established RuntimeHost ownership of the Kernel service container.

Highlights

- Aligned the concrete Kernel container with its public contract
- Registered the application and EventBus under stable runtime service keys
- Added service composition tests to the Runtime lifecycle suite

---

## G2.5.10 - Runtime Module Activation

Connected registered Kernel modules to the RuntimeHost lifecycle.

Highlights

- Added Runtime module registrations and module lifecycle events
- Initialized modules once in registration order
- Preserved an initialized host state when module activation fails

---

## G2.5.11 - Runtime Module Dependencies

Resolved module dependency graphs before Runtime activation.

Highlights

- Implemented Kernel dependency ordering and cycle detection
- Activated dependencies before their dependents
- Rejected missing required and cyclic dependencies
- Allowed missing optional dependencies

---

## G2.5.12 - Runtime Module Shutdown

Added terminal module shutdown to Runtime disposal.

Highlights

- Added optional module stop and dispose capabilities
- Shut down initialized modules in reverse dependency order
- Kept Runtime stop restart-safe
- Preserved a stopped host when terminal shutdown fails

---

## G2.5.13 - Runtime Module Versioning

Validated module dependency versions before Runtime activation.

Highlights

- Added exact, caret and wildcard version requirements
- Applied SemVer-compatible caret rules, including pre-1.0 minors
- Rejected incompatible required and present optional dependencies

---

## G2.5.14 - Runtime Module Observability

Exposed module lifecycle diagnostics from RuntimeHost.

Highlights

- Added registered, initialized, stopped, disposed and failed module statuses
- Recorded module lifecycle timestamps and durations
- Preserved activation and shutdown error messages in public snapshots

---

## G2.5.15 - Runtime Configuration

Added public RuntimeHost configuration contracts and validation.

Highlights

- Added object-based RuntimeHost configuration
- Preserved the existing positional constructor
- Validated application identity and version configuration
- Validated module manifests and dependency declarations before startup

---

## G2.5.16 - Runtime Health Reporting

Promoted Runtime module diagnostics into host-level health reporting.

Highlights

- Added Runtime health states
- Added module health reports
- Added RuntimeHost health summary aggregation
- Covered healthy, degraded and failed health states with tests

---

## G2.5.17 - Runtime Diagnostics Reports

Adapted Runtime health into Foundation diagnostic reports.

Highlights

- Added Runtime diagnostic issue codes
- Added `RuntimeHost.diagnostics`
- Mapped degraded modules to warning issues
- Mapped failed modules to error issues

---

## G2.5.18 - Runtime Event Diagnostics

Published diagnostic events when Runtime health changes.

Highlights

- Added `runtime.diagnostics.changed`
- Added diagnostic event payload contract
- Published degraded, healthy and failed health transitions
- Covered health transition events with tests

---

## G2.5.19 - Runtime Event Semantics

Clarified Runtime lifecycle and diagnostic event semantics.

Highlights

- Kept module registration synchronous
- Removed hidden asynchronous diagnostic events from registration
- Documented diagnostic events as awaited lifecycle signals
- Added startup event ordering tests

---

## G2.5.20 - Runtime API Review

Reviewed and protected the public Runtime API before Core integration.

Highlights

- Added package-root API contract tests
- Covered Runtime value exports
- Covered Runtime type exports
- Reordered Runtime barrel exports for readability

---

## G2.5.21 - Core Integration Readiness

Activated Core as a thin integration layer above Runtime.

Highlights

- Added Core dependency on Runtime
- Added `createCoreRuntimeHost`
- Added Core Runtime host type aliases
- Added Core package-root API contract test

---

## G2.5.22 - Core Runtime Diagnostics

Exposed Runtime diagnostics through the Core package boundary.

Highlights

- Added `inspectCoreRuntimeHost`
- Added Core diagnostics type aliases
- Covered healthy and degraded Runtime diagnostics through Core
- Documented Runtime diagnostic ownership behind the Core boundary

---

## G2.5.23 - Core Runtime Lifecycle

Exposed Runtime lifecycle transitions through the Core package boundary.

Highlights

- Added `transitionCoreRuntimeHost`
- Added Core lifecycle action, state and result types
- Covered Core start, stop and dispose transitions
- Documented Runtime lifecycle ownership behind the Core boundary

---

## G2.5.24 - Core Runtime Events

Exposed Runtime event subscriptions through the Core package boundary.

Highlights

- Added `subscribeToCoreRuntimeEvent`
- Added Core event type aliases
- Covered Runtime event delivery through Core
- Covered disposable Core Runtime event subscriptions
- Documented Runtime and Kernel event ownership behind the Core boundary

---

## G2.5.25 - Core API Review

Reviewed and protected the Core package-root API before integration packages.

Highlights

- Added Core package-root value export coverage
- Added Core package-root type export coverage
- Confirmed Core host, diagnostics, lifecycle and event helpers from the root
- Preserved Core as a thin framework-level boundary above Runtime

---

## G2.5.26 - Integration Package Readiness

Reviewed planned integration package boundaries and dependency direction above
Core.

Highlights

- Added integration package readiness specification
- Confirmed planned integration packages remain empty placeholders
- Documented future dependency direction from integrations to Core
- Identified `@atlas/renderer` as the next likely activation candidate

---

## G2.5.27 - Renderer Activation Readiness

Activated Renderer as the first integration package above Core.

Highlights

- Added Renderer dependency on Core
- Added `createRendererHostContext`
- Added Renderer host context type
- Added Renderer package-root API contract tests
- Updated integration readiness and dependency documentation

---

## G2.5.28 - Renderer API Review

Reviewed and protected the Renderer package-root API before rendering pipeline
contracts.

Highlights

- Added Renderer package-root value export coverage
- Added Renderer package-root type export coverage
- Confirmed Renderer host context is consumable from the package root
- Preserved Renderer as a thin integration boundary above Core

---

## G2.5.29 - Renderer Pipeline Boundary

Defined the first Renderer pipeline contract shape.

Highlights

- Added `RendererPipelineStage`
- Added `RendererPipelineStageResult`
- Added `RendererPipeline`
- Added `createRendererPipeline`
- Documented that Renderer does not yet own a rendering execution engine

---

## G2.5.30 - Renderer Pipeline Review

Reviewed and protected Renderer pipeline contracts before execution behavior.

Highlights

- Reviewed Renderer pipeline package-root exports
- Covered Renderer pipeline type usage through the package root
- Protected pipeline stage order from source-array mutation
- Documented Renderer pipeline readiness before execution contracts

---

## G2.5.31 - Renderer Pipeline Execution Readiness

Defined Renderer pipeline execution result shape and sequential execution
boundary.

Highlights

- Added `RendererPipelineExecutionResult`
- Added `executeRendererPipeline`
- Covered sequential execution order
- Covered incomplete aggregate execution results
- Documented that Renderer execution does not yet define component output

---

## G2.5.32 - Renderer Pipeline Execution Review

Reviewed and protected Renderer pipeline execution before output contracts.

Highlights

- Reviewed Renderer pipeline execution package-root exports
- Covered empty pipeline execution
- Covered awaited asynchronous pipeline stages
- Documented Renderer execution readiness before output contracts

---

## G2.5.33 - Renderer Output Boundary

Defined the first Renderer output contract shape before targets and theme.

Highlights

- Added `RendererOutputKind`
- Added `RendererOutput`
- Added `createRendererOutput`
- Covered target-independent output creation
- Documented that output is not yet bound to DOM, Home Assistant or theme

---

## G2.5.34 - Renderer Output Review

Reviewed and protected Renderer output contracts before target contracts.

Highlights

- Reviewed Renderer output package-root exports
- Covered Renderer output without optional content
- Covered current output kinds
- Documented Renderer output readiness before target contracts

---

## G2.5.35 - Renderer Target Boundary

Defined the first Renderer target contract shape before mounting behavior.

Highlights

- Added `RendererTargetKind`
- Added `RendererTarget`
- Added `createRendererTarget`
- Covered target-independent target creation
- Documented that targets do not yet mount output

---

## G2.5.36 - Renderer Target Review

Reviewed and protected Renderer target contracts before mounting behavior.

Highlights

- Reviewed Renderer target package-root exports
- Covered Renderer targets without optional identifiers
- Covered current target kinds
- Documented Renderer target readiness before mounting contracts

---

## G2.5.37 - Renderer Mounting Readiness

Defined Renderer mount request and result contracts before platform adapters.

Highlights

- Added `RendererMountRequest`
- Added `RendererMountResult`
- Added `createRendererMountRequest`
- Added `createRendererMountResult`
- Covered output-to-target mount contract creation
- Documented that mount contracts do not yet perform platform mounting

---

## G2.5.38 - Renderer Mounting Review

Reviewed and protected Renderer mount contracts before adapter contracts.

Highlights

- Reviewed Renderer mount package-root exports
- Covered Renderer mount result copy behavior
- Covered current Renderer mount result states
- Documented Renderer mounting readiness before adapter contracts

---

## G2.5.39 - Renderer Adapter Readiness

Defined Renderer adapter contracts before concrete platform implementations.

Highlights

- Added `RendererAdapter`
- Added `RendererAdapterMountResult`
- Added `createRendererAdapter`
- Covered synchronous adapter mount contracts
- Covered asynchronous adapter mount contracts
- Documented adapter boundary before concrete platform implementations

---

## G2.5.40 - Renderer Adapter Review

Reviewed and protected Renderer adapter contracts before registration
contracts.

Highlights

- Reviewed Renderer adapter package-root exports
- Covered Renderer adapter name preservation
- Covered mount request delivery into adapter handlers
- Documented adapter readiness before registry contracts

---

## G2.5.41 - Renderer Adapter Registry Readiness

Defined Renderer adapter registry contracts before adapter lookup behavior.

Highlights

- Added `RendererAdapterRegistry`
- Added `createRendererAdapterRegistry`
- Covered ordered adapter registry creation
- Covered registry independence from source arrays
- Documented registry boundary before lookup behavior

---

## G2.5.42 - Renderer Adapter Registry Review

Reviewed and protected Renderer adapter registry contracts before lookup
behavior.

Highlights

- Reviewed Renderer adapter registry package-root exports
- Covered empty Renderer adapter registries
- Documented registry readiness before lookup behavior

---

## G2.5.43 - Renderer Adapter Lookup Readiness

Defined Renderer adapter lookup contracts before search behavior.

Highlights

- Added `RendererAdapterLookupRequest`
- Added `RendererAdapterLookupResult`
- Added `createRendererAdapterLookupRequest`
- Added `createRendererAdapterLookupResult`
- Covered lookup request and result contract creation
- Documented lookup boundary before registry search behavior

---

## G2.5.44 - Renderer Adapter Lookup Review

Reviewed and protected Renderer adapter lookup contracts before registry
search.

Highlights

- Reviewed Renderer adapter lookup package-root exports
- Confirmed lookup result miss coverage
- Covered lookup request copy behavior
- Covered lookup result copy behavior
- Documented lookup readiness before registry search behavior

---

# Planned Sprints

## G2.5.45 - Renderer Adapter Registry Search Readiness

Planned deliverables

- Define Renderer adapter registry search helper
- Add adapter search hit and miss tests
- Document search boundary before conflict resolution behavior

---

## Sprint Philosophy

Every sprint should provide:

- a clearly defined goal
- documented architectural decisions
- successful type checks
- successful builds
- successful tests
- release documentation

Only then is a sprint considered complete.

---

(c) ATLAS Framework
