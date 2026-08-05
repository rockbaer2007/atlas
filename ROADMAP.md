# ATLAS Roadmap

> Strategic development roadmap for the ATLAS Framework.

---

# Purpose

This roadmap outlines the long-term direction of the ATLAS Framework.

Unlike sprint planning, the roadmap focuses on product evolution, architectural milestones, and major capabilities rather than individual implementation tasks.

The roadmap is a living document and may evolve as the project matures.

---

# Current Status

Current Release:

**0.2.0-alpha.1**

Current Focus:

**Post-G2.5 Stabilization**

The G2.5 sprint ledger is complete. The next roadmap movement should focus on
concrete renderer usage and product-facing integration scenarios rather than
additional envelope-only contract expansion.

---

# Development Phases

## 0.2 – Foundation

**Status:** 🚧 In Progress

### Objectives

* Establish the foundation package.
* Build the core architecture.
* Define architectural contracts.
* Introduce diagnostics.
* Implement the registry system.
* Define lifecycle infrastructure.
* Build the event infrastructure.
* Align package documentation and build outputs.
* Establish architecture governance.
* Complete repository cleanup.

### Success Criteria

* Stable project architecture
* Complete documentation
* Architecture validation
* Stable public contracts

---

## 0.3 – Runtime

**Status:** 🚧 In Progress

### Objectives

* Event Pipeline
* Runtime Services
* Service Container
* Dependency Injection
* Bootstrap Process
* Module Activation
* Application lifecycle host

### Success Criteria

* Fully operational runtime
* Stable runtime APIs
* Complete lifecycle support

---

## 0.4 – Rendering

**Status:** 📅 Planned

### Objectives

* Rendering engine
* Rendering pipeline
* Virtual component model
* Layout integration
* Performance optimizations

### Success Criteria

* Production-ready rendering pipeline

---

## 0.5 – Theme System

**Status:** 📅 Planned

### Objectives

* Theme engine
* Design tokens
* Dynamic themes
* CSS variable generation
* Theme inheritance

### Success Criteria

* Flexible and extensible theme architecture

---

## 0.6 – Home Assistant Integration

**Status:** 📅 Planned

### Objectives

* Home Assistant runtime
* Dashboard integration
* Dual deployment model for self-hosted ATLAS server and HACS/Home Assistant frontend integration
* Card infrastructure
* Selectable card targets for built-in Entities, Mushroom and Bubble Card
* Selectable simple, horizontal-stack and vertical-stack card layouts for Mushroom and Bubble Card exports
* Bubble Card dependency hints for the case-sensitive HACS resource `/hacsfiles/Bubble-Card/bubble-card.js`
* HACS-installable custom card export path
* Drag-and-drop card layout editor with user-defined card names
* Simple editor mode for fast button stacks
* Expert editor mode with a free layout surface and per-field card target selection
* Dependency planning for mixed Expert editor fields using Entities, Bubble Card and Mushroom Template together
* Projection from Simple and Expert editor plans into exportable Home Assistant card configurations
* Nested Expert layout projection with row-based horizontal stacks, page-level vertical stacks and per-field stack mode
* Nested Home Assistant stack import for real-world vertical-stack and horizontal-stack combinations
* Import support for Home Assistant grid and conditional cards as nested editor containers
* Import support for hand-built Bubble switch columns and empty-column cards
* Advanced Bubble Card option preservation for modules, styles, grid options, sliders and sub-buttons
* Template sidebar for visual Button, Switch, State, Entity, vertical-stack and horizontal-stack building blocks
* Drag-and-drop from the Expert sidebar palette into the editor surface
* Simple/Expert editor mode switch in the status demo
* Movable Expert editor field tiles on a bounded layout surface
* Home Assistant-like visible 12-column Expert editor grid with a larger editing surface
* Per-sidebar-template column and row sizing controls, including full width and auto height
* Unified default template footprint for Entity, State, Switch, horizontal-stack and vertical-stack blocks
* Sidebar availability hints from Home Assistant Lovelace resources for installed custom card families
* Grid-bounded placement for selected templates on the Expert editor surface
* Evaluate `studiobts/home-assistant-card-builder` as an AGPL-3.0 external reference without copying source code into ATLAS
* Plan import/export interoperability with external card-builder artifacts through documented schemas and explicit attribution
* Pre-import artifact inspection for ATLAS packages, raw Home Assistant cards and external card-builder-shaped files
* Import decisions for supported, review-required and rejected Home Assistant card artifacts
* Compatibility review items for external card-builder-shaped artifacts before schema mapping
* Mapping preview from external visual blocks to ATLAS editor templates before enabling import
* Reviewed field preview for mapped external blocks on the ATLAS Expert editor surface
* Status demo import guard for supported, review-required and rejected HA-card artifacts
* Status demo Expert editor preview using shared templates and bounded grid placement
* Home Assistant Card Editor as the first official ATLAS reference plugin
* User-defined HACS card script filenames such as `energy-kitchen.js` instead of only `atlas-card.js`
* HACS card package defaults with demo entities and a clear hint to replace them with real Home Assistant entities
* In-Home-Assistant entity picker for installed ATLAS cards
* Lovelace UV Card follow-up project for UV index, protection status, thresholds and visual Home Assistant dashboard output
* Maybe / decision later: evaluate a parcel-tracking Home Assistant integration inspired by `TA2k/ioBroker.parcel`, including a possible Node.js bridge or Home Assistant add-on that hands normalized parcel data to a Python integration
* Entity abstraction
* Service integration

### Success Criteria

* Native Home Assistant support

---

## 0.7 – Plugin Ecosystem

**Status:** 📅 Planned

### Objectives

* Plugin runtime
* Plugin discovery
* Home Assistant Card Editor reference plugin using Runtime plugin contracts and Plugin Catalog discovery
* Extension API
* Provider ecosystem
* Third-party integrations
* Dedicated plugin documentation for authoring, lifecycle, extension APIs, examples, and publishing guidance
* Atlas Administration web surface for plugin management, plugin creation, import/export, and installable package generation

### Success Criteria

* Stable plugin architecture
* First reference plugin proves plugin lifecycle, discovery, administration and package export
* Separate plugin documentation is available and maintained
* Plugins can be managed and packaged through an administration UI

---

## 0.8 – Developer Experience

**Status:** 📅 Planned

### Objectives

* CLI
* Project templates
* Code generators
* Documentation generator
* Architecture validator
* Development tools

### Success Criteria

* Excellent developer experience

---

## 1.0 – Stable Release

**Status:** 📅 Future

### Objectives

* Stable public APIs
* Complete documentation
* Fully tested framework
* Long-term support
* Community readiness

### Success Criteria

* Production-ready framework
* Stable extension model
* Complete API documentation
* Long-term maintenance strategy

---

# Long-Term Vision

Beyond version 1.0, ATLAS will continue evolving while preserving architectural stability.

Future development focuses on:

* Additional platform integrations
* Performance improvements
* Extended tooling
* Advanced rendering capabilities
* Community-driven extensions
* Enterprise-grade scalability

---

# Guiding Principles

Every milestone should improve at least one of the following:

* Architecture
* Stability
* Performance
* Extensibility
* Developer Experience
* Documentation
* Testability
* Maintainability

Feature count is never the primary success metric.

Long-term quality always takes precedence over short-term functionality.

---

# Living Document

This roadmap intentionally avoids implementation details and sprint planning.

Detailed implementation work is tracked separately through:

* Sprint documentation
* Architecture Decision Records (ADRs)
* Release Notes
* Changelog

This document describes where ATLAS is going—not how each milestone is implemented.
