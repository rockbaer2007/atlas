# AGENTS.md

Repo-wide working rules for Codex and future agents working on ATLAS.

## Project Context

- Primary repo: `C:\Users\rockb\source\repos\atlas`.
- Documentation repo: `C:\Users\rockb\source\repos\ugso-opensource-docs`.
- Current Atlas focus: Home Assistant card editor, Simple/Expert workflows, HACS-oriented export/import, and bilingual documentation.
- The Atlas Home Assistant Card Editor demo standard port is fixed to `4174`; serve it at `http://127.0.0.1:4174/`.
- The Atlas Administration demo standard port is fixed to `4175`; serve it at `http://127.0.0.1:4175/`.
- The combined Atlas app server standard port is fixed to `4176`; `pnpm start:app` should expose `http://127.0.0.1:4176/health` while starting Administration and Card Editor together.
- The standalone Docker preview uses `Dockerfile`, `.dockerignore` and `docker-compose.yml`; build with `pnpm docker:build` and run with `pnpm docker:up` when Docker is available.
- The external documentation site uses VitePress in `ugso-opensource-docs` and is maintained in German and English.

## Collaboration Rules

- The user speaks German; answer in German unless there is a clear reason to use English.
- Continue proactively when the user says "weiter", "mach weiter", or asks for automatic next steps.
- Continue proactively when the user says "weiter 100", "mach 200", the next 100 or 200 steps.
- Prefer completing a useful end-to-end increment: implement, test, commit, and push when the change is ready.
- Give short progress updates while working.
- Keep final reports concise: what changed, what was verified, commit hashes, and anything that did not work.
- End final reports with the current ATLAS sprint number, derived from the highest numbered `docs/sprints/Sprint-G2.5.*.md` file unless another active sprint is explicitly documented.
- If the user asks for only a short answer, keep it short.

## Git Rules

- Do not revert user changes unless explicitly requested.
- Check `git status --short` before making changes.
- Commit focused changes with clear messages.
- Push finished work to GitHub when the user asked for ongoing Atlas progress or when a commit was created as part of the requested work.
- Every user-visible Atlas or Home Assistant package update must include a matching version bump before commit and push, so Home Assistant and repository update checks can detect it.
- When Atlas changes affect the Home Assistant Add-on package, update and push `C:\Users\rockb\source\repos\atlas-homeassistant-addon-repository` as part of the same finished increment.
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
  - For Docker packaging changes, run `pnpm docker:build` and check `/health` when Docker is available; if Docker is unavailable, state that clearly.
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
- Atlas should support a multi-target deployment direction:
  - first: standalone/self-hosted Docker container for Atlas Administration plus Card Editor
  - second: Home Assistant App/Add-on packaging derived from the same container/runtime
  - third: optional Linux installer for VM, LXC or bare Linux with systemd service
  - later: Home Assistant/HACS frontend integration where it makes sense
