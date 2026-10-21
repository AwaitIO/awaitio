---
title: 'Rename Chat'
read_only: true
type: 'command'
---

# Rename Chat

Reads the current conversation, works out what it is actually about and renames it
to a short, scannable English title. Proposes three candidates, lets the user pick
one and then writes the chosen name so it shows up in the chat list.

## Naming format

```
[worktree] what it is about
```

Most chats carry no emoji at all. The only prefix that exists is `♻️`, and it means
one specific thing — the conversation covered more than one task. Never add an
emoji for the kind of work, the state of the session or the mood of the topic.

- **worktree** — the worktree the conversation works in, spelled as its directory
  name under `/Users/homoky/Developer/awaitio.worktrees/` —
  `[pricing-page-redesign]`, `[cards-and-collections-redis-cache]`. Never shorten,
  translate or re-slug it. A conversation with no worktree of its own works in the
  main checkout, so it gets `[main]`.

- **what it is about** — the conversation's own name, independent of the
  worktree. Lowercase English, roughly three to six words, concrete enough that the
  user recognises the chat weeks later. `chat history storage`, not
  `investigation`. No trailing punctuation. It must add something the worktree name
  does not already say — never just repeat the slug in words.

### Finding the worktree

The session always runs in the main checkout, so its working directory never tells
which worktree the conversation belongs to.

- Look in the conversation for the worktree it created or has been writing into —
  a `git worktree add` or absolute paths under
  `/Users/homoky/Developer/awaitio.worktrees/<name>`
- Check that the worktree still exists with `git worktree list` — never with the
  VS Code workspace file, which [`/switch-workspace`](./switch-workspace.md) turns
  into a view of a single checkout and so no longer lists every worktree
- When the conversation has written into more than one worktree, use the one the
  current work lives in
- No worktree anywhere in the conversation means `[main]`
- A worktree that has since been deleted means `[main]` too — the work lives on
  `main` now

## Length

**The description has a 40-column limit; the worktree prefix does not count.**
The worktree name is fixed and is never cut, whatever its length. The description
is what the user reads to tell two chats in the same worktree apart, so keep it
tight.

- Count an emoji as **2 columns**. `♻️` plus its space counts towards the
  description's 40
- When it does not fit, shorten the description, never the worktree name
- A `♻️` name that will not fit drops to two topics, then to one topic plus ` · …`
- Verify the width of the description alone before writing:

  ```bash
  printf '%s' "$DESCRIPTION" | wc -m
  ```

## Name the goal, not the mechanism

The single most common mistake is naming the tool, the step or the artefact
instead of what the user was actually trying to achieve. The opening message
usually describes a step — the goal it serves often only arrives one or two
messages later, so never name a chat from the first message alone.

The test: **if this had gone perfectly, what would the user have walked away
with?** Name that. Not the thing that got typed first, not the thing that took the
most turns, not the thing that appears most often in the log.

These are the ways a name drifts away from the goal. Each one produces a name that
is technically accurate and useless:

- **Named after a tool** — the API, library or CLI that happened to be used.
  A tool is interchangeable; the user would have accepted any tool that worked, so
  it cannot be what the chat was about. Name the result the tool produced.
- **Named after a command** — a `/command` invocation and its arguments. The
  command is how the work was requested, never what it was. Name the subject the
  command was pointed at.
- **Named after an intermediate step** — a step performed only so that a later
  step became possible. Ask what the step was in service of, and if that answer is
  also a step, keep asking. Downloading, extracting, converting, listing and
  building are almost always steps.
- **Named after an artefact the user pasted** — credentials, a screenshot, a log,
  an error. What the user pasted is the input; the chat is about what they wanted
  done with it.
- **Named after the form of the conversation** — that it was a question, a
  clarification, a discussion, a review, a request in a particular language. Every
  chat has a form and it distinguishes nothing. Name the subject matter.
- **Named after the outcome the assistant reached** — "not needed after all",
  "already supported". The user's goal is what makes the chat findable later; the
  answer they got is not something they will remember to search for.

A useful check once a name is written: could this name sit on a completely
different conversation in this repo without being wrong? If yes, it names the form
or the process rather than the work, and it needs to be more specific.

Where the conversation ended somewhere other than where it started, name where it
ended, unless the two are separate enough to earn `♻️`.

## Multiple tasks in one conversation

When the conversation covered more than one distinct task — not several steps of
the same task, but genuinely separate pieces of work — mark it:

- Put `♻️` at the very start of the name, before the worktree
- Separate the topics with `·`, most substantial first
- List at most three topics; if there were more, name the three biggest and append
  ` · …`

```
♻️ [worktree] first topic · second topic
```

Example: `♻️ [main] chat history storage · rename chat command`

A conversation that drifted from asking a question into fixing what the answer
uncovered is still **one** task. Reserve `♻️` for cases where the user genuinely
switched subject.

## Running without being asked

The root `CLAUDE.md` allows this to run on its own when a conversation has moved
on from what its name says. That run behaves differently:

