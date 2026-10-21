# License Guidelines

The AwaitIO License and its prices are written out in several places. They must always say the same thing.

## Change the license and pricing everywhere at once

A change to the license, the prices, the user limits, the way to pay or the invoice and Enterprise terms goes into every place below in the same change. A place left behind tells people a different price or rule than the license.

1. `LICENSE` – the only license file and the binding text. Edit it here only: `pnpm copy-license` (part of `pnpm build`) copies it into every `libs/*/LICENSE`, which are gitignored.
2. `README.md` – the License section (table of tiers, how to pay, invoice, sponsoring) for GitHub.
3. `libs/sdk/README.md` – the same License section on the npm page of `awaitio`.
4. `apps/docs/license.mdx` – the License and pricing page in the Other group of the docs.
5. `apps/site/src/app/pricing/page.tsx` – the tier cards and "How to get a Company License".
6. `apps/site/src/app/terms-of-use/page.tsx` – the Company Licenses section; also move `LEGAL_LAST_UPDATED` in `apps/site/src/constants.ts`.
7. `apps/site/src/components/SupportBanner.tsx` and `SponsorStrip.tsx` – the sponsoring texts, when what a sponsorship means changes.
8. A changeset for every published package (`patch`), because each one ships the license. `/commit-fast` writes it when the change is staged; never write it ahead (see `common.md`).

✅ DO: after the edit, grep for the old value (`$50`, `4–10`, `Company License`) across these files and check that none is left.

❌ DON'T: change the price on the pricing page only, or edit a `libs/*/LICENSE` copy by hand.

## A license change applies to new versions only

Each released version keeps the license it was released with (the "Changes to this license" section of `LICENSE`). Do not write retroactive terms into the license or the texts around it.
