# Sprint G2.5.3

# Foundation Alignment

> The foundation should say the same thing from every doorway.

---

## Status

**Completed**

---

## Snapshot

No release snapshot.

---

# Goal

Align package documentation, roadmap status and build output configuration for
the ATLAS foundation phase.

Foundation Alignment reduces ambiguity around which packages are active,
planned or deferred, and makes package build behavior match package manifests.

---

# Objectives

- Align package README files
- Clarify package status across the workspace
- Align package TypeScript output with `dist` manifests
- Document build artifact policy
- Update roadmap foundation/runtime boundaries
- Keep legacy generated artifact cleanup out of scope

---

# Completed

## Package Documentation

- `@atlas/foundation` marked as the active foundation package
- Planned package purposes documented
- Build output documented for all package READMEs

---

## Build Configuration

The following packages now compile source files from `src` into `dist`:

- `@atlas/core`
- `@atlas/devtools`
- `@atlas/homeassistant`
- `@atlas/renderer`
- `@atlas/runtime`
- `@atlas/theme`

`@atlas/foundation` already used the aligned output structure.

---

## Project Policy

- Build artifact policy added
- Project documentation index updated
- Roadmap adjusted so event infrastructure belongs to the foundation phase

---

# Architecture Decisions

Package manifests already point to `dist`.

Therefore package TypeScript configurations should emit compiled JavaScript and
declaration files to `dist` instead of writing generated files into `src`.

Legacy tracked generated artifacts were not removed in this sprint. They should
be cleaned up in a focused maintenance sprint after confirming consumer impact.

---

# Quality

Completed successfully.

- Type Check
- Build
- Unit Tests
- Diff whitespace check

---

# Deliverables

- Package README alignment
- Package TypeScript output alignment
- `docs/project/BUILD_ARTIFACTS.md`
- Roadmap alignment
- Sprint documentation

---

# Statistics

| Item | Value |
|------|------:|
| Package READMEs Updated | 7 |
| Package tsconfig Files Updated | 6 |
| Policy Documents Added | 1 |
| Package API Changes | 0 |
| Runtime Changes | 0 |

---

# Motto

> The packages now point in the same direction.

---

# Next Sprint

## G2.5.4 - Artifact Cleanup

Suggested focus:

- Remove tracked generated files from `src`
- Remove tracked TypeScript build metadata
- Review tracked `dist` artifacts
- Confirm package output remains reproducible from source

---

(c) ATLAS Framework
