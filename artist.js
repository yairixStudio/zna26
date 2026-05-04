// ZNA 2026 - Single artist page

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

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const artist = ARTISTS.find(a => a.id === id);
const pageEl = document.getElementById("page");

if (!artist) {
  pageEl.innerHTML = `
    <a class="back-link" href="index.html">← חזרה לליין-אפ</a>
    <div class="empty-state">
      <h2 style="margin-bottom: 14px;">אומן לא נמצא</h2>
      <p>בדוק את הקישור או חזור לדף הראשי.</p>
    </div>
  `;
} else {
  document.title = `${artist.name} — ZNA 2026`;
  const initials = getInitials(artist.name);
  const accent = artist.color || "#FEB447";

  const tags = (artist.tags || []).map(t => `<span class="tag">${t}</span>`).join("");

  const albumsHtml = artist.albums && artist.albums.length
    ? `
      <h3 class="section-title">דיסקוגרפיה נבחרת</h3>
      <ul class="albums-list">
        ${artist.albums.map(al => `
          <li>
            <span class="album-name">${al.name}</span>
            <span class="album-meta">${al.project ? al.project + " · " : ""}${al.year}</span>
          </li>
        `).join("")}
      </ul>
    `
    : "";

  const linksHtml = artist.links && artist.links.length
    ? `
      <h3 class="section-title">קישורים</h3>
      <div class="links-grid">
        ${artist.links.map(l => `<a class="link-btn" href="${l.url}" target="_blank" rel="noopener">${l.type} ↗</a>`).join("")}
      </div>
    `
    : "";

  pageEl.innerHTML = `
    <a class="back-link" href="index.html">← חזרה לליין-אפ</a>

    <article class="artist-hero">
      <div class="artist-hero-banner" style="--accent: ${accent}; background: linear-gradient(135deg, ${accent} 0%, rgba(20, 10, 50, 0.7) 100%);">
        <span class="artist-hero-initials">${initials}</span>
      </div>
      <div class="artist-hero-body">
        <h1>${artist.name}</h1>
        <div class="artist-real-name">${artist.realName || ""}</div>

        <div class="artist-tags">${tags}</div>

        <div class="info-row">
          <span>📍 ${artist.country}</span>
          ${artist.age ? `<span>🎂 גיל ${artist.age}</span>` : ""}
          ${artist.born ? `<span>📅 ${artist.born}</span>` : ""}
          <span>🎚️ ${stageName(artist.stage)}</span>
          <span>🎧 ${artist.role}</span>
        </div>

        ${artist.bio ? `<p class="bio">${artist.bio}</p>` : ""}

        ${artist.notable ? `<div class="notable">★ ${artist.notable}</div>` : ""}

        ${albumsHtml}
        ${linksHtml}
      </div>
    </article>
  `;
}
