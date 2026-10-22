# Changelog Guidelines

`apps/docs/changelog.mdx` is the public changelog, linked from the main navigation of the docs and from the header and footer of awaitio.com. The `CHANGELOG.md` files Changesets writes into each package stay as they are; this page is the one people and agents read.

## Written at release time

The page is updated only when releasing, never in an ordinary commit. Before `pnpm version-packages` deletes the changesets, the release adds a new `<Update label="1.0.1" description="October 21, 2026" …>` at the top from everything released since the last release: the `.changeset/*.md` files, the commits since the last `[release] version packages`, and new packages released at their first version without a changeset. It is committed in `[release] version packages`.

**Why**: what is released is known only at release time; lines written per commit describe work that may still change or never ship, and an Unreleased block on the public page shows readers things they cannot install yet.

✅ DO: commit a component change with its changeset only, and write its line when the release is cut.

❌ DON'T: add an `Unreleased` block or a line to `apps/docs/changelog.mdx` in a feature commit.

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
