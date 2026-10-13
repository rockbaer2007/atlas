# Sprint G2.5.9264 - Remove Simple from app configuration

2026-10-13. HA app 0.1.292; reference editor remains 0.2.0-alpha.99.

Remove editor_start_mode from HA options/schema, so there is no obsolete mode
selector. The launcher uses Expert regardless of an old options.json value.
Remove the visible Administration selector in all locales; keep an internal
hidden Expert field for the existing settings serialization contract.
Browser/server normalization maps old Simple preferences to Expert without
changing credentials or other fields. When no HA environment settings exist,
the server still returns no initial configuration; do not override encrypted
browser-restored credentials with an empty default connection.

Build and syntax checks pass. Two packaging tests and 469-file parity pass.
The HA Docker image builds successfully. An isolated browser with fake old
Simple preferences verifies DE/EN/FR, preserved URL, token/provider-key restore,
remember/auto-connect flags, repositories, theme and active plugin IDs through
save/reload. Server PUT/GET maps Simple to Expert. No real user settings are
changed. Extend the full E2E legacy fixture to cover Simple -> Expert.
Update and build DE/EN/FR documentation. Real Supervisor update of the removed
option is not tested on the user's Pi in this increment.

Full Docker E2E is again blocked before container creation by a hanging docker
run client. Stop only that owned client; no existing container is stopped.
The focused local migration/UI and server checks above pass instead.
