---
title: 'Switch Workspace'
read_only: true
type: 'command'
---

# Switch Workspace

Points the VS Code workspace at the checkout the user wants to see. The editor shows one checkout at a
time — the one being worked on — and switches on demand; `all` puts every checkout back side by side
and **keeps** it that way: new worktrees join the list, deleted ones leave it, until the user switches
to a single checkout again.

The workspace file is `/Users/homoky/Developer/awaitio.code-workspace`. It lives **outside**
the repository, so it is never part of a commit. VS Code reloads the folder list on its own as soon as
the file changes — nothing else needs to be restarted.

## Arguments

| Invocation                 | The workspace shows                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------ |
| `/switch-workspace`        | the checkout **this conversation** works in                                          |
| `/switch-workspace <name>` | the worktree with that **directory name or branch name**; `main` = the main checkout |
| `/switch-workspace all`    | the main checkout first, then every worktree                                         |

- **No argument** — find the conversation's checkout the way [`/rename-chat`](./rename-chat.md)
  finds its worktree (**Finding the worktree**): the worktree the conversation created or has been
  writing into under `/Users/homoky/Developer/awaitio.worktrees/`, or the main checkout when
  there is none. Never ask — a conversation without a worktree means `main`.
- **A name** — match it against `git worktree list --porcelain`, by the last segment of the worktree
  path first and by the branch (`refs/heads/<branch>`) second. Several matches or none → list the
  closest worktrees as a numbered list and ask; never guess.
- **`all`** — the main checkout, then every worktree under `awaitio.worktrees/` that still
  exists on disk, sorted by name. Worktrees elsewhere (another tool's directory) are left out.

## The view

The file remembers which view it is in through one top-level key:

| File                              | View                                              |
| --------------------------------- | ------------------------------------------------- |
| `"view": "all"` next to `folders` | `all` — stays on every checkout                   |
| no `view` key                     | a single checkout — the next worktree replaces it |

- `/switch-workspace all` writes `"view": "all"`; running it again rebuilds the list from
  `git worktree list`, which also repairs a list that drifted.
- `/switch-workspace <name>`, `main` or no argument switches to a single checkout and **removes** the
  `view` key — choosing one checkout ends the `all` view.
- [`/create-worktree`](./create-worktree.md) and [`/delete-worktree`](./delete-worktree.md) read the
  key: in the `all` view they add or remove the one entry and keep the key; otherwise they behave as a
  single-checkout switch.
- VS Code underlines the key as an "Unknown workspace configuration property" when the file itself is
  open in the editor. It is only a warning and changes nothing; leave the key in.

## Process

1. Resolve the target from the argument as above.
2. Read the workspace file with the Read tool. When it does not exist yet, create it with the Write
   tool as `{ "folders": [], "settings": {} }` filled in by steps 3 and 4, and tell the user to open
   it once with **File → Open Workspace from File…**; from then on VS Code follows every change.
3. Replace **only** the `folders` array and the `view` key (see **The view**); anything else in the
   file stays untouched, apart from the settings step 4 guarantees. The entries have exactly this
   shape, relative to `/Users/homoky/Developer`:

   ```json
   { "name": "main", "path": "awaitio" }
   ```

   ```json
   { "path": "awaitio.worktrees/<name>" }
   ```

   The main checkout is the only entry with a `name` — it is what makes it read `main` in the editor.

4. Make sure `settings` carries the lines below, and add any that is missing — every other setting
   stays as it is:

   ```json
   "git.autoRepositoryDetection": "subFolders",
   "scm.alwaysShowRepositories": true,
   "scm.repositories.selectionMode": "multiple"
   ```

   Without it the git extension also opens the repository of every **open editor tab**. Tabs left over
   from the previous worktree then keep that worktree's repository open, and Source Control and the
   branch in the status bar stay on the old worktree although the Explorer already shows the new one —
   a window reload does not help, because the tabs are restored with it. With `subFolders` only the
   repositories of the workspace folders are opened, so the git views follow the switch.

   The two `scm.*` lines are for the `all` view. Source Control lists the changes of the **selected**
   repositories only, and it remembers the selection from the previous view — after a switch from one
   worktree to `all` it keeps showing that one worktree. `alwaysShowRepositories` puts the
   **Repositories** list above Changes and `multiple` lets several of them be selected at once.
   Newly added repositories are not selected on their own: the user selects them all once in the
   Repositories list (click the first, ⇧-click the last). Mention this in the report whenever the
   `all` view gains a checkout.

5. Write it with the Edit tool and keep the JSON valid — no trailing comma, indentation unchanged.
   Check it parses: `jq '.folders' /Users/homoky/Developer/awaitio.code-workspace`.
6. Report in one line: what the workspace shows now (`collection-color-icon`, `main`, or `all — 26
checkouts`).

## Notes

- **The workspace file is a view, not a registry.** Even in the `all` view it may lag behind a
  worktree made by hand, so nothing may read it to find out which worktrees exist —
  `git worktree list` is the source of truth for that.
- Switching never touches a worktree, a branch or a running dev server; it only changes what the
  editor shows.
- **Source Control or the status bar still on the previous worktree's branch** means the old
  repository is still open next to the new one. Check that the setting from step 4 is in the file; the
  git extension's log (`Git.log` of the window, under VS Code's `logs/` folder) says which repositories
  it opened and ends each scan with `repositories (<n>)` — it has to be one per workspace folder.
- [`/create-worktree`](./create-worktree.md) runs this command as soon as a worktree is created: in
  the `all` view as `/switch-workspace all`, so the new worktree joins the list, otherwise on the new
  worktree, so the editor moves to the checkout the conversation is about to write into.
  [`/delete-worktree`](./delete-worktree.md) keeps the file consistent with whatever view it is in —
  see its workspace step.
