import type { Competitor } from '../types/Competitor';

export const budibase: Competitor = {
  slug: 'budibase',
  name: 'Budibase',
  logo: '3 52 24 26 23|1 56 20 30 21|1 57 19 31 20|1 57 18 33 19|0 59 17 34 18|0 60 16 34 18|0 61 15 35 17|0 61 15 36 16|0 62 14 37 15|0 63 13 37 15|0 63 13 38 14|0 64 12 39 13|0 65 11 40 12|0 66 10 40 12|0 67 9 41 11|0 67 9 42 10|0 68 8 43 9|0 69 7 43 9|0 69 7 44 8|0 70 6 45 7|0 71 5 46 6|0 72 4 46 6|0 72 4 47 5|0 73 3 48 4|0 74 2 49 3|0 75 1 49 3|0 75 1 50 2|0 127 1*2|0 128*3|0 127 1*2|0 75 1 50 2|0 75 1 49 3|0 74 2 49 3|0 73 3 48 4|0 72 4 47 5|0 72 4 46 6|0 71 5 46 6|0 70 6 45 7|0 70 6 44 8|0 69 7 43 9|0 68 8 43 9|0 67 9 42 10|0 67 9 41 11|0 66 10 40 12|0 65 11 40 12|0 64 12 39 13|0 64 12 38 14|0 63 13 37 15|0 62 14 37 15|0 61 15 36 16|0 61 15 35 17|0 60 16 35 17|0 59 17 34 18|1 57 18 33 19|1 57 19 31 20|1 56 20 30 21|2 53 23 28 22|128*7|2 54 22 28 22|1 56 20 31 20|1 57 19 32 19|0 59 17 33 19|0 59 17 34 18|0 60 16 35 17|0 61 15 36 16|0 62 14 36 16|0 62 14 37 15|0 63 13 38 14|0 64 12 39 13|0 65 11 39 13|0 65 11 40 12|0 66 10 41 11|0 67 9 42 10|0 68 8 42 10|0 68 8 43 9|0 69 7 44 8|0 70 6 45 7|0 71 5 45 7|0 71 5 46 6|0 72 4 47 5|0 73 3 48 4|0 74 2 48 4|0 74 2 49 3|0 75 1 50 2|0 127 1*2|0 128*3|0 127 1*2|0 75 1 50 2*2|0 74 2 49 3|0 73 3 48 4|0 73 3 47 5|0 72 4 47 5|0 71 5 46 6|0 70 6 45 7|0 70 6 44 8|0 69 7 43 9|0 68 8 43 9|0 67 9 42 10|0 67 9 41 11|0 66 10 41 11|0 65 11 40 12|0 64 12 39 13|0 64 12 38 14|0 63 13 38 14|0 62 14 37 15|0 61 15 36 16|0 61 15 35 17|0 60 16 35 17|0 59 17 34 18|1 57 18 33 19|1 57 19 31 20|1 56 20 30 21|3 52 24 26 23',
  kind: 'canvas',
  headline: 'Budibase is low-code for ops teams. AwaitIO is just code for developers.',
  summary: 'An open-source low-code platform with its own database, now focused on AI agents.',
  about: ['Budibase is an open-source low-code platform for internal tools.', 'It has its own built-in database.', 'It is now pitched as AI agents that run your operations, for operations teams.'],
  status: {
    heading: 'Where Budibase stands',
    paragraphs: ['Budibase is active.', 'Its focus has moved to operations teams and AI agents.'],
  },
  highlights: [
    {
      illustration: 'await',
      title: 'Write a function, not a screen.',
      body: 'Budibase builds screens in its editor. In AwaitIO every `await io.input` call shows a form and waits for the answer.',
    },
    {
      illustration: 'services',
      title: 'Your own database, not a second one.',
      body: 'Budibase brings its own database. An AwaitIO action imports your Prisma client and services and works on the data you already have.',
    },
    {
      illustration: 'repo',
      title: 'The tool lives in your repo.',
      body: 'A Budibase app lives in Budibase. An AwaitIO action is a TypeScript file next to the rest of your code.',
    },
    {
      illustration: 'app',
      title: 'Runs inside your own app.',
      body: 'Self-hosted Budibase is one more platform to run next to your app. AwaitIO runs in your own Node process.',
    },
    {
      illustration: 'review',
      title: 'Reviewed like any other code.',
      body: 'A change to a tool is a pull request with a diff, types and git history, like the rest of the app.',
    },
    {
      illustration: 'types',
      title: 'Typed from the form to the database.',
      body: 'What a person enters comes back typed. Rename a column and the compiler shows every tool that uses it.',
    },
    {
      illustration: 'price',
      title: 'One price for the whole team.',
      body: 'Budibase’s paid plans grow with your users. AwaitIO is free for small teams and one flat monthly price per organization above that.',
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
    { label: 'A built-in database for your app data', awaitio: 'no', them: 'yes' },
    { label: 'Automations and AI agents built in', awaitio: 'no', them: 'yes' },
    { label: 'Run the tools from a phone, in the browser', awaitio: 'yes', them: 'yes' },
  ],
  facts: {
    build: 'Build apps in its low-code editor, now with AI agents.',
    runs: 'Budibase Cloud, or your own servers.',
    code: 'On the Budibase platform, next to its built-in database.',
    ui: 'Built in its low-code editor.',
    openSource: 'Yes.',
  },
  whenItFits: ['An operations team without a developer builds the tools.', 'You want a built-in database next to your apps.', 'You want AI agents to run operations.'],
  whenAwaitIOFits: ['A developer writes the tool, as code.', 'Your data already lives in your own database and services.', 'You want every tool reviewed, typed and versioned in your repo.'],
  lastModifiedAt: '2026-10-25',
  details: [
    {
      heading: 'What is Budibase?',
      paragraphs: [
        'Budibase is an open-source low-code platform for internal tools.',
        'You build an app in Budibase’s editor. You design screens from its components, such as forms, tables and buttons, and connect them to data.',
        'The data can live in Budibase’s own built-in database. Budibase can also connect to external databases and APIs.',
        'Automations run steps when something happens, such as a new row or a button press. You build them in the editor too.',
        'You can use Budibase Cloud or host Budibase on your own servers.',
        'Today Budibase is pitched as AI agents that run your operations. Its main audience is operations teams.',
      ],
    },
    {
      heading: 'What is AwaitIO?',
      paragraphs: [
        'AwaitIO is a framework for internal tools written as code. An action is an async TypeScript function in your own repo.',
        'Every `await io.input` call asks a person for something and waits for the answer. The browser shows the form, the person fills it in, and your function goes on with the value.',
        'The same Node process that runs your app serves the UI. There is no separate platform to host and no editor to log in to.',
        'AwaitIO ships more than 20 components: 8 inputs, 3 selects including a table, 8 displays, a confirm and a layout. Anything missing is one React file you register next to them.',
      ],
    },
    {
      heading: 'Key differences',
      paragraphs: [
        'Budibase and AwaitIO are made for different people. Budibase lets an operations team build its own tools without a developer. AwaitIO lets a developer ship a tool as code, for the whole team to use.',
      ],
      subsections: [
        {
          heading: 'Low-code for ops, or just code for developers',
          paragraphs: [
            'In Budibase you build the screen first. You place components, connect them to a table and add automations for what should happen next.',
            'In AwaitIO you write the steps of the task in order. `await io.input.email()` asks for an email. `await io.select.table()` lets a person pick rows. The screens follow from the code.',
            'A tool in AwaitIO reads top to bottom like a script. Branches, loops and error handling are plain TypeScript.',
          ],
        },
        {
          heading: 'One tool, step by step',
          paragraphs: [
            'Say support needs to refund an order. Your team opens Refund order in the browser and sees a form with one field: Order ID.',
            'In AwaitIO that form is one line, `await io.input.text()`. The function then loads the order with your own database client.',
            'It shows the order with a display component and asks for a confirmation. Then it calls the refund service your app already has.',
            'In Budibase the same tool is a screen with a form, a data source, a table, a button and an automation behind it.',
            'Both work. The AwaitIO version is one short function that any developer on the team can read and review.',
          ],
        },
        {
          heading: 'Its database or yours',
          paragraphs: [
            'Budibase comes with its own database. That is handy when a team starts from a spreadsheet and has nowhere else to keep the data.',
            'Most apps with a developer already have a database, with its own schema, migrations and business rules. A second database next to it means a second place for the truth.',
            'AwaitIO has no database of its own. An action reads and writes your existing data through your own Prisma client and services, with the rules your app already has.',
          ],
        },
        {
          heading: 'Where the tool lives',
          paragraphs: [
            'A Budibase app lives in Budibase, in Budibase’s own format, outside your codebase.',
            'An AwaitIO action is a file in your repo. It goes through code review. The TypeScript compiler checks it. Its history is in git.',
            'When you rename a column in your database, the compiler points at every tool that uses it. Nothing breaks quietly in another editor.',
          ],
        },
        {
          heading: 'Extending the UI',
          paragraphs: [
            'In Budibase the UI is built from Budibase’s components in Budibase’s editor. Custom components and themes take extra setup next to the editor.',
            'In AwaitIO the whole UI stays in code. A component of your own is one React file with its props and the value it returns. You register it next to the built-in ones and `await` it like any io method.',
            'The look comes from a theme package, `@awaitio/theme-default`, which you can restyle. The page around the components comes from a layout component, `@awaitio/layout-basic`, which you can replace with your own.',
            'You never leave your editor.',
          ],
        },
        {
          heading: 'Automations and AI agents',
          paragraphs: [
            'Budibase has automations built in, and it now puts AI agents at the center of the product.',
            'AwaitIO runs actions that a person starts in the browser. It has no automation builder and no AI agents of its own.',
            'An action is plain TypeScript, so it can call any library or API your app already uses, an AI model included.',
          ],
        },
        {
          heading: 'Hosting',
          paragraphs: [
            'Budibase runs on Budibase Cloud or on your own servers. Self-hosted, it is a separate platform with its own services and its own database to deploy, update and back up.',
            'AwaitIO runs inside your own Node app. Deploying your app deploys the tools.',
            'Nothing can be switched off from outside.',
          ],
        },
        {
          heading: 'Open source and public source',
          paragraphs: [
            'Budibase’s source code is open. You can read it, fork it and host your own copy.',
            'AwaitIO’s source code is public too. You can read every line of the code that runs in your process.',
            'AwaitIO is not open source. Small teams use it for free, commercial use included. The terms are on the pricing page.',
          ],
        },
        {
          heading: 'Price model',
          paragraphs: [
            'Budibase’s paid plans are priced by the number of users.',
            'AwaitIO is free for small teams. Above that it is one flat monthly price per organization, not per seat.',
            'Free or paid, it is the same software. The details are on the pricing page.',
          ],
        },
        {
          heading: 'Where Budibase is stronger',
          paragraphs: [
            'People who do not write code can build tools in Budibase. AwaitIO is for developers only.',
            'Budibase has a built-in database. A team without one can start right away.',
            'Budibase has automations and AI agents built in. AwaitIO runs what a person starts.',
            'Budibase’s source is open.',
          ],
        },
      ],
    },
    {
      heading: 'Who should choose which',
      paragraphs: [
        'Choose Budibase if an operations team without a developer builds the tools, if you want a database that comes with the platform, or if you want AI agents to run operations.',
        'Choose AwaitIO if a developer writes the tool and your data already lives in your own database and services. You get the tool in your repo, reviewed and typed like the rest of the app, running in your own process.',
        'Many teams that pick AwaitIO used to write a CLI script or a SQL query and run it for support themselves. AwaitIO turns that script into a tool anyone on the team can run in the browser.',
      ],
    },
    {
      heading: 'Moving from Budibase to AwaitIO',
      paragraphs: [
        'Start with one app that works on data your own app already owns. Write its steps as one action: the inputs it asks for, the data it changes and what it shows at the end.',
        'Use your existing database client instead of the Budibase data source. The action runs next to your API, so it can reuse the code your app already has.',
        'Data that lives only in Budibase’s built-in database needs a home first. Move it into your own database, with a table and a migration like any other data.',
        'Use `ctx.loading` to show progress when the action goes through a long list.',
        'Register the action, open the AwaitIO UI from your own server and send the link to the team. Move the next app when the first one works.',
      ],
    },
  ],
  faq: [
    {
      question: 'Is AwaitIO a Budibase alternative?',
      answer: 'Yes, for teams where developers build the internal tools. AwaitIO replaces the low-code editor with TypeScript functions in your own repo.',
    },
    {
      question: 'Is AwaitIO open source like Budibase?',
      answer: 'The source code of AwaitIO is public, so you can read every line. The terms of use are on the pricing page.',
    },
    {
      question: 'Does AwaitIO have a built-in database like Budibase?',
      answer: 'No. AwaitIO works on the database you already have, through your own client and services.',
    },
    {
      question: 'Can I self-host AwaitIO?',
      answer: 'AwaitIO always runs inside your own Node app, on your own servers. There is no separate platform to set up next to it.',
    },
    {
      question: 'Can an operations team build tools in AwaitIO without a developer?',
      answer: 'No. Every AwaitIO tool is written in code by a developer. Once it exists, anyone on the team can run it in the browser.',
    },
    {
      question: 'Does AwaitIO charge per seat?',
      answer: 'No. It is free for small teams and one flat monthly price per organization above that. The pricing page has the details.',
    },
    {
      question: 'Can I use AwaitIO and Budibase together?',
      answer: 'Yes. They do not depend on each other. Some teams keep Budibase for tools the operations team builds and write developer-owned tools in AwaitIO.',
    },
  ],
};
