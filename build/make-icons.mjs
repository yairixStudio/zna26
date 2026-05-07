#!/usr/bin/env node
// Generate PWA icons (192/512 + maskable) from the SVG mark used as the
// site favicon. Output → images/icons/. Idempotent — overwrites in place.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT  = path.join(ROOT, "images/icons");

// The favicon in index.html is an inline SVG; we rebuild a higher-res
// version here so the icons read sharply on iOS Add-to-Home and Android
// launcher. Two concentric circles in the festival palette.
const SVG_LOGO = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="bg" cx="0.5" cy="0.5" r="0.6">
      <stop offset="0%" stop-color="#1a0a3a"/>
      <stop offset="100%" stop-color="#0a0524"/>
    </radialGradient>
    <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#FEB447"/>
      <stop offset="60%" stop-color="#ff7e1f"/>
      <stop offset="100%" stop-color="#ff5c8a"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <circle cx="256" cy="256" r="180" fill="url(#sun)"/>
  <text x="256" y="295" font-family="Orbitron, system-ui, sans-serif" font-weight="900" font-size="120" fill="#0a0524" text-anchor="middle" letter-spacing="6">ZNA</text>
</svg>`;

// Maskable icons need a safe zone — 80% of the canvas is the visible area
// after Android crops to its preferred shape (circle / squircle). We pad
// the same logo at 70% scale so launcher cropping never clips letters.
const SVG_MASKABLE = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="bg" cx="0.5" cy="0.5" r="0.7">
      <stop offset="0%" stop-color="#1a0a3a"/>
      <stop offset="100%" stop-color="#0a0524"/>
    </radialGradient>
    <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#FEB447"/>
      <stop offset="60%" stop-color="#ff7e1f"/>
      <stop offset="100%" stop-color="#ff5c8a"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <circle cx="256" cy="256" r="135" fill="url(#sun)"/>
  <text x="256" y="285" font-family="Orbitron, system-ui, sans-serif" font-weight="900" font-size="84" fill="#0a0524" text-anchor="middle" letter-spacing="4">ZNA</text>
</svg>`;

async function emit() {
  await fs.mkdir(OUT, { recursive: true });
  const svgBuf = Buffer.from(SVG_LOGO);
  const svgMaskable = Buffer.from(SVG_MASKABLE);
  await Promise.all([
    sharp(svgBuf, { density: 300 }).resize(192, 192).png({ quality: 90, compressionLevel: 9 }).toFile(path.join(OUT, "icon-192.png")),
    sharp(svgBuf, { density: 300 }).resize(512, 512).png({ quality: 90, compressionLevel: 9 }).toFile(path.join(OUT, "icon-512.png")),
    sharp(svgMaskable, { density: 300 }).resize(512, 512).png({ quality: 90, compressionLevel: 9 }).toFile(path.join(OUT, "icon-maskable.png")),
    // Apple touch icon — separate file because iOS doesn't read the
    // manifest's icon list for "Add to Home Screen".
    sharp(svgBuf, { density: 300 }).resize(180, 180).png({ quality: 90, compressionLevel: 9 }).toFile(path.join(OUT, "apple-touch-icon.png")),
  ]);
  console.log("✓ icons emitted to", OUT);
}

emit().catch(err => { console.error(err); process.exit(1); });
