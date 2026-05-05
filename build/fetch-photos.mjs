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
  "https://znagathering.com/program/retro-universe/"
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
    const titleMatch = tag.match(/\btitle\s*=\s*["']([^"']*)["']/i);
    let src = srcMatch?.[1] || dataSrcMatch?.[1];
    if (!src) continue;
    // Skip data: URIs and tiny placeholders
    if (src.startsWith("data:")) continue;
    // Pick highest-res from srcset if available
    if (srcsetMatch) {
      const candidates = srcsetMatch[1]
        .split(",")
        .map(s => s.trim().split(/\s+/))
        .filter(p => p[0]);
      // Sort by descriptor (e.g. "1024w" -> 1024)
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
  return out;
}

// Heuristic: filter image URLs to plausible artist photos.
function isLikelyArtistPhoto(src) {
  if (/\/wp-content\/uploads\//.test(src) === false) return false;
  // Skip site logo / banners / favicons / placeholders
  const lc = src.toLowerCase();
  if (/(logo|banner|favicon|placeholder|sprite|footer|header|background|cropped)/.test(lc)) return false;
  // Reasonable extensions
  if (!/\.(jpg|jpeg|png|webp)/i.test(lc)) return false;
  return true;
}

async function main() {
  const photos = {};
  const ambiguous = [];
  for (const url of PAGES) {
    console.log(`Fetching ${url}`);
    const html = await fetchHtml(url);
    if (!html) continue;
    const images = extractImages(html);
    console.log(`  found ${images.length} <img> tags`);
    for (const img of images) {
      if (!isLikelyArtistPhoto(img.src)) continue;
      // Try to match by alt text first, then by URL filename slug
      let id = matchArtist(img.alt) || matchArtist(img.title);
      if (!id) {
        const filename = decodeURIComponent(img.src.split("/").pop().toLowerCase());
        id = matchArtist(filename);
      }
      if (!id) {
        ambiguous.push(img);
        continue;
      }
      // Prefer first-seen URL per artist (highest position usually = featured image)
      if (!photos[id]) photos[id] = img.src;
    }
  }

  fs.writeFileSync(
    path.join(ROOT, "photos.json"),
    JSON.stringify(photos, null, 2) + "\n"
  );

  console.log(`\nMatched ${Object.keys(photos).length} artists.`);
  if (ambiguous.length) {
    console.log(`Skipped ${ambiguous.length} unmatched images.`);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
