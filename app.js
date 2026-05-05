// ZNA 2026 - Reel-style scroll-snap experience
// Vertical = hero + one section per artist
// Horizontal (within each artist) = panels: hero / bio / discography / tracks / links

const reel = document.getElementById("reel");
const hud = document.getElementById("hud");
const hudPos = document.getElementById("hud-pos");
const verticalProgress = document.getElementById("vertical-progress");
const bgScene = document.getElementById("bg-scene");

// Stage selector dropdown
const stageSelectEl = document.getElementById("stage-select");
const stageSelectTrigger = document.getElementById("stage-select-trigger");
const stageSelectLabel = document.getElementById("stage-select-label");
const stageSelectMenu = document.getElementById("stage-select-menu");

// Top-bar action buttons
const logoBtn = document.getElementById("logo-btn");
const searchBtn = document.getElementById("search-btn");
const searchOverlay = document.getElementById("search-overlay");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

// Mini-player
const miniPlayer = document.getElementById("mini-player");
const miniPlayerFrame = document.getElementById("mini-player-frame");
const miniPlayerTitle = document.getElementById("mini-player-title");
const miniPlayerArtist = document.getElementById("mini-player-artist");
const miniPlayerNext = document.getElementById("mini-player-next");
const miniPlayerExpand = document.getElementById("mini-player-expand");
const miniPlayerClose = document.getElementById("mini-player-close");
const miniPlayerSkip = document.getElementById("mini-player-skip");

// Build a flat playback queue across the currently rendered (filtered+sorted) reel
function buildPlayQueue() {
  const queue = [];
  getFilteredArtists().forEach(a => {
    (a.tracks || []).forEach(t => {
      queue.push({
        videoId: t.id,
        title: t.title,
        year: t.year,
        artistId: a.id,
        artistName: a.name
      });
    });
  });
  return queue;
}

let playQueue = [];
let queueIndex = -1;
let ytPlayer = null;
let ytApiReady = !!(window.YT && window.YT.Player);
let pendingFirstPlay = null;

// Lazy-load the YouTube IFrame API
function ensureYTApi() {
  if (ytApiReady || document.querySelector('script[data-yt-api]')) return;
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  tag.dataset.ytApi = "1";
  document.head.appendChild(tag);
}

window.onYouTubeIframeAPIReady = function () {
  try {
    ytApiReady = true;
    if (pendingFirstPlay) {
      const { videoId, host } = pendingFirstPlay;
      pendingFirstPlay = null;
      createPlayer(videoId, host || miniPlayerFrame);
    }
  } catch (e) { console.error("YT api ready error:", e); }
};

// ===== Playback state machine =====
// Single iframe is moved between an inline track-frame and the mini-player.
// State is captured by these three vars.
let playerLocation = "none"; // "none" | "inline" | "mini"
let inlineHostEl = null;     // when "inline", the .track-frame host
let currentVideoId = null;
let inlineFrameObserver = null;

function createPlayer(videoId, host) {
  if (!host || !window.YT || !window.YT.Player) return;
  try {
    host.innerHTML = '<div id="yt-player-target"></div>';
    ytPlayer = new YT.Player("yt-player-target", {
      height: "100%",
      width: "100%",
      videoId: videoId,
      playerVars: { autoplay: 1, rel: 0, playsinline: 1, modestbranding: 1 },
      events: {
        onStateChange: e => {
          if (e.data === YT.PlayerState.ENDED) onVideoEnded();
        },
        onError: e => { console.warn("YT player error:", e?.data); }
      }
    });
  } catch (e) {
    console.error("createPlayer failed:", e);
    host.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }
}

function getPlayerIframe() {
  if (ytPlayer && typeof ytPlayer.getIframe === "function") return ytPlayer.getIframe();
  return miniPlayerFrame?.querySelector("iframe") || (inlineHostEl ? inlineHostEl.querySelector("iframe") : null);
}

// Restore the original thumb markup of an inline frame so the user can
// re-click the track later. Uses the cardHtml we stashed at click time.
function restoreInlineThumb(host) {
  if (!host) return;
  const card = host.closest(".track-card");
  if (!card || !host.dataset.cardHtml) return;
  card.outerHTML = host.dataset.cardHtml;
}

