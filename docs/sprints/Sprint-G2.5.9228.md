# Sprint G2.5.9228 - Automation Exporter Editor Plugin Start

Goal:

Start the next ATLAS plugin as ATLAS Automation Exporter / Editor.

Implementation:

* Added an `automation-exporter-editor` plugin entry with manifest, icon,
  preview, README and first browser UI.
* Added source choices for system `automations.yaml` through the existing File
  Studio path and uploaded external YAML files.
* Added a first automation list with selection, details, entity/service
  extraction, export folder target and export history.
* Export filenames use `name_dd_mm_yy-hh_mm_ss.yaml`.
* Kept the first version conservative: it downloads selected YAML files and
  links to File Studio instead of writing back into Home Assistant directly.
* Bumped the Home Assistant App/Add-on package to `0.1.120`.
* Aligned the bundled Automation Exporter / Editor plugin with the GitHub
  install package `0.1.1`.
* Bumped the Home Assistant App/Add-on package to `0.1.121` after the external
  install package fix.
* Made Plugin Hub capability lists collapsible by default for all plugin cards.
* Bumped the Home Assistant App/Add-on package to `0.1.122` for the Hub UI
  refinement.
* Added Automation Exporter / Editor analysis hints, warning summary and a
  warnings-only filter.
* Bumped the bundled Automation Exporter / Editor plugin to `0.1.2`.
* Bumped the Home Assistant App/Add-on package to `0.1.123`.
* Extended Automation Exporter / Editor service detection to modern
  `action: domain.service` entries.
* Bumped the bundled Automation Exporter / Editor plugin to `0.1.3`.
* Bumped the Home Assistant App/Add-on package to `0.1.124`.
* Added Studio-like YAML highlighting to the Automation Exporter / Editor
  details preview.
* Bumped the bundled Automation Exporter / Editor plugin to `0.1.4`.
* Bumped the Home Assistant App/Add-on package to `0.1.125`.
* Limited the Automation Exporter / Editor automation list to roughly 15
  visible entries with internal scrolling.
* Bumped the bundled Automation Exporter / Editor plugin to `0.1.5`.
* Bumped the Home Assistant App/Add-on package to `0.1.126`.
* Added a planned File Studio switch between `/config` and the Automation
  Exporter output folder when the exporter plugin is installed.
* Made Plugin Hub sidebar URLs collapsible by default on plugin cards.
* Bumped the Home Assistant App/Add-on package to `0.1.127`.
* Refreshed public GitHub and open-source documentation for the compact Plugin
  Hub sidebar URL details and Automation Exporter / Editor `0.1.5`.
* Bumped the Home Assistant App/Add-on package to `0.1.128`.

Validation:

* `pnpm build`
* `pnpm ha:app:prepare`
* local app `/health`
* plugin catalog check
* `npm run docs:build` in `ugso-opensource-docs`

Status:

Completed.
