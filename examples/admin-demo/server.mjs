import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..", "..");
const port = Number(process.env.ATLAS_ADMIN_PORT ?? "4175");
const defaultTranslationApiEndpoint = "https://api.deepl.com/v2/translate";
const translationProviderValues = ["none", "chatgpt", "gemini", "deepl-free", "deepl-pro", "custom-ai"];
const openAiTranslationModel = process.env.ATLAS_OPENAI_TRANSLATION_MODEL ?? "gpt-5.6-luna";
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
  if (requestUrl.pathname === "/api/card-translation") {
    void handleCardTranslationRequest(request, response);
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
    adminConnectionSettings = normalizeAdminConnectionSettings(settings, adminConnectionSettings);
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

async function handleCardTranslationRequest(request, response) {
  writeCorsHeaders(response);

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method !== "POST") {
    response.writeHead(405, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ error: "method not allowed" }));
    return;
  }

  if (!adminConnectionSettings) {
    writeJsonResponse(response, 409, { error: "admin connection is not configured" });
    return;
  }

  const body = await readRequestBody(request);
  const translationRequest = normalizeCardTranslationRequest(JSON.parse(body || "{}"));
  if (!translationRequest.ok) {
    writeJsonResponse(response, 400, { error: translationRequest.error });
    return;
  }

  if (translationRequest.value.provider !== "chatgpt") {
    writeJsonResponse(response, 501, {
      error: `provider ${translationRequest.value.provider} is not connected yet`,
    });
    return;
  }

  const apiKey = adminConnectionSettings.translationApiKeys.chatgpt;
  if (!apiKey) {
    writeJsonResponse(response, 409, { error: "chatgpt api key is not configured" });
    return;
  }

  try {
    const translatedLocales = await translateCardLocaleWithOpenAi({
      apiKey,
      languages: translationRequest.value.languages,
      sourceLocale: translationRequest.value.sourceLocale,
    });
    writeJsonResponse(response, 200, {
      provider: "chatgpt",
      model: openAiTranslationModel,
      locales: translatedLocales,
    });
  } catch (error) {
    writeJsonResponse(response, 502, {
      error: error instanceof Error ? error.message : "translation request failed",
    });
  }
}

function writeJsonResponse(response, statusCode, body) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(body));
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
      if (body.length > 65536) {
        rejectBody(new Error("Request body too large."));
        request.destroy();
      }
    });
    request.on("end", () => resolveBody(body));
    request.on("error", rejectBody);
  });
}

function normalizeAdminConnectionSettings(settings, previousSettings) {
  const translationProvider = normalizeTranslationProvider(settings.translationProvider);
  const translationApiKeys = normalizeTranslationApiKeys(settings.translationApiKeys, previousSettings?.translationApiKeys);
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

function normalizeTranslationApiKeys(keys, previousKeys = {}) {
  return Object.fromEntries(
    translationProviderValues
      .filter(provider => provider !== "none")
      .map(provider => {
        const nextKey = typeof keys?.[provider] === "string" ? keys[provider].trim() : "";
        const previousKey = typeof previousKeys?.[provider] === "string" ? previousKeys[provider].trim() : "";
        return [provider, nextKey || previousKey];
      }),
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
    translationApiKeyConfiguredByProvider: Object.fromEntries(
      translationProviderValues
        .filter(provider => provider !== "none")
        .map(provider => [provider, hasTranslationApiKey(provider, settings.translationApiKeys)]),
    ),
    updatedAt: settings.updatedAt,
  };
}

function normalizeCardTranslationRequest(request) {
  const provider = normalizeTranslationProvider(request.provider);
  const languages = Array.isArray(request.languages)
    ? [...new Set(request.languages.map(language => String(language).trim().toLowerCase()).filter(language => /^[a-z]{2}$/.test(language) && language !== "en"))]
    : [];
  const sourceLocale = request.sourceLocale;
  if (!provider || provider === "none") {
    return { ok: false, error: "translation provider is required" };
  }
  if (languages.length === 0) {
    return { ok: false, error: "at least one target language is required" };
  }
  if (!sourceLocale || typeof sourceLocale !== "object" || !sourceLocale.card || typeof sourceLocale.card !== "object") {
    return { ok: false, error: "source locale card content is required" };
  }

  return {
    ok: true,
    value: {
      provider,
      languages,
      sourceLocale: {
        card: {
          title: String(sourceLocale.card.title ?? ""),
          unavailable: String(sourceLocale.card.unavailable ?? ""),
          replaceDemoEntities: String(sourceLocale.card.replaceDemoEntities ?? ""),
        },
      },
    },
  };
}

async function translateCardLocaleWithOpenAi({ apiKey, languages, sourceLocale }) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: openAiTranslationModel,
      store: false,
      instructions: [
        "You translate Home Assistant custom card locale strings.",
        "Return only JSON matching the schema.",
        "Preserve product names, placeholders, punctuation style and technical terms such as Home Assistant, ATLAS, HACS and entity IDs.",
        "Do not add explanations.",
      ].join(" "),
      input: JSON.stringify({
        sourceLanguage: "en",
        targetLanguages: languages,
        sourceCardLocale: sourceLocale.card,
      }),
      text: {
        format: {
          type: "json_schema",
          name: "atlas_card_locale_translations",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["translations"],
            properties: {
              translations: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["language", "card"],
                  properties: {
                    language: { type: "string" },
                    card: {
                      type: "object",
                      additionalProperties: false,
                      required: ["title", "unavailable", "replaceDemoEntities"],
                      properties: {
                        title: { type: "string" },
                        unavailable: { type: "string" },
                        replaceDemoEntities: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }),
  });

  const responseBody = await response.json().catch(() => undefined);
  if (!response.ok) {
    throw new Error(responseBody?.error?.message ?? `OpenAI translation failed with HTTP ${response.status}`);
  }

  const outputText = extractOpenAiOutputText(responseBody);
  if (!outputText) {
    throw new Error("OpenAI translation did not return JSON text");
  }

  const parsed = JSON.parse(outputText);
  const translations = Array.isArray(parsed.translations) ? parsed.translations : [];
  return translations
    .filter(translation => languages.includes(String(translation.language ?? "").toLowerCase()))
    .map(translation => {
      const language = String(translation.language).toLowerCase();
      return {
        language,
        path: `locales/${language}.json`,
        status: "machine",
        content: {
          _meta: {
            language,
            status: "machine",
            sourceLanguage: "en",
            provider: "chatgpt",
            model: openAiTranslationModel,
            note: "Machine translated by the configured ChatGPT/OpenAI provider. Review before publishing.",
          },
          card: {
            title: String(translation.card?.title ?? sourceLocale.card.title),
            unavailable: String(translation.card?.unavailable ?? sourceLocale.card.unavailable),
            replaceDemoEntities: String(translation.card?.replaceDemoEntities ?? sourceLocale.card.replaceDemoEntities),
          },
        },
      };
    });
}

function extractOpenAiOutputText(responseBody) {
  if (typeof responseBody?.output_text === "string") {
    return responseBody.output_text;
  }

  for (const item of responseBody?.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        return content.text;
      }
    }
  }

  return "";
}

function resolveRequestFilePath(requestedFilePath) {
  if (existsSync(requestedFilePath) && statSync(requestedFilePath).isDirectory()) {
    return resolve(requestedFilePath, "index.js");
  }

  return !existsSync(requestedFilePath) && extname(requestedFilePath) === ""
    ? `${requestedFilePath}.js`
    : requestedFilePath;
}
