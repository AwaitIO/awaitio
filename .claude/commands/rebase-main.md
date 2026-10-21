---
title: 'Rebase Worktree onto Main'
read_only: true
type: 'command'
---

# Rebase Worktree onto Main

Brings the current worktree branch up to date with the main branch by rebasing onto it, resolving
every conflict along the way. Nothing is merged, nothing is deleted — the branch simply ends up
sitting on top of the latest main, ready to be built, tested or merged.

**This command only makes sense inside a linked worktree.** In the main checkout there is nothing to
rebase onto itself.

The rebase rules live here, and [`/merge-worktree-to-main`](./merge-worktree-to-main.md) composes
them. It can be run at any point during the work — not only when the worktree is about to be
merged. When these rules change, they change there too.

**Uncommitted work does not stop this command.** A dirty worktree is the normal state mid-task, so
the command stashes it, rebases, and puts it back — see steps 1 and 5. Committing is still never done
on the user's behalf.

## Progress table

**After every step, reprint the whole table.** It is the running status of the rebase — the user
reads it to see where the command got to, so it appears again after each step, complete, never as a
partial update and never only at the end.

The table is a **fixed template**: always these six rows, always these step names, always in English,
whatever language the conversation runs in. Rows are never added, removed, renamed or reordered — only
the `Status` column changes.

| #   | Step                             | Status    |
| --- | -------------------------------- | --------- |
| 1   | Stash uncommitted work           | ⏸ waiting |
| 2   | Fetch and locate the main branch | ⏸ waiting |
| 3   | Rebase onto main                 | ⏸ waiting |
| 4   | Resolve conflicts                | ⏸ waiting |
| 5   | Restore the stash                | ⏸ waiting |
| 6   | Verify the branch                | ⏸ waiting |

Allowed values of `Status`, and nothing else:

- `⏸ waiting` — not started yet
- `⏳ working` — running right now
- `✅ done` — finished, optionally followed by ` — <detail>`
- `⏭ skipped` — genuinely nothing to do (branch already on top of main, no conflicts, nothing stashed)
- `⚠️ attention!` — stopped here; the detail says why

The detail after `done`, `skipped` and `attention!` is short, factual and in English — a hash, a
count, a file path, a reason. Never a sentence of explanation; that belongs in the text below the
table.

Only one step is `⏳ working` at a time. Once a row reads `⚠️ attention!`, every row below it stays
`⏸ waiting` — the chain does not continue past a stop. **Step 5 is the one exception:** if anything
was stashed in step 1, the stash is always restored, even when step 3 or 4 stopped. Work in a stash is
never left behind.

## Process

### 1. Check where you are and stash uncommitted work

Row 1 goes to `⏳ working`. Print the table.

```bash
git rev-parse --git-dir
git rev-parse --git-common-dir
```

- **They differ** → this is a linked worktree. Continue.
- **They are the same** → this is the main working tree. **Abort** in one line: there is nothing to
  rebase here. Do not rebase the main branch onto anything.

Resolve the names once, up front, and reuse them throughout:

```bash
git rev-parse --abbrev-ref HEAD                    # <worktree-branch>
git -C <main-repo> rev-parse --abbrev-ref HEAD     # <main-branch>
```

`<main-repo>` is the parent directory of `git rev-parse --git-common-dir`.

Then look at the tree — `git status --porcelain`, where untracked files count too. A rebase with a
dirty tree either refuses to start or leaves the changes stranded mid-replay, so anything uncommitted
goes into a stash first.

- **Clean** → nothing to do. Row 1 becomes `⏭ skipped`.
- **Not clean** → **stash it, including untracked files**, and remember the name so step 5 can find
  it even if other stashes appear in between:

  ```bash
  git stash push --include-untracked --message "rebase-main <worktree-branch> <ISO timestamp>"
  git stash list
  git status --porcelain            # must be empty now
  ```

  List the stashed files before moving on, so the user can see what went in. Row 1 becomes
  `✅ done — <n> files stashed`.

  - `--include-untracked` is **not optional** — without it new files stay in the tree and the rebase
    trips over them.
  - **Never `git stash drop`, never `git checkout --` and never commit** to get the tree clean. The
    stash is the only mechanism allowed here, and step 5 always gives it back.
  - If `git status --porcelain` is still not empty after the stash, **stop**: row 1 becomes
    `⚠️ attention! — tree still dirty` and nothing is rebased.

