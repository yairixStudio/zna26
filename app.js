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

// ===== i18n =====
// Three supported languages. UI defaults to English; users can switch via
// the flag-row at the bottom of the stage dropdown menu.
const LANG_CODES  = { he: "IL", en: "EN", pt: "PT" };
const LANG_LABELS = { he: "עברית", en: "English", pt: "Português" };

// Has the user ever explicitly picked a language? Tracked separately
// from currentLang because the first-visit modal needs to show for any
// session where no choice was ever stored.
function hasStoredLang() {
  try { return !!localStorage.getItem("zna-lang"); } catch { return false; }
}

// Smart suggestion for the first-visit picker. Hebrew browser language
// or an Israeli timezone → IL. Spanish/Portuguese language or Iberian
// timezone → PT. Anything else → EN. Pure-client detection: no network
// call, works offline, and "iw" (the legacy Hebrew code Safari still
// emits on older iOS) is treated as "he".
function detectDefaultLang() {
  let langs = [];
  try {
    if (Array.isArray(navigator.languages) && navigator.languages.length) {
      langs = navigator.languages.slice();
    } else if (navigator.language) {
      langs = [navigator.language];
    }
  } catch (_) { langs = []; }
  langs = langs.map(l => (l || "").toLowerCase());

  let tz = "";
  try { tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").toLowerCase(); }
  catch (_) { tz = ""; }

  const isHebrewLang = langs.some(l => l.startsWith("he") || l.startsWith("iw"));
  const isIsraelTZ   = /jerusalem|tel_aviv|israel/.test(tz);
  if (isHebrewLang || isIsraelTZ) return "he";

  const isIberianLang = langs.some(l => l.startsWith("pt") || l.startsWith("es") || l.startsWith("gl") || l.startsWith("ca"));
  const isIberianTZ   = /lisbon|madeira|azores|madrid|canary|ceuta/.test(tz);
  if (isIberianLang || isIberianTZ) return "pt";

  return "en";
}

let currentLang = (function() {
  try {
    const stored = localStorage.getItem("zna-lang");
    if (stored && LANG_CODES[stored]) return stored;
  } catch (_) {}
  return "en"; // default English until the user picks one in the welcome modal
})();

// All UI strings keyed by short id, with HE/EN/PT values. Missing translations
// fall back through EN → HE → the key itself.
const STRINGS = {
  // Navigation / generic
  "nav.all":           { he: "הכל", en: "All", pt: "Tudo" },
  "nav.searchArtist":  { he: "חיפוש אומן", en: "Search artist", pt: "Procurar artista" },
  "nav.backHome":      { he: "חזרה לדף הראשי", en: "Back to home", pt: "Voltar ao início" },
  "nav.language":      { he: "שפה", en: "Language", pt: "Idioma" },
  "nav.stage":         { he: "במה", en: "Stage", pt: "Palco" },
  "nav.navigate":      { he: "ניווט לאירוע", en: "Navigate to event", pt: "Navegar até ao evento" },
  "nav.festivalMap":   { he: "מפת הפסטיבל", en: "Festival map", pt: "Mapa do festival" },
  "nav.openInWaze":    { he: "פתיחה ב-Waze", en: "Open in Waze", pt: "Abrir no Waze" },
  "nav.openInGmaps":   { he: "פתיחה ב-Google Maps", en: "Open in Google Maps", pt: "Abrir no Google Maps" },
  "nav.cancel":        { he: "ביטול", en: "Cancel", pt: "Cancelar" },
  "hero.actions":      { he: "פעולות", en: "Quick actions", pt: "Ações rápidas" },

  // Artist panels
  "panel.about":       { he: "אודות", en: "About", pt: "Sobre" },
  "panel.bio":         { he: "ביוגרפיה", en: "Biography", pt: "Biografia" },
  "panel.tracks":      { he: "טראקים", en: "Tracks", pt: "Faixas" },
  "panel.tracksTop":   { he: "טראקים נבחרים", en: "Selected tracks", pt: "Faixas selecionadas" },
  "panel.discography": { he: "דיסקוגרפיה", en: "Discography", pt: "Discografia" },
  "panel.discographyTop": { he: "דיסקוגרפיה נבחרת", en: "Selected discography", pt: "Discografia selecionada" },
  "panel.streaming":   { he: "סטרימינג", en: "Streaming", pt: "Streaming" },
  "panel.moreLinks":   { he: "קישורים נוספים", en: "More links", pt: "Mais ligações" },
  "panel.label":       { he: "🎧", en: "🎧", pt: "🎧" },
  "panel.tba":         { he: "המידע יתעדכן בקרוב", en: "Information will be updated soon", pt: "Informação será atualizada em breve" },
  "panel.ariaPanelN":  { he: "פאנל", en: "Panel", pt: "Painel" },

  // Tracks empty state
  "tracks.empty":      { he: "עדיין לא הוספנו טראקים מאומתים. חפשו ביוטיוב:", en: "No verified tracks yet. Search on YouTube:", pt: "Ainda sem faixas verificadas. Procurar no YouTube:" },
  "tracks.searchYT":   { he: "▶ חיפוש ב-YouTube", en: "▶ Search on YouTube", pt: "▶ Procurar no YouTube" },
  "tracks.play":       { he: "נגן", en: "Play", pt: "Reproduzir" },

  // Hero
  "hero.subtitle":     { he: "RETRO · FUTURISTIC · GATHERING", en: "RETRO · FUTURISTIC · GATHERING", pt: "RETRO · FUTURISTIC · GATHERING" },
  "hero.artistsCount": { he: "אומנים", en: "artists", pt: "artistas" },
  "hero.diveStage":    { he: "↓ צללו לתוך הבמה", en: "↓ Dive into the stage", pt: "↓ Mergulhe no palco" },
  "hero.swipeRightHint":{ he: "החליקו ימינה לבמות הפסטיבל →", en: "Swipe right for the festival stages →", pt: "Deslize para a direita pelos palcos →" },
  "hero.disclaimer":   { he: "אתר מעריצים בלתי-רשמי, נבנה ע״י משתתפים מתנדבים — לא קשור לארגון הפסטיבל.", en: "Unofficial fan site, built by volunteer attendees — not affiliated with the festival's organisation.", pt: "Site de fãs não oficial, criado por voluntários — sem afiliação à organização do festival." },

  // Live status
  "live.now":          { he: "עכשיו בלייב", en: "Live now", pt: "Em direto agora" },
  "live.notStarted":   { he: "האירוע עוד לא התחיל", en: "The event hasn't started yet", pt: "O evento ainda não começou" },
  "live.ended":        { he: "האירוע הסתיים", en: "The event has ended", pt: "O evento terminou" },
  "live.tba":          { he: "לוח הזמנים T.B.A.", en: "Schedule T.B.A.", pt: "Horário T.B.A." },
  "live.idle":         { he: "אין סט פעיל כרגע", en: "No active set right now", pt: "Sem set ativo neste momento" },
  "live.startsNow":    { he: "מתחיל עכשיו", en: "Starts now", pt: "Começa agora" },
  "live.daysHHMM":     { he: "עוד {d} ימים · {hm}", en: "{d} days · {hm}", pt: "{d} dias · {hm}" },
  "live.hoursHHMM":    { he: "עוד {hm} שעות", en: "in {hm}", pt: "em {hm}" },
  "live.minutesM":     { he: "עוד {m} דקות", en: "in {m} min", pt: "dentro de {m} min" },
  "live.prevLabel":    { he: "לפני", en: "Before", pt: "Antes" },
  "live.nextLabel":    { he: "הבא בתור", en: "Next up", pt: "A seguir" },
  "live.demoBadge":    { he: "הדגמה", en: "Demo", pt: "Demo" },

  // Countdown timer unit labels (boxed digital ticker).
  "timer.days":        { he: "ימים", en: "Days",  pt: "Dias" },
  "timer.hours":       { he: "שעות", en: "Hours", pt: "Horas" },
  "timer.minutes":     { he: "דקות", en: "Min",   pt: "Min" },
  "timer.seconds":     { he: "שניות", en: "Sec",  pt: "Seg" },

  // Set time badge
  "setTime.tba":       { he: "שעת הופעה: T.B.A.", en: "Set time: T.B.A.", pt: "Horário do set: T.B.A." },

  // Favorites (heart) button + overlay.
  "favorite.add":         { he: "הוסף למועדפים", en: "Add to favorites", pt: "Adicionar aos favoritos" },
  "favorite.remove":      { he: "הסר מהמועדפים", en: "Remove from favorites", pt: "Remover dos favoritos" },
  "favorites.title":      { he: "המועדפים שלי", en: "My favorites", pt: "Meus favoritos" },
  "favorites.empty":      { he: "עוד לא סימנת אומנים בלב", en: "You haven't favorited any artists yet", pt: "Ainda não marcaste artistas" },
  "favorites.open":       { he: "פתח מועדפים", en: "Open favorites", pt: "Abrir favoritos" },
  "favorites.close":      { he: "סגור", en: "Close", pt: "Fechar" },
  "favorites.notifyDesc": { he: "קבלו התראה כשהאומנים האהובים עליכם עולים לבמה.", en: "Get notified when your favorite artists go on stage.", pt: "Recebe uma notificação quando os teus artistas favoritos sobem ao palco." },
  "favorites.notifyCta":  { he: "קבל התראות", en: "Get notifications", pt: "Receber notificações" },
  "favorites.notifyOn":   { he: "התראות פעילות", en: "Notifications on", pt: "Notificações ativadas" },
  "favorites.notifyDenied": { he: "ההתראות חסומות בדפדפן", en: "Notifications blocked in your browser", pt: "Notificações bloqueadas no navegador" },
  "favorites.notifyUnsupported": { he: "הדפדפן לא תומך בהתראות", en: "Notifications aren't supported here", pt: "Notificações não suportadas neste navegador" },

  // First-visit language picker. The modal shows the title in all three
  // languages stacked, so these keys are mostly used for accessible labels
  // applied dynamically once a default is chosen.
  "welcome.title":        { he: "בחרו שפה", en: "Choose your language", pt: "Escolha o seu idioma" },
  "welcome.suggested":    { he: "נבחר אוטומטית — אפשר לשנות", en: "Auto-selected — feel free to change", pt: "Selecionado automaticamente — podes alterar" },

  // Announcement
  "announced.prefix":  { he: "📣 הוכרז ב-", en: "📣 Announced on ", pt: "📣 Anunciado em " },

  // Mini-player
  "mp.next":           { he: "הבא:", en: "Next up:", pt: "A seguir:" },
  "mp.endOfList":      { he: "סוף הרשימה", en: "End of the queue", pt: "Fim da lista" },
  "mp.close":          { he: "סגור", en: "Close", pt: "Fechar" },
  "mp.skip":           { he: "הטראק הבא", en: "Next track", pt: "Próxima faixa" },
  "mp.expand":         { he: "הגדל / הקטן", en: "Expand / collapse", pt: "Expandir / minimizar" },

  // Search
  "search.placeholder":{ he: "חפש אומן...", en: "Search artist…", pt: "Procurar artista…" },
  "search.empty":      { he: "לא נמצא אומן בשם הזה", en: "No artist matches that name", pt: "Nenhum artista encontrado" },

  // Pull-to-navigate gesture
  "pull.next":         { he: "המשיכו למטה לאומן הבא", en: "Keep pulling for next artist", pt: "Puxe mais para o próximo artista" },
  "pull.prev":         { he: "המשיכו למעלה לאומן הקודם", en: "Keep pulling for previous artist", pt: "Puxe mais para o artista anterior" },
  "pull.releaseNext":  { he: "שחררו לאומן הבא", en: "Release for next artist", pt: "Solte para o próximo artista" },
  "pull.releasePrev":  { he: "שחררו לאומן הקודם", en: "Release for previous artist", pt: "Solte para o artista anterior" },

  // Stream icon hover
  "stream.officialChannel": { he: "ערוץ רשמי", en: "Official channel", pt: "Canal oficial" },

  // ZNA festival meta (kept consistent across languages where natural)
  "festival.dates":    { he: "15-22 ביולי 2026", en: "15-22 July 2026", pt: "15-22 julho 2026" },
  "festival.location": { he: "ים מונטרגיל, פורטוגל", en: "Lake Montargil, Portugal", pt: "Lago de Montargil, Portugal" },
  "festival.description": {
    he: "המקדש העולמי של גואה טראנס בסגנון הישן. פסטיבל דו-שנתי עם כ-5,000 משתתפים בלבד שחוגג את רוח אנג'ונה של שנות ה-90.",
    en: "The world headquarters of old-school Goa Trance. A biennial gathering of just 5,000 attendees celebrating the spirit of '90s Anjuna.",
    pt: "A sede mundial do Goa Trance da velha-guarda. Encontro bienal de apenas 5.000 participantes que celebra o espírito de Anjuna nos anos 90."
  },

  // Stage names + descriptions
  "stage.retro":           { he: "Retro Universe", en: "Retro Universe", pt: "Retro Universe" },
  "stage.zambu":           { he: "Zambu Temple", en: "Zambu Temple", pt: "Zambu Temple" },
  "stage.guardians":       { he: "Goa Guardians", en: "Goa Guardians", pt: "Goa Guardians" },
  "stage.market":          { he: "Market", en: "Market", pt: "Market" },
  "stage.retro.desc":      { he: "במה ראשית - גואה טראנס קלאסי", en: "Main stage — classic Goa Trance", pt: "Palco principal — Goa Trance clássico" },
  "stage.zambu.desc":      { he: "מקדש הריקודים - 24 שעות פסיכדליה רצופות", en: "Dancefloor temple — 24 continuous hours of psychedelia", pt: "Templo da pista — 24 horas de psicadelismo contínuo" },
  "stage.guardians.desc":  { he: "במת הוויניל - שומרי הסאונד הישן", en: "The vinyl stage — guardians of the old sound", pt: "Palco do vinil — guardiões do som antigo" },
  "stage.market.desc":     { he: "במת חימום ושוק", en: "Warm-up & market stage", pt: "Palco de aquecimento e mercado" }
};

// Hebrew month names — used by the announced-on date formatter when current
// language is HE. EN uses English months; PT uses Portuguese.
const MONTH_NAMES = {
  he: ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  pt: ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]
};

// Look up a UI string by key, with optional {placeholder} substitution.
function t(key, vars) {
  const entry = STRINGS[key];
  if (!entry) return key;
  let str = entry[currentLang] || entry.en || entry.he || key;
  if (vars) Object.keys(vars).forEach(k => { str = str.replace(`{${k}}`, vars[k]); });
  return str;
}

// Per-artist translated field. Falls back through current lang → en → he → original.
function tArtist(a, field) {
  const tr = a.translations || {};
  return tr[currentLang]?.[field] || tr.en?.[field] || tr.he?.[field] || a[field] || "";
}

// Per-stage translated field (name / description).
function tStage(stageId, field = "name") {
  const key = field === "desc" ? `stage.${stageId}.desc` : `stage.${stageId}`;
  if (STRINGS[key]) return t(key);
  const stage = FESTIVAL.stages.find(s => s.id === stageId);
  return field === "desc" ? (stage?.desc || "") : (stage?.name || stageId);
}

// Snapshot which section + horizontal panel the user is looking at, so
// we can restore them after a full reel rebuild. The reel is just one
// long scroll container, so the visible section is whichever one
// contains the mid-viewport line. For a section, panelIdx is the raw
// child index in its pager (0..N) — clone slots included — so the
// rebuilt DOM (which clones the same way) lands on the same panel.
function captureScrollState() {
  if (!reel) return null;
  const sections = reel.querySelectorAll(".section");
  if (!sections.length) return null;
  const mid = reel.scrollTop + reel.clientHeight / 2;
  let active = null, bestDist = Infinity;
  for (const s of sections) {
    const top = s.offsetTop;
    const bot = top + s.offsetHeight;
    if (mid >= top && mid <= bot) { active = s; break; }
    const d = Math.min(Math.abs(mid - top), Math.abs(mid - bot));
    if (d < bestDist) { bestDist = d; active = s; }
  }
  if (!active) return null;
  const sectionKey = active.dataset.section === "artist"
    ? `artist:${active.dataset.artistId}`
    : "hero";
  const pager = active.querySelector(".pager") || active.querySelector(".hero-pager");
  let panelIdx = 0;
  if (pager) {
    const w = pager.clientWidth || 1;
    panelIdx = Math.round(Math.abs(pager.scrollLeft) / w);
  }
  return { sectionKey, panelIdx };
}

function restoreScrollState(state) {
  if (!state || !reel) return;
  let target = null;
  if (state.sectionKey === "hero") {
    target = reel.querySelector('[data-section="hero"]');
  } else if (typeof state.sectionKey === "string" && state.sectionKey.startsWith("artist:")) {
    const id = state.sectionKey.slice("artist:".length);
    target = reel.querySelector(`[data-artist-id="${CSS.escape(id)}"]`);
  }
  if (!target) return;
  target.scrollIntoView({ behavior: "auto", block: "start" });
  const pager = target.querySelector(".pager") || target.querySelector(".hero-pager");
  const child = pager?.children[state.panelIdx || 0];
  if (child) child.scrollIntoView({ behavior: "auto", inline: "start", block: "nearest" });
}

