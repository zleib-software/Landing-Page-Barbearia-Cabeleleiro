const http = require('http');

const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/css/style.css',
  'http://localhost:3000/css/components.css',
  'http://localhost:3000/js/config.js',
  'http://localhost:3000/js/whatsapp.js',
  'http://localhost:3000/js/app.js',
  'http://localhost:3000/assets/images/hero-bg.jpg',
  'http://localhost:3000/api/status'
];

async function runTests() {
  console.log('Testing endpoints on Node server:');
  for (const url of urls) {
    await new Promise((resolve) => {
      http.get(url, (res) => {
        console.log(`[${res.statusCode}] ${res.headers['content-type']} - ${url}`);
        resolve();
      }).on('error', (e) => {
        console.error(`[ERROR] ${url}: ${e.message}`);
        resolve();
      });
    });
  }
}

runTests();
