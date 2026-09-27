# Sprint G2.5.1000 - Shared interface language preference

Goal:

Make the saved Administration language the shared default for Plugin Hub and
keep explicit language URL parameters authoritative.

Implementation:

* Persist DE/EN/FR selection from both Administration and Plugin Hub in local
  storage and a non-sensitive first-party cookie, allowing the preference to
  cross the separate app ports.
* Read that preference before the legacy per-surface preference on direct page
  loads; migrate an existing Administration preference when no shared value is
  present.
* Preserve URL language overrides for plugin routes and shareable links.
* Bump the framework to `0.2.0-alpha.82` and Home Assistant App to `0.1.260`.

Validation:

* JavaScript syntax checks for Administration and Plugin Hub.
* Production build, package tests, and Home Assistant App preparation.
* Browser check that a language selected in either surface becomes the default
  in the other surface, while `?language=...` still overrides it.
* `git diff --check`.

Status:

In progress.
