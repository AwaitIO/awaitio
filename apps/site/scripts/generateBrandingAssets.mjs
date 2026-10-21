// Writes the logo files offered on /branding into public/branding: SVGs, and PNGs rendered from them.
// Run by hand after the logo changes: `node apps/site/scripts/generateBrandingAssets.mjs`.
// sharp comes with Next.js, so it is loaded through Next's own dependencies instead of being added here.
import { writeFileSync } from 'fs';
import { createRequire } from 'module';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const directory = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'branding');
const requireFromNext = createRequire(createRequire(import.meta.url).resolve('next/package.json'));
const sharp = requireFromNext('sharp');

const colors = { ink: '#111827', paper: '#ffffff', orange: '#f97316' };
const fontStack = "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace";

// Logo 10, Promise arc, drawn in a 32×32 box, with the orange dot at the end of the arc.
const mark = ({ ink, dot }) => {
  return [
    `<circle cx="16" cy="16" r="11" stroke="${ink}" stroke-opacity="0.18" stroke-width="3.5" fill="none"/>`,
    `<path d="M16 5a11 11 0 0 1 11 11" stroke="${ink}" stroke-width="3.5" stroke-linecap="round" fill="none"/>`,
    `<circle cx="27" cy="16" r="3.2" fill="${dot}"/>`,
  ].join('');
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

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(directory, name), svg);
  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(directory, name.replace(/\.svg$/, '.png')));
  console.info(`public/branding/${name} and .png`);
}
