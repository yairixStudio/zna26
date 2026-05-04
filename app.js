// ZNA 2026 - Reel-style scroll-snap experience
// Vertical = hero + one section per artist
// Horizontal (within each artist) = panels: hero / bio / discography / tracks / links

const reel = document.getElementById("reel");
const hud = document.getElementById("hud");
const hudStage = document.getElementById("hud-stage");
const hudPos = document.getElementById("hud-pos");
const hudHint = document.getElementById("hud-hint");
const verticalProgress = document.getElementById("vertical-progress");
const bgScene = document.getElementById("bg-scene");

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
        בואו נתחיל <span class="hero-cta-icon">↓</span>
      </button>
      <div class="swipe-hint-v">↓</div>
    </section>
  `;
}

function panelHero(a) {
  const initials = getInitials(a.name);
  const tags = (a.tags || []).slice(0, 4).map(t => `<span class="chip">${escapeHtml(t)}</span>`).join("");
  return `
    <div class="panel panel-hero">
      <div class="panel-inner center">
        <div class="panel-eyebrow">${escapeHtml(stageInfo(a.stage).name)}</div>
        <div class="artist-hero-art" style="--accent: ${a.color || "#FEB447"};">
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
      <div class="swipe-hint-h">←</div>
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
  const cards = tracks.map((t, i) => `
    <div class="track-card">
      <button class="track-thumb" data-vid="${escapeHtml(t.id)}" style="background-image: url('https://i.ytimg.com/vi/${escapeHtml(t.id)}/hqdefault.jpg');" aria-label="נגן ${escapeHtml(t.title)}">
        <span class="play-btn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </span>
      </button>
      <div class="track-meta">
        <span class="track-title">${escapeHtml(t.title)}</span>
        <span class="track-year">${escapeHtml(String(t.year || ""))}</span>
      </div>
    </div>
  `).join("");
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
  const artistSections = ARTISTS.map((a, i) => artistSection(a, i)).join("");
  reel.innerHTML = heroSection() + artistSections;

  // CTA scroll to first artist
  const cta = document.getElementById("cta-start");
  cta.addEventListener("click", () => {
    const first = reel.querySelector('[data-section="artist"]');
    first?.scrollIntoView({ behavior: "smooth" });
  });

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

    // Update active dot on horizontal scroll
    let ticking = false;
    pager.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const w = pager.clientWidth;
        // RTL: scrollLeft is negative or starts at max in some browsers; use absolute
        const sl = Math.abs(pager.scrollLeft);
        const idx = Math.round(sl / w);
        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
        ticking = false;
      });
    }, { passive: true });

    // YouTube lazy-load: click thumb -> swap with iframe
    section.querySelectorAll(".track-thumb").forEach(thumb => {
      thumb.addEventListener("click", () => {
        const vid = thumb.dataset.vid;
        const wrapper = document.createElement("div");
        wrapper.className = "track-frame";
        wrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(vid)}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" title="YouTube video"></iframe>`;
        thumb.replaceWith(wrapper);
      });
    });
  });
}

// ===== Vertical progress bar =====

function buildVerticalProgress() {
  // 1 dot for hero + 1 per artist
  const total = ARTISTS.length + 1;
  const items = [];
  items.push(`<button class="v-dot active" data-vidx="0" aria-label="ראשי"></button>`);
  ARTISTS.forEach((a, i) => {
    items.push(`<button class="v-dot" data-vidx="${i + 1}" aria-label="${escapeHtml(a.name)}"></button>`);
  });
  verticalProgress.innerHTML = items.join("");

  verticalProgress.addEventListener("click", e => {
    const dot = e.target.closest(".v-dot");
    if (!dot) return;
    const idx = +dot.dataset.vidx;
    const sections = reel.querySelectorAll(".section");
    sections[idx]?.scrollIntoView({ behavior: "smooth" });
  });
}

// ===== Active section tracking =====

