# Home Assistant Automation Exporter

Windows tool for splitting a Home Assistant `automations.yaml` file into one
YAML file per automation.

## Windows UI

Run the exporter without arguments:

```powershell
dotnet run --project tools\ha-automation-exporter\HaAutomationExporter.csproj
```

Choose the source `automations.yaml`, choose an export folder, then use the
search field to filter the visible automations. The search matches alias, ID,
generated file name and YAML content, so terms such as `pool` can find
automations by entity IDs or templates as well.

Only checked rows in the currently visible result list are exported.
Use `Export im Explorer öffnen` to open the configured export folder directly
in Windows Explorer.

## Home Assistant import

Current exports write import-friendly single automation YAML files. The exporter
removes the leading top-level `id:` line, writes the top-level keys as
`trigger`, `condition` and `action`, converts `- trigger: ...` entries to
`- platform: ...`, and writes service calls as `- service: domain.service`.
This format is intended for pasting into Home Assistant's automation YAML
editor when creating a new automation.

## GitHub and open source YAML examples

Home Assistant automation examples from GitHub, forums and other open source
projects may use different YAML spellings depending on the Home Assistant
version they were created with. For example, some files use top-level
`trigger`, `condition` and `action`, while newer UI-generated exports may use
`triggers`, `conditions` and `actions`.

The exporter accepts these version differences in the source `automations.yaml`
and normalizes the exported single automation files automatically for the
current import target. That means old or mixed YAML entries do not need to be
edited manually before export just because the Home Assistant schema spelling
changed between versions.

If you exported automations with an older version of this tool and Home
Assistant reports an import error, open the affected YAML file, delete the first
line when it starts with `id:`, rename the top-level `triggers`, `conditions`
and `actions` keys to `trigger`, `condition` and `action`, change trigger list
items such as `- trigger: state` to `- platform: state`, and change service
steps such as `- action: switch.turn_on` to `- service: switch.turn_on`.

## CLI

Export all automations:

```powershell
dotnet run --project tools\ha-automation-exporter\HaAutomationExporter.csproj -- C:\path\automations.yaml C:\path\export
```

Export only matching automations:

```powershell
dotnet run --project tools\ha-automation-exporter\HaAutomationExporter.csproj -- C:\path\automations.yaml C:\path\export pool
```
