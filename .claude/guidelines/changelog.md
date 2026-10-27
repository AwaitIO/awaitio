# Changelog Guidelines

`apps/docs/changelog.mdx` is the public changelog, linked from the main navigation of the docs and from the header and footer of awaitio.com. The `CHANGELOG.md` files Changesets writes into each package stay as they are; this page is the one people and agents read.

## Written at release time

The page is updated only when releasing, never in an ordinary commit. Before `pnpm version-packages` deletes the changesets, the release adds a new `<Update label="1.0.1" description="October 21, 2026" …>` at the top from everything released since the last release: the `.changeset/*.md` files, the commits since the last `[release] version packages`, and new packages released at their first version without a changeset. It is committed in `[release] version packages`.

**Why**: what is released is known only at release time; lines written per commit describe work that may still change or never ship, and an Unreleased block on the public page shows readers things they cannot install yet.

✅ DO: commit a component change with its changeset only, and write its line when the release is cut.

❌ DON'T: add an `Unreleased` block or a line to `apps/docs/changelog.mdx` in a feature commit.

## A release image at the top of every release

Every `<Update>` opens with its release image from the Figma file AwaitIO, page Changelog (frame `Release 1.1` for `1.1.0` and so on), with the big number written as the full version (`1.1.0`, never `1.1`), exported as PNG at 2× (2400×1260) to `apps/docs/images/changelog/<version>.png`. It is the first line inside the `<Update>`, above any text, as a plain `<img>` with `style={{ marginTop: 0, borderRadius: 12 }}` and an alt text naming the release and its packages.

**Why**: Mintlify gives images a top margin; without `marginTop: 0` the image sits lower than the version label beside it. The 12 px radius softens the corners of the full-bleed image.

✅ DO:

```mdx
<Update label="1.1.0" description="October 22, 2026" tags={["Core"]}>
  <img src="/images/changelog/1.1.0.png" style={{ marginTop: 0, borderRadius: 12 }} alt="AwaitIO 1.1 release: …" />

  ## Core
```

❌ DON'T: put the image below the first paragraph or leave out `marginTop: 0` and `borderRadius: 12`.

## The release image is made without being asked

When the frame for a release is not in Figma yet, make it straight away when the changelog entry is written (`/prepare-release` does it): duplicate the last `Release <major>.<minor>` frame on the Changelog page next to it, rename it, change the big number and the package chips to what goes out (a `NEW` tag only on a package released for the first time), and draw a new pixel illustration of the release's main change in the same 12 px grid and colors. Export it at 2× to `apps/docs/images/changelog/<version>.png` and give the user the link to the frame (`https://www.figma.com/design/<file>/AwaitIO?node-id=<id>`) to check.

**Why**: the release is not ready without its image, and the user only wants to look at it, not ask for it.

✅ DO: send the Figma link together with the release report.

❌ DON'T: report the image as missing and wait to be asked to make it.

## Grouped by scope, not by package

Inside each `<Update>` the lines are grouped under `##` headings by scope, in this order, a heading with nothing under it left out:

1. **Core**: `awaitio`
2. **Components**: `@awaitio/*` packages, each line naming its component
3. **Theme**: `@awaitio/theme-default`
4. **License**: changes to `LICENSE`, which ship in every package

Under each heading, one line says which packages and versions it covers, each written as `package@version` in inline code (`awaitio@1.1.0`, `@awaitio/select-single@1.1.0`, `@awaitio/*@1.0.1`, every component). The `tags` of the `<Update>` list the scopes it contains.

**Why**: `package@version` is how npm, the git tags and `npm install` write it, so a reader or an agent can copy it as it is.

**Why**: a license change lands in 23 packages at once; listed per package, the page repeats it 23 times.

## Lines say what changed for the user

One short English sentence per change, in the words of someone using AwaitIO: what they see or can now do, the option or component by its name and linked to its docs page. No commit hashes, no internal file names.

## A migration guide in every release, collapsed

Every released `<Update>` ends with a migration guide, so a person or an agent told "we are on 0.1.0, what do I change so it keeps working and type-checks?" finds the answer in one place. It sits in an `<AccordionGroup>`, one `<Accordion>` per scope or component, so it is closed by default and does not push the release notes down.

- It is its own `## Migration guide` section after the scopes, like **License**, opened by one line naming the versions (`From 0.1.0 to 1.0.0.`). Each accordion is titled with the full npm name of the package it is about (`awaitio`, `@awaitio/input-text`, `@awaitio/theme-default`, `@awaitio/*` for every component at once), and `License` for the license.
- Each accordion lists exactly what to change in user code: the old call, the new call, a short code block when it helps, and what breaks (type error, runtime error, different behaviour) when it is not changed.
- A scope with nothing to change says so in one line ("Nothing to change."). Leave it in: "no change needed" is an answer the agent is looking for.
- Every breaking change since the last release gets its migration lines, written with the rest of the release entry.

**Why**: agents upgrading a project read the changelog first; a guide that is there but collapsed answers them without cluttering the page for people.

✅ DO:

```mdx
## Migration guide

From 0.1.0 to 1.0.0.

<AccordionGroup>
  <Accordion title="awaitio">Nothing to change.</Accordion>
  <Accordion title="@awaitio/input-text">The `placeholder` option is now `hint`. Rename it in every `io.input.text` call, or the call does not type-check.</Accordion>
</AccordionGroup>
```

❌ DON'T: write "see the docs" or leave the migration out because nothing broke.

## A Discord message with every release

Whenever a release is added to `apps/docs/changelog.mdx`, also write `discord.md` at the repository root (never committed, overwritten each release; `/prepare-release` writes it on its own) with the same release as a message for the `#releases` channel, ready to copy:

- `## AwaitIO 1.1.0`, then `-# October 22, 2026` (small grey text on Discord), then the scopes as `**Core** · awaitio@1.1.0` (the version in inline code) with the same lines, shortened where the changelog is long.
- No links inside the lines (doc paths are relative); end with `Full changelog: <https://docs.awaitio.com/changelog>`, in `<>` so Discord shows no preview.
- The migration guide as one `**Upgrading from 1.0.0:**` line, not accordions.
- Under 2000 characters, Discord's limit for one message. Several releases at once: one message each, oldest first, separated by an HTML comment the user does not copy.

**Why**: the release is announced on Discord by hand; a message written from the same changelog entry is copied as it is, without rewriting MDX into Discord markdown.

✅ DO: write `discord.md` in the same step as the changelog entry, without being asked.

❌ DON'T: commit `discord.md` or put it anywhere git tracks.

## A tweet next to the Discord message

Every release that gets `discord.md` also gets its tweet in `.claude/tweets/`, in the same step, as "A tweet with every release" in `tweets.md` says.
