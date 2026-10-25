import type { Competitor } from '../types/Competitor';

export const airplane: Competitor = {
  slug: 'airplane',
  name: 'Airplane',
  logo: '128*11|43 41 44|42 44 42|41 46 41*2|40 48 40*2|39 50 39*2|38 24 4 24 38|38 23 6 23 38|37 23 8 23 37*2|36 23 10 22 37|36 23 10 23 36|35 23 12 23 35*2|34 23 14 22 35|34 23 14 23 34|34 22 16 22 34|33 23 16 23 33|33 22 17 23 33|32 23 18 23 32|32 22 19 23 32|31 23 20 23 31*2|30 23 22 23 30*2|29 23 24 23 29*2|28 23 26 23 28*2|27 23 27 23 28|27 23 28 23 27|26 23 29 23 27|26 23 30 23 26|25 24 30 23 26|25 23 32 23 25*2|24 23 34 23 24*2|23 23 36 23 23*2|22 23 38 23 22*2|21 23 39 24 21|21 23 40 23 21|20 23 41 24 20|20 23 42 23 20|19 24 42 23 20|19 23 44 23 19|18 24 44 23 19|18 23 46 23 18*2|17 23 48 23 17|16 24 48 23 17|16 23 50 23 16*2|15 23 51 24 15|15 23 52 23 15|14 24 52 24 14|14 23 54 23 14|13 24 54 24 13|13 23 56 23 13|12 24 56 24 12|12 23 58 23 12|11 24 58 24 11|11 23 59 24 11|10 24 60 24 10*2|9 24 21 20 21 23 10|9 24 20 22 20 24 9|9 23 19 25 20 23 9|8 24 19 26 19 24 8|8 23 19 28 19 23 8|7 24 18 30 18 24 7|7 23 18 32 17 24 7|6 24 17 33 18 24 6|6 24 17 34 17 24 6|5 24 17 36 17 24 5|5 24 16 38 16 24 5|4 24 16 39 17 24 4|4 24 16 40 16 24 4|3 24 16 42 15 25 3|3 24 15 44 15 24 3|2 24 15 46 14 24 3|2 24 14 48 14 24 2|1 25 13 50 13 24 2|1 25 10 55 10 26 1|0 45 37 45 1|0 41 45 42|0 40 47 41|0 39 49 40|0 38 51 39|0 37 53 38|0 36 55 37|0 35 57 36|0 34 59 35|0 33 61 34|0 32 63 33|0 31 65 32|0 30 67 31|0 29 69 30|0 28 71 29|0 27 73 28|0 25 77 26|0 22 83 23|128*11',
  kind: 'scripts',
  headline: 'Airplane shut down. AwaitIO runs in your own app.',
  summary: 'Scripts and SQL turned into internal tools. Shut down on 1 March 2024.',
  about: [
    'Airplane turned a Python or JavaScript script, a SQL query or a REST endpoint into a tool for the team.',
    'It came with permissions and audit logs.',
    'Later it added Views for React UI in code, Runbooks for workflows and Autopilot for AI.',
  ],
  status: {
    heading: 'Looking for an Airplane alternative?',
    paragraphs: [
      'Airtable acquired Airplane in January 2024.',
      'The product shut down on 1 March 2024. Sign-ups closed right away.',
      'Customers had two months to move their tools. There was no way to export the code.',
      'AwaitIO runs inside your own app, so nothing can be switched off from outside.',
    ],
  },
  highlights: [
    {
      illustration: 'owned',
      title: 'Nobody can shut it down.',
      body: 'Airplane closed with two months’ notice. AwaitIO runs in your own app, so no shutdown can take your tools away.',
    },
    {
      illustration: 'repo',
      title: 'The tool lives in your repo.',
      body: 'Airplane offered no way to export the tools. An AwaitIO action is a TypeScript file you already have.',
    },
    {
      illustration: 'app',
      title: 'Runs inside your own app.',
      body: 'Airplane’s platform held the tools and served the UI. AwaitIO does both from your own Node process.',
    },
    {
      illustration: 'await',
      title: 'A form in the middle of the script.',
      body: 'Every `await io.input` call shows a form and waits. A confirm or a table between two steps is one more line.',
    },
    {
      illustration: 'services',
      title: 'Your code, called directly.',
      body: 'An Airplane task ran apart from your app. An AwaitIO action runs in its process and imports your Prisma client and services.',
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
      body: 'AwaitIO is free for small teams. Above that it is one flat monthly price per organization, not per seat.',
    },
  ],
  checks: [
    { label: 'Nobody outside can switch the tools off', awaitio: 'yes', them: 'no' },
    { label: 'The UI is served by your own app, no separate platform', awaitio: 'yes', them: 'no' },
    { label: '100 % in code, you never leave your editor', awaitio: 'yes', them: 'partial' },
    { label: 'Your own UI components, one React file each', awaitio: 'yes', them: 'partial' },
    { label: 'Your own theme for the whole UI', awaitio: 'yes', them: 'no' },
    { label: 'Your own layout components', awaitio: 'yes', them: 'no' },
    { label: 'Run the tools from a phone, in the browser', awaitio: 'yes', them: 'yes' },
    { label: 'Tools from Python, SQL or a REST call, not only TypeScript', awaitio: 'no', them: 'yes' },
    { label: 'Hosted workflows and runbooks (until 2024)', awaitio: 'no', them: 'yes' },
  ],
  facts: {
    build: 'Turn a script, a SQL query or a REST endpoint into a tool. Views added React UI in code.',
    runs: 'Airplane’s hosted platform, now shut down.',
    code: 'In Airplane. The shutdown came with no way to export it.',
    ui: 'Generated for each script, or written in React with Views.',
    openSource: 'No.',
  },
  whenItFits: ['Airplane is gone, so it no longer fits a new tool.'],
  whenAwaitIOFits: [
    'You had scripts and SQL queries in Airplane and want them back as tools.',
    'You want the tools in your own repo and your own app, where nobody else can shut them down.',
    'You want a form, a confirm or a table in the middle of a script, with one `await` each.',
  ],
  lastModifiedAt: '2026-10-25',
  details: [
    {
      heading: 'What was Airplane?',
      paragraphs: [
        'Airplane was a developer platform for internal tools. It launched in 2021.',
        'You took something you already had: a Python or JavaScript script, a SQL query or a call to a REST endpoint. Airplane turned it into a tool the team could run from the browser.',
        'Each tool got a form for its parameters, a log of its runs, permissions and audit logs.',
        'Over time Airplane added more products. Runbooks chained tasks into workflows. Views let developers write the UI of a tool in React. Autopilot was an AI assistant that wrote the code for you.',
      ],
    },
    {
      heading: 'What happened to Airplane?',
      paragraphs: [
        'Airtable announced that it had acquired Airplane on 3 January 2024.',
        'Sign-ups closed right away. The product shut down on 1 March 2024.',
        'Customers had two months to move every tool somewhere else. There was no way to export the code.',
        'Teams lost the tools their support and operations people used every day. Many had to rebuild them in a hurry.',
        'The lesson for many of them: a tool that lives on someone else’s platform can disappear with it.',
      ],
    },
    {
      heading: 'What is AwaitIO?',
      paragraphs: [
        'AwaitIO is a framework for internal tools written as code. An action is an async TypeScript function in your own repo.',
        'Every `await io.input` call asks a person for something and waits for the answer. The browser shows the form, the person fills it in, and your function goes on with the value.',
        'The same Node process that runs your app serves the UI. There is no platform to sign up for and nothing hosted behind it.',
        'AwaitIO ships more than 20 components: inputs, selects, displays, a confirm and a layout. Anything missing is one React file you register next to them.',
      ],
    },
    {
      heading: 'Key differences',
      paragraphs: ['Both tools start from code a developer writes. Airplane put that code on its own platform. AwaitIO keeps it in your app.'],
      subsections: [
        {
          heading: 'Who owns the tools',
          paragraphs: [
            'An Airplane tool lived on Airplane’s platform. When the platform closed, the tools closed with it.',
            'An AwaitIO action is a file in your repo, run by your own server. It keeps working as long as your app does.',
            'No acquisition, price change or shutdown on our side can switch it off.',
          ],
        },
        {
          heading: 'A script or a function that asks',
          paragraphs: [
            'Airplane started from a script you already had and put a form in front of it.',
            'An AwaitIO action asks whenever the code needs it. It can look up an order, show it, ask for a refund amount and confirm before it charges back.',
            'Every question is one `await` line. Branches, loops and error handling are plain TypeScript.',
          ],
        },
        {
          heading: 'Your data and your services',
          paragraphs: [
            'An Airplane task ran on its own, apart from your app’s process.',
            'An AwaitIO handler runs in your own process. It imports your Prisma client, your services and your utilities and calls them directly. Environment variables work as they are.',
          ],
        },
        {
          heading: 'Extending the UI',
          paragraphs: [
            'In Airplane a task got a generated form. For more, you wrote a View in React against Airplane’s components, on Airplane’s platform.',
            'In AwaitIO the whole UI stays in code, in your repo. A component of your own is one React file with its props and the value it returns. You register it next to the built-in ones and `await` it like any io method.',
            'The look comes from a theme package you can restyle. The page around the components comes from a layout component you can replace with your own. You never leave your editor.',
          ],
        },
        {
          heading: 'Progress on long tasks',
          paragraphs: [
            'An action that loops over hundreds of records shows its progress with `ctx.loading`.',
            '`ctx.loading.start()` sets a label and the number of items. `ctx.loading.completeOne()` moves the bar after each one.',
            'The person sees how far it got. There is no frontend code behind it.',
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
          heading: 'Hosting',
          paragraphs: [
            'Airplane was a hosted platform. Its UI, its run history and its settings lived there.',
            'AwaitIO always runs inside your own Node app, on your own servers. There is no hosted version.',
          ],
        },
        {
          heading: 'Price model',
          paragraphs: [
            'Airplane no longer sells anything.',
            'AwaitIO is free for small teams, commercial use included. Above that it is one flat monthly price per organization, not per seat. The details are on the pricing page.',
          ],
        },
        {
          heading: 'Where Airplane was stronger',
          paragraphs: [
            'Airplane took scripts in several languages, plain SQL queries and REST calls. AwaitIO actions are TypeScript only.',
            'Airplane had Runbooks for workflows across many tasks. AwaitIO has no workflow engine.',
            'Airplane had permissions per tool and audit logs built in. In AwaitIO, everyone who can log in can run every action.',
          ],
        },
      ],
    },
    {
      heading: 'An example: refunding an order',
      paragraphs: [
        'Support needs to refund an order. Someone types the order ID, checks the order, enters an amount and confirms.',
        'In Airplane this was a task with the order ID and the amount as its parameters. Showing the order before the refund took more: a second task or a View.',
        'In AwaitIO it is one action. `await io.input.text()` asks for the order ID. The action loads the order with your own database client and shows it with `io.display.metadata()`.',
        'Then `await io.input.number()` asks for the amount and `await io.confirm()` asks before the money moves. The action calls your payment service and returns a message for the person.',
        'The whole tool is one function of about twenty lines, in one file, in your repo.',
      ],
    },
    {
      heading: 'Who should choose which',
      paragraphs: [
        'Airplane is gone, so the real choice is where its tools go next.',
        'Choose AwaitIO if your backend is TypeScript and a developer writes the tools. They end up in your repo, reviewed and typed like the rest of the app, running in your own process.',
        'Look elsewhere if you need scripts in many languages or long multi-step workflows on a schedule. A workflow platform fits that better.',
      ],
    },
    {
      heading: 'Moving from Airplane to AwaitIO',
      paragraphs: [
        'Every Airplane task becomes one AwaitIO action. Start with the one your team runs most.',
        'The parameters of the task become `await io.input` calls at the top of the action. A text parameter is `io.input.text()`, a number is `io.input.number()` and a date is `io.input.date()`. `io.group` puts several of them on one screen.',
        'A JavaScript task moves almost as it is. Paste its body into the handler and replace the Airplane parameters with the values from `io`.',
        'A SQL task becomes a call to your own database client. Show the result with `io.display.table()`, or let a person pick rows with `io.select.table()`.',
        'A REST task becomes a call to your own service, or a `fetch` to the same endpoint.',
        'A View becomes a page or an action that shows tables, metadata and links. A component you wrote for a View becomes one React file registered next to the built-in ones.',
        'A Python task has to be rewritten in TypeScript, or called from the action as it is.',
        'Register the actions, open the AwaitIO UI from your own server and send the link to the team. Move the next task when the first one works.',
      ],
    },
  ],
  faq: [
    {
      question: 'Is AwaitIO an Airplane alternative?',
      answer: 'Yes, for teams where developers write the tools in TypeScript. Each Airplane task becomes an async function in your own repo, served by your own app.',
    },
    {
      question: 'Is Airplane still available?',
      answer: 'No. Airtable acquired Airplane in January 2024, and the product shut down on 1 March 2024.',
    },
    {
      question: 'Can I import my Airplane tasks into AwaitIO?',
      answer: 'There is no automatic import. A JavaScript task moves almost as it is: its parameters become `await io.input` calls and its body goes into the handler.',
    },
    {
      question: 'Can AwaitIO shut down my tools like Airplane did?',
      answer: 'No. AwaitIO runs inside your own app, on your own servers. Nothing can be switched off from outside.',
    },
    {
      question: 'Can I self-host AwaitIO?',
      answer: 'AwaitIO always runs inside your own Node app, on your own servers. There is no hosted version to move away from.',
    },
    {
      question: 'Does AwaitIO have workflows like Airplane Runbooks?',
      answer: 'No. One action can ask, wait and run several steps in a row, but there is no workflow engine or scheduler.',
    },
    {
      question: 'Does AwaitIO charge per seat?',
      answer: 'No. It is free for small teams and one flat monthly price per organization above that. The pricing page has the details.',
    },
  ],
};
