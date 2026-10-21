---
title: 'Create Worktree'
read_only: true
type: 'command'
---

# Create Worktree

Creates a git worktree for this repository and makes it usable — correct name, correct location,
dependencies installed and built in the background, and the VS Code workspace switched to it.

**Never use `EnterWorktree`.** Always `git worktree add`, always to the sibling directory described
below. The reasoning is at the bottom of this file.

## Process

### 1. Resolve the name

- A worktree is named after the **conversation it belongs to**, slugified (lowercase, dashes instead
  of spaces).
- **When the conversation already has a name, use it.** Never invent a name from the task
  description as a substitute for one that exists.
- **When it does not, pick the name yourself and get on with it.** Do not ask, do not propose
  candidates, do not stall the worktree on a naming round trip. Choose it the way
  [`/rename-chat`](./rename-chat.md) says to — name the goal, not the mechanism — and say in one
  line what you picked. A conversation that opens with "create a worktree and do X" has everything
  needed to name itself.
- If the name contains emoji, strip them out — the worktree and workspace entry use the plain text
  only. `🚀 Redis cache` becomes `redis-cache`.

### 2. Create it next to the repo

Every worktree lives in `/Users/homoky/Developer/awaitio.worktrees/<conversation-name>`.

```bash
git worktree add /Users/homoky/Developer/awaitio.worktrees/<name> -b <name>
```

Reason for the location: `.claude/worktrees/` is ignored by the parent repo
(`.gitignore`), so VS Code refuses to open worktrees there as repositories. Siblings of the
repo are detected normally.

Then work in it through **absolute paths**. The session stays in the main checkout, so `main` remains
editable throughout — including `CLAUDE.md`.

### 3. Set it up

A worktree is a fresh checkout of **tracked files only** — no `node_modules`, no built `dist/`, no
`.env` and none of the uncommitted work sitting in the main checkout. Straight after
`git worktree add`, copy the root `.env` across, then start the install and the build **in the
background, as one chained command**, and move on:

```bash
cp /Users/homoky/Developer/awaitio/.env <worktree>/.env
cd <worktree> && nohup sh -c "pnpm install && pnpm copy-license && pnpm --filter './libs/**' run build" > /dev/null 2>&1 < /dev/null & disown
```

- **Copy `.env` before anything starts.** It is gitignored and holds the demo's `SESSION_SECRET`,
  demo user and `PORT`; `apps/demo`'s `dev` script reads it through `env-cmd -f ../../.env` and dies
  without it. Skip the copy silently when the main checkout has none.
- `pnpm install` runs from the worktree root over the **whole workspace**, never `--filter`.
  Filtering to one package leaves every other package without `node_modules` and the build then dies
  immediately. pnpm shares its store across worktrees, so it is quick.
- `pnpm copy-license` copies the root `LICENSE` into every package and the `libs/**` build produces
  their `dist/` folders. They are gitignored, so a new worktree has none, and the components, the
  demo and `pnpm tsc` all typecheck against `libs/sdk/dist` — nothing type-checks until the build has
  finished.
- **Never the whole `pnpm build`.** It also builds `apps/site`, which rewrites the committed static
  export in `apps/site/out/` with new hashes, so the fresh worktree starts dirty with dozens of files
  that belong to no change. The export is rebuilt only when the site changes, as `commit-rules.md`
  says.
- **Do not copy `dist/` over from the main checkout.** The build creates it from this branch's own
  sources; a copied one is stale by definition.

**Do not wait for it, do not check whether it passed, do not report failures.** Say the setup is
running in the background and continue. If it fails, it fails against work that has not happened
yet, and the user will find out when it matters.

### 4. Handle what a worktree does not bring

Case by case, only when relevant:

- **Uncommitted work from the main checkout.** `rsync -a` it across (exclude `node_modules` and
  `dist`), verify with `diff -rq`, and only then delete the original. Never delete first.
- **Dev servers running in the main checkout.** `pnpm dev` in two checkouts at once fights over the
  same ports — the demo's `PORT` from `.env`, the docs on 8070, the site on 8080. When both have to
  run side by side, give the worktree's `.env` its own `PORT` and start docs or site with another
  `--port`; never stop a server in another checkout to make room.
- **`reference/`.** The read-only clones are gitignored and stay in the main checkout only. Read them
  there, through `/Users/homoky/Developer/awaitio/reference/`; never clone them again into a
  worktree.

### 5. Switch the VS Code workspace to it

Straight away, every time, with no question — the only check is the view the file is in
(`"view": "all"`, see **The view** in `/switch-workspace`):

- **`all` view** → run [`/switch-workspace all`](./switch-workspace.md). The new worktree joins the
  list in its sorted place and the `all` view stays on.
- **Anything else** (a single checkout, or no file yet) → run
  [`/switch-workspace <conversation-name>`](./switch-workspace.md). The editor then shows exactly the
  new worktree, the checkout the conversation is about to write into.

- Follow `/switch-workspace` as written; it owns the workspace file, its entry shapes, the `view` key
  and the `git.autoRepositoryDetection` setting. Do not edit the file by hand from here.
- The workspace file lives **outside** the repository, so it is never part of a commit.

### 6. Rename the conversation

**Mandatory, every time a worktree is created** — the chat has to carry the worktree it now works
in, or the worktree becomes unfindable later. Every chat is named `[worktree] what it is about` (see
[`/rename-chat`](./rename-chat.md)).

- Run [`/rename-chat`](./rename-chat.md) and follow its steps 3 to 5 — locate the session log, find
  any background job holding that `sessionId`, write the name to both, check the VS Code workspace
  and put the job into its place in the job list. Skip its step 2; do not propose candidates
- The prefix is the new worktree's directory name — `[cli-export-command]`.
  **It replaces whatever prefix the chat had so far**: a conversation that started in the main
  checkout as `[main] export command` becomes `[cli-export-command] export command`. A `[main]`
  prefix must never survive the move into a worktree
- The description after the prefix is the conversation's own name: keep the one it already has, or
  pick one the way `/rename-chat` says when there is none yet. It does not have to repeat the slug
- A name the user set by hand gets the new prefix too — only the description after it is locked
- This runs after step 5, so the new worktree is already in the workspace when the job list is
  reordered
- The same applies when the worktree is renamed later — the prefix follows it, the description stays

### 7. Report

State the worktree path, the branch, that the VS Code workspace now shows the new worktree and the
conversation's new name.

## Why not `EnterWorktree`

It creates the worktree in `.claude/worktrees/`, which is the wrong place, and getting it to the
right place costs three extra steps plus a permanent side effect:

- It **locks** the worktree to the session, so a plain `git worktree move` fails with
  `cannot move a locked working tree` — it has to be unlocked, moved, and locked again.
- After the move the session **cannot switch back into it**: `EnterWorktree` only accepts paths under
  `.claude/worktrees/` and refuses a sibling path every time.
- The session stays **pinned to the pre-move path**, which no longer exists. From then on `Write` and
  `Edit` refuse to touch the main checkout for the rest of the session — anything belonging in `main`
  can only be edited through the shell — and the exit-time keep/remove prompt never fires.

If the user explicitly asks for `EnterWorktree`, use it and follow that path; otherwise
`git worktree add` is the default.

## Important Notes

- Deleting a worktree is **`/delete-worktree`**, never a hand-rolled `git worktree remove`. It gates
  on uncommitted files and on unmerged work, and it removes the branch and the workspace entry too.
- The worktree and the workspace switch belong together — a new worktree is always in what the editor
  shows: alone, or among all the others in the `all` view.
