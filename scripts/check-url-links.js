const { spawn } = require('child_process');
const net = require('net');

async function waitForPort(port, maxMs = 60000) {
  const deadline = Date.now() + maxMs;
  while (Date.now() < deadline) {
    try {
      await new Promise((resolve, reject) => {
        const sock = net.createConnection({ port, host: 'localhost' });
        sock.once('connect', () => { sock.destroy(); resolve(); });
        sock.once('error', err => { sock.destroy(); reject(err); });
      });
      return;
    } catch {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  throw new Error(`Port ${port} not available after ${maxMs}ms`);
}

async function main() {
  const server = spawn('npm', ['run', 'examples'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  server.on('error', err => {
    process.stderr.write('Server spawn error: ' + err.message + '\n');
  });

  let browser;
  try {
    process.stderr.write('Waiting for dev server on port 1234...\n');
    await waitForPort(1234);
    process.stderr.write('Server ready.\n');

    const { chromium } = require('playwright');
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('http://localhost:1234', { waitUntil: 'load', timeout: 30000 });
    // Wait for React to finish rendering
    await page.waitForSelector('section', { timeout: 15000 });

    const allAnchors = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const urlSection = sections.find(s => {
        const h2 = s.querySelector('h2');
        return h2 && h2.textContent.trim() === 'URL Linkification';
      });
      if (!urlSection) return [];
      return Array.from(urlSection.querySelectorAll('a')).map(a => ({
        text: a.textContent.trim(),
        href: a.getAttribute('href'),
      }));
    });

    const TARGETS = [
      'react.dev',
      'www.reactjs.org',
      'react-core@meta.com',
    ];

    const matched = TARGETS.map(pattern => {
      const found = allAnchors.find(a => a.href && a.href.includes(pattern));
      return found || null;
    });

    const pass = matched.every(a => a !== null);
    const anchors = matched.filter(Boolean);

    const result = { pass, anchors };
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  } finally {
    if (browser) await browser.close();
    server.kill('SIGTERM');
    await new Promise(r => setTimeout(r, 800));
    if (!server.killed) server.kill('SIGKILL');
  }
}

main().catch(err => {
  process.stderr.write('Fatal: ' + err.message + '\n');
  process.exit(1);
});
