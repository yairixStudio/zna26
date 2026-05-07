// ZNA 2026 — Service Worker
//
// Three caching strategies for three asset classes:
//   * Shell (HTML/CSS/JS/manifest) → stale-while-revalidate
//   * Artist photos + 3D heroes    → cache-first with LRU cap
//   * Fonts (gstatic)              → cache-first
// YouTube iframes / images are NEVER cached — they must come live so the
// player handshake works and copyright headers stay fresh.
//
// Versioning: bump CACHE_VERSION (or rely on the Action's stamp script
// when you wire one up) to invalidate every old cache on activate.

const CACHE_VERSION = "v2026-05-07";
const SHELL_CACHE   = `zna-shell-${CACHE_VERSION}`;
const PHOTO_CACHE   = `zna-photos-${CACHE_VERSION}`;
const FONT_CACHE    = `zna-fonts-${CACHE_VERSION}`;
const MAX_PHOTOS    = 120;

// Pre-cache the bare minimum app shell so the second visit boots offline.
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./official-artists.js",
  "./photos.json",
  "./manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    // addAll is atomic — if any single URL 404s the whole cache fails. Use
    // individual adds with rejection-tolerance so a missing optional file
    // doesn't break the rest of the install.
    await Promise.all(PRECACHE_URLS.map(url =>
      cache.add(new Request(url, { cache: "reload" })).catch(() => {})
    ));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => {
      if (k !== SHELL_CACHE && k !== PHOTO_CACHE && k !== FONT_CACHE) {
        return caches.delete(k);
      }
    }));
    await self.clients.claim();
  })());
});

// Trim a photo cache to MAX_PHOTOS entries (rough LRU — newest at the end).
async function trimCache(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= max) return;
  for (let i = 0; i < keys.length - max; i++) {
    await cache.delete(keys[i]);
  }
}

function isPhoto(url) {
  return url.pathname.includes("/images/artists/") ||
         url.pathname.includes("/images/zna-3d/") ||
         url.pathname.includes("/images/icons/");
}

function isFont(url) {
  return url.host === "fonts.gstatic.com" || url.host === "fonts.googleapis.com";
}

function isYouTube(url) {
  return url.host.endsWith("youtube.com") ||
         url.host.endsWith("ytimg.com") ||
         url.host.endsWith("youtube-nocookie.com") ||
         url.host.endsWith("googlevideo.com");
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request).then(res => {
    if (res && res.status === 200) cache.put(request, res.clone());
    return res;
  }).catch(() => cached);
  return cached || network;
}

async function cacheFirst(request, cacheName, opts = {}) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const res = await fetch(request);
    if (res && res.status === 200) {
      cache.put(request, res.clone());
      if (opts.maxEntries) trimCache(cacheName, opts.maxEntries);
    }
    return res;
  } catch (err) {
    return cached || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Never touch YouTube — let the iframe API handle its own network.
  if (isYouTube(url)) return;

  // Cross-origin fonts → cache-first, long-lived.
  if (isFont(url)) {
    event.respondWith(cacheFirst(req, FONT_CACHE));
    return;
  }

  // Same-origin only from here on.
  if (url.origin !== self.location.origin) return;

  // Artist photos + festival 3D + icons → cache-first with LRU.
  if (isPhoto(url)) {
    event.respondWith(cacheFirst(req, PHOTO_CACHE, { maxEntries: MAX_PHOTOS }));
    return;
  }

  // App shell + everything else same-origin → stale-while-revalidate so
  // updates land on the next reload but offline still works.
  event.respondWith(staleWhileRevalidate(req, SHELL_CACHE));
});

// Allow the page to ask the SW to skip waiting after an update so the new
// version takes effect on the next navigation without forcing the user to
// close all tabs.
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") self.skipWaiting();
});
