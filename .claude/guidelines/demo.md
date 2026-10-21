# Demo Guidelines

`apps/demo` is the public demo at demo.awaitio.com: the backoffice of Shopwise, a made-up store platform, with a Prisma-like `db` over made-up rows in `src/db/data/`. Its screens are also the screenshots in the docs and on awaitio.com.

## No Czech names

People, stores and email addresses in the demo use English or international names, never Czech ones: no Czech first names or surnames (Marek, Hana, Tomáš, Dvořák, Svobodová, Novák…) and no Czech diacritics (á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž) anywhere in the data.

**Why**: the demo is the product's public face for an international audience, and its rows end up in every screenshot of the docs and the site.

✅ DO: `{ name: 'Grace Miller', email: 'grace@brickandboard.example' }`

❌ DON'T: `{ name: 'Hana Svobodová', email: 'hana@brickandboard.example' }`

**What to Check**: `grep -rnP '[ěščřžýáíéůúťďňĚŠČŘŽÝÁÍÉŮÚŤĎŇ]' apps/demo/src` finds nothing, and a renamed person's email changes everywhere it is used (users, accounts' `ownerEmail`, tickets' `requesterEmail`).
