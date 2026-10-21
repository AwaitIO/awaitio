# Changelog Guidelines

`apps/docs/changelog.mdx` is the public changelog, linked from the main navigation of the docs and from the header and footer of awaitio.com. The `CHANGELOG.md` files Changesets writes into each package stay as they are; this page is the one people and agents read.

## Updated with every commit that has a changeset

The page is never written in one go at release time. Every commit that stages a `.changeset/*.md` also adds its line to the page, in the same commit, so the page is always as current as `main`.

- The newest entry is `<Update label="Unreleased" …>` at the top. A commit adds its lines there; create the block when it is missing.
- `[release] version packages` renames that block to the new version (`label="1.0.1"`) with the release date in `description` (`October 21, 2026`), in the same commit.

**Why**: written at release time, the page misses half of what changed; written per commit, the line comes from the diff that is staged right then.

✅ DO: stage `.changeset/…_sdk_max-failed-logins-option.md` and the new line under **Core** in the Unreleased block together.

❌ DON'T: leave the page for `pnpm version-packages` to catch up.

## Grouped by scope, not by package

Inside each `<Update>` the lines are grouped under `##` headings by scope, in this order, a heading with nothing under it left out:

1. **Core**: `awaitio`
2. **Components**: `@awaitio/*` packages, each line naming its component
3. **Theme**: `@awaitio/theme-default`
4. **License**: changes to `LICENSE`, which ship in every package

Under each heading, one line says which packages and versions it covers (`awaitio` 1.0.0, Every `@awaitio/*` package 1.0.0). The `tags` of the `<Update>` list the scopes it contains.

**Why**: a license change lands in 23 packages at once; listed per package, the page repeats it 23 times.

## Lines say what changed for the user

One short English sentence per change, in the words of someone using AwaitIO: what they see or can now do, the option or component by its name and linked to its docs page. No commit hashes, no internal file names.

## A migration guide in every release, collapsed

Every released `<Update>` ends with a migration guide, so a person or an agent told "we are on 0.1.0, what do I change so it keeps working and type-checks?" finds the answer in one place. It sits in an `<AccordionGroup>`, one `<Accordion>` per scope or component, so it is closed by default and does not push the release notes down.

- It is its own `## Migration guide` section after the scopes, like **License**, opened by one line naming the versions (`From 0.1.0 to 1.0.0.`). Each accordion is titled with the scope or component name alone (`Core`, `input-text`, `License`).
- Each accordion lists exactly what to change in user code: the old call, the new call, a short code block when it helps, and what breaks (type error, runtime error, different behaviour) when it is not changed.
- A scope with nothing to change says so in one line ("Nothing to change."). Leave it in: "no change needed" is an answer the agent is looking for.
- Every breaking change in a changeset gets its migration lines in the same commit as the change, in the Unreleased block.

**Why**: agents upgrading a project read the changelog first; a guide that is there but collapsed answers them without cluttering the page for people.

✅ DO:

```mdx
## Migration guide

From 0.1.0 to 1.0.0.

<AccordionGroup>
  <Accordion title="Core">Nothing to change.</Accordion>
</AccordionGroup>
```

❌ DON'T: write "see the docs" or leave the migration out because nothing broke.
