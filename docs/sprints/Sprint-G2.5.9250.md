# Sprint G2.5.9250 - French plugin interfaces

Goal:

Add French as the third interface language for ATLAS Terminal and File Studio.

Implementation:

* Add complete French translations to Terminal, including token controls, connection states and errors.
* Respect the URL language override and the shared ATLAS language preference in Terminal.
* Add FR selection, localized main toolbar controls and French upload-limit guidance in File Studio.
* Update Terminal to `0.1.7`, File Studio to `0.1.40`, framework to `0.2.0-alpha.84` and Home Assistant App to `0.1.262`.
* Update German, English and French Open Source documentation.

Validation:

* `pnpm build`.
* Terminal and File Studio package/catalog metadata checks.
* JavaScript syntax checks and `git diff --check`.
* `npm run docs:build` in `ugso-opensource-docs`.

Status:

Completed. File Studio's deeper file dialogs and workflow messages remain to be localized in a follow-up increment.
