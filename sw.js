// Service Worker: macht die App offline-fähig.
// Strategie "stale-while-revalidate": sofort aus dem Cache laden (schnell, auch ohne Netz im Gym),
// im Hintergrund die neueste Version holen und für das nächste Öffnen speichern.
const CACHE = 'gymlog-v1';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(e.request, { ignoreSearch: true });
    const network = fetch(e.request)
      .then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; })
      .catch(() => cached);
    return cached || network;
  }));
});
