# Roadmap

Improvements AwaitIO may get later, one Markdown file per idea. Nothing here is planned for a date or promised; a file
says what the idea is, why it matters, how it could work and what it costs.

When an idea ships, delete its file and its line below. When it is dropped, delete it too.

## Ideas

- [Log in to another environment from the switcher](environment-handoff.md) – switching environments in the header
  keeps you logged in, through a short one-time token signed with a key the environments share.
- [Let agents run actions without the UI](agents.md) – a token with a list of allowed actions, steps answered over
  plain requests or an MCP server on `/mcp`; a prototype sits on the branch `worktree-agent-tokens`.
- [Run actions from the terminal](terminal.md) – an optional Ink `terminal` variant on every component, rendered on
  the server over a WebSocket from `npx awaitio connect` or over SSH; a step without it links to the web UI.
- [Answer steps from an MCP client](mcp-elicitation.md) – the `/mcp` server from `agents.md` asks the person through
  MCP elicitation, with the form built from each component's `returns`.
- [Run actions from Raycast](raycast.md) – an extension over the HTTP API that maps the built-in components to
  Raycast forms; custom components and `display-html` only open in the browser.
