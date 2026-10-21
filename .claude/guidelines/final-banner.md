# Final banner

A command that uses this banner ends **every run** with it — the **very last thing in the reply**,
nothing after it. It exists so the user can open the conversation hours later and know from one
glance whether it can be closed without reading anything else.

The command itself decides which checks go into the checklist and when each state applies. This
file only defines the shape.

## States

Pick exactly one:

- **✅ DONE** — everything the command set out to do is finished, verified, and there is no open
  question for the user. The conversation can be closed. Anything short of that is not ✅.
- **⚠️ NEEDS YOU** — the command is waiting on the user: something to fix first, or a decision.
- **❌ STOPPED** — the command refused to continue because going on would lose or break something.

## Format

State on the left, command name on the right of the same line, then the checklist:

```
═════════════════════════════════════════════════
  ✅  DONE                      /<command-name>
─────────────────────────────────────────────────
  ✓ worktree removed     ✓ git status clean
  ✓ branch on main       ✓ workspace updated
═════════════════════════════════════════════════
```

```
═════════════════════════════════════════════════
  ⚠️  NEEDS YOU                  /<command-name>
─────────────────────────────────────────────────
  ✓ branch on main       ✗ 2 uncommitted files
═════════════════════════════════════════════════
```

```
═════════════════════════════════════════════════
  ❌  STOPPED                    /<command-name>
─────────────────────────────────────────────────
  ✓ git status clean     ✗ 3 files differ
═════════════════════════════════════════════════
```

## Rules

- **Checklist items are ultra short** — two to four words, a glance, not a sentence. No paths, no
  commit hashes, no explanations; those belong in the report above the banner.
- List only checks that actually ran — `✓` for passed, `✗` with a short reason for failed. Never
  show a `✓` for a check that was skipped.
- Two checks per row, keep the rule lines as wide as the widest row.
- Always in English, whatever language the conversation runs in.
- Always inside a code block, so the characters keep their alignment.
