import type { Competitor } from '../types/Competitor';

export const tooljet: Competitor = {
  slug: 'tooljet',
  name: 'ToolJet',
  logo: '128*23|0 25 51 24 28|0 25 51 25 27|1 25 49 26 27|2 25 47 28 26|2 25 47 29 25|3 25 45 30 25|4 25 44 31 24|4 26 42 33 23|5 25 41 35 22|6 25 40 35 22|6 26 38 37 21|7 25 37 39 20|8 25 36 39 20|9 25 35 40 19|9 25 34 42 18|10 25 32 43 18|11 25 30 45 17|11 26 29 46 16|12 25 28 48 15|13 25 27 48 15|14 25 25 50 14|14 25 51 25 13|15 25 50 25 13|16 25 50 25 12|16 25 51 25 11|17 25 50 25 11|18 25 50 25 10|18 25 51 25 9|19 25 50 25 9|20 25 50 25 8|20 26 50 25 7|21 25 50 26 6|22 25 50 25 6|22 25 51 25 5|23 25 50 25 5|24 25 50 25 4|25 24 51 25 3|25 25 51 25 2|26 25 50 25 2|26 26 50 25 1|27 25 50 26*2|26 26 50 25 1|26 25 50 26 1|25 26 50 25 2|25 25 50 25 3|24 25 50 25 4|23 25 50 25 5|22 25 51 25 5|22 25 50 25 6|21 25 50 26 6|20 26 50 25 7|20 25 50 25 8|19 25 50 25 9|18 26 50 25 9|18 25 50 25 10|17 25 50 25 11|16 25 51 25 11|16 25 50 25 12|15 25 50 25 13|14 25 50 26 13|13 26 25 50 14|13 25 25 50 15|12 25 25 51 15|11 26 25 50 16|11 25 25 50 17|10 25 25 51 17|9 25 26 50 18|9 25 25 50 19|8 25 25 50 20|7 25 25 51 20|6 26 25 50 21|6 25 25 50 22|5 25 25 51 22|4 26 25 50 23|4 25 25 51 23|3 25 25 51 24|2 26 25 50 25|2 25 25 50 26|1 25 25 50 27|0 25 25 51 27|0 25 25 50 28|128*23',
  kind: 'canvas',
  headline: 'ToolJet is open-source drag-and-drop. AwaitIO is just code.',
  summary: 'An open-source drag-and-drop builder, positioned as the open-source alternative to Retool.',
  about: [
    'ToolJet is an open-source low-code builder for internal tools.',
    'You drag components onto a canvas and connect them to your data.',
    'It calls itself the open-source alternative to Retool. It now also builds apps and agents from natural language.',
  ],
  status: {
    heading: 'Where ToolJet stands',
    paragraphs: ['ToolJet is active.', 'Self-hosting is free. The cloud is paid.'],
  },
  highlights: [
    {
      illustration: 'await',
      title: 'Write a function, not a canvas.',
      body: 'No components to drag in ToolJet’s editor. Every `await io.input` call shows a form and waits for the answer.',
    },
    {
      illustration: 'repo',
      title: 'The tool lives in your repo.',
      body: 'A ToolJet app lives in ToolJet, in its own format. An AwaitIO action is a TypeScript file next to the rest of your code.',
    },
    {
      illustration: 'app',
      title: 'Runs inside your own app.',
      body: 'Self-hosted ToolJet is one more service to run next to your app. AwaitIO runs in your own Node process.',
    },
    {
      illustration: 'services',
      title: 'Your code, called directly.',
      body: 'No data sources to set up in another editor. An action imports your Prisma client and services and calls them.',
    },
    {
      illustration: 'review',
      title: 'Reviewed like any other code.',
      body: 'A change to a tool is a pull request with a diff, types and git history, like the rest of the app.',
    },
    {
      illustration: 'types',
      title: 'Typed from the form to the database.',
      body: 'What a person enters comes back typed. Rename a field and the compiler shows every tool that uses it.',
    },
    {
      illustration: 'price',
      title: 'One price for the whole team.',
      body: 'ToolJet’s paid plans grow with your users. AwaitIO is free for small teams and one flat monthly price per organization above that.',
    },
    {
      illustration: 'owned',
      title: 'Nobody can switch it off.',
      body: 'The tools run in your own app, so no platform change, price change or shutdown can take them away.',
    },
  ],
  checks: [
    { label: 'Each tool is plain TypeScript in your own repo', awaitio: 'yes', them: 'no' },
    { label: 'Runs inside your own app, on your own servers', awaitio: 'yes', them: 'partial' },
    { label: 'Calls your own services and database client directly', awaitio: 'yes', them: 'no' },
    { label: '100 % in code, you never leave your editor', awaitio: 'yes', them: 'no' },
    { label: 'Your own UI components, one React file each', awaitio: 'yes', them: 'partial' },
    { label: 'Your own theme for the whole UI', awaitio: 'yes', them: 'partial' },
    { label: 'Your own layout components', awaitio: 'yes', them: 'no' },
    { label: 'Build tools without writing code', awaitio: 'no', them: 'yes' },
    { label: 'Generate an app from a plain-text description', awaitio: 'no', them: 'yes' },
    { label: 'Run the tools from a phone, in the browser', awaitio: 'yes', them: 'yes' },
  ],
  facts: {
    build: 'Drag components onto a canvas, or describe the app in natural language.',
    runs: 'Self-hosted, or ToolJet’s cloud.',
    code: 'On the ToolJet platform, in its own format.',
    ui: 'Built from its components in a visual editor.',
    openSource: 'Yes.',
  },
  whenItFits: ['People who do not write code build the tools.', 'You want a free, self-hosted visual builder.', 'You want 50+ integrations ready to use.'],
  whenAwaitIOFits: [
    'Your developers would rather write a function than drag components.',
    'You want every tool reviewed, typed and versioned in your repo.',
    'You want to call your own services directly, not through connectors in another editor.',
  ],
  lastModifiedAt: '2026-10-25',
  details: [
    {
      heading: 'What is ToolJet?',
      paragraphs: [
        'ToolJet is an open-source low-code platform for internal tools. Its first big launch, in 2021, called it the open-source alternative to Retool.',
        'You build an app in ToolJet’s visual editor. You drag tables, forms and buttons onto a canvas. Then you connect them to your data through queries on data sources you set up in ToolJet.',
        'ToolJet ships more than 50 integrations: databases, APIs and SaaS tools you can query from the editor.',
        'You can host ToolJet yourself for free, or pay for ToolJet’s cloud.',
        'Today ToolJet also builds apps and agents from natural language. You describe what you need and AI builds it.',
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
      paragraphs: ['Both tools give your team buttons and forms on top of your data. Both can run on your own servers. They differ in how you build the tool and where it lives.'],
      subsections: [
        {
          heading: 'Drag-and-drop or a function',
          paragraphs: [
            'In ToolJet you build the screen first. You place components on a canvas, then wire each one to a query and to the others.',
            'In AwaitIO you write the steps of the task in order. `await io.input.email()` asks for an email. `await io.select.table()` lets a person pick rows. The screens follow from the code.',
            'A tool in AwaitIO reads top to bottom like a script. Branches, loops and error handling are plain TypeScript.',
          ],
        },
        {
          heading: 'Getting started',
          paragraphs: [
            'With ToolJet you start a ToolJet server or sign up for its cloud. Then you add data sources and start building in the editor.',
            'With AwaitIO you install the `awaitio` package from npm into the app you already have. You pass it a folder of actions.',
            'Every file in that folder becomes an action, and its path becomes the URL. Folders become the navigation.',
          ],
        },
        {
          heading: 'One tool, step by step',
          paragraphs: [
            'Say support needs to refund an order. Your team opens Refund order in the browser and sees a form with one field: Order ID.',
            'In AwaitIO that form is one line, `await io.input.text()`. The function then loads the order with your own database client.',
            'It shows the order with a display component and asks for a confirmation. Then it calls the refund service your app already has.',
            'In ToolJet the same tool is a screen with a text field, a query, a table, a button and the wiring between them, built in its editor.',
            'Both work. The AwaitIO version is one short function that any developer on the team can read and review.',
          ],
        },
        {
          heading: 'Where the tool lives',
          paragraphs: [
            'A ToolJet app lives in ToolJet, in ToolJet’s own format. Even when you host ToolJet yourself, the app sits in ToolJet’s database, outside your codebase.',
            'An AwaitIO action is a file in your repo. It goes through code review. The TypeScript compiler checks it. Its history is in git.',
            'When you rename a field in your database, the compiler points at every tool that uses it. Nothing breaks quietly in another editor.',
          ],
        },
        {
          heading: 'Your data and your services',
          paragraphs: [
            'ToolJet reaches your data through data sources: database connections and API endpoints you set up in ToolJet. Logic that already exists in your app is often written again in queries.',
            'An AwaitIO handler runs in your own process. It imports your Prisma client, your services and your utilities and calls them directly.',
            'Environment variables and secrets work as they already do for your app. There is no second place to keep credentials.',
          ],
        },
        {
          heading: 'Extending the UI',
          paragraphs: [
            'In ToolJet the UI is built from ToolJet’s components in ToolJet’s editor. Custom components and themes take extra setup next to the editor.',
            'In AwaitIO the whole UI stays in code. A component of your own is one React file with its props and the value it returns. You register it next to the built-in ones and `await` it like any io method.',
            'The look comes from a theme package, `@awaitio/theme-default`, which you can restyle. The page around the components comes from a layout component, `@awaitio/layout-basic`, which you can replace with your own.',
            'You never leave your editor.',
          ],
        },
        {
          heading: 'Hosting',
          paragraphs: [
            'ToolJet can run on your own servers. It is a separate application with its own database, so it is one more service to deploy, update and back up.',
            'AwaitIO runs inside your own Node app. It has no database of its own. Deploying your app deploys the tools.',
            'Nothing can be switched off from outside.',
          ],
        },
        {
          heading: 'Open source and public source',
          paragraphs: [
            'ToolJet’s source code is open. You can read it, fork it and host your own copy.',
            'AwaitIO’s source code is public too. You can read every line of the code that runs in your process.',
            'AwaitIO is not open source. Small teams use it for free, commercial use included. The terms are on the pricing page.',
          ],
        },
        {
          heading: 'Price model',
          paragraphs: [
            'ToolJet is free to host yourself. Its cloud and its paid plans are priced by the number of users.',
            'AwaitIO is free for small teams, commercial use included. Above that it is one flat monthly price per organization, not per seat.',
            'Free or paid, it is the same software. The details are on the pricing page.',
          ],
        },
        {
          heading: 'Where ToolJet is stronger',
          paragraphs: [
            'People who do not write code can build tools in ToolJet. AwaitIO is for developers only.',
            'ToolJet ships more than 50 integrations ready to use. In AwaitIO you call your data with the code you already have.',
            'ToolJet can generate apps and agents from natural language. In AwaitIO a developer writes the code.',
            'ToolJet’s source is open. Anyone can read it, change it and host it.',
          ],
        },
      ],
    },
    {
      heading: 'Who should choose which',
      paragraphs: [
        'Choose ToolJet if people without a developer build the tools, or if you want a free, self-hosted visual builder with many integrations.',
        'Choose AwaitIO if a developer writes the tool. You get it in your repo, reviewed and typed like the rest of the app, running in your own process.',
        'Many teams that pick AwaitIO used to write a CLI script or a SQL query and run it for support themselves. AwaitIO turns that script into a tool anyone on the team can run in the browser.',
      ],
    },
    {
      heading: 'Moving from ToolJet to AwaitIO',
      paragraphs: [
        'Start with one app that a developer already maintains. Write its steps as one action: the inputs it asks for, the queries it runs and what it shows at the end.',
        'Use your existing database client instead of the ToolJet queries. The action runs next to your API, so it can reuse the code your app already has.',
        'Move the JavaScript you wrote inside ToolJet into the handler. It becomes plain TypeScript with types, tests and review.',
        'Use `ctx.loading` to show progress when the action goes through a long list.',
        'Register the action, open the AwaitIO UI from your own server and send the link to the team. Move the next app when the first one works.',
        'Once the last app is moved, you can shut the ToolJet server down. There is one service less to run.',
      ],
    },
  ],
  faq: [
    {
      question: 'Is AwaitIO a ToolJet alternative?',
      answer: 'Yes, for teams where developers build the internal tools. AwaitIO replaces the drag-and-drop editor with TypeScript functions in your own repo.',
    },
    {
      question: 'Is AwaitIO open source like ToolJet?',
      answer: 'The source code of AwaitIO is public, so you can read every line. The terms of use are on the pricing page.',
    },
    {
      question: 'Can I self-host AwaitIO?',
      answer: 'AwaitIO always runs inside your own Node app, on your own servers. There is no separate server to set up next to it.',
    },
    {
      question: 'Can people who do not code build tools in AwaitIO?',
      answer: 'No. Every AwaitIO tool is written in code by a developer. Once it exists, anyone on the team can run it in the browser.',
    },
    {
      question: 'Does AwaitIO have a drag-and-drop editor?',
      answer: 'No. AwaitIO is just code. The screens come from the `await` calls in your function.',
    },
    {
      question: 'Does AwaitIO charge per seat?',
      answer: 'No. It is free for small teams and one flat monthly price per organization above that. The pricing page has the details.',
    },
    {
      question: 'Can I use AwaitIO and ToolJet together?',
      answer: 'Yes. They do not depend on each other. Some teams keep ToolJet for tools built without code and write developer-owned tools in AwaitIO.',
    },
  ],
};
