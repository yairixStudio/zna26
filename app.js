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

// Snapshot the deep-link the moment the script loads — before any
// setActiveSection / syncUrlFromActive can blank out location.search.
// Declared up here (not next to the rest of the URL routing block) so
// panelHero can read it on the very first buildReel — the buildReel call
// from applyLang fires before module-bottom statements execute, so a
// const declared down there sits in the temporal dead zone and throws
// "Cannot access '_initialRoute' before initialization", which used to
// nuke the entire first render.
const _initialRoute = (() => {
  const sp = new URLSearchParams(location.search);
  return { s: sp.get("s"), a: sp.get("a"), p: sp.get("p") };
})();

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
  "nav.contactUs":     { he: "צרו קשר", en: "Contact us", pt: "Contacte-nos" },
  "nav.navigate":      { he: "ניווט לאירוע", en: "Navigate to event", pt: "Navegar até ao evento" },
  "nav.festivalMap":   { he: "מפת הפסטיבל", en: "Festival map", pt: "Mapa do festival" },
  "nav.openInWaze":    { he: "פתיחה ב-Waze", en: "Open in Waze", pt: "Abrir no Waze" },
  "nav.openInGmaps":   { he: "פתיחה ב-Google Maps", en: "Open in Google Maps", pt: "Abrir no Google Maps" },
  "nav.cancel":        { he: "ביטול", en: "Cancel", pt: "Cancelar" },

  // Artist panels
  "panel.about":       { he: "אודות", en: "About", pt: "Sobre" },
  "panel.bio":         { he: "ביוגרפיה", en: "Biography", pt: "Biografia" },
  "panel.tracks":      { he: "טראקים", en: "Tracks", pt: "Faixas" },
  "panel.tracksTop":   { he: "טראקים נבחרים", en: "Selected tracks", pt: "Faixas selecionadas" },
  "panel.discography": { he: "דיסקוגרפיה", en: "Discography", pt: "Discografia" },
  "panel.discographyTop": { he: "דיסקוגרפיה נבחרת", en: "Selected discography", pt: "Discografia selecionada" },
  "panel.streaming":   { he: "סטרימינג", en: "Streaming", pt: "Streaming" },
  "panel.moreLinks":   { he: "קישורים נוספים", en: "More links", pt: "Mais ligações" },
  "panel.tba":         { he: "המידע יתעדכן בקרוב", en: "Information will be updated soon", pt: "Informação será atualizada em breve" },
  "panel.ariaPanelN":  { he: "פאנל", en: "Panel", pt: "Painel" },

  // Tracks empty state
  "tracks.empty":      { he: "עדיין לא הוספנו טראקים מאומתים. חפשו ביוטיוב:", en: "No verified tracks yet. Search on YouTube:", pt: "Ainda sem faixas verificadas. Procurar no YouTube:" },
  "tracks.searchYT":   { he: "▶ חיפוש ב-YouTube", en: "▶ Search on YouTube", pt: "▶ Procurar no YouTube" },
  "tracks.play":       { he: "נגן", en: "Play", pt: "Reproduzir" },

  // Hero
  "hero.artistsCount": { he: "אומנים", en: "artists", pt: "artistas" },
  "hero.autoplayPause": { he: "עצור מעבר אוטומטי בין במות", en: "Stop automatic stage rotation", pt: "Parar rotação automática de palcos" },
  "hero.autoplayResume": { he: "הפעל מעבר אוטומטי בין במות", en: "Resume automatic stage rotation", pt: "Retomar rotação automática de palcos" },
  // Single-line disclaimer with an inline link to the official site. The
  // <a> markup is intentionally inline; heroPanelMain renders this string
  // without escapeHtml so the link survives. The "Official site" anchor
  // text gets a separate translation key so each language stays natural.
  "hero.disclaimer": {
    he: 'אתר מעריצים בלא-רשמי, לא קשור לארגון הפסטיבל. <a href="https://znagathering.com" target="_blank" rel="noopener" class="hero-official-link">לאתר הרשמי</a>',
    en: 'Unofficial fan website — not affiliated with the festival\'s organisation. <a href="https://znagathering.com" target="_blank" rel="noopener" class="hero-official-link">Visit the official site</a>',
    pt: 'Site de fãs não oficial — sem afiliação à organização do festival. <a href="https://znagathering.com" target="_blank" rel="noopener" class="hero-official-link">Visitar o site oficial</a>'
  },

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
  "favorites.notifyCta":  { he: "דפדפן", en: "Browser", pt: "Navegador" },
  "favorites.notifyOn":   { he: "פעיל", en: "On", pt: "Ativado" },
  "favorites.notifyDenied": { he: "חסום", en: "Blocked", pt: "Bloqueado" },
  "favorites.notifyUnsupported": { he: "לא נתמך", en: "Unsupported", pt: "Não suportado" },
  "favorites.notifyTelegram": { he: "Telegram", en: "Telegram", pt: "Telegram" },
  "favorites.removeOne":  { he: "הסר מהמועדפים", en: "Remove from favorites", pt: "Remover dos favoritos" },

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
  "festival.location": { he: "אגם מונטרגיל, פורטוגל", en: "Lake Montargil, Portugal", pt: "Lago de Montargil, Portugal" },
  // Site-purpose blurb shown under the ZNA wordmark on the main hero —
  // this is what the SITE is for, separate from FESTIVAL.description (which
  // describes the festival itself and is reused elsewhere).
  "hero.sitePurpose": {
    he: "הזדמנות להכיר מקרוב את אומני ZNA 2026 — לשמוע את המוזיקה ולגלות את הסיפור שמאחורי כל סט.",
    en: "A chance to get to know the ZNA 2026 lineup — meet the artists, hear the music and discover the story behind every set.",
    pt: "Uma oportunidade de conhecer de perto o alinhamento ZNA 2026 — ouvir a música e descobrir a história por trás de cada set."
  },
  // Tiny desktop hint that the keyboard arrow keys can navigate the reel.
  "kbHint.label": { he: "ניווט עם החיצים", en: "Arrow keys to navigate", pt: "Setas para navegar" },
  // "Random artist" button (now lives inside #artists-overlay, not the hero).
  "hero.randomLabel": { he: "קפיצה לאומן אקראי", en: "Jump to a random artist", pt: "Saltar para um artista aleatório" },
  // Avatar-stack pill on each hero panel: tooltip + modal title.
  "hero.viewArtists": { he: "ראו את רשימת האומנים", en: "See the artist list", pt: "Ver a lista de artistas" },
  "artists.title": { he: "אומנים", en: "Artists", pt: "Artistas" },
  "artists.titleAll": { he: "כל האומנים", en: "All artists", pt: "Todos os artistas" },

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
  // Explicit translation in the user's language always wins when present.
  // For Hebrew, tr.he was populated from the curated source (or the
  // *_he stash captured before official-artists.js's English scrape
  // overwrote the main field) — so the user sees the original Hebrew
  // copy and never falls through to the scraped English `a.bio`.
  const own = tr[currentLang]?.[field];
  if (own) return own;
  // Fall back order: the OTHER foreign translation, then the raw
  // `a[field]` (whatever's there) so we never render an empty card.
  return tr.en?.[field] || tr.pt?.[field] || a[field] || "";
}

// Country strings on the artist record look like "🇮🇱 ישראל" or
// "🇯🇵 Japan (London)" — the flag emoji at the start is two regional-
// indicator code points. Convert that pair to a 2-letter ISO country
// code (IL, JP, GB, US…) which is what the artist hero now prints
// above the name. Falls back to "INT" if the country has the globe
// emoji and to "" for an empty input.
function countryToISO(countryStr) {
  if (!countryStr) return "";
  const s = String(countryStr).trim();
  // Multi-country fallback: "🇸🇪 Sweden / 🇫🇷 France" — take the first flag.
  // Regional indicator code points live at U+1F1E6 (A) … U+1F1FF (Z).
  // Each flag is two of these → 4 UTF-16 code units. We read the first
  // two surrogate pairs and map them back to A-Z.
  const cps = [...s];
  const REGIONAL_BASE = 0x1F1E6;
  const A_CHARCODE = 65;
  let chars = "";
  for (const cp of cps) {
    const code = cp.codePointAt(0);
    if (code >= REGIONAL_BASE && code <= REGIONAL_BASE + 25) {
      chars += String.fromCharCode(A_CHARCODE + (code - REGIONAL_BASE));
      if (chars.length === 2) break;
    } else if (chars.length > 0) {
      break; // hit a non-flag glyph mid-pair
    }
  }
  if (chars.length === 2) return chars;
  // Globe emoji (🌍 / 🌎 / 🌏) → "INT" — and fall through for anything else.
  if (/[\u{1F30D}-\u{1F30F}]/u.test(s)) return "INT";
  return "";
}

// Backward-compat: a few callers still ask for the flag glyph itself
// (e.g. in places where the visual emoji reads better than the code).
function extractCountryFlag(countryStr) {
  if (!countryStr) return "";
  const m = String(countryStr).match(/^\S+/);
  return m ? m[0] : "";
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
  const sections = cachedSections;
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
  // Run the actual scroll in a small loop of RAFs — buildReel rebuilds
  // the whole reel innerHTML, and on slower devices the new sections
  // sometimes haven't finished laying out by the time one RAF fires
  // (scrollIntoView would then land on offsetTop=0 → user gets dumped
  // at the top instead of the artist they were reading).
  const findTarget = () => {
    if (state.sectionKey === "hero") {
      return reel.querySelector('[data-section="hero"]');
    }
    if (typeof state.sectionKey === "string" && state.sectionKey.startsWith("artist:")) {
      const id = state.sectionKey.slice("artist:".length);
      return reel.querySelector(`[data-artist-id="${CSS.escape(id)}"]`);
    }
    return null;
  };
  const doRestore = () => {
    const target = findTarget();
    if (!target) return;
    // scrollIntoView on the SECTION first (vertical), then on the active
    // panel (horizontal). Use direct scrollTop on the reel so smooth-
    // scroll animation queues from the bus stop don't fight us.
    reel.scrollTo({ top: target.offsetTop, behavior: "auto" });
    const pager = target.querySelector(".pager") || target.querySelector(".hero-pager");
    const child = pager?.children[state.panelIdx || 0];
    if (child) {
      pager.scrollTo({ left: child.offsetLeft, behavior: "auto" });
    }
    // Let the rest of the app (active-section observer, hero autoplay,
    // URL sync) re-anchor to the restored position.
    if (typeof setActiveSection === "function") setActiveSection(target);
  };
  // Two RAFs gives layout a chance to settle even on slower devices;
  // a 60ms fallback covers the rare case where the second RAF still
  // sees pre-layout dimensions.
  requestAnimationFrame(() => requestAnimationFrame(doRestore));
  setTimeout(doRestore, 60);
}

function applyLang(lang) {
  if (!LANG_CODES[lang]) return;
  currentLang = lang;
  try { localStorage.setItem("zna-lang", lang); } catch (_) {}
  document.documentElement.lang = lang;
  // Flip the global document direction too, so RTL-specific CSS selectors
  // ([dir="rtl"] / :dir(rtl)) can adjust per-element layout — e.g. the
  // stage dropdown's chevron-on-left positioning in Hebrew.
  document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  // Update static UI chrome that sits outside the reel.
  const searchBtn = document.getElementById("search-btn");
  const logoBtn = document.getElementById("logo-btn");
  const searchInput = document.getElementById("search-input");
  if (searchBtn) { searchBtn.title = t("nav.searchArtist"); searchBtn.setAttribute("aria-label", t("nav.searchArtist")); }
  if (logoBtn) { logoBtn.title = t("nav.backHome"); logoBtn.setAttribute("aria-label", t("nav.backHome")); }
  if (searchInput) {
    searchInput.placeholder = t("search.placeholder");
    searchInput.dir = lang === "he" ? "rtl" : "ltr";
  }
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
  // Keyboard-arrows hint sits outside the reel; refresh its label too.
  const kbLabel = document.getElementById("kb-hint-label");
  if (kbLabel) kbLabel.textContent = t("kbHint.label");
  const artistsRandomBtnLang = document.getElementById("artists-random");
  if (artistsRandomBtnLang) {
    const tip = t("hero.randomLabel");
    artistsRandomBtnLang.setAttribute("aria-label", tip);
    artistsRandomBtnLang.title = tip;
  }
}

