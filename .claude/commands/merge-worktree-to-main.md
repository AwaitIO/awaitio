---
title: 'Merge Worktree to Main'
read_only: true
type: 'command'
---

# Merge Worktree to Main

Brings the current worktree's commits onto the main branch: rebase first, then merge, then verify the
work is really there. The worktree stays on disk and keeps its branch — nothing is deleted, nothing
is committed.

**This command only makes sense inside a linked worktree.** In the main checkout there is nothing to
merge from.

It is the middle of the end-of-worktree chain on its own — no commit at the front, no deletion at
the back. Committing is `/commit-fast`, the rebase itself is
[`/rebase-main`](./rebase-main.md), and removing the worktree afterwards is
[`/delete-worktree`](./delete-worktree.md). When their rules change, they change here too; this
file composes them, it does not restate them as its own policy.

The worktree is going to stay alive — the work lands on main and the branch carries on.

**Uncommitted work does not stop this command — on either side.** A dirty worktree and unrelated work
in progress in the main checkout are both the normal state, so the command stashes what is in the way,
merges, and puts it back — see steps 1, 3 and 5. Committing is still never done on the user's behalf:
this command merges what is already committed, it does not decide what should be.

## Progress table

**After every step, reprint the whole table.** It is the running status of the chain — the user reads
it to see where the command got to, so it appears again after each step, complete, never as a partial
update and never only at the end.

The table is a **fixed template**: always these six rows, always these step names, always in English,
whatever language the conversation runs in. Rows are never added, removed, renamed or reordered — only
the `Status` column changes.

| #   | Step                                      | Status    |
| --- | ----------------------------------------- | --------- |
| 1   | Stash uncommitted work in the worktree    | ⏸ waiting |
| 2   | Rebase branch onto main                   | ⏸ waiting |
| 3   | Stash colliding work in the main checkout | ⏸ waiting |
| 4   | Merge into main                           | ⏸ waiting |
| 5   | Restore the stashes                       | ⏸ waiting |
| 6   | Verify the commits are on main            | ⏸ waiting |

Allowed values of `Status`, and nothing else:

- `⏸ waiting` — not started yet
- `⏳ working` — running right now
- `✅ done` — finished, optionally followed by ` — <detail>`
- `⏭ skipped` — genuinely nothing to do (branch already on top of the main branch, nothing to stash)
- `⚠️ attention!` — stopped here; the detail says why

The detail after `done`, `skipped` and `attention!` is short, factual and in English — a hash, a
count, a file path, a reason. Never a sentence of explanation; that belongs in the text below the
table.

Only one step is `⏳ working` at a time. Once a row reads `⚠️ attention!`, every row below it stays
`⏸ waiting` — the chain does not continue past a stop, and it never rolls back the steps that already
succeeded. **Step 5 is the one exception:** every stash taken by this command is restored, whichever
earlier step stopped. Work in a stash is never left behind.

## Process

### 1. Check where you are and stash uncommitted work in the worktree

Row 1 goes to `⏳ working`. Print the table.

```bash
git rev-parse --git-dir
git rev-parse --git-common-dir
```

- **They differ** → this is a linked worktree. Continue.
- **They are the same** → this is the main working tree. **Abort** in one line: there is nothing here
  to merge into itself.

Resolve the names once, up front, and reuse them throughout:

```bash
git rev-parse --abbrev-ref HEAD                    # <worktree-branch>
git -C <main-repo> rev-parse --abbrev-ref HEAD     # <main-branch>
```

`<main-repo>` is the parent directory of `git rev-parse --git-common-dir`.

Then check there is anything to merge at all — **before** stashing, so a branch with nothing to merge
never gets its tree disturbed:

```bash
git log <main-branch>..<worktree-branch> --oneline            # must not be empty
```

- **No commits ahead of the main branch** → **stop** in one line: there is nothing to merge. This is
  not an error, it is an already-merged branch. Row 1 becomes `⚠️ attention! — nothing to merge`, and
  nothing is stashed.

Only then look at the tree — `git status --porcelain`, where untracked files count too. Uncommitted
work is not part of the merge, so it goes into a stash and comes back in step 5:

- **Clean** → row 1 becomes `⏭ skipped`.
- **Not clean** → **stash it, including untracked files**, under a name step 5 can find again:

  ```bash
  git stash push --include-untracked --message "merge-to-main worktree <worktree-branch> <ISO timestamp>"
  git status --porcelain            # must be empty now
  ```

  List the stashed files before moving on. Row 1 becomes `✅ done — <n> files stashed`.

  - `--include-untracked` is **not optional** — the rebase in step 2 trips over new files otherwise.
  - **Never `git stash drop`, never `git checkout --`, never `git reset --hard` and never commit** to
    get the tree clean.
  - If `git status --porcelain` is still not empty afterwards, **stop**: row 1 becomes
    `⚠️ attention! — tree still dirty`.

Print the table.

### 2. Rebase onto the main branch

Row 2 goes to `⏳ working`. Print the table.