- **Check the name is not locked first.** If the log contains a
  `The user named this session "…"` note (or the job's `nameSource` is `user`), the
  user named it by hand. Its description stands regardless of how far the
  conversation has drifted — only the `[worktree]` prefix may still change
- Skip step 2 entirely. Do not propose candidates and do not ask anything; pick
  the best name and write it
- Report it as one line at the end of a reply that was being written anyway, never
  as a reply of its own and never in the middle of a task
- The bar is higher than for a requested run. Rename only if the current name would
  send the user to the wrong chat, not merely because a better name exists
- Do it at most once per conversation. A second automatic rename means the first
  one named a passing message rather than the work
- **A wrong `[worktree]` prefix is always fixed.** When the conversation creates
  its first worktree, moves to another one or its worktree is renamed, update the
  prefix straight away and keep the description. This is bookkeeping, not a rename
  — it does not count towards the once-per-conversation limit and does not need the
  higher bar
- **A user-set name still gets the prefix.** The lock protects the description the
  user wrote, not the `[worktree]` part — add or fix the prefix and leave the
  user's words after it untouched

## Process

1. Work out what the conversation was about:

   - Re-read the conversation from the first user message, not just the recent
     part. The opening message states a step; the goal behind it usually surfaces
     a message or two later, so keep reading before deciding
   - List the distinct tasks the user asked for. Follow-up questions, corrections
     and debugging that grew out of a task belong to that task
   - Find the worktree (see **Finding the worktree**) and decide whether the
     conversation earns the `♻️` prefix
   - If the conversation is still only a greeting or a single unanswered question,
     say there is not enough to name yet and stop

2. Propose three candidates:

   - All three must follow the naming format, but differ in what they emphasise —
     e.g. one naming the outcome, one naming the subject matter, one broader
   - Present them as a numbered list, with the recommended one first
   - Ask the user to pick a number or type their own name
   - Never write anything before the user has answered

3. Locate where the name lives:

   - Session logs are at `~/.claude/projects/{encoded-cwd}/{session-id}.jsonl`,
     where `{encoded-cwd}` is the working directory with `/` replaced by `-`
   - Pick the most recently modified `.jsonl` and confirm it is this conversation
     by reading its first `"type":"user"` entry. Several sessions share a project
     directory and the newest file is not always the current one. If it does not
     match, list the candidates with their modification times and ask
   - Take the `sessionId` from that file, then look for a background job holding
     it. Match with `jq`, not `grep` — `state.json` is pretty-printed, so a
     `"sessionId":"…"` pattern finds nothing:

     ```bash
     for s in ~/.claude/jobs/*/state.json; do
       [ "$(jq -r '.sessionId // empty' "$s")" = "$SID" ] && echo "$s"
     done
     ```

4. Write the name:

   - **Background job** — Claude Code may refuse any write into `~/.claude/jobs/` (the folder
     background sessions are restarted from). When it does, do not look for a way around it: say
     so in one line and give the user the new name to set in `claude agents`. Otherwise read
     `state.json` with the Read tool and change the
     `name` field with the Edit tool. Do not go through a shell script: `cp`,
     `jq > tmp`, `mv` and `chmod` all write outside the working directory and the
     auto-mode classifier blocks them, while Edit writes atomically and keeps the
     file's permissions. No backup is needed — Edit fails loudly rather than
     truncating, and the old name is in the conversation anyway. Verify
     afterwards with `jq -r '.name' <state.json>`, which is a read and passes.
     Drop a `🌳` prefix left over from the old format — the `[worktree]` part
     already says it. Keep any other emoji the job carries for a reason, such as
     `🤸‍♂️` for a command-launched job, and put `♻️` after it if the conversation
     earned it
   - **Plain session** — append a single line to the `.jsonl`:
     `{"type":"agent-name","agentName":"...","sessionId":"..."}`. Append only,
     never rewrite the file — the session is still writing to it, and the log is
     often tens of megabytes. This one genuinely needs a shell append, so the
     classifier may refuse it; if it does, say so instead of looking for a way
     around it
   - If both exist, write both so the name matches wherever it is displayed. A
     background job takes its displayed name from `state.json` alone, so when the
     `.jsonl` append is refused the rename still works — report it and move on

5. Keep the job list in workspace order (background jobs only):

   - The job list sorts each job by the number in `~/.claude/jobs/<job>/order`,
     **ascending** — the lowest number is at the top. A new job starts with the
     current time in milliseconds, so it lands at the bottom
   - **Never write to the VS Code workspace file from here.** It is the view
     [`/switch-workspace`](./switch-workspace.md) controls — a single checkout or
     all of them — and renaming a chat must not add `main` to it, move entries or
     otherwise change what the editor shows
   - Jobs are grouped by their `[worktree]` prefix in this order: `[main]` first,
     then the worktrees in the order `git worktree list` prints them. Jobs whose
     worktree no longer exists go last
   - After writing the name, give this job an `order` value that puts it at the
     end of its worktree's block — between the last job of its worktree and the
     first job of the next one. When there is no free number between them,
     renumber all jobs that have an `order` file in steps of 1000, keeping the
     workspace order and each block's relative order
   - The file holds the bare number, no newline. A pinned job has no `order`
     file — leave it alone

6. Report back:

   - State the new name and which file was written
   - The chat list picks the change up on its own; mention that a refresh may be
     needed if it does not appear straight away

7. Learn from the user's reaction:

   - Whenever the user rejects a proposal, rewrites a name by hand or criticises
     one afterwards, that is a rule this file is still missing. Do not just fix
     the one name — work out what general rule the correction implies and write it
     into this file, then apply it to the corrected chat
   - Say which rule was added, so the user can push back on the rule rather than
     on the same mistake again next time
   - Write the rule, not the incident. A correction about one chat is worth keeping
     only once it is phrased so it applies to chats about entirely different work.
     If the rule cannot be stated without naming that specific chat, it is not a
     rule yet — keep asking what the correction implies
   - Add it where it belongs: a new naming principle gets its own short section, a
     recurring way of getting it wrong joins the list in **Name the goal, not the
     mechanism**, and a sharper wording of an existing rule replaces that rule
   - Keep this file short enough to stay readable. When a new rule overlaps an old
     one, merge them instead of stacking a near-duplicate underneath
   - This applies even when the user only comments on one name in passing. A remark
     like "that is not what I was solving there" is feedback about the method, not
     about that single chat
