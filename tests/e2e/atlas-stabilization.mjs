// Isolated browser workflow test. Requires a built atlas:local image and
// Playwright (set ATLAS_PLAYWRIGHT_MODULE to its module directory if necessary).
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { WebSocketServer } from "ws";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.ATLAS_PLAYWRIGHT_MODULE || "playwright");
const temporary = await mkdtemp(resolve(tmpdir(), "atlas-e2e-"));
const container = `atlas-e2e-${process.pid}`;
const token = "atlas-workflow-test-token-not-real";
const requests = [];
const checkpoints = [];
const browserErrors = [];
const mobile = process.env.ATLAS_E2E_MOBILE === "1";
const image = process.env.ATLAS_E2E_IMAGE || "atlas:local";
const platform = process.env.ATLAS_E2E_PLATFORM;
let browser;
let page;
let started = false;
const mock = createServer((request, response) => {
  response.setHeader("access-control-allow-origin", "*");
  response.setHeader("content-type", "application/json");
  response.end(JSON.stringify({ message: "API running." }));
});
const sockets = new WebSocketServer({ server: mock, path: "/api/websocket" });
const entities = [
  { entity_id: "sensor.atlas_temperature", state: "21.5", attributes: { friendly_name: "Test temperature", unit_of_measurement: "°C" } },
  { entity_id: "binary_sensor.atlas_status", state: "on", attributes: { friendly_name: "Test status" } },
  { entity_id: "light.atlas_test", state: "off", attributes: { friendly_name: "Test light" } },
];
sockets.on("connection", socket => {
  socket.send(JSON.stringify({ type: "auth_required", ha_version: "2026.10.0" }));
  socket.on("message", bytes => {
    const message = JSON.parse(bytes.toString());
    requests.push(message.type);
    if (message.type === "auth") {
      assert.equal(message.access_token, token);
      socket.send(JSON.stringify({ type: "auth_ok", ha_version: "2026.10.0" }));
      return;
    }
    const result = message.type === "get_states" ? entities
      : message.type === "lovelace/resources" ? [
        { id: "bubble", url: "/hacsfiles/Bubble-Card/bubble-card.js", type: "module" },
        { id: "mushroom", url: "/hacsfiles/lovelace-mushroom/mushroom.js", type: "module" },
      ] : message.type === "get_config" ? { version: "2026.10.0" } : [];
    socket.send(JSON.stringify({ id: message.id, type: "result", success: true, result }));
  });
});

