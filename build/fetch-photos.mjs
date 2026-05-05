#!/usr/bin/env node
// Build-time scraper: fetches ZNA program pages and extracts artist photo URLs.
// Runs in GitHub Actions where outbound HTTP is allowed (unlike Claude's sandbox).
// Writes photos.json that the client merges with artist records.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PAGES = [
  "https://znagathering.com/program/",
  "https://znagathering.com/program/dancefloor/",
  "https://znagathering.com/program/the-market-2026/",
  "https://znagathering.com/program/goa-guardians/",
  "https://znagathering.com/program/retro-universe/",
  "https://znagathering.com/2026/04/27/artist-announcement-retro-universe-35/",
  "https://znagathering.com/2026/04/06/artist-announcement-retro-universe-32/",
  "https://znagathering.com/2026/03/30/artist-announcement-retro-universe-31/",
  "https://znagathering.com/2026/03/25/artist-announcement-market/",
  "https://znagathering.com/2026/03/23/artist-announcement-retro-universe-30/",
  "https://znagathering.com/2026/03/16/artist-announcement-retro-universe-29/",
  "https://znagathering.com/2026/03/04/goa-guardians-line-up-announcement/",
  "https://znagathering.com/2026/02/24/artist-announcement-retro-universe-26/",
  "https://znagathering.com/2026/02/16/artist-announcement-retro-universe-25/",
  "https://znagathering.com/2026/02/09/artist-announcement-retro-universe-24/",
  "https://znagathering.com/2026/02/02/artist-announcement-retro-universe-23/",
  "https://znagathering.com/2026/01/26/artist-announcement-retro-universe-22/",
  "https://znagathering.com/2026/01/19/artist-announcement-retro-universe-21/",
  "https://znagathering.com/2026/01/12/artist-announcement-retro-universe-20/"
];

const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

// Map artist name patterns -> data.js id.
// Aliases must be lowercase. Order matters: more specific first.
const ARTIST_ALIASES = [
  ["yahel", "yahel"],
  ["tsuyoshi suzuki", "tsuyoshi-suzuki"],
  ["tsuyoshi", "tsuyoshi-suzuki"],
  ["kris kylven", "kris-kylven"],
  ["kris klyven", "kris-kylven"],
  ["kylven", "kris-kylven"],
  ["simon ghahary", "simon-ghahary"],
  ["ghahary", "simon-ghahary"],
  ["ray castle", "ray-castle"],
  ["robert leiner", "robert-leiner"],
  ["source experience", "robert-leiner"],
  ["sean williams", "sean-williams"],
  ["satori", "sean-williams"],
  ["james monro", "james-monro"],
  ["joti sidhu", "joti-sidhu"],
  ["psychaos", "joti-sidhu"],
  ["extrawelt", "extrawelt"],
  ["mathew jonson", "mathew-jonson"],
  ["gabriel le mar", "gabriel-le-mar"],
  ["saafi brothers", "gabriel-le-mar"],
  ["psara", "psara"],
  ["ukiro", "ukiro"],
  ["damir ludvig", "damir-ludvig"],
  ["goran stetic", "goran-stetic"],
  ["dogma", "dogma"],
  ["alex tolstey", "alex-tolstey"],
  ["alien rain", "alien-rain"],
  ["ana%c3%afs lin", "anais-lin"],
  ["anais lin", "anais-lin"],
  ["marc van der vlugt", "marc-van-der-vlugt"],
  ["marc-van-der-vlugt", "marc-van-der-vlugt"],
  ["solitare", "solitare"],
  ["earl peal", "earl-peal"],
  ["isoquant", "isoquant"],
  ["gabi v", "gabi-von-dub"],
  ["ree.k", "ree-k"],
  ["ree k", "ree-k"],
  ["klil.co", "klil-co"],
  ["klil co", "klil-co"],
  ["tecnica", "mathew-tecnica"],
  ["triple distilled", "triple-distilled"],
  ["bill robin", "bill-robin-maya"],
  ["maya wada", "bill-robin-maya"],
  ["e-sk", "e-sko"],
  ["sancho", "sancho-meiso"],
  ["jaia", "jaia"],
  ["ja%c3%afa", "jaia"],
  ["graham wood", "graham-wood"],
  ["sid shanti", "sid-shanti"],
  ["jean borelli", "orion-borelli"],
  ["orion", "orion-borelli"],
  ["takeshi isogai", "takeshi-isogai"],
  ["ubar tmar", "takeshi-isogai"],
  ["battle of the future buddhas", "battle-future-buddhas"],
  ["battle-future-buddhas", "battle-future-buddhas"],
  ["future buddhas", "battle-future-buddhas"],
  ["goaacen", "goaacen"],
  ["dark el kante", "dark-el-kante"],
  ["dark-el-kante", "dark-el-kante"],
  ["merr0w", "merrow"],
  ["merrow", "merrow"],
  ["atmos", "atmos"],
  ["alphanaut", "alphanaut"],
  ["blue planet corporation", "blue-planet-corporation"],
  ["blue-planet-corporation", "blue-planet-corporation"],
  ["merv", "merv-eat-static"],
  ["eat static", "merv-eat-static"],
  ["cosmosis", "cosmosis"],
  ["filteria", "filteria"],
  ["sjamadan", "sjamadan"],
  ["cheers", "extra-cheers"]
];

