// Pin Masters RPG v0.8.0 service worker: cache-first app shell for offline play. Version changes on every build.
const CACHE = 'pin-masters-779e92a053';
const FILES = ["./","./assets/audio/manifest.json","./index.html","./privacy.html","./terms.html","./manifest.webmanifest","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  // Network-first for the page (picks up new builds when online), cache fallback offline; cache-first for everything else.
  if (e.request.mode === 'navigate') {
    // Cache each page under its own URL (so opening privacy.html never overwrites the cached game page).
    const u = new URL(e.request.url); const isApp = u.pathname.endsWith('/') || u.pathname.endsWith('/index.html');
    e.respondWith(fetch(e.request).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(isApp ? './index.html' : e.request, c)); } return r; })
      .catch(() => caches.match(isApp ? './index.html' : e.request, { ignoreSearch: true }).then(r => r || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
