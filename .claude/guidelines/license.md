# License Guidelines

The AwaitIO License and its prices are written out in several places. They must always say the same thing.

## Change the license and pricing everywhere at once

A change to the license, the prices, the user limits, the way to pay or the invoice and Enterprise terms goes into every place below in the same change. A place left behind tells people a different price or rule than the license.

1. `LICENSE` – the only license file and the binding text. Edit it here only: `pnpm copy-license` (part of `pnpm build`) copies it into every `libs/*/LICENSE`, which are gitignored.
2. `README.md` – the short License section: the free limit, one flat monthly price and a link to `/pricing`. Changes only with the free limit or the price model.
3. `libs/sdk/README.md` – the same short License section on the npm page of `awaitio`.
4. `apps/docs/license.mdx` – the price table, the same short text and a link to `/pricing`.
5. `apps/site/src/app/pricing/page.tsx` – the tier cards and "How to get a Company License". Its FAQ and examples are read at build time from the "Examples" section of `LICENSE` (`apps/site/src/utils/readLicenseExamples.ts`); only "Why is AwaitIO licensed this way?" is written in the page.
6. `apps/site/src/app/terms-of-use/page.tsx` – the Company Licenses section; also move `LEGAL_LAST_UPDATED` in `apps/site/src/constants.ts`.
7. `apps/site/src/components/SupportBanner.tsx` and `SponsorStrip.tsx` – the sponsoring texts, when what a sponsorship means changes.
8. A changeset for every published package (`patch`), because each one ships the license. `/commit-fast` writes it when the change is staged; never write it ahead (see `common.md`).

✅ DO: after the edit, grep for the old value (`$50`, `4–10`, `Company License`) across these files and check that none is left.

❌ DON'T: change the price on the pricing page only, or edit a `libs/*/LICENSE` copy by hand.

## A license change applies to new versions only

Each released version keeps the license it was released with (the "Changes to this license" section of `LICENSE`). Do not write retroactive terms into the license or the texts around it.

## The license examples are the pricing FAQ

The "Examples" section of `LICENSE` is binding and the pricing page shows it word for word. Each `### group` holds `#### question` entries with plain paragraphs; the first group ("General questions") becomes the FAQ, the other groups the "Examples" section. A new or changed answer about who pays and how users count goes into that section, never into the page alone. The license email becomes a link on the site.

✅ DO: add a `#### Question?` with its answer to the right group in `LICENSE`, or a new `### group` when none fits, and rebuild the site.

❌ DON'T: write a license answer by hand into the pricing page, where it can drift from the license.

## Full license details live in two places only

The full rules (how users are counted, agencies, SaaS, open source, what is not allowed) are written only in `LICENSE` and on `/pricing`, which reads its FAQ and examples from `LICENSE`. READMEs and the docs say in a few sentences who pays and link to `/pricing`.

✅ DO: add a new rule or example to `LICENSE`; the pricing page picks it up.

❌ DON'T: copy license rules into the READMEs or the docs, where they drift from the license.
