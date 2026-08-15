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

## CLI

Export all automations:

```powershell
dotnet run --project tools\ha-automation-exporter\HaAutomationExporter.csproj -- C:\path\automations.yaml C:\path\export
```

Export only matching automations:

```powershell
dotnet run --project tools\ha-automation-exporter\HaAutomationExporter.csproj -- C:\path\automations.yaml C:\path\export pool
```
