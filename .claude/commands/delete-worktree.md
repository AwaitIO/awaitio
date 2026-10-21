---
title: 'Delete Worktree'
read_only: true
type: 'command'
---

# Delete Worktree

Removes a git worktree and everything that points at it, but **only once it is provably safe** — no
uncommitted work inside it, and nothing on its branch that has not reached the main branch.

Both safety checks are mandatory. If either fails, **abort and report** — never delete, never offer
to force it, never suggest `--force`. Losing a worktree loses work that exists nowhere else, and the
user cannot get it back.

## Process

### 1. Identify the worktree

- If the user named one, use it. Otherwise run `git worktree list` and ask which one.
- Resolve `<main-repo>` (the main working tree), `<worktree-path>`, `<worktree-branch>` and
  `<main-branch>`:

  ```bash
  git worktree list
  git -C <main-repo> rev-parse --abbrev-ref HEAD     # <main-branch>
  git -C <worktree-path> rev-parse --abbrev-ref HEAD # <worktree-branch>
  ```

- Never delete the main working tree. If the chosen path is the main repo, abort.

### 2. Safety check one — the worktree must be clean

```bash
git -C <worktree-path> status --porcelain
```

**Any output at all means abort** — with one exception, below. That includes untracked files (`??`) —
a new tool or a draft sitting there uncommitted is exactly the kind of work that disappears silently.

**Disposable files never count.** The paths below are local to the worktree and are discarded with
it. Each one is relative to the worktree root, and glob wildcards are allowed — `*` within one
directory, `**` across any number of them (`**/.env` would match every `.env` in the tree):

- `.env`