// Move the iframe DOM node to the requested host (inline frame or mini frame)
// without unmounting it. Audio/playback continues seamlessly.
function moveIframeTo(targetHost) {
  const iframe = getPlayerIframe();
  if (!iframe || !targetHost) return;
  if (iframe.parentElement === targetHost) return;
  // If we're leaving an inline host that isn't the new target, restore its thumb
  if (playerLocation === "inline" && inlineHostEl && inlineHostEl !== targetHost) {
    restoreInlineThumb(inlineHostEl);
  }
  targetHost.innerHTML = "";
  targetHost.appendChild(iframe);
}

// Top-level click router: a single delegated handler covers all thumbs,
// including ones rebuilt from outerHTML during thumb-restoration.
reel.addEventListener("click", e => {
  const thumb = e.target.closest(".track-thumb");
  if (!thumb) return;
  e.preventDefault();
  prepareInlineFrameAndPlay(thumb);
});

function prepareInlineFrameAndPlay(thumb) {
  const card = thumb.closest(".track-card");
  if (!card) return;
  const vid = thumb.dataset.vid;

  // Edge case: user clicked the thumb of the same video that's already playing
  // somewhere. Either restore inline (if it was migrated to mini) or no-op.
  if (currentVideoId === vid && ytPlayer) {
    if (playerLocation === "mini") {
      // Bring the player back inline at this thumb's location
      const frame = installFrame(card, thumb, vid);
      moveIframeTo(frame);
      inlineHostEl = frame;
      playerLocation = "inline";
      miniPlayer.classList.remove("is-open");
      miniPlayer.setAttribute("aria-hidden", "true");
      watchInlineFrame(frame);
      updateMiniPlayerUI();
      return;
    }
    // Already inline at the same place - do nothing (let user keep watching)
    return;
  }

  // New video (or different one). Build a frame in this card and play.
  const frame = installFrame(card, thumb, vid);
  startPlayback(vid, frame);
}

function installFrame(card, thumb, vid) {
  const frame = document.createElement("div");
  frame.className = "track-frame";
  frame.dataset.vid = vid;
  frame.dataset.cardHtml = card.outerHTML;
  card.classList.add("is-playing");
  thumb.replaceWith(frame);
  return frame;
}

// Watch the inline frame: if it leaves the visible area (user swipes to
// another panel or scrolls to another artist), migrate the player to mini.
function watchInlineFrame(frame) {
  if (inlineFrameObserver) {
    try { inlineFrameObserver.disconnect(); } catch (_) {}
  }
  inlineFrameObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting && playerLocation === "inline" && entry.target === inlineHostEl) {
        migratePlayerToMini();
      }
    });
  }, { root: reel, threshold: 0.05 });
  inlineFrameObserver.observe(frame);
}

function migratePlayerToMini() {
  if (playerLocation === "mini" || !inlineHostEl) return;
  moveIframeTo(miniPlayerFrame);
  // restoreInlineThumb already called inside moveIframeTo via the playerLocation check
  if (inlineFrameObserver) {
    try { inlineFrameObserver.disconnect(); } catch (_) {}
    inlineFrameObserver = null;
  }
  inlineHostEl = null;
  playerLocation = "mini";
  miniPlayer.classList.add("is-open");
  miniPlayer.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-mini-player");
  updateMiniPlayerUI();
}

function updateMiniPlayerUI() {
  const cur = playQueue[queueIndex];
  const next = playQueue[queueIndex + 1];
  if (cur) {
    miniPlayerTitle.textContent = cur.title;
    miniPlayerArtist.textContent = cur.artistName;
  }
  if (next) {
    miniPlayerNext.textContent = `${next.artistName} — ${next.title}`;
    miniPlayerNext.classList.add("has-next");
  } else {
    miniPlayerNext.textContent = "סוף הרשימה";
    miniPlayerNext.classList.remove("has-next");
  }
}

