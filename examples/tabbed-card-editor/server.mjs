import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..", "..");
const port = Number(process.env.TABBED_CARD_EDITOR_PORT ?? "4176");
const basePath = "/examples/tabbed-card-editor";
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", "http://localhost");
  const requestPath = requestUrl.pathname === "/"
    ? `${basePath}/index.html`
    : requestUrl.pathname;
  const requestedFilePath = resolve(root, `.${normalize(requestPath)}`);
  const filePath = resolveRequestFilePath(requestedFilePath);

  if (!filePath.startsWith(root) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": mimeTypes[extname(filePath)] ?? "application/octet-stream",
    "cache-control": "no-store",
  });
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Tabbed Card Visual Editor: http://127.0.0.1:${port}/`);
});

function resolveRequestFilePath(requestedFilePath) {
  if (existsSync(requestedFilePath) && statSync(requestedFilePath).isDirectory()) {
    return resolve(requestedFilePath, "index.html");
  }

  return !existsSync(requestedFilePath) && extname(requestedFilePath) === ""
    ? `${requestedFilePath}.js`
    : requestedFilePath;
}