Modified (`M`), deleted (`D`) or new (`??`), a matching file does not abort the deletion. Leave those
lines out before deciding; only the rest of the output has to be empty. A file the patterns do not
match is ordinary work and aborts like anything else — `.env` matches the root one only, not
`apps/demo/.env`. Matching files are discarded in [step 5](#5-remove-the-worktree), not here, and never
listed in the abort message.

Gitignored files never show up here, so `node_modules`, `dist/` and the copied `libs/*/LICENSE`
files do not block the deletion either.

On abort, show the user what is there and stop:

```
Aborting — <worktree-branch> has <n> uncommitted files:

  M  path/to/file.ts
  ?? path/to/new-thing/

Commit them (or delete them deliberately) and run this again.
```

Then close the reply with the **needs-you** banner from [Final banner](#final-banner).

### 3. Safety check two — everything must be on the main branch

A **squashed** merge leaves the branch's own commits unmerged from git's point of view even though the
content is on the main branch, so the commit list alone cannot answer this. Start with it anyway:

```bash
git -C <main-repo> log <main-branch>..<worktree-branch> --oneline   # commits git still calls unmerged
```

- **Empty** → everything landed, continue.
- **Not empty** → the work may still have arrived through a squash merge, so compare the content
  before concluding anything. Take the files the branch actually touched and diff exactly those
  between the two tips:

  ```bash
  BASE=$(git -C <main-repo> merge-base <main-branch> <worktree-branch>)
  FILES=$(git -C <main-repo> diff --name-only $BASE..<worktree-branch>)
  git -C <main-repo> diff --stat <main-branch>..<worktree-branch> -- $FILES
  ```

  Never use `git diff <main-branch>...<worktree-branch>` (three dots) for this. It measures the branch
  against the merge base, so after a squash merge it always replays the branch's own changes and looks
  like unmerged work when there is none. Restricting a two-dot diff to the branch's own files also
  keeps commits that landed on the main branch meanwhile from showing up as a false difference.

- **Content diff empty** → this was a squash merge. The content is on the main branch, so continue,
  and say so, so the user knows why the commit list looked alarming.
- **Content diff not empty** → abort. Show the commits and the changed files:

  ```
  Aborting — <worktree-branch> has work that is not on <main-branch>:

    a1b2c3d [scope] subject
    e4f5g6h [scope] subject

    3 files still differ from <main-branch>.

  Merge it first (/commit-fast offers this), then run this again.
  ```

  Then close the reply with the **stopped** banner from [Final banner](#final-banner).

### 4. Remove the VS Code workspace entry

Only after both safety checks pass, and **before** the worktree itself is removed — the editor must
stop pointing at the folder first, otherwise it briefly references a path that no longer exists.

The worktree may be listed in `/Users/homoky/Developer/awaitio.code-workspace` — the file
is a view that [`/switch-workspace`](./switch-workspace.md) points at one checkout or at all of them.
An entry pointing at a deleted folder breaks the editor, so this step is **not optional**.

- Not listed, or the file does not exist → nothing to do here.
- Listed **as the only entry** → the editor is looking at exactly this worktree; point it at the main
  checkout instead, the way `/switch-workspace main` writes it.
- Listed among others → remove the matching object from the `folders` array. In the `all` view
  (`"view": "all"`) the key stays, so the view stays on every remaining checkout:

  ```json
  {
    "path": "awaitio.worktrees/<name>"
  }
  ```

- Keep the JSON valid — no trailing comma, indentation unchanged.
- The workspace file lives **outside** the repository, so it is never part of a commit.

### 5. Remove the worktree

Only after the workspace entry is gone.

- If the session is currently **inside** that worktree, leave it first — a worktree cannot be removed
  from within itself. Use the session's worktree-exit mechanism, or move to `<main-repo>` and operate
  with `git -C`.
- Discard the disposable files safety check one let through, so `worktree remove` finds the worktree
  clean — a tracked one is restored, a new one is deleted:

  ```bash
  git -C <worktree-path> checkout -- <tracked disposable files>
  rm <worktree-path>/<untracked disposable files>
  ```

- Then remove the worktree:

  ```bash
  git -C <main-repo> worktree remove <worktree-path>
  ```

- **Which branch delete to use follows from safety check two, so pick it up front and run it once.**
  Do not try `-d` when its refusal is already certain — the failed attempt and the explanation of why
  it failed are noise the user has read many times:

  - Safety check two found **no unmerged commits** → `git -C <main-repo> branch -d <worktree-branch>`
  - Safety check two found commits but an **empty content diff** (the squash case) → git will refuse
    `-d` every time, so go straight to `git -C <main-repo> branch -D <worktree-branch>`

- Never reach for `-D` on any other grounds. Outside the confirmed squash case a refusal from `-d`
  means the branch really does carry work that is nowhere else, and the answer is to stop, not to
  force it.
- Report the deletion as one line of the final summary. The `-d` versus `-D` choice is an internal
  detail — the squash was already explained in safety check two and does not need repeating here.
- If `worktree remove` reports the worktree is locked, unlock it first:
  `git -C <main-repo> worktree unlock <worktree-path>`.

### 6. Switch the conversations back to `[main]`

**Mandatory after every deletion.** A chat is named `[worktree] what it is about` (see
[`/rename-chat`](./rename-chat.md)), and a prefix pointing at a worktree that no longer exists sends
the user nowhere.

- Find every background job whose name starts with `[<worktree-name>]` — this conversation and any
  other one that worked in the deleted worktree
- Replace that prefix with `[main]` and keep the description after it. A name the user set by hand is
  switched too — only its description is locked
- Write the names and reorder the job list by following [`/rename-chat`](./rename-chat.md) steps 3
  to 5 — skip its step 2, there is nothing to propose. The workspace entry is already gone (step 4),
  so the jobs land in the `[main]` block

### 7. Report

State plainly what was removed:

```
Removed:
  worktree  awaitio.worktrees/<name>
  branch    <worktree-branch>
  workspace entry in awaitio.code-workspace

Renamed to [main]:
  <each conversation that carried the worktree prefix>

<n> worktrees left.
```

Run `git worktree list` once more and include the count, so it stays visible how many are still
around.

### Final banner

End every run with the banner from
[`final-banner.md`](../guidelines/final-banner.md), command name `/delete-worktree`.

- **✅ DONE** — only when all of these hold: the worktree is removed, the branch is deleted, the
  workspace entry is gone, the conversations carry `[main]` again and there is no open question for
  the user.
- **⚠️ NEEDS YOU** — safety check one failed; nothing was deleted.
- **❌ STOPPED** — safety check two failed; nothing was deleted.

Checklist items for this command: `worktree removed`, `branch on main`, `git status clean`,
`workspace updated` — or their `✗` counterparts (`2 uncommitted files`, `3 files differ`).

`git status clean` is **safety check one — the status of the worktree being deleted**, never the main
checkout. The main checkout almost always carries unrelated work in progress, which says nothing about
whether the deletion succeeded — it never downgrades the banner and is not mentioned in the report.

## Important Notes

- **Never force.** If a safety check fails, the answer is to fix the cause, not to override it.
- **Untracked files count as work.** `??` entries abort just like modified ones — except the
  disposable files listed in safety check one, which are discarded with the worktree.
- Deleting is the last step of a flow that starts with merging — `/commit-fast` offers this command
  after it has verified the merge landed on the main branch.
- Removing the worktree directory without removing the workspace entry (or the other way round)
  leaves the setup broken. Both, or neither.
