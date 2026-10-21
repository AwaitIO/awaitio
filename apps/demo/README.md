# AwaitIO demo

The backoffice of Shopwise, a made-up SaaS for online stores, built with [AwaitIO](https://awaitio.com) the way a real client project is. It runs at [demo.awaitio.com](https://demo.awaitio.com); log in with `demo@awaitio.com` and the password `demo`.

Nothing is saved. `src/db` stands in for a Prisma client over made-up rows: every call waits a moment like a real query, and writes return what a database would without storing anything, so every visitor sees the same data.

## Layout

- `src/app.ts` – the `AwaitIO` app: components, layout, theme, users.
- `src/server.ts` – starts it.
- `src/secrets.ts` – the only place that reads `process.env`.
- `src/actions/<tab>/` – one tab each: `index.ts` is its page, every `*Action.ts` one action.
- `src/db/` – the made-up database: `db.account.findMany()`, `db.user.update()` and so on.

## Run it

From the repository root, with `SESSION_SECRET` (32 characters or more) in `.env`:

```bash
pnpm install
pnpm --filter './libs/**' run build
pnpm --filter @awaitio/demo dev     # http://localhost:3000
```

In production: `pnpm --filter @awaitio/demo build` and `pnpm --filter @awaitio/demo start` with `SESSION_SECRET`, `PORT` and `HOST=0.0.0.0` set.
