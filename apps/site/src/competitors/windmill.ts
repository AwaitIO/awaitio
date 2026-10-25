import type { Competitor } from '../types/Competitor';

export const windmill: Competitor = {
  slug: 'windmill',
  name: 'Windmill',
  logo: '128*7|67 28 33|66 29 33|66 28 34|65 29 34|65 28 35|29 1 34 28 36|28 2 33 29 36|27 4 32 28 37|27 5 30 29 37|26 6 30 28 38|26 7 28 28 39|25 8 27 29 39|24 10 26 28 40|24 11 24 29 40|23 12 24 28 41|23 13 22 28 42|22 14 21 29 42|22 15 20 28 43|21 16 19 29 43|20 18 18 28 44|20 19 16 28 45|19 20 15 29 45|19 21 14 28 46|18 22 13 29 46|18 23 12 28 47|17 24 11 28 48|16 26 9 29 48|16 27 8 28 49|15 28 8 63 14|15 29 8 63 13|16 28 8 63 13|17 28 8 63 12*2|18 28 8 63 11|18 29 8 63 10|19 28 8 63 10|19 29 8 63 9|20 28 8 63 9|21 28 8 63 8|21 29 7 63 8|22 28 8 63 7|22 29 8 63 6|23 28 8 63 6|23 29 8 63 5|24 28 8 63 5|25 28 8 63 4|25 29 7 63 4|26 28 8 63 3|26 29 8 63 2|27 28 8 63 2|28 28 8 63 1*2|29 28 71|29 29 70|30 28 70|30 29 69|31 28 69|32 28 68|0 5 27 29 67|1 59 8 29 31|1 59 8 30 30|2 57 8 31 30|2 57 7 33 29|3 55 8 33 29|4 54 7 35 28|4 53 8 35 28|5 51 8 37 27*2|6 49 8 39 26|6 49 7 41 25|7 47 8 41 25|8 46 7 43 24|8 45 8 43 24|9 43 8 45 23*2|10 41 8 47 22|10 41 7 48 22|11 39 8 49 21|12 37 8 50 21|12 37 8 51 20|13 35 8 53 19*2|14 33 8 55 18|54 56 18|54 28 1 28 17|53 29 2 27 17|53 28 3 28 16|52 28 5 27 16|51 29 5 27 16|51 28 7 25 17|50 29 7 25 17|50 28 9 23 18|49 29 9 23 18|49 28 11 21 19|48 28 13 19 20|47 29 13 19 20|47 28 15 17 21|46 29 15 17 21|46 28 17 15 22|45 29 17 15 22|45 28 19 13 23|44 28 20 12 24|43 29 21 11 24|43 28 23 9 25|42 29 23 9 25|42 28 25 7 26|41 29 25 7 26|41 28 27 5 27|40 28 28 4 28|39 29 29 3 28|39 28 30 2 29|38 29 31 1 29|38 28 62|37 28 63|128*7',
  kind: 'scripts',
  headline: 'Windmill runs scripts and workflows. AwaitIO is one function that awaits a person.',
  summary: 'An open-source platform that turns scripts into APIs, jobs, workflows and UIs.',
  about: [
    'Windmill is an open-source developer platform for internal code.',
    'Scripts in TypeScript, Python, Go, SQL, Bash and more become APIs, background jobs, workflows and UIs.',
    'The UIs come from a separate builder: low-code, or full-code with React or Svelte frontends that call Windmill scripts.',
  ],
  status: {
    heading: 'Where Windmill stands',
    paragraphs: ['Windmill is active.', 'It calls itself an open-source alternative to Airplane, Superblocks and Retool. Many Airplane users moved to it.'],
  },
  highlights: [
    {
      illustration: 'await',
      title: 'One function that awaits a person.',
      body: 'In Windmill a person’s input is a flow step or an app built on top. In AwaitIO it is one `await io.input` line in the function.',
    },
    {
      illustration: 'app',
      title: 'No platform next to your app.',
      body: 'Windmill is a platform of its own, on its cloud or your servers. AwaitIO runs inside the Node app you already have.',
    },
    {
      illustration: 'services',
      title: 'Your code, called directly.',
      body: 'Windmill scripts run on its workers, apart from your app. An AwaitIO action imports your Prisma client and services and calls them.',
    },
    {
      illustration: 'repo',
      title: 'Plain files in your repo.',
      body: 'Windmill keeps scripts in its workspace and syncs them to git. An AwaitIO action is a TypeScript file next to the rest of your code.',
    },
    {
      illustration: 'review',
      title: 'Form and logic in one diff.',
      body: 'In Windmill the UI is built in a separate app builder. In AwaitIO the form, the logic and any custom component change in one pull request.',
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
    {
      illustration: 'owned',
      title: 'Nothing else to keep running.',
      body: 'Windmill brings its own server, workers and database. AwaitIO is a package in your app, so the tools run wherever the app runs.',
    },
  ],
  checks: [
    { label: 'Each tool is a file in your own repo', awaitio: 'yes', them: 'partial' },
    { label: 'Runs inside your own app, no separate platform', awaitio: 'yes', them: 'no' },
    { label: 'Calls your own services and database client directly', awaitio: 'yes', them: 'partial' },
    { label: 'A form in the middle of a function, with one await', awaitio: 'yes', them: 'partial' },
    { label: '100 % in code, you never leave your editor', awaitio: 'yes', them: 'partial' },
    { label: 'Your own UI components, one React file each', awaitio: 'yes', them: 'partial' },
    { label: 'Your own theme for the whole UI', awaitio: 'yes', them: 'partial' },
    { label: 'Your own layout components', awaitio: 'yes', them: 'partial' },
    { label: 'Run the tools from a phone, in the browser', awaitio: 'yes', them: 'yes' },
    { label: 'Scripts in many languages: Python, Go, SQL, Bash', awaitio: 'no', them: 'yes' },
    { label: 'Workflows and scheduled background jobs', awaitio: 'no', them: 'yes' },
  ],
  facts: {
    build: 'Write scripts, chain them into workflows, then build a UI on top.',
    runs: 'Windmill Cloud, or your own servers.',
    code: 'Scripts stored in Windmill.',
    ui: 'A separate builder: low-code, or React and Svelte frontends calling Windmill scripts.',
    openSource: 'Yes.',
  },
  whenItFits: [
    'You need many languages: TypeScript, Python, Go, SQL, Bash.',
    'Most of the work is background jobs and multi-step workflows.',
    'You want an open-source platform for all of your internal scripts.',
  ],
  whenAwaitIOFits: [
    'Your tool is a task a person runs: look something up, check it, confirm, done.',
    'You want one action to be one function, with the UI coming from the same code.',
    'You want it inside your existing Node app, calling your own services directly.',
  ],
  lastModifiedAt: '2026-10-25',
  details: [
    {
      heading: 'What is Windmill?',
      paragraphs: [
        'Windmill is an open-source developer platform for internal code.',
        'You write scripts in TypeScript, Python, Go, SQL, Bash and other languages. Windmill turns each script into an API endpoint, a background job and a form to run it by hand.',
        'Scripts chain into flows: workflows with branches, loops, retries and steps that wait for an approval.',
        'Jobs run on schedules or from webhooks. Workers execute them, apart from your own app.',
        'For UIs there is an app builder. You build the screen in a low-code editor, or write a full-code frontend in React or Svelte that calls Windmill scripts.',
        'Windmill runs on Windmill Cloud or on your own servers. It calls itself an open-source alternative to Airplane, Superblocks and Retool, and many Airplane users moved to it.',
      ],
    },
    {
      heading: 'What is AwaitIO?',
      paragraphs: [
        'AwaitIO is a framework for internal tools written as code. An action is an async TypeScript function in your own repo.',
        'Every `await io.input` call asks a person for something and waits for the answer. The browser shows the form, the person fills it in, and your function goes on with the value.',
        'The same Node process that runs your app serves the UI. There is no platform to run next to it, no workers and no database of its own.',
        'AwaitIO ships more than 20 components: inputs, selects, displays, a confirm and a layout. Anything missing is one React file you register next to them.',
      ],
    },
    {
      heading: 'Key differences',
      paragraphs: [
        'Both tools are for developers who would rather write code than drag components. Windmill is a broad platform for all of your internal scripts. AwaitIO does one thing: a function that asks a person and waits.',
      ],
      subsections: [
        {
          heading: 'A platform or a package',
          paragraphs: [
            'Windmill is a platform you run or rent. It has its own server, workers, database and web editor.',
            'AwaitIO is a package you add to the Node app you already have. `app.listen()` starts your actions and the UI together.',
            'There is nothing extra to deploy, upgrade or monitor. The tools run wherever your app runs.',
          ],
        },
        {
          heading: 'Asking a person',
          paragraphs: [
            'In Windmill a script takes its inputs up front, as a generated form. Asking in the middle means a flow with an approval step, or an app built around the scripts.',
            'In AwaitIO asking is a line of code. `await io.input.text()` shows a form. `await io.select.table()` lets a person pick rows. `await io.confirm()` asks before something irreversible.',
            'The action reads top to bottom like a script. Branches, loops and error handling are plain TypeScript, with no flow editor in between.',
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
          heading: 'Where the code lives',
          paragraphs: [
            'Windmill stores scripts in its workspace. You can edit them locally and sync them with git through its CLI.',
            'An AwaitIO action is a plain file in your repo. It goes through code review, it is checked by the TypeScript compiler, and its history is in git.',
          ],
        },
        {
          heading: 'Your data and your services',
          paragraphs: [
            'A Windmill script runs on a Windmill worker. It reaches your database through resources set up in Windmill, or through code you package for it.',
            'An AwaitIO handler runs in your own process. It imports your Prisma client, your services and your utilities and calls them directly. Environment variables work as they are.',
          ],
        },
        {
          heading: 'Extending the UI',
          paragraphs: [
            'In Windmill the UI is a separate app. You build it in the low-code builder, or write a whole React or Svelte frontend that calls the scripts.',
            'In AwaitIO the whole UI stays in code, next to the logic. A component of your own is one React file with its props and the value it returns. You register it next to the built-in ones and `await` it like any io method.',
            'The look comes from a theme package you can restyle. The page around the components comes from a layout component you can replace with your own. You never leave your editor.',
          ],
        },
        {
          heading: 'Price model',
          paragraphs: [
            'Windmill is open source, with paid cloud and enterprise plans on top.',
            'AwaitIO is free for small teams, commercial use included. Above that it is one flat monthly price per organization, not per seat. The details are on the pricing page.',
          ],
        },
        {
          heading: 'Where Windmill is stronger',
          paragraphs: [
            'Windmill runs scripts in many languages. AwaitIO is TypeScript only.',
            'Windmill has workflows, schedules, webhooks and background jobs. AwaitIO has none of these. An action runs when a person starts it.',
            'Windmill is open source. AwaitIO’s source is public, and its terms are on the pricing page.',
            'Windmill can be the one place for every internal script a company has. AwaitIO is only for tools a person runs.',
          ],
        },
      ],
    },
    {
      heading: 'An example: refunding an order',
      paragraphs: [
        'Support needs to refund an order. Someone types the order ID, checks the order, enters an amount and confirms.',
        'In Windmill this is a script with the order ID and the amount as inputs. Showing the order first and confirming means a flow with an approval step, or an app built around the scripts.',
        'In AwaitIO it is one action. `await io.input.text()` asks for the order ID. The action loads the order with your own database client and shows it with `io.display.metadata()`.',
        'Then `await io.input.number()` asks for the amount and `await io.confirm()` asks before the money moves. The action calls your payment service and returns a message for the person.',
        'The whole tool is one function of about twenty lines, in one file, in your repo.',
      ],
    },
    {
      heading: 'Who should choose which',
      paragraphs: [
        'Choose Windmill if most of the work is background jobs and workflows, or if your scripts are in many languages.',
        'Choose Windmill as well if you want one open-source platform for all of your internal code.',
        'Choose AwaitIO if your tool is a task a person runs: look something up, check it, confirm, done. You write it as one function in your existing Node app, and it calls your own services directly.',
        'Some teams use both. Windmill runs the scheduled jobs, and AwaitIO runs the tools that support opens in the browser.',
      ],
    },
    {
      heading: 'Moving from Windmill to AwaitIO',
      paragraphs: [
        'Start with a TypeScript script that a person runs by hand.',
        'Its inputs become `await io.input` calls at the top of the action. `io.group` puts several of them on one screen.',
        'Its body goes into the handler. Replace the Windmill resources with your own database client and services, imported from your app.',
        'If the script was part of a flow with an approval step, the approval becomes `await io.confirm()` in the same function.',
        'If an app showed the result, use `io.display.table()` or `io.display.metadata()` at the end of the action.',
        'Keep scheduled jobs and workflows where they are. AwaitIO has no scheduler.',
        'Register the action, open the AwaitIO UI from your own server and send the link to the team.',
      ],
    },
  ],
  faq: [
    {
      question: 'Is AwaitIO a Windmill alternative?',
      answer: 'For tools a person runs, yes. Each tool is an async TypeScript function in your own repo that awaits the answers. For background jobs and workflows, no.',
    },
    {
      question: 'Does AwaitIO run scheduled jobs or workflows?',
      answer: 'No. An action runs when a person starts it. Keep scheduled jobs in a job runner or a workflow platform.',
    },
    {
      question: 'Does AwaitIO support Python, Go or Bash?',
      answer: 'No. AwaitIO actions are TypeScript on Node only.',
    },
    {
      question: 'Can I self-host AwaitIO?',
      answer: 'AwaitIO always runs inside your own Node app, on your own servers. There is no separate platform to host.',
    },
    {
      question: 'Is AwaitIO open source like Windmill?',
      answer: 'The source of AwaitIO is public. It is free for small teams, and the terms are on the pricing page.',
    },
    {
      question: 'Can I use AwaitIO and Windmill together?',
      answer: 'Yes. They do not depend on each other. Some teams keep Windmill for jobs and workflows and write the tools people run in AwaitIO.',
    },
    {
      question: 'Does AwaitIO charge per seat?',
      answer: 'No. It is free for small teams and one flat monthly price per organization above that. The pricing page has the details.',
    },
  ],
};