function playFromQueue(idx, options = {}) {
  if (idx < 0 || idx >= playQueue.length) return;
  queueIndex = idx;
  const item = playQueue[idx];

  // Default target: wherever the player currently lives. On a fresh inline
  // click, options.inlineHost overrides.
  const targetInline = options.inlineHost || (playerLocation === "inline" ? inlineHostEl : null);
  const host = targetInline || miniPlayerFrame;

  currentVideoId = item.videoId;

  if (ytPlayer && ytApiReady) {
    // Player exists: move iframe to target host (no-op if already there) and load new video
    moveIframeTo(host);
    try { ytPlayer.loadVideoById(item.videoId); } catch (e) { console.warn(e); }
  } else if (ytApiReady) {
    createPlayer(item.videoId, host);
  } else {
    pendingFirstPlay = { videoId: item.videoId, host };
    ensureYTApi();
  }

  if (targetInline) {
    inlineHostEl = targetInline;
    playerLocation = "inline";
    miniPlayer.classList.remove("is-open");
    miniPlayer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-mini-player");
    watchInlineFrame(targetInline);
  } else {
    inlineHostEl = null;
    playerLocation = "mini";
    miniPlayer.classList.add("is-open");
    miniPlayer.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-mini-player");
  }

  updateMiniPlayerUI();
}

function onVideoEnded() {
  const prev = playQueue[queueIndex];
  const nextIdx = queueIndex + 1;
  if (nextIdx >= playQueue.length) return;
  const next = playQueue[nextIdx];

  // If user is sitting on the previously-playing artist's section, follow along
  if (prev && next && prev.artistId !== next.artistId) {
    const currentSec = getCurrentSection();
    if (currentSec && currentSec.dataset.artistId === prev.artistId) {
      const nextSec = reel.querySelector(`[data-artist-id="${next.artistId}"]`);
      if (nextSec) {
        nextSec.scrollIntoView({ behavior: "smooth" });
        // Also slide the inner pager to the tracks panel (panel index 3)
        setTimeout(() => {
          const pager = nextSec.querySelector(".pager");
          if (pager && pager.children[3]) {
            pager.children[3].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
          }
        }, 450);
      }
    }
  }

  playFromQueue(nextIdx);
}

function startPlayback(videoId, inlineHost) {
  playQueue = buildPlayQueue();
  const idx = playQueue.findIndex(item => item.videoId === videoId);
  if (idx === -1) {
    playQueue = [{ videoId, title: "", year: null, artistId: null, artistName: "" }];
    playFromQueue(0, { inlineHost });
  } else {
    playFromQueue(idx, { inlineHost });
  }
}

function closeMiniPlayer() {
  miniPlayer.classList.remove("is-open", "is-expanded");
  miniPlayer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-mini-player");
  // Also restore any inline thumb that might be lingering
  if (playerLocation === "inline" && inlineHostEl) {
    restoreInlineThumb(inlineHostEl);
    inlineHostEl = null;
  }
  if (inlineFrameObserver) {
    try { inlineFrameObserver.disconnect(); } catch (_) {}
    inlineFrameObserver = null;
  }
  if (ytPlayer && typeof ytPlayer.stopVideo === "function") {
    try { ytPlayer.stopVideo(); } catch (e) {}
    try { ytPlayer.destroy(); } catch (e) {}
  }
  if (miniPlayerFrame) miniPlayerFrame.innerHTML = "";
  ytPlayer = null;
  playerLocation = "none";
  currentVideoId = null;
  queueIndex = -1;
}

miniPlayerClose.addEventListener("click", closeMiniPlayer);
miniPlayerExpand.addEventListener("click", () => {
  miniPlayer.classList.toggle("is-expanded");
});
miniPlayerSkip.addEventListener("click", onVideoEnded);

// Active stage filter ("all" = show every artist)
let activeStageFilter = "all";

// Try to load build-time-fetched photos and merge them onto artist records.
// photos.json is generated by build/fetch-photos.mjs in the GitHub Action.
async function loadPhotos() {
  try {
    const res = await fetch("photos.json", { cache: "no-cache" });
    if (!res.ok) return;
    const photos = await res.json();
    let merged = 0;
    ARTISTS.forEach(a => {
      if (photos[a.id] && !a.photo) {
        a.photo = photos[a.id];
        merged++;
      }
    });
    if (merged > 0) {
      try {
        // Don't disturb a playing video - the player lives outside the reel.
        buildReel();
        observeSections();
        setActiveSection(reel.querySelector(".section"));
      } catch (e) { console.warn("photo re-render failed:", e); }
    }
  } catch (e) { /* photos.json optional */ }
}

// Sort artists by announcement date - newest first
const SORTED_ARTISTS = ARTISTS.slice().sort((a, b) => {
  const ax = a.announcedAt || "0000-00-00";
  const bx = b.announcedAt || "0000-00-00";
  return bx.localeCompare(ax);
});

function getFilteredArtists() {
  return activeStageFilter === "all"
    ? SORTED_ARTISTS
    : SORTED_ARTISTS.filter(a => a.stage === activeStageFilter);
}

