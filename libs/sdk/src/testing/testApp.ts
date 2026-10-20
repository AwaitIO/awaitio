import { mkdirSync, mkdtempSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { z } from 'zod';
import { testLabelBlock } from './testLabelBlock';
import { testTheme } from './testTheme';
import { testUser } from './testUser';
import { AwaitIO } from '../AwaitIO';
import { defineComponent } from '../defineComponent';
import { defineDisplay } from '../defineDisplay';
import { defineLayout } from '../defineLayout';

// Stands in for the folder of a built component package: <folder>/ui/ui.js.
const uiDirectory = mkdtempSync(join(tmpdir(), 'awaitio-'));
mkdirSync(join(uiDirectory, 'ui'));
writeFileSync(join(uiDirectory, 'ui', 'ui.js'), 'window.testComponentLoaded = true;');
const layoutUiDirectory = mkdtempSync(join(tmpdir(), 'awaitio-layout-'));
mkdirSync(join(layoutUiDirectory, 'ui'));
writeFileSync(join(layoutUiDirectory, 'ui', 'ui.js'), 'window.testLayoutLoaded = true;');

// The app the server tests run; its actions live in ./actions, one file each, like in a real project.
export const testApp = new AwaitIO({
  name: 'Test app',
  actionsDirectory: join(__dirname, 'actions'),
  environments: [
    { title: 'Production', color: '#dc2626', url: 'https://tools.example.com' },
    { title: 'Staging', color: '#f59e0b', url: 'https://staging.example.com' },
  ],
  theme: { ...testTheme, Label: testLabelBlock },
  secret: testUser.secret,
  users: [
    { email: 'petr@example.com', name: 'Petr', passwordHash: testUser.passwordHash },
    { email: 'eva@example.com', name: 'Eva', passwordHash: testUser.passwordHash },
    { email: 'locked@example.com', name: 'Locked', passwordHash: testUser.passwordHash },
  ],
  components: {
    input: {
      text: {
        ...defineComponent({
          props: z.object({}),
          returns: z.string(),
          validate: ({ label, value }) => {
            return value.trim().length === 0 ? `${label} is required.` : null;
          },
          component: () => {
            return null;
          },
        }),
        uiDirectory,
      },
    },
    display: {
      list: {
        ...defineDisplay({
          props: z.object({ items: z.array(z.string()), ordered: z.boolean().default(false) }),
          component: () => {
            return null;
          },
        }),
        uiDirectory,
      },
    },
  },
  layouts: {
    // Stands in for @awaitio/layout-basic: pages that return just display components land here.
    basic: {
      ...defineLayout({
        props: z.object({ title: z.string(), description: z.string().optional() }),
        component: () => {
          return null;
        },
      }),
      uiDirectory: layoutUiDirectory,
    },
    columns: {
      ...defineLayout({
        props: z.object({ count: z.number().int().min(1).max(4).default(2) }),
        component: () => {
          return null;
        },
      }),
      uiDirectory: layoutUiDirectory,
    },
  },
});
