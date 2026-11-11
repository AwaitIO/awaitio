---
canvas: knaoj3VGdl
---

# Doop in awaitio

The repository's override for the global `doop` skill. The canvas is **AwaitIO** (the id in the front
matter above).

- A task that says "Figma" means this canvas.
- Run the skill's scripts from inside this checkout, so they pick up the canvas above:
  `node ~/.claude/skills/doop/scripts/export.mjs "<page>/<frame>" <out.png> …`

## Pages

- **Branding**: the brand components (logo mark and lockup, the sun illustration, icons, chips,
  buttons, tags, window traffic lights) and the social avatars (`Avatar · social`,
  `Avatar · transparent`)
- **Product Hunt**: the Product Hunt gallery, 1270×760 slides `1 Just code` … `7 Try the demo`, and the
  240×240 `Product Hunt thumbnail`
- **OG images**: one 1200×630 frame per awaitio.com page (`OG · Home`, `OG · Pricing`, …), exported
  to `apps/site/public/og/<page>.png` (see `.claude/guidelines/site.md`)
- **Twitter**: the X avatar and the 1500×500 profile header
- **Changelog**: one 1200×630 frame per release (`Release 0.1` … `Release 1.4`), exported at
  `--scale 2` to `apps/docs/images/changelog/<version>.png` (see `.claude/guidelines/changelog.md`);
  a new release starts as a copy of the last one
- **YouTube thumbnails**: video covers, 1280×720
- **Archive**: the gallery, OG images and components from before the brand; kept for reference only
