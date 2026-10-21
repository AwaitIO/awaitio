# Let agents run actions without the UI

## Today

Only people run actions. The API behind the UI already works step by step: start a run, read its step, answer with
`{ stepId, values }`, repeat until the result, with every answer checked on the server. But it only takes a session
cookie, the UI's own header, and a page that follows the run over SSE. A run nobody follows is canceled after 30
seconds. A script or an AI agent (Claude Code, Claude Desktop…) cannot use it.

## Idea

An agent gets a token instead of a login and a list of the actions it may run. It answers the same steps a person
answers, so an action does not change at all to be run by an agent.

```ts
agents: [{ email: 'support-bot@example.com', name: 'Support bot', token: process.env.SUPPORT_BOT_TOKEN!, actions: ['support/*', 'users/change_role'] }];
```

1. **Token**: `Authorization: Bearer <token>` on `/api`. At least 32 characters, only a SHA-256 digest kept in memory,
   compared in constant time. A wrong token is `401` even next to a valid cookie.
2. **Allowlist**: `actions` is required: a slug, a folder with `/*` or `*`. Anything else is `404` in the list and
   when started. Pages are closed to agents. `ctx.user.kind` is `'user' | 'agent'`.
3. **Plain requests instead of SSE**: `GET /api/runs/:id?wait=1` returns once the run waits for an answer or ended
   (at most 25 s). An agent run is canceled after 10 minutes without a request, not 30 s after a disconnect.
4. **What to send**: every component in a step carries `valueSchema`, the JSON Schema of the input side of its
   `returns` (a datetime is an ISO string, `select.table` an array of row indexes).
5. **MCP on `/mcp`**: a stateless MCP server (Streamable HTTP, plain JSON answers, no new dependency) with generic
   tools `list_actions`, `start_run`, `respond`, `get_run`, `cancel_run`. One tool per action would not hold a run
   with several steps. Every result has `next`, one sentence on what to do now. Token only, never a cookie.

Connecting from Claude Code is then one line:
`claude mcp add --transport http awaitio https://tools.example.com/mcp --header "Authorization: Bearer $TOKEN"`.

## Security trade-off

- **`io.confirm` does not stop an agent**: it answers the confirmation itself. Until there is a step only a person
  can answer, the allowlist is the only guard: keep irreversible actions off it.
- A leaked token runs every action on its list as that agent. Revoking means changing the token and restarting.
- An agent email must not be a user's email, or the agent would see that user's runs (runs belong to an email).
- Parked handlers live in memory for up to 10 minutes per idle agent run, more than for people.

## Next steps once it ships

- `.requireHuman()` on a step: the run waits until a person answers that step in the UI (same `runId`), or
  `agents: false` on an action.
- Audit log: which token started what and with which answers.
- Pages for agents when their token allows the folder.
- An agent in the demo with its token from `.env`.

## Work

Already written on the branch `worktree-agent-tokens` (worktree `.claude/worktrees/agent-tokens`, not committed,
based on `db1db46`): about 50 files and 1 250 lines with tests and docs. Its `PROGRESS.md` has the details.

- `classes/Agents.ts`, `types/AwaitIOAgent.ts`, `AwaitIO.ts` – the `agents` option, token check, allowlist.
- `http/createAuthMiddleware.ts`, `createActionsRouter.ts`, `createPagesRouter.ts`, `createRunsRouter.ts` – Bearer,
  filtering, `GET /runs/:id?wait=1`.
- `classes/RunManager.ts` – idle timeout of agent runs, `touch`, `waitForInput`.
- `classes/Run.ts`, `utils/toValueSchema.ts` – `valueSchema` in the step.
- `mcp/*`, `http/createMcpRouter.ts` – the MCP server and its five tools.
- Tests: 15 new (token, allowlist, wait, idle timeout, the whole MCP flow); checked with the official
  `@modelcontextprotocol/sdk` client.
- `apps/docs/core/agents.mdx`, `ctx/user.mdx`.

Before merging: rebase onto the current `main` (it has moved on since), and a `minor` changeset for `awaitio`.
