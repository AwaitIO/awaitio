import type { Competitor } from '../types/Competitor';

export const interval: Competitor = {
  slug: 'interval',
  name: 'Interval',
  logo: '128*36|6 46 24 46 6|5 49 20 50 4|3 51 20 51 3|2 52 20 52 2|1 53 20 52 2|1 53 20 53 1|0 54 20 54*10|0 53 22 53|0 52 24 52|0 19 90 19*2|0 18 92 18*16|0 19 90 19*2|0 52 24 52|0 53 22 53|0 54 20 54*10|1 53 20 53 1|2 52 20 53 1|2 52 20 52 2|3 51 20 51 3|4 50 20 49 5|6 46 24 46 6|128*36',
  kind: 'sdk',
  headline: 'The same `await` model as Interval, running in your own app.',
  summary: 'Internal tools from backend code. Acquired by Meter in 2023, the hosted product is gone.',
  about: [
    'Interval built internal tools from backend code, in Node.js or Python.',
    'An action called `await io.input` and a form showed up in the browser.',
    'That browser UI came from Interval’s hosted service, with auth, permissions and audit logs.',
  ],
  status: {
    heading: 'Looking for an Interval alternative?',
    paragraphs: [
      'Meter, a network hardware company, acquired Interval in November 2023.',
      'interval.com now redirects to meter.com. The hosted product is gone.',
      'The code lives on as open source, with docs at intervalkit.com.',
      'AwaitIO uses the same `await` model. It was built by a developer who used Interval for years. Its UI is served by your own app, so nothing can be switched off from outside.',
    ],
  },
  highlights: [
    {
      illustration: 'owned',
      title: 'Nobody can switch it off.',
      body: 'Interval’s UI came from its hosted service, which closed after the acquisition. AwaitIO’s UI is served by your own app.',
    },
    {
      illustration: 'await',
      title: 'The same `await io` model.',
      body: 'The calls you wrote for Interval read almost the same in AwaitIO. `await io.input.text()` shows a form and waits for the answer.',
    },
    {
      illustration: 'app',
      title: 'One process, no second server.',
      body: 'Interval needed its hosted service or its own server next to your app. AwaitIO serves the UI from the Node process your actions run in.',
    },
    {
      illustration: 'repo',
      title: 'Still a file in your repo.',
      body: 'As with Interval, every action is code next to the rest of your app. In AwaitIO it is one TypeScript file per action.',
    },
    {
      illustration: 'review',
      title: 'Extend the UI in a pull request.',
      body: 'Interval gave you the components it shipped. In AwaitIO a missing one is a React file you register next to the built-in ones.',
    },
    {
      illustration: 'services',
      title: 'Your code, called directly.',
      body: 'Like an Interval action, an AwaitIO action imports your Prisma client and services. Nothing goes through an API of its own.',
    },
    {
      illustration: 'types',
      title: 'Typed from the form to the database.',
      body: 'Every answer comes back typed and checked on the server. Rename a field and the compiler shows every action that uses it.',
    },
    {
      illustration: 'price',
      title: 'One price for the whole team.',
      body: 'AwaitIO is free for small teams. Above that it is one flat monthly price per organization, not per seat.',
    },
  ],
  checks: [
    { label: 'Each tool is a file in your own repo', awaitio: 'yes', them: 'yes' },
    { label: 'A function that awaits a person’s answer', awaitio: 'yes', them: 'yes' },
    { label: 'The UI is served by your own app, no separate server', awaitio: 'yes', them: 'no' },
    { label: '100 % in code, you never leave your editor', awaitio: 'yes', them: 'yes' },
    { label: 'Your own UI components, one React file each', awaitio: 'yes', them: 'no' },
    { label: 'Your own theme for the whole UI', awaitio: 'yes', them: 'no' },
    { label: 'Your own layout components', awaitio: 'yes', them: 'no' },
    { label: 'Run the tools from a phone, in the browser', awaitio: 'yes', them: 'yes' },
    { label: 'Actions in Python too', awaitio: 'no', them: 'yes' },
    { label: 'Scheduled runs with cron', awaitio: 'no', them: 'yes' },
    { label: 'Hosted by the vendor, nothing to run yourself (until 2023)', awaitio: 'no', them: 'yes' },
  ],
  facts: {
    build: 'Write backend functions in Node.js or Python. `await io.input` asks a person.',
    runs: 'Your code on your own infrastructure. The UI came from Interval’s hosted service, which is gone.',
    code: 'In your repo.',
    ui: 'Comes from the code, shown by Interval’s hosted UI.',
    openSource: 'Yes, the server is MIT licensed.',
  },
  whenItFits: ['You already run the open-source Interval server yourself and it does what you need.', 'You write your tools in Python.'],
  whenAwaitIOFits: [
    'You used hosted Interval and your actions need a new home.',
    'You want the same `await` model in TypeScript, served by your own Node process.',
    'You want 20+ built-in components, and to add your own as one React file.',
  ],
  lastModifiedAt: '2026-10-25',
  details: [
    {
      heading: 'What is Interval?',
      paragraphs: [
        'Interval was a tool for building internal tools with backend code only. It launched in 2022 and reached version 1.0 in April 2023.',
        'You wrote an action as an async function in Node.js or Python. Each `await io.input` call showed a form in the browser. The function waited until a person answered, then went on with the value.',
        'Its pitch was internal tools for engineers who love writing code but hate building UIs. No drag-and-drop, no API endpoints and no frontend code.',
        'Two pieces worked together. The SDK ran inside your code, on your own servers. The browser UI came from Interval’s hosted service, which also handled login, teams, permissions and audit logs.',
        'Interval also offered scheduled runs, environments, notifications by Slack and email, and links between actions.',
      ],
    },
    {
      heading: 'What happened to Interval?',
      paragraphs: [
        'Meter, a network hardware company, acquired Interval in November 2023. Meter uses it internally.',
        'interval.com now redirects to meter.com. The hosted service is gone.',
        'Teams that used hosted Interval kept their code, but lost the UI it talked to.',
        'The code is still public under the MIT license, with docs at intervalkit.com. Running Interval today means hosting the Interval server yourself, next to your app.',
      ],
    },
    {
      heading: 'What is AwaitIO?',
      paragraphs: [
        'AwaitIO is a framework for internal tools written as code. An action is an async TypeScript function in your own repo.',
        'Every `await io.input` call asks a person for something and waits for the answer. The browser shows the form, the person fills it in, and your function goes on with the value.',
        'The same Node process that runs your app serves the UI. There is no hosted service behind it and no second server to run.',
        'AwaitIO was built by a developer who used Interval for several years. It keeps the same `await` model and drops the hosted part.',
        'It ships more than 20 components: inputs, selects, displays, a confirm and a layout. Anything missing is one React file you register next to them.',
      ],
    },
    {
      heading: 'Key differences',
      paragraphs: ['AwaitIO and Interval share the core idea: the code asks, a person answers in the browser. The differences are in where the UI comes from and how far you can change it.'],
      subsections: [
        {
          heading: 'The same await model',
          paragraphs: [
            'An action reads top to bottom in both tools. `await io.input.email()` asks for an email. `await io.select.table()` lets a person pick rows. `await io.confirm()` asks before something irreversible.',
            'Most method names are the same. `io.group` still puts several fields on one screen. `ctx.loading` still shows progress while a long loop runs.',
            'Branches, loops and error handling stay plain code. If you wrote Interval actions, you already know how to write AwaitIO actions.',
          ],
        },
        {
          heading: 'Where the UI comes from',
          paragraphs: [
            'With Interval, your code connected to Interval’s server, and that server showed the UI. You either used the hosted one or ran the open-source server yourself.',
            'With AwaitIO, there is one process. `app.listen()` starts your actions and the UI together, on a port of your app.',
            'Login is built in too. The people who can log in are a list in your code.',
          ],
        },
        {
          heading: 'Built-in components',
          paragraphs: [
            'AwaitIO ships eight inputs: text, email, URL, textarea, number, boolean, date, and date and time.',
            'It ships three selects: single, multiple and a table to pick rows from.',
            'It ships eight displays: heading, HTML, image, link, Markdown, metadata, object and table. A confirm and a layout complete the set.',
            'Each one is its own package. You install only the ones you use.',
          ],
        },
        {
          heading: 'When the vendor changes course',
          paragraphs: [
            'Interval’s hosted service ended with the acquisition. The actions were still in your repo, but nobody could run them in the browser any more.',
            'AwaitIO has no hosted part. It is a package in your app, so no acquisition, price change or shutdown can switch your tools off.',
          ],
        },
        {
          heading: 'Extending the UI',
          paragraphs: [
            'Interval gave you the components it shipped. The look and the page around them came from its UI.',
            'In AwaitIO the whole UI stays in code. A component of your own is one React file with its props and the value it returns. You register it next to the built-in ones and `await` it like any io method.',
            'The look comes from a theme package you can restyle. The page around the components comes from a layout component you can replace with your own. You never leave your editor.',
          ],
        },
        {
          heading: 'Languages',
          paragraphs: [
            'Interval had SDKs for Node.js and Python.',
            'AwaitIO is TypeScript on Node only. In return, every answer is typed and checked on the server, and the compiler sees every action next to the rest of your app.',
          ],
        },
        {
          heading: 'Price model',
          paragraphs: [
            'Interval’s hosted plans are gone. The open-source server is free, and you host and maintain it yourself.',
            'AwaitIO is free for small teams, commercial use included. Above that it is one flat monthly price per organization, not per seat. The details are on the pricing page.',
          ],
        },
        {
          heading: 'Where Interval is stronger',
          paragraphs: [
            'Interval has a Python SDK. AwaitIO is TypeScript only.',
            'Interval had scheduled runs with cron, teams and permissions, and notifications by Slack and email. AwaitIO does not have these built in.',
            'The Interval server is MIT licensed. AwaitIO’s source is public, and its terms are on the pricing page.',
          ],
        },
      ],
    },
    {
      heading: 'An example: refunding an order',
      paragraphs: [
        'Support needs to refund an order. Someone types the order ID, checks the order, enters an amount and confirms.',
        'In Interval this was one action too, and it read almost the same. The difference was where the form came from: Interval’s service drew it.',
        'In AwaitIO it is one action. `await io.input.text()` asks for the order ID. The action loads the order with your own database client and shows it with `io.display.metadata()`.',
        'Then `await io.input.number()` asks for the amount and `await io.confirm()` asks before the money moves. The action calls your payment service and returns a message for the person.',
        'The whole tool is one function of about twenty lines, in one file, in your repo.',
      ],
    },
    {
      heading: 'Who should choose which',
      paragraphs: [
        'Keep Interval if you already run its open-source server yourself, it does what you need and you are fine maintaining it.',
        'Keep Interval as well if your actions are written in Python.',
        'Choose AwaitIO if you used hosted Interval and your actions need a new home. Or if you want the same model in TypeScript, served by the app you already run, with a UI you can extend.',
      ],
    },
    {
      heading: 'Moving from Interval to AwaitIO',
      paragraphs: [
        'Most actions move almost line by line, because the io calls are so close.',
        'An Interval action was an `async (io, ctx)` function in the `actions` of `new Interval({ … })`. In AwaitIO each action is one file in the actions folder, written with `app.defineAction()`. Its handler takes one object: `async ({ io, ctx })`.',
        '`io.input.text`, `io.input.email`, `io.input.number`, `io.input.boolean`, `io.input.date`, `io.input.datetime` and `io.input.url` keep their names. Dates come back as luxon `DateTime` values.',
        '`io.select.single`, `io.select.multiple` and `io.select.table` keep their names. So do `io.display.heading`, `io.display.markdown`, `io.display.metadata`, `io.display.object`, `io.display.link`, `io.display.image`, `io.display.table` and `io.confirm`.',
        '`.optional()` still makes a field optional. `io.group` takes an object of io calls and returns the values under the same keys.',
        '`ctx.loading.start()`, `ctx.loading.update()` and `ctx.loading.completeOne()` work as before. `ctx.user` and `ctx.params` are there too.',
        'Each component is its own package, such as `@awaitio/input-text`. Register the ones you use in `new AwaitIO({ … })`. A call with no built-in counterpart becomes one React file of your own.',
        'Drop the Interval API key and endpoint. Put your people into `users` and start the server with `app.listen()`. Then move the next action.',
      ],
    },
  ],
  faq: [
    {
      question: 'Is AwaitIO an Interval alternative?',
      answer: 'Yes. It uses the same model: an action is an async function, and every `await io.input` call shows a form and waits. The UI is served by your own app instead of a hosted service.',
    },
    {
      question: 'Is Interval still available?',
      answer:
        'Not as a hosted product. Meter acquired Interval in November 2023, and interval.com redirects to meter.com. The code is still public under the MIT license, with docs at intervalkit.com.',
    },
    {
      question: 'How hard is it to move Interval actions to AwaitIO?',
      answer:
        'Most actions move almost line by line. The io method names are mostly the same, and `ctx.loading`, `ctx.user` and `ctx.params` work as before. The handler takes one object, `async ({ io, ctx })`.',
    },
    {
      question: 'Can I self-host AwaitIO?',
      answer: 'AwaitIO always runs inside your own Node app, on your own servers. There is no hosted version and no second server to run.',
    },
    {
      question: 'Does AwaitIO support Python like Interval did?',
      answer: 'No. AwaitIO is TypeScript on Node only.',
    },
    {
      question: 'Can I add my own components?',
      answer: 'Yes. A component is one React file with its props and the value it returns. You register it next to the built-in ones and `await` it like any io method.',
    },
    {
      question: 'Does AwaitIO charge per seat?',
      answer: 'No. It is free for small teams and one flat monthly price per organization above that. The pricing page has the details.',
    },
  ],
};
