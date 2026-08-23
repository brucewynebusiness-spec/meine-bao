// Minimal offline app-shell cache. Bump CACHE_NAME whenever the cached
// files change meaningfully — old caches are dropped on activate.
const CACHE_NAME = "meine-bao-shell-v2";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./vendor/three.module.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_FILES)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// network-first for same-origin GETs: always try to fetch the latest version
// first, so an update shows up the moment she opens the app while online.
// Only falls back to the cached copy if the network request fails (offline,
// or a flaky connection) — that's what makes the app still open with no signal.
self.addEventListener("fetch", event => {
  const req = event.request;
  if(req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(req).then(res => {
      if(res && res.ok){
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
      }
      return res;
    }).catch(() =>
      caches.open(CACHE_NAME).then(cache => cache.match(req))
    )
  );
});