function applyLang(lang) {
  if (!LANG_CODES[lang]) return;
  currentLang = lang;
  try { localStorage.setItem("zna-lang", lang); } catch (_) {}
  document.documentElement.lang = lang;
  // Update static UI chrome that sits outside the reel.
  const searchBtn = document.getElementById("search-btn");
  const logoBtn = document.getElementById("logo-btn");
  const searchInput = document.getElementById("search-input");
  if (searchBtn) { searchBtn.title = t("nav.searchArtist"); searchBtn.setAttribute("aria-label", t("nav.searchArtist")); }
  if (logoBtn) { logoBtn.title = t("nav.backHome"); logoBtn.setAttribute("aria-label", t("nav.backHome")); }
  if (searchInput) searchInput.placeholder = t("search.placeholder");
  // Re-render the entire reel so every translated string refreshes —
  // but capture where the user currently is first, so we can put them
  // back on the same section + panel after the rebuild.
  if (typeof rerenderArtistsBelowHero === "function" && typeof buildReel === "function") {
    const snap = captureScrollState();
    buildReel();
    if (typeof buildVerticalProgress === "function") buildVerticalProgress();
    if (typeof buildStageDropdown === "function") buildStageDropdown();
    if (typeof observeSections === "function") observeSections();
    // Layout reads happen one frame after innerHTML swap; defer the
    // restore so children[i].scrollIntoView lands on the new layout.
    requestAnimationFrame(() => restoreScrollState(snap));
  }
  // Top-bar favorites label/title moves with the language switch.
  if (typeof refreshFavoritesCounter === "function") refreshFavoritesCounter();
  // Nav-sheet copy + festival map caption follow the language switch.
  if (typeof refreshNavSheetCopy === "function") refreshNavSheetCopy();
  if (mapCaptionEl && mapOverlay && !mapOverlay.hidden) mapCaptionEl.textContent = t("nav.festivalMap");
}

document.documentElement.lang = currentLang;

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
    miniPlayerNext.textContent = t("mp.endOfList");
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

miniPlayerClose.addEventListener("click", e => {
  e.stopPropagation();
  closeMiniPlayer();
});
miniPlayerExpand.addEventListener("click", e => {
  e.stopPropagation();
  miniPlayer.classList.toggle("is-expanded");
});
miniPlayerSkip.addEventListener("click", e => {
  e.stopPropagation();
  onVideoEnded();
});

// Click anywhere on the collapsed mini-player chrome (artist name, title,
// next-track preview, the small thumbnail border, empty space) to expand
// it. We listen on both `click` and `pointerup` because iOS Safari is
// sometimes flaky about firing `click` on non-interactive divs — the
// pointerup hook gives us a more direct path. Buttons stopPropagation, and
// the YouTube iframe captures its own events, so neither bubbles here.
function handleMiniPlayerExpandIntent(e) {
  if (miniPlayer.classList.contains("is-expanded")) return;
  if (e.target.closest("iframe")) return;
  if (e.target.closest(".mini-player-btn")) return;
  miniPlayer.classList.add("is-expanded");
}
miniPlayer.addEventListener("click", handleMiniPlayerExpandIntent);
miniPlayer.addEventListener("pointerup", handleMiniPlayerExpandIntent);

// Active stage filter ("all" = show every artist)
// Merge per-artist extras (representedBy + verified streaming channels) onto
// each artist record. Defined in data.js as ARTIST_EXTRAS, kept separate
// from the main ARTISTS list so the data table stays scannable.
if (typeof ARTIST_EXTRAS !== "undefined") {
  ARTISTS.forEach(a => {
    const extra = ARTIST_EXTRAS[a.id];
    if (!extra) return;
    if (extra.representedBy && !a.representedBy) a.representedBy = extra.representedBy;
    if (extra.channels) a.channels = { ...(a.channels || {}), ...extra.channels };
  });
}

// Merge per-artist translations (en/pt for bio, notable, country, born) onto
// each artist record. The HE values stay where they are; tArtist() reads
// from a.translations[currentLang] first, falls back to en, then he.
if (typeof ARTIST_TRANSLATIONS !== "undefined") {
  ARTISTS.forEach(a => {
    const tr = ARTIST_TRANSLATIONS[a.id];
    if (!tr) return;
    a.translations = a.translations || {};
    a.translations.he = a.translations.he || {
      bio: a.bio, notable: a.notable, country: a.country, born: a.born
    };
    if (tr.en) a.translations.en = tr.en;
    if (tr.pt) a.translations.pt = tr.pt;
  });
}

let activeStageFilter = "all";

// Service worker registration — runs after first paint so it never delays
// LCP. The SW caches the app shell + artist photos so a repeat visit (a
// festival-goer back at camp with bad cellular) boots offline. Registered
// with a relative URL so the same code works from a GitHub Pages sub-path.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {});
    }, 0);
  }, { once: true });
}

