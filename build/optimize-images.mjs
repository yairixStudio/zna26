#!/usr/bin/env node
// Image optimisation for ZNA 2026.
//
// Reads every JPG in images/artists/ and every PNG in images/zna-3d/ that is
// actually referenced from app.js / styles.css / index.html, and emits AVIF
// + WebP variants alongside an optimised JPG/PNG fallback. Two widths for
// artist photos (800w hero + 320w thumbnail). Idempotent — skips if the
// output is newer than the source.
//
// Output written in-place under images/. photos.json gets rewritten with the
// new manifest shape: each artist id maps to a record with avif/webp/jpg
// URLs at both widths plus intrinsic dimensions for layout stability.
//
// Run via:  npm run optimize:images   (see package.json)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARTISTS_DIR = path.join(ROOT, "images/artists");
const ZNA3D_DIR   = path.join(ROOT, "images/zna-3d");
const PHOTOS_JSON = path.join(ROOT, "photos.json");

// Artist hero/thumb widths. 800w is enough for full-bleed phone heroes
// (DPR 3 × ~360 viewport ≈ 1080, but we cap at 800 because faces look fine
// and the byte savings are huge). 320w is for tiny preview cards.
const HERO_W = 800;
const THUMB_W = 320;

const AVIF_OPTS_PHOTO = { quality: 50, effort: 6, chromaSubsampling: "4:2:0" };
const WEBP_OPTS_PHOTO = { quality: 72, effort: 5, smartSubsample: true };
const JPG_OPTS_PHOTO  = { quality: 78, mozjpeg: true, progressive: true };

// Decorative 3D heroes — quality lower than artist photos (no faces, just
// translucent atmosphere). Effort 9 squeezes another ~10% out at the cost
// of CI time, which is fine since the script is idempotent and the heroes
// rarely change.
const AVIF_OPTS_TRANS = { quality: 38, effort: 9 };
const WEBP_OPTS_TRANS = { quality: 65, effort: 6, alphaQuality: 80 };

// Some originals are huge (>1 MB). After optimisation each artist photo
// should be under ~80 KB AVIF, ~120 KB WebP, ~140 KB JPG — comfortably
// under the festival's bad-cellular budget.

async function listJpgs(dir) {
  const all = await fs.readdir(dir);
  return all
    .filter(f => /\.(jpe?g)$/i.test(f))
    .filter(f => !/@320(?:@320)*\.jpe?g$/i.test(f))
    .sort();
}

async function isStale(srcPath, outPath) {
  try {
    const [srcStat, outStat] = await Promise.all([fs.stat(srcPath), fs.stat(outPath)]);
    return srcStat.mtimeMs >= outStat.mtimeMs;
  } catch (_) { return true; }
}

async function convertArtist(srcFile) {
  const id = srcFile.replace(/\.jpe?g$/i, "");
  const src = path.join(ARTISTS_DIR, srcFile);
  const meta = await sharp(src).metadata();
  const intrinsicW = Math.min(meta.width || HERO_W, HERO_W);
  const ratio = (meta.height || 1) / (meta.width || 1);
  const intrinsicH = Math.round(intrinsicW * ratio);

  const variants = [
    { w: HERO_W,  suffix: "" },
    { w: THUMB_W, suffix: "@320" },
  ];

  for (const { w, suffix } of variants) {
    const base = path.join(ARTISTS_DIR, `${id}${suffix}`);
    const tasks = [];
    if (await isStale(src, `${base}.avif`)) {
      tasks.push(sharp(src).resize(w, null, { fit: "inside", withoutEnlargement: true }).avif(AVIF_OPTS_PHOTO).toFile(`${base}.avif`));
    }
    if (await isStale(src, `${base}.webp`)) {
      tasks.push(sharp(src).resize(w, null, { fit: "inside", withoutEnlargement: true }).webp(WEBP_OPTS_PHOTO).toFile(`${base}.webp`));
    }
    // Re-emit the JPG too — many of the originals are 800 KB+ at 1500w; we
    // shrink them in-place to the same width budget so the fallback path
    // isn't 5x bigger than the modern ones. The ".jpg" stays at the
    // original filename for the hero so existing photos.json links keep
    // working during rollout (we rewrite photos.json at the end anyway).
    const jpgOut = `${base}.jpg`;
    if (await isStale(src, jpgOut)) {
      tasks.push(sharp(src).resize(w, null, { fit: "inside", withoutEnlargement: true }).jpeg(JPG_OPTS_PHOTO).toFile(jpgOut + ".tmp").then(() => fs.rename(jpgOut + ".tmp", jpgOut)));
    }
    if (tasks.length) await Promise.all(tasks);
  }

  return { id, w: intrinsicW, h: intrinsicH };
}