Print the table.

### 2. Fetch and locate the main branch

Row 2 goes to `⏳ working`. Print the table.

The main branch lives in the main checkout and may have moved on since this worktree was created.
Look at where it actually is now:

```bash
git -C <main-repo> log -n 1 --oneline
git merge-base --is-ancestor <main-branch> <worktree-branch>
```

- **Exit code 0** → the main branch is already an ancestor; the branch is up to date. Say so in one
  line, mark rows 2, 3 and 4 `⏭ skipped`, and go straight to step 5.
- **Non-zero** → the main branch has commits this branch does not have. Show how many, with
  `git log <worktree-branch>..<main-branch> --oneline`, and continue.

Row 2 becomes `✅ done — <n> commits behind`. Print the table.

### 3. Rebase onto main

Row 3 goes to `⏳ working`. Print the table.

Say the escape hatch out loud before starting: `git rebase --abort` puts the branch back exactly
where it was, so nothing here is unrecoverable. The stash from step 1 survives an abort untouched.

```bash
git rebase <main-branch>
```

- **Clean rebase** → row 3 becomes `✅ done — <n> commits replayed`, row 4 becomes `⏭ skipped`, and
  step 4 is skipped entirely.
- **Conflicts** → row 3 becomes `✅ done — conflicts` and step 4 resolves them.

Print the table.

### 4. Resolve conflicts

Row 4 goes to `⏳ working`. Print the table.

**Resolve them automatically — that is what this command is for.** The user is not asked to arbitrate
file by file; the rules below decide, and the report says which side was taken for every single file.
Only a conflict that none of these rules covers, and that cannot be resolved by reading both sides
with confidence, is escalated.

**Mind the inverted sides.** During a rebase `--ours` is the main branch (the commits being replayed
onto) and `--theirs` is the worktree branch. Getting this backwards silently throws away the work
being rebased, so state the side by its name — "kept the branch version" — not by the flag.

- **`pnpm-lock.yaml`** — never merge it by hand. Take the branch version and let the package manager
  reconcile it against the already merged `package.json` files:

  ```bash
  git checkout --theirs pnpm-lock.yaml
  pnpm install
  git add pnpm-lock.yaml
  ```

  Resolve conflicting `package.json` files first, so the lockfile is regenerated from the final state.

- **Generated files** (test database dumps and anything marked generated in `.gitattributes`) — take
  the branch version and regenerate it if the package has a command for that, rather than merging
  line by line.
- **`apps/site/out/`** — the committed static export is generated, never merged by hand. Take the
  branch version of every conflicting file there, finish the rebase, then rebuild it with
  `pnpm --filter @awaitio/site build` and let the user commit the result as `[site] static export`.
- **`CHANGELOG.md` and `package.json` versions written by `pnpm version-packages`** — the higher
  version wins, and both sides' changelog entries are kept, newest first.
- **`.changeset/*.md`** — the files have unique names and rarely conflict. When one side deleted a
  changeset that `pnpm version-packages` used up on the main branch, take the deletion.
- **Docs screenshots (`apps/docs/images/**`)** — binary, so they cannot be merged. Take the branch
  version and say so; it is the one that matches the branch's code.
- **Both sides added distinct entries to the same list** (imports, exports, translation keys, enum
  members, route tables) — keep both, in the order the file already uses. This is the most common
  conflict and it is almost never a real disagreement.
- **One side deleted what the other side changed** — do not guess. This is a real decision about
  intent; escalate it.
- **Everything else** — resolve by reading both sides and keeping the intent of both. Where the two
  sides genuinely contradict each other on the same line and there is no reading that keeps both,
  escalate.

