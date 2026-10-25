---
title: 'Prepare Release'
type: 'command'
---

# Prepare Release

Gets `main` ready for a release: installs, builds, commits the site's static export, writes the
missing changesets and the release entry of `apps/docs/changelog.mdx`, then lists what the user runs
next. It never bumps versions, tags, publishes or pushes; that stays with the user (see **Versions and
releases** in `CLAUDE.md`).

Run only when the user invokes it.

## 1. Check: on main and clean

Run in the **main checkout** (`git worktree list`, the first row), never in a worktree:

```bash
git rev-parse --abbrev-ref HEAD   # must be main
git rev-parse --git-dir           # must equal git rev-parse --git-common-dir (not a linked worktree)
git status --porcelain            # must print nothing, untracked files included
git fetch origin main && git rev-list --count HEAD..origin/main   # must be 0
```

Any check failing → **abort** in red with the reason (`Not on main.`, `Uncommitted changes: <files>.`,
`main is behind origin/main by <n> commits.`) and change nothing.

## 2. Install and build

Stop a running site dev server first: `pnpm build` builds the site too and would break it (see
`.claude/guidelines/site.md`).

```bash
pnpm install
pnpm build
pnpm lint && pnpm tsc && pnpm test
```

A failure aborts with the failing package and its error. Nothing is committed.

## 3. Site export

`pnpm build` in step 2 already built the site (`next build` writes `apps/site/out/`), so nothing is
built again here:

```bash
git status --porcelain apps/site/out
```

When `apps/site/out/` changed, stage it alone and commit it as exactly `[site] static export`. This is
the one place Claude builds and commits the export, because the user ran this command on `main`.
When nothing changed, say so in one line.

## 4. Changesets

Find the last release and what changed in `libs/` since:

```bash
git log -1 --format=%H --grep='^\[release\] version packages'
git diff --name-only <last-release>..HEAD -- libs/
ls .changeset/*.md
```

For every package in `libs/` that changed since the last release:

- **Has a changeset** naming it: fine.
- **New package** whose `package.json` version is not on npm yet (`npm view <name> version` fails):
  no changeset of its own (`.claude/guidelines/components.md`); the step below moves it with
  `awaitio` when its minor goes up.
- **Changed code or public behaviour without a changeset**: write one by the rules in
  `.claude/commit-rules.md` (bump, file name, one English line), from the commits that touched it.
- **Only tests, a README or comments**: no changeset.

Then keep major and minor the same for every package (**Versions and releases** in `CLAUDE.md`):
when any changeset raises `awaitio` by a `minor` or `major`, write one more changeset,
`<date>_all_align-with-awaitio-<major>-<minor>.md`, that names every other package in `libs/` with
the same bump and one line saying they move with `awaitio`. Then `pnpm changeset status --verbose`
must list the same major and minor for every package.

Leave the new changesets uncommitted; they go into the release commit.

## 5. Changelog page

Add the release to the top of `apps/docs/changelog.mdx` as `.claude/guidelines/changelog.md` says:
one `<Update>` with the versions `pnpm version-packages` will produce (`pnpm changeset status
--verbose` lists them) and new packages at their own version, grouped by scope, with the migration
guide. Use today's date. Leave it uncommitted.

Then write `discord.md` at the repository root, the same release as a message for the Discord
`#releases` channel (see "A Discord message with every release" in `changelog.md`).

## 6. Report and next steps

One line each: install and build passed, the export commit (hash) or no change, the changesets
written, the packages and versions going out. Then the remaining steps from `CLAUDE.md`, numbered,
for the user to run:

1. Review the changesets and `apps/docs/changelog.mdx`.
2. `pnpm version-packages`
3. Commit everything as exactly `[release] version packages`.
4. `npm whoami` (`npm login` when it fails).
5. `pnpm release`
6. Check the tags on https://github.com/awaitio/awaitio/tags.
7. Post `discord.md` to the Discord `#releases` channel.
