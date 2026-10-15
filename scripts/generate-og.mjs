/**
 * Generates the 1200x630 Open Graph card for this site as a real raster PNG.
 *
 * Why: the og:image used to point at /noc.png, which is a 1536x1024 photograph
 * of an actual NOC certificate. Two problems - the declared 1200x630 dimensions
 * did not match the file (3:2 instead of the 1.91:1 OG ratio), and a document
 * photo carries no brand, no headline and no call to action, so it performed
 * poorly as a share card. The certificate image is still used on the page
 * itself; this is a separate branded asset for previews.
 *
 * Run:  node scripts/generate-og.mjs
 */
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '..', 'public', 'og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;

// Deliberately not the site's page background: a dark card reads better at
// thumbnail size inside a chat bubble than a near-white one.
const NAVY = '#0F2033';
const GOLD = '#C9A227';
const WHITE = '#F5F7FA';
const MUTED = '#9FB0C0';

// The ampersand in "L&DO" must be written as &amp; - a bare `&` inside a
// <text> node makes the entire SVG fail to parse.
const authorities = [
  'L&amp;DO Nirman Bhawan',
  'DDA Vikas Sadan',
  'MCD',
  'DFS · DPCC · NMA',
  'DJB · Electricity · NHAI',
];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${NAVY}"/>
  <rect width="${WIDTH}" height="7" fill="${GOLD}"/>

  <!-- authority chips -->
  ${authorities
    .map((label, i) => {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const x = 80 + col * 350;
      const y = 132 + row * 62;
      const w = 300 + (label.length > 18 ? 10 : 0);
      return `
        <rect x="${x}" y="${y}" width="${w}" height="44" rx="22"
              fill="${GOLD}" fill-opacity="0.13" stroke="${GOLD}" stroke-opacity="0.4"/>
        <text x="${x + 20}" y="${y + 29}" font-family="Arial, sans-serif" font-size="21"
              fill="${GOLD}">${label}</text>`;
    })
    .join('')}

  <text x="80" y="368" font-family="Arial, sans-serif" font-size="70"
        font-weight="700" fill="${WHITE}">NOC Banwao,</text>
  <text x="80" y="446" font-family="Arial, sans-serif" font-size="70"
        font-weight="700" fill="${GOLD}">Deal Aage Badhao.</text>

  <text x="80" y="510" font-family="Arial, sans-serif" font-size="27"
        fill="${MUTED}">Freehold conversion &#183; Mutation &#183; De-sealing &#183; Tree cutting</text>

  <text x="80" y="570" font-family="Arial, sans-serif" font-size="25"
        fill="${MUTED}" fill-opacity="0.75">Third-generation Delhi liaison experts</text>

  <text x="1120" y="570" text-anchor="end" font-family="Arial, sans-serif"
        font-size="26" font-weight="700" fill="${GOLD}">NoObjectionCertificate.com</text>
</svg>`;

mkdirSync(dirname(OUT), { recursive: true });

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`wrote ${OUT}`);
console.log(`  ${meta.width}x${meta.height} ${meta.format}`);