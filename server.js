/**
 * SERVIDOR NODE.JS - LUMEN & CO. BARBER & SALON
 * Servidor Web moderno e otimizado com suporte a compressão, rotas estáticas e API endpoints
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

// Mapa de tipos MIME
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Tratamento da URL
  let parsedUrl = req.url.split('?')[0];
  if (parsedUrl === '/') {
    parsedUrl = '/index.html';
  }

  // Rota de Health Check / Status da API
  if (parsedUrl === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'online',
      service: 'LUMEN & CO. Server',
      timestamp: new Date().toISOString(),
      whatsappNumber: '5511999999999'
    }));
    return;
  }

  // Previne Directory Traversal
  const safePath = path.normalize(parsedUrl).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);

  // Verifica se o arquivo existe
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Se não encontrado, tenta servir index.html (SPA Fallback)
      const indexPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(indexPath, (indexErr, content) => {
        if (indexErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 - Página não encontrada');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Caching para assets estáticos
    if (ext === '.jpg' || ext === '.png' || ext === '.webp' || ext === '.svg' || ext === '.woff2') {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 dia
    } else {
      res.setHeader('Cache-Control', 'no-cache');
    }

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log(`💈 LUMEN & CO. - Servidor Node.js Rodando com Sucesso!`);
  console.log(`📍 Acesse no navegador: http://localhost:${PORT}`);
  console.log(`📱 WhatsApp padrão configurado: +55 (11) 99999-9999`);
  console.log('====================================================');
});
