# @awaitio/display-heading

Heading for [AwaitIO](https://awaitio.com): `io.display.heading()`, a section title with an optional description.

![A Company heading with a line of description under it, above a Name field and a Plan drop-down](https://docs.awaitio.com/images/io-display-heading.png)

## Install

```bash
npm install @awaitio/display-heading
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Display components](https://docs.awaitio.com/core/display-components):

```ts
import { displayHeading } from '@awaitio/display-heading';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { display: { heading: displayHeading } },
});
```

## Usage

```ts
const { name, plan } = await io.group({
  company: io.display.heading('Company', { description: 'How the account is called and billed.' }),
  name: io.input.text('Name'),
  plan: io.select.single('Plan', { options: plans }),
});
```

Props are on the [Display Heading docs page](https://docs.awaitio.com/io/display-heading).