// Try to load build-time-fetched photos and merge them onto artist records.
// photos.json is now the multi-format manifest produced by
// build/optimize-images.mjs — each entry is an object with avif/webp/jpg
// URLs plus intrinsic w/h. We overwrite any plain-string a.photo from
// official-artists.js so render code always sees the structured shape and
// can emit a real <picture> tag.
async function loadPhotos() {
  try {
    const res = await fetch("photos.json");
    if (!res.ok) return;
    const photos = await res.json();
    let upgraded = 0;
    ARTISTS.forEach(a => {
      const entry = photos[a.id];
      if (!entry) return;
      const next = (typeof entry === "object") ? entry : null;
      if (next && (typeof a.photo === "string" || !a.photo)) {
        a.photo = next;
        upgraded++;
      } else if (!a.photo && typeof entry === "string") {
        a.photo = entry;
        upgraded++;
      }
    });
    if (upgraded > 0) {
      try {
        // Don't disturb a playing video - the player lives outside the reel.
        buildReel();
        observeSections();
        setActiveSection(reel.querySelector(".section"));
        // The rebuild wipes whatever section the deep-link landed on. If
        // we came in on a deep-link, re-apply it so the URL target sticks.
        if (typeof applyInitialRoute === "function") applyInitialRoute();
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

// Build a <picture> tag with AVIF → WebP → JPG sources from the photos.json
// manifest object { avif, webp, jpg, avif320, webp320, jpg320, w, h }. Falls
// back to a single <img> if `photo` is still a legacy plain-string path
// (photos.json hasn't loaded yet, or for hero stage elements).
function pictureTag(photo, opts = {}) {
  if (!photo) return "";
  const {
    className = "",
    alt = "",
    loading = "lazy",
    fetchpriority = "",
    sizes = "(max-width: 480px) 100vw, 800px",
    width,
    height,
  } = opts;
  const fp = fetchpriority ? ` fetchpriority="${fetchpriority}"` : "";

  // Legacy string shape (official-artists.js sets a.photo to "images/...jpg"
  // before photos.json loads). All artist photos follow the same naming
  // convention "images/artists/<id>.<ext>", so we can derive AVIF/WebP URLs
  // by swapping the extension and emit a real <picture> right away — no
  // wasted JPG fetch waiting for photos.json to upgrade us.
  if (typeof photo === "string") {
    const m = photo.match(/^(.*)\.(jpe?g|png)$/i);
    if (m) {
      const base = m[1];
      const dim = (width && height) ? ` width="${width}" height="${height}"` : "";
      return `<picture>
  <source type="image/avif" srcset="${escapeHtml(base)}.avif">
  <source type="image/webp" srcset="${escapeHtml(base)}.webp">
  <img class="${className}" src="${escapeHtml(photo)}" alt="${escapeHtml(alt)}"${dim} loading="${loading}"${fp} decoding="async" referrerpolicy="no-referrer" onerror="this.closest('picture')?.parentElement?.classList.add('photo-failed'); this.closest('picture')?.remove();" />
</picture>`;
    }
    // Non-image-extension URL: emit a plain <img> as last resort.
    const dim = (width && height) ? ` width="${width}" height="${height}"` : "";
    return `<img class="${className}" src="${escapeHtml(photo)}" alt="${escapeHtml(alt)}"${dim} loading="${loading}"${fp} decoding="async" referrerpolicy="no-referrer" onerror="this.parentElement?.classList.add('photo-failed'); this.remove();" />`;
  }

  const w = photo.w || width || 800;
  const h = photo.h || height || 800;
  const set = (a, b) => `${escapeHtml(a)} 800w, ${escapeHtml(b)} 320w`;
  return `<picture>
  <source type="image/avif" srcset="${set(photo.avif, photo.avif320)}" sizes="${escapeHtml(sizes)}">
  <source type="image/webp" srcset="${set(photo.webp, photo.webp320)}" sizes="${escapeHtml(sizes)}">
  <img class="${className}" src="${escapeHtml(photo.jpg)}" srcset="${set(photo.jpg, photo.jpg320)}" sizes="${escapeHtml(sizes)}" alt="${escapeHtml(alt)}" width="${w}" height="${h}" loading="${loading}"${fp} decoding="async" referrerpolicy="no-referrer" onerror="this.closest('picture')?.parentElement?.classList.add('photo-failed'); this.closest('picture')?.remove();" />
</picture>`;
}

// <picture> for the festival's 3D hero artwork. AVIF preferred, WebP as
// universal fallback (~98% support since iOS 14, 2020). The bulky PNG
// originals don't ship — saves ~10MB of repo + page weight.
function pictureTagStatic(base, opts = {}) {
  const { className = "", alt = "", loading = "lazy", width = 600, height = 600, fetchpriority = "" } = opts;
  const fp = fetchpriority ? ` fetchpriority="${fetchpriority}"` : "";
  const ariaHidden = alt === "" ? ' aria-hidden="true"' : "";
  // The class lands on the <picture> wrapper so the layout rules
  // (e.g. .hero-stage-element { position: absolute }) target the
  // outer block instead of the inner <img>. The inner <img> just
  // fills its parent — keeping it untagged avoids inheriting the
  // wrapper's position rules which would float it off-screen.
  // That's why the 3D hero elements disappeared after the perf
  // overhaul: same class applied to both picture and img made the
  // img position absolute relative to a zero-sized picture.
  return `<picture class="${className}">
  <source type="image/avif" srcset="${escapeHtml(base)}.avif">
  <img src="${escapeHtml(base)}.webp" alt="${escapeHtml(alt)}" width="${width}" height="${height}" loading="${loading}"${fp} decoding="async"${ariaHidden} />
</picture>`;
}

function artistSchedule(a) {
  // typeof guard — `const ARTIST_SCHEDULE` lives in data.js's script scope
  // and can throw a ReferenceError on certain load orderings before the
  // binding is fully reachable from app.js.
  const sched = (typeof ARTIST_SCHEDULE !== "undefined") ? ARTIST_SCHEDULE : null;
  return a.schedule || sched?.[a.id] || null;
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
  const localeMap = { he: "he-IL", en: "en-GB", pt: "pt-PT" };
  const locale = localeMap[currentLang] || "en-GB";
  const opts = { timeZone: FESTIVAL.timezone || "Europe/Lisbon", weekday: "short", day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit" };
  const dayTime = new Intl.DateTimeFormat(locale, opts);
  const timeOnly = new Intl.DateTimeFormat(locale, { timeZone: FESTIVAL.timezone || "Europe/Lisbon", hour: "2-digit", minute: "2-digit" });
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

  if (live) return { state: "live", title: t("live.now"), artist: live.artist, schedule: live.schedule, next };
  if (startsAt && now < startsAt) return { state: "upcoming", title: t("live.notStarted"), next, hasAnySchedule };
  if (endsAt && now > endsAt) return { state: "ended", title: t("live.ended"), hasAnySchedule };
  if (!hasAnySchedule) return { state: "tba", title: t("live.tba"), hasAnySchedule };
  return { state: "idle", title: t("live.idle"), next, hasAnySchedule };
}

function formatCountdown(targetDate) {
  if (!targetDate) return "";
  const ms = Math.max(0, targetDate.getTime() - Date.now());
  if (ms === 0) return t("live.startsNow");
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const pad = n => String(n).padStart(2, "0");
  const hm = `${pad(hours)}:${pad(minutes)}`;
  if (days > 0) return t("live.daysHHMM", { d: days, hm });
  if (hours > 0) return t("live.hoursHHMM", { hm });
  return t("live.minutesM", { m: minutes });
}

// Boxed digital countdown widget. Returns a 4-cell DD/HH/MM/SS ticker that
// the global 1s interval below keeps current. `modifier` lets callers ask
// for size variants (e.g. "hero" for the festival countdown card).
function buildCountdownTimer(targetDate, modifier = "") {
  if (!targetDate) return "";
  const iso = targetDate.toISOString();
  const cls = modifier ? `countdown-timer countdown-timer--${modifier}` : "countdown-timer";
  const parts = computeCountdownParts(targetDate);
  const cell = (key, value) => `
    <div class="countdown-unit">
      <span class="countdown-value" data-unit="${key}">${value}</span>
      <span class="countdown-label">${escapeHtml(t(`timer.${key}`))}</span>
    </div>`;
  return `
    <div class="${cls}" data-countdown-timer="${escapeHtml(iso)}" role="timer" aria-live="polite">
      ${cell("days",    parts.days)}
      <span class="countdown-sep" aria-hidden="true">:</span>
      ${cell("hours",   parts.hours)}
      <span class="countdown-sep" aria-hidden="true">:</span>
      ${cell("minutes", parts.minutes)}
      <span class="countdown-sep" aria-hidden="true">:</span>
      ${cell("seconds", parts.seconds)}
    </div>
  `;
}

function computeCountdownParts(targetDate) {
  const ms = Math.max(0, targetDate.getTime() - Date.now());
  const days    = Math.floor(ms / 86_400_000);
  const hours   = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  const pad = (n, w = 2) => String(n).padStart(w, "0");
  return {
    days:    pad(days, days >= 100 ? 3 : 2),
    hours:   pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

function liveStatusCard(stageId = "all") {
  const status = getScheduleStatus(stageId);
  const startsAt = parseScheduleTime(FESTIVAL.startsAt);

  if (status.state === "live") {
    return `
      <div class="live-status live-status--live" aria-live="polite">
        <div class="live-now-track is-live"><span class="live-now-dot"></span></div>
        <strong class="live-status-title">${escapeHtml(status.artist.name)}</strong>
        <span class="live-status-meta">${escapeHtml(stageLabel(status.artist.stage))} · ${escapeHtml(formatScheduleRange(status.schedule))}</span>
      </div>
    `;
  }

  return `
    <div class="live-status live-status--${escapeHtml(status.state)}" aria-live="polite">
      <div class="live-now-track"><span class="live-now-dot"></span></div>
      <strong class="live-status-title">${escapeHtml(t("live.notStarted"))}</strong>
      ${buildCountdownTimer(startsAt, "hero")}
    </div>
  `;
}

// Market hero demo: pretend an artist is mid-set right now and show the
// full "live now" treatment with a progress bar + previous/next set
// hand-offs. The 1-second interval below ticks the progress bar so it
// visibly creeps forward while the user is on the page. This is purely
// illustrative until the real schedule lands.
function marketLiveDemoCard() {
  const marketArtists = ARTISTS.filter(a => a.stage === "market");
  if (marketArtists.length < 3) return liveStatusCard("market");
  const pick = id => marketArtists.find(a => a.id === id);
  const prev    = pick("alien-rain")   || marketArtists[0];
  const current = pick("anais-lin")    || marketArtists[1];
  const next    = pick("extra-cheers") || marketArtists[2];
  const now = Date.now();
  const start = now - 35 * 60 * 1000; // 35 min into the set
  const end   = now + 25 * 60 * 1000; // 25 min remaining
  const startISO = new Date(start).toISOString();
  const endISO   = new Date(end).toISOString();
  const localeMap = { he: "he-IL", en: "en-GB", pt: "pt-PT" };
  const tz = FESTIVAL.timezone || "Europe/Lisbon";
  const fmt = ms => new Intl.DateTimeFormat(localeMap[currentLang] || "en-GB", {
    timeZone: tz, hour: "2-digit", minute: "2-digit"
  }).format(new Date(ms));
  const pct = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
  return `
    <div class="live-status live-status--live live-status--demo" aria-live="polite"
         data-demo-progress data-demo-start="${escapeHtml(startISO)}" data-demo-end="${escapeHtml(endISO)}">
      <div class="live-status-topline">
        <div class="live-now-track is-live"><span class="live-now-dot"></span><span class="live-now-label">${escapeHtml(t("live.now"))}</span></div>
        <span class="live-demo-badge">${escapeHtml(t("live.demoBadge"))}</span>
      </div>
      <strong class="live-status-title">${escapeHtml(current.name)}</strong>
      <span class="live-status-meta">${escapeHtml(stageLabel("market"))} · ${escapeHtml(fmt(start))}–${escapeHtml(fmt(end))}</span>
      <div class="live-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct.toFixed(0)}">
        <div class="live-progress-track">
          <div class="live-progress-fill" data-progress-fill style="width:${pct.toFixed(1)}%"></div>
        </div>
        <div class="live-progress-times">
          <span>${escapeHtml(fmt(start))}</span>
          <span>${escapeHtml(fmt(end))}</span>
        </div>
      </div>
      <div class="live-prev-next">
        <div class="live-pn-line live-pn-prev"><span class="live-pn-label">${escapeHtml(t("live.prevLabel"))}</span><span class="live-pn-name">${escapeHtml(prev.name)}</span></div>
        <div class="live-pn-line live-pn-next"><span class="live-pn-label">${escapeHtml(t("live.nextLabel"))}</span><span class="live-pn-name">${escapeHtml(next.name)}</span></div>
      </div>
    </div>
  `;
}

setInterval(() => {
  document.querySelectorAll("[data-countdown-timer]").forEach(el => {
    const target = parseScheduleTime(el.dataset.countdownTimer);
    if (!target) return;
    const parts = computeCountdownParts(target);
    el.querySelectorAll("[data-unit]").forEach(span => {
      const next = parts[span.dataset.unit];
      if (next != null && span.textContent !== next) span.textContent = next;
    });
  });
  // Tick any live-now progress bars (Market hero demo today, but the
  // hook is generic so it will keep working when real schedules land).
  document.querySelectorAll("[data-demo-progress]").forEach(el => {
    const start = new Date(el.dataset.demoStart || "").getTime();
    const end   = new Date(el.dataset.demoEnd   || "").getTime();
    if (!start || !end || end <= start) return;
    const now = Date.now();
    const pct = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
    const fill = el.querySelector("[data-progress-fill]");
    if (fill) fill.style.width = pct.toFixed(1) + "%";
    el.setAttribute("aria-valuenow", pct.toFixed(0));
  });
}, 1000);

function artistSetTimeBadge(a) {
  const schedule = completeSchedule(a);
  if (schedule) {
    return `<div class="artist-set-time has-time">${escapeHtml(formatScheduleRange(schedule))}</div>`;
  }
  const startsAt = parseScheduleTime(FESTIVAL.startsAt);
  if (startsAt && Date.now() < startsAt.getTime()) {
    return `<div class="artist-set-time is-countdown">${buildCountdownTimer(startsAt, "mini")}</div>`;
  }
  return `<div class="artist-set-time is-tba">${escapeHtml(t("setTime.tba"))}</div>`;
}

// ===== Build sections =====

const HERO_STAGES = [
  { id: "all", name: "ZNA 2026", desc: FESTIVAL.description, isMain: true },
  ...FESTIVAL.stages.map(s => ({ id: s.id, name: s.name, desc: s.desc, isMain: false }))
];

// Base paths (no extension) — pictureTagStatic adds .avif / .webp / .png so
// modern browsers grab the AVIF (~10× smaller than the PNG). PNG fallback
// remains in the repo for the ~2% without WebP/AVIF support.
const HERO_STAGE_ELEMENTS = {
  retro:     "images/zna-3d/custom-goa-sound-totem-element",
  zambu:     "images/zna-3d/custom-festival-portal-element",
  guardians: "images/zna-3d/custom-chillout-organism-element",
  market:    "images/zna-3d/custom-market-shrine-element"
};

function heroPanelMain() {
  return `
    <div class="hero-panel hero-panel--main" data-stage="all">
      ${pictureTagStatic("images/zna-3d/community-zna-logo-26-celebration", { className: "hero-zna-mark", alt: "ZNA 26 Community — The Retro Futuristic Celebration", width: 600, height: 400, loading: "eager", fetchpriority: "high" })}
      <p class="hero-tagline">${escapeHtml(t("festival.description"))}</p>
      <div class="hero-meta">${escapeHtml(t("festival.dates"))} · ${escapeHtml(t("festival.location"))} · ${ARTISTS.length} ${escapeHtml(t("hero.artistsCount"))}</div>
      ${liveStatusCard("all")}
      <div class="hero-actions" role="group" aria-label="${escapeHtml(t("hero.actions"))}">
        <button class="hero-action glass-btn" id="hero-nav-btn" type="button" title="${escapeHtml(t("nav.navigate"))}" aria-label="${escapeHtml(t("nav.navigate"))}">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M21.71 11.29 12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42l9 9a1 1 0 0 0 1.42 0l9-9a1 1 0 0 0 0-1.42zM14 14.5V12h-4v3H8v-4a1 1 0 0 1 1-1h5V7.5l3.5 3.5z"/></svg>
          <span class="hero-action-label">${escapeHtml(t("nav.navigate"))}</span>
        </button>
        <button class="hero-action glass-btn" id="hero-map-btn" type="button" title="${escapeHtml(t("nav.festivalMap"))}" aria-label="${escapeHtml(t("nav.festivalMap"))}">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>
          <span class="hero-action-label">${escapeHtml(t("nav.festivalMap"))}</span>
        </button>
      </div>
      <p class="hero-disclaimer">${escapeHtml(t("hero.disclaimer"))}</p>
    </div>
  `;
}

function heroPanelStage(stage) {
  const count = ARTISTS.filter(a => a.stage === stage.id).length;
  const elementBase = HERO_STAGE_ELEMENTS[stage.id];
  const elementMarkup = elementBase
    ? pictureTagStatic(elementBase, {
        className: `hero-stage-element hero-stage-element--${stage.id}`,
        alt: "",
        width: 600,
        height: 1066,
        loading: "lazy",
      })
    : "";
  return `
    <div class="hero-panel hero-panel--${escapeHtml(stage.id)}" data-stage="${escapeHtml(stage.id)}">
      ${elementMarkup}
      <div class="hero-stage-tag">${escapeHtml(t("nav.stage"))}</div>
      <div class="logo-mark hero-stage-name">${escapeHtml(tStage(stage.id))}</div>
      <p class="hero-tagline">${escapeHtml(tStage(stage.id, "desc"))}</p>
      <div class="hero-meta">${count} ${escapeHtml(t("hero.artistsCount"))}</div>
      ${stage.id === "market" ? marketLiveDemoCard() : liveStatusCard(stage.id)}
      <div class="hero-hint"><span>${escapeHtml(t("hero.diveStage").replace(/^[↓\s]+/, ""))}</span><span class="hero-hint-arrow">↓</span></div>
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
    // Live dot/bg tracking is handled by the global RAF loop on .reel scroll,
    // so this debounced handler is left to the heavy work only — flipping
    // activeStageFilter and re-rendering the artist sections below.
    heroScrollTimer = setTimeout(() => {
      const w = pager.clientWidth || 1;
      const idx = Math.round(Math.abs(pager.scrollLeft) / w);
      const stage = HERO_STAGES[idx]?.id;
      if (stage && stage !== activeStageFilter) {
        activeStageFilter = stage;
        buildStageDropdown();
        rerenderArtistsBelowHero();
        if (typeof syncUrlFromActive === "function") syncUrlFromActive();
      }
    }, 160);
  }, { passive: true });

  // The hero-dots strip uses the same delegated two-stage tap handler as
  // the per-artist .dots strip (see armDots/global click handler below) —
  // first tap arms it, second tap navigates. We only need the dedicated
  // listener to stay quiet here.
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
  // Hero pager landed on a different stage — reflect it in the URL.
  if (typeof syncUrlFromActive === "function") syncUrlFromActive();
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
  observeArtistInitialScroll();
  observeYTThumbs();
  // Re-attach the desktop wheel clamp to the freshly-rendered pagers so
  // trackpad gestures still resolve to one panel per gesture after a
  // filter change.
  reel.querySelectorAll('[data-section="artist"] .pager').forEach(p => installWheelClamp(p, "x"));
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
  const tags = (a.tags || []).slice(0, 4);
  const photoTags = buildPhotoTags(a.id, tags);
  // If the user came in on a deep-link to this artist, load their photo
  // eagerly with high priority so the first paint isn't waiting on it.
  const isDeepLinkTarget = (typeof _initialRoute !== "undefined") && _initialRoute && _initialRoute.a === a.id;
  const photo = pictureTag(a.photo, {
    className: "artist-photo",
    alt: a.name,
    loading: isDeepLinkTarget ? "eager" : "lazy",
    fetchpriority: isDeepLinkTarget ? "high" : "",
    sizes: "(max-width: 480px) 100vw, 480px",
  });
  return `
    <div class="panel panel-hero panel--hero" style="--accent: ${a.color || "#FEB447"};">
      <div class="panel-inner">
        <div class="artist-hero-photo">
          <figure class="artist-hero-art ${a.photo ? "has-photo" : ""}">
            ${photo}
            <span class="artist-initials" aria-hidden="true">${initials}</span>
          </figure>
          ${photoTags}
        </div>
        <div class="artist-hero-text">
          <div class="artist-hero-headline">
            <h1 class="artist-name">${escapeHtml(a.name)}</h1>
            ${a.realName ? `<div class="artist-real">${escapeHtml(a.realName)}</div>` : ""}
            <div class="artist-meta-line">
              <span class="meta-item">📍 ${escapeHtml(tArtist(a, "country"))}</span>
              ${a.age ? `<span class="meta-item">🎂 ${a.age}</span>` : ""}
              <span class="meta-item">🎧 ${escapeHtml(a.role)}</span>
            </div>
          </div>
          ${artistSetTimeBadge(a)}
          ${favoriteButton(a.id)}
        </div>
      </div>
    </div>
  `;
}

// Stable seeded layout for the small "scattered" tags around the artist's
// photo. Each tag is anchored at one of four corner-ish slots around the
// photo and given a small jitter, a random rotation (clamped to ±25° so
// the text stays readable), and a staggered animation delay so the tags
// pop in one after another when the artist section becomes active.
function buildPhotoTags(artistId, tags) {
  if (!tags || !tags.length) return "";
  // Slots sit outside the photo's bounding box so each chip floats
  // clearly away from the rounded photo edge — easier to read on small
  // screens. Negative / >100% values are fine because the photo wrapper
  // is overflow: visible. Tweaked from the original ~10/90% positions.
  const slots = [
    { x: -4, y:  4 },   // top-left, just outside
    { x: 104, y:  2 },   // top-right
    { x: -2, y: 96 },    // bottom-left
    { x: 102, y: 98 },   // bottom-right
  ];
  return tags.map((tag, i) => {
    const seed = hashStr(artistId + "::" + i + "::" + tag);
    const slot = slots[i % slots.length];
    const jx = (rand01(seed * 11) - 0.5) * 8;     // ±4%
    const jy = (rand01(seed * 17) - 0.5) * 8;     // ±4%
    const rot = (rand01(seed * 7)  - 0.5) * 50;   // ±25°
    const delay = 140 + i * 90 + Math.floor(rand01(seed * 3) * 50);
    return `<span class="photo-tag" style="--x: ${(slot.x + jx).toFixed(1)}%; --y: ${(slot.y + jy).toFixed(1)}%; --rot: ${rot.toFixed(1)}deg; --delay: ${delay}ms;">${escapeHtml(tag)}</span>`;
  }).join("");
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h) || 1;
}

function rand01(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// ===== Favorites (heart) =====
// Per-artist heart, stored in localStorage as a Set of artist ids. The
// top-bar shows a counter that opens an overlay listing all favorited
// artists with their set times.
const FAVORITES_STORAGE_KEY = "zna-favorites";
const HEART_ICON_OUTLINE = '<svg class="fav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
const HEART_ICON_FILLED  = '<svg class="fav-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch { return new Set(); }
}

function setFavorites(set) {
  try { localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...set])); } catch {}
}

function isFavorite(artistId) {
  return getFavorites().has(artistId);
}

function toggleFavorite(artistId) {
  const s = getFavorites();
  if (s.has(artistId)) s.delete(artistId); else s.add(artistId);
  setFavorites(s);
  return s.has(artistId);
}

// Heart-only favorite button for the artist hero. No text, just the
// heart icon — outline when un-favorited, filled red when favorited.
function favoriteButton(artistId) {
  const fav = isFavorite(artistId);
  const label = t(fav ? "favorite.remove" : "favorite.add");
  const icon = fav ? HEART_ICON_FILLED : HEART_ICON_OUTLINE;
  return `<button class="artist-favorite ${fav ? "is-favorite" : ""}" type="button" aria-pressed="${fav ? "true" : "false"}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}" data-fav-id="${escapeHtml(artistId)}">${icon}</button>`;
}

function formatAnnouncedDate(yyyymmdd) {
  if (!yyyymmdd) return "";
  const months = MONTH_NAMES[currentLang] || MONTH_NAMES.en;
  const m = String(yyyymmdd).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return "";
  const [_, y, mo, d] = m;
  const monthName = months[parseInt(mo, 10) - 1] || "";
  if (currentLang === "he") return `${parseInt(d, 10)} ב${monthName} ${y}`;
  if (currentLang === "pt") return `${parseInt(d, 10)} ${monthName} ${y}`;
  return `${monthName} ${parseInt(d, 10)}, ${y}`;
}

// Per-platform icon SVG (single-color, currentColor) so each artist can be
// linked to YouTube / Spotify / SoundCloud / Apple Music with a single icon.
const STREAM_ICONS = {
  youtube:    `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M23.5 6.51a3.02 3.02 0 0 0-2.13-2.14C19.45 4 12 4 12 4s-7.45 0-9.37.37A3.02 3.02 0 0 0 .5 6.51 31.5 31.5 0 0 0 .12 12a31.5 31.5 0 0 0 .38 5.49 3.02 3.02 0 0 0 2.13 2.14C4.55 20 12 20 12 20s7.45 0 9.37-.37a3.02 3.02 0 0 0 2.13-2.14A31.5 31.5 0 0 0 23.88 12a31.5 31.5 0 0 0-.38-5.49zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>`,
  spotify:    `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.59 14.42c-.18.3-.57.4-.87.22-2.4-1.47-5.42-1.8-8.97-.99a.63.63 0 0 1-.27-1.23c3.88-.88 7.22-.5 9.92 1.13.3.18.4.57.19.87zm1.22-2.72a.79.79 0 0 1-1.08.26c-2.75-1.69-6.94-2.18-10.18-1.2a.79.79 0 1 1-.46-1.51c3.72-1.13 8.36-.58 11.52 1.36.37.23.49.71.2 1.09zm.1-2.83c-3.28-1.95-8.7-2.13-11.83-1.18a.95.95 0 1 1-.55-1.81c3.6-1.09 9.6-.88 13.39 1.36a.95.95 0 1 1-1.01 1.63z"/></svg>`,
  soundcloud: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M2 14a.5.5 0 0 1 .5.5v3a.5.5 0 1 1-1 0v-3A.5.5 0 0 1 2 14zm2 1a.5.5 0 0 1 .5.5v2a.5.5 0 1 1-1 0v-2A.5.5 0 0 1 4 15zm2-2a.5.5 0 0 1 .5.5v4a.5.5 0 1 1-1 0v-4A.5.5 0 0 1 6 13zm2 0a.5.5 0 0 1 .5.5v4a.5.5 0 1 1-1 0v-4A.5.5 0 0 1 8 13zm2-2a.5.5 0 0 1 .5.5v6a.5.5 0 1 1-1 0v-6a.5.5 0 0 1 .5-.5zm2-2a.5.5 0 0 1 .5.5v8a.5.5 0 1 1-1 0V9.5a.5.5 0 0 1 .5-.5zm10.5 4.5c0 1.93-1.57 3.5-3.5 3.5h-7v-9c1.7-.7 3.6-.4 5 1 .9.9 1.4 2 1.5 3.2.3-.1.6-.2 1-.2 1.93 0 3.5 1.57 3.5 3.5z"/></svg>`,
  applemusic: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M22 4.34c0-.43-.04-.85-.13-1.25a3.4 3.4 0 0 0-.43-1.13 2.8 2.8 0 0 0-.86-.91A3.5 3.5 0 0 0 19.4.6a4.7 4.7 0 0 0-1.4-.18c-.42 0-.83.05-1.24.14L8.6 2.32c-.5.11-.93.27-1.3.5-.36.21-.65.5-.86.85-.21.36-.36.78-.45 1.27a8 8 0 0 0-.13 1.49v9.78a3.32 3.32 0 0 1-.66-.05c-.4-.06-.78-.04-1.13.07-.36.1-.67.27-.95.5a2.4 2.4 0 0 0-.66.83 2.6 2.6 0 0 0-.24 1.13c0 .4.08.79.24 1.14.16.34.38.63.66.85.28.23.6.4.96.5.36.1.74.13 1.13.07.4-.06.77-.18 1.12-.36.36-.18.67-.41.93-.7.27-.3.48-.62.62-1 .14-.36.21-.76.21-1.18V8.83l9.6-2.16v8.16a3.32 3.32 0 0 1-.65-.04 2.7 2.7 0 0 0-1.13.06c-.36.1-.67.27-.96.5-.27.22-.5.5-.66.83a2.6 2.6 0 0 0-.24 1.14c0 .4.08.78.24 1.13.16.35.38.64.66.86.28.22.6.39.96.5.36.1.74.12 1.13.06.4-.05.77-.17 1.12-.35.36-.18.67-.41.93-.7.27-.3.48-.62.62-1 .14-.36.21-.76.21-1.18V4.34z"/></svg>`
};

const PLATFORM_LABEL = {
  youtube: "YouTube",
  spotify: "Spotify",
  soundcloud: "SoundCloud",
  applemusic: "Apple Music"
};

// Build the four streaming-platform icon links for an artist. Uses verified
// channel URLs from a.channels when available (renders with a verified badge);
// otherwise falls back to a search URL that opens that platform with the
// artist's name pre-filled — so every icon always works.
function streamingLinks(a) {
  const q = encodeURIComponent(a.name);
  const ch = a.channels || {};
  const search = {
    youtube:    `https://www.youtube.com/results?search_query=${q}`,
    spotify:    `https://open.spotify.com/search/${q}`,
    soundcloud: `https://soundcloud.com/search?q=${q}`,
    applemusic: `https://music.apple.com/us/search?term=${q}`
  };
  return ["youtube", "spotify", "soundcloud", "applemusic"].map(p => ({
    platform: p,
    url: ch[p] || search[p],
    verified: !!ch[p],
    icon: STREAM_ICONS[p],
    label: PLATFORM_LABEL[p]
  }));
}

function panelInfo(a) {
  const links = a.links || [];
  const officialChannel = t("stream.officialChannel");
  // Streaming icons row — always renders all 4 platforms.
  const streamingHtml = `
    <div class="info-section">
      <h3 class="info-section-title">${escapeHtml(t("panel.streaming"))}</h3>
      <div class="streaming-row">
        ${streamingLinks(a).map(s => `
          <a class="stream-icon stream-icon--${s.platform} ${s.verified ? "is-verified" : ""}"
             href="${escapeHtml(s.url)}" target="_blank" rel="noopener"
             title="${escapeHtml(s.label)}${s.verified ? " · " + escapeHtml(officialChannel) : ""}"
             aria-label="${escapeHtml(s.label)}${s.verified ? " (" + escapeHtml(officialChannel) + ")" : ""}">
            ${s.icon}
            ${s.verified ? `<span class="stream-verified" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19l12-12-1.4-1.4z"/></svg>
            </span>` : ""}
          </a>
        `).join("")}
      </div>
    </div>
  `;
  // Other links (Discogs / Bandcamp / Resident Advisor / Website / Wikipedia / etc).
  const linksHtml = links.length
    ? `
      <div class="info-section">
        <h3 class="info-section-title">${escapeHtml(t("panel.moreLinks"))}</h3>
        <div class="links-grid">
          ${links.map(l => `<a class="link-btn" href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.type)} ↗</a>`).join("")}
        </div>
      </div>
    `
    : "";
  // Representatives — label / management / agency.
  const repHtml = a.representedBy
    ? `<div class="info-rep">🎧 ${escapeHtml(a.representedBy)}</div>`
    : "";
  const announcedHtml = a.announcedAt
    ? `<div class="info-meta">${escapeHtml(t("announced.prefix"))}${escapeHtml(formatAnnouncedDate(a.announcedAt))}</div>`
    : "";
  const bioText = tArtist(a, "bio");
  const notableText = tArtist(a, "notable");
  const bioHtml = bioText
    ? `
      <div class="info-section">
        <h3 class="info-section-title">${escapeHtml(t("panel.bio"))}</h3>
        <p class="bio-text">${escapeHtml(bioText)}</p>
        ${notableText ? `<div class="notable">★ ${escapeHtml(notableText)}</div>` : ""}
      </div>
    `
    : "";
  return `
    <div class="panel panel--info">
      <div class="panel-inner">
        <div class="panel-eyebrow has-artist">
          <span class="eyebrow-artist">${escapeHtml(a.name)}</span>
          <span class="eyebrow-section">${escapeHtml(t("panel.about"))}</span>
        </div>
        <div class="bio-card">
          ${announcedHtml}
          ${repHtml}
          ${bioHtml}
          ${streamingHtml}
          ${linksHtml}
        </div>
      </div>
    </div>
  `;
}

function panelAlbums(a) {
  const eyebrow = (label) => `
    <div class="panel-eyebrow has-artist">
      <span class="eyebrow-artist">${escapeHtml(a.name)}</span>
      <span class="eyebrow-section">${escapeHtml(label)}</span>
    </div>
  `;
  if (!a.albums || !a.albums.length) {
    return `
      <div class="panel panel--discography">
        <div class="panel-inner">
          ${eyebrow(t("panel.discography"))}
          <p class="muted">${escapeHtml(t("panel.tba"))}</p>
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
        ${eyebrow(t("panel.discographyTop"))}
        <ul class="albums-list">${items}</ul>
      </div>
    </div>
  `;
}

function panelTracks(a) {
  const tracks = a.tracks || [];
  const eyebrow = (label) => `
    <div class="panel-eyebrow has-artist">
      <span class="eyebrow-artist">${escapeHtml(a.name)}</span>
      <span class="eyebrow-section">${escapeHtml(label)}</span>
    </div>
  `;
  if (!tracks.length) {
    const q = encodeURIComponent(a.name + " " + (a.tags || []).slice(0, 1).join(" "));
    return `
      <div class="panel panel--tracks">
        <div class="panel-inner center">
          ${eyebrow(t("panel.tracks"))}
          <p class="no-tracks">${escapeHtml(t("tracks.empty"))}</p>
          <a class="search-yt-btn" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">${escapeHtml(t("tracks.searchYT"))}</a>
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
    // Defer the i.ytimg.com fetch until the artist section enters
    // viewport proximity. The site has 89 artists × ~5 tracks each, so
    // an eager <img> fires hundreds of requests at once on first paint
    // and the browser queues most of them — making the previews appear
    // missing for a long while. upgradeYTThumbs() (below) swaps
    // data-yt-thumb → src as each section gets close to view.
    return `
    <div class="track-card ${t.zna ? "is-zna" : ""}">
      <button class="track-thumb" data-vid="${vid}" data-title="${escapeHtml(t.title)}" data-artist="${escapeHtml(a.name)}" aria-label="נגן ${escapeHtml(t.title)}">
        <img class="track-thumb-img" loading="lazy" decoding="async" fetchpriority="low" alt=""
             data-yt-thumb="${vid}"
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
        ${eyebrow(t("panel.tracksTop"))}
        <div class="tracks-stack">${cards}</div>
      </div>
    </div>
  `;
}

// Inject extra HTML attributes onto the first <div class="panel ..."> tag in
// a panel HTML string. Used to mark real-vs-clone panels for the loop logic.
function injectPanelAttrs(html, attrs) {
  return html.replace(/<div\s+(class="panel)/, `<div ${attrs} $1`);
}

function artistSection(a, idx, isFirstOfStage = false) {
  // Order: Hero → About → Tracks → Discography (last)
  const real = [panelHero(a), panelInfo(a), panelTracks(a), panelAlbums(a)];
  const realCount = real.length;
  const realTagged = real.map((html, i) => injectPanelAttrs(html, `data-real-idx="${i}"`));
  // Bookend clones for the infinite loop: clone-of-last sits before the real
  // first, clone-of-first sits after the real last. Settle-handler instant
  // jumps between them and their real counterpart, which is invisible to the
  // user because they have identical content.
  const cloneStart = injectPanelAttrs(real[realCount - 1], `data-real-idx="${realCount - 1}" data-clone="start" aria-hidden="true"`);
  const cloneEnd = injectPanelAttrs(real[0], `data-real-idx="0" data-clone="end" aria-hidden="true"`);
  const allPanels = [cloneStart, ...realTagged, cloneEnd].join("");
  const dots = real.map((_, i) => `<button class="dot ${i === 0 ? "active" : ""}" data-panel="${i}" aria-label="פאנל ${i + 1}"></button>`).join("");
  const cls = `section artist-section${isFirstOfStage ? " is-first-of-stage" : ""}`;
  return `
    <section class="${cls}"
             data-section="artist"
             data-artist-id="${escapeHtml(a.id)}"
             data-stage="${escapeHtml(a.stage)}"
             data-index="${idx}"
             data-real-count="${realCount}"
             style="--accent: ${a.color || "#FEB447"};">
      <div class="pager" data-panel-count="${realCount}">${allPanels}</div>
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

// ============================================================================
// Navigation architecture (read this before touching any scroll handler)
// ----------------------------------------------------------------------------
// The reel has TWO scroll axes that interact:
//
//   Vertical (the .reel itself):
//     - Native scroll-snap-type: y mandatory; one section per screen.
//     - Touch input → native scroll + an iOS-only snap-clamp that reins in
//       fast flicks that overshoot two snap points (rare).
//     - Wheel/trackpad input → routed by ONE listener on .reel that
//       accumulates deltaY and steps via navVertical(±1). See
//       "Reel-level wheel router" below.
//     - Keyboard ↑/↓/PgUp/PgDn → navVertical(±1).
//     - Hitting the bottom edge with a swipe-up wraps to the hero
//       (touchend handler on .reel + markWrapInProgress hint).
//
//   Horizontal (per-section pagers):
//     - Multi-hero pager (.hero-pager) → native scroll-snap; the pager's
//       own scroll listener tracks settle and swaps activeStageFilter.
//     - Per-artist pager (.pager) → native scroll-snap with a 6-panel
//       infinite-loop carousel ([cloneStart][Hero][Info][Tracks][Disco]
//       [cloneEnd]); the settle handler instant-jumps clones to twins.
//     - Wheel input on a per-artist pager → installWheelClamp(p, "x")
//       which preventDefault + stopPropagation, so the reel router doesn't
//       see it.
//     - Keyboard ←/→ → navHorizontal(±1).
//
// Snap-clamp rules of thumb:
//   - Installed on .reel (vertical) and .hero-pager (horizontal).
//   - NOT installed on per-artist .pager — the carousel's instant-jump
//     wrap looks like "user jumped >1 step" and would trigger spurious
//     correction scrolls. native scroll-snap-stop:always covers the
//     common-case there.
//   - Only fires when the user ended ≥3 snap steps from where they
//     started (was 2; that ate fast double-swipes on mobile).
//   - Resets isCorrecting on every fresh touchstart so an in-flight
//     correction can't swallow the user's next gesture.
//
// markWrapInProgress(reel, 800ms) is set whenever we synthesise a wrap
// (e.g. swipe past last section → animate to hero). The snap-clamp
// re-anchors instead of "correcting" while that flag is live.
// ============================================================================

const wrappingContainers = new WeakSet();
function markWrapInProgress(container, ms = 800) {
  wrappingContainers.add(container);
  setTimeout(() => wrappingContainers.delete(container), ms);
}

function installSnapClamp(container, axis) {
  if (!container || container.dataset.snapClamp === "1") return;
  container.dataset.snapClamp = "1";
  const dim = () => axis === "y" ? container.clientHeight : container.clientWidth;
  const pos = () => axis === "y" ? container.scrollTop : container.scrollLeft;
  let startIdx = null;
  let isCorrecting = false;
  let endTimer = null;
  container.addEventListener("touchstart", () => {
    // Always re-anchor on a new gesture and abort any pending correction —
    // an in-flight isCorrecting=true used to swallow follow-up swipes,
    // which felt like "scroll only responds every other flick" on mobile.
    if (endTimer) { clearTimeout(endTimer); endTimer = null; }
    isCorrecting = false;
    startIdx = Math.round(pos() / dim());
  }, { passive: true });
  container.addEventListener("touchend", () => {
    if (endTimer) clearTimeout(endTimer);
    endTimer = setTimeout(() => {
      endTimer = null;
      if (isCorrecting || startIdx === null) return;
      // A wrap is mid-flight (e.g. last section → hero) — let it finish.
      // Re-anchor startIdx to the new position so the next gesture reads
      // a fresh delta.
      if (wrappingContainers.has(container)) {
        startIdx = Math.round(pos() / dim());
        return;
      }
      const w = dim();
      const idx = Math.round(pos() / w);
      const delta = idx - startIdx;
      // Only correct genuinely runaway flicks (jumped 3+ panels). Native
      // scroll-snap-stop:always already prevents 2-panel hops on most
      // devices; clamping aggressively here was eating fast double-swipes.
      if (Math.abs(delta) >= 3) {
        const targetIdx = startIdx + Math.sign(delta);
        isCorrecting = true;
        const opts = axis === "y" ? { top: targetIdx * w, behavior: "smooth" } : { left: targetIdx * w, behavior: "smooth" };
        container.scrollTo(opts);
        setTimeout(() => { isCorrecting = false; startIdx = targetIdx; }, 350);
      } else {
        startIdx = idx;
      }
    }, 220);
  }, { passive: true });
}

// Desktop wheel/trackpad clamp: one wheel gesture = one panel. Native
// scroll-snap-stop:always works on touch but a Mac trackpad fires a
// stream of wheel events with momentum that can blow past two snap points
// before settling. We hijack the wheel and animate to the next panel
// ourselves, with a cooldown so a single gesture can't move twice.
//
// `getEnabled()` lets the caller scope the clamp (e.g. "only when on an
// artist section"); when it returns false the wheel falls through to
// native handling.
function installWheelClamp(container, axis, getEnabled) {
  if (!container || container.dataset.wheelClamp === "1") return;
  container.dataset.wheelClamp = "1";
  let cooldownUntil = 0;
  container.addEventListener("wheel", e => {
    if (getEnabled && !getEnabled()) return;
    const primary = axis === "y" ? e.deltaY : e.deltaX;
    const secondary = axis === "y" ? e.deltaX : e.deltaY;
    if (Math.abs(primary) <= Math.abs(secondary)) return; // not the dominant axis
    if (Math.abs(primary) < 4) return;                    // ignore stray microscrolls
    e.preventDefault();
    // Stop the wheel from bubbling to the reel-level router, so a single
    // horizontal trackpad swipe on a pager can't also be interpreted as
    // a vertical gesture by an ancestor handler.
    e.stopPropagation();
    const now = performance.now();
    if (now < cooldownUntil) return;
    cooldownUntil = now + 480;
    const w = axis === "y" ? container.clientHeight : container.clientWidth;
    if (!w) return;
    const pos = axis === "y" ? container.scrollTop : container.scrollLeft;
    const sign = primary > 0 ? 1 : -1;
    const maxIdx = Math.max(0, Math.round((axis === "y" ? container.scrollHeight : container.scrollWidth) / w) - 1);
    const targetIdx = Math.max(0, Math.min(maxIdx, Math.round(pos / w) + sign));
    const target = targetIdx * w;
    container.scrollTo({ [axis === "y" ? "top" : "left"]: target, behavior: "smooth" });
  }, { passive: false });
}

function buildReel() {
  // Single multi-panel hero at the top, then artist sections of the
  // currently-active stage filter below it.
  const heroHtml = multiHeroSection();
  const list = getFilteredArtists();
  const artistsHtml = renderArtistSections(list);
  reel.innerHTML = heroHtml + artistsHtml;
  wireHeroPager();
  installSnapClamp(reel, "y");
  installSnapClamp(document.getElementById("hero-pager"), "x");
  // Reel vertical wheel: handled by the single global wheel listener
  // further down (see "Reel-level wheel router"). It used to also be
  // wired through installWheelClamp here, which doubled-fired with
  // the global listener on every wheel tick — causing the trackpad
  // to occasionally jump two sections in one gesture.
  reel.querySelectorAll('[data-section="artist"] .pager').forEach(p => installWheelClamp(p, "x"));
  // NOTE: not snap-clamping per-artist .pager via touch — their carousel
  // logic performs instant-jump wraps that the touch clamp would misread
  // as "user-jumped > 1 step". Native scroll-snap-stop:always handles touch
  // there, and the per-pager wheel clamp above handles desktop.
  observeArtistInitialScroll();
  observeYTThumbs();



  // Wire pager dots and YouTube thumbs for each artist section.
  // (Pager scroll + dot clicks are handled by GLOBAL delegated listeners
  // on the reel — see below — so they keep working after rerender.)
  reel.querySelectorAll('[data-section="artist"]').forEach(section => {
    // Thumb clicks are handled by the global delegated listener on .reel.
  });

  // Telegram-style pull-to-navigate: only the panels that actually have
  // long internal scrolling — Biography (.panel--info) and Tracks/Videos
  // (.panel--tracks) — get the gesture. Hero and Discography don't need
  // it (no internal scroll trap to escape from), and arming it there
  // would just steal vertical pans from the reel for no reason.
  reel.querySelectorAll('[data-section="artist"] .panel--info, [data-section="artist"] .panel--tracks')
    .forEach(setupPanelPullToNavigate);
}

// Live dot tracking: a continuous RAF loop polls scrollLeft on whichever
// pager is currently being interacted with, so the active dot updates
// frame-by-frame as the user swipes — not just when scroll events happen
// to fire (iOS Safari batches them during momentum scroll, which is why
// the old code felt like the dot only updated AFTER a swipe finished).
const pagerSettleTimers = new WeakMap();
const pagersBeingWrapped = new WeakSet();
const supportsScrollend = "onscrollend" in window;
let liveTrackingPager = null;
let liveTrackingRaf = null;
let liveTrackingStopTimer = null;

function applyDotsForPager(pager) {
  if (!pager || !pager.isConnected) return;

  // Hero pager: same live-tracking treatment as the artist pagers — a RAF
  // loop polls scrollLeft and we update the active stage dot + bg tint
  // every frame, so the dot keeps up with the finger. The HEAVY work
  // (activeStageFilter mutation + rerendering artist sections) still
  // debounces in wireHeroPager so the rerender doesn't fire mid-flick.
  if (pager.classList.contains("hero-pager")) {
    const wH = pager.clientWidth || 1;
    const slH = Math.abs(pager.scrollLeft);
    const idxH = Math.floor((slH + wH * 0.3) / wH);
    const stage = HERO_STAGES[idxH]?.id;
    if (!stage) return;
    const dotsEl = document.getElementById("hero-dots");
    if (dotsEl) {
      dotsEl.querySelectorAll(".hero-dot").forEach(d => {
        d.classList.toggle("active", d.dataset.stage === stage);
      });
    }
    if (stageColor[stage]) bgScene.style.background = stageColor[stage];
    const sec = reel.querySelector('[data-section="hero"]');
    if (sec) sec.dataset.stage = stage;
    return;
  }

  const section = pager.closest('[data-section="artist"]');
  if (!section) return;
  const w = pager.clientWidth || 1;
  // Use a slightly biased index: switch to the next dot once the user has
  // crossed ~30% of the gap, instead of the strict 50% that scroll-snap uses
  // to settle. Feels noticeably more "live" while still reading correctly
  // when the gesture finishes mid-flight.
  const sl = Math.abs(pager.scrollLeft);
  const idx = Math.floor((sl + w * 0.3) / w);
  const child = pager.children[idx];
  if (!child) return;
  const realIdx = +child.dataset.realIdx || 0;
  section.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === realIdx));
  if (section.classList.contains("is-active")) {
    verticalProgress?.classList.toggle("is-hidden", realIdx > 0);
    // Update URL panel param when the user lands on a different panel.
    if (typeof syncUrlFromActive === "function") syncUrlFromActive();
  }
}

function startLiveTracking(pager) {
  liveTrackingPager = pager;
  if (liveTrackingRaf) return;
  const tick = () => {
    if (!liveTrackingPager) { liveTrackingRaf = null; return; }
    applyDotsForPager(liveTrackingPager);
    liveTrackingRaf = requestAnimationFrame(tick);
  };
  liveTrackingRaf = requestAnimationFrame(tick);
}

function pingLiveTracking() {
  // Keep the loop alive for ~220ms after the last scroll event. iOS bursts
  // events during momentum and pauses between bursts; this window stays open
  // through those pauses so the loop doesn't shut off mid-flick.
  clearTimeout(liveTrackingStopTimer);
  liveTrackingStopTimer = setTimeout(() => {
    liveTrackingPager = null;
    if (liveTrackingRaf) {
      cancelAnimationFrame(liveTrackingRaf);
      liveTrackingRaf = null;
    }
  }, 220);
}

reel.addEventListener("scroll", e => {
  // Match both artist .pager (carousel with clone bookends) and the hero
  // .hero-pager (finite stage list) so both use the same RAF live-tracker.
  const pager = e.target?.closest?.(".pager, .hero-pager");
  if (!pager) return;
  // Don't fire while we're snapping back from a clone — the synthetic scroll
  // would queue another settle, creating thrashing.
  if (pagersBeingWrapped.has(pager)) return;

  // Settle scheduling: scrollend if supported (zero-latency), else short
  // polling fallback that only fires if scroll actually stopped. The hero
  // pager has no clones, so handlePagerSettle is a no-op for it (safe).
  if (supportsScrollend) {
    if (!pager.dataset.scrollendBound) {
      pager.dataset.scrollendBound = "1";
      pager.addEventListener("scrollend", () => handlePagerSettle(pager));
    }
  } else {
    const existing = pagerSettleTimers.get(pager);
    if (existing) clearTimeout(existing);
    pagerSettleTimers.set(pager, setTimeout(() => handlePagerSettle(pager), 60));
  }

  // Live-track this pager's scroll position with a continuous RAF loop.
  startLiveTracking(pager);
  pingLiveTracking();
  // Apply once immediately for the case where the loop is just spinning up.
  applyDotsForPager(pager);
}, true);

// Settle handler: if the pager landed on a clone, instant-jump to the
// matching real panel. Identical content makes the jump invisible.
function handlePagerSettle(pager) {
  if (!pager || !pager.isConnected) return;
  if (pagersBeingWrapped.has(pager)) return;
  const w = pager.clientWidth || 1;
  const scrollIdx = Math.round(Math.abs(pager.scrollLeft) / w);
  const child = pager.children[scrollIdx];
  if (!child || !child.dataset.clone) return;
  const section = pager.closest('[data-section="artist"]');
  const realCount = +(section?.dataset.realCount) || (pager.children.length - 2);
  // Real panels live at scrollIdx 1..realCount (cloneStart is at 0, cloneEnd at realCount+1)
  const targetScrollIdx = child.dataset.clone === "start" ? realCount : 1;
  const target = pager.children[targetScrollIdx];
  if (!target) return;
  // Suppress the scroll listener during the synthetic jump so we don't
  // re-trigger the settle pipeline.
  pagersBeingWrapped.add(pager);
  pager.scrollTo({ left: target.offsetLeft, behavior: "auto" });
  // Two RAFs is normally enough for the synthetic scroll event to flush;
  // a 250ms hard fallback guarantees we always release the lock even if
  // the page is busy (e.g. tab backgrounded, heavy paint), so vertical
  // scrolling never gets permanently blocked by a stuck wrap-lock.
  requestAnimationFrame(() => requestAnimationFrame(() => pagersBeingWrapped.delete(pager)));
  setTimeout(() => pagersBeingWrapped.delete(pager), 250);
}

// Global delegated click for the horizontal dots strips — both the
// per-artist panel dots (.dots / .dot) AND the hero stage dots (.hero-dots
// / .hero-dot). Two-stage tap: the FIRST tap on the strip just "arms" it
// (the pill chrome appears, dots get visible) so the user can hit a
// specific dot accurately. Only taps while armed actually navigate. After
// 2 seconds of no further taps — or any tap outside the strip — it relaxes
// back to its tiny idle state.
const DOT_STRIP_SELECTOR = ".dots, .hero-dots, .vertical-progress";
const DOT_BTN_SELECTOR = ".dot, .hero-dot, .v-dot";
const DOT_ARMED_TTL = 2000;
const dotArmTimers = new WeakMap();

function armDots(strip) {
  if (!strip) return;
  strip.classList.add("is-armed");
  const old = dotArmTimers.get(strip);
  if (old) clearTimeout(old);
  dotArmTimers.set(strip, setTimeout(() => {
    strip.classList.remove("is-armed");
    clearDotMagnify(strip);
    // The vertical strip auto-hides on idle. Once the arm TTL expires,
    // hand control back to the idle countdown so it can fade out again.
    if (strip.classList.contains("vertical-progress") && typeof showVDots === "function") {
      showVDots();
    }
  }, DOT_ARMED_TTL));
}

function disarmAllDots(except) {
  document.querySelectorAll(".dots.is-armed, .hero-dots.is-armed").forEach(strip => {
    if (strip === except) return;
    strip.classList.remove("is-armed");
    clearDotMagnify(strip);
    const t = dotArmTimers.get(strip);
    if (t) { clearTimeout(t); dotArmTimers.delete(strip); }
  });
}

// ===== Smart dock-style magnification for the dots strip =====
// When the strip is armed, we track the pointer's X position over the
// strip and tag the closest dot with data-near="0", its immediate
// neighbours with data-near="1", and the next ring out with data-near="2".
// CSS turns those tags into graduated width/height bumps, so only the
// area under the finger enlarges — the rest of the dots stay compact.
// This keeps the strip from sprawling off-screen when there are many
// panels and lets the user place their tap precisely.

function clearDotMagnify(strip) {
  if (!strip) return;
  strip.querySelectorAll("[data-near]").forEach(d => { delete d.dataset.near; });
}

function updateDotMagnify(strip, clientX, clientY) {
  if (!strip || !strip.classList.contains("is-armed")) {
    clearDotMagnify(strip);
    return -1;
  }
  const dots = strip.querySelectorAll(DOT_BTN_SELECTOR);
  if (!dots.length) return -1;
  // Vertical-progress lays its dots out top-to-bottom, so we compare the
  // pointer's Y coordinate to each dot's centre on that axis. The two
  // horizontal strips use X.
  const isVertical = strip.classList.contains("vertical-progress");
  const target = isVertical ? clientY : clientX;
  let bestIdx = 0, bestDist = Infinity;
  for (let i = 0; i < dots.length; i++) {
    const r = dots[i].getBoundingClientRect();
    const c = isVertical ? (r.top + r.height / 2) : (r.left + r.width / 2);
    const dist = Math.abs(c - target);
    if (dist < bestDist) { bestDist = dist; bestIdx = i; }
  }
  dots.forEach((d, i) => {
    const dd = Math.abs(i - bestIdx);
    if (dd === 0) d.dataset.near = "0";
    else if (dd === 1) d.dataset.near = "1";
    else if (dd === 2) d.dataset.near = "2";
    else if (d.dataset.near != null) delete d.dataset.near;
  });
  return bestIdx;
}

// Route a tap on a specific dot (or "near enough" to one) to its target.
// Hero strip → scroll the hero-pager to that stage; artist strip → scroll
// the artist's pager to that panel; vertical strip → scroll the reel to
// the matching section.
function navigateDotTap(strip, dotEl) {
  if (!dotEl) return;
  if (strip.classList.contains("hero-dots")) {
    const stage = dotEl.dataset.stage;
    if (stage && typeof scrollHeroToStage === "function") scrollHeroToStage(stage, false);
    return;
  }
  if (strip.classList.contains("vertical-progress")) {
    const idx = +dotEl.dataset.vidx;
    const sections = reel.querySelectorAll(".section");
    sections[idx]?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  const section = strip.closest('[data-section="artist"]');
  const pager = section?.querySelector(".pager");
  const realIdx = +dotEl.dataset.panel;
  if (pager && pager.children[realIdx + 1]) {
    pager.children[realIdx + 1].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }
}

// Shared click handler: works for any strip (artist .dots, hero-dots, or
// .vertical-progress). The vertical strip lives outside the reel so we
// attach the same handler there separately.
function handleStripClick(e) {
  const strip = e.target.closest(DOT_STRIP_SELECTOR);
  if (!strip) return;
  const wasArmed = strip.classList.contains("is-armed");
  // First tap on a relaxed strip: arm it AND seed the magnification under
  // the tap so the user can immediately see which dot they're aiming at.
  // Don't navigate yet.
  if (!wasArmed) {
    armDots(strip);
    updateDotMagnify(strip, e.clientX, e.clientY);
    if (strip.classList.contains("vertical-progress") && typeof showVDots === "function") showVDots();
    return;
  }
  // Already armed: route a tap on a specific dot to its target; any tap
  // on the strip resets the 2s timer.
  armDots(strip);
  let dot = e.target.closest(DOT_BTN_SELECTOR);
  // Fallback: if the click landed on whitespace inside the strip but
  // there's a magnified dot under the pointer, treat that as the target.
  if (!dot) {
    const focusedIdx = updateDotMagnify(strip, e.clientX, e.clientY);
    if (focusedIdx >= 0) {
      dot = strip.querySelectorAll(DOT_BTN_SELECTOR)[focusedIdx];
    }
  }
  navigateDotTap(strip, dot);
}

reel.addEventListener("click", handleStripClick);
verticalProgress?.addEventListener("click", handleStripClick);

// Live magnification: as the pointer moves over an armed strip, bump the
// nearest dot. Use document-level delegation so we cover dots strips
// rendered later too.
document.addEventListener("pointermove", e => {
  const strip = e.target.closest?.(DOT_STRIP_SELECTOR);
  if (!strip) return;
  if (!strip.classList.contains("is-armed")) return;
  updateDotMagnify(strip, e.clientX, e.clientY);
}, { passive: true });

// Touchscreen: pointer events fire too, but iOS Safari sometimes drops
// pointermove during scroll-snap. Mirror with touchmove on the strips for
// a reliable update.
document.addEventListener("touchmove", e => {
  const strip = e.target.closest?.(DOT_STRIP_SELECTOR);
  if (!strip || !strip.classList.contains("is-armed")) return;
  const t = e.touches && e.touches[0];
  if (t) updateDotMagnify(strip, t.clientX, t.clientY);
}, { passive: true });

// Pointer leaves a strip (or lifts off): relax the magnification but
// leave the strip armed — the 2s TTL still runs.
document.addEventListener("pointerout", e => {
  const strip = e.target.closest?.(DOT_STRIP_SELECTOR);
  if (!strip) return;
  // Only clear when the pointer truly left the strip, not just moved to a
  // descendant (e.g. from padding into a dot button).
  if (e.relatedTarget && strip.contains(e.relatedTarget)) return;
  clearDotMagnify(strip);
}, { passive: true });

// Any tap (or touch) outside an armed dots strip is a strong "you don't
// need this thing big anymore" signal — collapse the strip immediately
// instead of waiting out the 2s TTL.
function maybeDisarmFromOutside(e) {
  const strip = e.target.closest?.(DOT_STRIP_SELECTOR);
  disarmAllDots(strip || null);
}
document.addEventListener("pointerdown", maybeDisarmFromOutside, { passive: true, capture: true });
document.addEventListener("touchstart", maybeDisarmFromOutside, { passive: true, capture: true });

// Heart (favorite) button — delegated click. Toggles localStorage,
// flips the icon between outline/filled, and refreshes the top-bar
// counter so it shows up the moment the first artist is favorited.
reel.addEventListener("click", e => {
  const btn = e.target.closest(".artist-favorite");
  if (!btn) return;
  e.stopPropagation();
  const id = btn.dataset.favId;
  if (!id) return;
  const nowFav = toggleFavorite(id);
  btn.classList.toggle("is-favorite", nowFav);
  btn.setAttribute("aria-pressed", nowFav ? "true" : "false");
  const label = t(nowFav ? "favorite.remove" : "favorite.add");
  btn.setAttribute("aria-label", label);
  btn.setAttribute("title", label);
  const oldIcon = btn.querySelector(".fav-icon");
  if (oldIcon) oldIcon.outerHTML = nowFav ? HEART_ICON_FILLED : HEART_ICON_OUTLINE;
  // Replay the pop animation each toggle so the click feels tactile.
  btn.classList.remove("is-popping");
  void btn.offsetWidth;
  btn.classList.add("is-popping");
  refreshFavoritesCounter();
});

// ===== Vertical progress bar =====

function buildVerticalProgress() {
  // Build dots in lockstep with whatever buildReel emitted
  const sections = reel.querySelectorAll(".section");
  const items = Array.from(sections).map((s, i) => {
    let label;
    if (s.dataset.section === "hero") {
      label = "ראשי";
    } else {
      const id = s.dataset.artistId;
      const artist = id ? ARTISTS.find(a => a.id === id) : null;
      label = artist?.name || id || "";
    }
    return `<button class="v-dot ${i === 0 ? "active" : ""}" data-vidx="${i}" aria-label="${escapeHtml(label)}"></button>`;
  });
  verticalProgress.innerHTML = items.join("");
}

// Vertical-progress click goes through the shared handleStripClick handler
// below — same two-stage tap + dock-style magnify behaviour as the
// per-artist and hero strips. The handler is wired further down once it's
// defined.

// Desktop-only floating tooltip for the vertical dots. Lives outside
// .vertical-progress so the container's overflow can't clip it.
(function setupVDotTooltip() {
  const tooltipEl = document.getElementById("v-dot-tooltip");
  if (!tooltipEl) return;
  // Skip on touch / coarse-pointer devices entirely.
  if (!window.matchMedia || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  function show(dot) {
    const label = dot.getAttribute("aria-label") || "";
    if (!label) return;
    const rect = dot.getBoundingClientRect();
    tooltipEl.textContent = label;
    tooltipEl.style.left = (rect.right + 14) + "px";
    tooltipEl.style.top = (rect.top + rect.height / 2) + "px";
    tooltipEl.classList.add("is-visible");
    tooltipEl.setAttribute("aria-hidden", "false");
  }
  function hide() {
    tooltipEl.classList.remove("is-visible");
    tooltipEl.setAttribute("aria-hidden", "true");
  }

  verticalProgress.addEventListener("mouseover", e => {
    const dot = e.target.closest(".v-dot");
    if (dot) show(dot);
  });
  verticalProgress.addEventListener("mouseout", e => {
    const dot = e.target.closest(".v-dot");
    if (!dot) return;
    // Hide unless cursor moved to another dot
    const related = e.relatedTarget?.closest?.(".v-dot");
    if (!related) hide();
  });
  verticalProgress.addEventListener("focusin", e => {
    const dot = e.target.closest(".v-dot");
    if (dot) show(dot);
  });
  verticalProgress.addEventListener("focusout", hide);
})();

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
  // panel of an artist. With the carousel pattern, scroll-position index 1
  // is the real Hero (index 0 is cloneStart), so we have to read data-real-idx
  // off the visible panel — otherwise just-arrived sections look like
  // panelIdx=1 which would always be flagged "non-hero".
  const isHero = section.dataset.section === "hero";
  document.body.classList.toggle("is-on-hero", isHero);
  const pager = section.querySelector(".pager");
  // Compute realIdx after any anchoring scrollTo below — defer to a single
  // pass at the end of setActiveSection.

  // Reset every other artist section's pager back to its real first panel
  // (scrollIdx=1 with the carousel layout, since scrollIdx=0 is cloneStart =
  // discography clone). That way, vertical navigation always lands the user
  // on the next/previous artist's main hero card, never mid-panel and never
  // on a clone that looks like discography.
  reel.querySelectorAll('[data-section="artist"]').forEach(s => {
    if (s === section) return;
    const p = s.querySelector(".pager");
    if (!p) return;
    const realFirst = p.children[1];
    if (realFirst && Math.abs(p.scrollLeft - realFirst.offsetLeft) > 4) {
      p.scrollTo({ left: realFirst.offsetLeft, behavior: "auto" });
    }
    // Make sure the init flag is set so the heroInitObserver doesn't override.
    s.dataset.scrollInit = "1";
  });
  // Also: when the new active section is itself an artist, ensure it sits on
  // the real hero (not a clone) — covers the "scrolled into existing
  // mid-panel position" edge case.
  if (section.dataset.section === "artist" && pager) {
    const realFirst = pager.children[1];
    const sl = Math.abs(pager.scrollLeft);
    const w = pager.clientWidth || 1;
    const onClone = sl < w * 0.5 || sl > (pager.children.length - 1.5) * w;
    if (realFirst && onClone) {
      pager.scrollTo({ left: realFirst.offsetLeft, behavior: "auto" });
    }
    // Force-refresh the panel dots highlight here. Without this, an artist
    // that's just become active can briefly show no active dot (or the wrong
    // one) until the user does a tiny horizontal swipe — which is exactly
    // the bug the user reported.
    const newScrollIdx = Math.round(Math.abs(pager.scrollLeft) / (pager.clientWidth || 1));
    const newChild = pager.children[newScrollIdx];
    const realIdx = newChild ? (+newChild.dataset.realIdx || 0) : 0;
    section.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === realIdx));
  }

  // Vertical-progress visibility: read the realIdx of the panel currently
  // under the pager (after any anchoring scrollTo above). This must use
  // realIdx — not the raw scrollIdx — because the carousel layout puts the
  // real Hero at scrollIdx=1, and the user expects dots while ON the Hero.
  let activeRealIdx = 0;
  if (pager) {
    const w = pager.clientWidth || 1;
    const scrollIdx = Math.round(Math.abs(pager.scrollLeft) / w);
    const child = pager.children[scrollIdx];
    activeRealIdx = child ? (+child.dataset.realIdx || 0) : 0;
  }
  verticalProgress.classList.toggle("is-hidden", isHero || activeRealIdx > 0);

  // HUD + retint background by stage
  const stage = section.dataset.stage;
  if (stage && stageColor[stage]) {
    bgScene.style.background = stageColor[stage];
  }

  // Hero peek hint: schedule when the active section is a hero, cancel
  // otherwise so we don't peek behind the user's back on artist sections.
  if (section.dataset.section === "hero") {
    schedulePeek();
  } else {
    cancelPeek();
  }

  // Keep the URL in sync so the current view is always shareable.
  if (typeof syncUrlFromActive === "function") syncUrlFromActive();
}

// ===== Hero peek hint =====
// After a few seconds idle on the multi-hero, nudge the hero panels sideways
// so the user discovers the horizontal swipe gesture. Driven by a CSS
// transition on transform — does not actually scroll the pager, so
// scroll-snap can't fight us back. Transitions (not @keyframes) so any
// interrupt smoothly slides back to 0 instead of snapping.
let heroPeekTimer = null;
let heroPeekHoldTimer = null;
let heroPeekReleaseTimer = null;
let isPeeking = false;
const PEEK_IDLE_MS = 3500;   // first nudge fairly soon
const PEEK_NEXT_MS = 8000;   // subsequent nudges further apart
const PEEK_HOLD_MS = 550;    // how long to hold at the peeked position
const PEEK_TRANSITION_MS = 720; // matches CSS transition duration

function schedulePeek(delay = PEEK_IDLE_MS) {
  if (isPeeking) return;
  clearTimeout(heroPeekTimer);
  heroPeekTimer = setTimeout(performPeek, delay);
}

function cancelPeek() {
  clearTimeout(heroPeekTimer);
  clearTimeout(heroPeekHoldTimer);
  clearTimeout(heroPeekReleaseTimer);
  heroPeekTimer = null;
  heroPeekHoldTimer = null;
  heroPeekReleaseTimer = null;
  if (isPeeking) {
    const heroPager = document.getElementById("hero-pager");
    heroPager?.classList.remove("peek-forward", "peek-backward", "is-peeking");
    isPeeking = false;
  }
}

function performPeek() {
  const current = getCurrentSection();
  if (!current || current.dataset.section !== "hero") return;
  const heroPager = document.getElementById("hero-pager");
  if (!heroPager) return;
  const w = heroPager.clientWidth;
  if (!w) return;
  const cur = Math.round(heroPager.scrollLeft / w);
  const total = heroPager.children.length;
  if (total < 2) return;

  // Forward unless we're at the last stage, then peek backward.
  const dir = cur < total - 1 ? 1 : -1;
  const cls = dir > 0 ? "peek-forward" : "peek-backward";

  isPeeking = true;
  // Add is-peeking first so will-change kicks in BEFORE the transform —
  // the browser hoists the deck onto its own GPU layer ahead of the
  // first frame, which is what made the previous version stutter.
  heroPager.classList.add("is-peeking");
  requestAnimationFrame(() => heroPager.classList.add(cls));
  heroPeekHoldTimer = setTimeout(() => {
    heroPager.classList.remove(cls);
    heroPeekReleaseTimer = setTimeout(() => {
      heroPager.classList.remove("is-peeking");
      isPeeking = false;
      if (getCurrentSection()?.dataset.section === "hero") {
        schedulePeek(PEEK_NEXT_MS);
      }
    }, PEEK_TRANSITION_MS);
  }, PEEK_TRANSITION_MS + PEEK_HOLD_MS);
}

// Any user activity reschedules the peek (or cancels one mid-flight).
const peekActivityHandler = () => {
  cancelPeek();
  const current = getCurrentSection();
  if (current?.dataset.section === "hero") schedulePeek();
};
["pointerdown", "touchstart", "wheel", "keydown"].forEach(ev => {
  document.addEventListener(ev, peekActivityHandler, { passive: true });
});

let currentObserver = null;

function observeSections() {
  if (currentObserver) currentObserver.disconnect();
  const sections = Array.from(reel.querySelectorAll(".section"));
  currentObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
        setActiveSection(entry.target);
      } else if (entry.intersectionRatio < 0.25 && entry.target.dataset.section === "artist") {
        // Section is mostly off-screen — reset its pager to the real Hero
        // (children[1]) so when the user comes back to it later they always
        // land on the artist's main card, never mid-panel.
        const pager = entry.target.querySelector(".pager");
        const realFirst = pager?.children[1];
        if (realFirst && Math.abs(pager.scrollLeft - realFirst.offsetLeft) > 4) {
          pager.scrollTo({ left: realFirst.offsetLeft, behavior: "auto" });
        }
      }
    });
  }, { root: reel, threshold: [0, 0.25, 0.6] });
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
  let nextIdx = idx + dir;
  // Hero is the first section and is also "the top" — never wrap upwards
  // from it. The user explicitly doesn't want pulling up from the hero to
  // teleport them to the last artist (felt confusing). The downward wrap
  // (last section → hero) is preserved.
  if (nextIdx < 0) {
    if (cur?.dataset.section === "hero") return;
    nextIdx = sections.length - 1;
  }
  if (nextIdx >= sections.length) nextIdx = 0;
  const next = sections[nextIdx];
  if (next && typeof next.scrollIntoView === "function") {
    // Tell any listening snap-clamps that this big jump is intentional.
    markWrapInProgress(reel, 800);
    next.scrollIntoView({ behavior: "smooth" });
  }
}

