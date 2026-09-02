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

Validation:

* `pnpm build`
* `pnpm ha:app:prepare`
* local app `/health`
* plugin catalog check
* `npm run docs:build` in `ugso-opensource-docs`

Status:

Completed.
