# ATLAS Framework

ATLAS is a modular TypeScript framework for building extensible, reliable and
well-structured application systems.

The project is developed with a strong focus on architecture, stability,
maintainability and long-term evolution.

---

# Project Identity

ATLAS is not intended to grow by accidental feature accumulation.

Every package, public contract and architectural decision should serve a clear
purpose and fit into the larger framework model.

The project values:

* Stable public APIs
* Explicit package boundaries
* Small and understandable abstractions
* Strong typing
* Documentation alongside implementation
* Testable behavior
* Long-term maintainability

---

# Architecture Principles

## Contracts First

Public contracts define the long-term shape of the framework.

Implementations may evolve, but public APIs should be introduced carefully and
documented clearly.

## Package Boundaries

Packages should depend only in approved directions.

Circular dependencies are not allowed.

## Simplicity

ATLAS favors small, explicit components over broad abstractions.

Features should be introduced when they solve a real framework need.

## Documentation

Architecture decisions, sprint outcomes, releases and public APIs should be
documented as part of the normal development process.

## Quality Gates

A change is not considered complete until the relevant quality gates pass:

* Type checking
* Build
* Tests
* Documentation review
* Architecture review when required

---

# Development Model

ATLAS is developed through focused sprints.

Each sprint should define:

* A clear goal
* Expected deliverables
* Architectural decisions
* Quality validation
* Release or snapshot documentation when applicable

Completed sprint history is maintained in `docs/sprints`.

Release manifests and release notes are maintained in `docs/releases`.

---

# Governance

Significant architectural changes should be documented through Architecture
Decision Records.

Contributors should follow:

* `CONTRIBUTING.md`
* `CODE_OF_CONDUCT.md`
* `SECURITY.md`
* ADRs in `docs/adr`
* Project specifications in `docs/project`

---

# Current Focus

Current release line:

**0.2.x Foundation**

Current project focus:

**Foundation Architecture**

The foundation phase establishes the contracts, package boundaries, diagnostics,
registry, lifecycle and governance model required for the later runtime,
rendering, theme and integration layers. The kernel package provides the next
public layer for service composition, modules and event contracts.

---

# Long-Term Direction

ATLAS is expected to evolve toward:

* Runtime services
* Dependency injection
* Module activation
* Rendering infrastructure
* Theme system
* Home Assistant integration
* Plugin ecosystem
* Developer tooling

The roadmap is maintained in `ROADMAP.md`.

---

© ATLAS Framework
