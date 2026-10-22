# Site Guidelines

`apps/site` is awaitio.com in Next.js as a static export (`pnpm --filter @awaitio/site dev`, port 8080). The export in `apps/site/out/` is committed on its own as `[site] static export`, on `main`, only by `/prepare-release`.

## The static export is built only by /prepare-release, on main

Claude never builds or commits `apps/site/out/` on its own: not after a site change, not in a worktree. A commit with site changes is a source commit only. The export is built and committed as `[site] static export` only by [`/prepare-release`](../commands/prepare-release.md), which the user runs on a clean `main`. Changes Claude finds in `apps/site/out/` are left alone, never staged or reverted.

**Why**: the export is generated from everything on `main`; built in a worktree it holds only that branch and conflicts with every other branch that touches the site.

✅ DO: commit `[site] add … to the home page` and stop.

❌ DON'T: run `pnpm --filter @awaitio/site build` after the commit and commit `apps/site/out/`.

## Rebuild the export only with the dev server stopped

`next build` and `next dev` share `apps/site/.next`. Building while the dev server runs overwrites its files and the dev site loses its styles.

✅ DO: stop the dev server, run `pnpm --filter @awaitio/site build`, then start it again (delete `.next` first if it already broke).

❌ DON'T: run the build next to a running `next dev`.

## One fact per sentence in marketing copy

Facts that stand on their own get their own sentence, not a tail joined with "and". A fact that holds for every case (the same software whether free or paid) is said as such, not tacked onto one case.

✅ DO: "Larger teams pay one flat monthly price per organization. Free or paid, it is the same software."

❌ DON'T: "Larger teams pay one flat monthly price, and it is the same software either way."

## Billing details stay on the pricing page

Invoices, payment steps and contract terms belong on `/pricing`, in the terms and in the license. Headlines and calls to action on other pages (hero, sponsor strip) speak about the product and the price model only.

✅ DO: mention "Invoice on request" on the pricing cards.

❌ DON'T: add "with an invoice for every payment" to a section of the home page.

## Long explanations in short paragraphs

A block that explains several steps (how to pay, what the license is, how to get an invoice) is split into one short paragraph per step instead of one long paragraph.

## No ellipsis inside inline code

Inline code in copy names a real call. An ellipsis after it (`await io.input…`) reads like broken code; say what it is in words instead.

✅ DO: "Every `await io.input` call shows a form …"

❌ DON'T: "Every `await io.input…` shows a form …"

## Every page fits a 320 px wide phone

No page scrolls sideways on a phone. The header folds its text links into a menu below `sm`. A grid or flex child that holds code or a `truncate` file name gets `min-w-0`, otherwise its unbroken text sets the minimum width and pushes the whole page wider.

✅ DO: check the pages at 320 and 375 px after a layout change; long code wraps or scrolls inside its own box.

❌ DON'T: add a nav link, a fixed-width row or a code card without checking that it still fits.

## Icons live in `src/icons/`, one per file

Every inline SVG icon is its own component in `apps/site/src/icons/<Name>Icon.tsx`, imported where it is drawn. A component file holds its own markup, not helper icons.

✅ DO: `import { GitHubIcon } from '../icons/GitHubIcon';`

❌ DON'T: declare `const GitHubIcon` next to `SiteHeader` in the same file.

## OG images come from Figma

Link preview images are made in the Figma file AwaitIO, section "OG images" (one 1200×630 frame per page), exported as PNG to `public/og/<page>.png`. Only images of pages that exist go into `public/og/`; `documentation.png` is the preview of docs.awaitio.com, which `apps/docs/docs.json` points at under `seo.metatags`.

✅ DO: change the frame in Figma and export it again.

❌ DON'T: edit the PNG or draw a preview in code.