const stageColor = {
  retro: "linear-gradient(180deg, #0a0524 0%, #1a0a3e 30%, #4a1e6e 60%, #c0367a 80%, #ff7e1f 100%)",
  zambu: "linear-gradient(180deg, #050217 0%, #1c0635 30%, #3b0f5b 60%, #6e1d8a 80%, #ff5c8a 100%)",
  guardians: "linear-gradient(180deg, #0a1024 0%, #0f1f4a 30%, #134f6e 60%, #229ec0 80%, #FEB447 100%)",
  market: "linear-gradient(180deg, #100b24 0%, #2b1a4a 30%, #5b2e7a 60%, #b04c8a 80%, #ffbf69 100%)"
};

function getInitials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function stageInfo(id) {
  return FESTIVAL.stages.find(s => s.id === id) || { name: id, desc: "" };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ===== Build sections =====

function heroSection() {
  return `
    <section class="section hero-section" data-section="hero" data-stage="retro">
      <div class="logo-mark">ZNA<br/>2026</div>
      <div class="hero-subtitle">RETRO · FUTURISTIC · GATHERING</div>
      <p class="hero-tagline">${escapeHtml(FESTIVAL.description)}</p>
      <div class="hero-meta">
        <span><strong>📅</strong> ${escapeHtml(FESTIVAL.dates)}</span>
        <span><strong>📍</strong> ${escapeHtml(FESTIVAL.location)}</span>
        <span><strong>🎧</strong> ${ARTISTS.length} אומנים</span>
      </div>
      <button class="hero-cta" id="cta-start">
        בואו נתחיל
      </button>
    </section>
  `;
}

function stageHeroSection(stageId) {
  const stage = FESTIVAL.stages.find(s => s.id === stageId);
  if (!stage) return "";
  const count = ARTISTS.filter(a => a.stage === stageId).length;
  return `
    <section class="section hero-section" data-section="hero" data-stage="${escapeHtml(stageId)}">
      <div class="logo-mark" style="font-size: clamp(40px, 11vw, 90px);">${escapeHtml(stage.name)}</div>
      <div class="hero-subtitle">${escapeHtml(stage.name.toUpperCase())}</div>
      <p class="hero-tagline">${escapeHtml(stage.desc)}</p>
      <div class="hero-meta">
        <span><strong>🎧</strong> ${count} אומנים</span>
        <span><strong>📅</strong> ${escapeHtml(FESTIVAL.dates)}</span>
      </div>
      <button class="hero-cta" id="cta-start">בואו נתחיל</button>
    </section>
  `;
}

function panelHero(a) {
  const initials = getInitials(a.name);
  const tags = (a.tags || []).slice(0, 4).map(t => `<span class="chip">${escapeHtml(t)}</span>`).join("");
  const photo = a.photo
    ? `<img class="artist-photo" src="${escapeHtml(a.photo)}" alt="${escapeHtml(a.name)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.classList.add('photo-failed'); this.remove();" />`
    : "";
  return `
    <div class="panel panel-hero">
      <div class="panel-inner center">
        <div class="panel-eyebrow">${escapeHtml(stageInfo(a.stage).name)}</div>
        <div class="artist-hero-art ${a.photo ? "has-photo" : ""}" style="--accent: ${a.color || "#FEB447"};">
          ${photo}
          <span class="artist-initials">${initials}</span>
        </div>
        <div class="artist-name">${escapeHtml(a.name)}</div>
        <div class="artist-real">${escapeHtml(a.realName || "")}</div>
        <div class="artist-quick">
          <span class="chip cyan">📍 ${escapeHtml(a.country)}</span>
          ${a.age ? `<span class="chip cyan">🎂 ${a.age}</span>` : ""}
          <span class="chip pink">🎧 ${escapeHtml(a.role)}</span>
        </div>
        <div class="artist-quick" style="margin-top:6px;">${tags}</div>
      </div>
    </div>
  `;
}

function panelBio(a) {
  return `
    <div class="panel">
      <div class="panel-inner">
        <div class="panel-eyebrow">ביוגרפיה</div>
        <div class="bio-card">
          <p class="bio-text">${escapeHtml(a.bio || "")}</p>
          ${a.notable ? `<div class="notable">★ ${escapeHtml(a.notable)}</div>` : ""}
        </div>
      </div>
    </div>
  `;
}

function panelAlbums(a) {
  if (!a.albums || !a.albums.length) {
    return `
      <div class="panel">
        <div class="panel-inner">
          <div class="panel-eyebrow">דיסקוגרפיה</div>
          <p class="muted">המידע יתעדכן בקרוב</p>
        </div>
      </div>
    `;
  }
  const items = a.albums.map(al => `
    <li>
      <span class="album-name">${escapeHtml(al.name)}</span>
      <span class="album-meta">${al.project ? escapeHtml(al.project) + " · " : ""}${escapeHtml(String(al.year))}</span>
    </li>
  `).join("");
  return `
    <div class="panel">
      <div class="panel-inner">
        <div class="panel-eyebrow">דיסקוגרפיה נבחרת</div>
        <ul class="albums-list">${items}</ul>
      </div>
    </div>
  `;
}

function panelTracks(a) {
  const tracks = a.tracks || [];
  if (!tracks.length) {
    const q = encodeURIComponent(a.name + " " + (a.tags || []).slice(0, 1).join(" "));
    return `
      <div class="panel">
        <div class="panel-inner center">
          <div class="panel-eyebrow">טראקים</div>
          <p class="no-tracks">עדיין לא הוספנו טראקים מאומתים. חפשו ביוטיוב:</p>
          <a class="search-yt-btn" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">▶ חיפוש ב-YouTube</a>
        </div>
      </div>
    `;
  }
  // Sort: ZNA-festival recordings first, then by year (newest first)
  const sortedTracks = tracks.slice().sort((x, y) => {
    if (!!x.zna !== !!y.zna) return x.zna ? -1 : 1;
    return (y.year || 0) - (x.year || 0);
  });
  const cards = sortedTracks.map((t, i) => {
    const vid = escapeHtml(t.id);
    return `
    <div class="track-card ${t.zna ? "is-zna" : ""}">
      <button class="track-thumb" data-vid="${vid}" data-title="${escapeHtml(t.title)}" data-artist="${escapeHtml(a.name)}" aria-label="נגן ${escapeHtml(t.title)}">
        <img class="track-thumb-img" loading="lazy" decoding="async" alt=""
             src="https://i.ytimg.com/vi/${vid}/mqdefault.jpg"
             onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='https://i.ytimg.com/vi/${vid}/default.jpg';}else{this.style.display='none';}" />
        <span class="play-btn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </span>
      </button>
      <div class="track-meta">
        <span class="track-title">${escapeHtml(t.title)}</span>
        <span class="track-year">${escapeHtml(String(t.year || ""))}</span>
      </div>
    </div>
  `;
  }).join("");
  return `
    <div class="panel">
      <div class="panel-inner">
        <div class="panel-eyebrow">טראקים נבחרים</div>
        <div class="tracks-stack">${cards}</div>
      </div>
    </div>
  `;
}

function panelLinks(a) {
  const links = a.links || [];
  if (!links.length) {
    return `
      <div class="panel">
        <div class="panel-inner center">
          <div class="panel-eyebrow">קישורים</div>
          <p class="muted">בקרוב.</p>
        </div>
      </div>
    `;
  }
  const linkBtns = links.map(l => `
    <a class="link-btn" href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.type)} ↗</a>
  `).join("");
  return `
    <div class="panel">
      <div class="panel-inner">
        <div class="panel-eyebrow">קישורים</div>
        <div class="links-grid">${linkBtns}</div>
      </div>
    </div>
  `;
}

function artistSection(a, idx) {
  const panels = [panelHero(a), panelBio(a), panelAlbums(a), panelTracks(a), panelLinks(a)];
  const panelCount = panels.length;
  const dots = panels.map((_, i) => `<button class="dot ${i === 0 ? "active" : ""}" data-panel="${i}" aria-label="פאנל ${i + 1}"></button>`).join("");
  return `
    <section class="section artist-section"
             data-section="artist"
             data-artist-id="${escapeHtml(a.id)}"
             data-stage="${escapeHtml(a.stage)}"
             data-index="${idx}"
             style="--accent: ${a.color || "#FEB447"};">
      <div class="pager" data-panel-count="${panelCount}">${panels.join("")}</div>
      <div class="dots">${dots}</div>
    </section>
  `;
}

// ===== Render reel =====

function buildReel() {
  const list = getFilteredArtists();
  const artistSections = list.map((a, i) => artistSection(a, i)).join("");
  const hero = activeStageFilter === "all" ? heroSection() : stageHeroSection(activeStageFilter);
  reel.innerHTML = hero + artistSections;

  // CTA scroll to first artist (hero only renders in "all" mode)
  const cta = document.getElementById("cta-start");
  if (cta) {
    cta.addEventListener("click", () => {
      const first = reel.querySelector('[data-section="artist"]');
      first?.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Wire pager dots and YouTube thumbs for each artist section
  reel.querySelectorAll('[data-section="artist"]').forEach(section => {
    const pager = section.querySelector(".pager");
    const dots = Array.from(section.querySelectorAll(".dot"));

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        const idx = +dot.dataset.panel;
        const panel = pager.children[idx];
        panel?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      });
    });

    // Update active dot on horizontal scroll + hide vertical dots if we
    // leave the first panel of the active artist.
    let ticking = false;
    pager.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const w = pager.clientWidth || 1;
        const sl = Math.abs(pager.scrollLeft);
        const idx = Math.round(sl / w);
        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
        // Only hide vertical dots when this section is the active one
        if (section.classList.contains("is-active")) {
          verticalProgress?.classList.toggle("is-hidden", idx > 0);
        }
        ticking = false;
      });
    }, { passive: true });

    // Thumb clicks are handled by the global delegated listener on .reel.
  });
}

