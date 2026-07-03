# Contributing to ATLAS

First of all, thank you for your interest in contributing to ATLAS.

ATLAS is built around long-term architectural stability, maintainability, and developer experience. Every contribution—whether it is code, documentation, testing, or discussion—is highly appreciated.

This document describes how we collaborate and how contributions should be prepared.

---

# Project Philosophy

ATLAS is developed with a long-term perspective.

The primary goal is **not** to add features as quickly as possible, but to build a framework that remains maintainable for many years.

Every contribution should improve at least one of the following:

* Architecture
* Stability
* Maintainability
* Developer Experience
* Documentation
* Testability

---

# Before You Start

Before implementing a larger change, please:

* Search existing issues and discussions.
* Review relevant Architecture Decision Records (ADRs).
* Discuss major ideas before implementation.
* Avoid large, unexpected pull requests.

Architectural changes should always be discussed before implementation.

---

# Contribution Workflow

ATLAS follows a structured development process.

```text
Issue / Discussion
        ↓
Architecture Review
        ↓
ADR (if required)
        ↓
Implementation
        ↓
Tests
        ↓
Documentation
        ↓
Pull Request
        ↓
Review
        ↓
Merge
```

The architecture always comes before implementation.

---

# Architecture Rules

The following rules are mandatory.

## Public API First

Every public API becomes part of the long-term contract.

Public APIs should be carefully designed before implementation.

---

## Internal APIs

Internal implementation details may evolve freely.

Avoid exposing internal components unless absolutely necessary.

---

## Package Boundaries

Package dependency rules must never be violated.

Dependency direction is enforced by architecture.

Circular dependencies are not allowed.

---

## Contracts Before Implementations

Interfaces and contracts should be defined before concrete implementations.

Implementation should depend on contracts—not the other way around.

---

## ADR First

Significant architectural decisions require an Architecture Decision Record (ADR).

Implementation should follow documented architectural decisions.

---

# Coding Standards

Contributors should aim for:

* Readable code
* Small functions
* Clear naming
* Explicit behavior
* Minimal complexity
* Strong typing
* Consistent formatting

Avoid clever code.

Prefer understandable code.

---

# Documentation

Documentation is part of every contribution.

When behavior changes, documentation should be updated as well.

Documentation includes:

* API documentation
* ADRs
* Guides
* Examples
* Release notes
* Changelog

---

# Testing

Every functional change should include appropriate tests.

Contributors should verify:

* Build succeeds
* Tests pass
* Existing behavior remains compatible

New functionality should include corresponding test coverage whenever practical.

---

# Pull Requests

Pull requests should be:

* Small
* Focused
* Well described
* Easy to review

Large pull requests are difficult to review and should be avoided whenever possible.

---

# Commit Messages

ATLAS follows the Conventional Commits specification.

Examples:

```text
feat(runtime): add DefaultEventBus

fix(events): resolve event ordering

docs(adr): add event pipeline decision

refactor(core): simplify registry

test(runtime): improve event bus coverage

chore(repo): repository cleanup
```

---

# Code Review

Every contribution should be reviewed with attention to:

* Architecture
* Public APIs
* Package boundaries
* Maintainability
* Documentation
* Tests

Correctness alone is not sufficient.

Architectural quality is equally important.

---

# Quality Gates

A contribution is considered ready when:

* The project builds successfully.
* All tests pass.
* Documentation is updated.
* Public APIs are reviewed.
* Package boundaries remain valid.
* Architecture rules are respected.

---

# Communication

Please communicate respectfully and constructively.

Questions and discussions are always welcome.

Good technical discussions improve the project.

---

# Thank You

Every contribution helps improve ATLAS.

Whether you contribute code, documentation, testing, bug reports, or ideas, your time and effort are greatly appreciated.

Together we can build a framework that remains robust, maintainable, and enjoyable to work with for many years.
