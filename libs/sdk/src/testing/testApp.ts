import { mkdirSync, mkdtempSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { z } from 'zod';
import { testUser } from './testUser';
import { AwaitIO } from '../AwaitIO';
import { defineComponent } from '../defineComponent';

// Stands in for the folder of a built component package: <folder>/ui/ui.js.
const uiDirectory = mkdtempSync(join(tmpdir(), 'awaitio-'));
mkdirSync(join(uiDirectory, 'ui'));
writeFileSync(join(uiDirectory, 'ui', 'ui.js'), 'window.testComponentLoaded = true;');

// The app the server tests run; its actions live in ./actions, one file each, like in a real project.
export const testApp = new AwaitIO({
  name: 'Test app',
  environments: [
    { title: 'Production', color: '#dc2626', url: 'https://tools.example.com' },
    { title: 'Staging', color: '#f59e0b', url: 'https://staging.example.com' },
  ],
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
  },
});
