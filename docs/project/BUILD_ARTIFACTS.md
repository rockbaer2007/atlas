# Build Artifact Policy

This document defines how ATLAS handles generated package artifacts.

---

# Principle

Source code belongs in `src`.

Generated JavaScript, declaration files and TypeScript build metadata should not
be mixed into source directories.

---

# Package Output

Every package should compile to `dist`.

Required package `tsconfig.json` shape:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": [
    "src/**/*.ts"
  ]
}
```

Package manifests should point to the compiled output:

```json
{
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

---

# Tests

Tests are source-adjacent validation assets, not package build artifacts.

Package builds should compile package source files only.

Test execution is handled through the package test script.

---

# Tracked Artifacts

Generated artifacts should be reviewed before they are committed.

Tracked generated files from earlier development phases should be cleaned up in
a dedicated maintenance change so that the repository history remains easy to
review.

---

# Current Alignment

As of sprint G2.5.3, package TypeScript configurations are aligned to emit build
outputs to `dist`.

As of sprint G2.5.4, legacy generated files under `src`, tracked
`tsconfig.tsbuildinfo` files and tracked `dist` build outputs have been removed
from version control.

Build outputs remain reproducible from source with:

```sh
pnpm build
```

---

(c) ATLAS Framework
