// Minimal dependency-free static server for the Next.js static export (out/).
// Maps clean routes like /about and /data to about.html / data.html, and
// /articles/<slug> to articles/<slug>.html, matching `output: "export"`.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join } from "node:path";

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT) || 4173;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".mp3": "audio/mpeg",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
};

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function resolveFile(rawUrl) {
  let pathname = decodeURIComponent(rawUrl.split("?")[0]);
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  const rel = pathname === "/" ? "index.html" : pathname.slice(1);
  const candidates =
    pathname === "/"
      ? ["index.html"]
      : [rel, `${rel}.html`, join(rel, "index.html")];

  for (const candidate of candidates) {
    const file = join(root, candidate);
    if (await isFile(file)) return file;
  }

  const notFound = join(root, "404.html");
  if (await isFile(notFound)) return notFound;
  return null;
}

const server = http.createServer(async (req, res) => {
  const file = await resolveFile(req.url || "/");
  if (!file) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }
  try {
    const data = await readFile(file);
    res.setHeader("Content-Type", TYPES[extname(file)] || "application/octet-stream");
    res.statusCode = file.endsWith("404.html") ? 404 : 200;
    res.end(data);
  } catch {
    res.statusCode = 500;
    res.end("Internal error");
  }
});

server.listen(port, () => {
  console.log(`Serving out/ at http://localhost:${port}`);
});
