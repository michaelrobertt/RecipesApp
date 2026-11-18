/**
 * Static hosts (Surge, GitHub Pages, ...) serve `200.html` for unknown paths.
 * Copying the built index there keeps deep links such as /meals/52771 working
 * after a refresh or when a shared link is opened.
 */
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const indexFile = path.join(buildDir, 'index.html');

if (!fs.existsSync(indexFile)) {
  process.exit(0);
}

fs.copyFileSync(indexFile, path.join(buildDir, '200.html'));
process.stdout.write('Created build/200.html for SPA deep links.\n');
