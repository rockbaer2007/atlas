# Changelog

## 0.1.2

- Use a plain string schema for the Home Assistant token option so local
  Add-on configuration reloads do not pass a shortened password placeholder to
  ATLAS Administration.
- Ignore masked or implausibly short Add-on token values during startup.

## 0.1.1

- Add Home Assistant URL, token, token-import and auto-connect options.
- Pass Add-on connection options to ATLAS Administration during startup.
- Open the Card Editor through Add-on Ingress with ATLAS icon and logo assets.

## 0.1.0

- Add the first ATLAS Home Assistant App/Add-on packaging scaffold.
- Reuse the standalone ATLAS app runtime with Administration and Card Editor.
- Expose `/health` and `/app` for supervisor checks and preview status.