function setActiveSection(section) {
  if (!section) return;

  const sections = Array.from(reel.querySelectorAll(".section"));
  const idx = sections.indexOf(section);

  // Mark active section (drives entry animation)
  sections.forEach(s => s.classList.toggle("is-active", s === section));

  // Vertical dots
  verticalProgress.querySelectorAll(".v-dot").forEach((d, i) => {
    d.classList.toggle("active", i === idx);
  });

  // HUD + retint background by stage
  const stage = section.dataset.stage;
  if (stage && stageColor[stage]) {
    bgScene.style.background = stageColor[stage];
  }

  if (section.dataset.section === "hero") {
    hudStage.textContent = "ZNA 2026";
    hudPos.textContent = "ראשי";
  } else {
    const a = ARTISTS[+section.dataset.index];
    if (a) {
      hudStage.textContent = stageInfo(a.stage).name;
      hudPos.textContent = `${(+section.dataset.index) + 1} / ${ARTISTS.length}`;
    }
  }
}

function observeSections() {
  const sections = Array.from(reel.querySelectorAll(".section"));
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
        setActiveSection(entry.target);
      }
    });
  }, { root: reel, threshold: [0.6] });
  sections.forEach(s => io.observe(s));
}

// ===== Keyboard navigation =====

function getCurrentSection() {
  const sections = Array.from(reel.querySelectorAll(".section"));
  const reelTop = reel.scrollTop;
  return sections.find(s => s.offsetTop >= reelTop - 10) || sections[sections.length - 1];
}

function navVertical(dir) {
  const sections = Array.from(reel.querySelectorAll(".section"));
  const idx = sections.indexOf(getCurrentSection());
  const next = sections[idx + dir];
  next?.scrollIntoView({ behavior: "smooth" });
}

function navHorizontal(dir) {
  const current = getCurrentSection();
  if (!current || current.dataset.section !== "artist") return;
  const pager = current.querySelector(".pager");
  if (!pager) return;
  const w = pager.clientWidth;
  const sl = Math.abs(pager.scrollLeft);
  const cur = Math.round(sl / w);
  const total = +pager.dataset.panelCount;
  const next = Math.max(0, Math.min(total - 1, cur + dir));
  pager.children[next]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
}

document.addEventListener("keydown", e => {
  // ArrowDown / ArrowUp -> next/prev artist
  if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); navVertical(1); }
  else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); navVertical(-1); }
  // Horizontal: in RTL "ArrowLeft" feels like "next" because the layout flows right-to-left
  else if (e.key === "ArrowLeft") { e.preventDefault(); navHorizontal(1); }
  else if (e.key === "ArrowRight") { e.preventDefault(); navHorizontal(-1); }
});

// Mouse-wheel: route horizontal-leaning wheel events to the inner pager so a
// trackpad nudge swipes panels naturally
reel.addEventListener("wheel", e => {
  const current = getCurrentSection();
  if (!current || current.dataset.section !== "artist") return;
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8) {
    const pager = current.querySelector(".pager");
    if (pager) {
      e.preventDefault();
      // RTL: positive deltaX from a right-swipe should move forward
      pager.scrollBy({ left: e.deltaX, behavior: "auto" });
    }
  }
}, { passive: false });

// Hide hint after first interaction
let hintHidden = false;
function hideHint() {
  if (hintHidden) return;
  hintHidden = true;
  document.querySelectorAll(".swipe-hint-h, .swipe-hint-v").forEach(el => {
    el.style.transition = "opacity 0.6s";
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 700);
  });
  if (hudHint) {
    hudHint.style.transition = "opacity 0.6s";
    hudHint.style.opacity = "0";
  }
}
reel.addEventListener("scroll", hideHint, { passive: true, once: true });
document.addEventListener("keydown", hideHint, { once: true });
document.addEventListener("touchstart", hideHint, { passive: true, once: true });

// iOS Safari address-bar fix: keep --vh in sync
function setVH() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
}
setVH();
window.addEventListener("resize", setVH);
window.addEventListener("orientationchange", setVH);

// Boot
buildReel();
buildVerticalProgress();
observeSections();
// Initial active state
setTimeout(() => setActiveSection(reel.querySelector(".section")), 50);
