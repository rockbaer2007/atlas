# Sprint G2.5.9248 - French Administration preview and live Renderer integration

Goal:

Start ATLAS UI French localization in small user-visible sections and verify a
real Home Assistant entity update through the existing Renderer and Theme path.

Implementation:

* Remove real-host external-plugin repository verification from the roadmap.
* Add a French Administration selector, persist and restore `fr`, and use French
  date and sorting locales.
* Translate the Administration header and connection-settings section; missing
  French strings fall back to English and an on-screen notice explains this.
* Add an integration test for entity filtering, live DOM rendering, theme tokens
  and binding disposal.
* Bump the framework manifest to `0.2.0-alpha.80` and the Home Assistant App to
  `0.1.258`.

Validation:

* `node --check examples/admin-demo/app.js`
* `pnpm --filter @atlas/homeassistant test`
* `pnpm --filter @atlas/homeassistant check`
* `pnpm build`
* Browser check at `http://127.0.0.1:4175/?language=fr`
* `git diff --check`

Status:

Completed.
