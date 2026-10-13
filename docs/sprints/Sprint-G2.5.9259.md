# Sprint G2.5.9259 - Android tablet feedback and HA URL guidance

2026-10-13. Documentation only; runtime and HA package versions are unchanged.

## User-reported physical tablet checks

- Hub and Administration work in portrait/landscape and DE/EN/FR.
- The tablet cannot open http://homeassistant.local:80 and the editor reports
  WebSocket close code 1006. Windows Chrome still connects with the saved token
  and loads 27 live entities. Code inspection and direct assertions verify
  HTTP port 80, default WS port 80, IP URLs and preservation of explicit 8123.
- After using the reachable HA IP address, the user confirms connection success,
  plus YAML dialog and Problem report OK. No token replacement is needed.
- These tablet results are user confirmations, not agent-run device checks.
  Name resolution is the likely cause in this case; code 1006 alone is not a
  definitive diagnosis. No silent URL substitution or credential change is added.

## Documentation and remaining scope

Add DE/EN/FR connection guidance to the public HA pages: browser reachability,
IP fallback, valid port 80, default-port normalization, actual configured port,
HTTPS and unchanged credentials. Update public status and the ATLAS roadmap.
Touch drag/resize, virtual keyboards, native file/download dialogs and iOS
remain open. Preserve existing projects, settings and plugins.

Validation: public documentation build and git diff checks. No runtime changes
or package update, so no runtime rebuild or HA add-on repository sync is needed.
