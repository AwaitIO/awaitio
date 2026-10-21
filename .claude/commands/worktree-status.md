---
title: 'Worktree Status'
read_only: true
type: 'command'
---

# Worktree Status

Reports the state of **the worktree the session is currently in** — what this conversation did, how
the branch stands against the main branch, and whether it is safe to remove.

**One worktree only — the current one.** Never enumerate the other worktrees of the repository.
They belong to other conversations, they are not this conversation's business, and a list of nine
of them buries the one line that matters. `/delete-worktree` and `git worktree list` are where the
inventory lives.

**Read-only.** This command never commits, never merges, never deletes, never rebases and never
runs `pnpm install` or a build. It looks and it reports. Acting on what it found is
`/commit-fast`, `/delete-worktree` or the user's call — never this command's.

It runs in two situations:

- **On its own**, when the user invokes `/worktree-status`.
- **Automatically at the end of `/commit-fast`**, printed directly above the
  post-commit question. That is the moment the user decides what to do next, and the decision needs
  exactly these numbers.

## Process

### 1. Collect the data

Every number comes from git. Do not guess, do not read the VS Code workspace file, do not stat
`node_modules` or `dist/`. Run this from inside the worktree:

```bash
main_repo=$(git rev-parse --path-format=absolute --git-common-dir | xargs dirname)
wt=$(git rev-parse --show-toplevel)
main_branch=$(git -C "$main_repo" rev-parse --abbrev-ref HEAD)
branch=$(git rev-parse --abbrev-ref HEAD)

st=$(git status --porcelain)
dirty=$(printf '%s' "$st" | grep -c . | tr -d ' ')
untracked=$(printf '%s' "$st" | grep -c '^??' | tr -d ' ')
ahead=$(git -C "$main_repo" rev-list --count "$main_branch..$branch" 2>/dev/null)
behind=$(git -C "$main_repo" rev-list --count "$branch..$main_branch" 2>/dev/null)
added=$(git -C "$main_repo" diff --name-only "$main_branch...$branch")
if [ -z "$added" ]; then content=0
else content=$(git -C "$main_repo" diff --name-only "$main_branch" "$branch" -- $added | grep -c . | tr -d ' '); fi

echo "worktree=$(basename "$wt") branch=$branch main=$main_branch dirty=$dirty untracked=$untracked ahead=$ahead behind=$behind content=$content"
printf '%s\n' "$st"
```

