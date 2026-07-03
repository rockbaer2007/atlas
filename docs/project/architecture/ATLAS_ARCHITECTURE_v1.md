
# ATLAS Architecture v1.0
_Status: Draft_

## Vision
Atlas is a modular UI and runtime platform. Home Assistant is one provider among many.

## Core Principles
- Interface First
- Composition over Inheritance
- Immutable by Default
- Dependency Free Foundation
- Observability by Design
- API Stability

## Architecture Layers

### Layer 0 – Types
Branded types, value types, identifiers.

### Layer 1 – Capabilities
Observable, Diagnosable, Configurable, HealthCheckable, Validatable.

### Layer 2 – Contracts
Registry, Provider, Plugin, Service, Renderer.

### Layer 3 – Default Implementations
DefaultRegistry, DefaultProvider, DefaultContainer.

### Layer 4 – Diagnostics
Snapshots, Reports, Inspectors.

### Layer 5 – Telemetry
Counters, Timers, Gauges, Histograms.

## Packages

packages/
- foundation
- kernel
- core
- runtime
- renderer
- theme
- homeassistant
- cli
- devtools

## Foundation Domains

- identity
- lifecycle
- metadata
- result
- registry
- capabilities
- diagnostics
- telemetry
- validation
- collections
- context

## Kernel Responsibilities

- Dependency Injection
- Service Container
- Module Loader
- Event Bus
- Bootstrap
- Lifecycle Coordination

## Dependency Rules

Higher layers may depend only on lower layers.

Telemetry
↓
Diagnostics
↓
Default Implementations
↓
Contracts
↓
Capabilities
↓
Types

Never the opposite.

## Public API Rules

- No deep imports
- Barrel exports only
- Public APIs documented
- Semantic Versioning
- Deprecation before removal

## Quality Gates

Every merge must pass:
- pnpm check
- pnpm build
- pnpm test
- Strict TypeScript
- No circular dependencies

## Roadmap

### Phase G1
Complete Foundation

### Phase G2
Kernel

### Phase G3
Core Services

### Phase G4
Runtime

### Phase G5
Renderer

### Phase G6
Home Assistant Provider

### Phase G7
Developer Tools

## Long-term Goal

Atlas becomes a provider-based platform where integrations are plugins rather than core features.
