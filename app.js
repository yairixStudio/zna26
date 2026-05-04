// ZNA 2026 - Lineup browser

document.getElementById("tagline").textContent = FESTIVAL.description;
document.getElementById("dates").textContent = FESTIVAL.dates;
document.getElementById("location").textContent = FESTIVAL.location;
document.getElementById("artist-count").textContent = `${ARTISTS.length} אומנים`;

const filtersEl = document.getElementById("filters");
const mainEl = document.getElementById("main");

const STAGES = [
  { id: "all", name: "כולם" },
  ...FESTIVAL.stages
];

let activeStage = "all";

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase();
}

function stageName(id) {
  return (FESTIVAL.stages.find(s => s.id === id) || {}).name || id;
}

function renderFilters() {
  filtersEl.innerHTML = STAGES.map(s => {
    const count = s.id === "all"
      ? ARTISTS.length
      : ARTISTS.filter(a => a.stage === s.id).length;
    return `
      <button class="filter-btn ${s.id === activeStage ? "active" : ""}" data-stage="${s.id}">
        ${s.name} <span style="opacity:0.6">(${count})</span>
      </button>
    `;
  }).join("");

  filtersEl.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activeStage = btn.dataset.stage;
      renderFilters();
      renderMain();
    });
  });
}

function artistCard(a) {
  const initials = getInitials(a.name);
  const accent = a.color || "#FEB447";
  const tags = (a.tags || []).slice(0, 3).map(t => `<span class="tag">${t}</span>`).join("");
  return `
    <a class="artist-card" href="artist.html?id=${a.id}" style="--accent: ${accent};">
      <div class="artist-avatar">
        <span class="artist-initials">${initials}</span>
      </div>
      <div class="artist-card-body">
        <div class="artist-name">${a.name}</div>
        <div class="artist-country">${a.country}</div>
        <div class="artist-tags">${tags}</div>
        <div class="artist-role">${a.role || ""}</div>
      </div>
    </a>
  `;
}

function renderMain() {
  if (activeStage === "all") {
    const sections = FESTIVAL.stages.map(stage => {
      const artists = ARTISTS.filter(a => a.stage === stage.id);
      if (!artists.length) return "";
      return `
        <section class="stage-section">
          <div class="stage-header">
            <h2>${stage.name}</h2>
            <span>${stage.desc} · ${artists.length} אומנים</span>
          </div>
          <div class="artists">${artists.map(artistCard).join("")}</div>
        </section>
      `;
    }).join("");
    mainEl.innerHTML = sections || `<div class="empty-state">אין אומנים עדיין.</div>`;
  } else {
    const artists = ARTISTS.filter(a => a.stage === activeStage);
    const stage = FESTIVAL.stages.find(s => s.id === activeStage);
    mainEl.innerHTML = `
      <section class="stage-section">
        <div class="stage-header">
          <h2>${stage.name}</h2>
          <span>${stage.desc} · ${artists.length} אומנים</span>
        </div>
        <div class="artists">${artists.length ? artists.map(artistCard).join("") : '<div class="empty-state">אין אומנים בבמה זו.</div>'}</div>
      </section>
    `;
  }
}

renderFilters();
renderMain();
