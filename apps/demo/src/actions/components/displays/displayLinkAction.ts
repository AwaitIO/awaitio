import { randomBytes } from 'crypto';
import { app } from '../../../app';

export const displayLinkAction = app.defineAction({
  name: 'Display link',
  description: 'io.display.link shows a link to a page in the app or outside it.',
  handler: async ({ io }) => {
    // Stands in for a one-time login token from the store platform.
    const token = randomBytes(8).toString('hex');

    await io.display.link('Login link', { url: `https://app.example.com/login/${token}` });

    return 'Link shown.';
  },
});