// ===== Vertical progress bar =====

function buildVerticalProgress() {
  // Hero is always present at index 0 now (per-stage hero or main hero).
  const list = getFilteredArtists();
  const items = [`<button class="v-dot active" data-vidx="0" aria-label="ראשי"></button>`];
  list.forEach((a, i) => {
    items.push(`<button class="v-dot" data-vidx="${i + 1}" aria-label="${escapeHtml(a.name)}"></button>`);
  });
  verticalProgress.innerHTML = items.join("");
}

// Single delegated click for vertical dots (registered once)
verticalProgress.addEventListener("click", e => {
  const dot = e.target.closest(".v-dot");
  if (!dot) return;
  const idx = +dot.dataset.vidx;
  const sections = reel.querySelectorAll(".section");
  sections[idx]?.scrollIntoView({ behavior: "smooth" });
});

// ===== Active section tracking =====

function setActiveSection(section) {
  if (!section || !verticalProgress || !bgScene) return;

  const sections = Array.from(reel.querySelectorAll(".section"));
  const idx = sections.indexOf(section);

  // Mark active section (drives entry animation)
  sections.forEach(s => s.classList.toggle("is-active", s === section));

  // Vertical dots
  verticalProgress.querySelectorAll(".v-dot").forEach((d, i) => {
    d.classList.toggle("active", i === idx);
  });

  // Hide vertical dots while we are on a hero section OR on any non-first
  // panel of an artist (user is exploring deeper info, dots would clutter).
  const isHero = section.dataset.section === "hero";
  const pager = section.querySelector(".pager");
  let panelIdx = 0;
  if (pager) {
    const w = pager.clientWidth || 1;
    panelIdx = Math.round(Math.abs(pager.scrollLeft) / w);
  }
  verticalProgress.classList.toggle("is-hidden", isHero || panelIdx > 0);

  // Reset other artist sections back to their first panel so vertical
  // navigation always lands the user on the artist's main card.
  reel.querySelectorAll('[data-section="artist"]').forEach(s => {
    if (s === section) return;
    const p = s.querySelector(".pager");
    if (p && p.scrollLeft !== 0) p.scrollTo({ left: 0, behavior: "auto" });
  });

  // HUD + retint background by stage
  const stage = section.dataset.stage;
  if (stage && stageColor[stage]) {
    bgScene.style.background = stageColor[stage];
  }

  const list = getFilteredArtists();
  if (hudPos) {
    if (isHero) {
      hudPos.textContent = stageLabel(activeStageFilter);
    } else {
      const artistIdx = +section.dataset.index;
      const a = list[artistIdx];
      if (a) hudPos.textContent = `${a.name} · ${artistIdx + 1}/${list.length}`;
    }
  }
}

