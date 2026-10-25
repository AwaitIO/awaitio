import type { Competitor } from '../types/Competitor';

export const retool: Competitor = {
  slug: 'retool',
  name: 'Retool',
  kind: 'canvas',
  logo: '8 72 48|6 76 46|5 78 45|5 78 45|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 80 44|4 81 43|4 81 43|4 82 42|4 84 40|4 116 8|4 118 6|4 119 5|4 119 5|4 120 4|4 120 4|4 120 4|4 120 4|5 119 4|5 119 4|6 118 4|8 116 4|80 44 4|82 42 4|83 41 4|83 41 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|83 41 4|83 41 4|82 42 4|80 44 4|32 92 4|30 94 4|29 95 4|29 95 4|28 95 5|28 95 5|28 94 6|28 92 8|28 60 40|28 58 42|28 57 43|28 57 43|28 56 44|28 56 44|28 56 44|28 56 44|28 56 44|28 56 44|28 56 44|28 56 44|28 56 44|28 56 44|28 56 44|28 56 44|28 57 43|28 57 43|28 58 42|28 60 40|28 92 8|28 94 6|28 95 5|28 95 5|28 96 4|28 96 4|28 96 4|28 96 4|29 95 4|29 95 4|30 94 4|32 92 4|80 44 4|82 42 4|83 41 4|83 41 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|84 40 4|85 38 5|85 38 5|86 36 6|88 32 8',
  headline: 'Retool is a visual builder. AwaitIO is just code.',
  summary: 'The market leader: a drag-and-drop builder for internal apps, now pitched as AI AppGen.',
  about: [
    'Retool is the market leader for internal tools.',
    'You drag components onto a canvas and wire queries to your data in its editor.',
    'Today it is pitched as an enterprise AppGen platform: AI turns plain text into internal apps on your live data.',
  ],
  status: {
    heading: 'Where Retool stands',
    paragraphs: ['Retool is active and the tool most people compare against.', 'It has grown into many product lines: apps, Workflows, Mobile, Database, Portals, Forms, AI, Agents and AI AppGen.'],
  },
  highlights: [
    {
      illustration: 'repo',
      title: 'The tool lives in your repo.',
      body: 'A Retool app lives on Retool’s platform, in its own format. An AwaitIO action is a TypeScript file next to the rest of your code.',
    },
    {
      illustration: 'await',
      title: 'Write a function, not a canvas.',
      body: 'No components to drag and no queries to wire. Every `await io.input` call shows a form and waits for the answer.',
    },
    {
      illustration: 'app',
      title: 'Runs inside your own app.',
      body: 'Retool keeps self-hosting for enterprise plans. AwaitIO runs in your own Node process from the first line.',
    },
    {
      illustration: 'review',
      title: 'Reviewed like any other code.',
      body: 'A change to a tool is a pull request with a diff, types and git history, like the rest of the app.',
    },
    {
      illustration: 'services',
      title: 'Your code, called directly.',
      body: 'No resources to set up and no logic written twice. An action imports your Prisma client and services and calls them.',
    },
    {
      illustration: 'types',
      title: 'Typed from the form to the database.',
      body: 'What a person enters comes back typed. Rename a field and the compiler shows every tool that uses it.',
    },
    {
      illustration: 'price',
      title: 'One price for the whole team.',
      body: 'Retool charges per seat. AwaitIO is free for small teams and one flat monthly price per organization above that.',
    },
    {
      illustration: 'owned',
      title: 'Nobody can switch it off.',
      body: 'The tools run in your own app, so no platform change, price change or shutdown can take them away.',
    },
  ],
  checks: [
    { label: 'Each tool is a file in your own repo', awaitio: 'yes', them: 'no' },
    { label: 'Runs inside your own app, on your own servers', awaitio: 'yes', them: 'partial' },
    { label: 'Calls your own services and database client directly', awaitio: 'yes', them: 'no' },
    { label: 'One flat price per organization, not per seat', awaitio: 'yes', them: 'no' },
    { label: '100 % in code, you never leave your editor', awaitio: 'yes', them: 'no' },
    { label: 'Your own UI components, one React file each', awaitio: 'yes', them: 'partial' },
    { label: 'Your own theme for the whole UI', awaitio: 'yes', them: 'partial' },
    { label: 'Your own layout components', awaitio: 'yes', them: 'no' },
    { label: 'Generate an app from a plain-text description', awaitio: 'no', them: 'yes' },
    { label: 'Run the tools from a phone, in the browser', awaitio: 'yes', them: 'yes' },
    { label: 'Native iOS and Android apps', awaitio: 'no', them: 'yes' },
  ],
  facts: {
    build: 'Drag components onto a canvas and wire queries in its editor, or generate an app from plain text.',
    runs: 'Retool’s platform. Self-hosting only on enterprise plans.',
    code: 'On Retool’s platform, in its own format, outside your codebase.',
    ui: 'Built from its components in the visual editor.',
    openSource: 'No, proprietary.',
  },
  whenItFits: [
    'People who do not write code build the tools themselves.',
    'You want one platform for apps, workflows, mobile apps, forms and agents.',
    'You want AI to generate an app from a plain-text description.',
  ],
  whenAwaitIOFits: [
    'Your developers would rather write a function than wire a canvas.',
    'You want every tool reviewed, typed and versioned in your repo, like the rest of the app.',
    'You want to call your own services and database client directly.',
    'You want the tools to run inside your own app, on your own servers.',
  ],
  lastModifiedAt: '2026-10-25',
  details: [
    {
      heading: 'What is Retool?',
      paragraphs: [
        'Retool is a low-code platform for internal tools. It launched in 2018 out of Y Combinator and became the market leader.',
        'You build an app in Retool’s visual editor. You drag tables, forms and buttons onto a canvas. Then you connect them to your data through queries written in the editor.',
        'Over the years Retool added more products: Workflows for automation, Mobile for iOS and Android apps, Database for a managed PostgreSQL, Portals for apps that customers and partners use, Forms, AI, Agents and AI AppGen.',
        'Today Retool calls itself an enterprise AppGen platform. AI turns a plain-text description into an internal app on your live data.',
      ],
    },
    {
      heading: 'What is AwaitIO?',
      paragraphs: [
        'AwaitIO is a framework for internal tools written as code. An action is an async TypeScript function in your own repo.',
        'Every `await io.input` call asks a person for something and waits for the answer. The browser shows the form, the person fills it in, and your function goes on with the value.',
        'The same Node process that runs your app serves the UI. There is no separate service to host and no editor to log in to.',
        'AwaitIO ships more than 20 components: inputs, selects, displays, a confirm and a layout. Anything missing is one React file you register next to them.',
      ],
    },
    {
      heading: 'Key differences',
      paragraphs: ['Both tools give your team buttons and forms on top of your data. They get there in opposite ways.'],
      subsections: [
        {
          heading: 'A visual editor or a function',
          paragraphs: [
            'In Retool you build the screen first. You place components on a canvas, then wire each one to a query and to the others.',
            'In AwaitIO you write the steps of the task in order. `await io.input.email()` asks for an email. `await io.select.table()` lets a person pick rows. The screens follow from the code.',
            'A tool in AwaitIO reads top to bottom like a script. Branches, loops and error handling are plain TypeScript.',
          ],
        },
        {
          heading: 'Where the tool lives',
          paragraphs: [
            'A Retool app lives on Retool’s platform, in Retool’s own format. It sits outside your codebase.',
            'An AwaitIO action is a file in your repo. It goes through code review, it is checked by the TypeScript compiler, and its history is in git.',
            'When you rename a field in your database, the compiler points at every tool that uses it. Nothing breaks quietly in another editor.',
          ],
        },
        {
          heading: 'Your data and your services',
          paragraphs: [
            'Retool reaches your data through resources: database connections and API endpoints you set up in Retool. Logic that already exists in your app is often written again in queries.',
            'An AwaitIO handler runs in your own process. It imports your Prisma client, your services and your utilities and calls them directly. Environment variables work as they are.',
          ],
        },
        {
          heading: 'Extending the UI',
          paragraphs: [
            'In Retool the UI is built from Retool’s components in Retool’s editor. Custom components and themes take extra setup next to the editor.',
            'In AwaitIO the whole UI stays in code. A component of your own is one React file with its props and the value it returns. You register it next to the built-in ones and `await` it like any io method.',
            'The look comes from a theme package you can restyle, and the page around the components from a layout component you can replace with your own. You never leave your editor.',
          ],
        },
        {
          heading: 'Hosting',
          paragraphs: [
            'Retool runs on Retool’s cloud. Self-hosting is available only on enterprise plans.',
            'AwaitIO always runs inside your own Node app, on your own servers. Nothing can be switched off from outside.',
          ],
        },
        {
          heading: 'Price model',
          paragraphs: [
            'Retool charges per seat, and the price per seat at scale is one of the most common reasons people look for an alternative.',
            'AwaitIO is free for small teams. Above that it is one flat monthly price per organization, not per seat. The details are on the pricing page.',
          ],
        },
        {
          heading: 'Where Retool is stronger',
          paragraphs: [
            'People who do not write code can build tools in Retool. AwaitIO is for developers only.',
            'Retool covers much more ground: native mobile apps, a managed database, customer portals, workflows and AI agents.',
            'Retool can generate an app from a plain-text description. In AwaitIO a developer writes the code.',
          ],
        },
      ],
    },
    {
      heading: 'Who should choose which',
      paragraphs: [
        'Choose Retool if people without a developer build the tools, or if you want one platform for apps, mobile, workflows and agents.',
        'Choose AwaitIO if a developer writes the tool and you want it in your repo, reviewed and typed like the rest of the app, running in your own process.',
        'Many teams that pick AwaitIO used to write a CLI script or a SQL query and run it for support themselves. AwaitIO turns that script into a tool anyone on the team can run.',
      ],
    },
    {
      heading: 'Moving a Retool app to AwaitIO',
      paragraphs: [
        'Start with one app that a developer already maintains. Write its steps as one action: the inputs it asks for, the queries it runs and what it shows at the end.',
        'Use your existing database client instead of the Retool queries. The action runs next to your API, so it can reuse the code your app already has.',
        'Register the action, open the AwaitIO UI from your own server and send the link to the team. Move the next app when the first one works.',
      ],
    },
  ],
  faq: [
    {
      question: 'Is AwaitIO a Retool alternative?',
      answer: 'Yes, for teams where developers build the internal tools. AwaitIO replaces the visual editor with TypeScript functions in your own repo.',
    },
    {
      question: 'Can people who do not code build tools in AwaitIO?',
      answer: 'No. Every AwaitIO tool is written in code by a developer. Once it exists, anyone on the team can run it in the browser.',
    },
    {
      question: 'Can I self-host AwaitIO?',
      answer: 'AwaitIO always runs inside your own Node app, on your own servers. There is no hosted version to move away from.',
    },
    {
      question: 'Does AwaitIO charge per seat?',
      answer: 'No. It is free for small teams and one flat monthly price per organization above that. The pricing page has the details.',
    },
    {
      question: 'Does AwaitIO have a drag-and-drop editor?',
      answer: 'No. AwaitIO is just code. The screens come from the `await` calls in your function.',
    },
    {
      question: 'Can I use AwaitIO and Retool together?',
      answer: 'Yes. They do not depend on each other. Some teams keep Retool for tools built without code and write developer-owned tools in AwaitIO.',
    },
  ],
};
