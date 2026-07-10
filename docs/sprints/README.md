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
| G2.5.12 | Runtime Module Shutdown | Planned | - |

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

# Planned Sprints

## G2.5.12 - Runtime Module Shutdown

Planned deliverables

- Define module shutdown and disposal contracts
- Stop initialized modules in reverse dependency order
- Add shutdown and disposal failure-path tests

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
