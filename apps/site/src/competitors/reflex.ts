import type { Competitor } from '../types/Competitor';

export const reflex: Competitor = {
  slug: 'reflex',
  name: 'Reflex',
  logo: '10 108 10|9 110 9*26|9 29 52 29 9|9 28 54 28 9*2|9 27 56 27 9*22|9 28 55 27 9|9 28 55 26 10|9 29 54 25 11|9 82 37*27|9 29 54 25 11|9 28 55 26 10|9 27 56 27 9*42|10 26 56 26 10|11 24 58 25 10',
  kind: 'framework',
  headline: 'Reflex builds web apps in Python. AwaitIO builds internal tools in TypeScript.',
  summary: 'An open-source framework for full web apps in pure Python.',
  about: [
    'Reflex is an open-source framework for full web apps in pure Python.',
    'You write the frontend and the backend in one language.',
    'Reflex Cloud hosts the apps. It now also offers AI prompt to app.',
  ],
  status: {
    heading: 'Where Reflex stands',
    paragraphs: ['Reflex is active.', 'It is made for any web app, not only internal tools.'],
  },
  highlights: [
    {
      illustration: 'await',
      title: 'No pages to write.',
      body: 'In Reflex you write every page and the state behind it. In AwaitIO the form comes from one `await io.input` call.',
    },
    {
      illustration: 'app',
      title: 'Inside the app you already run.',
      body: 'A Reflex app is a Python app of its own. AwaitIO runs in your existing Node process and serves the UI from there.',
    },
    {
      illustration: 'services',
      title: 'Your TypeScript, called directly.',
      body: 'With a TypeScript backend, a Reflex app reaches it over an API or the database. An AwaitIO action imports your services and calls them.',
    },
    {
      illustration: 'repo',
      title: 'Next to the rest of your code.',
      body: 'An AwaitIO action is one file in the same repo and the same language as your backend. There is no second codebase to keep in step.',
    },
    {
      illustration: 'review',
      title: 'A small diff for a new tool.',
      body: 'A new tool is one function. The pull request shows the steps of the task, not page markup and state classes.',
    },
    {
      illustration: 'types',
      title: 'Typed from the form to the database.',
      body: 'What a person enters comes back typed. Rename a field and the compiler shows every tool that uses it.',
    },
    {
      illustration: 'price',
      title: 'Free for small teams.',
      body: 'AwaitIO is free for small teams, commercial use included. Above that it is one flat monthly price per organization, not per seat.',
    },
    {
      illustration: 'owned',
      title: 'No cloud to deploy to.',
      body: 'AwaitIO has no hosted part. The tools run wherever your app runs, and nothing can be switched off from outside.',
    },
  ],
  checks: [
    { label: 'Each tool is a file in your own repo', awaitio: 'yes', them: 'yes' },
    { label: '100 % in code, you never leave your editor', awaitio: 'yes', them: 'yes' },
    { label: 'No pages to write, the form comes from an await call', awaitio: 'yes', them: 'no' },
    { label: 'Login for your team built in', awaitio: 'yes', them: 'partial' },
    { label: 'Your own UI components, one React file each', awaitio: 'yes', them: 'yes' },
    { label: 'Your own theme for the whole UI', awaitio: 'yes', them: 'yes' },
    { label: 'Your own layout components', awaitio: 'yes', them: 'yes' },
    { label: 'Run the tools from a phone, in the browser', awaitio: 'yes', them: 'yes' },
    { label: 'Full public web apps, not only internal tools', awaitio: 'no', them: 'yes' },
    { label: 'Frontend and backend in pure Python', awaitio: 'no', them: 'yes' },
    { label: 'Generate an app from a plain-text description', awaitio: 'no', them: 'yes' },
  ],
  facts: {
    build: 'Write the whole web app in Python, frontend and backend.',
    runs: 'Reflex Cloud, or your own deployment.',
    code: 'In your repo.',
    ui: 'You write every page yourself, in Python.',
    openSource: 'Yes.',
  },
  whenItFits: ['Your team works in Python.', 'You are building a full web app, not only internal tools.', 'You want to design every page yourself.'],
  whenAwaitIOFits: [
    'Your backend is TypeScript and Node.',
    'You want internal tools without writing a frontend. The UI comes from `await io.input`.',
    'You want the tools inside the app you already run.',
  ],
  lastModifiedAt: '2026-10-25',
  details: [
    {
      heading: 'What is Reflex?',
      paragraphs: [
        'Reflex is an open-source framework for full web apps in pure Python. You install it with `pip install reflex`.',
        'It started under the name Pynecone and was renamed Reflex in 2023.',
        'You write the frontend and the backend in one language. Pages are Python functions that return components. The state of the app lives in Python classes on the server.',
        'Reflex turns the pages into a React frontend for you. You never write JavaScript.',
        'Reflex Cloud hosts the apps and deploys them with one command. Reflex now also offers AI that turns a prompt into an app.',
        'Reflex is made for any web app: dashboards, internal tools, public sites and products. Comparison articles often list it next to internal tool builders.',
      ],
    },
    {
      heading: 'What is AwaitIO?',
      paragraphs: [
        'AwaitIO is a framework for internal tools written as code. An action is an async TypeScript function in your own repo.',
        'Every `await io.input` call asks a person for something and waits for the answer. The browser shows the form, the person fills it in, and your function goes on with the value.',
        'The same Node process that runs your app serves the UI. There are no pages to write and no frontend to build.',
        'AwaitIO ships more than 20 components: inputs, selects, displays, a confirm and a layout. Anything missing is one React file you register next to them.',
      ],
    },
    {
      heading: 'Key differences',
      paragraphs: [
        'Both tools are just code: no drag-and-drop and no visual editor. Reflex lets you build any web app in Python. AwaitIO builds one kind of thing in TypeScript: an internal tool that asks a person and waits.',
      ],
      subsections: [
        {
          heading: 'Pages or a function that asks',
          paragraphs: [
            'In Reflex you build the app. You write each page, lay out its components, keep the state in a class and wire events to handlers.',
            'In AwaitIO you write the steps of the task in order. `await io.input.email()` asks for an email. `await io.select.table()` lets a person pick rows. `await io.confirm()` asks before something irreversible. The screens follow from the code.',
            'A refund tool in AwaitIO is one function of a few lines. There is no page, no state class and no event handler around it.',
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
          heading: 'Language',
          paragraphs: [
            'Reflex is pure Python, from the database to the buttons. It fits a team that works in Python.',
            'AwaitIO is TypeScript on Node. It fits a team whose backend is already TypeScript.',
          ],
        },
        {
          heading: 'Your app and your services',
          paragraphs: [
            'A Reflex app is an app of its own. If your backend is TypeScript, the Reflex app reaches it over an API or by reading the same database.',
            'AwaitIO runs inside the Node app you already have. An action imports your Prisma client, your services and your utilities and calls them directly. Environment variables work as they are.',
          ],
        },
        {
          heading: 'Extending the UI',
          paragraphs: [
            'Reflex gives you full control. You can wrap any React component, style every page and build any layout you like.',
            'AwaitIO keeps that control for internal tools, with less to write. A component of your own is one React file with its props and the value it returns. You register it next to the built-in ones and `await` it like any io method.',
            'The look comes from a theme package you can restyle. The page around the components comes from a layout component you can replace with your own. You never leave your editor.',
          ],
        },
        {
          heading: 'Login and people',
          paragraphs: [
            'Reflex is a general framework, so login for your team is something you add yourself.',
            'AwaitIO has login built in. The people who can log in are a list in your code, and every action knows who started it through `ctx.user`.',
            'Permissions per action are not built in. Everyone who can log in can run every action.',
          ],
        },
        {
          heading: 'Hosting and price model',
          paragraphs: [
            'Reflex is open source. You deploy it yourself or on Reflex Cloud.',
            'AwaitIO always runs inside your own Node app, on your own servers. There is no hosted version.',
            'AwaitIO is free for small teams, commercial use included. Above that it is one flat monthly price per organization, not per seat. The details are on the pricing page.',
          ],
        },
        {
          heading: 'Where Reflex is stronger',
          paragraphs: [
            'Reflex builds full web apps, public ones included. AwaitIO is only for internal tools.',
            'Reflex is pure Python. AwaitIO is TypeScript only.',
            'Reflex can generate an app from a prompt. In AwaitIO a developer writes the code.',
            'Reflex is open source. AwaitIO’s source is public, and its terms are on the pricing page.',
          ],
        },
      ],
    },
    {
      heading: 'An example: refunding an order',
      paragraphs: [
        'Support needs to refund an order. Someone types the order ID, checks the order, enters an amount and confirms.',
        'In Reflex this is a page. You lay out the fields and the order details, keep the order and the amount in a state class and write handlers for the buttons.',
        'In AwaitIO it is one action. `await io.input.text()` asks for the order ID. The action loads the order with your own database client and shows it with `io.display.metadata()`.',
        'Then `await io.input.number()` asks for the amount and `await io.confirm()` asks before the money moves. The action calls your payment service and returns a message for the person.',
        'The whole tool is one function of about twenty lines, in one file, in your repo.',
      ],
    },
    {
      heading: 'Who should choose which',
      paragraphs: [
        'Choose Reflex if your team works in Python, or if you are building a full web app and want to design every page yourself.',
        'Choose AwaitIO if your backend is TypeScript and you want internal tools without writing a frontend.',
        'Many teams that pick AwaitIO used to write a CLI script or a SQL query and run it for support themselves. AwaitIO turns that script into a tool anyone on the team can run.',
        'Some companies use both. Reflex builds a product or a dashboard in Python, and AwaitIO runs the tools support uses on the TypeScript backend.',
      ],
    },
    {
      heading: 'Moving from Reflex to AwaitIO',
      paragraphs: [
        'Moving makes sense only if your backend is TypeScript. Otherwise Reflex is the better fit.',
        'Start with one internal page that runs a task: look up a record, change it, confirm.',
        'Write its steps as one action. Each input on the page becomes an `await io.input` call. A table a person picks from becomes `io.select.table()`.',
        'The event handlers become the code between the calls. Call your own services from the action instead of going through an API.',
        'The result the page showed becomes `io.display.table()` or `io.display.metadata()` at the end.',
        'Register the action, open the AwaitIO UI from your own server and send the link to the team.',
      ],
    },
  ],
  faq: [
    {
      question: 'Is AwaitIO a Reflex alternative?',
      answer: 'For internal tools on a TypeScript backend, yes. For full web apps or teams that work in Python, Reflex is the better fit.',
    },
    {
      question: 'Do I write a frontend in AwaitIO?',
      answer: 'No. The screens come from the `await` calls in your function. You write React only for a component of your own.',
    },
    {
      question: 'Does AwaitIO support Python?',
      answer: 'No. AwaitIO is TypeScript on Node only.',
    },
    {
      question: 'Can I build a public web app with AwaitIO?',
      answer: 'No. AwaitIO is for internal tools that your team logs in to.',
    },
    {
      question: 'Can I self-host AwaitIO?',
      answer: 'AwaitIO always runs inside your own Node app, on your own servers. There is no hosted version to move away from.',
    },
    {
      question: 'Is AwaitIO open source like Reflex?',
      answer: 'The source of AwaitIO is public. It is free for small teams, and the terms are on the pricing page.',
    },
    {
      question: 'Does AwaitIO charge per seat?',
      answer: 'No. It is free for small teams and one flat monthly price per organization above that. The pricing page has the details.',
    },
  ],
};