function matchArtist(text) {
  if (!text) return null;
  const lc = text.toLowerCase();
  for (const [needle, id] of ARTIST_ALIASES) {
    if (lc.includes(needle)) return id;
  }
  return null;
}

async function fetchHtml(url) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA, "Accept": "text/html" } });
    if (!res.ok) {
      console.error(`  ${url} -> ${res.status}`);
      return null;
    }
    return await res.text();
  } catch (e) {
    console.error(`  ${url} -> error: ${e.message}`);
    return null;
  }
}

// Extract <img ... src ... alt ...> with srcset awareness, returning {src, alt}
function extractImages(html) {
  const out = [];
  const imgRe = /<img\b[^>]*>/gi;
  let m;
  while ((m = imgRe.exec(html))) {
    const tag = m[0];
    const srcMatch = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    const altMatch = tag.match(/\balt\s*=\s*["']([^"']*)["']/i);
    const srcsetMatch = tag.match(/\bsrcset\s*=\s*["']([^"']+)["']/i);
    const dataSrcMatch = tag.match(/\bdata-src\s*=\s*["']([^"']+)["']/i);
    const dataLazySrcMatch = tag.match(/\bdata-lazy-src\s*=\s*["']([^"']+)["']/i);
    const titleMatch = tag.match(/\btitle\s*=\s*["']([^"']*)["']/i);
    let src = srcMatch?.[1] || dataSrcMatch?.[1] || dataLazySrcMatch?.[1];
    if (!src) continue;
    // Skip data: URIs and tiny placeholders
    if (src.startsWith("data:")) continue;
    // Pick highest-res from srcset if available
    if (srcsetMatch) {
      const candidates = srcsetMatch[1]
        .split(",")
        .map(s => s.trim().split(/\s+/))
        .filter(p => p[0]);
      candidates.sort((a, b) => {
        const w = (s) => parseInt((s[1] || "0").replace(/[^0-9]/g, ""), 10) || 0;
        return w(b) - w(a);
      });
      if (candidates[0]) src = candidates[0][0];
    }
    out.push({
      src: new URL(src, "https://znagathering.com/").toString(),
      alt: altMatch?.[1] || "",
      title: titleMatch?.[1] || ""
    });
  }

  // Also pull image URLs from inline style background-image / data-bg / similar
  const bgRe = /(?:background-image\s*:\s*url|data-bg(?:-?img)?\s*=)\s*\(?["']?(https?:[^"')\s]+\.(?:jpe?g|png|webp))["')]?/gi;
  while ((m = bgRe.exec(html))) {
    out.push({ src: m[1], alt: "", title: "" });
  }

  // Pull from JSON blobs / anywhere wp-content/uploads URLs appear
  const looseRe = /https?:\/\/[^"'\s)]*\/wp-content\/uploads\/[^"'\s)]+\.(?:jpe?g|png|webp)/gi;
  while ((m = looseRe.exec(html))) {
    out.push({ src: m[0], alt: "", title: "" });
  }
  return out;
}

// Heuristic: filter image URLs to plausible artist photos.
function isLikelyArtistPhoto(src) {
  if (/\/wp-content\/uploads\//.test(src) === false) return false;
  const lc = src.toLowerCase();
  if (/(favicon|sprite|placeholder|emoji)/.test(lc)) return false;
  if (!/\.(jpg|jpeg|png|webp)/i.test(lc)) return false;
  return true;
}

function urlSlug(src) {
  try {
    const u = new URL(src);
    return decodeURIComponent(u.pathname.split("/").pop() || "").toLowerCase();
  } catch { return ""; }
}

// Per-page heuristic: announcement posts contain a single artist name in <title>
function inferArtistFromPageTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  if (!m) return null;
  return matchArtist(m[1]);
}

async function main() {
  const photos = {};
  const seenSrcs = new Set();
  const ambiguous = [];

  for (const url of PAGES) {
    console.log(`Fetching ${url}`);
    const html = await fetchHtml(url);
    if (!html) continue;
    const images = extractImages(html);
    console.log(`  ${images.length} candidate URLs`);
    const pageArtistHint = inferArtistFromPageTitle(html);
    for (const img of images) {
      if (!isLikelyArtistPhoto(img.src)) continue;
      if (seenSrcs.has(img.src)) continue;
      seenSrcs.add(img.src);
      const slug = urlSlug(img.src);
      let id = matchArtist(img.alt) || matchArtist(img.title) || matchArtist(slug);
      // For announcement post pages, the page is mostly about ONE artist - if we
      // can't match the image directly, fall back to the page's title hint.
      if (!id && pageArtistHint && /artist-announcement/i.test(url)) {
        id = pageArtistHint;
      }
      if (!id) {
        ambiguous.push({ url: img.src, alt: img.alt, slug });
        continue;
      }
      if (!photos[id]) photos[id] = img.src;
    }
  }

  fs.writeFileSync(
    path.join(ROOT, "photos.json"),
    JSON.stringify(photos, null, 2) + "\n"
  );

  console.log(`\nMatched ${Object.keys(photos).length} artists:`);
  for (const [id, src] of Object.entries(photos)) console.log(`  ${id}: ${src}`);
  if (ambiguous.length) {
    console.log(`\nSkipped ${ambiguous.length} unmatched (sample):`);
    ambiguous.slice(0, 10).forEach(a => console.log(`  alt="${a.alt}" slug=${a.slug}`));
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
