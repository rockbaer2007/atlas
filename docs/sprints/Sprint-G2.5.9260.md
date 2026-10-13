# Sprint G2.5.9260 - Document tested hardware variants

2026-10-13. Documentation only; no runtime or package version changes.

The user clarifies the real test installations: amd64 runs as a Home Assistant
VM on Proxmox, and ARM64 runs on a physical Raspberry Pi 5 with 8 GB RAM.
Add a matching hardware table to the public DE/EN/FR development-status pages.
Keep the existing test scope and open checks explicit; this clarification does
not imply that every feature or physical mobile interaction was tested.

Validation: public documentation build and git diff checks. Existing settings,
projects, plugins and user-owned files remain unchanged.
