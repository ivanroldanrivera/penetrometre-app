const CACHE = 'pdl-v4';
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
          fetch(url, { mode: 'cors' }).then(r => r.ok ? c.put(url, r) : null)
        ));
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        // Cache successful GET responses for next time (offline)
        if (e.request.method === 'GET' && resp && (resp.ok || resp.type === 'opaque')) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone)).catch(()=>{});
        }
        return resp;
      }).catch(() => cached);
    })
  );
});
