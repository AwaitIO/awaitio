// Writes the logo files offered on /brand into public/branding: SVGs, and PNGs rendered from them, and the favicon
// src/app/icon.svg.
// Run by hand after the logo changes: `node apps/site/scripts/generateBrandingAssets.mjs`.
// sharp comes with Next.js, so it is loaded through Next's own dependencies instead of being added here.
import { writeFileSync } from 'fs';
import { createRequire } from 'module';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const directory = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'branding');
const requireFromNext = createRequire(createRequire(import.meta.url).resolve('next/package.json'));
const sharp = requireFromNext('sharp');

const colors = { ink: '#2B2621', paper: '#FBF8F2', orange: '#D9733F' };
const fontStack = "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace";

// The dither ring of src/utils/ditherRingPath.ts, drawn in the same 32×32 box: solid up to 0.3, a 50 % dither after
// it and the orange dot at the end of the solid part. cell is 1 for large files and 2 for the favicon, where single
// pixels would blur into grey. Kept in step with ditherRingPath by hand.
const mark = ({ ink, dot, cell = 1 }) => {
  const progress = 0.3;
  let path = '';
  for (let y = 0; y < 32; y += cell) {
    for (let x = 0; x < 32; x += cell) {
      const centerX = x + cell / 2;
      const centerY = y + cell / 2;
      const angle = (Math.atan2(centerX - 16, 16 - centerY) / (2 * Math.PI) + 1) % 1;
      const onRing = cell === 1 ? Math.abs(Math.hypot(centerX - 16, centerY - 16) - 11) <= 2 : Math.abs(Math.hypot(centerX - 16, centerY - 16) - 11.5) <= 2.8;
      if (onRing && (angle <= progress + 0.02 || (x / cell + y / cell) % 2 === 0)) {
        path += `M${x} ${y}h${cell}v${cell}h-${cell}z`;
      }
    }
  }
  const dotX = (16 + 11 * Math.sin(progress * 2 * Math.PI)).toFixed(2);
  const dotY = (16 - 11 * Math.cos(progress * 2 * Math.PI)).toFixed(2);
  return `<path d="${path}" fill="${ink}"/><circle cx="${dotX}" cy="${dotY}" r="3.6" fill="${dot}"/>`;
};

const icon = ({ ink, dot }) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 32 32">${mark({ ink, dot })}</svg>\n`;
};

// The wordmark is live text in the site's font stack: it renders with whatever system font the viewer has.
// Converting it to outlines needs a font file and a font tool; that comes when the logo is final.
const lockup = ({ ink, dot, background }) => {
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" width="1640" height="400" viewBox="0 0 164 40">',
    background ? `<rect width="164" height="40" fill="${background}"/>` : '',
    `<g transform="translate(4 4)">${mark({ ink, dot })}</g>`,
    `<text x="44" y="28.5" font-family="${fontStack}" font-size="24" letter-spacing="1.92" fill="${ink}"><tspan font-weight="600">Await</tspan><tspan font-weight="400">IO</tspan></text>`,
    '</svg>\n',
  ].join('');
};

const files = {
  'awaitio-icon.svg': icon({ ink: colors.ink, dot: colors.orange }),
  'awaitio-icon-dark.svg': icon({ ink: colors.paper, dot: colors.orange }),
  'awaitio-logo.svg': lockup({ ink: colors.ink, dot: colors.orange }),
  'awaitio-logo-dark.svg': lockup({ ink: colors.paper, dot: colors.orange, background: colors.ink }),
};

writeFileSync(join(directory, '..', '..', 'src', 'app', 'icon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${mark({ ink: colors.ink, dot: colors.orange, cell: 2 })}</svg>\n`);
console.info('src/app/icon.svg');

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(directory, name), svg);
  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(directory, name.replace(/\.svg$/, '.png')));
  console.info(`public/branding/${name} and .png`);
}

// The documentation's logos, light and dark mode, both on a transparent background like the rest of its header.
const docsLogos = {
  'light.png': lockup({ ink: colors.ink, dot: colors.orange }),
  'dark.png': lockup({ ink: colors.paper, dot: colors.orange }),
};

for (const [name, svg] of Object.entries(docsLogos)) {
  await sharp(Buffer.from(svg)).png().toFile(join(directory, '..', '..', '..', 'docs', 'logo', name));
  console.info(`apps/docs/logo/${name}`);
}
