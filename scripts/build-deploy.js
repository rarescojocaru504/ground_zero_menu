// Copies only the files the website needs into _deploy/menu, ready to zip and upload.
// Run with: npm run build
// Leaves out the full-size PNG originals, tests, node_modules and the rest of the repo.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const out = path.join(root, '_deploy', 'menu');

// what goes into the package (folders are copied only with the listed extensions)
const include = [
  { file: 'index.html' },
  { file: 'despre_gz_ro.html' },            // flyer pages behind the "Despre gama ..." buttons
  { file: 'despre_gz_en.html' },
  { file: 'despre_deranj_ro.html' },
  { file: 'despre_deranj_en.html' },
  { file: 'css/styles.css' },
  { file: 'css/despre.css' },
  { file: 'js/despre.js' },
  { file: 'js/lang.js' },
  { file: 'js/script.js' },
  { file: 'assets/img/logo.webp' },
  { file: 'assets/img/logo.png' },          // browser tab icon
  { dir: 'assets/bottles', ext: '.webp' },
  { dir: 'assets/bottles/large', ext: '.webp' },
  { dir: 'assets/food', ext: '.webp' },
  { dir: 'assets/icons', ext: '.webp' },
  { dir: 'assets/fonts', ext: '.woff2' },
  { file: 'assets/fonts/OFL-bebas-neue.txt' },
  { dir: 'assets/despre', ext: '.webp' },
  { dir: 'assets/pdf', ext: '.pdf' },       // not linked from the menu any more, kept for old links
];

function copy(rel) {
  const target = path.join(out, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(root, rel), target);
}

fs.rmSync(path.join(root, '_deploy'), { recursive: true, force: true });

let count = 0;
for (const item of include) {
  if (item.file) {
    copy(item.file);
    count++;
    continue;
  }
  for (const name of fs.readdirSync(path.join(root, item.dir))) {
    if (name.endsWith(item.ext)) {
      copy(`${item.dir}/${name}`);
      count++;
    }
  }
}

// Safety check: every file the page refers to must be in the package.
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const pages = include.filter(i => i.file && i.file.endsWith('.html')).map(i => i.file);
const refs = new Set();
for (const page of pages) {
  for (const m of read(page).matchAll(/(?:src|href|data-logo)="((?:assets|css|js)\/[^"?#]+|despre_\w+\.html)/g)) refs.add(m[1]);
}
for (const m of read('css/styles.css').matchAll(/url\('\.\.\/(assets\/[^']+)'\)/g)) refs.add(m[1]);
for (const m of read('js/lang.js').matchAll(/"(assets\/pdf\/[^"]+|despre_\w+\.html)"/g)) refs.add(m[1]);
for (const ref of [...refs]) {
  // every small bottle also needs its large version for the zoom
  const bottle = ref.match(/^assets\/bottles\/([^/]+\.webp)$/);
  if (bottle) refs.add(`assets/bottles/large/${bottle[1]}`);
}
const missing = [...refs].filter(ref => !fs.existsSync(path.join(out, ref)));

if (missing.length) {
  console.error('These files are used by the page but missing from the package:');
  missing.forEach(m => console.error('  ' + m));
  process.exit(1);
}
console.log(`_deploy/menu is ready: ${count} files. Zip what's inside it and upload (see README).`);
