
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
- devtools

`foundation` and `kernel` are active public workspace packages. Core, runtime,
renderer, theme, Home Assistant and devtools are reserved workspace packages
with empty public entry points.

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
- Default EventBus
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

The current public workspace boundaries are recorded in
`docs/project/SOURCE_BOUNDARIES.md`.

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

### Plugin Repository Template Path

- Create a public `atlas-plugin-repository-demo` repository for testing
  ATLAS repository installation, updates and removal.
- Use that demo repository as the reference layout for future plugin authors:
  `repository.json`, plugin package, manifest, icon, logo, preview image,
  README and compatibility metadata.
- Give every plugin its own function-specific icon and logo with a consistent
  ATLAS overlay, and show those assets in Administration, Plugin Hub and
  repository previews.
- Derive an official plugin template from the demo repository after the
  installation and update flow is stable.
- Add a later generator path that can create a new ATLAS plugin from the
  template with the correct folder structure and metadata.

### Planned Plugin: Automation Extractor

- Add the existing Windows automation extractor direction as an independent
  ATLAS plugin after File Studio has stable editing, saving and validation
  flows.
- Use File Studio as the adjacent file access surface, but keep the extractor
  as its own plugin so automation analysis, filtering and export can evolve
  independently from generic file editing.
- Start with scoped Home Assistant automation files such as
  `/config/automations.yaml`, packages and included automation fragments.
- Extract automation IDs, aliases, triggers, conditions, actions, referenced
  entities, scripts, scenes, helpers and notification targets.
- Show a structured automation overview with search, grouping, warnings and
  exportable summaries.
- Keep write operations out of the first extractor increment; begin read-only
  and add refactoring/splitting actions only after backup and validation flows
  are proven.

### Late Hub Expansion: External Home Assistant Surfaces

- Treat this as a late roadmap item after the core ATLAS App/Add-on, plugin
  repository workflow and first real plugins are stable.
- Let the Plugin Hub also act as an optional Home Assistant workspace for
  external web surfaces such as ESPHome Builder, ESPHome Designer,
  Zigbee2MQTT, ioBroker, FHEM, Button Builder and similar editor/tool pages.
- Start with manual entries that store a name, category, icon/logo, active
  state and a relative Home Assistant path such as `/5c53de3b_esphome`.
- Prefer relative Home Assistant paths over fixed IP URLs so entries keep
  working when the Home Assistant host or ingress route changes.
- Later add Home Assistant discovery for panels, add-on ingress routes and
  dashboards so ATLAS can suggest external tools automatically and the user
  only chooses which entries should appear in the Hub.
- Use Hub categories such as Editors, Automation/Devices and Dashboards/Panels
  to reduce clutter in the Home Assistant sidebar while keeping direct access
  inside ATLAS.
- After the main functionality is stable, replace placeholder plugin previews
  with real screenshots and reduce Hub preview media to roughly two thirds of
  the current height so the plugin overview stays compact.

## Long-term Goal

Atlas becomes a provider-based platform where integrations are plugins rather than core features.
