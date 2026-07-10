# Sprint G2.5.4

# Artifact Cleanup

> Build output should prove the source, not pretend to be the source.

---

## Status

**Completed**

---

## Snapshot

No release snapshot.

---

# Goal

Remove generated build artifacts from version control and confirm that package
outputs remain reproducible from source.

Artifact Cleanup completes the build-output alignment started in G2.5.3.

---

# Objectives

- Remove tracked generated JavaScript files from `src`
- Remove tracked generated declaration files from `src`
- Remove tracked TypeScript build metadata
- Remove tracked `dist` build outputs
- Confirm package outputs are reproducible through the build pipeline
- Keep source files, package manifests and public contracts unchanged

---

# Completed

## Removed From Version Control

- Generated `src/**/*.js`
- Generated `src/**/*.d.ts`
- `tsconfig.tsbuildinfo`
- Generated `dist/**/*.js`
- Generated `dist/**/*.d.ts`

---

## Preserved

- TypeScript source files
- Package manifests
- Package README files
- Project documentation
- Tests

---

## Reproducibility

The workspace build recreates ignored package output locally.

Generated output is no longer part of the repository source state.

---

# Architecture Decisions

ATLAS treats TypeScript source files as the authoritative package source.

Compiled JavaScript, declaration files and TypeScript incremental build metadata
are generated artifacts. They should be produced by the build pipeline rather
than maintained manually in version control.

---

# Quality

Completed successfully.

- Build
- Type Check
- Unit Tests
- Diff whitespace check
- Tracked artifact scan

---

# Deliverables

- Generated artifact removal
- Build artifact policy update
- Sprint documentation
- Sprint index updates
- Changelog update

---

# Statistics

| Item | Value |
|------|------:|
| Package API Changes | 0 |
| Runtime Changes | 0 |
| Source Files Removed | 0 |
| Generated Artifact Categories Removed | 5 |

---

# Motto

> The repository now carries source, not residue.

---

# Next Sprint

## G2.5.5 - Source Boundary Review

Suggested focus:

- Review package source boundaries
- Confirm public exports match intended package roles
- Identify placeholder packages that should remain empty
- Prepare the next foundation architecture step

---

(c) ATLAS Framework