// ===== Telegram-style pull-to-navigate =====
// When a panel has long content (overflow scroll) and the user reaches the
// top or bottom, native scroll-chain to the reel is unreliable — iOS Safari
// in particular swallows the over-pull as its rubber-band bounce and the
// reel never advances. So we detect the edge-pull explicitly, paint a
// rubber-band offset on the panel content, and commit to a vertical section
// navigation if the user pulls past a threshold.
//
// iOS specifics that matter here:
//   * Once iOS commits a touch sequence to native scrolling on an
//     overflow:auto element, preventDefault on touchmove is ignored. The
//     fix is to call preventDefault on the FIRST move of any touch
//     sequence that starts at an edge — before iOS makes its decision.
//   * On panels that don't overflow we still want this gesture to work
//     (short bios should still let the user pull to the next artist), so
//     "at the top edge" and "at the bottom edge" are both true and any
//     vertical drag flips into a pull.
function setupPanelPullToNavigate(panel) {
  if (!panel || panel.__pullSetup) return;
  panel.__pullSetup = true;

  const PULL_THRESHOLD = 80;       // px past the rubber-band needed to commit
  const RUBBER_DAMP = 220;         // higher = stiffer rubber-band

  let startY = null;
  let startedAtTop = false;
  let startedAtBottom = false;
  let direction = null;            // 'top' | 'bottom' | null
  let lastDelta = 0;
  let intercepting = false;
  let indicator = null;
  let indicatorText = null;

  const inner = panel.querySelector(".panel-inner") || panel;

  function rubber(delta) {
    const sign = Math.sign(delta);
    const x = Math.abs(delta);
    return sign * (1 - 1 / (1 + x / RUBBER_DAMP)) * RUBBER_DAMP;
  }

  function ensureIndicator() {
    if (indicator) return indicator;
    indicator = document.createElement("div");
    indicator.className = "pull-indicator";
    const arrow = document.createElement("span");
    arrow.className = "pull-arrow";
    arrow.setAttribute("aria-hidden", "true");
    indicatorText = document.createElement("span");
    indicatorText.className = "pull-text";
    indicator.appendChild(arrow);
    indicator.appendChild(indicatorText);
    panel.appendChild(indicator);
    return indicator;
  }

  function setText(dir, ready) {
    if (!indicatorText) return;
    if (dir === "bottom") {
      indicatorText.textContent = ready ? t("pull.releaseNext") : t("pull.next");
    } else {
      indicatorText.textContent = ready ? t("pull.releasePrev") : t("pull.prev");
    }
  }

  function reset(animate) {
    inner.style.transition = animate ? "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)" : "none";
    inner.style.transform = "";
    if (indicator) {
      indicator.style.opacity = "";
      indicator.classList.remove("is-visible", "is-ready", "pull-from-top", "pull-from-bottom");
    }
    panel.classList.remove("is-pulling");
    if (animate) {
      // Clear the inline transition once it finishes, so it doesn't fight
      // future native scrolls.
      setTimeout(() => { inner.style.transition = ""; }, 360);
    }
  }

  function apply(delta, dir) {
    const r = rubber(delta);
    inner.style.transition = "none";
    inner.style.transform = `translate3d(0, ${r}px, 0)`;
    const ind = ensureIndicator();
    const progress = Math.min(1, Math.abs(delta) / PULL_THRESHOLD);
    ind.classList.add("is-visible");
    ind.classList.toggle("pull-from-top", dir === "top");
    ind.classList.toggle("pull-from-bottom", dir === "bottom");
    const ready = Math.abs(delta) >= PULL_THRESHOLD;
    ind.classList.toggle("is-ready", ready);
    ind.style.opacity = String(progress);
    setText(dir, ready);
  }

  panel.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    startY = e.touches[0].clientY;
    const max = Math.max(0, panel.scrollHeight - panel.clientHeight);
    // Snapshot the panel's scroll position relative to its edges right now;
    // we use these flags throughout the gesture to decide whether to take
    // over native scroll or let the panel scroll itself.
    startedAtTop    = panel.scrollTop <= 0;
    startedAtBottom = panel.scrollTop >= max - 1;
    direction = null;
    lastDelta = 0;
    intercepting = false;
  }, { passive: true });

  panel.addEventListener("touchmove", (e) => {
    if (startY == null || e.touches.length !== 1) return;
    const dy = e.touches[0].clientY - startY;

    // First move that's clearly vertical: lock in a direction if we're
    // pulling past an edge we started on. This MUST happen before iOS
    // commits the touch sequence to native scrolling (which it does on
    // its own first touchmove for overflow:auto elements). Anything more
    // than 1 pixel of vertical motion qualifies — waiting for a larger
    // threshold gives iOS time to lock and ignore preventDefault later.
    if (!direction) {
      const isPullTop    = startedAtTop    && dy > 0;
      const isPullBottom = startedAtBottom && dy < 0;
      if (!isPullTop && !isPullBottom) {
        // Not a pull (started mid-panel, or pulling toward the panel's
        // own scrollable interior) — let native scroll handle it.
        return;
      }
      direction = isPullTop ? "top" : "bottom";
      intercepting = true;
      panel.classList.add("is-pulling");
    }

    // User reversed past zero — abort and let native scroll resume.
    if ((direction === "top" && dy <= 0) || (direction === "bottom" && dy >= 0)) {
      reset(true);
      direction = null;
      intercepting = false;
      lastDelta = 0;
      return;
    }

    // Stop iOS from running its own bounce on top of our rubber-band.
    if (e.cancelable) e.preventDefault();
    lastDelta = dy;
    apply(dy, direction);
  }, { passive: false });

  function endTouch() {
    if (intercepting && Math.abs(lastDelta) >= PULL_THRESHOLD) {
      const dir = direction === "bottom" ? 1 : -1;
      reset(true);
      navVertical(dir);
    } else {
      reset(true);
    }
    startY = null;
    direction = null;
    intercepting = false;
    lastDelta = 0;
    startedAtTop = false;
    startedAtBottom = false;
  }

  panel.addEventListener("touchend", endTouch, { passive: true });
  panel.addEventListener("touchcancel", endTouch, { passive: true });
}

