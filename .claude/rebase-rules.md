# Rebase rules (AwaitIO)

Repository-specific rules for the global `/rebase-main` (`~/.claude/commands/rebase-main.md`), which
`/merge-worktree-to-main` composes. They come on top of the generic rules there and win where they
differ. During a rebase `--ours` is the main branch and `--theirs` is the worktree branch.

## Conflict rules

- **Generated files** (test database dumps and anything marked generated in `.gitattributes`) — take
  the branch version and regenerate it if the package has a command for that, rather than merging
  line by line.
- **`apps/site/out/`** — the committed static export is generated, never merged by hand and never
  rebuilt here. Take the main branch's version of every conflicting file there; `/prepare-release` rebuilds
  the export on `main` (`.claude/guidelines/site.md`).
- **`CHANGELOG.md` and `package.json` versions written by `pnpm version-packages`** — the higher
  version wins, and both sides' changelog entries are kept, newest first.
- **`.changeset/*.md`** — the files have unique names and rarely conflict. When one side deleted a
  changeset that `pnpm version-packages` used up on the main branch, take the deletion.
- **Docs screenshots (`apps/docs/images/**`)** — binary, so they cannot be merged. Take the branch
  version and say so; it is the one that matches the branch's code.
