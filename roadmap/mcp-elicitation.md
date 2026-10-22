# Answer steps from an MCP client

## Today

[agents.md](agents.md) plans an MCP server on `/mcp` where an agent runs actions and answers their steps itself.
There is no way for a person to run an action from Claude, Cursor or another MCP client and answer its steps there,
without the agent filling in the answers.

## Idea

The same `/mcp` server asks the person instead of the agent, through MCP **elicitation** (`elicitation/create`): the
client shows the person a form built from a JSON Schema and sends back what they filled in.

1. **The schema comes from `returns`**: every component already has a zod `returns`, and `valueSchema` from
   [agents.md](agents.md) turns it into JSON Schema. A component a client project writes works with no extra code.
2. **Who answers is per token or per action**: an agent token answers itself as in `agents.md`; a person token sends
   every step through elicitation. `io.confirm` and steps marked `.requireHuman()` always go to the person.
3. **Answers are checked on the server** through `returns` and `validate` as in the web UI; an invalid answer asks
   again with the error message.
4. **Displays become text**: `display-markdown`, `display-table` and `display-metadata` go back to the client as
   Markdown in the tool result.
5. **A step elicitation cannot show** (a nested object, an array of objects, a custom web UI) stops with a link that
   opens the same run in the web UI.

## Limits

- Elicitation takes only a flat object of primitives: string, number, boolean, enum. `select-table`, dates and
  structured `returns` need mapping or the web fallback.
- Not every MCP client supports elicitation yet; without it the tool answers with the link to the web UI.

## Security trade-off

- The token says who answered, but the client draws the form, so a malicious client could answer for the person.
  Treat a person token like a session cookie and keep irreversible actions behind the web UI until there is an audit
  log.

## Work

- Builds on `agents.md` (tokens, `/mcp`, `valueSchema`); ship that first.
- `mcp/*`: an elicitation round trip per step, the web fallback, Markdown for displays.
- `apps/docs`: a section on the agents page on answering as a person.
