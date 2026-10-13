// Isolated A5 load/reconnection check: mock HA, fresh browser, local editor only.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { WebSocketServer } from "ws";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.ATLAS_PLAYWRIGHT_MODULE || "playwright");
const temporary = await mkdtemp(resolve(tmpdir(), "atlas-a5-"));
const editorPort = 18874;
const token = "atlas-a5-fake-token-not-real";
const entities = [{ entity_id: "sensor.atlas_temperature", state: "20", attributes: { friendly_name: "A5 temperature" } },
  ...Array.from({ length: 2000 }, (_, index) => ({ entity_id: `sensor.a5_${index}`, state: String(index), attributes: { friendly_name: `A5 ${index}` } }))];
const api = createServer((_request, response) => response.end("A5 isolated mock"));
let available = true;
let rejectedConnections = 0;
let rejectAuthentication = false;
const sockets = new WebSocketServer({ server: api, path: "/api/websocket", verifyClient: (_info, done) => {
  if (!available) rejectedConnections += 1;
  done(available, available ? undefined : 503);
} });
let connections = 0;
let subscribed = 0;
let latestSocket;
const requests = [];
sockets.on("connection", socket => {
  connections += 1;
  latestSocket = socket;
  socket.send(JSON.stringify({ type: "auth_required", ha_version: "test-only" }));
  socket.on("message", bytes => {
    const message = JSON.parse(bytes.toString());
    requests.push(message.type);
    if (message.type === "auth") {
      assert.equal(message.access_token, token);
      if (rejectAuthentication) {
        socket.send(JSON.stringify({ type: "auth_invalid", message: "A5 rejected test credential" }));
        socket.close();
        return;
      }
      socket.send(JSON.stringify({ type: "auth_ok" }));
    } else {
      assert.notEqual(message.type, "call_service");
      if (message.type === "subscribe_events") subscribed += 1;
      socket.send(JSON.stringify({ id: message.id, type: "result", success: true,
        result: message.type === "get_states" ? entities : [] }));
    }
  });
});
let server;
let browser;
const metrics = {};
const errors = [];
try {
  await new Promise(done => api.listen(0, "127.0.0.1", done));
  const mockPort = api.address().port;
  assert.equal(await fetch(`http://127.0.0.1:${editorPort}/`).catch(() => null), null,
    "The isolated editor port must be free; never reuse an existing user server.");
  server = spawn(process.execPath, ["examples/status-demo/server.mjs"], {
    env: { ...process.env, ATLAS_DEMO_HOST: "127.0.0.1", ATLAS_DEMO_PORT: String(editorPort), ATLAS_SKIP_ADMIN_AUTOSTART: "1" },
    stdio: "ignore",
  });
  let serverReady = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    assert.equal(server.exitCode, null, "Owned test server exited before becoming ready.");
    try { if ((await fetch(`http://127.0.0.1:${editorPort}/`)).ok) { serverReady = true; break; } } catch {}
    await new Promise(done => setTimeout(done, 100));
  }
  assert.ok(serverReady, "Owned test server did not become ready.");
  browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, acceptDownloads: true });
  await context.route("**/*", route => {
    const url = new URL(route.request().url());
    if (url.pathname === "/api/admin-connection") return route.fulfill({ json: {
      url: `http://127.0.0.1:${mockPort}`, token, autoConnectEditor: true, editorStartMode: "expert",
    } });
    return url.hostname === "127.0.0.1" ? route.continue() : route.abort();
  });
  const page = await context.newPage();
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${editorPort}/`);
  const ready = () => page.waitForFunction(() => {
    const state = document.querySelector("#connection-state");
    return state?.dataset.state === "connected" && state.textContent.includes("active");
  });
  await ready();
  await page.waitForFunction(() => JSON.parse(localStorage.getItem("atlas.homeassistant.demo.entityCatalogCache") || "{}").entities?.length === 2001);
  await page.locator("#expert-target").selectOption("entity");
  await page.locator("#expert-entity").fill("sensor.atlas_temperature");
  await page.locator("#add-expert-field").click();
  const start = performance.now();
  await page.evaluate(() => {
    const key = "atlas.homeassistant.demo.configuration";
    const project = JSON.parse(localStorage.getItem(key));
    const seed = project.expertEditorFields[0];
    project.expertEditorFields = Array.from({ length: 100 }, (_, index) => ({ ...seed,
      id: `A5 card ${index + 1}`, title: `A5 card ${index}`, column: index % 12, row: Math.floor(index / 12), width: 1, height: 1,
      resizeBaseWidth: 1, resizeBaseHeight: 1,
    }));
    localStorage.setItem(key, JSON.stringify(project));
  });
  await page.reload();
  await ready();
  await page.waitForFunction(() => JSON.parse(localStorage.getItem("atlas.homeassistant.demo.configuration")).expertEditorFields.length === 100);
  await page.waitForFunction(() => document.querySelectorAll("#expert-editor-dropzone [data-expert-field-index]").length === 100);
  metrics.load100CardsMs = Math.round(performance.now() - start);
  const state = () => page.evaluate(() => JSON.parse(localStorage.getItem("atlas.homeassistant.demo.configuration")));
  const baseline = await state();
  for (const theme of ["dark", "light", "auto"]) {
    await page.locator(`[data-theme-mode="${theme}"]`).click();
    assert.equal(await page.locator("#expert-editor-dropzone [data-expert-field-index]").count(), 100);
    assert.deepEqual((await state()).expertEditorFields, baseline.expertEditorFields);
  }
  for (let cycle = 0; cycle < 3; cycle++) {
    const expected = connections + 1;
    latestSocket.terminate();
    await page.waitForFunction(() => document.querySelector("#connection-state")?.dataset.state === "closed");
    const reconnectStart = performance.now();
    await ready();
    assert.equal(connections, expected);
    metrics[`reconnect${cycle + 1}Ms`] = Math.round(performance.now() - reconnectStart);
    const updateStart = performance.now();
    for (let update = 0; update < 50; update++) latestSocket.send(JSON.stringify({ type: "event", id: 1,
      event: { event_type: "state_changed", data: { entity_id: "sensor.atlas_temperature",
        new_state: { entity_id: "sensor.atlas_temperature", state: String(4242 + cycle * 50 + update), attributes: { friendly_name: "A5 temperature" } } } } }));
    await page.waitForFunction(expectedState => document.querySelector("#card-entity-overview")?.textContent.includes(expectedState), String(4291 + cycle * 50), { timeout: 8000 }).catch(async error => {
      console.log(await page.evaluate(() => ({
        rows: document.querySelector("#atlas-entity-list")?.textContent.slice(0, 1500),
        status: document.querySelector("#connection-state")?.textContent,
        cached: JSON.parse(localStorage.getItem("atlas.homeassistant.demo.entityCatalogCache") || "{}").entities?.find(entity => entity.entityId === "sensor.atlas_temperature"),
      })));
      await page.screenshot({ path: resolve(temporary, "failure.png"), fullPage: false });
      throw error;
    });
    metrics[`burst${cycle + 1}Ms`] = Math.round(performance.now() - updateStart);
    assert.deepEqual((await state()).expertEditorFields, baseline.expertEditorFields);
  }
  assert.equal(subscribed, connections);
  // A real network outage can outlast the initial three retries. Keep the
  // endpoint unavailable across that window, then restore it without reloading.
  available = false;
  latestSocket.terminate();
  await page.waitForFunction(() => document.querySelector("#connection-state")?.dataset.state === "closed");
  const outageStart = performance.now();
  await new Promise(done => setTimeout(done, 8000));
  assert.ok(rejectedConnections >= 3, "Exercise all initial retries while HA is unreachable.");
  assert.deepEqual((await state()).expertEditorFields, baseline.expertEditorFields);
  available = true;
  await page.waitForFunction(() => {
    const state = document.querySelector("#connection-state");
    return state?.dataset.state === "connected" && state.textContent.includes("active");
  }, null, { timeout: 18000 });
  metrics.longOutageRecoveryMs = Math.round(performance.now() - outageStart);
  assert.equal(subscribed, connections);
  assert.deepEqual((await state()).expertEditorFields, baseline.expertEditorFields);
  for (const language of ["de", "en", "fr"]) {
    await page.locator(`[data-language="${language}"]`).click();
    const [download] = await Promise.all([page.waitForEvent("download"), page.locator("#export-ha-card-package").click()]);
    const path = resolve(temporary, `${language}-100-cards.json`);
    await download.saveAs(path);
    await page.locator("#import-ha-card-config").setInputFiles(path);
    await page.waitForFunction(() => /importiert|imported|importé/.test(document.querySelector("#status-message")?.textContent));
    assert.deepEqual((await state()).expertEditorFields, baseline.expertEditorFields);
  }
  rejectAuthentication = true;
  const beforeRejectedAuth = connections;
  latestSocket.terminate();
  await page.waitForFunction(() => document.querySelector("#connection-state")?.dataset.state === "closed");
  await new Promise(done => setTimeout(done, 4500));
  assert.equal(connections, beforeRejectedAuth + 1, "Do not endlessly retry rejected credentials after close.");
  assert.deepEqual((await state()).expertEditorFields, baseline.expertEditorFields);
  rejectAuthentication = false;
  await page.reload();
  await ready();
  assert.deepEqual((await state()).expertEditorFields, baseline.expertEditorFields);
  assert.deepEqual(errors, []);
  assert.ok(!requests.includes("call_service"));
  await page.screenshot({ path: resolve(temporary, "a5-project.png"), fullPage: false });
  await writeFile(resolve(temporary, "report.json"), JSON.stringify({ metrics, connections, subscribed, errors, entityCount: entities.length, cardCount: 100 }, null, 2));
  console.log("PASS A5: 100 cards, 2001 entities, 3 reconnects, long outage recovery, rejected-auth stop, 150 live updates, DE/EN/FR project roundtrips; no device actions");
  console.log(JSON.stringify(metrics));
} finally {
  await browser?.close();
  server?.kill();
  for (const socket of sockets.clients) socket.terminate();
  await new Promise(done => sockets.close(done));
  await new Promise(done => api.close(done));
  console.log(`A5 artifacts: ${temporary}`);
}