let currentObserver = null;

function observeSections() {
  if (currentObserver) currentObserver.disconnect();
  const sections = Array.from(reel.querySelectorAll(".section"));
  currentObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
        setActiveSection(entry.target);
      }
    });
  }, { root: reel, threshold: [0.6] });
  sections.forEach(s => currentObserver.observe(s));
}

// ===== Keyboard navigation =====

function getCurrentSection() {
  const sections = Array.from(reel.querySelectorAll(".section"));
  if (!sections.length) return null;
  const reelTop = reel.scrollTop;
  return sections.find(s => s.offsetTop >= reelTop - 10) || sections[sections.length - 1] || null;
}

function navVertical(dir) {
  const sections = Array.from(reel.querySelectorAll(".section"));
  if (!sections.length) return;
  const cur = getCurrentSection();
  const idx = cur ? sections.indexOf(cur) : 0;
  const next = sections[idx + dir];
  if (next && typeof next.scrollIntoView === "function") {
    next.scrollIntoView({ behavior: "smooth" });
  }
}

function navHorizontal(dir) {
  const current = getCurrentSection();
  if (!current || current.dataset.section !== "artist") return;
  const pager = current.querySelector(".pager");
  if (!pager || !pager.children.length) return;
  const w = pager.clientWidth || 1;
  const sl = Math.abs(pager.scrollLeft);
  const cur = Math.round(sl / w);
  const total = (+pager.dataset.panelCount) || pager.children.length;
  const next = Math.max(0, Math.min(total - 1, cur + dir));
  const target = pager.children[next];
  if (target && typeof target.scrollIntoView === "function") {
    target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }
}

