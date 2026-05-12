// ZNA 2026 — Service Worker
//
// Caching strategy:
//   * Shell (HTML/CSS/JS/manifest)  → NETWORK-FIRST. Always try to fetch
//     the latest from GitHub Pages first; fall back to the cached copy
//     only when offline. This way every page load picks up the newest
//     deploy without a hard refresh — no more "I shipped a fix but the
//     user is still on yesterday's bundle".
//   * Artist photos + 3D heroes     → cache-first with LRU cap.
//   * Fonts (gstatic / googleapis)  → cache-first, long-lived.
//
// YouTube iframes / images are NEVER cached — they must come live so the
// player handshake works and copyright headers stay fresh.
//
// Versioning: CACHE_VERSION is replaced at deploy time by the GitHub
// Action ("Stamp Service Worker cache version" step in pages.yml). On
// every deploy, all caches roll over and offline copies are refreshed.

const CACHE_VERSION = "v2026-05-07";
const SHELL_CACHE   = `zna-shell-${CACHE_VERSION}`;
const PHOTO_CACHE   = `zna-photos-${CACHE_VERSION}`;
const FONT_CACHE    = `zna-fonts-${CACHE_VERSION}`;
const MAX_PHOTOS    = 120;

// Pre-cache the bare minimum app shell so the second visit boots offline.
// Online visits ALWAYS hit the network first (see networkFirst below); the
// pre-cache is purely the offline fallback.
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
    // Skip the standard "wait until all tabs close" handoff — combined
    // with clients.claim() in activate, the new SW takes control on the
    // very next fetch in any open tab.
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    // Drop every cache whose key doesn't match the CURRENT versioned
    // names — that's how a fresh deploy invalidates yesterday's bundle.
    await Promise.all(keys.map(k => {
      if (k !== SHELL_CACHE && k !== PHOTO_CACHE && k !== FONT_CACHE) {
        return caches.delete(k);
      }
    }));
    await self.clients.claim();
    // Wake up every open tab and tell it a new SW is in charge. The
    // page's reload-on-update handler in app.js does a one-time refresh
    // so the user lands on the fresh bundle without a manual hard reload.
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    clients.forEach(c => c.postMessage({ type: "sw-activated", version: CACHE_VERSION }));
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

// NETWORK-FIRST: try the network with a short timeout, fall back to cache
// only when we can't reach origin (offline / flaky cellular). Fresh
// responses are written into the cache so offline still works.
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    // 6s timeout — enough for slow mobile, short enough that a dead
    // network doesn't make the page hang on every request.
    const network = await Promise.race([
      fetch(request, { cache: "no-store" }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 6000))
    ]);
    if (network && network.status === 200) {
      cache.put(request, network.clone());
    }
    return network;
  } catch (_) {
    const cached = await cache.match(request);
    if (cached) return cached;
    // Last-resort fallback: cached "./" (root) for navigations.
    if (request.mode === "navigate") {
      const root = await cache.match("./");
      if (root) return root;
    }
    return Response.error();
  }
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

  // App shell + everything else same-origin → network-first so a deploy
  // is reflected on the very next page load. Cache is the offline
  // fallback only.
  event.respondWith(networkFirst(req, SHELL_CACHE));
});

// Allow the page to ask the SW to skip waiting after an update so the new
// version takes effect on the next navigation without forcing the user to
// close all tabs.
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting" || event.data?.type === "skipWaiting") {
    self.skipWaiting();
  }
});
