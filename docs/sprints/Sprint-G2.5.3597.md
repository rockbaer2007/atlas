# Sprint G2.5.3597 - Admin API Key Reload Restore

Goal:

Keep translation provider API-key fields available after reloading the Atlas Administration page without exposing raw keys to the Card Editor.

Deliverables:

* Added Admin-only secret restore through `GET /api/admin-connection?includeSecrets=1`
* Restored provider API-key fields from the running Admin server after page reload
* Kept raw provider keys out of shared cookies and Card Editor handoff payloads
* Documented the reload restore behavior

Status:

Completed.