- Treat the Home Assistant Card Editor as the first official ATLAS reference plugin, not merely as a demo.
- The user wants entity selection from Home Assistant when Atlas is installed or connected.
- Access tokens are managed by Atlas Administration, not by the Card Editor.
- The Card Editor may receive the Home Assistant token only as a session handoff from Administration.
- The local Administration server may provide saved connection settings to the Card Editor on port `4174` after `Save settings`, so reloads and direct editor opens still work.
- Auto-connect belongs to Atlas Administration and may be sent as part of the session handoff.
- Plugins should receive approved URLs, resource paths and capabilities, but not raw access tokens.

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
- Card package and HACS bundle exports should ask for Card languages separately from the Atlas UI language.
- Atlas UI and docs stay German/English for now; exported Cards may include broader European language files plus Russian (`ru`).
- `en` is the required Card language fallback. Additional Card language files may be generated as English fallbacks and must include a note that they need translation/review before publishing.
- Automatic translation for additional Card languages is a future option and must clearly warn that it requires an internet connection when enabled.
- Atlas Administration should own the Card translation module choice, starting with `none`, `chatgpt`, `gemini`, `deepl-free`, `deepl-pro` and `custom-ai`.
- DeepL API planning should keep `https://www.deepl.com/de/pro#api` as the reference for Free/Pro API options.
- DeepL translate adapter planning should default internally to `https://api.deepl.com/v2/translate` and keep `https://developers.deepl.com/api-reference/translate/request-translation` as the request reference; this endpoint should not be shown as a normal Admin input field.
- Translation provider API keys belong to Atlas Administration or a later backend adapter. The Card Editor should receive provider, endpoint and key-configured status only, not raw provider API keys.
- Home Assistant tokens and provider API keys may be stored by Atlas Administration in an encrypted long-term Admin cookie and restored after a page reload. The browser-held encryption key stays in local Administration storage. Raw tokens and provider API keys must not be written to shared cookies or Card Editor handoff payloads.
- Admin settings export may include an AES-GCM-encrypted secrets block for the Home Assistant token and provider API keys, but must not include raw secrets.
- Encrypted Admin secrets must be bound to the local Atlas Administration installation identity. A copied server folder or exported settings file on a different installation must treat secrets as invalid unless a later explicit migration/passphrase flow is implemented.
- The Admin server may use `ATLAS_INSTANCE_ID` for deliberate Docker/server identity pinning; otherwise it stores a generated installation ID in local user data outside the repo.
- Gemini planning should keep `https://ai.google.dev/gemini-api/docs/api-key` as the API-key/security reference.
- ChatGPT/OpenAI is the first provider adapter path: the Card Editor calls the Atlas Administration `/api/card-translation` endpoint, and the Admin server calls the OpenAI Responses API with the server-held key.
- The Card Editor may expose an automatic-translation checkbox and progress indicator during export, but it must not claim completed machine translation until a real provider adapter has executed and returned machine-marked locale files.
- HACS bundle export should create a `.hacs.zip` containing:
  - `hacs.json`
  - generated JavaScript card
  - `README.md`
  - example Lovelace card
  - embedded `atlas/*.atlas-card.json`
  - selected `locales/*.json` language files
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

- Next Atlas Card Editor priority: build an opt-in debug reporting channel before starting unrelated new Atlas editor work. Remind the user if they switch to another Atlas topic first. The planned preview path is a `Problem melden` flow with debug-data preview, GitHub issue link, and no Home Assistant tokens, provider API keys, or other secrets attached.
- Future direction includes HACS-installable custom card packages.
- Future direction includes user-defined card names and script names.
- Future direction includes a visual drag-and-drop editor with templates in a sidebar.
- Future direction includes Bubble, Mushroom, built-in Entity/Entities, Button, Sensor, Grid, Thermostat, Link, Webpage, vertical-stack, and horizontal-stack options.
- Future direction includes detecting installed Home Assistant resources and offering relevant card/entity choices.
- Future direction includes using Atlas directly on a server, in Docker, as a Home Assistant App/Add-on, through an optional Linux VM/LXC/bare-metal installer, or as a later Home Assistant/HACS frontend integration.
- Preferred ATLAS distribution order: build the standalone Docker container first, derive the Home Assistant App/Add-on packaging from that container second, and add the Linux/systemd installer third only after the container path is stable.
- Future direction includes a separate plugin documentation area for authoring, lifecycle, extension APIs, examples, and publishing guidance.
- Future direction includes an Atlas Administration web surface for plugin management, plugin creation, import/export, and installable package generation.
- Future direction includes using the Home Assistant Card Editor as the first reference plugin for ATLAS plugin architecture, administration and package export.
- Planned follow-up projects still include the Lovelace UV Card.
- Lovelace UV Card inspiration source to preserve: `https://github.com/filipnet/haos-uv-index`.
- The Lovelace UV Card should be an original UGSo/ATLAS implementation, using the external UV card only as inspiration for UV-index sensor handling, risk colors, WHO-style protection recommendations, Mushroom-compatible presentation and optional notification automation ideas.

## Known User Preferences

- Compact, consistent UI is important.
- Button rows should look aligned and professional.
- The user prefers practical visible progress over abstract planning.
- The user often wants batches of automatic work, but the agent should still commit coherent increments.
- The user wants commits and pushes visible on GitHub after completed work.
