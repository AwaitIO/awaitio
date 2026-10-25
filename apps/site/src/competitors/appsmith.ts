import type { Competitor } from '../types/Competitor';

export const appsmith: Competitor = {
  slug: 'appsmith',
  name: 'Appsmith',
  logo: '128*22|21 18 89|16 27 85|14 32 82|12 36 80|10 39 79|9 42 77|8 44 76|7 46 75|6 47 75|5 49 74*2|4 19 13 19 73|4 17 17 17 73|3 16 20 16 73|3 16 21 15 73|2 16 23 15 72|2 15 24 15 72*3|2 14 25 15 72*2|41 15 72|40 16 72|39 17 72|38 18 72|36 20 72|28 28 72|18 38 72|14 42 72|11 45 72|9 47 72|7 49 72|6 50 72|4 52 72|3 35 4 14 72|2 33 7 14 72|2 25 14 15 72|1 20 20 15 72|0 18 23 15 72|0 17 24 15 72|0 16 25 15 72|0 15 26 15 72*2|0 14 27 15 72|0 14 26 16 72*3|0 14 25 17 72|0 15 24 17 72|0 15 23 18 72|0 16 21 19 72|0 16 19 21 72|0 18 16 22 72|0 19 12 25 72|1 55 72*2|2 54 72|2 38 2 14 72|3 36 3 14 72|4 34 4 14 72|6 31 5 15 71|7 28 8 14 71|9 25 9 14 71|11 20 97|15 12 101|128*8|69 59*11|128*22',
  kind: 'canvas',
  headline: 'Appsmith wires widgets. AwaitIO is just code.',
  summary: 'An open-source low-code builder: pre-built widgets on any data source, logic in JavaScript.',
  about: [
    'Appsmith is an open-source low-code builder for internal tools, under the Apache 2.0 license.',
    'You place pre-built widgets, connect them to any data source and write the logic in JavaScript.',
    'It now adds AI and embedded agents.',
  ],
  status: {
    heading: 'Where Appsmith stands',
    paragraphs: ['Appsmith is active. Self-hosting is free.', 'Comparison articles often call it the closest open-source Retool replacement.'],
  },
  highlights: [
    {
      illustration: 'await',
      title: 'No widgets to wire.',
      body: 'In Appsmith you place widgets and bind them to queries. In AwaitIO every `await io.input` call shows a form and waits for the answer.',
    },
    {
      illustration: 'repo',
      title: 'The tool lives in your repo.',
      body: 'Appsmith can sync an app to Git as its own JSON. An AwaitIO action is a TypeScript file next to the rest of your code.',
    },
    {
      illustration: 'types',
      title: 'TypeScript, not JavaScript in a widget.',
      body: 'Appsmith logic is JavaScript inside its editor. AwaitIO is typed from the form to the database, and the compiler checks every tool.',
    },
    {
      illustration: 'app',
      title: 'Runs inside your own app.',
      body: 'Self-hosted Appsmith is one more service to run next to your app. AwaitIO runs in your own Node process.',
    },
    {
      illustration: 'services',
      title: 'Your code, called directly.',
      body: 'No datasources to set up in another editor. An action imports your Prisma client and services and calls them.',
    },
    {
      illustration: 'review',
      title: 'Reviewed like any other code.',
      body: 'A change to a tool is a pull request with a readable diff, not a changed JSON export of a page.',
    },
    {
      illustration: 'price',
      title: 'One price for the whole team.',
      body: 'Appsmith’s paid plans grow with your users. AwaitIO is free for small teams and one flat monthly price per organization above that.',
    },
    {
      illustration: 'owned',
      title: 'Nobody can switch it off.',
      body: 'The tools run in your own app, so no platform change, price change or shutdown can take them away.',
    },
  ],
  checks: [
    { label: 'Each tool is plain TypeScript in your own repo', awaitio: 'yes', them: 'no' },
    { label: 'Versioned in Git with the rest of your code', awaitio: 'yes', them: 'partial' },
    { label: 'Runs inside your own app, on your own servers', awaitio: 'yes', them: 'partial' },
    { label: 'Calls your own services and database client directly', awaitio: 'yes', them: 'no' },
    { label: '100 % in code, you never leave your editor', awaitio: 'yes', them: 'no' },
    { label: 'Your own UI components, one React file each', awaitio: 'yes', them: 'partial' },
    { label: 'Your own theme for the whole UI', awaitio: 'yes', them: 'partial' },
    { label: 'Your own layout components', awaitio: 'yes', them: 'no' },
    { label: 'Build tools without writing code', awaitio: 'no', them: 'yes' },
    { label: 'AI agents embedded in your apps', awaitio: 'no', them: 'yes' },
    { label: 'Run the tools from a phone, in the browser', awaitio: 'yes', them: 'yes' },
  ],
  facts: {
    build: 'Place widgets, connect data sources and write logic in JavaScript.',
    runs: 'Self-hosted, free.',
    code: 'On the Appsmith platform, in its own format.',
    ui: 'Pre-built widgets in a visual editor.',
    openSource: 'Yes, Apache 2.0.',
  },
  whenItFits: ['Your builders want widgets first, with some JavaScript on top.', 'You want a free, self-hosted open-source builder.', 'You want widgets connected to many data sources.'],
  whenAwaitIOFits: [
    'You want no widgets to wire: the tool is the code.',
    'You want every tool reviewed, typed and versioned in your repo.',
    'You want the tools inside your own Node app, calling your own services.',
  ],
  lastModifiedAt: '2026-10-25',
  details: [
    {
      heading: 'What is Appsmith?',
      paragraphs: [
        'Appsmith is an open-source low-code builder for internal tools. It is released under the Apache 2.0 license.',
        'You build an app in Appsmith’s visual editor. You place pre-built widgets on a page: tables, forms, inputs and buttons. Then you connect them to datasources and bind their values to queries.',
        'Logic goes into JavaScript. You write it in small snippets inside widget properties, or in JS objects in the editor.',
        'You can host Appsmith yourself for free. Comparison articles often call it the closest open-source replacement for Retool.',
        'Today Appsmith also adds AI to apps and agents embedded in them, powered by your data.',
      ],
    },
    {
      heading: 'What is AwaitIO?',
      paragraphs: [
        'AwaitIO is a framework for internal tools written as code. An action is an async TypeScript function in your own repo.',
        'Every `await io.input` call asks a person for something and waits for the answer. The browser shows the form, the person fills it in, and your function goes on with the value.',
        'The same Node process that runs your app serves the UI. There is no separate service to host and no editor to log in to.',
        'AwaitIO ships more than 20 components: 8 inputs, 3 selects including a table, 8 displays, a confirm and a layout. Anything missing is one React file you register next to them.',
      ],
    },
    {
      heading: 'Key differences',
      paragraphs: [
        'Both tools give your team buttons and forms on top of your data. Both let a developer write JavaScript or TypeScript. In Appsmith that code sits inside widgets. In AwaitIO the code is the whole tool.',
      ],
      subsections: [
        {
          heading: 'Widgets or a function',
          paragraphs: [
            'In Appsmith you build the page first. You place widgets, then bind each one to a query and to the others with small pieces of JavaScript.',
            'In AwaitIO you write the steps of the task in order. `await io.input.email()` asks for an email. `await io.select.table()` lets a person pick rows. The screens follow from the code.',
            'A tool in AwaitIO reads top to bottom like a script. Branches, loops and error handling are plain TypeScript, in one file, not spread across widget properties.',
          ],
        },
        {
          heading: 'One tool, step by step',
          paragraphs: [
            'Say support needs to refund an order. Your team opens Refund order in the browser and sees a form with one field: Order ID.',
            'In AwaitIO that form is one line, `await io.input.text()`. The function then loads the order with your own database client.',
            'It shows the order with a display component and asks for a confirmation. Then it calls the refund service your app already has.',
            'In Appsmith the same tool is a page with an input widget, a query, a table widget, a button and the bindings between them.',
            'Both work. The AwaitIO version is one short function that any developer on the team can read and review.',
          ],
        },
        {
          heading: 'Where the tool lives',
          paragraphs: [
            'An Appsmith app lives in Appsmith, in Appsmith’s own format. Git sync can store it in a repository, as JSON files that Appsmith writes.',
            'An AwaitIO action is a TypeScript file you write in your repo. It goes through code review with a diff anyone can read. The TypeScript compiler checks it. Its history is in git.',
            'When you rename a field in your database, the compiler points at every tool that uses it. Nothing breaks quietly in a widget binding.',
          ],
        },
        {
          heading: 'JavaScript in the editor or TypeScript in your repo',
          paragraphs: [
            'Appsmith’s JavaScript runs inside Appsmith. It sees the widgets and the queries of the page, and the libraries Appsmith lets you add.',
            'AwaitIO’s TypeScript runs in your own Node process. It sees everything your app sees: your packages, your modules and your types.',
            'What a person enters comes back typed. Your editor completes it, and the compiler checks it.',
          ],
        },
        {
          heading: 'Your data and your services',
          paragraphs: [
            'Appsmith reaches your data through datasources: database connections and API endpoints you set up in Appsmith. Logic that already exists in your app is often written again in queries.',
            'An AwaitIO handler imports your Prisma client, your services and your utilities and calls them directly.',
            'Environment variables and secrets work as they already do for your app. There is no second place to keep credentials.',
          ],
        },
        {
          heading: 'Extending the UI',
          paragraphs: [
            'In Appsmith the UI is built from Appsmith’s widgets in Appsmith’s editor. Custom widgets and themes take extra setup next to the editor.',
            'In AwaitIO the whole UI stays in code. A component of your own is one React file with its props and the value it returns. You register it next to the built-in ones and `await` it like any io method.',
            'The look comes from a theme package, `@awaitio/theme-default`, which you can restyle. The page around the components comes from a layout component, `@awaitio/layout-basic`, which you can replace with your own.',
            'You never leave your editor.',
          ],
        },
        {
          heading: 'Hosting',
          paragraphs: [
            'Appsmith can run on your own servers for free. It is a separate application with its own database, so it is one more service to deploy, update and back up.',
            'AwaitIO runs inside your own Node app. It has no database of its own. Deploying your app deploys the tools.',
            'Nothing can be switched off from outside.',
          ],
        },
        {
          heading: 'Open source and public source',
          paragraphs: [
            'Appsmith’s source code is open under the Apache 2.0 license. You can read it, fork it and host your own copy.',
            'AwaitIO’s source code is public too. You can read every line of the code that runs in your process.',
            'AwaitIO is not open source. Small teams use it for free, commercial use included. The terms are on the pricing page.',
          ],
        },
        {
          heading: 'Price model',
          paragraphs: [
            'Appsmith is free to host yourself. Its paid plans are priced by the number of users.',
            'AwaitIO is free for small teams. Above that it is one flat monthly price per organization, not per seat.',
            'Free or paid, it is the same software. The details are on the pricing page.',
          ],
        },
        {
          heading: 'Where Appsmith is stronger',
          paragraphs: [
            'People who do not write code can build simple tools in Appsmith. AwaitIO is for developers only.',
            'Appsmith connects to many datasources out of the box. In AwaitIO you call your data with the code you already have.',
            'Appsmith adds AI features and embedded agents to apps. AwaitIO has none of its own.',
            'Appsmith is open source under Apache 2.0.',
          ],
        },
      ],
    },
    {
      heading: 'Who should choose which',
      paragraphs: [
        'Choose Appsmith if your builders want widgets first, with some JavaScript on top, or if you want a free, open-source builder you host yourself.',
        'Choose AwaitIO if a developer writes the tool. You get it in your repo, reviewed and typed like the rest of the app, running in your own process.',
        'Many teams that pick AwaitIO used to write a CLI script or a SQL query and run it for support themselves. AwaitIO turns that script into a tool anyone on the team can run in the browser.',
      ],
    },
    {
      heading: 'Moving from Appsmith to AwaitIO',
      paragraphs: [
        'Start with one app that a developer already maintains. Write its steps as one action: the inputs it asks for, the queries it runs and what it shows at the end.',
        'Use your existing database client instead of the Appsmith queries. The action runs next to your API, so it can reuse the code your app already has.',
        'Move the JavaScript from the widgets and JS objects into the handler. It becomes plain TypeScript with types, tests and review.',
        'Use `ctx.loading` to show progress when the action goes through a long list.',
        'Register the action, open the AwaitIO UI from your own server and send the link to the team. Move the next app when the first one works.',
        'Once the last app is moved, you can shut the Appsmith server down. There is one service less to run.',
      ],
    },
  ],
  faq: [
    {
      question: 'Is AwaitIO an Appsmith alternative?',
      answer: 'Yes, for teams where developers build the internal tools. AwaitIO replaces the widgets and the editor with TypeScript functions in your own repo.',
    },
    {
      question: 'Is AwaitIO open source like Appsmith?',
      answer: 'The source code of AwaitIO is public, so you can read every line. The terms of use are on the pricing page.',
    },
    {
      question: 'Can I self-host AwaitIO?',
      answer: 'AwaitIO always runs inside your own Node app, on your own servers. There is no separate server to set up next to it.',
    },
    {
      question: 'Appsmith has Git sync. How is AwaitIO different?',
      answer: 'Appsmith writes the app to Git as its own JSON files. In AwaitIO you write the tool yourself as TypeScript, so the diff is code you can read and the compiler checks it.',
    },
    {
      question: 'Can people who do not code build tools in AwaitIO?',
      answer: 'No. Every AwaitIO tool is written in code by a developer. Once it exists, anyone on the team can run it in the browser.',
    },
    {
      question: 'Does AwaitIO charge per seat?',
      answer: 'No. It is free for small teams and one flat monthly price per organization above that. The pricing page has the details.',
    },
    {
      question: 'Can I use AwaitIO and Appsmith together?',
      answer: 'Yes. They do not depend on each other. Some teams keep Appsmith for widget-based apps and write developer-owned tools in AwaitIO.',
    },
  ],
};