// Touch-driven vertical loop: detect a swipe-up that ends with the reel
// pinned at the bottom (or a swipe-down pinned at the top) and animate to
// the wrap target. iOS won't let you swipe past the snap edge natively, so
// we have to read the gesture and synthesize the wrap.
let _verticalTouchY = null;
reel.addEventListener("touchstart", e => {
  _verticalTouchY = e.touches[0]?.clientY ?? null;
}, { passive: true });
reel.addEventListener("touchend", e => {
  if (_verticalTouchY == null) return;
  const endY = e.changedTouches[0]?.clientY ?? _verticalTouchY;
  const swipeUp = _verticalTouchY - endY;       // > 0 = finger moved up = trying to scroll DOWN
  _verticalTouchY = null;
  const atBottom = reel.scrollTop + reel.clientHeight >= reel.scrollHeight - 8;
  if (atBottom && swipeUp > 70) {
    // At the last section, swiping up further → loop back to the hero.
    // Mark the wrap so the snap-clamp won't read the big delta as a
    // "user jumped multiple sections" event and pull us to the previous
    // section instead.
    const first = reel.querySelector(".section");
    if (first) {
      markWrapInProgress(reel, 800);
      first.scrollIntoView({ behavior: "smooth" });
    }
  }
  // No upward wrap from the hero — hero is the top, period. Pulling down
  // there now just stays put (the snap-clamp keeps the user on the hero).
}, { passive: true });

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
  // Artist section: route to the inner pager (panels). With cloneStart at
  // scrollIdx 0 and cloneEnd at the last index, we can simply step ±1; the
  // settle handler will wrap us back to the matching real panel after the
  // smooth scroll lands on a clone.
  const pager = current.querySelector(".pager");
  if (!pager || !pager.children.length) return;
  const w = pager.clientWidth || 1;
  const cur = Math.round(Math.abs(pager.scrollLeft) / w);
  const next = cur + dir;
  if (next < 0 || next >= pager.children.length) return;
  const target = pager.children[next];
  if (target && typeof target.scrollIntoView === "function") {
    target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }
}