**When `$wt` equals `$main_repo`, the session is in the main checkout, not a worktree.** There is
nothing to delete and nothing to merge, so skip straight to [step 3](#3-summarise-this-conversation) and print
the conversation summary alone. Do not invent a worktree row for the main checkout.

Field by field:

- `dirty` — total uncommitted entries, **untracked files included**. That is deliberate: an
  untracked draft is exactly the work that disappears without a trace.
- `untracked` — how many of those are `??`.
- `ahead` — commits on this branch that the main branch does not have.
- `behind` — commits the main branch has and this branch does not. `0` means the branch sits
  directly on top of the main branch and needs no rebase.
- `content` — **the number of files this branch changed that still differ from the main branch.**
  This is the field that answers "is everything here already in main", and it is the only one that
  survives a squashed merge.

  It is computed in two steps, and both are load-bearing:

  1. `git diff --name-only <main>...<branch>` — three dots — lists only the files **this branch
     touched**, measured from the merge base.
  2. Those paths are then compared between the two branch tips directly. `content = 0` means every
     file this branch touched is byte-identical in the main branch.

  **Never collapse this into a plain `git diff <main>..<branch>`** (two dots). That diff is
  symmetric: for a branch sitting hundreds of commits behind it reports thousands of files that the
  _main branch_ changed and this branch never saw, and the answer becomes meaningless.

`added` is expanded unquoted on purpose, so each path becomes its own pathspec — file paths
containing spaces are the one case this cannot handle.

**Do not rename `st` to `status`.** The command runs under zsh, where `status` is a read-only shell
variable and the assignment aborts the whole script with `read-only variable: status`.

### 2. Answer the three questions

**Is everything here already in the main branch?** `content = 0` says yes: every file this branch
touched is identical in the main branch. **A squashed merge leaves `ahead > 0` while the content is
already there** — that is why `ahead` alone cannot answer this and `git diff` can. When
`content = 0` but `ahead > 0`, the branch was squash-merged: say exactly that, and note that
`/delete-worktree` will list those commits as unmerged and is expected to.

**Is the rebase from the main branch done, 1:1?** `behind = 0` means yes — the branch is a straight
continuation of the main branch, a merge would fast-forward, nothing needs replaying. `behind > 0`
means the main branch moved on by that many commits and the branch needs `git rebase <main-branch>`
before it can merge cleanly. Report the number; never run the rebase.

**Is it deletable?** All three, and they are checked in this order:

| Condition                                    | Field         | Why it matters                                    |
| -------------------------------------------- | ------------- | ------------------------------------------------- |
| Nothing uncommitted                          | `dirty = 0`   | Uncommitted work exists nowhere else              |
| Every touched file is 1:1 in the main branch | `content = 0` | Every change here already reached the main branch |
| No commits pending                           | `ahead = 0`   | Belt and braces on top of the content check       |

**Separate real work from noise before counting.** Some files show up dirty in nearly every
worktree and mean nothing:

- `.env` and other local-only configuration.

Subtract those from `dirty`. When the entire diff is noise, the worktree is **not** carrying
uncommitted work — say `noise only` and treat it as clean. Without this the warning fires in
practically every worktree and the report stops carrying any signal.

Flag these too, never silently:

- The worktree being `locked` in `git worktree list`.
- A branch name that differs from the directory name — the two drifted apart, and
  `/delete-worktree` needs the real branch name.

### 3. Summarise this conversation

Above everything else, say what **this conversation** has been about, as bullets, from the
conversation's own context — not from git. This is the one part of the report not derived from the
repository.

- **Extremely short.** One line per topic, a handful of words each. No sentences, no reasoning, no
  outcomes, no file paths.
- **Two to four bullets.** A conversation needing more than four is being summarised at too fine a
  grain — go up a level.
- Name what was worked on, not how it went. `worktree-status command` — not `we successfully created
the worktree-status command after discussing the format`.
- Write it in the language of the conversation.
- **When the conversation has done nothing yet** — the command was its first act — skip this section
  rather than inventing a topic.

### 4. Report

The summary, then one small table for this worktree. Nothing else — no preamble, no recommendation
paragraph, no other worktrees.

```
**In this conversation:**

- saving links and notes from the terminal
- CLI docs, release 1.0.0

**Worktree** `cli-bookmark-card` · branch `cli-bookmark-card`

| | |
| --- | --- |
| Uncommitted | — |
| In main already | yes — all 6 touched files are 1:1 |
| Rebase from main | done, 0 commits behind |
| Deletable | ✅ yes — `/delete-worktree` |
```

Rules for the report:

- Write it in the language of the conversation. Keep the branch and worktree names verbatim.
- The header line names the worktree **and** its branch, always both — they can differ.
- `Uncommitted` shows `—` for zero, otherwise the count, `n untracked` when all of them are
  untracked, and `noise only` for the generated/local-config case.
- `In main already` and `Rebase from main` answer in words, not raw numbers alone. `no — 4 commits
behind` reads; `behind: 4` does not.
- `Deletable` always says **why**, in a few words. A bare `no` tells the user nothing.
- **In the main checkout, print the conversation summary alone** and nothing else — no table, no
  empty worktree row, no note explaining that there is no worktree.
- Name a command (`/delete-worktree`, `/commit-fast`) rather than a raw git invocation. The user
  runs those; hand-rolled `git worktree remove` is never the suggestion.

## Important Notes

- The numbers are a snapshot. A background job writing to this worktree changes them underneath.
- **Deletable here means "worth offering `/delete-worktree` for", not "delete it".** That command
  runs its own safety checks and they are the ones that decide.
- `content = 0` says the branch adds nothing the main branch does not already have. It does **not**
  say the branch is up to date — that is what `behind` is for, and the two are independent: a branch
  can be fully merged in content and still sit hundreds of commits behind.
