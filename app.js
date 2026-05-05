// ZNA 2026 - Reel-style scroll-snap experience
// Vertical = hero + one section per artist
// Horizontal (within each artist) = panels: hero / bio / discography / tracks / links

const reel = document.getElementById("reel");
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

// Language picker
const langSelectEl = document.getElementById("lang-select");
const langBtn = document.getElementById("lang-btn");
const langFlag = document.getElementById("lang-flag");
const langMenu = document.getElementById("lang-menu");

const LANG_FLAGS = { he: "🇮🇱", en: "🇬🇧", pt: "🇵🇹" };
const LANG_LABELS = { he: "עברית", en: "English", pt: "Português" };
let currentLang = (function() {
  try { return localStorage.getItem("zna-lang") || "he"; }
  catch (_) { return "he"; }
})();

function applyLang(lang) {
  if (!LANG_FLAGS[lang]) return;
  currentLang = lang;
  if (langFlag) langFlag.textContent = LANG_FLAGS[lang];
  if (langBtn) langBtn.title = LANG_LABELS[lang];
  langMenu?.querySelectorAll("button").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  try { localStorage.setItem("zna-lang", lang); } catch (_) {}
  // i18n hook for future translations: data-i18n elements would re-render here.
}

applyLang(currentLang);

langBtn?.addEventListener("click", e => {
  e.stopPropagation();
  if (!langMenu) return;
  langMenu.hidden = !langMenu.hidden;
  langBtn.setAttribute("aria-expanded", String(!langMenu.hidden));
});

langMenu?.addEventListener("click", e => {
  const btn = e.target.closest("button[data-lang]");
  if (!btn) return;
  applyLang(btn.dataset.lang);
  langMenu.hidden = true;
  langBtn?.setAttribute("aria-expanded", "false");
});

document.addEventListener("click", e => {
  if (langMenu && !langSelectEl?.contains(e.target)) {
    langMenu.hidden = true;
    langBtn?.setAttribute("aria-expanded", "false");
  }
});

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
      const { videoId, host, startSeconds } = pendingFirstPlay;
      pendingFirstPlay = null;
      createPlayerAt(host || miniPlayerFrame, videoId, startSeconds || 0);
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

// Restore the original thumb markup of an inline frame so the user can
// re-click the track later. Uses the cardHtml we stashed at click time.
function restoreInlineThumb(host) {
  if (!host) return;
  const card = host.closest(".track-card");
  if (!card || !host.dataset.cardHtml) return;
  card.outerHTML = host.dataset.cardHtml;
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

  // Same video that's already playing — depends on where the player lives
  if (currentVideoId === vid && ytPlayer) {
    if (playerLocation === "mini") {
      // User came back to the playing track's panel — restore inline,
      // preserving the current playback time.
      const resumeTime = safeGetCurrentTime();
      destroyPlayer();
      const frame = installFrame(card, thumb, vid);
      createPlayerAt(frame, vid, resumeTime);
      inlineHostEl = frame;
      playerLocation = "inline";
      miniPlayer.classList.remove("is-open");
      miniPlayer.setAttribute("aria-hidden", "true");
      document.body.classList.remove("has-mini-player");
      watchInlineFrame(frame);
      updateMiniPlayerUI();
      return;
    }
    // Already inline at the same location — let it keep playing
    return;
  }

  // Different video. Per UX request: if a video is currently playing in the
  // mini-player, fully kill it (close mini, stop audio) and start the new
  // video fresh inline. No background continuation.
  if (currentVideoId && currentVideoId !== vid && ytPlayer) {
    destroyPlayer();
    miniPlayer.classList.remove("is-open", "is-expanded");
    miniPlayer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-mini-player");
    if (miniPlayerFrame) miniPlayerFrame.innerHTML = "";
  }

  // Fresh play in the clicked card
  const frame = installFrame(card, thumb, vid);
  startPlayback(vid, frame);
}

function safeGetCurrentTime() {
  try {
    return Math.max(0, Math.floor(ytPlayer?.getCurrentTime?.() || 0) - 1);
  } catch (e) {
    return 0;
  }
}