function docker(args) {
  const result = spawnSync("docker", args, { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}
function passed(name) { checkpoints.push(name); console.log(`PASS ${name}`); }
function stableAdminSettings(settings) {
  const result = structuredClone(settings);
  // Opening the plugin manager legitimately refreshes this diagnostic timestamp.
  for (const repository of result.pluginRepositories || []) delete repository.lastChecked;
  return result;
}
async function responsiveChecks(surface) {
  if (!mobile) return;
  const initialLanguage = await page.locator('[data-language][aria-pressed="true"]').getAttribute("data-language");
  const saved = await page.evaluate(() => Object.fromEntries([
    "atlas.administration.configuration", "atlas.administration.pluginState",
    "atlas.administration.importedPlugins", "atlas.homeassistant.demo.configuration",
  ].map(key => [key, localStorage.getItem(key)])));
  for (const viewport of [{ width: 360, height: 800 }, { width: 390, height: 844 },
    { width: 844, height: 390 }, { width: 768, height: 1024 },
    { width: 1024, height: 1366 }]) {
    await page.setViewportSize(viewport);
    for (const language of ["de", "en", "fr"]) {
      await page.locator(`[data-language="${language}"]`).tap();
      const geometry = await page.evaluate(viewportWidth => ({
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        offenders: [...document.querySelectorAll("body, main, section, aside, header, div, h1, h2, h3, button, input, select, textarea")]
          .filter(element => {
            const rect = element.getBoundingClientRect();
            return rect.width && rect.height && (rect.left < -1 || rect.right > viewportWidth + 1)
              && !element.closest("[hidden]") && getComputedStyle(element).visibility !== "hidden";
          }).map(element => element.id || element.className || element.tagName).slice(0, 15),
      }), viewport.width);
      assert.ok(geometry.scrollWidth <= viewport.width + 1 && geometry.width <= viewport.width + 1,
        `${surface} ${viewport.width} ${language}: page overflow ${JSON.stringify(geometry)}`);
      if (surface === "editor") {
        const settings = page.locator("#expert-grid-settings");
        assert.equal(await settings.evaluate(element => element.open), false);
        const sliders = () => settings.locator('input[type="range"]').evaluateAll(
          elements => elements.map(element => element.value));
        const values = await sliders();
        await settings.locator("summary").tap();
        assert.equal(await settings.evaluate(element => element.open), true);
        assert.deepEqual(await sliders(), values);
        await settings.locator("summary").tap();
        assert.equal(await settings.evaluate(element => element.open), false);
        assert.deepEqual(await sliders(), values);
        const title = await page.locator(".expert-title-row").evaluate(row =>
          [...row.children].map(element => {
            const { x, y, width, height } = element.getBoundingClientRect();
            return { x, y, width, height };
          }));
        assert.ok(Math.abs(title[1].y - title[2].y) <= 1);
        assert.ok(Math.abs(title[1].width - title[2].width) <= 1);
        assert.ok(Math.abs(title[1].height - title[2].height) <= 1);
        assert.ok(viewport.width > 520 ? Math.abs(title[0].y - title[1].y) <= 1
          : title[1].y >= title[0].y + title[0].height);
        await page.locator(".expert-control-panel").screenshot({
          path: resolve(temporary, `editor-${viewport.width}-${language}-controls.png`),
        });
      }
      if (surface === "editor" && viewport.width > 520) {
        await page.waitForFunction(() => {
          const palette = document.querySelector("#expert-template-palette");
          const cards = [...palette.querySelectorAll(".expert-template-card")].slice(0, 2);
          const expected = Math.min(380, innerHeight * 0.45,
            Math.ceil(Math.max(...cards.map(card => card.getBoundingClientRect().height))));
          return cards.length === 2 && Math.abs(palette.clientHeight - expected) <= 1;
        });
        const palette = await page.evaluate(() => {
          const list = document.querySelector("#expert-template-palette");
          const cards = [...list.querySelectorAll(".expert-template-card")].map(card => {
            const { x, y, width, height } = card.getBoundingClientRect();
            return { x, y, width, height };
          });
          const buttons = [...document.querySelectorAll(".expert-palette-actions button")]
            .slice(0, 2).map(button => {
              const { x, y, width, height } = button.getBoundingClientRect();
              return { x, y, width, height };
            });
          return { cards, buttons, height: list.clientHeight, scrollHeight: list.scrollHeight };
        });
        assert.ok(Math.abs(palette.cards[0].y - palette.cards[1].y) <= 1);
        assert.ok(palette.cards[1].x > palette.cards[0].x);
        assert.ok(palette.cards[2].y > palette.cards[0].y + palette.height);
        assert.ok(palette.scrollHeight > palette.height);
        assert.ok(Math.abs(palette.buttons[0].y - palette.buttons[1].y) <= 1);
        assert.ok(Math.abs(palette.buttons[0].width - palette.buttons[1].width) <= 1);
        await page.locator(".expert-template-card").last().scrollIntoViewIfNeeded();
        assert.ok(await page.locator("#expert-template-palette").evaluate(list => list.scrollTop > 0));
        await page.locator("#expert-template-palette").evaluate(list => { list.scrollTop = 0; });
        await page.locator("#expert-template-palette").screenshot({
          path: resolve(temporary, `editor-${viewport.width}-${language}-palette.png`),
        });
      }
      const dialogs = surface === "admin" ? [
        ["plugins", "#open-plugin-manager", "#plugin-manager-dialog", "#close-plugin-manager"],
      ] : [
        ["report", "#open-problem-report", '#problem-report-backdrop [role="dialog"]', "#close-problem-report"],
        ["paste", "#open-ha-card-paste-import", '#ha-card-paste-import-backdrop [role="dialog"]', "#close-ha-card-paste-import"],
        ["export", "#export-ha-card-config", '#ha-card-export-backdrop [role="dialog"]', "#close-ha-card-export"],
      ];
      for (const [name, open, selector, close] of dialogs) {
        await page.locator(open).tap();
        const dialog = page.locator(selector);
        await dialog.waitFor({ state: "visible" });
        const bounds = await dialog.boundingBox();
        assert.ok(bounds && bounds.x >= -1 && bounds.x + bounds.width <= viewport.width + 1
          && bounds.y >= -1 && bounds.y + bounds.height <= viewport.height + 1,
        `${surface} ${name} dialog fits ${viewport.width} ${language}: ${JSON.stringify(bounds)}`);
        await page.screenshot({ path: resolve(temporary, `${surface}-${viewport.width}-${language}-${name}.png`), fullPage: false });
        await page.locator(close).tap();
      }
    }
    passed(`${surface} touch controls and dialogs at ${viewport.width}x${viewport.height} in DE/EN/FR`);
  }
  await page.locator(`[data-language="${initialLanguage}"]`).tap();
  const after = await page.evaluate(keys => Object.fromEntries(keys.map(key => [key, localStorage.getItem(key)])), Object.keys(saved));
  // Language changes are deliberate; restore before comparing all stored project/settings fields.
  for (const key of Object.keys(saved)) {
    if (saved[key] === null) { assert.equal(after[key], null); continue; }
    const previous = JSON.parse(saved[key]);
    const current = JSON.parse(after[key]);
    assert.deepEqual(key === "atlas.administration.configuration" ? stableAdminSettings(current) : current,
      key === "atlas.administration.configuration" ? stableAdminSettings(previous) : previous,
      `${surface} responsive checks preserve ${key}`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
}
async function waitReady() {
  for (let count = 0; count < 50; count += 1) {
    const response = await fetch("http://127.0.0.1:4176/health").catch(() => null);
    if (response?.ok) return;
    await new Promise(done => setTimeout(done, 200));
  }
  throw new Error("Isolated app did not become ready");
}

try {
  await new Promise(done => mock.listen(18123, "0.0.0.0", done));
  const plugins = resolve(temporary, "plugins");
  const fixture = resolve(plugins, "preservation-fixture");
  await mkdir(fixture, { recursive: true });
  await writeFile(resolve(fixture, "atlas-plugin.json"), JSON.stringify({
    id: "atlas.plugin.preservation-fixture", name: "Preservation fixture",
    version: "0.1.0", status: "active", entry: "/plugin-assets/preservation-fixture/index.html", capabilities: [],
  }));
  await writeFile(resolve(fixture, "index.html"), "<title>Preservation fixture</title>");
  await writeFile(resolve(fixture, "settings.json"), '{"existingSetting":"keep","value":42}');
  const fixtureBefore = await readFile(resolve(fixture, "settings.json"));
  docker(["run", ...(platform ? ["--platform", platform] : []), "--detach", "--name", container,
    ...(process.env.ATLAS_E2E_SOURCE_HTML === "1" ? ["--mount",
      `type=bind,source=${resolve("examples/status-demo/index.html")},target=/app/examples/status-demo/index.html,readonly`, "--mount",
      `type=bind,source=${resolve("examples/admin-demo/index.html")},target=/app/examples/admin-demo/index.html,readonly`] : []),
    "-p", "127.0.0.1:4176:4176", "-p", "127.0.0.1:4175:4175", "-p", "127.0.0.1:4174:4174",
    "--mount", `type=bind,source=${temporary},target=/data`,
    "-e", "ATLAS_PLUGIN_DATA_ROOT=/data/plugins", "-e", "ATLAS_ADMIN_DEVICE_FILE=/data/admin-device.json",
    "-e", "ATLAS_DISTRIBUTION_TARGET=standalone-docker-preview",
    "-e", "ATLAS_INSTANCE_ID=atlas-isolated-workflow-test", image]);
  started = true;
  await waitReady();
  const architecture = docker(["exec", container, "node", "-p", "process.arch"]);
  if (platform === "linux/arm64") assert.equal(architecture, "arm64");
  passed(`Container runs Node on ${architecture}; both surfaces ready`);
  browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({ acceptDownloads: true,
    viewport: mobile ? { width: 390, height: 844 } : { width: 1600, height: 1000 },
    hasTouch: mobile, isMobile: mobile });
  context.setDefaultTimeout(12000);
  await context.addInitScript(({ token }) => {
    if (location.pathname !== "/admin" || localStorage.getItem("atlas.e2e.legacySeeded")) return;
    localStorage.setItem("atlas.e2e.legacySeeded", "1");
    localStorage.setItem("atlas.administration.configuration", JSON.stringify({
      language: "de", themePreference: "dark", url: "http://host.docker.internal:18123",
      token, rememberToken: true, autoConnectEditor: true, editorStartMode: "expert",
      translationProvider: "none", translationApiKeys: { chatgpt: "provider-migration-test-secret" },
      pluginRepositoryUrl: "https://example.test/preserved-repository.json",
    }));
    localStorage.setItem("atlas.administration.pluginStateVersion", "2");
    localStorage.setItem("atlas.administration.pluginState", JSON.stringify({
      activePluginIds: ["atlas.plugin.homeassistant-card-editor", "atlas.plugin.preservation-fixture"],
    }));
  }, { token });
  await context.route("**/*", route => {
    const requested = new URL(route.request().url());
    const host = requested.hostname;
    // Inspect the compose URL offline; never send a report or open a real issue.
    if (host === "github.com" && requested.pathname === "/rockbaer2007/atlas/issues/new") {
      return route.fulfill({ contentType: "text/html", body: "<title>Offline issue-link test</title>" });
    }
    return ["127.0.0.1", "host.docker.internal", "localhost"].includes(host) ? route.continue() : route.abort();
  });
  page = await context.newPage();
  page.on("pageerror", error => browserErrors.push(error.message));
  page.on("dialog", dialog => dialog.accept());
  await page.goto("http://127.0.0.1:4176/admin?language=de");
  await page.waitForFunction(expected => {
    const saved = JSON.parse(localStorage.getItem("atlas.administration.configuration") || "{}");
    return document.querySelector("#home-assistant-token")?.value === expected
      && saved.tokenConfigured === true && Array.isArray(saved.pluginRepositories)
      && !Object.hasOwn(saved, "token") && !Object.hasOwn(saved, "translationApiKeys");
  }, token);
  const migrated = await page.evaluate(() => JSON.parse(localStorage.getItem("atlas.administration.configuration")));
  assert.equal(migrated.themePreference, "dark");
  assert.ok(migrated.pluginRepositories.some(repository => repository.url === "https://example.test/preserved-repository.json"));
  assert.ok((await page.evaluate(() => JSON.parse(localStorage.getItem("atlas.administration.pluginState")))).activePluginIds.includes("atlas.plugin.preservation-fixture"));
  passed("Legacy Admin settings migrate secrets while preserving repository, theme and active plugin IDs");
  await page.locator("#home-assistant-url").fill("http://host.docker.internal:18123");
  await page.locator("#home-assistant-token").fill(token);
  await page.locator("#remember-admin-token").check();
  await page.locator("#auto-connect-editor").check();
  await page.locator("#editor-start-mode").selectOption("simple");
  await page.locator("#save-admin-settings").click();
  await page.waitForFunction(() => localStorage.getItem("atlas.administration.configuration"));
  await page.reload();
  await page.waitForFunction(expected => document.querySelector("#home-assistant-token")?.value === expected, token);
  await page.waitForFunction(() => document.querySelector("#translation-api-key-chatgpt")?.value === "provider-migration-test-secret");
  assert.equal(await page.locator("#home-assistant-url").inputValue(), "http://host.docker.internal:18123");
  assert.equal(await page.locator("#remember-admin-token").isChecked(), true);
  assert.equal(await page.locator("#auto-connect-editor").isChecked(), true);
  passed("Administration settings and encrypted token survive reload");
  await responsiveChecks("admin");
  await page.locator("#open-card-editor").click();
  await page.waitForURL(/\/hub/);
  await page.locator('a.plugin-action[href*="/editor"]').first().click();
  await page.waitForSelector("#ha-card-target", { state: "attached" });
  await page.waitForFunction(() => ["ready", "connected"].includes(document.querySelector("#connection-state")?.dataset.state));
  passed("Administration -> Plugin Hub -> Card Editor auto-connect");
  assert.equal(await page.locator("#expert-grid-settings").evaluate(element => element.open), !mobile);
  await page.waitForFunction(() => [...document.querySelector("#home-assistant-entity-picker").options].some(option => option.value === "sensor.atlas_temperature"));
  assert.equal(await page.locator('#home-assistant-entity-domain option[value="light"]').count(), 1);
  assert.ok(requests.includes("get_states"));
  assert.ok(requests.includes("lovelace/resources"));
  passed("HA authentication, entity catalog and HACS resource discovery");
  await page.locator("#expert-card-name").fill("Workflow verification");
  await page.locator("#ha-card-script-filename").fill("workflow-verification.js");
  await page.locator("#expert-entity").fill("sensor.atlas_temperature");
  await page.locator("#expert-template").selectOption("entity-card");
  for (let index = 0; index < 3; index += 1) await page.locator("#add-expert-field").click();
  for (const [index, target] of ["entity", "bubble", "mushroom-template"].entries()) {
    await page.locator(`[data-expert-field-index="${index}"]`).first().dispatchEvent("click");
    await page.locator("#expert-target").selectOption(target);
    await page.locator("#expert-row").fill(String(index * 3));
    await page.locator("#expert-row").dispatchEvent("change");
  }
  const state = () => page.evaluate(() => JSON.parse(localStorage.getItem("atlas.homeassistant.demo.configuration")));
  const before = await state();
  assert.equal(before.expertEditorFields.length, 3);
  const beforePreview = await page.locator("#expert-editor-preview").textContent();
  assert.match(beforePreview, /sensor.atlas_temperature/);
  assert.match(beforePreview, /custom:bubble-card/);
  assert.match(beforePreview, /custom:mushroom/);
  await page.reload();
  await page.waitForFunction(() => document.querySelector("#connection-state")?.dataset.state === "connected");
  const after = await state();
  for (const key of ["expertEditorFields", "expertCardName", "cardScriptFilename", "expertEditorSurfaceSize", "expertPaletteFavoriteIds", "expertPaletteHiddenIds"]) {
    assert.deepEqual(after[key], before[key], `Reload preserves ${key}`);
  }
  assert.equal(await page.locator("#expert-editor-preview").textContent(), beforePreview);
  passed("Core, Bubble and Mushroom fields, positions and preview survive reload");
  await page.locator('[data-card-export-language="de"]').check();
  await page.locator('[data-card-export-language="fr"]').check();
  await page.locator("#card-auto-translate").uncheck();
  for (const language of ["de", "en", "fr"]) {
    await page.locator(`[data-language="${language}"]`).click();
    const [download] = await Promise.all([
      page.waitForEvent("download"), page.locator("#export-ha-card-bundle").click(),
    ]);
    const archivePath = resolve(temporary, `${language}-${download.suggestedFilename()}`);
    await download.saveAs(archivePath);
    const inspection = spawnSync("python", ["-c", [
      "import zipfile,json,sys",
      "with zipfile.ZipFile(sys.argv[1]) as z:",
      " names=z.namelist()",
      " assert z.testzip() is None",
      " packages=[n for n in names if n.startswith('atlas/') and n.endswith('.atlas-card.json')]",
      " assert len(packages)==1",
      " print(json.dumps({'names':names,'package':json.loads(z.read(packages[0])),'metadata':json.loads(z.read('hacs.json')),'example':z.read('examples/lovelace-card.json').decode(),'script':z.read('workflow-verification.js').decode()}))",
    ].join("\n"), archivePath], { encoding: "utf8", maxBuffer: 4 * 1024 * 1024 });
    assert.equal(inspection.status, 0, inspection.stderr);
    const archive = JSON.parse(inspection.stdout);
    for (const name of ["hacs.json", "workflow-verification.js", "README.md", "examples/lovelace-card.json", "locales/de.json", "locales/en.json", "locales/fr.json"]) assert.ok(archive.names.includes(name), name);
    assert.ok(!inspection.stdout.includes(token), "No credential in archive");
    assert.match(archive.example, /workflow-verification/);
    await writeFile(resolve(temporary, `${language}-archive-inspection.json`), JSON.stringify(archive, null, 2));
    const [jsonDownload] = await Promise.all([page.waitForEvent("download"), page.locator("#export-ha-card-package").click()]);
    const packagePath = resolve(temporary, `${language}-card-package.json`);
    await jsonDownload.saveAs(packagePath);
    await page.locator("#import-ha-card-config").setInputFiles(archivePath);
    await page.waitForFunction(() => /importiert|imported|importé/i.test(document.querySelector("#status-message")?.textContent));
    assert.deepEqual((await state()).expertEditorFields, before.expertEditorFields);
    const [repeatedJson] = await Promise.all([page.waitForEvent("download"), page.locator("#export-ha-card-package").click()]);
    const repeatedPath = resolve(temporary, `${language}-repeated-card-package.json`);
    await repeatedJson.saveAs(repeatedPath);
    // The export status distinguishes this import from the preceding ZIP import.
    await page.locator("#import-ha-card-config").setInputFiles(packagePath);
    await page.waitForFunction(() => /importiert|imported|importé/i.test(document.querySelector("#status-message")?.textContent));
    assert.deepEqual((await state()).expertEditorFields, before.expertEditorFields);
    passed(`${language.toUpperCase()} HACS ZIP and card JSON export/reimport preserve fields`);
  }
  const adminSaved = await page.evaluate(() => JSON.parse(localStorage.getItem("atlas.administration.configuration")));
  // All seeded secrets are test-only. Exercise both structured and free-text paths.
  await page.locator("#expert-card-name").fill(`Report ${token}`);
  await page.evaluate(() => {
    document.cookie = "test_private_cookie=cookie-test-secret; path=/";
    localStorage.setItem("test-private-storage", "storage-test-secret");
    document.querySelector("#status-message").textContent = '{"apiKey":"provider-test-secret with spaces"} https://user:password-test-secret@example.test/#token=fragment-test-secret';
  });
  const reportStateBefore = await page.evaluate(() => ({ storage: { ...localStorage }, cookies: document.cookie }));
  // Exercise the clipboard call without replacing the user's OS clipboard.
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: async text => { window.__reportTestClipboard = text; },
      readText: async () => window.__reportTestClipboard,
    },
  }));
  for (const language of ["de", "en", "fr"]) {
    await page.locator(`[data-language="${language}"]`).click();
    const settingsSnapshot = await page.evaluate(() => Object.fromEntries([
      "atlas.administration.configuration", "atlas.administration.importedPlugins",
      "atlas.administration.pluginState", "atlas.administration.pluginRepository",
      "atlas.homeassistant.demo.configuration",
    ].map(key => [key, localStorage.getItem(key)])));
    await page.locator("#open-problem-report").click();
    const preview = await page.locator("#problem-report-preview").inputValue();
    for (const secret of [token, "provider-migration-test-secret", "cookie-test-secret", "storage-test-secret", "provider-test-secret", "password-test-secret", "fragment-test-secret"]) assert.ok(!preview.includes(secret), secret);
    assert.ok(preview.includes('"homeAssistantTokenIncluded": false'));
    await page.locator("#copy-problem-report").click();
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), preview);
    await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error("Test clipboard unavailable"); }; });
    await page.locator("#copy-problem-report").click();
    await page.waitForFunction(() => /fehlgeschlagen|failed|Échec/i.test(document.querySelector("#problem-report-status")?.textContent));
    assert.equal(await page.locator("#problem-report-preview").inputValue(), preview);
    await page.evaluate(() => { navigator.clipboard.writeText = async text => { window.__reportTestClipboard = text; }; });
    const [popup] = await Promise.all([context.waitForEvent("page"), page.locator("#open-problem-issue").click()]);
    await popup.waitForURL(/github\.com\/rockbaer2007\/atlas\/issues\/new/);
    const issue = popup.url();
    assert.ok(issue.startsWith("https://github.com/rockbaer2007/atlas/issues/new"));
    assert.ok(!issue.includes("problem-report.v1"));
    assert.ok(!decodeURIComponent(issue).includes(token));
    await popup.close();
    await page.locator("#close-problem-report").click();
    assert.deepEqual(await page.evaluate(keys => Object.fromEntries(keys.map(key => [key, localStorage.getItem(key)])), Object.keys(settingsSnapshot)), settingsSnapshot);
    passed(`${language.toUpperCase()} report preview/copy/issue link exclude seeded secrets`);
  }
  const reportStateAfter = await page.evaluate(() => ({ storage: { ...localStorage }, cookies: document.cookie }));
  assert.equal(reportStateAfter.storage["test-private-storage"], reportStateBefore.storage["test-private-storage"]);
  assert.deepEqual((await state()).expertEditorFields, before.expertEditorFields);
  assert.deepEqual(await readFile(resolve(fixture, "settings.json")), fixtureBefore);
  await page.locator("#expert-card-name").fill(before.expertCardName);
  docker(["restart", container]);
  await waitReady();
  await page.goto("http://127.0.0.1:4176/admin?language=de");
  await page.waitForFunction(expected => document.querySelector("#home-assistant-token")?.value === expected, token);
  await page.waitForFunction(() => document.querySelector("#translation-api-key-chatgpt")?.value === "provider-migration-test-secret");
  assert.deepEqual(stableAdminSettings(await page.evaluate(() => JSON.parse(localStorage.getItem("atlas.administration.configuration")))), stableAdminSettings(adminSaved));
  const catalog = await page.request.get("http://127.0.0.1:4176/api/plugins");
  const plugin = (await catalog.json()).plugins.find(value => value.id === "atlas.plugin.preservation-fixture");
  assert.ok(plugin);
  assert.equal(plugin.status, "active");
  assert.deepEqual(await readFile(resolve(fixture, "settings.json")), fixtureBefore);
  passed("Container restart preserves Administration, installed plugin and its settings");
  await page.locator("#open-card-editor").click();
  await page.locator('a.plugin-action[href*="/editor"]').first().click();
  await page.waitForFunction(() => document.querySelector("#connection-state")?.dataset.state === "connected");
  assert.deepEqual((await state()).expertEditorFields, before.expertEditorFields);
  passed("Reconnect through Administration after restart preserves editor project");
  await responsiveChecks("editor");
  await page.locator("#import-ha-card-config").setInputFiles({
    name: "styled-report-test.yaml", mimeType: "text/yaml",
    buffer: Buffer.from('type: entities\ntitle: Styled report test\nentities:\n  - sensor.atlas_temperature\ncard_mod:\n  style: |\n    ha-card { color: red; }\n'),
  });
  await page.waitForFunction(() => JSON.parse(localStorage.getItem("atlas.homeassistant.demo.configuration")).groups.some(group => group.title === "Styled report test"));
  await page.locator("#open-problem-report").click();
  assert.ok((await page.locator("#problem-report-preview").inputValue()).includes('"importedStyleBlocks"'));
  await page.locator("#close-problem-report").click();
  passed("Report preview works after a styled HA card import");
  await page.screenshot({ path: resolve(temporary, "editor.png"), fullPage: true });
  assert.ok(!requests.includes("call_service"));
  assert.deepEqual(await readFile(resolve(fixture, "settings.json")), fixtureBefore);
  assert.equal(browserErrors.length, 0, browserErrors.join("\n"));
  passed("No JavaScript errors or HA service calls; plugin settings unchanged");
} catch (error) {
  console.log("FAILED PAGE", page?.url());
  if (page) {
    await page.screenshot({ path: resolve(temporary, "failure.png"), fullPage: true }).catch(() => {});
    await writeFile(resolve(temporary, "failure.html"), await page.content()).catch(() => {});
    console.log("STATUS", await page.locator("#admin-save-state, #connection-state, #status-message").allTextContents());
  }
  throw error;
} finally {
  await browser?.close();
  if (started) docker(["rm", "--force", container]);
  sockets.close();
  await new Promise(done => mock.close(done));
  await writeFile(resolve(temporary, "report.json"), JSON.stringify({image, platform, mobile,
    sourceHtml: process.env.ATLAS_E2E_SOURCE_HTML === "1", checkpoints, requests, browserErrors}, null, 2));
  console.log(`Test artifacts: ${temporary}`);
}
