# AGENTS.md

Repo-wide working rules for Codex and future agents working on ATLAS.

## Project Context

- Primary repo: `C:\Users\rockb\source\repos\atlas`.
- Documentation repo: `C:\Users\rockb\source\repos\ugso-opensource-docs`.
- Current Atlas focus: Home Assistant card editor, Simple/Expert workflows, HACS-oriented export/import, and bilingual documentation.
- The Atlas demo is usually served locally at `http://127.0.0.1:4173/`.
- The external documentation site uses VitePress in `ugso-opensource-docs` and is maintained in German and English.

## Collaboration Rules

- The user speaks German; answer in German unless there is a clear reason to use English.
- Continue proactively when the user says "weiter", "mach weiter", or asks for automatic next steps.
- Prefer completing a useful end-to-end increment: implement, test, commit, and push when the change is ready.
- Give short progress updates while working.
- Keep final reports concise: what changed, what was verified, commit hashes, and anything that did not work.
- If the user asks for only a short answer, keep it short.

## Git Rules

- Do not revert user changes unless explicitly requested.
- Check `git status --short` before making changes.
- Commit focused changes with clear messages.
- Push finished work to GitHub when the user asked for ongoing Atlas progress or when a commit was created as part of the requested work.
- Keep Atlas and `ugso-opensource-docs` commits separate.
- If docs are changed in `ugso-opensource-docs`, build and commit that repo separately.

## Editing Rules

- Use `apply_patch` for manual file edits.
- Keep edits scoped to the task.
- Prefer ASCII in new or edited files unless the file already uses non-ASCII or there is a clear reason.
- Do not add unrelated refactors.
- Use existing local patterns, APIs, tests, and naming.
- Prefer structured parsers and existing utilities over ad hoc string handling.

## Verification Rules

- For Atlas code changes, run the most relevant checks:
  - `node --check examples/status-demo/app.js` for demo JavaScript changes.
  - `pnpm --filter @atlas/homeassistant test` for Home Assistant package logic.
  - `pnpm build` before committing broader repo changes.
  - `git diff --check` before commit.
  - Check the local demo URL when UI or demo behavior changes.
- For `ugso-opensource-docs`, use npm, not pnpm:
  - `npm run docs:build`.
- If a check cannot run, say so clearly in the final report.

## UI And Frontend Rules

- The UI should look professional, compact, and tidy.
- Buttons in the same action group should have equal width and height unless the user explicitly wants a different layout.
- Avoid oversized fields and controls, especially compact numeric controls like column, row, width, and height.
- Text must not overflow or overlap its container on desktop or mobile.
- Expert editor controls should be compact and predictable.
- Use clear visual states for selected, editing, disabled, drag, conflict, and resize states.
- Do not show Simple-only controls in Expert mode when they are not needed.
- Do not show Expert-only controls in Simple mode when they are not needed.

## Atlas Home Assistant Product Rules

- Atlas should support both Simple and Expert editor modes.
- Simple mode is for fast card generation and button/entity stacks.
- Expert mode is for a free editor surface with draggable/resizable fields.
- Expert mode should generate the Expert HA card code, not the Simple HA card code.
- Expert fields can use different card families, including built-in Home Assistant cards, Bubble Card, and Mushroom.
- All Home Assistant and HACS resource paths must respect Linux case sensitivity.
- Bubble Card path:
  - `/hacsfiles/Bubble-Card/bubble-card.js`
- Mushroom resource path:
  - `/hacsfiles/lovelace-mushroom/mushroom.js`
- Atlas should support a dual deployment direction:
  - standalone/self-hosted Atlas editor or server
  - later Home Assistant/HACS frontend integration
- The user wants entity selection from Home Assistant when Atlas is installed or connected.
- Access tokens may be remembered locally only when the user selects that option.
- Auto-connect is allowed when token remembering is enabled and the user selects auto-connect.

## Expert Editor Rules

- The Expert editor surface uses a Home-Assistant-like grid.
- Fields should be draggable within grid bounds.
- Fields should be resizable with visible handles after selecting/editing.
- The editor surface itself should be resizable within the allowed limits.
- Entity selection should apply to the currently selected Expert field.
- Title editing should support both:
  - applying a manually typed title
  - using the selected entity name as title
- Bubble fields should expose Bubble button type choices such as state, switch, slider, and name.
- The palette should include Core and Community card entries.
- Palette favorites can be saved, reset, and shown/hidden.
- Scanned Home Assistant/HACS resources can appear in the palette when connected.
- Duplicate palette entries should be avoided.
- Unsupported or scan-only resources should be visible as information but not treated as safely draggable until mapped.

## Import And Export Rules

- Exports should support JSON and YAML where applicable.
- Export filenames should reflect the actual target or user-defined card/script name.
- HACS script filenames should be user-defined and normalized, for example `energy-kitchen.js`.
- Card packages should include safe demo entities and a clear hint to replace them with real Home Assistant entities.
- HACS bundle export should create a `.hacs.zip` containing:
  - `hacs.json`
  - generated JavaScript card
  - `README.md`
  - example Lovelace card
  - embedded `atlas/*.atlas-card.json`
- HACS bundle import should inspect the ZIP and read the embedded `atlas/*.atlas-card.json` package back into Simple or Expert mode.
- Raw Home Assistant card import should support nested `vertical-stack`, `horizontal-stack`, `grid`, and `conditional` structures where implemented.
- External Home Assistant Card Builder artifacts may be evaluated as references, but do not copy source code blindly.
- If supporting external artifacts later, keep schema mapping explicit and include attribution where required.

## Documentation Rules

- Atlas documentation should be kept in `ugso-opensource-docs`, not as a separate VitePress site inside the Atlas repo.
- Maintain German and English documentation together.
- When behavior changes in Atlas, update both languages if the public docs mention that behavior.
- Keep German and English layouts consistent.
- Language navigation uses DE/EN and later FR with flag icons where configured in the docs site.
- Do not generate built docs manually unless the docs build process does so.

## Roadmap Notes To Preserve

- Future direction includes HACS-installable custom card packages.
- Future direction includes user-defined card names and script names.
- Future direction includes a visual drag-and-drop editor with templates in a sidebar.
- Future direction includes Bubble, Mushroom, built-in Entity/Entities, Button, Sensor, Grid, Thermostat, Link, Webpage, vertical-stack, and horizontal-stack options.
- Future direction includes detecting installed Home Assistant resources and offering relevant card/entity choices.
- Future direction includes using Atlas directly on a server or as a Home Assistant/HACS integration.
- Planned follow-up projects include the UGSo Thread Monitor and the Lovelace UV Card.

## Known User Preferences

- Compact, consistent UI is important.
- Button rows should look aligned and professional.
- The user prefers practical visible progress over abstract planning.
- The user often wants batches of automatic work, but the agent should still commit coherent increments.
- The user wants commits and pushes visible on GitHub after completed work.
