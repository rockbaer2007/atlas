# Sprint G2.5.9267 - A5 recovery after longer network outages

2026-10-13. HA app 0.1.294 / HA package alpha.82 / reference editor alpha.101.

Before editing, create a Git bundle and fresh native Pi/VM Admin exports in
`C:/Users/rockb/source/backups/atlas-a5-plugins-20261013`; preserve the user-owned
roadmaps. The encrypted local HA backups from Sprint 9266 remain available.

The isolated A5 browser test rejects WebSocket upgrades for eight seconds.
Before the fix it fails: the editor stops after three retries and does not
recover when the endpoint returns. Continue closed-connection retries with
linear backoff capped at 30 seconds. Keep the connection signature during
network recovery, reset the retry count on connection, and cancel retries on
authentication/protocol failure. A close following rejected authentication
must not start another request with the same rejected credential.

Translate retry progress in DE/EN/FR without the obsolete three-attempt limit.
Existing Admin credentials, project formats and plugin settings are unchanged.
The new isolated checks confirm long-outage recovery, a single rejected-auth
attempt followed by a stop, recovery after reload with valid test credentials,
100 preserved fields, 2001 mock entities and 150 live updates. Use the DOM
lifecycle state and active subscription marker for language-independent waits;
the previous English-only selector cannot verify a French reload.

Validation: 162 HA tests, workspace build, JavaScript syntax check and isolated
A5 checks pass. The final isolated run measures 288 ms load, 999-1045 ms short
reconnects and 10131 ms for an eight-second outage plus retry backoff. These
are mock/desktop timings. Native LAN interruption verification is prepared
separately, with the user offering to disconnect/reconnect the Pi cable only
after a start signal. Do not claim that native check before it occurs.