document.addEventListener("keydown", e => {
  // ArrowDown / ArrowUp -> next/prev artist
  if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); navVertical(1); }
  else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); navVertical(-1); }
  // Horizontal: in RTL "ArrowLeft" feels like "next" because the layout flows right-to-left
  else if (e.key === "ArrowLeft") { e.preventDefault(); navHorizontal(1); }
  else if (e.key === "ArrowRight") { e.preventDefault(); navHorizontal(-1); }
});

// Mouse-wheel: discrete navigation. One gesture = one section/panel change.
// Trackpads emit dozens of wheel events per gesture; raw scrollBy was way too
// sensitive. Throttle + accumulate so we move exactly one step per intent.
let wheelLockUntil = 0;
let wheelAccumX = 0;
let wheelAccumY = 0;
let wheelResetTimer = null;

reel.addEventListener("wheel", e => {
  const now = Date.now();
  if (now < wheelLockUntil) {
    e.preventDefault();
    return;
  }

  const horiz = Math.abs(e.deltaX) > Math.abs(e.deltaY);
  if (horiz) {
    const current = getCurrentSection();
    if (!current || current.dataset.section !== "artist") return;
    e.preventDefault();
    wheelAccumX += e.deltaX;
    if (Math.abs(wheelAccumX) > 60) {
      // RTL: positive deltaX = swipe right-to-left = move forward
      navHorizontal(wheelAccumX > 0 ? 1 : -1);
      wheelAccumX = 0;
      wheelLockUntil = now + 450;
    }
  } else {
    // Vertical: also throttle, one section per gesture
    e.preventDefault();
    wheelAccumY += e.deltaY;
    if (Math.abs(wheelAccumY) > 60) {
      navVertical(wheelAccumY > 0 ? 1 : -1);
      wheelAccumY = 0;
      wheelLockUntil = now + 500;
    }
  }

  clearTimeout(wheelResetTimer);
  wheelResetTimer = setTimeout(() => {
    wheelAccumX = 0;
    wheelAccumY = 0;
  }, 200);
}, { passive: false });

// ===== Stage dropdown: filter the reel to a single stage =====

function stageLabel(id) {
  if (id === "all") return "הכל";
  return (FESTIVAL.stages.find(s => s.id === id) || {}).name || id;
}

function buildStageDropdown() {
  if (!stageSelectMenu) return;
  const opts = [
    { id: "all", name: "הכל", count: ARTISTS.length },
    ...FESTIVAL.stages.map(s => ({ id: s.id, name: s.name, count: ARTISTS.filter(a => a.stage === s.id).length }))
  ];
  stageSelectMenu.innerHTML = opts.map(o =>
    `<li><button data-stage="${o.id}" class="${activeStageFilter === o.id ? "active" : ""}" role="option">${o.name}<span class="count">${o.count}</span></button></li>`
  ).join("");
  if (stageSelectLabel) stageSelectLabel.textContent = stageLabel(activeStageFilter);
}