The main branch almost always moved on while the worktree was being worked on. Conflicts belong here,
in the branch, where they can be built and tested — never on the main branch during the merge.

**Follow [`/rebase-main`](./rebase-main.md) exactly as written**, from its stash step through the
conflict rules to its verification. All of its rules apply unchanged — the inverted `--ours` /
`--theirs` sides, the `pnpm-lock.yaml` handling, the static export in `apps/site/out/`, the
changelogs and versions, the docs screenshots, the both-sides-kept lists.

- It **prints its own six-row table**. That is fine and expected: print it as it runs, then come back
  to this command's table when the step is over. Two tables, one per command, never merged into one.
- Step 1 already emptied the worktree, so **its stash step will report nothing to stash**. That is
  correct — one stash for the whole chain, not two nested ones. The stash from step 1 stays untouched
  by the rebase and is restored here in step 5, not by `/rebase-main`.
- If it reports the branch was already on top of the main branch, row 2 becomes `⏭ skipped`.
- If it **escalates a conflict**, the chain stops here. Row 2 becomes `⚠️ attention! — <file>` and
  nothing is merged. The rebase is left in progress for the user to answer or abort — and because a
  stash cannot be popped over a rebase in progress, the report names the step 1 stash ref instead of
  restoring it.
- If it resolved conflicts, **offer to build and run the relevant tests before merging** — that is the
  whole point of rebasing first. Offer it; do not run anything without the user saying yes.

After the rebase the commit hashes changed, so re-read the list:

```bash
git log <main-branch>..<worktree-branch> --oneline
```

Row 2 becomes `✅ done — <n> conflicts resolved` (or just `✅ done`). Print the table.

### 3. Stash colliding work in the main checkout

Row 3 goes to `⏳ working`. Print the table.

Run every operation that touches the main branch through `git -C <main-repo>`. The main branch is
checked out and locked by the main repository; it cannot be checked out here, and git refuses to have
the same branch checked out in two worktrees.

The main checkout almost always carries unrelated uncommitted work. What matters is whether the merge
would touch a file that has uncommitted changes there, because git refuses to overwrite those:

```bash
git -C <main-repo> log -n 1 --oneline
comm -12 <(git -C <main-repo> diff --name-only <main-branch>..<worktree-branch> | sort) \
         <(git -C <main-repo> diff --name-only | sort)
```

- **Empty** → the merge cannot disturb the work in progress. Row 3 becomes `⏭ skipped — no collisions`.
- **Not empty** → **stash exactly those files** in the main checkout, and nothing else. A pathspec
  stash leaves the rest of the user's work in progress sitting where they left it, which a whole-tree
  stash would not:

  ```bash
  git -C <main-repo> stash push --include-untracked \
    --message "merge-to-main collisions <worktree-branch> <ISO timestamp>" -- <colliding paths>
  comm -12 ...   # re-run; must now be empty
  ```

  List the colliding files before moving on — they are the ones most likely to conflict when step 5
  puts them back, because the merge just rewrote them. Row 3 becomes `✅ done — <n> files stashed`.

  - **Never discard anything in the main checkout.** No `git checkout --`, no `git reset --hard`, no
    `git stash drop` on work that has not been restored. The stash is the only mechanism allowed.
  - If the collision list is still not empty after the stash, **stop**: row 3 becomes
    `⚠️ attention! — <n> files` and nothing is merged.

Print the table.

### 4. Merge into the main branch

Row 4 goes to `⏳ working`. Print the table.

1. **Show every commit that is going over** — `git -C <main-repo> log <main-branch>..<worktree-branch> --oneline`,
   short hash and subject, one per line. **Do not ask for confirmation**: invoking this command is the
   confirmation, and it merges the whole branch by definition. Showing the list still matters, so the
   user sees what landed.

2. **Merge with all commits, unless the invocation said squash.**

   - **Default — keep every commit.** No question, no proposal. The branch's history goes over as it
     is, and the merge commit uses git's default message. This is what happens whenever the command
     was invoked with nothing extra.
   - **Only when the invocation itself asked for a squash** — the command was called as
     `/merge-worktree-to-main squash`, or the message invoking it says to squash — squash instead.
     Write the message yourself, following all of `/commit-fast`'s message rules (`.claude/commit-rules.md`)
     (scope format, user-facing description body when the change affects users, no marketing
     language), and **use it without asking**. Show it in the report afterwards, not as a question
     beforehand.

   Never turn this into a question. Asking to squash _is_ the instruction; saying nothing _is_ the
   instruction to keep the commits.

3. **Perform the merge:**

   - Keep commits: `git -C <main-repo> merge <worktree-branch>`
   - Squash: `git -C <main-repo> merge --squash <worktree-branch>` followed by
     `git -C <main-repo> commit` with the message written above — squash only stages the changes, it
     does not create the commit by itself, so the explicit commit step is required.

