# ATLAS Documentation

Welcome to the official documentation of the **ATLAS Framework**.

This documentation is organized by topic rather than by implementation order. Each section focuses on a specific aspect of the framework and is intended to remain maintainable as the project evolves.

---

# Documentation Structure

The documentation is divided into several sections.

## Architecture Decision Records (ADR)

Location:

```text
docs/adr/
```

Contains all Architecture Decision Records (ADRs).

ADRs document significant architectural decisions, their motivation, alternatives, and consequences.

Start here if you want to understand **why** the framework is designed the way it is.

---

## Project Documentation

Location:

```text
docs/project/
```

Contains long-term project specifications and architectural reference documents.

Examples include:

* Configuration philosophy
* Manifest specification
* Dependency rules
* Genesis specification
* Master schema

These documents describe stable project concepts rather than implementation details.

---

## Sprint Documentation

Location:

```text
docs/sprints/
```

Contains the implementation history of the project.

Each sprint documents:

* objectives
* completed work
* implementation notes
* architectural changes

Sprint documentation explains **how** the project evolved over time.

---

## Release Documentation

Location:

```text
docs/releases/
```

Contains official release information.

Examples include:

* Release Notes
* Release Manifest
* Release-specific documentation

---

# Repository Documentation

Several important project documents are located in the repository root.

| Document             | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `README.md`          | Project introduction                        |
| `ATLAS.md`           | Project constitution and guiding principles |
| `ROADMAP.md`         | Long-term project roadmap                   |
| `CHANGELOG.md`       | Official change history                     |
| `CONTRIBUTING.md`    | Contribution guidelines                     |
| `CODE_OF_CONDUCT.md` | Community standards                         |
| `SECURITY.md`        | Security policy                             |

---

# Documentation Principles

ATLAS documentation follows several principles:

* Documentation is part of the implementation.
* Every important architectural decision should be documented.
* Documentation should explain **why**, not only **how**.
* Documentation should remain stable as the project evolves.
* Architecture documentation takes precedence over implementation details.

---

# Recommended Reading Order

For new contributors:

1. `README.md`
2. `ATLAS.md`
3. `ROADMAP.md`
4. `CONTRIBUTING.md`
5. `docs/adr/`
6. `docs/project/`
7. `docs/sprints/`

For framework users:

1. `README.md`
2. Release Notes
3. Architecture documentation (as needed)

For framework maintainers:

Read the complete documentation.

---

# Architecture First

ATLAS follows an architecture-first approach.

Significant architectural changes should be documented before implementation whenever practical.

Architecture Decision Records (ADRs) serve as the primary source of truth for architectural evolution.

---

# Living Documentation

This documentation evolves together with the framework.

As ATLAS grows, new documents may be added, existing documents refined, and obsolete material archived or removed.

The goal is to keep the documentation accurate, structured, and useful for both contributors and users.

---

# Documentation Quality

Good documentation should be:

* Accurate
* Complete
* Understandable
* Consistent
* Maintainable

Documentation is considered a first-class part of the ATLAS Framework and is maintained with the same care as the source code.
