# Sprint G2.5.9263 - Accept A2 and retire Simple mode (A3)

2026-10-13. Documentation/product decision only; runtime stays at HA 0.1.291
and reference Card Editor 0.2.0-alpha.99.

The user closes A2: the current behavior is accepted as working as intended.
Remove A2 from the open roadmap. Retain the actual evidence boundaries:
amd64 HA runs in a Proxmox VM, ARM64 runs on a physical Pi 5 with 8 GB RAM,
Android tablet checks are user-reported, Apple/other device simulations use
Chrome. No real iOS/Safari test is claimed; this is no longer an A2 blocker.
The Docker browser run for 0.1.291 was blocked by container startup; local
isolated UI checks passed as recorded in G2.5.9262.

The user retires Simple mode entirely from the product. Source inspection
confirms the current editor starts as Expert and renderEditorMode forces Expert;
the Simple mode switch is already absent. Do not reintroduce it. Preserve
supported legacy import APIs/data so existing projects remain readable.
Update conflicting AGENTS.md requirements and public DE/EN/FR documentation.
Remove A3 from the open roadmap; A5 (production readiness) is next.

Validation: public documentation build and diff checks. No executable change,
package/version bump or HA deployment is needed for this acceptance decision.
