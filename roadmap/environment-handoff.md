# Log in to another environment from the switcher

## Today

Every environment (production, staging, one per customer…) runs as its own server, usually on its own domain, with
its own `secret`. The session cookie has no `Domain` attribute, so the browser keeps it to the host that set it, and
it is signed with that environment's secret. Switching environments in the header opens the other one's login page:
you log in to each environment separately.

## Idea

Clicking another environment in the switcher logs you in there too, without a password.

1. The switcher link calls the current server (`POST /api/session/handoff` with the target URL).
2. The server checks the session and that the target is listed in `environments` (never an arbitrary URL), then
   issues a token: email, target host, expiry about 30 seconds, random id. It is signed with a new option
   `environmentsSecret` (at least 32 characters), the same in every environment.
3. The browser goes to `https://target/#handoff=<token>`. The token sits in the fragment, so it never reaches server
   or proxy logs.
4. The target's UI posts the token to its own server (`POST /api/session/handoff/accept`) and removes it from the URL.
   The server checks the signature, the expiry, that the host is its own, that the id was not used yet and that the
   email is in **its** `users`. Then it sets its own session cookie, signed with its own `secret`.

Session secrets stay different per environment; only the handoff tokens share a key. Without `environmentsSecret` the
switcher works as today, so the feature is opt-in.

Accepting the token in a `POST` from the target's own UI, not in the redirect, is what makes it work with the
`SameSite=Strict` cookie and keeps the request behind `rejectCrossSiteRequests`.

## Security trade-off

- A session in one environment opens every other environment where the same email is in `users`. All environments
  are then only as safe as the weakest one: a cookie stolen from staging gets into production.
- A leaked `environmentsSecret` lets anyone log in anywhere as any listed user.
- Signing the token together with the user's `passwordHash` would limit the handoff to environments where the user has
  the same hash. It does not help against a stolen session cookie.
- Used token ids are kept in memory. An environment running as several instances behind a load balancer could accept
  one token once per instance within its 30 seconds. Document it.

Fits environments run by the same team with the same users. Not for environments of separate customers, where a breach
in one must not reach the others.

## Work

About 10 files and 300–400 lines with tests.

- `types/AwaitIOOptions.ts`, `AwaitIO.ts` – the `environmentsSecret` option.
- `classes/Sessions.ts` and a new file in `utils/` – issue and verify the token, remember used ids.
- `http/createSessionRouter.ts` – `POST /handoff` and `POST /handoff/accept`.
- `http/createAppInfoRouter.ts` – tell the UI whether the handoff is on.
- `ui/components/EnvironmentSwitcher.tsx` and the UI start – request the token on click, accept `#handoff` on load.
- Tests: valid token, expired, used twice, another host, user missing in the target, option off.
- `apps/docs` – how to turn it on and what it means for security; a `minor` changeset for `awaitio`.