Continue with `git rebase --continue` after each resolved commit, and keep going until the rebase
finishes. A rebase of several commits can stop repeatedly on the same file — resolve each stop the
same way.

**When a conflict is escalated:** leave the rebase in progress, do not abort it. Show the file, both
sides, and what makes the choice ambiguous, then ask. Row 4 becomes
`⚠️ attention! — <file>` and the chain stops there. The user can either answer, or run
`git rebase --abort` to get the branch back. **Do not restore the stash while a rebase is in
progress** — say that the stash is still there and name it, so nothing looks lost.

When the rebase completes, row 4 becomes `✅ done — <n> files resolved`. Print the table.

### 5. Restore the stash

Row 5 goes to `⏳ working`. Print the table.

- **Nothing was stashed in step 1** → row 5 becomes `⏭ skipped`.
- **Something was stashed** → put it back on top of the rebased branch, by the name from step 1:

  ```bash
  git stash pop <stash-ref>
  git status --porcelain
  ```

  The files from step 1 must all be back, and the stash must be gone from `git stash list`.

  - **`pop` succeeds** → row 5 becomes `✅ done — <n> files restored`.
  - **`pop` conflicts** → `git stash pop` leaves the stash in place on failure; **keep it that way**.
    Resolve the conflicts with the same rules as step 4, treating the stashed side as the branch
    version, then `git stash drop <stash-ref>` only once the files are demonstrably correct. If the
    conflict is not resolvable with confidence, **stop**: row 5 becomes
    `⚠️ attention! — <file>`, and the report names the stash ref so the work is one command away.

Print the table.

### 6. Verify the branch

Row 6 goes to `⏳ working`. Print the table.

```bash
git merge-base --is-ancestor <main-branch> <worktree-branch>   # must now be 0
git log <main-branch>..<worktree-branch> --oneline
git status --porcelain
```

The branch must now have the main branch as an ancestor and its own commits must still be there (the
hashes changed — that is expected).

The tree itself is expected to be **dirty again** when step 5 restored a stash — those are the user's
uncommitted changes, back where they belong. Compare the file list against what step 1 stashed; it has
to match. When nothing was stashed, the tree must be clean.

**If any conflict was resolved, offer to build and run the relevant tests** — that is the whole point
of rebasing in the branch rather than during a merge. Offer it; do not run anything without the user
saying yes.

Row 6 becomes `✅ done — <n> commits ahead of <main-branch>`, or `⚠️ attention!` with what is off.
Print the table.

### 7. Report

The final table **is** the report — print it one last time, fully filled in. Underneath it, and only
when conflicts were resolved, add one line per resolved file saying which side was taken:

```
- `pnpm-lock.yaml` — branch version, regenerated with `pnpm install`
- `apps/site/out/index.html` — branch version, export rebuilt
- `libs/sdk/src/index.ts` — both sides kept (two new exports)
```

When a stash was restored, add one line naming it and the file count. When a stash is still sitting
there because the command stopped, that line is the first thing under the table.

No prose summary on top of it.

## Important Notes

- **The table is printed after every step**, always all six rows, always in English, even when the
  conversation runs in another language.
- **Conflicts are resolved, not handed back.** Escalation is the exception, reserved for a genuine
  contradiction of intent, and it always names the file and both sides.
- **Uncommitted work is stashed and restored, never committed and never discarded.** A dirty worktree
  is normal mid-task and does not stop the command. `git stash drop` on unrestored work, `git checkout --`
  and `git reset --hard` are never used to make the tree clean.
- **A stash is always given back.** Step 5 runs even when an earlier step stopped, except while a
  rebase is still in progress — and then the report names the stash ref.
- **Nothing is merged and nothing is deleted here.** Merging is
  [`/merge-worktree-to-main`](./merge-worktree-to-main.md); closing the worktree is
  [`/delete-worktree`](./delete-worktree.md).
- **In the main checkout it does nothing** — it aborts at step 1.
- `git rebase --abort` is always available while the rebase is in progress, and the command says so
  before it starts. It does not touch the stash.