// One-shot observer that sets each artist pager's initial scrollLeft to the
// real first panel (scrollIdx 1) before the user can see it. Without this,
// a freshly-rendered section opens on cloneStart (scrollIdx 0) which shows
// the discography as if it were the artist's hero.
const heroInitObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.scrollInit === "1") return;
    const pager = entry.target.querySelector(".pager");
    if (pager && pager.children[1]) {
      const realFirst = pager.children[1];
      pager.scrollLeft = realFirst.offsetLeft;
      entry.target.dataset.scrollInit = "1";
    }
  });
}, { root: reel, threshold: 0, rootMargin: "300px" });

function observeArtistInitialScroll() {
  reel.querySelectorAll('[data-section="artist"]').forEach(s => {
    if (s.dataset.scrollInit !== "1") heroInitObserver.observe(s);
  });
}

// YouTube thumbnail lazy-upgrade. With ~89 artists × multiple tracks each,
// dropping <img src=…/mqdefault.jpg> for every track at first paint queues
// hundreds of cross-origin requests to i.ytimg.com that the browser throttles
// — manifesting as "previews never load". We instead start with empty
// <img data-yt-thumb> placeholders and only assign src when the section is
// within ~1.5 viewports of the user, which keeps the visible row hot and
// caps in-flight thumbnail fetches to a manageable handful.
const ytThumbObserver = (typeof IntersectionObserver !== "undefined")
  ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        upgradeYTThumbs(entry.target);
        ytThumbObserver.unobserve(entry.target);
      }
    }, { root: reel, threshold: 0, rootMargin: "150% 0px" })
  : null;

function upgradeYTThumbs(section) {
  if (!section || section.dataset.ytThumbsUpgraded === "1") return;
  section.dataset.ytThumbsUpgraded = "1";
  section.querySelectorAll("img[data-yt-thumb]").forEach((img) => {
    const vid = img.getAttribute("data-yt-thumb");
    if (!vid) return;
    img.removeAttribute("data-yt-thumb");
    img.src = `https://i.ytimg.com/vi/${vid}/mqdefault.jpg`;
  });
}

