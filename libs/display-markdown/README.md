# @awaitio/display-markdown

Markdown for [AwaitIO](https://awaitio.com) – `io.display.markdown()`, formatted text in a page or a step.

![A Before you delete heading, a paragraph with the account name in bold and a bulleted list](https://docs.awaitio.com/images/io-display-markdown.png)

## Install

```bash
npm install @awaitio/display-markdown
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Display components](https://docs.awaitio.com/core/display-components):

```ts
import { displayMarkdown } from '@awaitio/display-markdown';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { display: { markdown: displayMarkdown } },
});
```

## Usage

```ts
await io.display.markdown(`
## Before you delete

The account **${account.name}** has ${account.users} users.

- Their runs stay in the log
- Invoices are kept for 10 years
`);
```

More on the [Display Markdown docs page](https://docs.awaitio.com/io/display-markdown).