function destroyPlayer() {
  if (inlineFrameObserver) {
    try { inlineFrameObserver.disconnect(); } catch (_) {}
    inlineFrameObserver = null;
  }
  if (ytPlayer) {
    try { ytPlayer.stopVideo?.(); } catch (e) {}
    try { ytPlayer.destroy?.(); } catch (e) {}
    ytPlayer = null;
  }
  // The destroy() removes the iframe from DOM. Restore inline thumb if needed.
  if (playerLocation === "inline" && inlineHostEl) {
    restoreInlineThumb(inlineHostEl);
  }
  inlineHostEl = null;
  currentVideoId = null;
  playerLocation = "none";
}

// Create a fresh player in `host`, optionally starting at `startSeconds`.
function createPlayerAt(host, videoId, startSeconds = 0) {
  if (!host || !window.YT || !window.YT.Player) {
    pendingFirstPlay = { videoId, host, startSeconds };
    ensureYTApi();
    return;
  }
  try {
    host.innerHTML = '<div id="yt-player-target"></div>';
    ytPlayer = new YT.Player("yt-player-target", {
      height: "100%",
      width: "100%",
      videoId,
      playerVars: {
        autoplay: 1, rel: 0, playsinline: 1, modestbranding: 1,
        start: Math.max(0, Math.floor(startSeconds || 0))
      },
      events: {
        onStateChange: e => {
          if (e.data === YT.PlayerState.ENDED) onVideoEnded();
        },
        onError: e => { console.warn("YT player error:", e?.data); }
      }
    });
  } catch (e) {
    console.error("createPlayerAt failed:", e);
    host.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&start=${Math.floor(startSeconds || 0)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }
  currentVideoId = videoId;
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

  // Capture playback time so the user resumes at (about) the same spot
  // after the iframe gets reparented (which forces a YT reload).
  const resumeTime = safeGetCurrentTime();
  const vid = currentVideoId;

  // Tear down the inline player and restore the thumbnail
  if (inlineFrameObserver) {
    try { inlineFrameObserver.disconnect(); } catch (_) {}
    inlineFrameObserver = null;
  }
  if (ytPlayer) {
    try { ytPlayer.destroy?.(); } catch (e) {}
    ytPlayer = null;
  }
  if (inlineHostEl) restoreInlineThumb(inlineHostEl);
  inlineHostEl = null;

  // Re-create in the mini-player at the captured time
  createPlayerAt(miniPlayerFrame, vid, resumeTime);
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

  // Decide where the player should live. If the caller passed an inline host
  // (from a thumb click), prefer that; otherwise stay in whatever location
  // is current; otherwise default to mini.
  const targetInline = options.inlineHost || (playerLocation === "inline" ? inlineHostEl : null);
  const host = targetInline || miniPlayerFrame;

  // Same iframe, same parent → just swap the video without remount
  if (ytPlayer && ytApiReady && (
      (targetInline && inlineHostEl === targetInline) ||
      (!targetInline && playerLocation === "mini"))) {
    try { ytPlayer.loadVideoById(item.videoId); } catch (e) { console.warn(e); }
    currentVideoId = item.videoId;
  } else {
    // Different parent or no player yet → recreate fresh
    if (ytPlayer) {
      try { ytPlayer.destroy?.(); } catch (e) {}
      ytPlayer = null;
    }
    createPlayerAt(host, item.videoId, 0);
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
          // Slide to the tracks panel (3rd panel, index 2: hero, info, tracks, discography)
          if (pager && pager.children[2]) {
            pager.children[2].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
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

// Per-stage backgrounds. All stay deep/near-black, but each carries a
// distinct hue so the user feels a real visual shift moving between stages.
// Tints are saturated enough to read at the top of the panel, where the
// synthwave sun-glow doesn't dominate. The same gradient bleeds into the
// first artist card of every stage via bgScene, keeping the dive from a
// stage hero into its artists visually continuous.
const stageColor = {
  all:       "linear-gradient(180deg, #08051c 0%, #14082e 50%, #1c0a40 100%)", // deep cosmic violet
  retro:     "linear-gradient(180deg, #1a0810 0%, #2a0c1a 50%, #381020 100%)", // dark wine / burgundy
  zambu:     "linear-gradient(180deg, #14062e 0%, #1f0a45 50%, #2a0c54 100%)", // saturated dark royal purple
  guardians: "linear-gradient(180deg, #07182c 0%, #0c2444 50%, #103354 100%)", // saturated dark navy / teal
  market:    "linear-gradient(180deg, #1c1408 0%, #2a1c0c 50%, #38240e 100%)"  // saturated dark amber / brown
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

function artistSchedule(a) {
  return a.schedule || ARTIST_SCHEDULE?.[a.id] || null;
}

function parseScheduleTime(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function completeSchedule(a) {
  const schedule = artistSchedule(a);
  if (!schedule) return null;
  const start = parseScheduleTime(schedule.start);
  const end = parseScheduleTime(schedule.end);
  return start && end ? { start, end } : null;
}

function formatScheduleRange(schedule) {
  if (!schedule) return "T.B.A.";
  const opts = { timeZone: FESTIVAL.timezone || "Europe/Lisbon", weekday: "short", day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit" };
  const dayTime = new Intl.DateTimeFormat("he-IL", opts);
  const timeOnly = new Intl.DateTimeFormat("he-IL", { timeZone: FESTIVAL.timezone || "Europe/Lisbon", hour: "2-digit", minute: "2-digit" });
  const sameDay = schedule.start.toLocaleDateString("en-CA", { timeZone: FESTIVAL.timezone || "Europe/Lisbon" }) ===
    schedule.end.toLocaleDateString("en-CA", { timeZone: FESTIVAL.timezone || "Europe/Lisbon" });
  return sameDay
    ? `${dayTime.format(schedule.start)}–${timeOnly.format(schedule.end)}`
    : `${dayTime.format(schedule.start)}–${dayTime.format(schedule.end)}`;
}

function getScheduleStatus(stageId = "all") {
  const now = new Date();
  const startsAt = parseScheduleTime(FESTIVAL.startsAt);
  const endsAt = parseScheduleTime(FESTIVAL.endsAt);
  const artists = stageId === "all" ? SORTED_ARTISTS : SORTED_ARTISTS.filter(a => a.stage === stageId);
  const scheduled = artists
    .map(a => ({ artist: a, schedule: completeSchedule(a) }))
    .filter(item => item.schedule)
    .sort((x, y) => x.schedule.start - y.schedule.start);
  const live = scheduled.find(item => now >= item.schedule.start && now < item.schedule.end);
  const next = scheduled.find(item => item.schedule.start > now);
  const hasAnySchedule = scheduled.length > 0;

  if (live) return { state: "live", title: "עכשיו בלייב", artist: live.artist, schedule: live.schedule, next };
  if (startsAt && now < startsAt) return { state: "upcoming", title: "האירוע עוד לא התחיל", next, hasAnySchedule };
  if (endsAt && now > endsAt) return { state: "ended", title: "האירוע הסתיים", hasAnySchedule };
  if (!hasAnySchedule) return { state: "tba", title: "לוח הזמנים T.B.A.", hasAnySchedule };
  return { state: "idle", title: "אין סט פעיל כרגע", next, hasAnySchedule };
}

function liveStatusCard(stageId = "all") {
  const status = getScheduleStatus(stageId);
  const nextText = status.next
    ? `הבא: ${status.next.artist.name} · ${formatScheduleRange(status.next.schedule)}`
    : "זמני הסטים הרשמיים יופיעו כאן";
  const body = status.state === "live"
    ? `${status.artist.name} · ${stageLabel(status.artist.stage)} · ${formatScheduleRange(status.schedule)}`
    : status.hasAnySchedule ? nextText : "כאן יוצג בזמן אמת מי מנגן עכשיו כשיפורסם הלו״ז";
  return `
    <div class="live-status live-status--${escapeHtml(status.state)}" aria-live="polite">
      <span class="live-status-kicker">${status.state === "live" ? "LIVE NOW" : "NOW PLAYING"}</span>
      <strong>${escapeHtml(status.title)}</strong>
      <span>${escapeHtml(body)}</span>
    </div>
  `;
}

function artistSetTimeBadge(a) {
  const schedule = completeSchedule(a);
  const text = schedule ? formatScheduleRange(schedule) : "שעת הופעה: T.B.A.";
  return `<div class="artist-set-time ${schedule ? "has-time" : "is-tba"}">${escapeHtml(text)}</div>`;
}

// ===== Build sections =====

const HERO_STAGES = [
  { id: "all", name: "ZNA 2026", desc: FESTIVAL.description, isMain: true },
  ...FESTIVAL.stages.map(s => ({ id: s.id, name: s.name, desc: s.desc, isMain: false }))
];

const HERO_STAGE_ELEMENTS = {
  retro: "images/zna-3d/custom-goa-sound-totem-element.png",
  zambu: "images/zna-3d/custom-festival-portal-element.png",
  guardians: "images/zna-3d/custom-chillout-organism-element.png",
  market: "images/zna-3d/custom-market-shrine-element.png"
};

function heroPanelMain() {
  return `
    <div class="hero-panel hero-panel--main" data-stage="all">
      <img class="hero-zna-mark" src="images/zna-3d/LogoElements.png" alt="ZNA Gathering" loading="lazy" />
      <div class="logo-mark">ZNA<br/>2026</div>
      <div class="hero-subtitle">RETRO · FUTURISTIC · GATHERING</div>
      <p class="hero-tagline">${escapeHtml(FESTIVAL.description)}</p>
      <div class="hero-meta">
        <span><strong>📅</strong> ${escapeHtml(FESTIVAL.dates)}</span>
        <span><strong>📍</strong> ${escapeHtml(FESTIVAL.location)}</span>
        <span><strong>🎧</strong> ${ARTISTS.length} אומנים</span>
      </div>
      ${liveStatusCard("all")}
      <div class="hero-hint">החליקו ימינה לבמות הפסטיבל →</div>
    </div>
  `;
}

function heroPanelStage(stage) {
  const count = ARTISTS.filter(a => a.stage === stage.id).length;
  const elementSrc = HERO_STAGE_ELEMENTS[stage.id];
  return `
    <div class="hero-panel hero-panel--${escapeHtml(stage.id)}" data-stage="${escapeHtml(stage.id)}">
      ${elementSrc ? `<img class="hero-stage-element hero-stage-element--${escapeHtml(stage.id)}" src="${escapeHtml(elementSrc)}" alt="" loading="lazy" aria-hidden="true" />` : ""}
      <div class="hero-stage-tag">במה</div>
      <div class="logo-mark hero-stage-name">${escapeHtml(stage.name)}</div>
      <p class="hero-tagline">${escapeHtml(stage.desc)}</p>
      <div class="hero-meta">
        <span><strong>🎧</strong> ${count} אומנים</span>
      </div>
      ${liveStatusCard(stage.id)}
      <div class="hero-hint">↓ צללו לתוך הבמה</div>
    </div>
  `;
}

let heroScrollTimer = null;
let suppressHeroScroll = false;

function wireHeroPager() {
  const pager = document.getElementById("hero-pager");
  const dots = document.getElementById("hero-dots");
  if (!pager) return;

  // Initial scroll position to currently-active stage
  setTimeout(() => scrollHeroToStage(activeStageFilter, true), 0);

  pager.addEventListener("scroll", () => {
    if (suppressHeroScroll) return;
    clearTimeout(heroScrollTimer);
    heroScrollTimer = setTimeout(() => {
      const w = pager.clientWidth || 1;
      const idx = Math.round(Math.abs(pager.scrollLeft) / w);
      const stage = HERO_STAGES[idx]?.id;
      if (stage && stage !== activeStageFilter) {
        activeStageFilter = stage;
        // Update dots & dropdown
        updateHeroDots();
        buildStageDropdown();
        // Re-render only artist sections beneath the hero
        rerenderArtistsBelowHero();
      }
    }, 160);
  }, { passive: true });

  if (dots) {
    dots.addEventListener("click", e => {
      const btn = e.target.closest(".hero-dot");
      if (!btn) return;
      scrollHeroToStage(btn.dataset.stage, false);
    });
  }
}

function scrollHeroToStage(stageId, instant) {
  const pager = document.getElementById("hero-pager");
  if (!pager) return;
  const idx = HERO_STAGES.findIndex(s => s.id === stageId);
  if (idx < 0) return;
  const w = pager.clientWidth || pager.offsetWidth;
  // RTL: pager is laid out right-to-left, so we need negative scrollLeft for forward panels.
  // Use scrollTo with the raw left value the browser computes for that index.
  const target = pager.children[idx];
  if (!target) return;
  suppressHeroScroll = true;
  if (instant) {
    target.scrollIntoView({ behavior: "auto", inline: "start", block: "nearest" });
  } else {
    target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }
  setTimeout(() => { suppressHeroScroll = false; }, 400);
}

function updateHeroDots() {
  const dots = document.getElementById("hero-dots");
  if (!dots) return;
  dots.querySelectorAll(".hero-dot").forEach(d => {
    d.classList.toggle("active", d.dataset.stage === activeStageFilter);
  });
  // Also update bg tint — Main uses its own "all" gradient now
  const tintStage = activeStageFilter;
  if (stageColor[tintStage]) bgScene.style.background = stageColor[tintStage];
  // Update hero section's data-stage so the active hero panel drives bg
  const sec = reel.querySelector('[data-section="hero"]');
  if (sec) sec.dataset.stage = tintStage;
}

function rerenderArtistsBelowHero() {
  // Remove existing artist sections, build new ones for the current filter.
  const heroSec = reel.querySelector('[data-section="hero"]');
  if (!heroSec) return;
  // Remove everything after the hero
  while (heroSec.nextElementSibling) heroSec.nextElementSibling.remove();
  const list = getFilteredArtists();
  const tpl = document.createElement("template");
  tpl.innerHTML = renderArtistSections(list);
  heroSec.parentElement.append(...tpl.content.children);
  buildVerticalProgress();
  observeSections();
}

function multiHeroSection() {
  const panels = HERO_STAGES.map(s => s.isMain ? heroPanelMain() : heroPanelStage(s)).join("");
  const dots = HERO_STAGES.map((s, i) => `<button class="hero-dot ${activeStageFilter === s.id ? "active" : ""}" data-stage="${escapeHtml(s.id)}" aria-label="${escapeHtml(s.name)}"></button>`).join("");
  // The active hero panel sets the section's stage data attribute (used for bg tint)
  const activeStage = activeStageFilter === "all" ? "retro" : activeStageFilter;
  return `
    <section class="section section--multi-hero" data-section="hero" data-stage="${escapeHtml(activeStage)}">
      <div class="hero-pager" id="hero-pager">${panels}</div>
      <div class="hero-dots" id="hero-dots">${dots}</div>
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
    <div class="panel panel-hero panel--hero" style="--accent: ${a.color || "#FEB447"};">
      <div class="panel-inner">
        <figure class="artist-hero-art ${a.photo ? "has-photo" : ""}">
          ${photo}
          <span class="artist-initials" aria-hidden="true">${initials}</span>
        </figure>
        <div class="artist-hero-text">
          <h1 class="artist-name">${escapeHtml(a.name)}</h1>
          ${a.realName ? `<div class="artist-real">${escapeHtml(a.realName)}</div>` : ""}
          <div class="artist-meta-line">
            <span class="meta-item">📍 ${escapeHtml(a.country)}</span>
            ${a.age ? `<span class="meta-item">🎂 ${a.age}</span>` : ""}
            <span class="meta-item">🎧 ${escapeHtml(a.role)}</span>
          </div>
          ${artistSetTimeBadge(a)}
          ${tags ? `<div class="artist-tags-row">${tags}</div>` : ""}
        </div>
      </div>
    </div>
  `;
}

function formatAnnouncedDate(yyyymmdd) {
  if (!yyyymmdd) return "";
  const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  const m = String(yyyymmdd).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return "";
  const [_, y, mo, d] = m;
  const monthName = months[parseInt(mo, 10) - 1] || "";
  return `${parseInt(d, 10)} ב${monthName} ${y}`;
}

function panelInfo(a) {
  const links = a.links || [];
  const linksHtml = links.length
    ? `
      <div class="info-section">
        <h3 class="info-section-title">קישורים</h3>
        <div class="links-grid">
          ${links.map(l => `<a class="link-btn" href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.type)} ↗</a>`).join("")}
        </div>
      </div>
    `
    : "";
  const announcedHtml = a.announcedAt
    ? `<div class="info-meta">📣 הוכרז ב-${escapeHtml(formatAnnouncedDate(a.announcedAt))}</div>`
    : "";
  const bioHtml = a.bio
    ? `
      <div class="info-section">
        <h3 class="info-section-title">ביוגרפיה</h3>
        <p class="bio-text">${escapeHtml(a.bio)}</p>
        ${a.notable ? `<div class="notable">★ ${escapeHtml(a.notable)}</div>` : ""}
      </div>
    `
    : "";
  return `
    <div class="panel panel--info">
      <div class="panel-inner">
        <div class="panel-eyebrow">אודות</div>
        <div class="bio-card">
          ${announcedHtml}
          ${bioHtml}
          ${linksHtml}
        </div>
      </div>
    </div>
  `;
}

function panelAlbums(a) {
  if (!a.albums || !a.albums.length) {
    return `
      <div class="panel panel--discography">
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
    <div class="panel panel--discography">
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
      <div class="panel panel--tracks">
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
    <div class="panel panel--tracks">
      <div class="panel-inner">
        <div class="panel-eyebrow">טראקים נבחרים</div>
        <div class="tracks-stack">${cards}</div>
      </div>
    </div>
  `;
}

function artistSection(a, idx, isFirstOfStage = false) {
  // Order: Hero → About → Tracks → Discography (last)
  const panels = [panelHero(a), panelInfo(a), panelTracks(a), panelAlbums(a)];
  const panelCount = panels.length;
  const dots = panels.map((_, i) => `<button class="dot ${i === 0 ? "active" : ""}" data-panel="${i}" aria-label="פאנל ${i + 1}"></button>`).join("");
  const cls = `section artist-section${isFirstOfStage ? " is-first-of-stage" : ""}`;
  return `
    <section class="${cls}"
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

function renderArtistSections(list) {
  return list
    .map((a, i) => artistSection(a, i, i === 0 || list[i - 1].stage !== a.stage))
    .join("");
}

// ===== Render reel =====

function buildReel() {
  // Single multi-panel hero at the top, then artist sections of the
  // currently-active stage filter below it.
  const heroHtml = multiHeroSection();
  const list = getFilteredArtists();
  const artistsHtml = renderArtistSections(list);
  reel.innerHTML = heroHtml + artistsHtml;
  wireHeroPager();



  // Wire pager dots and YouTube thumbs for each artist section.
  // (Pager scroll + dot clicks are handled by GLOBAL delegated listeners
  // on the reel — see below — so they keep working after rerender.)
  reel.querySelectorAll('[data-section="artist"]').forEach(section => {
    // Thumb clicks are handled by the global delegated listener on .reel.
  });
}

// Global capture-phase scroll listener: any time a .pager inside the reel
// scrolls, update its section's dot highlights and toggle vertical-progress
// visibility (dots only matter on panel 0). Capture phase is needed because
// 'scroll' events do not bubble.
let pagerScrollTicking = false;
reel.addEventListener("scroll", e => {
  const pager = e.target?.closest?.(".pager");
  if (!pager) return;
  if (pagerScrollTicking) return;
  pagerScrollTicking = true;
  requestAnimationFrame(() => {
    pagerScrollTicking = false;
    const section = pager.closest('[data-section="artist"]');
    if (!section) return;
    const w = pager.clientWidth || 1;
    const idx = Math.round(Math.abs(pager.scrollLeft) / w);
    section.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === idx));
    if (section.classList.contains("is-active")) {
      verticalProgress?.classList.toggle("is-hidden", idx > 0);
    }
  });
}, true);

// Global delegated click for the per-artist horizontal panel dots
reel.addEventListener("click", e => {
  const dot = e.target.closest(".dot");
  if (!dot) return;
  const section = dot.closest('[data-section="artist"]');
  const pager = section?.querySelector(".pager");
  const idx = +dot.dataset.panel;
  if (pager && pager.children[idx]) {
    pager.children[idx].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }
});

// ===== Vertical progress bar =====

function buildVerticalProgress() {
  // Build dots in lockstep with whatever buildReel emitted
  const sections = reel.querySelectorAll(".section");
  const items = Array.from(sections).map((s, i) => {
    const label = s.dataset.section === "hero"
      ? (s.dataset.stage === "retro" ? "ראשי" : stageLabel(s.dataset.stage))
      : (s.dataset.artistId || "");
    return `<button class="v-dot ${i === 0 ? "active" : ""}" data-vidx="${i}" aria-label="${escapeHtml(label)}"></button>`;
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
  if (!current) return;
  // Hero section: route to the hero-pager (Main + 4 stages)
  if (current.dataset.section === "hero") {
    const idx = HERO_STAGES.findIndex(s => s.id === activeStageFilter);
    const next = Math.max(0, Math.min(HERO_STAGES.length - 1, idx + dir));
    if (next !== idx) {
      const stage = HERO_STAGES[next].id;
      activeStageFilter = stage;
      buildStageDropdown();
      scrollHeroToStage(stage, false);
      rerenderArtistsBelowHero();
      updateHeroDots();
    }
    return;
  }
  // Artist section: route to the inner pager (panels)
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
  // LTR layout: ArrowRight = next, ArrowLeft = prev
  else if (e.key === "ArrowRight") { e.preventDefault(); navHorizontal(1); }
  else if (e.key === "ArrowLeft") { e.preventDefault(); navHorizontal(-1); }
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
    if (!current) return;
    // Hero section: let native scroll-snap handle the swipe so it moves
    // exactly one panel. The hero-pager's own scroll listener picks up the
    // resulting position and updates activeStageFilter on settle. Doing JS
    // navHorizontal here on top of native would page twice.
    if (current.dataset.section === "hero") return;
    e.preventDefault();
    wheelAccumX += e.deltaX;
    if (Math.abs(wheelAccumX) > 60) {
      // LTR: positive deltaX (rightward swipe) = move forward.
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
  if (stage === activeStageFilter) {
    // Same filter — just bring the user up to that hero panel
    try { reel.scrollTo({ top: 0, behavior: "smooth" }); } catch (_) {}
    return;
  }
  activeStageFilter = stage;
  buildStageDropdown();
  // Slide the hero pager to the chosen stage; the pager's scroll handler
  // will re-render artists below.
  try { reel.scrollTo({ top: 0, behavior: "smooth" }); } catch (_) {}
  scrollHeroToStage(stage, false);
  rerenderArtistsBelowHero();
  updateHeroDots();
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

// ===== Logo button: guided tour back to the hero =====
// Click once: animate the path the user's been on in reverse
//   Step 1: slide the artist pager back to panel 0 (artist's main card)
//   Step 2: scroll vertically up through artists to the multi-hero section
//   Step 3: ensure the hero pager is on the current stage's panel
// Click again while the tour is animating: skip ahead and snap to the end.
let tourInProgress = false;

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

// Resolves when the given scroll container actually finishes its smooth scroll.
// Uses the native `scrollend` event (Safari 17+, Chrome 114+) and falls back
// to a polling check on scroll position stability for older browsers.
function waitScrollEnd(scroller, fallbackMs = 1100) {
  return new Promise(resolve => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      scroller.removeEventListener("scrollend", finish);
      clearTimeout(fallbackTimer);
      clearInterval(pollTimer);
      resolve();
    };
    scroller.addEventListener("scrollend", finish);
    // Polling fallback: when the scroll position stops changing for ~80ms in a
    // row, the smooth scroll is done.
    let lastLeft = scroller.scrollLeft;
    let lastTop = scroller.scrollTop;
    let stableTicks = 0;
    const pollTimer = setInterval(() => {
      const sameLeft = scroller.scrollLeft === lastLeft;
      const sameTop = scroller.scrollTop === lastTop;
      if (sameLeft && sameTop) {
        stableTicks++;
        if (stableTicks >= 2) finish(); // ~80ms stable = scroll ended
      } else {
        stableTicks = 0;
        lastLeft = scroller.scrollLeft;
        lastTop = scroller.scrollTop;
      }
    }, 40);
    // Hard ceiling so we never hang the tour
    const fallbackTimer = setTimeout(finish, fallbackMs);
  });
}

async function startGuidedTour() {
  tourInProgress = true;
  let current = getCurrentSection();

  // Step 1: snap the artist's pager back to its first panel
  if (current?.dataset.section === "artist") {
    const pager = current.querySelector(".pager");
    if (pager && Math.abs(pager.scrollLeft) > 10) {
      const wait1 = waitScrollEnd(pager);
      pager.children[0]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      await wait1;
      if (!tourInProgress) return;
      await wait(120); // tiny breath between steps so the eye sees the change
    }
  }

  // Step 2: scroll up to the multi-hero section
  const heroSec = reel.querySelector('[data-section="hero"]');
  current = getCurrentSection();
  if (heroSec && current !== heroSec) {
    const wait2 = waitScrollEnd(reel);
    heroSec.scrollIntoView({ behavior: "smooth" });
    await wait2;
    if (!tourInProgress) return;
    await wait(120);
  }

  // Step 3: make sure the hero pager is on the current stage's panel
  const heroPager = document.getElementById("hero-pager");
  if (heroPager) {
    const targetIdx = HERO_STAGES.findIndex(s => s.id === activeStageFilter);
    const targetEl = heroPager.children[targetIdx];
    if (targetEl) {
      const onTarget = Math.abs(heroPager.scrollLeft - targetEl.offsetLeft) < 8;
      if (!onTarget) {
        const wait3 = waitScrollEnd(heroPager);
        scrollHeroToStage(activeStageFilter, false);
        await wait3;
        if (!tourInProgress) return;
        await wait(120);
      }
    }
  }

  // Step 4: finally slide all the way back to the Main hero panel
  if (heroPager && activeStageFilter !== "all") {
    activeStageFilter = "all";
    buildStageDropdown();
    const wait4 = waitScrollEnd(heroPager);
    scrollHeroToStage("all", false);
    await wait4;
    rerenderArtistsBelowHero();
    updateHeroDots();
  }

  tourInProgress = false;
}

function finishTourImmediately() {
  tourInProgress = false;
  const current = getCurrentSection();
  if (current?.dataset.section === "artist") {
    const pager = current.querySelector(".pager");
    pager?.children[0]?.scrollIntoView({ behavior: "auto", inline: "start", block: "nearest" });
  }
  const heroSec = reel.querySelector('[data-section="hero"]');
  heroSec?.scrollIntoView({ behavior: "auto" });
  // End on Main hero with filter cleared
  if (activeStageFilter !== "all") {
    activeStageFilter = "all";
    buildStageDropdown();
    rerenderArtistsBelowHero();
    updateHeroDots();
  }
  scrollHeroToStage("all", true);
}

logoBtn?.addEventListener("click", () => {
  if (tourInProgress) {
    finishTourImmediately();
    return;
  }
  startGuidedTour();
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
