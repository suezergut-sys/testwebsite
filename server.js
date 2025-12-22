import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = join(process.cwd(), 'public');
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
};

function resolvePath(urlPath) {
  const safeSuffix = urlPath.replace(/\.\.+/g, '').split('?')[0].split('#')[0];
  return join(PUBLIC_DIR, safeSuffix || '');
}

async function serveStatic(urlPath) {
  const filePath = resolvePath(urlPath === '/' ? '/index.html' : urlPath);
  const contentType = MIME_TYPES[extname(filePath).toLowerCase()] || 'application/octet-stream';
  try {
    const data = await readFile(filePath);
    return { status: 200, headers: { 'Content-Type': contentType }, body: data };
  } catch (err) {
    if (urlPath !== '/index.html' && !extname(urlPath)) {
      return serveStatic('/index.html');
    }
    return { status: 404, headers: { 'Content-Type': 'text/plain' }, body: 'Not Found' };
  }
}

const server = createServer(async (req, res) => {
  const { status, headers, body } = await serveStatic(req.url || '/');
  res.writeHead(status, headers);
  res.end(body);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
