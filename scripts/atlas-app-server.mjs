import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const host = process.env.ATLAS_APP_HOST ?? process.env.ATLAS_HOST ?? "127.0.0.1";
const surfaceHost = process.env.ATLAS_HOST ?? host;
const healthHost = surfaceHost === "0.0.0.0" ? "127.0.0.1" : surfaceHost;
const appPort = Number(process.env.ATLAS_APP_PORT ?? "4176");
const adminPort = Number(process.env.ATLAS_ADMIN_PORT ?? "4175");
const editorPort = Number(process.env.ATLAS_DEMO_PORT ?? "4174");
const adminUrl = `http://${healthHost}:${adminPort}/`;
const editorUrl = `http://${healthHost}:${editorPort}/`;
const startedAt = new Date().toISOString();
const childProcesses = [];

await startSurface({
  name: "ATLAS Administration",
  url: adminUrl,
  script: "examples/admin-demo/server.mjs",
  env: {
    ATLAS_ADMIN_HOST: surfaceHost,
    ATLAS_ADMIN_PORT: String(adminPort),
  },
});

await startSurface({
  name: "ATLAS Home Assistant Card Editor",
  url: editorUrl,
  script: "examples/status-demo/server.mjs",
  env: {
    ATLAS_DEMO_HOST: surfaceHost,
    ATLAS_ADMIN_HOST: surfaceHost,
    ATLAS_DEMO_PORT: String(editorPort),
    ATLAS_ADMIN_PORT: String(adminPort),
  },
});

createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? `${host}:${appPort}`}`);

  if (requestUrl.pathname === "/health") {
    void writeHealthResponse(response);
    return;
  }

  if (requestUrl.pathname === "/app") {
    void writeAppResponse(response, requestUrl);
    return;
  }

  if (requestUrl.pathname === "/" || requestUrl.pathname === "/admin" || requestUrl.pathname === "/admin/") {
    response.writeHead(302, { location: createPublicSurfaceUrl(requestUrl, adminPort) });
    response.end();
    return;
  }

  if (requestUrl.pathname === "/editor" || requestUrl.pathname === "/editor/") {
    response.writeHead(302, { location: createPublicSurfaceUrl(requestUrl, editorPort) });
    response.end();
    return;
  }

  writeJson(response, 404, {
    error: "not found",
    links: {
      admin: createPublicSurfaceUrl(requestUrl, adminPort),
      editor: createPublicSurfaceUrl(requestUrl, editorPort),
      app: new URL("/app", requestUrl).toString(),
      health: new URL("/health", requestUrl).toString(),
    },
  });
}).listen(appPort, host, () => {
  console.log(`ATLAS app server: http://${host}:${appPort}/`);
  console.log(`ATLAS health: http://${host}:${appPort}/health`);
  console.log(`ATLAS administration: ${adminUrl}`);
  console.log(`ATLAS card editor: ${editorUrl}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    for (const childProcess of childProcesses) {
      childProcess.kill(signal);
    }
    process.exit(0);
  });
}

async function startSurface({ name, url, script, env }) {
  if (await isServerReady(url)) {
    console.log(`${name} already running: ${url}`);
    return;
  }

  const childProcess = spawn(process.execPath, [resolve(root, script)], {
    cwd: root,
    env: {
      ...process.env,
      ...env,
    },
    stdio: "inherit",
  });
  childProcesses.push(childProcess);

  childProcess.on("exit", (code, signal) => {
    if (code === 0 || signal) {
      return;
    }
    console.warn(`${name} exited with code ${code}.`);
  });

  childProcess.on("error", error => {
    console.warn(`${name} could not start: ${error.message}`);
  });

  if (!(await waitForServer(url, 5000))) {
    console.warn(`${name} did not answer at ${url} within 5s.`);
  }
}

async function writeHealthResponse(response) {
  const surfaces = {
    administration: {
      url: adminUrl,
      ready: await isServerReady(adminUrl),
    },
    cardEditor: {
      url: editorUrl,
      ready: await isServerReady(editorUrl),
    },
  };
  const ready = Object.values(surfaces).every(surface => surface.ready);

  writeJson(response, ready ? 200 : 503, {
    status: ready ? "ok" : "degraded",
    app: "atlas",
    surfaces,
  });
}

async function writeAppResponse(response, requestUrl) {
  const publicAdminUrl = createPublicSurfaceUrl(requestUrl, adminPort);
  const publicEditorUrl = createPublicSurfaceUrl(requestUrl, editorPort);
  const surfaces = {
    administration: {
      url: publicAdminUrl,
      healthUrl: adminUrl,
      port: adminPort,
      ready: await isServerReady(adminUrl),
    },
    cardEditor: {
      url: publicEditorUrl,
      healthUrl: editorUrl,
      port: editorPort,
      ready: await isServerReady(editorUrl),
    },
  };
  const ready = Object.values(surfaces).every(surface => surface.ready);

  writeJson(response, ready ? 200 : 503, {
    kind: "atlas.app.runtime",
    name: "ATLAS",
    version: packageJson.version ?? "0.0.0-local",
    status: ready ? "ok" : "degraded",
    startedAt,
    urls: {
      app: new URL("/", requestUrl).toString(),
      health: new URL("/health", requestUrl).toString(),
      admin: publicAdminUrl,
      editor: publicEditorUrl,
    },
    ports: {
      app: appPort,
      admin: adminPort,
      editor: editorPort,
    },
    distribution: {
      current: "standalone-docker-preview",
      order: [
        "standalone-docker",
        "home-assistant-app",
        "linux-installer",
        "home-assistant-hacs",
      ],
    },
    surfaces,
  });
}

async function waitForServer(url, timeoutMs) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (await isServerReady(url)) return true;
    await new Promise(resolveDelay => setTimeout(resolveDelay, 100));
  }
  return false;
}

async function isServerReady(url) {
  try {
    const response = await fetch(url, { cache: "no-store" });
    return response.ok;
  } catch {
    return false;
  }
}

function writeJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(body, null, 2));
}

function createPublicSurfaceUrl(requestUrl, port) {
  const url = new URL("/", requestUrl);
  url.port = String(port);
  return url.toString();
}