async function convertZna3d(srcRel) {
  const src = path.join(ROOT, srcRel);
  const stat = await fs.stat(src).catch(() => null);
  if (!stat) return;
  const ext = path.extname(src);
  const base = src.slice(0, -ext.length);
  // Cap at 600w — these are decorative atmosphere assets, never zoomed.
  // Previously emitted at 800w which was overkill on a phone hero.
  const tasks = [
    sharp(src).resize(600, null, { fit: "inside", withoutEnlargement: true })
      .avif(AVIF_OPTS_TRANS).toFile(`${base}.avif`),
    sharp(src).resize(600, null, { fit: "inside", withoutEnlargement: true })
      .webp(WEBP_OPTS_TRANS).toFile(`${base}.webp`),
  ];
  await Promise.all(tasks);
}

async function loadOldPhotos() {
  try { return JSON.parse(await fs.readFile(PHOTOS_JSON, "utf8")); }
  catch (_) { return {}; }
}

function isLegacyShape(v) {
  return typeof v === "string";
}

async function main() {
  console.log("→ Artist photos: AVIF + WebP + JPG @ 800w & 320w");
  const jpgs = await listJpgs(ARTISTS_DIR);
  const dims = {};
  // Limited concurrency — sharp is parallel internally but we have ~89 files.
  const CONC = 4;
  for (let i = 0; i < jpgs.length; i += CONC) {
    const batch = jpgs.slice(i, i + CONC);
    const out = await Promise.all(batch.map(convertArtist));
    for (const r of out) dims[r.id] = { w: r.w, h: r.h };
    process.stdout.write(`  ${Math.min(i + CONC, jpgs.length)}/${jpgs.length}\r`);
  }
  process.stdout.write("\n");

  console.log("→ ZNA 3D heroes: AVIF + WebP (active set only)");
  const zna3dActive = [
    "images/zna-3d/custom-goa-sound-totem-element.png",
    "images/zna-3d/custom-festival-portal-element.png",
    "images/zna-3d/custom-chillout-organism-element.png",
    "images/zna-3d/custom-market-shrine-element.png",
    "images/zna-3d/community-zna-logo.png",
  ];
  await Promise.all(zna3dActive.map(convertZna3d));

  console.log("→ Rewriting photos.json with multi-format manifest");
  const old = await loadOldPhotos();
  const next = {};
  for (const [id, val] of Object.entries(old)) {
    const baseRel = isLegacyShape(val) ? val.replace(/\.[a-z]+$/i, "") : (val.base || `images/artists/${id}`);
    next[id] = {
      avif: `${baseRel}.avif`,
      webp: `${baseRel}.webp`,
      jpg:  `${baseRel}.jpg`,
      avif320: `${baseRel}@320.avif`,
      webp320: `${baseRel}@320.webp`,
      jpg320:  `${baseRel}@320.jpg`,
      w: dims[id]?.w || 800,
      h: dims[id]?.h || 800,
    };
  }
  // Also include any artist that had a JPG file but wasn't yet in
  // photos.json (the official scrape adds entries lazily — make sure
  // every locally-converted file is reachable).
  for (const f of jpgs) {
    const id = f.replace(/\.jpe?g$/i, "");
    if (next[id]) continue;
    const baseRel = `images/artists/${id}`;
    next[id] = {
      avif: `${baseRel}.avif`,
      webp: `${baseRel}.webp`,
      jpg:  `${baseRel}.jpg`,
      avif320: `${baseRel}@320.avif`,
      webp320: `${baseRel}@320.webp`,
      jpg320:  `${baseRel}@320.jpg`,
      w: dims[id]?.w || 800,
      h: dims[id]?.h || 800,
    };
  }
  await fs.writeFile(PHOTOS_JSON, JSON.stringify(next, null, 2) + "\n", "utf8");
  console.log(`✓ photos.json: ${Object.keys(next).length} artists`);
}

main().catch(err => {
  console.error("optimize-images failed:", err);
  process.exit(1);
});
