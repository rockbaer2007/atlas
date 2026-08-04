import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..", "..");
const port = Number(process.env.ATLAS_ADMIN_PORT ?? "4175");
const defaultTranslationApiEndpoint = "https://api.deepl.com/v2/translate";
const translationProviderValues = ["none", "chatgpt", "gemini", "deepl-free", "deepl-pro", "custom-ai"];
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};
let adminConnectionSettings;

createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", "http://localhost");
  if (requestUrl.pathname === "/api/admin-connection") {
    void handleAdminConnectionRequest(request, response);
    return;
  }

  const requestPath = requestUrl.pathname === "/"
    ? "/examples/admin-demo/index.html"
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
}).listen(port, "127.0.0.1", () => {
  console.log(`ATLAS administration: http://127.0.0.1:${port}/`);
});

async function handleAdminConnectionRequest(request, response) {
  writeCorsHeaders(response);

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === "GET") {
    response.writeHead(adminConnectionSettings ? 200 : 404, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    });
    response.end(JSON.stringify(adminConnectionSettings ? sanitizeAdminConnectionSettings(adminConnectionSettings) : { error: "not configured" }));
    return;
  }

  if (request.method === "PUT") {
    const body = await readRequestBody(request);
    const settings = JSON.parse(body || "{}");
    adminConnectionSettings = normalizeAdminConnectionSettings(settings);
    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    });
    response.end(JSON.stringify({ ok: true }));
    return;
  }

  if (request.method === "DELETE") {
    adminConnectionSettings = undefined;
    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    });
    response.end(JSON.stringify({ ok: true }));
    return;
  }

  response.writeHead(405, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify({ error: "method not allowed" }));
}

function writeCorsHeaders(response) {
  response.setHeader("access-control-allow-origin", "http://127.0.0.1:4174");
  response.setHeader("access-control-allow-methods", "GET, PUT, DELETE, OPTIONS");
  response.setHeader("access-control-allow-headers", "content-type");
}

function readRequestBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", chunk => {
      body += chunk;
      if (body.length > 8192) {
        rejectBody(new Error("Request body too large."));
        request.destroy();
      }
    });
    request.on("end", () => resolveBody(body));
    request.on("error", rejectBody);
  });
}

function normalizeAdminConnectionSettings(settings) {
  const translationProvider = normalizeTranslationProvider(settings.translationProvider);
  const translationApiKeys = normalizeTranslationApiKeys(settings.translationApiKeys);
  return {
    url: typeof settings.url === "string" ? settings.url : "",
    token: typeof settings.token === "string" ? settings.token : "",
    autoConnectEditor: settings.autoConnectEditor === true,
    translationProvider,
    translationApiEndpoint: normalizeTranslationApiEndpoint(settings.translationApiEndpoint),
    translationApiKeys,
    translationApiKeyConfigured: hasTranslationApiKey(translationProvider, translationApiKeys),
    updatedAt: new Date().toISOString(),
  };
}

function normalizeTranslationProvider(value) {
  return translationProviderValues.includes(value) ? value : "none";
}

function normalizeTranslationApiEndpoint(value) {
  if (typeof value !== "string" || !value.trim()) {
    return defaultTranslationApiEndpoint;
  }

  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.toString() : defaultTranslationApiEndpoint;
  } catch {
    return defaultTranslationApiEndpoint;
  }
}

function normalizeTranslationApiKeys(keys) {
  return Object.fromEntries(
    translationProviderValues
      .filter(provider => provider !== "none")
      .map(provider => [provider, typeof keys?.[provider] === "string" ? keys[provider].trim() : ""]),
  );
}

function hasTranslationApiKey(provider, keys) {
  return Boolean(keys?.[normalizeTranslationProvider(provider)]?.trim());
}

function sanitizeAdminConnectionSettings(settings) {
  return {
    url: settings.url,
    token: settings.token,
    autoConnectEditor: settings.autoConnectEditor,
    translationProvider: settings.translationProvider,
    translationApiEndpoint: settings.translationApiEndpoint,
    translationApiKeyConfigured: settings.translationApiKeyConfigured,
    updatedAt: settings.updatedAt,
  };
}

function resolveRequestFilePath(requestedFilePath) {
  if (existsSync(requestedFilePath) && statSync(requestedFilePath).isDirectory()) {
    return resolve(requestedFilePath, "index.js");
  }

  return !existsSync(requestedFilePath) && extname(requestedFilePath) === ""
    ? `${requestedFilePath}.js`
    : requestedFilePath;
}
