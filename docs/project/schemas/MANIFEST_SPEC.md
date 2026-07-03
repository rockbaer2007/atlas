# Atlas Manifest Specification

The file `atlas.manifest.json` is the single source of truth.

Managed sections:
- framework
- architecture
- packages
- quality
- release

Future tooling (atlas-cli) reads this file to:
- generate dashboards
- validate repository structure
- calculate release readiness
- produce dependency graphs
