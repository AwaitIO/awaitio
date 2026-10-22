# Run actions from the terminal

## Today

Actions run only in the web UI. Someone who lives in a terminal has to open the browser for a two-field action, and
there is no way to run an action over SSH on a machine without a browser.

## Idea

The same server serves a terminal UI next to the web one. A component gets an optional `terminal` variant written in
TSX with Ink (React for the terminal), in the same definition file as its web
`component`:

```tsx
export const inputText = defineComponent({
  // props, returns, validate, component…
  terminal: ({ props, value, onChange, onSubmit }) => {
    return <TextInput value={value} onChange={onChange} onSubmit={onSubmit} placeholder={props.placeholder} />;
  },
});
```

1. **Ink runs on the server, the client only passes keys through.** `npx awaitio connect https://tools.example.com`
   opens a WebSocket, the server renders Ink with `stdin` and `stdout` on that socket, and the CLI just forwards
   keystrokes and output. A component a client project writes works in the terminal too, and no code is ever
   downloaded and run on the user's machine.
2. **Optionally plain SSH**: `ssh tools.example.com` with nothing to install. Login by SSH keys
   mapped to user emails.
3. **Flow**: log in (token for the CLI, see [agents.md](agents.md)), the tree of actions with search, pick one, then
   step by step through the same run the web UI would start. Answers go through `returns` and `validate` on the server
   as today.
4. **A component without `terminal`** stops the step with "This step is not supported in the terminal" and a link
   that opens the same run in the web UI, where it can be finished. The run is not canceled.
5. **Built-in components get `terminal` from the start**: `input-*`, `select-*`, `confirm`, `display-markdown`,
   `display-table`, `display-metadata`, `display-heading`, `display-link`. `display-html` and `display-image` have no
   terminal form and keep the link to the web UI.

## Security trade-off

- A terminal session is a long-lived connection with a logged-in user; it needs the same idle timeout as a session.
- SSH keys become a second login path next to the password and must map to exactly one user email.
- Ink runs in the server process, so a component's `terminal` must stay as pure as its web `component`.

## Work

- `libs/sdk`: `terminal` in `ComponentDefinition`, a WebSocket endpoint that runs a run's steps through Ink, token
  login.
- New package `awaitio/cli` (or a `bin` in `awaitio`): `connect <url>`, the socket and raw terminal mode.
- Optional SSH server (`ssh2`) behind an option, off by default.
- A `terminal` variant in every built-in component package, each a `patch`.
- `apps/docs`: a Terminal page and the `terminal` field on the component page.
