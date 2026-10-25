import type { Competitor } from '../types/Competitor';

export const superblocks: Competitor = {
  slug: 'superblocks',
  name: 'Superblocks',
  logo: '128*17|101 2 25|94 16 18|91 22 15|88 27 13|87 30 11|85 33 10|84 36 8|83 38 7|22 9 51 40 6|18 18 44 43 5|15 23 42 44 4|13 27 21 4 14 46 3|11 31 18 5 2 4 7 47 3|10 34 15 12 6 49 2|9 36 12 14 6 49 2|7 39 11 14 5 50 2|6 41 9 16 3 51 2|5 43 7 70 3|4 45 4 72 3|4 93 3 25 3|3 91 9 23 2|2 90 13 21 2|2 89 16 19 2|1 90 17 19 1|0 91 18 18 1|0 93 16 18 1|0 94 16 18|0 28 4 63 15 18|1 23 11 61 14 18|1 22 13 61 14 17|2 20 14 61 14 17|2 19 14 63 13 16 1|2 18 15 64 12 16 1|1 18 15 66 11 14 3|1 18 14 67 10 15 3|1 17 14 69 9 15 3|1 17 14 70 8 15 3|0 18 13 56 5 10 7 15 4|0 18 12 57 6 10 5 16 4*2|0 18 11 57 8 10 3 17 4|0 18 11 39 8 8 10 29 5|1 17 10 38 12 6 10 29 5|1 17 10 37 14 5 10 29 5|2 17 9 36 16 5 9 28 6|4 15 8 21 3 12 18 4 9 27 7|5 15 7 20 6 10 19 4 8 27 7|5 16 6 20 6 9 20 5 6 27 8|5 17 5 20 7 8 20 7 2 28 9|6 17 3 19 9 8 21 35 10|6 38 11 6 22 34 11|7 37 11 6 22 33 12|7 38 10 6 22 32 13|8 37 9 7 23 30 14|9 37 8 7 23 28 16|9 37 7 9 22 27 17|10 38 4 10 22 26 18|11 51 22 25 19|12 50 23 24 19|13 49 23 24 19|15 47 23 24 19|16 46 23 24 19|18 44 23 24 19|20 42 23 24 19|22 40 23 24 19|25 38 21 24 20*2|26 38 19 25 20*2|26 39 18 24 21|27 38 17 25 21|27 39 16 25 21|28 38 16 24 22|28 39 14 25 22|28 40 12 25 23|29 41 8 27 23|29 44 2 29 24|30 74 24|31 72 25|31 71 26|32 69 27|33 67 28|34 65 29|35 63 30|36 61 31|37 58 33|38 56 34|40 52 36|41 49 38|43 44 41|46 38 44|48 33 47|52 23 53|62 4 62|128*17',
  kind: 'canvas',
  headline: 'Superblocks is low-code with code on the side. AwaitIO is just code.',
  summary: 'A commercial low-code platform for internal apps, workflows and jobs, aimed at enterprises.',
  about: [
    'Superblocks is a commercial platform for internal apps, workflows and scheduled jobs on your databases and APIs.',
    'You build in low-code and extend it with code. It comes with RBAC, SSO, audit logs, secrets and GitOps deploys.',
    'Today it is pitched with AI app generation for enterprises.',
  ],
  status: {
    heading: 'Where Superblocks stands',
    paragraphs: ['Superblocks is active.', 'It is aimed at enterprises.'],
  },
  highlights: [
    {
      illustration: 'await',
      title: 'All code, not code on the side.',
      body: 'In Superblocks code fills the gaps of a low-code editor. In AwaitIO the whole tool is a function, and every `await io.input` call shows a form.',
    },
    {
      illustration: 'repo',
      title: 'The tool lives in your repo.',
      body: 'A Superblocks app lives on the Superblocks platform. An AwaitIO action is a TypeScript file next to the rest of your code.',
    },
    {
      illustration: 'app',
      title: 'Runs inside your own app.',
      body: 'Superblocks is a platform you sign up for. AwaitIO runs in your own Node process, and the same process serves the UI.',
    },
    {
      illustration: 'services',
      title: 'Your code, called directly.',
      body: 'No integrations to set up in another editor. An action imports your Prisma client and services and calls them.',
    },
    {
      illustration: 'review',
      title: 'Reviewed like any other code.',
      body: 'A change to a tool is a pull request with a diff, in the same repo and the same review as the app.',
    },
    {
      illustration: 'types',
      title: 'Typed from the form to the database.',
      body: 'What a person enters comes back typed. Rename a field and the compiler shows every tool that uses it.',
    },
    {
      illustration: 'price',
      title: 'One price for the whole team.',
      body: 'Superblocks sells enterprise plans. AwaitIO is free for small teams and one flat monthly price per organization above that.',
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
    { label: 'Generate an app from a plain-text description', awaitio: 'no', them: 'yes' },
    { label: 'Workflows and scheduled jobs built in', awaitio: 'no', them: 'yes' },
    { label: 'Enterprise RBAC, SSO and audit logs', awaitio: 'no', them: 'yes' },
    { label: 'Run the tools from a phone, in the browser', awaitio: 'yes', them: 'yes' },
  ],
  facts: {
    build: 'Build in its low-code editor, extend with code, or generate with AI.',
    runs: 'On the Superblocks platform.',
    code: 'On the Superblocks platform, deployed with GitOps.',
    ui: 'Built in its low-code editor.',
    openSource: 'No, commercial.',
  },
  whenItFits: ['You need apps, workflows and scheduled jobs in one enterprise platform.', 'You want RBAC, SSO, audit logs and secrets from one vendor.', 'Part of the team builds without code.'],
  whenAwaitIOFits: [
    'Your developers want the whole tool as code, not low-code with code on the side.',
    'You want the tools in your repo and running inside your own app.',
    'You want to call your own services and database client directly.',
  ],
  lastModifiedAt: '2026-10-25',
  details: [
    {
      heading: 'What is Superblocks?',
      paragraphs: [
        'Superblocks is a commercial platform for internal tools. It covers three things: internal apps, workflows and scheduled jobs.',
        'You build an app in Superblocks’ editor. You place components, connect them to your databases and APIs, and add code where the editor is not enough. Superblocks calls this “extend anything with code”.',
        'Workflows run a series of steps when something calls them. Scheduled jobs run the same kind of steps on a timer.',
        'The platform is aimed at enterprises. It comes with role-based access control, single sign-on, audit logs, secrets management and GitOps deploys.',
        'Today Superblocks is also pitched with AI app generation: you describe an app and AI builds it for you.',
      ],
    },
    {
      heading: 'What is AwaitIO?',
      paragraphs: [
        'AwaitIO is a framework for internal tools written as code. An action is an async TypeScript function in your own repo.',
        'Every `await io.input` call asks a person for something and waits for the answer. The browser shows the form, the person fills it in, and your function goes on with the value.',
        'The same Node process that runs your app serves the UI. There is no separate platform to sign up for and no editor to log in to.',
        'AwaitIO ships more than 20 components: 8 inputs, 3 selects including a table, 8 displays, a confirm and a layout. Anything missing is one React file you register next to them.',
      ],
    },
    {
      heading: 'Key differences',
      paragraphs: ['Both tools give your team buttons and forms on top of your data. Superblocks starts from an editor and lets you add code. AwaitIO starts from code and has no editor at all.'],
      subsections: [
        {
          heading: 'Low-code with code, or just code',
          paragraphs: [
            'Superblocks is low-code first. The screen, the data connections and the steps live in its editor. Code is how you fill the gaps.',
            'AwaitIO has no editor to fill. The whole tool is a function. `await io.input.email()` asks for an email. `await io.select.table()` lets a person pick rows. The screens follow from the code.',
            'A tool in AwaitIO reads top to bottom like a script. Branches, loops and error handling are plain TypeScript, not blocks wired together.',
          ],
        },
        {
          heading: 'Getting started',
          paragraphs: [
            'With Superblocks you create an account on the platform, connect your integrations and start building in its editor.',
            'With AwaitIO you install the `awaitio` package from npm into the app you already have. You pass it a folder of actions.',
            'Every file in that folder becomes an action, and its path becomes the URL. Folders become the navigation. There is no route table to keep in sync.',
            'The first tool is one file with one `await`. It is running before you would have finished connecting a data source.',
          ],
        },
        {
          heading: 'One tool, step by step',
          paragraphs: [
            'Say support needs to refund an order. Your team opens Refund order in the browser and sees a form with one field: Order ID.',
            'In AwaitIO that form is one line, `await io.input.text()`. The function then loads the order with your own database client.',
            'It shows the order with a display component and asks for a confirmation. Then it calls the refund service your app already has.',
            'In Superblocks the same tool is a screen with a text field, a query, a table, a button and the wiring between them, built in its editor.',
            'Both work. The AwaitIO version is one short function that any developer on the team can read and review.',
          ],
        },
        {
          heading: 'Where the tool lives',
          paragraphs: [
            'A Superblocks app lives on the Superblocks platform. GitOps deploys move it between environments, but you still build it in Superblocks’ editor.',
            'An AwaitIO action is a file in your repo. It goes through the same code review as the rest of the app. The TypeScript compiler checks it. Its history is in git.',
            'When you rename a field in your database, the compiler points at every tool that uses it. Nothing breaks quietly on another platform.',
          ],
        },
        {
          heading: 'Your data and your services',
          paragraphs: [
            'Superblocks reaches your data through integrations: database connections and API endpoints you set up on the platform. Logic that already exists in your app is often written again in its steps.',
            'An AwaitIO handler runs in your own process. It imports your Prisma client, your services and your utilities and calls them directly.',
            'Environment variables, secrets and network access work as they already do for your app. There is nothing extra to grant.',
          ],
        },
        {
          heading: 'Extending the UI',
          paragraphs: [
            'In Superblocks the UI is built from Superblocks’ components in its editor. Custom components and styling take extra setup next to the editor.',
            'In AwaitIO the whole UI stays in code. A component of your own is one React file with its props and the value it returns. You register it next to the built-in ones and `await` it like any io method.',
            'The look comes from a theme package, `@awaitio/theme-default`, which you can restyle. The page around the components comes from a layout component, `@awaitio/layout-basic`, which you can replace with your own.',
            'You never leave your editor.',
          ],
        },
        {
          heading: 'Hosting',
          paragraphs: [
            'Superblocks is a platform you sign up for. It can keep your data inside your own network, but the apps are built and managed on Superblocks.',
            'AwaitIO always runs inside your own Node app, on your own servers. There is no platform in between.',
            'Nothing can be switched off from outside.',
          ],
        },
        {
          heading: 'Access, audit and security',
          paragraphs: [
            'Superblocks sells to enterprises. Role-based access control, single sign-on and audit logs are part of the platform.',
            'AwaitIO keeps this simple. The people who can log in are listed in code, each with an email and a password hash.',
            'Every action knows who started it through `ctx.user`. Anything more, such as checks by role, is plain TypeScript in your handler.',
          ],
        },
        {
          heading: 'Price model',
          paragraphs: [
            'Superblocks is a commercial platform with plans for enterprises. The details are on its pricing page.',
            'AwaitIO is free for small teams, commercial use included. Above that it is one flat monthly price per organization, not per seat.',
            'Free or paid, it is the same software. The details are on the pricing page.',
          ],
        },
        {
          heading: 'Where Superblocks is stronger',
          paragraphs: [
            'People who do not write code can build in Superblocks. AwaitIO is for developers only.',
            'Superblocks has workflows and scheduled jobs on the same platform. AwaitIO runs actions that a person starts in the browser.',
            'Superblocks comes with enterprise access control, single sign-on and audit logs out of the box.',
            'Superblocks can generate an app from a plain-text description. In AwaitIO a developer writes the code.',
          ],
        },
      ],
    },
    {
      heading: 'Who should choose which',
      paragraphs: [
        'Choose Superblocks if you want one enterprise platform for apps, workflows and scheduled jobs. It also fits when part of the team builds without code, or when security wants SSO and audit logs from one vendor.',
        'Choose AwaitIO if a developer writes the tool. You get it in your repo, reviewed and typed like the rest of the app, running in your own process.',
        'Many teams that pick AwaitIO used to write a CLI script or a SQL query and run it for support themselves. AwaitIO turns that script into a tool anyone on the team can run in the browser.',
      ],
    },
    {
      heading: 'Moving from Superblocks to AwaitIO',
      paragraphs: [
        'Start with one app that a developer already maintains. Write its steps as one action: the inputs it asks for, the calls it makes and what it shows at the end.',
        'Replace the Superblocks integrations with your own database client and services. The action runs next to your API, so it can reuse the code your app already has.',
        'Move the code you wrote inside Superblocks into the handler. It becomes plain TypeScript with types, tests and review.',
        'Use `ctx.loading` to show progress when the action goes through a long list.',
        'Register the action, open the AwaitIO UI from your own server and send the link to the team. Move the next app when the first one works.',
        'Workflows and scheduled jobs are a different job. Keep them where they run today, or move them to the job runner your app already uses.',
      ],
    },
  ],
  faq: [
    {
      question: 'Is AwaitIO a Superblocks alternative?',
      answer: 'Yes, for teams where developers build the internal apps. AwaitIO replaces the low-code editor with TypeScript functions in your own repo.',
    },
    {
      question: 'Can people who do not code build tools in AwaitIO?',
      answer: 'No. Every AwaitIO tool is written in code by a developer. Once it exists, anyone on the team can run it in the browser.',
    },
    {
      question: 'Can I self-host AwaitIO?',
      answer: 'AwaitIO always runs inside your own Node app, on your own servers. There is no hosted platform to sign up for.',
    },
    {
      question: 'Does AwaitIO have SSO and audit logs like Superblocks?',
      answer: 'No. The people who can log in are listed in code with an email and a password hash. Each action knows who started it through `ctx.user`.',
    },
    {
      question: 'Does AwaitIO run scheduled jobs?',
      answer: 'No. AwaitIO runs actions that a person starts in the browser. Scheduled jobs stay with the job runner your app already uses.',
    },
    {
      question: 'Does AwaitIO charge per seat?',
      answer: 'No. It is free for small teams and one flat monthly price per organization above that. The pricing page has the details.',
    },
    {
      question: 'Can I use AwaitIO and Superblocks together?',
      answer: 'Yes. They do not depend on each other. Some teams keep Superblocks for workflows and low-code apps and write developer-owned tools in AwaitIO.',
    },
  ],
};
