const CACHE = 'pdl-v41';
const LOCAL = [
  './',
  './index.html',
  './rapport.html',
  './manifest.json'
];
const CDN = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js',
  'https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.0/dist/jspdf.plugin.autotable.min.js',
  'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => {
      return c.addAll(LOCAL).then(() => {
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

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  // Network-first for HTML so updates are picked up immediately
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(req).then(r => {
        if (r && r.ok) {
          const clone = r.clone();
          caches.open(CACHE).then(c => c.put(req, clone)).catch(()=>{});
        }
        return r;
      }).catch(() => caches.match(req))
    );
    return;
  }
  // Cache-first for everything else.
  // Exception : ne jamais servir une réponse opaque (mise en cache par une
  // requête no-cors) à une requête cors — son corps est illisible (blob vide),
  // ce qui casserait la composition du fond de carte du rapport PDF.
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached && req.mode === 'cors' && cached.type === 'opaque') cached = null;
      return cached || fetch(req).then(r => {
        if (req.method === 'GET' && r && (r.ok || r.type === 'opaque')) {
          const clone = r.clone();
          caches.open(CACHE).then(c => c.put(req, clone)).catch(()=>{});
        }
        return r;
      }).catch(() => cached);
    })
  );
});