4. **If the merge still conflicts**, something changed on the main branch since the rebase. Abort it
   (`git -C <main-repo> merge --abort`), go back to step 2 and rebase again, so the conflict is
   resolved in the branch and not on the main branch. Only resolve directly on the main branch when
   the user explicitly asks for it; if you do, stage the resolved files, complete the merge and
   explain what conflicted and which side you took.

Row 4 becomes `✅ done — <n> commits` or `✅ done — squashed`, or `⚠️ attention!` with the reason.
Print the table.

### 5. Restore the stashes

Row 5 goes to `⏳ working`. Print the table.

Two stashes may exist, and both are given back — the main checkout's first, because that is the tree
the merge just rewrote and the one the user is most likely looking at.

- **Nothing was stashed in steps 1 and 3** → row 5 becomes `⏭ skipped`.
- **Do not run this while a rebase or merge is still in progress.** Pop needs a settled index. Say
  the stash is still there, name its ref, and leave it.

**The main checkout stash from step 3:**

```bash
git -C <main-repo> stash pop <stash-ref>
git -C <main-repo> status --porcelain
```

**Expect conflicts here.** These are exactly the files the merge rewrote, so the stashed work and the
merged work meet on the same lines. Resolve them with **[`/rebase-main`](./rebase-main.md)'s conflict
rules**, unchanged — `pnpm-lock.yaml` regenerated rather than merged, generated files taken and
regenerated, the static export rebuilt rather than merged,
both sides kept when each added distinct entries to a list, everything else resolved by reading both
sides and keeping the intent of both. Two things differ from a rebase:

- **The sides are not inverted here.** In a `stash pop` the stashed work is `--theirs` and what is
  already in the tree — the freshly merged main — is `--ours`. State the side by its name, never by
  the flag.
- **The stashed side is the user's uncommitted work and it wins on intent.** It is newer than what was
  merged and it exists nowhere else. When in doubt, keep it and say so.

`git stash pop` leaves the stash in place when it fails — **keep it that way** and only
`git stash drop <stash-ref>` once the files are demonstrably correct. If a conflict cannot be resolved
with confidence, **stop**: row 5 becomes `⚠️ attention! — <file>` and the report names the stash ref.

**The worktree stash from step 1:**

```bash
git stash pop <stash-ref>
git status --porcelain
```

The branch was rebased under it, so this one can conflict too; the same rules apply.

Row 5 becomes `✅ done — <n> files restored` or `✅ done — <n> files restored, <n> conflicts resolved`.
Print the table.

### 6. Verify

Row 6 goes to `⏳ working`. Print the table.

```bash
git -C <main-repo> log -n 3 --oneline
git -C <main-repo> show HEAD --stat
```

Look at the relevant file contents too, not only the log. If the change is really there, **say so
plainly — the work is on the main branch, here is the commit hash.** No hedging.

Both trees are expected to be **dirty again** wherever step 5 restored a stash — that is the user's
uncommitted work, back where it belongs. Compare each file list against what steps 1 and 3 stashed; it
has to match.

Row 6 becomes `✅ done — <hash>`, or `⚠️ attention!` if the change is not actually there. Print the
table.

### 7. Report

The final table **is** the report — print it one last time, fully filled in. Underneath it:

- where the work landed — the main branch and the merge hash
- one line per stash that was restored, naming it and the file count; when a conflict was resolved in
  a pop, one line per file saying which side was taken
- any stash still sitting there because the chain stopped — that line goes **first**, with its ref
- the worktree is still on disk on branch `<worktree-branch>`, and
  [`/delete-worktree`](./delete-worktree.md) is what removes it, its branch and its VS Code workspace
  entry, whenever the user wants that

Offer that cleanup, never run it. Deleting is the other command's job.

One thing to flag when the merge was a squash: `/delete-worktree` will later list the branch's commits
as unmerged, because after a squash git no longer recognises them. That is expected, and its second
safety check covers it.

## Important Notes

- **The table is printed after every step**, always all six rows, always in English, even when the
  conversation runs in another language.
- **It asks nothing.** Merging keeps all commits by default; a squash happens only when the invocation
  said so, and then the message is written and used without confirmation.
- **Uncommitted work is stashed and restored on both sides, never committed and never discarded.** A
  dirty worktree and unrelated work in progress in the main checkout do not stop the chain. The main
  checkout is stashed by pathspec, so only the colliding files are moved.
- **Every stash is given back.** Step 5 runs even when an earlier step stopped, except while a rebase
  or merge is still in progress — and then the report names the ref.
- **The chain stops at the first real problem** — nothing to merge, an unresolvable conflict in the
  rebase, a collision that survived its stash, a merge that did not land, an unresolvable conflict in
  a pop. It never forces its way past one, and it never rolls back the steps that already succeeded;
  it reports where it got to.
- **It never commits and it never deletes.** Committing is `/commit-fast`, deleting is
  `/delete-worktree`.
- **The worktree survives.** The dev servers keep running, the branch stays, and work can continue
  here; removing it is `/delete-worktree`'s job.
- **In the main checkout it does nothing** — it aborts at step 1.
