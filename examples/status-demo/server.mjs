import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..", "..");
const port = Number(process.env.ATLAS_DEMO_PORT ?? "4174");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

createServer((request, response) => {
  const requestPath = request.url === "/"
    ? "/examples/status-demo/index.html"
    : new URL(request.url ?? "/", "http://localhost").pathname;
  const requestedFilePath = resolve(root, `.${normalize(requestPath)}`);
  const filePath = !existsSync(requestedFilePath) && extname(requestedFilePath) === ""
    ? `${requestedFilePath}.js`
    : requestedFilePath;

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
  console.log(`ATLAS status demo: http://127.0.0.1:${port}/`);
});