function observeYTThumbs() {
  if (!ytThumbObserver) {
    // Old browsers — just upgrade everything synchronously and trust the
    // browser's native loading="lazy" to throttle.
    reel.querySelectorAll('[data-section="artist"]').forEach(upgradeYTThumbs);
    return;
  }
  reel.querySelectorAll('[data-section="artist"]').forEach((s) => {
    if (s.dataset.ytThumbsUpgraded !== "1") ytThumbObserver.observe(s);
  });
}

document.addEventListener("keydown", e => {
  // ArrowDown / ArrowUp -> next/prev artist
  if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); navVertical(1); }
  else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); navVertical(-1); }
  // LTR layout: ArrowRight = next, ArrowLeft = prev
  else if (e.key === "ArrowRight") { e.preventDefault(); navHorizontal(1); }
  else if (e.key === "ArrowLeft") { e.preventDefault(); navHorizontal(-1); }
});

// ===== Reel-level wheel router =====
// Single source of truth for vertical wheel/trackpad input on the reel.
// Trackpads fire dozens of events per gesture with momentum; we accumulate
// deltaY until it crosses a small threshold, then move exactly one section
// and lock for 500ms so a single fling can't blow past two snap points.
//
// Horizontal wheel input is handled CLOSER to the source:
//   - Hero pager → native scroll-snap (the pager's own scroll listener
//     updates activeStageFilter on settle). Trying to also navigate here
//     would page twice and feels chaotic.
//   - Artist pager → installWheelClamp(pager, "x") on the per-artist
//     pager itself; that listener stops propagation, so this handler
//     doesn't see the horizontal input at all.
let wheelLockUntil = 0;
let wheelAccumY = 0;
let wheelResetTimer = null;

reel.addEventListener("wheel", e => {
  // Ignore mostly-horizontal wheels — those are handled per-pager (above).
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
  const now = Date.now();
  if (now < wheelLockUntil) { e.preventDefault(); return; }
  e.preventDefault();
  wheelAccumY += e.deltaY;
  if (Math.abs(wheelAccumY) > 60) {
    navVertical(wheelAccumY > 0 ? 1 : -1);
    wheelAccumY = 0;
    wheelLockUntil = now + 500;
  }
  clearTimeout(wheelResetTimer);
  wheelResetTimer = setTimeout(() => { wheelAccumY = 0; }, 200);
}, { passive: false });

// ===== Stage dropdown: filter the reel to a single stage =====

function stageLabel(id) {
  if (id === "all") return t("nav.all");
  return tStage(id);
}

function buildStageDropdown() {
  if (!stageSelectMenu) return;
  const opts = [
    { id: "all", name: t("nav.all"), count: ARTISTS.length },
    ...FESTIVAL.stages.map(s => ({ id: s.id, name: tStage(s.id), count: ARTISTS.filter(a => a.stage === s.id).length }))
  ];
  const stageItems = opts.map(o =>
    `<li><button data-stage="${escapeHtml(o.id)}" class="${activeStageFilter === o.id ? "active" : ""}" role="option">${escapeHtml(o.name)}<span class="count">${o.count}</span></button></li>`
  ).join("");
  // Language picker — last row, three columns. Per festival principle (no
  // national flags), each cell shows the 2-letter code (IL / EN / PT) only.
  // The full language name lives on aria-label for screen readers.
  const langRow = `
    <li class="lang-row" aria-label="${escapeHtml(t("nav.language"))}">
      ${["en", "he", "pt"].map(lang => `
        <button class="lang-cell ${currentLang === lang ? "active" : ""}" data-set-lang="${lang}" type="button" aria-label="${escapeHtml(LANG_LABELS[lang])}">
          <span class="lang-cell-code">${LANG_CODES[lang]}</span>
        </button>
      `).join("")}
    </li>
  `;
  stageSelectMenu.innerHTML = stageItems + langRow;
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
  // Language cell? Switch language and re-render the world.
  if (btn.dataset.setLang) {
    const lang = btn.dataset.setLang;
    closeStageDropdown();
    if (lang === currentLang) return;
    applyLang(lang);
    return;
  }
  const stage = btn.dataset.stage;
  if (!stage) return;
  closeStageDropdown();
  if (stage === activeStageFilter) {
    try { reel.scrollTo({ top: 0, behavior: "smooth" }); } catch (_) {}
    return;
  }
  activeStageFilter = stage;
  buildStageDropdown();
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

// On orientation change / viewport resize, re-anchor every scroller to its
// current logical position. Without this, after a rotation a horizontal pager
// can land halfway between snap points (or on a clone), and the vertical
// reel can show the seam between two sections.
function snapshotScrollPositions() {
  const snap = {
    sectionEl: getCurrentSection(),
    pagers: []
  };
  reel.querySelectorAll(".pager, #hero-pager").forEach(pager => {
    const w = pager.clientWidth || 1;
    const idx = Math.round(Math.abs(pager.scrollLeft) / w);
    snap.pagers.push({ pager, idx });
  });
  return snap;
}

function restoreScrollPositions(snap) {
  if (!snap) return;
  // Restore each pager to the panel that was visible before rotation.
  snap.pagers.forEach(({ pager, idx }) => {
    if (!pager.isConnected) return;
    const child = pager.children[idx];
    if (child) pager.scrollTo({ left: child.offsetLeft, behavior: "auto" });
  });
  // Realign the vertical reel to the section that was active.
  if (snap.sectionEl && snap.sectionEl.isConnected) {
    snap.sectionEl.scrollIntoView({ behavior: "auto", block: "start" });
  }
}

let resyncTimer = null;
function scheduleScrollResync() {
  const snap = snapshotScrollPositions();
  // Two RAFs after the resize gives the browser time to apply the new
  // viewport dimensions to every scroller before we restore.
  clearTimeout(resyncTimer);
  resyncTimer = setTimeout(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => restoreScrollPositions(snap)));
  }, 60);
}

