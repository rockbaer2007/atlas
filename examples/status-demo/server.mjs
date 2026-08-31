import { spawn } from "node:child_process";
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..", "..");
const host = process.env.ATLAS_DEMO_HOST ?? process.env.ATLAS_HOST ?? "127.0.0.1";
const port = Number(process.env.ATLAS_DEMO_PORT ?? "4174");
const adminPort = Number(process.env.ATLAS_ADMIN_PORT ?? "4175");
const adminHost = process.env.ATLAS_ADMIN_HOST ?? process.env.ATLAS_HOST ?? "127.0.0.1";
const adminUrl = `http://${adminHost}:${adminPort}/`;
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

await startAdministrationServerIfNeeded();

createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", "http://localhost");
  const requestPath = requestUrl.pathname === "/"
    ? "/examples/status-demo/index.html"
    : requestUrl.pathname;
  const requestedFilePath = resolve(root, `.${normalize(requestPath)}`);
  if (existsSync(requestedFilePath) && statSync(requestedFilePath).isDirectory() && !requestPath.endsWith("/")) {
    response.writeHead(308, { location: `${requestPath}/` });
    response.end();
    return;
  }
  const filePath = resolveRequestFilePath(requestedFilePath);

  if (!filePath.startsWith(root) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": mimeTypes[extname(filePath)] ?? "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}).listen(port, host, () => {
  console.log(`ATLAS status demo: http://${host}:${port}/`);
});

async function startAdministrationServerIfNeeded() {
  if (await isServerReady(adminUrl)) {
    console.log(`ATLAS administration already running: ${adminUrl}`);
    return;
  }

  const adminServerPath = resolve(root, "examples/admin-demo/server.mjs");
  const adminProcess = spawn(process.execPath, [adminServerPath], {
    cwd: root,
    env: {
      ...process.env,
      ATLAS_ADMIN_PORT: String(adminPort),
      ATLAS_ADMIN_HOST: adminHost,
    },
    stdio: "inherit",
  });

  adminProcess.on("error", error => {
    console.warn(`ATLAS administration could not start: ${error.message}`);
  });

  if (await waitForServer(adminUrl, 2500)) {
    return;
  }

  console.warn(`ATLAS administration was requested but did not answer at ${adminUrl} yet.`);
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

function resolveRequestFilePath(requestedFilePath) {
  if (existsSync(requestedFilePath) && statSync(requestedFilePath).isDirectory()) {
    return resolve(requestedFilePath, "index.js");
  }

  return !existsSync(requestedFilePath) && extname(requestedFilePath) === ""
    ? `${requestedFilePath}.js`
    : requestedFilePath;
}