function closeStageDropdown() {
  stageSelectEl?.classList.remove("is-open");
  if (stageSelectMenu) stageSelectMenu.hidden = true;
  stageSelectTrigger?.setAttribute("aria-expanded", "false");
}

function openStageDropdown() {
  stageSelectEl?.classList.add("is-open");
  if (stageSelectMenu) stageSelectMenu.hidden = false;
  stageSelectTrigger?.setAttribute("aria-expanded", "true");
}

stageSelectTrigger?.addEventListener("click", e => {
  e.stopPropagation();
  if (stageSelectEl?.classList.contains("is-open")) closeStageDropdown();
  else openStageDropdown();
});

document.addEventListener("click", e => {
  if (!stageSelectEl?.contains(e.target)) closeStageDropdown();
});

stageSelectMenu?.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const stage = btn.dataset.stage;
  closeStageDropdown();
  if (stage === activeStageFilter) return;
  activeStageFilter = stage;

  buildReel();
  buildVerticalProgress();
  buildStageDropdown();
  observeSections();
  try { reel.scrollTo({ top: 0, behavior: "auto" }); } catch (_) {}
  setTimeout(() => setActiveSection(reel.querySelector(".section")), 30);
});

// iOS Safari address-bar fix: keep --vh in sync
function setVH() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
}
setVH();
window.addEventListener("resize", setVH);
window.addEventListener("orientationchange", setVH);

// Defensive global error handlers — keep the page alive on iOS Safari hiccups
window.addEventListener("error", e => {
  console.error("[ZNA] global error:", e?.message, e?.error);
});
window.addEventListener("unhandledrejection", e => {
  console.error("[ZNA] unhandled rejection:", e?.reason);
});

// ===== Logo button: jump back to main hero, clearing filter ======
logoBtn?.addEventListener("click", () => {
  if (activeStageFilter !== "all") {
    activeStageFilter = "all";
    buildReel();
    buildVerticalProgress();
    buildStageDropdown();
    observeSections();
  }
  reel.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Search modal =====
function openSearch() {
  if (!searchOverlay) return;
  searchOverlay.hidden = false;
  searchInput.value = "";
  renderSearchResults("");
  setTimeout(() => searchInput?.focus(), 50);
}

function closeSearch() {
  if (!searchOverlay) return;
  searchOverlay.hidden = true;
}

function renderSearchResults(query) {
  if (!searchResults) return;
  const q = query.trim().toLowerCase();
  const list = q
    ? SORTED_ARTISTS.filter(a => {
        return [a.name, a.realName, a.country, ...(a.tags || [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q);
      })
    : SORTED_ARTISTS;
  if (!list.length) {
    searchResults.innerHTML = `<div class="search-empty">לא נמצא אומן בשם הזה</div>`;
    return;
  }
  searchResults.innerHTML = list.slice(0, 30).map(a => `
    <button class="search-result" data-artist-id="${escapeHtml(a.id)}">
      <span>
        <span class="search-result-name">${escapeHtml(a.name)}</span>
        ${a.realName ? `<span class="search-result-meta"> · ${escapeHtml(a.realName)}</span>` : ""}
      </span>
      <span class="search-result-meta">${escapeHtml(stageLabel(a.stage))}</span>
    </button>
  `).join("");
}

searchBtn?.addEventListener("click", openSearch);
searchOverlay?.addEventListener("click", e => {
  if (e.target === searchOverlay) closeSearch();
});
searchInput?.addEventListener("input", e => renderSearchResults(e.target.value));
searchResults?.addEventListener("click", e => {
  const btn = e.target.closest(".search-result");
  if (!btn) return;
  const id = btn.dataset.artistId;
  closeSearch();
  // Make sure the target artist is visible under the current filter
  if (activeStageFilter !== "all") {
    activeStageFilter = "all";
    buildReel();
    buildVerticalProgress();
    buildStageDropdown();
    observeSections();
  }
  setTimeout(() => {
    const sec = reel.querySelector(`[data-artist-id="${CSS.escape(id)}"]`);
    sec?.scrollIntoView({ behavior: "smooth" });
  }, 30);
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && searchOverlay && !searchOverlay.hidden) {
    closeSearch();
  }
});

// Boot
buildReel();
buildVerticalProgress();
buildStageDropdown();
observeSections();
// Initial active state
setTimeout(() => setActiveSection(reel.querySelector(".section")), 50);

// Try to merge build-time-fetched artist photos
loadPhotos();