window.addEventListener("orientationchange", scheduleScrollResync);
window.addEventListener("resize", scheduleScrollResync);

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

  // Step 1: snap the artist's pager back to the REAL Hero panel.
  // With the carousel layout, pager.children[0] is cloneStart (a clone of
  // discography), not the Hero — so scrolling there would visually take the
  // user further into the discography zone, the opposite of what they expect.
  // The real Hero (with the artist photo) lives at children[1].
  if (current?.dataset.section === "artist") {
    const pager = current.querySelector(".pager");
    const realHero = pager?.children[1];
    if (pager && realHero && Math.abs(pager.scrollLeft - realHero.offsetLeft) > 10) {
      const wait1 = waitScrollEnd(pager);
      realHero.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
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
    // children[1] = real Hero panel (children[0] is cloneStart of discography)
    pager?.children[1]?.scrollIntoView({ behavior: "auto", inline: "start", block: "nearest" });
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
    searchResults.innerHTML = `<div class="search-empty">${escapeHtml(t("search.empty"))}</div>`;
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

// ===== Favorites overlay =====
// Top-bar heart counter — only visible when at least one artist has been
// favorited. Tapping it opens an overlay listing every favorited artist
// with their set time (or just their name when no schedule is set).
const favoritesBtn      = document.getElementById("favorites-btn");
const favoritesCountEl  = document.getElementById("favorites-count");
const favoritesOverlay  = document.getElementById("favorites-overlay");
const favoritesListEl   = document.getElementById("favorites-list");
const favoritesTitleEl  = document.getElementById("favorites-title");
const favoritesCloseBtn = document.getElementById("favorites-close");

function refreshFavoritesCounter() {
  if (!favoritesBtn) return;
  const count = getFavorites().size;
  if (favoritesCountEl) favoritesCountEl.textContent = count;
  favoritesBtn.hidden = count === 0;
  const label = t("favorites.open");
  favoritesBtn.title = label;
  favoritesBtn.setAttribute("aria-label", label);
  if (favoritesTitleEl) favoritesTitleEl.textContent = t("favorites.title");
  if (favoritesCloseBtn) favoritesCloseBtn.setAttribute("aria-label", t("favorites.close"));
  refreshFavoritesNotifyCopy();
}

// "Get notifications" CTA at the bottom of the favorites panel. Clicking
// requests browser-level Notification permission and remembers the
// granted state in localStorage. The actual scheduling of "your artist
// is on" pings will hook into the festival schedule once it lands; the
// permission grant unblocks all future delivery.
const favoritesNotifyEl     = document.getElementById("favorites-notify");
const favoritesNotifyBtnEl  = document.getElementById("favorites-notify-btn");
const favoritesNotifyDescEl = document.getElementById("favorites-notify-desc");
const favoritesNotifyLabelEl = document.getElementById("favorites-notify-label");

function notifySupported() {
  return typeof window !== "undefined" && "Notification" in window;
}

function refreshFavoritesNotifyCopy() {
  if (!favoritesNotifyEl) return;
  if (favoritesNotifyDescEl) favoritesNotifyDescEl.textContent = t("favorites.notifyDesc");
  if (!favoritesNotifyLabelEl || !favoritesNotifyBtnEl) return;
  if (!notifySupported()) {
    favoritesNotifyLabelEl.textContent = t("favorites.notifyUnsupported");
    favoritesNotifyBtnEl.disabled = true;
    favoritesNotifyBtnEl.classList.add("is-disabled");
    return;
  }
  const perm = Notification.permission;
  favoritesNotifyBtnEl.disabled = perm === "denied" || perm === "granted";
  favoritesNotifyBtnEl.classList.toggle("is-on",      perm === "granted");
  favoritesNotifyBtnEl.classList.toggle("is-disabled", perm === "denied");
  if (perm === "granted")      favoritesNotifyLabelEl.textContent = t("favorites.notifyOn");
  else if (perm === "denied")  favoritesNotifyLabelEl.textContent = t("favorites.notifyDenied");
  else                         favoritesNotifyLabelEl.textContent = t("favorites.notifyCta");
}

favoritesNotifyBtnEl?.addEventListener("click", async () => {
  if (!notifySupported()) return;
  if (Notification.permission !== "default") { refreshFavoritesNotifyCopy(); return; }
  try {
    const result = await Notification.requestPermission();
    try { localStorage.setItem("zna-notify", result); } catch (_) {}
  } catch (_) { /* user closed the prompt; nothing to do */ }
  refreshFavoritesNotifyCopy();
});

function renderFavoritesList() {
  if (!favoritesListEl) return;
  const favs = getFavorites();
  const items = ARTISTS.filter(a => favs.has(a.id));
  if (!items.length) {
    favoritesListEl.innerHTML = `<div class="favorites-empty">${escapeHtml(t("favorites.empty"))}</div>`;
    return;
  }
  // Sort by set time when available, otherwise name. Artists without a
  // scheduled time fall to the bottom in name order.
  items.sort((a, b) => {
    const sa = completeSchedule(a);
    const sb = completeSchedule(b);
    if (sa && sb) return sa.start - sb.start;
    if (sa && !sb) return -1;
    if (!sa && sb) return 1;
    return a.name.localeCompare(b.name);
  });
  favoritesListEl.innerHTML = items.map(a => {
    const sched = completeSchedule(a);
    const dateLine = sched ? `<span class="favorites-row-date">${escapeHtml(formatScheduleRange(sched))}</span>` : "";
    return `
      <button class="favorites-row" type="button" data-artist-id="${escapeHtml(a.id)}">
        <span class="favorites-row-name">${escapeHtml(a.name)}</span>
        ${dateLine}
      </button>
    `;
  }).join("");
}

function openFavorites() {
  if (!favoritesOverlay) return;
  if (favoritesTitleEl) favoritesTitleEl.textContent = t("favorites.title");
  renderFavoritesList();
  favoritesOverlay.hidden = false;
}

function closeFavorites() {
  if (!favoritesOverlay) return;
  favoritesOverlay.hidden = true;
}

favoritesBtn?.addEventListener("click", openFavorites);
favoritesCloseBtn?.addEventListener("click", closeFavorites);
favoritesOverlay?.addEventListener("click", e => {
  if (e.target === favoritesOverlay) closeFavorites();
});
favoritesListEl?.addEventListener("click", e => {
  const row = e.target.closest(".favorites-row");
  if (!row) return;
  const id = row.dataset.artistId;
  closeFavorites();
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

// Initial counter sync — runs after DOM ready since it lives below the
// data-loading section.
refreshFavoritesCounter();

// ===== Hero quick-actions: navigate to event + festival map =====
// Both buttons live on the main festival hero only. Navigate opens a
// bottom-sheet chooser with Waze + Google Maps deep links pointing at
// the festival's stated location (FESTIVAL.location). Festival map is
// a lightweight image lightbox — uses an inline SVG placeholder until
// the official site map ships, swap MAP_IMAGE_SRC to drop in the real
// asset later. */
const FESTIVAL_QUERY = encodeURIComponent("Lake Montargil, Portugal");
const NAV_LINKS = {
  waze:  `https://waze.com/ul?q=${FESTIVAL_QUERY}&navigate=yes`,
  gmaps: `https://www.google.com/maps/search/?api=1&query=${FESTIVAL_QUERY}`
};
// Inline SVG placeholder: dashed pin on a stylised map grid. Until the
// official festival map exists, this gives the lightbox something
// recognisable. Drop in a real URL/path here to replace.
const MAP_IMAGE_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' role='img' aria-label='Festival map placeholder'>
      <defs>
        <linearGradient id='bg' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0' stop-color='#1a0a3a'/>
          <stop offset='1' stop-color='#0a0524'/>
        </linearGradient>
        <pattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'>
          <path d='M60 0H0V60' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1'/>
        </pattern>
      </defs>
      <rect width='1200' height='800' fill='url(#bg)'/>
      <rect width='1200' height='800' fill='url(#grid)'/>
      <path d='M0 520 Q300 470 600 510 T1200 480' stroke='rgba(0,212,255,0.45)' stroke-width='3' fill='none'/>
      <path d='M0 360 Q280 320 580 340 T1200 320' stroke='rgba(254,180,71,0.45)' stroke-width='3' fill='none'/>
      <circle cx='600' cy='400' r='10' fill='#FEB447'/>
      <circle cx='600' cy='400' r='28' fill='none' stroke='#FEB447' stroke-width='2' stroke-dasharray='4 4' opacity='0.7'/>
      <text x='600' y='460' fill='#f5f0ff' font-family='Heebo, sans-serif' font-size='28' font-weight='800' text-anchor='middle' letter-spacing='2'>ZNA 2026</text>
      <text x='600' y='495' fill='rgba(245,240,255,0.6)' font-family='Heebo, sans-serif' font-size='14' text-anchor='middle' letter-spacing='3'>FESTIVAL MAP · SAMPLE</text>
    </svg>
  `);

const heroNavBtn      = () => document.getElementById("hero-nav-btn");
const heroMapBtn      = () => document.getElementById("hero-map-btn");
const navOverlay      = document.getElementById("nav-overlay");
const navSheetTitle   = document.getElementById("nav-sheet-title");
const navWazeLink     = document.getElementById("nav-waze");
const navWazeLabel    = document.getElementById("nav-waze-label");
const navGmapsLink    = document.getElementById("nav-gmaps");
const navGmapsLabel   = document.getElementById("nav-gmaps-label");
const navCancelBtn    = document.getElementById("nav-cancel");
const mapOverlay      = document.getElementById("map-overlay");
const mapViewportEl   = document.getElementById("map-viewport");
const mapImageEl      = document.getElementById("map-image");
const mapCloseBtn     = document.getElementById("map-close");
const mapCaptionEl    = document.getElementById("map-caption");
const mapZoomInBtn    = document.getElementById("map-zoom-in");
const mapZoomOutBtn   = document.getElementById("map-zoom-out");
const mapRotateBtn    = document.getElementById("map-rotate");
const mapResetBtn     = document.getElementById("map-reset");

function refreshNavSheetCopy() {
  if (navSheetTitle) navSheetTitle.textContent = t("nav.navigate");
  if (navWazeLabel)  navWazeLabel.textContent  = t("nav.openInWaze");
  if (navGmapsLabel) navGmapsLabel.textContent = t("nav.openInGmaps");
  if (navCancelBtn)  navCancelBtn.textContent  = t("nav.cancel");
  if (navWazeLink)   navWazeLink.setAttribute("href", NAV_LINKS.waze);
  if (navGmapsLink)  navGmapsLink.setAttribute("href", NAV_LINKS.gmaps);
}

function openNavSheet() {
  if (!navOverlay) return;
  refreshNavSheetCopy();
  navOverlay.hidden = false;
}

function closeNavSheet() {
  if (navOverlay) navOverlay.hidden = true;
}

// ===== Festival map viewer: pinch-zoom + pan + rotate =====
// Transform state mirrors what the CSS reads: scale/rotation/x/y are
// stored on the viewport as CSS variables and re-applied each frame.
// Pointer events are captured on the viewport so two fingers pinch-zoom
// (with rotation), one finger pans, double-tap toggles 1× ↔ 2×, and a
// wheel zooms toward the cursor on desktop.
const MAP_MIN_SCALE = 1;
const MAP_MAX_SCALE = 6;
const mapTx = { scale: 1, rotation: 0, x: 0, y: 0 };
const mapPointers = new Map();
let mapPinchStart = null;
let mapPanStart   = null;
let mapLastTap    = 0;

function clampScale(s) { return Math.max(MAP_MIN_SCALE, Math.min(MAP_MAX_SCALE, s)); }

function applyMapTransform() {
  if (!mapImageEl) return;
  // Clamp pan when the image is at 1× so it can't drift off-centre.
  if (mapTx.scale <= 1.001) { mapTx.x = 0; mapTx.y = 0; }
  mapImageEl.style.setProperty("--map-tx",       mapTx.x + "px");
  mapImageEl.style.setProperty("--map-ty",       mapTx.y + "px");
  mapImageEl.style.setProperty("--map-scale",    mapTx.scale);
  mapImageEl.style.setProperty("--map-rotation", mapTx.rotation + "deg");
  if (mapZoomOutBtn) mapZoomOutBtn.disabled = mapTx.scale <= MAP_MIN_SCALE + 0.001;
  if (mapZoomInBtn)  mapZoomInBtn.disabled  = mapTx.scale >= MAP_MAX_SCALE - 0.001;
}

function resetMapTransform() {
  mapTx.scale = 1;
  mapTx.rotation = 0;
  mapTx.x = 0;
  mapTx.y = 0;
  applyMapTransform();
}

// Zoom toward a focal point (cx,cy) inside the viewport so the spot
// under the cursor / pinch midpoint stays put as we scale.
function zoomMapAt(nextScale, cx, cy) {
  const target = clampScale(nextScale);
  if (!mapViewportEl) { mapTx.scale = target; applyMapTransform(); return; }
  const rect = mapViewportEl.getBoundingClientRect();
  // viewport-local coords of the focal point
  const fx = (cx ?? rect.width  / 2) - rect.left;
  const fy = (cy ?? rect.height / 2) - rect.top;
  // Pre-zoom, the image content under (fx,fy) sits at:
  //   cx_img = (fx - tx) / scale
  // Keep that point fixed by adjusting tx so cx_img stays the same.
  const ratio = target / mapTx.scale;
  mapTx.x = fx - ratio * (fx - mapTx.x);
  mapTx.y = fy - ratio * (fy - mapTx.y);
  mapTx.scale = target;
  applyMapTransform();
}

function pointerMidpoint(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
    dist: Math.hypot(p1.x - p2.x, p1.y - p2.y),
    angle: Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI,
  };
}

function onMapPointerDown(e) {
  if (!mapViewportEl) return;
  mapViewportEl.setPointerCapture?.(e.pointerId);
  mapPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  mapViewportEl.classList.add("is-gesturing");
  if (mapPointers.size === 2) {
    const [p1, p2] = [...mapPointers.values()];
    mapPinchStart = {
      ...pointerMidpoint(p1, p2),
      scale:    mapTx.scale,
      rotation: mapTx.rotation,
      tx:       mapTx.x,
      ty:       mapTx.y,
    };
    mapPanStart = null;
  } else if (mapPointers.size === 1) {
    mapPanStart = { x: e.clientX, y: e.clientY, tx: mapTx.x, ty: mapTx.y };
    // Double-tap to toggle 1× ↔ 2× (same finger landing twice within 300ms).
    const now = Date.now();
    if (now - mapLastTap < 300) {
      const next = mapTx.scale > 1.05 ? 1 : 2;
      if (next === 1) resetMapTransform();
      else zoomMapAt(next, e.clientX, e.clientY);
      mapLastTap = 0;
    } else {
      mapLastTap = now;
    }
  }
}

function onMapPointerMove(e) {
  if (!mapPointers.has(e.pointerId)) return;
  mapPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (mapPointers.size >= 2 && mapPinchStart) {
    const pts = [...mapPointers.values()].slice(0, 2);
    const cur = pointerMidpoint(pts[0], pts[1]);
    const ratio = cur.dist / Math.max(1, mapPinchStart.dist);
    const nextScale = clampScale(mapPinchStart.scale * ratio);
    // Anchor zoom on the viewport-local midpoint at gesture start so
    // the content under the user's fingers tracks them precisely.
    if (!mapViewportEl) return;
    const rect = mapViewportEl.getBoundingClientRect();
    const fx = mapPinchStart.x - rect.left;
    const fy = mapPinchStart.y - rect.top;
    const r = nextScale / mapPinchStart.scale;
    mapTx.x = fx - r * (fx - mapPinchStart.tx) + (cur.x - mapPinchStart.x);
    mapTx.y = fy - r * (fy - mapPinchStart.ty) + (cur.y - mapPinchStart.y);
    mapTx.scale = nextScale;
    mapTx.rotation = mapPinchStart.rotation + (cur.angle - mapPinchStart.angle);
    applyMapTransform();
  } else if (mapPointers.size === 1 && mapPanStart && mapTx.scale > 1.001) {
    mapTx.x = mapPanStart.tx + (e.clientX - mapPanStart.x);
    mapTx.y = mapPanStart.ty + (e.clientY - mapPanStart.y);
    applyMapTransform();
  }
}

function onMapPointerUp(e) {
  if (mapPointers.has(e.pointerId)) mapPointers.delete(e.pointerId);
  if (mapPointers.size < 2) mapPinchStart = null;
  if (mapPointers.size === 0) { mapPanStart = null; mapViewportEl?.classList.remove("is-gesturing"); }
}

function onMapWheel(e) {
  if (!mapOverlay || mapOverlay.hidden) return;
  e.preventDefault();
  // Trackpad pinch sends ctrlKey + small deltaY; mouse wheel sends
  // larger deltas. Same formula handles both — sign of deltaY decides
  // direction, magnitude decides step size (capped so a single tick
  // doesn't fly past max scale).
  const step = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015));
  zoomMapAt(mapTx.scale * step, e.clientX, e.clientY);
}

function openMap() {
  if (!mapOverlay) return;
  if (mapImageEl) mapImageEl.src = MAP_IMAGE_SRC;
  if (mapCaptionEl) mapCaptionEl.textContent = t("nav.festivalMap");
  resetMapTransform();
  mapOverlay.hidden = false;
}

function closeMap() {
  if (mapOverlay) mapOverlay.hidden = true;
}

// Wire the gesture handlers once at module init.
mapViewportEl?.addEventListener("pointerdown",   onMapPointerDown);
mapViewportEl?.addEventListener("pointermove",   onMapPointerMove);
mapViewportEl?.addEventListener("pointerup",     onMapPointerUp);
mapViewportEl?.addEventListener("pointercancel", onMapPointerUp);
mapViewportEl?.addEventListener("pointerleave",  onMapPointerUp);
mapViewportEl?.addEventListener("wheel",         onMapWheel, { passive: false });

// A11y / desktop fallback: explicit zoom / rotate / reset buttons.
mapZoomInBtn?.addEventListener("click",  () => zoomMapAt(mapTx.scale * 1.4));
mapZoomOutBtn?.addEventListener("click", () => zoomMapAt(mapTx.scale / 1.4));
mapRotateBtn?.addEventListener("click",  () => { mapTx.rotation += 90; applyMapTransform(); });
mapResetBtn?.addEventListener("click",   resetMapTransform);

document.addEventListener("click", e => {
  const navBtn = e.target.closest("#hero-nav-btn");
  if (navBtn) { openNavSheet(); return; }
  const mapBtn = e.target.closest("#hero-map-btn");
  if (mapBtn)  { openMap();     return; }
});

navOverlay?.addEventListener("click", e => {
  if (e.target === navOverlay) closeNavSheet();
});
navCancelBtn?.addEventListener("click", closeNavSheet);
// Close the nav sheet after the user picks a destination — the link
// itself opens in a new tab via target="_blank".
navWazeLink?.addEventListener("click", () => setTimeout(closeNavSheet, 0));
navGmapsLink?.addEventListener("click", () => setTimeout(closeNavSheet, 0));

mapOverlay?.addEventListener("click", e => {
  if (e.target === mapOverlay) closeMap();
});
mapCloseBtn?.addEventListener("click", closeMap);

// ===== First-visit language picker =====
// Shown only when the user has never explicitly picked a language. The
// suggested tile is highlighted based on detectDefaultLang(); the user
// always has the final say (any of the three tiles commits + closes).
const welcomeOverlay = document.getElementById("welcome-overlay");
const welcomeLangsEl = document.getElementById("welcome-langs");

function showWelcomeModal() {
  if (!welcomeOverlay || !welcomeLangsEl) return;
  const suggested = detectDefaultLang();
  welcomeLangsEl.querySelectorAll(".welcome-lang").forEach(btn => {
    btn.classList.toggle("is-default", btn.dataset.setLang === suggested);
  });
  welcomeOverlay.hidden = false;
}

function closeWelcomeModal() {
  if (welcomeOverlay) welcomeOverlay.hidden = true;
}

welcomeLangsEl?.addEventListener("click", e => {
  const btn = e.target.closest(".welcome-lang");
  if (!btn) return;
  const lang = btn.dataset.setLang;
  if (!LANG_CODES[lang]) return;
  applyLang(lang);
  closeWelcomeModal();
});

if (!hasStoredLang()) {
  // Pre-apply the detected default so the reel underneath the modal
  // is already rendered in the right language when the user dismisses.
  const suggested = detectDefaultLang();
  if (suggested !== currentLang) applyLang(suggested);
  showWelcomeModal();
}

// Random-artist button: pick a random artist from whatever's currently
// visible on the hero (Main → all artists; a stage hero → that stage only).
const randomBtn = document.getElementById("random-btn");
randomBtn?.addEventListener("click", () => {
  const stage = activeStageFilter;
  const pool = stage === "all" ? ARTISTS : ARTISTS.filter(a => a.stage === stage);
  if (!pool.length) return;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  // Make sure the artist is actually rendered (filter may exclude it). If
  // the current filter wouldn't include the pick, switch to "all" first.
  if (!reel.querySelector(`[data-artist-id="${pick.id}"]`)) {
    activeStageFilter = "all";
    rerenderArtistsBelowHero();
  }
  const sec = reel.querySelector(`[data-artist-id="${pick.id}"]`);
  if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
  // Tiny tactile spin so the click feels playful
  randomBtn.classList.remove("is-spinning");
  void randomBtn.offsetWidth;
  randomBtn.classList.add("is-spinning");
});
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
  if (e.key !== "Escape") return;
  if (mapOverlay && !mapOverlay.hidden)             { closeMap();        return; }
  if (navOverlay && !navOverlay.hidden)             { closeNavSheet();   return; }
  if (favoritesOverlay && !favoritesOverlay.hidden) { closeFavorites();  return; }
  if (searchOverlay && !searchOverlay.hidden)       { closeSearch();     return; }
});

// ===== URL routing =====
// Short, link-shareable params: ?s=<stage> · ?a=<artistId> · ?p=<panel>
// Examples:
//   /                       → Main hero
//   /?s=retro               → Retro Universe hero
//   /?a=yahel               → Yahel hero panel
//   /?a=yahel&p=tracks      → Yahel's tracks panel
const PANEL_KEYS = ["hero", "info", "tracks", "discography"];

function readUrlState() {
  const sp = new URLSearchParams(location.search);
  return { s: sp.get("s"), a: sp.get("a"), p: sp.get("p") };
}

// Snapshot the deep-link the moment the script loads — before any
// setActiveSection/syncUrlFromActive can blank out location.search.
const _initialRoute = readUrlState();

// Suppress URL writes during the brief window where we're applying an
// initial deep-link, so a half-settled scroll doesn't overwrite the route
// the user came in on.
let _suppressUrlWrite = false;

function writeUrl({ s, a, p } = {}) {
  if (_suppressUrlWrite) return;
  const params = new URLSearchParams();
  if (a) {
    params.set("a", a);
    if (p && p !== "hero") params.set("p", p);
  } else if (s && s !== "all") {
    params.set("s", s);
  }
  const qs = params.toString();
  const next = qs ? `${location.pathname}?${qs}` : location.pathname;
  if (next !== location.pathname + location.search) {
    history.replaceState(null, "", next);
  }
}

function syncUrlFromActive() {
  const active = reel.querySelector(".section.is-active");
  if (!active) return;
  if (active.dataset.section === "hero") {
    writeUrl({ s: activeStageFilter });
  } else if (active.dataset.section === "artist") {
    const a = active.dataset.artistId;
    const pager = active.querySelector(".pager");
    let p = "hero";
    if (pager) {
      const w = pager.clientWidth || 1;
      const scrollIdx = Math.round(Math.abs(pager.scrollLeft) / w);
      // Carousel: scrollIdx 0 = cloneStart, 1 = real hero, 2 = info, 3 = tracks, 4 = disco, 5 = cloneEnd.
      const realIdx = Math.max(0, Math.min(PANEL_KEYS.length - 1, scrollIdx - 1));
      p = PANEL_KEYS[realIdx];
    }
    writeUrl({ a, p });
  }
}

function applyInitialRoute() {
  const { s, a, p } = _initialRoute;
  // Nothing to do — let the page settle naturally and start writing the URL.
  if (!a && !s) return;
  // Hold URL writes for a beat so the natural scroll-into-view flow doesn't
  // overwrite the deep-link before it lands.
  _suppressUrlWrite = true;
  setTimeout(() => { _suppressUrlWrite = false; syncUrlFromActive(); }, 1500);

  if (a) {
    const artist = ARTISTS.find(x => x.id === a);
    if (!artist) { _suppressUrlWrite = false; return; }
    // Make sure the artist is in the current rendered list.
    if (activeStageFilter !== "all" && artist.stage !== activeStageFilter) {
      activeStageFilter = "all";
      rerenderArtistsBelowHero();
      buildStageDropdown();
      updateHeroDots();
    }
    // Apply the scroll across multiple settle points: now, next-frame, and
    // again at +200ms. Some other code in the app (intersection observers,
    // scroll-snap hand-off, content-visibility virtualisation) can land
    // exactly when we'd otherwise scroll, leaving the reel pinned to 0.
    // Re-asserting the target a few times is a cheap way to guarantee it.
    const scrollToArtist = () => {
      const sec = reel.querySelector(`[data-artist-id="${CSS.escape(a)}"]`);
      if (!sec) return;
      reel.scrollTo({ top: sec.offsetTop, behavior: "auto" });
      const pIdx = PANEL_KEYS.indexOf(p);
      if (pIdx > 0) {
        const pager = sec.querySelector(".pager");
        if (pager) {
          const w = pager.clientWidth || 1;
          pager.scrollTo({ left: (pIdx + 1) * w, behavior: "auto" });
        }
      }
      // The IntersectionObserver doesn't fire reliably for programmatic
      // scrolls (especially with content-visibility:auto), so we mark the
      // target section active manually. setActiveSection itself drives the
      // dot highlights, bg tint, and URL sync.
      setActiveSection(sec);
    };
    scrollToArtist();
    requestAnimationFrame(scrollToArtist);
    setTimeout(scrollToArtist, 200);
    setTimeout(scrollToArtist, 600);
    return;
  }

  if (s && s !== "all" && FESTIVAL.stages.some(st => st.id === s)) {
    activeStageFilter = s;
    rerenderArtistsBelowHero();
    buildStageDropdown();
    updateHeroDots();
    requestAnimationFrame(() => scrollHeroToStage(s, true));
  }
}

// ===== Vertical dots auto-hide on idle =====
// Only the reel's own VERTICAL scroll wakes the dots. Horizontal scrolls
// inside artist pagers / hero pager are explicitly NOT activity for the
// vertical dots — when the user starts a horizontal swipe the dots fade
// away immediately ("you're not navigating the lineup right now"). 1.5s
// after the last vertical scroll event the dots also relax.
let dotsIdleTimer = null;
let lastReelScrollTop = 0;
function showVDots() {
  if (!verticalProgress) return;
  verticalProgress.classList.remove("is-idle");
  clearTimeout(dotsIdleTimer);
  dotsIdleTimer = setTimeout(() => {
    // While the strip is armed (user is actively picking a section), the
    // idle hide is suppressed — disarmAllDots / armDots TTL takes over and
    // restarts this countdown when the user steps away.
    if (verticalProgress.classList.contains("is-armed")) return;
    verticalProgress.classList.add("is-idle");
  }, 1500);
}
function hideVDotsImmediately() {
  if (!verticalProgress) return;
  clearTimeout(dotsIdleTimer);
  verticalProgress.classList.add("is-idle");
}
// Vertical scroll on the reel itself = the user IS navigating the lineup.
reel.addEventListener("scroll", () => {
  const top = reel.scrollTop;
  if (top !== lastReelScrollTop) {
    lastReelScrollTop = top;
    showVDots();
  }
}, { passive: true });
// Horizontal scroll on any inner pager (hero or artist carousel) = the
// user is exploring sideways, not browsing artists. Hide the dots now.
reel.addEventListener("scroll", e => {
  const t = e.target;
  if (!t || t === reel) return;
  if (t.closest?.(".pager, .hero-pager")) hideVDotsImmediately();
}, { capture: true, passive: true });

// Boot
buildReel();
buildVerticalProgress();
buildStageDropdown();
observeSections();
// Initial active state
setTimeout(() => setActiveSection(reel.querySelector(".section")), 50);
// Apply deep-link from URL after first render
setTimeout(applyInitialRoute, 80);
// Start hidden — dots only appear once the user actually scrolls vertically.
hideVDotsImmediately();

// Try to merge build-time-fetched artist photos
loadPhotos();
