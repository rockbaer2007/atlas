# Changelog

## 0.1.9

- Add the first ATLAS Plugin Hub surface with automatic plugin manifest and
  preview asset discovery.
- Package plugin manifest folders for Home Assistant App/Add-on testing.

## 0.1.8

- Resolve Card Editor Admin API requests against the current editor surface URL
  with a normalized trailing slash so Home Assistant ingress can load saved
  settings before auto-connect even when the ingress URL has no trailing slash.

## 0.1.7

- Use ingress-safe relative Card Editor Admin API paths so saved Add-on
  connection settings can load before auto-connect.

## 0.1.6

- Remove the static loopback Administration link from the Card Editor and route
  `/admin` to the current Home Assistant host on port `4175`.
- Derive Administration runtime metadata from the current host so visible links
  no longer fall back to `127.0.0.1` in Home Assistant.

## 0.1.5

- Derive the Card Editor "Open Atlas Administration" link from the current
  Home Assistant host so it opens the Administration surface on port `4175`.

## 0.1.4

- Keep the Administration "Open Card Editor" button on the current Home
  Assistant host instead of navigating to the fixed local loopback URL.

## 0.1.3

- Route Card Editor Admin API calls through the editor surface so Add-on option
  auto-connect works directly from Home Assistant ingress.

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
