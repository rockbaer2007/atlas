# @atlas/core

Core package for ATLAS framework-level contracts and shared public entry
points.

---

# Status

Active core integration package.

`@atlas/core` is the first framework-level entry point above Runtime. It
provides a package-root API for creating a Runtime host through Core without
requiring consumers to deep-import Runtime internals. It also exposes a small
Core-level diagnostics helper that reads Runtime health and diagnostic reports
without moving diagnostic ownership out of Runtime. Core also provides a
minimal lifecycle transition helper over Runtime host lifecycle methods and a
typed event subscription helper for Runtime host events.

Core diagnostics remain a read-through boundary over Runtime. `inspectCoreRuntimeHost`
does not cache, normalize or reclassify Runtime health, diagnostic context or
issues; Runtime remains the source of truth for diagnostic reports.

---

# Public API

`@atlas/core` exports:

- `CoreRuntimeHost`
- `CoreRuntimeHostConfiguration`
- `CoreRuntimeHealthReport`
- `CoreRuntimeDiagnosticReport`
- `CoreRuntimeDiagnostics`
- `CoreRuntimeEvent`
- `CoreRuntimeEventType`
- `CoreRuntimeEventSubscription`
- `CoreRuntimeEventHandler`
- `CoreRuntimeLifecycleAction`
- `CoreRuntimeLifecycleState`
- `CoreRuntimeLifecycleResult`
- `createCoreRuntimeHost`
- `inspectCoreRuntimeHost`
- `subscribeToCoreRuntimeEvent`
- `transitionCoreRuntimeHost`

Core currently depends on `@atlas/runtime` and intentionally keeps its public
surface compact while higher-level Core concepts are defined. The package-root
value and type surface is protected by public API contract tests.

---

# Build Output

Compiled artifacts are emitted to `dist`.

Source files remain under `src`.
