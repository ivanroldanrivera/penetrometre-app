const CACHE = 'pdl-v6';
const LOCAL = [
  '/penetrometre-app/',
  '/penetrometre-app/index.html',
  '/penetrometre-app/rapport.html',
  '/penetrometre-app/manifest.json'
];
const CDN = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => {
      // Pre-cache local files (must succeed)
      return c.addAll(LOCAL).then(() => {
        // Pre-cache CDN (best-effort, ignore failures)
        return Promise.allSettled(CDN.map(url =>
   