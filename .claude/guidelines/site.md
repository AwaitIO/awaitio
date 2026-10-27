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

## Links outside the site carry an arrow and open in a new tab, in header and footer

A link that leaves awaitio.com (docs, changelog, GitHub, sponsors, contact) shows `ArrowIcon` after its label, in the header, the mobile menu and the footer, and opens in a new tab with `target="_blank" rel="noopener noreferrer"`. The X and GitHub icons in header and footer open in a new tab too. Links to the site's own pages have no arrow and stay in the same tab. In the footer, `FooterLink` with `external` does both.

**Why**: the arrow tells the reader before the click that the link leaves the site, and the new tab keeps awaitio.com open behind it.

✅ DO: `<a href={constants.DOCS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 …">Docs<ArrowIcon /></a>`

❌ DON'T: add an outside link without the arrow or opening in the same tab, or open a page of the site in a new tab.

## Icons live in `src/icons/`, one per file, drawn in square pixels

Every icon is its own component in `apps/site/src/icons/<Name>Icon.tsx` with `IconProps` (`size`, `className`), imported where it is drawn. Icons are drawn in the brand's square pixels like the hero sun, the logo and the competitor logos on `/vs`: the icon keeps its vector shapes as `PixelLayer`s and `PixelIcon` turns them into squares. `size="coarse"` (10 × 10 grid, drawn by hand in the icon's `coarse` bitmap) for big blocky icons such as the option cards of the component pages, `size="small"` (16 × 16 grid, almost no gap) for icons next to text, `size="medium"` (24 × 24 grid, a small gap) for mid-sized icons of lists and buttons, `size="normal"` (32 × 32 grid with a visible gap) for large icons of cards and sections. No plain line or filled SVG icons on the site.

**Why**: one pixel language across the site, so the icons read as part of the brand and not as a stock icon set.

✅ DO: `export const GitHubIcon: FC<IconProps> = ({ size = 'small', className = 'h-4 w-4' }) => { return <PixelIcon layers={layers} size={size} className={className} />; };`

❌ DON'T: declare `const GitHubIcon` next to `SiteHeader` in the same file, or draw an icon as a plain `<svg>` with `stroke`.

## Every page is wrapped in `<Page>`

`src/components/Page.tsx` writes a page's title, description, canonical URL, Open Graph and Twitter tags; React moves them into `<head>`. A page sets them as props right next to its content, never through Next's `metadata` export, and the root layout sets no title of its own.

✅ DO: `<Page title="Pricing – AwaitIO" description="…" ogImage="pricing" canonicalPath="/pricing/" lastModifiedAt={LAST_MODIFIED_AT}>`

❌ DON'T: `export const metadata = { title: … }` in a page or the layout.

## A page with a date exports `LAST_MODIFIED_AT`

A page whose content has a date of its own (pricing, the legal pages) exports `export const LAST_MODIFIED_AT = 'YYYY-MM-DD'` from its `page.tsx` and passes it to `<Page lastModifiedAt>` and, on legal pages, to `LegalPageLayout`. Move it whenever the content changes; it is `og:updated_time`, the "Last updated" line and the sitemap's `lastmod` at once.

✅ DO: bump `LAST_MODIFIED_AT` in the same change as the page's content.

❌ DON'T: keep the date in `constants` or write it out by hand in the page text.

## The sitemap is generated before every build

`scripts/generateSitemap.ts` (run by `prebuild`, or `pnpm --filter @awaitio/site generate:sitemap`) writes `public/sitemap.xml` and `public/robots.txt`, both committed. It lists every page by hand and imports `LAST_MODIFIED_AT` from the pages that have one; URLs go through `getSiteUrl`, the same helper as the canonical links.

✅ DO: add a new page to the list in `generateSitemap.ts` and import its `LAST_MODIFIED_AT` when it has one.

❌ DON'T: edit `public/sitemap.xml` by hand or add a Next.js `sitemap.ts` route.

## OG images come from Figma

Link preview images are made in the Figma file AwaitIO, section "OG images" (one 1200×630 frame per page), exported as PNG to `public/og/<page>.png` and listed in the `OgImage` type, which is what `<Page ogImage>` accepts. Only images of pages that exist go into `public/og/`; `documentation.png` is the preview of docs.awaitio.com, which `apps/docs/docs.json` points at under `seo.metatags`.

✅ DO: change the frame in Figma and export it again.

❌ DON'T: edit the PNG or draw a preview in code.

## Just code, against no-code

AwaitIO is "just code", said sharply against no-code, low-code and visual editors. It is the headline and the stance of every marketing text, not one benefit among others; the opposite is named openly.

✅ DO: "Internal tools. Just code." – "No drag-and-drop, no canvas, no widgets to wire."

❌ DON'T: soften it into "code-first" or "with a code escape hatch", or promise anything to people who do not write code.

## Plain words a newcomer understands

Launch and marketing copy is written so that someone who has never heard of AwaitIO understands it on the first read. Start with a concrete situation (support needs to refund an order), then what you do (write a function) and what happens (a form in the browser). Short sentences, no jargon in place of a picture.

✅ DO: "Your team opens Refund order in the browser and sees a form with one field: Order ID."

❌ DON'T: "Every await io asks a person in the browser. The same Node process serves the UI."
## The 404 page stands alone

`src/app/not-found.tsx` (the export's `404.html`) fills the whole screen with nothing but the dotted "Page not found", one line of text and the way out. Its section carries `data-bare-page`, and a rule in `globals.css` hides everything the layout wraps in `site-chrome` (header, sponsor strip, footer).

✅ DO: keep the 404 to the heading, the text and the two buttons.

❌ DON'T: add the header, footer or other sections back to it, or hide them with JavaScript.

## Short centered text breaks between sentences

A short centered paragraph of two sentences (a 404, an empty state) puts each sentence on its own line and uses `text-balance`, so no line ends with a stray word or two.

✅ DO: `<p className="text-balance"><span className="block">There is nothing at this address.</span><span className="block">The link may be old, or the address has a typo.</span></p>`

❌ DON'T: let one centered paragraph wrap wherever the width ends ("… or the address / has a typo.").
