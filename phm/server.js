/**
 * BFF server for production: serves the SPA and proxies /api to the backend.
 * This keeps the backend URL (e.g. localhost:8080) off the client – the browser
 * only talks to this server; API calls are same-origin (/api/v1/...).
 *
 * Usage:
 *   1. Build frontend: npm run build
 *   2. Start backend on port 8080
 *   3. Start BFF: node server.js
 *   4. Open http://localhost:3000
 *
 * Set BACKEND_URL to point to your API (default http://localhost:8080).
 */
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const PORT = parseInt(process.env.PORT || '3000', 10);
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

function serveFile(filePath, res, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

function proxyToBackend(req, res, pathname, search) {
  const backendPath = pathname + (search || '');
  const opts = {
    hostname: url.parse(BACKEND_URL).hostname,
    port: url.parse(BACKEND_URL).port || 80,
    path: backendPath,
    method: req.method,
    headers: { ...req.headers, host: url.parse(BACKEND_URL).host },
  };
  const proxy = http.request(opts, (backendRes) => {
    res.writeHead(backendRes.statusCode, backendRes.headers);
    backendRes.pipe(res);
  });
  proxy.on('error', () => {
    res.writeHead(502);
    res.end('Bad Gateway');
  });
  req.pipe(proxy);
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname || '/';

  if (pathname.startsWith('/api/')) {
    proxyToBackend(req, res, pathname, parsed.search || '');
    return;
  }

  let filePath = path.join(__dirname, 'dist', pathname === '/' ? 'index.html' : pathname);
  if (!pathname.includes('.')) {
    filePath = path.join(__dirname, 'dist', 'index.html');
  }
  const ext = path.extname(filePath);
  const types = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
  };
  serveFile(filePath, res, types[ext] || 'application/octet-stream');
});

server.listen(PORT, () => {
  console.log(`BFF server at http://localhost:${PORT} (proxying /api to ${BACKEND_URL})`);
});
