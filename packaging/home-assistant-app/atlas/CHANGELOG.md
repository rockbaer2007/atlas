# Changelog

## 0.1.22

- Keep the detected Home Assistant entities table collapsed by default in both
  Simple and Expert mode.

## 0.1.21

- Use ATLAS example entities as a Simple card export fallback when no entities
  are selected.
- Keep the editor input unchanged and show an export status hint when fallback
  entities are inserted.

## 0.1.20

- Add sortable table headers to the detected Home Assistant entities table.
- Sort detected entities by type/source and then entity by default.
- Allow toggling ascending and descending order for entity, state and
  type/source columns.

## 0.1.19

- Rename the entity picker section to "Entities for the card" / "Entitaeten
  fuer die Card".
- Rename the lower entity list to "Entities detected in HA" / "In HA erkannte
  Entitaeten".
- Show detected Home Assistant entities as a compact table with a separate
  action column.

## 0.1.18

- Tune the Expert card-list favorite checkbox in dark mode with a green field
  and light ATLAS green check color.

## 0.1.17

- Tune the Card Editor Expert dark theme so the card list, selected entities
  and editor grid use a light grey working surface.
- Style Expert mode dropdowns and action buttons with ATLAS green and neutral
  dark controls.

## 0.1.16

- Add the Home Assistant App/Add-on `editor_start_mode` option for Simple or
  Expert Card Editor startup.
- Pass the selected editor start mode from the Home Assistant options through
  Administration into the Card Editor handoff and saved connection settings.
- Improve Card Editor dark theme styling for controls, resource hints, entity
  selection and Home Assistant card preview surfaces.

## 0.1.15

- Rename the Administration launch button from Card Editor to Plugin Hub.
- Open the Plugin Hub from Administration in the same browser surface.
- Treat Home Assistant App/Add-on connection values as option-managed and show
  the Home Assistant URL, token and connection checkboxes as read-only controls.

## 0.1.14

- Add the shared ATLAS light/dark/auto theme switch to the Card Editor.
- Persist the Card Editor theme choice through the same `atlas.themePreference`
  key used by Administration and the Plugin Hub.
- Add dark-mode surface styling for the Card Editor when embedded in Home
  Assistant.

## 0.1.13

- Add a real light/dark/auto theme switch to ATLAS Administration.
- Persist the shared ATLAS theme preference so the Plugin Hub follows the same
  selected mode.
- Add dark ATLAS colors for Administration and Plugin Hub testing in Home
  Assistant.

## 0.1.12

- Add an Atlas-branded repository dialog with URL entry, source type selection,
  repository preview and final confirmation.
- Use the orange ATLAS accent for repository add and planned install actions.

## 0.1.11

- Replace the single repository URL preview with a managed custom repository
  list similar to the Home Assistant/HACS custom repository workflow.
- Add repository type selection, refresh and remove controls.
- Preserve older single repository URL settings by migrating them into the new
  repository list.

## 0.1.10

- Add ATLAS start behavior for plugin counts: zero active plugins show the hub,
  one active plugin opens directly and multiple active plugins show the hub.
- Point Home Assistant ingress at the ATLAS app server so the plugin start
  decision can run before opening a plugin.

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