document.documentElement.lang = currentLang;
document.documentElement.dir = currentLang === "he" ? "rtl" : "ltr";

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

// Collab link in a discography "project" string — scroll to the
// referenced artist's section. Same delegated pattern so it survives
// reel rebuilds (language switch, filter change, etc.).
reel.addEventListener("click", e => {
  const link = e.target.closest("a.collab-link");
  if (!link) return;
  e.preventDefault();
  const id = link.dataset.collab;
  if (!id) return;
  if (activeStageFilter !== "all") {
    activeStageFilter = "all";
    if (typeof buildReel === "function") buildReel();
    if (typeof buildVerticalProgress === "function") buildVerticalProgress();
    if (typeof buildStageDropdown === "function") buildStageDropdown();
    if (typeof observeSections === "function") observeSections();
  }
  setTimeout(() => {
    const sec = reel.querySelector(`[data-artist-id="${CSS.escape(id)}"]`);
    sec?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 30);
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
// each artist record. The HE values come from the curated Hebrew copy that
// official-artists.js stashed in `*_he` fields BEFORE the English scrape
// from the official program page overwrote the main `bio`/`notable` —
// without this, Hebrew users were getting the English scraped bio because
// a.bio had already been replaced by the time we got here. tArtist() reads
// from a.translations[currentLang] first, falls back to en, then he.
if (typeof ARTIST_TRANSLATIONS !== "undefined") {
  ARTISTS.forEach(a => {
    const tr = ARTIST_TRANSLATIONS[a.id];
    a.translations = a.translations || {};
    // Always build a Hebrew block — even when there's no entry in
    // ARTIST_TRANSLATIONS for this artist — so the curated Hebrew bio
    // survives the official-artists English overwrite.
    a.translations.he = a.translations.he || {
      bio: a.bio_he || a.bio,
      notable: a.notable_he || a.notable,
      country: a.country_he || a.country,
      born: a.born_he || a.born
    };
    if (!tr) return;
    if (tr.en) a.translations.en = tr.en;
    if (tr.pt) a.translations.pt = tr.pt;
  });
}

let activeStageFilter = "all";

// Service worker registration — runs after first paint so it never delays
// LCP. The SW caches the app shell + artist photos so a repeat visit (a
// festival-goer back at camp with bad cellular) boots offline. Registered
// with a relative URL so the same code works from a GitHub Pages sub-path.
// Service-worker registration with smart auto-update. On a deploy the
// browser picks up the new sw.js via networkFirst, installs it, and on
// activate it claims the page — at which point we do a one-time reload
// so the user lands on the fresh bundle without needing a manual hard
// refresh. We ONLY reload when there was already a controller at boot
// (i.e. this is a real upgrade), never on the very first visit — that
// race used to trigger a reload mid-init and leave the boot spinner
// stuck until the user manually refreshed.
if ("serviceWorker" in navigator) {
  // Snapshot the controller BEFORE registering so we can tell first-
  // install (null at boot) from upgrade (some controller at boot)
  // when controllerchange fires later.
  const hadControllerAtBoot = !!navigator.serviceWorker.controller;
  let reloadedForSW = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (reloadedForSW) return;
    if (!hadControllerAtBoot) return; // first install — page is already fresh
    reloadedForSW = true;
    window.location.reload();
  });
  window.addEventListener("load", () => {
    setTimeout(() => {
      navigator.serviceWorker.register("./sw.js", { scope: "./" })
        .then(reg => {
          // Poll for an updated sw.js every 5 minutes for long-lived
          // sessions (someone leaves the tab open) so a fresh deploy
          // gets noticed without needing the user to close + reopen.
          setInterval(() => reg.update().catch(() => {}), 5 * 60 * 1000);
          // On any newly-installed SW (when there's already a controller),
          // ask it to take over right away — controllerchange + our
          // reload-on-upgrade handler does the rest.
          reg.addEventListener("updatefound", () => {
            const next = reg.installing;
            if (!next) return;
            next.addEventListener("statechange", () => {
              if (next.state === "installed" && navigator.serviceWorker.controller) {
                next.postMessage("skipWaiting");
              }
            });
          });
        })
        .catch(() => {});
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
      // Split the photo-driven rebuild across two animation frames so the
      // DOM mutation (buildReel rewrites reel.innerHTML for 85 artists)
      // and the downstream layout reads (setActiveSection +
      // applyInitialRoute call getBoundingClientRect / offsetTop) don't
      // happen in the same synchronous JS task. Without the split, that
      // chain logged "[Violation] Forced reflow ... 66 ms" because the
      // engine had to flush layout twice in one frame to answer the reads.
      requestAnimationFrame(() => {
        try {
          // Don't disturb a playing video - the player lives outside the reel.
          buildReel();
          observeSections();
          requestAnimationFrame(() => {
            try {
              setActiveSection(reel.querySelector(".section"));
              // The rebuild wipes whatever section the deep-link landed on.
              // If we came in on a deep-link, re-apply so the URL target sticks.
              if (typeof applyInitialRoute === "function") applyInitialRoute();
            } catch (e) { /* downstream layout-read failure is non-fatal */ }
          });
        } catch (e) { console.warn("photo re-render failed:", e); }
      });
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

  const dirAttr = currentLang === "he" ? "rtl" : "ltr";
  if (status.state === "live") {
    return `
      <div class="live-status live-status--live" aria-live="polite" dir="${dirAttr}">
        <strong class="live-status-title">${escapeHtml(status.artist.name)}</strong>
        <span class="live-status-meta">${escapeHtml(stageLabel(status.artist.stage))} · ${escapeHtml(formatScheduleRange(status.schedule))}</span>
      </div>
    `;
  }

  return `
    <div class="live-status live-status--${escapeHtml(status.state)}" aria-live="polite" dir="${dirAttr}">
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
         dir="${currentLang === "he" ? "rtl" : "ltr"}"
         data-demo-progress data-demo-start="${escapeHtml(startISO)}" data-demo-end="${escapeHtml(endISO)}">
      <div class="live-status-topline">
        <div class="live-now-track is-live"><span class="live-now-dot"></span><span class="live-now-label">${escapeHtml(t("live.now"))}</span></div>
        <span class="live-demo-badge">${escapeHtml(t("live.demoBadge"))}</span>
      </div>
      <strong class="live-status-title">${escapeHtml(current.name)}</strong>
      <span class="live-status-meta">${escapeHtml(fmt(start))}–${escapeHtml(fmt(end))}</span>
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

const HERO_LOGO_ASSETS = [
  { key: "ufo-top-left", base: "images/zna-3d/generated-logo/ufo-dome-left", width: 310, height: 251 },
  { key: "ufo-top-right", base: "images/zna-3d/generated-logo/ufo-orb-right", width: 339, height: 261 },
  { key: "ufo-bottom-left", base: "images/zna-3d/generated-logo/ufo-wide-left", width: 367, height: 247 },
  { key: "ufo-bottom-right", base: "images/zna-3d/generated-logo/ufo-wide-right", width: 387, height: 226 },
  { key: "orb-center", base: "images/zna-3d/generated-logo/orb-center", width: 154, height: 138 },
];

function heroLogoScene() {
  // UFOs / orbs no longer live inside the wordmark scene — they're
  // scattered as section-level decoration via heroSectionUfos() so the
  // logo unit reads as a clean wordmark composition.
  return `
    <div class="hero-logo-scene" aria-label="ZNA 26">
      ${pictureTagStatic("images/zna-3d/generated-logo/zna26-logo", {
        className: "hero-logo-main",
        alt: "ZNA 26",
        loading: "eager",
        fetchpriority: "high",
        width: 1325,
        height: 410
      })}
      ${pictureTagStatic("images/zna-3d/generated-logo/community-word", {
        className: "hero-logo-community",
        alt: "community",
        loading: "eager",
        fetchpriority: "high",
        width: 729,
        height: 237
      })}
    </div>
  `;
}

// Tiny UFO + orb pictures scattered at section level — siblings to the
// hero-pager. Absolutely positioned to avoid the center stack content
// and the bottom dots/hint strip; pointer-events: none so they don't
// trap swipes. The same five pictures used to live inside the logo
// scene; they were lifted out per the design brief so the logo reads
// as one tight wordmark unit.
function heroSectionUfos() {
  // Outer <div> owns the stage transform (set by JS per scroll frame).
  // Inner <picture> keeps the gentle CSS idle float. Two transforms on
  // different elements compose cleanly without overriding each other.
  return HERO_LOGO_ASSETS.map(asset => `
    <div class="hero-section-ufo hero-section-ufo--${asset.key}" data-ufo-key="${asset.key}">
      ${pictureTagStatic(asset.base, {
        className: "hero-section-ufo-img",
        alt: "",
        width: asset.width,
        height: asset.height,
      })}
    </div>
  `).join("");
}

// Per-stage layout for the 5 UFOs. Each stage shows exactly 3; the
// other 2 sit just outside the viewport in the direction they "exit"
// (top/left/right-anchored UFOs slide off the matching edge, orb slides
// off top/bottom). JS interpolates each UFO's transform per scroll
// frame so the offscreen-onscreen choreography reads as a smooth slide
// in/out, perfectly synced with the finger.
// Coordinates: x in vw (0 = viewport left), y in vh (0 = viewport top).
const UFO_LAYOUT = {
  all: {
    "ufo-top-left":     { x:   5, y:   8 },
    "ufo-top-right":    { x:  85, y:   8 },
    "ufo-bottom-left":  { x: -25, y:  60 }, // off-screen left
    "ufo-bottom-right": { x:  80, y:  58 },
    "orb-center":       { x:  50, y: 110 }, // off-screen bottom
  },
  retro: {
    "ufo-top-left":     { x:   7, y:   9 },
    "ufo-top-right":    { x: 115, y:   8 }, // off-screen right
    "ufo-bottom-left":  { x:   5, y:  64 },
    "ufo-bottom-right": { x: 115, y:  58 }, // off-screen right
    "orb-center":       { x:  18, y:  22 },
  },
  zambu: {
    "ufo-top-left":     { x: -25, y:   9 }, // off-screen left
    "ufo-top-right":    { x:  85, y:   6 },
    "ufo-bottom-left":  { x:   7, y:  68 },
    "ufo-bottom-right": { x:  86, y:  20 },
    "orb-center":       { x:  50, y: -25 }, // off-screen top
  },
  guardians: {
    "ufo-top-left":     { x:   8, y:   8 },
    "ufo-top-right":    { x:  88, y:  11 },
    "ufo-bottom-left":  { x: -25, y:  66 }, // off-screen left
    "ufo-bottom-right": { x:  88, y:  22 },
    "orb-center":       { x:  50, y: -25 }, // off-screen top
  },
  market: {
    "ufo-top-left":     { x: -25, y:  10 }, // off-screen left
    "ufo-top-right":    { x:  86, y:   7 },
    "ufo-bottom-left":  { x:   6, y:  66 },
    "ufo-bottom-right": { x: 115, y:  16 }, // off-screen right
    "orb-center":       { x:  22, y:  26 },
  },
};

let _ufoCachedSection = null;
let _ufoCachedNodes   = null;
function updateUfoTransformsForPager(pager) {
  if (!pager || !pager.isConnected) return;
  const section = pager.closest(".section--multi-hero");
  if (!section) return;
  // Cache the UFO node list per section so the per-frame loop avoids
  // re-querying the DOM 60-120 times a second.
  if (_ufoCachedSection !== section) {
    _ufoCachedSection = section;
    _ufoCachedNodes = Array.from(section.querySelectorAll(".hero-section-ufo"));
  }
  if (!_ufoCachedNodes.length) return;
  const w = pager.clientWidth || 1;
  const sl = Math.abs(pager.scrollLeft);
  const idxF = sl / w;
  const lowIdx = Math.max(0, Math.floor(idxF));
  const highIdx = Math.min(pager.children.length - 1, lowIdx + 1);
  const t = Math.min(1, Math.max(0, idxF - lowIdx));
  const lowStage  = pager.children[lowIdx]?.dataset.stage  || "all";
  const highStage = pager.children[highIdx]?.dataset.stage || lowStage;
  const lo = UFO_LAYOUT[lowStage];
  const hi = UFO_LAYOUT[highStage];
  if (!lo || !hi) return;
  for (const node of _ufoCachedNodes) {
    const key = node.dataset.ufoKey;
    const a = lo[key]; const b = hi[key];
    if (!a || !b) continue;
    const x = a.x + (b.x - a.x) * t;
    const y = a.y + (b.y - a.y) * t;
    node.style.transform = `translate3d(${x.toFixed(2)}vw, ${y.toFixed(2)}vh, 0)`;
  }
}

function heroPanelMain() {
  return `
    <div class="hero-panel hero-panel--main" data-stage="all">
      <div class="hero-stack">
        ${heroLogoScene()}
        <p class="hero-tagline">${escapeHtml(t("hero.sitePurpose"))}</p>
        <div class="hero-meta" dir="${currentLang === "he" ? "rtl" : "ltr"}">${escapeHtml(t("festival.dates"))}</div>
        ${liveStatusCard("all")}
        ${heroArtistsPill("all")}
        <p class="hero-disclaimer">${t("hero.disclaimer")}</p>
      </div>
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
      <div class="hero-stack">
        <button class="hero-icon-action hero-icon-action--top hero-nav-maps" id="hero-map-btn-${escapeHtml(stage.id)}" type="button" data-hero-map title="${escapeHtml(t("nav.festivalMap"))}" aria-label="${escapeHtml(t("nav.festivalMap"))}">
          <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
            <defs>
              <linearGradient id="nav-grad-${escapeHtml(stage.id)}" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"  stop-color="var(--hero-text-1)"/>
                <stop offset="55%" stop-color="var(--hero-text-2)"/>
                <stop offset="100%" stop-color="var(--hero-text-3)"/>
              </linearGradient>
            </defs>
            <!-- Same silhouette as Google Maps "directions" tile (diamond + arrow). -->
            <path fill="url(#nav-grad-${escapeHtml(stage.id)})" d="m21.41 10.59-7.99-8c-.78-.78-2.05-.78-2.83 0l-8.01 8c-.78.78-.78 2.05 0 2.83l8.01 8c.78.78 2.05.78 2.83 0l7.99-8c.79-.79.79-2.05 0-2.83zM13.5 14.5V12H10v3H8v-4c0-.55.45-1 1-1h4.5V7.5L17 11l-3.5 3.5z"/>
          </svg>
        </button>
        <div class="logo-mark hero-stage-name">${escapeHtml(tStage(stage.id))}</div>
        <p class="hero-tagline">${escapeHtml(tStage(stage.id, "desc"))}</p>
        ${stage.id === "market" ? marketLiveDemoCard() : liveStatusCard(stage.id)}
        ${heroArtistsPill(stage.id)}
      </div>
    </div>
  `;
}

// "+N" artists pill — three overlapping photo avatars followed by a
// total-count badge. Clicking it opens #artists-overlay with the
// scoped artist list + random button. The avatars sample the first
// three artists in the relevant pool (Main → all artists; stage hero
// → that stage only) that have a usable photo.
function heroArtistsPill(stageId) {
  const pool = stageId === "all"
    ? ARTISTS
    : ARTISTS.filter(a => a.stage === stageId);
  const total = pool.length;
  if (!total) return "";
  const withPhotos = pool.filter(a => a.photo).slice(0, 3);
  // Pad with non-photo artists if there aren't 3 photo'd ones, just so
  // the stack always shows three circles (the placeholder ones render
  // as a coloured initial via .hero-artists-avatar-fallback).
  const sample = [...withPhotos];
  let i = 0;
  while (sample.length < 3 && i < pool.length) {
    if (!sample.includes(pool[i])) sample.push(pool[i]);
    i++;
  }
  const remaining = Math.max(0, total - sample.length);
  const avatars = sample.map((a, idx) => {
    const src = pickThumbSrc(a.photo);
    const initials = getInitials(a.name);
    return src
      ? `<span class="hero-artists-avatar" style="--accent: ${escapeHtml(a.color || "#FEB447")}; --z: ${3 - idx};"><img loading="lazy" decoding="async" src="${escapeHtml(src)}" alt=""/></span>`
      : `<span class="hero-artists-avatar hero-artists-avatar--fallback" style="--accent: ${escapeHtml(a.color || "#FEB447")}; --z: ${3 - idx};">${escapeHtml(initials)}</span>`;
  }).join("");
  // Hebrew reads "7+ אומנים" as "more than 7" — natural shape for a
  // "see-more" pill. The prefix form "+7 אומנים" parses as "and 7 more"
  // which is the wrong nuance. EN/PT keep the standard "+N" prefix.
  const word = t("hero.artistsCount");
  const counterLabel = remaining > 0
    ? (currentLang === "he" ? `${remaining}+ ${word}` : `+${remaining} ${word}`)
    : `${total} ${word}`;
  const flyoutTitle = stageId === "all" ? t("artists.titleAll") : `${tStage(stageId)} · ${t("artists.title")}`;
  return `
    <button class="hero-artists-pill" type="button" data-artists-pool="${escapeHtml(stageId)}"
            aria-label="${escapeHtml(t("hero.viewArtists"))}" title="${escapeHtml(t("hero.viewArtists"))}"
            aria-expanded="false">
      <span class="hero-artists-stack" aria-hidden="true">${avatars}</span>
      <span class="hero-artists-count">${escapeHtml(counterLabel)}</span>
    </button>
    <div class="hero-artists-flyout" data-flyout-pool="${escapeHtml(stageId)}" role="dialog"
         aria-label="${escapeHtml(flyoutTitle)}" aria-hidden="true">
      <div class="hero-artists-flyout-header">
        <span class="hero-artists-flyout-title">${escapeHtml(flyoutTitle)}</span>
      </div>
      <div class="hero-artists-flyout-list" data-flyout-list></div>
    </div>
  `;
}

// Cheap helper: pick the smallest variant from the multi-format photo
// manifest, falling back to a plain string src when official-artists.js
// hasn't been upgraded yet.
function pickThumbSrc(photo) {
  if (!photo) return "";
  if (typeof photo === "string") return photo;
  if (typeof photo === "object") {
    return photo.jpg || photo.webp || photo.avif || photo.src || "";
  }
  return "";
}

let heroScrollTimer = null;
let suppressHeroScroll = false;

function wireHeroPager() {
  const pager = document.getElementById("hero-pager");
  const dots = document.getElementById("hero-dots");
  if (!pager) return;

  // Initial scroll position to currently-active stage
  // Hop the pager to its initial real-panel position synchronously so
  // the user never sees a flash of the cloneStart bookend before the
  // first frame. The offsetLeft read forces layout to settle first.
  scrollHeroToStage(activeStageFilter, true);

  pager.addEventListener("scroll", () => {
    if (suppressHeroScroll) return;
    clearTimeout(heroScrollTimer);
    // Live dot/bg tracking is handled by the global RAF loop on .reel scroll,
    // so this debounced handler is left to the heavy work only — flipping
    // activeStageFilter and re-rendering the artist sections below.
    heroScrollTimer = setTimeout(() => {
      const w = pager.clientWidth || 1;
      const idx = Math.round(Math.abs(pager.scrollLeft) / w);
      const child = pager.children[idx];
      // Read the stage off the child element (works for both real and
      // clone panels — they all carry data-stage). The settle handler
      // will independently jump clones back to their real twin.
      const stage = child?.dataset.stage;
      if (stage && stage !== activeStageFilter) {
        activeStageFilter = stage;
        // Swiping to a different hero panel collapses any flyout that
        // was left open on the previous panel.
        if (typeof closePillFlyouts === "function") closePillFlyouts();
        buildStageDropdown();
        rerenderArtistsBelowHero();
        if (typeof syncUrlFromActive === "function") syncUrlFromActive();
      }
      // is-on-main-hero is driven by computeIsOnMainHero() from the hero
      // pager RAF path + reel vertical scroll — no duplicate toggle here.
      // Restart the autoplay countdown on the new stage's dot so the
      // fill always rides on whichever pill the user is currently
      // looking at. Skip while the autoplay is paused (manual gesture).
      if (typeof startHeroAutoplay === "function" &&
          getCurrentSection()?.dataset.section === "hero") {
        startHeroAutoplay();
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
  // Find the REAL (non-clone) hero-panel matching this stage. Clones
  // carry the same data-stage but also have a data-clone attribute, so
  // we filter them out — scrolling to a clone would immediately wrap
  // back to the real twin and feel like a glitch.
  const target = Array.from(pager.children).find(
    c => c.dataset.stage === stageId && !c.dataset.clone
  );
  if (!target) return;
  suppressHeroScroll = true;
  // scrollTo with explicit offsetLeft is more reliable than scrollIntoView
  // when there are clone bookends in front of the target (some browsers
  // try to centre rather than left-align via scrollIntoView's inline:start).
  pager.scrollTo({ left: target.offsetLeft, behavior: instant ? "auto" : "smooth" });
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
  // Refresh the cached section list before any downstream consumer
  // (buildVerticalProgress, observeSections, observeArtistInitialScroll)
  // reads from it — the old refs were just detached above.
  refreshSectionCache();
  // Live-tracker cache may also hold detached artist refs.
  liveTrackingCache = null;
  buildVerticalProgress();
  observeSections();
  observeArtistInitialScroll();
  observeYTThumbs();
  // Re-attach the desktop wheel clamp to the freshly-rendered pagers so
  // trackpad gestures still resolve to one panel per gesture after a
  // filter change.
  for (let i = 0; i < cachedArtistSections.length; i++) {
    const p = cachedArtistSections[i].querySelector(".pager");
    if (p) installWheelClamp(p, "x");
  }
}

function multiHeroSection() {
  const real = HERO_STAGES.map(s => s.isMain ? heroPanelMain() : heroPanelStage(s));
  const realCount = real.length;
  // Tag each real panel with data-real-idx so the settle handler can
  // identify how far we've scrolled, then bookend with clones — same
  // infinite-loop pattern used by the per-artist pagers. cloneStart is
  // visually identical to the LAST real panel (so swiping LEFT off
  // Main shows Market and then wraps), cloneEnd matches the FIRST
  // real panel (swiping RIGHT off Market shows Main and wraps).
  const realTagged = real.map((html, i) => injectPanelAttrs(html, `data-real-idx="${i}"`));
  const cloneStart = injectPanelAttrs(real[realCount - 1], `data-clone="start" data-real-idx="${realCount - 1}"`);
  const cloneEnd   = injectPanelAttrs(real[0],             `data-clone="end" data-real-idx="0"`);
  const panels = cloneStart + realTagged.join("") + cloneEnd;
  const dots = HERO_STAGES.map((s, i) => `<button class="hero-dot ${activeStageFilter === s.id ? "active" : ""}" data-stage="${escapeHtml(s.id)}" aria-label="${escapeHtml(s.name)}"></button>`).join("");
  const autoplayToggle = `
    <button type="button" class="hero-autoplay-toggle" tabindex="-1">
      <svg class="hero-autoplay-ico hero-autoplay-ico--pause" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
        <rect x="2" y="2" width="3" height="8" rx="0.5" fill="currentColor"/>
        <rect x="7" y="2" width="3" height="8" rx="0.5" fill="currentColor"/>
      </svg>
      <svg class="hero-autoplay-ico hero-autoplay-ico--play" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
        <path d="M3 2v8l7-4-7-4z" fill="currentColor"/>
      </svg>
    </button>`;
  // The active hero panel sets the section's stage data attribute (used for bg tint)
  const activeStage = activeStageFilter === "all" ? "retro" : activeStageFilter;
  return `
    <section class="section section--multi-hero" data-section="hero" data-stage="${escapeHtml(activeStage)}" data-real-count="${realCount}">
      <div class="hero-pager" id="hero-pager" data-real-count="${realCount}">${panels}</div>
      ${heroSectionUfos()}
      <div class="hero-dots" id="hero-dots">${dots}${autoplayToggle}</div>
      <div class="hero-hint" id="hero-hint" aria-hidden="true"><span class="hero-hint-arrow">↓</span></div>
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
            ${countryToISO(tArtist(a, "country")) ? `<span class="artist-country-iso">${escapeHtml(countryToISO(tArtist(a, "country")))}</span>` : ""}
            <h1 class="artist-name">${escapeHtml(a.name)}</h1>
            <div class="artist-meta-line">
              ${a.age ? `<span class="meta-item">🎂 ${a.age}</span>` : ""}
              <span class="meta-item">${escapeHtml(a.role)}</span>
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

// In-memory cache of the favorites Set, synced with localStorage. The
// original getFavorites() ran localStorage.getItem + JSON.parse + a new
// Set allocation on every call — and isFavorite() (called once per
// rendered artist hero) called it directly. With ~85 artists per
// buildReel, that meant 85 localStorage reads + 85 JSON parses + 85
// Set allocations on every filter switch and language change. The
// cache makes those calls O(1) after first use. A storage event
// listener invalidates the cache if another tab edits the same key,
// so cross-tab edits still apply on the next read.
let _favoritesCache = null;
function getFavorites() {
  if (_favoritesCache) return _favoritesCache;
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    _favoritesCache = new Set(raw ? JSON.parse(raw) : []);
  } catch { _favoritesCache = new Set(); }
  return _favoritesCache;
}

function setFavorites(set) {
  _favoritesCache = set;
  try { localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...set])); } catch {}
}

if (typeof window !== "undefined" && window.addEventListener) {
  window.addEventListener("storage", e => {
    if (e.key === FAVORITES_STORAGE_KEY) _favoritesCache = null;
  });
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

// Hebrew letters in the Hebrew Unicode block — used for bidi on mixed
// "notable" ledes (English album line + Hebrew clause).
function textIncludesHebrew(s) {
  return typeof s === "string" && /[\u0590-\u05FF]/.test(s);
}

/** One-line notable lede: RTL whenever the copy contains Hebrew; LTR-only
 *  if it's all Latin. English-before-Hebrew gets an isolated LTR span so
 *  the Hebrew tail reads correctly after the star. */
function buildBioNotableLedeHtml(notableText) {
  if (!textIncludesHebrew(notableText)) {
    return `<p class="bio-notable-lede" dir="ltr">★ ${escapeHtml(notableText)}</p>`;
  }
  const idx = notableText.search(/[\u0590-\u05FF]/);
  const inner = idx <= 0
    ? escapeHtml(notableText)
    : `<span dir="ltr" class="bio-notable-embed">${escapeHtml(notableText.slice(0, idx))}</span>${escapeHtml(notableText.slice(idx))}`;
  return `<p class="bio-notable-lede" dir="rtl">★ ${inner}</p>`;
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
  // Rendered as plain dotted-underline text links — no buttons, no chrome —
  // separated by a soft middle dot. Inline with the section title.
  const linksHtml = links.length
    ? `
      <div class="info-section info-links-section">
        <h3 class="info-section-title">${escapeHtml(t("panel.moreLinks"))}</h3>
        <div class="links-inline">
          ${links.map(l => `<a class="link-text" href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.type)}</a>`).join('<span class="links-sep" aria-hidden="true">·</span>')}
        </div>
      </div>
    `
    : "";
  // Announced + representative — plain text on a single flex row. Side by
  // side on desktop (one anchored to each end of the row), stacked on
  // mobile. Old chip styling (`.info-meta` / `.info-rep` boxes) is gone —
  // these are now just lightweight one-liners that don't dominate the card.
  // Emojis are inline with the text (single space separator) so the row
  // renders identically whether it wraps to one or two lines.
  const repText = a.representedBy ? `🎧 ${escapeHtml(a.representedBy)}` : "";
  const announcedText = a.announcedAt
    ? `${escapeHtml(t("announced.prefix"))}${escapeHtml(formatAnnouncedDate(a.announcedAt))}`
    : "";
  const metaRowHtml = (announcedText || repText)
    ? `
      <div class="info-meta-row">
        ${announcedText ? `<span class="info-meta-text">${announcedText}</span>` : ""}
        ${repText ? `<span class="info-rep-text">${repText}</span>` : ""}
      </div>
    `
    : "";
  const bioText = tArtist(a, "bio");
  const notableText = tArtist(a, "notable");
  // "Notable" sits as a small bold lede ABOVE the bio paragraph — not a
  // chip, just a one-line summary so the user sees the headline-fact for
  // this artist before reading the full bio.
  // Bio paragraph. `dir` is set from the UI language so the bio-text's
  // scrollbar lands on the side that matches the user's reading
  // direction — left for Hebrew, right for EN/PT. Box `direction` follows
  // the `dir` attribute and the scrollbar position follows the box.
  const bioDir = currentLang === "he" ? "rtl" : "ltr";
  const bioHtml = bioText
    ? `
      <div class="info-section">
        <h3 class="info-section-title">${escapeHtml(t("panel.bio"))}</h3>
        <p class="bio-text" dir="${bioDir}">${escapeHtml(bioText)}</p>
      </div>
    `
    : "";
  // Notable lede now lives BELOW the meta-row and ABOVE the bio section,
  // not inside it. The user reads it as a small grey caption (`Cofundador
  // da Wagon Repair…`) separate from the biography paragraph proper.
  const notableLedeHtml = notableText ? buildBioNotableLedeHtml(notableText) : "";
  return `
    <div class="panel panel--info">
      <div class="panel-inner">
        <div class="panel-eyebrow has-artist">
          <span class="eyebrow-section">${escapeHtml(t("panel.about"))}</span>
          <span class="eyebrow-artist">${escapeHtml(a.name)}</span>
        </div>
        <div class="bio-card">
          ${metaRowHtml}
          ${notableLedeHtml}
          ${bioHtml}
          ${streamingHtml}
          ${linksHtml}
        </div>
      </div>
    </div>
  `;
}

// Detect collaborator names inside an album's `project` string and turn
// them into clickable links if those collaborators have their own
// section in the lineup. Recognised forms:
//   "(with X)"            → link X
//   "with X"              → link X
//   "vs X"                → link X
//   "as X"                → link X (alias attribution)
//   "feat. X" / "feat X"  → link X
//   "X & Y"               → link both names if found
// `selfId` is the artist whose discography we're rendering — we never
// link a project string back to the same artist.
// Lazily-built index of every artist's lowercase name + officialName + the
// first word of each. linkifyCollaborators used to ARTISTS.find() inside
// the regex-match loop, calling .toLowerCase() three times per artist on
// every probe. With ~85 artists and ~150 collaboration project strings,
// every buildReel walked tens of thousands of strings for nothing the
// data couldn't precompute once. Map.get is O(1); first insertion wins,
// which preserves the original "first ARTIST that matches" ordering.
let _collabLookup = null;
function getCollabLookup() {
  if (_collabLookup) return _collabLookup;
  const map = new Map();
  if (typeof ARTISTS !== "undefined" && ARTISTS) {
    for (const a of ARTISTS) {
      if (!a) continue;
      const add = (str) => {
        if (!str) return;
        const lc = str.toLowerCase();
        if (!map.has(lc)) map.set(lc, a.id);
        // The old code's `name.startsWith(candidate + " ")` test let the
        // candidate be any whitespace-bounded prefix of the full name, not
        // just the first word. Index every such prefix so a project string
        // like "with Astrix Live" still resolves when the artist record is
        // "Astrix Live Project".
        let i = lc.indexOf(" ");
        while (i > 0) {
          const prefix = lc.slice(0, i);
          if (!map.has(prefix)) map.set(prefix, a.id);
          i = lc.indexOf(" ", i + 1);
        }
      };
      add(a.name);
      add(a.officialName);
    }
  }
  _collabLookup = map;
  return map;
}

function linkifyCollaborators(projectStr, selfId) {
  if (!projectStr) return "";
  // Normalise to a working copy we'll surgically wrap, then escape the
  // remainder. We do the matching on the raw text and do all HTML
  // escaping ourselves so the wrapped <a> isn't double-escaped.
  const NAME_RE = /(?:\(\s*with\s+|with\s+|vs\.?\s+|as\s+|feat\.?\s+|&\s+|\+\s+|b2b\s+)([A-Z][\p{L}\p{M}\d.\-' ]{2,40}?)(?=\s*[\),/&+]|\s+\(|\s*$)/giu;
  const lookup = getCollabLookup();
  const matches = [];
  let m;
  while ((m = NAME_RE.exec(projectStr)) !== null) {
    const candidate = m[1].trim().replace(/\s+/g, " ");
    if (!candidate) continue;
    const id = lookup.get(candidate.toLowerCase());
    if (id && id !== selfId) {
      const start = m.index + m[0].lastIndexOf(candidate);
      matches.push({ start, length: candidate.length, name: candidate, id });
    }
  }
  if (!matches.length) return escapeHtml(projectStr);
  // Walk the source string left-to-right, escaping the gaps and wrapping
  // matched names in <a data-collab="...">. Matches don't overlap because
  // the regex uses lookaheads; sort defensively just in case.
  matches.sort((x, y) => x.start - y.start);
  let out = "";
  let i = 0;
  for (const mt of matches) {
    if (mt.start < i) continue; // overlap guard
    out += escapeHtml(projectStr.slice(i, mt.start));
    out += `<a class="collab-link" href="#" data-collab="${escapeHtml(mt.id)}">${escapeHtml(mt.name)}</a>`;
    i = mt.start + mt.length;
  }
  out += escapeHtml(projectStr.slice(i));
  return out;
}

function panelAlbums(a) {
  const eyebrow = (label) => `
    <div class="panel-eyebrow has-artist">
      <span class="eyebrow-section">${escapeHtml(label)}</span>
      <span class="eyebrow-artist">${escapeHtml(a.name)}</span>
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
      <span class="album-meta">${al.project ? linkifyCollaborators(al.project, a.id) + " · " : ""}${escapeHtml(String(al.year))}</span>
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
      <span class="eyebrow-section">${escapeHtml(label)}</span>
      <span class="eyebrow-artist">${escapeHtml(a.name)}</span>
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
  const playLabel = t("tracks.play");
  const cards = sortedTracks.map((track, i) => {
    const vid = escapeHtml(track.id);
    // Defer the i.ytimg.com fetch until the artist section enters
    // viewport proximity. The site has 89 artists × ~5 tracks each, so
    // an eager <img> fires hundreds of requests at once on first paint
    // and the browser queues most of them — making the previews appear
    // missing for a long while. upgradeYTThumbs() (below) swaps
    // data-yt-thumb → src as each section gets close to view.
    return `
    <div class="track-card ${track.zna ? "is-zna" : ""}">
      <button class="track-thumb" data-vid="${vid}" data-title="${escapeHtml(track.title)}" data-artist="${escapeHtml(a.name)}" aria-label="${escapeHtml(playLabel)} ${escapeHtml(track.title)}">
        <img class="track-thumb-img" loading="lazy" decoding="async" fetchpriority="low" alt=""
             data-yt-thumb="${vid}"
             onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='https://i.ytimg.com/vi/${vid}/default.jpg';}else{this.style.display='none';}" />
        <span class="play-btn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </span>
      </button>
      <div class="track-meta">
        <span class="track-title">${escapeHtml(track.title)}</span>
        <span class="track-year">${escapeHtml(String(track.year || ""))}</span>
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
  // Matches both the per-artist `<div class="panel …">` and the
  // multi-hero `<div class="hero-panel …">` opening tag. Used by
  // both the artist carousel and the hero pager to add data-real-idx
  // and data-clone="start|end" to each panel for the wrap settle.
  return html.replace(/<div\s+(class="(?:panel|hero-panel))/, `<div ${attrs} $1`);
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
  const panelAriaLabel = t("panel.ariaPanelN");
  const dots = real.map((_, i) => `<button class="dot ${i === 0 ? "active" : ""}" data-panel="${i}" aria-label="${escapeHtml(panelAriaLabel)} ${i + 1}"></button>`).join("");
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
  // Per-pager momentum gate: same shape as the reel-level wheel router —
  // 140ms quiet timer + 350ms hard min-lock so a trackpad fling can never
  // resolve to two pages, while a deliberate second swipe after a real
  // pause goes through immediately.
  let inMomentum = false;
  let quietTimer = null;
  let hardLockUntil = 0;
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
    clearTimeout(quietTimer);
    quietTimer = setTimeout(() => { inMomentum = false; }, 140);
    if (now < hardLockUntil) return;
    if (inMomentum) return;
    const w = axis === "y" ? container.clientHeight : container.clientWidth;
    if (!w) return;
    const pos = axis === "y" ? container.scrollTop : container.scrollLeft;
    const sign = primary > 0 ? 1 : -1;
    const maxIdx = Math.max(0, Math.round((axis === "y" ? container.scrollHeight : container.scrollWidth) / w) - 1);
    const targetIdx = Math.max(0, Math.min(maxIdx, Math.round(pos / w) + sign));
    const target = targetIdx * w;
    container.scrollTo({ [axis === "y" ? "top" : "left"]: target, behavior: "smooth" });
    inMomentum = true;
    hardLockUntil = now + 350;
  }, { passive: false });
}

function buildReel() {
  // Single multi-panel hero at the top, then artist sections of the
  // currently-active stage filter below it.
  const heroHtml = multiHeroSection();
  const list = getFilteredArtists();
  const artistsHtml = renderArtistSections(list);
  reel.innerHTML = heroHtml + artistsHtml;
  // The live-tracker cache holds direct DOM refs that are now detached.
  // Drop it so the next swipe rebuilds it against the freshly-rendered DOM.
  liveTrackingCache = null;
  // UFO node cache is also pointing at detached nodes — drop it so the
  // next updateUfoTransformsForPager rebuilds against the new section.
  _ufoCachedSection = null;
  _ufoCachedNodes   = null;
  refreshSectionCache();
  wireHeroPager();
  // Apply initial UFO transforms so the 2 offscreen UFOs for the
  // current stage start out of frame on first paint, not at (0, 0).
  requestAnimationFrame(() => {
    const pager = document.getElementById("hero-pager");
    if (pager) updateUfoTransformsForPager(pager);
  });
  if (typeof syncHeroAutoplayToggleUI === "function") syncHeroAutoplayToggleUI();
  installSnapClamp(reel, "y");
  installSnapClamp(document.getElementById("hero-pager"), "x");
  // Desktop trackpad: clamp horizontal wheel/swipe on the hero pager too,
  // so one fling = one stage. Without this, momentum from a single trackpad
  // swipe could blow past two stage panels on macOS.
  installWheelClamp(document.getElementById("hero-pager"), "x");
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

  // The first reel is on screen — fade out the boot loader. Subsequent
  // calls (filter changes, language switches) re-run buildReel but the
  // loader is already gone, so this is a no-op.
  hideBootLoader();
}

let _bootLoaderHidden = false;
function hideBootLoader() {
  if (_bootLoaderHidden) return;
  _bootLoaderHidden = true;
  const el = document.getElementById("boot-loader");
  if (!el) return;
  // Wait one frame so the freshly-rendered reel paints under the loader
  // before we start fading it — avoids a flash of empty bg.
  requestAnimationFrame(() => {
    el.classList.add("is-fading");
    setTimeout(() => el.remove(), 400);
  });
}

// Safety net: if buildReel throws or some asset stalls (e.g. SW
// claiming the page mid-init on a flaky network), hide the loader
// after 6s anyway so the user is never staring at a stuck spinner.
// 6s is well past the longest legitimate cold-boot we've seen on a
// 3G phone. The flag guard above means this is a no-op if buildReel
// already removed the loader normally.
setTimeout(() => hideBootLoader(), 6000);

// Live dot tracking: a continuous RAF loop polls scrollLeft on whichever
// pager is currently being interacted with, so the active dot updates
// frame-by-frame as the user swipes — not just when scroll events happen
// to fire (iOS Safari batches them during momentum scroll, which is why
// the old code felt like the dot only updated AFTER a swipe finished).
// Module-level cache of the reel's .section list. Rebuilt by
// refreshSectionCache() whenever buildReel() swaps in fresh DOM (the only
// place we mutate reel.innerHTML). Several hot paths used to re-run
// `reel.querySelectorAll(".section")` per event — including the four
// document-level autoplay-pause listeners (pointerdown / touchstart /
// wheel / keydown), each of which fires many times per second during any
// gesture.
let cachedSections = [];
// Artist-only subset of cachedSections, kept in sync. Used by hot paths
// that reset every other pager whenever the active section changes
// (setActiveSection) and by observeArtistInitialScroll.
let cachedArtistSections = [];
function refreshSectionCache() {
  if (!reel) { cachedSections = []; cachedArtistSections = []; return; }
  cachedSections = Array.from(reel.querySelectorAll(".section"));
  cachedArtistSections = cachedSections.filter(s => s.dataset.section === "artist");
}
// Vertical-progress dots are emitted by buildVerticalProgress (one per
// section). setActiveSection used to re-querySelectorAll them on every
// section change.
let cachedVDots = [];
function refreshVDotCache() {
  cachedVDots = verticalProgress ? Array.from(verticalProgress.querySelectorAll(".v-dot")) : [];
}

const pagerSettleTimers = new WeakMap();
const pagersBeingWrapped = new WeakSet();
const supportsScrollend = "onscrollend" in window;
let liveTrackingPager = null;
let liveTrackingRaf = null;
let liveTrackingStopTimer = null;
// Per-pager cache for the RAF live-tracker. The hot path runs at 60-120fps
// during every horizontal swipe, so re-running querySelectorAll for the dot
// strip + reel.querySelector for the hero section every frame burned a real
// amount of CPU on mid-tier Android. The cache is keyed by pager identity:
// when buildReel re-renders, the new pager is a different object and the
// stale cache is dropped automatically on the next call.
let liveTrackingCache = null;

function getPagerCache(pager) {
  if (liveTrackingCache && liveTrackingCache.pager === pager && pager.isConnected) {
    return liveTrackingCache;
  }
  if (pager.classList.contains("hero-pager")) {
    const dotsEl = document.getElementById("hero-dots");
    liveTrackingCache = {
      pager,
      kind: "hero",
      dotEls: dotsEl ? Array.from(dotsEl.querySelectorAll(".hero-dot")) : [],
      heroSec: reel.querySelector('[data-section="hero"]'),
      lastStage: null,
    };
  } else {
    const section = pager.closest('[data-section="artist"]');
    liveTrackingCache = {
      pager,
      kind: "artist",
      section,
      dotEls: section ? Array.from(section.querySelectorAll(".dot")) : [],
      lastRealIdx: -1,
    };
  }
  return liveTrackingCache;
}

function applyDotsForPager(pager) {
  if (!pager || !pager.isConnected) return;
  const cache = getPagerCache(pager);

  // Hero pager: same live-tracking treatment as the artist pagers — a RAF
  // loop polls scrollLeft and we update the active stage dot + bg tint
  // every frame, so the dot keeps up with the finger. The HEAVY work
  // (activeStageFilter mutation + rerendering artist sections) still
  // debounces in wireHeroPager so the rerender doesn't fire mid-flick.
  if (cache.kind === "hero") {
    const wH = pager.clientWidth || 1;
    const slH = Math.abs(pager.scrollLeft);
    const idxH = Math.floor((slH + wH * 0.3) / wH);
    // Read stage off the child's data-stage so clone bookends (which
    // carry the same data-stage as their real twin) still update the
    // active dot during a wrap-around swipe — without it the dot would
    // briefly go dark while the user is on the clone.
    const child = pager.children[idxH];
    const stage = child?.dataset.stage;
    if (!stage) return;
    if (stage === cache.lastStage) return;
    cache.lastStage = stage;
    const dotEls = cache.dotEls;
    for (let i = 0; i < dotEls.length; i++) {
      dotEls[i].classList.toggle("active", dotEls[i].dataset.stage === stage);
    }
    if (stageColor[stage]) bgScene.style.background = stageColor[stage];
    if (cache.heroSec) cache.heroSec.dataset.stage = stage;
    // Snap the top-bar stage-dropdown trigger label to the new stage
    // immediately (frame-by-frame, same cadence as the hero dots). The
    // heavy work — flipping activeStageFilter and re-rendering the
    // artist sections below — still debounces in wireHeroPager so we
    // don't thrash the DOM mid-flick.
    if (stageSelectLabel && stageSelectLabel.textContent !== stageLabel(stage)) {
      stageSelectLabel.textContent = stageLabel(stage);
    }
    // Header logo duplicate: hide only on Main hero — same instant cadence
    // as the dots (RAF), not the 160ms debounce below nor the section IO.
    document.body.classList.toggle("is-on-main-hero", computeIsOnMainHero());
    return;
  }

  const section = cache.section;
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
  if (realIdx === cache.lastRealIdx) return;
  cache.lastRealIdx = realIdx;
  const dotEls = cache.dotEls;
  for (let i = 0; i < dotEls.length; i++) {
    dotEls[i].classList.toggle("active", i === realIdx);
  }
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
    // Sync UFO transforms to scroll position so the in/out slide of
    // the 2 offscreen UFOs (and the small drift of the 3 onscreen
    // ones) tracks the finger 1:1, not a delayed settle.
    if (liveTrackingPager === document.getElementById("hero-pager")) {
      updateUfoTransformsForPager(liveTrackingPager);
    }
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
    liveTrackingCache = null;
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
  if (pager === document.getElementById("hero-pager")) {
    updateUfoTransformsForPager(pager);
  }
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
  // realCount comes off the pager itself so this works for any
  // looping pager — the artist carousel AND the multi-hero pager
  // (both render with a data-real-count attribute and bookended
  // clones).
  const realCount = +(pager.dataset.realCount) || (pager.children.length - 2);
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
    if (strip.id === "hero-dots" && typeof syncHeroAutoplayToggleUI === "function") {
      syncHeroAutoplayToggleUI();
    }
    // The vertical strip auto-hides on idle. Once the arm TTL expires,
    // hand control back to the idle countdown so it can fade out again.
    if (strip.classList.contains("vertical-progress") && typeof showVDots === "function") {
      showVDots();
    }
  }, DOT_ARMED_TTL));
  if (strip.id === "hero-dots" && typeof syncHeroAutoplayToggleUI === "function") {
    syncHeroAutoplayToggleUI();
  }
}

function disarmAllDots(except) {
  document.querySelectorAll(".dots.is-armed, .hero-dots.is-armed").forEach(strip => {
    if (strip === except) return;
    strip.classList.remove("is-armed");
    clearDotMagnify(strip);
    const t = dotArmTimers.get(strip);
    if (t) { clearTimeout(t); dotArmTimers.delete(strip); }
  });
  if (typeof syncHeroAutoplayToggleUI === "function") syncHeroAutoplayToggleUI();
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
  if (!strip || (!strip.classList.contains("is-armed") && !strip.classList.contains("is-hovered"))) {
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
    cachedSections[idx]?.scrollIntoView({ behavior: "smooth" });
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
  if (e.target.closest(".hero-autoplay-toggle")) {
    toggleHeroAutoplayUserControl();
    return;
  }
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

// Live magnification: as the pointer moves over the strip, bump the
// nearest dot. On desktop (mouse pointer) the strip is treated as hovered
// — the strip reveals + magnifies without needing the user to click first,
// and the magnification follows the cursor's X coordinate (not just when
// the cursor lands directly on a dot pixel). Mobile/touch keeps the
// previous "tap to arm" flow.
document.addEventListener("pointermove", e => {
  const strip = e.target.closest?.(DOT_STRIP_SELECTOR);
  if (!strip) return;
  // Auto-hover treatment for ALL dot strips on desktop — including the
  // vertical progress strip. The vertical strip has a wide invisible
  // approach zone (.vertical-progress::before in CSS), so cursor enters
  // the strip's hit area as it gets near, not only when it lands on a
  // dot. While hovered, we cancel any pending relax/auto-hide timer so
  // the strip stays revealed under the cursor.
  const isHover = e.pointerType === "mouse";
  if (isHover) {
    if (!strip.classList.contains("is-hovered")) {
      strip.classList.add("is-hovered");
      if (strip.id === "hero-dots" && typeof syncHeroAutoplayToggleUI === "function") {
        syncHeroAutoplayToggleUI();
      }
      // The vertical strip auto-hides on idle; force its showVDots path
      // so the hidden/idle classes drop while the cursor is near.
      if (strip.classList.contains("vertical-progress") && typeof showVDots === "function") {
        showVDots();
      }
    }
    const t = dotArmTimers.get(strip);
    if (t) { clearTimeout(t); dotArmTimers.delete(strip); }
    updateDotMagnify(strip, e.clientX, e.clientY);
    return;
  }
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

// Pointer leaves a strip (or lifts off): relax the magnification. On
// desktop, also drop the hovered state so the strip can fade back to
// its compact form. The armed state still runs its 2s TTL independently.
document.addEventListener("pointerout", e => {
  const strip = e.target.closest?.(DOT_STRIP_SELECTOR);
  if (!strip) return;
  // Only clear when the pointer truly left the strip, not just moved to a
  // descendant (e.g. from padding into a dot button).
  if (e.relatedTarget && strip.contains(e.relatedTarget)) return;
  clearDotMagnify(strip);
  if (e.pointerType === "mouse") {
    strip.classList.remove("is-hovered");
    if (strip.id === "hero-dots" && typeof syncHeroAutoplayToggleUI === "function") {
      syncHeroAutoplayToggleUI();
    }
    // Vertical strip can fade itself back out via the normal idle timer
    // once the cursor leaves the approach zone.
    if (strip.classList.contains("vertical-progress") && typeof showVDots === "function") {
      showVDots();
    }
  }
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
  const items = cachedSections.map((s, i) => {
    let label;
    if (s.dataset.section === "hero") {
      label = t("nav.backHome");
    } else {
      const id = s.dataset.artistId;
      const artist = id ? ARTISTS.find(a => a.id === id) : null;
      label = artist?.name || id || "";
    }
    return `<button class="v-dot ${i === 0 ? "active" : ""}" data-vidx="${i}" aria-label="${escapeHtml(label)}"></button>`;
  });
  verticalProgress.innerHTML = items.join("");
  refreshVDotCache();
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

  const sections = cachedSections;
  const idx = sections.indexOf(section);

  // Mark active section (drives entry animation)
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.toggle("is-active", sections[i] === section);
  }

  // Vertical dots
  for (let i = 0; i < cachedVDots.length; i++) {
    cachedVDots[i].classList.toggle("active", i === idx);
  }

  // Hide vertical dots while we are on a hero section OR on any non-first
  // panel of an artist. With the carousel pattern, scroll-position index 1
  // is the real Hero (index 0 is cloneStart), so we have to read data-real-idx
  // off the visible panel — otherwise just-arrived sections look like
  // panelIdx=1 which would always be flagged "non-hero".
  const isHero = section.dataset.section === "hero";
  document.body.classList.toggle("is-on-hero", isHero);
  // Main-hero chrome (hide duplicate header logo) follows layout + hero
  // pager scroll — updates immediately on horizontal swipe / vertical scroll,
  // not only when IntersectionObserver crosses 0.6 or activeStageFilter debounce.
  document.body.classList.toggle("is-on-main-hero", computeIsOnMainHero());
  const pager = section.querySelector(".pager");
  // Compute realIdx after any anchoring scrollTo below — defer to a single
  // pass at the end of setActiveSection.

  // Reset every other artist section's pager back to its real first panel
  // (scrollIdx=1 with the carousel layout, since scrollIdx=0 is cloneStart =
  // discography clone). That way, vertical navigation always lands the user
  // on the next/previous artist's main hero card, never mid-panel and never
  // on a clone that looks like discography.
  for (let i = 0; i < cachedArtistSections.length; i++) {
    const s = cachedArtistSections[i];
    if (s === section) continue;
    const p = s.querySelector(".pager");
    if (!p) continue;
    const realFirst = p.children[1];
    if (realFirst && Math.abs(p.scrollLeft - realFirst.offsetLeft) > 4) {
      p.scrollTo({ left: realFirst.offsetLeft, behavior: "auto" });
    }
    // Make sure the init flag is set so the heroInitObserver doesn't override.
    s.dataset.scrollInit = "1";
  }
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

  // Apple-TV-style auto-advance: while the user is on the multi-hero
  // section, the currently-active stage dot fills up with the accent
  // colour over HERO_AUTOPLAY_MS, then the pager auto-advances to the
  // next stage. Pauses the moment the user touches/swipes/clicks/scrolls.
  if (section.dataset.section === "hero") {
    startHeroAutoplay();
  } else {
    stopHeroAutoplay();
  }

  // Keep the URL in sync so the current view is always shareable.
  if (typeof syncUrlFromActive === "function") syncUrlFromActive();
}

// ===== Apple-TV-style auto-advance =====
// While the user is on the multi-hero section, the currently-active stage
// dot fills with the accent colour over HERO_AUTOPLAY_MS, then the pager
// auto-advances to the next stage. Once the user touches anything that
// looks like a navigation gesture (pointer/wheel/key) the autoplay
// pauses for HERO_AUTOPLAY_PAUSE_MS before resuming.
const HERO_AUTOPLAY_MS       = 7000; // fill duration per stage
const HERO_AUTOPLAY_PAUSE_MS = 4500; // pause after a manual interaction
let heroAutoplayRaf = null;
let heroAutoplayStartedAt = 0;
let heroAutoplayDot = null;
let heroAutoplayResumeTimer = null;
let heroAutoplayPaused = false;
/** When true, the user explicitly turned off auto-advance via the hero-dots toggle — no timer resume. */
let heroAutoplayUserSuspended = false;

function syncHeroAutoplayToggleUI() {
  const strip = document.getElementById("hero-dots");
  const btn = strip?.querySelector(".hero-autoplay-toggle");
  if (!strip || !btn) return;
  strip.classList.toggle("autoplay-user-off", heroAutoplayUserSuspended);
  const label = heroAutoplayUserSuspended ? t("hero.autoplayResume") : t("hero.autoplayPause");
  btn.setAttribute("aria-label", label);
  btn.title = label;
  btn.tabIndex = strip.classList.contains("is-armed") || strip.classList.contains("is-hovered") ? 0 : -1;
}

function toggleHeroAutoplayUserControl() {
  heroAutoplayUserSuspended = !heroAutoplayUserSuspended;
  clearTimeout(heroAutoplayResumeTimer);
  heroAutoplayResumeTimer = null;
  heroAutoplayPaused = false;
  if (heroAutoplayUserSuspended) {
    stopHeroAutoplay();
  } else if (getCurrentSection()?.dataset.section === "hero") {
    startHeroAutoplay();
  }
  syncHeroAutoplayToggleUI();
}

function startHeroAutoplay() {
  stopHeroAutoplay();
  if (heroAutoplayUserSuspended) return;
  if (heroAutoplayPaused) return; // resume timer will call us back
  const dots = document.getElementById("hero-dots");
  if (!dots) return;
  const active = dots.querySelector(".hero-dot.active");
  if (!active) return;
  heroAutoplayDot = active;
  heroAutoplayDot.classList.add("is-filling");
  heroAutoplayDot.style.setProperty("--fill", "0%");
  heroAutoplayStartedAt = performance.now();
  const tick = (now) => {
    if (!heroAutoplayDot || !heroAutoplayDot.isConnected) {
      heroAutoplayRaf = null;
      return;
    }
    const pct = Math.min(100, ((now - heroAutoplayStartedAt) / HERO_AUTOPLAY_MS) * 100);
    heroAutoplayDot.style.setProperty("--fill", pct.toFixed(1) + "%");
    if (pct >= 100) {
      heroAutoplayRaf = null;
      advanceHeroAutoplay();
      return;
    }
    heroAutoplayRaf = requestAnimationFrame(tick);
  };
  heroAutoplayRaf = requestAnimationFrame(tick);
}

function stopHeroAutoplay() {
  if (heroAutoplayRaf) cancelAnimationFrame(heroAutoplayRaf);
  heroAutoplayRaf = null;
  if (heroAutoplayDot) {
    heroAutoplayDot.classList.remove("is-filling");
    heroAutoplayDot.style.removeProperty("--fill");
  }
  heroAutoplayDot = null;
}

function advanceHeroAutoplay() {
  const heroPager = document.getElementById("hero-pager");
  if (!heroPager) return;
  const w = heroPager.clientWidth || 1;
  const cur = Math.round(Math.abs(heroPager.scrollLeft) / w);
  // Step exactly one panel right. If `cur+1` lands on the cloneEnd
  // bookend (visually identical to real Main), the settle handler
  // (handlePagerSettle) instant-jumps to real Main — the user just
  // sees the autoplay loop seamlessly back to the first stage.
  const nextEl = heroPager.children[cur + 1];
  if (!nextEl) return;
  heroPager.scrollTo({ left: nextEl.offsetLeft, behavior: "smooth" });
}

function pauseHeroAutoplay() {
  if (heroAutoplayUserSuspended) {
    stopHeroAutoplay();
    return;
  }
  stopHeroAutoplay();
  heroAutoplayPaused = true;
  clearTimeout(heroAutoplayResumeTimer);
  heroAutoplayResumeTimer = setTimeout(() => {
    heroAutoplayPaused = false;
    // While the artists flyout is open the stage rotation must stay
    // frozen — the user is reading a scoped list and a sideways swipe
    // would yank them off it. Skip the resume; closePillFlyouts() will
    // restart the autoplay when the user dismisses the panel.
    if (document.querySelector(".hero-stack.pill-expanded")) return;
    if (getCurrentSection()?.dataset.section === "hero") {
      startHeroAutoplay();
    }
  }, HERO_AUTOPLAY_PAUSE_MS);
}

// Any user-driven navigation gesture pauses the autoplay clock so the
// fill doesn't keep racing while the user is reading / interacting. One
// shared handler covers all four event types (was four near-identical
// listeners, each doing its own getCurrentSection() walk on every fire).
// Touch/pointer on the .hero-autoplay-toggle is exempt — that button IS
// the user controlling autoplay, so it shouldn't also pause it as a
// side effect.
function maybePauseHeroAutoplay(e) {
  if (getCurrentSection()?.dataset.section !== "hero") return;
  const t = e?.type;
  if ((t === "pointerdown" || t === "touchstart") && e.target?.closest?.(".hero-autoplay-toggle")) {
    return;
  }
  pauseHeroAutoplay();
}
document.addEventListener("pointerdown", maybePauseHeroAutoplay, { passive: true });
document.addEventListener("touchstart", maybePauseHeroAutoplay, { passive: true });
document.addEventListener("wheel", maybePauseHeroAutoplay, { passive: true });
document.addEventListener("keydown", maybePauseHeroAutoplay, { passive: true });

let currentObserver = null;

function observeSections() {
  if (currentObserver) currentObserver.disconnect();
  const sections = cachedSections;
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
  const sections = cachedSections;
  if (!sections.length) return null;
  const reelTop = reel.scrollTop;
  // Hot path: invoked by the four document-level autoplay-pause listeners
  // (pointerdown / touchstart / wheel / keydown) on every gesture.
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].offsetTop >= reelTop - 10) return sections[i];
  }
  return sections[sections.length - 1] || null;
}

/** True when the Main (all-stages) hero panel is the one in view — drives top-bar logo visibility. */
function computeIsOnMainHero() {
  if (!reel || !cachedSections.length) return false;
  const vh = reel.clientHeight || 1;
  let idx = Math.floor(reel.scrollTop / vh + 0.45);
  idx = Math.max(0, Math.min(cachedSections.length - 1, idx));
  if (cachedSections[idx].dataset.section !== "hero") return false;
  const heroPager = document.getElementById("hero-pager");
  if (!heroPager) return false;
  const w = heroPager.clientWidth || 1;
  const sl = Math.abs(heroPager.scrollLeft);
  const idxH = Math.floor((sl + w * 0.3) / w);
  return heroPager.children[idxH]?.dataset.stage === "all";
}

function navVertical(dir) {
  const sections = cachedSections;
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

  // When the touch starts inside the bio area, pull-to-navigate must NEVER
  // fire — the user is reading the bio. Vertical swipes there scroll the
  // bio (when there's overflow) and otherwise do nothing; they must never
  // navigate to the previous/next artist. Two regions count as "bio area":
  //   1. The .bio-text paragraph itself.
  //   2. The wrapping .info-section that holds the Biography <h3> + bio —
  //      a tap on the heading is still inside the reading area.
  // When `isBioArea` is true but bio-text isn't currently overflowing, the
  // gesture is intentionally swallowed (no inner scroll AND no pull-to-nav).
  let innerScrollable = null;
  let isBioArea = false;
  function getBioAreaScrollable(target) {
    if (!target?.closest) return null;
    const direct = target.closest(".bio-text");
    if (direct && direct !== panel) return direct;
    const section = target.closest(".info-section");
    if (section) {
      const bio = section.querySelector(":scope > .bio-text");
      if (bio) return bio;
    }
    return null;
  }
  function findInnerScrollable(target) {
    const bio = getBioAreaScrollable(target);
    if (!bio) return null;
    // Only return the bio element as innerScrollable if it actually has
    // room to scroll right now — otherwise the touchmove handler still
    // checks `isBioArea` and swallows the gesture without scrolling.
    if (bio.scrollHeight > bio.clientHeight + 1) return bio;
    return null;
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
    innerScrollable = findInnerScrollable(e.target);
    isBioArea = !!getBioAreaScrollable(e.target);
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
      // Bio area: the gesture is for the bio, period. If bio-text can
      // scroll we defer to it (inner scroll wins); if it can't we still
      // swallow the gesture so pull-to-navigate never fires from inside
      // the reading area — the artist-to-artist nav must not be reachable
      // by swiping over the biography.
      if (isBioArea) return;
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
  // Hero section: drive the hero-pager with the same physical
  // child-step logic the artist carousel uses, so keyboard arrows
  // (and any other caller of navHorizontal) get the same infinite
  // loop as touch/wheel — landing on the cloneStart/cloneEnd
  // bookend triggers the settle handler, which instant-jumps back
  // to the matching real twin and the user keeps cycling forever.
  if (current.dataset.section === "hero") {
    const heroPager = document.getElementById("hero-pager");
    if (!heroPager || !heroPager.children.length) return;
    const w = heroPager.clientWidth || 1;
    const cur = Math.round(Math.abs(heroPager.scrollLeft) / w);
    const next = cur + dir;
    if (next < 0 || next >= heroPager.children.length) return;
    const target = heroPager.children[next];
    if (target) {
      heroPager.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
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
  for (let i = 0; i < cachedArtistSections.length; i++) {
    const s = cachedArtistSections[i];
    if (s.dataset.scrollInit !== "1") heroInitObserver.observe(s);
  }
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
    for (let i = 0; i < cachedArtistSections.length; i++) upgradeYTThumbs(cachedArtistSections[i]);
    return;
  }
  for (let i = 0; i < cachedArtistSections.length; i++) {
    const s = cachedArtistSections[i];
    if (s.dataset.ytThumbsUpgraded !== "1") ytThumbObserver.observe(s);
  }
}

// Flash a single arrow-key tile in the bottom-right hint cluster so the
// user sees a visual ack on every keypress. The .is-pressed class is
// removed shortly after so the flash reads as a tap.
function flashKbHintKey(which) {
  const el = document.querySelector(`.kb-key[data-key="${which}"]`);
  if (!el) return;
  el.classList.add("is-pressed");
  clearTimeout(el._flashTimer);
  el._flashTimer = setTimeout(() => el.classList.remove("is-pressed"), 220);
}

document.addEventListener("keydown", e => {
  // ArrowDown / ArrowUp -> next/prev artist
  if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); navVertical(1); flashKbHintKey("down"); }
  else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); navVertical(-1); flashKbHintKey("up"); }
  // LTR layout: ArrowRight = next, ArrowLeft = prev
  else if (e.key === "ArrowRight") { e.preventDefault(); navHorizontal(1); flashKbHintKey("right"); }
  else if (e.key === "ArrowLeft") { e.preventDefault(); navHorizontal(-1); flashKbHintKey("left"); }
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
let wheelInMomentum = false;
let wheelAccumY = 0;
let wheelQuietTimer = null;
let wheelHardLockUntil = 0;

// Walk up from `start` looking for a scrollable ancestor that can still
// consume scroll in the requested direction (deltaY > 0 → downward;
// < 0 → upward). Used to keep the reel-level wheel router from hijacking
// scroll that the bio-text (or any panel) is still able to absorb.
//
// Inside the reel, only `.bio-text` and `.panel` have overflow-y:auto
// (verified against styles.css). closest() jumps straight to the nearest
// match instead of walking each parent through window.getComputedStyle —
// the old code paid for a style recalc on every ancestor on every wheel
// tick, which on desktop trackpads is ~30-60 times per gesture.
const SCROLLABLE_ANCESTOR_SELECTOR = ".bio-text, .panel";
function findScrollableAncestor(start, deltaY) {
  let el = start?.closest?.(SCROLLABLE_ANCESTOR_SELECTOR);
  while (el && el !== reel) {
    if (el.scrollHeight > el.clientHeight + 1) {
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop >= el.scrollHeight - el.clientHeight - 1;
      if (deltaY > 0 && !atBottom) return el;
      if (deltaY < 0 && !atTop) return el;
    }
    el = el.parentElement?.closest?.(SCROLLABLE_ANCESTOR_SELECTOR) || null;
  }
  return null;
}

reel.addEventListener("wheel", e => {
  // Ignore mostly-horizontal wheels — those are handled per-pager (above).
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
  // Bio reading area: wheel/scroll inside the Biography section never
  // navigates to the previous/next artist. If the bio-text can scroll,
  // native scroll handles it (overscroll-behavior: contain stops the
  // chain). If it's already at top/bottom, swallow the wheel anyway so
  // the reel-level router can't promote the gesture to artist-nav.
  const bioArea = e.target?.closest?.(".bio-text") ||
                  (e.target?.closest?.(".info-section")?.querySelector?.(":scope > .bio-text") ? e.target.closest(".info-section") : null);
  if (bioArea) return;
  // Don't hijack the wheel if the user is pointing at a nested scrollable
  // (e.g. .bio-text on the info panel) that hasn't yet hit its boundary —
  // let native scroll consume it first. Once the inner scrollable hits
  // its top/bottom, the next wheel event WILL reach this handler (because
  // findScrollableAncestor returns null at the boundary) and section
  // navigation kicks in as before.
  if (findScrollableAncestor(e.target, e.deltaY)) return;
  e.preventDefault();
  const now = Date.now();
  // Quiet-timer detection: when wheel events stop arriving for 140ms,
  // we treat the trackpad fling as finished — momentum flag clears and
  // the next gesture is allowed through.
  clearTimeout(wheelQuietTimer);
  wheelQuietTimer = setTimeout(() => {
    wheelInMomentum = false;
    wheelAccumY = 0;
  }, 140);
  // Hard min-lock window after a nav: even if a wheel event sneaks in
  // before the quiet timer fires, we ignore it for 350ms. This catches
  // the case where a trackpad fling has a brief lull in events but
  // hasn't actually ended — without it, that lull could be misread as a
  // new gesture and trigger a second nav.
  if (now < wheelHardLockUntil) {
    wheelAccumY = 0;
    return;
  }
  if (wheelInMomentum) {
    wheelAccumY = 0;
    return;
  }
  wheelAccumY += e.deltaY;
  // Lower threshold (was 60) so a single small intentional scroll moves
  // one section instead of being eaten as "not enough delta". Momentum
  // events after the nav are still safely caught by the flag/lock above.
  if (Math.abs(wheelAccumY) > 25) {
    navVertical(wheelAccumY > 0 ? 1 : -1);
    wheelAccumY = 0;
    wheelInMomentum = true;
    wheelHardLockUntil = now + 350;
  }
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
      ${["en", "pt", "he"].map(lang => `
        <button class="lang-cell ${currentLang === lang ? "active" : ""}" data-set-lang="${lang}" type="button" aria-label="${escapeHtml(LANG_LABELS[lang])}">
          <span class="lang-cell-code">${LANG_CODES[lang]}</span>
        </button>
      `).join("")}
    </li>
  `;
  // "Contact us" — small mailto row below the language picker.
  const contactRow = `
    <li class="contact-row">
      <a class="contact-link" href="mailto:yairixstudio@gmail.com" aria-label="${escapeHtml(t("nav.contactUs"))}">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
        <span>${escapeHtml(t("nav.contactUs"))}</span>
      </a>
    </li>
  `;
  stageSelectMenu.innerHTML = stageItems + langRow + contactRow;
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
      <span class="search-result-text">
        <span class="search-result-name">${escapeHtml(a.name)}</span>
        <span class="search-result-meta">${escapeHtml(stageLabel(a.stage))}</span>
      </span>
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

// "Get notifications" CTA at the bottom of the favorites panel.
// Two channels offered side-by-side:
//   • Browser — requests Notification permission, persists the result.
//     iOS Safari (non-PWA) doesn't expose `Notification`, so the
//     button auto-disables with an "Unsupported" pill — the Telegram
//     option is always available alongside it as a fallback.
//   • Telegram — opens the festival's Telegram bot in a new tab. Set
//     TELEGRAM_BOT_URL once the real bot is live.
const TELEGRAM_BOT_URL = "https://t.me/zna_gathering";
const favoritesNotifyEl       = document.getElementById("favorites-notify");
const favoritesNotifyBtnEl    = document.getElementById("favorites-notify-btn");
const favoritesNotifyDescEl   = document.getElementById("favorites-notify-desc");
const favoritesNotifyLabelEl  = document.getElementById("favorites-notify-label");
const favoritesNotifyTgEl     = document.getElementById("favorites-notify-telegram");
const favoritesNotifyTgLabelEl = document.getElementById("favorites-notify-telegram-label");

function notifySupported() {
  return typeof window !== "undefined" && "Notification" in window;
}

function refreshFavoritesNotifyCopy() {
  if (!favoritesNotifyEl) return;
  if (favoritesNotifyDescEl) favoritesNotifyDescEl.textContent = t("favorites.notifyDesc");
  // Telegram channel — always available, just point the link at the bot.
  if (favoritesNotifyTgEl)      favoritesNotifyTgEl.setAttribute("href", TELEGRAM_BOT_URL);
  if (favoritesNotifyTgLabelEl) favoritesNotifyTgLabelEl.textContent = t("favorites.notifyTelegram");
  // Browser channel — depends on the Notification API.
  if (!favoritesNotifyLabelEl || !favoritesNotifyBtnEl) return;
  if (!notifySupported()) {
    favoritesNotifyLabelEl.textContent = t("favorites.notifyUnsupported");
    favoritesNotifyBtnEl.disabled = true;
    favoritesNotifyBtnEl.classList.add("is-disabled");
    return;
  }
  favoritesNotifyBtnEl.classList.remove("is-disabled");
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
  const removeLabel = t("favorites.removeOne");
  favoritesListEl.innerHTML = items.map(a => {
    const sched = completeSchedule(a);
    const dateLine = sched ? `<span class="favorites-row-date">${escapeHtml(formatScheduleRange(sched))}</span>` : "";
    return `
      <div class="favorites-row" data-artist-id="${escapeHtml(a.id)}">
        <button class="favorites-row-main" type="button" data-artist-id="${escapeHtml(a.id)}">
          <span class="favorites-row-name">${escapeHtml(a.name)}</span>
          ${dateLine}
        </button>
        <button class="favorites-row-remove" type="button" data-remove-fav="${escapeHtml(a.id)}" aria-label="${escapeHtml(removeLabel)}" title="${escapeHtml(removeLabel)}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
      </div>
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

// ===== Artist-list overlay =====
// Opened by the avatar-stack pill on the hero panels. Lists every artist
// scoped to the active hero (all artists on Main, that stage's artists
// on stage heroes). Each row is a button that scrolls to the artist's
// section; the modal header carries a "Random" button that picks one at
// random from the same pool.
const artistsOverlay      = document.getElementById("artists-overlay");
const artistsListEl       = document.getElementById("artists-list");
const artistsTitleEl      = document.getElementById("artists-title");
const artistsCloseBtn     = document.getElementById("artists-close");
const artistsRandomBtn    = document.getElementById("artists-random");
let _artistsCurrentPool   = "all"; // last opened scope — used by the Random button.

function getArtistPool(stageId) {
  return stageId === "all" ? ARTISTS : ARTISTS.filter(a => a.stage === stageId);
}

function renderArtistsList(stageId) {
  if (!artistsListEl) return;
  const pool = getArtistPool(stageId);
  if (!pool.length) {
    artistsListEl.innerHTML = "";
    return;
  }
  artistsListEl.innerHTML = pool.map(a => {
    const src = pickThumbSrc(a.photo);
    const initials = getInitials(a.name);
    const avatar = src
      ? `<span class="artists-row-avatar"><img loading="lazy" decoding="async" src="${escapeHtml(src)}" alt=""/></span>`
      : `<span class="artists-row-avatar artists-row-avatar--fallback" style="--accent: ${escapeHtml(a.color || "#FEB447")};">${escapeHtml(initials)}</span>`;
    return `
      <button class="artists-row" type="button" data-artist-id="${escapeHtml(a.id)}">
        ${avatar}
        <span class="artists-row-text">
          <span class="artists-row-name">${escapeHtml(a.name)}</span>
          <span class="artists-row-meta">${escapeHtml(stageLabel(a.stage))}</span>
        </span>
      </button>
    `;
  }).join("");
}

function openArtistsOverlay(stageId) {
  if (!artistsOverlay) return;
  _artistsCurrentPool = stageId;
  if (artistsTitleEl) {
    artistsTitleEl.textContent = stageId === "all"
      ? t("artists.titleAll")
      : `${tStage(stageId)} · ${t("artists.title")}`;
  }
  if (artistsRandomBtn) {
    const tip = t("hero.randomLabel");
    artistsRandomBtn.setAttribute("aria-label", tip);
    artistsRandomBtn.title = tip;
  }
  renderArtistsList(stageId);
  artistsOverlay.hidden = false;
}

function closeArtistsOverlay() {
  if (!artistsOverlay) return;
  artistsOverlay.hidden = true;
}

// In-place "flyout" expansion of the hero artists pill — replaces the
// old modal overlay. The pill morphs into a card-shaped container
// anchored inside the hero panel; everything else in the hero stack
// (map button, stage name, tagline, live-now card) fades out for the
// duration. Clicking outside the flyout collapses it back.
function renderFlyoutList(listEl, stageId) {
  if (!listEl) return;
  const pool = getArtistPool(stageId);
  listEl.innerHTML = pool.map(a => {
    const src = pickThumbSrc(a.photo);
    const initials = getInitials(a.name);
    const avatar = src
      ? `<span class="artists-row-avatar"><img loading="lazy" decoding="async" src="${escapeHtml(src)}" alt=""/></span>`
      : `<span class="artists-row-avatar artists-row-avatar--fallback" style="--accent: ${escapeHtml(a.color || "#FEB447")};">${escapeHtml(initials)}</span>`;
    return `
      <button class="artists-row" type="button" data-artist-id="${escapeHtml(a.id)}">
        ${avatar}
        <span class="artists-row-text">
          <span class="artists-row-name">${escapeHtml(a.name)}</span>
          <span class="artists-row-meta">${escapeHtml(stageLabel(a.stage))}</span>
        </span>
      </button>
    `;
  }).join("");
}

function openPillFlyout(pillEl) {
  if (!pillEl) return;
  const stack = pillEl.closest(".hero-stack");
  // Look for the flyout INSIDE the stack first (its starting position),
  // and fall back to a body-portaled flyout matching this stack's pill
  // pool (rare — closePillFlyouts normally restores ownership first).
  const pool = pillEl.dataset.artistsPool;
  const flyout = stack?.querySelector(".hero-artists-flyout")
    || (pool ? document.querySelector(`body > .hero-artists-flyout[data-flyout-pool="${CSS.escape(pool)}"]`) : null);
  if (!stack || !flyout) return;
  const stageId = pool || flyout.dataset.flyoutPool || "all";
  const listEl = flyout.querySelector("[data-flyout-list]");
  renderFlyoutList(listEl, stageId);
  // Close any other flyout (restoring portal ownership) before opening.
  // Skip the autoplay-resume side-effect since we're about to suspend
  // it again for this open.
  closePillFlyouts({ skipAutoplayResume: true, exceptStack: stack });
  // Portal to <body>. The hero-pager has `will-change: transform`,
  // which traps `position: fixed` inside the pager's transformed
  // coordinate system — at scrollLeft > 0 the centered flyout
  // renders 1+ viewports off-screen instead of viewport-center.
  // Attaching directly to <body> guarantees fixed positioning
  // resolves against the actual viewport. Original parent is
  // remembered on the node so closePillFlyouts can restore it.
  if (flyout.parentElement !== document.body) {
    flyout._flyoutHome = stack;
    document.body.appendChild(flyout);
  }
  stack.classList.add("pill-expanded");
  flyout.setAttribute("aria-hidden", "false");
  pillEl.setAttribute("aria-expanded", "true");
  // Suspend the stage auto-advance while the user is reading the
  // artist list — re-uses the existing manual-gesture pause path so
  // the autoplay resumes naturally after the flyout closes (unless the
  // user toggled it off via the dots strip).
  if (typeof pauseHeroAutoplay === "function") pauseHeroAutoplay();
}

function closePillFlyouts(opts = {}) {
  const { skipAutoplayResume = false, exceptStack = null } = opts;
  const wasOpen = document.querySelector(".hero-stack.pill-expanded");
  document.querySelectorAll(".hero-stack.pill-expanded").forEach(stack => {
    if (exceptStack && stack === exceptStack) return;
    stack.classList.remove("pill-expanded");
    const pill = stack.querySelector(".hero-artists-pill");
    pill?.setAttribute("aria-expanded", "false");
  });
  // Restore any body-portaled flyouts back to the stack they came from,
  // and mark them hidden. Skip the one matching exceptStack (the caller
  // is in the middle of opening it).
  document.querySelectorAll("body > .hero-artists-flyout").forEach(flyout => {
    if (exceptStack && flyout._flyoutHome === exceptStack) return;
    flyout.setAttribute("aria-hidden", "true");
    const home = flyout._flyoutHome;
    if (home && home.isConnected) home.appendChild(flyout);
    flyout._flyoutHome = null;
  });
  // Resume the stage auto-advance after the flyout closes, unless the
  // user explicitly turned it off via the dots toggle or they're no
  // longer parked on the hero section.
  if (!skipAutoplayResume && wasOpen
      && typeof startHeroAutoplay === "function"
      && !heroAutoplayUserSuspended
      && getCurrentSection()?.dataset.section === "hero") {
    heroAutoplayPaused = false;
    clearTimeout(heroAutoplayResumeTimer);
    startHeroAutoplay();
  }
}

function jumpToArtist(id) {
  closeArtistsOverlay();
  closePillFlyouts();
  // If the current filter would hide this artist (e.g. user is on a stage
  // hero but the modal was rendering "all"), reset to "all" before
  // scrolling so the section actually exists in the DOM.
  if (!reel.querySelector(`[data-artist-id="${CSS.escape(id)}"]`)) {
    activeStageFilter = "all";
    rerenderArtistsBelowHero();
  }
  // The smooth-scroll occasionally fights observers that fire during the
  // overlay close; a single RAF settles things first.
  requestAnimationFrame(() => {
    const sec = reel.querySelector(`[data-artist-id="${CSS.escape(id)}"]`);
    sec?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

artistsCloseBtn?.addEventListener("click", closeArtistsOverlay);
artistsOverlay?.addEventListener("click", e => {
  if (e.target === artistsOverlay) closeArtistsOverlay();
});
artistsListEl?.addEventListener("click", e => {
  const row = e.target.closest(".artists-row");
  if (!row) return;
  const id = row.dataset.artistId;
  if (id) jumpToArtist(id);
});
artistsRandomBtn?.addEventListener("click", () => {
  const pool = getArtistPool(_artistsCurrentPool);
  if (!pool.length) return;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  jumpToArtist(pick.id);
});

// Opening the in-place flyout from the avatar pill — delegated through
// the reel so the listener survives buildReel() rebuilds.
reel.addEventListener("click", (e) => {
  const pill = e.target.closest?.(".hero-artists-pill");
  if (pill) {
    openPillFlyout(pill);
    return;
  }
  // Click anywhere else inside an open flyout — let it through (selecting
  // text, scrolling, etc). Outside-click handler below catches everything
  // that misses the flyout panel itself.
  const insideFlyout = e.target.closest?.(".hero-artists-flyout");
  if (insideFlyout) return;
});

// Artist-row jump must be a document-level listener: openPillFlyout
// portals the flyout to <body> so its `position: fixed` resolves against
// the real viewport (the hero-pager's `will-change: transform` was
// otherwise trapping it). With the flyout living outside .reel, clicks
// on its rows never reached the reel listener above — so we attach a
// dedicated capture-phase handler on document that matches the row
// wherever the flyout currently lives.
document.addEventListener("click", (e) => {
  const row = e.target.closest?.(".hero-artists-flyout .artists-row");
  if (!row?.dataset.artistId) return;
  jumpToArtist(row.dataset.artistId);
});

// Outside-click anywhere in the document closes any open pill flyout.
// Bound on capture so we beat any other handlers that might call
// stopPropagation downstream.
document.addEventListener("pointerdown", (e) => {
  if (!document.querySelector(".hero-stack.pill-expanded")) return;
  if (e.target.closest?.(".hero-artists-flyout")) return;
  if (e.target.closest?.(".hero-artists-pill")) return; // pill itself toggles
  closePillFlyouts();
}, true);

// Escape key closes the modal overlay (legacy) OR any open pill flyout.
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (artistsOverlay && !artistsOverlay.hidden) {
    closeArtistsOverlay();
    return;
  }
  if (document.querySelector(".hero-stack.pill-expanded")) {
    closePillFlyouts();
  }
});

favoritesBtn?.addEventListener("click", openFavorites);
favoritesCloseBtn?.addEventListener("click", closeFavorites);
favoritesOverlay?.addEventListener("click", e => {
  if (e.target === favoritesOverlay) closeFavorites();
});
favoritesListEl?.addEventListener("click", e => {
  // Remove (heart) button on a row — un-favorite that artist, refresh
  // the list in place, and sync the heart on the artist's hero panel
  // if it's currently rendered. Don't close the overlay.
  const removeBtn = e.target.closest("[data-remove-fav]");
  if (removeBtn) {
    e.stopPropagation();
    const id = removeBtn.dataset.removeFav;
    if (!id) return;
    if (isFavorite(id)) toggleFavorite(id);
    // Sync the heart button on the artist's hero panel (if rendered).
    const heroBtn = reel?.querySelector(`.artist-favorite[data-fav-id="${CSS.escape(id)}"]`);
    if (heroBtn) {
      heroBtn.classList.remove("is-favorite");
      heroBtn.setAttribute("aria-pressed", "false");
      const label = t("favorite.add");
      heroBtn.setAttribute("aria-label", label);
      heroBtn.setAttribute("title", label);
      const oldIcon = heroBtn.querySelector(".fav-icon");
      if (oldIcon) oldIcon.outerHTML = HEART_ICON_OUTLINE;
    }
    refreshFavoritesCounter();
    renderFavoritesList();
    // If the user just emptied the list, close the overlay automatically.
    if (getFavorites().size === 0) closeFavorites();
    return;
  }
  const row = e.target.closest(".favorites-row-main, .favorites-row");
  if (!row) return;
  const id = row.dataset.artistId;
  if (!id) return;
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
  // Each stage hero gets its own map-btn id (hero-map-btn-retro etc.); a
  // shared [data-hero-map] attribute catches all of them.
  const mapBtn = e.target.closest("[data-hero-map]");
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

// Random-artist trigger now lives inside the #artists-overlay header
// (see artistsRandomBtn handler above) — no separate hero pill any more.
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

// _initialRoute is defined at the very top of the file (see the comment
// there for why it can't live next to its usage in applyInitialRoute).

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
// The is-on-main-hero toggle calls computeIsOnMainHero, which reads layout
// (clientHeight, scrollTop, heroPager.scrollLeft). Coalesce into a single
// rAF so iOS momentum scroll (60-120Hz event bursts) does at most one
// layout-touching toggle per frame, not one per scroll event.
let _mainHeroRaf = 0;
reel.addEventListener("scroll", () => {
  const top = reel.scrollTop;
  if (top !== lastReelScrollTop) {
    lastReelScrollTop = top;
    showVDots();
  }
  if (!_mainHeroRaf) {
    _mainHeroRaf = requestAnimationFrame(() => {
      _mainHeroRaf = 0;
      document.body.classList.toggle("is-on-main-hero", computeIsOnMainHero());
    });
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
// One-time initial sync of UI chrome that lives outside the reel —
// applyLang() does this on every language switch but we also need it
// on first boot so the keyboard-hint label / search placeholder /
// favorites count are in the right language from frame 1.
{
  const kbLabel = document.getElementById("kb-hint-label");
  if (kbLabel) kbLabel.textContent = t("kbHint.label");
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.placeholder = t("search.placeholder");
    searchInput.dir = currentLang === "he" ? "rtl" : "ltr";
  }
  const artistsRandomBoot = document.getElementById("artists-random");
  if (artistsRandomBoot) {
    const tip = t("hero.randomLabel");
    artistsRandomBoot.setAttribute("aria-label", tip);
    artistsRandomBoot.title = tip;
  }
}
// Initial active state
setTimeout(() => setActiveSection(reel.querySelector(".section")), 50);
// Apply deep-link from URL after first render
setTimeout(applyInitialRoute, 80);
// Start hidden — dots only appear once the user actually scrolls vertically.
hideVDotsImmediately();

// Try to merge build-time-fetched artist photos
loadPhotos();
