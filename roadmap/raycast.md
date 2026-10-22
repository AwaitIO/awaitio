# Run actions from Raycast

## Today

Actions run only in the web UI. On a Mac, Raycast is where many people start small tasks, and opening the browser for
a short action is a detour.

## Idea

A Raycast extension that talks to the existing HTTP API: the list of actions with search, start a run, follow it,
answer its steps with Raycast's own `Form`, `List` and `Detail`.

1. **API**: `GET /api/actions`, `POST /api/actions/:slug/runs`, the step from `GET /api/runs/:id` (SSE through
   `fetch` or the `eventsource` package, or `?wait=1` from [agents.md](agents.md)), `POST /api/runs/:id/respond`.
2. **Login**: server URL and token in the extension preferences. Needs token login from `agents.md`; today `/api`
   takes only a session cookie.
3. **Mapping from components to Raycast**, written once in the extension:
   - `input-text`, `input-email`, `input-url`, `input-number` → `Form.TextField`, `input-textarea` → `Form.TextArea`
   - `input-boolean` → `Form.Checkbox`, `input-date`, `input-datetime` → `Form.DatePicker`
   - `select-single` → `Form.Dropdown`, `select-multiple` → `Form.TagPicker`, `select-table` and `display-table` →
     `List`
   - `display-markdown`, `display-heading`, `display-metadata`, `display-image`, `display-link` → `Detail` with
     Markdown and metadata, `confirm` → `confirmAlert`
4. **Anything else** shows "Open in browser", which opens the same run in the web UI.

## Limits

- **Custom components do not work.** An extension is a static bundle; it cannot load a component's code from the
  server, and Raycast draws only its own fixed set of form fields. A component a client project writes always ends in
  "Open in browser". Getting past that would need components to describe themselves as data (a list of primitive
  fields plus a function that builds the answer), which the terminal and MCP ideas do not need.
- `display-html` has no Raycast form.
- **Store**: the extension has to be open source in the `raycast/extensions` repository (MIT) and pass their review;
  every update goes through review again.
- macOS and Windows only, a small share of the users compared to the web, the terminal and MCP.

## Work

- Token login in `libs/sdk` (shared with `agents.md`).
- A separate repository or `apps/raycast`: list, run, form per step, preferences. About 2 to 4 days for the mapping
  above, more for the Store review.
