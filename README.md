# AwaitIO

Internal tools in one Node process. Write each tool as an async TypeScript function; every `await` on `io` asks a person something in the browser and waits for the answer. The same server serves the UI, so there is nothing else to host.

```ts
export const refundOrder = app.action({
  handler: async (io, ctx) => {
    const orderId = await io.input.text('Order ID');
    const order = await prisma.order.findUniqueOrThrow({ where: { id: orderId } });
    const reason = await io.input.textarea(`Why refund ${formatMoney(order.total)}?`);

    await prisma.refund.create({ data: { orderId, reason, approvedBy: ctx.user.email } });

    return { refunded: formatMoney(order.total) };
  },
});
```

<img src="apps/docs/images/intro-form.png" alt="An AwaitIO action asking for a first and a last name" width="720" />

## Why AwaitIO

- **One process.** The actions, the server and the UI run inside your own app. No hosted service, no second server, no database of its own.
- **Your codebase.** A handler is a plain function: use your Prisma client, services, utilities and environment variables as they are.
- **Typed end to end.** `io` is typed from the components you register; each component checks its props and its answer with zod on the server.
- **Extensible.** A component is plain React in one file. Write your own and register it next to the built-in ones.
- **Deploys with your app.** Each environment (production, staging, local) is its own server with its own secrets; the header switches between them.
- **Private by default.** Login with email and password (scrypt hashes, signed cookies), runs visible only to the person who started them, the server listens on `127.0.0.1` unless you say otherwise.

## Quickstart

```bash
npm install awaitio @awaitio/input-text
npx awaitio hash-password   # prints a hash for your password
```

```ts
// app.ts
import { inputText } from '@awaitio/input-text';
import { AwaitIO } from 'awaitio';

export const app = new AwaitIO({
  name: 'Internal tools',
  secret: process.env.SESSION_SECRET ?? '', // at least 32 characters
  users: [{ email: 'you@example.com', name: 'You', passwordHash: process.env.PASSWORD_HASH ?? '' }],
  components: { input: { text: inputText } },
});

// actions/greet.ts
export const greet = app.action({
  handler: async (io) => {
    const name = await io.input.text('Your name');

    return `Hello, ${name}!`;
  },
});

// server.ts
void app.listen({ routes: { greet }, port: 3000 });
```

Open http://localhost:3000, log in and run **Greet**.

## Packages

| Package                     | What it is                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `awaitio`                   | The server, the action runtime, the prebuilt UI, `defineComponent` and the `awaitio hash-password` CLI |
| `@awaitio/input-text`       | `io.input.text()`: one line of text                                                                    |
| `@awaitio/input-email`      | `io.input.email()`: an email address                                                                   |
| `@awaitio/input-url`        | `io.input.url()`: a web address, returned as a `URL`                                                   |
| `@awaitio/input-textarea`   | `io.input.textarea()`: longer text                                                                     |
| `@awaitio/input-number`     | `io.input.number()`: a number, with min, max and decimal places                                        |
| `@awaitio/input-boolean`    | `io.input.boolean()`: yes or no, with a checkbox                                                       |
| `@awaitio/input-datetime`   | `io.input.datetime()`: a date and time, returned as a luxon `DateTime`                                 |
| `@awaitio/input-date`       | `io.input.date()`: a date, returned as a luxon `DateTime`                                              |
| `@awaitio/select-single`    | `io.select.single()`: one of a list of options, from a drop-down                                       |
| `@awaitio/select-multiple`  | `io.select.multiple()`: any number of options, listed under a drop-down                                |
| `@awaitio/select-table`     | `io.select.table()`: rows picked from a table                                                          |
| `@awaitio/confirm`          | `io.confirm()`: Confirm or Cancel before something irreversible                                        |
| `@awaitio/display-table`    | `io.display.table()` in pages: rows with filter, paging, links and row menus                           |
| `@awaitio/display-metadata` | `io.display.metadata()` in pages: label and value tiles                                                |
| `@awaitio/display-link`     | `io.display.link()`: a link to a page in the app or outside it                                         |
| `@awaitio/display-heading`  | `io.display.heading()`: a section title with an optional description                                   |
| `@awaitio/display-image`    | `io.display.image()`: a picture, such as a chart or a file preview                                     |

## Documentation

The documentation lives in [`apps/docs`](apps/docs): introduction, quickstart, how it works and security, every setting, every `io` method and `ctx` field, custom components and deployment. Run it with `pnpm --filter @awaitio/docs dev`.

## Development

Requires Node 22.14 and pnpm.

```bash
pnpm install
cp .env.example .env   # SESSION_SECRET, DEMO_USER_EMAIL, DEMO_USER_PASSWORD_HASH
pnpm hash-password     # hash for DEMO_USER_PASSWORD_HASH
pnpm dev               # demo at http://localhost:3000
pnpm test && pnpm lint && pnpm tsc
```

Contributions are welcome; see [CONTRIBUTING.md](CONTRIBUTING.md). Every contributor signs the [CLA](CLA.md) once.

## License

AwaitIO is source-available under the [AwaitIO License](LICENSE).

**Free, including commercial use,** with up to 3 users (the real people who use it, however many logins they share), for non-profits and educational institutions, and for evaluation. That covers production use and building tools for your clients. For-profit organizations with more users need a Company License:

| Users        | Price                              |
| ------------ | ---------------------------------- |
| 1–3          | Free                               |
| 4–10         | $49 per month, or $490 per year    |
| More than 10 | $199 per month, or $1,990 per year |

One flat price per organization, however many apps and environments you run. Need invoicing, custom terms or priority support? Let's talk.

The free and the paid version are the same software: no paid features, no license keys, no limits and no telemetry. AwaitIO never checks your license; it works on trust.

Users are the real people who use your AwaitIO apps, locally or deployed, however many logins they share. To get a Company License, write to [p.homoky@gmail.com](mailto:p.homoky@gmail.com).

Without a separate agreement, nobody may:

- sell or license AwaitIO itself, or a fork or modified version of it;
- offer a product or service that competes with AwaitIO;
- offer a commercial hosted or managed service built on AwaitIO, such as a dashboard, cloud, monitoring or management service for AwaitIO apps;
- sell or license components, plugins or extensions made for AwaitIO.

The license may change for future versions; each version keeps the license it was released with. If you disagree with a newer license, stay on the version you have.

## Inspiration

I'm Petr Homoky ([homoky.cz](https://homoky.cz)), the author of AwaitIO. Before I started on it, I built internal tools with [Interval](https://github.com/interval), and the idea behind it won me over: a tool is just backend code, and every `await` asks a person in the browser. AwaitIO keeps that idea and puts the actions, the server and the UI into one process inside your own app, so there is nothing else to run.
